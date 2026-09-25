import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class GlobalErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('[PMT Global Error] Uncaught crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 px-4 py-16 text-center antialiased">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
            <div className="w-16 h-16 mx-auto bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Application Load Failed</h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A browser caching conflict or dynamic module update occurred. Clearing local application state and reloading will resolve this.
              </p>
            </div>

            <button
              onClick={() => {
                try {
                  if ('caches' in window) {
                    caches.keys().then((names) => {
                      names.forEach((name) => caches.delete(name));
                    });
                  }
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (e) {
                  // Ignore privacy block errors
                }
                window.location.reload();
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Force Clear & Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
