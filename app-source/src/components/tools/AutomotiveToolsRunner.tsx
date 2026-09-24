import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Car,
  Fuel,
  Gauge,
  DollarSign,
  ShieldCheck,
  Calculator,
  Calendar,
  Percent,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  Zap,
  Battery,
  AlertTriangle,
  FileText,
  Sliders,
  CheckCircle2,
  Wrench,
  TrendingDown,
  Scale,
  Activity
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

function downloadTextFile(filename: string, text: string) {
  try {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    // fallback
  }
}

interface ActionToolbarProps {
  label: string;
  onReset?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  downloadLabel?: string;
  copyLabel?: string;
  isCopied?: boolean;
}

const AutoActionToolbar: React.FC<ActionToolbarProps> = ({
  label,
  onReset,
  onCopy,
  onDownload,
  downloadLabel = 'Export TXT',
  copyLabel = 'Copy Summary',
  isCopied
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 text-white rounded-2xl shadow-sm">
    <div className="flex items-center gap-2 pl-2">
      <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied!' : copyLabel}</span>
        </button>
      )}
      {onDownload && (
        <button
          type="button"
          onClick={onDownload}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloadLabel}</span>
        </button>
      )}
    </div>
  </div>
);

export const AutomotiveToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const slug = tool.slug;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const safeCopy = (text: string, key = 'default') => {
    try {
      navigator.clipboard.writeText(text);
    } catch (e) {}
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. FUEL COST
  const [fuelDistance, setFuelDistance] = useState(350);
  const [fuelMpg, setFuelMpg] = useState(28);
  const [fuelPricePerGal, setFuelPricePerGal] = useState(3.65);
  const [fuelRoundTrip, setFuelRoundTrip] = useState(true);
  const [fuelPassengers, setFuelPassengers] = useState(2);
  const fuelMetrics = useMemo(() => {
    const totalDist = fuelRoundTrip ? fuelDistance * 2 : fuelDistance;
    const gallonsNeeded = fuelMpg > 0 ? totalDist / fuelMpg : 0;
    const totalCost = gallonsNeeded * fuelPricePerGal;
    const costPerMile = totalDist > 0 ? totalCost / totalDist : 0;
    const costPerPerson = fuelPassengers > 0 ? totalCost / fuelPassengers : totalCost;
    return { totalDist, gallonsNeeded, totalCost, costPerMile, costPerPerson };
  }, [fuelDistance, fuelMpg, fuelPricePerGal, fuelRoundTrip, fuelPassengers]);

  // 2. MILEAGE ESTIMATOR
  const [odometerStart, setOdometerStart] = useState(45200);
  const [odometerEnd, setOdometerEnd] = useState(45580);
  const [fuelAddedGal, setFuelAddedGal] = useState(12.8);
  const [fuelUnitCost, setFuelUnitCost] = useState(3.75);
  const mileageMetrics = useMemo(() => {
    const tripDistance = Math.max(0, odometerEnd - odometerStart);
    const mpg = fuelAddedGal > 0 ? tripDistance / fuelAddedGal : 0;
    const lPer100km = mpg > 0 ? 235.215 / mpg : 0;
    const tripCost = fuelAddedGal * fuelUnitCost;
    const costPerMile = tripDistance > 0 ? tripCost / tripDistance : 0;
    return { tripDistance, mpg, lPer100km, tripCost, costPerMile };
  }, [odometerStart, odometerEnd, fuelAddedGal, fuelUnitCost]);

  // 3. CAR LOAN PAYMENT
  const [carPrice, setCarPrice] = useState(32000);
  const [carDownPayment, setCarDownPayment] = useState(5000);
  const [carTradeIn, setCarTradeIn] = useState(2000);
  const [carTaxRate, setCarTaxRate] = useState(7.5);
  const [carInterestRate, setCarInterestRate] = useState(5.99);
  const [carLoanTermMonths, setCarLoanTermMonths] = useState(60);
  const carLoanMetrics = useMemo(() => {
    const taxablePrice = Math.max(0, carPrice - carTradeIn);
    const taxAmount = taxablePrice * (carTaxRate / 100);
    const totalFinanced = Math.max(0, carPrice + taxAmount - carDownPayment - carTradeIn);
    const monthlyRate = carInterestRate / 100 / 12;
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (totalFinanced * monthlyRate * Math.pow(1 + monthlyRate, carLoanTermMonths)) / (Math.pow(1 + monthlyRate, carLoanTermMonths) - 1);
    } else {
      monthlyPayment = carLoanTermMonths > 0 ? totalFinanced / carLoanTermMonths : 0;
    }
    const totalPaid = monthlyPayment * carLoanTermMonths;
    const totalInterest = Math.max(0, totalPaid - totalFinanced);
    return { totalFinanced, monthlyPayment, totalInterest, totalPaid, taxAmount };
  }, [carPrice, carDownPayment, carTradeIn, carTaxRate, carInterestRate, carLoanTermMonths]);

  // 4. INSURANCE ESTIMATOR
  const [vehicleValue, setVehicleValue] = useState(28000);
  const [driverAgeGroup, setDriverAgeGroup] = useState<'young' | 'adult' | 'senior'>('adult');
  const [coverageTier, setCoverageTier] = useState<'liability' | 'standard' | 'full'>('full');
  const [deductible, setDeductible] = useState<number>(1000);
  const [annualMiles, setAnnualMiles] = useState<number>(12000);
  const insuranceMetrics = useMemo(() => {
    let baseAnnual = vehicleValue * 0.04;
    if (driverAgeGroup === 'young') baseAnnual *= 1.6;
    if (driverAgeGroup === 'senior') baseAnnual *= 1.15;
    if (coverageTier === 'liability') baseAnnual *= 0.55;
    if (coverageTier === 'full') baseAnnual *= 1.35;
    if (deductible === 500) baseAnnual *= 1.15;
    if (deductible === 2000) baseAnnual *= 0.88;
    if (annualMiles > 15000) baseAnnual *= 1.12;
    const monthlyPremium = baseAnnual / 12;
    return { annualPremium: baseAnnual, monthlyPremium };
  }, [vehicleValue, driverAgeGroup, coverageTier, deductible, annualMiles]);

  // 5. CAR DEPRECIATION
  const [deprMSRP, setDeprMSRP] = useState(35000);
  const [deprYears, setDeprYears] = useState(5);
  const [deprMilesPerYear, setDeprMilesPerYear] = useState(12000);
  const [deprBrandTier, setDeprBrandTier] = useState<'toyota' | 'luxury' | 'average' | 'ev'>('average');
  const deprMetrics = useMemo(() => {
    const rates: Record<string, number[]> = {
      toyota: [0.15, 0.10, 0.09, 0.08, 0.07],
      luxury: [0.25, 0.18, 0.15, 0.12, 0.10],
      average: [0.20, 0.15, 0.12, 0.10, 0.09],
      ev: [0.28, 0.18, 0.14, 0.12, 0.10]
    };
    let currentVal = deprMSRP;
    const schedule = [];
    const selectedRates = rates[deprBrandTier] || rates.average;
    for (let y = 1; y <= deprYears; y++) {
      const rate = selectedRates[Math.min(y - 1, selectedRates.length - 1)];
      const mileageAdj = (deprMilesPerYear - 12000) / 10000 * 0.02;
      const effectiveRate = Math.min(0.4, Math.max(0.05, rate + mileageAdj));
      const loss = currentVal * effectiveRate;
      currentVal -= loss;
      schedule.push({ year: y, value: currentVal, loss, totalLoss: deprMSRP - currentVal, percentRetained: (currentVal / deprMSRP) * 100 });
    }
    const finalVal = schedule.length > 0 ? schedule[schedule.length - 1].value : deprMSRP;
    return { schedule, finalVal, totalLoss: deprMSRP - finalVal, retainedPct: (finalVal / deprMSRP) * 100 };
  }, [deprMSRP, deprYears, deprMilesPerYear, deprBrandTier]);

  // 6. RESALE VALUE
  const [resaleMSRP, setResaleMSRP] = useState(30000);
  const [resaleAge, setResaleAge] = useState(4);
  const [resaleMileage, setResaleMileage] = useState(48000);
  const [resaleCondition, setResaleCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const resaleMetrics = useMemo(() => {
    let base = resaleMSRP * Math.pow(0.85, resaleAge);
    const mileageDiff = resaleMileage - (resaleAge * 12000);
    base -= (mileageDiff / 1000) * 80;
    const condMultipliers = { excellent: 1.08, good: 1.0, fair: 0.88, poor: 0.72 };
    base *= condMultipliers[resaleCondition];
    const privateParty = Math.max(1000, base);
    const tradeIn = privateParty * 0.85;
    const dealerRetail = privateParty * 1.15;
    return { privateParty, tradeIn, dealerRetail };
  }, [resaleMSRP, resaleAge, resaleMileage, resaleCondition]);

  // 7. CAR SPEC COMPARISON
  const [carA, setCarA] = useState({ name: 'Sedan Alpha', hp: 250, mpgHwy: 36, weight: 3300, zeroSixty: 6.2, price: 31000 });
  const [carB, setCarB] = useState({ name: 'Crossover Beta', hp: 190, mpgHwy: 32, weight: 3700, zeroSixty: 7.8, price: 28500 });
  const specMetrics = useMemo(() => {
    const hpWinner = carA.hp >= carB.hp ? 'Car A' : 'Car B';
    const mpgWinner = carA.mpgHwy >= carB.mpgHwy ? 'Car A' : 'Car B';
    const weightWinner = carA.weight <= carB.weight ? 'Car A' : 'Car B';
    const speedWinner = carA.zeroSixty <= carB.zeroSixty ? 'Car A' : 'Car B';
    const priceWinner = carA.price <= carB.price ? 'Car A' : 'Car B';
    return { hpWinner, mpgWinner, weightWinner, speedWinner, priceWinner };
  }, [carA, carB]);

  // 8. VEHICLE SERVICE COST ESTIMATOR
  const [servMileage, setServMileage] = useState<number>(60000);
  const [servLaborRate, setServLaborRate] = useState<number>(120);
  const serviceMetrics = useMemo(() => {
    const servicesByInterval: Record<number, { items: string[]; partsCost: number; laborHours: number }> = {
      15000: { items: ['Synthetic Oil & Filter', 'Tire Rotation', 'Cabin Air Filter', 'Multi-Point Inspection'], partsCost: 75, laborHours: 1.0 },
      30000: { items: ['Engine Air Filter', 'Cabin Air Filter', 'Brake Fluid Flush', 'Coolant Check', 'Oil Change'], partsCost: 160, laborHours: 2.2 },
      60000: { items: ['Transmission Fluid Drain & Fill', 'Spark Plugs', 'Brake Fluid Flush', 'Engine & Cabin Filters', 'Full Inspection'], partsCost: 290, laborHours: 3.5 },
      90000: { items: ['Timing Belt / Water Pump Inspection', 'Differential Fluid', 'Coolant Flush', 'Suspension Check', 'Major Tune-Up'], partsCost: 480, laborHours: 5.0 },
      120000: { items: ['Comprehensive 120k Overhaul', 'All Fluids Replaced', 'Struts & Shock Assessment', 'Drive Belts'], partsCost: 650, laborHours: 6.5 }
    };
    const currentServ = servicesByInterval[servMileage] || servicesByInterval[60000];
    const laborCost = currentServ.laborHours * servLaborRate;
    const totalCost = currentServ.partsCost + laborCost;
    return { ...currentServ, laborCost, totalCost };
  }, [servMileage, servLaborRate]);

  // 9. TIRE SIZE CALCULATOR
  const [tireWidth, setTireWidth] = useState(225);
  const [tireAspect, setTireAspect] = useState(45);
  const [tireRim, setTireRim] = useState(17);
  const tireMetrics = useMemo(() => {
    const sidewallMm = tireWidth * (tireAspect / 100);
    const sidewallIn = sidewallMm / 25.4;
    const diameterIn = (sidewallIn * 2) + tireRim;
    const circumferenceIn = diameterIn * Math.PI;
    const revsPerMile = 63360 / (circumferenceIn || 1);
    return { sidewallMm, sidewallIn, diameterIn, circumferenceIn, revsPerMile };
  }, [tireWidth, tireAspect, tireRim]);

  // 10. CAR BATTERY LIFE CHECKER
  const [batteryMonths, setBatteryMonths] = useState(36);
  const [batteryVoltage, setBatteryVoltage] = useState(12.4);
  const [batteryClimate, setBatteryClimate] = useState<'hot' | 'moderate' | 'cold'>('moderate');
  const batteryMetrics = useMemo(() => {
    let healthPct = 100 - (batteryMonths * 1.8);
    if (batteryClimate === 'hot') healthPct -= 12;
    if (batteryVoltage < 12.0) healthPct = Math.min(healthPct, 20);
    else if (batteryVoltage < 12.4) healthPct = Math.min(healthPct, 60);
    healthPct = Math.max(5, Math.min(100, healthPct));
    let status = 'Excellent Condition';
    if (healthPct < 40) status = 'Replace Immediately';
    else if (healthPct < 70) status = 'Marginal / Recharge & Test';
    return { healthPct, status };
  }, [batteryMonths, batteryVoltage, batteryClimate]);

  // 11. OIL CHANGE HELPER
  const [oilType, setOilType] = useState<'full_synth' | 'blend' | 'conventional'>('full_synth');
  const [oilMilesDriven, setOilMilesDriven] = useState(4200);
  const [drivingStyle, setDrivingStyle] = useState<'normal' | 'severe'>('normal');
  const oilMetrics = useMemo(() => {
    let maxInterval = oilType === 'full_synth' ? 10000 : oilType === 'blend' ? 7500 : 5000;
    if (drivingStyle === 'severe') maxInterval *= 0.7;
    const remaining = Math.max(0, maxInterval - oilMilesDriven);
    const pctUsed = Math.min(100, (oilMilesDriven / maxInterval) * 100);
    const needsChange = remaining <= 500;
    return { maxInterval, remaining, pctUsed, needsChange };
  }, [oilType, oilMilesDriven, drivingStyle]);

  // 12. COOLANT MIX CALCULATOR
  const [coolantCapQuarts, setCoolantCapQuarts] = useState(8);
  const [desiredAntifreezePct, setDesiredAntifreezePct] = useState(50);
  const coolantMetrics = useMemo(() => {
    const antifreezeQuarts = coolantCapQuarts * (desiredAntifreezePct / 100);
    const waterQuarts = coolantCapQuarts - antifreezeQuarts;
    const freezePointF = desiredAntifreezePct >= 50 ? -34 : desiredAntifreezePct >= 40 ? -12 : 10;
    return { antifreezeQuarts, waterQuarts, freezePointF };
  }, [coolantCapQuarts, desiredAntifreezePct]);

  // 13. BRAKE WEAR INSPECTOR
  const [padFrontMm, setPadFrontMm] = useState(5.5);
  const [padRearMm, setPadRearMm] = useState(7.0);
  const [minPadLimit] = useState(3.0);
  const brakeMetrics = useMemo(() => {
    const frontLifePct = Math.max(0, Math.min(100, ((padFrontMm - minPadLimit) / (12 - minPadLimit)) * 100));
    const rearLifePct = Math.max(0, Math.min(100, ((padRearMm - minPadLimit) / (12 - minPadLimit)) * 100));
    const frontStatus = padFrontMm <= minPadLimit ? 'Replace Front Pads Immediately' : padFrontMm <= 4.0 ? 'Front Pads Low' : 'Front Pads Good';
    const rearStatus = padRearMm <= minPadLimit ? 'Replace Rear Pads Immediately' : padRearMm <= 4.0 ? 'Rear Pads Low' : 'Rear Pads Good';
    return { frontLifePct, rearLifePct, frontStatus, rearStatus };
  }, [padFrontMm, padRearMm, minPadLimit]);

  // 14. TRANSMISSION FLUID CHECKER
  const [transFluidColor, setTransFluidColor] = useState<'pink' | 'light_brown' | 'dark_brown' | 'black'>('light_brown');
  const [transMiles, setTransMiles] = useState(45000);
  const transMetrics = useMemo(() => {
    const descriptions = {
      pink: { label: 'New / Healthy Condition', healthScore: 95, action: 'No Service Required' },
      light_brown: { label: 'Normal Wear', healthScore: 75, action: 'Inspect at next service' },
      dark_brown: { label: 'Degraded / Oxidized', healthScore: 40, action: 'Drain & Fill Recommended' },
      black: { label: 'Burnt / Contaminated', healthScore: 10, action: 'Immediate Transmission Service & Filter Replacement' }
    };
    return descriptions[transFluidColor];
  }, [transFluidColor, transMiles]);

  // 15. CAR RENTAL COST
  const [rentalDailyRate, setRentalDailyRate] = useState(48);
  const [rentalDays, setRentalDays] = useState(5);
  const [rentalInsuranceDaily, setRentalInsuranceDaily] = useState(15);
  const [rentalTaxesPct, setRentalTaxesPct] = useState(18);
  const rentalMetrics = useMemo(() => {
    const baseSubtotal = rentalDailyRate * rentalDays;
    const insuranceSubtotal = rentalInsuranceDaily * rentalDays;
    const taxes = (baseSubtotal + insuranceSubtotal) * (rentalTaxesPct / 100);
    const grandTotal = baseSubtotal + insuranceSubtotal + taxes;
    const effectiveDaily = rentalDays > 0 ? grandTotal / rentalDays : 0;
    return { baseSubtotal, insuranceSubtotal, taxes, grandTotal, effectiveDaily };
  }, [rentalDailyRate, rentalDays, rentalInsuranceDaily, rentalTaxesPct]);

  // 16. LEASE VS PURCHASE
  const [leaseMSRP, setLeaseMSRP] = useState(36000);
  const [leaseDown, setLeaseDown] = useState(3000);
  const [leaseTermMo, setLeaseTermMo] = useState(36);
  const [leaseMonthly, setLeaseMonthly] = useState(390);
  const [loanMonthly, setLoanMonthly] = useState(620);
  const leaseMetrics = useMemo(() => {
    const totalLeaseOut = leaseDown + (leaseMonthly * leaseTermMo);
    const totalLoanOut = leaseDown + (loanMonthly * 60);
    const residualVal = leaseMSRP * 0.54;
    return { totalLeaseOut, totalLoanOut, residualVal };
  }, [leaseMSRP, leaseDown, leaseTermMo, leaseMonthly, loanMonthly]);

  // 17. TRADE IN VALUE
  const [tradeBaseVal, setTradeBaseVal] = useState(18500);
  const [tradeTireDeduct, setTradeTireDeduct] = useState(400);
  const [tradeBodyDeduct, setTradeBodyDeduct] = useState(350);
  const [tradeMechDeduct, setTradeMechDeduct] = useState(0);
  const tradeMetrics = useMemo(() => {
    const totalDeductions = tradeTireDeduct + tradeBodyDeduct + tradeMechDeduct;
    const netTradeIn = Math.max(500, tradeBaseVal - totalDeductions);
    const privateSaleEst = netTradeIn * 1.18;
    return { totalDeductions, netTradeIn, privateSaleEst };
  }, [tradeBaseVal, tradeTireDeduct, tradeBodyDeduct, tradeMechDeduct]);

  // 18. VIN DECODER
  const [vinInput, setVinInput] = useState('1HGCR2F83HA123456');
  const vinMetrics = useMemo(() => {
    const cleanVin = vinInput.trim().toUpperCase();
    const isValidLen = cleanVin.length === 17;
    let country = 'United States';
    if (cleanVin.startsWith('1') || cleanVin.startsWith('4') || cleanVin.startsWith('5')) country = 'United States';
    else if (cleanVin.startsWith('2')) country = 'Canada';
    else if (cleanVin.startsWith('3')) country = 'Mexico';
    else if (cleanVin.startsWith('J')) country = 'Japan';
    else if (cleanVin.startsWith('K')) country = 'South Korea';
    else if (cleanVin.startsWith('W')) country = 'Germany';
    const make = cleanVin.startsWith('1HG') ? 'Honda' : cleanVin.startsWith('1FT') ? 'Ford' : cleanVin.startsWith('1GC') ? 'Chevrolet' : cleanVin.startsWith('JN') ? 'Nissan' : 'Generic Automaker';
    return { cleanVin, isValidLen, country, make, yearCode: cleanVin[9] || 'N/A' };
  }, [vinInput]);

  // 19. TOLL COST
  const [tollMiles, setTollMiles] = useState(140);
  const [tollAxles, setTollAxles] = useState(2);
  const [hasTransponder, setHasTransponder] = useState(true);
  const tollMetrics = useMemo(() => {
    const baseRatePerMile = 0.08 * (tollAxles === 2 ? 1 : tollAxles === 3 ? 1.5 : 2.2);
    const standardToll = tollMiles * baseRatePerMile;
    const finalToll = hasTransponder ? standardToll * 0.75 : standardToll;
    const savings = standardToll - finalToll;
    return { standardToll, finalToll, savings };
  }, [tollMiles, tollAxles, hasTransponder]);

  // 20. EV RANGE ESTIMATOR
  const [evBatteryKwh, setEvBatteryKwh] = useState(77);
  const [evAmbientTempF, setEvAmbientTempF] = useState(70);
  const [evHighwaySpeed, setEvHighwaySpeed] = useState(65);
  const [evCabinClimate, setEvCabinClimate] = useState(true);
  const evRangeMetrics = useMemo(() => {
    let baseWhPerMile = 280;
    if (evHighwaySpeed > 65) baseWhPerMile *= Math.pow(evHighwaySpeed / 65, 1.4);
    if (evAmbientTempF < 32) baseWhPerMile *= 1.35;
    else if (evAmbientTempF < 50) baseWhPerMile *= 1.15;
    else if (evAmbientTempF > 90) baseWhPerMile *= 1.12;
    if (evCabinClimate) baseWhPerMile += 25;
    const estRangeMiles = (evBatteryKwh * 1000) / (baseWhPerMile || 1);
    const efficiencyMiPerKwh = estRangeMiles / (evBatteryKwh || 1);
    return { estRangeMiles, efficiencyMiPerKwh, baseWhPerMile };
  }, [evBatteryKwh, evAmbientTempF, evHighwaySpeed, evCabinClimate]);

  // 21. EV CHARGING COST
  const [evCapKwh, setEvCapKwh] = useState(75);
  const [evStartSoc, setEvStartSoc] = useState(20);
  const [evTargetSoc, setEvTargetSoc] = useState(80);
  const [evHomeElecRate, setEvHomeElecRate] = useState(0.14);
  const [evDcFastRate, setEvDcFastRate] = useState(0.42);
  const evChargeMetrics = useMemo(() => {
    const kwhAdded = evCapKwh * ((evTargetSoc - evStartSoc) / 100);
    const homeCost = (kwhAdded / 0.9) * evHomeElecRate;
    const fastCost = (kwhAdded / 0.95) * evDcFastRate;
    const gasEquivCost = (kwhAdded * 3.5 / 28) * 3.75;
    return { kwhAdded, homeCost, fastCost, gasEquivCost };
  }, [evCapKwh, evStartSoc, evTargetSoc, evHomeElecRate, evDcFastRate]);

  // 22. HYBRID VS EV SAVINGS
  const [compAnnualMiles, setCompAnnualMiles] = useState(15000);
  const [compGasPrice, setCompGasPrice] = useState(3.85);
  const [compElecRate, setCompElecRate] = useState(0.15);
  const [compHybridMpg, setCompHybridMpg] = useState(52);
  const [compEvMiPerKwh, setCompEvMiPerKwh] = useState(3.6);
  const hybridEvMetrics = useMemo(() => {
    const hybridAnnualGasCost = (compAnnualMiles / (compHybridMpg || 1)) * compGasPrice;
    const evAnnualElecCost = (compAnnualMiles / (compEvMiPerKwh || 1)) * compElecRate;
    const annualSavings = hybridAnnualGasCost - evAnnualElecCost;
    const fiveYearSavings = annualSavings * 5;
    return { hybridAnnualGasCost, evAnnualElecCost, annualSavings, fiveYearSavings };
  }, [compAnnualMiles, compGasPrice, compElecRate, compHybridMpg, compEvMiPerKwh]);

  return (
    <div className="space-y-6">
      {/* 1. Universal Fuel Cost Calculator */}
      {slug === 'universal-fuel-cost-calculator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Fuel Calculator Actions"
            onReset={() => { setFuelDistance(350); setFuelMpg(28); setFuelPricePerGal(3.65); setFuelRoundTrip(true); setFuelPassengers(2); }}
            onCopy={() => safeCopy(`Fuel Cost Estimate:\nDistance: ${fuelMetrics.totalDist} miles\nGallons: ${fuelMetrics.gallonsNeeded.toFixed(1)} gal\nTotal Cost: $${fuelMetrics.totalCost.toFixed(2)}\nCost Per Person: $${fuelMetrics.costPerPerson.toFixed(2)}`, 'fuel')}
            onDownload={() => downloadTextFile('fuel_cost_estimate.txt', `Universal Fuel Cost Calculator Specs\nTotal Distance: ${fuelMetrics.totalDist} mi\nFuel Required: ${fuelMetrics.gallonsNeeded.toFixed(2)} gal\nFuel Price: $${fuelPricePerGal.toFixed(2)}/gal\nTotal Fuel Cost: $${fuelMetrics.totalCost.toFixed(2)}\nCost per Mile: $${fuelMetrics.costPerMile.toFixed(2)}/mi\nCost per Person (${fuelPassengers} pax): $${fuelMetrics.costPerPerson.toFixed(2)}`)}
            isCopied={copiedKey === 'fuel'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">One-Way Distance (mi)</label>
              <input type="number" value={fuelDistance} onChange={(e) => setFuelDistance(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Fuel Economy (MPG)</label>
              <input type="number" value={fuelMpg} onChange={(e) => setFuelMpg(parseFloat(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Gas Price ($/gal)</label>
              <input type="number" step="0.05" value={fuelPricePerGal} onChange={(e) => setFuelPricePerGal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Passenger Count</label>
              <input type="number" min={1} value={fuelPassengers} onChange={(e) => setFuelPassengers(parseInt(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Total Distance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{fuelMetrics.totalDist} mi</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Gallons Needed</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{fuelMetrics.gallonsNeeded.toFixed(1)} gal</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Total Cost</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${fuelMetrics.totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Per Passenger</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${fuelMetrics.costPerPerson.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Online Vehicle Mileage Estimator */}
      {slug === 'online-vehicle-mileage-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Mileage Estimator Actions"
            onReset={() => { setOdometerStart(45200); setOdometerEnd(45580); setFuelAddedGal(12.8); setFuelUnitCost(3.75); }}
            onCopy={() => safeCopy(`Vehicle Mileage Metrics:\nTrip Distance: ${mileageMetrics.tripDistance} miles\nEconomy: ${mileageMetrics.mpg.toFixed(1)} MPG (${mileageMetrics.lPer100km.toFixed(1)} L/100km)\nTrip Cost: $${mileageMetrics.tripCost.toFixed(2)}\nCost Per Mile: $${mileageMetrics.costPerMile.toFixed(2)}/mi`, 'mileage')}
            onDownload={() => downloadTextFile('vehicle_mileage_report.txt', `Vehicle Mileage Estimator Report\nTrip Distance: ${mileageMetrics.tripDistance} miles\nCalculated Economy: ${mileageMetrics.mpg.toFixed(2)} MPG\nTrip Cost: $${mileageMetrics.tripCost.toFixed(2)}`)}
            isCopied={copiedKey === 'mileage'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Odometer Start</label>
              <input type="number" value={odometerStart} onChange={(e) => setOdometerStart(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Odometer End</label>
              <input type="number" value={odometerEnd} onChange={(e) => setOdometerEnd(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Fuel Added (gal)</label>
              <input type="number" step="0.1" value={fuelAddedGal} onChange={(e) => setFuelAddedGal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Price per Gallon ($)</label>
              <input type="number" step="0.05" value={fuelUnitCost} onChange={(e) => setFuelUnitCost(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Trip Distance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{mileageMetrics.tripDistance} mi</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Fuel Economy</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{mileageMetrics.mpg.toFixed(1)} MPG</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Trip Fuel Cost</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${mileageMetrics.tripCost.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Cost per Mile</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${mileageMetrics.costPerMile.toFixed(2)}/mi</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Car Loan Payment Calculator Master */}
      {slug === 'car-loan-payment-calculator-master' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Car Loan Actions"
            onReset={() => { setCarPrice(32000); setCarDownPayment(5000); setCarTradeIn(2000); setCarTaxRate(7.5); setCarInterestRate(5.99); setCarLoanTermMonths(60); }}
            onCopy={() => safeCopy(`Car Loan Estimate:\nMonthly Payment: $${carLoanMetrics.monthlyPayment.toFixed(2)}/mo\nAmount Financed: $${carLoanMetrics.totalFinanced.toLocaleString()}\nTotal Interest: $${carLoanMetrics.totalInterest.toFixed(2)}`, 'loan')}
            onDownload={() => downloadTextFile('car_loan_schedule.txt', `Car Loan Specs\nVehicle Price: $${carPrice.toLocaleString()}\nMonthly Payment: $${carLoanMetrics.monthlyPayment.toFixed(2)}/mo\nTotal Interest: $${carLoanMetrics.totalInterest.toFixed(2)}`)}
            isCopied={copiedKey === 'loan'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Price ($)</label>
              <input type="number" value={carPrice} onChange={(e) => setCarPrice(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Down Payment ($)</label>
              <input type="number" value={carDownPayment} onChange={(e) => setCarDownPayment(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Interest Rate (%)</label>
              <input type="number" step="0.1" value={carInterestRate} onChange={(e) => setCarInterestRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Monthly Payment</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${carLoanMetrics.monthlyPayment.toFixed(2)}/mo</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Total Financed</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${carLoanMetrics.totalFinanced.toLocaleString()}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Total Interest</p>
              <p className="text-2xl font-bold font-mono text-rose-700 mt-1">${carLoanMetrics.totalInterest.toFixed(2)}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Total Cost</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">${(carLoanMetrics.totalPaid + carDownPayment).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. Advanced Car Insurance Estimator */}
      {slug === 'advanced-car-insurance-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Insurance Estimator Actions"
            onReset={() => { setVehicleValue(28000); setDriverAgeGroup('adult'); setCoverageTier('full'); setDeductible(1000); setAnnualMiles(12000); }}
            onCopy={() => safeCopy(`Car Insurance Estimate:\nMonthly: $${insuranceMetrics.monthlyPremium.toFixed(2)}/mo\nAnnual: $${insuranceMetrics.annualPremium.toFixed(2)}/yr`, 'insurance')}
            onDownload={() => downloadTextFile('insurance_estimate.txt', `Insurance Estimate\nVehicle Value: $${vehicleValue}\nMonthly Premium: $${insuranceMetrics.monthlyPremium.toFixed(2)}/mo\nAnnual: $${insuranceMetrics.annualPremium.toFixed(2)}/yr`)}
            isCopied={copiedKey === 'insurance'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Value ($)</label>
              <input type="number" value={vehicleValue} onChange={(e) => setVehicleValue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Coverage Tier</label>
              <select value={coverageTier} onChange={(e) => setCoverageTier(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="liability">Liability Only</option>
                <option value="standard">Standard Collision</option>
                <option value="full">Full Comprehensive</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Deductible ($)</label>
              <select value={deductible} onChange={(e) => setDeductible(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={500}>$500</option>
                <option value={1000}>$1,000</option>
                <option value={2000}>$2,000</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Annual Miles</label>
              <input type="number" value={annualMiles} onChange={(e) => setAnnualMiles(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Estimated Monthly Premium</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${insuranceMetrics.monthlyPremium.toFixed(2)}/mo</p>
            </div>
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Annual Premium</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${insuranceMetrics.annualPremium.toFixed(2)}/yr</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Car Depreciation Estimator (Smart) */}
      {slug === 'car-depreciation-estimator-smart' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Depreciation Calculator Actions"
            onReset={() => { setDeprMSRP(35000); setDeprYears(5); setDeprBrandTier('average'); }}
            onCopy={() => safeCopy(`Car Depreciation (${deprYears} Years):\nResidual Value: $${deprMetrics.finalVal.toFixed(2)}\nTotal Depreciation: $${deprMetrics.totalLoss.toFixed(2)} (${(100 - deprMetrics.retainedPct).toFixed(1)}% Lost)`, 'depr')}
            onDownload={() => downloadTextFile('depreciation_schedule.txt', `Depreciation Schedule\nOriginal MSRP: $${deprMSRP}\nResidual Value after ${deprYears} yrs: $${deprMetrics.finalVal.toFixed(2)}\nRetained: ${deprMetrics.retainedPct.toFixed(1)}%`)}
            isCopied={copiedKey === 'depr'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Purchase Price ($)</label>
              <input type="number" value={deprMSRP} onChange={(e) => setDeprMSRP(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Ownership Duration (Years)</label>
              <select value={deprYears} onChange={(e) => setDeprYears(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Tier</label>
              <select value={deprBrandTier} onChange={(e) => setDeprBrandTier(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="toyota">High Residual (Toyota / Honda / Porsche)</option>
                <option value="average">Industry Average Sedan/SUV</option>
                <option value="luxury">Luxury European (BMW / Mercedes)</option>
                <option value="ev">Electric Vehicle (Rapid Battery Cycle)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Residual Value</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${deprMetrics.finalVal.toFixed(0)}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Total Depreciation Loss</p>
              <p className="text-2xl font-bold font-mono text-rose-700 mt-1">${deprMetrics.totalLoss.toFixed(0)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Value Retained</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{deprMetrics.retainedPct.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Resale Value Calculator Client-Side */}
      {slug === 'resale-value-calculator-client-side' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Resale Value Actions"
            onReset={() => { setResaleMSRP(30000); setResaleAge(4); setResaleMileage(48000); setResaleCondition('good'); }}
            onCopy={() => safeCopy(`Resale Valuation:\nPrivate Party: $${resaleMetrics.privateParty.toFixed(0)}\nTrade-In Offer: $${resaleMetrics.tradeIn.toFixed(0)}\nDealer Retail: $${resaleMetrics.dealerRetail.toFixed(0)}`, 'resale')}
            onDownload={() => downloadTextFile('resale_valuation.txt', `Resale Valuation Report\nPrivate Party Fair Market: $${resaleMetrics.privateParty.toFixed(0)}\nDealer Trade-In: $${resaleMetrics.tradeIn.toFixed(0)}\nDealer Retail: $${resaleMetrics.dealerRetail.toFixed(0)}`)}
            isCopied={copiedKey === 'resale'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Original MSRP ($)</label>
              <input type="number" value={resaleMSRP} onChange={(e) => setResaleMSRP(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Age (Years)</label>
              <input type="number" value={resaleAge} onChange={(e) => setResaleAge(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Current Mileage</label>
              <input type="number" value={resaleMileage} onChange={(e) => setResaleMileage(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Condition</label>
              <select value={resaleCondition} onChange={(e) => setResaleCondition(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Private Party Fair Value</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${resaleMetrics.privateParty.toFixed(0)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Dealer Trade-In Cash</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${resaleMetrics.tradeIn.toFixed(0)}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Dealer Retail Asking</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${resaleMetrics.dealerRetail.toFixed(0)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Easy Car Spec Comparison Tool */}
      {slug === 'easy-car-spec-comparison-tool' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Spec Comparison Actions"
            onReset={() => { setCarA({ name: 'Sedan Alpha', hp: 250, mpgHwy: 36, weight: 3300, zeroSixty: 6.2, price: 31000 }); setCarB({ name: 'Crossover Beta', hp: 190, mpgHwy: 32, weight: 3700, zeroSixty: 7.8, price: 28500 }); }}
            onCopy={() => safeCopy(`Car Comparison:\n${carA.name}: ${carA.hp}hp, ${carA.mpgHwy}mpg hwy, 0-60 in ${carA.zeroSixty}s ($${carA.price})\n${carB.name}: ${carB.hp}hp, ${carB.mpgHwy}mpg hwy, 0-60 in ${carB.zeroSixty}s ($${carB.price})`, 'specs')}
            onDownload={() => downloadTextFile('car_spec_comparison.txt', `Car Spec Comparison\nCar A (${carA.name}) vs Car B (${carB.name})\nHP Winner: ${specMetrics.hpWinner}\nMPG Winner: ${specMetrics.mpgWinner}\n0-60 Winner: ${specMetrics.speedWinner}`)}
            isCopied={copiedKey === 'specs'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-indigo-600">Vehicle A Specs</h4>
              <input type="text" value={carA.name} onChange={(e) => setCarA({ ...carA, name: e.target.value })} className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold" />
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[11px] text-slate-500">Horsepower</label><input type="number" value={carA.hp} onChange={(e) => setCarA({ ...carA, hp: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">MPG Highway</label><input type="number" value={carA.mpgHwy} onChange={(e) => setCarA({ ...carA, mpgHwy: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">0-60 mph (sec)</label><input type="number" step="0.1" value={carA.zeroSixty} onChange={(e) => setCarA({ ...carA, zeroSixty: parseFloat(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">Price ($)</label><input type="number" value={carA.price} onChange={(e) => setCarA({ ...carA, price: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-emerald-600">Vehicle B Specs</h4>
              <input type="text" value={carB.name} onChange={(e) => setCarB({ ...carB, name: e.target.value })} className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold" />
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[11px] text-slate-500">Horsepower</label><input type="number" value={carB.hp} onChange={(e) => setCarB({ ...carB, hp: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">MPG Highway</label><input type="number" value={carB.mpgHwy} onChange={(e) => setCarB({ ...carB, mpgHwy: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">0-60 mph (sec)</label><input type="number" step="0.1" value={carB.zeroSixty} onChange={(e) => setCarB({ ...carB, zeroSixty: parseFloat(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
                <div><label className="text-[11px] text-slate-500">Price ($)</label><input type="number" value={carB.price} onChange={(e) => setCarB({ ...carB, price: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border rounded text-xs" /></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200"><p className="text-[11px] text-slate-500">HP Leader</p><p className="font-bold text-sm text-indigo-700">{specMetrics.hpWinner === 'Car A' ? carA.name : carB.name}</p></div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200"><p className="text-[11px] text-slate-500">Fuel Efficiency Leader</p><p className="font-bold text-sm text-emerald-700">{specMetrics.mpgWinner === 'Car A' ? carA.name : carB.name}</p></div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200"><p className="text-[11px] text-slate-500">Quickest 0-60</p><p className="font-bold text-sm text-purple-700">{specMetrics.speedWinner === 'Car A' ? carA.name : carB.name}</p></div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200"><p className="text-[11px] text-slate-500">Budget Advantage</p><p className="font-bold text-sm text-amber-700">{specMetrics.priceWinner === 'Car A' ? carA.name : carB.name}</p></div>
          </div>
        </div>
      )}

      {/* 8. Custom Vehicle Service Cost Estimator */}
      {slug === 'custom-vehicle-service-cost-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Service Estimator Actions"
            onReset={() => { setServMileage(60000); setServLaborRate(120); }}
            onCopy={() => safeCopy(`Vehicle Service Estimate (${servMileage.toLocaleString()} mi):\nTotal Cost: $${serviceMetrics.totalCost.toFixed(2)}\nParts: $${serviceMetrics.partsCost} | Labor: $${serviceMetrics.laborCost.toFixed(2)} (${serviceMetrics.laborHours} hrs)\nServices: ${serviceMetrics.items.join(', ')}`, 'service')}
            onDownload={() => downloadTextFile('service_estimate.txt', `Vehicle Service Cost Estimate\nInterval: ${servMileage.toLocaleString()} Miles\nParts Cost: $${serviceMetrics.partsCost}\nLabor Cost: $${serviceMetrics.laborCost.toFixed(2)}\nTotal Estimated Service: $${serviceMetrics.totalCost.toFixed(2)}`)}
            isCopied={copiedKey === 'service'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Scheduled Mileage Interval</label>
              <select value={servMileage} onChange={(e) => setServMileage(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={15000}>15,000 Miles (Minor Service)</option>
                <option value={30000}>30,000 Miles (Intermediate Inspection)</option>
                <option value={60000}>60,000 Miles (Major Service)</option>
                <option value={90000}>90,000 Miles (Timing/Major Tune-Up)</option>
                <option value={120000}>120,000 Miles (Comprehensive Overhaul)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Shop Hourly Labor Rate ($/hr)</label>
              <input type="number" value={servLaborRate} onChange={(e) => setServLaborRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Total Service Cost</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${serviceMetrics.totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Parts & Consumables</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${serviceMetrics.partsCost.toFixed(2)}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Labor Cost ({serviceMetrics.laborHours}h)</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${serviceMetrics.laborCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 9. Car Tire Size Calculator Dynamic */}
      {slug === 'car-tire-size-calculator-dynamic' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Tire Size Actions"
            onReset={() => { setTireWidth(225); setTireAspect(45); setTireRim(17); }}
            onCopy={() => safeCopy(`Tire Dimensions (${tireWidth}/${tireAspect}R${tireRim}):\nDiameter: ${tireMetrics.diameterIn.toFixed(2)} in\nCircumference: ${tireMetrics.circumferenceIn.toFixed(2)} in\nRevolutions/Mile: ${tireMetrics.revsPerMile.toFixed(0)}`, 'tire')}
            onDownload={() => downloadTextFile('tire_specs.txt', `Tire Specification Specs\nTire Code: ${tireWidth}/${tireAspect}R${tireRim}\nSidewall: ${tireMetrics.sidewallIn.toFixed(2)} in\nDiameter: ${tireMetrics.diameterIn.toFixed(2)} in\nCircumference: ${tireMetrics.circumferenceIn.toFixed(2)} in\nRevolutions/Mile: ${tireMetrics.revsPerMile.toFixed(0)}`)}
            isCopied={copiedKey === 'tire'}
          />
          <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Width (mm)</label>
              <input type="number" value={tireWidth} onChange={(e) => setTireWidth(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Aspect Ratio (%)</label>
              <input type="number" value={tireAspect} onChange={(e) => setTireAspect(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Rim Diameter (in)</label>
              <input type="number" value={tireRim} onChange={(e) => setTireRim(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Overall Diameter</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{tireMetrics.diameterIn.toFixed(2)} in</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Circumference</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{tireMetrics.circumferenceIn.toFixed(2)} in</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Revs per Mile</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{tireMetrics.revsPerMile.toFixed(0)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Sidewall Height</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">{tireMetrics.sidewallIn.toFixed(2)} in</p>
            </div>
          </div>
        </div>
      )}

      {/* 10. Car Battery Life Checker (Private) */}
      {slug === 'car-battery-life-checker-private' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Battery Checker Actions"
            onReset={() => { setBatteryMonths(36); setBatteryVoltage(12.4); setBatteryClimate('moderate'); }}
            onCopy={() => safeCopy(`Car Battery Diagnosis:\nHealth Score: ${batteryMetrics.healthPct.toFixed(0)}%\nStatus: ${batteryMetrics.status}\nVoltage: ${batteryVoltage}V`, 'batt')}
            onDownload={() => downloadTextFile('battery_health_report.txt', `Battery Diagnostic Report\nAge: ${batteryMonths} Months\nResting Voltage: ${batteryVoltage} V\nHealth Score: ${batteryMetrics.healthPct.toFixed(0)}%\nStatus: ${batteryMetrics.status}`)}
            isCopied={copiedKey === 'batt'}
          />
          <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Battery Age (Months)</label>
              <input type="number" value={batteryMonths} onChange={(e) => setBatteryMonths(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Resting Voltage (V)</label>
              <input type="number" step="0.1" value={batteryVoltage} onChange={(e) => setBatteryVoltage(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Climate Region</label>
              <select value={batteryClimate} onChange={(e) => setBatteryClimate(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="moderate">Moderate Climate</option>
                <option value="hot">Extreme Heat / Southern</option>
                <option value="cold">Freezing Cold / Northern</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Battery Health Score</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{batteryMetrics.healthPct.toFixed(0)}%</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Diagnostic Verdict</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{batteryMetrics.status}</p>
            </div>
          </div>
        </div>
      )}

      {/* 11. Browser Oil Change Interval Helper */}
      {slug === 'browser-oil-change-interval-helper' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Oil Change Actions"
            onReset={() => { setOilType('full_synth'); setOilMilesDriven(4200); setDrivingStyle('normal'); }}
            onCopy={() => safeCopy(`Oil Interval:\nType: ${oilType}\nMiles Driven: ${oilMilesDriven}\nRemaining: ${oilMetrics.remaining} miles\nStatus: ${oilMetrics.needsChange ? 'Due for Service' : 'Good to Drive'}`, 'oil')}
            onDownload={() => downloadTextFile('oil_interval_report.txt', `Oil Change Interval Specs\nOil Type: ${oilType}\nMax Interval: ${oilMetrics.maxInterval} miles\nRemaining Miles: ${oilMetrics.remaining} miles\nService Due: ${oilMetrics.needsChange ? 'YES' : 'NO'}`)}
            isCopied={copiedKey === 'oil'}
          />
          <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Engine Oil Formulation</label>
              <select value={oilType} onChange={(e) => setOilType(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="full_synth">Full Synthetic (10k Interval)</option>
                <option value="blend">Synthetic Blend (7.5k Interval)</option>
                <option value="conventional">Conventional Mineral (5k Interval)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Miles Since Last Change</label>
              <input type="number" value={oilMilesDriven} onChange={(e) => setOilMilesDriven(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Operating Condition</label>
              <select value={drivingStyle} onChange={(e) => setDrivingStyle(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="normal">Highway / Mixed Commute</option>
                <option value="severe">Severe / Stop-and-Go / Towing</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Remaining Miles</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">{oilMetrics.remaining} mi</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Oil Life Consumed</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{oilMetrics.pctUsed.toFixed(0)}%</p>
            </div>
            <div className={`p-4 rounded-xl border text-center ${oilMetrics.needsChange ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-300'}`}>
              <p className="text-xs font-medium">Service Requirement</p>
              <p className="text-2xl font-bold font-mono mt-1">{oilMetrics.needsChange ? 'Change Now' : 'Healthy'}</p>
            </div>
          </div>
        </div>
      )}

      {/* 12. Coolant Mix Calculator Universal */}
      {slug === 'coolant-mix-calculator-universal' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Coolant Mix Actions"
            onReset={() => { setCoolantCapQuarts(8); setDesiredAntifreezePct(50); }}
            onCopy={() => safeCopy(`Coolant Mix Ratio:\nCapacity: ${coolantCapQuarts} qts\nAntifreeze: ${coolantMetrics.antifreezeQuarts} qts\nDistilled Water: ${coolantMetrics.waterQuarts} qts\nProtection: Down to ${coolantMetrics.freezePointF}°F`, 'coolant')}
            onDownload={() => downloadTextFile('coolant_ratio.txt', `Coolant Mix Ratio Specs\nSystem Capacity: ${coolantCapQuarts} Quarts\nAntifreeze Needed: ${coolantMetrics.antifreezeQuarts} Quarts\nWater Needed: ${coolantMetrics.waterQuarts} Quarts\nFreeze Protection: ${coolantMetrics.freezePointF}°F`)}
            isCopied={copiedKey === 'coolant'}
          />
          <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Cooling System Capacity (Quarts)</label>
              <input type="number" value={coolantCapQuarts} onChange={(e) => setCoolantCapQuarts(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Target Antifreeze Concentration (%)</label>
              <select value={desiredAntifreezePct} onChange={(e) => setDesiredAntifreezePct(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={50}>50/50 Standard Protection (-34°F)</option>
                <option value={60}>60/40 Severe Arctic (-62°F)</option>
                <option value={33}>33/67 Warm Climate (0°F)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Pure Antifreeze</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{coolantMetrics.antifreezeQuarts.toFixed(1)} qts</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Distilled Water</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{coolantMetrics.waterQuarts.toFixed(1)} qts</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Freeze Rating</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{coolantMetrics.freezePointF}°F</p>
            </div>
          </div>
        </div>
      )}

      {/* 13. Online Brake Wear Inspector */}
      {slug === 'online-brake-wear-inspector' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Brake Wear Actions"
            onReset={() => { setPadFrontMm(5.5); setPadRearMm(7.0); }}
            onCopy={() => safeCopy(`Brake Pad Inspection:\nFront Pads: ${padFrontMm}mm (${brakeMetrics.frontStatus})\nRear Pads: ${padRearMm}mm (${brakeMetrics.rearStatus})`, 'brake')}
            onDownload={() => downloadTextFile('brake_inspection.txt', `Brake Pad Inspection Report\nFront Pads: ${padFrontMm} mm (${brakeMetrics.frontStatus})\nRear Pads: ${padRearMm} mm (${brakeMetrics.rearStatus})`)}
            isCopied={copiedKey === 'brake'}
          />
          <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Front Pad Thickness (mm)</label>
              <input type="number" step="0.5" value={padFrontMm} onChange={(e) => setPadFrontMm(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Rear Pad Thickness (mm)</label>
              <input type="number" step="0.5" value={padRearMm} onChange={(e) => setPadRearMm(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Front Pad Life ({brakeMetrics.frontLifePct.toFixed(0)}%)</p>
              <p className="text-xl font-bold font-mono text-indigo-700 mt-1">{brakeMetrics.frontStatus}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Rear Pad Life ({brakeMetrics.rearLifePct.toFixed(0)}%)</p>
              <p className="text-xl font-bold font-mono text-emerald-700 mt-1">{brakeMetrics.rearStatus}</p>
            </div>
          </div>
        </div>
      )}

      {/* 14. Master Transmission Fluid Checker */}
      {slug === 'master-transmission-fluid-checker' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Transmission Actions"
            onReset={() => { setTransFluidColor('light_brown'); setTransMiles(45000); }}
            onCopy={() => safeCopy(`Transmission Diagnosis:\nColor: ${transFluidColor}\nHealth: ${transMetrics.healthScore}%\nAction: ${transMetrics.action}`, 'trans')}
            onDownload={() => downloadTextFile('transmission_report.txt', `Transmission Diagnostic Specs\nFluid Color: ${transFluidColor}\nCondition: ${transMetrics.label}\nAction Recommended: ${transMetrics.action}`)}
            isCopied={copiedKey === 'trans'}
          />
          <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Dipstick Fluid Appearance</label>
              <select value={transFluidColor} onChange={(e) => setTransFluidColor(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="pink">Clear Pink / Red (Fresh Fluid)</option>
                <option value="light_brown">Light Brown (Normal Use)</option>
                <option value="dark_brown">Dark Brown / Oxidized</option>
                <option value="black">Burnt Black (Needs Immediate Service)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Miles on Fluid</label>
              <input type="number" value={transMiles} onChange={(e) => setTransMiles(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Fluid Health Score</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{transMetrics.healthScore}%</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Service Recommendation</p>
              <p className="text-xl font-bold font-mono text-indigo-700 mt-1">{transMetrics.action}</p>
            </div>
          </div>
        </div>
      )}

      {/* 15. Car Rental Cost Estimator Advanced */}
      {slug === 'car-rental-cost-estimator-advanced' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Rental Estimator Actions"
            onReset={() => { setRentalDailyRate(48); setRentalDays(5); setRentalInsuranceDaily(15); setRentalTaxesPct(18); }}
            onCopy={() => safeCopy(`Car Rental Estimate (${rentalDays} Days):\nTotal Cost: $${rentalMetrics.grandTotal.toFixed(2)}\nEffective Daily: $${rentalMetrics.effectiveDaily.toFixed(2)}/day`, 'rental')}
            onDownload={() => downloadTextFile('car_rental_estimate.txt', `Rental Cost Estimate\nDaily Base: $${rentalDailyRate}\nDays: ${rentalDays}\nTaxes: $${rentalMetrics.taxes.toFixed(2)}\nGrand Total: $${rentalMetrics.grandTotal.toFixed(2)}`)}
            isCopied={copiedKey === 'rental'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Daily Base Rate ($)</label>
              <input type="number" value={rentalDailyRate} onChange={(e) => setRentalDailyRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Rental Duration (Days)</label>
              <input type="number" value={rentalDays} onChange={(e) => setRentalDays(parseInt(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">CDW Insurance ($/day)</label>
              <input type="number" value={rentalInsuranceDaily} onChange={(e) => setRentalInsuranceDaily(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Airport Taxes & Fees (%)</label>
              <input type="number" value={rentalTaxesPct} onChange={(e) => setRentalTaxesPct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">All-Inclusive Grand Total</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${rentalMetrics.grandTotal.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Effective Daily Cost</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${rentalMetrics.effectiveDaily.toFixed(2)}/day</p>
            </div>
          </div>
        </div>
      )}

      {/* 16. Smart Car Lease Vs Purchase */}
      {slug === 'smart-car-lease-vs-purchase' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Lease vs Buy Actions"
            onReset={() => { setLeaseMSRP(36000); setLeaseDown(3000); setLeaseMonthly(390); setLoanMonthly(620); }}
            onCopy={() => safeCopy(`Lease vs Buy:\n3-Year Lease Out-of-Pocket: $${leaseMetrics.totalLeaseOut.toFixed(2)}\n5-Year Loan Out-of-Pocket: $${leaseMetrics.totalLoanOut.toFixed(2)}\nResidual Value: $${leaseMetrics.residualVal.toFixed(2)}`, 'lease')}
            onDownload={() => downloadTextFile('lease_vs_buy.txt', `Lease vs Purchase Comparison\nLease Total (36 mo): $${leaseMetrics.totalLeaseOut.toFixed(2)}\nLoan Total (60 mo): $${leaseMetrics.totalLoanOut.toFixed(2)}\nEstimated Vehicle Equity: $${leaseMetrics.residualVal.toFixed(2)}`)}
            isCopied={copiedKey === 'lease'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">MSRP ($)</label>
              <input type="number" value={leaseMSRP} onChange={(e) => setLeaseMSRP(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Down Payment ($)</label>
              <input type="number" value={leaseDown} onChange={(e) => setLeaseDown(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Monthly Lease ($)</label>
              <input type="number" value={leaseMonthly} onChange={(e) => setLeaseMonthly(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Monthly Loan ($)</label>
              <input type="number" value={loanMonthly} onChange={(e) => setLoanMonthly(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">3-Yr Lease Total Out-of-Pocket</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${leaseMetrics.totalLeaseOut.toFixed(0)}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">5-Yr Loan Total Out-of-Pocket</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${leaseMetrics.totalLoanOut.toFixed(0)}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Est. 3-Yr Equity (If Purchased)</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">${leaseMetrics.residualVal.toFixed(0)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 17. Client-Side Trade-In Value Estimator */}
      {slug === 'client-side-trade-in-value-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Trade-In Actions"
            onReset={() => { setTradeBaseVal(18500); setTradeTireDeduct(400); setTradeBodyDeduct(350); setTradeMechDeduct(0); }}
            onCopy={() => safeCopy(`Trade-In Appraisal:\nNet Dealer Offer: $${tradeMetrics.netTradeIn.toFixed(0)}\nPrivate Party Valuation: $${tradeMetrics.privateSaleEst.toFixed(0)}`, 'trade')}
            onDownload={() => downloadTextFile('trade_in_appraisal.txt', `Trade-In Appraisal Report\nBase Fair Value: $${tradeBaseVal}\nTotal Deductions: $${tradeMetrics.totalDeductions}\nNet Dealer Offer: $${tradeMetrics.netTradeIn.toFixed(0)}\nPrivate Sale Advantage: $${tradeMetrics.privateSaleEst.toFixed(0)}`)}
            isCopied={copiedKey === 'trade'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Base Book Value ($)</label>
              <input type="number" value={tradeBaseVal} onChange={(e) => setTradeBaseVal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tire Replacement ($)</label>
              <input type="number" value={tradeTireDeduct} onChange={(e) => setTradeTireDeduct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Cosmetic Scratches ($)</label>
              <input type="number" value={tradeBodyDeduct} onChange={(e) => setTradeBodyDeduct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Mechanical Issues ($)</label>
              <input type="number" value={tradeMechDeduct} onChange={(e) => setTradeMechDeduct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Dealer Trade-In Offer</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${tradeMetrics.netTradeIn.toFixed(0)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Estimated Private Party Value</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${tradeMetrics.privateSaleEst.toFixed(0)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 18. VIN Decoder Helper Easy */}
      {slug === 'vin-decoder-helper-easy' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="VIN Decoder Actions"
            onReset={() => setVinInput('1HGCR2F83HA123456')}
            onCopy={() => safeCopy(`VIN Analysis for ${vinMetrics.cleanVin}:\nManufacturer: ${vinMetrics.make}\nCountry: ${vinMetrics.country}\nYear Code: ${vinMetrics.yearCode}`, 'vin')}
            onDownload={() => downloadTextFile('vin_decode_report.txt', `VIN Decode Specs\nVIN: ${vinMetrics.cleanVin}\nValid Format: ${vinMetrics.isValidLen ? 'YES' : 'NO'}\nCountry: ${vinMetrics.country}\nMake: ${vinMetrics.make}`)}
            isCopied={copiedKey === 'vin'}
          />
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="text-xs font-semibold text-slate-600 block">Enter 17-Character VIN</label>
            <input type="text" maxLength={17} value={vinInput} onChange={(e) => setVinInput(e.target.value)} className="w-full px-4 py-2 border rounded-xl text-base font-mono uppercase tracking-widest font-bold" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Detected Make</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{vinMetrics.make}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Country of Origin</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{vinMetrics.country}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Format Validity</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{vinMetrics.isValidLen ? 'Valid 17-Char' : 'Incomplete'}</p>
            </div>
          </div>
        </div>
      )}

      {/* 19. Custom Toll Cost Calculator */}
      {slug === 'custom-toll-cost-calculator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Toll Calculator Actions"
            onReset={() => { setTollMiles(140); setTollAxles(2); setHasTransponder(true); }}
            onCopy={() => safeCopy(`Toll Cost (${tollMiles} mi):\nCost: $${tollMetrics.finalToll.toFixed(2)}\nSavings with Tag: $${tollMetrics.savings.toFixed(2)}`, 'toll')}
            onDownload={() => downloadTextFile('toll_estimate.txt', `Toll Calculation Report\nDistance: ${tollMiles} Miles\nAxle Count: ${tollAxles}\nTotal Toll: $${tollMetrics.finalToll.toFixed(2)}`)}
            isCopied={copiedKey === 'toll'}
          />
          <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Turnpike Distance (mi)</label>
              <input type="number" value={tollMiles} onChange={(e) => setTollMiles(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Axles</label>
              <select value={tollAxles} onChange={(e) => setTollAxles(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={2}>2-Axle Passenger Car / SUV</option>
                <option value={3}>3-Axle Car with Trailer</option>
                <option value={4}>4-Axle Heavy Duty</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="transp" checked={hasTransponder} onChange={(e) => setHasTransponder(e.target.checked)} className="rounded text-indigo-600" />
              <label htmlFor="transp" className="text-xs font-semibold text-slate-700 cursor-pointer">Electronic Tag (E-ZPass 25% Off)</label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Estimated Toll Fee</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${tollMetrics.finalToll.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Electronic Tag Discount Savings</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${tollMetrics.savings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 20. EV Driving Range Estimator (Dynamic) */}
      {slug === 'ev-driving-range-estimator-dynamic' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="EV Range Actions"
            onReset={() => { setEvBatteryKwh(77); setEvAmbientTempF(70); setEvHighwaySpeed(65); setEvCabinClimate(true); }}
            onCopy={() => safeCopy(`EV Range Simulation:\nEstimated Range: ${evRangeMetrics.estRangeMiles.toFixed(0)} miles\nEfficiency: ${evRangeMetrics.efficiencyMiPerKwh.toFixed(2)} mi/kWh (${evRangeMetrics.baseWhPerMile.toFixed(0)} Wh/mi)`, 'evrange')}
            onDownload={() => downloadTextFile('ev_range_simulation.txt', `EV Range Simulator Report\nBattery Size: ${evBatteryKwh} kWh\nAmbient Temp: ${evAmbientTempF}°F\nCruising Speed: ${evHighwaySpeed} mph\nEstimated Real-World Range: ${evRangeMetrics.estRangeMiles.toFixed(1)} miles`)}
            isCopied={copiedKey === 'evrange'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Battery Usable (kWh)</label>
              <input type="number" value={evBatteryKwh} onChange={(e) => setEvBatteryKwh(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Ambient Temp (°F)</label>
              <input type="number" value={evAmbientTempF} onChange={(e) => setEvAmbientTempF(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Cruising Speed (mph)</label>
              <input type="number" value={evHighwaySpeed} onChange={(e) => setEvHighwaySpeed(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="clim" checked={evCabinClimate} onChange={(e) => setEvCabinClimate(e.target.checked)} className="rounded text-indigo-600" />
              <label htmlFor="clim" className="text-xs font-semibold text-slate-700 cursor-pointer">AC / Heater On</label>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Simulated Highway Range</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{evRangeMetrics.estRangeMiles.toFixed(0)} mi</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Efficiency</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{evRangeMetrics.efficiencyMiPerKwh.toFixed(2)} mi/kWh</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Energy Consumption</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{evRangeMetrics.baseWhPerMile.toFixed(0)} Wh/mi</p>
            </div>
          </div>
        </div>
      )}

      {/* 21. EV Charging Cost Estimator Private */}
      {slug === 'ev-charging-cost-estimator-private' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="EV Charging Actions"
            onReset={() => { setEvCapKwh(75); setEvStartSoc(20); setEvTargetSoc(80); setEvHomeElecRate(0.14); setEvDcFastRate(0.42); }}
            onCopy={() => safeCopy(`EV Charging (${evChargeMetrics.kwhAdded.toFixed(1)} kWh Added):\nHome Charging: $${evChargeMetrics.homeCost.toFixed(2)}\nDC Fast Charger: $${evChargeMetrics.fastCost.toFixed(2)}\nGas Equivalent: $${evChargeMetrics.gasEquivCost.toFixed(2)}`, 'evcost')}
            onDownload={() => downloadTextFile('ev_charging_cost.txt', `EV Charging Cost Specs\nEnergy Added: ${evChargeMetrics.kwhAdded.toFixed(1)} kWh\nHome Level 2 Cost: $${evChargeMetrics.homeCost.toFixed(2)}\nDC Fast Charger Cost: $${evChargeMetrics.fastCost.toFixed(2)}`)}
            isCopied={copiedKey === 'evcost'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Battery (kWh)</label>
              <input type="number" value={evCapKwh} onChange={(e) => setEvCapKwh(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Start SoC (%)</label>
              <input type="number" value={evStartSoc} onChange={(e) => setEvStartSoc(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Target SoC (%)</label>
              <input type="number" value={evTargetSoc} onChange={(e) => setEvTargetSoc(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Home Rate ($/kWh)</label>
              <input type="number" step="0.01" value={evHomeElecRate} onChange={(e) => setEvHomeElecRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Home Charging Cost</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${evChargeMetrics.homeCost.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">DC Fast Charger Cost</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${evChargeMetrics.fastCost.toFixed(2)}</p>
            </div>
            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 text-center">
              <p className="text-xs text-amber-800 font-medium">Gasoline Equivalent</p>
              <p className="text-2xl font-bold font-mono text-amber-700 mt-1">${evChargeMetrics.gasEquivCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 22. Browser Hybrid Vs Electric Savings */}
      {slug === 'browser-hybrid-vs-electric-savings' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Hybrid vs EV Actions"
            onReset={() => { setCompAnnualMiles(15000); setCompGasPrice(3.85); setCompElecRate(0.15); setCompHybridMpg(52); setCompEvMiPerKwh(3.6); }}
            onCopy={() => safeCopy(`Hybrid vs EV Comparison (${compAnnualMiles} mi/yr):\nHybrid Gas: $${hybridEvMetrics.hybridAnnualGasCost.toFixed(2)}/yr\nEV Electricity: $${hybridEvMetrics.evAnnualElecCost.toFixed(2)}/yr\nAnnual EV Savings: $${hybridEvMetrics.annualSavings.toFixed(2)}/yr\n5-Year Savings: $${hybridEvMetrics.fiveYearSavings.toFixed(2)}`, 'hybev')}
            onDownload={() => downloadTextFile('hybrid_vs_ev_savings.txt', `Hybrid vs EV Cost Comparison Specs\nAnnual Distance: ${compAnnualMiles} Miles\nHybrid Annual Fuel: $${hybridEvMetrics.hybridAnnualGasCost.toFixed(2)}\nEV Annual Power: $${hybridEvMetrics.evAnnualElecCost.toFixed(2)}\n5-Year Total EV Net Savings: $${hybridEvMetrics.fiveYearSavings.toFixed(2)}`)}
            isCopied={copiedKey === 'hybev'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Annual Miles</label>
              <input type="number" value={compAnnualMiles} onChange={(e) => setCompAnnualMiles(parseInt(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Gas Price ($/gal)</label>
              <input type="number" step="0.05" value={compGasPrice} onChange={(e) => setCompGasPrice(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Hybrid MPG</label>
              <input type="number" value={compHybridMpg} onChange={(e) => setCompHybridMpg(parseFloat(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Power Rate ($/kWh)</label>
              <input type="number" step="0.01" value={compElecRate} onChange={(e) => setCompElecRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Annual EV Fuel Savings</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${hybridEvMetrics.annualSavings.toFixed(2)}/yr</p>
            </div>
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">5-Year Cumulative Savings</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${hybridEvMetrics.fiveYearSavings.toFixed(2)}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">EV Annual Power Cost</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${hybridEvMetrics.evAnnualElecCost.toFixed(2)}/yr</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
