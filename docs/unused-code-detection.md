# Unused Code Detection Tool

This tool analyzes your Next.js TypeScript codebase to identify unused files and exports that could potentially be removed to clean up your project.

## Features

- **Unused File Detection**: Identifies files that are never imported anywhere in the codebase
- **Unused Export Detection**: Finds exported functions, variables, types, and components that are not used
- **Next.js Aware**: Understands Next.js file conventions (pages, layouts, API routes, etc.)
- **TypeScript Support**: Parses TypeScript files using the TypeScript compiler API
- **JSON Output**: Supports machine-readable JSON output for CI/CD integration

## Usage

### Basic Analysis

```bash
npm run detect-unused
```

This will analyze the entire codebase and display a detailed report with:
- Total number of files analyzed
- List of unused files
- List of files with unused exports
- Optimization potential percentage

### JSON Output

```bash
npm run detect-unused:json
```

This outputs the analysis results in JSON format, useful for:
- CI/CD pipelines
- Integration with other tools
- Automated reporting

### Example Output

```
📊 UNUSED CODE ANALYSIS REPORT
══════════════════════════════════════════════════

📈 SUMMARY:
   Total files analyzed: 90
   Unused files: 18
   Files with unused exports: 27
   Total unused exports: 111

🗑️ UNUSED FILES:
──────────────────────────────
   📄 src/components/ui/accordion.tsx
   📄 src/components/ui/alert-dialog.tsx
   📄 src/components/ui/calendar.tsx
   ...

🚫 UNUSED EXPORTS:
──────────────────────────────
   📄 src/components/ui/button.tsx
      ↳ ButtonVariant
      ↳ ButtonSize
   ...

💡 OPTIMIZATION POTENTIAL:
   20.0% of files could potentially be removed
```

## What Gets Detected

### Unused Files
Files are considered unused if they:
- Are not imported by any other file
- Are not Next.js entry points (pages, layouts, API routes)
- Are not configuration files
- Are not context providers used in layouts

### Unused Exports
Exports are considered unused if they:
- Are exported from a file but never imported elsewhere
- Are not used in component trees (detected through import analysis)

## What's Excluded from Analysis

The tool automatically excludes:
- **Next.js Entry Points**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- **API Routes**: Files ending with `route.ts`
- **Configuration Files**: `next.config.js`, `tailwind.config.ts`, `tsconfig.json`
- **Global Files**: `globals.css`, environment declaration files
- **Context Providers**: Files in `context/` directory ending with `Context.tsx`
- **AI/Genkit Files**: Files in `src/ai/` directory (used by Genkit framework)
- **Build Artifacts**: `node_modules`, `.next`, `dist`, `build` directories

## Important Notes

⚠️ **Review Before Removing**: Always review the findings carefully before removing any code:

1. **Dynamic Imports**: Code might be imported dynamically at runtime
2. **Future Use**: Components might be prepared for future features
3. **External References**: Code might be referenced by external tools or configurations
4. **Development Tools**: Some files might be used in development workflows

## Common Findings Explained

### UI Components
Many UI components (like those from shadcn/ui) might show as unused because:
- They're recently added but not yet implemented
- They're part of a design system for future use
- They're used conditionally or dynamically

### Page Components
Next.js page components export default functions that might show as "unused exports" because:
- Next.js automatically imports them based on file system routing
- The exports are not explicitly imported elsewhere in the code

### Type Definitions
TypeScript interfaces and types might appear unused if:
- They're used only in type annotations
- They're part of a larger type system for future expansion

## Integration with CI/CD

You can integrate this tool into your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Check for unused code
  run: |
    npm run detect-unused:json > unused-analysis.json
    # Process the JSON output as needed
```

## Limitations

1. **Static Analysis Only**: The tool performs static analysis and cannot detect runtime usage
2. **Dynamic Imports**: Cannot detect `import()` or `require()` calls with dynamic paths
3. **JSX Usage**: Complex JSX patterns might not be fully tracked
4. **External Tools**: Cannot detect usage by external tools or build processes

## Contributing

The tool is located in `/scripts/detect-unused.ts` and can be extended to:
- Add more sophisticated import tracking
- Include additional file type support
- Enhance Next.js convention detection
- Add more output formats