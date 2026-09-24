import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Receipt,
  Building2,
  TrendingUp,
  DollarSign,
  Scale,
  Calendar,
  Layers,
  Copy,
  Check,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Percent,
  ArrowRightLeft,
  ShieldCheck,
  Calculator
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
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

const ActionToolbar: React.FC<ActionToolbarProps> = ({
  label,
  onReset,
  onCopy,
  onDownload,
  downloadLabel = 'Export TXT',
  copyLabel = 'Copy Summary',
  isCopied
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</span>
    <div className="flex flex-wrap items-center gap-2">
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
        </button>
      )}
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied' : copyLabel}</span>
        </button>
      )}
      {onDownload && (
        <button
          type="button"
          onClick={onDownload}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> {downloadLabel}
        </button>
      )}
    </div>
  </div>
);

export const AccountingToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const slug = tool.slug;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, key = 'default') => {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).catch(() => {}); }
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // -------------------------------------------------------------
  // 1. GENERAL LEDGER ENTRY HELPER
  // -------------------------------------------------------------
  const [glEntries, setGlEntries] = useState([
    { id: '1', date: new Date().toISOString().split('T')[0], account: 'Cash & Cash Equivalents', debit: 15000, credit: 0, memo: 'Client upfront retainer payment' },
    { id: '2', date: new Date().toISOString().split('T')[0], account: 'Consulting Revenue', debit: 0, credit: 15000, memo: 'Earned retainer fee' },
    { id: '3', date: new Date().toISOString().split('T')[0], account: 'Office Equipment', debit: 3200, credit: 0, memo: 'Workstations hardware purchase' },
    { id: '4', date: new Date().toISOString().split('T')[0], account: 'Accounts Payable', debit: 0, credit: 3200, memo: 'Hardware vendor invoice #1089' }
  ]);
  const [newGlDate, setNewGlDate] = useState(new Date().toISOString().split('T')[0]);
  const [newGlAccount, setNewGlAccount] = useState('');
  const [newGlDebit, setNewGlDebit] = useState<number | ''>('');
  const [newGlCredit, setNewGlCredit] = useState<number | ''>('');
  const [newGlMemo, setNewGlMemo] = useState('');

  const glTotals = useMemo(() => {
    const debit = glEntries.reduce((sum, e) => sum + (Number(e.debit) || 0), 0);
    const credit = glEntries.reduce((sum, e) => sum + (Number(e.credit) || 0), 0);
    const balanced = Math.abs(debit - credit) < 0.01;
    return { debit, credit, diff: Math.abs(debit - credit), balanced };
  }, [glEntries]);

  const addGlEntry = () => {
    if (!newGlAccount.trim()) return;
    setGlEntries([
      ...glEntries,
      {
        id: Math.random().toString(36).substring(2, 9),
        date: newGlDate,
        account: newGlAccount.trim(),
        debit: Number(newGlDebit) || 0,
        credit: Number(newGlCredit) || 0,
        memo: newGlMemo.trim() || 'General journal transaction'
      }
    ]);
    setNewGlAccount('');
    setNewGlDebit('');
    setNewGlCredit('');
    setNewGlMemo('');
  };

  const formattedGlExport = useMemo(() => {
    let out = 'Date\tAccount Title\tDebit ($)\tCredit ($)\tDescription\n';
    glEntries.forEach((e) => {
      out += `${e.date}\t${e.account}\t${e.debit ? e.debit.toFixed(2) : '-'}\t${e.credit ? e.credit.toFixed(2) : '-'}\t${e.memo}\n`;
    });
    out += `\nTOTALS:\t\t$${glTotals.debit.toFixed(2)}\t$${glTotals.credit.toFixed(2)}\tStatus: ${glTotals.balanced ? 'BALANCED' : 'OUT OF BALANCE'}`;
    return out;
  }, [glEntries, glTotals]);

  // -------------------------------------------------------------
  // 2. BALANCE SHEET CALCULATOR
  // -------------------------------------------------------------
  const [bsCash, setBsCash] = useState(48500);
  const [bsAR, setBsAR] = useState(24000);
  const [bsInventory, setBsInventory] = useState(31500);
  const [bsPrepaid, setBsPrepaid] = useState(4200);
  const [bsPPE, setBsPPE] = useState(115000);
  const [bsIntangibles, setBsIntangibles] = useState(25000);
  // Liabilities
  const [bsAP, setBsAP] = useState(19500);
  const [bsShortDebt, setBsShortDebt] = useState(12000);
  const [bsAccrued, setBsAccrued] = useState(6800);
  const [bsLongDebt, setBsLongDebt] = useState(65000);
  // Equity
  const [bsStock, setBsStock] = useState(50000);
  const [bsRetained, setBsRetained] = useState(90900);

  const bsMetrics = useMemo(() => {
    const currentAssets = bsCash + bsAR + bsInventory + bsPrepaid;
    const nonCurrentAssets = bsPPE + bsIntangibles;
    const totalAssets = currentAssets + nonCurrentAssets;

    const currentLiabilities = bsAP + bsShortDebt + bsAccrued;
    const longTermLiabilities = bsLongDebt;
    const totalLiabilities = currentLiabilities + longTermLiabilities;

    const totalEquity = bsStock + bsRetained;
    const totalLiabAndEquity = totalLiabilities + totalEquity;

    const workingCapital = currentAssets - currentLiabilities;
    const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
    const debtToEquity = totalEquity > 0 ? totalLiabilities / totalEquity : 0;
    const isBalanced = Math.abs(totalAssets - totalLiabAndEquity) < 0.01;

    return {
      currentAssets,
      nonCurrentAssets,
      totalAssets,
      currentLiabilities,
      longTermLiabilities,
      totalLiabilities,
      totalEquity,
      totalLiabAndEquity,
      workingCapital,
      currentRatio,
      debtToEquity,
      isBalanced
    };
  }, [bsCash, bsAR, bsInventory, bsPrepaid, bsPPE, bsIntangibles, bsAP, bsShortDebt, bsAccrued, bsLongDebt, bsStock, bsRetained]);

  // -------------------------------------------------------------
  // 3. PROFIT AND LOSS (P&L) ESTIMATOR
  // -------------------------------------------------------------
  const [plGrossSales, setPlGrossSales] = useState(240000);
  const [plServiceRevenue, setPlServiceRevenue] = useState(45000);
  const [plDiscounts, setPlDiscounts] = useState(5000);
  const [plRawMaterials, setPlRawMaterials] = useState(68000);
  const [plDirectLabor, setPlDirectLabor] = useState(42000);
  const [plShipping, setPlShipping] = useState(8500);
  // Opex
  const [plSalaries, setPlSalaries] = useState(52000);
  const [plMarketing, setPlMarketing] = useState(18000);
  const [plRent, setPlRent] = useState(14400);
  const [plUtilities, setPlUtilities] = useState(6200);
  const [plOtherOpex, setPlOtherOpex] = useState(7500);
  // Below EBIT
  const [plDepreciation, setPlDepreciation] = useState(8000);
  const [plInterestExpense, setPlInterestExpense] = useState(3500);
  const [plTaxRatePct, setPlTaxRatePct] = useState(21);

  const plMetrics = useMemo(() => {
    const netRevenue = plGrossSales + plServiceRevenue - plDiscounts;
    const cogs = plRawMaterials + plDirectLabor + plShipping;
    const grossProfit = netRevenue - cogs;
    const grossMarginPct = netRevenue > 0 ? (grossProfit / netRevenue) * 100 : 0;

    const totalOpex = plSalaries + plMarketing + plRent + plUtilities + plOtherOpex;
    const ebitda = grossProfit - totalOpex;
    const ebit = ebitda - plDepreciation;
    const ebt = ebit - plInterestExpense;
    const taxAmount = ebt > 0 ? ebt * (plTaxRatePct / 100) : 0;
    const netIncome = ebt - taxAmount;
    const netMarginPct = netRevenue > 0 ? (netIncome / netRevenue) * 100 : 0;

    return {
      netRevenue,
      cogs,
      grossProfit,
      grossMarginPct,
      totalOpex,
      ebitda,
      ebit,
      ebt,
      taxAmount,
      netIncome,
      netMarginPct
    };
  }, [plGrossSales, plServiceRevenue, plDiscounts, plRawMaterials, plDirectLabor, plShipping, plSalaries, plMarketing, plRent, plUtilities, plOtherOpex, plDepreciation, plInterestExpense, plTaxRatePct]);

  // -------------------------------------------------------------
  // 4. CASH FLOW PROJECTION (1-12 MONTHS)
  // -------------------------------------------------------------
  const [cfStartingBalance, setCfStartingBalance] = useState(50000);
  const [cfMonthlySales, setCfMonthlySales] = useState(38000);
  const [cfMonthlyReceivables, setCfMonthlyReceivables] = useState(6000);
  const [cfMonthlyPayroll, setCfMonthlyPayroll] = useState(22000);
  const [cfMonthlyVendors, setCfMonthlyVendors] = useState(9500);
  const [cfMonthlyRent, setCfMonthlyRent] = useState(4000);
  const [cfMonthlyTaxLoan, setCfMonthlyTaxLoan] = useState(2500);
  const [cfProjectionMonths, setCfProjectionMonths] = useState(6);

  const cfSchedule = useMemo(() => {
    const schedule = [];
    let currentBalance = cfStartingBalance;
    const monthlyInflow = cfMonthlySales + cfMonthlyReceivables;
    const monthlyOutflow = cfMonthlyPayroll + cfMonthlyVendors + cfMonthlyRent + cfMonthlyTaxLoan;
    const netMonthly = monthlyInflow - monthlyOutflow;

    for (let m = 1; m <= cfProjectionMonths; m++) {
      const openBal = currentBalance;
      const closeBal = openBal + netMonthly;
      schedule.push({
        month: m,
        openBal,
        inflow: monthlyInflow,
        outflow: monthlyOutflow,
        net: netMonthly,
        closeBal
      });
      currentBalance = closeBal;
    }
    const burnRate = monthlyOutflow > monthlyInflow ? monthlyOutflow - monthlyInflow : 0;
    const runwayMonths = burnRate > 0 ? (cfStartingBalance / burnRate).toFixed(1) : 'Infinite / Cash Flow Positive';
    return { schedule, monthlyInflow, monthlyOutflow, netMonthly, finalBalance: currentBalance, burnRate, runwayMonths };
  }, [cfStartingBalance, cfMonthlySales, cfMonthlyReceivables, cfMonthlyPayroll, cfMonthlyVendors, cfMonthlyRent, cfMonthlyTaxLoan, cfProjectionMonths]);

  // -------------------------------------------------------------
  // 5. BANK RECONCILIATION HELPER
  // -------------------------------------------------------------
  const [brBankStatementBal, setBrBankStatementBal] = useState(34250.75);
  const [brDepositsInTransit, setBrDepositsInTransit] = useState(4800.0);
  const [brOutstandingChecks, setBrOutstandingChecks] = useState(2650.5);
  const [brBookBalance, setBrBookBalance] = useState(36780.25);
  const [brInterestEarned, setBrInterestEarned] = useState(45.0);
  const [brBankServiceFees, setBrBankServiceFees] = useState(25.0);
  const [brNsfChecks, setBrNsfChecks] = useState(400.0);

  const brMetrics = useMemo(() => {
    const adjustedBankBal = brBankStatementBal + brDepositsInTransit - brOutstandingChecks;
    const adjustedBookBal = brBookBalance + brInterestEarned - brBankServiceFees - brNsfChecks;
    const variance = Math.abs(adjustedBankBal - adjustedBookBal);
    const isReconciled = variance < 0.01;
    return { adjustedBankBal, adjustedBookBal, variance, isReconciled };
  }, [brBankStatementBal, brDepositsInTransit, brOutstandingChecks, brBookBalance, brInterestEarned, brBankServiceFees, brNsfChecks]);

  // -------------------------------------------------------------
  // 6. DEPRECIATION SCHEDULE CALCULATOR
  // -------------------------------------------------------------
  const [deprCost, setDeprCost] = useState(45000);
  const [deprSalvage, setDeprSalvage] = useState(5000);
  const [deprLifespan, setDeprLifespan] = useState(5);
  const [deprMethod, setDeprMethod] = useState<'straight-line' | 'double-declining' | '150-declining' | 'sum-of-years'>('straight-line');

  const deprSchedule = useMemo(() => {
    const years = Math.max(1, Math.min(30, deprLifespan));
    const cost = Math.max(0, deprCost);
    const salvage = Math.max(0, deprSalvage);
    const depreciableBase = Math.max(0, cost - salvage);

    const rows = [];
    let currentBookValue = cost;
    let accumulated = 0;

    if (deprMethod === 'straight-line') {
      const annualExp = depreciableBase / years;
      for (let y = 1; y <= years; y++) {
        const startVal = currentBookValue;
        const exp = Math.min(annualExp, currentBookValue - salvage);
        accumulated += exp;
        currentBookValue = Math.max(salvage, startVal - exp);
        rows.push({ year: y, startVal, exp, accumulated, endVal: currentBookValue });
      }
    } else if (deprMethod === 'double-declining' || deprMethod === '150-declining') {
      const rate = (deprMethod === 'double-declining' ? 2 : 1.5) / years;
      for (let y = 1; y <= years; y++) {
        const startVal = currentBookValue;
        let exp = startVal * rate;
        if (startVal - exp < salvage) {
          exp = Math.max(0, startVal - salvage);
        }
        accumulated += exp;
        currentBookValue = Math.max(salvage, startVal - exp);
        rows.push({ year: y, startVal, exp, accumulated, endVal: currentBookValue });
      }
    } else if (deprMethod === 'sum-of-years') {
      const syd = (years * (years + 1)) / 2;
      for (let y = 1; y <= years; y++) {
        const startVal = currentBookValue;
        const fraction = (years - y + 1) / syd;
        const exp = depreciableBase * fraction;
        accumulated += exp;
        currentBookValue = Math.max(salvage, startVal - exp);
        rows.push({ year: y, startVal, exp, accumulated, endVal: currentBookValue });
      }
    }

    return rows;
  }, [deprCost, deprSalvage, deprLifespan, deprMethod]);

  // -------------------------------------------------------------
  // 7. BAD DEBT ESTIMATOR (AR AGING METHOD)
  // -------------------------------------------------------------
  const [arCurrent, setArCurrent] = useState(85000);
  const [arRateCurrent, setArRateCurrent] = useState(1.0); // 1%
  const [ar30, setAr30] = useState(32000);
  const [arRate30, setArRate30] = useState(3.5); // 3.5%
  const [ar60, setAr60] = useState(14000);
  const [arRate60, setArRate60] = useState(10.0); // 10%
  const [ar90, setAr90] = useState(6500);
  const [arRate90, setArRate90] = useState(25.0); // 25%
  const [ar120Plus, setAr120Plus] = useState(3800);
  const [arRate120Plus, setArRate120Plus] = useState(60.0); // 60%
  const [existingAllowance, setExistingAllowance] = useState(1200);

  const badDebtMetrics = useMemo(() => {
    const lossCurrent = arCurrent * (arRateCurrent / 100);
    const loss30 = ar30 * (arRate30 / 100);
    const loss60 = ar60 * (arRate60 / 100);
    const loss90 = ar90 * (arRate90 / 100);
    const loss120 = ar120Plus * (arRate120Plus / 100);

    const totalAr = arCurrent + ar30 + ar60 + ar90 + ar120Plus;
    const targetAllowance = lossCurrent + loss30 + loss60 + loss90 + loss120;
    const badDebtExpenseAdjustment = Math.max(0, targetAllowance - existingAllowance);
    const netRealizableAr = totalAr - targetAllowance;
    const overallUncollectiblePct = totalAr > 0 ? (targetAllowance / totalAr) * 100 : 0;

    return {
      totalAr,
      targetAllowance,
      badDebtExpenseAdjustment,
      netRealizableAr,
      overallUncollectiblePct,
      breakdown: [
        { label: 'Current (0-30 days)', amount: arCurrent, rate: arRateCurrent, estimatedLoss: lossCurrent },
        { label: '31-60 days past due', amount: ar30, rate: arRate30, estimatedLoss: loss30 },
        { label: '61-90 days past due', amount: ar60, rate: arRate60, estimatedLoss: loss60 },
        { label: '91-120 days past due', amount: ar90, rate: arRate90, estimatedLoss: loss90 },
        { label: '120+ days past due', amount: ar120Plus, rate: arRate120Plus, estimatedLoss: loss120 }
      ]
    };
  }, [arCurrent, arRateCurrent, ar30, arRate30, ar60, arRate60, ar90, arRate90, ar120Plus, arRate120Plus, existingAllowance]);

  // -------------------------------------------------------------
  // 8. EBITDA MARGIN CALCULATOR DYNAMIC
  // -------------------------------------------------------------
  const [ebRevenue, setEbRevenue] = useState(520000);
  const [ebCogs, setEbCogs] = useState(195000);
  const [ebSga, setEbSga] = useState(145000);
  const [ebDepreciation, setEbDepreciation] = useState(24000);
  const [ebAmortization, setEbAmortization] = useState(8000);
  const [ebEvMultiplier, setEbEvMultiplier] = useState(7.5);

  const ebMetrics = useMemo(() => {
    const grossProfit = ebRevenue - ebCogs;
    const grossMargin = ebRevenue > 0 ? (grossProfit / ebRevenue) * 100 : 0;
    const opex = ebSga;
    const ebitda = grossProfit - opex;
    const ebitdaMargin = ebRevenue > 0 ? (ebitda / ebRevenue) * 100 : 0;
    const ebit = ebitda - ebDepreciation - ebAmortization;
    const ebitMargin = ebRevenue > 0 ? (ebit / ebRevenue) * 100 : 0;
    const enterpriseValueProxy = ebitda > 0 ? ebitda * ebEvMultiplier : 0;

    return { grossProfit, grossMargin, ebitda, ebitdaMargin, ebit, ebitMargin, enterpriseValueProxy };
  }, [ebRevenue, ebCogs, ebSga, ebDepreciation, ebAmortization, ebEvMultiplier]);

  // -------------------------------------------------------------
  // 9. GROSS PROFIT MARGIN CALCULATOR
  // -------------------------------------------------------------
  const [gpSellingPrice, setGpSellingPrice] = useState(120);
  const [gpCostOfGoods, setGpCostOfGoods] = useState(65);
  const [gpUnitsSold, setGpUnitsSold] = useState(500);
  const [gpTargetMarginPct, setGpTargetMarginPct] = useState(55);

  const gpMetrics = useMemo(() => {
    const unitGrossProfit = gpSellingPrice - gpCostOfGoods;
    const grossMarginPct = gpSellingPrice > 0 ? (unitGrossProfit / gpSellingPrice) * 100 : 0;
    const markupPct = gpCostOfGoods > 0 ? (unitGrossProfit / gpCostOfGoods) * 100 : 0;
    const totalBatchRevenue = gpSellingPrice * gpUnitsSold;
    const totalBatchCogs = gpCostOfGoods * gpUnitsSold;
    const totalBatchProfit = unitGrossProfit * gpUnitsSold;
    const targetPriceForDesiredMargin = gpTargetMarginPct < 100 ? gpCostOfGoods / (1 - gpTargetMarginPct / 100) : 0;

    return {
      unitGrossProfit,
      grossMarginPct,
      markupPct,
      totalBatchRevenue,
      totalBatchCogs,
      totalBatchProfit,
      targetPriceForDesiredMargin
    };
  }, [gpSellingPrice, gpCostOfGoods, gpUnitsSold, gpTargetMarginPct]);

  // -------------------------------------------------------------
  // 10. BROWSER NET MARGIN ESTIMATOR
  // -------------------------------------------------------------
  const [nmRevenue, setNmRevenue] = useState(350000);
  const [nmCogs, setNmCogs] = useState(140000);
  const [nmOpex, setNmOpex] = useState(110000);
  const [nmInterest, setNmInterest] = useState(6000);
  const [nmTaxRate, setNmTaxRate] = useState(22);

  const nmMetrics = useMemo(() => {
    const grossProfit = nmRevenue - nmCogs;
    const grossMargin = nmRevenue > 0 ? (grossProfit / nmRevenue) * 100 : 0;
    const operatingProfit = grossProfit - nmOpex;
    const operatingMargin = nmRevenue > 0 ? (operatingProfit / nmRevenue) * 100 : 0;
    const ebt = operatingProfit - nmInterest;
    const tax = ebt > 0 ? ebt * (nmTaxRate / 100) : 0;
    const netIncome = ebt - tax;
    const netMargin = nmRevenue > 0 ? (netIncome / nmRevenue) * 100 : 0;

    return { grossProfit, grossMargin, operatingProfit, operatingMargin, ebt, tax, netIncome, netMargin };
  }, [nmRevenue, nmCogs, nmOpex, nmInterest, nmTaxRate]);

  // -------------------------------------------------------------
  // 11. GST RETURN HELPER UNIVERSAL
  // -------------------------------------------------------------
  const [gstSales18, setGstSales18] = useState(120000);
  const [gstSales12, setGstSales12] = useState(40000);
  const [gstSales5, setGstSales5] = useState(25000);
  const [gstSales0, setGstSales0] = useState(10000);
  const [gstPurchases18, setGstPurchases18] = useState(60000);
  const [gstPurchases12, setGstPurchases12] = useState(20000);
  const [gstPurchases5, setGstPurchases5] = useState(15000);
  const [gstRcmPayable, setGstRcmPayable] = useState(1200);

  const gstMetrics = useMemo(() => {
    const outTax18 = gstSales18 * 0.18;
    const outTax12 = gstSales12 * 0.12;
    const outTax5 = gstSales5 * 0.05;
    const totalOutputGst = outTax18 + outTax12 + outTax5 + gstRcmPayable;

    const inTax18 = gstPurchases18 * 0.18;
    const inTax12 = gstPurchases12 * 0.12;
    const inTax5 = gstPurchases5 * 0.05;
    const totalItc = inTax18 + inTax12 + inTax5;

    const netGstPayable = totalOutputGst - totalItc;
    const totalTaxableTurnover = gstSales18 + gstSales12 + gstSales5 + gstSales0;

    return {
      totalTaxableTurnover,
      totalOutputGst,
      totalItc,
      netGstPayable,
      isRefund: netGstPayable < 0
    };
  }, [gstSales18, gstSales12, gstSales5, gstSales0, gstPurchases18, gstPurchases12, gstPurchases5, gstRcmPayable]);

  // -------------------------------------------------------------
  // 12. EASY TRIAL BALANCE CHECKER
  // -------------------------------------------------------------
  const [tbAccounts, setTbAccounts] = useState([
    { id: '1', name: 'Cash and Bank Balances', category: 'Asset', debit: 38400, credit: 0 },
    { id: '2', name: 'Accounts Receivable', category: 'Asset', debit: 21500, credit: 0 },
    { id: '3', name: 'Merchandise Inventory', category: 'Asset', debit: 45000, credit: 0 },
    { id: '4', name: 'Office & Tech Equipment', category: 'Asset', debit: 55000, credit: 0 },
    { id: '5', name: 'Accounts Payable', category: 'Liability', debit: 0, credit: 22400 },
    { id: '6', name: 'Bank Term Loan', category: 'Liability', debit: 0, credit: 40000 },
    { id: '7', name: 'Common Equity / Capital', category: 'Equity', debit: 0, credit: 65000 },
    { id: '8', name: 'Sales & Service Revenue', category: 'Revenue', debit: 0, credit: 98500 },
    { id: '9', name: 'Cost of Goods Sold (COGS)', category: 'Expense', debit: 36000, credit: 0 },
    { id: '10', name: 'Salaries & Benefits Expense', category: 'Expense', debit: 24000, credit: 0 },
    { id: '11', name: 'Facility Rent & Utilities', category: 'Expense', debit: 6000, credit: 0 }
  ]);
  const [newTbName, setNewTbName] = useState('');
  const [newTbCategory, setNewTbCategory] = useState<'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense'>('Asset');
  const [newTbDebit, setNewTbDebit] = useState<number | ''>('');
  const [newTbCredit, setNewTbCredit] = useState<number | ''>('');

  const tbMetrics = useMemo(() => {
    const totalDebits = tbAccounts.reduce((sum, a) => sum + (Number(a.debit) || 0), 0);
    const totalCredits = tbAccounts.reduce((sum, a) => sum + (Number(a.credit) || 0), 0);
    const difference = Math.abs(totalDebits - totalCredits);
    const isBalanced = difference < 0.01;
    return { totalDebits, totalCredits, difference, isBalanced };
  }, [tbAccounts]);

  const addTbAccount = () => {
    if (!newTbName.trim()) return;
    setTbAccounts([
      ...tbAccounts,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: newTbName.trim(),
        category: newTbCategory,
        debit: Number(newTbDebit) || 0,
        credit: Number(newTbCredit) || 0
      }
    ]);
    setNewTbName('');
    setNewTbDebit('');
    setNewTbCredit('');
  };

  
  
  const formattedTbExport = useMemo(() => {
    let out = 'Account Title\tCategory\tDebit ($)\tCredit ($)\n';
    tbAccounts.forEach((a) => {
      out += `${a.name}\t${a.category}\t${a.debit ? a.debit.toFixed(2) : '-'}\t${a.credit ? a.credit.toFixed(2) : '-'}\n`;
    });
    out += `\nTOTALS:\t\t${tbMetrics.totalDebits.toFixed(2)}\t${tbMetrics.totalCredits.toFixed(2)}\tStatus: ${tbMetrics.isBalanced ? 'BALANCED' : 'OUT OF BALANCE'}`;
    return out;
  }, [tbAccounts, tbMetrics]);

  const resetBsDefaults = () => {
    setBsCash(48500); setBsAR(24000); setBsInventory(31500); setBsPrepaid(4200);
    setBsPPE(115000); setBsIntangibles(25000); setBsAP(19500); setBsShortDebt(12000);
    setBsAccrued(6800); setBsLongDebt(65000); setBsStock(50000); setBsRetained(90900);
  };
  const resetPlDefaults = () => {
    setPlGrossSales(240000); setPlServiceRevenue(45000); setPlDiscounts(5000);
    setPlRawMaterials(68000); setPlDirectLabor(42000); setPlShipping(8500);
    setPlSalaries(52000); setPlMarketing(18000); setPlRent(14400); setPlUtilities(6200);
    setPlOtherOpex(7500); setPlDepreciation(8000); setPlInterestExpense(3500); setPlTaxRatePct(21);
  };
  const resetCfDefaults = () => {
    setCfStartingBalance(50000); setCfMonthlySales(38000); setCfMonthlyReceivables(6000);
    setCfMonthlyPayroll(22000); setCfMonthlyVendors(9500); setCfMonthlyRent(4000);
    setCfMonthlyTaxLoan(2500); setCfProjectionMonths(6);
  };
  const resetBrDefaults = () => {
    setBrBankStatementBal(34250.75); setBrDepositsInTransit(4800.0); setBrOutstandingChecks(2650.5);
    setBrBookBalance(36780.25); setBrInterestEarned(45.0); setBrBankServiceFees(25.0); setBrNsfChecks(400.0);
  };
  const resetDeprDefaults = () => {
    setDeprCost(45000); setDeprSalvage(5000); setDeprLifespan(5); setDeprMethod('straight-line');
  };
  const resetBadDebtDefaults = () => {
    setArCurrent(85000); setArRateCurrent(1.0); setAr30(32000); setArRate30(3.5);
    setAr60(14000); setArRate60(10.0); setAr90(6500); setArRate90(25.0);
    setAr120Plus(3800); setArRate120Plus(60.0); setExistingAllowance(1200);
  };
  const resetEbDefaults = () => {
    setEbRevenue(520000); setEbCogs(195000); setEbSga(145000);
    setEbDepreciation(24000); setEbAmortization(8000); setEbEvMultiplier(7.5);
  };
  const resetGpDefaults = () => {
    setGpSellingPrice(120); setGpCostOfGoods(65); setGpUnitsSold(500); setGpTargetMarginPct(55);
  };
  const resetNmDefaults = () => {
    setNmRevenue(350000); setNmCogs(140000); setNmOpex(110000); setNmInterest(6000); setNmTaxRate(22);
  };
  const resetGstDefaults = () => {
    setGstSales18(120000); setGstSales12(40000); setGstSales5(25000); setGstSales0(10000);
    setGstPurchases18(60000); setGstPurchases12(20000); setGstPurchases5(15000); setGstRcmPayable(1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Receipt className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-bold text-base">{tool.name}</h3>
            <p className="text-xs text-slate-400">{tool.shortDesc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">100% Client-Side Private</span>
      </div>

      {/* 1. UNIVERSAL GENERAL LEDGER ENTRY HELPER */}
      {slug === 'universal-general-ledger-entry-helper' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-800">Add Journal Entry Row</h4>
              <button
                onClick={() => {
                  setGlEntries([]);
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
              >
                Clear All Rows
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Date</label>
                <input type="date" value={newGlDate} onChange={(e) => setNewGlDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block mb-1">Account Title</label>
                <input type="text" placeholder="e.g. Accounts Receivable" value={newGlAccount} onChange={(e) => setNewGlAccount(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Debit ($)</label>
                <input type="number" placeholder="0.00" value={newGlDebit} onChange={(e) => setNewGlDebit(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Credit ($)</label>
                <input type="number" placeholder="0.00" value={newGlCredit} onChange={(e) => setNewGlCredit(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" />
              </div>
            </div>
            <div className="flex gap-3">
              <input type="text" placeholder="Memo / Transaction description" value={newGlMemo} onChange={(e) => setNewGlMemo(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-xs" />
              <button onClick={addGlEntry} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Add Row
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-xs text-slate-700 uppercase">General Ledger Journal ({glEntries.length} entries)</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopyText(formattedGlExport, 'gl')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  {copiedKey === 'gl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'gl' ? 'Copied' : 'Copy Journal'}</span>
                </button>
                <button
                  onClick={() => downloadTextFile('general_ledger_journal.txt', formattedGlExport)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export TXT
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Account Title & Memo</th>
                    <th className="p-3 text-right">Debit ($)</th>
                    <th className="p-3 text-right">Credit ($)</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {glEntries.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono text-slate-500 whitespace-nowrap">{e.date}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{e.account}</div>
                        <div className="text-[11px] text-slate-400">{e.memo}</div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">{e.debit ? `$${e.debit.toFixed(2)}` : '-'}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">{e.credit ? `$${e.credit.toFixed(2)}` : '-'}</td>
                      <td className="p-3 text-center">
                        <button onClick={() => setGlEntries(glEntries.filter((x) => x.id !== e.id))} className="text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-3 text-slate-800">Total Amounts</td>
                    <td className="p-3 text-right font-mono text-emerald-700">${glTotals.debit.toFixed(2)}</td>
                    <td className="p-3 text-right font-mono text-emerald-700">${glTotals.credit.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${glTotals.balanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {glTotals.balanced ? 'Balanced' : 'Discrepancy'}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. BALANCE SHEET CALCULATOR MASTER */}
      {slug === 'balance-sheet-calculator-master' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Balance Sheet Actions"
            onReset={resetBsDefaults}
            onCopy={() => handleCopyText(`Balance Sheet Summary:\nTotal Assets: ${bsMetrics.totalAssets}\nTotal Liabilities: ${bsMetrics.totalLiabilities}\nTotal Equity: ${bsMetrics.totalEquity}\nWorking Capital: ${bsMetrics.workingCapital}\nBalanced: ${bsMetrics.isBalanced}`, 'bs')}
            onDownload={() => downloadTextFile('balance_sheet_summary.txt', `Balance Sheet Summary\n\nTotal Assets: ${bsMetrics.totalAssets}\nTotal Liabilities: ${bsMetrics.totalLiabilities}\nTotal Equity: ${bsMetrics.totalEquity}\nWorking Capital: ${bsMetrics.workingCapital}\nBalanced: ${bsMetrics.isBalanced}`)}
            isCopied={copiedKey === 'bs'}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ASSETS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-800">Assets ($)</h4>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Cash & Equivalents</label>
                <input type="number" value={bsCash} onChange={(e) => setBsCash(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Accounts Receivable</label>
                <input type="number" value={bsAR} onChange={(e) => setBsAR(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Inventory</label>
                <input type="number" value={bsInventory} onChange={(e) => setBsInventory(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Prepaid Expenses</label>
                <input type="number" value={bsPrepaid} onChange={(e) => setBsPrepaid(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">PP&E (Property, Plant, Equip)</label>
                <input type="number" value={bsPPE} onChange={(e) => setBsPPE(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Intangible Assets & Patents</label>
                <input type="number" value={bsIntangibles} onChange={(e) => setBsIntangibles(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            {/* LIABILITIES */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Receipt className="w-4 h-4 text-rose-600" />
                <h4 className="font-bold text-sm text-slate-800">Liabilities ($)</h4>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Accounts Payable</label>
                <input type="number" value={bsAP} onChange={(e) => setBsAP(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Short-Term Notes / Debt</label>
                <input type="number" value={bsShortDebt} onChange={(e) => setBsShortDebt(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Accrued Liabilities & Taxes</label>
                <input type="number" value={bsAccrued} onChange={(e) => setBsAccrued(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Long-Term Debt & Mortgages</label>
                <input type="number" value={bsLongDebt} onChange={(e) => setBsLongDebt(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            {/* EQUITY */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Scale className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-sm text-slate-800">Equity ($)</h4>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Common Stock & Paid-In Capital</label>
                <input type="number" value={bsStock} onChange={(e) => setBsStock(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Retained Earnings</label>
                <input type="number" value={bsRetained} onChange={(e) => setBsRetained(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>
          </div>

          {/* BALANCE SHEET SUMMARY CARD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
              <p className="text-xs text-emerald-800 font-medium">Total Assets</p>
              <p className="text-2xl font-bold font-mono text-emerald-900 mt-1">${bsMetrics.totalAssets.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-700 mt-1">Current: ${bsMetrics.currentAssets.toLocaleString()}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Total Liabilities</p>
              <p className="text-2xl font-bold font-mono text-rose-900 mt-1">${bsMetrics.totalLiabilities.toLocaleString()}</p>
              <p className="text-[11px] text-rose-700 mt-1">Current: ${bsMetrics.currentLiabilities.toLocaleString()}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Total Owner's Equity</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">${bsMetrics.totalEquity.toLocaleString()}</p>
              <p className="text-[11px] text-indigo-700 mt-1">Stock + Retained Earnings</p>
            </div>
            <div className={`p-4 rounded-xl border text-center ${bsMetrics.isBalanced ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'}`}>
              <p className="text-xs font-medium text-slate-700">Accounting Equation</p>
              <p className="text-lg font-bold font-mono mt-1 text-slate-900">{bsMetrics.isBalanced ? 'Assets = Liab + Equity' : 'Out of Balance'}</p>
              <p className="text-[11px] font-semibold text-slate-600 mt-1">Working Capital: ${bsMetrics.workingCapital.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ADVANCED PROFIT AND LOSS ESTIMATOR */}
      {slug === 'advanced-profit-and-loss-estimator' && (
        <div className="space-y-6">
          <ActionToolbar
            label="P&L Statement Actions"
            onReset={resetPlDefaults}
            onCopy={() => handleCopyText(`Profit & Loss Summary:\nNet Revenue: ${plMetrics.netRevenue}\nGross Profit: ${plMetrics.grossProfit} (${plMetrics.grossMarginPct.toFixed(1)}%)\nEBITDA: ${plMetrics.ebitda}\nNet Income: ${plMetrics.netIncome} (${plMetrics.netMarginPct.toFixed(1)}%)`, 'pl')}
            onDownload={() => downloadTextFile('profit_loss_summary.txt', `Profit & Loss Statement\nNet Revenue: ${plMetrics.netRevenue}\nGross Profit: ${plMetrics.grossProfit}\nEBITDA: ${plMetrics.ebitda}\nNet Income: ${plMetrics.netIncome}`)}
            isCopied={copiedKey === 'pl'}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">1. Revenues & Sales ($)</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Gross Product Sales</label>
                <input type="number" value={plGrossSales} onChange={(e) => setPlGrossSales(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Service Revenue</label>
                <input type="number" value={plServiceRevenue} onChange={(e) => setPlServiceRevenue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Returns & Discounts</label>
                <input type="number" value={plDiscounts} onChange={(e) => setPlDiscounts(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">2. Cost of Goods (COGS) ($)</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Direct Raw Materials</label>
                <input type="number" value={plRawMaterials} onChange={(e) => setPlRawMaterials(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Direct Production Labor</label>
                <input type="number" value={plDirectLabor} onChange={(e) => setPlDirectLabor(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Freight & Shipping</label>
                <input type="number" value={plShipping} onChange={(e) => setPlShipping(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">3. Operating Expenses ($)</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Staff Salaries & Admin</label>
                <input type="number" value={plSalaries} onChange={(e) => setPlSalaries(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Advertising & Marketing</label>
                <input type="number" value={plMarketing} onChange={(e) => setPlMarketing(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Office Rent & Utilities</label>
                <input type="number" value={plRent} onChange={(e) => setPlRent(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">Income Tax Rate (%)</label>
                <input type="number" value={plTaxRatePct} onChange={(e) => setPlTaxRatePct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Net Revenue</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${plMetrics.netRevenue.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400">Total Net Sales</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Gross Profit</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">${plMetrics.grossProfit.toLocaleString()}</p>
              <p className="text-[11px] text-indigo-700">{plMetrics.grossMarginPct.toFixed(1)}% Gross Margin</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Operating Income (EBIT)</p>
              <p className="text-2xl font-bold font-mono text-purple-900 mt-1">${plMetrics.ebit.toLocaleString()}</p>
              <p className="text-[11px] text-purple-700">EBITDA: ${plMetrics.ebitda.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Net Income (Bottom Line)</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${plMetrics.netIncome.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600">{plMetrics.netMarginPct.toFixed(1)}% Net Margin</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. CASH FLOW PROJECTION */}
      {slug === 'cash-flow-projection-tool-smart' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Cash Flow Controls"
            onReset={resetCfDefaults}
            onCopy={() => handleCopyText(`Cash Flow Forecast:\nStarting Balance: ${cfStartingBalance}\nMonthly Net: ${cfSchedule.netMonthly}\nEnd Balance: ${cfSchedule.finalBalance}\nRunway: ${cfSchedule.runwayMonths}`, 'cf')}
            onDownload={() => {
              let csv = 'Month,Opening Balance,Inflow,Outflow,Net,Closing Balance\n';
              cfSchedule.schedule.forEach(r => {
                csv += `${r.month},${r.openBal},${r.inflow},${r.outflow},${r.net},${r.closeBal}\n`;
              });
              downloadTextFile('cash_flow_forecast.csv', csv);
            }}
            downloadLabel="Export CSV"
            isCopied={copiedKey === 'cf'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Starting Cash Balance ($)</label>
              <input type="number" value={cfStartingBalance} onChange={(e) => setCfStartingBalance(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Monthly Cash Sales ($)</label>
              <input type="number" value={cfMonthlySales} onChange={(e) => setCfMonthlySales(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Monthly Payroll ($)</label>
              <input type="number" value={cfMonthlyPayroll} onChange={(e) => setCfMonthlyPayroll(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Projection Period (Months)</label>
              <select value={cfProjectionMonths} onChange={(e) => setCfProjectionMonths(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value={3}>3 Months (Quarterly)</option>
                <option value={6}>6 Months (Semi-Annual)</option>
                <option value={12}>12 Months (Annual)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-xs text-slate-700 uppercase">Monthly Cash Flow Forecast</span>
              <span className="text-xs font-mono font-bold text-indigo-700">Estimated Runway: {cfSchedule.runwayMonths}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Period</th>
                    <th className="p-3 text-right">Opening Cash</th>
                    <th className="p-3 text-right">Total Inflow</th>
                    <th className="p-3 text-right">Total Outflow</th>
                    <th className="p-3 text-right">Net Cash Flow</th>
                    <th className="p-3 text-right">Closing Cash</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cfSchedule.schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Month {row.month}</td>
                      <td className="p-3 text-right font-mono text-slate-600">${row.openBal.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-emerald-600">+${row.inflow.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-rose-600">-${row.outflow.toLocaleString()}</td>
                      <td className={`p-3 text-right font-mono font-bold ${row.net >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {row.net >= 0 ? '+' : ''}${row.net.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">${row.closeBal.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. BANK RECONCILIATION HELPER */}
      {slug === 'bank-reconciliation-helper-client-side' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Bank Reconciliation Actions"
            onReset={resetBrDefaults}
            onCopy={() => handleCopyText(`Bank Reconciliation:\nAdjusted Bank Balance: ${brMetrics.adjustedBankBal.toFixed(2)}\nAdjusted Book Balance: ${brMetrics.adjustedBookBal.toFixed(2)}\nVariance: ${brMetrics.variance.toFixed(2)}\nStatus: ${brMetrics.isReconciled ? 'Reconciled' : 'Out of Balance'}`, 'br')}
            onDownload={() => downloadTextFile('bank_reconciliation.txt', `Bank Reconciliation Report\nBank Balance: ${brBankStatementBal}\nBook Balance: ${brBookBalance}\nVariance: ${brMetrics.variance.toFixed(2)}\nStatus: ${brMetrics.isReconciled ? 'Reconciled' : 'Discrepancy'}`)}
            isCopied={copiedKey === 'br'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">Bank Statement Side</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Bank Statement Ending Balance ($)</label>
                <input type="number" step="0.01" value={brBankStatementBal} onChange={(e) => setBrBankStatementBal(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">(+) Deposits in Transit ($)</label>
                <input type="number" step="0.01" value={brDepositsInTransit} onChange={(e) => setBrDepositsInTransit(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">(-) Outstanding Checks ($)</label>
                <input type="number" step="0.01" value={brOutstandingChecks} onChange={(e) => setBrOutstandingChecks(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">Company Book (GL) Side</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">Company Ledger Ending Balance ($)</label>
                <input type="number" step="0.01" value={brBookBalance} onChange={(e) => setBrBookBalance(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">(+) Interest Earned ($)</label>
                <input type="number" step="0.01" value={brInterestEarned} onChange={(e) => setBrInterestEarned(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">(-) Bank Fees & NSF Checks ($)</label>
                <input type="number" step="0.01" value={brBankServiceFees + brNsfChecks} onChange={(e) => setBrBankServiceFees(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Adjusted Bank Balance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${brMetrics.adjustedBankBal.toFixed(2)}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Adjusted Book Balance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${brMetrics.adjustedBookBal.toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded-xl border text-center ${brMetrics.isReconciled ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'}`}>
              <p className="text-xs font-medium text-slate-700">Reconciliation Status</p>
              <p className="text-xl font-bold font-mono mt-1 text-slate-900">{brMetrics.isReconciled ? 'Reconciled (0.00 Variance)' : `Variance: $${brMetrics.variance.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. EASY DEPRECIATION SCHEDULE */}
      {slug === 'easy-depreciation-schedule-calculator' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Depreciation Actions"
            onReset={resetDeprDefaults}
            onCopy={() => handleCopyText(`Depreciation Schedule:\nCost: ${deprCost}\nSalvage: ${deprSalvage}\nLifespan: ${deprLifespan} Years\nMethod: ${deprMethod}`, 'depr')}
            onDownload={() => {
              let csv = 'Year,Beginning Book Value,Depreciation Expense,Accumulated Depr,Ending Book Value\n';
              deprSchedule.forEach(r => {
                csv += `${r.year},${r.startVal.toFixed(2)},${r.exp.toFixed(2)},${r.accumulated.toFixed(2)},${r.endVal.toFixed(2)}\n`;
              });
              downloadTextFile('depreciation_schedule.csv', csv);
            }}
            downloadLabel="Export CSV"
            isCopied={copiedKey === 'depr'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Asset Initial Cost ($)</label>
              <input type="number" value={deprCost} onChange={(e) => setDeprCost(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Salvage / Scrap Value ($)</label>
              <input type="number" value={deprSalvage} onChange={(e) => setDeprSalvage(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Lifespan (Years)</label>
              <input type="number" min={1} max={30} value={deprLifespan} onChange={(e) => setDeprLifespan(parseInt(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Depreciation Method</label>
              <select value={deprMethod} onChange={(e) => setDeprMethod(e.target.value as any)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                <option value="straight-line">Straight Line (SL)</option>
                <option value="double-declining">Double Declining (200% DB)</option>
                <option value="150-declining">150% Declining Balance</option>
                <option value="sum-of-years">Sum of Years' Digits (SYD)</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <span className="font-bold text-xs text-slate-700 uppercase">Yearly Depreciation Schedule</span>
              <button
                onClick={() => {
                  let csv = 'Year,Beginning Value,Depreciation Expense,Accumulated Depreciation,Ending Book Value\n';
                  deprSchedule.forEach((r) => {
                    csv += `${r.year},${r.startVal.toFixed(2)},${r.exp.toFixed(2)},${r.accumulated.toFixed(2)},${r.endVal.toFixed(2)}\n`;
                  });
                  downloadTextFile('depreciation_schedule.csv', csv);
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3 text-right">Beginning Book Value</th>
                  <th className="p-3 text-right">Depreciation Expense</th>
                  <th className="p-3 text-right">Accumulated Depr.</th>
                  <th className="p-3 text-right">Ending Book Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {deprSchedule.map((r) => (
                  <tr key={r.year} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">Year {r.year}</td>
                    <td className="p-3 text-right font-mono text-slate-600">${r.startVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono font-bold text-rose-600">${r.exp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono text-slate-500">${r.accumulated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">${r.endVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. CUSTOM BAD DEBT ESTIMATOR */}
      {slug === 'custom-bad-debt-estimator' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Bad Debt & AR Aging Actions"
            onReset={resetBadDebtDefaults}
            onCopy={() => handleCopyText(`Bad Debt Estimate:\nTotal AR: ${badDebtMetrics.totalAr}\nEstimated Doubtful: ${badDebtMetrics.targetAllowance.toFixed(2)}\nNet Realizable AR: ${badDebtMetrics.netRealizableAr.toFixed(2)}`, 'bd')}
            onDownload={() => downloadTextFile('ar_aging_bad_debt.txt', `AR Aging & Bad Debt Report\nTotal AR: ${badDebtMetrics.totalAr}\nTarget Allowance: ${badDebtMetrics.targetAllowance.toFixed(2)}\nNet Realizable: ${badDebtMetrics.netRealizableAr.toFixed(2)}`)}
            isCopied={copiedKey === 'bd'}
          />
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-800">Accounts Receivable Aging Buckets</h4>
            <div className="space-y-3">
              {badDebtMetrics.breakdown.map((b, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700">{b.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Balance:</span>
                    <input
                      type="number"
                      value={b.amount}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        if (idx === 0) setArCurrent(val);
                        else if (idx === 1) setAr30(val);
                        else if (idx === 2) setAr60(val);
                        else if (idx === 3) setAr90(val);
                        else setAr120Plus(val);
                      }}
                      className="w-full px-2.5 py-1 border rounded bg-white text-xs font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Loss Rate: {b.rate}%</span>
                    <span className="text-xs font-mono font-bold text-rose-700">${b.estimatedLoss.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Total AR Balance</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${badDebtMetrics.totalAr.toLocaleString()}</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Estimated Doubtful Accounts</p>
              <p className="text-2xl font-bold font-mono text-rose-700 mt-1">${badDebtMetrics.targetAllowance.toFixed(2)}</p>
              <p className="text-[11px] text-rose-600 mt-1">{badDebtMetrics.overallUncollectiblePct.toFixed(1)}% of AR</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Net Realizable AR</p>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">${badDebtMetrics.netRealizableAr.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Bad Debt Expense Adjustment</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${badDebtMetrics.badDebtExpenseAdjustment.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. EBITDA MARGIN CALCULATOR DYNAMIC */}
      {slug === 'ebitda-margin-calculator-dynamic' && (
        <div className="space-y-6">
          <ActionToolbar
            label="EBITDA Valuation Actions"
            onReset={resetEbDefaults}
            onCopy={() => handleCopyText(`EBITDA Analysis:\nRevenue: ${ebRevenue}\nEBITDA: ${ebMetrics.ebitda} (${ebMetrics.ebitdaMargin.toFixed(1)}%)\nEBIT: ${ebMetrics.ebit}\nEnterprise Value Proxy: ${ebMetrics.enterpriseValueProxy.toFixed(0)}`, 'eb')}
            onDownload={() => downloadTextFile('ebitda_analysis.txt', `EBITDA Valuation Report\nRevenue: ${ebRevenue}\nEBITDA: ${ebMetrics.ebitda}\nMargin: ${ebMetrics.ebitdaMargin.toFixed(1)}%\nEnterprise Value: ${ebMetrics.enterpriseValueProxy.toFixed(0)}`)}
            isCopied={copiedKey === 'eb'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Total Revenue ($)</label>
              <input type="number" value={ebRevenue} onChange={(e) => setEbRevenue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">COGS ($)</label>
              <input type="number" value={ebCogs} onChange={(e) => setEbCogs(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">SG&A Opex ($)</label>
              <input type="number" value={ebSga} onChange={(e) => setEbSga(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Depreciation ($)</label>
              <input type="number" value={ebDepreciation} onChange={(e) => setEbDepreciation(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Amortization ($)</label>
              <input type="number" value={ebAmortization} onChange={(e) => setEbAmortization(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Gross Profit</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${ebMetrics.grossProfit.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500">{ebMetrics.grossMargin.toFixed(1)}% Margin</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">EBITDA</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">${ebMetrics.ebitda.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600">{ebMetrics.ebitdaMargin.toFixed(1)}% EBITDA Margin</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Operating Income (EBIT)</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">${ebMetrics.ebit.toLocaleString()}</p>
              <p className="text-[11px] text-indigo-600">{ebMetrics.ebitMargin.toFixed(1)}% EBIT Margin</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Valuation Multiple ({ebEvMultiplier}x)</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${ebMetrics.enterpriseValueProxy.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* 9. GROSS PROFIT MARGIN CALCULATOR */}
      {slug === 'gross-profit-margin-calculator-private' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Gross Margin Actions"
            onReset={resetGpDefaults}
            onCopy={() => handleCopyText(`Gross Profit Analysis:\nSelling Price: ${gpSellingPrice}\nUnit Profit: ${gpMetrics.unitGrossProfit.toFixed(2)}\nGross Margin: ${gpMetrics.grossMarginPct.toFixed(2)}%\nMarkup: ${gpMetrics.markupPct.toFixed(2)}%\nBatch Profit: ${gpMetrics.totalBatchProfit}`, 'gp')}
            onDownload={() => downloadTextFile('gross_profit_summary.txt', `Gross Profit Summary\nSelling Price: ${gpSellingPrice}\nUnit Profit: ${gpMetrics.unitGrossProfit.toFixed(2)}\nGross Margin: ${gpMetrics.grossMarginPct.toFixed(2)}%\nMarkup: ${gpMetrics.markupPct.toFixed(2)}%\nTotal Batch Profit: ${gpMetrics.totalBatchProfit}`)}
            isCopied={copiedKey === 'gp'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Selling Price per Unit ($)</label>
              <input type="number" step="0.5" value={gpSellingPrice} onChange={(e) => setGpSellingPrice(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Cost of Goods (COGS/Unit $)</label>
              <input type="number" step="0.5" value={gpCostOfGoods} onChange={(e) => setGpCostOfGoods(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Volume / Units Sold</label>
              <input type="number" value={gpUnitsSold} onChange={(e) => setGpUnitsSold(parseInt(e.target.value) || 1)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Target Gross Margin (%)</label>
              <input type="number" value={gpTargetMarginPct} onChange={(e) => setGpTargetMarginPct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Gross Profit Margin</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{gpMetrics.grossMarginPct.toFixed(2)}%</p>
              <p className="text-[11px] text-emerald-600">${gpMetrics.unitGrossProfit.toFixed(2)} / unit</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Markup on Cost</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{gpMetrics.markupPct.toFixed(2)}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Total Batch Profit</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${gpMetrics.totalBatchProfit.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Target Price for {gpTargetMarginPct}%</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">${gpMetrics.targetPriceForDesiredMargin.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 10. BROWSER NET MARGIN ESTIMATOR */}
      {slug === 'browser-net-margin-estimator' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Net Margin Actions"
            onReset={resetNmDefaults}
            onCopy={() => handleCopyText(`Net Margin Analysis:\nRevenue: ${nmRevenue}\nOperating Margin: ${nmMetrics.operatingMargin.toFixed(1)}%\nNet Income: ${nmMetrics.netIncome} (${nmMetrics.netMargin.toFixed(1)}%)\nTaxes: ${Math.round(nmMetrics.tax)}`, 'nm')}
            onDownload={() => downloadTextFile('net_margin_summary.txt', `Net Margin Summary\nRevenue: ${nmRevenue}\nGross Margin: ${nmMetrics.grossMargin.toFixed(1)}%\nOperating Margin: ${nmMetrics.operatingMargin.toFixed(1)}%\nNet Margin: ${nmMetrics.netMargin.toFixed(1)}%\nNet Income: ${nmMetrics.netIncome}`)}
            isCopied={copiedKey === 'nm'}
          />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Total Revenue ($)</label>
              <input type="number" value={nmRevenue} onChange={(e) => setNmRevenue(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">COGS ($)</label>
              <input type="number" value={nmCogs} onChange={(e) => setNmCogs(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Operating Expenses ($)</label>
              <input type="number" value={nmOpex} onChange={(e) => setNmOpex(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Interest Expense ($)</label>
              <input type="number" value={nmInterest} onChange={(e) => setNmInterest(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Tax Rate (%)</label>
              <input type="number" value={nmTaxRate} onChange={(e) => setNmTaxRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <p className="text-xs text-slate-600 font-medium">Gross Margin</p>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{nmMetrics.grossMargin.toFixed(1)}%</p>
              <p className="text-[11px] text-slate-500">${nmMetrics.grossProfit.toLocaleString()}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Operating Margin</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{nmMetrics.operatingMargin.toFixed(1)}%</p>
              <p className="text-[11px] text-indigo-600">${nmMetrics.operatingProfit.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
              <p className="text-xs text-emerald-800 font-medium">Net Profit Margin</p>
              <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">{nmMetrics.netMargin.toFixed(1)}%</p>
              <p className="text-[11px] text-emerald-600">${nmMetrics.netIncome.toLocaleString()} Net</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <p className="text-xs text-purple-800 font-medium">Estimated Taxes Due</p>
              <p className="text-2xl font-bold font-mono text-purple-700 mt-1">${Math.round(nmMetrics.tax).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* 11. GST RETURN HELPER UNIVERSAL */}
      {slug === 'gst-return-helper-universal' && (
        <div className="space-y-6">
          <ActionToolbar
            label="GST Return Actions"
            onReset={resetGstDefaults}
            onCopy={() => handleCopyText(`GST Tax Return:\nOutput GST Liability: ${gstMetrics.totalOutputGst.toFixed(2)}\nInput Tax Credit (ITC): ${gstMetrics.totalItc.toFixed(2)}\nNet GST Payable: ${Math.abs(gstMetrics.netGstPayable).toFixed(2)}`, 'gst')}
            onDownload={() => downloadTextFile('gst_return_summary.txt', `GST Tax Return Report\nTotal Output GST: ${gstMetrics.totalOutputGst.toFixed(2)}\nTotal ITC: ${gstMetrics.totalItc.toFixed(2)}\nNet GST: ${Math.abs(gstMetrics.netGstPayable).toFixed(2)}`)}
            isCopied={copiedKey === 'gst'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">Outward Supplies / Sales ($)</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">18% GST Slab Sales</label>
                <input type="number" value={gstSales18} onChange={(e) => setGstSales18(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">12% GST Slab Sales</label>
                <input type="number" value={gstSales12} onChange={(e) => setGstSales12(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">5% GST Slab Sales</label>
                <input type="number" value={gstSales5} onChange={(e) => setGstSales5(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">0% Exempt Sales</label>
                <input type="number" value={gstSales0} onChange={(e) => setGstSales0(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-800 border-b pb-2">Inward Purchases (ITC Eligible $)</h4>
              <div className="space-y-2">
                <label className="text-xs text-slate-600 block">18% GST Purchases</label>
                <input type="number" value={gstPurchases18} onChange={(e) => setGstPurchases18(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">12% GST Purchases</label>
                <input type="number" value={gstPurchases12} onChange={(e) => setGstPurchases12(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
                <label className="text-xs text-slate-600 block">5% GST Purchases</label>
                <input type="number" value={gstPurchases5} onChange={(e) => setGstPurchases5(parseFloat(e.target.value) || 0)} className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-center">
              <p className="text-xs text-rose-800 font-medium">Total Output GST Liability</p>
              <p className="text-2xl font-bold font-mono text-rose-900 mt-1">${gstMetrics.totalOutputGst.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
              <p className="text-xs text-indigo-800 font-medium">Input Tax Credit (ITC Available)</p>
              <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">${gstMetrics.totalItc.toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded-xl border text-center ${gstMetrics.isRefund ? 'bg-purple-50 border-purple-300' : 'bg-emerald-50 border-emerald-300'}`}>
              <p className="text-xs font-medium text-slate-700">{gstMetrics.isRefund ? 'GST Refund / Carry Forward' : 'Net GST Payable to Govt'}</p>
              <p className="text-3xl font-bold font-mono mt-1 text-slate-900">${Math.abs(gstMetrics.netGstPayable).toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* 12. EASY TRIAL BALANCE CHECKER */}
      {slug === 'easy-trial-balance-checker' && (
        <div className="space-y-6">
          <ActionToolbar
            label="Trial Balance Actions"
            onReset={() => {
              setTbAccounts([
                { id: '1', name: 'Cash and Cash Equivalents', category: 'Asset', debit: 45000, credit: 0 },
                { id: '2', name: 'Accounts Receivable', category: 'Asset', debit: 18500, credit: 0 },
                { id: '3', name: 'Prepaid Insurance', category: 'Asset', debit: 2400, credit: 0 },
                { id: '4', name: 'Equipment & Computers', category: 'Asset', debit: 32000, credit: 0 },
                { id: '5', name: 'Accounts Payable', category: 'Liability', debit: 0, credit: 14200 },
                { id: '6', name: 'Bank Notes Payable', category: 'Liability', debit: 0, credit: 25000 },
                { id: '7', name: 'Common Stock Equity', category: 'Equity', debit: 0, credit: 50000 },
                { id: '8', name: 'Retained Earnings', category: 'Equity', debit: 0, credit: 8700 },
                { id: '9', name: 'Consulting Services Revenue', category: 'Revenue', debit: 0, credit: 42000 },
                { id: '10', name: 'Salary & Wage Expense', category: 'Expense', debit: 42000, credit: 0 }
              ]);
            }}
            onCopy={() => handleCopyText(`Trial Balance:\nTotal Debits: ${tbMetrics.totalDebits.toFixed(2)}\nTotal Credits: ${tbMetrics.totalCredits.toFixed(2)}\nBalanced: ${tbMetrics.isBalanced}`, 'tb')}
            onDownload={() => downloadTextFile('trial_balance.txt', formattedTbExport)}
            isCopied={copiedKey === 'tb'}
          />
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-800">Add Account to Trial Balance</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 block mb-1">Account Name</label>
                <input type="text" placeholder="e.g. Prepaid Insurance" value={newTbName} onChange={(e) => setNewTbName(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-xs" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Debit Balance ($)</label>
                <input type="number" placeholder="0.00" value={newTbDebit} onChange={(e) => setNewTbDebit(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Credit Balance ($)</label>
                <input type="number" placeholder="0.00" value={newTbCredit} onChange={(e) => setNewTbCredit(e.target.value === '' ? '' : parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg text-xs font-mono" />
              </div>
            </div>
            <button onClick={addTbAccount} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add Account
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Account Title</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-right">Debit Balance ($)</th>
                  <th className="p-3 text-right">Credit Balance ($)</th>
                  <th className="p-3 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tbAccounts.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-800">{a.name}</td>
                    <td className="p-3 text-slate-500">{a.category}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{a.debit ? `$${a.debit.toFixed(2)}` : '-'}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">{a.credit ? `$${a.credit.toFixed(2)}` : '-'}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => setTbAccounts(tbAccounts.filter((x) => x.id !== a.id))} className="text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={2} className="p-3 text-slate-800">Trial Balance Totals</td>
                  <td className="p-3 text-right font-mono text-emerald-700">${tbMetrics.totalDebits.toFixed(2)}</td>
                  <td className="p-3 text-right font-mono text-emerald-700">${tbMetrics.totalCredits.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${tbMetrics.isBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {tbMetrics.isBalanced ? 'Balanced' : 'Out of Balance'}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
