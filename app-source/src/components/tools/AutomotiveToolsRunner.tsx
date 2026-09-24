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
  Sparkles
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
          <span>Reset Defaults</span>
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
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // -------------------------------------------------------------
  // 47. FUEL COST CALCULATOR
  // -------------------------------------------------------------
  const [fuelDistance, setFuelDistance] = useState(350); // miles
  const [fuelMpg, setFuelMpg] = useState(28); // MPG
  const [fuelPricePerGal, setFuelPricePerGal] = useState(3.65); // $/gal
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

  // -------------------------------------------------------------
  // 48. VEHICLE MILEAGE ESTIMATOR
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // 49. CAR LOAN PAYMENT CALCULATOR MASTER
  // -------------------------------------------------------------
  const [carPrice, setCarPrice] = useState(32000);
  const [carDownPayment, setCarDownPayment] = useState(5000);
  const [carTradeIn, setCarTradeIn] = useState(2000);
  const [carTaxRate, setCarTaxRate] = useState(7.5); // %
  const [carInterestRate, setCarInterestRate] = useState(5.99); // APR %
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

  // -------------------------------------------------------------
  // 50. ADVANCED CAR INSURANCE ESTIMATOR
  // -------------------------------------------------------------
  const [vehicleValue, setVehicleValue] = useState(28000);
  const [driverAgeGroup, setDriverAgeGroup] = useState<'young' | 'adult' | 'senior'>('adult');
  const [coverageTier, setCoverageTier] = useState<'liability' | 'standard' | 'full'>('full');
  const [deductible, setDeductible] = useState<number>(1000);
  const [annualMiles, setAnnualMiles] = useState<number>(12000);

  const insuranceMetrics = useMemo(() => {
    let baseAnnual = vehicleValue * 0.04; // 4% base vehicle value
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

  return (
    <div className="space-y-6">
      {/* 47. FUEL COST CALCULATOR */}
      {slug === 'universal-fuel-cost-calculator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Fuel Calculator Actions"
            onReset={() => { setFuelDistance(350); setFuelMpg(28); setFuelPricePerGal(3.65); setFuelRoundTrip(true); setFuelPassengers(2); }}
            onCopy={() => safeCopy(`Fuel Cost Estimate:\\nDistance: ${fuelMetrics.totalDist} miles\\nGallons: ${fuelMetrics.gallonsNeeded.toFixed(1)} gal\\nTotal Cost: $${fuelMetrics.totalCost.toFixed(2)}\\nCost Per Person: $${fuelMetrics.costPerPerson.toFixed(2)}`, 'fuel')}
            onDownload={() => downloadTextFile('fuel_cost_estimate.txt', `Universal Fuel Cost Calculator Specs\\nTotal Distance: ${fuelMetrics.totalDist} mi\\nFuel Required: ${fuelMetrics.gallonsNeeded.toFixed(2)} gal\\nFuel Price: $${fuelPricePerGal.toFixed(2)}/gal\\nTotal Fuel Cost: $${fuelMetrics.totalCost.toFixed(2)}\\nCost per Mile: $${fuelMetrics.costPerMile.toFixed(2)}/mi\\nCost per Person (${fuelPassengers} pax): $${fuelMetrics.costPerPerson.toFixed(2)}`)}
            isCopied={copiedKey === 'fuel'}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">One-Way Distance (miles)</label>
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
              <label className="text-xs font-semibold text-slate-600 block mb-1">Passengers Split</label>
              <input type="number" min={1} value={fuelPassengers} onChange={(e) => setFuelPassengers(parseInt(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-slate-200">
            <input type="checkbox" id="rt" checked={fuelRoundTrip} onChange={(e) => setFuelRoundTrip(e.target.checked)} className="rounded text-indigo-600" />
            <label htmlFor="rt" className="text-xs font-semibold text-slate-700 cursor-pointer">Round-Trip (Double Distance)</label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Total Distance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{fuelMetrics.totalDist} mi</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Fuel Consumption</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{fuelMetrics.gallonsNeeded.toFixed(1)} gal</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Total Fuel Cost</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${fuelMetrics.totalCost.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Cost per Passenger</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${fuelMetrics.costPerPerson.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 48. VEHICLE MILEAGE ESTIMATOR */}
      {slug === 'online-vehicle-mileage-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Mileage Estimator Actions"
            onReset={() => { setOdometerStart(45200); setOdometerEnd(45580); setFuelAddedGal(12.8); setFuelUnitCost(3.75); }}
            onCopy={() => safeCopy(`Vehicle Mileage Metrics:\\nTrip Distance: ${mileageMetrics.tripDistance} miles\\nEconomy: ${mileageMetrics.mpg.toFixed(1)} MPG (${mileageMetrics.lPer100km.toFixed(1)} L/100km)\\nTrip Cost: $${mileageMetrics.tripCost.toFixed(2)}\\nCost Per Mile: $${mileageMetrics.costPerMile.toFixed(2)}/mi`, 'mileage')}
            onDownload={() => downloadTextFile('vehicle_mileage_report.txt', `Vehicle Mileage Estimator Report\\nOdometer Start: ${odometerStart}\\nOdometer End: ${odometerEnd}\\nTrip Distance: ${mileageMetrics.tripDistance} miles\\nFuel Added: ${fuelAddedGal} gal\\nEconomy: ${mileageMetrics.mpg.toFixed(2)} MPG (${mileageMetrics.lPer100km.toFixed(2)} L/100km)\\nTrip Cost: $${mileageMetrics.tripCost.toFixed(2)}\\nCost/Mile: $${mileageMetrics.costPerMile.toFixed(2)}/mi`)}
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
              <label className="text-xs font-semibold text-slate-600 block mb-1">Fuel Added (Gallons)</label>
              <input type="number" step="0.1" value={fuelAddedGal} onChange={(e) => setFuelAddedGal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Gas Price ($/gal)</label>
              <input type="number" step="0.05" value={fuelUnitCost} onChange={(e) => setFuelUnitCost(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Trip Distance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{mileageMetrics.tripDistance} mi</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Calculated MPG</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{mileageMetrics.mpg.toFixed(1)} MPG</p>
              <p className="text-[11px] text-emerald-600">{mileageMetrics.lPer100km.toFixed(1)} L/100km</p>
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

      {/* 49. CAR LOAN PAYMENT CALCULATOR MASTER */}
      {slug === 'car-loan-payment-calculator-master' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Car Loan Actions"
            onReset={() => { setCarPrice(32000); setCarDownPayment(5000); setCarTradeIn(2000); setCarTaxRate(7.5); setCarInterestRate(5.99); setCarLoanTermMonths(60); }}
            onCopy={() => safeCopy(`Car Loan Estimate:\\nMonthly Payment: $${carLoanMetrics.monthlyPayment.toFixed(2)}/mo\\nAmount Financed: $${carLoanMetrics.totalFinanced.toLocaleString()}\\nTotal Interest: $${carLoanMetrics.totalInterest.toFixed(2)}\\nTotal Out of Pocket: $${(carLoanMetrics.totalPaid + carDownPayment).toFixed(2)}`, 'loan')}
            onDownload={() => downloadTextFile('car_loan_schedule.txt', `Car Loan Payment Calculator Specs\\nVehicle Price: $${carPrice.toLocaleString()}\\nDown Payment: $${carDownPayment.toLocaleString()}\\nTrade-In: $${carTradeIn.toLocaleString()}\\nSales Tax: ${carTaxRate}% ($${carLoanMetrics.taxAmount.toFixed(2)})\\nAmount Financed: $${carLoanMetrics.totalFinanced.toLocaleString()}\\nInterest Rate: ${carInterestRate}% APR\\nLoan Term: ${carLoanTermMonths} Months\\n\\nMonthly Payment: $${carLoanMetrics.monthlyPayment.toFixed(2)}/mo\\nTotal Interest: $${carLoanMetrics.totalInterest.toFixed(2)}\\nTotal Cost: $${(carLoanMetrics.totalPaid + carDownPayment).toFixed(2)}`)}
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
              <label className="text-xs font-semibold text-slate-600 block mb-1">Trade-In Allowance ($)</label>
              <input type="number" value={carTradeIn} onChange={(e) => setCarTradeIn(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Sales Tax Rate (%)</label>
              <input type="number" value={carTaxRate} onChange={(e) => setCarTaxRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Interest Rate (APR %)</label>
              <input type="number" step="0.1" value={carInterestRate} onChange={(e) => setCarInterestRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Term Duration</label>
              <select value={carLoanTermMonths} onChange={(e) => setCarLoanTermMonths(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={72}>72 Months (6 Years)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Monthly Payment</p>
              <p className="text-3xl font-bold font-mono text-indigo-700 mt-1">${carLoanMetrics.monthlyPayment.toFixed(2)}/mo</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Amount Financed</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${carLoanMetrics.totalFinanced.toLocaleString()}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Total Interest Paid</p>
              <p className="text-2xl font-bold font-mono text-rose-700 mt-1">${carLoanMetrics.totalInterest.toFixed(2)}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Total Out-of-Pocket Cost</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">${(carLoanMetrics.totalPaid + carDownPayment).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 50. ADVANCED CAR INSURANCE ESTIMATOR */}
      {slug === 'advanced-car-insurance-estimator' && (
        <div className="space-y-6">
          <AutoActionToolbar
            label="Insurance Estimator Actions"
            onReset={() => { setVehicleValue(28000); setDriverAgeGroup('adult'); setCoverageTier('full'); setDeductible(1000); setAnnualMiles(12000); }}
            onCopy={() => safeCopy(`Car Insurance Estimate:\\nMonthly Premium: $${insuranceMetrics.monthlyPremium.toFixed(2)}/mo\\nAnnual Premium: $${insuranceMetrics.annualPremium.toFixed(2)}/yr\\nTier: ${coverageTier} | Deductible: $${deductible}`, 'insurance')}
            onDownload={() => downloadTextFile('insurance_estimate.txt', `Advanced Car Insurance Estimator Specs\\nVehicle Value: $${vehicleValue.toLocaleString()}\\nDriver Age: ${driverAgeGroup}\\nCoverage: ${coverageTier}\\nDeductible: $${deductible}\\nAnnual Miles: ${annualMiles}\\n\\nEstimated Monthly Premium: $${insuranceMetrics.monthlyPremium.toFixed(2)}/mo\\nEstimated Annual Premium: $${insuranceMetrics.annualPremium.toFixed(2)}/yr`)}
            isCopied={copiedKey === 'insurance'}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Market Value ($)</label>
              <input type="number" value={vehicleValue} onChange={(e) => setVehicleValue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Driver Age Profile</label>
              <select value={driverAgeGroup} onChange={(e) => setDriverAgeGroup(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="young">Young Driver (&lt; 25)</option>
                <option value="adult">Adult Driver (25 - 65)</option>
                <option value="senior">Senior Driver (&gt; 65)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Coverage Tier</label>
              <select value={coverageTier} onChange={(e) => setCoverageTier(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="liability">State Minimum Liability</option>
                <option value="standard">Standard Collision</option>
                <option value="full">Full Comprehensive</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Deductible ($)</label>
              <select value={deductible} onChange={(e) => setDeductible(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={500}>$500 Deductible</option>
                <option value={1000}>$1,000 Deductible</option>
                <option value={2000}>$2,000 Deductible</option>
              </select>
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
    </div>
  );
};
