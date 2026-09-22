import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
  Clock,
  HeartPulse,
  Scale,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  Activity
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveMathFinanceToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();

  // Financial inputs
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [durationYears, setDurationYears] = useState<number>(5);

  // Business inputs
  const [costPrice, setCostPrice] = useState<number>(50);
  const [sellingPrice, setSellingPrice] = useState<number>(85);

  // Health inputs
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [ageYears, setAgeYears] = useState<number>(28);

  // Date & Time inputs
  const [inputDate, setInputDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentTimeEpoch, setCurrentTimeEpoch] = useState<number>(Date.now());

  // Math & Statistics
  const [numbersList, setNumbersList] = useState<string>('12, 45, 67, 23, 89, 34, 91, 56, 78');

  // Currency / Unit conversion
  const [unitValue, setUnitValue] = useState<number>(100);
  const [unitMode, setUnitMode] = useState<string>('Metric to Imperial');

  // Memoized Financial Computations
  const financeCalc = useMemo(() => {
    const r = (interestRate / 100) / 12;
    const n = durationYears * 12;
    const monthlyPayment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    // Compound Interest Formula A = P(1 + r/n)^(nt)
    const compoundFuture = principal * Math.pow(1 + (interestRate / 100) / 1, 1 * durationYears);

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2),
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment.toFixed(2),
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest.toFixed(2),
      compoundFuture: compoundFuture.toFixed(2),
    };
  }, [principal, interestRate, durationYears]);

  // Memoized Business Margins
  const businessCalc = useMemo(() => {
    const profit = sellingPrice - costPrice;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;
    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2),
      markup: markup.toFixed(2),
    };
  }, [costPrice, sellingPrice]);

  // Memoized Health Metrics (BMI, BMR)
  const healthCalc = useMemo(() => {
    const hM = heightCm / 100;
    const bmi = hM > 0 ? weightKg / (hM * hM) : 0;
    let bmiCategory = 'Normal';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obese';

    // Mifflin-St Jeor BMR Equation
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;

    return {
      bmi: bmi.toFixed(1),
      category: bmiCategory,
      bmr: Math.round(bmr),
    };
  }, [weightKg, heightCm, ageYears]);

  // Memoized Statistics
  const mathStats = useMemo(() => {
    const nums = numbersList
      .split(/[\s,]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) return { mean: 0, median: 0, min: 0, max: 0, sum: 0, count: 0 };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    return {
      count: nums.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: sorted[0],
      max: sorted[sorted.length - 1],
    };
  }, [numbersList]);

  // Memoized Date Diff
  const dateCalc = useMemo(() => {
    const target = new Date(inputDate);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const isPast = diffDays < 0;

    return {
      days: Math.abs(diffDays),
      isPast,
      epoch: Math.floor(target.getTime() / 1000),
      iso: target.toISOString(),
      formatted: target.toDateString(),
    };
  }, [inputDate]);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onCopy();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-4 rounded-2xl border border-emerald-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>High-Precision Numerical Engine ({tool.category})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-800 text-emerald-300 rounded-full border border-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% In-Browser Computation
          </span>
        </div>
      </div>

      {/* 1. FINANCE & LOAN TOOLS */}
      {(category === 'Finance Tools' || name.includes('loan') || name.includes('mortgage') || name.includes('interest') || name.includes('investment')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Principal Amount ($)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Annual Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Term (Years)</label>
              <input
                type="number"
                value={durationYears}
                onChange={(e) => setDurationYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Monthly Payment</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-700">${financeCalc.monthlyPayment}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total Interest</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${financeCalc.totalInterest}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total Repayment</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${financeCalc.totalPayment}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. BUSINESS & MARGIN TOOLS */}
      {(category === 'Business Tools' || name.includes('margin') || name.includes('markup') || name.includes('profit') || name.includes('discount')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Cost Price ($)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Selling Price ($)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">Net Profit</span>
              <p className="text-3xl font-extrabold font-mono text-teal-700">${businessCalc.profit}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Gross Margin</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{businessCalc.margin}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Markup Percentage</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{businessCalc.markup}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEALTH & FITNESS TOOLS */}
      {(category === 'Health & Fitness' || name.includes('bmi') || name.includes('calorie') || name.includes('bmr') || name.includes('weight')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Age (Years)</label>
              <input
                type="number"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">BMI Score</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-700">{healthCalc.bmi}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Category</span>
              <p className="text-2xl font-bold text-slate-800">{healthCalc.category}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Daily Basal Metabolic (BMR)</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{healthCalc.bmr} kcal</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. DATE & TIME TOOLS */}
      {(category === 'Date & Time' || name.includes('date') || name.includes('time') || name.includes('timestamp') || name.includes('epoch')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Target Date</label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Current Epoch (Unix)</span>
              <p className="text-lg font-mono font-bold text-slate-900">{Math.floor(currentTimeEpoch / 1000)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">
                {dateCalc.isPast ? 'Days Ago' : 'Days Remaining'}
              </span>
              <p className="text-3xl font-extrabold font-mono text-teal-700">{dateCalc.days} Days</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Target Epoch</span>
              <p className="text-xl font-bold font-mono text-slate-800">{dateCalc.epoch}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Formatted Date</span>
              <p className="text-sm font-bold text-slate-800">{dateCalc.formatted}</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. MATH & STATISTICAL TOOLS */}
      {(!name.includes('loan') && !name.includes('margin') && !name.includes('bmi') && !name.includes('date')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Dataset / Numbers (comma or space separated)</label>
            <textarea
              value={numbersList}
              onChange={(e) => setNumbersList(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 font-mono text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Count</span>
              <span className="text-lg font-mono font-bold text-slate-800">{mathStats.count}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Sum</span>
              <span className="text-lg font-mono font-bold text-slate-800">{mathStats.sum}</span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase block">Mean (Avg)</span>
              <span className="text-lg font-mono font-bold text-emerald-700">{mathStats.mean}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Median</span>
              <span className="text-lg font-mono font-bold text-slate-800">{mathStats.median}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Min</span>
              <span className="text-lg font-mono font-bold text-slate-800">{mathStats.min}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Max</span>
              <span className="text-lg font-mono font-bold text-slate-800">{mathStats.max}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
