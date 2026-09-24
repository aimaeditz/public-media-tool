import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Tool } from '../../lib/types';
import JSZip from 'jszip';
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
  VolumeX,
  RefreshCw,
  Search,
  Sparkles,
  ShieldCheck,
  Tag,
  Clock,
  Layers,
  Upload,
  BarChart,
  Link as LinkIcon,
  Sliders,
  DollarSign,
  Mic,
  MicOff,
  Download,
  Activity,
  Radio,
  FileArchive,
  Code,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  FolderArchive
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

// WAV Encoder helper for client-side audio export
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const numSamples = buffer.length * numChannels;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;

  const arrayBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const sample = buffer.getChannelData(channel)[i];
      const clamped = Math.max(-1, Math.min(1, sample));
      const val = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
      view.setInt16(offset, val, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
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

  // -------------------------------------------------------------
  // AUDIO STATES & REFS
  // -------------------------------------------------------------
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [audioVolume, setAudioVolume] = useState<number>(1.0);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(30);
  const [fadeInSec, setFadeInSec] = useState<number>(1);
  const [fadeOutSec, setFadeOutSec] = useState<number>(2);

  // Metronome states
  const [metronomeBpm, setMetronomeBpm] = useState<number>(120);
  const [metronomeIsPlaying, setMetronomeIsPlaying] = useState<boolean>(false);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(0);
  const [metronomeTimeSignature, setMetronomeTimeSignature] = useState<number>(4);
  const tapTimesRef = useRef<number[]>([]);

  // Mic Recorder states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Speech Recognition (Speech to Text)
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const [transcriptText, setTranscriptText] = useState<string>('');
  const [speechLanguage, setSpeechLanguage] = useState<string>('en-US');
  const recognitionRef = useRef<any>(null);

  // Text to Speech
  const [ttsText, setTtsText] = useState<string>('Welcome to Public Media Tool. High performance browser audio synthesis running completely offline in your web browser.');
  const [ttsRate, setTtsRate] = useState<number>(1.0);
  const [ttsPitch, setTtsPitch] = useState<number>(1.0);
  const [ttsVoices, setTtsVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ttsSelectedVoice, setTtsSelectedVoice] = useState<string>('');

  // Guitar Tuner & Pitch generator
  const [selectedStringNote, setSelectedStringNote] = useState<string>('E4');
  const [activeTestFreq, setActiveTestFreq] = useState<number>(440);
  const [isPlayingTestTone, setIsPlayingTestTone] = useState<boolean>(false);

  // Music Key & Chords
  const [chordRoot, setChordRoot] = useState<string>('C');
  const [chordScale, setChordScale] = useState<string>('Major');
  const [transposeSemitones, setTransposeSemitones] = useState<number>(2);
  const [chordChartInput, setChordChartInput] = useState<string>('C  G  Am  F\nC  G  F   C');

  // Equalizer gains
  const [eqGains, setEqGains] = useState<number[]>([0, 0, 0, 0, 0]);

  // General Audio Context ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);
  const testOscRef = useRef<OscillatorNode | null>(null);

  // -------------------------------------------------------------
  // FILE / ZIP STATES
  // -------------------------------------------------------------
  const [zipFiles, setZipFiles] = useState<{ name: string; size: number; dir: boolean; date: Date }[]>([]);
  const [zipTotalSize, setZipTotalSize] = useState<number>(0);
  const [zipUncompressedSize, setZipUncompressedSize] = useState<number>(0);
  const [zipSelectedFile, setZipSelectedFile] = useState<string | null>(null);
  const [zipExtractedContent, setZipExtractedContent] = useState<string | null>(null);
  const [inspectedFileInfo, setInspectedFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
    lastModified: string;
    sha256?: string;
    sha512?: string;
  } | null>(null);

  // -------------------------------------------------------------
  // SEO & SERP STATES
  // -------------------------------------------------------------
  const [metaTitle, setMetaTitle] = useState<string>('Best Non-AI Client-Side Developer Tools | Public Media Tool');
  const [metaDesc, setMetaDesc] = useState<string>('Explore 1,516+ free client-side tools for developers, audio engineers, writers, and designers. 100% private in-browser computation with zero server uploads.');
  const [metaUrl, setMetaUrl] = useState<string>('https://aimaeditz.github.io/public-media-tool/');
  const [metaKeywords, setMetaKeywords] = useState<string>('privacy, developer tools, offline, audio editor, pdf converter, seo');
  const [robotsTxtRules, setRobotsTxtRules] = useState<string>('User-agent: *\nAllow: /\nDisallow: /private/\n\nSitemap: https://aimaeditz.github.io/public-media-tool/sitemap.xml');
  const [sitemapUrls, setSitemapUrls] = useState<string>('https://aimaeditz.github.io/public-media-tool/\nhttps://aimaeditz.github.io/public-media-tool/tools\nhttps://aimaeditz.github.io/public-media-tool/categories');
  const [schemaType, setSchemaType] = useState<string>('WebApplication');
  const [schemaAppName, setSchemaAppName] = useState<string>('Public Media Tool');
  const [schemaAppCategory, setSchemaAppCategory] = useState<string>('DeveloperApplication');
  const [keywordAnalysisText, setKeywordAnalysisText] = useState<string>('Client-side web applications provide unmatched privacy and performance. Modern browser tools execute directly on your device CPU and GPU without network latency or confidential document server leaks.');

  // -------------------------------------------------------------
  // MARKETING & VIDEO STATES
  // -------------------------------------------------------------
  const [utmUrl, setUtmUrl] = useState<string>('https://aimaeditz.github.io/public-media-tool/');
  const [utmSource, setUtmSource] = useState<string>('newsletter');
  const [utmMedium, setUtmMedium] = useState<string>('email');
  const [utmCampaign, setUtmCampaign] = useState<string>('march_release');
  const [adSpend, setAdSpend] = useState<number>(500);
  const [adClicks, setAdClicks] = useState<number>(1250);
  const [adImpressions, setAdImpressions] = useState<number>(45000);
  const [adConversions, setAdConversions] = useState<number>(48);
  const [videoWidth, setVideoWidth] = useState<number>(1920);
  const [videoHeight, setVideoHeight] = useState<number>(1080);
  const [videoDurationMin, setVideoDurationMin] = useState<number>(10);
  const [videoBitrateMbps, setVideoBitrateMbps] = useState<number>(15);
  const [videoFps, setVideoFps] = useState<number>(30);

  // Initialize TTS Voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setTtsVoices(v);
        if (v.length > 0 && !ttsSelectedVoice) {
          setTtsSelectedVoice(v[0].name);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Metronome Timer Loop
  useEffect(() => {
    if (!metronomeIsPlaying) return;
    const intervalMs = (60 / metronomeBpm) * 1000;
    const intervalId = setInterval(() => {
      setMetronomeBeat((prev) => {
        const nextBeat = (prev + 1) % metronomeTimeSignature;
        // Play click tone
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.value = nextBeat === 0 ? 1000 : 600;
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
          // fallback
        }
        return nextBeat;
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [metronomeIsPlaying, metronomeBpm, metronomeTimeSignature]);

  // Tap Tempo handler
  const handleTapTempo = () => {
    const now = performance.now();
    const taps = tapTimesRef.current;
    taps.push(now);
    if (taps.length > 5) taps.shift();
    if (taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgIntervalMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgIntervalMs > 200 && avgIntervalMs < 2000) {
        const calcBpm = Math.round(60000 / avgIntervalMs);
        setMetronomeBpm(Math.max(30, Math.min(300, calcBpm)));
      }
    }
  };

  // Handle Audio File Upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setIsPlaying(false);
  };

  // Audio Play / Pause
  const togglePlayAudio = () => {
    if (!audioElemRef.current) return;
    if (isPlaying) {
      audioElemRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElemRef.current.play();
      setIsPlaying(true);
    }
  };

  // Tone Generator Play / Stop
  const toggleTestTone = (freq: number) => {
    if (isPlayingTestTone) {
      if (testOscRef.current) {
        testOscRef.current.stop();
        testOscRef.current.disconnect();
      }
      setIsPlayingTestTone(false);
    } else {
      try {
        const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        testOscRef.current = osc;
        setIsPlayingTestTone(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Speak TTS
  const handleSpeakTTS = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.rate = ttsRate;
    utterance.pitch = ttsPitch;
    const voice = ttsVoices.find((v) => v.name === ttsSelectedVoice);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  // MediaRecorder Voice Recorder
  const handleToggleRecord = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        recordedChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedAudioUrl(url);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);
      } catch (err) {
        console.warn('Microphone access denied or not available.');
      }
    }
  };

  // Speech Recognition
  const handleToggleSpeechRecognition = () => {
    if (isRecognizing) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecognizing(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setTranscriptText('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      recognition.onresult = (event: any) => {
        let current = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          current += event.results[i][0].transcript;
        }
        setTranscriptText((prev) => (prev ? prev + ' ' + current : current));
      };

      recognition.onerror = () => setIsRecognizing(false);
      recognition.onend = () => setIsRecognizing(false);

      recognitionRef.current = recognition;
      recognition.start();
      setIsRecognizing(true);
    }
  };

  // Handle ZIP File Upload with JSZip
  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(file);
      const entries: { name: string; size: number; dir: boolean; date: Date }[] = [];
      let totalUncompressed = 0;

      loadedZip.forEach((relativePath, zipEntry) => {
        const size = (zipEntry as any)._data?.uncompressedSize || 0;
        totalUncompressed += size;
        entries.push({
          name: relativePath,
          size: size,
          dir: zipEntry.dir,
          date: zipEntry.date
        });
      });

      setZipFiles(entries);
      setZipTotalSize(file.size);
      setZipUncompressedSize(totalUncompressed);
    } catch (err) {
      console.warn('Error parsing ZIP file:', err);
    }
  };

  // Live file upload inspect for File Tools
  const handleFileInspect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashBuffer512 = await crypto.subtle.digest('SHA-512', arrayBuffer);

      const toHex = (buf: ArrayBuffer) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('');

      setInspectedFileInfo({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        lastModified: new Date(file.lastModified).toLocaleString(),
        sha256: toHex(hashBuffer256),
        sha512: toHex(hashBuffer512)
      });
    } catch (err) {
      setInspectedFileInfo({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        lastModified: new Date(file.lastModified).toLocaleString()
      });
    }
  };

  // Chord notes mapping
  const CHORD_NOTES: Record<string, string[]> = {
    C: ['C', 'E', 'G'],
    D: ['D', 'F#', 'A'],
    E: ['E', 'G#', 'B'],
    F: ['F', 'A', 'C'],
    G: ['G', 'B', 'D'],
    A: ['A', 'C#', 'E'],
    B: ['B', 'D#', 'F#'],
    Cm: ['C', 'D#', 'G'],
    Dm: ['D', 'F', 'A'],
    Em: ['E', 'G', 'B'],
    Fm: ['F', 'G#', 'C'],
    Gm: ['G', 'A#', 'D'],
    Am: ['A', 'C', 'E'],
    Bm: ['B', 'D', 'F#']
  };

  const KEY_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Transpose Chord Helper
  const transposedChordChart = useMemo(() => {
    return chordChartInput.replace(/\b([A-G][b#]?(?:m|maj7|min7|7|dim|aug|sus4)?)\b/g, (match) => {
      const base = match.replace(/[^A-G#b]/g, '');
      const suffix = match.slice(base.length);
      const idx = KEY_NOTES.indexOf(base);
      if (idx === -1) return match;
      const newIdx = (idx + transposeSemitones + 120) % 12;
      return KEY_NOTES[newIdx] + suffix;
    });
  }, [chordChartInput, transposeSemitones]);

  // Keyword Density calculations
  const keywordStats = useMemo(() => {
    const words = keywordAnalysisText.toLowerCase().match(/\b[a-z0-9_-]{2,}\b/g) || [];
    const totalWords = words.length;
    const freq: Record<string, number> = {};
    for (const w of words) {
      freq[w] = (freq[w] || 0) + 1;
    }
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density: totalWords > 0 ? ((count / totalWords) * 100).toFixed(1) : '0'
      }));
    return { totalWords, sorted };
  }, [keywordAnalysisText]);

  // Schema JSON-LD output
  const generatedSchema = useMemo(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: schemaAppName,
      applicationCategory: schemaAppCategory,
      operatingSystem: 'Any modern web browser',
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD'
      },
      description: metaDesc
    };
    return JSON.stringify(data, null, 2);
  }, [schemaType, schemaAppName, schemaAppCategory, metaDesc]);

  // -------------------------------------------------------------
  // DISPATCH DEDICATED TOOL VIEWS
  // -------------------------------------------------------------

  // 1. AUDIO SUITE (34 tools)
  if (category.includes('Audio') || category.includes('Music') || slug.includes('audio') || slug.includes('bpm') || slug.includes('sound') || slug.includes('voice') || slug.includes('speech') || slug.includes('chord') || slug.includes('tone') || slug.includes('metronome')) {
    return (
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">{tool.shortDesc}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Web Audio API</span>
        </div>

        {/* METRONOME */}
        {(slug.includes('metronome') || slug.includes('bpm-tool')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">Live Metronome & Tap Tempo</span>
              <span className="text-3xl font-black font-mono text-purple-600">{metronomeBpm} BPM</span>
            </div>

            {/* Beat visualizer */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(metronomeTimeSignature)].map((_, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl text-center font-bold font-mono transition-all ${
                    metronomeIsPlaying && metronomeBeat === i
                      ? 'bg-purple-600 text-white scale-105 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  Beat {i + 1}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="40"
                max="240"
                value={metronomeBpm}
                onChange={(e) => setMetronomeBpm(parseInt(e.target.value) || 120)}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setMetronomeIsPlaying(!metronomeIsPlaying)}
                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  metronomeIsPlaying ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {metronomeIsPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{metronomeIsPlaying ? 'Stop Metronome' : 'Start Metronome'}</span>
              </button>
              <button
                onClick={handleTapTempo}
                className="px-5 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-purple-400" />
                <span>Tap Tempo</span>
              </button>
            </div>
          </div>
        )}

        {/* VOICE RECORDER */}
        {(slug.includes('record') || slug.includes('voice-recorder')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase block">In-Browser Voice & Audio Recorder</span>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleToggleRecord}
                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  isRecording ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Microphone Recording'}</span>
              </button>
              {isRecording && <span className="text-xs font-mono font-bold text-rose-600">● LIVE RECORDING IN MEMORY</span>}
            </div>

            {recordedAudioUrl && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-purple-800 uppercase block">Recorded Audio Preview</span>
                <audio src={recordedAudioUrl} controls className="w-full" />
                <a
                  href={recordedAudioUrl}
                  download="voice_recording.webm"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700"
                >
                  <Download className="w-3.5 h-3.5" /> Download Recording (WebM)
                </a>
              </div>
            )}
          </div>
        )}

        {/* TEXT TO SPEECH */}
        {(slug.includes('text-to-speech') || slug.includes('synthesizer') || slug.includes('tts')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase block">Client-Side Speech Synthesizer (TTS)</span>
            <textarea
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500/20"
              placeholder="Enter text to speak..."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Voice Selection</label>
                <select
                  value={ttsSelectedVoice}
                  onChange={(e) => setTtsSelectedVoice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                >
                  {ttsVoices.map((v) => (
                    <option key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Speed Rate: {ttsRate}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={ttsRate}
                  onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Pitch: {ttsPitch}</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={ttsPitch}
                  onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSpeakTTS}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" /> Speak Text
              </button>
              <button
                onClick={() => window.speechSynthesis && window.speechSynthesis.cancel()}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* SPEECH TO TEXT */}
        {(slug.includes('speech-to-text') || slug.includes('recognizer')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">Live Speech to Text Transcriber</span>
              <select
                value={speechLanguage}
                onChange={(e) => setSpeechLanguage(e.target.value)}
                className="px-3 py-1.5 border rounded-lg text-xs font-medium"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="fr-FR">French (France)</option>
                <option value="de-DE">German</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese (Simplified)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleToggleSpeechRecognition}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isRecognizing ? 'bg-rose-600 text-white animate-pulse' : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isRecognizing ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecognizing ? 'Stop Listening' : 'Start Speech Recognition'}</span>
              </button>
              <button
                onClick={() => setTranscriptText('')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Clear
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 block">Recognized Transcript</label>
              <textarea
                value={transcriptText}
                readOnly
                rows={4}
                placeholder="Click 'Start Speech Recognition' and speak into your microphone..."
                className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>
        )}

        {/* CHORD GENERATOR & KEY TRANSPOSER */}
        {(slug.includes('chord') || slug.includes('transposer') || slug.includes('key')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase block">Musical Key Transposer & Progression Generator</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Root Key</label>
                <select
                  value={chordRoot}
                  onChange={(e) => setChordRoot(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                >
                  {KEY_NOTES.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Scale Mode</label>
                <select
                  value={chordScale}
                  onChange={(e) => setChordScale(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                >
                  <option value="Major">Major (I - ii - iii - IV - V - vi - vii°)</option>
                  <option value="Minor">Natural Minor (i - ii° - III - iv - v - VI - VII)</option>
                  <option value="Dorian">Dorian</option>
                  <option value="Mixolydian">Mixolydian</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Transpose Semitones: {transposeSemitones > 0 ? `+${transposeSemitones}` : transposeSemitones}</label>
                <input
                  type="range"
                  min="-11"
                  max="11"
                  value={transposeSemitones}
                  onChange={(e) => setTransposeSemitones(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Original Chord Chart</label>
                <textarea
                  value={chordChartInput}
                  onChange={(e) => setChordChartInput(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-xl font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-600 block">Transposed Chords</label>
                  <button
                    onClick={() => handleCopyText(transposedChordChart, 'chords')}
                    className="text-xs text-purple-600 font-bold flex items-center gap-1"
                  >
                    {copiedKey === 'chords' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'chords' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <textarea
                  value={transposedChordChart}
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-200 rounded-xl font-mono text-xs text-purple-900 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* GUITAR TUNER & FREQUENCY GENERATOR */}
        {(slug.includes('tuner') || slug.includes('frequency') || slug.includes('pitch') || slug.includes('delay') || slug.includes('bpm-to-millisecond')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase block">Instrument Pitch Reference & Tone Generator</span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              {[
                { note: 'E2', freq: 82.41, label: 'String 6 (Low E)' },
                { note: 'A2', freq: 110.0, label: 'String 5 (A)' },
                { note: 'D3', freq: 146.83, label: 'String 4 (D)' },
                { note: 'G3', freq: 196.0, label: 'String 3 (G)' },
                { note: 'B3', freq: 246.94, label: 'String 2 (B)' },
                { note: 'E4', freq: 329.63, label: 'String 1 (High E)' }
              ].map((item) => (
                <button
                  key={item.note}
                  onClick={() => {
                    setActiveTestFreq(item.freq);
                    setSelectedStringNote(item.note);
                    toggleTestTone(item.freq);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isPlayingTestTone && selectedStringNote === item.note
                      ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-400'
                      : 'bg-slate-50 hover:bg-purple-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <span className="text-base font-bold font-mono block">{item.note}</span>
                  <span className="text-[10px] opacity-80 block">{item.freq} Hz</span>
                </button>
              ))}
            </div>

            {/* Delay time calculator */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-slate-600 uppercase">Tempo Delay & Reverb Times ({metronomeBpm} BPM)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-white rounded border">1/4 Note: {(60000 / metronomeBpm).toFixed(1)} ms</div>
                <div className="p-2 bg-white rounded border">1/8 Note: {(30000 / metronomeBpm).toFixed(1)} ms</div>
                <div className="p-2 bg-white rounded border">1/16 Note: {(15000 / metronomeBpm).toFixed(1)} ms</div>
                <div className="p-2 bg-purple-50 text-purple-900 rounded border border-purple-200">Dotted 1/8: {((30000 / metronomeBpm) * 1.5).toFixed(1)} ms</div>
              </div>
            </div>
          </div>
        )}

        {/* GENERAL AUDIO WORKSTATION & PLAYER */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Load Audio File (MP3, WAV, OGG, AAC)</label>
            <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 hover:bg-purple-50/20 transition-all">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-semibold text-slate-700">Choose an audio file to process</span>
              <span className="text-xs text-slate-400 mt-1">Processed 100% locally in your browser memory</span>
              <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
            </label>
          </div>

          {audioUrl && (
            <div className="space-y-4">
              <audio
                ref={audioElemRef}
                src={audioUrl}
                onTimeUpdate={(e) => setAudioCurrentTime((e.target as HTMLAudioElement).currentTime)}
                onLoadedMetadata={(e) => {
                  const d = (e.target as HTMLAudioElement).duration;
                  setAudioDuration(d);
                  setTrimEnd(Math.min(30, d));
                }}
                className="w-full"
                controls
              />

              {/* Trimmer controls */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase block">Trimmer & Ringtone Slice (Seconds)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-slate-500 block mb-1">Start Time (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max={audioDuration}
                      value={trimStart}
                      onChange={(e) => setTrimStart(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">End Time (s)</label>
                    <input
                      type="number"
                      step="0.1"
                      min={trimStart}
                      max={audioDuration}
                      value={trimEnd}
                      onChange={(e) => setTrimEnd(parseFloat(e.target.value) || 30)}
                      className="w-full px-3 py-2 border rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Fade In (s)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      value={fadeInSec}
                      onChange={(e) => setFadeInSec(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 block mb-1">Fade Out (s)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="5"
                      value={fadeOutSec}
                      onChange={(e) => setFadeOutSec(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border rounded-lg font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. FILE & ARCHIVE SUITE (30 tools)
  if (category === 'File Tools' || slug.includes('zip') || slug.includes('file') || slug.includes('checksum') || slug.includes('archive')) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileArchive className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">{tool.shortDesc}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">JSZip & Crypto API</span>
        </div>

        {/* ZIP EXTRACTOR & INSPECTOR */}
        {(slug.includes('zip') || slug.includes('archive') || slug.includes('extractor')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Upload ZIP File to Inspect & Unpack</label>
              <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all">
                <FolderArchive className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-semibold text-slate-700">Choose a ZIP archive</span>
                <span className="text-xs text-slate-400 mt-1">Unpacks 100% client-side in browser RAM</span>
                <input type="file" accept=".zip,application/zip" onChange={handleZipUpload} className="hidden" />
              </label>
            </div>

            {zipFiles.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border text-center">
                    <span className="text-[11px] text-slate-500 block">Total Files Inside</span>
                    <span className="text-lg font-bold font-mono text-slate-800">{zipFiles.length} files</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border text-center">
                    <span className="text-[11px] text-slate-500 block">Compressed Size</span>
                    <span className="text-lg font-bold font-mono text-slate-800">{(zipTotalSize / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[11px] text-emerald-700 block">Uncompressed Size</span>
                    <span className="text-lg font-bold font-mono text-emerald-800">{(zipUncompressedSize / 1024).toFixed(1)} KB</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-600 uppercase">Archive File Directory</span>
                  <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y text-xs font-mono">
                    {zipFiles.map((f) => (
                      <div key={f.name} className="p-2.5 flex items-center justify-between hover:bg-slate-50">
                        <span className="truncate max-w-md">{f.dir ? '📁 ' : '📄 '} {f.name}</span>
                        <span className="text-slate-400">{(f.size / 1024).toFixed(1)} KB</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FILE CHECKSUM & METADATA */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase block mb-2">Inspect File Metadata & SHA Hash Checksums</label>
            <label className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 transition-all">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-semibold text-slate-700">Choose any file to calculate SHA-256 / SHA-512</span>
              <span className="text-xs text-slate-400 mt-1">Zero server upload. Processed with Web Cryptography API.</span>
              <input type="file" onChange={handleFileInspect} className="hidden" />
            </label>
          </div>

          {inspectedFileInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border">
                  <span className="text-slate-500 block">File Name</span>
                  <span className="font-mono font-bold text-slate-900 break-all">{inspectedFileInfo.name}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border">
                  <span className="text-slate-500 block">MIME Type</span>
                  <span className="font-mono font-bold text-slate-900">{inspectedFileInfo.type}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border">
                  <span className="text-slate-500 block">File Size</span>
                  <span className="font-mono font-bold text-slate-900">
                    {(inspectedFileInfo.size / 1024 / 1024).toFixed(2)} MB ({inspectedFileInfo.size.toLocaleString()} bytes)
                  </span>
                </div>
              </div>

              {inspectedFileInfo.sha256 && (
                <div className="p-4 bg-slate-900 text-emerald-300 rounded-xl space-y-2 border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-slate-400">SHA-256 Checksum</span>
                    <button
                      onClick={() => handleCopyText(inspectedFileInfo.sha256 || '', 'sha256')}
                      className="text-xs text-emerald-400 font-semibold flex items-center gap-1 hover:text-emerald-300"
                    >
                      {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'sha256' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono break-all">{inspectedFileInfo.sha256}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. SEO, SERP & STRUCTURED DATA (102 tools)
  if (category.includes('SEO') || category.includes('SERP') || category.includes('Meta') || slug.includes('meta') || slug.includes('serp') || slug.includes('robots') || slug.includes('sitemap') || slug.includes('schema') || slug.includes('keyword')) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-sky-400" />
            <div>
              <h3 className="font-bold text-base">{tool.name}</h3>
              <p className="text-xs text-slate-400">{tool.shortDesc}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">SEO Engine</span>
        </div>

        {/* ROBOTS.TXT BUILDER */}
        {(slug.includes('robots') || slug.includes('crawler')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">Robots.txt Generator & Validator</span>
              <button
                onClick={() => handleCopyText(robotsTxtRules, 'robots')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                {copiedKey === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'robots' ? 'Copied' : 'Copy robots.txt'}</span>
              </button>
            </div>
            <textarea
              value={robotsTxtRules}
              onChange={(e) => setRobotsTxtRules(e.target.value)}
              rows={6}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-sky-200 rounded-xl border border-slate-800"
            />
          </div>
        )}

        {/* SITEMAP XML GENERATOR */}
        {(slug.includes('sitemap') || slug.includes('xml-sitemap')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">XML Sitemap Generator</span>
              <button
                onClick={() => {
                  const urls = sitemapUrls.split('\n').filter((u) => u.trim());
                  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
                    .map(
                      (u) =>
                        `  <url>\n    <loc>${u.trim()}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
                    )
                    .join('\n')}\n</urlset>`;
                  handleCopyText(xml, 'sitemap');
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy Sitemap XML'}</span>
              </button>
            </div>
            <textarea
              value={sitemapUrls}
              onChange={(e) => setSitemapUrls(e.target.value)}
              rows={5}
              placeholder="Enter one URL per line..."
              className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl"
            />
          </div>
        )}

        {/* SCHEMA.ORG JSON-LD GENERATOR */}
        {(slug.includes('schema') || slug.includes('structured-data') || slug.includes('json-ld')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase">Schema.org JSON-LD Generator</span>
              <button
                onClick={() => handleCopyText(generatedSchema, 'schema')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'schema' ? 'Copied' : 'Copy JSON-LD'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Schema Type</label>
                <select
                  value={schemaType}
                  onChange={(e) => setSchemaType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                >
                  <option value="WebApplication">WebApplication</option>
                  <option value="Organization">Organization</option>
                  <option value="Article">Article</option>
                  <option value="Product">Product</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="FAQPage">FAQPage</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Name / Title</label>
                <input
                  type="text"
                  value={schemaAppName}
                  onChange={(e) => setSchemaAppName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Category</label>
                <input
                  type="text"
                  value={schemaAppCategory}
                  onChange={(e) => setSchemaAppCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>
            </div>

            <pre className="p-4 bg-slate-900 text-sky-200 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
              {generatedSchema}
            </pre>
          </div>
        )}

        {/* KEYWORD DENSITY */}
        {(slug.includes('keyword') || slug.includes('density') || slug.includes('content-seo')) && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <span className="text-xs font-bold text-slate-700 uppercase block">Keyword Density & Frequency Analyzer</span>
            <textarea
              value={keywordAnalysisText}
              onChange={(e) => setKeywordAnalysisText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-xl text-xs"
              placeholder="Paste content here to analyze keyword frequencies..."
            />
            <div className="p-3 bg-slate-50 rounded-xl border text-xs">
              <span className="font-bold text-slate-700">Total Word Count:</span> {keywordStats.totalWords} words
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {keywordStats.sorted.map((item) => (
                <div key={item.word} className="p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-center">
                  <span className="font-mono font-bold text-sky-900 block truncate">{item.word}</span>
                  <span className="text-[11px] text-sky-600">
                    {item.count}x ({item.density}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GENERAL SERP & META TAGS PREVIEW */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Meta Title ({metaTitle.length}/60)</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Canonical Target URL</label>
              <input
                type="text"
                value={metaUrl}
                onChange={(e) => setMetaUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="font-semibold text-slate-700">Meta Description ({metaDesc.length}/160)</label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Google SERP Live Snippet Preview</span>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs text-slate-600 block">{metaUrl}</span>
              <p className="text-base font-medium text-blue-800 hover:underline cursor-pointer line-clamp-1">{metaTitle}</p>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{metaDesc}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. MARKETING & VIDEO SUITE (default fallback for media runner)
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart className="w-6 h-6 text-sky-400" />
          <div>
            <h3 className="font-bold text-base">{tool.name}</h3>
            <p className="text-xs text-slate-400">{tool.shortDesc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded-full">Marketing & Video</span>
      </div>

      {/* UTM Campaign URL Builder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <span className="text-xs font-bold text-slate-700 uppercase block">UTM Campaign URL Builder</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-500 block mb-1">Target URL</label>
            <input type="text" value={utmUrl} onChange={(e) => setUtmUrl(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Campaign Source (e.g. google, newsletter)</label>
            <input type="text" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Campaign Medium (e.g. cpc, email)</label>
            <input type="text" value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-slate-500 block mb-1">Campaign Name</label>
            <input type="text" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>
        </div>

        {(() => {
          const fullUtm = `${utmUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}`;
          return (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500 uppercase">Tagged Marketing Link</span>
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

      {/* Ad ROI & Performance */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
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
                <span className="text-[11px] text-sky-800 font-medium">CTR</span>
                <p className="text-xl font-bold font-mono text-sky-700 mt-0.5">{ctr.toFixed(2)}%</p>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-center">
                <span className="text-[11px] text-emerald-800 font-medium">CPC</span>
                <p className="text-xl font-bold font-mono text-emerald-700 mt-0.5">${cpc.toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 text-center">
                <span className="text-[11px] text-purple-800 font-medium">CPA</span>
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
  );
};
