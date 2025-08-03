#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface FileAnalysis {
  filePath: string;
  imports: string[];
  exports: string[];
  isImported: boolean;
  unusedExports: string[];
}

interface UnusedCodeReport {
  unusedFiles: string[];
  filesWithUnusedExports: FileAnalysis[];
  totalFiles: number;
  totalUnusedFiles: number;
  totalUnusedExports: number;
}

class UnusedCodeDetector {
  private projectRoot: string;
  private sourceFiles: string[] = [];
  private fileAnalyses: Map<string, FileAnalysis> = new Map();
  private importGraph: Map<string, Set<string>> = new Map();

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }

  /**
   * Get all TypeScript/JavaScript files in the project
   */
  private getAllSourceFiles(dir: string, basePath: string = ''): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .git, .next, and other common directories
        if (!['node_modules', '.git', '.next', 'dist', 'build', 'coverage'].includes(entry.name)) {
          this.getAllSourceFiles(fullPath, relativePath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
          this.sourceFiles.push(relativePath);
        }
      }
    }
  }

  /**
   * Parse a TypeScript file and extract imports/exports
   */
  private analyzeFile(filePath: string): FileAnalysis {
    const fullPath = path.join(this.projectRoot, filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    const imports: string[] = [];
    const exports: string[] = [];

    const visit = (node: ts.Node) => {
      // Handle import declarations
      if (ts.isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier)) {
          const importPath = this.resolveImportPath(moduleSpecifier.text, filePath);
          if (importPath) {
            imports.push(importPath);
          }
        }
      }
      
      // Handle export declarations
      if (ts.isExportDeclaration(node)) {
        if (node.exportClause && ts.isNamedExports(node.exportClause)) {
          node.exportClause.elements.forEach(element => {
            exports.push(element.name.text);
          });
        }
        // Handle re-exports
        if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
          const reExportPath = this.resolveImportPath(node.moduleSpecifier.text, filePath);
          if (reExportPath) {
            imports.push(reExportPath);
          }
        }
      }
      
      // Handle function declarations
      if (ts.isFunctionDeclaration(node) && node.name) {
        const hasExportModifier = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportModifier) {
          exports.push(node.name.text);
        }
      }
      
      // Handle variable declarations with export
      if (ts.isVariableStatement(node)) {
        const hasExportModifier = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportModifier) {
          node.declarationList.declarations.forEach(decl => {
            if (ts.isIdentifier(decl.name)) {
              exports.push(decl.name.text);
            }
          });
        }
      }
      
      // Handle class declarations
      if (ts.isClassDeclaration(node) && node.name) {
        const hasExportModifier = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportModifier) {
          exports.push(node.name.text);
        }
      }
      
      // Handle interface declarations
      if (ts.isInterfaceDeclaration(node)) {
        const hasExportModifier = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportModifier) {
          exports.push(node.name.text);
        }
      }
      
      // Handle type alias declarations
      if (ts.isTypeAliasDeclaration(node)) {
        const hasExportModifier = node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword);
        if (hasExportModifier) {
          exports.push(node.name.text);
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);

    return {
      filePath,
      imports,
      exports,
      isImported: false,
      unusedExports: []
    };
  }

  /**
   * Resolve import path to actual file path
   */
  private resolveImportPath(importSpecifier: string, fromFile: string): string | null {
    // Handle relative imports
    if (importSpecifier.startsWith('./') || importSpecifier.startsWith('../')) {
      const fromDir = path.dirname(fromFile);
      let resolvedPath = path.join(fromDir, importSpecifier);
      
      // Try different extensions
      const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
      
      for (const ext of extensions) {
        const testPath = resolvedPath + ext;
        if (this.sourceFiles.includes(testPath)) {
          return testPath;
        }
      }
      
      // Check if it's already a complete path
      if (this.sourceFiles.includes(resolvedPath)) {
        return resolvedPath;
      }
    }
    
    // Handle absolute imports starting with @/
    if (importSpecifier.startsWith('@/')) {
      const srcPath = importSpecifier.replace('@/', 'src/');
      const extensions = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
      
      for (const ext of extensions) {
        const testPath = srcPath + ext;
        if (this.sourceFiles.includes(testPath)) {
          return testPath;
        }
      }
      
      if (this.sourceFiles.includes(srcPath)) {
        return srcPath;
      }
    }
    
    return null;
  }

  /**
   * Build import graph and mark imported files
   */
  private buildImportGraph(): void {
    for (const [filePath, analysis] of this.fileAnalyses) {
      this.importGraph.set(filePath, new Set(analysis.imports));
      
      // Mark imported files
      for (const importedFile of analysis.imports) {
        const importedAnalysis = this.fileAnalyses.get(importedFile);
        if (importedAnalysis) {
          importedAnalysis.isImported = true;
        }
      }
    }
  }

  /**
   * Find unused exports by checking if they're imported anywhere
   */
  private findUnusedExports(): void {
    for (const [filePath, analysis] of this.fileAnalyses) {
      const unusedExports: string[] = [];
      
      for (const exportName of analysis.exports) {
        let isUsed = false;
        
        // Check if this export is imported in any other file
        for (const [otherFile, otherAnalysis] of this.fileAnalyses) {
          if (otherFile !== filePath && otherAnalysis.imports.includes(filePath)) {
            // Need to check if specific export is used - for now mark as used
            // In a more sophisticated implementation, we'd parse the import statements
            isUsed = true;
            break;
          }
        }
        
        if (!isUsed) {
          unusedExports.push(exportName);
        }
      }
      
      analysis.unusedExports = unusedExports;
    }
  }

  /**
   * Check if file is an entry point (like Next.js pages, API routes, etc.)
   */
  private isEntryPoint(filePath: string): boolean {
    // Next.js entry points
    if (filePath.includes('src/app/') && (filePath.endsWith('page.tsx') || filePath.endsWith('layout.tsx'))) {
      return true;
    }
    
    // API routes
    if (filePath.includes('src/app/') && filePath.endsWith('route.ts')) {
      return true;
    }
    
    // Loading, error, and not-found pages
    if (filePath.includes('src/app/') && (filePath.endsWith('loading.tsx') || filePath.endsWith('error.tsx') || filePath.endsWith('not-found.tsx'))) {
      return true;
    }
    
    // Main config files
    if (['next.config.js', 'tailwind.config.ts', 'tsconfig.json'].some(config => filePath.endsWith(config))) {
      return true;
    }
    
    // Root layout and global files
    if (filePath === 'src/app/layout.tsx' || filePath === 'src/app/globals.css') {
      return true;
    }
    
    // Environment declaration files
    if (filePath.endsWith('.d.ts') && (filePath.includes('next-env') || filePath.includes('global'))) {
      return true;
    }
    
    // Context providers (often used in layout)
    if (filePath.includes('context/') && filePath.endsWith('Context.tsx')) {
      return true;
    }
    
    // AI flow files (used by Genkit)
    if (filePath.includes('src/ai/flows/') || filePath.includes('src/ai/dev.ts') || filePath.includes('src/ai/genkit.ts')) {
      return true;
    }
    
    return false;
  }

  /**
   * Run the complete analysis
   */
  public analyze(silent: boolean = false): UnusedCodeReport {
    if (!silent) console.log('🔍 Scanning for source files...');
    this.getAllSourceFiles(this.projectRoot);
    
    if (!silent) console.log(`📁 Found ${this.sourceFiles.length} source files`);
    if (!silent) console.log('🔧 Analyzing imports and exports...');
    
    // Analyze each file
    for (const file of this.sourceFiles) {
      try {
        const analysis = this.analyzeFile(file);
        this.fileAnalyses.set(file, analysis);
      } catch (error) {
        if (!silent) console.warn(`⚠️  Could not analyze ${file}: ${error}`);
      }
    }
    
    if (!silent) console.log('🔗 Building import graph...');
    this.buildImportGraph();
    
    if (!silent) console.log('🧹 Finding unused exports...');
    this.findUnusedExports();
    
    // Find unused files (not imported and not entry points)
    const unusedFiles = this.sourceFiles.filter(file => {
      const analysis = this.fileAnalyses.get(file);
      return analysis && !analysis.isImported && !this.isEntryPoint(file);
    });
    
    // Find files with unused exports
    const filesWithUnusedExports = Array.from(this.fileAnalyses.values())
      .filter(analysis => analysis.unusedExports.length > 0);
    
    const totalUnusedExports = filesWithUnusedExports.reduce(
      (sum, file) => sum + file.unusedExports.length, 
      0
    );
    
    return {
      unusedFiles,
      filesWithUnusedExports,
      totalFiles: this.sourceFiles.length,
      totalUnusedFiles: unusedFiles.length,
      totalUnusedExports
    };
  }
}

/**
 * Format and display the analysis report
 */
function displayReport(report: UnusedCodeReport, outputJson: boolean = false): void {
  if (outputJson) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log('\n📊 UNUSED CODE ANALYSIS REPORT');
  console.log('═'.repeat(50));
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total files analyzed: ${report.totalFiles}`);
  console.log(`   Unused files: ${report.totalUnusedFiles}`);
  console.log(`   Files with unused exports: ${report.filesWithUnusedExports.length}`);
  console.log(`   Total unused exports: ${report.totalUnusedExports}`);
  
  if (report.unusedFiles.length > 0) {
    console.log('\n🗑️  UNUSED FILES:');
    console.log('─'.repeat(30));
    report.unusedFiles.forEach(file => {
      console.log(`   📄 ${file}`);
    });
  } else {
    console.log('\n✅ No unused files found!');
  }
  
  if (report.filesWithUnusedExports.length > 0) {
    console.log('\n🚫 UNUSED EXPORTS:');
    console.log('─'.repeat(30));
    report.filesWithUnusedExports.forEach(file => {
      console.log(`   📄 ${file.filePath}`);
      file.unusedExports.forEach(exportName => {
        console.log(`      ↳ ${exportName}`);
      });
      console.log('');
    });
  } else {
    console.log('\n✅ No unused exports found!');
  }
  
  // Calculate savings potential
  const wastePercentage = ((report.totalUnusedFiles / report.totalFiles) * 100).toFixed(1);
  console.log(`\n💡 OPTIMIZATION POTENTIAL:`);
  console.log(`   ${wastePercentage}% of files could potentially be removed`);
  
  if (report.totalUnusedFiles > 0 || report.totalUnusedExports > 0) {
    console.log('\n⚠️  NOTE: Please review these findings carefully before removing any code.');
    console.log('   Some code might be used dynamically or be intended for future use.');
    console.log('   UI components may be installed but not yet used.');
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const outputJson = args.includes('--json');
  const projectRoot = args.find(arg => !arg.startsWith('--')) || process.cwd();
  
  if (!outputJson) {
    console.log(`🚀 Starting unused code detection in: ${projectRoot}`);
  }
  
  const detector = new UnusedCodeDetector(projectRoot);
  const report = detector.analyze(outputJson);
  displayReport(report, outputJson);
}

export { UnusedCodeDetector, type UnusedCodeReport };