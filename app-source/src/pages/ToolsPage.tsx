import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CATEGORIES } from '../lib/categories';
import { getIconComponent, formatNumber } from '../lib/utils';
import { Search, ArrowRight, Filter, Sparkles, X, RotateCcw, Loader2, ChevronDown } from 'lucide-react';
import { useToolsStore } from '../lib/tools-store';
import { LazyRender } from '../components/tools/LazyRender';
import { useSeo } from '../lib/useSeo';

interface ToolsPageProps {
  navigate: (path: string) => void;
  initialQuery?: string;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ navigate, initialQuery = '' }) => {
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [pageSize, setPageSize] = useState(50);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalToolsCount = useMemo(() => {
    return CATEGORIES.reduce((s, c) => s + (c.count || 0), 0);
  }, []);

  useSeo({
    title: 'All Online Tools — Public Media Tool',
    description: `Explore the complete collection of ${totalToolsCount.toLocaleString()}+ free, private, client-side online tools and utilities on Public Media Tool.`,
    path: '/tools',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'All Online Tools',
      description: 'Explore the complete collection of free client-side online tools on Public Media Tool.',
      url: 'https://aimaeditz.github.io/public-media-tool/tools',
      numberOfItems: totalToolsCount,
    },
  });

  const selectedCatObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCat);
  }, [selectedCat]);

  const tools = useToolsStore((state) => state.tools);
  const loadCategory = useToolsStore((state) => state.loadCategory);
  const isLoading = useToolsStore((state) => state.isLoading);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setSearch(initialQuery);
      setDebouncedSearch(initialQuery);
    }
  }, [initialQuery]);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Load category chunk when category changes
  useEffect(() => {
    if (selectedCat !== 'All') {
      const catInfo = CATEGORIES.find((c) => c.id === selectedCat);
      if (catInfo) {
        loadCategory(catInfo.slug);
      }
    }
  }, [selectedCat, loadCategory]);

  // Reset page size on category/search change
  useEffect(() => {
    setPageSize(50);
  }, [debouncedSearch, selectedCat]);

  const filtered = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim();
    return tools
      .filter((tool) => {
        const matchesSearch =
          !query ||
          (tool.name || '').toLowerCase().includes(query) ||
          (tool.shortDesc || '').toLowerCase().includes(query) ||
          (Array.isArray(tool.tags) && tool.tags.some((t) => String(t).toLowerCase().includes(query)));

        const matchesCat =
          selectedCat === 'All' ||
          tool.category === selectedCat ||
          tool.category.startsWith(selectedCat + ' - ');

        return matchesSearch && matchesCat;
      })
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
  }, [tools, debouncedSearch, selectedCat]);

  // Search optimization: show only top 50 results if searching. Otherwise paginate
  const displayedTools = filtered.slice(0, debouncedSearch ? 50 : pageSize);

  return (
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-32 lg:pb-36 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Complete Suite
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
            All Browser-Based Tools
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Browse our complete directory of 100% client-side tools. Fast, private, and always free.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="space-y-3 sm:space-y-4">
          {/* Search Box */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 sm:gap-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tool name or keyword (e.g., JSON, image resizer, word counter)..."
                className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 font-medium transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Category Dropdown Filter Box */}
          <div className="relative z-30" ref={dropdownRef}>
            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-bold">
                <Filter className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-indigo-600 shrink-0" />
                <span>Category Filter:</span>
              </div>

              <div className="relative w-full sm:w-auto sm:min-w-[360px]">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 focus:border-indigo-400 rounded-xl text-xs sm:text-sm font-bold text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                  aria-expanded={isDropdownOpen}
                  aria-label="Select Category"
                >
                  <span className="truncate">
                    {selectedCat === 'All'
                      ? `All Tools (${totalToolsCount.toLocaleString()})`
                      : `${selectedCatObj?.name || selectedCat} (${selectedCatObj?.count || 0})`}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-[400px] top-full mt-2 bg-white border border-slate-200/90 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto py-2 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCat('All');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between hover:bg-indigo-50/80 hover:text-indigo-600 transition-colors cursor-pointer ${
                        selectedCat === 'All' ? 'bg-indigo-50/90 text-indigo-600 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>All Tools ({totalToolsCount.toLocaleString()})</span>
                      {selectedCat === 'All' && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 ml-2" />}
                    </button>

                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCat(cat.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between hover:bg-indigo-50/80 hover:text-indigo-600 transition-colors cursor-pointer ${
                          selectedCat === cat.id ? 'bg-indigo-50/90 text-indigo-600 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid / Empty state */}
        {isLoading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm text-slate-600 font-medium">Loading category tools...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-800">No results found for "{search}"</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any tool matching your search query. Try clearing filters or searching for terms like "JSON", "image", "PDF", "color", or "security".
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCat('All');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
              {displayedTools.map((tool) => {
                const IconComp = getIconComponent(tool.iconName);

                return (
                  <LazyRender key={tool.id} placeholderHeight="180px">
                    <div
                      onClick={() => navigate(`/tools/${tool.slug}`)}
                      className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative min-h-[160px] sm:h-[180px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                          <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full truncate max-w-[150px]">
                            {tool.category}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
                          {tool.shortDesc}
                        </p>
                      </div>

                      <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span className="text-[11px] sm:text-xs">{formatNumber(tool.usageCount)} uses</span>
                        <span className="font-bold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px] sm:text-xs">
                          Open <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </LazyRender>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {!debouncedSearch && filtered.length > pageSize && (
              <div className="text-center pt-3 sm:pt-4">
                <button
                  onClick={() => setPageSize((prev) => prev + 50)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Load More Tools ({filtered.length - pageSize} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Closing Helper Section for Natural Spacing & Guidance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left mt-12">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-base font-bold font-heading text-slate-900">
              Need help finding a specific utility?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore our organized categories or use the search bar above. All 1,516+ tools execute 100% locally in your browser with complete privacy.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/categories')}
              className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-100 transition-colors cursor-pointer"
            >
              Browse Categories
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
