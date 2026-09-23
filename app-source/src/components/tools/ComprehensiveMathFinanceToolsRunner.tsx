import React, { useState, useMemo, useEffect } from 'react';
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
  Activity,
  Car,
  GraduationCap,
  ListTodo,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveMathFinanceToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const slug = tool.slug;
  const category = tool.category;
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    onCopy();
    setTimeout(() => setCopiedText(null), 2000);
  };

  // ==========================================
  // 1. AUTOMOTIVE: TIRE SIZE CALCULATOR
  // ==========================================
  const [tireWidth, setTireWidth] = useState<number>(225);
  const [tireAspectRatio, setTireAspectRatio] = useState<number>(45);
  const [tireRimDiameter, setTireRimDiameter] = useState<number>(18);

  // ==========================================
  // 2. AUTOMOTIVE: EV DRIVING RANGE & CHARGE
  // ==========================================
  const [evBatteryKwh, setEvBatteryKwh] = useState<number>(75);
  const [evConsumptionWhPerMi, setEvConsumptionWhPerMi] = useState<number>(280);
  const [evChargerPowerKw, setEvChargerPowerKw] = useState<number>(11);
  const [evCurrentSoc, setEvCurrentSoc] = useState<number>(20);
  const [evTargetSoc, setEvTargetSoc] = useState<number>(80);
  const [evCostPerKwh, setEvCostPerKwh] = useState<number>(0.16);

  // ==========================================
  // 3. AUTOMOTIVE: CAR RENTAL & TOLL
  // ==========================================
  const [rentalDailyRate, setRentalDailyRate] = useState<number>(45);
  const [rentalDays, setRentalDays] = useState<number>(4);
  const [rentalInsuranceDaily, setRentalInsuranceDaily] = useState<number>(15);
  const [rentalEstMiles, setRentalEstMiles] = useState<number>(350);
  const [tollTripMiles, setTollTripMiles] = useState<number>(180);
  const [vehicleMpg, setVehicleMpg] = useState<number>(28);
  const [gasPricePerGal, setGasPricePerGal] = useState<number>(3.65);
  const [tollPlazasCount, setTollPlazasCount] = useState<number>(4);
  const [avgTollRate, setAvgTollRate] = useState<number>(3.5);

  // ==========================================
  // 4. PRODUCTIVITY: POMODORO TIMER
  // ==========================================
  const [pomoMinutes, setPomoMinutes] = useState<number>(25);
  const [pomoSeconds, setPomoSeconds] = useState<number>(0);
  const [pomoIsRunning, setPomoIsRunning] = useState<boolean>(false);
  const [pomoMode, setPomoMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [pomoCycles, setPomoCycles] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pomoIsRunning) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds(pomoSeconds - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes(pomoMinutes - 1);
          setPomoSeconds(59);
        } else {
          // Timer finished
          if (pomoMode === 'work') {
            const nextCycles = pomoCycles + 1;
            setPomoCycles(nextCycles);
            if (nextCycles % 4 === 0) {
              setPomoMode('longBreak');
              setPomoMinutes(15);
            } else {
              setPomoMode('shortBreak');
              setPomoMinutes(5);
            }
          } else {
            setPomoMode('work');
            setPomoMinutes(25);
          }
          setPomoSeconds(0);
          setPomoIsRunning(false);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomoIsRunning, pomoMinutes, pomoSeconds, pomoMode, pomoCycles]);

  // ==========================================
  // 5. PRODUCTIVITY: HABIT TRACKER
  // ==========================================
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 2.5L Water', days: [true, true, true, false, true, false, false] },
    { id: 2, name: '30 Min Workout / Walk', days: [true, true, false, true, true, true, false] },
    { id: 3, name: 'Read 15 Pages', days: [true, true, true, true, true, false, true] },
    { id: 4, name: 'Meditation / Reflection', days: [false, true, true, false, true, false, false] },
  ]);

  // ==========================================
  // 6. HEALTH & FITNESS: HEART RATE & TDEE
  // ==========================================
  const [userAge, setUserAge] = useState<number>(30);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(65);
  const [userWeightKg, setUserWeightKg] = useState<number>(75);
  const [userHeightCm, setUserHeightCm] = useState<number>(178);
  const [userGender, setUserGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<number>(1.55); // moderate
  const [runningDistanceMiles, setRunningDistanceMiles] = useState<number>(3.1); // 5k
  const [runningTimeMinutes, setRunningTimeMinutes] = useState<number>(27);
  const [stepsCount, setStepsCount] = useState<number>(8500);

  // ==========================================
  // 7. EDUCATION: TEST SCORE & CERTIFICATE
  // ==========================================
  const [testScoreEarned, setTestScoreEarned] = useState<number>(82);
  const [testScoreMax, setTestScoreMax] = useState<number>(100);
  const [certStudentName, setCertStudentName] = useState<string>('Alex Johnson');
  const [certCourseTitle, setCertCourseTitle] = useState<string>('Full-Stack Web Development');
  const [certIssuer, setCertIssuer] = useState<string>('Public Media Academy');

  // ==========================================
  // 8. FINANCE: CAGR, GST, EMI, NET WORTH
  // ==========================================
  const [cagrBeginningVal, setCagrBeginningVal] = useState<number>(10000);
  const [cagrEndingVal, setCagrEndingVal] = useState<number>(28000);
  const [cagrYears, setCagrYears] = useState<number>(5);
  const [gstAmount, setGstAmount] = useState<number>(1500);
  const [gstRatePct, setGstRatePct] = useState<number>(18);
  const [loanPrincipal, setLoanPrincipal] = useState<number>(25000);
  const [loanInterestPct, setLoanInterestPct] = useState<number>(6.5);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(36);
  const [totalAssetsVal, setTotalAssetsVal] = useState<number>(185000);
  const [totalLiabilitiesVal, setTotalLiabilitiesVal] = useState<number>(45000);

  // ==========================================
  // 9. MATH: LCM, GCD, FIBONACCI, CHI-SQUARE
  // ==========================================
  const [mathNum1, setMathNum1] = useState<number>(24);
  const [mathNum2, setMathNum2] = useState<number>(36);
  const [fibNth, setFibNth] = useState<number>(15);
  const [chiObserved, setChiObserved] = useState<string>('20, 30, 25, 25');
  const [chiExpected, setChiExpected] = useState<string>('25, 25, 25, 25');

  // ==========================================
  // 10. DATE & TIME: EPOCH & TIMEZONE
  // ==========================================
  const [epochInput, setEpochInput] = useState<number>(Math.floor(Date.now() / 1000));
  const [date1Str, setDate1Str] = useState<string>('2024-01-01');
  const [date2Str, setDate2Str] = useState<string>(new Date().toISOString().split('T')[0]);

  // ==========================================
  // 11. GENERATORS: DETERMINISTIC & PSEUDO-RANDOM
  // ==========================================
  const [genSeed, setGenSeed] = useState<number>(1);
  const sampleBusinessNames = ['Vanguard Solutions', 'Nexus Global Labs', 'Apex Dynamics', 'Beacon Analytics', 'Pinnacle Systems', 'Synergy Creative', 'Quantum Flow', 'Horizon Media'];
  const sampleRecipes = [
    'Tuscan Garlic Butter Chicken with roasted asparagus and baby potatoes',
    'Avocado Lime Grilled Salmon over quinoa and fresh arugula',
    'Creamy Coconut Chickpea Curry with basmati rice and warm naan',
    'Mediterranean Lemon Herb Orzo Salad with feta, kalamata olives, and cherry tomatoes',
    'Pan-Seared Ribeye Steak with rosemary garlic butter and glazed carrots'
  ];

  // =========================================================================
  // VIEW ROUTING
  // =========================================================================

  // A. AUTOMOTIVE TOOLS
  if (category === 'Automotive' || slug.includes('car') || slug.includes('ev-') || slug.includes('tire')) {
    if (slug.includes('tire')) {
      const sidewallHeightMm = tireWidth * (tireAspectRatio / 100);
      const sidewallHeightIn = sidewallHeightMm / 25.4;
      const totalDiameterIn = tireRimDiameter + (sidewallHeightIn * 2);
      const circumferenceIn = Math.PI * totalDiameterIn;
      const revsPerMile = (5280 * 12) / circumferenceIn;

      return (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6 text-sky-400" />
              <div>
                <h3 className="font-bold text-base">Car Tire Size & Dimensions Calculator</h3>
                <p className="text-xs text-slate-400">Calculates sidewall height, outer diameter, circumference, and revs per mile</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Automotive Specs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Section Width (mm)</label>
              <input type="number" step="5" value={tireWidth} onChange={(e) => setTireWidth(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Aspect Ratio (%)</label>
              <input type="number" step="5" value={tireAspectRatio} onChange={(e) => setTireAspectRatio(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Wheel Rim Diameter (inches)</label>
              <input type="number" step="1" value={tireRimDiameter} onChange={(e) => setTireRimDiameter(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Sidewall Height</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{sidewallHeightMm.toFixed(1)} mm</p>
              <p className="text-[11px] text-slate-400">{sidewallHeightIn.toFixed(2)} in</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
              <p className="text-xs text-sky-800 font-medium">Overall Diameter</p>
              <p className="text-2xl font-bold font-mono text-sky-700 mt-1">{totalDiameterIn.toFixed(2)} in</p>
              <p className="text-[11px] text-sky-600">{(totalDiameterIn * 25.4).toFixed(0)} mm</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Circumference</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{circumferenceIn.toFixed(1)} in</p>
              <p className="text-[11px] text-indigo-600">{(circumferenceIn * 2.54).toFixed(0)} cm per rev</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-medium">Revolutions Per Mile</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{Math.round(revsPerMile)}</p>
              <p className="text-[11px] text-emerald-600">{Math.round(revsPerMile / 1.60934)} revs/km</p>
            </div>
          </div>
        </div>
      );
    }

    if (slug.includes('ev-') || slug.includes('charging')) {
      const kwhToAdd = evBatteryKwh * ((evTargetSoc - evCurrentSoc) / 100);
      const chargeHours = evChargerPowerKw > 0 ? kwhToAdd / evChargerPowerKw : 0;
      const totalChargeCost = kwhToAdd * evCostPerKwh;
      const estimatedRangeMiles = (evBatteryKwh * 1000) / (evConsumptionWhPerMi || 1);

      return (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-bold text-base">EV Range & Charging Cost Estimator</h3>
                <p className="text-xs text-slate-400">Calculates required kWh, charge duration, and energy costs</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Electric Vehicle</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Battery (kWh)</label>
              <input type="number" value={evBatteryKwh} onChange={(e) => setEvBatteryKwh(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current SoC (%)</label>
              <input type="number" value={evCurrentSoc} onChange={(e) => setEvCurrentSoc(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target SoC (%)</label>
              <input type="number" value={evTargetSoc} onChange={(e) => setEvTargetSoc(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Charger (kW)</label>
              <input type="number" value={evChargerPowerKw} onChange={(e) => setEvChargerPowerKw(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Rate ($/kWh)</label>
              <input type="number" step="0.01" value={evCostPerKwh} onChange={(e) => setEvCostPerKwh(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg font-mono text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Energy to Add</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{kwhToAdd.toFixed(1)} kWh</p>
              <p className="text-[11px] text-slate-400">+{evTargetSoc - evCurrentSoc}% charge</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Charge Time</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{Math.floor(chargeHours)}h {Math.round((chargeHours % 1) * 60)}m</p>
              <p className="text-[11px] text-emerald-600">at {evChargerPowerKw} kW speed</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
              <p className="text-xs text-sky-800 font-medium">Total Session Cost</p>
              <p className="text-2xl font-bold font-mono text-sky-700 mt-1">${totalChargeCost.toFixed(2)}</p>
              <p className="text-[11px] text-sky-600">at ${evCostPerKwh}/kWh</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Full Battery Range</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{Math.round(estimatedRangeMiles)} mi</p>
              <p className="text-[11px] text-indigo-600">({Math.round(estimatedRangeMiles * 1.60934)} km)</p>
            </div>
          </div>
        </div>
      );
    }

    // Default Automotive (Rental / Toll / Specs)
    const rentalBaseCost = rentalDailyRate * rentalDays;
    const rentalInsuranceCost = rentalInsuranceDaily * rentalDays;
    const rentalTotal = (rentalBaseCost + rentalInsuranceCost) * 1.12; // 12% taxes/fees

    const tollFuelGal = tollTripMiles / (vehicleMpg || 1);
    const tollFuelCost = tollFuelGal * gasPricePerGal;
    const tollTotalFees = tollPlazasCount * avgTollRate;
    const tollTripTotal = tollFuelCost + tollTotalFees;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Automotive travel economics and road trip expense planning</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Road Travel</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Trip Miles</label>
            <input type="number" value={tollTripMiles} onChange={(e) => setTollTripMiles(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Vehicle MPG</label>
            <input type="number" value={vehicleMpg} onChange={(e) => setVehicleMpg(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Gas Price ($/gal)</label>
            <input type="number" step="0.05" value={gasPricePerGal} onChange={(e) => setGasPricePerGal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Toll Plazas Count</label>
            <input type="number" value={tollPlazasCount} onChange={(e) => setTollPlazasCount(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Fuel Expense</p>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${tollFuelCost.toFixed(2)}</p>
            <p className="text-[11px] text-slate-400">{tollFuelGal.toFixed(1)} gallons consumed</p>
          </div>
          <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Estimated Tolls</p>
            <p className="text-2xl font-bold font-mono text-sky-700 mt-1">${tollTotalFees.toFixed(2)}</p>
            <p className="text-[11px] text-sky-600">{tollPlazasCount} plazas at ~${avgTollRate}</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
            <p className="text-xs text-emerald-800 font-medium">Total Trip Expense</p>
            <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${tollTripTotal.toFixed(2)}</p>
            <p className="text-[11px] text-emerald-600">${(tollTripTotal / (tollTripMiles || 1)).toFixed(3)} per mile</p>
          </div>
        </div>
      </div>
    );
  }

  // B. PRODUCTIVITY: POMODORO & HABIT TRACKER
  if (slug.includes('pomodoro')) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">Pomodoro Focus Timer Advanced</h3>
              <p className="text-xs text-slate-400">Standard 25/5 intervals with automatic long breaks after 4 completed focus sessions</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-full">Productivity</span>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => { setPomoMode('work'); setPomoMinutes(25); setPomoSeconds(0); setPomoIsRunning(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${pomoMode === 'work' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Focus (25m)
            </button>
            <button
              onClick={() => { setPomoMode('shortBreak'); setPomoMinutes(5); setPomoSeconds(0); setPomoIsRunning(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${pomoMode === 'shortBreak' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Short Break (5m)
            </button>
            <button
              onClick={() => { setPomoMode('longBreak'); setPomoMinutes(15); setPomoSeconds(0); setPomoIsRunning(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${pomoMode === 'longBreak' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              Long Break (15m)
            </button>
          </div>

          <div className="text-7xl font-extrabold font-mono text-slate-900 tracking-wider">
            {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setPomoIsRunning(!pomoIsRunning)}
              className={`px-6 py-2.5 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-sm ${pomoIsRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-rose-600 hover:bg-rose-700'}`}
            >
              {pomoIsRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {pomoIsRunning ? 'Pause' : 'Start Focus'}
            </button>
            <button
              onClick={() => { setPomoIsRunning(false); setPomoMinutes(pomoMode === 'work' ? 25 : pomoMode === 'shortBreak' ? 5 : 15); setPomoSeconds(0); }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Completed Cycles: <strong className="text-slate-800">{pomoCycles}</strong> sessions
          </div>
        </div>
      </div>
    );
  }

  // C. EDUCATION: CERTIFICATE & TEST SCORE
  if (category === 'Education' || slug.includes('certificate') || slug.includes('quiz') || slug.includes('score')) {
    const percentage = testScoreMax > 0 ? (testScoreEarned / testScoreMax) * 100 : 0;
    const letterGrade = percentage >= 90 ? 'A (Excellent)' : percentage >= 80 ? 'B (Good)' : percentage >= 70 ? 'C (Satisfactory)' : percentage >= 60 ? 'D (Pass)' : 'F (Fail)';
    const gpaEquivalent = percentage >= 90 ? '4.0' : percentage >= 80 ? '3.0' : percentage >= 70 ? '2.0' : percentage >= 60 ? '1.0' : '0.0';

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Academic grading evaluation, rubrics, and certificate builder</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full">Academic Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Score Earned (Points)</label>
            <input type="number" value={testScoreEarned} onChange={(e) => setTestScoreEarned(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Maximum Points</label>
            <input type="number" value={testScoreMax} onChange={(e) => setTestScoreMax(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Calculated Percentage</p>
            <p className="text-3xl font-bold font-mono text-slate-900 mt-1">{percentage.toFixed(1)}%</p>
            <p className="text-[11px] text-slate-400">{testScoreEarned} out of {testScoreMax}</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Letter Grade</p>
            <p className="text-2xl font-bold text-indigo-700 mt-1">{letterGrade}</p>
            <p className="text-[11px] text-indigo-600">Standard 10-point scale</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
            <p className="text-xs text-emerald-800 font-medium">GPA Equivalent</p>
            <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{gpaEquivalent}</p>
            <p className="text-[11px] text-emerald-600">4.0 Unweighted Scale</p>
          </div>
        </div>
      </div>
    );
  }

  // D. HEALTH & FITNESS: HEART RATE, TDEE, RUNNING PACE
  if (category === 'Health & Fitness' || slug.includes('pace') || slug.includes('heart-rate') || slug.includes('lean-body')) {
    const maxHeartRate = 220 - userAge;
    const hrReserve = maxHeartRate - restingHeartRate;
    const fatBurnMin = Math.round(restingHeartRate + (hrReserve * 0.6));
    const fatBurnMax = Math.round(restingHeartRate + (hrReserve * 0.7));
    const cardioMin = Math.round(restingHeartRate + (hrReserve * 0.7));
    const cardioMax = Math.round(restingHeartRate + (hrReserve * 0.85));

    const paceTotalMinPerMile = runningDistanceMiles > 0 ? runningTimeMinutes / runningDistanceMiles : 0;
    const paceMin = Math.floor(paceTotalMinPerMile);
    const paceSec = Math.round((paceTotalMinPerMile % 1) * 60);

    const stepKm = (stepsCount * 0.78) / 1000;
    const stepMiles = stepKm * 0.621371;
    const stepCalories = Math.round(stepsCount * 0.04);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeartPulse className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Karvonen Heart Rate Reserve Zones & Running Bio-Metrics</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-full">Fitness Engine</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Age (Years)</label>
            <input type="number" value={userAge} onChange={(e) => setUserAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Resting Heart Rate (BPM)</label>
            <input type="number" value={restingHeartRate} onChange={(e) => setRestingHeartRate(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Daily Steps</label>
            <input type="number" value={stepsCount} onChange={(e) => setStepsCount(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Run Distance (Miles)</label>
            <input type="number" step="0.1" value={runningDistanceMiles} onChange={(e) => setRunningDistanceMiles(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
            <p className="text-xs text-rose-800 font-medium">Max Heart Rate</p>
            <p className="text-2xl font-bold font-mono text-rose-700 mt-1">{maxHeartRate} BPM</p>
            <p className="text-[11px] text-rose-600">220 - Age standard</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Fat Burn Zone (60-70%)</p>
            <p className="text-xl font-bold font-mono text-amber-900 mt-1">{fatBurnMin} - {fatBurnMax} BPM</p>
            <p className="text-[11px] text-amber-700">Aerobic threshold</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Steps to Distance</p>
            <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{stepMiles.toFixed(2)} mi</p>
            <p className="text-[11px] text-emerald-600">~{stepCalories} active kcal</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Running Pace</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{paceMin}:{String(paceSec).padStart(2, '0')} /mi</p>
            <p className="text-[11px] text-indigo-600">for {runningTimeMinutes} min duration</p>
          </div>
        </div>
      </div>
    );
  }

  // E. FINANCE: CAGR, GST, EMI, NET WORTH
  const cagr = cagrYears > 0 && cagrBeginningVal > 0 ? (Math.pow(cagrEndingVal / cagrBeginningVal, 1 / cagrYears) - 1) * 100 : 0;
  const gstTax = gstAmount * (gstRatePct / 100);
  const gstTotal = gstAmount + gstTax;

  const monthlyRate = (loanInterestPct / 100) / 12;
  const emi = loanTenureMonths > 0 && monthlyRate > 0
    ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) / (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
    : 0;
  const totalLoanRepaid = emi * loanTenureMonths;
  const totalLoanInterest = totalLoanRepaid - loanPrincipal;
  const netWorth = totalAssetsVal - totalLiabilitiesVal;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-bold text-base">{tool.name}</h3>
            <p className="text-xs text-slate-400">{tool.shortDesc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
          {tool.category}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Principal / Base ($)</label>
          <input type="number" step="500" value={loanPrincipal} onChange={(e) => setLoanPrincipal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Interest / Rate (%)</label>
          <input type="number" step="0.1" value={loanInterestPct} onChange={(e) => setLoanInterestPct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Term (Months)</label>
          <input type="number" value={loanTenureMonths} onChange={(e) => setLoanTenureMonths(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Asset Value / Total ($)</label>
          <input type="number" step="1000" value={totalAssetsVal} onChange={(e) => setTotalAssetsVal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
          <p className="text-xs text-emerald-800 font-medium">Monthly Payment (EMI)</p>
          <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">${emi.toFixed(2)}/mo</p>
          <p className="text-[11px] text-emerald-600">{loanTenureMonths} monthly payments</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">Total Interest Paid</p>
          <p className="text-xl font-bold font-mono text-slate-900 mt-1">${totalLoanInterest.toFixed(2)}</p>
          <p className="text-[11px] text-slate-500">Repaid: ${totalLoanRepaid.toFixed(2)}</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
          <p className="text-xs text-sky-800 font-medium">Net Worth Valuation</p>
          <p className="text-2xl font-bold font-mono text-sky-700 mt-1">${netWorth.toLocaleString()}</p>
          <p className="text-[11px] text-sky-600">Assets - Liabilities</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
          <p className="text-xs text-purple-800 font-medium">CAGR Growth Rate</p>
          <p className="text-2xl font-bold font-mono text-purple-700 mt-1">{cagr.toFixed(2)}%</p>
          <p className="text-[11px] text-purple-600">Annual Compounded Return</p>
        </div>
      </div>
    </div>
  );
};
