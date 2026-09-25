import React, { useMemo } from 'react';
import { CATEGORIES } from '../../lib/categories';
import { getIconComponent } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  navigate: (path: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ navigate }) => {
  // Select the top prioritized categories to feature on the homepage
  const featuredCategories = useMemo(() => {
    return CATEGORIES.slice(0, 16);
  }, []);

  const totalToolsCount = useMemo(() => {
    return CATEGORIES.reduce((s, c) => s + (c.count || 0), 0);
  }, []);

  return (
    <section id="categories-section" className="py-10 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Organized Workspace
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Explore Tools by Category
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            Browse {CATEGORIES.length}+ categories with {totalToolsCount.toLocaleString()}+ free browser tools
          </p>
        </div>

        {/* Categories Grid - 4 columns on desktop, 3 on laptop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {featuredCategories.map((cat) => {
            const IconComp = getIconComponent(cat.iconName);
            const count = cat.count;

            return (
              <div
                id={`cat-${cat.slug}`}
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug}`)}
                className="group relative bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] min-h-[150px] sm:h-[180px] hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Top Row: Icon & Tool Count Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${cat.colorGradient} text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-2xs`}>
                      <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 bg-slate-50 text-slate-600 rounded-full border border-slate-100/80">
                      {count.toLocaleString()} tools
                    </span>
                  </div>

                  {/* Middle Row: Name & Description */}
                  <div className="space-y-1 mt-2 sm:mt-2.5 flex-grow">
                    <h3 className="font-heading font-extrabold text-slate-800 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Row: Link */}
                  <div className="pt-2.5 sm:pt-3 mt-2 sm:mt-2.5 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors shrink-0">
                    <span className="text-[11px] sm:text-xs">Explore {count.toLocaleString()} Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Button */}
        <div className="flex justify-center pt-3 sm:pt-6">
          <button
            onClick={() => navigate('/categories')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold text-white bg-indigo-600 rounded-xl sm:rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-98 transition-all duration-200 cursor-pointer"
          >
            See All {CATEGORIES.length}+ Categories
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
