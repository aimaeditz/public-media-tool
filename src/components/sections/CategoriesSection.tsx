import React from 'react';
import { CATEGORIES, TOOLS } from '../../lib/tools-data';
import { getIconComponent } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  navigate: (path: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Organized Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Explore Tools by Category
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Browse our categorized suites of browser utilities engineered for creators, developers, designers, and marketers.
          </p>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComp = getIconComponent(cat.iconName);
            const count = TOOLS.filter((t) => t.category === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug}`)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
              >
                {/* Top decorative gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.colorGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Large Gradient Icon */}
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.colorGradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
                      {count} {count === 1 ? 'Tool' : 'Tools'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-pink-600 transition-colors">
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
