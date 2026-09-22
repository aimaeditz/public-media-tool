import React, { useEffect, useState } from 'react';
import { ChevronRight, Award, HelpCircle, ChevronDown, ChevronUp, Sparkles, Heart, Globe, Layers, Feather } from 'lucide-react';

interface CreditsPageProps {
  navigate: (path: string) => void;
}

export const CreditsPage: React.FC<CreditsPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Credits & Attributions — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Acknowledging the open-source creators, icon designers, open typography, and international standards bodies that inspire Public Media Tool (PMT).'
      );
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Who created Public Media Tool (PMT)?',
      a: 'The project was conceptualized and created by AiMAEditz with the vision of providing a 100% free, private, and frictionless workspace of browser utilities for users globally.',
    },
    {
      q: 'How are design and icon assets attributed?',
      a: 'All interface iconography is sourced from the open-source Lucide Project under the ISC permissive license. Fonts and typography are drawn from open-font initiatives curated through Google Fonts.',
    },
    {
      q: 'What international standards do PMT tools follow?',
      a: 'Calculations, converters, formatting, and character tables strictly adhere to published international specifications from W3C, the Unicode Consortium, IETF RFCs, and ISO metric standards.',
    },
    {
      q: 'How can community members support or contribute to PMT?',
      a: 'You can support Public Media Tool by recommending our utilities, sharing with colleagues, or submitting suggestions and feature requests via our Contact Page.',
    },
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
            <Award className="w-3.5 h-3.5" /> Acknowledgments & Attributions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Credits & Attributions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Honoring the open-source community, icon designers, font foundries, and international standards bodies behind Public Media Tool (PMT).
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-10 text-sm sm:text-base text-slate-600 leading-relaxed">
          {/* Creator Profile */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Heart className="w-5.5 h-5.5 text-pink-500 fill-pink-100" /> Project Creator
            </h2>
            <p>
              <strong>Public Media Tool (PMT)</strong> was designed and spearheaded by <strong>AiMAEditz</strong>, an independent creator and designer. Frustrated by utility websites burdened with paywalls, invasive tracking, and forced uploads, AiMAEditz founded PMT to provide an accessible, high-speed, and private tool environment for everyone.
            </p>
          </section>

          {/* Design & Iconography */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Feather className="w-5.5 h-5.5 text-indigo-600" /> Design & Iconography
            </h2>
            <p>
              Our intuitive, modern visual experience is made possible by exceptional open-source design resources:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Lucide Icons</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Beautiful, consistent, and balanced vector icons that bring clarity and precision to every tool card, category badge, and control element.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <h4 className="font-bold text-slate-900 text-sm">Open Typography</h4>
                <p className="text-xs text-slate-500 mt-1">
                  High-legibility typography designed for readability across mobile, tablet, and desktop screens, crafted with open font licenses.
                </p>
              </div>
            </div>
          </section>

          {/* Standards Bodies */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Globe className="w-5.5 h-5.5 text-indigo-600" /> Standards Bodies & Scientific Specifications
            </h2>
            <p>
              Every conversion formula, text transformation, and data encoder on PMT is strictly aligned with the rigorous specifications established by international open standards organizations:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm">
              <li>
                <strong>World Wide Web Consortium (W3C):</strong> Open web standards ensuring universal interoperability, accessibility, and client-side processing accuracy.
              </li>
              <li>
                <strong>Unicode Consortium:</strong> Standardized character encoding, UTF-8/UTF-16 conversions, character metrics, and glyph tables.
              </li>
              <li>
                <strong>Internet Engineering Task Force (IETF):</strong> Protocol and format RFCs governing URL encoding, MIME types, and cryptographic hashing specifications.
              </li>
              <li>
                <strong>International Organization for Standardization (ISO):</strong> Standard definitions for units of measurement, date-time representations (ISO 8601), and currency conventions.
              </li>
              <li>
                <strong>National Institute of Standards and Technology (NIST):</strong> Cryptographic test vectors and reference implementations for secure hash algorithms (SHA-256, SHA-512).
              </li>
            </ul>
          </section>

          {/* Open-Source Community */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Layers className="w-5.5 h-5.5 text-indigo-600" /> Open-Source Collaboration
            </h2>
            <p>
              Public Media Tool stands on the shoulders of the global open-source community. We express our deepest gratitude to the thousands of independent contributors, documentation writers, and maintainers worldwide who make open, accessible computing possible for all.
            </p>
          </section>

          {/* Community Thanks */}
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5.5 h-5.5 text-amber-500" /> Community & User Feedback
            </h2>
            <p>
              Our sincere thanks go out to every student, professional, creator, and everyday user who uses PMT, shares our utilities, and provides helpful suggestions to continually refine our platform.
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
              Information about attributions, open standards, and licensing across PMT.
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
