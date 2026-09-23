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
  Layers,
  Upload,
  BarChart,
  Link,
  Sliders,
  DollarSign
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveMediaWebToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const category = tool.category;
  const name = tool.name.toLowerCase();
  const slug = tool.slug.toLowerCase();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopyText = (text: string, key = 'default') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // 1. SEO & Social States
  const [metaTitle, setMetaTitle] = useState('My Awesome Web Project - Fast & Modern');
  const [metaDesc, setMetaDesc] = useState('Build high performance web applications with 100% client side tools and privacy focus.');
  const [metaUrl, setMetaUrl] = useState('https://example.com/project');
  const [metaKeywords, setMetaKeywords] = useState('privacy, developer tools, offline, utility');
  const [socialPlatform, setSocialPlatform] = useState<'twitter' | 'facebook' | 'linkedin'>('twitter');

  // 2. Video States
  const [videoWidth, setVideoWidth] = useState<number>(1920);
  const [videoHeight, setVideoHeight] = useState<number>(1080);
  const [videoDurationMin, setVideoDurationMin] = useState<number>(10);
  const [videoBitrateMbps, setVideoBitrateMbps] = useState<number>(15);
  const [videoFps, setVideoFps] = useState<number>(30);
  const [totalFrames, setTotalFrames] = useState<number>(18000);

  // 3. Audio & Music States
  const [audioFreq, setAudioFreq] = useState<number>(440);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [tempoBpm, setTempoBpm] = useState<number>(120);

  // 4. File States
  const [fileInputBytes, setFileInputBytes] = useState<number>(10485760); // 10MB
  const [inspectedFile, setInspectedFile] = useState<{
    name: string;
    sizeBytes: number;
    type: string;
    sha256?: string;
  } | null>({
    name: 'video_render_final.mp4',
    sizeBytes: 15728640,
    type: 'video/mp4',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  });

  // 5. Marketing & Creator States
  const [utmUrl, setUtmUrl] = useState('https://example.com/landing');
  const [utmSource, setUtmSource] = useState('newsletter');
  const [utmMedium, setUtmMedium] = useState('email');
  const [utmCampaign, setUtmCampaign] = useState('spring_launch_2026');
  const [adSpend, setAdSpend] = useState<number>(500);
  const [adClicks, setAdClicks] = useState<number>(1250);
  const [adImpressions, setAdImpressions] = useState<number>(45000);
  const [adConversions, setAdConversions] = useState<number>(48);

  // 6. SERP & Search States
  const [serpQuery, setSerpQuery] = useState('best free client side developer tools');
  const [robotsDisallow, setRobotsDisallow] = useState('/admin/\n/api/\n/checkout/');
  const [robotsSitemap, setRobotsSitemap] = useState('https://example.com/sitemap.xml');

  // Slug generator calculation
  const [slugInput, setSlugInput] = useState('How to Build Lightning Fast Web Applications 2026');
  const generatedSlug = useMemo(() => {
    return slugInput
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [slugInput]);

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

  // Audio tone
  const toggleAudioTone = () => {
    if (isPlayingAudio) {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {
          // ignore
        }
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const ctx = audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
        if (!audioCtx) setAudioCtx(ctx);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
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

  // Live file upload inspect
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setInspectedFile({
        name: file.name,
        sizeBytes: file.size,
        type: file.type || 'application/octet-stream',
        sha256: hashHex
      });
    } catch (err) {
      setInspectedFile({
        name: file.name,
        sizeBytes: file.size,
        type: file.type || 'application/octet-stream',
      });
    }
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

      {/* A. VIDEO TOOLS */}
      {(category === 'Video Tools' || slug.includes('video') || slug.includes('aspect-ratio') || slug.includes('bitrate') || slug.includes('timecode')) && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-sky-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">Aspect ratios, video bitrate file size, and frame rate timecodes</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Video Engineering</span>
          </div>

          {/* Aspect Ratio & Resolution */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-700 uppercase block">Aspect Ratio & Dimensions</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Width (px)</label>
                <input type="number" value={videoWidth} onChange={(e) => setVideoWidth(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-xl font-mono text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Height (px)</label>
                <input type="number" value={videoHeight} onChange={(e) => setVideoHeight(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-xl font-mono text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Duration (Minutes)</label>
                <input type="number" value={videoDurationMin} onChange={(e) => setVideoDurationMin(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-500">Bitrate (Mbps)</label>
                <input type="number" step="0.5" value={videoBitrateMbps} onChange={(e) => setVideoBitrateMbps(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-xl font-mono text-sm" />
              </div>
            </div>

            {/* Calculations */}
            {(() => {
              const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
              const d = gcd(videoWidth, videoHeight);
              const ratioX = videoWidth / d;
              const ratioY = videoHeight / d;
              const totalSec = videoDurationMin * 60;
              const totalMbits = totalSec * videoBitrateMbps;
              const totalMBytes = totalMbits / 8;
              const totalGBytes = totalMBytes / 1024;

              // Timecode from duration
              const hours = Math.floor(videoDurationMin / 60);
              const mins = Math.floor(videoDurationMin % 60);
              const secs = Math.floor((videoDurationMin * 60) % 60);
              const frames = Math.floor(secs * videoFps);
              const timecode = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames % videoFps).padStart(2, '0')}`;

              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-center">
                    <span className="text-xs text-sky-800 font-medium">Simplified Aspect Ratio</span>
                    <p className="text-2xl font-bold font-mono text-sky-700 mt-1">{ratioX}:{ratioY}</p>
                    <p className="text-[11px] text-sky-600">{(videoWidth / videoHeight).toFixed(3)} decimal ratio</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-800 font-medium">Estimated Render File Size</span>
                    <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">
                      {totalGBytes >= 1 ? `${totalGBytes.toFixed(2)} GB` : `${totalMBytes.toFixed(0)} MB`}
                    </p>
                    <p className="text-[11px] text-emerald-600">at {videoBitrateMbps} Mbps target</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                    <span className="text-xs text-purple-800 font-medium">SMPTE Timecode ({videoFps} fps)</span>
                    <p className="text-2xl font-bold font-mono text-purple-700 mt-1">{timecode}</p>
                    <p className="text-[11px] text-purple-600">Standard broadcast format</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* B. AUDIO & MUSIC PRODUCTION */}
      {(category.includes('Audio') || category.includes('Music') || slug.includes('audio') || slug.includes('bpm') || slug.includes('delay') || slug.includes('frequency')) && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">Studio acoustics, BPM delay calculator, and sine tone generator</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Audio Engineering</span>
          </div>

          {/* BPM Delay & Reverb Times */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase">Tempo Delay & Reverb Timing</span>
              <span className="text-xs font-mono font-bold text-purple-600">{tempoBpm} BPM</span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="40"
                max="240"
                value={tempoBpm}
                onChange={(e) => setTempoBpm(parseInt(e.target.value) || 120)}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {(() => {
              const beatMs = 60000 / tempoBpm;
              const quarterMs = beatMs;
              const eighthMs = beatMs / 2;
              const sixteenthMs = beatMs / 4;
              const dottedQuarter = beatMs * 1.5;
              const tripletEighth = (beatMs * 2) / 3;

              return (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div className="bg-slate-50 p-3 rounded-xl border text-center">
                    <span className="text-[11px] text-slate-500 block">1/4 Note</span>
                    <span className="text-base font-bold font-mono text-slate-800">{quarterMs.toFixed(1)} ms</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border text-center">
                    <span className="text-[11px] text-slate-500 block">1/8 Note</span>
                    <span className="text-base font-bold font-mono text-slate-800">{eighthMs.toFixed(1)} ms</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border text-center">
                    <span className="text-[11px] text-slate-500 block">1/16 Note</span>
                    <span className="text-base font-bold font-mono text-slate-800">{sixteenthMs.toFixed(1)} ms</span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-center">
                    <span className="text-[11px] text-purple-700 block">Dotted 1/4</span>
                    <span className="text-base font-bold font-mono text-purple-800">{dottedQuarter.toFixed(1)} ms</span>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-center">
                    <span className="text-[11px] text-indigo-700 block">Triplet 1/8</span>
                    <span className="text-base font-bold font-mono text-indigo-800">{tripletEighth.toFixed(1)} ms</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Sine Wave Test Tone */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Test Frequency</span>
                <p className="text-3xl font-extrabold font-mono text-purple-600">{audioFreq} Hz</p>
              </div>
              <button
                onClick={toggleAudioTone}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isPlayingAudio ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Stop Tone' : 'Play Reference Sine Wave'}</span>
              </button>
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
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* C. FILE TOOLS & CHECKSUM */}
      {(category === 'File Tools' || slug.includes('file') || slug.includes('checksum') || slug.includes('byte')) && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCode className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">File metadata analysis, binary/decimal unit conversion, and SHA-256 integrity</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">File Analysis</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Upload File for In-Browser Inspection</label>
              <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-semibold text-slate-700">Choose a file to inspect</span>
                <span className="text-xs text-slate-400 mt-1">Processed 100% locally in your browser memory</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {inspectedFile && (
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Inspected File Metadata</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">File Name</span>
                    <span className="text-xs font-mono font-bold text-slate-800 break-all">{inspectedFile.name}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">MIME Type</span>
                    <span className="text-xs font-mono font-bold text-slate-800">{inspectedFile.type}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Exact Size</span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      {(inspectedFile.sizeBytes / 1024 / 1024).toFixed(2)} MB ({inspectedFile.sizeBytes.toLocaleString()} bytes)
                    </span>
                  </div>
                </div>

                {inspectedFile.sha256 && (
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">SHA-256 File Checksum</span>
                      <button
                        onClick={() => handleCopyText(inspectedFile.sha256 || '', 'sha256')}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'sha256' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-xs font-mono text-emerald-300 break-all">{inspectedFile.sha256}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* D. MARKETING & CREATOR TOOLS */}
      {(category === 'Marketing & Creator Tools' || slug.includes('utm') || slug.includes('campaign') || slug.includes('cpc') || slug.includes('ctr') || slug.includes('cpa') || slug.includes('roi')) && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-sky-400" />
              <div>
                <h3 className="font-bold text-base">{tool.name}</h3>
                <p className="text-xs text-slate-400">UTM campaign link generator and digital advertising performance ROI</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Marketing Metrics</span>
          </div>

          {/* UTM Builder */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-700 uppercase block">UTM Campaign URL Builder</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Destination URL</label>
                <input type="text" value={utmUrl} onChange={(e) => setUtmUrl(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Campaign Source (e.g. google, newsletter)</label>
                <input type="text" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Campaign Medium (e.g. cpc, email, banner)</label>
                <input type="text" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Campaign Name (e.g. spring_sale)</label>
                <input type="text" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>

            {(() => {
              const fullUtm = `${utmUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
              return (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Tagged Marketing URL</span>
                    <button
                      onClick={() => handleCopyText(fullUtm, 'utm')}
                      className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
                    >
                      {copiedKey === 'utm' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'utm' ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200 break-all">{fullUtm}</p>
                </div>
              );
            })()}
          </div>

          {/* Ad ROI Metrics */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-slate-700 uppercase block">Advertising ROI & Unit Economics</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Ad Spend ($)</label>
                <input type="number" value={adSpend} onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Impressions</label>
                <input type="number" value={adImpressions} onChange={(e) => setAdImpressions(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border rounded-lg font-mono" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Clicks</label>
                <input type="number" value={adClicks} onChange={(e) => setAdClicks(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono" />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Conversions</label>
                <input type="number" value={adConversions} onChange={(e) => setAdConversions(parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border rounded-lg font-mono" />
              </div>
            </div>

            {(() => {
              const ctr = adImpressions > 0 ? (adClicks / adImpressions) * 100 : 0;
              const cpc = adClicks > 0 ? adSpend / adClicks : 0;
              const cpa = adConversions > 0 ? adSpend / adConversions : 0;
              const convRate = adClicks > 0 ? (adConversions / adClicks) * 100 : 0;

              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 text-center">
                    <span className="text-[11px] text-sky-800 font-medium">CTR (Click-Through)</span>
                    <p className="text-xl font-bold font-mono text-sky-700 mt-0.5">{ctr.toFixed(2)}%</p>
                  </div>
                  <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[11px] text-emerald-800 font-medium">CPC (Cost Per Click)</span>
                    <p className="text-xl font-bold font-mono text-emerald-700 mt-0.5">${cpc.toFixed(2)}</p>
                  </div>
                  <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 text-center">
                    <span className="text-[11px] text-purple-800 font-medium">CPA (Acquisition Cost)</span>
                    <p className="text-xl font-bold font-mono text-purple-700 mt-0.5">${cpa.toFixed(2)}</p>
                  </div>
                  <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-200 text-center">
                    <span className="text-[11px] text-indigo-800 font-medium">Conversion Rate</span>
                    <p className="text-xl font-bold font-mono text-indigo-700 mt-0.5">{convRate.toFixed(2)}%</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* E. SEO, META TAGS & SERP */}
      {(category === 'SEO Tools' || category === 'SERP & Search Optimization' || category === 'Meta Tags & Structured Data' || category === 'Content & Keyword SEO' || slug.includes('meta') || slug.includes('serp') || slug.includes('seo')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Meta Title</label>
                <span className={`text-[11px] font-mono ${metaTitle.length > 60 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
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
                <span className={`text-[11px] font-mono ${metaDesc.length > 160 ? 'text-rose-500 font-bold' : 'text-slate-400'}`}>
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

          {/* Google SERP Snippet Preview */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Google Search (SERP) Live Preview</span>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs text-slate-600 block">{metaUrl}</span>
              <p className="text-base font-medium text-blue-800 hover:underline cursor-pointer line-clamp-1">{metaTitle}</p>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{metaDesc}</p>
            </div>
          </div>

          {/* Code Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">HTML Header Code</span>
              <button
                onClick={() => handleCopyText(generatedMetaTags, 'meta')}
                className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === 'meta' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'meta' ? 'Copied!' : 'Copy Tags'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-sky-200 text-xs font-mono rounded-xl overflow-x-auto border border-slate-800">
              {generatedMetaTags}
            </pre>
          </div>
        </div>
      )}

      {/* F. GENERAL WEB / SLUG TOOLS */}
      {(!category.includes('Video') && !category.includes('Audio') && !category.includes('Music') && !category.includes('File') && !category.includes('Marketing') && !category.includes('SEO') && !slug.includes('meta')) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Input String / Title</label>
            <input
              type="text"
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500/20"
              placeholder="Enter text..."
            />
          </div>

          {/* Generated URL Slug */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clean Sanitized URL Slug</span>
              <button
                onClick={() => handleCopyText(generatedSlug, 'slug')}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
              >
                {copiedKey === 'slug' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'slug' ? 'Copied' : 'Copy Slug'}</span>
              </button>
            </div>
            <p className="text-sm font-mono font-bold text-slate-900 bg-white p-2.5 rounded-lg border border-slate-200">
              {generatedSlug}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
