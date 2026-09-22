import React, { useState, useMemo } from 'react';
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
  Volume2,
  RefreshCw,
  Search,
  Sparkles,
  ShieldCheck,
  Tag,
  Clock,
  Layers
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveMediaWebToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();

  // SEO & Social States
  const [metaTitle, setMetaTitle] = useState('My Awesome Web Project - Fast & Modern');
  const [metaDesc, setMetaDesc] = useState('Build high performance web applications with 100% client side tools and privacy focus.');
  const [metaUrl, setMetaUrl] = useState('https://example.com/project');
  const [metaKeywords, setMetaKeywords] = useState('privacy, developer tools, offline, utility');
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter');

  // Slug / Text generator
  const [inputText, setInputText] = useState('Hello World! How to build scalable apps 2026?');

  // Audio Tone State
  const [audioFreq, setAudioFreq] = useState<number>(440);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  // File metadata inspect
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: string;
    type: string;
    lastModified: string;
  } | null>({
    name: 'sample_asset.webm',
    size: '4.8 MB (5,033,164 bytes)',
    type: 'video/webm; codecs="vp9, opus"',
    lastModified: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
  });

  // Slug generator calculation
  const generatedSlug = useMemo(() => {
    return inputText
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [inputText]);

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

  // Handle Audio Tone Generation
  const toggleAudioTone = () => {
    if (isPlayingAudio) {
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
        if (!audioCtx) setAudioCtx(ctx);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(audioFreq, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        setOscillator(osc);
        setIsPlayingAudio(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onCopy();
  };

  return (
    <div className="space-y-6">
      {/* Privacy Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl border border-sky-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Client-Side {tool.category} Workstation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-800 text-sky-300 rounded-full border border-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% In-Browser Privacy
          </span>
        </div>
      </div>

      {/* 1. SEO & META TAG GENERATORS */}
      {(category === 'SEO Tools' || name.includes('meta') || name.includes('opengraph') || name.includes('seo')) && (
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
                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Tags'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-sky-200 text-xs font-mono rounded-xl overflow-x-auto border border-slate-800">
              {generatedMetaTags}
            </pre>
          </div>
        </div>
      )}

      {/* 2. SOCIAL MEDIA & PREVIEWS */}
      {(category === 'Social Media Tools' || name.includes('social') || name.includes('tweet') || name.includes('hashtag')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            {(['twitter', 'facebook', 'linkedin'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSocialPlatform(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  socialPlatform === p ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p} Preview
              </button>
            ))}
          </div>

          {/* Social Card Mockup */}
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

      {/* 3. AUDIO TOOLS & TONE GENERATOR */}
      {(category === 'Audio Tools' || name.includes('audio') || name.includes('tone') || name.includes('sound') || name.includes('frequency')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Sine Wave Frequency</span>
              <p className="text-3xl font-extrabold font-mono text-sky-600">{audioFreq} Hz</p>
            </div>
            <button
              onClick={toggleAudioTone}
              className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                isPlayingAudio ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isPlayingAudio ? 'Stop Tone' : 'Play Test Tone'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Standard (A4: 440Hz)</span>
              <span>Range: 50Hz - 2000Hz</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              value={audioFreq}
              onChange={(e) => {
                const f = Number(e.target.value);
                setAudioFreq(f);
                if (oscillator && audioCtx) {
                  oscillator.frequency.setValueAtTime(f, audioCtx.currentTime);
                }
              }}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 4. WEB, FILE & SLUG TOOLS */}
      {(!name.includes('meta') && !name.includes('audio') && !name.includes('social')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Input Text / URL / String</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
              placeholder="Enter string..."
            />
          </div>

          {/* Generated URL Slug */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clean Sanitized URL Slug</span>
              <button
                onClick={() => copyText(generatedSlug)}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Slug</span>
              </button>
            </div>
            <p className="text-sm font-mono font-bold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200">
              {generatedSlug}
            </p>
          </div>

          {/* Client-Side File Inspector */}
          {fileDetails && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Asset & Container Inspection</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">File Name</span>
                  <span className="text-xs font-bold font-mono text-slate-800 break-all">{fileDetails.name}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">MIME Type</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{fileDetails.type}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Size</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{fileDetails.size}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 block">Inspection Date</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{fileDetails.lastModified}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
