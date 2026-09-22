import React, { useState } from 'react';
import { useToolsStore } from '../../lib/tools-store';
import { getIconComponent, formatNumber } from '../../lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PopularToolsProps {
  navigate: (path: string) => void;
}

export const PopularTools: React.FC<PopularToolsProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const tools = useToolsStore((state) => state.tools);

  const filterChips = [
    'All',
    'Text Tools',
    'Image Tools',
    'PDF Tools',
    'Developer Tools',
    'SEO Tools',
    'Color Tools',
    'Converter Tools',
    'Calculator Tools',
    'Security Tools',
    'Web Tools',
  ];

  const filteredTools = activeCategory === 'All'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  const visibleTools = filteredTools.slice(0, visibleCount);

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Handcrafted Utilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Tools That Work For You
          </h2>
          <p className="text-sm text-slate-600">
            Exceptionally useful, free forever browser utilities running completely on your device.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterChips.map((chip) => {
            const isActive = activeCategory === chip;
            return (
              <button
                key={chip}
                onClick={() => {
                  setActiveCategory(chip);
                  setVisibleCount(8);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* 4 cols Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleTools.map((tool) => {
            const IconComp = getIconComponent(tool.iconName);

            return (
              <div
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xs group-hover:scale-105 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {tool.category.split(' ')[0]}
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

        {/* Load More Button */}
        {visibleCount < filteredTools.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-8 py-3 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Load More Tools ({filteredTools.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
