import React from 'react';
import { ShieldCheck, Zap, UserX, Lock, Heart, Globe, Code } from 'lucide-react';

export const TrustMarquee: React.FC = () => {
  const badges = [
    { label: '100% Client-Side', icon: ShieldCheck, color: 'text-indigo-600' },
    { label: 'No Signup Required', icon: UserX, color: 'text-pink-600' },
    { label: 'Zero File Uploads', icon: Lock, color: 'text-amber-600' },
    { label: 'Always Free', icon: Heart, color: 'text-emerald-600' },
    { label: 'Blazing Fast Speed', icon: Zap, color: 'text-sky-600' },
    { label: 'Complete Privacy', icon: Globe, color: 'text-purple-600' },
    { label: 'Open Source Spirit', icon: Code, color: 'text-rose-600' },
  ];

  return (
    <div id="marquee" className="py-6 bg-white border-y border-slate-200/80 overflow-hidden shadow-xs">
      <div className="animate-marquee">
        {[0, 1, 2].map((groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-8 pr-8 shrink-0">
            {badges.map((badge, idx) => {
              const IconComp = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold shrink-0 shadow-2xs"
                >
                  <IconComp className={`w-4 h-4 ${badge.color}`} />
                  <span>{badge.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
