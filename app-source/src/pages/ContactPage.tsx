import React, { useState } from 'react';
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
  Building2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES } from '../lib/categories';
import { useSeo } from '../lib/useSeo';

interface ContactPageProps {
  navigate?: (path: string) => void;
}

const TOTAL_CATEGORIES = CATEGORIES.length;
const TOTAL_TOOLS = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);
const WEB3FORMS_ACCESS_KEY = '950eff83-4fa3-4244-b10c-e5b9b2fefb4c';
const RECIPIENT_EMAIL = 'aimaeditz.info@gmail.com';

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  useSeo({
    title: 'Contact & Support — Public Media Tool',
    description: `Contact the Public Media Tool (PMT) support team. Submit tool suggestions, bug reports, and feedback for our suite of ${TOTAL_TOOLS.toLocaleString()}+ browser tools.`,
    path: '/contact',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please fill out all required fields (Name, Email, and Message).');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('name', trimmedName);
      formData.append('email', trimmedEmail);
      formData.append('subject', `[PMT Support] ${subject} - from ${trimmedName}`);
      formData.append('topic', subject);
      formData.append('message', trimmedMessage);
      formData.append('from_name', 'Public Media Tool Contact Form');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSubject('General Feedback');
        setMessage('');
        try {
          confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
        } catch (err) {
          // Fallback if confetti is blocked
        }
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again or email us directly.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'A network error occurred while sending your message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
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
    <div className="pt-6 sm:pt-10 pb-16 sm:pb-32 md:pb-32 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
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
        <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
            Contact Public Media Tool
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
            Have questions, feature suggestions, or bug reports across our {TOTAL_TOOLS.toLocaleString()}+ browser utilities? Send us a message and our support team will respond directly to your inbox.
          </p>

          {/* Two Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 sm:pt-3">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100/80 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Direct Reply Within 24-48 Hours</span>
            </div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-pink-50 text-pink-700 border border-pink-100/80 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
              <span>100% Free Support — No Account Needed</span>
            </div>
          </div>
        </div>

        {/* Support Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1 sm:pt-2">
          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">General Inquiries</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Questions about platform functionality, data privacy, or client usage.</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Tool Requests</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Propose new converters, calculators, or text formatters for our roadmap.</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <Bug className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Bug Reports</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Report calculation discrepancies, formula errors, or browser layout issues.</p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 sm:space-y-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Educational Use</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Guidance for schools, universities, and coding bootcamps using PMT.</p>
          </div>
        </div>

        {/* Two-Column Layout (Gap 40px, 60% / 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-[40px] pt-2 sm:pt-4 items-start">
          
          {/* Left Column (60%): "Send Us a Message" Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40">
            <div className="mb-4 sm:mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Fill out the form below and our team will review your inquiry promptly.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 sm:py-12 px-4 space-y-4 bg-purple-50/50 rounded-2xl sm:rounded-[20px] border border-purple-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-purple-500/30">
                  <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                  Message sent! We'll reply within 24-48 hours.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Public Media Tool. We have received your inquiry and our support team will respond directly to your inbox within 24-48 hours.
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
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
                      setErrorMessage(null);
                    }}
                    className="mt-2 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errorMessage && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 flex-1">
                      <p className="font-semibold text-rose-900">Unable to send message</p>
                      <p className="text-rose-700 text-xs">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Your Name * */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Your Name <span className="text-purple-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white disabled:opacity-60 transition-all text-slate-900 placeholder:text-slate-400"
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
                    disabled={isSubmitting}
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white disabled:opacity-60 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">
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
                    disabled={isSubmitting}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white disabled:opacity-60 transition-all text-slate-900 cursor-pointer"
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
                    rows={5}
                    disabled={isSubmitting}
                    placeholder="Write your detailed message, feedback, tool suggestion, or bug description here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 sm:p-4 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-slate-50/50 focus:bg-white disabled:opacity-60 transition-all text-slate-900 placeholder:text-slate-400 resize-y"
                  />
                </div>

                {/* Full-width gradient submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 px-6 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-purple-600 to-pink-500 hover:from-purple-700 hover:via-purple-700 hover:to-pink-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column (40%): Direct Support card + Testimonial quote */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            
            {/* Card 1: "Direct Support Commitments" */}
            <div className="bg-white rounded-2xl sm:rounded-[20px] p-5 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
                  Direct Support Standards
                </h3>
              </div>

              <ul className="space-y-2.5 sm:space-y-3.5 pt-1">
                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    General questions, bug reports, and tool requests welcome
                  </span>
                </li>

                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every message is personally reviewed by our software team
                  </span>
                </li>

                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    No automated chatbots, ticket queues, or phone trees
                  </span>
                </li>

                <li className="flex items-start gap-2.5 sm:gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Direct human email replies sent directly to your inbox
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Quote block */}
            <div className="bg-gradient-to-br from-purple-50/90 via-white to-pink-50/60 rounded-2xl sm:rounded-[20px] p-5 sm:p-8 border border-purple-100/90 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="space-y-2.5 sm:space-y-3 relative z-10">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 fill-purple-100" />
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
        <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10" id="contact-faq-section">
          <div className="text-center md:text-left space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-heading text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" /> Support & Contact FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Frequently asked questions regarding support response times, tool suggestions, and bug fixes.
            </p>
          </div>

          <div className="space-y-2.5 sm:space-y-3 max-w-4xl">
            {contactFaqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 transition-all shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left font-bold text-slate-950 font-heading text-xs sm:text-base cursor-pointer hover:bg-slate-50/50 rounded-xl sm:rounded-2xl transition-all"
                >
                  <span className="pr-3 sm:pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 shrink-0" />
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


