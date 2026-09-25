import React, { useState } from 'react';
import { GUIDES } from '../lib/guides-data';
import { useSeo } from '../lib/useSeo';
import { ChevronRight, BookOpen, Clock, Calendar, ChevronDown, ChevronUp, Link2, ArrowLeft, ArrowRight, ShieldCheck, Heart, Sparkles, HelpCircle } from 'lucide-react';

interface GuideDetailPageProps {
  guideSlug: string;
  navigate: (path: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guideSlug, navigate }) => {
  const guide = GUIDES.find(g => g.slug === guideSlug);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // If guide is not found, fallback safely or show basic error
  if (!guide) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 font-heading">Guide Not Found</h2>
        <p className="text-slate-600 mb-6 max-w-md">
          The requested educational guide or article does not exist or has been relocated.
        </p>
        <button
          onClick={() => navigate('/guides')}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
        >
          View All Guides
        </button>
      </div>
    );
  }

  // Schema Markup Generation (JSON-LD)
  const fullUrl = `https://publicmediatool.com/guides/${guide.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://publicmediatool.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": "https://publicmediatool.com/guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": guide.h1,
        "item": fullUrl
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.h1,
    "description": guide.metaDescription,
    "image": "https://publicmediatool.com/og-image.png",
    "datePublished": guide.publishedDate,
    "author": {
      "@type": "Organization",
      "name": "Public Media Tool",
      "url": "https://publicmediatool.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Public Media Tool",
      "logo": {
        "@type": "ImageObject",
        "url": "https://publicmediatool.com/apple-touch-icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, articleSchema, faqSchema]
  };

  useSeo({
    title: guide.title,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: 'article',
    jsonLd: combinedSchema
  });

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleGuidesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/guides');
  };

  // Find other articles for recommendations
  const recommendedGuides = GUIDES.filter(g => g.slug !== guide.slug).slice(0, 3);

  return (
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 space-y-8 sm:space-y-12">
        
        {/* Navigation & Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="guide-detail-breadcrumb">
            <a
              href="/"
              onClick={handleHomeClick}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a
              href="/guides"
              onClick={handleGuidesClick}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Guides
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 line-clamp-1">{guide.category}</span>
          </nav>

          <button
            onClick={() => navigate('/guides')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Guides
          </button>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 md:p-12 shadow-xs space-y-8">
          
          {/* Meta header */}
          <div className="space-y-4 border-b border-slate-100 pb-6 sm:pb-8">
            <div className="max-w-[900px] mx-auto w-full space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                <BookOpen className="w-3.5 h-3.5" /> {guide.category}
              </span>
              
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-tight sm:leading-none">
                {guide.h1}
              </h1>

              <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> {guide.readTime}
                </span>
                <span className="text-slate-200">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" /> Updated {guide.publishedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {guide.heroImage && (
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm my-6">
              <img 
                src={guide.heroImage} 
                alt={guide.heroImageAlt || guide.h1} 
                className="w-full h-auto max-h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Core Content Body */}
          <div 
            className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:leading-relaxed prose-li:leading-relaxed text-xs sm:text-base text-slate-700 space-y-6 sm:space-y-8
                       [&_p]:max-w-[900px] [&_p]:mx-auto
                       [&_h1]:max-w-[900px] [&_h1]:mx-auto
                       [&_h2]:max-w-[900px] [&_h2]:mx-auto
                       [&_h3]:max-w-[900px] [&_h3]:mx-auto
                       [&_h4]:max-w-[900px] [&_h4]:mx-auto
                       [&_h5]:max-w-[900px] [&_h5]:mx-auto
                       [&_h6]:max-w-[900px] [&_h6]:mx-auto
                       [&_ul]:max-w-[900px] [&_ul]:mx-auto
                       [&_ol]:max-w-[900px] [&_ol]:mx-auto
                       [&_blockquote]:max-w-[900px] [&_blockquote]:mx-auto
                       [&_table]:max-w-[900px] [&_table]:mx-auto
                       [&_hr]:max-w-[900px] [&_hr]:mx-auto
                       [&_pre]:w-full [&_pre]:max-w-none [&_code]:w-full [&_code]:max-w-none [&_img]:w-full [&_img]:max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          {/* Internal Links/Related Utilities Card */}
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm sm:text-base font-extrabold font-heading text-slate-950 flex items-center gap-2">
              <Link2 className="w-4.5 h-4.5 text-indigo-600" /> Related Free Browser Utilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on this guide's topic, we highly recommend trying these 100% free, client-side tools designed to secure and speed up your workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {guide.internalLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-700 font-bold text-xs sm:text-sm rounded-xl text-left cursor-pointer transition-all shadow-xs flex items-center justify-between group"
                >
                  <span className="truncate">{link.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

        </article>

        {/* Accordion FAQ Section */}
        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-6" id="guide-faq-section">
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Find technical answers about {guide.category.toLowerCase()} privacy, compliance, and platform standards.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {guide.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 transition-all shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-950 font-heading text-xs sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-xl sm:rounded-2xl transition-all"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Guides Section */}
        <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10">
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900">
              Continue Reading
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Explore other articles from our educational knowledge base.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedGuides.map((rg) => (
              <div
                key={rg.slug}
                className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {rg.category}
                  </span>
                  <h3 className="text-sm font-bold font-heading text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    <a
                      href={`/guides/${rg.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/guides/${rg.slug}`);
                      }}
                    >
                      {rg.h1}
                    </a>
                  </h3>
                </div>
                <button
                  onClick={() => navigate(`/guides/${rg.slug}`)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn cursor-pointer self-start"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
