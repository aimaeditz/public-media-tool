import { create } from 'zustand';
import { Tool } from './types';
import { CATEGORIES, WORKING_TOOLS } from './tools-data';

// Define dynamic chunk loaders
const CATEGORY_LOADERS: Record<string, () => Promise<any>> = {
  'text-tools': () => import('./data/category-chunks/text-tools'),
  'image-tools': () => import('./data/category-chunks/image-tools'),
  'pdf-tools': () => import('./data/category-chunks/pdf-tools'),
  'developer-tools': () => import('./data/category-chunks/developer-tools'),
  'seo-tools': () => import('./data/category-chunks/seo-tools'),
  'color-tools': () => import('./data/category-chunks/color-tools'),
  'converter-tools': () => import('./data/category-chunks/converter-tools'),
  'calculator-tools': () => import('./data/category-chunks/calculator-tools'),
  'security-tools': () => import('./data/category-chunks/security-tools'),
  'web-tools': () => import('./data/category-chunks/web-tools'),
  'social-media-tools': () => import('./data/category-chunks/social-media-tools'),
  'video-tools': () => import('./data/category-chunks/video-tools'),
  'audio-tools': () => import('./data/category-chunks/audio-tools'),
  'file-tools': () => import('./data/category-chunks/file-tools'),
  'generators': () => import('./data/category-chunks/generators'),
  'math-tools': () => import('./data/category-chunks/math-tools'),
  'date-time': () => import('./data/category-chunks/date-time'),
  'productivity': () => import('./data/category-chunks/productivity'),
  'finance-tools': () => import('./data/category-chunks/finance-tools'),
  'business-tools': () => import('./data/category-chunks/business-tools'),
  'health-fitness': () => import('./data/category-chunks/health-fitness'),
  'education': () => import('./data/category-chunks/education'),
  'unit-converters': () => import('./data/category-chunks/unit-converters'),
  'automotive': () => import('./data/category-chunks/automotive'),
  'travel-tools': () => import('./data/category-chunks/travel-tools'),
  'real-estate': () => import('./data/category-chunks/real-estate'),
  'legal-tools': () => import('./data/category-chunks/legal-tools'),
  'hr-payroll': () => import('./data/category-chunks/hr-payroll'),
  'accounting': () => import('./data/category-chunks/accounting'),
  'e-commerce': () => import('./data/category-chunks/e-commerce'),
  'inventory-logistics': () => import('./data/category-chunks/inventory-logistics'),
  'engineering': () => import('./data/category-chunks/engineering'),
  'construction': () => import('./data/category-chunks/construction'),
  'electrical-solar': () => import('./data/category-chunks/electrical-solar'),
  'agriculture': () => import('./data/category-chunks/agriculture'),
  'restaurant-cafe': () => import('./data/category-chunks/restaurant-cafe'),
  'beauty-salon': () => import('./data/category-chunks/beauty-salon'),
  'wedding-event': () => import('./data/category-chunks/wedding-event'),
  'photography': () => import('./data/category-chunks/photography'),
  'music-production': () => import('./data/category-chunks/music-production'),
  'environment-energy': () => import('./data/category-chunks/environment-energy'),
  'pets-animals': () => import('./data/category-chunks/pets-animals'),
  'government-public-services': () => import('./data/category-chunks/government-public-services'),
  'office-administration': () => import('./data/category-chunks/office-administration'),
  'networking': () => import('./data/category-chunks/networking'),
  'data-management': () => import('./data/category-chunks/data-management'),
  'project-management': () => import('./data/category-chunks/project-management'),
  'marketing-advertising': () => import('./data/category-chunks/marketing-advertising'),
  'youtube-creator-tools': () => import('./data/category-chunks/youtube-creator-tools'),
  'freelancing': () => import('./data/category-chunks/freelancing'),
};

interface ToolsState {
  tools: Tool[];
  loadedCategories: Set<string>;
  isLoading: boolean;
  isBackgroundLoading: boolean;
  initStore: () => Promise<void>;
  loadCategory: (categorySlug: string) => Promise<void>;
  loadAllCategories: () => Promise<void>;
}

// Minimal helper to strip heavy detail fields for storage
function stripToolDetails(tool: Tool): any {
  return {
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    shortDesc: tool.shortDesc,
    category: tool.category,
    iconName: tool.iconName,
    usageCount: tool.usageCount,
    tags: tool.tags,
  };
}

export const useToolsStore = create<ToolsState>((set, get) => {
  return {
    tools: WORKING_TOOLS,
    loadedCategories: new Set<string>(),
    isLoading: false,
    isBackgroundLoading: false,

    initStore: async () => {
      try {
        const cached = localStorage.getItem('cached_tools_data');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            set({ tools: parsed, loadedCategories: new Set<string>() });
            return;
          }
        }
      } catch (e) {
        console.warn('Failed to parse cached tools:', e);
      }
      set({ tools: WORKING_TOOLS });
    },

    loadCategory: async (categorySlug: string) => {
      const { loadedCategories, tools } = get();
      if (loadedCategories.has(categorySlug)) return;

      const { CATEGORIES, getToolsForCategory } = await import('./categories');
      const catObj = CATEGORIES.find(c => c.slug === categorySlug);
      const parentSlug = catObj?.parentSlug || categorySlug.replace(/-\d+$/, '');
      const loader = CATEGORY_LOADERS[parentSlug] || CATEGORY_LOADERS[categorySlug];
      if (!loader) return;

      set({ isLoading: true });
      try {
        const module = await loader();
        const categoryTools = module.default || module.tools || Object.values(module).find(Array.isArray) || [];
        
        // Load the specific subcategory chunk, or if parent slug is requested, load all child chunks
        const subCatsToLoad = CATEGORIES.filter(c => c.slug === categorySlug || (c.parentSlug === categorySlug && categorySlug === parentSlug));
        if (subCatsToLoad.length === 0 && catObj) {
          subCatsToLoad.push(catObj);
        }
        
        let nextTools = [...tools];
        const nextLoaded = new Set(loadedCategories);

        subCatsToLoad.forEach(sub => {
          const chunkTools = getToolsForCategory(sub.slug);
          const fullChunkTools = chunkTools.map(ct => {
            const fullTool = categoryTools.find((t: any) => t.slug === ct.slug);
            return {
              ...ct,
              ...(fullTool || {})
            };
          });

          const existingSlugs = new Set(nextTools.map(t => t.slug));
          const newTools = fullChunkTools.filter((t: any) => !existingSlugs.has(t.slug));
          nextTools = [...nextTools, ...newTools];
          nextLoaded.add(sub.slug);
        });

        // Mark the requested category slug itself as loaded
        nextLoaded.add(categorySlug);

        set({
          tools: nextTools,
          loadedCategories: nextLoaded,
          isLoading: false,
        });

        // Save trimmed data to localStorage to avoid QuotaExceededError
        try {
          const trimmed = nextTools.map(stripToolDetails);
          localStorage.setItem('cached_tools_data', JSON.stringify(trimmed));
        } catch (e) {
          console.warn('Failed to save to localStorage cache:', e);
        }
      } catch (e) {
        console.error(`Failed to load category chunk ${categorySlug}:`, e);
        set({ isLoading: false });
      }
    },

    loadAllCategories: async () => {
      const { isBackgroundLoading, loadedCategories } = get();
      if (isBackgroundLoading) return;

      set({ isBackgroundLoading: true });
      console.log('Background loading remaining category chunks started...');

      let currentTools = [...get().tools];
      const currentLoaded = new Set(loadedCategories);

      const { CATEGORIES, getToolsForCategory } = await import('./categories');

      // Load all remaining categories one by one sequentially to avoid blocking the main thread
      for (const cat of CATEGORIES) {
        if (!currentLoaded.has(cat.slug)) {
          const parentSlug = cat.slug.replace(/-\d+$/, '');
          const loader = CATEGORY_LOADERS[parentSlug];
          if (loader) {
            try {
              const module = await loader();
              const categoryTools = module.default || module.tools || Object.values(module).find(Array.isArray) || [];
              
              const chunkTools = getToolsForCategory(cat.slug);
              const fullChunkTools = chunkTools.map(ct => {
                const fullTool = categoryTools.find((t: any) => t.slug === ct.slug);
                return {
                  ...ct,
                  ...(fullTool || {})
                };
              });

              const existingSlugs = new Set(currentTools.map(t => t.slug));
              const newTools = fullChunkTools.filter((t: any) => !existingSlugs.has(t.slug));
              
              currentTools = [...currentTools, ...newTools];
              currentLoaded.add(cat.slug);

              // Update state per batch so changes appear progressively without freezing
              set({
                tools: currentTools,
                loadedCategories: new Set(currentLoaded),
              });
            } catch (err) {
              console.error(`Failed to background load category ${cat.slug}:`, err);
            }
          }
        }
      }

      set({ isBackgroundLoading: false });
      console.log('Background loading finished. Total tools loaded:', currentTools.length);

      // Cache the complete trimmed dataset
      try {
        const trimmed = currentTools.map(stripToolDetails);
        localStorage.setItem('cached_tools_data', JSON.stringify(trimmed));
        console.log('Successfully cached complete tools data in localStorage!');
      } catch (e) {
        console.warn('Failed to cache complete tools data in localStorage:', e);
      }
    },
  };
});
