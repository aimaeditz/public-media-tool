import { WORKING_TOOLS } from '../src/lib/tools-data/index';

console.log('Total tools:', WORKING_TOOLS.length);

// Batch 1: 0 to 500
const batch1 = WORKING_TOOLS.slice(0, 500);
console.log(`Batch 1 count: ${batch1.length} (${batch1[0].slug} to ${batch1[batch1.length - 1].slug})`);

let missingFields = 0;
let emptyNameOrDesc = 0;

batch1.forEach((t, idx) => {
  if (!t.id || !t.slug || !t.name || !t.category || !t.description) {
    console.error(`Tool #${idx + 1} (${t.slug}) missing essential fields`);
    missingFields++;
  }
  if (t.name.trim().length === 0 || t.description.trim().length === 0) {
    emptyNameOrDesc++;
  }
});

console.log(`Batch 1 inspection: ${missingFields} missing fields, ${emptyNameOrDesc} empty names/descriptions.`);
