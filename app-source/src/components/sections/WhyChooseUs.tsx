import React from 'react';
import { Shield, UserX, Zap, Heart } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: '100% Client-Side Execution',
      desc: 'Your files, photos, and confidential text never touch an external server. Everything processes in local browser memory.',
      icon: Shield,
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      title: 'No Mandatory Signup Required',
      desc: 'Use every single tool instantly without creating accounts, providing credit card details, or completing captchas.',
      icon: UserX,
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Blazing Fast Performance',
      desc: 'Zero network transfer delay. Calculations and file conversions complete instantly with high-speed JavaScript compilation.',
      icon: Zap,
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Always 100% Free',
      desc: 'No hidden paywalls, no daily usage limits, and no trial expirations. Free tools built for everyone forever.',
      icon: Heart,
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200/60">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Uncompromising Privacy & Speed
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
            Why Choose Public Media Tool
          </h2>
          <p className="text-sm text-slate-600">
            Engineered with modern Web APIs so you can process data safely with complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="group bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-4"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feat.gradient} text-white w-fit shadow-md group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
