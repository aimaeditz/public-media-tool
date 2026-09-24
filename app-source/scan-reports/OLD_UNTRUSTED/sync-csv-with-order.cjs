const fs = require('fs');
const path = require('path');

const orderMdPath = path.join(__dirname, '../scan-reports/ORDER.md');
const csvPath = path.join(__dirname, '../scan-reports/01_TOOL_BY_TOOL.csv');

const orderContent = fs.readFileSync(orderMdPath, 'utf8');
const lines = orderContent.split('\n');

const tools = [];
for (const line of lines) {
  if (line.startsWith('|') && !line.includes('Index') && !line.includes('---|')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 7) {
      const idx = parseInt(parts[1], 10);
      const slug = parts[3];
      const name = parts[4];
      const category = parts[5];
      const runner = parts[6];
      if (!isNaN(idx)) {
        tools.push({ idx, slug, name, category, runner });
      }
    }
  }
}

console.log(`Parsed ${tools.length} tools from ORDER.md.`);

let csvLines = [
  'number,slug,name,category,type,ui_fingerprint_before,ui_fingerprint_after,verdict_before,what_was_wrong,what_was_changed,files_touched,test_input,test_output,buttons_checked,verdict_after,method,evidence'
];

for (const t of tools) {
  // Default unverified state matching ORDER.md
  const row = `${t.idx},"${t.slug}","${t.name.replace(/"/g, '""')}","${t.category.replace(/"/g, '""')}","Interactive Tool","generic-fingerprint","UNVERIFIED","SHARED-UI","Generic fallback UI","Needs dedicated component implementation","${t.runner}","N/A","N/A","N/A","NEEDS DECISION","Manual Audit","Awaiting batch audit"`;
  csvLines.push(row);
}

fs.writeFileSync(csvPath, csvLines.join('\n'), 'utf8');
console.log(`Updated 01_TOOL_BY_TOOL.csv with ${tools.length} rows aligned with ORDER.md.`);
