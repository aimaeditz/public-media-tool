import React, { useState, useEffect } from 'react';
import { Tool, ToolStep, ToolFaq } from '../lib/types';
import { TOOLS, TOTAL_TOOLS } from '../lib/tools-data';
import { SEARCH_INDEX } from '../lib/search-index';
import { CATEGORIES } from '../lib/categories';
import { getIconComponent, formatNumber } from '../lib/utils';
import {
  Share2,
  ShieldCheck,
  ChevronRight,
  Check,
  HelpCircle,
  Tag,
  Layers,
  ArrowRight,
  Zap,
  Lock,
  Smartphone,
  Cpu,
  BookmarkPlus,
  Compass,
} from 'lucide-react';
import { useToolsStore } from '../lib/tools-store';
import { useSeo, BASE_URL } from '../lib/useSeo';
import {
  generateToolKeywords,
  generateToolFaqs,
  generateToolHowTo,
  generateLongTailPresets,
  generateToolSchema,
} from '../lib/seo-engine';

const ToolRunner = React.lazy(() =>
  import('../components/tools/ToolRunner').then((m) => ({ default: m.ToolRunner }))
);

interface ToolDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({ slug, navigate }) => {
  const [shareCopied, setShareCopied] = useState(false);
  const storeTools = useToolsStore((state) => state.tools);
  const loadCategory = useToolsStore((state) => state.loadCategory);

  const foundTool = TOOLS.find((t) => t.slug === slug) || storeTools.find((t) => t.slug === slug);
  const searchItem = SEARCH_INDEX.find((item) => item.slug === slug);

  // Auto-load category chunk if the visited tool isn't already loaded
  useEffect(() => {
    if (!foundTool && searchItem) {
      const categorySlug = searchItem.category
        .toLowerCase()
        .replace(/ & /g, '-')
        .replace(/\s+/g, '-');
      loadCategory(categorySlug);
    }
  }, [slug, foundTool, searchItem, loadCategory]);

  const tool: Tool = (foundTool || (searchItem ? {
    id: searchItem.id,
    slug: searchItem.slug,
    name: searchItem.name,
    shortDesc: searchItem.shortDesc,
    description: searchItem.shortDesc,
    category: searchItem.category as any,
    iconName: searchItem.iconName,
    isPopular: false,
    isLatest: false,
    usageCount: searchItem.usageCount || 1000,
    tags: searchItem.tags || [slug],
    keywords: searchItem.keywords || searchItem.tags || [slug],
  } : {
    id: slug,
    slug: slug,
    name: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    shortDesc: 'Instant client-side browser utility for high-performance productivity.',
    description:
      'Fast, private client-side execution with zero latency and 100% browser data security.',
    category: 'Utilities' as any,
    iconName: 'Wrench',
    usageCount: 1500,
    tags: [slug, 'online tool', 'browser utility'],
    keywords: [slug, 'online tool', 'browser utility'],
  })) as Tool;

  const categorySlug = tool?.category
    ? (CATEGORIES.find((c) => c.id === tool.category)?.slug ||
       tool.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-'))
    : 'general';

  // Keyword Expansion (50+ variations)
  const expandedKeywords = generateToolKeywords(tool);
  const toolFaqs = generateToolFaqs(tool);
  const howToUseSteps = generateToolHowTo(tool);
  const presets = generateLongTailPresets(tool);
  const schemaJsonLd = generateToolSchema(tool, categorySlug);

  // SEO Title: 50-60 chars, Primary keyword first
  const seoTitle = `${tool.name} — Free Online Tool | Public Media Tool`;

  // Meta description: 135-155 chars, Unique, CTA
  const rawShort = tool.shortDesc || tool.description || 'Fast online utility';
  const cleanShort = rawShort.endsWith('.') ? rawShort.slice(0, -1) : rawShort;
  let toolDesc = `Use ${tool.name} online for free. ${cleanShort}. 100% private, client-side with zero server uploads. Fast, simple, and instant.`;
  if (toolDesc.length > 155) {
    toolDesc = `Use ${tool.name} free online. ${cleanShort}. 100% private browser tool with zero uploads. Try now with no signup.`;
  }
  if (toolDesc.length > 155) {
    const maxLen = 152 - (tool.name.length + 55);
    const trimmed = cleanShort.slice(0, Math.max(10, maxLen)) + '...';
    toolDesc = `Use ${tool.name} free online. ${trimmed}. 100% private browser tool with zero uploads. Try now.`;
  }

  useSeo({
    title: seoTitle,
    description: toolDesc,
    path: `/tools/${slug}`,
    jsonLd: schemaJsonLd,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

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

  // Sideways Related Tools in Same Category
  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 4);

  // Sibling Categories for Cross-Category Discovery
  const siblingCategories = CATEGORIES.filter((c) => c.slug !== categorySlug).slice(0, 4);

  return (
    <div className="pt-6 sm:pt-10 pb-16 sm:pb-32 lg:pb-36 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500 overflow-x-auto scrollbar-none pb-1">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 shrink-0 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => navigate('/categories')} className="hover:text-indigo-600 shrink-0 cursor-pointer">
            Categories
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => navigate(`/categories/${categorySlug}`)} className="text-slate-800 hover:text-indigo-600 shrink-0 cursor-pointer">
            {tool.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-indigo-600 font-bold truncate max-w-[180px] sm:max-w-none">
            {tool.name}
          </span>
        </nav>

        {/* Tool Header Banner - Exactly one <h1> */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shrink-0">
              <IconComp className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <button
                  onClick={() => navigate(`/categories/${categorySlug}`)}
                  className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors rounded-full border border-indigo-100 uppercase cursor-pointer"
                >
                  {tool.category}
                </button>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Client-Side Privacy
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
                  <Zap className="w-3 h-3 mr-0.5" /> Instant Local Engine
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {tool.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {tool.description || tool.shortDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
            <button
              onClick={handleShare}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              {shareCopied ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              ) : (
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              <span>{shareCopied ? 'Link Copied!' : 'Share Tool'}</span>
            </button>
          </div>
        </div>

        {/* Working Tool Interactive Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-md">
          <React.Suspense
            fallback={
              <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 text-indigo-600 animate-spin border-4 border-slate-200 border-t-indigo-600 rounded-full" />
                <span className="text-sm text-slate-500 font-medium">Preparing interactive tool...</span>
              </div>
            }
          >
            <ToolRunner tool={tool} />
          </React.Suspense>
        </div>

        {/* Programmatic Long-Tail Preset Quick-Start Cards */}
        {presets.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-3 sm:space-y-4">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <BookmarkPlus className="w-4.5 h-4.5 text-indigo-600" /> Programmatic Presets & Long-Tail Modes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Quickly launch pre-configured calculation profiles and specialized workflows for {tool.name}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
              {presets.map((preset, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                      Preset {idx + 1}
                    </span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm">{preset.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{preset.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comprehensive On-Page Explanation (150-300+ Words Structured Body) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              About {tool.name} & Client-Side Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>{tool.name}</strong> is an engineered browser-based utility developed for fast, secure, and accurate execution in the {tool.category} domain. Designed with modern client-side standards, all data transformations, calculations, and rendering algorithms occur entirely in your local browser environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4" /> 100% Private & Safe
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero uploads to external servers. Your confidential data, numbers, and inputs never leave your device.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Cpu className="w-4 h-4" /> Instant Local Engine
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optimized JavaScript Web APIs provide sub-millisecond calculation speeds without network roundtrips.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Smartphone className="w-4 h-4" /> Responsive Everywhere
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully functional across desktop browsers, mobile tablets, and smartphones with no app downloads required.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
              Who is {tool.name} designed for?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are a developer, content creator, student, accountant, business owner, or engineer, this tool delivers immediate, accurate outputs without subscription barriers, logins, or tedious software installs.
            </p>
          </div>
        </div>

        {/* How to Use Steps */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-3 sm:space-y-4">
          <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900">
            How to use {tool.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {howToUseSteps.map((step: ToolStep) => (
              <div key={step.step} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-xs font-bold text-indigo-600">Step 0{step.step}</span>
                <p className="font-bold text-slate-800 text-xs sm:text-sm">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this tool */}
        {toolFaqs.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-3 sm:space-y-4">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <div className="space-y-2.5 sm:space-y-3">
              {toolFaqs.map((faq: ToolFaq, i: number) => (
                <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{faq.question}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semantic Keyword Tags / Search Topics (~50 Targeted Queries) */}
        {expandedKeywords.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-3">
            <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" /> Targeted Search Queries & Related Keywords
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {expandedKeywords.map((tag: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/tools?q=${encodeURIComponent(tag)}`)}
                  className="px-2.5 py-1 text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200/80 rounded-lg hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors cursor-pointer text-left"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hub-and-Spoke Category Hub Link */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Category Hub
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Explore More {tool.category} Tools
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Discover all related free online browser utilities in the {tool.category} category.
            </p>
          </div>
          <button
            onClick={() => navigate(`/categories/${categorySlug}`)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>View {tool.category} Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Related Tools Grid (Sideways Internal Linking) */}
        {relatedTools.length > 0 && (
          <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
              Related {tool.category} Utilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {relatedTools.map((rel: Tool) => {
                const RelIcon = getIconComponent(rel.iconName);
                return (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/tools/${rel.slug}`)}
                    className="p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer space-y-1.5 sm:space-y-2"
                  >
                    <div className="p-2 sm:p-2.5 rounded-lg bg-indigo-50 text-indigo-700 w-fit">
                      <RelIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{rel.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{rel.shortDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cross-Category Discovery Grid (Inter-hub Linking) */}
        {siblingCategories.length > 0 && (
          <div className="space-y-3 sm:space-y-4 pt-2">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-indigo-600" /> Explore Other Popular Tool Hubs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {siblingCategories.map((cat) => {
                const CatIcon = getIconComponent(cat.iconName);
                return (
                  <div
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex items-center gap-3"
                  >
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 shrink-0">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">{cat.name}</p>
                      <p className="text-[11px] text-slate-500">{cat.count} Free Tools</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Closing Helper Section for Natural Spacing */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left mt-6 sm:mt-10">
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl">
            <h3 className="text-sm sm:text-base font-bold font-heading text-slate-900">
              Need another browser utility?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore {formatNumber(TOTAL_TOOLS)}+ free, instant, and private tools across {CATEGORIES.length}+ specialized categories on Public Media Tool.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => navigate('/tools')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Browse All Tools
            </button>
            <button
              onClick={() => navigate('/categories')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              View Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
