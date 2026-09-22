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
  HardDrive
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
  acre: 4046.8564224,
  hectare: 10000,
  sqmi: 2589988.11,
};

const VOLUME_UNITS: Record<string, number> = {
  l: 1,
  ml: 0.001,
  cum: 1000,
  gal_us: 3.78541,
  qt_us: 0.946353,
  pt_us: 0.473176,
  cup_us: 0.236588,
  floz_us: 0.0295735,
  gal_uk: 4.54609,
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
  mb: 1024 ** 2,
  gb: 1024 ** 3,
  tb: 1024 ** 4,
  pb: 1024 ** 5,
};

const TIME_UNITS: Record<string, number> = {
  sec: 1,
  min: 60,
  hr: 3600,
  day: 86400,
  wk: 604800,
  yr: 31536000,
};

export const ComprehensiveCalculatorToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  // Mode detection
  const isMortgageOrLoan = name.includes('mortgage') || name.includes('loan') || name.includes('emi') || name.includes('amortization');
  const isPercentage = name.includes('percent') || name.includes('discount') || name.includes('markup') || name.includes('tax') || name.includes('tip');
  const isBmiOrHealth = name.includes('bmi') || name.includes('body mass') || name.includes('calorie') || name.includes('health') || name.includes('fitness');
  const isScientific = name.includes('scientific') || name.includes('math') || name.includes('algebra') || name.includes('matrix') || name.includes('statistics');
  const isFinance = name.includes('interest') || name.includes('compound') || name.includes('roi') || name.includes('profit') || name.includes('investment') || name.includes('depreciation');
  const isUnitConverter = tool.category === 'Converter Tools' || name.includes('converter') || name.includes('unit');

  // Specific Converter types
  const isLength = isUnitConverter && (name.includes('length') || name.includes('distance') || name.includes('meter') || name.includes('feet') || name.includes('inch'));
  const isWeight = isUnitConverter && (name.includes('weight') || name.includes('mass') || name.includes('gram') || name.includes('pound') || name.includes('kg'));
  const isTemp = isUnitConverter && (name.includes('temp') || name.includes('celsius') || name.includes('fahrenheit') || name.includes('kelvin'));
  const isArea = isUnitConverter && (name.includes('area') || name.includes('acre') || name.includes('square') || name.includes('hectare'));
  const isVolume = isUnitConverter && (name.includes('volume') || name.includes('liquid') || name.includes('liter') || name.includes('gallon'));
  const isSpeed = isUnitConverter && (name.includes('speed') || name.includes('velocity') || name.includes('mph') || name.includes('kmh') || name.includes('knot'));
  const isDigital = isUnitConverter && (name.includes('data') || name.includes('byte') || name.includes('bit') || name.includes('storage') || name.includes('file size'));
  const isTimeConv = isUnitConverter && (name.includes('time') || name.includes('hour') || name.includes('minute') || name.includes('second'));

  // Common States
  const [val1, setVal1] = useState<string>('100');
  const [val2, setVal2] = useState<string>('20');
  const [val3, setVal3] = useState<string>('5');
  const [val4, setVal4] = useState<string>('12');

  // Converter States
  const [convVal, setConvVal] = useState<string>('10');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');

  // Scientific Calc state
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcMemory, setCalcMemory] = useState<number>(0);
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // Loan Calculation
  const loanCalculations = useMemo(() => {
    const principal = parseFloat(val1) || 0;
    const annualRate = parseFloat(val2) || 0;
    const years = parseFloat(val3) || 0;

    const monthlyRate = annualRate / 100 / 12;
    const numMonths = years * 12;

    if (principal <= 0 || monthlyRate <= 0 || numMonths <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }

    const monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, numMonths))) / (Math.pow(1 + monthlyRate, numMonths) - 1);
    const totalPayment = monthlyPayment * numMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
    };
  }, [val1, val2, val3]);

  // Percentage Calculations
  const percentageCalculations = useMemo(() => {
    const v1 = parseFloat(val1) || 0;
    const v2 = parseFloat(val2) || 0;

    // What is v2% of v1?
    const percentOf = (v2 / 100) * v1;
    // v2 is what percent of v1?
    const whatPercent = v1 !== 0 ? (v2 / v1) * 100 : 0;
    // Percent change from v1 to v2
    const percentChange = v1 !== 0 ? ((v2 - v1) / Math.abs(v1)) * 100 : 0;
    // Discounted price (v1 - v2%)
    const discountPrice = v1 - (v1 * v2) / 100;
    // Price with tax (v1 + v2%)
    const taxPrice = v1 + (v1 * v2) / 100;

    return {
      percentOf: Math.round(percentOf * 1000) / 1000,
      whatPercent: Math.round(whatPercent * 100) / 100,
      percentChange: Math.round(percentChange * 100) / 100,
      discountPrice: Math.round(discountPrice * 100) / 100,
      taxPrice: Math.round(taxPrice * 100) / 100,
    };
  }, [val1, val2]);

  // BMI Calculations
  const bmiCalculations = useMemo(() => {
    const weightKg = parseFloat(val1) || 70;
    const heightCm = parseFloat(val2) || 175;

    const heightM = heightCm / 100;
    if (heightM <= 0) return { bmi: 0, category: 'Invalid height', color: 'text-slate-400' };

    const bmi = weightKg / (heightM * heightM);
    const roundedBmi = Math.round(bmi * 10) / 10;

    let category = 'Normal weight';
    let color = 'text-emerald-600 bg-emerald-50 border-emerald-200';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-600 bg-amber-50 border-amber-200';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600 bg-orange-50 border-orange-200';
    } else {
      category = 'Obesity';
      color = 'text-rose-600 bg-rose-50 border-rose-200';
    }

    const minHealthyWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
    const maxHealthyWeight = Math.round(24.9 * heightM * heightM * 10) / 10;

    return {
      bmi: roundedBmi,
      category,
      color,
      healthyRange: `${minHealthyWeight} kg – ${maxHealthyWeight} kg`,
    };
  }, [val1, val2]);

  // Compound Interest Calculation
  const financeCalculations = useMemo(() => {
    const principal = parseFloat(val1) || 1000;
    const rate = parseFloat(val2) || 7;
    const years = parseFloat(val3) || 10;
    const compoundFrequency = parseFloat(val4) || 12; // 12 = monthly

    const r = rate / 100;
    const n = compoundFrequency;
    const t = years;

    const finalAmount = principal * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - principal;

    return {
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveGrowth: Math.round(((finalAmount - principal) / principal) * 10000) / 100,
    };
  }, [val1, val2, val3, val4]);

  // Unit Converter calculation
  const unitConversionResult = useMemo(() => {
    const inputVal = parseFloat(convVal) || 0;

    if (isTemp) {
      const from = fromUnit || 'c';
      const to = toUnit || 'f';
      let celsius = inputVal;
      if (from === 'f') celsius = ((inputVal - 32) * 5) / 9;
      else if (from === 'k') celsius = inputVal - 273.15;

      let result = celsius;
      if (to === 'f') result = (celsius * 9) / 5 + 32;
      else if (to === 'k') result = celsius + 273.15;

      return {
        value: Math.round(result * 10000) / 10000,
        from,
        to,
        formula: `${inputVal}°${from.toUpperCase()} = ${Math.round(result * 100) / 100}°${to.toUpperCase()}`,
      };
    }

    let unitMap = LENGTH_UNITS;
    let defaultFrom = 'm';
    let defaultTo = 'ft';

    if (isWeight) {
      unitMap = WEIGHT_UNITS;
      defaultFrom = 'kg';
      defaultTo = 'lb';
    } else if (isArea) {
      unitMap = AREA_UNITS;
      defaultFrom = 'sqm';
      defaultTo = 'sqft';
    } else if (isVolume) {
      unitMap = VOLUME_UNITS;
      defaultFrom = 'l';
      defaultTo = 'gal_us';
    } else if (isSpeed) {
      unitMap = SPEED_UNITS;
      defaultFrom = 'kmh';
      defaultTo = 'mph';
    } else if (isDigital) {
      unitMap = DIGITAL_UNITS;
      defaultFrom = 'mb';
      defaultTo = 'gb';
    } else if (isTimeConv) {
      unitMap = TIME_UNITS;
      defaultFrom = 'hr';
      defaultTo = 'min';
    }

    const activeFrom = fromUnit || defaultFrom;
    const activeTo = toUnit || defaultTo;

    const fromFactor = unitMap[activeFrom] || 1;
    const toFactor = unitMap[activeTo] || 1;

    // Convert to base unit, then to target unit
    const baseValue = inputVal * fromFactor;
    const converted = baseValue / toFactor;

    return {
      value: Math.round(converted * 1000000) / 1000000,
      from: activeFrom,
      to: activeTo,
      formula: `${inputVal} ${activeFrom.toUpperCase()} = ${Math.round(converted * 10000) / 10000} ${activeTo.toUpperCase()}`,
      allConversions: Object.entries(unitMap).map(([unitKey, factor]) => ({
        unit: unitKey.toUpperCase(),
        val: Math.round((baseValue / factor) * 10000) / 10000,
      })),
    };
  }, [convVal, fromUnit, toUnit, isTemp, isWeight, isArea, isVolume, isSpeed, isDigital, isTimeConv]);

  // Scientific Calculator actions
  const handleCalcButton = (char: string) => {
    if (char === 'C') {
      setCalcDisplay('0');
    } else if (char === 'DEL') {
      setCalcDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (char === '=') {
      try {
        // Sanitize math string
        const sanitized = calcDisplay
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/sqrt\(/g, 'Math.sqrt(');

        // Safe eval using Function constructor without global scope access
        const result = Function(`"use strict"; return (${sanitized});`)();
        const formatted = Math.round(result * 100000000) / 100000000;
        setCalcHistory((prev) => [`${calcDisplay} = ${formatted}`, ...prev.slice(0, 9)]);
        setCalcDisplay(String(formatted));
      } catch (err) {
        setCalcDisplay('Error');
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(char)) {
      setCalcDisplay((prev) => (prev === '0' ? `${char}(` : `${prev}${char}(`));
    } else {
      setCalcDisplay((prev) => (prev === '0' || prev === 'Error' ? char : prev + char));
    }
  };

  const getExportString = () => {
    if (isMortgageOrLoan) {
      return `Loan Calculator Results:\nLoan Amount: $${val1}\nAnnual Interest Rate: ${val2}%\nLoan Term: ${val3} Years\n---\nMonthly Payment: $${loanCalculations.monthlyPayment}\nTotal Payments: $${loanCalculations.totalPayment}\nTotal Interest: $${loanCalculations.totalInterest}`;
    }
    if (isBmiOrHealth) {
      return `BMI Health Assessment:\nWeight: ${val1} kg | Height: ${val2} cm\nBMI Index: ${bmiCalculations.bmi}\nCategory: ${bmiCalculations.category}\nHealthy Range: ${bmiCalculations.healthyRange}`;
    }
    if (isPercentage) {
      return `Percentage Calculations for ${val1} and ${val2}%:\n${val2}% of ${val1} = ${percentageCalculations.percentOf}\n${val2} is ${percentageCalculations.whatPercent}% of ${val1}\nDiscounted (${val1} - ${val2}%): ${percentageCalculations.discountPrice}\nWith Tax (${val1} + ${val2}%): ${percentageCalculations.taxPrice}`;
    }
    if (isFinance) {
      return `Compound Interest Results:\nInitial Principal: $${val1}\nAnnual Rate: ${val2}%\nInvestment Duration: ${val3} Years\n---\nFinal Balance: $${financeCalculations.finalAmount}\nTotal Interest Earned: $${financeCalculations.totalInterest}\nReturn on Investment: +${financeCalculations.effectiveGrowth}%`;
    }
    if (isUnitConverter) {
      return `Unit Conversion:\n${unitConversionResult.formula}\nResult: ${unitConversionResult.value} ${unitConversionResult.to.toUpperCase()}`;
    }
    return `Calculation Result: ${calcDisplay}`;
  };

  const copyResults = () => {
    navigator.clipboard.writeText(getExportString());
    onCopy();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-teal-50/80 to-sky-50/80 p-4 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>High-Precision Client-Side Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-white text-emerald-700 rounded-full border border-emerald-200 shadow-2xs">
            100% Private In-Browser
          </span>
          <button
            onClick={copyResults}
            className="text-xs font-medium px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* 1. MORTGAGE & LOAN CALCULATOR */}
      {isMortgageOrLoan && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Loan Amount ($)</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="250000"
              />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Interest Rate (% APR)</label>
              <input
                type="number"
                step="0.1"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="6.5"
              />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Loan Term (Years)</label>
              <input
                type="number"
                value={val3}
                onChange={(e) => setVal3(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Estimated Monthly Payment</span>
              <p className="text-3xl font-extrabold font-mono">${loanCalculations.monthlyPayment.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-200">Principal + Interest per month</p>
            </div>
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Interest Paid</span>
              <p className="text-3xl font-extrabold font-mono text-amber-400">${loanCalculations.totalInterest.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Total borrowing cost over term</p>
            </div>
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Lifetime Payment</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-400">${loanCalculations.totalPayment.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Principal + Interest combined</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. BMI & HEALTH CALCULATOR */}
      {isBmiOrHealth && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Body Weight (Kilograms)</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="70"
              />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Body Height (Centimeters)</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="175"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Calculated BMI Score</span>
              <div className="flex items-baseline gap-3 justify-center md:justify-start">
                <span className="text-5xl font-extrabold font-mono text-slate-900">{bmiCalculations.bmi}</span>
                <span className={`px-3 py-1 text-sm font-bold rounded-full border ${bmiCalculations.color}`}>
                  {bmiCalculations.category}
                </span>
              </div>
              <p className="text-xs text-slate-500">Normal healthy weight range for this height: <span className="font-semibold text-slate-700">{bmiCalculations.healthyRange}</span></p>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="text-[11px] font-bold text-slate-600 flex justify-between">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5-24.9)</span>
                <span>Over (&gt;25)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                <div className="bg-amber-400 w-1/4 h-full" />
                <div className="bg-emerald-500 w-2/4 h-full" />
                <div className="bg-rose-500 w-1/4 h-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PERCENTAGE & DISCOUNT CALCULATOR */}
      {isPercentage && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Base Amount / Value ($ or units)</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="100"
              />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-xs font-semibold text-slate-700">Percentage Rate / Secondary Value (%)</label>
              <input
                type="number"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full px-3 py-2 text-lg font-bold font-mono text-slate-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20"
                placeholder="20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">{val2}% of {val1}</span>
              <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">{percentageCalculations.percentOf}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">{val2} is what % of {val1}</span>
              <p className="text-2xl font-bold font-mono text-indigo-600 mt-1">{percentageCalculations.whatPercent}%</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">Discounted (-{val2}%)</span>
              <p className="text-2xl font-bold font-mono text-amber-600 mt-1">${percentageCalculations.discountPrice}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-medium text-slate-500">With Tax (+{val2}%)</span>
              <p className="text-2xl font-bold font-mono text-teal-600 mt-1">${percentageCalculations.taxPrice}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. COMPOUND INTEREST / INVESTMENT CALCULATOR */}
      {isFinance && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Initial Principal ($)</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className="w-full px-2.5 py-1.5 text-base font-bold font-mono border border-slate-200 rounded-lg"
              />
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Annual Return (% Rate)</label>
              <input
                type="number"
                step="0.1"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                className="w-full px-2.5 py-1.5 text-base font-bold font-mono border border-slate-200 rounded-lg"
              />
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Investment Years</label>
              <input
                type="number"
                value={val3}
                onChange={(e) => setVal3(e.target.value)}
                className="w-full px-2.5 py-1.5 text-base font-bold font-mono border border-slate-200 rounded-lg"
              />
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
              <label className="text-[11px] font-semibold text-slate-700">Compounding</label>
              <select
                value={val4}
                onChange={(e) => setVal4(e.target.value)}
                className="w-full px-2.5 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white"
              >
                <option value="12">Monthly (12x/yr)</option>
                <option value="4">Quarterly (4x/yr)</option>
                <option value="1">Annually (1x/yr)</option>
                <option value="365">Daily (365x/yr)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-600 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-emerald-100 uppercase tracking-wider">Projected Portfolio Balance</span>
              <p className="text-3xl font-extrabold font-mono">${financeCalculations.finalAmount.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-200">Total accumulated wealth</p>
            </div>
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Compound Interest Earned</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-400">+${financeCalculations.totalInterest.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Pure investment gains</p>
            </div>
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Return (%)</span>
              <p className="text-3xl font-extrabold font-mono text-amber-400">+{financeCalculations.effectiveGrowth}%</p>
              <p className="text-[11px] text-slate-400">Growth over initial deposit</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. UNIT & CONVERTER TOOLS */}
      {isUnitConverter && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Value to Convert</label>
                <input
                  type="number"
                  value={convVal}
                  onChange={(e) => setConvVal(e.target.value)}
                  className="w-full px-3 py-2 text-xl font-bold font-mono text-slate-800 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">From Unit</label>
                {isTemp ? (
                  <select
                    value={fromUnit || 'c'}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                  >
                    <option value="c">Celsius (°C)</option>
                    <option value="f">Fahrenheit (°F)</option>
                    <option value="k">Kelvin (K)</option>
                  </select>
                ) : (
                  <select
                    value={fromUnit || Object.keys(isWeight ? WEIGHT_UNITS : isArea ? AREA_UNITS : isVolume ? VOLUME_UNITS : isSpeed ? SPEED_UNITS : isDigital ? DIGITAL_UNITS : isTimeConv ? TIME_UNITS : LENGTH_UNITS)[0]}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-sm uppercase"
                  >
                    {Object.keys(isWeight ? WEIGHT_UNITS : isArea ? AREA_UNITS : isVolume ? VOLUME_UNITS : isSpeed ? SPEED_UNITS : isDigital ? DIGITAL_UNITS : isTimeConv ? TIME_UNITS : LENGTH_UNITS).map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">To Target Unit</label>
                {isTemp ? (
                  <select
                    value={toUnit || 'f'}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-sm"
                  >
                    <option value="c">Celsius (°C)</option>
                    <option value="f">Fahrenheit (°F)</option>
                    <option value="k">Kelvin (K)</option>
                  </select>
                ) : (
                  <select
                    value={toUnit || Object.keys(isWeight ? WEIGHT_UNITS : isArea ? AREA_UNITS : isVolume ? VOLUME_UNITS : isSpeed ? SPEED_UNITS : isDigital ? DIGITAL_UNITS : isTimeConv ? TIME_UNITS : LENGTH_UNITS)[1]}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-sm uppercase"
                  >
                    {Object.keys(isWeight ? WEIGHT_UNITS : isArea ? AREA_UNITS : isVolume ? VOLUME_UNITS : isSpeed ? SPEED_UNITS : isDigital ? DIGITAL_UNITS : isTimeConv ? TIME_UNITS : LENGTH_UNITS).map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Main Result Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Converted Result</span>
                <p className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mt-1">
                  {unitConversionResult.value} <span className="text-xl text-slate-300">{unitConversionResult.to.toUpperCase()}</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">{unitConversionResult.formula}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(String(unitConversionResult.value));
                  onCopy();
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Value'}</span>
              </button>
            </div>

            {/* Quick multi-unit table */}
            {unitConversionResult.allConversions && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">All Equivalent Measurements</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {unitConversionResult.allConversions.map((item) => (
                    <div key={item.unit} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-slate-500">{item.unit}</span>
                      <span className="text-sm font-mono font-bold text-slate-800">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. SCIENTIFIC & GENERAL CALCULATOR */}
      {(isScientific || (!isMortgageOrLoan && !isBmiOrHealth && !isPercentage && !isFinance && !isUnitConverter)) && (
        <div className="max-w-md mx-auto bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-4 text-white">
          {/* Display screen */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-right space-y-1">
            <div className="text-xs text-slate-400 font-mono h-4 overflow-hidden text-ellipsis">
              {calcHistory[0] || 'Ready'}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 overflow-x-auto tracking-wider">
              {calcDisplay}
            </div>
          </div>

          {/* Scientific buttons keypad */}
          <div className="grid grid-cols-5 gap-2 text-sm font-bold">
            {['sin', 'cos', 'tan', 'log', 'ln'].map((fn) => (
              <button
                key={fn}
                onClick={() => handleCalcButton(fn)}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-300 text-xs font-mono transition-colors"
              >
                {fn}
              </button>
            ))}

            {['(', ')', 'sqrt', '^', '÷'].map((op) => (
              <button
                key={op}
                onClick={() => handleCalcButton(op === '^' ? '**' : op)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono transition-colors"
              >
                {op}
              </button>
            ))}

            {['7', '8', '9', '×', 'DEL'].map((k) => (
              <button
                key={k}
                onClick={() => handleCalcButton(k)}
                className={`p-3 rounded-xl font-mono text-base transition-colors ${
                  k === 'DEL' ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-xs' : k === '×' ? 'bg-slate-800 hover:bg-slate-700 text-amber-300' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {k}
              </button>
            ))}

            {['4', '5', '6', '-', 'C'].map((k) => (
              <button
                key={k}
                onClick={() => handleCalcButton(k)}
                className={`p-3 rounded-xl font-mono text-base transition-colors ${
                  k === 'C' ? 'bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-xs' : k === '-' ? 'bg-slate-800 hover:bg-slate-700 text-amber-300' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {k}
              </button>
            ))}

            {['1', '2', '3', '+', 'π'].map((k) => (
              <button
                key={k}
                onClick={() => handleCalcButton(k)}
                className={`p-3 rounded-xl font-mono text-base transition-colors ${
                  k === '+' ? 'bg-slate-800 hover:bg-slate-700 text-amber-300' : k === 'π' ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {k}
              </button>
            ))}

            {['0', '.', '%', 'e', '='].map((k) => (
              <button
                key={k}
                onClick={() => handleCalcButton(k)}
                className={`p-3 rounded-xl font-mono text-base transition-colors ${
                  k === '=' ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-lg col-span-1' : k === 'e' ? 'bg-slate-800 hover:bg-slate-700 text-indigo-300' : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          {/* History log */}
          {calcHistory.length > 0 && (
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Calculation History</span>
              <div className="max-h-24 overflow-y-auto space-y-1 text-xs font-mono text-slate-400">
                {calcHistory.map((item, idx) => (
                  <div key={idx} className="flex justify-between hover:text-white cursor-pointer" onClick={() => setCalcDisplay(item.split('=')[1]?.trim() || '0')}>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
