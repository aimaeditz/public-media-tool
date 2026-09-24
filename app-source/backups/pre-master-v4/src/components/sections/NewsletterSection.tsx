import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  return (
    <section className="pt-10 sm:pt-20 pb-16 sm:pb-28 md:pb-36 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl overflow-hidden text-center space-y-4 sm:space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-2 sm:space-y-3">
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Sparkles className="w-3.5 h-3.5" /> Weekly Tool Updates
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              Stay Updated
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Get notified whenever we release new browser-based tools. No spam, unsubscribe anytime.
            </p>
          </div>

          <div className="relative z-10 max-w-md mx-auto">
            {submitted ? (
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-3 sm:p-4 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 shrink-0" />
                <span>Thank you! You're subscribed to new tool releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-white/20">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm bg-white text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-colors shrink-0 shadow-md cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
