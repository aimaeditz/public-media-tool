import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          <div className="p-4">
            <p className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">100+</p>
            <p className="text-xs font-semibold text-indigo-100 uppercase tracking-widest mt-2">Tools Available</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">10</p>
            <p className="text-xs font-semibold text-pink-100 uppercase tracking-widest mt-2">Categories</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">500,000+</p>
            <p className="text-xs font-semibold text-purple-100 uppercase tracking-widest mt-2">Users Served</p>
          </div>
          <div className="p-4">
            <p className="text-4xl sm:text-5xl font-extrabold font-heading tracking-tight">100%</p>
            <p className="text-xs font-semibold text-emerald-100 uppercase tracking-widest mt-2">Free Forever</p>
          </div>
        </div>
      </div>
    </section>
  );
};
