import fs from 'fs';
import path from 'path';

interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  iconName: string;
  tags: string[];
  usageCount: number;
}

interface TargetCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  department: string;
  colorGradient: string;
  bgLight: string;
  tools: Tool[];
}

async function main() {
  const rootDir = path.resolve('./app-source');
  const chunksDir = path.join(rootDir, 'src/lib/data/category-chunks');
  const existingFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

  const toolsByOrigSlug: Record<string, Tool[]> = {};
  let totalLoaded = 0;

  for (const f of existingFiles) {
    const slug = f.replace('.ts', '');
    const mod = await import(`../src/lib/data/category-chunks/${slug}`);
    const tools: Tool[] = mod.tools || mod.default || [];
    toolsByOrigSlug[slug] = tools;
    totalLoaded += tools.length;
  }

  console.log(`Loaded ${totalLoaded} tools from ${existingFiles.length} chunk files.`);

  const targetCategories: TargetCategory[] = [];

  function addCat(
    name: string,
    slug: string,
    iconName: string,
    description: string,
    department: string,
    colorGradient: string,
    bgLight: string,
    tools: Tool[]
  ) {
    const updatedTools = tools.map(t => ({
      ...t,
      category: name
    }));
    targetCategories.push({
      id: name,
      slug,
      name,
      iconName,
      description,
      department,
      colorGradient,
      bgLight,
      tools: updatedTools
    });
  }

  // 1. Text Tools (125) -> 3 groups: 42, 42, 41
  const textAll = toolsByOrigSlug['text-tools'] || [];
  addCat(
    'Text Formatting',
    'text-formatting',
    'FileText',
    'Format, clean, case-convert, deduplicate, and sort text strings client-side.',
    'Text & Content',
    'from-indigo-500 to-blue-600',
    'bg-indigo-50 text-indigo-700',
    textAll.slice(0, 42)
  );
  addCat(
    'Text Analysis',
    'text-analysis',
    'Search',
    'Word counts, character metrics, reading speed, and text comparison tools.',
    'Text & Content',
    'from-blue-500 to-cyan-600',
    'bg-blue-50 text-blue-700',
    textAll.slice(42, 84)
  );
  addCat(
    'Text Generators & Encoding',
    'text-encoding',
    'Sparkles',
    'Lorem ipsum generators, text encoders, ROT13, and string transformation tools.',
    'Text & Content',
    'from-violet-500 to-purple-600',
    'bg-violet-50 text-violet-700',
    textAll.slice(84)
  );

  // 2. Developer Tools (113) -> 3 groups: 38, 38, 37
  const devAll = toolsByOrigSlug['developer-tools'] || [];
  addCat(
    'Code Formatters',
    'code-formatters',
    'Code',
    'Format, beautify, and validate JSON, XML, SQL, HTML, CSS, and modern code.',
    'Developer & Code',
    'from-emerald-500 to-teal-600',
    'bg-emerald-50 text-emerald-700',
    devAll.slice(0, 38)
  );
  addCat(
    'Web & API Utilities',
    'web-api-tools',
    'Globe',
    'Base64, UUIDs, JWT decoding, cURL converters, and client-side API utilities.',
    'Developer & Code',
    'from-teal-500 to-cyan-600',
    'bg-teal-50 text-teal-700',
    devAll.slice(38, 76)
  );
  addCat(
    'Data & Schema Tools',
    'data-schema-tools',
    'Database',
    'YAML, CSV, JSON data converters, regex testers, and schema generators.',
    'Developer & Code',
    'from-cyan-500 to-blue-600',
    'bg-cyan-50 text-cyan-700',
    devAll.slice(76)
  );

  // 3. Image Tools (105) + Photography (5) -> 3 groups of 36, 37, 37
  const imageAll = [...(toolsByOrigSlug['image-tools'] || []), ...(toolsByOrigSlug['photography'] || [])];
  addCat(
    'Image Resizing & Cropping',
    'image-resizing',
    'Image',
    'Resize images, crop aspect ratios, rotate canvas, and scale dimensions in-browser.',
    'Design & Media',
    'from-pink-500 to-rose-600',
    'bg-pink-50 text-pink-700',
    imageAll.slice(0, 36)
  );
  addCat(
    'Image Optimization & Conversion',
    'image-conversion',
    'RefreshCw',
    'Compress image file sizes, convert between PNG, JPEG, WebP, SVG, and ICO.',
    'Design & Media',
    'from-rose-500 to-orange-600',
    'bg-rose-50 text-rose-700',
    imageAll.slice(36, 73)
  );
  addCat(
    'Photo Filters & Effects',
    'photo-filters',
    'Camera',
    'Apply photo adjustments, color filters, watermarks, frames, and inspect EXIF data.',
    'Design & Media',
    'from-fuchsia-500 to-pink-600',
    'bg-fuchsia-50 text-fuchsia-700',
    imageAll.slice(73)
  );

  // 4. Calculator Tools (104) -> 3 groups: 35, 35, 34
  const calcAll = toolsByOrigSlug['calculator-tools'] || [];
  addCat(
    'Financial Calculators',
    'financial-calculators',
    'DollarSign',
    'Mortgage loan, compound interest, tax discounts, and investment growth estimators.',
    'Calculators & Finance',
    'from-green-500 to-emerald-600',
    'bg-green-50 text-green-700',
    calcAll.slice(0, 35)
  );
  addCat(
    'Everyday Calculators',
    'everyday-calculators',
    'Calculator',
    'Restaurant tip splitters, fuel economy, age difference, and consumer calculators.',
    'Calculators & Finance',
    'from-lime-500 to-green-600',
    'bg-lime-50 text-lime-700',
    calcAll.slice(35, 70)
  );
  addCat(
    'Math Calculators',
    'math-calculators',
    'Percent',
    'Scientific trig, fractions, percentages, logarithm, and algebra calculators.',
    'Calculators & Finance',
    'from-teal-500 to-emerald-600',
    'bg-teal-50 text-teal-700',
    calcAll.slice(70)
  );

  // 5. SEO Tools (102) -> 3 groups: 34, 34, 34
  const seoAll = toolsByOrigSlug['seo-tools'] || [];
  addCat(
    'SERP & Search Optimization',
    'serp-seo-tools',
    'Search',
    'Google SERP snippet previews, title pixel checkers, robots.txt, and sitemaps.',
    'SEO & Marketing',
    'from-purple-500 to-indigo-600',
    'bg-purple-50 text-purple-700',
    seoAll.slice(0, 34)
  );
  addCat(
    'Meta Tags & Structured Data',
    'meta-structured-data',
    'Code',
    'OpenGraph social cards, Twitter cards, and Schema.org JSON-LD structured data.',
    'SEO & Marketing',
    'from-indigo-500 to-violet-600',
    'bg-indigo-50 text-indigo-700',
    seoAll.slice(34, 68)
  );
  addCat(
    'Content & Keyword SEO',
    'content-seo-tools',
    'TrendingUp',
    'Keyword density analyzers, heading hierarchy auditors, and anchor text tools.',
    'SEO & Marketing',
    'from-violet-500 to-purple-600',
    'bg-violet-50 text-violet-700',
    seoAll.slice(68)
  );

  // 6. Converter Tools (93) -> 2 groups: 47, 46
  const convAll = toolsByOrigSlug['converter-tools'] || [];
  addCat(
    'Measurement Converters',
    'measurement-converters',
    'RefreshCw',
    'Convert length, area, volume, mass, weight, speed, and time dimensions.',
    'Everyday & Practical',
    'from-yellow-500 to-orange-600',
    'bg-yellow-50 text-yellow-700',
    convAll.slice(0, 47)
  );
  addCat(
    'Scientific Converters',
    'scientific-converters',
    'Cpu',
    'Convert temperature, digital storage, pressure, energy, torque, and power units.',
    'Engineering & Science',
    'from-orange-500 to-amber-600',
    'bg-orange-50 text-orange-700',
    convAll.slice(47)
  );

  // 7. Color Tools (86) -> 2 groups: 43, 43
  const colorAll = toolsByOrigSlug['color-tools'] || [];
  addCat(
    'Color Palettes & Contrast',
    'color-palettes',
    'Palette',
    'Color picker, WCAG contrast checkers, palette extraction, and harmony finders.',
    'Design & Media',
    'from-cyan-500 to-sky-600',
    'bg-cyan-50 text-cyan-700',
    colorAll.slice(0, 43)
  );
  addCat(
    'Color Converters & Gradients',
    'color-converters',
    'Sparkles',
    'HEX, RGB, HSL, CMYK conversions, CSS gradient builders, and tint generators.',
    'Design & Media',
    'from-sky-500 to-indigo-600',
    'bg-sky-50 text-sky-700',
    colorAll.slice(43)
  );

  // 8. PDF Tools (82) -> 2 groups: 41, 41
  const pdfAll = toolsByOrigSlug['pdf-tools'] || [];
  addCat(
    'PDF Inspection & Analysis',
    'pdf-inspection',
    'FileCheck',
    'Inspect PDF metadata, count pages, check font structures, and analyze document specs.',
    'Text & Content',
    'from-amber-500 to-orange-600',
    'bg-amber-50 text-amber-700',
    pdfAll.slice(0, 41)
  );
  addCat(
    'PDF Document Utilities',
    'pdf-document-tools',
    'FileText',
    'Extract client-side text, generate clean previews, and organize PDF documents.',
    'Text & Content',
    'from-orange-500 to-red-600',
    'bg-orange-50 text-orange-700',
    pdfAll.slice(41)
  );

  // 9. Security Tools (72) -> 2 groups: 36, 36
  const secAll = toolsByOrigSlug['security-tools'] || [];
  addCat(
    'Cryptography & Hashing',
    'cryptography-hashing',
    'Lock',
    'Generate SHA-256, SHA-512, MD5, and HMAC hashes securely in your browser.',
    'Developer & Code',
    'from-red-500 to-rose-600',
    'bg-red-50 text-red-700',
    secAll.slice(0, 36)
  );
  addCat(
    'Password & Security Tools',
    'passwords-security',
    'Shield',
    'Cryptographically strong password generators, entropy checkers, and privacy tools.',
    'Developer & Code',
    'from-rose-500 to-pink-600',
    'bg-rose-50 text-rose-700',
    secAll.slice(36)
  );

  // 10. Existing well-sized categories:
  addCat('Finance Tools', 'finance-tools', 'DollarSign', 'SIP calculators, salary take-home estimators, and ROI financial tools.', 'Calculators & Finance', 'from-green-500 to-teal-600', 'bg-green-50 text-green-700', toolsByOrigSlug['finance-tools'] || []);
  addCat('Math Tools', 'math-tools', 'Percent', 'Fraction converters, prime number checkers, quadratic solvers, and statistics tools.', 'Calculators & Finance', 'from-teal-500 to-emerald-600', 'bg-teal-50 text-teal-700', toolsByOrigSlug['math-tools'] || []);
  addCat('Generators', 'generators', 'Zap', 'Generate mock user profiles, random numbers, dummy data, and placeholder assets.', 'Developer & Code', 'from-amber-500 to-yellow-600', 'bg-amber-50 text-amber-700', toolsByOrigSlug['generators'] || []);
  addCat('Productivity', 'productivity', 'CheckSquare', 'Pomodoro timers, reading speed calculators, and daily habit helpers.', 'Everyday & Practical', 'from-emerald-500 to-green-600', 'bg-emerald-50 text-emerald-700', toolsByOrigSlug['productivity'] || []);
  addCat('Business Tools', 'business-tools', 'Briefcase', 'Break-even point calculators, profit margin tools, and invoice formatters.', 'Business & Professional', 'from-blue-500 to-cyan-600', 'bg-blue-50 text-blue-700', toolsByOrigSlug['business-tools'] || []);
  addCat('Web Tools', 'web-tools', 'Globe', 'Encode URLs, generate HTML QR codes, test user agents, and format web data.', 'Developer & Code', 'from-blue-500 to-indigo-600', 'bg-blue-50 text-blue-700', toolsByOrigSlug['web-tools'] || []);
  
  // Audio & Music: audio-tools (29) + music-production (5) = 34
  const audioAll = [...(toolsByOrigSlug['audio-tools'] || []), ...(toolsByOrigSlug['music-production'] || [])];
  addCat('Audio & Music Production', 'audio-production', 'Music', 'BPM metronomes, key transposer, audio sample rates, and decibel sound level calculators.', 'Design & Media', 'from-violet-500 to-purple-600', 'bg-violet-50 text-violet-700', audioAll);

  addCat('Health & Fitness', 'health-fitness', 'Heart', 'BMI calculators, calorie trackers, water intake estimators, and pace planners.', 'Everyday & Practical', 'from-rose-500 to-pink-600', 'bg-rose-50 text-rose-700', toolsByOrigSlug['health-fitness'] || []);
  addCat('File Tools', 'file-tools', 'Folder', 'File size converters, MIME type lookups, and filename batch sanitizers.', 'Developer & Code', 'from-slate-500 to-zinc-600', 'bg-zinc-50 text-zinc-700', toolsByOrigSlug['file-tools'] || []);
  addCat('Education', 'education', 'GraduationCap', 'GPA calculators, flashcard generators, and citation formatters.', 'Everyday & Practical', 'from-amber-500 to-orange-600', 'bg-amber-50 text-amber-700', toolsByOrigSlug['education'] || []);
  addCat('Date & Time', 'date-time', 'Clock', 'Timezone converters, UNIX timestamp formatters, and date difference calculators.', 'Everyday & Practical', 'from-indigo-500 to-sky-600', 'bg-indigo-50 text-indigo-700', toolsByOrigSlug['date-time'] || []);
  addCat('Unit Converters', 'unit-converters', 'Cpu', 'Convert metric and imperial units across scientific and everyday dimensions.', 'Everyday & Practical', 'from-indigo-500 to-purple-600', 'bg-indigo-50 text-indigo-700', toolsByOrigSlug['unit-converters'] || []);
  addCat('Automotive', 'automotive', 'Gauge', 'Fuel economy calculators, horsepower to kilowatt converters, and tire sizing.', 'Engineering & Science', 'from-red-500 to-orange-600', 'bg-red-50 text-red-700', toolsByOrigSlug['automotive'] || []);
  addCat('Travel Tools', 'travel-tools', 'Compass', 'Flight duration estimators, packing checklist generators, and currency helpers.', 'Everyday & Practical', 'from-sky-500 to-teal-600', 'bg-sky-50 text-sky-700', toolsByOrigSlug['travel-tools'] || []);
  addCat('Real Estate', 'real-estate', 'Home', 'Rental yield calculators, mortgage amortization, and square footage converters.', 'Business & Professional', 'from-emerald-500 to-cyan-600', 'bg-emerald-50 text-emerald-700', toolsByOrigSlug['real-estate'] || []);
  addCat('HR & Payroll', 'hr-payroll', 'Users', 'Overtime pay calculators, employee turnover rate, and PTO accrual estimators.', 'Business & Professional', 'from-violet-500 to-indigo-600', 'bg-violet-50 text-violet-700', toolsByOrigSlug['hr-payroll'] || []);
  addCat('Accounting', 'accounting', 'BookOpen', 'Depreciation calculators, bad debt provisions, and ledger reconciliation helpers.', 'Business & Professional', 'from-blue-500 to-emerald-600', 'bg-blue-50 text-blue-700', toolsByOrigSlug['accounting'] || []);
  addCat('E-commerce', 'e-commerce', 'ShoppingCart', 'Order profit calculators, free shipping threshold estimators, and return rate tools.', 'Business & Professional', 'from-pink-500 to-orange-600', 'bg-pink-50 text-pink-700', toolsByOrigSlug['e-commerce'] || []);
  addCat('Inventory & Logistics', 'inventory-logistics', 'Package', 'Reorder point calculators, safety stock estimators, and freight density tools.', 'Business & Professional', 'from-amber-500 to-emerald-600', 'bg-amber-50 text-amber-700', toolsByOrigSlug['inventory-logistics'] || []);

  // Engineering Tools: 10 tools
  addCat('Engineering Tools', 'engineering-tools', 'Wrench', 'Stress-strain solvers, beam deflection, fluid pressure, and mechanics calculators.', 'Engineering & Science', 'from-cyan-500 to-blue-600', 'bg-cyan-50 text-cyan-700', toolsByOrigSlug['engineering'] || []);

  // Construction Tools: 8 tools
  addCat('Construction Tools', 'construction-tools', 'HardHat', 'Concrete volume, brick count, floor tile count, and drywall estimators.', 'Engineering & Science', 'from-orange-500 to-yellow-600', 'bg-orange-50 text-orange-700', toolsByOrigSlug['construction'] || []);

  // Electrical & Solar: 8 tools
  addCat('Electrical & Solar', 'electrical-solar', 'Zap', 'Ohm’s law, solar panel arrays, battery storage, and electrical wiring calculators.', 'Engineering & Science', 'from-yellow-500 to-amber-600', 'bg-yellow-50 text-yellow-700', toolsByOrigSlug['electrical-solar'] || []);

  // Dining & Food Service: restaurant-cafe (7 tools)
  addCat('Dining & Food Service', 'dining-hospitality', 'Utensils', 'Recipe food costing, menu profit margins, portion estimators, and restaurant tools.', 'Everyday & Practical', 'from-red-500 to-amber-600', 'bg-red-50 text-red-700', toolsByOrigSlug['restaurant-cafe'] || []);

  // Events & Lifestyle: wedding-event (5) + beauty-salon (4) = 9 tools
  const eventAll = [
    ...(toolsByOrigSlug['wedding-event'] || []),
    ...(toolsByOrigSlug['beauty-salon'] || [])
  ];
  addCat('Events & Lifestyle', 'events-lifestyle', 'Calendar', 'Wedding budgets, guest RSVP trackers, seating charts, and salon appointment tools.', 'Everyday & Practical', 'from-rose-500 to-indigo-600', 'bg-rose-50 text-rose-700', eventAll);

  // Nature, Agriculture & Environment: agriculture (8) + environment-energy (4) + pets-animals (4) = 16
  const natureAll = [
    ...(toolsByOrigSlug['agriculture'] || []),
    ...(toolsByOrigSlug['environment-energy'] || []),
    ...(toolsByOrigSlug['pets-animals'] || [])
  ];
  addCat('Agriculture & Environment', 'nature-environment', 'Trees', 'Crop yield calculators, carbon footprint metrics, solar offsets, and pet health tools.', 'Everyday & Practical', 'from-green-500 to-emerald-600', 'bg-green-50 text-green-700', natureAll);

  // Legal & Public Services: legal-tools (10) + government-public-services (4) = 14
  const legalAll = [
    ...(toolsByOrigSlug['legal-tools'] || []),
    ...(toolsByOrigSlug['government-public-services'] || [])
  ];
  addCat('Legal & Public Services', 'legal-civic-tools', 'Scale', 'Legal agreements, statutory interest, property tax estimators, and civic utilities.', 'Business & Professional', 'from-slate-500 to-indigo-600', 'bg-slate-50 text-slate-700', legalAll);

  // Networking & Data Management: networking (5) + data-management (5) = 10
  const netDataAll = [
    ...(toolsByOrigSlug['networking'] || []),
    ...(toolsByOrigSlug['data-management'] || [])
  ];
  addCat('Networking & Data Management', 'networking-data', 'Network', 'Subnet masks, CIDR ranges, SQL schemas, CSV reordering, and data helpers.', 'Developer & Code', 'from-cyan-500 to-indigo-600', 'bg-cyan-50 text-cyan-700', netDataAll);

  // Office & Project Management: freelancing (5) + office-administration (5) + project-management (5) = 15
  const workAll = [
    ...(toolsByOrigSlug['freelancing'] || []),
    ...(toolsByOrigSlug['office-administration'] || []),
    ...(toolsByOrigSlug['project-management'] || [])
  ];
  addCat('Office & Project Management', 'workplace-productivity', 'Clipboard', 'Gantt timelines, RACI matrices, freelance quotes, memos, and agendas.', 'Business & Professional', 'from-slate-500 to-blue-600', 'bg-slate-50 text-slate-700', workAll);

  // Marketing & Creator Tools: marketing-advertising (5) + youtube-creator-tools (5) = 10
  const mktgAll = [
    ...(toolsByOrigSlug['marketing-advertising'] || []),
    ...(toolsByOrigSlug['youtube-creator-tools'] || [])
  ];
  addCat('Marketing & Creator Tools', 'marketing-creator-tools', 'TrendingUp', 'Ad ROAS calculators, CTR estimators, and YouTube creator optimization utilities.', 'SEO & Marketing', 'from-red-500 to-pink-600', 'bg-red-50 text-red-700', mktgAll);

  console.log(`Writing 52 chunk files...`);

  // Track new slugs to remove obsolete files
  const newSlugs = new Set(targetCategories.map(c => c.slug));

  for (const cat of targetCategories) {
    const chunkFile = path.join(chunksDir, `${cat.slug}.ts`);
    const content = `import { Tool } from '../../types';\n\nexport const tools: Tool[] = ${JSON.stringify(cat.tools, null, 2)};\nexport default tools;\n`;
    fs.writeFileSync(chunkFile, content, 'utf-8');
  }

  // Remove obsolete chunk files
  for (const f of existingFiles) {
    const slug = f.replace('.ts', '');
    if (!newSlugs.has(slug)) {
      const oldFile = path.join(chunksDir, f);
      fs.unlinkSync(oldFile);
      console.log(`Removed obsolete chunk: ${f}`);
    }
  }

  // Generate Search Index and Category metadata
  const searchIndex: any[] = [];
  const updatedCategories: any[] = [];

  const bannedTags = new Set([
    'tags', 'online', 'master', 'advanced', 'smart', 'browser tool', 'client side', 'universal', 
    'helper', 'utility', 'tool', 'free', 'instant', 'easy', 'quick', 'fast', 'best', 'pro', 
    'simple', 'convert', 'converter', 'app', 'online tool', 'generator', 'generator tool', 'tools'
  ]);

  for (const cat of targetCategories) {
    const tagCounts: Record<string, number> = {};

    for (const t of cat.tools) {
      if (t.tags && Array.isArray(t.tags)) {
        t.tags.forEach((tag: string) => {
          const clean = String(tag).toLowerCase().trim();
          if (clean && !bannedTags.has(clean) && clean.length > 2 && !cat.name.toLowerCase().includes(clean)) {
            tagCounts[clean] = (tagCounts[clean] || 0) + 1;
          }
        });
      }

      searchIndex.push({
        id: t.id,
        slug: t.slug,
        name: t.name,
        shortDesc: t.shortDesc || '',
        category: cat.id,
        iconName: t.iconName || cat.iconName,
        tags: t.tags || [],
        usageCount: t.usageCount || 0,
      });
    }

    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .slice(0, 5);

    updatedCategories.push({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      iconName: cat.iconName,
      description: cat.description,
      department: cat.department,
      colorGradient: cat.colorGradient,
      bgLight: cat.bgLight,
      count: cat.tools.length,
      subCategories: sortedTags.length > 0 ? sortedTags : ['Online', 'Client-Side', 'Free', 'Instant'],
    });
  }

  // 1. Write search-index.ts
  const searchIndexPath = path.join(rootDir, 'src/lib/search-index.ts');
  const searchIndexContent = `// Automatically generated - DO NOT EDIT MANUALLY
export interface SearchItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  iconName: string;
  tags: string[];
  usageCount: number;
}

export const SEARCH_INDEX: SearchItem[] = ${JSON.stringify(searchIndex, null, 2)};
`;
  fs.writeFileSync(searchIndexPath, searchIndexContent, 'utf-8');
  console.log(`Generated ${searchIndexPath} with ${searchIndex.length} tools`);

  // 2. Write categories.ts
  const categoriesPath = path.join(rootDir, 'src/lib/categories.ts');
  const categoriesContent = `// Automatically generated - DO NOT EDIT MANUALLY
import { CategoryInfo } from './types';
import { SEARCH_INDEX } from './search-index';

export interface CategoryWithMeta extends CategoryInfo {
  count: number;
  department: string;
  subCategories?: string[];
  parentId?: string;
  parentSlug?: string;
  toolSlugs?: string[];
}

export const STATIC_CATEGORIES: CategoryWithMeta[] = ${JSON.stringify(updatedCategories, null, 2)};

export const CATEGORIES: CategoryWithMeta[] = STATIC_CATEGORIES;

export function getToolsForCategory(categorySlug: string): any[] {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return SEARCH_INDEX.filter(t => t.category === cat.id);
}
`;
  fs.writeFileSync(categoriesPath, categoriesContent, 'utf-8');
  console.log(`Generated ${categoriesPath} with ${updatedCategories.length} categories`);

  // 3. Write tools-data/index.ts
  const toolsDataPath = path.join(rootDir, 'src/lib/tools-data/index.ts');
  const importLines: string[] = [];
  const arrayItems: string[] = [];

  for (const cat of targetCategories) {
    const varName = cat.slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) + 'Tools';
    importLines.push(`import { tools as ${varName} } from '../data/category-chunks/${cat.slug}';`);
    arrayItems.push(`  ...${varName},`);
  }

  const toolsDataContent = `import { Tool, CategoryInfo } from '../types';
import { CATEGORIES as DYNAMIC_CATEGORIES, STATIC_CATEGORIES } from '../categories';
import { SEARCH_INDEX } from '../search-index';

${importLines.join('\n')}

export const CATEGORIES: any[] = DYNAMIC_CATEGORIES;

export const WORKING_TOOLS: Tool[] = [
${arrayItems.join('\n')}
];

export const TOTAL_TOOLS = WORKING_TOOLS.length;

export function getCategoryById(categoryId: string): any {
  return CATEGORIES.find((c) => c.id === categoryId);
}

export function getCategoryBySlug(slug: string): any {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return WORKING_TOOLS.filter((t) => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return WORKING_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
  );
}

export const TOOLS = WORKING_TOOLS;
`;
  fs.writeFileSync(toolsDataPath, toolsDataContent, 'utf-8');
  console.log(`Generated ${toolsDataPath} referencing ${targetCategories.length} category chunks`);

  // 4. Update tools-store.ts CATEGORY_LOADERS
  const toolsStorePath = path.join(rootDir, 'src/lib/tools-store.ts');
  let toolsStoreContent = fs.readFileSync(toolsStorePath, 'utf-8');

  const loaderEntries = targetCategories
    .map(c => `  '${c.slug}': () => import('./data/category-chunks/${c.slug}'),`)
    .join('\n');

  toolsStoreContent = toolsStoreContent.replace(
    /const CATEGORY_LOADERS: Record<string, \(\) => Promise<any>> = \{[\s\S]*?\};/,
    `const CATEGORY_LOADERS: Record<string, () => Promise<any>> = {\n${loaderEntries}\n};`
  );
  fs.writeFileSync(toolsStorePath, toolsStoreContent, 'utf-8');
  console.log(`Updated CATEGORY_LOADERS in ${toolsStorePath}`);
}

main().catch(console.error);
