import React from 'react';
import { ShieldCheck, Zap, Heart, Lock, Code, Globe, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            About Public Media Tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-slate-900">
            Free Browser-Based Tools. Simple. Private. Fast.
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Public Media Tool was created with a clear mission: provide creators, developers, designers, and web users with high-performance tools that execute 100% inside your browser runtime.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Absolute Privacy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your files, code snippets, photos, and documents never leave your device. All computations happen client-side in browser memory using HTML5 Web APIs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-pink-50 text-pink-700 rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">Zero Server Latency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without server roundtrips or network uploads, tool outputs execute in milliseconds. Instant feedback for your daily workflows.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl w-fit">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">100% Free Forever</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No subscription paywalls, trial expirations, or mandatory account creations. Useful utilities freely accessible to everyone worldwide.
            </p>
          </div>
        </div>

        {/* Security Architecture */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 flex items-center gap-2">
            <Lock className="w-6 h-6 text-indigo-600" /> Client-Side Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Unlike traditional web applications that upload your photos, documents, and text to cloud servers for processing, Public Media Tool compiles all functional logic into modern client-side WebAssembly, Canvas, and JavaScript modules. Whether you are generating cryptographically strong SHA-256 hashes, resizing images, formatting JSON payloads, or converting text cases, the processing never triggers external network transfers.
          </p>
        </div>
      </div>
    </div>
  );
};
