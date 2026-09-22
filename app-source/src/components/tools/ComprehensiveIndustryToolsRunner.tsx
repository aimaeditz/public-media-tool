import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Briefcase,
  Building2,
  Receipt,
  Users,
  ShoppingCart,
  Truck,
  Wrench,
  Hammer,
  SunMedium,
  Sprout,
  Utensils,
  Megaphone,
  Video,
  Copy,
  Check,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  FileCheck2,
  RefreshCw,
  Sliders,
  Scissors,
  Database,
  Calendar,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

export const ComprehensiveIndustryToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const [copiedInternal, setCopiedInternal] = useState(false);

  // 1. Finance, HR, Real Estate & Freelance state
  const [baseAmount, setBaseAmount] = useState<number>(5000);
  const [expenseCost, setExpenseCost] = useState<number>(1200);
  const [taxRatePct, setTaxRatePct] = useState<number>(20);
  const [quantityOrHours, setQuantityOrHours] = useState<number>(40);

  // 2. E-commerce, Inventory, Logistics & Retail state
  const [orderUnits, setOrderUnits] = useState<number>(250);
  const [unitPrice, setUnitPrice] = useState<number>(45);
  const [cogsPercent, setCogsPercent] = useState<number>(35);
  const [shippingOverhead, setShippingOverhead] = useState<number>(5.5);

  // 3. Construction, Solar, Engineering & Agriculture state
  const [areaOrCapacity, setAreaOrCapacity] = useState<number>(1200);
  const [unitRate, setUnitRate] = useState<number>(85);
  const [efficiencyFactor, setEfficiencyFactor] = useState<number>(92);

  // 4. Marketing, Advertising & Creator state
  const [trafficVolume, setTrafficVolume] = useState<number>(25000);
  const [ctrPercent, setCtrPercent] = useState<number>(3.8);
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(2.4);
  const [adCpmOrAov, setAdCpmOrAov] = useState<number>(12.5);

  // 5. Beauty & Salon state
  const [servicePrice, setServicePrice] = useState<number>(75);
  const [productCost, setProductCost] = useState<number>(15);
  const [apptDurationMins, setApptDurationMins] = useState<number>(60);
  const [dailyAppts, setDailyAppts] = useState<number>(6);

  // 6. Data Management state
  const [dataInput, setDataInput] = useState<string>(
    'id,first_name,last_name,email,score\n1,Alice,Smith,alice@example.com,92\n2,Bob,Jones,bob@example.com,85\n3,Alice,Smith,alice@example.com,92\n4,David,Brown,david@example.com,78'
  );
  const [dedupCount, setDedupCount] = useState<number>(0);

  // Calculations
  const financeHrCalc = useMemo(() => {
    const grossIncome = baseAmount;
    const taxableIncome = Math.max(0, grossIncome - expenseCost);
    const taxDeduction = taxableIncome * (taxRatePct / 100);
    const netIncome = taxableIncome - taxDeduction;
    const hourlyRateEquivalent = quantityOrHours > 0 ? (grossIncome / quantityOrHours).toFixed(2) : '0.00';

    return {
      gross: grossIncome.toFixed(2),
      taxDeduction: taxDeduction.toFixed(2),
      net: netIncome.toFixed(2),
      hourly: hourlyRateEquivalent,
      profitMargin: grossIncome > 0 ? (((grossIncome - expenseCost) / grossIncome) * 100).toFixed(1) : '0'
    };
  }, [baseAmount, expenseCost, taxRatePct, quantityOrHours]);

  const ecommerceCalc = useMemo(() => {
    const totalSales = orderUnits * unitPrice;
    const cogsTotal = totalSales * (cogsPercent / 100);
    const totalShipping = orderUnits * shippingOverhead;
    const totalProfit = totalSales - cogsTotal - totalShipping;
    const netMargin = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : '0';

    return {
      totalSales: totalSales.toFixed(2),
      cogsTotal: cogsTotal.toFixed(2),
      totalShipping: totalShipping.toFixed(2),
      netProfit: totalProfit.toFixed(2),
      netMargin
    };
  }, [orderUnits, unitPrice, cogsPercent, shippingOverhead]);

  const engineeringCalc = useMemo(() => {
    const baseCost = areaOrCapacity * unitRate;
    const effectiveOutput = (baseCost * (efficiencyFactor / 100)).toFixed(2);
    const costPerUnit = unitRate.toFixed(2);
    const estContingency = (baseCost * 0.1).toFixed(2);
    const totalWithContingency = (baseCost * 1.1).toFixed(2);

    return {
      baseCost: baseCost.toFixed(2),
      effectiveOutput,
      costPerUnit,
      estContingency,
      totalWithContingency
    };
  }, [areaOrCapacity, unitRate, efficiencyFactor]);

  const marketingCalc = useMemo(() => {
    const clicks = Math.round(trafficVolume * (ctrPercent / 100));
    const conversions = Math.round(clicks * (conversionRatePercent / 100));
    const estimatedAdRevenue = ((trafficVolume / 1000) * adCpmOrAov).toFixed(2);
    const estimatedSalesValue = (conversions * adCpmOrAov).toFixed(2);

    return {
      clicks: clicks.toLocaleString(),
      conversions: conversions.toLocaleString(),
      adRevenue: estimatedAdRevenue,
      salesValue: estimatedSalesValue
    };
  }, [trafficVolume, ctrPercent, conversionRatePercent, adCpmOrAov]);

  const beautyCalc = useMemo(() => {
    const dailyRevenue = dailyAppts * servicePrice;
    const dailyCost = dailyAppts * productCost;
    const dailyNet = dailyRevenue - dailyCost;
    const monthlyNet = dailyNet * 22; // 22 working days
    const totalWorkingHours = (dailyAppts * apptDurationMins) / 60;

    return {
      dailyRevenue: dailyRevenue.toFixed(2),
      dailyNet: dailyNet.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      totalWorkingHours: totalWorkingHours.toFixed(1)
    };
  }, [servicePrice, productCost, apptDurationMins, dailyAppts]);

  // Data management calculation
  const dataProcessed = useMemo(() => {
    const lines = dataInput.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) return { linesCount: lines.length, uniqueRows: lines.length, deduplicated: dataInput };
    const header = lines[0];
    const rows = lines.slice(1);
    const unique = Array.from(new Set(rows));
    return {
      linesCount: rows.length,
      uniqueRows: unique.length,
      duplicatesFound: rows.length - unique.length,
      deduplicated: [header, ...unique].join('\n')
    };
  }, [dataInput]);

  const handleCopyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  // Determine active view mode
  const isFinanceOrHR =
    category === 'Accounting' ||
    category === 'HR & Payroll' ||
    category === 'Freelancing' ||
    category === 'Real Estate' ||
    category === 'Legal Tools' ||
    name.includes('salary') ||
    name.includes('tax') ||
    name.includes('invoice') ||
    name.includes('payroll') ||
    name.includes('commission') ||
    name.includes('depreciation') ||
    name.includes('rent');

  const isEcommerceOrInventory =
    category === 'E-commerce' ||
    category === 'Inventory & Logistics' ||
    category === 'Restaurant & Cafe' ||
    name.includes('inventory') ||
    name.includes('order') ||
    name.includes('shipping') ||
    name.includes('stock') ||
    name.includes('cafe') ||
    name.includes('food');

  const isEngineeringOrConstruction =
    category === 'Engineering' ||
    category === 'Construction' ||
    category === 'Electrical & Solar' ||
    category === 'Agriculture' ||
    category === 'Environment & Energy' ||
    name.includes('solar') ||
    name.includes('concrete') ||
    name.includes('electrical') ||
    name.includes('yield') ||
    name.includes('capacity');

  const isMarketingOrCreator =
    category === 'Marketing & Advertising' ||
    category === 'YouTube Creator Tools' ||
    name.includes('youtube') ||
    name.includes('ad') ||
    name.includes('cpm') ||
    name.includes('click') ||
    name.includes('campaign');

  const isBeauty =
    category === 'Beauty & Salon' ||
    slug.includes('beauty') ||
    slug.includes('salon') ||
    slug.includes('hair') ||
    slug.includes('spa');

  const isDataMgmt =
    category === 'Data Management' ||
    slug.includes('dedup') ||
    slug.includes('schema') ||
    slug.includes('reorder') ||
    slug.includes('normalization');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full">
                Industry Native Logic
              </span>
            </h2>
            <p className="text-sm text-slate-500">
              Specialized domain metrics and client-side computational workflows.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleCopyText(
                JSON.stringify({ financeHrCalc, ecommerceCalc, engineeringCalc, marketingCalc, beautyCalc }, null, 2)
              )
            }
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* BEAUTY & SALON */}
      {isBeauty && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Scissors className="w-5 h-5 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Salon & Service Profitability Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Service Price ($)</label>
              <input
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Product Cost ($)</label>
              <input
                type="number"
                value={productCost}
                onChange={(e) => setProductCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Duration (Minutes)</label>
              <input
                type="number"
                value={apptDurationMins}
                onChange={(e) => setApptDurationMins(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Daily Clients</label>
              <input
                type="number"
                value={dailyAppts}
                onChange={(e) => setDailyAppts(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 text-center space-y-1">
              <span className="text-xs font-semibold text-rose-800 uppercase">Daily Gross</span>
              <p className="text-2xl font-extrabold font-mono text-rose-700">${beautyCalc.dailyRevenue}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Daily Net Margin</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${beautyCalc.dailyNet}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Monthly Net (22d)</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${beautyCalc.monthlyNet}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Service Time</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{beautyCalc.totalWorkingHours} hrs/day</p>
            </div>
          </div>
        </div>
      )}

      {/* DATA MANAGEMENT */}
      {isDataMgmt && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Database className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Data Deduplication & Schema Inspector</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Source Data (CSV / Rows)</label>
              <textarea
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                rows={6}
                className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Deduplicated Output ({dataProcessed.uniqueRows} unique records)</label>
                <span className="text-xs text-indigo-600 font-bold">{dataProcessed.duplicatesFound} duplicates cleaned</span>
              </div>
              <textarea
                readOnly
                value={dataProcessed.deduplicated}
                rows={6}
                className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* 1. FINANCIAL / ACCOUNTING / HR / REAL ESTATE */}
      {isFinanceOrHR && !isBeauty && !isDataMgmt && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Gross Amount / Fee ($)</label>
              <input
                type="number"
                value={baseAmount}
                onChange={(e) => setBaseAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Deductions / Expenses ($)</label>
              <input
                type="number"
                value={expenseCost}
                onChange={(e) => setExpenseCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Withholding / Tax (%)</label>
              <input
                type="number"
                value={taxRatePct}
                onChange={(e) => setTaxRatePct(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Time Units / Hours</label>
              <input
                type="number"
                value={quantityOrHours}
                onChange={(e) => setQuantityOrHours(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Estimated Net Take-Home</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">${financeHrCalc.net}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Estimated Tax</span>
              <p className="text-xl font-bold font-mono text-slate-800">${financeHrCalc.taxDeduction}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Effective Rate / Hr</span>
              <p className="text-xl font-bold font-mono text-slate-800">${financeHrCalc.hourly}/hr</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Net Margin</span>
              <p className="text-xl font-bold font-mono text-slate-800">{financeHrCalc.profitMargin}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. E-COMMERCE / INVENTORY */}
      {isEcommerceOrInventory && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Order Quantity (Units)</label>
              <input
                type="number"
                value={orderUnits}
                onChange={(e) => setOrderUnits(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Retail Unit Price ($)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">COGS (%)</label>
              <input
                type="number"
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Shipping Overhead ($/unit)</label>
              <input
                type="number"
                step="0.1"
                value={shippingOverhead}
                onChange={(e) => setShippingOverhead(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Gross Revenue</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${ecommerceCalc.totalSales}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total COGS</span>
              <p className="text-xl font-bold font-mono text-slate-800">${ecommerceCalc.cogsTotal}</p>
            </div>
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">Net Profit</span>
              <p className="text-2xl font-extrabold font-mono text-teal-700">${ecommerceCalc.netProfit}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Profit Margin</span>
              <p className="text-xl font-bold font-mono text-slate-800">{ecommerceCalc.netMargin}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ENGINEERING & CONSTRUCTION & AGRICULTURE */}
      {isEngineeringOrConstruction && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Area / Capacity / Volume</label>
              <input
                type="number"
                value={areaOrCapacity}
                onChange={(e) => setAreaOrCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Unit Rate / Yield ($)</label>
              <input
                type="number"
                value={unitRate}
                onChange={(e) => setUnitRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Efficiency / Quality (%)</label>
              <input
                type="number"
                value={efficiencyFactor}
                onChange={(e) => setEfficiencyFactor(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-center space-y-1">
              <span className="text-xs font-semibold text-amber-800 uppercase">Base Estimate</span>
              <p className="text-2xl font-extrabold font-mono text-amber-700">${engineeringCalc.baseCost}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Contingency Reserve (10%)</span>
              <p className="text-xl font-bold font-mono text-slate-800">${engineeringCalc.estContingency}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Total Required Budget</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${engineeringCalc.totalWithContingency}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
