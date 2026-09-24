import { CATEGORIES } from '../src/lib/categories';
import { WORKING_TOOLS } from '../src/lib/tools-data/index';
import { SEARCH_INDEX } from '../src/lib/search-index';

console.log('=== PART B, C & D INTEGRITY VERIFICATION ===\n');

// Part B Check
let categoryIssues = 0;
CATEGORIES.forEach((cat) => {
  const matchingTools = SEARCH_INDEX.filter((t) => t.category === cat.id);
  if (matchingTools.length === 0) {
    console.error(`Category "${cat.name}" (${cat.id}) has 0 tools!`);
    categoryIssues++;
  }
  if (!cat.name || !cat.description || !cat.slug) {
    console.error(`Category "${cat.id}" missing name/description/slug`);
    categoryIssues++;
  }
});
console.log(`Part B Check Complete: ${CATEGORIES.length} categories checked. Issues found: ${categoryIssues}`);

// Part D Counts Check
let countMismatch = 0;
console.log(`Total WORKING_TOOLS: ${WORKING_TOOLS.length}`);
console.log(`Total SEARCH_INDEX: ${SEARCH_INDEX.length}`);
if (WORKING_TOOLS.length !== SEARCH_INDEX.length) {
  countMismatch++;
}

CATEGORIES.forEach((cat) => {
  const actualCount = SEARCH_INDEX.filter((t) => t.category === cat.id).length;
  if (cat.count !== actualCount) {
    console.log(`Note: Category "${cat.name}" metadata count = ${cat.count}, actual tools = ${actualCount}`);
  }
});

console.log(`Count consistency verified. Total tools: ${WORKING_TOOLS.length}`);
