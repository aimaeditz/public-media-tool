import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { useToolsStore } from '../../lib/tools-store';
import { getIconComponent } from '../../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchIndex, setSearchIndex] = useState<any[]>([]);
  const tools = useToolsStore((state) => state.tools);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Load complete search index in background when search modal is opened
  useEffect(() => {
    if (isOpen) {
      import('../../lib/search-index').then((m) => {
        setSearchIndex(m.SEARCH_INDEX);
      });
    }
  }, [isOpen]);

  // Fast 150ms debounce for typing in the overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const searchSource = searchIndex.length > 0 ? searchIndex : tools;

  const filteredTools = debouncedQuery.trim()
    ? searchSource.filter(
        (t) =>
          t.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          t.tags.some((tag: string) => tag.toLowerCase().includes(debouncedQuery.toLowerCase()))
      ).slice(0, 50) // Show only top 50 results
    : searchSource.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-md transition-opacity">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) {
              onClose();
              onSelectTool(`?q=${encodeURIComponent(query.trim())}`);
            }
          }}
          className="relative border-b border-slate-200 p-4 flex items-center gap-3"
        >
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools (e.g. JSON, image resizer, word counter, password)..."
            className="w-full text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Search Results List */}
        <div className="p-4 max-h-[380px] overflow-y-auto space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            {query ? `Search Results (${filteredTools.length})` : 'Popular Quick Tools'}
          </p>

          {filteredTools.length === 0 ? (
            <div className="text-center py-8 text-slate-500 space-y-1">
              <p className="font-semibold text-sm">No matching tools found</p>
              <p className="text-xs">Try searching for keywords like "text", "pdf", "color", or "security".</p>
            </div>
          ) : (
            filteredTools.map((tool) => {
              const IconComp = getIconComponent(tool.iconName);
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool.slug);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/60 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-700">
                        {tool.name}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
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

        {/* Search Footer */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">ESC</kbd> to exit
          </span>
          <span className="font-medium text-indigo-600">100% Client-Side Processing</span>
        </div>
      </div>
    </div>
  );
};
