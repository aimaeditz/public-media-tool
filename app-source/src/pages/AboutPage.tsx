import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Heart, Lock, HelpCircle, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface AboutPageProps {
  navigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'About Us — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn more about Public Media Tool. Explore our core mission to provide free, private, and ultra-fast web utilities running completely client-side.');
    }
  }, []);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What makes Public Media Tool different from other utility websites?",
      a: "Our defining difference is our client-side execution model. Standard utility sites require uploading files or content to their cloud servers, posing significant privacy risks and network delays. Public Media Tool processes 100% of your data inside your local browser memory. No server uploads, no privacy compromises."
    },
    {
      q: "Is there any charge to use these tools?",
      a: "No, absolutely none. Every single browser-based utility, calculator, converter, and formatter on publicmediatool.com is completely free for everyone. There are no paywalls, premium-tier restrictions, or credit tokens."
    },
    {
      q: "Do I need to sign up for an account to process my files?",
      a: "No, you do not. You have immediate, full access to the complete tool suite the moment you open the website. Account creations are not required."
    },
    {
      q: "How can I report a bug or request a new browser utility?",
      a: "We love receiving community ideas! You can submit details, report functional bugs, or propose a brand new utility directly through our official Contact Page."
    }
  ];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigate) {
      navigate('/');
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div className="py-12 md:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-semibold text-slate-500 space-x-2" id="about-breadcrumb">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900">About Us</span>
        </nav>

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
            About Public Media Tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Free Browser-Based Tools. Simple. Private. Fast.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Public Media Tool was created with a clear mission: provide creators, developers, designers, and web users with high-performance tools that execute 100% inside your browser runtime.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Absolute Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your files, calculations, photos, and documents never leave your device. All computations happen client-side in local browser memory.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-pink-50 text-pink-700 rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Zero Server Latency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without server roundtrips or network uploads, tool outputs execute in milliseconds. Instant feedback for your daily workflows.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl w-fit">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">100% Free Forever</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No subscription paywalls, trial expirations, or mandatory account creations. Useful utilities freely accessible to everyone worldwide.
            </p>
          </div>
        </div>

        {/* Security Architecture */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-indigo-600" /> Client-Side Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike traditional web applications that upload your photos, documents, and text to remote cloud servers for processing, Public Media Tool executes all functional tasks right inside your personal web browser. Whether you are generating secure hashes, resizing images, formatting data, or calculating financial figures, the processing never triggers external network transfers.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 pt-6 animate-fade-in" id="about-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> General FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Frequently asked questions about our client-side utility suite.
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
