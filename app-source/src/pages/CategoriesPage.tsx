import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../lib/categories';
import { getIconComponent } from '../lib/utils';
import { ArrowRight, Search, X, Sparkles } from 'lucide-react';

interface CategoriesPageProps {
  navigate: (path: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Compute unique departments and counts dynamically from categories
  const departments = useMemo(() => {
    const deptMap: Record<string, { name: string; count: number; toolCount: number }> = {};

    CATEGORIES.forEach((cat) => {
      const deptName = cat.department || 'General';
      if (!deptMap[deptName]) {
        deptMap[deptName] = {
          name: deptName,
          count: 0,
          toolCount: 0,
        };
      }
      deptMap[deptName].count++;
      deptMap[deptName].toolCount += cat.count;
    });

    return Object.values(deptMap).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter categories based on search query and selected department
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CATEGORIES.filter((cat) => {
      const matchesSearch =
        !q ||
        cat.name.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q) ||
        (cat.department && cat.department.toLowerCase().includes(q)) ||
        (cat.subCategories && cat.subCategories.some((tag) => tag.toLowerCase().includes(q)));

      const matchesDept = selectedDepartment === 'All' || cat.department === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDepartment]);

  const totalToolsCount = useMemo(() => {
    return CATEGORIES.reduce((sum, cat) => sum + cat.count, 0);
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  return (
    <div className="pt-6 sm:pt-12 pb-16 sm:pb-32 lg:pb-36 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Categorized Suite
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore All Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Discover <strong className="text-slate-900">{totalToolsCount} browser-based utilities</strong> organized across{' '}
            <strong className="text-slate-900">{CATEGORIES.length} balanced categories</strong> and {departments.length} departments.
          </p>
        </div>

        {/* Filter Dashboard */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search categories by name, keyword, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all shadow-2xs outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter Chips */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Filter by Department ({departments.length})
              </h3>
              {(selectedDepartment !== 'All' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
            <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto scrollbar-none gap-1.5 sm:gap-2 p-1 border border-slate-100 rounded-xl sm:rounded-2xl bg-slate-50/50 pb-2 sm:pb-1">
              <button
                onClick={() => setSelectedDepartment('All')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                  selectedDepartment === 'All'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                    : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span>All Departments</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedDepartment === 'All' ? 'bg-indigo-700/50 text-indigo-50' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {CATEGORIES.length}
                </span>
              </button>
              {departments.map((dept) => (
                <button
                  key={dept.name}
                  onClick={() => setSelectedDepartment(dept.name)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                    selectedDepartment === dept.name
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                      : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span>{dept.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedDepartment === dept.name
                        ? 'bg-indigo-700/50 text-indigo-50'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Single Unified Grid of All Categories */}
        {filteredCategories.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
              <p className="text-xs font-semibold text-slate-500">
                Showing <strong className="text-slate-800">{filteredCategories.length}</strong> {filteredCategories.length === 1 ? 'category' : 'categories'}
                {selectedDepartment !== 'All' && <span> in <strong className="text-indigo-600">{selectedDepartment}</strong></span>}
                {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
              {filteredCategories.map((cat) => {
                const IconComp = getIconComponent(cat.iconName);
                return (
                  <div
                    key={cat.id}
                    onClick={() => navigate(`/categories/${cat.slug}`)}
                    className="group relative bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {/* Top Header inside Card */}
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.colorGradient} text-white shadow-sm shadow-indigo-500/10`}>
                          <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 sm:py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200/60">
                          {cat.count} {cat.count === 1 ? 'Tool' : 'Tools'}
                        </span>
                      </div>

                      {/* Department Chip */}
                      <div>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/60 inline-block">
                          {cat.department || 'General'}
                        </span>
                      </div>

                      {/* Category Title & Description */}
                      <div>
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 sm:mt-2 leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 sm:pt-4 mt-3 sm:mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      <span className="text-[11px] sm:text-xs">Explore Suite</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No categories found</h3>
              <p className="text-sm text-slate-500">
                We couldn't find any categories matching "{searchQuery}" in department "{selectedDepartment}".
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/10 active:scale-98 transition-all cursor-pointer"
            >
              Clear Search & Filters
            </button>
          </div>
        )}

        {/* Closing Helper Section for Natural Spacing & Guidance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left mt-12">
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-base font-bold font-heading text-slate-900">
              Looking for all tools at once?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore our complete searchable directory of 1,516+ browser-based utilities across all categories.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/tools')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              View All 1,516+ Tools
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
