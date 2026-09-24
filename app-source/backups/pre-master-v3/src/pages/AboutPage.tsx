import React, { useState } from 'react';
import { ShieldCheck, Zap, Heart, Lock, HelpCircle, ChevronDown, ChevronUp, ChevronRight, CheckCircle2, Layers, Cpu, Sparkles, BookOpen, Globe } from 'lucide-react';
import { CATEGORIES } from '../lib/categories';
import { useSeo } from '../lib/useSeo';

interface AboutPageProps {
  navigate?: (path: string) => void;
}

const TOTAL_CATEGORIES = CATEGORIES.length;
const TOTAL_TOOLS = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  useSeo({
    title: 'About Us — Public Media Tool',
    description: `Learn more about Public Media Tool (PMT). Explore our catalog of ${TOTAL_TOOLS.toLocaleString()}+ free, private, and ultra-fast browser utilities running 100% client-side.`,
    path: '/about',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What makes Public Media Tool (PMT) different from other utility websites?",
      a: `Our primary distinction is our strict client-side execution architecture. Traditional web converter and calculator websites require uploading your confidential text, photos, financial numbers, or documents to remote server infrastructure, introducing network latency and significant data exposure risks. PMT processes 100% of your data inside your local browser runtime memory. Zero files or inputs are ever uploaded to an external server.`
    },
    {
      q: "Is there any charge, subscription, or token limit to use these tools?",
      a: `No, absolutely none. Every single browser utility across our catalog of ${TOTAL_TOOLS.toLocaleString()}+ tools is 100% free for personal, academic, and commercial workflows. We do not use paywalls, trial expirations, credit limits, or premium tiers.`
    },
    {
      q: "Do I need to sign up or log in to use PMT?",
      a: `No account registration or login is required. You gain immediate, unhindered access to every tool and converter the moment you visit PMT.`
    },
    {
      q: `How many tools and categories are currently available on PMT?`,
      a: `PMT currently hosts ${TOTAL_TOOLS.toLocaleString()}+ specialized browser utilities categorized into ${TOTAL_CATEGORIES} distinct departments spanning text formatting, image processing, financial calculators, developer tools, unit converters, PDF inspection, and specialized industry utilities.`
    },
    {
      q: "Do PMT utilities work offline without an active internet connection?",
      a: "Yes. Because all computational logic is compiled into modern client-side scripts, once you load a tool page in your browser, the utility operates entirely offline in your browser memory without needing ongoing internet connectivity for calculations and transformations."
    },
    {
      q: "Are there any file size restrictions or usage quotas?",
      a: "No artificial software limits or daily quotas are imposed by PMT. Processing capacity and throughput are bounded only by your local device hardware memory and CPU capabilities."
    },
    {
      q: "How can I submit a bug report or suggest a new browser tool?",
      a: "We welcome community recommendations! You can send bug reports, feature suggestions, or tool requests directly through our official Contact Page."
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
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-32 md:pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
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
        <div className="text-center space-y-2.5 sm:space-y-4">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            About Public Media Tool
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Free Browser-Based Tools. Simple. Private. Fast.
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Public Media Tool (PMT) was established with a singular mission: to equip creators, software developers, designers, students, finance professionals, and web users worldwide with a comprehensive suite of {TOTAL_TOOLS.toLocaleString()}+ high-performance digital utilities running 100% client-side inside your browser.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 sm:space-y-3">
            <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">Absolute Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your sensitive documents, code files, photos, and calculated data never leave your personal hardware. Every execution occurs locally in browser memory with zero remote server data uploads.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 sm:space-y-3">
            <div className="p-2.5 sm:p-3 bg-pink-50 text-pink-700 rounded-xl w-fit">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">Zero Network Latency</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              By removing server round-trips and network transmission queues, tool calculations and media manipulations process instantaneously for seamless productivity.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 sm:space-y-3">
            <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-700 rounded-xl w-fit">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900">100% Free Access</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No subscription fees, paywalls, token limits, or mandatory registration. All tools are fully accessible to users everywhere without artificial restrictions.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-6 sm:space-y-8">
          <div className="space-y-1.5 sm:space-y-2 border-b border-slate-100 pb-4 sm:pb-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-50 rounded-full border border-indigo-100">
              Workflow Guide
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center gap-2 pt-1">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Understand the seamless, step-by-step process that powers every utility across PMT.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-8">
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 text-xs sm:text-base">
                1
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-slate-900">
                  Selecting a Tool Category or Utility
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Browse our catalog of {TOTAL_CATEGORIES} departments or utilize the instant search bar to find the exact utility required for your task. Whether you need a JSON code formatter, a mortgage amortization calculator, an image converter, or a cryptographic hash generator, PMT provides focused, single-purpose interfaces designed for maximum efficiency.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 text-xs sm:text-base">
                2
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-slate-900">
                  Inputting Data or Dropping Files Locally
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Paste raw text strings, select target configuration values, or drag-and-drop local media files directly into the interactive workspace. All input parsing and parameter checks occur immediately within your local browser memory space without creating any cloud temporary files.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 text-xs sm:text-base">
                3
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-slate-900">
                  Client-Side Execution & Computation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  When you initiate a transformation or enter numbers, PMT executes native Web APIs and client-side algorithms directly on your CPU. Because processing avoids external network latency, complex calculations and transformations update instantly as you adjust input values.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 text-xs sm:text-base">
                4
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-slate-900">
                  Exporting, Copying, or Downloading Results
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Once your task completes, copy formatted strings directly to your clipboard or download converted files straight to your local device drive. The generated files are assembled in browser RAM and saved directly without intermediate server storage.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-indigo-200 text-xs sm:text-base">
                5
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-sm sm:text-lg font-bold font-heading text-slate-900">
                  Browser Compatibility & Offline Continuance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  PMT utilities rely on standardized web technology compatible with modern desktop and mobile browsers including Chrome, Safari, Firefox, Edge, and Brave. Furthermore, once a tool page is cached, it remains functional even if your device loses internet connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Site Commitments & Principles */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-4 sm:space-y-6">
          <div className="space-y-1 sm:space-y-2 border-b border-slate-100 pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Core Commitments & Principles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The foundational guarantees that govern every tool built under PMT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 bg-slate-50/70 rounded-xl sm:rounded-2xl border border-slate-100">
              <div className="font-bold font-heading text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Genuine Client-Side Engines
              </div>
              <p>
                We strictly avoid fake loaders, artificial progress delays, or simulated conversions. Every calculation, parsing step, and file format transformation is performed by functional algorithms.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 bg-slate-50/70 rounded-xl sm:rounded-2xl border border-slate-100">
              <div className="font-bold font-heading text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero Artificial Limits
              </div>
              <p>
                No daily usage quotas, file conversion caps, or throttled execution speeds. Use tools as frequently and deeply as your workflows require.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 bg-slate-50/70 rounded-xl sm:rounded-2xl border border-slate-100">
              <div className="font-bold font-heading text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Uncompromised Privacy
              </div>
              <p>
                We operate with complete privacy respect. Your inputs, formulas, uploaded files, and document contents are never transmitted across the network or stored in external databases.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 p-3.5 sm:p-4 bg-slate-50/70 rounded-xl sm:rounded-2xl border border-slate-100">
              <div className="font-bold font-heading text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full Functional Clarity
              </div>
              <p>
                Each utility provides clear inputs, real-time outputs, and predictable behavior, ensuring professionals and learners can rely on results for daily operations.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Client-Side Architecture */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs space-y-2.5 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> Security Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike traditional web applications that transmit sensitive documents, code blocks, and images to third-party cloud infrastructure for processing, Public Media Tool executes all functional logic locally inside your browser session. Whether you are generating secure SHA hashes, resizing graphics, formatting JSON data, or calculating financial rates, all operations remain confined within your system hardware.
          </p>
        </div>

        {/* About the Creator Section */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl space-y-2.5 sm:space-y-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-300 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-900/60 rounded-full border border-indigo-700/60">
            Brand Direction
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
            About Public Media Tool (PMT)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Public Media Tool (PMT) is managed as an independent web software initiative dedicated to building accessible, high-utility digital tooling. By prioritizing browser-native processing, PMT delivers free, dependable software utilities that remove friction for users across the globe.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-6 animate-fade-in" id="about-faq-section">
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" /> General FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Detailed answers regarding client-side performance, privacy guarantees, and usage guidelines across PMT.
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

