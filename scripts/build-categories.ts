import fs from 'fs';
import path from 'path';

// Define the categories mapping for fallback gradients and icons
const PREMIUM_GRADIENTS: Record<string, string> = {
  'text-tools': 'from-indigo-500 to-blue-600',
  'image-tools': 'from-pink-500 to-rose-600',
  'pdf-tools': 'from-orange-500 to-amber-600',
  'developer-tools': 'from-emerald-500 to-teal-600',
  'seo-tools': 'from-purple-500 to-violet-600',
  'color-tools': 'from-cyan-500 to-sky-600',
  'converter-tools': 'from-yellow-500 to-orange-600',
  'calculator-tools': 'from-green-500 to-lime-600',
  'security-tools': 'from-red-500 to-pink-600',
  'web-tools': 'from-blue-500 to-indigo-600',
};

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

async function main() {
  const chunksDir = path.resolve('./src/lib/data/category-chunks');
  const toolsDataPath = path.resolve('./src/lib/tools-data/index.ts');
  const categoriesOutputPath = path.resolve('./src/lib/categories.ts');
  const searchIndexOutputPath = path.resolve('./src/lib/search-index.ts');

  if (!fs.existsSync(chunksDir)) {
    console.error('Chunks directory not found:', chunksDir);
    process.exit(1);
  }

  // Read current categories from tools-data.ts
  const toolsDataContent = fs.readFileSync(toolsDataPath, 'utf-8');
  const categoriesRegex = /export const CATEGORIES:\s*CategoryInfo\[\]\s*=\s*\[([\s\S]*?)\];/;
  const match = toolsDataContent.match(categoriesRegex);
  if (!match) {
    console.error('Could not parse CATEGORIES from tools-data.ts');
    process.exit(1);
  }

  const rawCategoriesText = match[1];
  const blockRegex = /\{\s*id:[\s\S]*?\}\s*,?/g;
  const blocks = rawCategoriesText.match(blockRegex) || [];
  const baseCategories: any[] = [];
  
  for (const block of blocks) {
    const idMatch = block.match(/id:\s*['"`](.*?)['"`]/);
    const slugMatch = block.match(/slug:\s*['"`](.*?)['"`]/);
    const nameMatch = block.match(/name:\s*['"`](.*?)['"`]/);
    const iconMatch = block.match(/iconName:\s*['"`](.*?)['"`]/);
    const descMatch = block.match(/description:\s*['"`](.*?)['"`]/);
    const gradMatch = block.match(/colorGradient:\s*['"`](.*?)['"`]/);
    const bgMatch = block.match(/bgLight:\s*['"`](.*?)['"`]/);
    
    if (idMatch && slugMatch && nameMatch) {
      baseCategories.push({
        id: idMatch[1],
        slug: slugMatch[1],
        name: nameMatch[1],
        iconName: iconMatch ? iconMatch[1] : 'File',
        description: descMatch ? descMatch[1] : '',
        colorGradient: gradMatch ? gradMatch[1] : 'from-slate-500 to-slate-600',
        bgLight: bgMatch ? bgMatch[1] : 'bg-slate-50 text-slate-700',
      });
    }
  }

  console.log(`Parsed ${baseCategories.length} base categories from tools-data.ts`);

  const updatedCategories: any[] = [];
  const searchIndex: ToolSearchItem[] = [];

  const files = fs.readdirSync(chunksDir);
  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    
    const slug = file.replace('.ts', '');
    const cat = baseCategories.find(c => c.slug === slug);
    if (!cat) continue;

    const filePath = path.join(chunksDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Parse tools objects to count and extract metadata for search index
    // We parse individual objects from the export const tools = [...] structure
    const toolBlockRegex = /\{\s*["']?id["']?:\s*["']([^"']+)[\s\S]*?\}\s*(?=,\s*\{|\s*\])/g;
    const rawToolsText = content.split('export const tools: Tool[] = [')[1] || '';
    const toolBlocks = rawToolsText.match(/\{[\s\S]*?\}(?=,\s*\{|\s*\])/g) || [];

    const toolsCount = toolBlocks.length;
    console.log(`Processing category chunk "${slug}": found ${toolsCount} tools`);

    if (PREMIUM_GRADIENTS[slug]) {
      cat.colorGradient = PREMIUM_GRADIENTS[slug];
    }

    const tagCounts: Record<string, number> = {};
    const bannedTags = new Set([
      'tags', 'online', 'master', 'advanced', 'smart', 'browser tool', 'client side', 'universal', 
      'helper', 'utility', 'tool', 'free', 'instant', 'easy', 'quick', 'fast', 'best', 'pro', 
      'simple', 'convert', 'converter', 'app', 'online tool', 'generator', 'generator tool', 'tools',
      slug, slug.replace('-tools', ''), cat.name.toLowerCase(), ...cat.name.toLowerCase().split(/\s+/)
    ]);

    for (const block of toolBlocks) {
      // Extract tool details
      const idMatch = block.match(/"id":\s*"([^"]+)"/) || block.match(/id:\s*"([^"]+)"/);
      const slugMatch = block.match(/"slug":\s*"([^"]+)"/) || block.match(/slug:\s*"([^"]+)"/);
      const nameMatch = block.match(/"name":\s*"([^"]+)"/) || block.match(/name:\s*"([^"]+)"/);
      const shortDescMatch = block.match(/"shortDesc":\s*"([^"]+)"/) || block.match(/shortDesc:\s*"([^"]+)"/);
      const iconNameMatch = block.match(/"iconName":\s*"([^"]+)"/) || block.match(/iconName:\s*"([^"]+)"/);
      const usageCountMatch = block.match(/"usageCount":\s*(\d+)/) || block.match(/usageCount:\s*(\d+)/);
      const tagsBlockMatch = block.match(/"tags":\s*\[([\s\S]*?)\]/) || block.match(/tags:\s*\[([\s\S]*?)\]/);

      const tTags: string[] = [];
      if (tagsBlockMatch) {
        const singleTags = tagsBlockMatch[1].match(/"([^"]+)"/g) || tagsBlockMatch[1].match(/'([^']+)'/g) || [];
        for (const t of singleTags) {
          const cleanTag = t.replace(/['"]/g, '').toLowerCase().trim();
          if (cleanTag) {
            tTags.push(cleanTag);
            if (!bannedTags.has(cleanTag) && cleanTag.length > 2) {
              tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
            }
          }
        }
      }

      if (idMatch && slugMatch && nameMatch) {
        searchIndex.push({
          id: idMatch[1],
          slug: slugMatch[1],
          name: nameMatch[1],
          shortDesc: shortDescMatch ? shortDescMatch[1] : '',
          category: cat.id,
          iconName: iconNameMatch ? iconNameMatch[1] : 'File',
          tags: tTags,
          usageCount: usageCountMatch ? parseInt(usageCountMatch[1], 10) : 0,
        });
      }
    }

    // Get top 5 tags with at least 5 tools as sub-categories
    const sortedTags = Object.entries(tagCounts)
      .filter(([_, count]) => count >= 5)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag.charAt(0).toUpperCase() + tag.slice(1))
      .slice(0, 5);

    cat.count = toolsCount;
    cat.subCategories = sortedTags.length > 0 ? sortedTags : undefined;

    updatedCategories.push(cat);
  }

  // Sort updatedCategories to match original order
  const orderMap = new Map(baseCategories.map((c, i) => [c.slug, i]));
  updatedCategories.sort((a, b) => (orderMap.get(a.slug) ?? 0) - (orderMap.get(b.slug) ?? 0));

  // Generate Categories metadata
  const categoriesOutputContent = `// Automatically generated by build-categories.ts - DO NOT EDIT MANUALLY
import { CategoryInfo } from './types';

export const CATEGORIES: (CategoryInfo & { count: number; subCategories?: string[] })[] = ${JSON.stringify(updatedCategories, null, 2)};
`;

  fs.writeFileSync(categoriesOutputPath, categoriesOutputContent, 'utf-8');
  console.log(`Successfully generated ${categoriesOutputPath} with ${updatedCategories.length} categories!`);

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
}

main().catch(err => {
  console.error('Error running build-categories:', err);
  process.exit(1);
});
