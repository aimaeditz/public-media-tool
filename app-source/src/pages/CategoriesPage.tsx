import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../lib/categories';
import { WORKING_TOOLS } from '../lib/tools-data';
import { getIconComponent } from '../lib/utils';
import { ArrowRight, Search, X } from 'lucide-react';

interface CategoriesPageProps {
  navigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<string>('All');

  // Pre-calculate tool counts per category from WORKING_TOOLS
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    WORKING_TOOLS.forEach(tool => {
      const catName = tool.category;
      counts[catName] = (counts[catName] || 0) + 1;
    });
    return counts;
  }, []);

  // Extract unique parent categories with their details for filter chips
  const parents = useMemo(() => {
    const parentMap: Record<string, { name: string; slug: string; iconName: string; count: number }> = {};
    
    CATEGORIES.forEach(cat => {
      const pId = cat.parentId || cat.id;
      const pSlug = cat.parentSlug || cat.slug;
      if (!parentMap[pId]) {
        parentMap[pId] = {
          name: pId,
          slug: pSlug,
          iconName: cat.iconName,
          count: 0
        };
      }
      // Add actual tool counts to the parent count
      const toolCount = categoryCounts[cat.id] || 0;
      parentMap[pId].count += toolCount;
    });

    return Object.values(parentMap).sort((a, b) => a.name.localeCompare(b.name));
  }, [categoryCounts]);

  // Filter categories based on search query and selected parent category
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter(cat => {
      const matchesSearch = 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.parentId || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesParent = selectedParent === 'All' || cat.parentId === selectedParent;
      
      return matchesSearch && matchesParent;
    });
  }, [searchQuery, selectedParent]);

  // Group filtered categories by parent category
  const groupedCategories = useMemo(() => {
    const groups: Record<string, { parentName: string; parentSlug: string; iconName: string; items: typeof CATEGORIES }> = {};
    
    filteredCategories.forEach(cat => {
      const pId = cat.parentId || cat.id;
      const pSlug = cat.parentSlug || cat.slug;
      const pName = cat.parentId || cat.name;
      
      if (!groups[pId]) {
        groups[pId] = {
          parentName: pName,
          parentSlug: pSlug,
          iconName: cat.iconName,
          items: []
        };
      }
      groups[pId].items.push(cat);
    });

    return Object.values(groups).sort((a, b) => a.parentName.localeCompare(b.parentName));
  }, [filteredCategories]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedParent('All');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Categorized Suite
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore All Categories
          </h1>
          <p className="text-sm text-slate-600">
            Find the right tools organized across <strong className="text-slate-800">{CATEGORIES.length} specialized categories</strong> and 48 main departments.
          </p>
        </div>

        {/* Filter Dashboard */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search 400+ categories by name, keyword, or suite..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white rounded-2xl text-sm transition-all shadow-2xs outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Parent Category Filter Chips */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              Filter by Department ({parents.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-1 border border-slate-100 rounded-2xl bg-slate-50/50">
              <button
                onClick={() => setSelectedParent('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center justify-between gap-2 ${
                  selectedParent === 'All'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span>All Departments</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                  selectedParent === 'All' ? 'bg-indigo-700/50 text-indigo-50' : 'bg-slate-100 text-slate-500'
                }`}>
                  {CATEGORIES.length}
                </span>
              </button>
              {parents.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedParent(p.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center justify-between gap-2 ${
                    selectedParent === p.name
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                      : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${
                    selectedParent === p.name ? 'bg-indigo-700/50 text-indigo-50' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {p.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Results grouped by parent */}
        {groupedCategories.length > 0 ? (
          <div className="space-y-14">
            {groupedCategories.map((group) => {
              const ParentIcon = getIconComponent(group.iconName);
              return (
                <div key={group.parentName} className="space-y-6">
                  {/* Parent Heading banner */}
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100/60 shrink-0">
                      <ParentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading font-extrabold text-slate-800">
                        {group.parentName}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {group.items.length} specialized sub-categor{group.items.length === 1 ? 'y' : 'ies'}
                      </p>
                    </div>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((cat) => {
                      const count = categoryCounts[cat.id] || 0;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => navigate(`/categories/${cat.slug}`)}
                          className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                                {group.parentName}
                              </span>
                              <span className="text-xs font-bold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200/40">
                                {count} {count === 1 ? 'Tool' : 'Tools'}
                              </span>
                            </div>

                            <div>
                              <h3 className="font-heading font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {cat.name}
                              </h3>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                                {cat.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                            <span>Explore Suite</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No categories found</h3>
              <p className="text-sm text-slate-500">
                We couldn't find any categories matching "{searchQuery}" in department "{selectedParent}".
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/10 active:scale-98 transition-all cursor-pointer"
            >
              Clear Search & Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
