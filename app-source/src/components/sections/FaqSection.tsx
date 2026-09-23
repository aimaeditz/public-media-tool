import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../../lib/categories';

const TOTAL_COUNT = CATEGORIES.reduce((acc, cat) => acc + (cat.count || 0), 0);

export const FAQS = [
  {
    question: 'What is Public Media Tool (PMT)?',
    answer:
      `Public Media Tool (PMT) is a comprehensive catalog of ${TOTAL_COUNT.toLocaleString()}+ free utilities across ${CATEGORIES.length} specialized categories. Every tool is crafted to run client-side inside your browser with instant responsiveness, zero installation, and no required account registration.`,
  },
  {
    question: 'Does my data or file ever leave my device?',
    answer:
      'Never. Privacy is PMT’s core commitment. All data processing—whether formatting text, calculating numbers, converting measurements, or inspecting files—happens strictly inside your local browser runtime memory. Your data is never uploaded, transmitted to remote servers, or stored in any external database.',
  },
  {
    question: 'Do I need to sign up or create an account to use PMT?',
    answer:
      'No. PMT is completely open and frictionless. There are no logins, no email signups, no credit cards, and no usage quotas. Simply select any tool and start working immediately.',
  },
  {
    question: 'Are there any file size or daily usage limits?',
    answer:
      'No artificial limits are imposed by PMT. Because processing executes locally on your hardware, throughput and speed are determined only by your device memory and processor capabilities.',
  },
  {
    question: 'Can I use Public Media Tool offline?',
    answer:
      'Yes. Once the page is loaded into your browser cache, the underlying utilities execute client-side without requiring persistent outbound network connectivity for calculations and transformations.',
  },
  {
    question: 'How are tool outputs saved or shared?',
    answer:
      'Every tool features instant one-click copy buttons and local file export options. Output files are generated directly by your browser and downloaded straight to your computer or mobile device.',
  },
  {
    question: 'Is Public Media Tool completely free forever?',
    answer:
      'Yes. PMT is committed to remaining 100% free for students, professionals, creators, and developers worldwide, with no hidden subscriptions or paywalls.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-10 sm:py-20 md:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1 bg-indigo-50 rounded-full border border-indigo-100 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Everything You Need To Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear answers regarding privacy, client-side execution, and tool usage across PMT.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-indigo-50/40 border-indigo-200 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200/80 hover:border-indigo-200'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-3.5 sm:p-6 flex items-center justify-between gap-3 sm:gap-4 font-heading font-bold text-sm sm:text-lg text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 ${isOpen ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
                      <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="leading-snug text-xs sm:text-base">{faq.question}</span>
                  </span>
                  <div className={`p-1 sm:p-1.5 rounded-lg transition-colors shrink-0 ${isOpen ? 'bg-indigo-100 text-indigo-700' : 'text-slate-400'}`}>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 sm:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-indigo-100/60 pl-3.5 sm:pl-[3.75rem]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
