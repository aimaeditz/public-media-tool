import React, { useEffect, useState } from 'react';
import { ChevronRight, FileText, HelpCircle, ChevronDown, ChevronUp, CheckCircle, AlertOctagon, ShieldCheck, Scale, Award } from 'lucide-react';
import { CATEGORIES } from '../lib/categories';

interface TermsPageProps {
  navigate: (path: string) => void;
}

const TOTAL_CATEGORIES = CATEGORIES.length;
const TOTAL_TOOLS = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Terms of Service — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Review the Terms of Service for Public Media Tool (PMT). Learn about our service guidelines, commercial usage permissions, and liability conditions across our ${TOTAL_TOOLS.toLocaleString()}+ browser utilities.`
      );
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Who is eligible to use Public Media Tool (PMT)?",
      a: "Anyone worldwide. Public Media Tool (PMT) is an open-access web utility suite available globally to individuals, students, creators, professionals, and enterprise workers. There are no registration fees, mandatory logins, or subscription paywalls."
    },
    {
      q: "Can I use PMT tools, formatted outputs, and converted files in commercial client projects?",
      a: "Yes, absolutely. All formatted text code, converted media files, calculated reports, and generated output assets created using PMT are your exclusive property. You are granted royalty-free commercial usage rights for client work, commercial applications, corporate documentation, and professional products."
    },
    {
      q: "Are there daily execution rate limits or usage quotas?",
      a: "No. Because all tool calculations execute client-side within your browser runtime memory, PMT does not impose bandwidth throttling or artificial rate limits. You may process as many files and execute as many calculations as your local hardware device supports."
    },
    {
      q: "What conduct is considered strictly prohibited on PMT?",
      a: "Prohibited conduct includes deploying automated web scrapers or bots to replicate our software catalog, white-labeling or wrapping PMT interfaces inside ad-heavy frame wrappers without authorization, or attempting to distribute malware using our text or file fields."
    },
    {
      q: "How does PMT handle modifications to these Terms of Service?",
      a: "PMT periodically reviews and updates these Terms to align with new features and global web standards. Updated versions will be published directly to this page with an updated timestamp."
    }
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-24 md:pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
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
        <div className="space-y-2.5 sm:space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <FileText className="w-3.5 h-3.5" /> Terms & Service Agreements
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official Terms of Service • Public Media Tool (PMT)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-6 sm:space-y-8 text-xs sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 1. Binding Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing any of the digital utilities, calculators, formatters, or converters hosted on <strong>Public Media Tool (PMT)</strong> (publicmediatool.com), covering our complete suite of {TOTAL_TOOLS.toLocaleString()}+ tools across {TOTAL_CATEGORIES} specialized departments, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service.
            </p>
            <p>
              If you do not agree with any part of these operational guidelines, please refrain from accessing or utilizing our browser tools.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 2. Permitted Use & Commercial Rights
            </h2>
            <p>
              PMT grants users a worldwide, non-exclusive, revocable, royalty-free license to utilize our browser software utilities for personal, academic, professional, and commercial tasks.
            </p>
            <p>
              <strong>Ownership of Output Data:</strong> All outputs, formatted code blocks, converted media files, generated graphics, calculated financial tables, and transformed datasets produced through PMT utilities belong entirely to you. You maintain full ownership and commercial distribution rights without royalty obligations to PMT.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 3. Prohibited Conduct & Platform Integrity
            </h2>
            <p>
              To safeguard site performance and protect intellectual property, users agree not to engage in the following prohibited activities:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-1 sm:pl-2">
              <li>Deploying automated web scraping scripts, bots, or spiders to harvest our source code, tool schemas, or catalog structures.</li>
              <li>White-labeling, framing, or wrapping PMT interfaces inside unauthorized secondary ad-laden websites or paid applications.</li>
              <li>Attempting to introduce malicious software scripts, virus payloads, or exploits through input fields or file drag-and-drop zones.</li>
              <li>Distributing or misrepresenting PMT software code as your own proprietary commercial product.</li>
            </ul>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 4. Intellectual Property & Brand Ownership
            </h2>
            <p>
              The visual interface design, layout structure, brand identity assets, site icons, graphics, and underlying source code modules of Public Media Tool (PMT) are protected under international copyright, trademark, and intellectual property frameworks. Unapproved duplication, redistribution, or commercial resale of PMT website architecture is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 5. Limitation of Liability
            </h2>
            <p>
              Under no circumstances shall Public Media Tool (PMT), its developers, maintainers, or affiliates be held liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of profits, data corruption, system downtime, or commercial interruptions) arising out of the use or inability to use our browser utilities.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900">6. Revisions & Governing Expectations</h2>
            <p>
              PMT reserves the right to amend, update, or revise these Terms of Service at any time to accommodate new tools, security enhancements, or legal standards. Updated versions will be published on this page with an updated timestamp. Continued usage of publicmediatool.com after modifications are posted constitutes complete acceptance of the revised Terms.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-6" id="terms-faq-section">
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Terms & Service Usage FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear breakdowns of our usage rules, commercial permissions, and service agreements.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 transition-all shadow-xs overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left font-bold text-slate-950 font-heading text-xs sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-xl sm:rounded-2xl transition-all"
                >
                  <span className="pr-3 sm:pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="p-3.5 sm:p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
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

