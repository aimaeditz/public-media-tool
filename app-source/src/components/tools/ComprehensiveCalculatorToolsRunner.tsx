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
  HardDrive,
  Calendar,
  Moon,
  Compass,
  Gauge,
  Zap,
  HelpCircle,
  FileSpreadsheet,
  GraduationCap
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

const PRESSURE_UNITS: Record<string, number> = {
  pa: 1,
  kpa: 1000,
  bar: 100000,
  psi: 6894.76,
  atm: 101325,
  torr: 133.322,
};

const POWER_UNITS: Record<string, number> = {
  w: 1,
  kw: 1000,
  mw: 1000000,
  hp: 745.7,
  btu_hr: 0.293071,
};

const TORQUE_UNITS: Record<string, number> = {
  nm: 1,
  ft_lb: 1.35582,
  in_lb: 0.112985,
  kg_m: 9.80665,
};

const ANGLE_UNITS: Record<string, number> = {
  deg: 1,
  rad: 57.2958,
  grad: 0.9,
  arcmin: 1 / 60,
  arcsec: 1 / 3600,
};

const FREQ_UNITS: Record<string, number> = {
  hz: 1,
  khz: 1000,
  mhz: 1000000,
  ghz: 1000000000,
  rpm: 1 / 60,
  rad_s: 0.159155,
};

const FORCE_UNITS: Record<string, number> = {
  n: 1,
  kn: 1000,
  lbf: 4.44822,
  dyne: 0.00001,
  kgf: 9.80665,
};

// Helper for Roman Numerals
function toRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Out of range (1-3999)';
  const romanMap: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let res = '';
  for (const [val, sym] of romanMap) {
    while (num >= val) {
      res += sym;
      num -= val;
    }
  }
  return res;
}

function fromRoman(str: string): number {
  const romanMap: Record<string, number> = {
    I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
  };
  let total = 0;
  let prev = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    const curr = romanMap[str[i].toUpperCase()] || 0;
    if (curr < prev) total -= curr;
    else { total += curr; prev = curr; }
  }
  return total;
}

export const ComprehensiveCalculatorToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    onCopy();
    setTimeout(() => setCopiedText(null), 2000);
  };

  // 1. Common States
  const [val1, setVal1] = useState<string>('100');
  const [val2, setVal2] = useState<string>('20');
  const [val3, setVal3] = useState<string>('5');
  const [val4, setVal4] = useState<string>('12');

  // 2. Unit Converter state
  const [convVal, setConvVal] = useState<string>('10');
  const [fromUnit, setFromUnit] = useState<string>('');
  const [toUnit, setToUnit] = useState<string>('');

  // 3. Zodiac / Date state
  const [birthMonth, setBirthMonth] = useState<number>(3);
  const [birthDay, setBirthDay] = useState<number>(25);

  // 4. Moon phase date
  const [moonDate, setMoonDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // 5. Bandwidth
  const [fileSizeGb, setFileSizeGb] = useState<number>(25);
  const [downloadSpeedMbps, setDownloadSpeedMbps] = useState<number>(100);

  // 6. Pythagorean
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);

  // 7. Quadratic
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-5);
  const [quadC, setQuadC] = useState<number>(6);

  // 8. Permutations nPr / nCr
  const [permN, setPermN] = useState<number>(8);
  const [permR, setPermR] = useState<number>(3);

  // 9. Fractions
  const [fracN1, setFracN1] = useState<number>(3);
  const [fracD1, setFracD1] = useState<number>(4);
  const [fracOp, setFracOp] = useState<string>('+');
  const [fracN2, setFracN2] = useState<number>(2);
  const [fracD2, setFracD2] = useState<number>(5);

  // 10. Roman Numerals
  const [romanInput, setRomanInput] = useState<string>('2024');

  // 11. Final Exam Grade
  const [currentGradePct, setCurrentGradePct] = useState<number>(82);
  const [targetGradePct, setTargetGradePct] = useState<number>(85);
  const [finalWeightPct, setFinalWeightPct] = useState<number>(25);

  // 12. Resolution Scaler
  const [origWidth, setOrigWidth] = useState<number>(1920);
  const [origHeight, setOrigHeight] = useState<number>(1080);
  const [scaleFactor, setScaleFactor] = useState<number>(150);

  // 13. Ovulation
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [cycleLengthDays, setCycleLengthDays] = useState<number>(28);

  // 14. Electricity Appliance
  const [applianceWatts, setApplianceWatts] = useState<number>(1500);
  const [hoursUsedDaily, setHoursUsedDaily] = useState<number>(4);
  const [costPerKwh, setCostPerKwh] = useState<number>(0.16);

  // 15. Pixel to REM
  const [baseFontSizePx, setBaseFontSizePx] = useState<number>(16);
  const [inputPxVal, setInputPxVal] = useState<number>(24);

  // 16. Number Base Conversion
  const [baseInputVal, setBaseInputVal] = useState<string>('42');

  // 17. Scientific Calc state
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // =========================================================================
  // DEDICATED CALCULATOR ENGINES
  // =========================================================================

  // 1. ZODIAC SIGN FINDER
  if (slug === 'zodiac-sign-finder-universal') {
    const zodiacData = [
      { name: 'Capricorn', symbol: '♑ The Sea-Goat', dates: 'Dec 22 – Jan 19', element: 'Earth', planet: 'Saturn' },
      { name: 'Aquarius', symbol: '♒ The Water-Bearer', dates: 'Jan 20 – Feb 18', element: 'Air', planet: 'Uranus' },
      { name: 'Pisces', symbol: '♓ The Fish', dates: 'Feb 19 – Mar 20', element: 'Water', planet: 'Neptune' },
      { name: 'Aries', symbol: '♈ The Ram', dates: 'Mar 21 – Apr 19', element: 'Fire', planet: 'Mars' },
      { name: 'Taurus', symbol: '♉ The Bull', dates: 'Apr 20 – May 20', element: 'Earth', planet: 'Venus' },
      { name: 'Gemini', symbol: '♊ The Twins', dates: 'May 21 – Jun 20', element: 'Air', planet: 'Mercury' },
      { name: 'Cancer', symbol: '♋ The Crab', dates: 'Jun 21 – Jul 22', element: 'Water', planet: 'Moon' },
      { name: 'Leo', symbol: '♌ The Lion', dates: 'Jul 23 – Aug 22', element: 'Fire', planet: 'Sun' },
      { name: 'Virgo', symbol: '♍ The Virgin', dates: 'Aug 23 – Sep 22', element: 'Earth', planet: 'Mercury' },
      { name: 'Libra', symbol: '♎ The Scales', dates: 'Sep 23 – Oct 22', element: 'Air', planet: 'Venus' },
      { name: 'Scorpio', symbol: '♏ The Scorpion', dates: 'Oct 23 – Nov 21', element: 'Water', planet: 'Pluto' },
      { name: 'Sagittarius', symbol: '♐ The Archer', dates: 'Nov 22 – Dec 21', element: 'Fire', planet: 'Jupiter' },
    ];

    let signIdx = 0;
    if ((birthMonth === 1 && birthDay >= 20) || (birthMonth === 2 && birthDay <= 18)) signIdx = 1;
    else if ((birthMonth === 2 && birthDay >= 19) || (birthMonth === 3 && birthDay <= 20)) signIdx = 2;
    else if ((birthMonth === 3 && birthDay >= 21) || (birthMonth === 4 && birthDay <= 19)) signIdx = 3;
    else if ((birthMonth === 4 && birthDay >= 20) || (birthMonth === 5 && birthDay <= 20)) signIdx = 4;
    else if ((birthMonth === 5 && birthDay >= 21) || (birthMonth === 6 && birthDay <= 20)) signIdx = 5;
    else if ((birthMonth === 6 && birthDay >= 21) || (birthMonth === 7 && birthDay <= 22)) signIdx = 6;
    else if ((birthMonth === 7 && birthDay >= 23) || (birthMonth === 8 && birthDay <= 22)) signIdx = 7;
    else if ((birthMonth === 8 && birthDay >= 23) || (birthMonth === 9 && birthDay <= 22)) signIdx = 8;
    else if ((birthMonth === 9 && birthDay >= 23) || (birthMonth === 10 && birthDay <= 22)) signIdx = 9;
    else if ((birthMonth === 10 && birthDay >= 23) || (birthMonth === 11 && birthDay <= 21)) signIdx = 10;
    else if ((birthMonth === 11 && birthDay >= 22) || (birthMonth === 12 && birthDay <= 21)) signIdx = 11;
    else signIdx = 0;

    const currentSign = zodiacData[signIdx];

    return (
      <div className="space-y-6">
        <div className="bg-indigo-950 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">Zodiac Sign Finder Universal</h3>
              <p className="text-xs text-indigo-300">Astronomical Sun sign calculator based on exact calendar date</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-800 text-indigo-200 rounded-full">Astrology Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Birth Month</label>
            <select value={birthMonth} onChange={(e) => setBirthMonth(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Birth Day (1-31)</label>
            <input type="number" min={1} max={31} value={birthDay} onChange={(e) => setBirthDay(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Zodiac Sign</p>
            <p className="text-3xl font-extrabold font-serif text-indigo-950 mt-1">{currentSign.name}</p>
            <p className="text-xs text-indigo-700 mt-1">{currentSign.symbol}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Date Span</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{currentSign.dates}</p>
            <p className="text-[11px] text-slate-400">Tropical Zodiac</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Elemental Triplicity</p>
            <p className="text-2xl font-bold font-mono text-amber-900 mt-1">{currentSign.element}</p>
            <p className="text-[11px] text-amber-700">Core Temperament</p>
          </div>
          <div className="bg-purple-50 p-5 rounded-2xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Ruling Planet</p>
            <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{currentSign.planet}</p>
            <p className="text-[11px] text-purple-700">Celestial Governor</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. MOON PHASE CALCULATOR
  if (slug === 'online-moon-phase-calculator') {
    const dateObj = new Date(moonDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    // Conway Lunar Phase algorithm
    const c = Math.floor(year / 100);
    const g = year - 19 * Math.floor(year / 19);
    const k = Math.floor((c - 17) / 25);
    const i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + 19 * g + 15;
    const iAdj = i - 30 * Math.floor(i / 30);
    const j = year + Math.floor(year / 4) + iAdj + 2 - c + Math.floor(c / 4);
    const jAdj = j - 7 * Math.floor(j / 7);
    const l = iAdj - jAdj;
    const epact = l + 30 * Math.floor((month + 9) / 11);
    const moonAgeDays = (epact + day + 8) % 30;

    let phaseName = 'New Moon';
    let illumination = 0;
    if (moonAgeDays === 0 || moonAgeDays === 29) {
      phaseName = 'New Moon (0% illuminated)';
      illumination = 1;
    } else if (moonAgeDays < 7) {
      phaseName = 'Waxing Crescent';
      illumination = Math.round((moonAgeDays / 14.75) * 100);
    } else if (moonAgeDays === 7 || moonAgeDays === 8) {
      phaseName = 'First Quarter (Half Moon)';
      illumination = 50;
    } else if (moonAgeDays < 15) {
      phaseName = 'Waxing Gibbous';
      illumination = Math.round((moonAgeDays / 14.75) * 100);
    } else if (moonAgeDays === 15) {
      phaseName = 'Full Moon (100% illuminated)';
      illumination = 100;
    } else if (moonAgeDays < 22) {
      phaseName = 'Waning Gibbous';
      illumination = Math.round(((29.5 - moonAgeDays) / 14.75) * 100);
    } else if (moonAgeDays === 22 || moonAgeDays === 23) {
      phaseName = 'Last Quarter (Half Moon)';
      illumination = 50;
    } else {
      phaseName = 'Waning Crescent';
      illumination = Math.round(((29.5 - moonAgeDays) / 14.75) * 100);
    }

    const daysToFull = (15 - moonAgeDays + 30) % 30;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-6 h-6 text-amber-300" />
            <div>
              <h3 className="font-bold text-base">Online Moon Phase Calculator</h3>
              <p className="text-xs text-slate-400">Astronomical lunar cycle, synodic day, and illumination percentage</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">Lunar Science</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Target Observation Date</label>
          <input type="date" value={moonDate} onChange={(e) => setMoonDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Lunar Phase</p>
            <p className="text-xl font-bold font-serif text-slate-900 mt-1">{phaseName}</p>
            <p className="text-[11px] text-slate-400 mt-1">Synodic Moon Age: {moonAgeDays.toFixed(1)} days</p>
          </div>
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">Illumination Disc</p>
            <p className="text-3xl font-bold font-mono text-amber-900 mt-1">{illumination}%</p>
            <p className="text-[11px] text-amber-700 mt-1">Reflected Sunlight Ratio</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Next Full Moon</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">~{daysToFull} Days</p>
            <p className="text-[11px] text-indigo-600 mt-1">29.53 Day Synodic Month</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. BANDWIDTH DOWNLOAD TIME
  if (slug === 'bandwidth-download-time-easy') {
    const totalMbits = fileSizeGb * 1024 * 8;
    const totalSeconds = downloadSpeedMbps > 0 ? totalMbits / downloadSpeedMbps : 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    const mbPerSecond = downloadSpeedMbps / 8;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Bandwidth Download Time (Easy)</h3>
              <p className="text-xs text-slate-400">Calculates transfer completion duration at given connection speed</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Network Math</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">File Size (Gigabytes GB)</label>
            <input type="number" step="0.5" value={fileSizeGb} onChange={(e) => setFileSizeGb(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Download Speed (Mbps)</label>
            <input type="number" step="5" value={downloadSpeedMbps} onChange={(e) => setDownloadSpeedMbps(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
            <p className="text-xs text-emerald-800 font-medium">Estimated Download Time</p>
            <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">
              {hours > 0 ? `${hours}h ` : ''}{minutes}m {seconds}s
            </p>
            <p className="text-[11px] text-emerald-600 mt-1">{Math.round(totalSeconds).toLocaleString()} total seconds</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Effective Transfer Rate</p>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{mbPerSecond.toFixed(2)} MB/s</p>
            <p className="text-[11px] text-slate-400 mt-1">MegaBytes per second</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Total Data Volume</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{fileSizeGb * 1024} MB</p>
            <p className="text-[11px] text-indigo-600 mt-1">{(totalMbits).toLocaleString()} Megabits</p>
          </div>
        </div>
      </div>
    );
  }

  // 4. PYTHAGOREAN THEOREM
  if (slug === 'pythagorean-theorem-calculator-client-side') {
    const hypotenuseC = Math.sqrt(sideA * sideA + sideB * sideB);
    const perimeter = sideA + sideB + hypotenuseC;
    const area = 0.5 * sideA * sideB;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">Pythagorean Theorem Calculator</h3>
              <p className="text-xs text-slate-400">Formula: a² + b² = c² (Hypotenuse, Area, Perimeter)</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">Geometry Pro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Leg a</label>
            <input type="number" step="0.5" value={sideA} onChange={(e) => setSideA(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Leg b</label>
            <input type="number" step="0.5" value={sideB} onChange={(e) => setSideB(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50 p-5 rounded-2xl border border-amber-300 text-center">
            <p className="text-xs text-amber-800 font-medium">Hypotenuse c</p>
            <p className="text-3xl font-bold font-mono text-amber-900 mt-1">{hypotenuseC.toFixed(3)}</p>
            <p className="text-[11px] text-amber-700 mt-1">√({sideA}² + {sideB}²) = √{sideA * sideA + sideB * sideB}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Triangle Area</p>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{area.toFixed(2)}</p>
            <p className="text-[11px] text-slate-400 mt-1">½ × base × height</p>
          </div>
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Perimeter</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{perimeter.toFixed(3)}</p>
            <p className="text-[11px] text-indigo-600 mt-1">a + b + c</p>
          </div>
        </div>
      </div>
    );
  }

  // 5. SMART QUADRATIC EQUATION SOLVER
  if (slug === 'smart-quadratic-equation-solver') {
    const disc = quadB * quadB - 4 * quadA * quadC;
    let rootDesc = '';
    let r1 = '';
    let r2 = '';
    if (disc > 0) {
      const root1 = (-quadB + Math.sqrt(disc)) / (2 * quadA);
      const root2 = (-quadB - Math.sqrt(disc)) / (2 * quadA);
      rootDesc = 'Two Distinct Real Roots';
      r1 = `x₁ = ${root1.toFixed(4)}`;
      r2 = `x₂ = ${root2.toFixed(4)}`;
    } else if (disc === 0) {
      const root = -quadB / (2 * quadA);
      rootDesc = 'One Real Repeated Root';
      r1 = `x = ${root.toFixed(4)}`;
      r2 = 'Double root';
    } else {
      const realPart = (-quadB / (2 * quadA)).toFixed(4);
      const imagPart = (Math.sqrt(-disc) / (2 * quadA)).toFixed(4);
      rootDesc = 'Two Complex Conjugate Roots';
      r1 = `x₁ = ${realPart} + ${imagPart}i`;
      r2 = `x₂ = ${realPart} - ${imagPart}i`;
    }
    const vertexX = -quadB / (2 * quadA);
    const vertexY = quadA * vertexX * vertexX + quadB * vertexX + quadC;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">Smart Quadratic Equation Solver</h3>
              <p className="text-xs text-slate-400">ax² + bx + c = 0 with discriminant analysis and vertex coordinates</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">Algebra Pro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Coefficient a (≠0)</label>
            <input type="number" step="0.5" value={quadA} onChange={(e) => setQuadA(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Coefficient b</label>
            <input type="number" step="0.5" value={quadB} onChange={(e) => setQuadB(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Constant c</label>
            <input type="number" step="0.5" value={quadC} onChange={(e) => setQuadC(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Root Solutions</p>
            <p className="text-xl font-bold font-mono text-indigo-900 mt-1">{r1}</p>
            <p className="text-xl font-bold font-mono text-indigo-900 mt-0.5">{r2}</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Discriminant Δ</p>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">Δ = {disc.toFixed(2)}</p>
            <p className="text-[11px] text-slate-500 mt-1">{rootDesc}</p>
          </div>
          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Parabola Vertex (h, k)</p>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1">({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</p>
            <p className="text-[11px] text-emerald-600 mt-1">{quadA > 0 ? 'Minimum point (Opens Up)' : 'Maximum point (Opens Down)'}</p>
          </div>
        </div>
      </div>
    );
  }

  // 6. PERMUTATIONS & COMBINATIONS
  if (slug === 'permutations-npr-calculator-universal') {
    function fact(n: number): number {
      if (n <= 1) return 1;
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    }

    const nPr = permN >= permR && permR >= 0 ? fact(permN) / fact(permN - permR) : 0;
    const nCr = permN >= permR && permR >= 0 ? fact(permN) / (fact(permR) * fact(permN - permR)) : 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-base">Permutations nPr & Combinations nCr Calculator</h3>
              <p className="text-xs text-slate-400">Order matters in Permutations; Order does not matter in Combinations</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Combinatorics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Items (n)</label>
            <input type="number" min={1} max={25} value={permN} onChange={(e) => setPermN(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Items Selected (r)</label>
            <input type="number" min={0} max={permN} value={permR} onChange={(e) => setPermR(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Permutations (nPr)</p>
            <p className="text-3xl font-bold font-mono text-purple-900 mt-2">{Math.round(nPr).toLocaleString()}</p>
            <p className="text-xs text-purple-700 mt-1">Formula: n! / (n - r)!</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Combinations (nCr)</p>
            <p className="text-3xl font-bold font-mono text-indigo-900 mt-2">{Math.round(nCr).toLocaleString()}</p>
            <p className="text-xs text-indigo-700 mt-1">Formula: n! / [r! (n - r)!]</p>
          </div>
        </div>
      </div>
    );
  }

  // 7. ROMAN NUMERALS CONVERTER
  if (slug === 'roman-numerals-converter-easy') {
    const isNum = /^\d+$/.test(romanInput.trim());
    const romanResult = isNum ? toRoman(parseInt(romanInput.trim()) || 1) : fromRoman(romanInput.trim());

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">Roman Numerals Converter (Easy)</h3>
              <p className="text-xs text-slate-400">Bi-directional instant converter between Arabic Integers and Roman Numerals</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">Number Systems</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Integer or Roman Numeral (e.g. 2024 or MMXXIV)</label>
            <input
              type="text"
              value={romanInput}
              onChange={(e) => setRomanInput(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl font-mono text-lg font-bold text-slate-900"
            />
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">{isNum ? 'Converted Roman Numeral' : 'Converted Arabic Integer'}</p>
            <p className="text-4xl font-extrabold font-serif text-amber-950 mt-2">{String(romanResult)}</p>
          </div>
        </div>
      </div>
    );
  }

  // 8. FINAL EXAM GRADE CALCULATOR
  if (slug === 'final-exam-grade-calculator-online') {
    const weight = finalWeightPct / 100;
    const requiredExamScore = weight > 0 ? (targetGradePct - (currentGradePct * (1 - weight))) / weight : 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Final Exam Grade Calculator</h3>
              <p className="text-xs text-slate-400">Calculates the exact grade needed on your final exam to achieve your target class grade</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Student Pro</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Current Class Grade (%)</label>
            <input type="number" step="0.5" value={currentGradePct} onChange={(e) => setCurrentGradePct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Desired Target Grade (%)</label>
            <input type="number" step="0.5" value={targetGradePct} onChange={(e) => setTargetGradePct(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Final Exam Weight (%)</label>
            <input type="number" step="1" value={finalWeightPct} onChange={(e) => setFinalWeightPct(parseFloat(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-300 text-center">
          <p className="text-xs text-emerald-800 font-medium">Minimum Score Needed on Final Exam</p>
          <p className="text-4xl font-extrabold font-mono text-emerald-700 mt-2">{requiredExamScore.toFixed(1)}%</p>
          <p className="text-xs text-emerald-600 mt-1">
            {requiredExamScore > 100
              ? 'Warning: You will need extra credit to reach this target grade'
              : requiredExamScore <= 0
              ? 'Congratulations: You have already secured your target grade even with 0% on the final'
              : `Scoring ${requiredExamScore.toFixed(1)}% guarantees a final class grade of ${targetGradePct}%`}
          </p>
        </div>
      </div>
    );
  }

  // 9. FRACTION ARITHMETIC & SIMPLIFIER
  if (slug === 'fraction-arithmetic-calculator-advanced' || slug === 'master-fraction-simplifier') {
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }

    let num = fracN1;
    let den = fracD1;
    if (slug === 'fraction-arithmetic-calculator-advanced') {
      if (fracOp === '+') { num = fracN1 * fracD2 + fracN2 * fracD1; den = fracD1 * fracD2; }
      else if (fracOp === '-') { num = fracN1 * fracD2 - fracN2 * fracD1; den = fracD1 * fracD2; }
      else if (fracOp === '*') { num = fracN1 * fracN2; den = fracD1 * fracD2; }
      else if (fracOp === '/') { num = fracN1 * fracD2; den = fracD1 * fracN2; }
    }

    const divisor = gcd(Math.abs(num), Math.abs(den)) || 1;
    const simpNum = num / divisor;
    const simpDen = den / divisor;
    const decimalVal = den !== 0 ? num / den : 0;
    const wholePart = Math.floor(Math.abs(simpNum) / Math.abs(simpDen));
    const remPart = Math.abs(simpNum) % Math.abs(simpDen);

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Exact fraction reduction, common denominator finding, mixed numbers, and decimal form</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Math Precision</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
          <div className="bg-white p-3 border rounded-xl">
            <label className="text-[11px] text-slate-500 block">Numerator 1</label>
            <input type="number" value={fracN1} onChange={(e) => setFracN1(parseInt(e.target.value) || 0)} className="w-full font-mono text-sm font-bold" />
            <label className="text-[11px] text-slate-500 block mt-1">Denominator 1</label>
            <input type="number" value={fracD1} onChange={(e) => setFracD1(parseInt(e.target.value) || 1)} className="w-full font-mono text-sm font-bold" />
          </div>

          <div className="bg-white p-3 border rounded-xl">
            <label className="text-[11px] text-slate-500 block">Operator</label>
            <select value={fracOp} onChange={(e) => setFracOp(e.target.value)} className="w-full font-mono text-lg font-bold bg-white">
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
          </div>

          <div className="bg-white p-3 border rounded-xl">
            <label className="text-[11px] text-slate-500 block">Numerator 2</label>
            <input type="number" value={fracN2} onChange={(e) => setFracN2(parseInt(e.target.value) || 0)} className="w-full font-mono text-sm font-bold" />
            <label className="text-[11px] text-slate-500 block mt-1">Denominator 2</label>
            <input type="number" value={fracD2} onChange={(e) => setFracD2(parseInt(e.target.value) || 1)} className="w-full font-mono text-sm font-bold" />
          </div>

          <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center col-span-2">
            <p className="text-xs text-sky-800 font-medium">Reduced Simplified Fraction</p>
            <p className="text-3xl font-extrabold font-mono text-sky-900 mt-1">{simpNum} / {simpDen}</p>
            <p className="text-[11px] text-sky-700 mt-1">
              Decimal: {decimalVal.toFixed(4)} {wholePart > 0 && remPart > 0 ? `| Mixed: ${wholePart} ${remPart}/${simpDen}` : ''}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 10. NUMBER BASE CONVERTERS (Octal, Binary, Hex)
  if (slug.includes('octal') || slug.includes('binary') || slug.includes('hex')) {
    let dec = 0;
    if (slug.includes('octal-to-decimal')) dec = parseInt(baseInputVal, 8) || 0;
    else if (slug.includes('binary-to-decimal')) dec = parseInt(baseInputVal, 2) || 0;
    else if (slug.includes('hex-to-decimal')) dec = parseInt(baseInputVal, 16) || 0;
    else dec = parseInt(baseInputVal, 10) || 0;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Cross-radix integer representation across Decimal, Binary, Octal, and Hexadecimal</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">Radix Math</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Enter Input Number</label>
          <input type="text" value={baseInputVal} onChange={(e) => setBaseInputVal(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <p className="text-xs text-slate-600 font-medium">Decimal (Base 10)</p>
            <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{dec}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Binary (Base 2)</p>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1 break-all">{dec.toString(2)}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">Octal (Base 8)</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{dec.toString(8)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Hexadecimal (Base 16)</p>
            <p className="text-2xl font-bold font-mono text-purple-700 mt-1">{dec.toString(16).toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }

  // 11. GENERAL SCIENTIFIC CONVERTER ENGINE (Pressure, Torque, Angle, Power, Frequency, Force, Fuel)
  let specializedUnitMap: Record<string, number> | null = null;
  let specializedType = '';
  if (slug.includes('pressure')) { specializedUnitMap = PRESSURE_UNITS; specializedType = 'Pressure'; }
  else if (slug.includes('power')) { specializedUnitMap = POWER_UNITS; specializedType = 'Power'; }
  else if (slug.includes('torque')) { specializedUnitMap = TORQUE_UNITS; specializedType = 'Torque'; }
  else if (slug.includes('angle')) { specializedUnitMap = ANGLE_UNITS; specializedType = 'Angle'; }
  else if (slug.includes('frequency')) { specializedUnitMap = FREQ_UNITS; specializedType = 'Frequency'; }
  else if (slug.includes('force')) { specializedUnitMap = FORCE_UNITS; specializedType = 'Force'; }
  else if (slug.includes('fuel')) {
    // Fuel converter
    const mpgUS = parseFloat(convVal) || 25;
    const l100km = mpgUS > 0 ? 235.214 / mpgUS : 0;
    const mpgImp = mpgUS * 1.20095;
    const kmPerL = mpgUS * 0.425144;

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gauge className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base">Fuel Efficiency Converter Advanced</h3>
              <p className="text-xs text-slate-400">Converts US MPG, Imperial MPG, Liters per 100km, and km/L</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-400/20 text-amber-300 rounded-full">Fuel Economy</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Enter US MPG Value</label>
          <input type="number" step="0.5" value={convVal} onChange={(e) => setConvVal(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
            <p className="text-xs text-amber-800 font-medium">US MPG</p>
            <p className="text-2xl font-bold font-mono text-amber-900 mt-1">{mpgUS.toFixed(1)} mpg</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
            <p className="text-xs text-emerald-800 font-medium">Metric L/100km</p>
            <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{l100km.toFixed(2)} L/100km</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
            <p className="text-xs text-indigo-800 font-medium">UK Imperial MPG</p>
            <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">{mpgImp.toFixed(1)} mpg</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
            <p className="text-xs text-purple-800 font-medium">Kilometers per Liter</p>
            <p className="text-2xl font-bold font-mono text-purple-700 mt-1">{kmPerL.toFixed(2)} km/L</p>
          </div>
        </div>
      </div>
    );
  }

  if (specializedUnitMap) {
    const inputVal = parseFloat(convVal) || 0;
    const units = Object.keys(specializedUnitMap);
    const activeFrom = fromUnit && specializedUnitMap[fromUnit] ? fromUnit : units[0];
    const activeTo = toUnit && specializedUnitMap[toUnit] ? toUnit : units[1] || units[0];

    const baseVal = inputVal * specializedUnitMap[activeFrom];
    const converted = baseVal / specializedUnitMap[activeTo];

    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">Multi-unit {specializedType} conversion with all equivalent metrics</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">{specializedType}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Value to Convert</label>
            <input type="number" value={convVal} onChange={(e) => setConvVal(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">From Unit</label>
            <select value={activeFrom} onChange={(e) => setFromUnit(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              {units.map((u) => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-600 mb-1">To Unit</label>
            <select value={activeTo} onChange={(e) => setToUnit(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm bg-white">
              {units.map((u) => <option key={u} value={u}>{u.toUpperCase()}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 text-center">
          <p className="text-xs text-indigo-800 font-medium">Converted Result</p>
          <p className="text-4xl font-extrabold font-mono text-indigo-950 mt-2">{converted.toFixed(4)} {activeTo.toUpperCase()}</p>
          <p className="text-xs text-indigo-700 mt-1">{inputVal} {activeFrom.toUpperCase()} = {converted.toFixed(4)} {activeTo.toUpperCase()}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {units.map((u) => (
            <div key={u} className="bg-slate-50 p-3 rounded-xl border text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase">{u}</span>
              <p className="text-sm font-mono font-bold text-slate-900 mt-0.5">{(baseVal / specializedUnitMap![u]).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 12. DEFAULT FALLBACK: STANDARD SCIENTIFIC CALCULATOR / GENERAL SOLVER
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
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
          {tool.category}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Value / Variable A</label>
          <input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Rate / Variable B</label>
          <input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Term / Variable C</label>
          <input type="number" value={val3} onChange={(e) => setVal3(e.target.value)} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center">
          <p className="text-xs text-emerald-800 font-medium">Computed Result</p>
          <p className="text-3xl font-bold font-mono text-emerald-700 mt-1">
            {((parseFloat(val1) || 0) * (parseFloat(val2) || 1) / (parseFloat(val3) || 1)).toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-600 mt-1">A × B ÷ C</p>
        </div>
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">Sum of Inputs</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {((parseFloat(val1) || 0) + (parseFloat(val2) || 0) + (parseFloat(val3) || 0)).toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">A + B + C</p>
        </div>
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-200 text-center">
          <p className="text-xs text-indigo-800 font-medium">Percentage Ratio</p>
          <p className="text-2xl font-bold font-mono text-indigo-700 mt-1">
            {parseFloat(val1) > 0 ? (((parseFloat(val2) || 0) / parseFloat(val1)) * 100).toFixed(1) : '0'}%
          </p>
          <p className="text-[11px] text-indigo-600 mt-1">(B ÷ A) × 100</p>
        </div>
      </div>
    </div>
  );
};
