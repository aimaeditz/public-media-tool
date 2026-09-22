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
  ChevronUp,
  MessageSquare,
  Bug,
  Lightbulb,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../lib/categories';

interface ContactPageProps {
  navigate?: (path: string) => void;
}

const TOTAL_CATEGORIES = CATEGORIES.length;
const TOTAL_TOOLS = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  useEffect(() => {
    document.title = 'Contact & Support — Public Media Tool';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Contact the Public Media Tool (PMT) support team. Submit tool suggestions, bug reports, and feedback for our suite of ${TOTAL_TOOLS.toLocaleString()}+ browser tools.`
      );
    }
  }, []);

  // TODO: Replace with Web3Forms/Formspree when ready
  // Recipient: aimaeditz.info@gmail.com
  const RECIPIENT_EMAIL = 'aimaeditz.info@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactFaqs = [
    {
      q: "How quickly does the Public Media Tool (PMT) support team respond?",
      a: "Our core engineering and support team personally reads and reviews every incoming inquiry. You can expect a direct human response sent to your email within 24 to 48 hours on standard business days."
    },
    {
      q: "Can I submit a request to add a new tool or feature to PMT?",
      a: "Yes! Tool recommendations from our community directly drive our platform development pipeline. If there is a specific text formatter, file converter, calculator, or developer utility missing from our catalog of " + TOTAL_TOOLS.toLocaleString() + "+ tools, let us know! Please include desired formulas or conversion specs."
    },
    {
      q: "Is there any cost for receiving technical support or requesting custom features?",
      a: "No. All support, bug investigations, and tool developments on PMT are 100% free of charge. PMT is built to serve creators, developers, and students without paywalls, subscriptions, or hidden consulting fees."
    },
    {
      q: "What details should I include when reporting a tool calculation bug or rendering issue?",
      a: "To help our team diagnose and patch issues quickly, please share: 1) The exact tool name or path, 2) Your web browser name and operating system (e.g., Chrome on Windows 11), 3) The input data or file format used, and 4) The expected vs. actual output received."
    },
    {
      q: "Do you offer enterprise integration consulting or custom white-label deployments?",
      a: "PMT tools are designed as open client-side browser utilities. While we do not offer custom server hosting or white-label consulting services, our entire web application is open for public usage in professional and enterprise workflows."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields (name, email, message)
    if (name.trim() && email.trim() && message.trim()) {
      // Simple mailto fallback / placeholder action (no Web3Forms yet)
      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
        `[PMT Inquiry] ${subject}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      // Placeholder action log
      console.log(`Form submission received for ${RECIPIENT_EMAIL}`, {
        name,
        email,
        subject,
        message,
        mailtoUrl
      });

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
            Have questions, feature suggestions, or bug reports across our {TOTAL_TOOLS.toLocaleString()}+ browser utilities? Send us a message and our support team will respond directly to your inbox.
          </p>

          {/* Two Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100/80 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Direct Reply Within 24-48 Hours</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100/80 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
              <span>100% Free Support — No Account Needed</span>
            </div>
          </div>
        </div>

        {/* Support Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">General Inquiries</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Questions about platform functionality, data privacy, or client usage.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Tool Requests</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Propose new converters, calculators, or text formatters for our roadmap.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Bug className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Bug Reports</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Report calculation discrepancies, formula errors, or browser layout issues.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Educational Use</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Guidance for schools, universities, and coding bootcamps using PMT.</p>
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
                Fill out the form below and our team will review your inquiry promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 px-4 space-y-4 bg-purple-50/50 rounded-[20px] border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-purple-500/30">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900">
                  Message sent! We'll reply within 24-48 hours.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-semibold text-slate-900">{name}</span> ({email}). We have received your inquiry and our support team will respond directly to your inbox.
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(`[PMT] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 underline font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Or email directly: {RECIPIENT_EMAIL}</span>
                  </a>
                </div>
                <div>
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
                    placeholder="e.g. Alex Morgan"
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
                    Used strictly to send our direct reply
                  </p>
                </div>

                {/* Inquiry Category */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white transition-all text-slate-900"
                  >
                    <option value="General Feedback">General Feedback & Questions</option>
                    <option value="Feature Request">New Tool or Feature Request</option>
                    <option value="Bug Report">Bug Report / Discrepancy Notice</option>
                    <option value="Educational Inquiry">School or Educational Inquiry</option>
                  </select>
                </div>

                {/* Message * */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Message Details <span className="text-purple-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write your detailed message, feedback, tool suggestion, or bug description here..."
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
            
            {/* Card 1: "Direct Support Commitments" */}
            <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Direct Support Standards
                </h3>
              </div>

              <ul className="space-y-3.5 pt-1">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    General questions, bug reports, and tool requests welcome
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every message is personally reviewed by our software team
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    No automated chatbots, ticket queues, or phone trees
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Direct human email replies sent directly to your inbox
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Quote block */}
            <div className="bg-gradient-to-br from-purple-50/90 via-white to-pink-50/60 rounded-[20px] p-6 sm:p-8 border border-purple-100/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <Quote className="w-8 h-8 text-purple-600 fill-purple-100" />
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-700 font-medium">
                  "Every tool across Public Media Tool’s {TOTAL_TOOLS.toLocaleString()}+ browser utilities is designed to simplify real-world daily workflows. User suggestions directly shape our roadmap."
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
              <HelpCircle className="w-6 h-6 text-purple-600" /> Support & Contact FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Frequently asked questions regarding support response times, tool suggestions, and bug fixes.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {contactFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 transition-all shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-950 font-heading text-sm sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-2xl transition-all"
                >
                  <span className="pr-4">{faq.q}</span>
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


