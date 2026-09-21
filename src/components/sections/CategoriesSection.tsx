import React from 'react';
import { CATEGORIES } from '../../lib/categories';
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
            Explore 15,000+ Free Browser Tools
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Browse our categorized suites of browser utilities engineered for creators, developers, designers, and marketers.
          </p>
        </div>

        {/* Categories Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComp = getIconComponent(cat.iconName);
            const count = cat.count;

            return (
              <div
                id={`cat-${cat.slug}`}
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug}`)}
                className={`group relative bg-gradient-to-br ${cat.colorGradient} text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden border border-white/10`}
              >
                {/* Subtle light overlay to make hover transition smoother */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Semi-transparent icon container */}
                    <div className="p-3 rounded-xl bg-white/15 text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm">
                      {count.toLocaleString()} {count === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/85 mt-1.5 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/90 group-hover:text-white transition-colors relative z-10">
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
