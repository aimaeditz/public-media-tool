import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Quote,
  ChevronRight,
  Mail,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  navigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Contact & Support — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact the Public Media Tool support team. Send your tool suggestions, bug reports, and feedback directly to our team.');
    }
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactFaqs = [
    {
      q: "How fast does the Support Team respond?",
      a: "We personally read and review every message. You can expect a direct reply to your email address within 24 to 48 hours."
    },
    {
      q: "Can I request a custom browser tool?",
      a: "Yes, we encourage tool recommendations! If there is a specific converter, calculator, formatting tool, or media script you need, describe it in detail and we'll do our best to build and host it."
    },
    {
      q: "Is there any cost for asking support or requesting features?",
      a: "No. Our support and any tool updates are 100% free of charge. Public Media Tool is built to serve the creator and developer community without subscription traps."
    },
    {
      q: "What if a tool is not working correctly on my device?",
      a: "Because all utilities run locally inside your browser, check if your browser is up to date, or clear your cache. If the issue persists, send us a detailed bug description here so we can fix it immediately."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && message.trim()) {
      setSubmitted(true);
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
      } catch (err) {
        // Fallback if confetti is blocked
      }
    }
  };

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
    <div className="py-10 md:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-slate-500 space-x-2">
          <a
            href="/"
            onClick={handleHomeClick}
            className="hover:text-purple-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Contact</span>
        </nav>

        {/* Center Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Contact Public Media Tool
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions, feedback, or suggestions? Send us a message and our team will get back to you directly.
          </p>

          {/* Two Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100/80 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Usually Replies Within 24-48 Hours</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100/80 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
              <span>Free Support — No Account Needed</span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout (Gap 40px, 60% / 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] pt-4 items-start">
          
          {/* Left Column (60%): "Send Us a Message" Form Card */}
          <div className="lg:col-span-7 bg-white rounded-[20px] p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <div className="mb-6 space-y-1">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill out the form below and we’ll review your message promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 px-4 space-y-4 bg-purple-50/50 rounded-[20px] border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-purple-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">
                  Message Sent!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Public Media Tool. We have received your message and will reply directly to <span className="font-semibold text-slate-900">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your Name * */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Your Name <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PMT"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Your Email * */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Your Email <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Used strictly to send our reply
                  </p>
                </div>

                {/* Message * */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Message <span className="text-purple-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write your message, feedback, or suggestion here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 resize-y"
                  />
                </div>

                {/* Full-width gradient submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-600 to-pink-500 hover:from-purple-700 hover:via-purple-700 hover:to-pink-600 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column (40%): Direct Support card + Testimonial quote */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: "Direct Support" */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Direct Support
                </h3>
              </div>

              <ul className="space-y-3.5 pt-1">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    General questions, bug reports, and feedback welcome
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We personally read and review every message
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    No automated chatbots or ticket queues
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Honest replies sent straight to your email
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Quote block */}
            <div className="bg-gradient-to-br from-purple-50/90 via-white to-pink-50/60 rounded-[20px] p-6 sm:p-8 border border-purple-100/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <Quote className="w-8 h-8 text-purple-600 fill-purple-100" />
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-700 font-medium">
                  "Every tool built on Public Media Tool is designed to simplify daily workflows. Your user feedback directly inspires our newest utilities and continuous updates."
                </p>
                <p className="text-xs font-semibold text-purple-900 pt-1">
                  — The Public Media Tool Support Team
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Contact FAQ Section */}
        <div className="space-y-6 pt-10" id="contact-faq-section">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600" /> Support FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Frequently asked support questions regarding requests, bug fixes, and response times.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {contactFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-950 font-heading text-sm sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-2xl transition-all"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 shrink-0" />
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

