import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms' | 'disclaimer';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy' }) => {
  const [tab, setTab] = useState<'privacy' | 'terms' | 'disclaimer'>(initialTab);

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Legal & Compliance
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">
            {tab === 'privacy' && 'Privacy Policy'}
            {tab === 'terms' && 'Terms of Service'}
            {tab === 'disclaimer' && 'Disclaimer'}
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: January 2025 • Public Media Tool (publicmediatool.com)
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-200/80 gap-6">
          <button
            onClick={() => setTab('privacy')}
            className={`pb-3 text-xs font-bold transition-all ${
              tab === 'privacy'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`pb-3 text-xs font-bold transition-all ${
              tab === 'terms'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setTab('disclaimer')}
            className={`pb-3 text-xs font-bold transition-all ${
              tab === 'disclaimer'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Disclaimer
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {tab === 'privacy' && (
            <>
              <h2 className="text-lg font-bold font-heading text-slate-900">1. Client-Side Data Privacy</h2>
              <p>
                At Public Media Tool, we take data privacy to the highest standard. All tools provided on publicmediatool.com execute 100% locally within your browser runtime. Any text, document, image, or code snippet you process never transmits across external servers or networks.
              </p>
              <h2 className="text-lg font-bold font-heading text-slate-900">2. Local Storage Usage</h2>
              <p>
                We use browser `localStorage` solely to save your optional favorite tools and recent tool history locally on your device. We do not track, collect, sell, or profile your personal data.
              </p>
              <h2 className="text-lg font-bold font-heading text-slate-900">3. Cookies & Analytics</h2>
              <p>
                Public Media Tool does not use invasive third-party tracking cookies or behavioral advertising trackers.
              </p>
            </>
          )}

          {tab === 'terms' && (
            <>
              <h2 className="text-lg font-bold font-heading text-slate-900">1. Terms Acceptance</h2>
              <p>
                By accessing and using publicmediatool.com, you agree to comply with these terms. All browser tools are provided "as is" for lawful utility purposes.
              </p>
              <h2 className="text-lg font-bold font-heading text-slate-900">2. Permitted Use</h2>
              <p>
                You may freely use Public Media Tool for personal, commercial, academic, and professional projects without licensing fees.
              </p>
            </>
          )}

          {tab === 'disclaimer' && (
            <>
              <h2 className="text-lg font-bold font-heading text-slate-900">Trademark & Service Disclaimer</h2>
              <p>
                Public Media Tool is an independent browser utility platform. Public Media Tool is not affiliated with, endorsed by, or sponsored by any third-party trademark holders. All brand names, logos, and trademarks referenced belong to their respective owners.
              </p>
              <p>
                While all calculations and conversions are designed for accuracy, users should verify critical financial, security, or legal calculations independently.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
