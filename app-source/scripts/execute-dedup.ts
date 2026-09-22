import fs from 'fs';
import path from 'path';

interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDesc?: string;
  description?: string;
  category: string;
  iconName?: string;
  tags?: string[];
  usageCount?: number;
  featured?: boolean;
}

interface Entry {
  source: string;
  tool: Tool;
}

function normalizeFunction(tool: Tool): string {
  const descMatch = (tool.description || '').match(/perform (.*?) calculations and transformations/i);
  if (descMatch) {
    return descMatch[1].toLowerCase().trim();
  }
  const shortMatch = (tool.shortDesc || '').match(/instant client-side (.*?) tool/i);
  if (shortMatch) {
    return shortMatch[1].toLowerCase().trim();
  }

  return tool.name
    .toLowerCase()
    .replace(/#\d+/g, '')
    .replace(/\(\d+\)/g, '')
    .replace(/\b(pro|universal|instant|online|studio|master|express|advanced|ultimate|smart|precision|client-side|fast|easy|interactive|custom|standard|dynamic|live|private|zero-server|browser)\b/gi, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || tool.slug;
}

async function execute() {
  console.log('=== STARTING COMPLETE DEDUPLICATION ===');

  const allEntries: Entry[] = [];

  // 1. tools-data.ts INITIAL_TOOLS
  const td = await import('../src/lib/tools-data');
  td.INITIAL_TOOLS.forEach((t: Tool) => allEntries.push({ source: 'src/lib/tools-data/index.ts (INITIAL_TOOLS)', tool: t }));

  // 2. base data files
  const dataDir = path.resolve('./src/lib/data');
  const baseFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
  for (const bf of baseFiles) {
    const mod = await import(`../src/lib/data/${bf}`);
    const arr = Object.values(mod).find(Array.isArray) as Tool[];
    if (arr) arr.forEach(t => allEntries.push({ source: `src/lib/data/${bf}`, tool: t }));
  }

  // 3. category chunks
  const chunksDir = path.resolve('./src/lib/data/category-chunks');
  const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));
  for (const cf of chunkFiles) {
    const mod = await import(`../src/lib/data/category-chunks/${cf}`);
    const arr = (mod.default || mod.tools || Object.values(mod).find(Array.isArray)) as Tool[];
    if (arr) arr.forEach(t => allEntries.push({ source: `src/lib/data/category-chunks/${cf}`, tool: t }));
  }

  // 4. generated batches
  const genDir = path.resolve('./src/lib/data/generated');
  const genFiles = fs.readdirSync(genDir).filter(f => f.startsWith('batch-') && f.endsWith('.ts'));
  for (const gf of genFiles) {
    const mod = await import(`../src/lib/data/generated/${gf}`);
    const arr = Object.values(mod).find(Array.isArray) as Tool[];
    if (arr) arr.forEach(t => allEntries.push({ source: `src/lib/data/generated/${gf}`, tool: t }));
  }

  const totalBefore = allEntries.length;
  console.log(`Total tools before scan: ${totalBefore}`);

  // Runner slugs to prioritize keeping
  const runnerSlugs = new Set([
    'word-counter', 'case-converter', 'lorem-ipsum-generator', 'image-resizer', 'image-format-converter',
    'color-picker-from-image', 'json-formatter-validator', 'base64-encoder-decoder', 'uuid-generator',
    'color-contrast-checker', 'hex-rgb-hsl-converter', 'css-gradient-generator', 'meta-tag-generator',
    'keyword-density-analyzer', 'unit-converter', 'discount-tax-calculator', 'password-generator',
    'hash-generator', 'url-encoder-decoder', 'qr-code-generator', 'markdown-editor-previewer', 'pdf-page-inspector',
    'camelcase', 'rot13', 'zalgo', 'strikethrough', 'leetspeak'
  ]);

  // Sort entries to pick the best canonical version
  allEntries.sort((a, b) => {
    const aRunner = runnerSlugs.has(a.tool.slug) ? 1 : 0;
    const bRunner = runnerSlugs.has(b.tool.slug) ? 1 : 0;
    if (aRunner !== bRunner) return bRunner - aRunner;

    const aHasHash = /#\d+/.test(a.tool.name) ? 1 : 0;
    const bHasHash = /#\d+/.test(b.tool.name) ? 1 : 0;
    if (aHasHash !== bHasHash) return aHasHash - bHasHash;

    const sourceScore = (s: string) => {
      if (s.includes('base-data') || (s.startsWith('src/lib/data/') && !s.includes('chunk') && !s.includes('generated'))) return 4;
      if (s.includes('INITIAL_TOOLS')) return 3;
      if (s.includes('category-chunks')) return 2;
      return 1;
    };
    return sourceScore(b.source) - sourceScore(a.source);
  });

  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  const seenFunctions = new Set<string>();

  const keptTools: Tool[] = [];
  const removedDuplicates: { tool: Tool; source: string; reason: string }[] = [];

  for (const entry of allEntries) {
    const t = entry.tool;
    const s = t.slug.toLowerCase().trim();
    const n = t.name.toLowerCase().trim();
    const cat = (t.category || 'General').toLowerCase().trim();
    const f = `${cat}:::${normalizeFunction(t)}`;

    if (seenSlugs.has(s)) {
      removedDuplicates.push({ tool: t, source: entry.source, reason: `Duplicate slug: "${t.slug}"` });
      continue;
    }
    if (seenNames.has(n)) {
      removedDuplicates.push({ tool: t, source: entry.source, reason: `Duplicate name: "${t.name}"` });
      continue;
    }
    if (seenFunctions.has(f)) {
      removedDuplicates.push({ tool: t, source: entry.source, reason: `Duplicate function in category "${t.category}": "${normalizeFunction(t)}"` });
      continue;
    }

    seenSlugs.add(s);
    seenNames.add(n);
    seenFunctions.add(f);
    keptTools.push(t);
  }

  console.log(`Total duplicates found: ${removedDuplicates.length}`);
  console.log(`Total duplicates removed: ${removedDuplicates.length}`);
  console.log(`Total tools remaining: ${keptTools.length}`);

  // Map category names to static category slugs
  const catSlugMap: Record<string, string> = {
    'Text Tools': 'text-tools',
    'Image Tools': 'image-tools',
    'PDF Tools': 'pdf-tools',
    'Developer Tools': 'developer-tools',
    'SEO Tools': 'seo-tools',
    'Color Tools': 'color-tools',
    'Converter Tools': 'converter-tools',
    'Calculator Tools': 'calculator-tools',
    'Security Tools': 'security-tools',
    'Web Tools': 'web-tools',
    'Social Media Tools': 'social-media-tools',
    'Video Tools': 'video-tools',
    'Audio Tools': 'audio-tools',
    'File Tools': 'file-tools',
    'Generators': 'generators',
    'Math Tools': 'math-tools',
    'Date & Time': 'date-time',
    'Productivity': 'productivity',
    'Finance Tools': 'finance-tools',
    'Business Tools': 'business-tools',
    'Health & Fitness': 'health-fitness',
    'Education': 'education',
    'Unit Converters': 'unit-converters',
    'Automotive': 'automotive',
    'Travel Tools': 'travel-tools',
    'Real Estate': 'real-estate',
    'Legal Tools': 'legal-tools',
    'HR & Payroll': 'hr-payroll',
    'Accounting': 'accounting',
    'E-commerce': 'e-commerce',
    'Inventory & Logistics': 'inventory-logistics',
    'Engineering': 'engineering',
    'Construction': 'construction',
    'Electrical & Solar': 'electrical-solar',
    'Agriculture': 'agriculture',
    'Restaurant & Cafe': 'restaurant-cafe',
    'Beauty & Salon': 'beauty-salon',
    'Wedding & Event': 'wedding-event',
    'Photography': 'photography',
    'Music Production': 'music-production',
    'Environment & Energy': 'environment-energy',
    'Pets & Animals': 'pets-animals',
    'Government & Public Services': 'government-public-services',
    'Office Administration': 'office-administration',
    'Networking': 'networking',
    'Data Management': 'data-management',
    'Project Management': 'project-management',
    'Marketing & Advertising': 'marketing-advertising',
    'YouTube Creator Tools': 'youtube-creator-tools',
    'Freelancing': 'freelancing',
  };

  // Group kept tools by category slug
  const toolsByCatSlug: Record<string, Tool[]> = {};
  for (const slug of Object.values(catSlugMap)) {
    toolsByCatSlug[slug] = [];
  }

  for (const t of keptTools) {
    let catSlug = catSlugMap[t.category];
    if (!catSlug) {
      // Find case-insensitive
      const key = Object.keys(catSlugMap).find(k => k.toLowerCase() === t.category.toLowerCase());
      if (key) {
        catSlug = catSlugMap[key];
        t.category = key; // normalize category name
      } else {
        // Fallback: slugify
        catSlug = t.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!toolsByCatSlug[catSlug]) toolsByCatSlug[catSlug] = [];
      }
    }
    toolsByCatSlug[catSlug].push(t);
  }

  // Write category chunk files
  if (!fs.existsSync(chunksDir)) {
    fs.mkdirSync(chunksDir, { recursive: true });
  }

  for (const [slug, tools] of Object.entries(toolsByCatSlug)) {
    const filePath = path.join(chunksDir, `${slug}.ts`);
    const content = `import { Tool } from '../../types';\n\nexport const tools: Tool[] = ${JSON.stringify(tools, null, 2)};\n\nexport default tools;\n`;
    fs.writeFileSync(filePath, content, 'utf-8');
  }
  console.log('Successfully written unique tools to category chunks!');

  // Save report data
  const report = {
    totalBefore,
    totalDuplicatesFound: removedDuplicates.length,
    totalDuplicatesRemoved: removedDuplicates.length,
    totalRemaining: keptTools.length,
    first50Removed: removedDuplicates.slice(0, 50).map((d, i) => ({
      index: i + 1,
      source: d.source,
      name: d.tool.name,
      slug: d.tool.slug,
      reason: d.reason,
    }))
  };
  fs.writeFileSync('./scripts/dedup-report.json', JSON.stringify(report, null, 2), 'utf-8');

  console.log('Report saved to ./scripts/dedup-report.json');
}

execute().catch(console.error);
