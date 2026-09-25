const fs = require('fs');
const path = require('path');

const ORDERED_TOOLS_PATH = path.resolve(__dirname, 'ordered-tools.json');
const CHUNKS_DIR = path.resolve(__dirname, '../src/lib/data/category-chunks');
const SEARCH_INDEX_PATH = path.resolve(__dirname, '../src/lib/search-index.ts');

const orderedTools = JSON.parse(fs.readFileSync(ORDERED_TOOLS_PATH, 'utf8'));
const batch1 = orderedTools.slice(0, 100);

// Load all chunks
const chunkFiles = fs.readdirSync(CHUNKS_DIR);
const allTools = [];
const chunkErrors = [];

for (const file of chunkFiles) {
  const filePath = path.join(CHUNKS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for malformed characters / unclosed tags
  if (content.includes('>>') || content.includes('<<') || content.includes('undefined') || content.includes('NaN')) {
    chunkErrors.push(`Malformed text in ${file}`);
  }

  const match = content.match(/export const tools: Tool\[\] = (\[[\s\S]*\]);/);
  if (match) {
    try {
      const parsed = JSON.parse(match[1]);
      for (const t of parsed) {
        allTools.push({ ...t, _file: file });
      }
    } catch (e) {
      chunkErrors.push(`JSON parse error in ${file}: ${e.message}`);
    }
  } else {
    chunkErrors.push(`No tools export found in ${file}`);
  }
}

console.log('================================================================');
console.log('           BATCH 1 PROGRAMMATIC SEO VERIFICATION AUDIT          ');
console.log('================================================================');
console.log(`Total System Tools: ${allTools.length} / 1516`);
console.log(`Batch 1 Range: Tool #1 to Tool #100`);

let auditedCount = 0;
let errors = [];
let totalKeywordsGenerated = 0;

for (let i = 0; i < batch1.length; i++) {
  const target = batch1[i];
  const found = allTools.find(t => t.slug === target.slug || t.id === target.id);

  if (!found) {
    errors.push(`[Tool #${i + 1}] Missing in chunk files: ${target.slug}`);
    continue;
  }

  const numKeywords = (found.keywords && Array.isArray(found.keywords)) ? found.keywords.length : 0;
  const numTags = (found.tags && Array.isArray(found.tags)) ? found.tags.length : 0;
  const numFaqs = (found.faqs && Array.isArray(found.faqs)) ? found.faqs.length : 0;
  const numSteps = (found.howToUse && Array.isArray(found.howToUse)) ? found.howToUse.length : 0;

  totalKeywordsGenerated += numKeywords;

  // Validate SEO title, meta, schema requirements
  const titleValid = !!found.name && found.name.length > 3;
  const descValid = !!(found.shortDesc || found.description);
  const slugValid = /^[a-z0-9-]+$/.test(found.slug);
  const keywordsValid = numKeywords >= 40; // ~50 target
  const stepsValid = numSteps >= 3;
  const faqsValid = numFaqs >= 2;

  if (!titleValid || !descValid || !slugValid || !keywordsValid || !stepsValid || !faqsValid) {
    errors.push(`[Tool #${i + 1}] ${found.slug} validation failed: title=${titleValid}, desc=${descValid}, slug=${slugValid}, keywords=${numKeywords}, steps=${numSteps}, faqs=${numFaqs}`);
  } else {
    auditedCount++;
  }
}

console.log('----------------------------------------------------------------');
console.log(`Audited & Verified: ${auditedCount} / 100 tools`);
console.log(`Total Target Keywords Injected in Batch 1: ${totalKeywordsGenerated}`);
console.log(`Average Keywords per Tool: ${(totalKeywordsGenerated / auditedCount).toFixed(1)}`);
console.log(`Chunk Errors: ${chunkErrors.length}`);
console.log(`Validation Errors: ${errors.length}`);
console.log('----------------------------------------------------------------');

if (errors.length > 0 || chunkErrors.length > 0) {
  console.error('VERIFICATION FAILED:');
  console.error([...chunkErrors, ...errors].join('\n'));
  process.exit(1);
} else {
  console.log('STATUS: PASSED (Zero malformed tags, zero broken slugs, all 100 tools verified)');
  console.log('Sample Batch 1 Optimized Tool (Tool #1: ' + batch1[0].slug + '):');
  const sample = allTools.find(t => t.slug === batch1[0].slug);
  console.log(JSON.stringify({
    name: sample.name,
    slug: sample.slug,
    category: sample.category,
    keyword_count: sample.keywords?.length,
    sample_keywords: sample.keywords?.slice(0, 8),
    faqs_count: sample.faqs?.length,
    how_to_steps_count: sample.howToUse?.length
  }, null, 2));
}
