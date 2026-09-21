import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryDetailPage } from './pages/CategoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [initialSearchQuery, setInitialSearchQuery] = useState('');

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenSearchWithQuery = (q: string) => {
    setInitialSearchQuery(q);
    setSearchModalOpen(true);
  };

  const renderContent = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} onOpenSearchWithQuery={handleOpenSearchWithQuery} />;
    }

    if (currentPath === '/tools') {
      return <ToolsPage navigate={navigate} initialQuery={initialSearchQuery} />;
    }

    if (currentPath.startsWith('/tools/')) {
      const slug = currentPath.replace('/tools/', '');
      return <ToolDetailPage slug={slug} navigate={navigate} />;
    }

    if (currentPath === '/categories') {
      return <CategoriesPage navigate={navigate} />;
    }

    if (currentPath.startsWith('/categories/')) {
      const categorySlug = currentPath.replace('/categories/', '');
      return <CategoryDetailPage categorySlug={categorySlug} navigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage />;
    }

    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    if (currentPath === '/privacy-policy') {
      return <LegalPage initialTab="privacy" />;
    }

    if (currentPath === '/terms') {
      return <LegalPage initialTab="terms" />;
    }

    if (currentPath === '/disclaimer') {
      return <LegalPage initialTab="disclaimer" />;
    }

    if (currentPath === '/signin') {
      return <SignInPage navigate={navigate} />;
    }

    if (currentPath === '/signup') {
      return <SignUpPage navigate={navigate} />;
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

      <main className="flex-1">{renderContent()}</main>

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
