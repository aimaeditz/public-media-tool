import { WORKING_TOOLS } from '../src/lib/tools-data/index';

const b1 = WORKING_TOOLS.slice(0, 500);

console.log(`Analyzing all ${b1.length} tools in Batch 1...`);

const report: Record<string, string[]> = {};

b1.forEach((tool, idx) => {
  const cat = tool.category;
  if (!report[cat]) report[cat] = [];
  report[cat].push(`#${idx + 1} [${tool.slug}] ${tool.name}`);
});

for (const [cat, tools] of Object.entries(report)) {
  console.log(`\n=== Category: ${cat} (${tools.length} tools) ===`);
  tools.forEach(t => console.log('  ' + t));
}
