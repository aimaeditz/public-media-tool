import React, { useEffect, useState } from 'react';
import { ChevronRight, Shield, Lock, EyeOff, Database, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface PrivacyPolicyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Privacy Policy — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read the Public Media Tool Privacy Policy. Learn how our 100% client-side execution model guarantees absolute privacy for all your processed data and files.');
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Does Public Media Tool save or upload any of my files or data?",
      a: "No. Absolutely none of your files, images, code, or inputs are uploaded to our servers. Every tool operates entirely within your web browser runtime using HTML5 client-side APIs, ensuring your data never leaves your device."
    },
    {
      q: "What does Public Media Tool use Local Storage for?",
      a: "We utilize your browser's local storage solely to store user preferences, such as your dark/light theme choice, your recently used tools, and your favorited tools. This is 100% local to your browser and can be cleared at any time."
    },
    {
      q: "Are there any tracking cookies or third-party analytical tools used?",
      a: "We do not use invasive tracking or behavioral targeting cookies. We prioritize clean, modern, and non-intrusive web design. Any basic analytics we might use are completely anonymized and do not link back to personal profiles."
    },
    {
      q: "How can I delete all data stored by Public Media Tool?",
      a: "Because all data is stored on your own device, simply clearing your browser cookies and site data/cache for publicmediatool.com will completely and permanently erase all saved preferences and tool histories."
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
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            <Shield className="w-3.5 h-3.5" /> Privacy & Security
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: September 21, 2026 • Public Media Tool (publicmediatool.com)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Lock className="w-5.5 h-5.5 text-indigo-600" /> 1. 100% Client-Side Data Execution
            </h2>
            <p>
              At <strong>Public Media Tool</strong>, we operate under a strict, uncompromised privacy-first model. Unlike typical media compression, coding, and formatting websites, we do not require you to upload your files, images, PDFs, or text snippets to any external server.
            </p>
            <p>
              All functional elements, calculators, converter processes, text tools, and image manipulation modules are compiled and executed entirely inside your browser's runtime memory. No data packets containing your assets are ever sent to our servers. Your local environment is the only environment where your work takes place.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <EyeOff className="w-5.5 h-5.5 text-indigo-600" /> 2. Zero Personal Data Collection
            </h2>
            <p>
              We believe in utility without profiling. When you visit publicmediatool.com, we do not require or collect personal identifying information. You can use all features and access every single browser tool without creating an account or providing email addresses, phone numbers, or social credentials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Database className="w-5.5 h-5.5 text-indigo-600" /> 3. Cookies & Local Browser Storage
            </h2>
            <p>
              Public Media Tool does not utilize invasive advertising trackers, tracking pixels, or cross-site marketing cookies. We use the browser's standard <code>localStorage</code> API solely to enhance your user experience:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Theme Selection:</strong> Saving your preference for Light Mode or Dark Mode.</li>
              <li><strong>Favorites:</strong> Storing the quick-access shortcuts to your most-used tools.</li>
              <li><strong>Tool History:</strong> Keeping a local list of recently launched tools for fast switching.</li>
            </ul>
            <p>
              These records are saved locally on your own hard drive and are never accessible to our team or any external party.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Shield className="w-5.5 h-5.5 text-indigo-600" /> 4. Third-Party Links & Integrations
            </h2>
            <p>
              Our website may contain external links to helper sources, documentation, or creative networks (such as our official social media channels). Please note that once you navigate to an external website, their respective privacy policies apply. We encourage you to review their terms before submitting any information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">5. Your Digital Rights</h2>
            <p>
              Because we store zero personal databases and maintain no remote backends with user credentials, you hold absolute authority over your data. If you wish to delete all configurations, preferences, and lists from Public Media Tool, you can do so immediately by selecting "Clear Cache/Site Data" in your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">6. Privacy Contacts</h2>
            <p>
              If you have any questions, clarifications, or feedback regarding our privacy standards or client-side execution architecture, feel free to contact us directly via our <a href="/contact" className="text-indigo-600 font-semibold hover:underline">Contact Page</a>.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6" id="privacy-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Privacy FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Answers to common security questions about publicmediatool.com.
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
