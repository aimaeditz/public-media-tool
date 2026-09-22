import fs from 'fs';
import path from 'path';

async function verifyAll() {
  console.log('=== VERIFYING PROJECT DEDUPLICATION ===');

  // 1. Check category chunks
  const chunksDir = path.resolve('./src/lib/data/category-chunks');
  const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

  const allSlugs = new Map<string, string>();
  const allNames = new Map<string, string>();
  let totalTools = 0;

  for (const f of files) {
    const mod = await import(`../src/lib/data/category-chunks/${f.replace('.ts', '')}`);
    const tools = mod.tools || mod.default || [];
    totalTools += tools.length;

    for (const t of tools) {
      if (allSlugs.has(t.slug)) {
        console.error(`ERROR: Duplicate slug found: "${t.slug}" in ${f} (already seen in ${allSlugs.get(t.slug)})`);
      }
      allSlugs.set(t.slug, f);

      const cleanName = t.name.toLowerCase().trim();
      if (allNames.has(cleanName)) {
        console.error(`ERROR: Duplicate name found: "${t.name}" in ${f} (already seen in ${allNames.get(cleanName)})`);
      }
      allNames.set(cleanName, f);
    }
  }

  console.log(`Total category chunk files: ${files.length}`);
  console.log(`Total tools in chunk files: ${totalTools}`);
  console.log(`Unique slugs: ${allSlugs.size}`);
  console.log(`Unique names: ${allNames.size}`);

  // 2. Check search-index
  const { SEARCH_INDEX } = await import('../src/lib/search-index');
  console.log(`SEARCH_INDEX count: ${SEARCH_INDEX.length}`);

  // 3. Check categories
  const { CATEGORIES, STATIC_CATEGORIES } = await import('../src/lib/categories');
  console.log(`STATIC_CATEGORIES count: ${STATIC_CATEGORIES.length}`);

  // 4. Check tools-data
  const { WORKING_TOOLS, TOOLS, TOTAL_TOOLS, TOTAL_CATEGORIES } = await import('../src/lib/tools-data');
  console.log(`WORKING_TOOLS count: ${WORKING_TOOLS.length}`);
  console.log(`TOTAL_TOOLS constant: ${TOTAL_TOOLS}`);
  console.log(`TOTAL_CATEGORIES constant: ${TOTAL_CATEGORIES}`);

  if (totalTools === allSlugs.size && totalTools === allNames.size && totalTools === SEARCH_INDEX.length && totalTools === WORKING_TOOLS.length) {
    console.log('✅ PERFECT! Every tool is 100% unique and appears exactly once across all systems!');
  } else {
    console.error('❌ Mismatch detected!');
  }
}

verifyAll().catch(console.error);
