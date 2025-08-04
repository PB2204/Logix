import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const projectRoot = process.cwd();
    const scriptPath = path.join(projectRoot, 'scripts', 'detect-unused.ts');
    
    // Run the analysis script with JSON output
    const { stdout, stderr } = await execAsync(
      `npx tsx "${scriptPath}" --json "${projectRoot}"`,
      { 
        cwd: projectRoot,
        timeout: 30000 // 30 second timeout
      }
    );
    
    if (stderr) {
      console.warn('Analysis warnings:', stderr);
    }
    
    // Parse the JSON output
    const report = JSON.parse(stdout);
    
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error running code analysis:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to run code analysis',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}