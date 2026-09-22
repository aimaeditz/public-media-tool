import { TOOLS, CATEGORIES } from '../src/lib/tools-data';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('./src/lib/data/category-chunks');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Group tools by category ID/Name
const grouped: Record<string, typeof TOOLS> = {};

// Initialize all categories with an empty array
CATEGORIES.forEach(cat => {
  grouped[cat.id] = [];
});

// Also handle any other tools whose category might not be in the list
TOOLS.forEach(tool => {
  const catId = tool.category;
  if (!grouped[catId]) {
    grouped[catId] = [];
  }
  grouped[catId].push(tool);
});

// Write each category to a file
console.log('Writing category chunks...');
CATEGORIES.forEach(cat => {
  const toolsInCat = grouped[cat.id] || [];
  const fileContent = `import { Tool } from '../../types';\n\nexport const tools: Tool[] = ${JSON.stringify(toolsInCat, null, 2)};\nexport default tools;\n`;
  const fileName = `${cat.slug}.ts`;
  fs.writeFileSync(path.join(outDir, fileName), fileContent, 'utf-8');
  console.log(`Wrote ${toolsInCat.length} tools to ${fileName}`);
});

console.log('Category split completed successfully!');
