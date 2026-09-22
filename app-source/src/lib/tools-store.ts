import { create } from 'zustand';
import { Tool } from './types';
import { WORKING_TOOLS } from './tools-data';

interface ToolsState {
  tools: Tool[];
  loadedCategories: Set<string>;
  isLoading: boolean;
  isBackgroundLoading: boolean;
  initStore: () => Promise<void>;
  loadCategory: (categorySlug: string) => Promise<void>;
  loadAllCategories: () => Promise<void>;
}

export const useToolsStore = create<ToolsState>((set, get) => {
  return {
    tools: WORKING_TOOLS,
    loadedCategories: new Set<string>(),
    isLoading: false,
    isBackgroundLoading: false,

    initStore: async () => {
      set({ tools: WORKING_TOOLS });
    },

    loadCategory: async (categorySlug: string) => {
      const { loadedCategories } = get();
      if (!loadedCategories.has(categorySlug)) {
        const nextLoaded = new Set(loadedCategories);
        nextLoaded.add(categorySlug);
        set({ loadedCategories: nextLoaded });
      }
    },

    loadAllCategories: async () => {
      // All tools are already loaded into memory via WORKING_TOOLS
    },
  };
});

