import React, { useEffect, useState } from 'react';
import { ChevronRight, FileText, HelpCircle, ChevronDown, ChevronUp, CheckCircle, AlertOctagon } from 'lucide-react';

interface TermsPageProps {
  navigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Terms of Service — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Review the Terms of Service for Public Media Tool. Learn about our service guidelines, user responsibilities, and limitation of liability.');
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Who is allowed to use Public Media Tool?",
      a: "Anyone. Public Media Tool is an open-access web platform available globally. There are no fees, mandatory account sign-ups, or subscriptions required to use any of our standard browser tools."
    },
    {
      q: "Can I use the generated/processed outputs in commercial products?",
      a: "Yes. All images, formatted code blocks, calculated formulas, and converted files generated using publicmediatool.com are your sole property. You are permitted to use them for commercial projects, corporate environments, client work, and professional development without royalty obligations."
    },
    {
      q: "Are there any usage limits or fair-use policies?",
      a: "Because all code runs client-side (local to your machine), you do not consume our server computing resources. Therefore, there are no strict usage quotas or rate limits. You can process as many files and use our converters as often as needed."
    },
    {
      q: "What activities are considered prohibited on Public Media Tool?",
      a: "You may not copy, scrape, repackage, or distribute our web code or tools in a way that attempts to pass them off as your own proprietary commercial software, or use our interface inside nested ad-heavy frames without permission."
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
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="terms-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">Terms of Service</span>
        </nav>

        {/* Heading Section */}
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <FileText className="w-3.5 h-3.5" /> Terms & Agreements
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: September 21, 2026 • Public Media Tool (publicmediatool.com)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5.5 h-5.5 text-indigo-600" /> 1. Acceptance of Terms
            </h2>
            <p>
              By visiting, browsing, or utilizing the services of <strong>publicmediatool.com</strong>, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these regulations, please discontinue your use of our platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">2. Permitted Use & Service Provision</h2>
            <p>
              Public Media Tool provides open-access browser-based utilities including, but not limited to, calculators, converters, image formatters, and web developer tools. You are granted a limited, revocable, non-exclusive, and non-transferable license to access and use our website strictly for personal, academic, professional, and commercial tasks.
            </p>
            <p>
              All tool processing runs 100% locally within your browser using HTML5 Canvas, JavaScript, CSS, and related local web standards. We do not charge fees or require account credits to use our web utilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-5.5 h-5.5 text-indigo-600" /> 3. Prohibited Activities
            </h2>
            <p>
              In using our website, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Deploy automated scraping scripts, bots, or web spiders to crawl or copy our code structure for competitors.</li>
              <li>Rebrand, frame, or white-label Public Media Tool utilities on other ad-laden domains without our written consent.</li>
              <li>Attempt to disrupt or overload our hosting server infrastructure, even though the tool execution itself runs client-side.</li>
              <li>Use our utilities to format, compile, or process code blocks that contain malicious computer viruses or tracking malware.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">4. Intellectual Property</h2>
            <p>
              The design layouts, user interface styles, branding icons, source code scripts, and organizational graphics of Public Media Tool are the exclusive intellectual property of <strong>AiMAEditz</strong> and contributors. These are protected under international copyright and intellectual property treaties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">5. Limitation of Liability</h2>
            <p>
              Under no circumstances shall Public Media Tool, its creators, partners, or developers be held liable for any indirect, incidental, consequential, special, or exemplary damages—including but not limited to lost profit margins, data loss, software disruption, or business interruptions—arising from your use or inability to use our website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">6. Amendments to Terms</h2>
            <p>
              We reserve the right to revise or update these Terms of Service at our sole discretion. Any changes will be posted directly to this page with an updated revision date. Your continued use of publicmediatool.com after modifications are published constitutes complete agreement to the updated terms.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6" id="terms-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Terms FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear breakdowns of our usage rules and service expectations.
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
