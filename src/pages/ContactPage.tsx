import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Wrench } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Tool Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && message.trim()) {
      setSubmitted(true);
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900">
            Contact & Tool Requests
          </h1>
          <p className="text-sm text-slate-600">
            Have a suggestion, feature request, or feedback? Let us know!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h2 className="text-2xl font-bold font-heading text-slate-900">Message Received!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for reaching out to Public Media Tool. We appreciate your feedback and tool ideas.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-6 py-2.5 text-xs font-bold text-white gradient-button rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-medium"
                >
                  <option value="Tool Request">Request a New Tool</option>
                  <option value="Bug Report">Report an Issue / Bug</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Partnership">Partnership Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe the tool you would like us to build or share your feedback..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white gradient-button rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
