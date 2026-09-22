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

const BASE_CATEGORIES: CategoryInfo[] = [
  { id: 'Text Tools', slug: 'text-tools', name: 'Text Tools', iconName: 'FileText', description: 'Transform, clean, format, and analyze text instantly without data leaving your browser.', colorGradient: 'from-indigo-500 to-blue-600', bgLight: 'bg-indigo-50 text-indigo-700' },
  { id: 'Image Tools', slug: 'image-tools', name: 'Image Tools', iconName: 'Image', description: 'Crop, resize, compress, and convert images directly in your browser with canvas API.', colorGradient: 'from-pink-500 to-rose-600', bgLight: 'bg-pink-50 text-pink-700' },
  { id: 'PDF Tools', slug: 'pdf-tools', name: 'PDF Tools', iconName: 'FileCheck', description: 'Inspect PDF metadata, count pages, generate clean PDF previews, and extract text client-side.', colorGradient: 'from-orange-500 to-amber-600', bgLight: 'bg-amber-50 text-amber-700' },
  { id: 'Developer Tools', slug: 'developer-tools', name: 'Developer Tools', iconName: 'Code', description: 'JSON formatting, Base64, UUID generation, regex testing, and developer utilities.', colorGradient: 'from-emerald-500 to-teal-600', bgLight: 'bg-emerald-50 text-emerald-700' },
  { id: 'SEO Tools', slug: 'seo-tools', name: 'SEO Tools', iconName: 'Search', description: 'Optimize metadata, calculate keyword density, preview SERP snippets, and build OpenGraph tags.', colorGradient: 'from-purple-500 to-violet-600', bgLight: 'bg-purple-50 text-purple-700' },
  { id: 'Color Tools', slug: 'color-tools', name: 'Color Tools', iconName: 'Palette', description: 'Extract palettes from images, check WCAG color contrast, and generate CSS gradients.', colorGradient: 'from-cyan-500 to-sky-600', bgLight: 'bg-cyan-50 text-cyan-700' },
  { id: 'Converter Tools', slug: 'converter-tools', name: 'Converter Tools', iconName: 'RefreshCw', description: 'Convert between length, weight, temperature, data storage, speed, and time units.', colorGradient: 'from-yellow-500 to-orange-600', bgLight: 'bg-yellow-50 text-yellow-700' },
  { id: 'Calculator Tools', slug: 'calculator-tools', name: 'Calculator Tools', iconName: 'Calculator', description: 'Discount, sales tax, loan EMI, tip, compound interest, and financial calculators.', colorGradient: 'from-green-500 to-lime-600', bgLight: 'bg-lime-50 text-lime-700' },
  { id: 'Security Tools', slug: 'security-tools', name: 'Security Tools', iconName: 'Shield', description: 'Generate strong cryptographically secure passwords and calculate MD5, SHA-256 hashes.', colorGradient: 'from-red-500 to-pink-600', bgLight: 'bg-red-50 text-red-700' },
  { id: 'Web Tools', slug: 'web-tools', name: 'Web Tools', iconName: 'Globe', description: 'Encode URLs, generate HTML QR codes, test user agents, and format web data.', colorGradient: 'from-blue-500 to-indigo-600', bgLight: 'bg-blue-50 text-blue-700' },
  { id: 'Social Media Tools', slug: 'social-media-tools', name: 'Social Media Tools', iconName: 'Share2', description: 'Character counters, hashtag generators, and bio formatters for social platforms.', colorGradient: 'from-sky-500 to-blue-600', bgLight: 'bg-sky-50 text-sky-700' },
  { id: 'Video Tools', slug: 'video-tools', name: 'Video Tools', iconName: 'Video', description: 'Aspect ratio calculators, video bitrate estimators, and frame time converters.', colorGradient: 'from-rose-500 to-red-600', bgLight: 'bg-rose-50 text-rose-700' },
  { id: 'Audio Tools', slug: 'audio-tools', name: 'Audio Tools', iconName: 'Music', description: 'BPM metronomes, audio sample rate converters, and decibel sound level calculators.', colorGradient: 'from-violet-500 to-purple-600', bgLight: 'bg-violet-50 text-violet-700' },
  { id: 'File Tools', slug: 'file-tools', name: 'File Tools', iconName: 'Folder', description: 'File size converters, MIME type lookups, and filename batch sanitizers.', colorGradient: 'from-slate-500 to-zinc-600', bgLight: 'bg-zinc-50 text-zinc-700' },
  { id: 'Generators', slug: 'generators', name: 'Generators', iconName: 'Zap', description: 'Generate mock user profiles, random numbers, dummy data, and placeholder assets.', colorGradient: 'from-amber-500 to-yellow-600', bgLight: 'bg-amber-50 text-amber-700' },
  { id: 'Math Tools', slug: 'math-tools', name: 'Math Tools', iconName: 'Percent', description: 'Fraction converters, prime number checkers, quadratic solvers, and statistics tools.', colorGradient: 'from-teal-500 to-emerald-600', bgLight: 'bg-teal-50 text-teal-700' },
  { id: 'Date & Time', slug: 'date-time', name: 'Date & Time', iconName: 'Clock', description: 'Timezone converters, UNIX timestamp formatters, and date difference calculators.', colorGradient: 'from-indigo-500 to-sky-600', bgLight: 'bg-indigo-50 text-indigo-700' },
  { id: 'Productivity', slug: 'productivity', name: 'Productivity', iconName: 'CheckSquare', description: 'Pomodoro timers, reading speed calculators, and daily habit helpers.', colorGradient: 'from-emerald-500 to-green-600', bgLight: 'bg-emerald-50 text-emerald-700' },
  { id: 'Finance Tools', slug: 'finance-tools', name: 'Finance Tools', iconName: 'DollarSign', description: 'SIP calculators, salary take-home estimators, and ROI financial tools.', colorGradient: 'from-green-500 to-teal-600', bgLight: 'bg-green-50 text-green-700' },
  { id: 'Business Tools', slug: 'business-tools', name: 'Business Tools', iconName: 'Briefcase', description: 'Break-even point calculators, profit margin tools, and invoice formatters.', colorGradient: 'from-blue-500 to-cyan-600', bgLight: 'bg-blue-50 text-blue-700' },
  { id: 'Health & Fitness', slug: 'health-fitness', name: 'Health & Fitness', iconName: 'Heart', description: 'BMI calculators, calorie trackers, water intake estimators, and pace planners.', colorGradient: 'from-rose-500 to-pink-600', bgLight: 'bg-rose-50 text-rose-700' },
  { id: 'Education', slug: 'education', name: 'Education', iconName: 'GraduationCap', description: 'GPA calculators, flashcard generators, and citation formatters.', colorGradient: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50 text-amber-700' },
  { id: 'Unit Converters', slug: 'unit-converters', name: 'Unit Converters', iconName: 'Cpu', description: 'Convert metric and imperial units across scientific and everyday dimensions.', colorGradient: 'from-indigo-500 to-purple-600', bgLight: 'bg-indigo-50 text-indigo-700' },
  { id: 'Automotive', slug: 'automotive', name: 'Automotive', iconName: 'Gauge', description: 'Fuel economy calculators, horsepower to kilowatt converters, and tire sizing.', colorGradient: 'from-red-500 to-orange-600', bgLight: 'bg-red-50 text-red-700' },
  { id: 'Travel Tools', slug: 'travel-tools', name: 'Travel Tools', iconName: 'Compass', description: 'Flight duration estimators, packing checklist generators, and currency helpers.', colorGradient: 'from-sky-500 to-teal-600', bgLight: 'bg-sky-50 text-sky-700' },
  { id: 'Real Estate', slug: 'real-estate', name: 'Real Estate', iconName: 'Home', description: 'Rental yield calculators, mortgage amortization, and square footage converters.', colorGradient: 'from-emerald-500 to-cyan-600', bgLight: 'bg-emerald-50 text-emerald-700' },
  { id: 'Legal Tools', slug: 'legal-tools', name: 'Legal Tools', iconName: 'Scale', description: 'NDA generators, copyright notice formatters, and statutory interest calculators.', colorGradient: 'from-slate-500 to-indigo-600', bgLight: 'bg-slate-50 text-slate-700' },
  { id: 'HR & Payroll', slug: 'hr-payroll', name: 'HR & Payroll', iconName: 'Users', description: 'Overtime pay calculators, employee turnover rate, and PTO accrual estimators.', colorGradient: 'from-violet-500 to-indigo-600', bgLight: 'bg-violet-50 text-violet-700' },
  { id: 'Accounting', slug: 'accounting', name: 'Accounting', iconName: 'BookOpen', description: 'Depreciation calculators, bad debt provisions, and ledger reconciliation helpers.', colorGradient: 'from-blue-500 to-emerald-600', bgLight: 'bg-blue-50 text-blue-700' },
  { id: 'E-commerce', slug: 'e-commerce', name: 'E-commerce', iconName: 'ShoppingCart', description: 'Order profit calculators, free shipping threshold estimators, and return rate tools.', colorGradient: 'from-pink-500 to-orange-600', bgLight: 'bg-pink-50 text-pink-700' },
  { id: 'Inventory & Logistics', slug: 'inventory-logistics', name: 'Inventory & Logistics', iconName: 'Package', description: 'Reorder point calculators, safety stock estimators, and freight density tools.', colorGradient: 'from-amber-500 to-emerald-600', bgLight: 'bg-amber-50 text-amber-700' },
  { id: 'Engineering', slug: 'engineering', name: 'Engineering', iconName: 'Wrench', description: 'Stress-strain calculators, beam deflection helpers, and fluid pressure solvers.', colorGradient: 'from-cyan-500 to-blue-600', bgLight: 'bg-cyan-50 text-cyan-700' },
  { id: 'Construction', slug: 'construction', name: 'Construction', iconName: 'HardHat', description: 'Concrete volume calculators, brick quantity estimators, and paint area helpers.', colorGradient: 'from-orange-500 to-yellow-600', bgLight: 'bg-orange-50 text-orange-700' },
  { id: 'Electrical & Solar', slug: 'electrical-solar', name: 'Electrical & Solar', iconName: 'Zap', description: 'Ohm’s law calculators, solar panel output estimators, and wire gauge selectors.', colorGradient: 'from-yellow-500 to-amber-600', bgLight: 'bg-yellow-50 text-yellow-700' },
  { id: 'Agriculture', slug: 'agriculture', name: 'Agriculture', iconName: 'Trees', description: 'Fertilizer mix calculators, seed rate estimators, and crop yield predictors.', colorGradient: 'from-green-500 to-emerald-600', bgLight: 'bg-green-50 text-green-700' },
  { id: 'Restaurant & Cafe', slug: 'restaurant-cafe', name: 'Restaurant & Cafe', iconName: 'Utensils', description: 'Recipe food costing, menu engineering margins, and portion converters.', colorGradient: 'from-red-500 to-amber-600', bgLight: 'bg-red-50 text-red-700' },
  { id: 'Beauty & Salon', slug: 'beauty-salon', name: 'Beauty & Salon', iconName: 'Sparkles', description: 'Hair dye mixing ratios, salon appointment schedulers, and product dilution tools.', colorGradient: 'from-pink-500 to-purple-600', bgLight: 'bg-pink-50 text-pink-700' },
  { id: 'Wedding & Event', slug: 'wedding-event', name: 'Wedding & Event', iconName: 'Calendar', description: 'Event timeline planners, seating arrangement calculators, and catering budgets.', colorGradient: 'from-rose-500 to-indigo-600', bgLight: 'bg-rose-50 text-rose-700' },
  { id: 'Photography', slug: 'photography', name: 'Photography', iconName: 'Camera', description: 'Depth of field calculators, exposure triangle solvers, and EXIF metadata viewers.', colorGradient: 'from-blue-500 to-purple-600', bgLight: 'bg-blue-50 text-blue-700' },
  { id: 'Music Production', slug: 'music-production', name: 'Music Production', iconName: 'Headphones', description: 'Delay time calculators, harmonic pitch shifters, and frequency tone generators.', colorGradient: 'from-purple-500 to-pink-600', bgLight: 'bg-purple-50 text-purple-700' },
  { id: 'Environment & Energy', slug: 'environment-energy', name: 'Environment & Energy', iconName: 'Sun', description: 'Carbon footprint calculators, CO2 offset metrics, and renewable power estimators.', colorGradient: 'from-emerald-500 to-teal-600', bgLight: 'bg-emerald-50 text-emerald-700' },
  { id: 'Pets & Animals', slug: 'pets-animals', name: 'Pets & Animals', iconName: 'Cat', description: 'Pet calorie calculators, dog-to-human age converters, and medication dosages.', colorGradient: 'from-amber-500 to-rose-600', bgLight: 'bg-amber-50 text-amber-700' },
  { id: 'Government & Public Services', slug: 'government-public-services', name: 'Government & Public Services', iconName: 'Building', description: 'Property tax calculators, municipal fee estimators, and utility bill splitters.', colorGradient: 'from-indigo-500 to-slate-600', bgLight: 'bg-indigo-50 text-indigo-700' },
  { id: 'Office Administration', slug: 'office-administration', name: 'Office Administration', iconName: 'Clipboard', description: 'Meeting agenda generators, memo formatters, and mileage reimbursement helpers.', colorGradient: 'from-slate-500 to-blue-600', bgLight: 'bg-slate-50 text-slate-700' },
  { id: 'Networking', slug: 'networking', name: 'Networking', iconName: 'Network', description: 'Subnet mask calculators, CIDR range solvers, and ping bandwidth estimators.', colorGradient: 'from-cyan-500 to-indigo-600', bgLight: 'bg-cyan-50 text-cyan-700' },
  { id: 'Data Management', slug: 'data-management', name: 'Data Management', iconName: 'Database', description: 'CSV/JSON converters, data deduplication helpers, and schema normalizers.', colorGradient: 'from-violet-500 to-blue-600', bgLight: 'bg-violet-50 text-violet-700' },
  { id: 'Project Management', slug: 'project-management', name: 'Project Management', iconName: 'CheckCircle', description: 'Sprint velocity calculators, RACI matrix planners, and Gantt chart timelines.', colorGradient: 'from-teal-500 to-emerald-600', bgLight: 'bg-teal-50 text-teal-700' },
  { id: 'Marketing & Advertising', slug: 'marketing-advertising', name: 'Marketing & Advertising', iconName: 'TrendingUp', description: 'ROAS calculators, CTR / CPC estimators, and ad banner dimension guides.', colorGradient: 'from-rose-500 to-amber-600', bgLight: 'bg-rose-50 text-rose-700' },
  { id: 'YouTube Creator Tools', slug: 'youtube-creator-tools', name: 'YouTube Creator Tools', iconName: 'Play', description: 'Title character counters, tag extractors, and thumbnail aspect ratio guides.', colorGradient: 'from-red-500 to-pink-600', bgLight: 'bg-red-50 text-red-700' },
  { id: 'Freelancing', slug: 'freelancing', name: 'Freelancing', iconName: 'Laptop', description: 'Hourly rate calculators, project quote estimators, and client contract templates.', colorGradient: 'from-indigo-500 to-teal-600', bgLight: 'bg-indigo-50 text-indigo-700' },
];

async function main() {
  const chunksDir = path.resolve('./src/lib/data/category-chunks');
  const categoriesOutputPath = path.resolve('./src/lib/categories.ts');
  const searchIndexOutputPath = path.resolve('./src/lib/search-index.ts');

  const updatedCategories: any[] = [];
  const searchIndex: ToolSearchItem[] = [];

  for (const baseCat of BASE_CATEGORIES) {
    const chunkFile = path.join(chunksDir, `${baseCat.slug}.ts`);
    let catTools: any[] = [];

    if (fs.existsSync(chunkFile)) {
      try {
        const mod = await import(`../src/lib/data/category-chunks/${baseCat.slug}`);
        catTools = mod.tools || mod.default || [];
      } catch (err) {
        console.warn(`Could not load chunk for ${baseCat.slug}:`, err);
      }
    }

    const tagCounts: Record<string, number> = {};
    const bannedTags = new Set([
      'tags', 'online', 'master', 'advanced', 'smart', 'browser tool', 'client side', 'universal', 
      'helper', 'utility', 'tool', 'free', 'instant', 'easy', 'quick', 'fast', 'best', 'pro', 
      'simple', 'convert', 'converter', 'app', 'online tool', 'generator', 'generator tool', 'tools',
      baseCat.slug, baseCat.slug.replace('-tools', ''), baseCat.name.toLowerCase(), ...baseCat.name.toLowerCase().split(/\s+/)
    ]);

    for (const t of catTools) {
      if (t.tags && Array.isArray(t.tags)) {
        t.tags.forEach((tag: string) => {
          const clean = String(tag).toLowerCase().trim();
          if (clean && !bannedTags.has(clean) && clean.length > 2) {
            tagCounts[clean] = (tagCounts[clean] || 0) + 1;
          }
        });
      }

      searchIndex.push({
        id: t.id,
        slug: t.slug,
        name: t.name,
        shortDesc: t.shortDesc || '',
        category: baseCat.id,
        iconName: t.iconName || baseCat.iconName,
        tags: t.tags || [],
        usageCount: t.usageCount || 0,
      });
    }

    const sortedTags = Object.entries(tagCounts)
      .filter(([_, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .slice(0, 5);

    updatedCategories.push({
      ...baseCat,
      count: catTools.length,
      subCategories: sortedTags.length > 0 ? sortedTags : ['Online', 'Client-Side', 'Free', 'Instant'],
    });
  }

  // Generate Search Index
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

  // Generate Categories metadata
  const categoriesOutputContent = `// Automatically generated by build-categories.ts - DO NOT EDIT MANUALLY
import { CategoryInfo } from './types';
import { SEARCH_INDEX } from './search-index';

export const STATIC_CATEGORIES: (CategoryInfo & { count: number; subCategories?: string[] })[] = ${JSON.stringify(updatedCategories, null, 2)};

export const CATEGORIES: (CategoryInfo & { count: number; subCategories?: string[]; parentId?: string; parentSlug?: string; toolSlugs?: string[] })[] = STATIC_CATEGORIES;

export function getToolsForCategory(categorySlug: string): any[] {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return SEARCH_INDEX.filter(t => t.category === cat.id);
}
`;

  fs.writeFileSync(categoriesOutputPath, categoriesOutputContent, 'utf-8');
  console.log(`Successfully generated ${categoriesOutputPath} with ${updatedCategories.length} categories!`);
}

main().catch(err => {
  console.error('Error running build-categories:', err);
  process.exit(1);
});
