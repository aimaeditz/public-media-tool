import React, { useEffect, useState } from 'react';
import { ChevronRight, Award, HelpCircle, ChevronDown, ChevronUp, Code, Sparkles, Heart, Library } from 'lucide-react';

interface CreditsPageProps {
  navigate: (path: string) => void;
}

export const CreditsPage: React.FC<CreditsPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Credits & Attributions — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Meet the creator and review the technologies that power Public Media Tool. Explore our open-source dependencies, libraries, and design credits.');
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Who is the primary creator of Public Media Tool?",
      a: "Public Media Tool was conceptualized, designed, and developed by the PMT project team to provide fast, private, and accessible online utilities."
    },
    {
      q: "Why is PMT built for client-side execution?",
      a: "By executing logic directly inside your local browser, tools process instantly without uploading your files or text inputs to remote servers."
    },
    {
      q: "Are the icons customized?",
      a: "All visual icons are powered by modern open-source icon repositories for a clean, consistent, and intuitive user interface."
    },
    {
      q: "How can I support the creators or submit suggestions?",
      a: "You can support us by subscribing to our social channels, sharing our platform with friends, or submitting detailed utility suggestions via the Contact Page."
    }
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="credits-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">Credits</span>
        </nav>

        {/* Heading Section */}
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <Award className="w-3.5 h-3.5" /> Creators & Tech
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Credits & Attributions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Acknowledging the creators, frameworks, and designers behind Public Media Tool.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Heart className="w-5.5 h-5.5 text-pink-500 fill-pink-100" /> Creator Profile
            </h2>
            <p>
              <strong>Public Media Tool (PMT)</strong> was conceptualized and developed by an independent team of creators and developers. Recognizing the need for ultra-fast, ad-free, and private online tools, PMT was created to provide everyone with high-utility browser applications that run with complete data integrity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5.5 h-5.5 text-indigo-600" /> Core Design Principles
            </h2>
            <p>
              The platform is built around four fundamental design pillars to deliver an outstanding user experience across desktop and mobile devices:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Instant Execution</h4>
                <p className="text-xs text-slate-500">Calculations and formatters process outputs in milliseconds directly within your browser runtime.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Data Privacy First</h4>
                <p className="text-xs text-slate-500">Inputs and files remain strictly inside local browser session memory without remote server transmission.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Distraction-Free Interface</h4>
                <p className="text-xs text-slate-500">Clean visual hierarchy, high contrast text, and zero paywalls or intrusive popups.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Universal Access</h4>
                <p className="text-xs text-slate-500">All tools are 100% free for personal, academic, and professional use without account registration.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Library className="w-5.5 h-5.5 text-indigo-600" /> Iconography & Design Credits
            </h2>
            <p>
              Special gratitude is extended to the open-source design community for crafting crisp, accessible vector icon sets that power our interface navigation, tool cards, and action indicators.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">Community Appreciation</h2>
            <p>
              We extend our heartfelt thanks to our global community of creators, students, developers, and web users. Your daily feedback, tool requests, and feature ideas continue to guide the expansion of Public Media Tool.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6" id="credits-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Credits FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Information about contributors, licensing, and code usage.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-950 font-heading text-sm sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-2xl transition-all"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
