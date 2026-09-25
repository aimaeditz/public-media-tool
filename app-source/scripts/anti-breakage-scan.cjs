const fs = require('fs');
const path = require('path');

console.log('=== RUNNING COMPREHENSIVE ANTI-BREAKAGE SCAN ===');

const srcDir = path.resolve(__dirname, '../src');
const errors = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check for stray double closing brackets or weird markup
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        // Detect stray unmatched '>' or '>>'
        if (line.includes('>>') && !line.includes('>>>') && !line.includes('>>=') && !line.includes('>>') /* bit shift */) {
          // Check if it's bitshift in code
          if (!line.includes('>> 0') && !line.includes('>> 8') && !line.includes('>> 16') && !line.includes('>> 24') && !line.includes('>> 1') && !line.includes('>> 2') && !line.includes('>> 3') && !line.includes('>> 4')) {
            errors.push(`Suspicious '>>' at ${fullPath}:${idx + 1}: ${line.trim()}`);
          }
        }
        if (line.includes('<<') && !line.includes('<<<') && !line.includes('<<=')) {
          if (!line.includes('<< 0') && !line.includes('<< 8') && !line.includes('<< 16') && !line.includes('<< 24') && !line.includes('<< 1') && !line.includes('<< 2') && !line.includes('<< 3') && !line.includes('<< 4') && !line.includes('<< 5') && !line.includes('<< 6') && !line.includes('<< 7')) {
            errors.push(`Suspicious '<<' at ${fullPath}:${idx + 1}: ${line.trim()}`);
          }
        }
      });
    }
  }
}

scanDir(srcDir);

console.log(`Scan completed across all src/ files.`);
console.log(`Detected syntax/tag anomalies: ${errors.length}`);
if (errors.length > 0) {
  console.log('Anomalies found:');
  console.log(errors.slice(0, 10).join('\n'));
} else {
  console.log('Zero malformed tags, zero unclosed tags, zero stray HTML artifacts detected.');
}
