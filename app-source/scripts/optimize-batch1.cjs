const fs = require('fs');
const path = require('path');

const ORDERED_TOOLS_PATH = path.resolve(__dirname, 'ordered-tools.json');
const CHUNKS_DIR = path.resolve(__dirname, '../src/lib/data/category-chunks');
const SEARCH_INDEX_PATH = path.resolve(__dirname, '../src/lib/search-index.ts');

const orderedTools = JSON.parse(fs.readFileSync(ORDERED_TOOLS_PATH, 'utf8'));

// Batch 1: Tools 1 to 100 (indices 0 to 99)
const BATCH_NUM = 1;
const BATCH_START = 0;
const BATCH_END = 100;
const batchTools = orderedTools.slice(BATCH_START, BATCH_END);

console.log(`=== STARTING OPTIMIZATION FOR BATCH ${BATCH_NUM} (Tools ${BATCH_START + 1} to ${BATCH_END}) ===`);

// Domain-specific keyword expansion patterns
function generateKeywordsForTool(tool) {
  const name = tool.name;
  const slug = tool.slug;
  const category = tool.category || '';
  const cleanName = name.replace(/[()\/\\#,+()$~%.'":*?<>{}]/g, '').trim();
  const words = cleanName.toLowerCase().split(/\s+/).filter(w => w.length > 2);

  const keywordsSet = new Set();

  // 1. Core exact & slug variations
  keywordsSet.add(cleanName.toLowerCase());
  keywordsSet.add(slug.replace(/-/g, ' '));
  keywordsSet.add(`${cleanName.toLowerCase()} online`);
  keywordsSet.add(`free ${cleanName.toLowerCase()}`);
  keywordsSet.add(`online ${cleanName.toLowerCase()} tool`);
  keywordsSet.add(`${cleanName.toLowerCase()} free`);
  keywordsSet.add(`browser ${cleanName.toLowerCase()}`);
  keywordsSet.add(`best ${cleanName.toLowerCase()}`);
  keywordsSet.add(`instant ${cleanName.toLowerCase()}`);

  // 2. Client-side, privacy, and zero-install angles
  keywordsSet.add(`private ${cleanName.toLowerCase()}`);
  keywordsSet.add(`client side ${cleanName.toLowerCase()}`);
  keywordsSet.add(`${cleanName.toLowerCase()} no signup`);
  keywordsSet.add(`${cleanName.toLowerCase()} no login`);
  keywordsSet.add(`${cleanName.toLowerCase()} without registration`);
  keywordsSet.add(`${cleanName.toLowerCase()} safe private`);
  keywordsSet.add(`${cleanName.toLowerCase()} zero upload`);
  keywordsSet.add(`${cleanName.toLowerCase()} web utility`);

  // 3. Action and how-to intent
  keywordsSet.add(`how to use ${cleanName.toLowerCase()}`);
  keywordsSet.add(`how to ${words.slice(0, 3).join(' ')} online`);
  keywordsSet.add(`easy ${cleanName.toLowerCase()} online`);
  keywordsSet.add(`quick ${cleanName.toLowerCase()}`);
  keywordsSet.add(`simple ${cleanName.toLowerCase()}`);

  // 4. Category and departmental cross-matching
  if (category) {
    const catLower = category.toLowerCase();
    keywordsSet.add(`${cleanName.toLowerCase()} ${catLower}`);
    keywordsSet.add(`${catLower} tools online`);
    keywordsSet.add(`free ${catLower} utilities`);
    keywordsSet.add(`best ${cleanName.toLowerCase()} in ${catLower}`);
  }

  // 5. Professional & persona-targeted variations
  const personas = ['developers', 'students', 'professionals', 'engineers', 'creators', 'businesses', 'accountants', 'designers'];
  for (const p of personas.slice(0, 5)) {
    keywordsSet.add(`${cleanName.toLowerCase()} for ${p}`);
  }

  // 6. Technical / functional queries based on tool type
  const isCalc = slug.includes('calc') || slug.includes('converter') || slug.includes('calculator') || slug.includes('estimator') || slug.includes('solver') || slug.includes('formula');
  const isGen = slug.includes('generator') || slug.includes('builder') || slug.includes('maker') || slug.includes('creator');
  const isSecurity = slug.includes('password') || slug.includes('hash') || slug.includes('crypto') || slug.includes('cipher') || slug.includes('security') || slug.includes('jwt');
  const isPdf = slug.includes('pdf');
  const isAudio = slug.includes('audio') || slug.includes('music') || slug.includes('sound') || slug.includes('tempo') || slug.includes('waveform') || slug.includes('chord');
  const isMedia = slug.includes('image') || slug.includes('photo') || slug.includes('video') || slug.includes('color') || slug.includes('filter');

  if (isCalc) {
    keywordsSet.add(`${cleanName.toLowerCase()} calculation`);
    keywordsSet.add(`${cleanName.toLowerCase()} formula`);
    keywordsSet.add(`accurate ${cleanName.toLowerCase()}`);
    keywordsSet.add(`instant ${cleanName.toLowerCase()} results`);
    keywordsSet.add(`calculate ${words.slice(0, 2).join(' ')} accurately`);
    keywordsSet.add(`${cleanName.toLowerCase()} step by step`);
    keywordsSet.add(`online math ${cleanName.toLowerCase()}`);
  }

  if (isGen) {
    keywordsSet.add(`generate ${words.slice(0, 2).join(' ')} fast`);
    keywordsSet.add(`random ${cleanName.toLowerCase()}`);
    keywordsSet.add(`custom ${cleanName.toLowerCase()}`);
    keywordsSet.add(`automated ${cleanName.toLowerCase()}`);
    keywordsSet.add(`${cleanName.toLowerCase()} download`);
    keywordsSet.add(`${cleanName.toLowerCase()} copy paste`);
  }

  if (isSecurity) {
    keywordsSet.add(`cryptographically secure ${cleanName.toLowerCase()}`);
    keywordsSet.add(`high entropy ${cleanName.toLowerCase()}`);
    keywordsSet.add(`browser crypto ${cleanName.toLowerCase()}`);
    keywordsSet.add(`offline capable ${cleanName.toLowerCase()}`);
    keywordsSet.add(`safe ${cleanName.toLowerCase()} generator`);
    keywordsSet.add(`${cleanName.toLowerCase()} SHA standards`);
  }

  if (isPdf) {
    keywordsSet.add(`free pdf ${cleanName.toLowerCase()}`);
    keywordsSet.add(`pdf document ${cleanName.toLowerCase()}`);
    keywordsSet.add(`fast pdf ${cleanName.toLowerCase()} browser`);
    keywordsSet.add(`secure client side pdf ${cleanName.toLowerCase()}`);
    keywordsSet.add(`edit pdf ${words.slice(0, 2).join(' ')}`);
  }

  if (isAudio) {
    keywordsSet.add(`web audio ${cleanName.toLowerCase()}`);
    keywordsSet.add(`client side audio ${cleanName.toLowerCase()}`);
    keywordsSet.add(`music production ${cleanName.toLowerCase()}`);
    keywordsSet.add(`audio editor ${cleanName.toLowerCase()}`);
    keywordsSet.add(`real time sound ${cleanName.toLowerCase()}`);
  }

  if (isMedia) {
    keywordsSet.add(`online visual ${cleanName.toLowerCase()}`);
    keywordsSet.add(`client side image ${cleanName.toLowerCase()}`);
    keywordsSet.add(`lossless ${cleanName.toLowerCase()}`);
    keywordsSet.add(`high resolution ${cleanName.toLowerCase()}`);
  }

  // Add more relevant search long-tails until ~50 keywords
  const modifiers = [
    '2026', 'desktop mobile', 'fastest', 'modern', 'free download', 'instant output',
    'web app', 'open web utility', 'no ads hassle', 'trusted', 'secure local',
    'unlimited usage', 'high precision', 'clean interface', 'productive web tool',
    'workflow utility', 'standalone tool', 'browser extension alternative'
  ];

  for (const mod of modifiers) {
    if (keywordsSet.size >= 52) break;
    keywordsSet.add(`${cleanName.toLowerCase()} ${mod}`);
  }

  return Array.from(keywordsSet).slice(0, 50);
}

// Read all category chunk files
const chunkFiles = fs.readdirSync(CHUNKS_DIR);
const chunkDataMap = {};

for (const file of chunkFiles) {
  const filePath = path.join(CHUNKS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const tools: Tool\[\] = (\[[\s\S]*\]);/);
  if (match) {
    try {
      const tools = JSON.parse(match[1]);
      chunkDataMap[file] = { filePath, tools };
    } catch (e) {
      console.error(`Error parsing ${file}:`, e.message);
    }
  }
}

// Process Batch 1 tools
let optimizedCount = 0;
const optimizedSlugs = new Set();

for (const batchItem of batchTools) {
  let found = false;
  for (const [file, data] of Object.entries(chunkDataMap)) {
    const toolIndex = data.tools.findIndex(t => t.slug === batchItem.slug || t.id === batchItem.id);
    if (toolIndex !== -1) {
      const tool = data.tools[toolIndex];
      const keywords = generateKeywordsForTool(tool);

      // Enhanced structured How-To
      const howToUse = (tool.howToUse && tool.howToUse.length >= 3) ? tool.howToUse : [
        {
          step: 1,
          title: 'Configure Input Parameters',
          desc: `Enter or customize the required parameters and settings for ${tool.name}.`
        },
        {
          step: 2,
          title: 'Execute Client-Side Processing',
          desc: 'The tool executes instantly in your browser using local high-performance Web APIs.'
        },
        {
          step: 3,
          title: 'Export & Copy Results',
          desc: 'Copy formatted output or download generated assets directly with complete privacy.'
        }
      ];

      // Enhanced structured FAQs
      const faqs = (tool.faqs && tool.faqs.length >= 2) ? tool.faqs : [
        {
          question: `Is ${tool.name} completely free to use?`,
          answer: `Yes, ${tool.name} is 100% free with unlimited local browser operations and no account registration required.`
        },
        {
          question: `How does ${tool.name} protect my privacy?`,
          answer: `All computations and processing run 100% client-side directly within your browser session. Zero data or inputs are uploaded to external servers.`
        },
        {
          question: `Does ${tool.name} work on mobile devices?`,
          answer: `Yes, this utility is fully responsive and optimized for instant performance across desktop, tablet, and mobile browsers.`
        }
      ];

      // Merge enriched fields
      const updatedTool = {
        ...tool,
        keywords: keywords,
        tags: Array.from(new Set([...(tool.tags || []), ...keywords.slice(0, 10)])),
        howToUse: howToUse,
        faqs: faqs
      };

      data.tools[toolIndex] = updatedTool;
      optimizedCount++;
      optimizedSlugs.add(tool.slug);
      found = true;
      break;
    }
  }
  if (!found) {
    console.warn(`WARNING: Batch tool not found in chunks: ${batchItem.slug}`);
  }
}

// Write back updated chunk files
for (const [file, data] of Object.entries(chunkDataMap)) {
  const outputContent = `import { Tool } from '../../types';\n\nexport const tools: Tool[] = ${JSON.stringify(data.tools, null, 2)};\n`;
  fs.writeFileSync(data.filePath, outputContent, 'utf8');
}

console.log(`Successfully updated category chunks. Total batch tools optimized: ${optimizedCount}/100.`);

// Update search index with keywords
console.log('Synchronizing search index...');
const allUpdatedTools = [];
for (const [file, data] of Object.entries(chunkDataMap)) {
  allUpdatedTools.push(...data.tools);
}

const searchIndexEntries = allUpdatedTools.map(t => ({
  id: t.id,
  slug: t.slug,
  name: t.name,
  shortDesc: t.shortDesc,
  category: t.category,
  iconName: t.iconName,
  usageCount: t.usageCount,
  tags: t.tags || [],
  keywords: t.keywords ? t.keywords.slice(0, 15) : []
}));

const searchIndexContent = `export interface SearchItem {\n  id: string;\n  slug: string;\n  name: string;\n  shortDesc: string;\n  category: string;\n  iconName: string;\n  usageCount: number;\n  tags: string[];\n  keywords?: string[];\n}\n\nexport const SEARCH_INDEX: SearchItem[] = ${JSON.stringify(searchIndexEntries, null, 2)};\n`;

fs.writeFileSync(SEARCH_INDEX_PATH, searchIndexContent, 'utf8');
console.log(`Search index successfully synchronized with ${searchIndexEntries.length} items.`);
