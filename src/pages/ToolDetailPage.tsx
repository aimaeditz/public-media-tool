import React, { useState, useEffect } from 'react';
import { TOOLS } from '../lib/tools-data';
import { getIconComponent, formatNumber } from '../lib/utils';
import { Share2, ShieldCheck, ChevronRight, Check, HelpCircle } from 'lucide-react';
import { useToolsStore } from '../lib/tools-store';

const ToolRunner = React.lazy(() => import('../components/tools/ToolRunner').then(m => ({ default: m.ToolRunner })));

interface ToolDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ slug, navigate }) => {
  const [shareCopied, setShareCopied] = useState(false);
  const storeTools = useToolsStore((state) => state.tools);
  const loadCategory = useToolsStore((state) => state.loadCategory);

  // Auto-load category chunk if the visited tool isn't already loaded
  useEffect(() => {
    const isLoaded = storeTools.some((t) => t.slug === slug) || TOOLS.some((t) => t.slug === slug);
    if (!isLoaded) {
      import('../lib/search-index').then((m) => {
        const indexItem = m.SEARCH_INDEX.find((item) => item.slug === slug);
        if (indexItem) {
          const categorySlug = indexItem.category
            .toLowerCase()
            .replace(/ & /g, '-')
            .replace(/\s+/g, '-');
          loadCategory(categorySlug);
        }
      }).catch((err) => {
        console.warn('Failed to load search index in ToolDetailPage:', err);
      });
    }
  }, [slug, storeTools, loadCategory]);

  const foundTool = storeTools.find((t) => t.slug === slug) || TOOLS.find((t) => t.slug === slug);
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tool) {
      document.title = `${tool.name} - Free Online Client-Side Tool | Public Media Tool`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${tool.name}: ${tool.shortDesc} 100% private, client-side execution in your browser.`);
      }
    }
  }, [tool]);

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

  const howToUseSteps = (tool.howToUse && Array.isArray(tool.howToUse) && tool.howToUse.length > 0)
    ? tool.howToUse
    : [
        { step: 1, title: 'Input Parameters', desc: `Provide or customize the values for ${tool.name}.` },
        { step: 2, title: 'Calculate Instantly', desc: 'Results are computed immediately in your browser with zero latency.' },
        { step: 3, title: 'Copy & Use', desc: 'Copy formatted output or download generated files securely to your device.' },
      ];

  const toolFaqs = (tool.faqs && Array.isArray(tool.faqs) && tool.faqs.length > 0)
    ? tool.faqs
    : [
        {
          question: `Is ${tool.name} free to use?`,
          answer: 'Yes, 100% free with unlimited local browser operations and no account required.',
        },
        {
          question: 'Is my input data uploaded to any remote server?',
          answer: 'No! All processing runs directly on your machine via client-side Web APIs.',
        },
      ];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
          <React.Suspense fallback={
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-8 h-8 text-indigo-600 animate-spin border-4 border-slate-200 border-t-indigo-600 rounded-full" />
              <span className="text-sm text-slate-500 font-medium">Preparing interactive tool...</span>
            </div>
          }>
            <ToolRunner tool={tool} />
          </React.Suspense>
        </div>

        {/* How to Use Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
          <h3 className="font-heading font-bold text-lg text-slate-900">How to use {tool.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howToUseSteps.map((step) => (
              <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-xs font-bold text-indigo-600">Step 0{step.step}</span>
                <p className="font-bold text-slate-800 text-sm">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this tool */}
        {toolFaqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {toolFaqs.map((faq, i) => (
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
