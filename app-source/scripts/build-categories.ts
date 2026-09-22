import fs from 'fs';
import path from 'path';

interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  colorGradient: string;
  bgLight: string;
  count?: number;
  subCategories?: string[];
  department?: string;
  parentId?: string;
  parentSlug?: string;
}

interface ToolSearchItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: string;
  iconName: string;
  tags: string[];
  usageCount: number;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function classifyTool(tool: any): string {
  const cat = tool.category;
  const name = (tool.name || '').toLowerCase();
  const desc = (tool.shortDesc || '').toLowerCase();
  const tags = (tool.tags || []).map((t: any) => String(t).toLowerCase()).join(' ');
  const text = name + ' ' + desc + ' ' + tags;

  // 1. Text Tools (125 tools -> 4 categories)
  if (cat === 'Text Tools') {
    if (text.includes('case') || text.includes('uppercase') || text.includes('lowercase') || text.includes('camel') || text.includes('snake') || text.includes('kebab') || text.includes('pascal') || text.includes('alternating') || text.includes('capital') || text.includes('letter') || text.includes('whitespace') || text.includes('trim') || text.includes('indent') || text.includes('format') || text.includes('clean') || text.includes('sort') || text.includes('duplicate')) return 'Text Formatters & Cleaners';
    if (text.includes('count') || text.includes('word') || text.includes('character') || text.includes('syllable') || text.includes('sentence') || text.includes('paragraph') || text.includes('reading time') || text.includes('readability') || text.includes('flesch') || text.includes('analyzer') || text.includes('length') || text.includes('diff') || text.includes('compare') || text.includes('similarity')) return 'Text Counters & Analysis';
    if (text.includes('binary') || text.includes('hexadecimal') || text.includes('octal') || text.includes('morse') || text.includes('rot13') || text.includes('caesar') || text.includes('cipher') || text.includes('zalgo') || text.includes('encode') || text.includes('decode') || text.includes('markup') || text.includes('markdown') || text.includes('html') || text.includes('bbcode')) return 'Text Encoders & Converters';
    return 'Text & Font Generators';
  }

  // 2. Developer Tools (113 tools -> 3 categories)
  if (cat === 'Developer Tools') {
    if (text.includes('json') || text.includes('yaml') || text.includes('xml') || text.includes('csv') || text.includes('base64') || text.includes('uuid') || text.includes('guid') || text.includes('base32') || text.includes('base58') || text.includes('nanoid') || text.includes('identifier') || text.includes('jwt')) return 'JSON & Developer Data Utilities';
    if (text.includes('css') || text.includes('flexbox') || text.includes('grid') || text.includes('shadow') || text.includes('border') || text.includes('gradient') || text.includes('rem') || text.includes('px') || text.includes('styling')) return 'CSS & Frontend Web Tools';
    return 'Code Syntax, Formatters & Minifiers';
  }

  // 3. Image Tools (105 tools -> 4 categories)
  if (cat === 'Image Tools') {
    if (text.includes('resize') || text.includes('crop') || text.includes('scale') || text.includes('dimension') || text.includes('aspect') || text.includes('compress') || text.includes('optimize') || text.includes('shrink')) return 'Image Resizers & Compressors';
    if (text.includes('convert') || text.includes('webp') || text.includes('png') || text.includes('jpg') || text.includes('jpeg') || text.includes('svg') || text.includes('gif') || text.includes('bmp') || text.includes('format')) return 'Image Format Converters';
    if (text.includes('filter') || text.includes('effect') || text.includes('blur') || text.includes('brightness') || text.includes('contrast') || text.includes('vignette') || text.includes('glitch') || text.includes('sepia') || text.includes('vintage') || text.includes('dither') || text.includes('sharpen') || text.includes('emboss') || text.includes('sobel')) return 'Photo Effects & Visual Filters';
    return 'Graphic Assets & Image Studio';
  }

  // 4. Calculator Tools (104 tools -> 3 categories)
  if (cat === 'Calculator Tools') {
    if (text.includes('loan') || text.includes('mortgage') || text.includes('emi') || text.includes('interest') || text.includes('amortization') || text.includes('down payment')) return 'Loans, Mortgages & Investments';
    if (text.includes('discount') || text.includes('tax') || text.includes('vat') || text.includes('tip') || text.includes('margin') || text.includes('markup') || text.includes('sales') || text.includes('profit') || text.includes('salary') || text.includes('wage') || text.includes('depreciation') || text.includes('percentage') || text.includes('ratio')) return 'Sales, Tax & Financial Calculators';
    return 'Everyday & Scientific Calculators';
  }

  // 5. SEO Tools (102 tools -> 3 categories)
  if (cat === 'SEO Tools') {
    if (text.includes('meta') || text.includes('opengraph') || text.includes('social') || text.includes('snippet') || text.includes('title') || text.includes('keyword') || text.includes('density') || text.includes('heading') || text.includes('readability') || text.includes('content') || text.includes('nap') || text.includes('local')) return 'Meta Tag & On-Page SEO';
    if (text.includes('sitemap') || text.includes('robots') || text.includes('canonical') || text.includes('schema') || text.includes('structured') || text.includes('json-ld')) return 'Technical SEO Utilities';
    return 'Domain, Link & Analytics SEO';
  }

  // 6. Converter Tools (93 tools -> 4 categories)
  if (cat === 'Converter Tools') {
    if (text.includes('length') || text.includes('distance') || text.includes('weight') || text.includes('mass') || text.includes('area') || text.includes('volume') || text.includes('capacity') || text.includes('temperature') || text.includes('surface')) return 'Measurement & Unit Converters';
    if (text.includes('data') || text.includes('byte') || text.includes('binary') || text.includes('hex') || text.includes('octal') || text.includes('number system') || text.includes('storage') || text.includes('roman')) return 'Data & Digital Converters';
    if (text.includes('speed') || text.includes('pressure') || text.includes('power') || text.includes('force') || text.includes('energy') || text.includes('angle') || text.includes('frequency') || text.includes('torque') || text.includes('viscosity')) return 'Physics & Engineering Converters';
    return 'Everyday & Cooking Converters';
  }

  // 7. Color Tools (86 tools -> 2 categories)
  if (cat === 'Color Tools') {
    if (text.includes('picker') || text.includes('extract') || text.includes('eyedropper') || text.includes('sample') || text.includes('contrast') || text.includes('wcag') || text.includes('accessibility') || text.includes('convert') || text.includes('hex') || text.includes('rgb') || text.includes('hsl') || text.includes('cmyk')) return 'Color Pickers & Format Converters';
    return 'Color Palettes, Gradients & Themes';
  }

  // 8. PDF Tools (82 tools -> 3 categories)
  if (cat === 'PDF Tools') {
    if (text.includes('rotate') || text.includes('split') || text.includes('merge') || text.includes('order') || text.includes('organize') || text.includes('page')) return 'PDF Page & Layout Management';
    if (text.includes('inspect') || text.includes('metadata') || text.includes('extract') || text.includes('preview') || text.includes('viewer') || text.includes('info')) return 'PDF Inspection & Extraction';
    return 'PDF Security & Document Utilities';
  }

  // 9. Security Tools (72 tools -> 2 categories)
  if (cat === 'Security Tools') {
    if (text.includes('password') || text.includes('passphrase') || text.includes('pin') || text.includes('token') || text.includes('diceware') || text.includes('hash') || text.includes('md5') || text.includes('sha') || text.includes('checksum') || text.includes('bcrypt')) return 'Passwords, Hashes & Checksums';
    return 'Encryption, Keys & Certificates';
  }

  // 10. Finance Tools (45 tools -> 2 categories)
  if (cat === 'Finance Tools') {
    if (text.includes('investment') || text.includes('compound') || text.includes('sip') || text.includes('roi') || text.includes('savings') || text.includes('stock')) return 'Loans, Mortgages & Investments';
    return 'Personal Budgeting & Expense Management';
  }

  // 11. Math Tools (44 tools) -> 1 category
  if (cat === 'Math Tools') {
    return 'Algebra, Geometry & Statistics';
  }

  // 12. Generators (43 tools) -> 1 category
  if (cat === 'Generators') {
    return 'Random Value, Game & Data Generators';
  }

  // Merging small categories under 12 tools:
  if (['Accounting', 'HR & Payroll'].includes(cat)) return 'Accounting & Payroll';
  if (['E-commerce', 'Inventory & Logistics', 'Project Management', 'Office Administration', 'Freelancing'].includes(cat)) return 'Business Operations & Management';
  if (['Legal Tools', 'Government & Public Services', 'Marketing & Advertising'].includes(cat)) return 'Legal, Regulatory & Marketing';
  if (['Real Estate', 'Construction', 'Engineering'].includes(cat)) return 'Architecture, Construction & Real Estate';
  if (['Agriculture', 'Environment & Energy', 'Electrical & Solar'].includes(cat)) return 'Agriculture, Energy & Environment';
  if (['Restaurant & Cafe', 'Beauty & Salon', 'Wedding & Event', 'Pets & Animals'].includes(cat)) return 'Hospitality, Events & Lifestyle';
  if (['Data Management', 'Networking', 'Web Tools'].includes(cat)) return 'Web Diagnostics & Networking';
  if (['Music Production', 'Audio Tools', 'Photography', 'YouTube Creator Tools'].includes(cat)) return 'Audio, Media & Content Production';

  return cat;
}

function getCategoryDepartment(catName: string, parentCat: string): string {
  if (['Developer Tools', 'Web Tools', 'SEO Tools', 'Security Tools', 'Data Management', 'Networking'].includes(parentCat) || catName.includes('Code') || catName.includes('JSON') || catName.includes('Developer') || catName.includes('Regex') || catName.includes('SEO') || catName.includes('Web') || catName.includes('CSS') || catName.includes('Encoding') || catName.includes('Encryption') || catName.includes('Password') || catName.includes('Domain')) return 'Developer & Web';
  if (['Image Tools', 'Video Tools', 'Audio Tools', 'PDF Tools', 'Photography', 'Music Production', 'YouTube Creator Tools', 'Color Tools'].includes(parentCat) || catName.includes('Image') || catName.includes('Photo') || catName.includes('PDF') || catName.includes('Audio') || catName.includes('Video') || catName.includes('Color') || catName.includes('Gradient') || catName.includes('Graphic') || catName.includes('Media')) return 'Media & Content';
  if (['Text Tools', 'Generators', 'Date & Time', 'Productivity', 'Office Administration', 'Social Media Tools'].includes(parentCat) || catName.includes('Text') || catName.includes('Case') || catName.includes('Word') || catName.includes('Habit') || catName.includes('Focus') || catName.includes('Generator') || catName.includes('Date') || catName.includes('Time') || catName.includes('File')) return 'Text & Productivity';
  if (['Math Tools', 'Calculator Tools', 'Converter Tools', 'Unit Converters', 'Electrical & Solar', 'Engineering'].includes(parentCat) || catName.includes('Calculator') || catName.includes('Converter') || catName.includes('Algebra') || catName.includes('Statistics') || catName.includes('Geometry') || catName.includes('Measurement') || catName.includes('Physics') || catName.includes('Unit')) return 'Math & Science';
  if (['Finance Tools', 'Business Tools', 'Accounting', 'Legal Tools', 'Real Estate', 'HR & Payroll', 'E-commerce', 'Inventory & Logistics', 'Freelancing', 'Marketing & Advertising', 'Project Management'].includes(parentCat) || catName.includes('Loan') || catName.includes('Tax') || catName.includes('Salary') || catName.includes('Invoice') || catName.includes('Profit') || catName.includes('Budget') || catName.includes('Accounting') || catName.includes('Business') || catName.includes('Legal')) return 'Business & Finance';
  return 'Industry & Lifestyle';
}

function getCategoryIcon(catName: string, parentCat: string): string {
  if (catName.includes('Case')) return 'Type';
  if (catName.includes('Counter') || catName.includes('Statistics')) return 'Hash';
  if (catName.includes('Readability') || catName.includes('Book') || catName.includes('Study')) return 'BookOpen';
  if (catName.includes('Generator') || catName.includes('Random')) return 'Zap';
  if (catName.includes('Compare') || catName.includes('Diff')) return 'GitCompare';
  if (catName.includes('Encoder') || catName.includes('Cipher') || catName.includes('Encrypt') || catName.includes('Lock')) return 'Lock';
  if (catName.includes('Formatter') || catName.includes('Clean')) return 'AlignLeft';
  if (catName.includes('List') || catName.includes('Array')) return 'List';
  if (catName.includes('Fancy') || catName.includes('Styled') || catName.includes('Asset')) return 'Sparkles';
  if (catName.includes('JSON')) return 'FileJson';
  if (catName.includes('Encoding') || catName.includes('Identifier') || catName.includes('Binary')) return 'Binary';
  if (catName.includes('CSS') || catName.includes('Styling') || catName.includes('Palette') || catName.includes('Color')) return 'Palette';
  if (catName.includes('Code') || catName.includes('Minifier') || catName.includes('Markup')) return 'Terminal';
  if (catName.includes('Regex') || catName.includes('String')) return 'Sliders';
  if (catName.includes('API') || catName.includes('Web') || catName.includes('Domain')) return 'Globe';
  if (catName.includes('Crop') || catName.includes('Resize')) return 'Crop';
  if (catName.includes('Convert')) return 'RefreshCw';
  if (catName.includes('Compress') || catName.includes('Optimize')) return 'Minimize2';
  if (catName.includes('Picker') || catName.includes('Sampler')) return 'Eyedropper';
  if (catName.includes('Filter') || catName.includes('Effect')) return 'Wand2';
  if (catName.includes('Watermark') || catName.includes('Layer')) return 'Layers';
  if (catName.includes('Mortgage') || catName.includes('Loan') || catName.includes('Home')) return 'Home';
  if (catName.includes('Tax') || catName.includes('Receipt') || catName.includes('Invoice')) return 'Receipt';
  if (catName.includes('Percentage') || catName.includes('Ratio')) return 'Percent';
  if (catName.includes('Health') || catName.includes('Body') || catName.includes('Metric')) return 'Heart';
  if (catName.includes('Salary') || catName.includes('Income') || catName.includes('Finance') || catName.includes('Profit')) return 'DollarSign';
  if (catName.includes('Scientific') || catName.includes('Geometry') || catName.includes('Trigonometry')) return 'Compass';
  if (catName.includes('Calculator')) return 'Calculator';
  if (catName.includes('Meta') || catName.includes('Social')) return 'Share2';
  if (catName.includes('Keyword') || catName.includes('SEO') || catName.includes('Search')) return 'Search';
  if (catName.includes('Technical') || catName.includes('Unit') || catName.includes('Physics')) return 'Cpu';
  if (catName.includes('URL') || catName.includes('Link')) return 'Link';
  if (catName.includes('Local') || catName.includes('Map')) return 'MapPin';
  if (catName.includes('Ruler') || catName.includes('Length') || catName.includes('Distance')) return 'Ruler';
  if (catName.includes('Weight') || catName.includes('Scale') || catName.includes('Mass')) return 'Scale';
  if (catName.includes('Area') || catName.includes('Grid') || catName.includes('Matrix')) return 'Grid';
  if (catName.includes('Volume') || catName.includes('Capacity') || catName.includes('Box')) return 'Box';
  if (catName.includes('Temperature')) return 'Thermometer';
  if (catName.includes('Data') || catName.includes('Storage')) return 'HardDrive';
  if (catName.includes('Cooking') || catName.includes('Kitchen')) return 'Utensils';
  if (catName.includes('Apparel') || catName.includes('Size') || catName.includes('Clothing')) return 'Tag';
  if (catName.includes('Contrast') || catName.includes('Accessibility')) return 'Eye';
  if (catName.includes('PDF')) return 'FileCheck';
  if (catName.includes('Security') || catName.includes('Password') || catName.includes('Hash')) return 'Shield';
  if (catName.includes('Budget') || catName.includes('Savings')) return 'PiggyBank';
  if (catName.includes('Expense') || catName.includes('Debt')) return 'CreditCard';
  if (catName.includes('Game') || catName.includes('Probability')) return 'Dices';
  if (catName.includes('QR')) return 'QrCode';
  if (catName.includes('Time') || catName.includes('Habit') || catName.includes('Calendar') || catName.includes('Timestamp')) return 'Clock';
  if (catName.includes('Audio') || catName.includes('Speech') || catName.includes('Headphones')) return 'Headphones';
  if (catName.includes('Focus') || catName.includes('Note')) return 'CheckSquare';
  if (catName.includes('Business') || catName.includes('Commercial')) return 'Building';
  if (catName.includes('Archive') || catName.includes('Compression')) return 'Archive';
  if (catName.includes('File') || catName.includes('Renamer')) return 'Folder';
  if (catName.includes('Music') || catName.includes('Frequency')) return 'Music';
  if (catName.includes('User') || catName.includes('Profile')) return 'UserCheck';

  return 'Tool';
}

function getCategoryGradients(dept: string, index: number): { colorGradient: string; bgLight: string } {
  const gradients = [
    { colorGradient: 'from-indigo-500 to-blue-600', bgLight: 'bg-indigo-50 text-indigo-700' },
    { colorGradient: 'from-emerald-500 to-teal-600', bgLight: 'bg-emerald-50 text-emerald-700' },
    { colorGradient: 'from-pink-500 to-rose-600', bgLight: 'bg-pink-50 text-pink-700' },
    { colorGradient: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50 text-amber-700' },
    { colorGradient: 'from-purple-500 to-violet-600', bgLight: 'bg-purple-50 text-purple-700' },
    { colorGradient: 'from-cyan-500 to-sky-600', bgLight: 'bg-cyan-50 text-cyan-700' },
    { colorGradient: 'from-green-500 to-lime-600', bgLight: 'bg-lime-50 text-lime-700' },
    { colorGradient: 'from-blue-500 to-indigo-600', bgLight: 'bg-blue-50 text-blue-700' },
    { colorGradient: 'from-rose-500 to-red-600', bgLight: 'bg-rose-50 text-rose-700' },
  ];
  return gradients[index % gradients.length];
}

async function main() {
  const rootDir = fs.existsSync(path.resolve('./app-source')) ? path.resolve('./app-source') : path.resolve('.');
  const chunksDir = path.join(rootDir, 'src/lib/data/category-chunks');
  const categoriesOutputPath = path.join(rootDir, 'src/lib/categories.ts');
  const searchIndexOutputPath = path.join(rootDir, 'src/lib/search-index.ts');

  // Load all chunks dynamically
  const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));
  const allTools: any[] = [];

  for (const file of chunkFiles) {
    const parentSlug = file.replace(/\.ts$/, '');
    try {
      const mod = await import(`../src/lib/data/category-chunks/${parentSlug}`);
      const tools = mod.tools || mod.default || [];
      tools.forEach((t: any) => {
        allTools.push({
          ...t,
          parentCategory: t.category || parentSlug,
          parentSlug: parentSlug
        });
      });
    } catch (err) {
      console.warn(`Could not load chunk ${file}:`, err);
    }
  }

  console.log(`Loaded ${allTools.length} total tools from ${chunkFiles.length} chunk files.`);

  // Group tools by fine category
  const categoryGroupMap = new Map<string, { tools: any[]; parentCat: string; parentSlug: string }>();

  for (const tool of allTools) {
    const fineName = classifyTool(tool);
    if (!categoryGroupMap.has(fineName)) {
      categoryGroupMap.set(fineName, {
        tools: [],
        parentCat: tool.parentCategory,
        parentSlug: tool.parentSlug,
      });
    }
    categoryGroupMap.get(fineName)!.tools.push(tool);
  }

  console.log(`Classified tools into ${categoryGroupMap.size} distinct fine categories.`);

  const updatedCategories: CategoryInfo[] = [];
  const searchIndex: ToolSearchItem[] = [];

  let catIdx = 0;
  for (const [catName, data] of categoryGroupMap.entries()) {
    const catSlug = slugify(catName);
    const dept = getCategoryDepartment(catName, data.parentCat);
    const iconName = getCategoryIcon(catName, data.parentCat);
    const { colorGradient, bgLight } = getCategoryGradients(dept, catIdx++);

    // Collect tags across tools in this category
    const tagCounts: Record<string, number> = {};
    for (const t of data.tools) {
      if (t.tags && Array.isArray(t.tags)) {
        t.tags.forEach((tag: string) => {
          const clean = String(tag).toLowerCase().trim();
          if (clean && clean.length > 2) {
            tagCounts[clean] = (tagCounts[clean] || 0) + 1;
          }
        });
      }

      // Populate search index with updated category name
      searchIndex.push({
        id: t.id,
        slug: t.slug,
        name: t.name,
        shortDesc: t.shortDesc || '',
        category: catName, // Fine category name
        iconName: t.iconName || iconName,
        tags: t.tags || [],
        usageCount: t.usageCount || 0,
      });
    }

    const sortedSubCats = Object.entries(tagCounts)
      .filter(([_, count]) => count >= 1)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .slice(0, 5);

    updatedCategories.push({
      id: catName,
      slug: catSlug,
      name: catName,
      iconName: iconName,
      description: `Collection of ${data.tools.length} dedicated client-side browser tools for ${catName.toLowerCase()}.`,
      colorGradient: colorGradient,
      bgLight: bgLight,
      count: data.tools.length,
      subCategories: sortedSubCats.length > 0 ? sortedSubCats : ['Online', 'Client-Side', 'Free', 'Instant'],
      department: dept,
      parentId: data.parentCat,
      parentSlug: data.parentSlug,
    });
  }

  // Sort categories alphabetically by name
  updatedCategories.sort((a, b) => a.name.localeCompare(b.name));

  // Generate Search Index file
  const searchIndexOutputContent = `// Automatically generated by build-categories.ts - DO NOT EDIT MANUALLY
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

  fs.writeFileSync(searchIndexOutputPath, searchIndexOutputContent, 'utf-8');
  console.log(`Successfully generated ${searchIndexOutputPath} with ${searchIndex.length} indexed tools!`);

  // Generate Categories metadata file
  const categoriesOutputContent = `// Automatically generated by build-categories.ts - DO NOT EDIT MANUALLY
import { CategoryInfo } from './types';
import { SEARCH_INDEX } from './search-index';

export const STATIC_CATEGORIES: (CategoryInfo & { count: number; subCategories?: string[]; department?: string; parentId?: string; parentSlug?: string })[] = ${JSON.stringify(updatedCategories, null, 2)};

export const CATEGORIES: (CategoryInfo & { count: number; subCategories?: string[]; department?: string; parentId?: string; parentSlug?: string })[] = STATIC_CATEGORIES;

export function getToolsForCategory(categorySlug: string): any[] {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return SEARCH_INDEX.filter(t => t.category === cat.id || t.category === cat.name);
}
`;

  fs.writeFileSync(categoriesOutputPath, categoriesOutputContent, 'utf-8');
  console.log(`Successfully generated ${categoriesOutputPath} with ${updatedCategories.length} fine categories!`);
}

main().catch(err => {
  console.error('Error running build-categories:', err);
  process.exit(1);
});
