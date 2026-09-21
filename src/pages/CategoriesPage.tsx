import React from 'react';
import { CATEGORIES } from '../lib/categories';
import { getIconComponent } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

interface CategoriesPageProps {
  navigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            All Categories
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            Browse Tools by Category
          </h1>
          <p className="text-sm text-slate-600">
            Find the right tools organized into 10 specialized categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComp = getIconComponent(cat.iconName);
            const count = cat.count;

            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/categories/${cat.slug}`)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.colorGradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {count} {count === 1 ? 'Tool' : 'Tools'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-pink-600 transition-colors">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
