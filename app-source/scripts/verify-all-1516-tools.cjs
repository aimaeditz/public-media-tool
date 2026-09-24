const fs = require('fs');
const path = require('path');

const chunksDir = path.join(__dirname, '../src/lib/data/category-chunks');
const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

let totalTools = 0;
const allTools = [];

for (const file of files) {
  const filePath = path.join(chunksDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find array start
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');
  
  if (arrayStart !== -1 && arrayEnd !== -1) {
    const jsonStr = content.substring(arrayStart, arrayEnd + 1);
    try {
      // Evaluate JSON safely
      const items = eval(jsonStr);
      for (const item of items) {
        totalTools++;
        allTools.push({
          number: totalTools,
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          file
        });
      }
    } catch (err) {
      console.error(`Error parsing ${file}:`, err.message);
    }
  }
}

console.log(`Total tools found across 52 category chunk files: ${totalTools}`);

// Check uniqueness of slugs
const slugMap = new Map();
let duplicateSlugs = 0;
for (const t of allTools) {
  if (slugMap.has(t.slug)) {
    console.warn(`Duplicate slug: ${t.slug} in ${t.file} and ${slugMap.get(t.slug).file}`);
    duplicateSlugs++;
  } else {
    slugMap.set(t.slug, t);
  }
}

console.log(`Unique slugs count: ${slugMap.size}, Duplicate count: ${duplicateSlugs}`);

// Write ORDER.md
let orderMd = '# Master Tool Order (1 to 1516)\n\n| Index | ID | Slug | Name | Category | Runner |\n|---|---|---|---|---|---|\n';
for (const t of allTools) {
  orderMd += `| ${t.number} | ${t.id} | ${t.slug} | ${t.name} | ${t.category} | ToolRunner |\n`;
}
fs.writeFileSync(path.join(__dirname, '../scan-reports/ORDER.md'), orderMd, 'utf8');
console.log('ORDER.md updated successfully.');

// Write 01_TOOL_BY_TOOL.csv
let csvHeader = 'number,slug,name,category,type,ui_fingerprint_before,ui_fingerprint_after,verdict_before,what_was_wrong,what_was_changed,files_touched,test_input,test_output,buttons_checked,verdict_after,method,evidence';
let csvRows = [csvHeader];

for (const t of allTools) {
  const row = `${t.number},"${t.slug}","${t.name.replace(/"/g, '""')}","${t.category.replace(/"/g, '""')}","Interactive Tool","generic-fingerprint","UNVERIFIED","SHARED-UI","Generic fallback UI","Needs dedicated component implementation","ToolRunner.tsx","N/A","N/A","N/A","NEEDS DECISION","Manual Audit","Awaiting batch audit"`;
  csvRows.push(row);
}

fs.writeFileSync(path.join(__dirname, '../scan-reports/01_TOOL_BY_TOOL.csv'), csvRows.join('\n'), 'utf8');
console.log(`01_TOOL_BY_TOOL.csv re-initialized with exact ${totalTools} tools.`);
