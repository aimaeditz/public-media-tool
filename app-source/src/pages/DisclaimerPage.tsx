import React, { useEffect, useState } from 'react';
import { ChevronRight, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Scale, CheckCircle } from 'lucide-react';

interface DisclaimerPageProps {
  navigate: (path: string) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Disclaimer — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Read the official Disclaimer for Public Media Tool. Understand our independent status, trademark notices, and as-is tool usage conditions.');
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is Public Media Tool affiliated with YouTube, Instagram, or TikTok?",
      a: "No, Public Media Tool is an entirely independent utility developer. We are in no way officially connected, associated, sponsored, or endorsed by Google LLC, YouTube, Meta Platforms Inc., Instagram, ByteDance, TikTok, or any of their parent companies or affiliates."
    },
    {
      q: "Can I use these tools for critical engineering or financial tasks?",
      a: "While our tools are engineered with meticulous attention to accuracy, they are provided purely for informational and utility purposes. We strongly advise that you cross-verify critical security, mathematical, or financial calculations before relying on them."
    },
    {
      q: "Are the tools safe for formatting confidential source code?",
      a: "Yes. Because 100% of our code executions occur entirely within your personal browser runtime (client-side), no data is ever uploaded. This makes our formatting, hashing, and regex tools extremely safe for private files and data."
    },
    {
      q: "Do I need to worry about licensing fees or commercial usage limits?",
      a: "All browser-based utilities on publicmediatool.com are 100% free for both personal and commercial use. However, they are offered as-is, meaning we assume no operational liability or commercial warranties."
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
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="disclaimer-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">Disclaimer</span>
        </nav>

        {/* Heading Section */}
        <div className="space-y-4 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 px-3.5 py-1.5 bg-amber-50 rounded-full border border-amber-100">
            <AlertTriangle className="w-3.5 h-3.5" /> Legal Disclaimer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Last Updated: September 21, 2026 • Public Media Tool (publicmediatool.com)
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <Scale className="w-5.5 h-5.5 text-amber-600" /> 1. Operational "As-Is" Provision
            </h2>
            <p>
              The digital services, converters, calculators, filters, and media-processing applications hosted on <strong>publicmediatool.com</strong> are provided to the general public strictly on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis. 
            </p>
            <p>
              Public Media Tool makes no explicit or implied representations, representations of fitness for particular purposes, or operational warranties regarding the availability, error-free nature, or complete precision of the formulas, engines, and code modules embedded in our features.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5.5 h-5.5 text-amber-600" /> 2. Complete Platform Independence
            </h2>
            <p>
              <strong>Public Media Tool</strong> is a self-funded, independent browser utility suite built with standard client-side technologies. It is not affiliated, connected, sponsored, endorsed, or partnered with any of the following platforms or their parents:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>YouTube / Google / Alphabet</li>
              <li>Instagram / Meta Platforms Inc.</li>
              <li>TikTok / ByteDance Ltd.</li>
              <li>WhatsApp / Meta Platforms Inc.</li>
            </ul>
            <p>
              All trademarks, product names, logos, service marks, and brand symbols featured or referred to on our pages are the intellectual property of their respective trademark holders. These trademark holders are not affiliated with our application, and do not sponsor or endorse our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">3. Use at Your Own Risk</h2>
            <p>
              Any action you take based on the tools, calculations, formats, or file edits found on publicmediatool.com is strictly at your own risk. Public Media Tool, its creators, and contributors are not liable for any operational downtime, lost productivity, data corruption, conversion errors, or financial setbacks that may arise through the direct or indirect use of our client-side software.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">4. Precision Disclaimer</h2>
            <p>
              While we consistently update and test our math equations, code compilers, and formatting tools to follow official standard technical specifications, small errors can sometimes occur. Users are advised to double-check outputs whenever completing high-stakes calculations or writing mission-critical computer programs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-slate-900">5. Continuous Modification</h2>
            <p>
              We reserve the absolute right to modify, adjust, deprecate, rewrite, or update any functional tool, layout, styling, or documentation on publicmediatool.com at any time without notice, to improve efficiency, standards compliance, and offline speed.
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6" id="disclaimer-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Disclaimer FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers regarding liability, trademarks, and tool accuracy.
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
