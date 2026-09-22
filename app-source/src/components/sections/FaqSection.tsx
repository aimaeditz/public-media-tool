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
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Everything You Need To Know
          </h2>
          <p className="text-sm text-slate-600">
            Clear answers regarding privacy, client-side execution, and tool usage across PMT.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-heading font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
