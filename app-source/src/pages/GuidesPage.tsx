import React from 'react';
import { GUIDES } from '../lib/guides-data';
import { useSeo } from '../lib/useSeo';
import { ChevronRight, ArrowRight, BookOpen } from 'lucide-react';

interface GuidesPageProps {
  navigate: (path: string) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ navigate }) => {
  useSeo({
    title: 'Guides & Articles — Public Media Tool',
    description: 'Explore our complete collection of free, high-quality guides and tutorials. Learn how to optimize images, format text, manipulate PDFs, and manage client-side privacy.',
    path: '/guides',
  });

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2 px-1" id="guides-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">Guides</span>
        </nav>

        {/* Letter/page-style card look */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 md:p-12 shadow-sm">
          
          {/* Header */}
          <div className="space-y-2 border-b border-slate-100 pb-6 sm:pb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 px-2.5 py-0.5 bg-indigo-50 rounded-full border border-indigo-100">
              <BookOpen className="w-3 h-3" /> Educational Resources
            </span>
            <h1 className="text-2xl sm:text-3.5xl font-extrabold font-heading text-slate-900 tracking-tight">
              Guides & Articles
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Master your digital workflow with our collection of free, high-quality, privacy-first guides compiled by senior platform engineers.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-8">
            {GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 shadow-2xs hover:shadow-xs rounded-xl p-5 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100/60 text-[9px] font-bold uppercase tracking-wider text-indigo-700 inline-block">
                    {guide.category}
                  </span>
                  
                  <h2 className="text-sm sm:text-base font-bold font-heading text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    <a
                      href={`/guides/${guide.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/guides/${guide.slug}`);
                      }}
                    >
                      {guide.h1}
                    </a>
                  </h2>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {guide.metaDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">
                    {guide.readTime}
                  </span>
                  <button
                    onClick={() => navigate(`/guides/${guide.slug}`)}
                    className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 text-xs group/btn cursor-pointer transition-colors"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
