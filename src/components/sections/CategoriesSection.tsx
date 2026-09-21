import React from 'react';
import { CATEGORIES } from '../../lib/categories';
import { TOTAL_TOOLS } from '../../lib/tools-data';
import { getIconComponent } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  navigate: (path: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ navigate }) => {
  return (
    <section id="categories-section" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Organized Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Explore {TOTAL_TOOLS.toLocaleString()}+ Free Browser Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Browse our categorized suites of browser utilities engineered for creators, developers, designers, and marketers.
          </p>
        </div>

        {/* Categories Grid - 4 columns on desktop, 3 on laptop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const IconComp = getIconComponent(cat.iconName);
            const count = cat.count;

            return (
              <div
                id={`cat-${cat.slug}`}
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug}`)}
                className="group relative bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-[180px] hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Top Row: Icon & Tool Count Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.colorGradient} text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-2xs`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 bg-slate-50 text-slate-600 rounded-full border border-slate-100/80">
                      {count.toLocaleString()} tools
                    </span>
                  </div>

                  {/* Middle Row: Name & Description */}
                  <div className="space-y-1 mt-2.5 flex-grow">
                    <h3 className="font-heading font-extrabold text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Bottom Row: Link */}
                  <div className="pt-3 mt-2.5 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors shrink-0">
                    <span>Explore {count.toLocaleString()} Tools</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
