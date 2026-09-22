import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { useToolsStore } from './lib/tools-store';
import { Loader2 } from 'lucide-react';

const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ToolsPage = React.lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const ToolDetailPage = React.lazy(() => import('./pages/ToolDetailPage').then(m => ({ default: m.ToolDetailPage })));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage').then(m => ({ default: m.CategoriesPage })));
const CategoryDetailPage = React.lazy(() => import('./pages/CategoryDetailPage').then(m => ({ default: m.CategoryDetailPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const DisclaimerPage = React.lazy(() => import('./pages/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const CreditsPage = React.lazy(() => import('./pages/CreditsPage').then(m => ({ default: m.CreditsPage })));

const BASE_PATH = '/public-media-tool';

const getRelativePath = (pathname: string) => {
  let p = pathname;
  if (p.startsWith(BASE_PATH)) {
    p = p.slice(BASE_PATH.length);
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
  }, [initStore]);

  const navigate = (path: string) => {
    const relPath = getRelativePath(path);
    setCurrentPath(relPath);
    if (typeof window !== 'undefined') {
      const isGH = window.location.pathname.startsWith(BASE_PATH);
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
        <React.Suspense fallback={
          <div className="flex-1 flex items-center justify-center py-20 min-h-[400px]">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
        }>
          {renderContent()}
        </React.Suspense>
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
