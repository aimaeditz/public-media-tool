import { WORKING_TOOLS } from '../src/lib/tools-data/index';

console.log('Total tools:', WORKING_TOOLS.length);

// Batch 2: 500 to 1000
const batch2 = WORKING_TOOLS.slice(500, 1000);
console.log(`Batch 2 count: ${batch2.length} (Index 500: "${batch2[0].slug}" to Index 999: "${batch2[batch2.length - 1].slug}")`);

let missingFields = 0;
let emptyNameOrDesc = 0;

batch2.forEach((t, idx) => {
  if (!t.id || !t.slug || !t.name || !t.category || !t.description) {
    console.error(`Tool #${idx + 501} (${t.slug}) missing essential fields`);
    missingFields++;
  }
  if (t.name.trim().length === 0 || t.description.trim().length === 0) {
    emptyNameOrDesc++;
  }
});

console.log(`Batch 2 inspection: ${missingFields} missing fields, ${emptyNameOrDesc} empty names/descriptions.`);
