import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Tool } from '../../lib/types';
import {
  Globe,
  Share2,
  Video,
  Music,
  FileText,
  FileCode,
  Copy,
  Check,
  Play,
  Pause,
  Volume2,
  RefreshCw,
  Search,
  Sparkles,
  ShieldCheck,
  Tag,
  Clock,
  Layers,
  Radio,
  Sliders,
  Activity,
  Download
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

export const ComprehensiveMediaWebToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const [copiedInternal, setCopiedInternal] = useState(false);

  // SEO & Social States
  const [metaTitle, setMetaTitle] = useState('Public Media Tool - 100% Private Client Utilities');
  const [metaDesc, setMetaDesc] = useState('All-in-one browser-native productivity and media workstation with instant offline execution.');
  const [metaUrl, setMetaUrl] = useState('https://example.com/project');
  const [metaKeywords, setMetaKeywords] = useState('privacy, developer tools, offline, utility, audio, converters');
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter');

  // Slug / Text generator
  const [inputText, setInputText] = useState('Hello World! How to build scalable apps 2026?');

  // Audio Tone & Synthesizer State
  const [audioFreq, setAudioFreq] = useState<number>(440);
  const [oscType, setOscType] = useState<OscillatorType>('sine');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.15);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Metronome / BPM State
  const [bpm, setBpm] = useState<number>(120);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(0);

  // Audio Engineering Calculators
  const [sampleRate, setSampleRate] = useState<number>(48000);
  const [bitDepth, setBitDepth] = useState<number>(24);
  const [channels, setChannels] = useState<number>(2);
  const [durationMinutes, setDurationMinutes] = useState<number>(4);

  // Decibel Converter State
  const [dbInput, setDbInput] = useState<number>(6);

  // Metronome loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingMetronome) {
      const intervalMs = (60 / bpm) * 1000;
      interval = setInterval(() => {
        setMetronomeBeat((prev) => (prev % 4) + 1);
        try {
          const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
          audioCtxRef.current = ctx;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
          // ignore audio context restrictions
        }
      }, intervalMs);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingMetronome, bpm]);

  // Handle Tap Tempo
  const handleTapTempo = () => {
    const now = performance.now();
    const newTaps = [...tapTimes.slice(-4), now];
    setTapTimes(newTaps);
    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 280) {
        setBpm(calculatedBpm);
      }
    }
  };

  // Tone generator toggle
  const toggleAudioTone = () => {
    if (isPlayingAudio) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(audioVolume, ctx.currentTime);
        osc.type = oscType;
        osc.frequency.setValueAtTime(audioFreq, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlayingAudio(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Slug generator calculation
  const generatedSlug = useMemo(() => {
    return inputText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [inputText]);

  // Audio Calculations (Delay time, File size, Decibels)
  const audioCalc = useMemo(() => {
    // Delay calculations from BPM
    const quarterNoteMs = (60 / bpm) * 1000;
    const eighthNoteMs = quarterNoteMs / 2;
    const sixteenthNoteMs = quarterNoteMs / 4;
    const dottedEighthMs = eighthNoteMs * 1.5;
    const tripletEighthMs = (quarterNoteMs * 2) / 3;

    // Uncompressed Audio File Size in MB
    const totalSeconds = durationMinutes * 60;
    const bytesPerSecond = (sampleRate * (bitDepth / 8) * channels);
    const totalBytes = bytesPerSecond * totalSeconds;
    const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

    // Decibel voltage/amplitude ratio: 10^(dB/20)
    const amplitudeRatio = Math.pow(10, dbInput / 20).toFixed(3);
    const powerRatio = Math.pow(10, dbInput / 10).toFixed(3);

    return {
      quarterNoteMs: quarterNoteMs.toFixed(1),
      eighthNoteMs: eighthNoteMs.toFixed(1),
      sixteenthNoteMs: sixteenthNoteMs.toFixed(1),
      dottedEighthMs: dottedEighthMs.toFixed(1),
      tripletEighthMs: tripletEighthMs.toFixed(1),
      totalMB,
      totalBytes: totalBytes.toLocaleString(),
      amplitudeRatio,
      powerRatio
    };
  }, [bpm, sampleRate, bitDepth, channels, durationMinutes, dbInput]);

  // OpenGraph Tag generator
  const generatedMetaTags = useMemo(() => {
    return `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}" />
<meta name="description" content="${metaDesc}" />
<meta name="keywords" content="${metaKeywords}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${metaUrl}" />
<meta property="og:title" content="${metaTitle}" />
<meta property="og:description" content="${metaDesc}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${metaUrl}" />
<meta property="twitter:title" content="${metaTitle}" />
<meta property="twitter:description" content="${metaDesc}" />`;
  }, [metaTitle, metaDesc, metaUrl, metaKeywords]);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  const isAudio = category === 'Audio Tools' || slug.includes('audio') || slug.includes('sound') || slug.includes('tone') || slug.includes('metronome') || slug.includes('bpm') || slug.includes('pitch') || slug.includes('frequency') || slug.includes('decibel');
  const isSEO = category === 'SEO Tools' || slug.includes('meta') || slug.includes('seo') || slug.includes('opengraph');
  const isSocial = category === 'Social Media Tools' || slug.includes('social') || slug.includes('tweet') || slug.includes('hashtag');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            {isAudio ? <Music className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-sky-100 text-sky-700 font-medium px-2.5 py-0.5 rounded-full">
                100% In-Browser Media Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500">
              High-performance client-side audio synthesizer, metronome, and SEO generators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyText(isAudio ? JSON.stringify(audioCalc, null, 2) : generatedMetaTags)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Results'}
          </button>
        </div>
      </div>

      {/* 1. AUDIO TOOLS, SYNTHESIZER & METRONOME */}
      {isAudio && (
        <div className="space-y-6">
          {/* Tone Generator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Oscillator Frequency</span>
                <p className="text-3xl font-extrabold font-mono text-sky-600">{audioFreq} Hz</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={oscType}
                  onChange={(e) => setOscType(e.target.value as OscillatorType)}
                  className="px-3 py-2 text-xs font-semibold border border-slate-300 rounded-xl bg-slate-50"
                >
                  <option value="sine">Sine Wave</option>
                  <option value="square">Square Wave</option>
                  <option value="sawtooth">Sawtooth Wave</option>
                  <option value="triangle">Triangle Wave</option>
                </select>
                <button
                  onClick={toggleAudioTone}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                    isPlayingAudio ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'Stop Tone' : 'Play Test Tone'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Standard (A4: 440Hz, C4: 261.63Hz)</span>
                <span>Range: 20Hz - 20,000Hz</span>
              </div>
              <input
                type="range"
                min="20"
                max="2000"
                value={audioFreq}
                onChange={(e) => {
                  const f = Number(e.target.value);
                  setAudioFreq(f);
                  if (oscRef.current && audioCtxRef.current) {
                    oscRef.current.frequency.setValueAtTime(f, audioCtxRef.current.currentTime);
                  }
                }}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Metronome & BPM Tap */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Metronome & Tap Tempo Counter</h3>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((b) => (
                  <div
                    key={b}
                    className={`w-3.5 h-3.5 rounded-full transition-colors ${
                      metronomeBeat === b && isPlayingMetronome ? 'bg-indigo-600 scale-125' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Tempo (BPM)</span>
                <p className="text-3xl font-extrabold font-mono text-indigo-700">{bpm} BPM</p>
                <input
                  type="range"
                  min="40"
                  max="240"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPlayingMetronome ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
                  }`}
                >
                  {isPlayingMetronome ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingMetronome ? 'Stop Metronome' : 'Start Metronome'}</span>
                </button>
              </div>

              <div>
                <button
                  onClick={handleTapTempo}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 transition-all active:scale-95 cursor-pointer"
                >
                  Tap Tempo Here (Click repeatedly)
                </button>
              </div>
            </div>

            {/* Delay Sync Time Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">1/4 Note Delay</span>
                <span className="text-base font-mono font-bold text-slate-800">{audioCalc.quarterNoteMs} ms</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">1/8 Note Delay</span>
                <span className="text-base font-mono font-bold text-slate-800">{audioCalc.eighthNoteMs} ms</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">Dotted 1/8 Note</span>
                <span className="text-base font-mono font-bold text-slate-800">{audioCalc.dottedEighthMs} ms</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">1/16 Note Delay</span>
                <span className="text-base font-mono font-bold text-slate-800">{audioCalc.sixteenthNoteMs} ms</span>
              </div>
            </div>
          </div>

          {/* Audio Uncompressed File Size & Decibel Conversion */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-5 h-5 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Audio File Size & Decibel Ratios</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Sample Rate (Hz)</label>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
                >
                  <option value="44100">44.1 kHz (CD Quality)</option>
                  <option value="48000">48.0 kHz (Studio / Video)</option>
                  <option value="96000">96.0 kHz (Hi-Res Audio)</option>
                  <option value="192000">192.0 kHz (Mastering)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Bit Depth</label>
                <select
                  value={bitDepth}
                  onChange={(e) => setBitDepth(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
                >
                  <option value="16">16-bit PCM</option>
                  <option value="24">24-bit Studio</option>
                  <option value="32">32-bit Float</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Duration (Minutes)</label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
                />
              </div>
              <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-200 text-center space-y-1">
                <span className="text-xs font-semibold text-sky-800 uppercase">WAV / PCM Size</span>
                <p className="text-2xl font-extrabold font-mono text-sky-700">{audioCalc.totalMB} MB</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SEO & META TAG GENERATORS */}
      {(isSEO || (!isAudio && !isSocial)) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Meta Title</label>
                <span className={`text-[11px] font-mono ${metaTitle.length > 60 ? 'text-rose-500' : 'text-slate-400'}`}>
                  {metaTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Target Canonical URL</label>
              <input
                type="text"
                value={metaUrl}
                onChange={(e) => setMetaUrl(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                <span className={`text-[11px] font-mono ${metaDesc.length > 160 ? 'text-rose-500' : 'text-slate-400'}`}>
                  {metaDesc.length}/160 chars
                </span>
              </div>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">HTML Header Code</span>
              <button
                onClick={() => copyText(generatedMetaTags)}
                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedInternal || copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInternal || copied ? 'Copied!' : 'Copy Tags'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-sky-200 text-xs font-mono rounded-xl overflow-x-auto border border-slate-800">
              {generatedMetaTags}
            </pre>
          </div>
        </div>
      )}

      {/* 3. SOCIAL MEDIA & PREVIEWS */}
      {isSocial && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            {(['twitter', 'facebook', 'linkedin'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSocialPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  socialPlatform === p ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p} Preview
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="h-40 bg-gradient-to-r from-sky-500 to-indigo-600 flex items-center justify-center text-white">
              <span className="text-xl font-bold tracking-wide">Social Card Image Preview</span>
            </div>
            <div className="p-4 space-y-1 bg-white">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">example.com</span>
              <p className="text-sm font-bold text-slate-900 line-clamp-1">{metaTitle}</p>
              <p className="text-xs text-slate-600 line-clamp-2">{metaDesc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
