import React from 'react';
import { MousePointerClick, Play, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pick a Tool',
      desc: 'Browse our directory or search for any utility from text, image, PDF, developer, or color categories.',
      icon: MousePointerClick,
    },
    {
      num: '02',
      title: 'Use Instantly',
      desc: 'Type, paste, or drop your files. Operations run immediately in browser memory without network latency.',
      icon: Play,
    },
    {
      num: '03',
      title: 'Zero Setup',
      desc: 'Copy your result or download processed output with one click. No account or installation required.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Frictionless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            How It Works
          </h2>
          <p className="text-sm text-slate-600">
            Three simple steps to accomplish your tasks in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Animated SVG connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-indigo-300 -translate-y-6 z-0" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="relative z-10 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4 hover:-translate-y-1 transition-transform"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white flex items-center justify-center shadow-lg font-heading font-extrabold text-2xl">
                  {step.num}
                </div>

                <div className="inline-flex p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                  <IconComp className="w-5 h-5" />
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
