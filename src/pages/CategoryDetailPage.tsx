import React from 'react';
import { CATEGORIES, TOOLS } from '../lib/tools-data';
import { getIconComponent, formatNumber } from '../lib/utils';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CategoryDetailPageProps {
  categorySlug: string;
  navigate: (path: string) => void;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({ categorySlug, navigate }) => {
  const category = CATEGORIES.find((c) => c.slug === categorySlug) || CATEGORIES[0];
  const IconComp = getIconComponent(category.iconName);
  const categoryTools = TOOLS.filter((t) => t.category === category.id);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/categories')} className="hover:text-indigo-600">Categories</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600 font-bold">{category.name}</span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs flex items-start gap-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.colorGradient} text-white shadow-md shrink-0`}>
            <IconComp className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase">
              {categoryTools.length} Tools Available
            </span>
            <h1 className="text-3xl font-extrabold font-heading text-slate-900 mt-2">
              {category.name}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map((tool) => {
            const ToolIcon = getIconComponent(tool.iconName);

            return (
              <div
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ToolIcon className="w-5 h-5" />
                    </div>
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
      </div>
    </div>
  );
};
