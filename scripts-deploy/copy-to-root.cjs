const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distRoot = path.join(rootDir, 'dist_root');
const appSource = path.join(rootDir, 'app-source');
const scriptsDeploy = path.join(rootDir, 'scripts-deploy');

const keepFiles = new Set([
  'app-source',
  'scripts-deploy',
  '.git',
  '.gitignore',
  'README.md',
  'metadata.json',
  'package.json',
  '.env.example',
  'package-lock.json',
  'bun.lock',
  'bun.lockb',
  'dist_root',
  'node_modules'
]);

// Helper to delete recursively
function deleteRecursive(itemPath) {
  if (fs.existsSync(itemPath)) {
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      fs.readdirSync(itemPath).forEach((file) => {
        deleteRecursive(path.join(itemPath, file));
      });
      fs.rmdirSync(itemPath);
    } else {
      fs.unlinkSync(itemPath);
    }
  }
}

// Helper to copy recursively
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((child) => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Deploy script: Cleaning repository root...');

// 1. Delete everything in root EXCEPT keepFiles
fs.readdirSync(rootDir).forEach((item) => {
  if (keepFiles.has(item)) {
    return;
  }
  const itemPath = path.join(rootDir, item);
  console.log(`Deleting: ${item}`);
  deleteRecursive(itemPath);
});

// 2. Copy every file from dist_root to rootDir
if (fs.existsSync(distRoot)) {
  console.log('Deploy script: Copying build output to repository root...');
  fs.readdirSync(distRoot).forEach((item) => {
    const srcPath = path.join(distRoot, item);
    const destPath = path.join(rootDir, item);
    copyRecursive(srcPath, destPath);
  });
  
  // 3. Delete dist_root folder
  console.log('Deploy script: Cleaning up dist_root...');
  deleteRecursive(distRoot);
} else {
  console.error('Error: dist_root folder not found!');
}

console.log('Deploy script: Finished successfully!');
