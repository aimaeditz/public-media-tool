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
      a: "The suite was designed, conceptualized, and built by AiMAEditz (with social presence on YouTube @aimabideditz and Instagram @its_abid29)."
    },
    {
      q: "Why is the tech stack chosen for Client-Side execution?",
      a: "By combining React 19 and Vite's superfast compilation, tools load instantly and execute calculations in milliseconds. Tailwind CSS ensures that every card, form field, and transition behaves smoothly and looks extremely clean."
    },
    {
      q: "Are the icons customized?",
      a: "All vector icons are powered by the gorgeous Lucide React open-source icon repository, which provides sleek, consistent, and customizable stroke indicators."
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
              <strong>Public Media Tool</strong> was developed by <strong>AiMAEditz</strong>, an independent developer and designer. Inspired by the lack of fast, ad-free, and truly private online tools, AiMAEditz designed this single unified platform where users can process files with absolute data integrity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Code className="w-5.5 h-5.5 text-indigo-600" /> Tech Stack Breakdown
            </h2>
            <p>
              The application is engineered on top of cutting-edge client-side web technologies to guarantee maximum security, high rendering performance, and a delightful interface:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>React 19:</strong> Leading-edge component-based UI rendering.</li>
              <li><strong>Vite:</strong> The ultra-fast, modern frontend build tool.</li>
              <li><strong>Tailwind CSS v4:</strong> Providing crisp, responsive utilities, and mathematically precise layouts.</li>
              <li><strong>TypeScript:</strong> Providing bulletproof type safety and reliable functional states.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Library className="w-5.5 h-5.5 text-indigo-600" /> Libraries & Dependencies
            </h2>
            <p>
              Special gratitude is extended to the open-source community. The following high-quality packages and libraries are integrated into our tool modules:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Lucide React</h4>
                <p className="text-xs text-slate-500 mt-1">Clean, simple vector icons used universally across our sidebar, navbar, buttons, and layouts.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Framer Motion</h4>
                <p className="text-xs text-slate-500 mt-1">Sleek entering transitions, layout animations, and modal overlays.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Zustand</h4>
                <p className="text-xs text-slate-500 mt-1">A lightweight, lightning-fast state store managing user favorites and recent tool items.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Canvas Confetti</h4>
                <p className="text-xs text-slate-500 mt-1">Delightful, light micro-interactions upon successful submissions.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5.5 h-5.5 text-indigo-600" /> Inspiration Sources
            </h2>
            <p>
              The architectural approach of Public Media Tool was inspired by developers advocating for a "No-Cloud" and offline-first web. We believe that simple media adjustments, cryptographic hashing, calculations, and conversions do not need cloud processing. Keeping data client-side is faster, cheaper, and infinitely more secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">Special Thanks</h2>
            <p>
              We want to thank our loyal community of creators, designers, and developers. Your daily feedback and comments inspire us to research, optimize, and expand the Public Media Tool repository every week.
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
