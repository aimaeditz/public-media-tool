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
          scrolled ? 'glass-nav py-2 sm:py-3 shadow-xs' : 'bg-white/80 backdrop-blur-md py-2.5 sm:py-4 border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/');
            }}
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none"
          >
            {/* Geometric PMT Monogram Hexagon Logo */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
              <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm">
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
              <span className="font-heading font-extrabold text-base sm:text-lg md:text-xl text-slate-900 tracking-tight block leading-none">
                Public Media Tool
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 tracking-wider uppercase block mt-0.5 sm:mt-1">
                100% Client-Side • Free
              </span>
            </div>
          </button>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
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
                  {/* Animated underline on hover / active */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all cursor-pointer border border-slate-200/80 hover:border-indigo-200 shadow-2xs"
              title="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Hamburger & Search Buttons */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[52px] sm:top-[60px] bg-white/95 backdrop-blur-md z-50 p-4 border-b border-slate-200 shadow-xl max-h-[calc(100vh-60px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-heading font-semibold text-sm sm:text-base px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </button>
              );
            })}
          </div>

          <div className="text-center text-[10px] sm:text-xs text-slate-400 pt-3 mt-2 border-t border-slate-100">
            © 2026 Public Media Tool • 100% Client-Side
          </div>
        </div>
      )}
    </header>
  );
};
