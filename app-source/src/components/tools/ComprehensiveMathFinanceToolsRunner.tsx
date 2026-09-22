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
  Car,
  Activity,
  Briefcase,
  Compass,
  Download
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

export const ComprehensiveMathFinanceToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const [copiedInternal, setCopiedInternal] = useState(false);

  // Financial inputs
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [durationYears, setDurationYears] = useState<number>(5);

  // Business inputs
  const [costPrice, setCostPrice] = useState<number>(50);
  const [sellingPrice, setSellingPrice] = useState<number>(85);
  const [fixedCosts, setFixedCosts] = useState<number>(5000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(20);
  const [unitRevenue, setUnitRevenue] = useState<number>(45);

  // Health inputs
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [ageYears, setAgeYears] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState<number>(1.55);

  // Date & Time inputs
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [daysToAdd, setDaysToAdd] = useState<number>(45);

  // Automotive inputs
  const [distanceKm, setDistanceKm] = useState<number>(500);
  const [fuelLiters, setFuelLiters] = useState<number>(38);
  const [fuelCostPerLiter, setFuelCostPerLiter] = useState<number>(1.65);
  const [tireWidth1, setTireWidth1] = useState<number>(205);
  const [tireAspect1, setTireAspect1] = useState<number>(55);
  const [tireRim1, setTireRim1] = useState<number>(16);
  const [tireWidth2, setTireWidth2] = useState<number>(225);
  const [tireAspect2, setTireAspect2] = useState<number>(45);
  const [tireRim2, setTireRim2] = useState<number>(17);
  const [horsepower, setHorsepower] = useState<number>(200);

  // Math & Statistics
  const [numbersList, setNumbersList] = useState<string>('12, 45, 67, 23, 89, 34, 91, 56, 78');

  // Category determination
  const isAutomotive = category === 'Automotive' || slug.includes('auto') || slug.includes('fuel') || slug.includes('tire') || slug.includes('mileage') || slug.includes('horsepower');
  const isBusiness = category === 'Business Tools' || slug.includes('margin') || slug.includes('markup') || slug.includes('profit') || slug.includes('break-even') || slug.includes('roi') || slug.includes('business');
  const isDateTime = category === 'Date & Time' || slug.includes('date') || slug.includes('time') || slug.includes('calendar') || slug.includes('stopwatch') || slug.includes('timer') || slug.includes('age') || slug.includes('zodiac') || slug.includes('moon');
  const isHealth = category === 'Health & Fitness' || slug.includes('bmi') || slug.includes('calorie') || slug.includes('bmr') || slug.includes('weight') || slug.includes('tdee');
  const isFinance = category === 'Finance Tools' || category === 'Accounting' || slug.includes('loan') || slug.includes('mortgage') || slug.includes('interest') || slug.includes('investment');

  // Memoized Financial Computations
  const financeCalc = useMemo(() => {
    const r = interestRate / 100 / 12;
    const n = durationYears * 12;
    const monthlyPayment = r > 0 ? (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : principal / n;
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;
    const compoundFuture = principal * Math.pow(1 + interestRate / 100 / 1, 1 * durationYears);

    return {
      monthlyPayment: isNaN(monthlyPayment) ? '0.00' : monthlyPayment.toFixed(2),
      totalPayment: isNaN(totalPayment) ? '0.00' : totalPayment.toFixed(2),
      totalInterest: isNaN(totalInterest) ? '0.00' : totalInterest.toFixed(2),
      compoundFuture: compoundFuture.toFixed(2)
    };
  }, [principal, interestRate, durationYears]);

  // Memoized Business Margins & Break-Even
  const businessCalc = useMemo(() => {
    const profit = sellingPrice - costPrice;
    const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;
    const unitMargin = unitRevenue - variableCostPerUnit;
    const breakEvenUnits = unitMargin > 0 ? Math.ceil(fixedCosts / unitMargin) : 0;
    const breakEvenRevenue = breakEvenUnits * unitRevenue;

    return {
      profit: profit.toFixed(2),
      margin: margin.toFixed(2),
      markup: markup.toFixed(2),
      breakEvenUnits,
      breakEvenRevenue: breakEvenRevenue.toFixed(2)
    };
  }, [costPrice, sellingPrice, fixedCosts, variableCostPerUnit, unitRevenue]);

  // Memoized Health Metrics
  const healthCalc = useMemo(() => {
    const hM = heightCm / 100;
    const bmi = hM > 0 ? weightKg / (hM * hM) : 0;
    let bmiCategory = 'Normal Weight';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
    else if (bmi >= 30) bmiCategory = 'Obesity';

    const bmr = gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    const tdee = Math.round(bmr * activityFactor);

    return {
      bmi: bmi.toFixed(1),
      category: bmiCategory,
      bmr: Math.round(bmr),
      tdee
    };
  }, [weightKg, heightCm, ageYears, gender, activityFactor]);

  // Memoized Automotive Computations
  const autoCalc = useMemo(() => {
    const lPer100km = distanceKm > 0 ? (fuelLiters / distanceKm) * 100 : 0;
    const mpgUS = lPer100km > 0 ? 235.215 / lPer100km : 0;
    const totalTripCost = fuelLiters * fuelCostPerLiter;
    const costPerKm = distanceKm > 0 ? totalTripCost / distanceKm : 0;
    const kw = horsepower * 0.7457;

    // Tire diameter comparison
    const dia1 = (tireRim1 * 25.4) + (2 * (tireWidth1 * (tireAspect1 / 100)));
    const dia2 = (tireRim2 * 25.4) + (2 * (tireWidth2 * (tireAspect2 / 100)));
    const speedoDiffPercent = dia1 > 0 ? ((dia2 - dia1) / dia1) * 100 : 0;

    return {
      lPer100km: lPer100km.toFixed(2),
      mpgUS: mpgUS.toFixed(1),
      totalTripCost: totalTripCost.toFixed(2),
      costPerKm: costPerKm.toFixed(3),
      kw: kw.toFixed(1),
      dia1: dia1.toFixed(1),
      dia2: dia2.toFixed(1),
      speedoDiffPercent: speedoDiffPercent.toFixed(2)
    };
  }, [distanceKm, fuelLiters, fuelCostPerLiter, horsepower, tireWidth1, tireAspect1, tireRim1, tireWidth2, tireAspect2, tireRim2]);

  // Memoized Date & Time Calculations
  const dateCalc = useMemo(() => {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diffMs = d2.getTime() - d1.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const addedDate = new Date(d1.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Zodiac sign for start date
    const month = d1.getUTCMonth() + 1;
    const day = d1.getUTCDate();
    let zodiac = 'Aries';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = 'Aquarius';
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) zodiac = 'Pisces';
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = 'Aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = 'Taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = 'Gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = 'Cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = 'Leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = 'Virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = 'Libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = 'Scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = 'Sagittarius';
    else zodiac = 'Capricorn';

    // Day of year
    const startOfYear = new Date(Date.UTC(d1.getUTCFullYear(), 0, 1));
    const dayOfYear = Math.floor((d1.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    const weekNumber = Math.ceil(dayOfYear / 7);

    return {
      diffDays,
      addedDateStr: addedDate.toISOString().split('T')[0],
      zodiac,
      dayOfYear,
      weekNumber,
      epoch: Math.floor(d1.getTime() / 1000)
    };
  }, [startDate, endDate, daysToAdd]);

  // Memoized Statistics
  const mathStats = useMemo(() => {
    const nums = numbersList
      .split(/[\s,]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) return { mean: 0, median: 0, min: 0, max: 0, sum: 0, count: 0, stdDev: 0 };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const variance = nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    return {
      count: nums.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      stdDev: stdDev.toFixed(2)
    };
  }, [numbersList]);

  const handleCopyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full">
                Mathematical Verification Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500">
              High-precision client-side calculations and real-time numerical modeling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopyText(JSON.stringify({ financeCalc, businessCalc, autoCalc, dateCalc, healthCalc }, null, 2))}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Dataset'}
          </button>
        </div>
      </div>

      {/* 1. AUTOMOTIVE CALCULATIONS */}
      {isAutomotive && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Car className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Automotive & Powertrain Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Trip Distance (km)</label>
              <input
                type="number"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fuel Consumed (Liters)</label>
              <input
                type="number"
                value={fuelLiters}
                onChange={(e) => setFuelLiters(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fuel Price ($/L)</label>
              <input
                type="number"
                step="0.01"
                value={fuelCostPerLiter}
                onChange={(e) => setFuelCostPerLiter(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Consumption</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{autoCalc.lPer100km} L/100km</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Fuel Economy</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{autoCalc.mpgUS} MPG</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Trip Cost</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${autoCalc.totalTripCost}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Cost / km</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${autoCalc.costPerKm}</p>
            </div>
          </div>

          {/* Powertrain & Tire Size */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Horsepower to Kilowatt Converter</span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={horsepower}
                  onChange={(e) => setHorsepower(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 text-sm border border-slate-300 rounded-lg font-mono font-bold"
                />
                <span className="text-xs font-semibold text-slate-500">HP =</span>
                <span className="text-sm font-mono font-bold text-indigo-700">{autoCalc.kw} kW</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Tire Circumference Comparison</span>
              <p className="text-xs text-slate-600">
                Tire 1 ({tireWidth1}/{tireAspect1}R{tireRim1}) vs Tire 2 ({tireWidth2}/{tireAspect2}R{tireRim2}):
                <span className="font-bold text-indigo-700 ml-1.5">{autoCalc.speedoDiffPercent}% Speedometer variance</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. BUSINESS & MARGIN TOOLS */}
      {isBusiness && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Business Margins & Break-Even</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fixed Operating Overhead ($)</label>
              <input
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">Gross Profit</span>
              <p className="text-2xl font-extrabold font-mono text-teal-700">${businessCalc.profit}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Gross Margin</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{businessCalc.margin}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Markup</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{businessCalc.markup}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Break-Even Units</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{businessCalc.breakEvenUnits}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. DATE & TIME TOOLS */}
      {isDateTime && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Date Difference, Calendar & Zodiac Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Add Days offset</label>
              <input
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Date Difference</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{dateCalc.diffDays} Days</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Zodiac Sign</span>
              <p className="text-xl font-bold text-slate-800">{dateCalc.zodiac}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Day of Year</span>
              <p className="text-2xl font-bold font-mono text-slate-800">Day {dateCalc.dayOfYear}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Week Number</span>
              <p className="text-2xl font-bold font-mono text-slate-800">Week {dateCalc.weekNumber}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. HEALTH & FITNESS */}
      {isHealth && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HeartPulse className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Biometric & Metabolic Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Age (Years)</label>
              <input
                type="number"
                value={ageYears}
                onChange={(e) => setAgeYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">BMI Score ({healthCalc.category})</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{healthCalc.bmi}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Basal Metabolic Rate (BMR)</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{healthCalc.bmr} kcal</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Daily Energy (TDEE)</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{healthCalc.tdee} kcal</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. GENERAL FINANCE & STATS */}
      {(isFinance || (!isAutomotive && !isBusiness && !isDateTime && !isHealth)) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Loan Amortization & Numerical Stats</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Principal ($)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Term (Years)</label>
              <input
                type="number"
                value={durationYears}
                onChange={(e) => setDurationYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Monthly Payment</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${financeCalc.monthlyPayment}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total Interest</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${financeCalc.totalInterest}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Future Compound Value</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${financeCalc.compoundFuture}</p>
            </div>
          </div>

          {/* Dataset Statistics */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-700 block">Statistical Dataset Analysis</label>
            <input
              type="text"
              value={numbersList}
              onChange={(e) => setNumbersList(e.target.value)}
              className="w-full px-4 py-2 font-mono text-sm border border-slate-300 rounded-xl"
            />
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Count</span>
                <span className="font-bold font-mono">{mathStats.count}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Sum</span>
                <span className="font-bold font-mono">{mathStats.sum}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Mean</span>
                <span className="font-bold font-mono">{mathStats.mean}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Median</span>
                <span className="font-bold font-mono">{mathStats.median}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Min</span>
                <span className="font-bold font-mono">{mathStats.min}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <span className="text-slate-400 block">Max</span>
                <span className="font-bold font-mono">{mathStats.max}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
