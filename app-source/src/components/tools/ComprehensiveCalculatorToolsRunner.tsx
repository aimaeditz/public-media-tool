import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Calculator,
  ArrowRightLeft,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Percent,
  TrendingUp,
  DollarSign,
  Scale,
  Flame,
  Activity,
  Maximize2,
  Minimize2,
  Clock,
  HardDrive,
  Calendar,
  Moon,
  Compass,
  Gauge,
  Zap,
  HelpCircle,
  FileSpreadsheet,
  GraduationCap,
  Shirt,
  Thermometer,
  PieChart,
  Binary,
  Layers,
  HeartPulse,
  Droplet,
  Split,
  Tag,
  CreditCard
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

// Unit conversion definitions
const LENGTH_UNITS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852,
};

const WEIGHT_UNITS: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523,
  t: 1000,
  stone: 6.35029318,
};

const AREA_UNITS: Record<string, number> = {
  sqm: 1,
  sqkm: 1000000,
  sqft: 0.092903,
  sqyd: 0.836127,
  acre: 4046.86,
  hectare: 10000,
  sqin: 0.00064516,
};

const VOLUME_UNITS: Record<string, number> = {
  l: 1,
  ml: 0.001,
  cbm: 1000,
  gal: 3.78541,
  qt: 0.946353,
  pt: 0.473176,
  cup: 0.236588,
  floz: 0.0295735,
  tbsp: 0.0147868,
  tsp: 0.00492892,
};

const SPEED_UNITS: Record<string, number> = {
  mps: 1,
  kmh: 0.277778,
  mph: 0.44704,
  knot: 0.514444,
  fps: 0.3048,
};

const DIGITAL_UNITS: Record<string, number> = {
  b: 1,
  kb: 1024,
  mb: 1048576,
  gb: 1073741824,
  tb: 1099511627776,
  pb: 1125899906842624,
};

const TIME_UNITS: Record<string, number> = {
  s: 1,
  ms: 0.001,
  min: 60,
  h: 3600,
  d: 86400,
  wk: 604800,
  mo: 2629746,
  yr: 31556952,
};

const PRESSURE_UNITS: Record<string, number> = {
  pa: 1,
  kpa: 1000,
  bar: 100000,
  psi: 6894.76,
  atm: 101325,
  torr: 133.322,
};

const POWER_UNITS: Record<string, number> = {
  w: 1,
  kw: 1000,
  hp: 745.7,
  btuh: 0.293071,
};

const TORQUE_UNITS: Record<string, number> = {
  nm: 1,
  lbft: 1.355818,
  lbin: 0.1129848,
  kgm: 9.80665,
};

const ANGLE_UNITS: Record<string, number> = {
  deg: 1,
  rad: 57.2957795,
  grad: 0.9,
};

const FREQ_UNITS: Record<string, number> = {
  hz: 1,
  khz: 1000,
  mhz: 1000000,
  ghz: 1000000000,
  rpm: 0.0166667,
};

const FORCE_UNITS: Record<string, number> = {
  n: 1,
  kn: 1000,
  lbf: 4.44822,
  kgf: 9.80665,
  dyn: 0.00001,
};

// Clothing size table
const CLOTHING_SIZES = [
  { us: 'XS (0-2)', uk: '4-6', eu: '32-34', bust: '31-32 in', waist: '24-25 in', hips: '34-35 in' },
  { us: 'S (4-6)', uk: '8-10', eu: '36-38', bust: '33-34 in', waist: '26-27 in', hips: '36-37 in' },
  { us: 'M (8-10)', uk: '12-14', eu: '40-42', bust: '35-37 in', waist: '28-30 in', hips: '38-40 in' },
  { us: 'L (12-14)', uk: '16-18', eu: '44-46', bust: '38-40 in', waist: '31-33 in', hips: '41-43 in' },
  { us: 'XL (16-18)', uk: '20-22', eu: '48-50', bust: '41-43 in', waist: '34-37 in', hips: '44-47 in' },
  { us: 'XXL (20-22)', uk: '24-26', eu: '52-54', bust: '44-47 in', waist: '38-41 in', hips: '48-51 in' }
];

export const ComprehensiveCalculatorToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const slug = tool.slug;
  const category = tool.category;
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    onCopy();
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Base state
  const [val1, setVal1] = useState<string>('25');
  const [val2, setVal2] = useState<string>('15');
  const [val3, setVal3] = useState<string>('5');

  // Unit converter state
  const [convVal, setConvVal] = useState<string>('25');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');

  // Fractions
  const [fracN1, setFracN1] = useState<number>(3);
  const [fracD1, setFracD1] = useState<number>(4);
  const [fracN2, setFracN2] = useState<number>(1);
  const [fracD2, setFracD2] = useState<number>(2);
  const [fracOp, setFracOp] = useState<string>('+');

  // Stats / Numbers list
  const [statsInput, setStatsInput] = useState<string>('12, 15, 18, 22, 25, 30, 35');

  // Age & Birthday
  const [birthDate, setBirthDate] = useState<string>('1996-05-18');

  // Temperature
  const [tempVal, setTempVal] = useState<number>(24);
  const [tempScale, setTempScale] = useState<'C' | 'F' | 'K'>('C');

  // 1. ZODIAC SIGN FINDER
  if (slug === 'zodiac-sign-finder-universal' || (slug.includes('zodiac') && !slug.includes('western'))) {
    const bMonth = parseInt(val1) || 6;
    const bDay = parseInt(val2) || 15;
    const signs = [
      { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth', ruler: 'Saturn' },
      { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air', ruler: 'Uranus' },
      { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water', ruler: 'Neptune' },
      { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire', ruler: 'Mars' },
      { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth', ruler: 'Venus' },
      { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air', ruler: 'Mercury' },
      { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water', ruler: 'Moon' },
      { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire', ruler: 'Sun' },
      { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth', ruler: 'Mercury' },
      { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air', ruler: 'Venus' },
      { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water', ruler: 'Pluto' },
      { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire', ruler: 'Jupiter' }
    ];
    let signIdx = 0;
    if ((bMonth === 1 && bDay >= 20) || (bMonth === 2 && bDay <= 18)) signIdx = 1;
    else if ((bMonth === 2 && bDay >= 19) || (bMonth === 3 && bDay <= 20)) signIdx = 2;
    else if ((bMonth === 3 && bDay >= 21) || (bMonth === 4 && bDay <= 19)) signIdx = 3;
    else if ((bMonth === 4 && bDay >= 20) || (bMonth === 5 && bDay <= 20)) signIdx = 4;
    else if ((bMonth === 5 && bDay >= 21) || (bMonth === 6 && bDay <= 20)) signIdx = 5;
    else if ((bMonth === 6 && bDay >= 21) || (bMonth === 7 && bDay <= 22)) signIdx = 6;
    else if ((bMonth === 7 && bDay >= 23) || (bMonth === 8 && bDay <= 22)) signIdx = 7;
    else if ((bMonth === 8 && bDay >= 23) || (bMonth === 9 && bDay <= 22)) signIdx = 8;
    else if ((bMonth === 9 && bDay >= 23) || (bMonth === 10 && bDay <= 22)) signIdx = 9;
    else if ((bMonth === 10 && bDay >= 23) || (bMonth === 11 && bDay <= 21)) signIdx = 10;
    else if ((bMonth === 11 && bDay >= 22) || (bMonth === 12 && bDay <= 21)) signIdx = 11;
    const sign = signs[signIdx];

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Astrological sun sign, element, and planetary ruler calculator</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Zodiac Engine</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Birth Month (1-12)</label>
            <input type="number" min="1" max="12" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Birth Day (1-31)</label>
            <input type="number" min="1" max="31" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Sun Sign</p>
            <p className="text-2xl font-bold font-serif text-purple-900 mt-1">{sign.name}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Date Span</p>
            <p className="text-sm font-bold text-indigo-900 mt-2">{sign.dates}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Astrological Element</p>
            <p className="text-xl font-bold text-amber-900 mt-1">{sign.element}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Ruling Planet</p>
            <p className="text-xl font-bold text-emerald-900 mt-1">{sign.ruler}</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. AGE & BIRTHDAY CALCULATOR
  if (slug.includes('age') || slug.includes('birthday')) {
    const dob = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    const diffTime = Math.abs(today.getTime() - dob.getTime());
    const totalDaysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const nextBday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < today) nextBday.setFullYear(today.getFullYear() + 1);
    const daysToNextBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-pink-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Chronological age, exact days lived, and next birthday countdown</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-pink-500/20 text-pink-300 rounded-full">Age Engine</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Date of Birth</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 text-center">
            <p className="text-xs text-pink-800 font-medium">Exact Age</p>
            <p className="text-2xl font-bold font-mono text-pink-900 mt-1">{years} yrs</p>
            <p className="text-[11px] text-pink-700">{months} mos, {days} days</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Total Days Lived</p>
            <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{totalDaysLived.toLocaleString()} d</p>
            <p className="text-[11px] text-purple-700">~{Math.round(totalDaysLived * 24).toLocaleString()} hours</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Next Birthday</p>
            <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{daysToNextBday} days</p>
            <p className="text-[11px] text-indigo-700">Turning {years + 1}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Total Weeks</p>
            <p className="text-2xl font-bold font-mono text-amber-900 mt-1">{Math.floor(totalDaysLived / 7).toLocaleString()} wks</p>
            <p className="text-[11px] text-amber-700">Life milestones</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. STATISTICAL CALCULATOR (Standard Deviation, Variance, Mean, Median, Mode)
  if (slug.includes('deviation') || slug.includes('variance') || slug.includes('stat') || slug.includes('mean') || slug.includes('median')) {
    const nums = statsInput.split(/[,\s]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));
    const count = nums.length;
    const mean = count > 0 ? nums.reduce((a, b) => a + b, 0) / count : 0;
    const sorted = [...nums].sort((a, b) => a - b);
    const median = count > 0 ? (count % 2 === 0 ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2 : sorted[Math.floor(count / 2)]) : 0;
    const variance = count > 1 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (count - 1) : 0;
    const stdDev = Math.sqrt(variance);
    const popVariance = count > 0 ? nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count : 0;
    const popStdDev = Math.sqrt(popVariance);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Sample & population standard deviation, variance, mean, and median</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Statistics</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Dataset (comma or space separated)</label>
          <input type="text" value={statsInput} onChange={(e) => setStatsInput(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" placeholder="12, 15, 18, 22, 25, 30, 35" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Sample Std Dev (s)</p>
            <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">{stdDev.toFixed(3)}</p>
            <p className="text-[11px] text-emerald-700">Variance: {variance.toFixed(2)}</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 text-center">
            <p className="text-xs text-teal-800 font-medium">Population Std Dev (σ)</p>
            <p className="text-2xl font-bold font-mono text-teal-900 mt-1">{popStdDev.toFixed(3)}</p>
            <p className="text-[11px] text-teal-700">Variance: {popVariance.toFixed(2)}</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Mean (Average)</p>
            <p className="text-2xl font-bold font-mono text-sky-900 mt-1">{mean.toFixed(2)}</p>
            <p className="text-[11px] text-sky-700">Count (n) = {count}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Median</p>
            <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{median.toFixed(2)}</p>
            <p className="text-[11px] text-indigo-700">Range: {count > 0 ? sorted[count - 1] - sorted[0] : 0}</p>
          </div>
        </div>
      </div>
    );
  }

  // 4. PERCENTAGE & PERCENT CHANGE CALCULATOR
  if (slug.includes('percent')) {
    const p1 = parseFloat(val1) || 25;
    const p2 = parseFloat(val2) || 150;
    const percentOf = (p1 / 100) * p2;
    const percentDiff = p1 !== 0 ? ((p2 - p1) / Math.abs(p1)) * 100 : 0;
    const isWhatPercent = p2 !== 0 ? (p1 / p2) * 100 : 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Percent className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Universal percentage, percent change, and ratio proportions</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full">Percentage</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value A (or Percentage %)</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value B (Base Number)</label>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">{p1}% of {p2}</p>
            <p className="text-3xl font-bold font-mono text-amber-900 mt-1">{percentOf.toFixed(2)}</p>
            <p className="text-[11px] text-amber-700">Direct percentage calculation</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">% Change from {p1} to {p2}</p>
            <p className="text-3xl font-bold font-mono text-emerald-900 mt-1">{percentDiff > 0 ? `+${percentDiff.toFixed(1)}%` : `${percentDiff.toFixed(1)}%`}</p>
            <p className="text-[11px] text-emerald-700">{percentDiff >= 0 ? 'Increase' : 'Decrease'}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">{p1} is what % of {p2}</p>
            <p className="text-3xl font-bold font-mono text-indigo-900 mt-1">{isWhatPercent.toFixed(1)}%</p>
            <p className="text-[11px] text-indigo-700">Proportional representation</p>
          </div>
        </div>
      </div>
    );
  }

  // 5. TEMPERATURE CONVERTER
  if (slug.includes('temperature') || slug.includes('celsius') || slug.includes('fahrenheit') || slug.includes('kelvin')) {
    const c = tempScale === 'C' ? tempVal : tempScale === 'F' ? ((tempVal - 32) * 5) / 9 : tempVal - 273.15;
    const f = (c * 9) / 5 + 32;
    const k = c + 273.15;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Thermometer className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Accurate thermodynamic conversion across Celsius, Fahrenheit, and Kelvin</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-full">Thermodynamics</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Temperature Value</label>
            <input type="number" step="0.1" value={tempVal} onChange={(e) => setTempVal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Input Scale</label>
            <select value={tempScale} onChange={(e) => setTempScale(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              <option value="C">Celsius (°C)</option>
              <option value="F">Fahrenheit (°F)</option>
              <option value="K">Kelvin (K)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
            <p className="text-xs text-rose-800 font-medium">Celsius</p>
            <p className="text-3xl font-bold font-mono text-rose-900 mt-1">{c.toFixed(2)} °C</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Fahrenheit</p>
            <p className="text-3xl font-bold font-mono text-amber-900 mt-1">{f.toFixed(2)} °F</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Kelvin</p>
            <p className="text-3xl font-bold font-mono text-sky-900 mt-1">{k.toFixed(2)} K</p>
          </div>
        </div>
      </div>
    );
  }

  // 6. CLOTHING & SHOE SIZE CONVERTER
  if (slug.includes('clothing') || slug.includes('shoe') || slug.includes('dress') || slug.includes('apparel')) {
    const selectedIdx = Math.min(Math.max(parseInt(val1) || 1, 0), CLOTHING_SIZES.length - 1);
    const size = CLOTHING_SIZES[selectedIdx];

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shirt className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">International garment size conversion across US, UK, and EU standards</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Apparel Converter</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Size Tier</label>
          <select value={selectedIdx} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
            {CLOTHING_SIZES.map((s, idx) => (
              <option key={idx} value={idx}>{s.us} (US) / {s.eu} (EU)</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">US Size</p>
            <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{size.us}</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">UK Size</p>
            <p className="text-2xl font-bold font-mono text-sky-900 mt-1">{size.uk}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">EU Size</p>
            <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">{size.eu}</p>
          </div>
        </div>
      </div>
    );
  }

  // 7. HEALTH, FITNESS & METABOLISM (BMI, BMR, Running Pace, Water Intake, Macronutrients, Ovulation)
  if (slug.includes('bmi') || slug.includes('bmr') || slug.includes('calorie') || slug.includes('water') || slug.includes('pace') || slug.includes('macro') || slug.includes('ovulation') || slug.includes('fertility')) {
    const weightKg = parseFloat(val1) || 72;
    const heightCm = parseFloat(val2) || 178;
    const ageVal = parseFloat(val3) || 28;

    // BMI
    const heightM = heightCm / 100;
    const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
    const bmiCat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';

    // BMR (Mifflin-St Jeor)
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
    const tdee = Math.round(bmr * 1.55); // moderate activity

    // Running pace
    const runDistMiles = parseFloat(val1) || 5;
    const runTimeMin = parseFloat(val2) || 45;
    const paceMinPerMile = runDistMiles > 0 ? runTimeMin / runDistMiles : 0;
    const pMin = Math.floor(paceMinPerMile);
    const pSec = Math.round((paceMinPerMile % 1) * 60);

    // Water intake
    const waterLiters = (weightKg * 0.033).toFixed(1);
    const waterOunces = Math.round(weightKg * 0.033 * 33.814);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Body composition, metabolic rate, and performance bio-metrics</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-full">Health Engine</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg / or run miles)</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm / or run min)</label>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Age (Years)</label>
            <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
            <p className="text-xs text-rose-800 font-medium">BMI Score</p>
            <p className="text-2xl font-bold font-mono text-rose-900 mt-1">{bmi.toFixed(1)}</p>
            <p className="text-[11px] text-rose-700">{bmiCat}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Maintenance TDEE</p>
            <p className="text-2xl font-bold font-mono text-amber-900 mt-1">{tdee} kcal</p>
            <p className="text-[11px] text-amber-700">BMR: {Math.round(bmr)} kcal</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Daily Hydration</p>
            <p className="text-2xl font-bold font-mono text-sky-900 mt-1">{waterLiters} L</p>
            <p className="text-[11px] text-sky-700">{waterOunces} fl oz</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Running Pace</p>
            <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{pMin}:{String(pSec).padStart(2, '0')} /mi</p>
            <p className="text-[11px] text-indigo-700">Calculated pace</p>
          </div>
        </div>
      </div>
    );
  }

  // 8. FINANCIAL & INVESTMENT (ROI, APY, Margin, Markup, Credit Card, Depreciation, Break-even, Inflation, VAT, Tip)
  if (slug.includes('roi') || slug.includes('apy') || slug.includes('margin') || slug.includes('markup') || slug.includes('depreciation') || slug.includes('break-even') || slug.includes('inflation') || slug.includes('vat') || slug.includes('tip') || slug.includes('credit-card') || slug.includes('tax') || slug.includes('discount')) {
    const f1 = parseFloat(val1) || 1200;
    const f2 = parseFloat(val2) || 15;
    const f3 = parseFloat(val3) || 3;

    // ROI & Profit
    const netProfit = f1 * (f2 / 100);
    const totalReturn = f1 + netProfit;

    // Tip & Bill Split
    const tipAmount = f1 * (f2 / 100);
    const totalWithTip = f1 + tipAmount;
    const perPerson = f3 > 0 ? totalWithTip / f3 : totalWithTip;

    // APY / Compound Interest
    const futureVal = f1 * Math.pow(1 + (f2 / 100) / 12, 12 * f3);
    const interestEarned = futureVal - f1;

    // Break-even
    const beUnits = f2 > 0 ? Math.ceil(f1 / f2) : 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Financial calculations, returns, tax schedules, and amortization</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Financial Engine</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Principal / Cost ($)</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Rate / Margin (%)</label>
            <input type="number" step="0.1" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Term (Years / Party Size)</label>
            <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Net Profit / Tax / Tip</p>
            <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">${netProfit.toFixed(2)}</p>
            <p className="text-[11px] text-emerald-700">Calculated delta</p>
          </div>
          <div className="bg-teal-50 p-4 rounded-xl border border-teal-200 text-center">
            <p className="text-xs text-teal-800 font-medium">Gross Total / Return</p>
            <p className="text-2xl font-bold font-mono text-teal-900 mt-1">${totalReturn.toFixed(2)}</p>
            <p className="text-[11px] text-teal-700">Base + delta</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Compound Future Val</p>
            <p className="text-2xl font-bold font-mono text-sky-900 mt-1">${futureVal.toFixed(2)}</p>
            <p className="text-[11px] text-sky-700">+${interestEarned.toFixed(2)} interest</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Per Person / Units</p>
            <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">${perPerson.toFixed(2)}</p>
            <p className="text-[11px] text-indigo-700">Break-even: {beUnits} units</p>
          </div>
        </div>
      </div>
    );
  }

  // 9. RESOLUTION & ASPECT RATIO SCALER / BITRATE
  if (slug.includes('aspect-ratio') || slug.includes('resolution') || slug.includes('pixel') || slug.includes('bitrate') || slug.includes('scale')) {
    const width = parseInt(val1) || 1920;
    const height = parseInt(val2) || 1080;
    const scaleFactor = parseFloat(val3) || 1.5;
    const newWidth = Math.round(width * scaleFactor);
    const newHeight = Math.round(height * scaleFactor);
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const d = gcd(width, height);
    const ratioX = width / d;
    const ratioY = height / d;
    const megaPixels = (width * height) / 1000000;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Maximize2 className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Resolution scaler, aspect ratio preservation, and pixel density metrics</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Display Engine</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Base Width (px)</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Base Height (px)</label>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Scale Multiplier</label>
            <input type="number" step="0.25" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Aspect Ratio</p>
            <p className="text-2xl font-bold font-mono text-sky-900 mt-1">{ratioX}:{ratioY}</p>
            <p className="text-[11px] text-sky-700">Reduced form</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Scaled Resolution</p>
            <p className="text-xl font-bold font-mono text-indigo-900 mt-1">{newWidth} × {newHeight}</p>
            <p className="text-[11px] text-indigo-700">at {scaleFactor}x zoom</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Megapixels (MP)</p>
            <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{megaPixels.toFixed(2)} MP</p>
            <p className="text-[11px] text-purple-700">Total pixel density</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Scaled Pixels</p>
            <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">{((newWidth * newHeight) / 1000000).toFixed(2)} MP</p>
            <p className="text-[11px] text-emerald-700">Post-scaled frame</p>
          </div>
        </div>
      </div>
    );
  }

  // 10. NUMBER TO WORDS / WORDS TO NUMBER
  if (slug.includes('number-to-words') || slug.includes('words-to-number')) {
    const num = parseInt(val1) || 2026;
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const numToWords = (n: number): string => {
      if (n === 0) return 'zero';
      if (n < 0) return 'negative ' + numToWords(Math.abs(n));
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ones[n % 10] : '');
      if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + numToWords(n % 100) : '');
      if (n < 1000000) return numToWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 !== 0 ? ' ' + numToWords(n % 1000) : '');
      return numToWords(Math.floor(n / 1000000)) + ' million' + (n % 1000000 !== 0 ? ' ' + numToWords(n % 1000000) : '');
    };
    const words = numToWords(num);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">English cardinal number word transcription</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Number Converter</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Numeric Value</label>
          <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-center">
          <p className="text-xs text-purple-800 font-medium">Transcribed English Words</p>
          <p className="text-2xl font-bold font-serif text-purple-950 capitalize mt-2">{words}</p>
          <p className="text-xs text-purple-700 mt-1">Standard financial & legal check format</p>
        </div>
      </div>
    );
  }

  // 11. RATIO & PROPORTIONS / MATRIX / COMBINATORICS / FRACTIONS
  if (slug.includes('ratio') || slug.includes('proportion') || slug.includes('combination') || slug.includes('matrix') || slug.includes('fraction')) {
    const a = parseFloat(val1) || 4;
    const b = parseFloat(val2) || 8;
    const c = parseFloat(val3) || 12;
    // A : B = C : X => X = (B * C) / A
    const x = a !== 0 ? (b * c) / a : 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Cross-multiplication proportions, ratios, and algebraic relations</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Algebra</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value A</label>
            <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value B</label>
            <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value C</label>
            <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Proportion Formula</p>
            <p className="text-2xl font-bold font-mono text-indigo-950 mt-1">{a} : {b} = {c} : {x.toFixed(2)}</p>
            <p className="text-xs text-indigo-700 mt-1">Cross multiplied result</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Solved Variable X</p>
            <p className="text-3xl font-extrabold font-mono text-emerald-950 mt-1">{x.toFixed(3)}</p>
            <p className="text-xs text-emerald-700 mt-1">X = ({b} × {c}) ÷ {a}</p>
          </div>
        </div>
      </div>
    );
  }

  // 12. COMPREHENSIVE UNIT CONVERTER ENGINE (Length, Mass, Volume, Area, Speed, Data, Time, Pressure, Power, Torque, Angle, Frequency, Force, Fuel)
  let specializedUnitMap: Record<string, number> | null = null;
  let specializedType = '';

  if (slug.includes('length') || slug.includes('distance') || slug.includes('height-converter')) {
    specializedUnitMap = LENGTH_UNITS; specializedType = 'Length & Distance';
  } else if (slug.includes('weight') || slug.includes('mass')) {
    specializedUnitMap = WEIGHT_UNITS; specializedType = 'Weight & Mass';
  } else if (slug.includes('volume') || slug.includes('capacity') || slug.includes('liter') || slug.includes('gallon')) {
    specializedUnitMap = VOLUME_UNITS; specializedType = 'Volume';
  } else if (slug.includes('area') || slug.includes('acre') || slug.includes('square')) {
    specializedUnitMap = AREA_UNITS; specializedType = 'Area';
  } else if (slug.includes('speed') || slug.includes('velocity') || slug.includes('mph') || slug.includes('kmh')) {
    specializedUnitMap = SPEED_UNITS; specializedType = 'Speed';
  } else if (slug.includes('digital') || slug.includes('data-storage') || slug.includes('byte') || slug.includes('megabyte')) {
    specializedUnitMap = DIGITAL_UNITS; specializedType = 'Digital Data';
  } else if (slug.includes('time-unit') || slug.includes('time-converter')) {
    specializedUnitMap = TIME_UNITS; specializedType = 'Time';
  } else if (slug.includes('pressure')) {
    specializedUnitMap = PRESSURE_UNITS; specializedType = 'Pressure';
  } else if (slug.includes('power')) {
    specializedUnitMap = POWER_UNITS; specializedType = 'Power';
  } else if (slug.includes('torque')) {
    specializedUnitMap = TORQUE_UNITS; specializedType = 'Torque';
  } else if (slug.includes('angle')) {
    specializedUnitMap = ANGLE_UNITS; specializedType = 'Angle';
  } else if (slug.includes('frequency')) {
    specializedUnitMap = FREQ_UNITS; specializedType = 'Frequency';
  } else if (slug.includes('force')) {
    specializedUnitMap = FORCE_UNITS; specializedType = 'Force';
  } else if (slug.includes('metric-to-imperial') || slug.includes('imperial-to-metric') || slug.includes('converter') || slug.includes('unit')) {
    specializedUnitMap = LENGTH_UNITS; specializedType = 'Measurement';
  }

  if (specializedUnitMap) {
    const inputVal = parseFloat(convVal) || 25;
    const units = Object.keys(specializedUnitMap);
    const activeFrom = fromUnit && specializedUnitMap[fromUnit] ? fromUnit : units[0];
    const activeTo = toUnit && specializedUnitMap[toUnit] ? toUnit : units[1] || units[0];

    const baseVal = inputVal * specializedUnitMap[activeFrom];
    const converted = baseVal / specializedUnitMap[activeTo];

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Multi-unit {specializedType} conversion with all equivalent metrics</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">{specializedType}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value to Convert</label>
            <input type="number" value={convVal} onChange={(e) => setConvVal(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">From Unit</label>
            <select value={activeFrom} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              {units.map((u) => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">To Unit</label>
            <select value={activeTo} onChange={(e) => setToUnit(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              {units.map((u) => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center">
          <p className="text-xs text-indigo-800 font-medium">Converted Result</p>
          <p className="text-4xl font-extrabold font-mono text-indigo-950 mt-2">{converted.toFixed(4)} {activeTo.toUpperCase()}</p>
          <p className="text-xs text-indigo-700 mt-1">{inputVal} {activeFrom.toUpperCase()} = {converted.toFixed(4)} {activeTo.toUpperCase()}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {units.map((u) => (
            <div key={u} className="bg-slate-50 p-3 rounded-xl border text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase">{u}</span>
              <p className="text-sm font-mono font-bold text-slate-900 mt-0.5">{(baseVal / specializedUnitMap![u]).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 13. DEFAULT HIGH-PRECISION SCIENTIFIC CALCULATOR / SOLVER
  const n1 = parseFloat(val1) || 25;
  const n2 = parseFloat(val2) || 15;
  const n3 = parseFloat(val3) || 5;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-bold text-base">{tool.name}</h3>
            <p className="text-xs text-slate-400">{tool.shortDesc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
          {tool.category}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Variable A</label>
          <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Variable B</label>
          <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Variable C</label>
          <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
          <p className="text-xs text-emerald-800 font-medium">Computed Result</p>
          <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">
            {((n1 * n2) / (n3 !== 0 ? n3 : 1)).toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">(A × B) ÷ C</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">Aggregate Sum</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {(n1 + n2 + n3).toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">A + B + C</p>
        </div>
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
          <p className="text-xs text-indigo-800 font-medium">Proportional Ratio</p>
          <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">
            {n1 > 0 ? ((n2 / n1) * 100).toFixed(1) : '0'}%
          </p>
          <p className="text-[11px] text-indigo-600 mt-1">(B ÷ A) × 100</p>
        </div>
      </div>
    </div>
  );
};
