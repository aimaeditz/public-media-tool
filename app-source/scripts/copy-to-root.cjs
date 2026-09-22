const fs = require('fs');
const path = require('path');

const appSourceDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(appSourceDir, '..');
const distDir = path.resolve(appSourceDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error(`[build:root] Dist directory not found at: ${distDir}`);
  process.exit(1);
}

// 1. Clean previous assets in repository root
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(rootAssets)) {
  console.log('[build:root] Cleaning existing root assets/ directory...');
  fs.rmSync(rootAssets, { recursive: true, force: true });
}

// 2. Copy all files and folders from dist/ into rootDir
const entries = fs.readdirSync(distDir, { withFileTypes: true });
for (const entry of entries) {
  const src = path.join(distDir, entry.name);
  const dest = path.join(rootDir, entry.name);
  fs.cpSync(src, dest, { recursive: true, force: true });
  console.log(`[build:root] Copied: ${entry.name} -> repository root`);
}

console.log('[build:root] Root updated with fresh static build successfully.');
