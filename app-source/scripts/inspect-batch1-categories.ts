import { WORKING_TOOLS } from '../src/lib/tools-data/index';
const b1 = WORKING_TOOLS.slice(0, 500);

function listCategory(cat: string) {
  console.log(`\n=== Category: ${cat} ===`);
  b1.filter(t => t.category === cat).forEach((t, i) => {
    console.log(`${i + 1}. #${WORKING_TOOLS.indexOf(t) + 1} [${t.slug}] ${t.name}: ${t.shortDesc}`);
  });
}

listCategory('Education');
listCategory('Productivity');
listCategory('Generators');
listCategory('Scientific Converters');
listCategory('Math Calculators');
listCategory('Math Tools');
listCategory('Finance Tools');
listCategory('Financial Calculators');
listCategory('Everyday Calculators');
listCategory('Date & Time');
listCategory('Health & Fitness');
