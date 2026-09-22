import { WORKING_TOOLS } from '../src/lib/tools-data/index';

console.log('Total tools:', WORKING_TOOLS.length);

// Batch 3: 1000 to end
const batch3 = WORKING_TOOLS.slice(1000);
console.log(`Batch 3 count: ${batch3.length} (Index 1000: "${batch3[0].slug}" to Index ${WORKING_TOOLS.length - 1}: "${batch3[batch3.length - 1].slug}")`);

let missingFields = 0;
let emptyNameOrDesc = 0;

batch3.forEach((t, idx) => {
  if (!t.id || !t.slug || !t.name || !t.category || !t.description) {
    console.error(`Tool #${idx + 1001} (${t.slug}) missing essential fields`);
    missingFields++;
  }
  if (t.name.trim().length === 0 || t.description.trim().length === 0) {
    emptyNameOrDesc++;
  }
});

console.log(`Batch 3 inspection: ${missingFields} missing fields, ${emptyNameOrDesc} empty names/descriptions.`);
