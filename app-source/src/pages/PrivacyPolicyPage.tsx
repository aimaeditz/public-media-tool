import React, { useEffect, useState } from 'react';
import { ChevronRight, Shield, Lock, EyeOff, Database, HelpCircle, ChevronDown, ChevronUp, UserCheck, FileCheck, LifeBuoy } from 'lucide-react';
import { CATEGORIES } from '../lib/categories';

interface PrivacyPolicyPageProps {
  navigate: (path: string) => void;
}

const TOTAL_CATEGORIES = CATEGORIES.length;
const TOTAL_TOOLS = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Privacy Policy — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Read the Privacy Policy for Public Media Tool (PMT). Discover how our 100% client-side browser runtime guarantees total data privacy across our ${TOTAL_TOOLS.toLocaleString()}+ utilities.`
      );
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Does Public Media Tool (PMT) ever upload or store my files, code, or images on remote servers?",
      a: "No, never. Absolute client-side privacy is PMT’s foundational architecture. All files, document uploads, text formatting, image compression, and calculations process strictly inside your local web browser's temporary execution memory. No network packets containing your sensitive assets or input data leave your device."
    },
    {
      q: "What information does PMT store in my browser's Local Storage?",
      a: "We use standard browser localStorage exclusively to persist your user interface preferences—such as your Light/Dark mode choice, your list of favorite tools for quick navigation, and your recently launched utilities. This data is stored locally on your hard drive and can be cleared at any time."
    },
    {
      q: "Does PMT sell or trade user data to third-party ad brokers?",
      a: "No. Because PMT does not harvest user identities, user tracking dossiers, or behavioral history, we have zero personal data to buy, sell, or trade. Your privacy remains entirely uncompromised."
    },
    {
      q: "Is PMT safe for school children and educational institutions?",
      a: "Yes. PMT complies with global digital privacy standards, including COPPA and GDPR principles. Because we do not require account sign-ups or collect personal information, students can safely use our math, scientific, unit conversion, and educational utilities without data collection concerns."
    },
    {
      q: "How can I permanently delete all local preferences stored by PMT?",
      a: "You can clear all stored site data at any time by selecting 'Clear Browsing Data' or clearing cookies/site storage for publicmediatool.com in your web browser settings."
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
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="privacy-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">Privacy Policy</span>
        </nav>

        {/* Heading Section */}
        <div className="space-y-2.5 sm:space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <Shield className="w-3.5 h-3.5" /> Privacy & Security Commitment
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official Privacy Statement • Public Media Tool (PMT)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-6 sm:space-y-8 text-xs sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 1. 100% Client-Side In-Browser Execution
            </h2>
            <p>
              At <strong>Public Media Tool (PMT)</strong>, privacy is engineered into our underlying codebase. Across our catalog of {TOTAL_TOOLS.toLocaleString()}+ utilities across {TOTAL_CATEGORIES} departments, we do not require or execute file uploads to remote cloud servers.
            </p>
            <p>
              Whether you are generating cryptographic hashes, formatting JSON scripts, converting image dimensions, or executing financial calculations, all computational logic runs strictly inside your local browser's JavaScript execution thread. Your raw text, images, financial figures, and document assets remain strictly inside your device memory.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 2. Zero Personal Data Collection & Account-Free Access
            </h2>
            <p>
              PMT operates under a strict no-registration model. We do not prompt users for account creation, email addresses, passwords, social media logins, or payment details.
            </p>
            <p>
              We explicitly do not collect, harvest, store, or sell personal identifiers, device hardware serials, location tracking records, or user profile dossiers. Every visitor enjoys equal, anonymous access to our entire browser utility suite.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 3. Local Browser Storage & Cookie Usage
            </h2>
            <p>
              PMT does not deploy invasive cross-site advertising cookies or behavioral tracking pixels. We utilize standard Web Storage APIs (specifically browser <code>localStorage</code>) strictly to preserve user experience settings:
            </p>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-1 sm:pl-2">
              <li><strong>Interface Preferences:</strong> Saving your preference for Light Mode or Dark Mode displays.</li>
              <li><strong>Tool Shortcuts:</strong> Storing your custom favorited tools for single-click access.</li>
              <li><strong>Recent Workflows:</strong> Maintaining a local history log of recently visited tools for faster navigation.</li>
            </ul>
            <p>
              These configuration records are stored locally on your device storage and are never transmitted to PMT or any external entity.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 4. Children’s Online Privacy Protection
            </h2>
            <p>
              PMT is committed to providing a safe, clean digital environment suitable for users of all ages, including students, educators, and young learners. In full alignment with the Children's Online Privacy Protection Act (COPPA) and international privacy frameworks, PMT never requests or collects personal information from any user. Educational, mathematical, and scientific utilities can be safely utilized in classroom settings without data privacy concerns.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 5. External Links & Third-Party Websites
            </h2>
            <p>
              Our pages may contain occasional hyperlinked references to external web standards, documentation portals, or official contact channels. Please note that when navigating away from PMT to an external web property, their respective terms and privacy policies govern. We recommend reviewing external site policies prior to transmitting information.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900">6. Policy Revisions & Updates</h2>
            <p>
              PMT may periodically update this Privacy Policy to reflect technical enhancements or evolving web standard guidelines. Any modifications will be reflected directly on this page with an updated timestamp. Continued usage of PMT after updates are published signifies complete agreement with our privacy principles.
            </p>
          </section>

          <section className="space-y-2 sm:space-y-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-indigo-600" /> 7. Privacy Inquiries & Direct Contact
            </h2>
            <p>
              If you have any questions, security concerns, or technical inquiries regarding our privacy standards or client-side architecture, please submit them through our official <a href="/contact" className="text-indigo-600 font-semibold hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-6" id="privacy-faq-section">
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Privacy & Data Security FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding data storage, browser security, and client-side isolation on PMT.
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

