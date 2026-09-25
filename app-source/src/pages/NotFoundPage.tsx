import React from 'react';
import { useSeo } from '../lib/useSeo';
import { Home, AlertTriangle } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  useSeo({
    title: '404 - Page Not Found | Public Media Tool',
    description: 'The page you are looking for does not exist or has been moved.',
    path: '/404',
  });

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 min-h-[60vh]">
      <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-xs">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 font-heading">
        404 — Page Not Found
      </h1>
      <p className="text-slate-600 mb-8 max-w-md text-sm leading-relaxed">
        The page you requested does not exist or has been removed.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer flex items-center gap-2 text-sm"
      >
        <Home className="w-4 h-4" /> Back to Home
      </button>
    </div>
  );
};
