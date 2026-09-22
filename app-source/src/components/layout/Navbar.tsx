import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Tools', path: '/tools' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Scroll progress bar */}
      <div
        className="h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? 'glass-nav py-3 shadow-xs' : 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            {/* Geometric PMT Monogram Hexagon Logo */}
            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm">
                <defs>
                  <linearGradient id="pmtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                {/* Hexagon */}
                <polygon points="50,5 92,28 92,72 50,95 8,72 8,28" fill="url(#pmtGradient)" />
                {/* Geometric PMT text */}
                <text
                  x="50"
                  y="59"
                  fill="#FFFFFF"
                  fontSize="32"
                  fontWeight="800"
                  fontFamily="'Space Grotesk', sans-serif"
                  textAnchor="middle"
                  letterSpacing="-1"
                >
                  PMT
                </text>
              </svg>
            </div>

            <div>
              <span className="font-heading font-extrabold text-xl text-slate-900 tracking-tight block leading-none">
                Public Media Tool
              </span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase block mt-1">
                100% Client-Side • Free
              </span>
            </div>
          </button>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative py-1 text-sm font-semibold transition-colors cursor-pointer ${
                    isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {/* Active Underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Search Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="w-11 h-11 flex items-center justify-center rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              title="Search tools"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-slate-700 font-medium text-sm transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                Search all tools...
              </span>
              <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-heading font-bold text-2xl text-slate-800 hover:text-indigo-600 py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile menu content footer */}
          </div>

          <div className="text-center text-xs text-slate-400 pt-6">
            © 2025 Public Media Tool. 100% Client-Side.
          </div>
        </div>
      )}
    </header>
  );
};
