import React, { useState, useEffect, useRef } from 'react';
import { TOTAL_TOOLS } from '../lib/tools-data';
import { STATIC_CATEGORIES } from '../lib/categories';
import { getIconComponent, formatNumber } from '../lib/utils';
import { Search, ArrowRight, Filter, Sparkles, X, RotateCcw, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToolsStore } from '../lib/tools-store';
import { LazyRender } from '../components/tools/LazyRender';

interface ToolsPageProps {
  navigate: (path: string) => void;
  initialQuery?: string;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ navigate, initialQuery = '' }) => {
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [pageSize, setPageSize] = useState(50);

  const tools = useToolsStore((state) => state.tools);
  const loadCategory = useToolsStore((state) => state.loadCategory);
  const isLoading = useToolsStore((state) => state.isLoading);

  // Scroll and drag state for category chips
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth',
      });
    }
  };

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
      const catInfo = STATIC_CATEGORIES.find(c => c.id === selectedCat);
      if (catInfo) {
        loadCategory(catInfo.slug);
      }
    }
  }, [selectedCat, loadCategory]);

  // Reset page size on category/search change
  useEffect(() => {
    setPageSize(50);
  }, [debouncedSearch, selectedCat]);

  const filtered = tools.filter((tool) => {
    const query = debouncedSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (tool.name || '').toLowerCase().includes(query) ||
      (tool.shortDesc || '').toLowerCase().includes(query) ||
      (Array.isArray(tool.tags) && tool.tags.some((t) => String(t).toLowerCase().includes(query)));

    const matchesCat = selectedCat === 'All' || 
                       tool.category === selectedCat || 
                       (tool as any).parentCategory === selectedCat ||
                       tool.category.startsWith(selectedCat + ' - ');

    return matchesSearch && matchesCat;
  });

  // Search optimization: show only top 50 results if searching. Otherwise paginate
  const displayedTools = filtered.slice(0, debouncedSearch ? 50 : pageSize);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Complete Suite
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            All Browser-Based Tools
          </h1>
          <p className="text-sm text-slate-600">
            Browse our complete directory of 100% client-side tools. Fast, private, and always free.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="space-y-6">
          {/* Search Box */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-indigo-500 absolute left-4 top-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tool name or keyword (e.g., JSON, image resizer, word counter)..."
                className="w-full pl-12 pr-10 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 font-medium transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
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

          {/* Sticky Filter Chips Bar with generous spacing & smooth scroll */}
          <div className="sticky top-[68px] z-30 bg-slate-50/95 backdrop-blur-md py-4 my-4 -mx-2 px-2 border-y border-slate-200/70 shadow-2xs transition-all">
            <div className="relative max-w-full flex items-center group">
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-40 p-2 rounded-full bg-white border border-slate-200 shadow-xs hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hidden sm:flex items-center justify-center -ml-2"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Left Fade Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10 hidden sm:block" />

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex items-center gap-3 overflow-x-auto py-1 px-1 scroll-smooth w-full no-scrollbar select-none cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold shrink-0 pr-3 border-r border-slate-200 pointer-events-none">
                  <Filter className="w-4 h-4 text-indigo-600" />
                  <span>Categories:</span>
                </div>
                <button
                  onClick={() => setSelectedCat('All')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all shadow-2xs ${
                    selectedCat === 'All'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 border border-slate-200/80'
                  }`}
                >
                  All Tools ({TOTAL_TOOLS.toLocaleString()})
                </button>
                {STATIC_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all shadow-2xs ${
                      selectedCat === cat.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                        : 'bg-white text-slate-700 hover:bg-indigo-50/80 hover:text-indigo-600 border border-slate-200/80'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Right Fade Gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10 hidden sm:block" />

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-40 p-2 rounded-full bg-white border border-slate-200 shadow-xs hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all text-slate-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer hidden sm:flex items-center justify-center -mr-2"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
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
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedTools.map((tool) => {
                const IconComp = getIconComponent(tool.iconName);

                return (
                  <LazyRender key={tool.id} placeholderHeight="180px">
                    <div
                      onClick={() => navigate(`/tools/${tool.slug}`)}
                      className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative h-[180px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-xl bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full truncate max-w-[150px]">
                            {tool.category}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                          {tool.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>{formatNumber(tool.usageCount)} uses</span>
                        <span className="font-bold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
              <div className="text-center pt-4">
                <button
                  onClick={() => setPageSize((prev) => prev + 50)}
                  className="px-8 py-3 text-sm font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  Load More Tools ({filtered.length - pageSize} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
