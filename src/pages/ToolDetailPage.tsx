import React, { useState } from 'react';
import { TOOLS } from '../lib/tools-data';
import { ToolRunner } from '../components/tools/ToolRunner';
import { getIconComponent, formatNumber } from '../lib/utils';
import { Share2, ShieldCheck, ChevronRight, Check, HelpCircle } from 'lucide-react';

interface ToolDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ slug, navigate }) => {
  const [shareCopied, setShareCopied] = useState(false);

  const foundTool = TOOLS.find((t) => t.slug === slug);
  const tool = foundTool || {
    id: slug,
    slug: slug,
    name: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    shortDesc: 'This tool is currently under active development and coming soon.',
    description:
      'We are engineering this tool for 100% client-side privacy and instant browser execution. Stay tuned!',
    category: 'Text Tools' as const,
    iconName: 'Wrench',
    isPopular: false,
    isLatest: false,
    usageCount: 0,
    tags: [slug, 'coming soon'],
    howToUse: [
      { step: 1, title: 'Coming Soon', desc: 'This feature is undergoing client-side engineering and testing.' },
    ],
    faqs: [
      {
        question: 'Is this tool available?',
        answer: 'This tool is coming soon. You can use our interactive scratchpad below in the meantime.',
      },
    ],
  };
  const IconComp = getIconComponent(tool.iconName);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate('/categories')} className="hover:text-indigo-600">Categories</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800">{tool.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600 font-bold truncate">{tool.name}</span>
        </nav>

        {/* Tool Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shrink-0">
              <IconComp className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 uppercase">
                  {tool.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Client-Side
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {tool.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-all"
            >
              {shareCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Working Tool Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <ToolRunner tool={tool} />
        </div>

        {/* How to Use Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
          <h3 className="font-heading font-bold text-lg text-slate-900">How to use {tool.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tool.howToUse.map((step) => (
              <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-xs font-bold text-indigo-600">Step 0{step.step}</span>
                <p className="font-bold text-slate-800 text-sm">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this tool */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {tool.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <p className="font-bold text-slate-800 text-sm">{faq.question}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools Grid */}
        {relatedTools.length > 0 && (
          <div className="space-y-4 pt-4">
            <h3 className="font-heading font-bold text-xl text-slate-900">Related {tool.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((rel) => {
                const RelIcon = getIconComponent(rel.iconName);
                return (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/tools/${rel.slug}`)}
                    className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-2"
                  >
                    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 w-fit">
                      <RelIcon className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm truncate">{rel.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{rel.shortDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
