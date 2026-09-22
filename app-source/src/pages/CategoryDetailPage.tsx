import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../lib/categories';
import { getIconComponent, formatNumber } from '../lib/utils';
import { ArrowRight, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { useToolsStore } from '../lib/tools-store';
import { LazyRender } from '../components/tools/LazyRender';

interface CategoryDetailPageProps {
  categorySlug: string;
  navigate: (path: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ categorySlug, navigate }) => {
  // Check if it is a parent category or direct subcategory
  let isParentCategory = false;
  let category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    const matchingSubs = CATEGORIES.filter((c) => c.parentSlug === categorySlug);
    if (matchingSubs.length > 0) {
      isParentCategory = true;
      const first = matchingSubs[0];
      category = {
        id: first.parentId as any,
        slug: categorySlug,
        name: first.parentId || categorySlug,
        iconName: first.iconName,
        description: `Explore all specialized sub-categories of ${first.parentId || categorySlug}`,
        colorGradient: first.colorGradient,
        bgLight: first.bgLight,
        count: matchingSubs.reduce((sum, c) => sum + c.count, 0),
        subCategories: Array.from(new Set(matchingSubs.map(c => c.name.replace(/ - Part \d+$/, '')))),
        toolSlugs: matchingSubs.flatMap(c => (c as any).toolSlugs || [])
      } as any;
    }
  }

  if (!category) {
    category = CATEGORIES[0];
  }

  const IconComp = getIconComponent(category.iconName);

  const tools = useToolsStore((state) => state.tools);
  const loadCategory = useToolsStore((state) => state.loadCategory);
  const isLoading = useToolsStore((state) => state.isLoading);

  const [selectedSub, setSelectedSub] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Trigger loading this category's tools chunk
  useEffect(() => {
    loadCategory(category.slug);
    setSelectedSub('All');
    setCurrentPage(1);
  }, [category.slug, loadCategory]);

  const categoryTools = isParentCategory
    ? tools.filter((t) => CATEGORIES.some(c => c.parentSlug === categorySlug && (t.category === c.id || t.category === c.parentId)))
    : tools.filter((t) => t.category === category.id || t.category === (category.parentId || category.id));
  
  // Dynamic local filter matching tags or title keywords
  const filteredTools = selectedSub === 'All'
    ? categoryTools
    : categoryTools.filter(
        (t) => {
          if (isParentCategory) {
            return t.category === `${category.id} - ${selectedSub}` || 
                   t.category.startsWith(`${category.id} - ${selectedSub} - Part`) ||
                   t.tags?.some((tag) => tag.toLowerCase() === selectedSub.toLowerCase()) ||
                   t.name.toLowerCase().includes(selectedSub.toLowerCase());
          }
          return t.tags?.some((tag) => tag.toLowerCase() === selectedSub.toLowerCase()) ||
                 t.name.toLowerCase().includes(selectedSub.toLowerCase());
        }
      );

  // Pagination parameters
  const ITEMS_PER_PAGE = 50;
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedTools = filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSubSelect = (sub: string) => {
    setSelectedSub(sub);
    setCurrentPage(1);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 cursor-pointer">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600 font-bold">{category.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className={`bg-gradient-to-br ${category.colorGradient} rounded-3xl p-8 border border-white/10 shadow-lg text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-300" />
          <div className="flex items-start sm:items-center gap-5 relative z-10">
            <div className="p-4 rounded-2xl bg-white/15 text-white backdrop-blur-sm shadow-md shrink-0">
              <IconComp className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 bg-white/20 text-white rounded-full uppercase tracking-wider">
                {category.count.toLocaleString()} tools total
              </span>
              <h1 className="text-3xl font-extrabold font-heading mt-2">
                {category.name}
              </h1>
              <p className="text-sm text-white/95 mt-1 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sub-category Pills */}
        {category.subCategories && Array.isArray(category.subCategories) && category.subCategories.length > 0 && (
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1.5 pr-2 border-r border-slate-200">
              Subcategories:
            </span>
            <button
              onClick={() => handleSubSelect('All')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                selectedSub === 'All'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              All Subcategories
            </button>
            {category.subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubSelect(sub)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
                  selectedSub === sub
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Tools Grid / Loading state */}
        {isLoading && categoryTools.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <span className="text-sm text-slate-600 font-medium">Loading category tools...</span>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-2xs max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-800">No tools found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any tools matching this filter. Try selecting a different subcategory above.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedTools.map((tool) => {
                const ToolIcon = getIconComponent(tool.iconName);

                return (
                  <LazyRender key={tool.id} placeholderHeight="180px">
                    <div
                      onClick={() => navigate(`/tools/${tool.slug}`)}
                      className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative h-[180px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.colorGradient} text-white group-hover:scale-110 transition-transform shadow-2xs`}>
                            <ToolIcon className="w-5 h-5" />
                          </div>
                        </div>

                        <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                          {tool.shortDesc}
                        </p>
                      </div>

                      <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
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
            {totalPages > 1 && (
              <div id="pagination-controls" className="flex items-center justify-center gap-2 pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-xl disabled:opacity-50 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (currentPage > 3 && totalPages > 5) {
                    pageNum = currentPage - 3 + i;
                    if (pageNum + (5 - i - 1) > totalPages) {
                      pageNum = totalPages - 5 + i + 1;
                    }
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-9 h-9 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="px-4 py-2 text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-xl disabled:opacity-50 disabled:hover:bg-white transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
