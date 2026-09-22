import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../lib/categories';
import { WORKING_TOOLS, TOTAL_TOOLS } from '../lib/tools-data';
import { getIconComponent } from '../lib/utils';
import { ArrowRight, Search, X, Grid, Sparkles } from 'lucide-react';

interface CategoriesPageProps {
  navigate: (path: string) => void;
}

const DEPARTMENT_MAP: Record<string, string> = {
  'Developer Tools': 'Developer & Web',
  'Web Tools': 'Developer & Web',
  'SEO Tools': 'Developer & Web',
  'Security Tools': 'Developer & Web',
  'Data Management': 'Developer & Web',
  'Networking': 'Developer & Web',

  'Image Tools': 'Media & Content',
  'Video Tools': 'Media & Content',
  'Audio Tools': 'Media & Content',
  'PDF Tools': 'Media & Content',
  'Photography': 'Media & Content',
  'Music Production': 'Media & Content',
  'YouTube Creator Tools': 'Media & Content',
  'Color Tools': 'Media & Content',

  'Text Tools': 'Text & Productivity',
  'Generators': 'Text & Productivity',
  'Date & Time': 'Text & Productivity',
  'Productivity': 'Text & Productivity',
  'Office Administration': 'Text & Productivity',
  'Social Media Tools': 'Text & Productivity',

  'Math Tools': 'Math & Science',
  'Calculator Tools': 'Math & Science',
  'Converter Tools': 'Math & Science',
  'Unit Converters': 'Math & Science',
  'Electrical & Solar': 'Math & Science',
  'Engineering': 'Math & Science',

  'Finance Tools': 'Business & Finance',
  'Business Tools': 'Business & Finance',
  'Accounting': 'Business & Finance',
  'Legal Tools': 'Business & Finance',
  'Real Estate': 'Business & Finance',
  'HR & Payroll': 'Business & Finance',
  'E-commerce': 'Business & Finance',
  'Inventory & Logistics': 'Business & Finance',
  'Freelancing': 'Business & Finance',
  'Marketing & Advertising': 'Business & Finance',
  'Project Management': 'Business & Finance',

  'Automotive': 'Industry & Lifestyle',
  'Health & Fitness': 'Industry & Lifestyle',
  'Education': 'Industry & Lifestyle',
  'Travel Tools': 'Industry & Lifestyle',
  'Construction': 'Industry & Lifestyle',
  'Agriculture': 'Industry & Lifestyle',
  'Restaurant & Cafe': 'Industry & Lifestyle',
  'Beauty & Salon': 'Industry & Lifestyle',
  'Wedding & Event': 'Industry & Lifestyle',
  'Environment & Energy': 'Industry & Lifestyle',
  'Pets & Animals': 'Industry & Lifestyle',
  'Government & Public Services': 'Industry & Lifestyle',
};

function getCategoryDepartment(cat: any): string {
  if (typeof cat === 'object' && cat && cat.department) return cat.department;
  const name = typeof cat === 'string' ? cat : cat?.name || '';
  return DEPARTMENT_MAP[name] || 'Industry & Lifestyle';
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Pre-calculate tool counts per category from WORKING_TOOLS
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    WORKING_TOOLS.forEach((tool) => {
      const catName = tool.category;
      counts[catName] = (counts[catName] || 0) + 1;
    });
    return counts;
  }, []);

  // Department list with live category counts
  const departments = useMemo(() => {
    const map: Record<string, number> = {};
    CATEGORIES.forEach((cat) => {
      const dept = getCategoryDepartment(cat);
      map[dept] = (map[dept] || 0) + 1;
    });

    const list = Object.entries(map).map(([name, count]) => ({ name, count }));
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, []);

  // Filter categories based on search query and selected department
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      const dept = getCategoryDepartment(cat);
      const matchesSearch =
        !searchQuery.trim() ||
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = selectedDepartment === 'All' || dept === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDepartment]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  const totalToolsCount = WORKING_TOOLS.length || TOTAL_TOOLS;

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 px-3.5 py-1 bg-indigo-50 rounded-full border border-indigo-100">
            Categorized Directory
          </span>
          <h1 className="text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Explore All Categories
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Discover tools organized across <strong className="text-slate-900 font-bold">{CATEGORIES.length} categories</strong> and <strong className="text-slate-900 font-bold">{totalToolsCount.toLocaleString()}+ free browser tools</strong>.
          </p>
        </div>

        {/* Search & Department Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories by name, description, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:bg-white rounded-2xl text-sm transition-all shadow-2xs outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Department Filter Chips */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Filter by Department ({departments.length})
              </h3>
              {selectedDepartment !== 'All' && (
                <button
                  onClick={() => setSelectedDepartment('All')}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Show All ({CATEGORIES.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-1.5 border border-slate-100 rounded-2xl bg-slate-50/60">
              <button
                onClick={() => setSelectedDepartment('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center gap-2 ${
                  selectedDepartment === 'All'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>All Departments</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  selectedDepartment === 'All' ? 'bg-indigo-700/60 text-indigo-50' : 'bg-slate-100 text-slate-600'
                }`}>
                  {CATEGORIES.length}
                </span>
              </button>

              {departments.map((dept) => (
                <button
                  key={dept.name}
                  onClick={() => setSelectedDepartment(dept.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer border flex items-center gap-2 ${
                    selectedDepartment === dept.name
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/10'
                      : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{dept.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    selectedDepartment === dept.name ? 'bg-indigo-700/60 text-indigo-50' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Header showing active result count */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Showing {filteredCategories.length} of {CATEGORIES.length} categories</span>
          {(searchQuery || selectedDepartment !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="text-indigo-600 hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Single Unified Grid of All Category Cards */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => {
              const IconComp = getIconComponent(cat.iconName);
              const toolCount = cat.count || categoryCounts[cat.name] || categoryCounts[cat.id] || 0;
              const deptName = getCategoryDepartment(cat);

              return (
                <div
                  key={cat.id}
                  onClick={() => navigate(`/categories/${cat.slug}`)}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 overflow-hidden min-h-[220px]"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${cat.colorGradient} text-white flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-xs`}>
                        <IconComp className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[11px] font-extrabold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/80">
                        {toolCount.toLocaleString()} {toolCount === 1 ? 'Tool' : 'Tools'}
                      </span>
                    </div>

                    {/* Middle: Department tag + Name + Description */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {deptName}
                      </span>
                      <h3 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom: Link Button */}
                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                    <span>Explore Category</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-xs max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-100">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-800">No categories found</h3>
              <p className="text-xs text-slate-500">
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
      </div>
    </div>
  );
};

