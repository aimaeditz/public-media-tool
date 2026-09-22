const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let distDir = path.resolve(rootDir, 'dist_root');
console.log('rootDir:', rootDir);
console.log('distDir initially:', distDir, 'exists:', fs.existsSync(distDir));
if (!fs.existsSync(distDir)) {
  distDir = path.resolve(rootDir, 'app-source', 'dist');
  console.log('distDir fallback:', distDir, 'exists:', fs.existsSync(distDir));
}

// Exceptions that should NOT be deleted
const keepList = new Set([
  'app-source',
  'scripts-deploy',
  '.git',
  '.gitignore',
  'README.md',
  'metadata.json',
  'package.json',
  'dist_root',
  'dist'
]);

console.log('Cleaning repository root...');

if (fs.existsSync(rootDir)) {
  const items = fs.readdirSync(rootDir);
  for (const item of items) {
    if (keepList.has(item)) {
      continue;
    }
    const itemPath = path.join(rootDir, item);
    try {
      if (fs.statSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(itemPath);
      }
    } catch (err) {
      console.error(`Error deleting ${item}:`, err.message);
    }
  }
}

console.log('Copying build output to repository root...');
if (fs.existsSync(distDir)) {
  const distItems = fs.readdirSync(distDir);
  for (const item of distItems) {
    const srcPath = path.join(distDir, item);
    const destPath = path.join(rootDir, item);
    try {
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    } catch (err) {
      console.error(`Error copying ${item}:`, err.message);
    }
  }
  
  console.log('Deleting dist_root directory...');
  fs.rmSync(distDir, { recursive: true, force: true });
} else {
  console.error('dist_root folder not found! Make sure build succeeded.');
}

console.log('Build output successfully copied to root!');
