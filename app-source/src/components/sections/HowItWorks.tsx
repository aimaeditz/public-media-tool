import React from 'react';
import { MousePointerClick, Zap, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select a Utility',
      desc: 'Browse categories or search across 1,500+ tools for text, image, PDF, code, or converter utilities.',
      highlight: '1,500+ Browser Tools',
      icon: MousePointerClick,
      gradient: 'from-blue-500 to-indigo-600',
      ringColor: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      num: '02',
      title: 'Process In-Memory',
      desc: 'Type, paste, or upload files. Calculations and conversions execute instantly in your browser runtime.',
      highlight: '100% Client-Side Privacy',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-600',
      ringColor: 'border-purple-500/30',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      num: '03',
      title: 'Export in 1 Click',
      desc: 'Instantly copy output text or download transformed files to your device with zero signup or paywalls.',
      highlight: 'Instant Direct Export',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      ringColor: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-400 px-3.5 py-1 bg-indigo-950/80 rounded-full border border-indigo-800/60">
            Frictionless Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Three simple steps to accomplish your tasks in seconds with complete privacy.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Connecting Desktop Flow Line */}
          <div className="hidden lg:block absolute top-1/2 left-[18%] right-[18%] h-0.5 -translate-y-6 bg-gradient-to-r from-indigo-500/40 via-purple-500/60 to-emerald-500/40 z-0 pointer-events-none" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="group relative z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top Step Badge & Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0`}>
                      <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${step.badgeBg}`}>
                        Step {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-indigo-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Feature */}
                <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs text-indigo-300 font-medium">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    {step.highlight}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

