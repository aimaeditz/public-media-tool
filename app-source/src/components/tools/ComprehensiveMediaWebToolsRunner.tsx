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
  Download,
  Film,
  Code,
  HardDrive,
  Hash,
  Compass
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
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'facebook' | 'linkedin' | 'instagram'>('twitter');
  const [socialCaption, setSocialCaption] = useState('Explore over 1,500 privacy-first developer, media, and business tools running 100% locally in your browser! #DevTools #Productivity #WebDev');

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

  // Video Tools State
  const [videoWidth, setVideoWidth] = useState<number>(1920);
  const [videoHeight, setVideoHeight] = useState<number>(1080);
  const [videoFps, setVideoFps] = useState<number>(60);
  const [videoDurationSecs, setVideoDurationSecs] = useState<number>(180);
  const [videoBitrateMbps, setVideoBitrateMbps] = useState<number>(15);
  const [audioBitrateKbps, setAudioBitrateKbps] = useState<number>(320);

  // Web & URL Tools State
  const [rawUrlInput, setRawUrlInput] = useState<string>('https://user:secret@api.example.com:8080/v1/search?query=react+typescript&sort=desc#results');
  const [htmlEntitiesInput, setHtmlEntitiesInput] = useState<string>('<h1>Hello & Welcome to "Public Media Tool" — 100% Client-Side</h1>');

  // File Tools State
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(10485760); // 10 MB
  const [base64TextInput, setBase64TextInput] = useState<string>('Welcome to the high-performance local media suite!');

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

  // Audio tone generator
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (e) {}
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.setValueAtTime(audioFreq, ctx.currentTime);
        gain.gain.setValueAtTime(audioVolume, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlayingAudio(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Handle frequency update live
  useEffect(() => {
    if (isPlayingAudio && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(audioFreq, audioCtxRef.current.currentTime);
    }
  }, [audioFreq, isPlayingAudio]);

  // Handle volume update live
  useEffect(() => {
    if (isPlayingAudio && gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(audioVolume, audioCtxRef.current.currentTime);
    }
  }, [audioVolume, isPlayingAudio]);

  // Tap tempo
  const handleTapTempo = () => {
    const now = performance.now();
    const newTapTimes = [...tapTimes.slice(-4), now];
    setTapTimes(newTapTimes);
    if (newTapTimes.length > 1) {
      const diffs = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        diffs.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      const calculatedBpm = Math.round(60000 / avgDiff);
      if (calculatedBpm >= 40 && calculatedBpm <= 280) {
        setBpm(calculatedBpm);
      }
    }
  };

  // URL Parsing Calculations
  const parsedUrl = useMemo(() => {
    try {
      const u = new URL(rawUrlInput);
      const params: Record<string, string> = {};
      u.searchParams.forEach((val, key) => {
        params[key] = val;
      });
      return {
        valid: true,
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port || '(default)',
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        params
      };
    } catch (e) {
      return {
        valid: false,
        protocol: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
        params: {}
      };
    }
  }, [rawUrlInput]);

  // Video Calculations
  const videoCalc = useMemo(() => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(videoWidth, videoHeight);
    const aspectW = divisor > 0 ? videoWidth / divisor : 16;
    const aspectH = divisor > 0 ? videoHeight / divisor : 9;

    const totalFrames = videoFps * videoDurationSecs;
    const videoDataMbits = videoBitrateMbps * videoDurationSecs;
    const audioDataMbits = (audioBitrateKbps / 1000) * videoDurationSecs;
    const totalMB = ((videoDataMbits + audioDataMbits) / 8).toFixed(1);
    const totalGB = (((videoDataMbits + audioDataMbits) / 8) / 1024).toFixed(2);

    const hours = Math.floor(videoDurationSecs / 3600);
    const mins = Math.floor((videoDurationSecs % 3600) / 60);
    const secs = videoDurationSecs % 60;
    const timecode = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:00`;

    return {
      aspectRatio: `${aspectW}:${aspectH}`,
      totalFrames: totalFrames.toLocaleString(),
      totalMB,
      totalGB,
      timecode
    };
  }, [videoWidth, videoHeight, videoFps, videoDurationSecs, videoBitrateMbps, audioBitrateKbps]);

  // File size conversion
  const fileSizeCalc = useMemo(() => {
    const bytes = fileSizeBytes;
    const kb = (bytes / 1024).toFixed(2);
    const mb = (bytes / (1024 * 1024)).toFixed(2);
    const gb = (bytes / (1024 * 1024 * 1024)).toFixed(3);
    const kib = (bytes / 1000).toFixed(2);
    const mib = (bytes / 1000000).toFixed(2);

    let base64Encoded = '';
    try {
      base64Encoded = btoa(unescape(encodeURIComponent(base64TextInput)));
    } catch (e) {
      base64Encoded = 'Encoding error';
    }

    return {
      bytes,
      kb,
      mb,
      gb,
      kib,
      mib,
      base64Encoded
    };
  }, [fileSizeBytes, base64TextInput]);

  // HTML Entity encoding
  const encodedHtmlEntities = useMemo(() => {
    return htmlEntitiesInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }, [htmlEntitiesInput]);

  // Audio size calc
  const audioCalc = useMemo(() => {
    const totalSeconds = durationMinutes * 60;
    const bytesPerSecond = sampleRate * (bitDepth / 8) * channels;
    const totalBytes = bytesPerSecond * totalSeconds;
    const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
    const delayTimeMs = (60 / bpm) * 1000;
    const dottedEighthMs = (delayTimeMs * 0.75).toFixed(1);
    const tripletMs = ((delayTimeMs * 2) / 3).toFixed(1);
    const linearRatio = Math.pow(10, dbInput / 20).toFixed(3);
    const powerRatio = Math.pow(10, dbInput / 10).toFixed(3);

    return {
      totalMB,
      delayTimeMs: delayTimeMs.toFixed(1),
      dottedEighthMs,
      tripletMs,
      linearRatio,
      powerRatio
    };
  }, [durationMinutes, sampleRate, bitDepth, channels, bpm, dbInput]);

  const generatedMetaTags = useMemo(() => {
    return `<!-- Standard SEO -->
<title>${metaTitle}</title>
<meta name="description" content="${metaDesc}" />
<meta name="keywords" content="${metaKeywords}" />
<link rel="canonical" href="${metaUrl}" />

<!-- Open Graph (Facebook / LinkedIn) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${metaUrl}" />
<meta property="og:title" content="${metaTitle}" />
<meta property="og:description" content="${metaDesc}" />
<meta property="og:image" content="${metaUrl}/og-image.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${metaUrl}" />
<meta name="twitter:title" content="${metaTitle}" />
<meta name="twitter:description" content="${metaDesc}" />
<meta name="twitter:image" content="${metaUrl}/twitter-image.png" />`;
  }, [metaTitle, metaDesc, metaKeywords, metaUrl]);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  // Category detection
  const isAudio = category === 'Audio Tools' || name.includes('audio') || name.includes('sound') || name.includes('bpm') || name.includes('synth') || name.includes('frequency') || name.includes('decibel');
  const isVideo = category === 'Video Tools' || name.includes('video') || name.includes('fps') || name.includes('aspect') || name.includes('resolution') || name.includes('bitrate');
  const isWeb = category === 'Web Tools' || name.includes('url') || name.includes('http') || name.includes('html') || name.includes('status code') || name.includes('entity');
  const isFile = category === 'File Tools' || name.includes('file') || name.includes('size') || name.includes('byte') || name.includes('mime');
  const isSocial = category === 'Social Media Tools' || name.includes('social') || name.includes('tweet') || name.includes('instagram') || name.includes('caption') || name.includes('hashtag');
  const isSEO = category === 'SEO Tools' || name.includes('meta') || name.includes('sitemap') || name.includes('robots') || name.includes('seo') || (!isAudio && !isVideo && !isWeb && !isFile && !isSocial);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            {isAudio ? <Music className="w-6 h-6" /> : isVideo ? <Video className="w-6 h-6" /> : isFile ? <HardDrive className="w-6 h-6" /> : isWeb ? <Globe className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full">
                100% Client-Side Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500">
              High-performance browser computing without external network calls.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyText(isAudio ? JSON.stringify(audioCalc, null, 2) : isVideo ? JSON.stringify(videoCalc, null, 2) : isWeb ? JSON.stringify(parsedUrl, null, 2) : isFile ? JSON.stringify(fileSizeCalc, null, 2) : generatedMetaTags)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* 1. AUDIO TOOLS */}
      {isAudio && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Tone Generator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Web Audio Tone Synthesizer</h3>
              </div>
              <button
                onClick={toggleAudio}
                className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isPlayingAudio ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse' : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlayingAudio ? 'Stop Tone' : 'Play Synthesizer'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Frequency ({audioFreq} Hz)</label>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="1"
                  value={audioFreq}
                  onChange={(e) => setAudioFreq(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Waveform</label>
                <select
                  value={oscType}
                  onChange={(e) => setOscType(e.target.value as OscillatorType)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-xl"
                >
                  <option value="sine">Sine (Pure Tone)</option>
                  <option value="square">Square (8-bit Synth)</option>
                  <option value="sawtooth">Sawtooth (Rich Harmonics)</option>
                  <option value="triangle">Triangle (Flute / Warm)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Volume ({Math.round(audioVolume * 100)}%)</label>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={audioVolume}
                  onChange={(e) => setAudioVolume(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>
            </div>
          </div>

          {/* Metronome & BPM */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Metronome & Tap Tempo</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleTapTempo}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Tap Tempo
                </button>
                <button
                  onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isPlayingMetronome ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {isPlayingMetronome ? 'Stop Metronome' : 'Start Metronome'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Tempo ({bpm} BPM)</label>
                <input
                  type="range"
                  min="40"
                  max="240"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Beat Interval</span>
                <p className="text-lg font-mono font-bold text-slate-800">{audioCalc.delayTimeMs} ms</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Dotted 1/8 Delay</span>
                <p className="text-lg font-mono font-bold text-slate-800">{audioCalc.dottedEighthMs} ms</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">1/4 Triplet</span>
                <p className="text-lg font-mono font-bold text-slate-800">{audioCalc.tripletMs} ms</p>
              </div>
            </div>
          </div>

          {/* Audio File Size Calculator */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Audio Storage Calculator</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Sample Rate</label>
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

      {/* 2. VIDEO TOOLS */}
      {isVideo && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Film className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Video Resolution, Bitrate & Storage Calculator</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Width (px)</label>
              <input
                type="number"
                value={videoWidth}
                onChange={(e) => setVideoWidth(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Height (px)</label>
              <input
                type="number"
                value={videoHeight}
                onChange={(e) => setVideoHeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">FPS</label>
              <input
                type="number"
                value={videoFps}
                onChange={(e) => setVideoFps(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Duration (Secs)</label>
              <input
                type="number"
                value={videoDurationSecs}
                onChange={(e) => setVideoDurationSecs(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Video (Mbps)</label>
              <input
                type="number"
                value={videoBitrateMbps}
                onChange={(e) => setVideoBitrateMbps(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Audio (kbps)</label>
              <input
                type="number"
                value={audioBitrateKbps}
                onChange={(e) => setAudioBitrateKbps(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-200 text-center space-y-1">
              <span className="text-xs font-semibold text-indigo-800 uppercase">Aspect Ratio</span>
              <p className="text-2xl font-extrabold font-mono text-indigo-700">{videoCalc.aspectRatio}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-600 uppercase">Total Frames</span>
              <p className="text-2xl font-bold font-mono text-slate-800">{videoCalc.totalFrames}</p>
            </div>
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase">File Size (MB)</span>
              <p className="text-2xl font-extrabold font-mono text-emerald-700">{videoCalc.totalMB} MB</p>
            </div>
            <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-200 text-center space-y-1">
              <span className="text-xs font-semibold text-teal-800 uppercase">File Size (GB)</span>
              <p className="text-2xl font-bold font-mono text-teal-700">{videoCalc.totalGB} GB</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. WEB & URL TOOLS */}
      {isWeb && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">URL Parser & HTML Entities Engine</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Enter Full URL to Inspect</label>
              <input
                type="text"
                value={rawUrlInput}
                onChange={(e) => setRawUrlInput(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            {parsedUrl.valid ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">Protocol</span>
                  <span className="text-sm font-bold font-mono text-slate-800">{parsedUrl.protocol}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">Hostname</span>
                  <span className="text-sm font-bold font-mono text-slate-800">{parsedUrl.hostname}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">Port</span>
                  <span className="text-sm font-bold font-mono text-slate-800">{parsedUrl.port}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">Path</span>
                  <span className="text-sm font-bold font-mono text-slate-800">{parsedUrl.pathname}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 text-amber-700 rounded-xl text-xs">Please provide a valid URL string with protocol (http:// or https://)</div>
            )}

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700 block">HTML Entity Encoder</label>
              <input
                type="text"
                value={htmlEntitiesInput}
                onChange={(e) => setHtmlEntitiesInput(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono"
              />
              <div className="p-3 bg-slate-900 text-sky-300 font-mono text-xs rounded-xl overflow-x-auto">
                {encodedHtmlEntities}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. FILE TOOLS */}
      {isFile && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HardDrive className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">File Size Unit Converter & Base64 Encoder</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">File Size (Bytes)</label>
              <input
                type="number"
                value={fileSizeBytes}
                onChange={(e) => setFileSizeBytes(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-200 text-center">
                <span className="text-[11px] font-semibold text-indigo-800 uppercase block">Kilobytes (KB)</span>
                <p className="text-lg font-bold font-mono text-indigo-700">{fileSizeCalc.kb} KB</p>
              </div>
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] font-semibold text-emerald-800 uppercase block">Megabytes (MB)</span>
                <p className="text-lg font-bold font-mono text-emerald-700">{fileSizeCalc.mb} MB</p>
              </div>
              <div className="bg-teal-50/50 p-3 rounded-xl border border-teal-200 text-center">
                <span className="text-[11px] font-semibold text-teal-800 uppercase block">Gigabytes (GB)</span>
                <p className="text-lg font-bold font-mono text-teal-700">{fileSizeCalc.gb} GB</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-[11px] font-semibold text-slate-600 uppercase block">Decimal (MB)</span>
                <p className="text-lg font-bold font-mono text-slate-800">{fileSizeCalc.mib} MB</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700 block">Base64 Text Encoder</label>
              <input
                type="text"
                value={base64TextInput}
                onChange={(e) => setBase64TextInput(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl font-mono"
              />
              <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                {fileSizeCalc.base64Encoded}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SEO & META TAG GENERATORS */}
      {isSEO && (
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

      {/* 6. SOCIAL MEDIA & PREVIEWS */}
      {isSocial && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            {(['twitter', 'facebook', 'linkedin', 'instagram'] as const).map((p) => (
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

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700">Caption & Hashtag Editor</label>
            <textarea
              value={socialCaption}
              onChange={(e) => setSocialCaption(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
            />
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>{socialCaption.length} characters</span>
              <span>Twitter: {280 - socialCaption.length} left</span>
            </div>
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
