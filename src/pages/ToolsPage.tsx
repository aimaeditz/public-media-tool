import React, { useState, useEffect } from 'react';
import { TOOLS, CATEGORIES } from '../lib/tools-data';
import { getIconComponent, formatNumber } from '../lib/utils';
import { Search, ArrowRight, Filter, Sparkles, X, RotateCcw } from 'lucide-react';

interface ToolsPageProps {
  navigate: (path: string) => void;
  initialQuery?: string;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ navigate, initialQuery = '' }) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  useEffect(() => {
    if (initialQuery !== undefined) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  const filtered = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = selectedCat === 'All' || tool.category === selectedCat;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
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
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by tool name or keyword..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-md hover:bg-slate-200 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <button
              onClick={() => setSelectedCat('All')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 cursor-pointer ${
                selectedCat === 'All' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({TOOLS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 cursor-pointer ${
                  selectedCat === cat.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid / Empty state */}
        {filtered.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tool) => {
              const IconComp = getIconComponent(tool.iconName);

              return (
                <div
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.slug}`)}
                  className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
