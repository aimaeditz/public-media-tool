import { WORKING_TOOLS } from '../src/lib/tools-data/index';

const b1 = WORKING_TOOLS.slice(0, 500);

console.log(`First tool: #${1} ${b1[0].name} (${b1[0].slug}) [${b1[0].category}]`);
console.log(`Last tool: #${500} ${b1[499].name} (${b1[499].slug}) [${b1[499].category}]`);

// Write all 500 tools to a JSON file to inspect
import * as fs from 'fs';

fs.writeFileSync(
  'batch1-tools-list.json',
  JSON.stringify(
    b1.map((t, idx) => ({
      index: idx + 1,
      id: t.id,
      name: t.name,
      slug: t.slug,
      category: t.category,
      shortDesc: t.shortDesc,
    })),
    null,
    2
  )
);

console.log('Saved batch1-tools-list.json');
