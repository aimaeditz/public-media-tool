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
  Sliders
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveIndustryToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();

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

  // 5. Universal document & text state
  const [inputText, setInputText] = useState(`Document reference for ${tool.name} - Verified`);

  // Financial / HR / Freelance calculations
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
      profitMargin: grossIncome > 0 ? (((grossIncome - expenseCost) / grossIncome) * 100).toFixed(1) : '0',
    };
  }, [baseAmount, expenseCost, taxRatePct, quantityOrHours]);

  // E-commerce / Inventory calculations
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
      netMargin,
    };
  }, [orderUnits, unitPrice, cogsPercent, shippingOverhead]);

  // Construction, Solar & Engineering calculations
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
      totalWithContingency,
    };
  }, [areaOrCapacity, unitRate, efficiencyFactor]);

  // Marketing & Creator metrics
  const marketingCalc = useMemo(() => {
    const clicks = Math.round(trafficVolume * (ctrPercent / 100));
    const conversions = Math.round(clicks * (conversionRatePercent / 100));
    const estimatedAdRevenue = ((trafficVolume / 1000) * adCpmOrAov).toFixed(2);
    const estimatedSalesValue = (conversions * adCpmOrAov).toFixed(2);

    return {
      clicks: clicks.toLocaleString(),
      conversions: conversions.toLocaleString(),
      adRevenue: estimatedAdRevenue,
      salesValue: estimatedSalesValue,
    };
  }, [trafficVolume, ctrPercent, conversionRatePercent, adCpmOrAov]);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onCopy();
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

  return (
    <div className="space-y-6">
      {/* Top Professional Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span>Professional & Industrial Engine ({tool.category})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-800 text-emerald-300 rounded-full border border-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% In-Browser Privacy
          </span>
        </div>
      </div>

      {/* 1. FINANCIAL / ACCOUNTING / HR / REAL ESTATE */}
      {isFinanceOrHR && (
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
              <span className="text-xs font-semibold text-slate-600 uppercase">Operating Margin</span>
              <p className="text-xl font-bold font-mono text-slate-800">{financeHrCalc.profitMargin}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. E-COMMERCE & INVENTORY */}
      {isEcommerceOrInventory && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Units / Orders</label>
              <input
                type="number"
                value={orderUnits}
                onChange={(e) => setOrderUnits(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Average Unit Price ($)</label>
              <input
                type="number"
                value={unitPrice}
                onChange={(e) => setUnitPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">COGS (%)</label>
              <input
                type="number"
                value={cogsPercent}
                onChange={(e) => setCogsPercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fulfillment / Unit ($)</label>
              <input
                type="number"
                step="0.5"
                value={shippingOverhead}
                onChange={(e) => setShippingOverhead(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Gross Sales</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">${ecommerceCalc.totalSales}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Net Realized Profit</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${ecommerceCalc.netProfit}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Net Margin</span>
              <p className="text-xl font-bold font-mono text-slate-800">{ecommerceCalc.netMargin}%</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ENGINEERING / CONSTRUCTION / SOLAR / AGRICULTURE */}
      {isEngineeringOrConstruction && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Area / Capacity / Metric</label>
              <input
                type="number"
                value={areaOrCapacity}
                onChange={(e) => setAreaOrCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Cost per Unit / Rate ($)</label>
              <input
                type="number"
                value={unitRate}
                onChange={(e) => setUnitRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Yield / Efficiency Factor (%)</label>
              <input
                type="number"
                value={efficiencyFactor}
                onChange={(e) => setEfficiencyFactor(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Estimated Base Cost</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">${engineeringCalc.baseCost}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">With Contingency (10%)</span>
              <p className="text-xl font-bold font-mono text-slate-800">${engineeringCalc.totalWithContingency}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Effective Output Rating</span>
              <p className="text-xl font-bold font-mono text-slate-800">{engineeringCalc.effectiveOutput}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. MARKETING / YOUTUBE CREATOR */}
      {isMarketingOrCreator && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Views / Impressions</label>
              <input
                type="number"
                value={trafficVolume}
                onChange={(e) => setTrafficVolume(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">CTR (%)</label>
              <input
                type="number"
                step="0.1"
                value={ctrPercent}
                onChange={(e) => setCtrPercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={conversionRatePercent}
                onChange={(e) => setConversionRatePercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">CPM / AOV ($)</label>
              <input
                type="number"
                step="0.5"
                value={adCpmOrAov}
                onChange={(e) => setAdCpmOrAov(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Estimated Clicks</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{marketingCalc.clicks}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Conversions / Leads</span>
              <p className="text-xl font-bold font-mono text-slate-800">{marketingCalc.conversions}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Estimated Ad Revenue</span>
              <p className="text-xl font-bold font-mono text-emerald-700">${marketingCalc.adRevenue}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Direct Sales Value</span>
              <p className="text-xl font-bold font-mono text-slate-800">${marketingCalc.salesValue}</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. UNIVERSAL SPECIFICATION & EXPORT */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Specification & Output Note</span>
          <button
            onClick={() => copyText(inputText)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-mono text-slate-800"
        />
      </div>
    </div>
  );
};
