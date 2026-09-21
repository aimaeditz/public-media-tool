import React from 'react';
import { TOOLS } from '../../lib/tools-data';
import { getIconComponent } from '../../lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LatestAdditionsProps {
  navigate: (path: string) => void;
}

export const LatestAdditions: React.FC<LatestAdditionsProps> = ({ navigate }) => {
  const latestTools = TOOLS.filter((t) => t.isLatest).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600 px-3 py-1 bg-pink-50 rounded-full border border-pink-100 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Fresh Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 mt-2">
              Latest Additions
            </h2>
            <p className="text-sm text-slate-600 mt-1">Fresh tools added recently to expand your browser toolkit.</p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 columns grid desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestTools.map((tool) => {
            const IconComp = getIconComponent(tool.iconName);

            return (
              <div
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="group bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white text-slate-600 border border-slate-200 rounded-full">
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

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">100% Client-Side</span>
                  <button className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 group-hover:bg-pink-600 rounded-lg transition-colors flex items-center gap-1 shadow-xs">
                    Open Tool
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
