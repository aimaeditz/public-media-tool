import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Palette,
  Pipette,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers,
  SunMedium,
  CheckCircle2,
  XCircle,
  Shuffle
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

// Helpers for color conversions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [r, g, b]
      .map((x) => clamp(x).toString(16).padStart(2, '0'))
      .join('')
  );
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const cNorm = 1 - r / 255;
  const mNorm = 1 - g / 255;
  const yNorm = 1 - b / 255;
  const k = Math.min(cNorm, mNorm, yNorm);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (cNorm - k) / (1 - k);
  const m = (mNorm - k) / (1 - k);
  const y = (yNorm - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1) || { r: 255, g: 255, b: 255 };
  const rgb2 = hexToRgb(hex2) || { r: 0, g: 0, b: 0 };
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
}

export const ComprehensiveColorToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const [mainColor, setMainColor] = useState('#6366f1');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Gradient states
  const [gradColor1, setGradColor1] = useState('#4f46e5');
  const [gradColor2, setGradColor2] = useState('#ec4899');
  const [gradAngle, setGradAngle] = useState(135);

  const rgb = useMemo(() => hexToRgb(mainColor) || { r: 99, g: 102, b: 241 }, [mainColor]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);

  // Harmonies
  const harmonies = useMemo(() => {
    const makeHslHex = (h: number, s: number, l: number) => {
      const positiveH = (h % 360 + 360) % 360;
      const rgbVal = hslToRgb(positiveH, s, l);
      return rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b);
    };

    return {
      complementary: makeHslHex(hsl.h + 180, hsl.s, hsl.l),
      analogous1: makeHslHex(hsl.h + 30, hsl.s, hsl.l),
      analogous2: makeHslHex(hsl.h - 30, hsl.s, hsl.l),
      triadic1: makeHslHex(hsl.h + 120, hsl.s, hsl.l),
      triadic2: makeHslHex(hsl.h + 240, hsl.s, hsl.l),
      split1: makeHslHex(hsl.h + 150, hsl.s, hsl.l),
      split2: makeHslHex(hsl.h + 210, hsl.s, hsl.l),
    };
  }, [hsl]);

  // Shades & Tints
  const shadesAndTints = useMemo(() => {
    const steps = [10, 25, 40, 55, 70, 85, 95];
    return steps.map((l) => {
      const rgbVal = hslToRgb(hsl.h, hsl.s, l);
      return {
        lightness: l,
        hex: rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b),
      };
    });
  }, [hsl]);

  // Contrast Ratio
  const contrastRatio = useMemo(() => getContrastRatio(mainColor, bgColor), [mainColor, bgColor]);
  const passesNormalAA = contrastRatio >= 4.5;
  const passesNormalAAA = contrastRatio >= 7;
  const passesLargeAA = contrastRatio >= 3;
  const passesLargeAAA = contrastRatio >= 4.5;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    onCopy();
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const randomColor = () => {
    const randHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setMainColor(randHex);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-50/80 via-pink-50/80 to-indigo-50/80 p-4 rounded-2xl border border-violet-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-violet-900">
          <Palette className="w-4 h-4 text-violet-600" />
          <span>Interactive Color & Palette Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={randomColor}
            className="text-xs font-semibold px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            <span>Random Color</span>
          </button>
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-white text-violet-700 rounded-full border border-violet-200 shadow-2xs">
            100% Client-Side
          </span>
        </div>
      </div>

      {/* Primary Color Picker & Inspection Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <input
              type="color"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg cursor-pointer transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white drop-shadow-md">
              <Pipette className="w-6 h-6" />
            </div>
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-slate-700">Selected Color:</span>
              <input
                type="text"
                value={mainColor.toUpperCase()}
                onChange={(e) => {
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                    setMainColor(e.target.value);
                  }
                }}
                className="px-3 py-1.5 font-mono text-lg font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500/20 uppercase"
              />
            </div>

            {/* Formats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                onClick={() => handleCopyCode(mainColor.toUpperCase())}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">HEX</span>
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-violet-600" />
                </div>
                <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{mainColor.toUpperCase()}</p>
              </div>

              <div
                onClick={() => handleCopyCode(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">RGB</span>
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-violet-600" />
                </div>
                <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{rgb.r}, {rgb.g}, {rgb.b}</p>
              </div>

              <div
                onClick={() => handleCopyCode(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">HSL</span>
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-violet-600" />
                </div>
                <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{hsl.h}°, {hsl.s}%, {hsl.l}%</p>
              </div>

              <div
                onClick={() => handleCopyCode(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">CMYK</span>
                  <Copy className="w-3 h-3 text-slate-400 group-hover:text-violet-600" />
                </div>
                <p className="text-sm font-mono font-bold text-slate-800 mt-0.5">{cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Harmonies */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Harmonic Color Schemes</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { label: 'Primary', hex: mainColor },
            { label: 'Complement', hex: harmonies.complementary },
            { label: 'Analogous 1', hex: harmonies.analogous1 },
            { label: 'Analogous 2', hex: harmonies.analogous2 },
            { label: 'Triadic 1', hex: harmonies.triadic1 },
            { label: 'Triadic 2', hex: harmonies.triadic2 },
            { label: 'Split Comp', hex: harmonies.split1 },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => {
                setMainColor(item.hex);
                handleCopyCode(item.hex);
              }}
              className="space-y-1.5 cursor-pointer group"
            >
              <div
                className="h-16 rounded-xl shadow-xs border border-black/10 transition-transform group-hover:scale-105"
                style={{ backgroundColor: item.hex }}
              />
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</p>
                <p className="text-xs font-mono font-bold text-slate-700">{item.hex.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shades & Tints Spectrum */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Lightness Spectrum (Tints & Shades)</span>
        <div className="grid grid-cols-7 gap-2">
          {shadesAndTints.map((step) => (
            <div
              key={step.lightness}
              onClick={() => {
                setMainColor(step.hex);
                handleCopyCode(step.hex);
              }}
              className="space-y-1 cursor-pointer group"
            >
              <div
                className="h-14 rounded-lg shadow-2xs border border-black/5 transition-transform group-hover:scale-105"
                style={{ backgroundColor: step.hex }}
              />
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-400">{step.lightness}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WCAG 2.1 Contrast Checker */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">WCAG 2.1 Contrast & Accessibility Audit</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Background:</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-7 h-7 rounded-lg border border-slate-300 cursor-pointer"
            />
            <input
              type="text"
              value={bgColor.toUpperCase()}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-20 px-2 py-1 text-xs font-mono font-bold border border-slate-300 rounded-lg uppercase"
            />
          </div>
        </div>

        {/* Preview Box */}
        <div
          className="p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors shadow-inner"
          style={{ backgroundColor: bgColor }}
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-2xl font-bold" style={{ color: mainColor }}>
              The quick brown fox jumps over the lazy dog.
            </h4>
            <p className="text-sm font-medium opacity-90" style={{ color: mainColor }}>
              This is standard 16px body copy tested against the chosen background.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-xs p-4 rounded-xl border border-slate-200 text-center shadow-md min-w-[140px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contrast Ratio</span>
            <p className="text-3xl font-extrabold font-mono text-slate-900 mt-0.5">{contrastRatio}:1</p>
          </div>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`p-3 rounded-xl border flex items-center gap-2 ${passesNormalAA ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
            {passesNormalAA ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
            <div>
              <p className="text-xs font-bold">WCAG AA Normal</p>
              <p className="text-[10px] opacity-80">&ge; 4.5:1 (Body Text)</p>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${passesNormalAAA ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
            {passesNormalAAA ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
            <div>
              <p className="text-xs font-bold">WCAG AAA Normal</p>
              <p className="text-[10px] opacity-80">&ge; 7.0:1 (Strict Body)</p>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${passesLargeAA ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
            {passesLargeAA ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
            <div>
              <p className="text-xs font-bold">WCAG AA Large</p>
              <p className="text-[10px] opacity-80">&ge; 3.0:1 (18pt+ / 24px+)</p>
            </div>
          </div>

          <div className={`p-3 rounded-xl border flex items-center gap-2 ${passesLargeAAA ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
            {passesLargeAAA ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
            <div>
              <p className="text-xs font-bold">WCAG AAA Large</p>
              <p className="text-[10px] opacity-80">&ge; 4.5:1 (Strict Large)</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Gradient Generator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">CSS Gradient Studio</span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Start Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={gradColor1}
                onChange={(e) => setGradColor1(e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                value={gradColor1.toUpperCase()}
                onChange={(e) => setGradColor1(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold border border-slate-300 rounded-lg uppercase"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">End Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={gradColor2}
                onChange={(e) => setGradColor2(e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                value={gradColor2.toUpperCase()}
                onChange={(e) => setGradColor2(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono font-bold border border-slate-300 rounded-lg uppercase"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Angle: {gradAngle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={gradAngle}
              onChange={(e) => setGradAngle(Number(e.target.value))}
              className="w-full h-10 accent-violet-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Gradient Preview Canvas */}
        <div
          className="h-28 rounded-2xl shadow-md border border-black/10 flex items-center justify-center text-white font-mono font-bold text-sm drop-shadow-md"
          style={{ background: `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})` }}
        >
          {gradAngle}° Linear Gradient Preview
        </div>

        {/* CSS Code Snippet */}
        <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between gap-4 text-emerald-400 font-mono text-xs">
          <code>background: linear-gradient({gradAngle}deg, {gradColor1}, {gradColor2});</code>
          <button
            onClick={() => handleCopyCode(`background: linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2});`)}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy CSS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
