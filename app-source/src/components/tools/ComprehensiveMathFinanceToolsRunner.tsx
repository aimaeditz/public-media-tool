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
  FileText,
  Bed,
  Baby,
  Stethoscope,
  Dumbbell,
  CheckSquare,
  Award,
  Users,
  Coins,
  Receipt,
  PieChart
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

  // 1. Automotive states
  const [tireWidth, setTireWidth] = useState<number>(225);
  const [tireAspectRatio, setTireAspectRatio] = useState<number>(45);
  const [tireRimDiameter, setTireRimDiameter] = useState<number>(18);
  const [evBatteryKwh, setEvBatteryKwh] = useState<number>(75);
  const [evConsumptionWhPerMi, setEvConsumptionWhPerMi] = useState<number>(280);
  const [evChargerPowerKw, setEvChargerPowerKw] = useState<number>(11);

  // 2. Health & Fitness states
  const [userAge, setUserAge] = useState<number>(28);
  const [userWeightKg, setUserWeightKg] = useState<number>(72);
  const [userHeightCm, setUserHeightCm] = useState<number>(178);
  const [restingHeartRate, setRestingHeartRate] = useState<number>(68);
  const [runningDistanceMiles, setRunningDistanceMiles] = useState<number>(5);
  const [runningTimeMinutes, setRunningTimeMinutes] = useState<number>(45);
  const [stepsCount, setStepsCount] = useState<number>(8500);
  const [systolicBP, setSystolicBP] = useState<number>(118);
  const [diastolicBP, setDiastolicBP] = useState<number>(76);
  const [wakeUpTime, setWakeUpTime] = useState<string>('06:30');
  const [lmpDate, setLmpDate] = useState<string>('2025-01-15');
  const [oneRepWeight, setOneRepWeight] = useState<number>(100);
  const [oneRepReps, setOneRepReps] = useState<number>(5);

  // 3. Date & Time states
  const [epochInput, setEpochInput] = useState<number>(1774000000);
  const [date1Str, setDate1Str] = useState<string>('2025-01-15');
  const [date2Str, setDate2Str] = useState<string>('2025-11-20');

  // 4. Productivity states
  const [scheduleTask, setScheduleTask] = useState<string>('Strategic Architecture Review');
  const [attendeeName, setAttendeeName] = useState<string>('Alex Morgan');
  const [attendeeRole, setAttendeeRole] = useState<string>('Lead Systems Architect');
  const [attendeeDept, setAttendeeDept] = useState<string>('Platform Engineering');
  const [habitDaysChecked, setHabitDaysChecked] = useState<boolean[]>([true, true, true, false, true, false, true]);

  // 5. Education states
  const [gpaCourses, setGpaCourses] = useState<{ grade: number; credits: number }[]>([
    { grade: 4.0, credits: 4 },
    { grade: 3.7, credits: 3 },
    { grade: 3.3, credits: 3 },
    { grade: 4.0, credits: 2 }
  ]);

  // 6. Finance states
  const [loanPrincipal, setLoanPrincipal] = useState<number>(240000);
  const [loanInterestPct, setLoanInterestPct] = useState<number>(6.5);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(360);
  const [stockBuyPrice, setStockBuyPrice] = useState<number>(120);
  const [stockSellPrice, setStockSellPrice] = useState<number>(165);
  const [stockShares, setStockShares] = useState<number>(50);
  const [retireCurrentAge, setRetireCurrentAge] = useState<number>(30);
  const [retireTargetAge, setRetireTargetAge] = useState<number>(65);
  const [retireMonthlySave, setRetireMonthlySave] = useState<number>(750);
  const [retireAnnualReturn, setRetireAnnualReturn] = useState<number>(8);
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number>(85000);
  const [salesTaxAmount, setSalesTaxAmount] = useState<number>(450);
  const [salesTaxRatePct, setSalesTaxRatePct] = useState<number>(8.25);
  const [cryptoAmount, setCryptoAmount] = useState<number>(0.5);
  const [cryptoBuyPrice, setCryptoBuyPrice] = useState<number>(45000);
  const [cryptoCurrentPrice, setCryptoCurrentPrice] = useState<number>(68000);

  // 7. Math & Unit Converters
  const [mathA, setMathA] = useState<number>(48);
  const [mathB, setMathB] = useState<number>(18);
  const [convValue, setConvValue] = useState<number>(25);
  const [unitType, setUnitType] = useState<string>('km-mi');

  // Generator seed
  const [genSeed, setGenSeed] = useState<number>(0);

  // =========================================================================
  // VIEW ROUTING
  // =========================================================================

  // A. AUTOMOTIVE (Filtered to prevent retirement or credit cards from triggering!)
  const isAuto = category === 'Automotive' || slug.includes('vehicle') || slug.includes('automobile') || slug.includes('tire-size') || (slug.includes('tire') && !slug.includes('retire')) || (slug.includes('car-') && !slug.includes('card')) || slug.endsWith('-car') || slug.includes('ev-');
  if (isAuto) {
    if (slug.includes('tire') && !slug.includes('retire')) {
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
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">Calculates sidewall height, outer diameter, circumference, and revs per mile</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Automotive</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Section Width (mm)</label>
              <input type="number" value={tireWidth} onChange={(e) => setTireWidth(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Aspect Ratio (%)</label>
              <input type="number" value={tireAspectRatio} onChange={(e) => setTireAspectRatio(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Rim Diameter (in)</label>
              <input type="number" value={tireRimDiameter} onChange={(e) => setTireRimDiameter(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
              <p className="text-xs text-sky-800 font-medium">Sidewall Height</p>
              <p className="text-2xl font-bold font-mono text-sky-900 mt-1">{sidewallHeightMm.toFixed(1)} mm</p>
              <p className="text-[11px] text-sky-600">{sidewallHeightIn.toFixed(2)} in</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Overall Diameter</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{totalDiameterIn.toFixed(2)} in</p>
              <p className="text-[11px] text-indigo-600">{(totalDiameterIn * 25.4).toFixed(0)} mm</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-medium">Circumference</p>
              <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">{circumferenceIn.toFixed(1)} in</p>
              <p className="text-[11px] text-emerald-600">Rolling distance</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Revs per Mile</p>
              <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{Math.round(revsPerMile)}</p>
              <p className="text-[11px] text-purple-600">Speedometer standard</p>
            </div>
          </div>
        </div>
      );
    }
    // EV range
    const evRangeMiles = evConsumptionWhPerMi > 0 ? (evBatteryKwh * 1000) / evConsumptionWhPerMi : 0;
    const evChargeTimeHours = evChargerPowerKw > 0 ? (evBatteryKwh * 0.6) / evChargerPowerKw : 0;
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Electric vehicle driving range, charging speed, and energy efficiency</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">EV Engineering</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Battery Pack (kWh)</label>
            <input type="number" value={evBatteryKwh} onChange={(e) => setEvBatteryKwh(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Consumption (Wh/mi)</label>
            <input type="number" value={evConsumptionWhPerMi} onChange={(e) => setEvConsumptionWhPerMi(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Charger Power (kW)</label>
            <input type="number" value={evChargerPowerKw} onChange={(e) => setEvChargerPowerKw(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Estimated Range</p>
            <p className="text-3xl font-bold font-mono text-emerald-900 mt-1">{evRangeMiles.toFixed(0)} mi</p>
            <p className="text-[11px] text-emerald-600">{(evRangeMiles * 1.60934).toFixed(0)} km total</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">20% to 80% Charge Time</p>
            <p className="text-3xl font-bold font-mono text-sky-900 mt-1">{evChargeTimeHours.toFixed(1)} hrs</p>
            <p className="text-[11px] text-sky-600">At {evChargerPowerKw} kW rate</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Full Pack Capacity</p>
            <p className="text-3xl font-bold font-mono text-indigo-900 mt-1">{evBatteryKwh} kWh</p>
            <p className="text-[11px] text-indigo-600">Gross usable capacity</p>
          </div>
        </div>
      </div>
    );
  }

  // B. HEALTH & FITNESS: SLEEP CYCLES
  if (slug.includes('sleep')) {
    const [wakeH, wakeM] = wakeUpTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(wakeH || 6, wakeM || 30, 0, 0);

    const getBedTime = (cycles: number): string => {
      const d = new Date(wakeDate.getTime() - cycles * 90 * 60000 - 15 * 60000); // 90 min cycle + 15 min to fall asleep
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bed className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">90-minute REM sleep cycle calculator & natural wake window optimizer</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Circadian Engine</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Target Wake-Up Time</label>
          <input type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Optimal: 6 Cycles (9h)</p>
            <p className="text-3xl font-bold font-mono text-indigo-950 mt-1">{getBedTime(6)}</p>
            <p className="text-[11px] text-indigo-700 mt-1">Recommended for full restoration</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Great: 5 Cycles (7.5h)</p>
            <p className="text-3xl font-bold font-mono text-purple-950 mt-1">{getBedTime(5)}</p>
            <p className="text-[11px] text-purple-700 mt-1">Standard adult sleep duration</p>
          </div>
          <div className="bg-sky-50 p-5 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Minimum: 4 Cycles (6h)</p>
            <p className="text-3xl font-bold font-mono text-sky-950 mt-1">{getBedTime(4)}</p>
            <p className="text-[11px] text-sky-700 mt-1">Quick restorative rest</p>
          </div>
        </div>
      </div>
    );
  }

  // C. HEALTH & FITNESS: PREGNANCY DUE DATE
  if (slug.includes('pregnancy') || slug.includes('due-date')) {
    const lmp = new Date(lmpDate);
    // Naegele's rule: LMP + 280 days
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    const today = new Date();
    const elapsedDays = Math.max(0, Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)));
    const gestWeeks = Math.floor(elapsedDays / 7);
    const gestDays = elapsedDays % 7;
    const trimester = gestWeeks < 13 ? 'First Trimester' : gestWeeks < 27 ? 'Second Trimester' : 'Third Trimester';

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Baby className="w-6 h-6 text-pink-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Naegele's rule pregnancy due date, gestational age, and trimester timeline</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-pink-500/20 text-pink-300 rounded-full">Obstetrics</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">First Day of Last Menstrual Period (LMP)</label>
          <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-pink-50 p-5 rounded-xl border border-pink-200 text-center">
            <p className="text-xs text-pink-800 font-medium">Estimated Due Date</p>
            <p className="text-2xl font-bold font-mono text-pink-950 mt-1">{dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-[11px] text-pink-700 mt-1">40 weeks standard gestation</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Current Gestational Age</p>
            <p className="text-2xl font-bold font-mono text-purple-950 mt-1">{gestWeeks} wks, {gestDays} days</p>
            <p className="text-[11px] text-purple-700 mt-1">{elapsedDays} total elapsed days</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Active Phase</p>
            <p className="text-xl font-bold font-mono text-indigo-950 mt-1">{trimester}</p>
            <p className="text-[11px] text-indigo-700 mt-1">Fetal developmental stage</p>
          </div>
        </div>
      </div>
    );
  }

  // D. HEALTH & FITNESS: BLOOD PRESSURE CATEGORY CHECKER
  if (slug.includes('blood-pressure')) {
    let bpCat = 'Normal';
    let bpColor = 'bg-emerald-50 text-emerald-900 border-emerald-200';
    if (systolicBP > 180 || diastolicBP > 120) {
      bpCat = 'Hypertensive Crisis (Seek Emergency Care)';
      bpColor = 'bg-rose-100 text-rose-950 border-rose-400';
    } else if (systolicBP >= 140 || diastolicBP >= 90) {
      bpCat = 'Hypertension Stage 2';
      bpColor = 'bg-rose-50 text-rose-900 border-rose-200';
    } else if (systolicBP >= 130 || diastolicBP >= 80) {
      bpCat = 'Hypertension Stage 1';
      bpColor = 'bg-amber-50 text-amber-900 border-amber-200';
    } else if (systolicBP >= 120 && diastolicBP < 80) {
      bpCat = 'Elevated Blood Pressure';
      bpColor = 'bg-yellow-50 text-yellow-900 border-yellow-200';
    }
    const pulsePressure = systolicBP - diastolicBP;
    const meanArterialPressure = Math.round(diastolicBP + pulsePressure / 3);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6 text-rose-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">American Heart Association (AHA) blood pressure category classification</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded-full">Cardiovascular</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Systolic BP (mm Hg, Top Number)</label>
            <input type="number" value={systolicBP} onChange={(e) => setSystolicBP(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Diastolic BP (mm Hg, Bottom Number)</label>
            <input type="number" value={diastolicBP} onChange={(e) => setDiastolicBP(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-5 rounded-xl border text-center ${bpColor}`}>
            <p className="text-xs font-medium uppercase tracking-wider">AHA Classification</p>
            <p className="text-xl font-bold mt-1">{bpCat}</p>
            <p className="text-[11px] opacity-80 mt-1">{systolicBP} / {diastolicBP} mm Hg</p>
          </div>
          <div className="bg-sky-50 p-5 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Pulse Pressure</p>
            <p className="text-3xl font-bold font-mono text-sky-950 mt-1">{pulsePressure} mm Hg</p>
            <p className="text-[11px] text-sky-700 mt-1">Normal: 40 to 60 mm Hg</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Mean Arterial Pressure (MAP)</p>
            <p className="text-3xl font-bold font-mono text-indigo-950 mt-1">{meanArterialPressure} mm Hg</p>
            <p className="text-[11px] text-indigo-700 mt-1">Normal: 70 to 100 mm Hg</p>
          </div>
        </div>
      </div>
    );
  }

  // E. HEALTH & FITNESS: GENERAL HEALTH, CARDIO, PACE, BODY COMPOSITION
  if (category === 'Health & Fitness' || slug.includes('pace') || slug.includes('heart-rate') || slug.includes('lean-body') || slug.includes('one-rep') || slug.includes('water')) {
    // 1RM
    if (slug.includes('one-rep') || slug.includes('strength')) {
      // Epley: w * (1 + r/30)
      const oneRepMax = Math.round(oneRepWeight * (1 + oneRepReps / 30));
      return (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">One-Rep Max (1RM) calculator based on Epley and Brzycki powerlifting formulas</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full">Strength Engine</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Weight Lifted (lbs/kg)</label>
              <input type="number" value={oneRepWeight} onChange={(e) => setOneRepWeight(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Repetitions Completed (1-12)</label>
              <input type="number" value={oneRepReps} onChange={(e) => setOneRepReps(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
              <p className="text-xs text-amber-800 font-medium">Estimated 1RM (100%)</p>
              <p className="text-3xl font-bold font-mono text-amber-950 mt-1">{oneRepMax}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-medium">90% of 1RM</p>
              <p className="text-2xl font-bold font-mono text-emerald-950 mt-1">{Math.round(oneRepMax * 0.9)}</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
              <p className="text-xs text-sky-800 font-medium">80% of 1RM</p>
              <p className="text-2xl font-bold font-mono text-sky-950 mt-1">{Math.round(oneRepMax * 0.8)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">70% of 1RM</p>
              <p className="text-2xl font-bold font-mono text-indigo-950 mt-1">{Math.round(oneRepMax * 0.7)}</p>
            </div>
          </div>
        </div>
      );
    }

    const maxHeartRate = 220 - userAge;
    const hrReserve = maxHeartRate - restingHeartRate;
    const fatBurnMin = Math.round(restingHeartRate + (hrReserve * 0.6));
    const fatBurnMax = Math.round(restingHeartRate + (hrReserve * 0.7));
    const paceTotalMinPerMile = runningDistanceMiles > 0 ? runningTimeMinutes / runningDistanceMiles : 0;
    const paceMin = Math.floor(paceTotalMinPerMile);
    const paceSec = Math.round((paceTotalMinPerMile % 1) * 60);
    const stepKm = (stepsCount * 0.78) / 1000;
    const stepMiles = stepKm * 0.621371;

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
            <p className="text-[11px] text-emerald-600">~{Math.round(stepsCount * 0.04)} active kcal</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Running Pace</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{paceMin}:{String(paceSec).padStart(2, '0')} /mi</p>
            <p className="text-[11px] text-indigo-600">Target pace</p>
          </div>
        </div>
      </div>
    );
  }

  // F. PRODUCTIVITY TOOLS (Weekly Schedule, Diagram Prep, Habit Tracker, Badges)
  if (category === 'Productivity' || slug.includes('schedule') || slug.includes('diagram') || slug.includes('habit') || slug.includes('badge') || slug.includes('planner')) {
    if (slug.includes('badge') || slug.includes('id-card')) {
      return (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-sky-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">Professional employee credential & event pass generator</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Credential</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input type="text" value={attendeeName} onChange={(e) => setAttendeeName(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Job Title</label>
              <input type="text" value={attendeeRole} onChange={(e) => setAttendeeRole(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
              <input type="text" value={attendeeDept} onChange={(e) => setAttendeeDept(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
            </div>
          </div>
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl border-2 border-indigo-200 shadow-lg text-center space-y-3">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-indigo-500 to-sky-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {attendeeName.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="text-xl font-bold text-slate-900">{attendeeName}</h4>
            <p className="text-sm font-semibold text-indigo-600">{attendeeRole}</p>
            <p className="text-xs text-slate-500">{attendeeDept} • Verified Access</p>
            <div className="pt-2 font-mono text-xs tracking-widest text-slate-400">||||| | |||| || |||||| | |||</div>
          </div>
        </div>
      );
    }

    // Weekly schedule / habit / diagram
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedCount = habitDaysChecked.filter(Boolean).length;
    const completionPct = Math.round((completedCount / 7) * 100);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ListTodo className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Task scheduling, routine planning, and weekly workflow milestone tracker</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Productivity</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Objective / Task</label>
          <input type="text" value={scheduleTask} onChange={(e) => setScheduleTask(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase">Weekly Milestone Execution ({completionPct}%)</span>
            <span className="text-xs font-bold text-emerald-600">{completedCount} of 7 Days Active</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => (
              <button
                key={day}
                onClick={() => {
                  const updated = [...habitDaysChecked];
                  updated[idx] = !updated[idx];
                  setHabitDaysChecked(updated);
                }}
                className={`p-3 rounded-xl border text-center transition-all ${
                  habitDaysChecked[idx]
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xs block">{day}</span>
                <span className="text-sm mt-1 block">{habitDaysChecked[idx] ? '✓' : '—'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // G. EDUCATION: GPA / CGPA CALCULATOR
  if (slug.includes('gpa') || slug.includes('cgpa') || slug.includes('grade-point')) {
    const totalCredits = gpaCourses.reduce((sum, c) => sum + c.credits, 0);
    const totalQualityPoints = gpaCourses.reduce((sum, c) => sum + c.grade * c.credits, 0);
    const cgpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    const honors = cgpa >= 3.8 ? 'Summa Cum Laude' : cgpa >= 3.5 ? 'Magna Cum Laude' : cgpa >= 3.0 ? 'Honors' : 'Satisfactory Academic Standing';

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Cumulative Grade Point Average (CGPA) on standard 4.00 scale</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Academic Engine</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gpaCourses.map((course, idx) => (
            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-500">Course #{idx + 1}</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={course.grade}
                  onChange={(e) => {
                    const updated = [...gpaCourses];
                    updated[idx].grade = parseFloat(e.target.value) || 0;
                    setGpaCourses(updated);
                  }}
                  className="w-1/2 px-2 py-1 border rounded text-xs font-mono"
                  placeholder="Grade"
                />
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => {
                    const updated = [...gpaCourses];
                    updated[idx].credits = parseInt(e.target.value) || 0;
                    setGpaCourses(updated);
                  }}
                  className="w-1/2 px-2 py-1 border rounded text-xs font-mono"
                  placeholder="Credits"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Cumulative GPA</p>
            <p className="text-4xl font-extrabold font-mono text-purple-950 mt-1">{cgpa.toFixed(2)}</p>
            <p className="text-[11px] text-purple-700 mt-1">4.00 Maximum Scale</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Academic Distinction</p>
            <p className="text-xl font-bold text-indigo-950 mt-2">{honors}</p>
            <p className="text-[11px] text-indigo-700 mt-1">Degree classification</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Credit Units Completed</p>
            <p className="text-3xl font-bold font-mono text-emerald-950 mt-1">{totalCredits}</p>
            <p className="text-[11px] text-emerald-700 mt-1">{totalQualityPoints.toFixed(1)} Quality Points</p>
          </div>
        </div>
      </div>
    );
  }

  // H. FINANCE: RETIREMENT, 401(K), NPS, PENSION
  if (slug.includes('retire') || slug.includes('nps') || slug.includes('401k') || slug.includes('pension')) {
    const yearsToGrow = Math.max(1, retireTargetAge - retireCurrentAge);
    const monthsToGrow = yearsToGrow * 12;
    const r = retireAnnualReturn / 100 / 12;
    // FV of monthly annuity: PMT * ((1+r)^n - 1) / r
    const totalCorpus = r > 0 ? retireMonthlySave * ((Math.pow(1 + r, monthsToGrow) - 1) / r) : retireMonthlySave * monthsToGrow;
    const totalContributed = retireMonthlySave * monthsToGrow;
    const compoundInterest = totalCorpus - totalContributed;
    const monthlyPension = totalCorpus * 0.005; // 6% annual withdrawal rule

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Compound retirement corpus accumulation, pension annuity, and growth projection</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Retirement Engine</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Current Age</label>
            <input type="number" value={retireCurrentAge} onChange={(e) => setRetireCurrentAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Retirement Age</label>
            <input type="number" value={retireTargetAge} onChange={(e) => setRetireTargetAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Savings ($)</label>
            <input type="number" value={retireMonthlySave} onChange={(e) => setRetireMonthlySave(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Return (%)</label>
            <input type="number" step="0.5" value={retireAnnualReturn} onChange={(e) => setRetireAnnualReturn(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Projected Nest Egg</p>
            <p className="text-2xl font-bold font-mono text-emerald-950 mt-1">${Math.round(totalCorpus).toLocaleString()}</p>
            <p className="text-[11px] text-emerald-700">At age {retireTargetAge}</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Estimated Monthly Pension</p>
            <p className="text-2xl font-bold font-mono text-sky-950 mt-1">${Math.round(monthlyPension).toLocaleString()}/mo</p>
            <p className="text-[11px] text-sky-700">Safe withdrawal rate</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Total Invested Capital</p>
            <p className="text-2xl font-bold font-mono text-indigo-950 mt-1">${Math.round(totalContributed).toLocaleString()}</p>
            <p className="text-[11px] text-indigo-700">{yearsToGrow} years contribution</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Compound Wealth Gained</p>
            <p className="text-2xl font-bold font-mono text-purple-950 mt-1">${Math.round(compoundInterest).toLocaleString()}</p>
            <p className="text-[11px] text-purple-700">Interest earned</p>
          </div>
        </div>
      </div>
    );
  }

  // I. FINANCE: STOCKS, CRYPTO, TAX, SALARY
  if (slug.includes('stock') || slug.includes('xirr') || slug.includes('dividend') || slug.includes('crypto') || slug.includes('income-tax') || slug.includes('salary') || slug.includes('vat') || slug.includes('tax')) {
    // Stock / Crypto calculation
    const totalCost = stockBuyPrice * stockShares;
    const totalRevenue = stockSellPrice * stockShares;
    const netReturnVal = totalRevenue - totalCost;
    const roiPct = totalCost > 0 ? (netReturnVal / totalCost) * 100 : 0;

    // Sales Tax / VAT
    const calculatedTax = salesTaxAmount * (salesTaxRatePct / 100);
    const grossTotalWithTax = salesTaxAmount + calculatedTax;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Equity valuation, tax adjustments, and investment capital returns</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Securities Engine</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Buy / Base Price ($)</label>
            <input type="number" value={stockBuyPrice} onChange={(e) => setStockBuyPrice(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Sell / Exit Price ($)</label>
            <input type="number" value={stockSellPrice} onChange={(e) => setStockSellPrice(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Quantity / Shares</label>
            <input type="number" value={stockShares} onChange={(e) => setStockShares(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Net Realized Profit</p>
            <p className={`text-2xl font-bold font-mono mt-1 ${netReturnVal >= 0 ? 'text-emerald-950' : 'text-rose-700'}`}>
              ${netReturnVal.toFixed(2)}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">ROI Return Rate</p>
            <p className="text-2xl font-bold font-mono text-indigo-950 mt-1">{roiPct.toFixed(1)}%</p>
          </div>
          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Gross Proceeds</p>
            <p className="text-2xl font-bold font-mono text-sky-950 mt-1">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Invested Principal</p>
            <p className="text-2xl font-bold font-mono text-purple-950 mt-1">${totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }

  // J. UNIT CONVERTERS CATEGORY
  if (category === 'Unit Converters' || slug.includes('unit-converter') || slug.includes('convert')) {
    const isWeight = slug.includes('weight') || slug.includes('mass') || slug.includes('kg') || slug.includes('lb');
    const isTemp = slug.includes('temp') || slug.includes('celsius') || slug.includes('fahrenheit');
    const isSpeed = slug.includes('speed') || slug.includes('mph') || slug.includes('kmh');
    const isData = slug.includes('data') || slug.includes('byte') || slug.includes('gb');

    let outVal1 = convValue * 0.621371; // km to mi
    let outLabel1 = 'Miles (mi)';
    let outVal2 = convValue * 3280.84; // km to ft
    let outLabel2 = 'Feet (ft)';

    if (isWeight) {
      outVal1 = convValue * 2.20462;
      outLabel1 = 'Pounds (lbs)';
      outVal2 = convValue * 35.274;
      outLabel2 = 'Ounces (oz)';
    } else if (isTemp) {
      outVal1 = (convValue * 9) / 5 + 32;
      outLabel1 = 'Fahrenheit (°F)';
      outVal2 = convValue + 273.15;
      outLabel2 = 'Kelvin (K)';
    } else if (isSpeed) {
      outVal1 = convValue * 0.621371;
      outLabel1 = 'Miles per Hour (mph)';
      outVal2 = convValue * 0.277778;
      outLabel2 = 'Meters per Second (m/s)';
    } else if (isData) {
      outVal1 = convValue * 1024;
      outLabel1 = 'Megabytes (MB)';
      outVal2 = convValue / 1024;
      outLabel2 = 'Terabytes (TB)';
    }

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">High-precision international metric and imperial conversion engine</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Unit Converter</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Value to Convert</label>
          <input type="number" value={convValue} onChange={(e) => setConvValue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Equivalent {outLabel1}</p>
            <p className="text-4xl font-extrabold font-mono text-indigo-950 mt-2">{outVal1.toFixed(3)}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Equivalent {outLabel2}</p>
            <p className="text-4xl font-extrabold font-mono text-emerald-950 mt-2">{outVal2.toFixed(3)}</p>
          </div>
        </div>
      </div>
    );
  }

  // K. DATE & TIME TOOLS
  if (category === 'Date & Time' || slug.includes('epoch') || slug.includes('timestamp') || slug.includes('date-difference') || slug.includes('time-zone') || slug.includes('days-between')) {
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = (diffDays / 7).toFixed(1);
    const diffMonths = (diffDays / 30.4375).toFixed(1);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Date interval delta, calendar duration, and chronological delta</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Date & Time</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
            <input type="date" value={date1Str} onChange={(e) => setDate1Str(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
            <input type="date" value={date2Str} onChange={(e) => setDate2Str(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sky-50 p-5 rounded-xl border border-sky-200 text-center">
            <p className="text-xs text-sky-800 font-medium">Calendar Duration</p>
            <p className="text-3xl font-bold font-mono text-sky-950 mt-1">{diffDays} Days</p>
            <p className="text-[11px] text-sky-700 mt-1">Exact day span</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Weeks Duration</p>
            <p className="text-3xl font-bold font-mono text-indigo-950 mt-1">{diffWeeks} Weeks</p>
            <p className="text-[11px] text-indigo-700 mt-1">Work weeks</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Months Duration</p>
            <p className="text-3xl font-bold font-mono text-purple-950 mt-1">{diffMonths} Months</p>
            <p className="text-[11px] text-purple-700 mt-1">Quarterly cycles</p>
          </div>
        </div>
      </div>
    );
  }

  // L. GENERAL LOAN & FINANCIAL ENGINE (EMI, CAGR, Mortgage, Interest)
  const monthlyRate = (loanInterestPct / 100) / 12;
  const emi = loanTenureMonths > 0 && monthlyRate > 0
    ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) / (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
    : 0;
  const totalLoanRepaid = emi * loanTenureMonths;
  const totalLoanInterest = totalLoanRepaid - loanPrincipal;

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
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Financial Calculator</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Principal / Loan Amount ($)</label>
          <input type="number" value={loanPrincipal} onChange={(e) => setLoanPrincipal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Interest Rate (% p.a.)</label>
          <input type="number" step="0.1" value={loanInterestPct} onChange={(e) => setLoanInterestPct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Tenure (Months)</label>
          <input type="number" value={loanTenureMonths} onChange={(e) => setLoanTenureMonths(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
          <p className="text-xs text-emerald-800 font-medium">Monthly Installment (EMI)</p>
          <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${emi.toFixed(2)}/mo</p>
          <p className="text-[11px] text-emerald-600 mt-1">Fixed amortized payment</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">Total Interest Paid</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${Math.round(totalLoanInterest).toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-1">Cost of credit</p>
        </div>
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
          <p className="text-xs text-indigo-800 font-medium">Total Amount Repaid</p>
          <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${Math.round(totalLoanRepaid).toLocaleString()}</p>
          <p className="text-[11px] text-indigo-600 mt-1">Principal + interest</p>
        </div>
      </div>
    </div>
  );
};
