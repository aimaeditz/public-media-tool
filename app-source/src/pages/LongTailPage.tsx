import React, { useState } from 'react';
import { LongTailPageData } from '../lib/long-tail-data';
import { useSeo, BASE_URL } from '../lib/useSeo';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight,
  Check,
  Copy,
  HelpCircle,
  Layers,
  Sparkles,
  Lock,
  Cpu,
  Smartphone,
  Calculator,
  RefreshCw,
} from 'lucide-react';

interface LongTailPageProps {
  pageData: LongTailPageData;
  navigate: (path: string) => void;
}

export const LongTailPage: React.FC<LongTailPageProps> = ({ pageData, navigate }) => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [hexInput, setHexInput] = useState<string>('#4F46E5');
  const [principal, setPrincipal] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);
  const [compoundFreq, setCompoundFreq] = useState<number>(12); // monthly

  // SEO Integration
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: pageData.h1,
        url: `${BASE_URL}${pageData.path}`,
        applicationCategory: `${pageData.category} Application`,
        operatingSystem: 'All modern browsers (Chrome, Safari, Firefox, Edge)',
        description: pageData.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: pageData.features,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageData.category,
            item: `${BASE_URL}/categories/${pageData.categorySlug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pageData.parentToolName,
            item: `${BASE_URL}/tools/${pageData.parentToolSlug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: pageData.h1,
            item: `${BASE_URL}${pageData.path}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: pageData.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        name: `How to use ${pageData.h1}`,
        description: pageData.summary,
        step: pageData.howToSteps.map((s) => ({
          '@type': 'HowToStep',
          position: s.step,
          name: s.title,
          text: s.desc,
        })),
      },
    ],
  };

  useSeo({
    title: pageData.title,
    description: pageData.metaDescription,
    path: pageData.path,
    jsonLd: schemaJsonLd,
  });

  // Calculate live output for converter type
  let calculatedOutput: string = '';
  if (pageData.type === 'converter') {
    if (pageData.offset !== undefined && pageData.factor !== undefined) {
      // Temperature formula (e.g. °C to °F)
      const res = inputValue * pageData.factor + pageData.offset;
      calculatedOutput = res.toLocaleString('en-US', { maximumFractionDigits: 4 });
    } else if (pageData.factor !== undefined) {
      const res = inputValue * pageData.factor;
      calculatedOutput = res.toLocaleString('en-US', { maximumFractionDigits: 6 });
    }
  }

  // Calculate compound interest
  const calcCompoundInterest = () => {
    const r = annualRate / 100;
    const n = compoundFreq;
    const t = years;
    const amount = principal * Math.pow(1 + r / n, n * t);
    const totalInterest = amount - principal;
    return {
      finalAmount: amount.toFixed(2),
      interest: totalInterest.toFixed(2),
    };
  };

  // Parse HEX to RGB
  const parseHexToRgb = (hex: string) => {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length !== 6) {
      return { r: 79, g: 70, b: 229, css: 'rgb(79, 70, 229)' };
    }
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return { r, g, b, css: `rgb(${r}, ${g}, ${b})` };
  };

  const hexRgbResult = parseHexToRgb(hexInput);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-6 sm:pt-10 pb-16 sm:pb-32 lg:pb-36 bg-slate-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-slate-500 overflow-x-auto scrollbar-none pb-1">
          <button onClick={() => navigate('/')} className="hover:text-indigo-600 shrink-0 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => navigate('/categories')} className="hover:text-indigo-600 shrink-0 cursor-pointer">
            Categories
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => navigate(`/categories/${pageData.categorySlug}`)} className="text-slate-800 hover:text-indigo-600 shrink-0 cursor-pointer">
            {pageData.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => navigate(`/tools/${pageData.parentToolSlug}`)} className="text-slate-800 hover:text-indigo-600 shrink-0 cursor-pointer truncate max-w-[150px]">
            {pageData.parentToolName}
          </button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-indigo-600 font-bold truncate max-w-[200px]">
            {pageData.slug}
          </span>
        </nav>

        {/* Header Banner - Exactly one <h1> */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shrink-0">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                <button
                  onClick={() => navigate(`/categories/${pageData.categorySlug}`)}
                  className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors rounded-full border border-indigo-100 uppercase cursor-pointer"
                >
                  {pageData.category}
                </button>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Client-Side
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Sub-millisecond Execution
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900">
                {pageData.h1}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {pageData.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
            <button
              onClick={() => navigate(`/tools/${pageData.parentToolSlug}`)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>Main Suite: {pageData.parentToolName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Interactive Conversion / Calculation Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-indigo-600" /> Live Interactive Calculation
            </h2>
            <span className="text-xs text-slate-400 font-medium">Real-time browser engine</span>
          </div>

          {pageData.type === 'converter' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Input Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {pageData.unitFrom}
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 text-lg font-bold bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter value"
                />
                <span className="text-[11px] text-slate-500 block">Enter any number to convert in real-time</span>
              </div>

              {/* Output Box */}
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-2 relative">
                <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                  {pageData.unitTo} (Calculated Output)
                </label>
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-indigo-200">
                  <span className="text-lg font-bold text-indigo-600 truncate">{calculatedOutput}</span>
                  <button
                    onClick={() => handleCopy(calculatedOutput)}
                    className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-indigo-700 block">Formula: {pageData.formula}</span>
              </div>
            </div>
          )}

          {pageData.type === 'finance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Initial Principal ($)</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    value={annualRate}
                    step="0.1"
                    onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Time (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Compounding Frequency</label>
                  <select
                    value={compoundFreq}
                    onChange={(e) => setCompoundFreq(parseInt(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold bg-white border border-slate-300 rounded-lg"
                  >
                    <option value={1}>Annually (1/yr)</option>
                    <option value={4}>Quarterly (4/yr)</option>
                    <option value={12}>Monthly (12/yr)</option>
                    <option value={365}>Daily (365/yr)</option>
                  </select>
                </div>
              </div>

              {/* Finance Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-indigo-50 border border-indigo-200">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase">Estimated Final Value</span>
                  <p className="text-2xl font-extrabold text-indigo-900 mt-1">${calcCompoundInterest().finalAmount}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase">Total Interest Earned</span>
                  <p className="text-2xl font-extrabold text-emerald-600 mt-1">${calcCompoundInterest().interest}</p>
                </div>
              </div>
            </div>
          )}

          {pageData.type === 'color' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">HEX Color Code</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                    className="w-full px-4 py-3 text-lg font-bold bg-white text-slate-900 border border-slate-300 rounded-xl"
                    placeholder="#4F46E5"
                  />
                  <input
                    type="color"
                    value={hexInput.startsWith('#') && hexInput.length === 7 ? hexInput : '#4F46E5'}
                    onChange={(e) => setHexInput(e.target.value)}
                    className="w-12 h-12 rounded-xl cursor-pointer border border-slate-300 p-1"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-2">
                <label className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">RGB CSS Format</label>
                <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-indigo-200">
                  <span className="text-lg font-bold text-indigo-600 font-mono">{hexRgbResult.css}</span>
                  <button
                    onClick={() => handleCopy(hexRgbResult.css)}
                    className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Mathematical & Practical Context (200+ Words Unique Content) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-5">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
            About {pageData.h1} & Mathematical Principles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {pageData.content}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-700">Official Conversion Formula:</span>
            <code className="px-3 py-1 bg-white rounded-lg border border-slate-200 font-mono font-bold text-indigo-600 text-xs">
              {pageData.formula}
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Lock className="w-4 h-4" /> Zero Server Uploads
              </div>
              <p className="text-xs text-slate-600">Calculations execute directly in your browser's V8 engine with complete confidentiality.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Cpu className="w-4 h-4" /> Instant Response
              </div>
              <p className="text-xs text-slate-600">Eliminates network lag for high-frequency workflows and engineering estimations.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs sm:text-sm">
                <Smartphone className="w-4 h-4" /> Universal Compatibility
              </div>
              <p className="text-xs text-slate-600">Responsive across iPhones, Android devices, tablets, and desktop workstations.</p>
            </div>
          </div>
        </div>

        {/* Reference Quick Lookup Table (if available) */}
        {pageData.sampleRows && pageData.sampleRows.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-4">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" /> Worked Conversion Reference Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="px-4 py-3">{pageData.tableHeaderFrom || 'Input'}</th>
                    <th className="px-4 py-3">{pageData.tableHeaderTo || 'Output'}</th>
                    <th className="px-4 py-3">Formula Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pageData.sampleRows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-bold text-slate-800">{row.inputVal}</td>
                      <td className="px-4 py-2.5 font-bold text-indigo-600">{row.outputVal}</td>
                      <td className="px-4 py-2.5 text-slate-500">{row.note || `${row.inputVal} converted via standard formula`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step-by-Step How to Use */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-4">
          <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900">
            How to Use This {pageData.h1}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pageData.howToSteps.map((step) => (
              <div key={step.step} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                <span className="text-xs font-bold text-indigo-600">Step 0{step.step}</span>
                <p className="font-bold text-slate-800 text-xs sm:text-sm">{step.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        {pageData.faqs.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/80 space-y-4">
            <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {pageData.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{faq.question}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hub-and-Spoke Back Link to Master Tool & Category Hub */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Parent Master Suite
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Need Multi-Unit Conversions? Launch {pageData.parentToolName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Access the full comprehensive matrix with dozens of additional unit scales.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate(`/tools/${pageData.parentToolSlug}`)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch Master Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate(`/categories/${pageData.categorySlug}`)}
              className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              <span>Category Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
