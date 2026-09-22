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
  Download,
  Plane,
  Heart,
  Camera,
  Music,
  Dog,
  Landmark,
  Network,
  Clock,
  PieChart
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

  // 7. Travel Tools state
  const [travelDistance, setTravelDistance] = useState<number>(850);
  const [travelMpg, setTravelMpg] = useState<number>(28);
  const [fuelPricePerGal, setFuelPricePerGal] = useState<number>(3.65);
  const [travelersCount, setTravelersCount] = useState<number>(4);
  const [hotelPerNight, setHotelPerNight] = useState<number>(160);
  const [travelDays, setTravelDays] = useState<number>(5);

  // 8. Wedding & Event state
  const [eventGuests, setEventGuests] = useState<number>(120);
  const [cateringPerHead, setCateringPerHead] = useState<number>(55);
  const [venueCost, setVenueCost] = useState<number>(3200);
  const [vendorsCost, setVendorsCost] = useState<number>(2800);

  // 9. Photography & Music state
  const [focalLengthMm, setFocalLengthMm] = useState<number>(50);
  const [apertureF, setApertureF] = useState<number>(2.8);
  const [subjectDistanceM, setSubjectDistanceM] = useState<number>(3.5);
  const [musicBpm, setMusicBpm] = useState<number>(124);

  // 10. Pets & Animals state
  const [petWeightKg, setPetWeightKg] = useState<number>(22);
  const [petAgeYears, setPetAgeYears] = useState<number>(4);
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat'>('dog');

  // 11. Project Management & Office Admin state
  const [storyPoints, setStoryPoints] = useState<number>(100);
  const [velocityPerSprint, setVelocityPerSprint] = useState<number>(25);
  const [sprintWeeks, setSprintWeeks] = useState<number>(2);
  const [devHourlyRate, setDevHourlyRate] = useState<number>(65);

  // 12. Networking state
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.100');
  const [cidrMask, setCidrMask] = useState<number>(24);
  const [transferFileSizeMb, setTransferFileSizeMb] = useState<number>(2500);
  const [bandwidthSpeedMbps, setBandwidthSpeedMbps] = useState<number>(100);

  // ================= CALCULATIONS =================

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
    const monthlyNet = dailyNet * 22;
    const totalWorkingHours = (dailyAppts * apptDurationMins) / 60;

    return {
      dailyRevenue: dailyRevenue.toFixed(2),
      dailyNet: dailyNet.toFixed(2),
      monthlyNet: monthlyNet.toFixed(2),
      totalWorkingHours: totalWorkingHours.toFixed(1)
    };
  }, [servicePrice, productCost, apptDurationMins, dailyAppts]);

  const travelCalc = useMemo(() => {
    const gallonsNeeded = travelMpg > 0 ? travelDistance / travelMpg : 0;
    const totalFuelCost = gallonsNeeded * fuelPricePerGal;
    const totalLodging = (Math.max(1, travelDays - 1)) * hotelPerNight;
    const grandTotal = totalFuelCost + totalLodging;
    const perPerson = travelersCount > 0 ? grandTotal / travelersCount : grandTotal;
    const carbonKg = Math.round(gallonsNeeded * 8.887);

    return {
      fuelCost: totalFuelCost.toFixed(2),
      totalLodging: totalLodging.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      perPerson: perPerson.toFixed(2),
      carbonKg
    };
  }, [travelDistance, travelMpg, fuelPricePerGal, travelersCount, hotelPerNight, travelDays]);

  const eventCalc = useMemo(() => {
    const cateringTotal = eventGuests * cateringPerHead;
    const drinkServings = eventGuests * 4;
    const wineBottles = Math.ceil(drinkServings / 5);
    const grandTotal = cateringTotal + venueCost + vendorsCost;
    const perGuest = eventGuests > 0 ? grandTotal / eventGuests : grandTotal;

    return {
      cateringTotal: cateringTotal.toFixed(2),
      wineBottles,
      grandTotal: grandTotal.toFixed(2),
      perGuest: perGuest.toFixed(2)
    };
  }, [eventGuests, cateringPerHead, venueCost, vendorsCost]);

  const photoMusicCalc = useMemo(() => {
    // Hyperfocal distance (approx CoC = 0.03mm for full-frame)
    const H_meters = (focalLengthMm * focalLengthMm) / (apertureF * 0.03 * 1000);
    const msPerBeat = musicBpm > 0 ? (60000 / musicBpm) : 500;
    const msDottedEighth = msPerBeat * 0.75;
    const msSixteenth = msPerBeat * 0.25;

    return {
      hyperfocalM: H_meters.toFixed(2),
      msPerBeat: msPerBeat.toFixed(1),
      msDottedEighth: msDottedEighth.toFixed(1),
      msSixteenth: msSixteenth.toFixed(1)
    };
  }, [focalLengthMm, apertureF, musicBpm]);

  const petCalc = useMemo(() => {
    // RER = 70 * (bodyWeightKg ^ 0.75)
    const rer = 70 * Math.pow(petWeightKg, 0.75);
    const dailyKcal = petSpecies === 'dog' ? Math.round(rer * 1.6) : Math.round(rer * 1.2);
    const humanAge = petSpecies === 'dog'
      ? (petAgeYears === 1 ? 15 : petAgeYears === 2 ? 24 : 24 + (petAgeYears - 2) * 4.5)
      : (petAgeYears === 1 ? 15 : petAgeYears === 2 ? 24 : 24 + (petAgeYears - 2) * 4);
    const dailyWaterMl = Math.round(petWeightKg * 55);

    return {
      dailyKcal,
      humanAge: Math.round(humanAge),
      dailyWaterMl
    };
  }, [petWeightKg, petAgeYears, petSpecies]);

  const projectCalc = useMemo(() => {
    const requiredSprints = velocityPerSprint > 0 ? Math.ceil(storyPoints / velocityPerSprint) : 0;
    const totalWeeks = requiredSprints * sprintWeeks;
    const totalDevHours = storyPoints * 6; // approx 6 hrs/point
    const estimatedCost = totalDevHours * devHourlyRate;

    return {
      requiredSprints,
      totalWeeks,
      totalDevHours,
      estimatedCost: estimatedCost.toLocaleString()
    };
  }, [storyPoints, velocityPerSprint, sprintWeeks, devHourlyRate]);

  const networkCalc = useMemo(() => {
    const totalHosts = Math.pow(2, 32 - cidrMask);
    const usableHosts = Math.max(0, totalHosts - 2);
    const speedBytesPerSec = (bandwidthSpeedMbps * 1000 * 1000) / 8;
    const fileBytes = transferFileSizeMb * 1024 * 1024;
    const transferSeconds = speedBytesPerSec > 0 ? fileBytes / speedBytesPerSec : 0;
    const mins = Math.floor(transferSeconds / 60);
    const secs = Math.round(transferSeconds % 60);

    return {
      totalHosts,
      usableHosts,
      transferTime: `${mins}m ${secs}s`
    };
  }, [cidrMask, bandwidthSpeedMbps, transferFileSizeMb]);

  const dataProcessed = useMemo(() => {
    const lines = dataInput.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) return { linesCount: lines.length, uniqueRows: lines.length, duplicatesFound: 0, deduplicated: dataInput };
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

  const downloadCsv = () => {
    const blob = new Blob([dataProcessed.deduplicated], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deduplicated_data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Determine active view mode
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

  const isMarketingOrCreator =
    category === 'Marketing & Advertising' ||
    category === 'YouTube Creator Tools' ||
    name.includes('youtube') ||
    name.includes('ad') ||
    name.includes('cpm') ||
    name.includes('click') ||
    name.includes('campaign') ||
    name.includes('marketing') ||
    name.includes('creator');

  const isTravel =
    category === 'Travel Tools' ||
    slug.includes('travel') ||
    slug.includes('trip') ||
    slug.includes('flight') ||
    slug.includes('hotel') ||
    slug.includes('vacation') ||
    slug.includes('mileage');

  const isWeddingEvent =
    category === 'Wedding & Event' ||
    slug.includes('wedding') ||
    slug.includes('event') ||
    slug.includes('party') ||
    slug.includes('catering') ||
    slug.includes('seating');

  const isPhotoMusic =
    category === 'Photography' ||
    category === 'Music Production' ||
    slug.includes('photo') ||
    slug.includes('camera') ||
    slug.includes('aperture') ||
    slug.includes('lens') ||
    slug.includes('music') ||
    slug.includes('bpm') ||
    slug.includes('audio-delay');

  const isPets =
    category === 'Pets & Animals' ||
    slug.includes('pet') ||
    slug.includes('dog') ||
    slug.includes('cat') ||
    slug.includes('animal') ||
    slug.includes('vet');

  const isProjectOrOffice =
    category === 'Project Management' ||
    category === 'Office Administration' ||
    category === 'Government & Public Services' ||
    slug.includes('project') ||
    slug.includes('sprint') ||
    slug.includes('agile') ||
    slug.includes('velocity') ||
    slug.includes('admin') ||
    slug.includes('public') ||
    slug.includes('government');

  const isNetworking =
    category === 'Networking' ||
    slug.includes('network') ||
    slug.includes('subnet') ||
    slug.includes('cidr') ||
    slug.includes('ip-') ||
    slug.includes('bandwidth');

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
    name.includes('rent') ||
    (!isBeauty && !isDataMgmt && !isMarketingOrCreator && !isTravel && !isWeddingEvent && !isPhotoMusic && !isPets && !isProjectOrOffice && !isNetworking && !isEcommerceOrInventory && !isEngineeringOrConstruction);

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
                JSON.stringify({ financeHrCalc, ecommerceCalc, engineeringCalc, marketingCalc, beautyCalc, travelCalc, eventCalc, projectCalc, networkCalc }, null, 2)
              )
            }
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* 1. MARKETING, ADVERTISING & CREATOR */}
      {isMarketingOrCreator && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Megaphone className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Marketing & Creator Campaign Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Audience / Impressions / Views</label>
              <input
                type="number"
                value={trafficVolume}
                onChange={(e) => setTrafficVolume(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Click-Through Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={ctrPercent}
                onChange={(e) => setCtrPercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Conversion Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={conversionRatePercent}
                onChange={(e) => setConversionRatePercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">CPM / AOV ($)</label>
              <input
                type="number"
                step="0.5"
                value={adCpmOrAov}
                onChange={(e) => setAdCpmOrAov(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Estimated Clicks</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{marketingCalc.clicks}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Ad Revenue (CPM)</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${marketingCalc.adRevenue}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Conversions</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{marketingCalc.conversions}</p>
            </div>
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">Sales Pipeline Value</span>
              <p className="text-2xl font-bold font-mono text-teal-700">${marketingCalc.salesValue}</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRAVEL TOOLS */}
      {isTravel && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Plane className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Travel Budget & Mileage Planner</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Distance (Miles)</label>
              <input
                type="number"
                value={travelDistance}
                onChange={(e) => setTravelDistance(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Vehicle MPG</label>
              <input
                type="number"
                value={travelMpg}
                onChange={(e) => setTravelMpg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Fuel Price ($/gal)</label>
              <input
                type="number"
                step="0.05"
                value={fuelPricePerGal}
                onChange={(e) => setFuelPricePerGal(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Travelers</label>
              <input
                type="number"
                value={travelersCount}
                onChange={(e) => setTravelersCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Hotel/Night ($)</label>
              <input
                type="number"
                value={hotelPerNight}
                onChange={(e) => setHotelPerNight(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Trip Days</label>
              <input
                type="number"
                value={travelDays}
                onChange={(e) => setTravelDays(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200 text-center space-y-1">
              <span className="text-xs font-semibold text-sky-800 uppercase">Estimated Fuel</span>
              <p className="text-2xl font-extrabold font-mono text-sky-700">${travelCalc.fuelCost}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Lodging Budget</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${travelCalc.totalLodging}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Total Trip Budget</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${travelCalc.grandTotal}</p>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Cost Per Person</span>
              <p className="text-2xl font-bold font-mono text-indigo-700">${travelCalc.perPerson}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEDDING & EVENT */}
      {isWeddingEvent && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Event, Guest & Catering Estimator</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Total Guests</label>
              <input
                type="number"
                value={eventGuests}
                onChange={(e) => setEventGuests(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Catering/Head ($)</label>
              <input
                type="number"
                value={cateringPerHead}
                onChange={(e) => setCateringPerHead(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Venue Rental ($)</label>
              <input
                type="number"
                value={venueCost}
                onChange={(e) => setVenueCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Vendors / Music / Photo ($)</label>
              <input
                type="number"
                value={vendorsCost}
                onChange={(e) => setVendorsCost(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 text-center space-y-1">
              <span className="text-xs font-semibold text-rose-800 uppercase">Food & Dining</span>
              <p className="text-2xl font-extrabold font-mono text-rose-700">${eventCalc.cateringTotal}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Beverage Rec.</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{eventCalc.wineBottles} Bottles</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Grand Budget</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">${eventCalc.grandTotal}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Per Guest Cost</span>
              <p className="text-2xl font-bold font-mono text-slate-800">${eventCalc.perGuest}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. PHOTOGRAPHY & MUSIC PRODUCTION */}
      {isPhotoMusic && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Camera className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Optical Physics & Audio Rhythm Studio</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Focal Length (mm)</label>
              <input
                type="number"
                value={focalLengthMm}
                onChange={(e) => setFocalLengthMm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Aperture (f/)</label>
              <input
                type="number"
                step="0.1"
                value={apertureF}
                onChange={(e) => setApertureF(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Subject Distance (m)</label>
              <input
                type="number"
                step="0.5"
                value={subjectDistanceM}
                onChange={(e) => setSubjectDistanceM(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Music BPM</label>
              <input
                type="number"
                value={musicBpm}
                onChange={(e) => setMusicBpm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Hyperfocal Dist.</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{photoMusicCalc.hyperfocalM} m</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">1/4 Note Sync</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{photoMusicCalc.msPerBeat} ms</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Dotted 1/8 Delay</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{photoMusicCalc.msDottedEighth} ms</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">1/16 Note Strum</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{photoMusicCalc.msSixteenth} ms</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. PETS & ANIMALS */}
      {isPets && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Dog className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pet Nutrition, Age & Wellness Calculator</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Pet Species</label>
              <select
                value={petSpecies}
                onChange={(e) => setPetSpecies(e.target.value as 'dog' | 'cat')}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-bold"
              >
                <option value="dog">Dog (Canine)</option>
                <option value="cat">Cat (Feline)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Body Weight (kg)</label>
              <input
                type="number"
                value={petWeightKg}
                onChange={(e) => setPetWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Pet Age (Years)</label>
              <input
                type="number"
                value={petAgeYears}
                onChange={(e) => setPetAgeYears(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 text-center space-y-1">
              <span className="text-xs font-semibold text-amber-800 uppercase">Daily Energy (MER)</span>
              <p className="text-2xl font-extrabold font-mono text-amber-700">{petCalc.dailyKcal} kcal/day</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Human Age Equivalent</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{petCalc.humanAge} Years Old</p>
            </div>
            <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200 text-center space-y-1">
              <span className="text-xs font-semibold text-sky-800 uppercase">Target Daily Hydration</span>
              <p className="text-2xl font-extrabold font-mono text-sky-700">{petCalc.dailyWaterMl} ml</p>
            </div>
          </div>
        </div>
      )}

      {/* 6. PROJECT MANAGEMENT & ADMIN */}
      {isProjectOrOffice && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <PieChart className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Agile Velocity, Sprint & Resource Forecaster</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Backlog Story Points</label>
              <input
                type="number"
                value={storyPoints}
                onChange={(e) => setStoryPoints(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Sprint Velocity (pts/sprint)</label>
              <input
                type="number"
                value={velocityPerSprint}
                onChange={(e) => setVelocityPerSprint(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Sprint Length (Weeks)</label>
              <input
                type="number"
                value={sprintWeeks}
                onChange={(e) => setSprintWeeks(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Dev Hourly Rate ($)</label>
              <input
                type="number"
                value={devHourlyRate}
                onChange={(e) => setDevHourlyRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Required Sprints</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{projectCalc.requiredSprints} Sprints</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Estimated Timeline</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{projectCalc.totalWeeks} Weeks</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Estimated Effort</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{projectCalc.totalDevHours} Hours</p>
            </div>
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">Estimated Cost</span>
              <p className="text-2xl font-bold font-mono text-teal-700">${projectCalc.estimatedCost}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. NETWORKING */}
      {isNetworking && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Network className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Subnet CIDR & Bandwidth Transfer Calculator</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">IP Address</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Subnet CIDR (/1 to /32)</label>
              <input
                type="number"
                min="1"
                max="32"
                value={cidrMask}
                onChange={(e) => setCidrMask(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">File Size (MB)</label>
              <input
                type="number"
                value={transferFileSizeMb}
                onChange={(e) => setTransferFileSizeMb(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Bandwidth (Mbps)</label>
              <input
                type="number"
                value={bandwidthSpeedMbps}
                onChange={(e) => setBandwidthSpeedMbps(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Usable Hosts</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{networkCalc.usableHosts.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total IP Block</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{networkCalc.totalHosts.toLocaleString()}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">Transfer Duration</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{networkCalc.transferTime}</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. BEAUTY & SALON */}
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

      {/* 9. DATA MANAGEMENT */}
      {isDataMgmt && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Data Deduplication & Schema Inspector</h3>
            </div>
            <button
              onClick={downloadCsv}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download Cleaned CSV
            </button>
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

      {/* 10. FINANCIAL / ACCOUNTING / HR / REAL ESTATE */}
      {isFinanceOrHR && !isBeauty && !isDataMgmt && !isMarketingOrCreator && !isTravel && !isWeddingEvent && !isPhotoMusic && !isPets && !isProjectOrOffice && !isNetworking && (
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

      {/* 11. E-COMMERCE / INVENTORY */}
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

      {/* 12. ENGINEERING & CONSTRUCTION & AGRICULTURE */}
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
