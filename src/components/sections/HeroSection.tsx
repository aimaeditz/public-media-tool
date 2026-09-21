import React, { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, ChevronDown, Zap, Shield, Heart, X, Wrench } from 'lucide-react';
import { CATEGORIES, TOOLS, TOTAL_TOOLS, TOTAL_CATEGORIES } from '../../lib/tools-data';
import { getIconComponent } from '../../lib/utils';

interface HeroSectionProps {
  navigate: (path: string) => void;
  onOpenSearchWithQuery: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate, onOpenSearchWithQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFocused(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsFocused(false);
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredTools = searchQuery.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const showDropdown = isFocused && searchQuery.trim().length > 0;

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white">
      {/* Soft animated gradient mesh blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-pink-200/35 rounded-full blur-3xl animate-float-reverse pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Subtle Dot Grid Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto text-center space-y-8">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold shadow-xs animate-bounce-slow">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>100% Client-Side • No Uploads • 100% Private</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-slate-900 leading-[1.1]">
            Powerful Tools.{' '}
            <span className="gradient-text">Simple. Private. Free.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Thousands of free browser-based tools — zero server uploads, no AI noise, no mandatory signup. 100% client-side speed.
          </p>
        </div>

        {/* Large Search Bar (700px max) */}
        <div ref={searchRef} className="max-w-[700px] mx-auto relative group z-30">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500 opacity-30 group-hover:opacity-70 blur-md transition-all duration-300" />
          
          <form
            onSubmit={handleSearchSubmit}
            className="relative bg-white rounded-2xl p-2 shadow-xl border border-slate-200/80 flex items-center gap-2"
          >
            <div className="p-3 text-indigo-600">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsFocused(true);
              }}
              placeholder="Search tools (e.g. JSON, image resizer, word counter, password)..."
              className="w-full text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsFocused(true);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors mr-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white gradient-button rounded-xl flex items-center gap-2 shrink-0 shadow-md cursor-pointer"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Live Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-left z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Matching Tools ({filteredTools.length})</span>
                {filteredTools.length > 0 && (
                  <button
                    onClick={() => {
                      setIsFocused(false);
                      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
                    }}
                    className="text-indigo-600 hover:underline font-semibold tracking-normal normal-case flex items-center gap-1 cursor-pointer"
                  >
                    View all in directory <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="p-2 max-h-[360px] overflow-y-auto space-y-1">
                {filteredTools.length === 0 ? (
                  <div className="text-center py-8 px-4 text-slate-500 space-y-2">
                    <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-sm text-slate-700">No matching tools found</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No tools matched "{searchQuery}". Try keywords like <button onClick={() => setSearchQuery('json')} className="text-indigo-600 font-semibold underline">JSON</button>, <button onClick={() => setSearchQuery('resizer')} className="text-indigo-600 font-semibold underline">resizer</button>, <button onClick={() => setSearchQuery('password')} className="text-indigo-600 font-semibold underline">password</button>, or <button onClick={() => setSearchQuery('word')} className="text-indigo-600 font-semibold underline">word counter</button>.
                    </p>
                  </div>
                ) : (
                  filteredTools.slice(0, 6).map((tool) => {
                    const IconComp = getIconComponent(tool.iconName);
                    return (
                      <button
                        key={tool.id}
                        onClick={() => {
                          setIsFocused(false);
                          navigate(`/tools/${tool.slug}`);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/70 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-indigo-100/80 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-700">
                              {tool.name}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDesc}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-700">
                            {tool.category}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Category Pills Below Search */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Popular:</span>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.slug}`)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/80 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Two CTAs */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => navigate('/tools')}
            className="px-8 py-3.5 text-sm font-bold text-white gradient-button rounded-xl shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2 cursor-pointer"
          >
            Explore Tools
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="px-8 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl hover:border-indigo-300 transition-all shadow-xs cursor-pointer"
          >
            Browse Categories
          </button>
        </div>

        {/* Stats Row */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-200/60 mt-8">
          <div className="text-center">
            <p className="text-3xl font-extrabold font-heading text-indigo-600">{TOTAL_TOOLS.toLocaleString()}+</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Tools Available</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold font-heading text-pink-600">{TOTAL_CATEGORIES}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold font-heading text-amber-600">500k+</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Monthly Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold font-heading text-emerald-600">100%</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Free Forever</p>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <div className="relative z-10 text-center pt-8">
        <a href="#marquee" className="inline-block p-2 text-slate-400 hover:text-indigo-600 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

