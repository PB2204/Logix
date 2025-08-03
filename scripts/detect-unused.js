#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Run the TypeScript file directly using ts-node
const scriptPath = path.join(__dirname, 'detect-unused.ts');
const projectRoot = process.argv[2] || process.cwd();

try {
  console.log('🚀 Running unused code detection...\n');
  execSync(`npx ts-node "${scriptPath}" "${projectRoot}"`, { 
    stdio: 'inherit',
    cwd: path.dirname(__dirname)
  });
} catch (error) {
  console.error('❌ Error running unused code detection:', error.message);
  process.exit(1);
}