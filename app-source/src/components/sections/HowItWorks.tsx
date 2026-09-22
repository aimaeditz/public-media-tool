import React from 'react';
import { MousePointerClick, Zap, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      tag: 'Step 01 • Search & Select',
      title: 'Pick a Tool',
      desc: 'Browse our directory or search for any utility across text, image, PDF, developer, or color categories.',
      highlight: '1,500+ Local Tools Available',
      icon: MousePointerClick,
      gradient: 'from-indigo-500 to-blue-600',
      badgeGlow: 'shadow-indigo-500/25',
    },
    {
      num: '02',
      tag: 'Step 02 • Client-Side Execution',
      title: 'Use Instantly',
      desc: 'Type, paste, or drop your files. Operations execute directly in browser memory without server latency.',
      highlight: '100% Local Device Processing',
      icon: Zap,
      gradient: 'from-purple-500 to-pink-600',
      badgeGlow: 'shadow-purple-500/25',
    },
    {
      num: '03',
      tag: 'Step 03 • Seamless Results',
      title: 'Zero Setup',
      desc: 'Copy your result or download processed output with one click. No account, credit card, or installation.',
      highlight: 'Instant 1-Click Export',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      badgeGlow: 'shadow-emerald-500/25',
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-300 px-3.5 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Frictionless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Three simple steps to accomplish your tasks in seconds with complete privacy.
          </p>
        </div>

        {/* Steps Flow Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Connecting Line on Desktop */}
          <div className="hidden md:block absolute top-[90px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/40 via-purple-500/60 to-emerald-500/40 z-0" />

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="group relative z-10 bg-slate-900/90 backdrop-blur-md rounded-2xl p-7 sm:p-8 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between overflow-hidden"
              >
                {/* Large Background Watermark Step Number */}
                <span className="absolute top-2 right-4 text-7xl font-black font-heading text-slate-800/40 select-none pointer-events-none group-hover:text-indigo-500/20 transition-colors">
                  {step.num}
                </span>

                <div className="space-y-6 relative z-10">
                  {/* Top Header Row in Card */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg ${step.badgeGlow} group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-bold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700/80">
                      {step.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-indigo-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Highlight Badge */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-300 font-semibold relative z-10">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {step.highlight}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
