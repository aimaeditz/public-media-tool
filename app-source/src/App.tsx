import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { useToolsStore } from './lib/tools-store';
import { Loader2 } from 'lucide-react';
import { getLongTailPageByPath } from './lib/long-tail-data';
import { checkVersionAndClearCache } from './lib/version-check';

// Safe storage wrapper to prevent crashes in private windows or iframe embeds
const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      // ignore
    }
  },
  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (e) {
      // ignore
    }
  }
};

// Helper to auto-retry dynamic imports when Vite chunk hashes mismatch on new deployments
function lazyWithRetry<T extends React.ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
) {
  return React.lazy(async () => {
    const pageHasBeenReloaded = safeSessionStorage.getItem('pmt_chunk_reloaded');
    try {
      const component = await componentImport();
      safeSessionStorage.removeItem('pmt_chunk_reloaded');
      return component;
    } catch (error) {
      console.warn('[PMT] Chunk loading failed, attempting automatic reload...', error);
      if (!pageHasBeenReloaded) {
        safeSessionStorage.setItem('pmt_chunk_reloaded', 'true');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      safeSessionStorage.removeItem('pmt_chunk_reloaded');
      throw error;
    }
  });
}

const HomePage = lazyWithRetry(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ToolsPage = lazyWithRetry(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const ToolDetailPage = lazyWithRetry(() => import('./pages/ToolDetailPage').then(m => ({ default: m.ToolDetailPage })));
const LongTailPage = lazyWithRetry(() => import('./pages/LongTailPage').then(m => ({ default: m.LongTailPage })));
const CategoriesPage = lazyWithRetry(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const CategoryDetailPage = lazyWithRetry(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage })));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazyWithRetry(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const DisclaimerPage = lazyWithRetry(() => import('./pages/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const TermsPage = lazyWithRetry(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const CreditsPage = lazyWithRetry(() => import('./pages/CreditsPage').then(m => ({ default: m.CreditsPage })));
const GuidesPage = lazyWithRetry(() => import('./pages/GuidesPage').then(m => ({ default: m.GuidesPage })));
const GuideDetailPage = lazyWithRetry(() => import('./pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));

// ErrorBoundary component to prevent white screen on unexpected route errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error('Routing/Render Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Page failed to load</h2>
          <p className="text-slate-600 mb-6 max-w-md">
            A new update of Public Media Tool is available or your browser cached an older bundle.
          </p>
          <button
            onClick={() => {
              if ('caches' in window) {
                caches.keys().then((names) => {
                  names.forEach((name) => caches.delete(name));
                });
              }
              window.location.reload();
            }}
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Root-relative routing for custom domain publicmediatool.com
const BASE_PATH: string = '';
// Unused legacy fallback constant for original GitHub Pages subpath
const LEGACY_GITHUB_PAGES_BASE = '/public-media-tool';

const getRelativePath = (pathname: string) => {
  let p = pathname;
  if (BASE_PATH && p.startsWith(BASE_PATH)) {
    p = p.slice(BASE_PATH.length);
  } else if (p.startsWith(LEGACY_GITHUB_PAGES_BASE)) {
    p = p.slice(LEGACY_GITHUB_PAGES_BASE.length);
  }
  if (!p || p === '' || p === '/' || p === '/404.html' || p === '/index.html') {
    return '/';
  }
  if (p.length > 1 && p.endsWith('/') && !p.includes('?')) {
    p = p.slice(0, -1);
  }
  return p;
};

const getInitialPath = () => {
  if (typeof window === 'undefined') return '/';
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    return getRelativePath(window.location.hash.slice(1));
  }
  return getRelativePath(window.location.pathname + window.location.search);
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const initStore = useToolsStore((state) => state.initStore);

  useEffect(() => {
    initStore();
    checkVersionAndClearCache();
  }, [initStore]);

  const navigate = (path: string) => {
    const relPath = getRelativePath(path);
    setCurrentPath(relPath);
    if (typeof window !== 'undefined') {
      const isGH = BASE_PATH !== '' && window.location.pathname.startsWith(BASE_PATH);
      const fullPath = isGH
        ? (relPath === '/' ? BASE_PATH + '/' : BASE_PATH + relPath)
        : (relPath === '/' ? '/' : relPath);
      window.history.pushState({}, '', fullPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleOpenSearchWithQuery = (q: string) => {
    setInitialSearchQuery(q);
    setSearchModalOpen(true);
  };

  const renderContent = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} onOpenSearchWithQuery={handleOpenSearchWithQuery} />;
    }

    if (currentPath === '/tools' || currentPath.startsWith('/tools?')) {
      return <ToolsPage navigate={navigate} initialQuery={initialSearchQuery} />;
    }

    // Check programmatic long-tail pages first (e.g. /converters/volume/liters-to-gallons, /calculators/...)
    const longTailMatch = getLongTailPageByPath(currentPath.split('?')[0]);
    if (longTailMatch) {
      return <LongTailPage pageData={longTailMatch} navigate={navigate} />;
    }

    if (currentPath.startsWith('/tools/')) {
      const slug = currentPath.replace('/tools/', '').split('?')[0];
      return <ToolDetailPage slug={slug} navigate={navigate} />;
    }

    if (currentPath === '/categories') {
      return <CategoriesPage navigate={navigate} />;
    }

    if (currentPath.startsWith('/categories/')) {
      const categorySlug = currentPath.replace('/categories/', '').split('?')[0];
      return <CategoryDetailPage categorySlug={categorySlug} navigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage navigate={navigate} />;
    }

    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <TermsPage navigate={navigate} />;
    }

    if (currentPath === '/disclaimer') {
      return <DisclaimerPage navigate={navigate} />;
    }

    if (currentPath === '/credits') {
      return <CreditsPage navigate={navigate} />;
    }

    if (currentPath === '/guides') {
      return <GuidesPage navigate={navigate} />;
    }

    if (currentPath.startsWith('/guides/')) {
      const guideSlug = currentPath.replace('/guides/', '').split('?')[0];
      return <GuideDetailPage guideSlug={guideSlug} navigate={navigate} />;
    }

    // Default fallback
    return <HomePage navigate={navigate} onOpenSearchWithQuery={handleOpenSearchWithQuery} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 antialiased">
      <Navbar
        currentPath={currentPath}
        navigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          <React.Suspense fallback={
            <div className="flex-1 flex items-center justify-center py-20 min-h-[400px]">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          }>
            {renderContent()}
          </React.Suspense>
        </ErrorBoundary>
      </main>

      <Footer navigate={navigate} />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTool={(slug) => {
          if (slug.startsWith('?q=')) {
            navigate(`/tools${slug}`);
          } else {
            navigate(`/tools/${slug}`);
          }
          setSearchModalOpen(false);
        }}
      />
    </div>
  );
}
