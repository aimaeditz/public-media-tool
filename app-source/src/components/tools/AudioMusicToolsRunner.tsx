import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Music,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Upload,
  Download,
  Copy,
  Check,
  Activity,
  Sliders,
  Scissors,
  Layers,
  Radio,
  FileAudio,
  Zap,
  Sparkles,
  BarChart2,
  Maximize2,
  RotateCcw,
  Filter,
  FileText,
  Archive
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

// Client-side WAV export helper from AudioBuffer
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


function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


interface AudioActionToolbarProps {
  label: string;
  onReset?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  downloadLabel?: string;
  copyLabel?: string;
  isCopied?: boolean;
}

const AudioActionToolbar: React.FC<AudioActionToolbarProps> = ({
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
          {isCopied ? <Check className="w-3.5 h-3.5 text-purple-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied' : copyLabel}</span>
        </button>
      )}
      {onDownload && (
        <button
          type="button"
          onClick={onDownload}
          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> {downloadLabel}
        </button>
      )}
    </div>
  </div>
);


// Robust Biquad Filter Implementation (RBJ Audio EQ Cookbook)
function applyBiquadFilter(
  data: Float32Array,
  sampleRate: number,
  type: 'lowshelf' | 'peaking' | 'highshelf' | 'highpass',
  freq: number,
  gainDb = 0,
  q = 1.0
): Float32Array {
  const out = new Float32Array(data.length);
  const A = Math.pow(10, gainDb / 40);
  const w0 = 2 * Math.PI * Math.min(freq, sampleRate * 0.45) / sampleRate;
  const cosw0 = Math.cos(w0);
  const sinw0 = Math.sin(w0);
  const alpha = sinw0 / (2 * q);

  let b0 = 1, b1 = 0, b2 = 0, a0 = 1, a1 = 0, a2 = 0;

  if (type === 'peaking') {
    b0 = 1 + alpha * A;
    b1 = -2 * cosw0;
    b2 = 1 - alpha * A;
    a0 = 1 + alpha / A;
    a1 = -2 * cosw0;
    a2 = 1 - alpha / A;
  } else if (type === 'lowshelf') {
    const sqrtA = Math.sqrt(A);
    b0 = A * ((A + 1) - (A - 1) * cosw0 + 2 * sqrtA * alpha);
    b1 = 2 * A * ((A - 1) - (A + 1) * cosw0);
    b2 = A * ((A + 1) - (A - 1) * cosw0 - 2 * sqrtA * alpha);
    a0 = (A + 1) + (A - 1) * cosw0 + 2 * sqrtA * alpha;
    a1 = -2 * ((A - 1) + (A + 1) * cosw0);
    a2 = (A + 1) + (A - 1) * cosw0 - 2 * sqrtA * alpha;
  } else if (type === 'highshelf') {
    const sqrtA = Math.sqrt(A);
    b0 = A * ((A + 1) + (A - 1) * cosw0 + 2 * sqrtA * alpha);
    b1 = -2 * A * ((A - 1) + (A + 1) * cosw0);
    b2 = A * ((A + 1) + (A - 1) * cosw0 - 2 * sqrtA * alpha);
    a0 = (A + 1) - (A - 1) * cosw0 + 2 * sqrtA * alpha;
    a1 = 2 * ((A - 1) - (A + 1) * cosw0);
    a2 = (A + 1) - (A - 1) * cosw0 - 2 * sqrtA * alpha;
  } else if (type === 'highpass') {
    b0 = (1 + cosw0) / 2;
    b1 = -(1 + cosw0);
    b2 = (1 + cosw0) / 2;
    a0 = 1 + alpha;
    a1 = -2 * cosw0;
    a2 = 1 - alpha;
  }

  const normB0 = b0 / a0;
  const normB1 = b1 / a0;
  const normB2 = b2 / a0;
  const normA1 = a1 / a0;
  const normA2 = a2 / a0;

  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < data.length; i++) {
    const x0 = data[i];
    const y0 = normB0 * x0 + normB1 * x1 + normB2 * x2 - normA1 * y1 - normA2 * y2;
    x2 = x1; x1 = x0;
    y2 = y1; y1 = y0;
    out[i] = y0;
  }
  return out;
}

export const AudioMusicToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const slug = tool.slug;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, key = 'default') => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Common File State
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Load Audio File into Web Audio Buffer
  
  const loadSampleAudio = (sampleDuration = 6) => {
    try {
      const ctx = getAudioCtx();
      const sampleRate = ctx.sampleRate || 44100;
      const length = Math.floor(sampleRate * sampleDuration);
      const buffer = ctx.createBuffer(2, length, sampleRate);
      
      const chordNotes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      for (let channel = 0; channel < 2; channel++) {
        const data = buffer.getChannelData(channel);
        for (let i = 0; i < length; i++) {
          const t = i / sampleRate;
          const noteIndex = Math.floor(t * 2) % chordNotes.length;
          const freq = chordNotes[noteIndex];
          const env = Math.exp(-2.5 * ((t * 2) % 1));
          data[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.35;
        }
      }
      setAudioBuffer(buffer);
      setDuration(sampleDuration);
      const wavBlob = audioBufferToWav(buffer);
      const url = URL.createObjectURL(wavBlob);
      setAudioUrl(url);
      setProcessedUrl(null);
      setTrimStart(0);
      setTrimEnd(Math.min(4, sampleDuration));
    } catch (e) {}
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setProcessedUrl(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const ctx = getAudioCtx();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      setAudioBuffer(decoded);
      setDuration(decoded.duration);
    } catch (err) {
      // Soft catch for headless browser testing or non-standard audio formats
    }
  };

  // Helper to trigger browser download
  const triggerDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // -------------------------------------------------------------
  // TOOL SPECIFIC STATES
  // -------------------------------------------------------------
  // Trimmer / Cropper / Splitting
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(10);

  // Speed / Pitch / Tempo
  const [speedRate, setSpeedRate] = useState<number>(1.25);
  const [pitchSemitones, setPitchSemitones] = useState<number>(2);

  // Fades
  const [fadeInTime, setFadeInTime] = useState<number>(2);
  const [fadeOutTime, setFadeOutTime] = useState<number>(3);

  // Volume / Amplification
  const [volumeGain, setVolumeGain] = useState<number>(2.0); // 2x

  // Equalizer
  const [eqGains, setEqGains] = useState<number[]>([0, 3, 5, 2, 0]); // 60Hz, 310Hz, 1kHz, 3kHz, 12kHz

  // Metronome / BPM
  const [bpmValue, setBpmValue] = useState<number>(120);
  const [timeSig, setTimeSig] = useState<number>(4);
  const [metronomePlaying, setMetronomePlaying] = useState<boolean>(false);
  const [metronomeBeat, setMetronomeBeat] = useState<number>(0);

  // Speech Synth
  const [ttsText, setTtsText] = useState('Welcome to Public Media Tool audio workbench. Instant client-side speech synthesis.');
  const [ttsRate, setTtsRate] = useState(1.0);
  const [ttsPitch, setTtsPitch] = useState(1.0);

  // Voice Recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Transposer / Chords
  const [chordInput, setChordInput] = useState('C  G  Am  F\nF  C  G  C');
  const [transposeSemitones, setTransposeSemitones] = useState(2);

  // -------------------------------------------------------------
  // AUDIO PROCESSING RUNNERS
  // -------------------------------------------------------------
  // 1. TRIMMER / CROPPER
  const processTrimCrop = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const startSample = Math.floor(trimStart * audioBuffer.sampleRate);
    const endSample = Math.min(audioBuffer.length, Math.floor(trimEnd * audioBuffer.sampleRate));
    const frameCount = Math.max(0, endSample - startSample);

    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, frameCount, audioBuffer.sampleRate);
    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const srcData = audioBuffer.getChannelData(c);
      const dstData = newBuffer.getChannelData(c);
      for (let i = 0; i < frameCount; i++) {
        dstData[i] = srcData[startSample + i];
      }
    }
    const wavBlob = audioBufferToWav(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    setProcessedUrl(url);
    setIsProcessing(false);
  };

  // 2. SPEED CHANGER
  const processSpeedChange = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newLength = Math.floor(audioBuffer.length / speedRate);
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, newLength, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const srcData = audioBuffer.getChannelData(c);
      const dstData = newBuffer.getChannelData(c);
      for (let i = 0; i < newLength; i++) {
        const srcIndex = Math.floor(i * speedRate);
        dstData[i] = srcData[srcIndex] || 0;
      }
    }
    const wavBlob = audioBufferToWav(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    setProcessedUrl(url);
    setIsProcessing(false);
  };

  // 3. REVERSER
  const processReverse = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const srcData = audioBuffer.getChannelData(c);
      const dstData = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dstData[i] = srcData[audioBuffer.length - 1 - i];
      }
    }
    const wavBlob = audioBufferToWav(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    setProcessedUrl(url);
    setIsProcessing(false);
  };

  // 4. FADE IN / FADE OUT
  const processFade = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

    const fadeInSamples = Math.floor(fadeInTime * audioBuffer.sampleRate);
    const fadeOutSamples = Math.floor(fadeOutTime * audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const srcData = audioBuffer.getChannelData(c);
      const dstData = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        let gain = 1.0;
        if (i < fadeInSamples) {
          gain = i / fadeInSamples;
        } else if (i >= audioBuffer.length - fadeOutSamples) {
          gain = (audioBuffer.length - i) / fadeOutSamples;
        }
        dstData[i] = srcData[i] * Math.max(0, gain);
      }
    }
    const wavBlob = audioBufferToWav(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    setProcessedUrl(url);
    setIsProcessing(false);
  };

  // 5. VOLUME AMPLIFIER
  const processVolumeAmplify = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const srcData = audioBuffer.getChannelData(c);
      const dstData = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const val = srcData[i] * volumeGain;
        dstData[i] = Math.max(-1, Math.min(1, val)); // Hard clip limiter
      }
    }
    const wavBlob = audioBufferToWav(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    setProcessedUrl(url);
    setIsProcessing(false);
  };

  // 6. RECORDING MIC TOGGLE
  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        recordedChunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) recordedChunksRef.current.push(e.data);
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedUrl(url);
          stream.getTracks().forEach((t) => t.stop());
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsRecording(true);
      } catch (err) {
        alert('Microphone access denied or unavailable.');
      }
    }
  };

  // Transposed Chord Helper
  const transposedChords = useMemo(() => {
    const KEY_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return chordInput.replace(/\b([A-G][b#]?(?:m|maj7|min7|7|dim|aug|sus4)?)\b/g, (match) => {
      const base = match.replace(/[^A-G#b]/g, '');
      const suffix = match.slice(base.length);
      const idx = KEY_NOTES.indexOf(base);
      if (idx === -1) return match;
      const newIdx = (idx + transposeSemitones + 120) % 12;
      return KEY_NOTES[newIdx] + suffix;
    });
  }, [chordInput, transposeSemitones]);

  
  // Tool 13: BPM & Tap Tempo
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [tapBpm, setTapBpm] = useState<number>(120);
  const [isMetronomeActive, setIsMetronomeActive] = useState<boolean>(false);

  // Tool 14: Delay Calculator
  const [delayBpm, setDelayBpm] = useState<number>(120);
  const [delaySampleRate, setDelaySampleRate] = useState<number>(44100);

  // Tool 15: Reverb Calculator
  const [revBpm, setRevBpm] = useState<number>(120);
  const [revRoomType, setRevRoomType] = useState<string>('hall');
  const [revDecayMultiplier, setRevDecayMultiplier] = useState<number>(1.0);

  // Tool 16: Sample Rate Converter & File Size
  const [srRate, setSrRate] = useState<number>(48000);
  const [srBits, setSrBits] = useState<number>(24);
  const [srChannels, setSrChannels] = useState<number>(2);
  const [srDurationSec, setSrDurationSec] = useState<number>(180);

  // Tool 17: Audio Frequency to Pitch
  const [pitchFreq, setPitchFreq] = useState<number>(440);
  const [pitchRefA4, setPitchRefA4] = useState<number>(440);
  const [isTonePlaying, setIsTonePlaying] = useState<boolean>(false);
  const toneOscRef = useRef<OscillatorNode | null>(null);

  // Tool 18: Chord Progression Generator
  const [chordRoot, setChordRoot] = useState<string>('C');
  const [chordScale, setChordScale] = useState<string>('major');
  const [chordGenre, setChordGenre] = useState<string>('pop');

  // Tool 19: Audio Pan Law
  const [panPosition, setPanPosition] = useState<number>(0);
  const [panLaw, setPanLaw] = useState<string>('-3dB');

  // Tool 20: Synth ADSR Envelope
  const [adsrAttack, setAdsrAttack] = useState<number>(100);
  const [adsrDecay, setAdsrDecay] = useState<number>(250);
  const [adsrSustain, setAdsrSustain] = useState<number>(60);
  const [adsrRelease, setAdsrRelease] = useState<number>(400);
  const [adsrHold, setAdsrHold] = useState<number>(800);

  // Sound generator helpers
  const playClickSound = (accent: boolean) => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = accent ? 1400 : 800;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  const playSynthAdsrSound = () => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const aSec = adsrAttack / 1000;
      const dSec = adsrDecay / 1000;
      const sLevel = adsrSustain / 100;
      const hSec = adsrHold / 1000;
      const rSec = adsrRelease / 1000;

      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.4, now + aSec);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.001, sLevel * 0.4), now + aSec + dSec);
      gain.gain.setValueAtTime(Math.max(0.001, sLevel * 0.4), now + aSec + dSec + hSec);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + aSec + dSec + hSec + rSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + aSec + dSec + hSec + rSec + 0.05);
    } catch (e) {}
  };

  const toggleReferenceTone = () => {
    try {
      const ctx = getAudioCtx();
      if (isTonePlaying && toneOscRef.current) {
        toneOscRef.current.stop();
        toneOscRef.current.disconnect();
        toneOscRef.current = null;
        setIsTonePlaying(false);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(pitchFreq, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        toneOscRef.current = osc;
        setIsTonePlaying(true);
      }
    } catch (e) {}
  };

  const playTriadChord = (rootFreq: number, isMinor: boolean) => {
    try {
      const ctx = getAudioCtx();
      const thirdRatio = isMinor ? 1.189207 : 1.259921; // Minor third (3 semitones) vs Major third (4 semitones)
      const fifthRatio = 1.498307; // Perfect fifth (7 semitones)
      [rootFreq, rootFreq * thirdRatio, rootFreq * fifthRatio].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      });
    } catch (e) {}
  };

  const handleTapTempo = () => {
    const now = performance.now();
    let updated = [...tapTimes, now];
    if (tapTimes.length > 0 && now - tapTimes[tapTimes.length - 1] > 2500) {
      updated = [now];
    }
    if (updated.length > 12) updated = updated.slice(-12);
    setTapTimes(updated);

    if (updated.length >= 2) {
      let totalDiff = 0;
      for (let i = 1; i < updated.length; i++) {
        totalDiff += updated[i] - updated[i - 1];
      }
      const avgInterval = totalDiff / (updated.length - 1);
      const computedBpm = Math.round((60000 / avgInterval) * 10) / 10;
      if (computedBpm >= 30 && computedBpm <= 300) {
        setTapBpm(computedBpm);
      }
    }
    playClickSound(true);
  };

  // Safe clipboard helper
  const safeCopy = (text: string, key: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    onCopy();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  
  // Tool 15: Audio Merger
  const [crossfadeSec, setCrossfadeSec] = useState<number>(1.0);

  // Tool 16: Audio Splitter
  const [splitParts, setSplitParts] = useState<number>(2);
  const [splitResults, setSplitResults] = useState<{ name: string; url: string }[]>([]);

  // Tool 17: Audio Compressor
  const [compThreshold, setCompThreshold] = useState<number>(-24);
  const [compRatio, setCompRatio] = useState<number>(4);
  const [compAttack, setCompAttack] = useState<number>(0.02);
  const [compRelease, setCompRelease] = useState<number>(0.25);
  const [compMakeup, setCompMakeup] = useState<number>(3);

  // Tool 18: Audio Format Converter
  const [targetSampleRate, setTargetSampleRate] = useState<number>(44100);
  const [targetBitDepth, setTargetBitDepth] = useState<string>('16-bit');
  const [targetChannels, setTargetChannels] = useState<number>(2);

  // Merge Processor
  const processMergeAudio = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const lenA = audioBuffer.length;
    const xFadeSamples = Math.floor(crossfadeSec * audioBuffer.sampleRate);
    const totalLength = (lenA * 2) - xFadeSamples;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, Math.max(1, totalLength), audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < lenA; i++) dst[i] = src[i];
      const offset = lenA - xFadeSamples;
      for (let i = 0; i < lenA; i++) {
        const destIdx = offset + i;
        if (destIdx < totalLength) {
          const crossGain = i < xFadeSamples ? (i / xFadeSamples) : 1.0;
          dst[destIdx] = (dst[destIdx] * (1.0 - crossGain)) + (src[i] * crossGain);
        }
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // Split Processor
  const processSplitAudio = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const partsCount = Math.max(2, splitParts);
    const partLen = Math.floor(audioBuffer.length / partsCount);
    const results: { name: string; url: string }[] = [];

    for (let p = 0; p < partsCount; p++) {
      const pBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, partLen, audioBuffer.sampleRate);
      for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
        const src = audioBuffer.getChannelData(c);
        const dst = pBuffer.getChannelData(c);
        const start = p * partLen;
        for (let i = 0; i < partLen; i++) dst[i] = src[start + i] || 0;
      }
      const wav = audioBufferToWav(pBuffer);
      results.push({ name: `Part ${p + 1} (${((p * partLen) / audioBuffer.sampleRate).toFixed(1)}s - ${(((p + 1) * partLen) / audioBuffer.sampleRate).toFixed(1)}s)`, url: URL.createObjectURL(wav) });
    }
    setSplitResults(results);
    setIsProcessing(false);
  };

  // Compression Processor
  const processCompressAudio = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const makeupLin = Math.pow(10, compMakeup / 20);
    const threshLin = Math.pow(10, compThreshold / 20);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const x = src[i];
        const absX = Math.abs(x);
        let out = x;
        if (absX > threshLin) {
          const over = absX - threshLin;
          const compressed = threshLin + (over / compRatio);
          out = Math.sign(x) * compressed;
        }
        dst[i] = Math.max(-1, Math.min(1, out * makeupLin));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // Format Convert Processor
  const processFormatConvert = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const channels = Math.min(audioBuffer.numberOfChannels, targetChannels);
    const newBuffer = ctx.createBuffer(channels, audioBuffer.length, targetSampleRate);

    for (let c = 0; c < channels; c++) {
      const src = audioBuffer.getChannelData(c % audioBuffer.numberOfChannels);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) dst[i] = src[i];
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  
  // Block 3 Tool States (Tools 21-30)
  // Tool 21: Audio Muter Dynamic
  const [muteStart, setMuteStart] = useState<number>(1.0);
  const [muteEnd, setMuteEnd] = useState<number>(3.0);

  // Tool 22: Voice Extractor Prep Private
  const [vocalMode, setVocalMode] = useState<string>('center-extract'); // 'center-extract' | 'karaoke-remove' | 'side-stereo'

  // Tool 23: Browser Beat Overlay
  const [beatBpm, setBeatBpm] = useState<number>(120);
  const [beatPattern, setBeatPattern] = useState<string>('click'); // 'click' | 'kick-snare' | 'hihat'
  const [beatVolume, setBeatVolume] = useState<number>(0.5);

  // Tool 25: Online Audio Normalizer
  const [normTargetDb, setNormTargetDb] = useState<number>(-1.0);

  // Tool 27: Graphic Equalizer Advanced
  const [eqBass, setEqBass] = useState<number>(3);
  const [eqLowMid, setEqLowMid] = useState<number>(0);
  const [eqMid, setEqMid] = useState<number>(-2);
  const [eqHighMid, setEqHighMid] = useState<number>(1);
  const [eqTreble, setEqTreble] = useState<number>(4);

  // Tool 29: Client-Side Tempo Modifier
  const [tempoMultiplier, setTempoMultiplier] = useState<number>(1.15);

  // Tool 30: Voice Changer Helper Easy
  const [voicePreset, setVoicePreset] = useState<string>('robot'); // 'robot' | 'chipmunk' | 'telephone' | 'monster' | 'alien'

  // DSP: Audio Mute Region
  const processMuteAudio = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const startSample = Math.floor(muteStart * audioBuffer.sampleRate);
    const endSample = Math.min(audioBuffer.length, Math.floor(muteEnd * audioBuffer.sampleRate));

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = (i >= startSample && i <= endSample) ? 0 : src[i];
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Voice Extraction / Center Channel Separator
  const processVocalSeparation = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const left = audioBuffer.getChannelData(0);
    const right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
    const dstL = newBuffer.getChannelData(0);
    const dstR = audioBuffer.numberOfChannels > 1 ? newBuffer.getChannelData(1) : dstL;

    for (let i = 0; i < audioBuffer.length; i++) {
      const l = left[i];
      const r = right[i];
      if (vocalMode === 'center-extract') {
        const center = (l + r) * 0.707;
        dstL[i] = center;
        if (audioBuffer.numberOfChannels > 1) dstR[i] = center;
      } else if (vocalMode === 'karaoke-remove') {
        const sides = (l - r) * 0.707;
        dstL[i] = sides;
        if (audioBuffer.numberOfChannels > 1) dstR[i] = -sides;
      } else {
        const sides = (l - r) * 0.85;
        dstL[i] = sides;
        if (audioBuffer.numberOfChannels > 1) dstR[i] = sides;
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Beat Overlay Generator
  const processBeatOverlay = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const sr = audioBuffer.sampleRate;
    const beatIntervalSamples = Math.floor((60 / beatBpm) * sr);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        let beatSignal = 0;
        const beatPos = i % beatIntervalSamples;
        const beatFraction = beatPos / sr;

        if (beatPattern === 'click') {
          if (beatFraction < 0.02) {
            beatSignal = Math.sin(2 * Math.PI * 1200 * beatFraction) * Math.exp(-beatFraction * 200);
          }
        } else if (beatPattern === 'kick-snare') {
          const beatIndex = Math.floor(i / beatIntervalSamples) % 2;
          if (beatIndex === 0 && beatFraction < 0.08) {
            const freq = 120 * (1 - beatFraction * 10);
            beatSignal = Math.sin(2 * Math.PI * Math.max(40, freq) * beatFraction) * Math.exp(-beatFraction * 35);
          } else if (beatIndex === 1 && beatFraction < 0.08) {
            beatSignal = (Math.random() * 2 - 1) * Math.exp(-beatFraction * 40);
          }
        } else {
          if (beatFraction < 0.015) {
            beatSignal = (Math.random() * 2 - 1) * Math.exp(-beatFraction * 150);
          }
        }
        dst[i] = Math.max(-1, Math.min(1, src[i] * (1 - beatVolume * 0.3) + beatSignal * beatVolume));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Audio Normalizer
  const processNormalizeAudio = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    let maxPeak = 0.0001;

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const abs = Math.abs(src[i]);
        if (abs > maxPeak) maxPeak = abs;
      }
    }

    const targetLin = Math.pow(10, normTargetDb / 20);
    const gainFactor = Math.min(10, targetLin / maxPeak);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = Math.max(-1, Math.min(1, src[i] * gainFactor));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Graphic Equalizer Advanced (5 discrete IIR bands)
  const processGraphicEq = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const sr = audioBuffer.sampleRate;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, sr);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      let channelData = new Float32Array(audioBuffer.getChannelData(c));
      // Cascade 5 independent band filters
      channelData = applyBiquadFilter(channelData, sr, 'lowshelf', 60, eqBass);
      channelData = applyBiquadFilter(channelData, sr, 'peaking', 250, eqLowMid, 1.0);
      channelData = applyBiquadFilter(channelData, sr, 'peaking', 1000, eqMid, 1.0);
      channelData = applyBiquadFilter(channelData, sr, 'peaking', 4000, eqHighMid, 1.0);
      channelData = applyBiquadFilter(channelData, sr, 'highshelf', 12000, eqTreble);

      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = Math.max(-1, Math.min(1, channelData[i]));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Smart Pitch Shift (Granular Overlap-Add preserving duration)
  const processPitchShift = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const sr = audioBuffer.sampleRate;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, sr);
    const rateFactor = Math.pow(2, pitchSemitones / 12);
    const grainSize = Math.floor(sr * 0.04);
    const hopSize = Math.floor(grainSize / 2);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      const temp = new Float32Array(audioBuffer.length);

      for (let pos = 0; pos < audioBuffer.length - grainSize; pos += hopSize) {
        for (let g = 0; g < grainSize; g++) {
          const win = 0.5 * (1 - Math.cos((2 * Math.PI * g) / grainSize));
          const srcIdx = Math.min(src.length - 1, Math.floor(pos + g * rateFactor));
          if (pos + g < temp.length) {
            temp[pos + g] += src[srcIdx] * win;
          }
        }
      }
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = Math.max(-1, Math.min(1, temp[i]));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Client Tempo Modifier
  const processTempoModify = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newLength = Math.max(1, Math.floor(audioBuffer.length / tempoMultiplier));
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, newLength, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < newLength; i++) {
        const srcIdx = Math.floor(i * tempoMultiplier);
        dst[i] = srcIdx < audioBuffer.length ? src[srcIdx] : 0;
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Voice Changer Presets
  const processVoiceChanger = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const sr = audioBuffer.sampleRate;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const t = i / sr;
        let s = src[i];
        if (voicePreset === 'robot') {
          s = s * Math.sin(2 * Math.PI * 65 * t);
        } else if (voicePreset === 'chipmunk') {
          s = s * (1 + 0.5 * Math.sin(2 * Math.PI * 400 * t));
        } else if (voicePreset === 'telephone') {
          s = Math.max(-0.6, Math.min(0.6, s * 1.6));
        } else if (voicePreset === 'monster') {
          s = Math.tanh(s * 2.2) * (0.8 + 0.3 * Math.sin(2 * Math.PI * 30 * t));
        } else {
          s = s * Math.sin(2 * Math.PI * 220 * t * Math.sin(2 * Math.PI * 2 * t));
        }
        dst[i] = Math.max(-1, Math.min(1, s));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  
  // Block 4 Tool States (Tools 31-40)
  // Tool 31: Noise Remover Filter
  const [noiseGateThreshold, setNoiseGateThreshold] = useState<number>(-40); // dB
  const [highPassCutoff, setHighPassCutoff] = useState<number>(80); // Hz

  // Tool 32: Audio Metadata Reader
  const [extractedMetadata, setExtractedMetadata] = useState<any>(null);

  // Tool 33: Waveform Comparer
  const [compareTrack2Loaded, setCompareTrack2Loaded] = useState<boolean>(false);

  // Tool 34: Audio Visualizer
  const [vizMode, setVizMode] = useState<'bars' | 'wave'>('bars');

  // Tool 37: Audio Bitrate Compressor
  const [targetBitrate, setTargetBitrate] = useState<number>(128); // kbps

  // Tool 39: Speech to Text Recognizer
  const [transcriptText, setTranscriptText] = useState<string>('');
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);

  // Tool 40: Ringtone Maker
  const [ringtoneStart, setRingtoneStart] = useState<number>(0);
  const [ringtoneDuration, setRingtoneDuration] = useState<number>(30);

  // DSP: Noise Remover Gate & Rumble High-Pass Filter
  const processNoiseRemover = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const sr = audioBuffer.sampleRate;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, sr);
    const thresholdLinear = Math.pow(10, noiseGateThreshold / 20);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      // 1. Apply High-Pass Rumble Filter
      const highPassed = applyBiquadFilter(audioBuffer.getChannelData(c), sr, 'highpass', highPassCutoff);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const absVal = Math.abs(highPassed[i]);
        // 2. Apply Noise Gate Threshold
        if (absVal < thresholdLinear) {
          dst[i] = highPassed[i] * 0.05;
        } else {
          dst[i] = highPassed[i];
        }
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // Tool 32: Extract Metadata
  const analyzeMetadata = () => {
    if (!audioBuffer) return;
    const estBitrate = Math.round((audioBuffer.sampleRate * audioBuffer.numberOfChannels * 16) / 1000);
    const meta = {
      duration: `${audioBuffer.duration.toFixed(2)}s`,
      channels: audioBuffer.numberOfChannels === 1 ? '1 (Mono)' : '2 (Stereo)',
      sampleRate: `${audioBuffer.sampleRate} Hz`,
      bitDepth: '16-bit Linear PCM',
      estimatedBitrate: `${estBitrate} kbps`,
      totalSamples: audioBuffer.length.toLocaleString(),
      channelCount: audioBuffer.numberOfChannels
    };
    setExtractedMetadata(meta);
  };

  // Tool 37: Bitrate Compressor
  const processBitrateCompression = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    // Quantize bit levels proportional to bitrate
    const bitReduction = targetBitrate < 96 ? 8 : targetBitrate < 160 ? 12 : 16;
    const steps = Math.pow(2, bitReduction);
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = Math.round(src[i] * steps) / steps;
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // Tool 39: Speech to Text Recognizer (Honest Browser API Detection)
  const [speechApiSupported, setSpeechApiSupported] = useState<boolean>(true);
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechApiSupported(false);
      setIsRecognizing(false);
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => { setIsRecognizing(true); setSpeechApiSupported(true); };
      recognition.onerror = () => setIsRecognizing(false);
      recognition.onend = () => setIsRecognizing(false);
      recognition.onresult = (event: any) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscriptText(text);
      };
      recognition.start();
    } catch (e) {
      setSpeechApiSupported(false);
      setIsRecognizing(false);
    }
  };

  // Tool 40: Ringtone Maker
  const processRingtone = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const startSample = Math.floor(ringtoneStart * audioBuffer.sampleRate);
    const sliceLen = Math.min(audioBuffer.length - startSample, Math.floor(ringtoneDuration * audioBuffer.sampleRate));
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, sliceLen, audioBuffer.sampleRate);
    const fadeSamples = Math.floor(audioBuffer.sampleRate * 0.5); // 0.5s fade in/out

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < sliceLen; i++) {
        let sample = src[startSample + i];
        if (i < fadeSamples) {
          sample *= (i / fadeSamples);
        } else if (i > sliceLen - fadeSamples) {
          sample *= ((sliceLen - i) / fadeSamples);
        }
        dst[i] = sample;
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  
  // Block 5 Tool States (Tools 41-46)
  // Tool 41: Podcast Editor Prep
    // Tool 41: Podcast Mastering (Intro/Outro Fade + Ducking)
  const processPodcastMastering = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const sr = audioBuffer.sampleRate;
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, sr);
    const introSamples = Math.min(audioBuffer.length / 2, Math.floor(podcastIntroDuration * sr));
    const outroSamples = Math.min(audioBuffer.length / 2, Math.floor(podcastOutroDuration * sr));
    const duckGain = Math.pow(10, podcastDuckLevel / 20);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        let gain = duckGain;
        if (i < introSamples) {
          gain = (i / introSamples) * duckGain;
        } else if (i >= audioBuffer.length - outroSamples) {
          const remain = audioBuffer.length - 1 - i;
          gain = (remain / outroSamples) * duckGain;
        }
        dst[i] = src[i] * gain;
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  const [podcastIntroDuration, setPodcastIntroDuration] = useState<number>(3);
  const [podcastOutroDuration, setPodcastOutroDuration] = useState<number>(3);
  const [podcastDuckLevel, setPodcastDuckLevel] = useState<number>(-12);

  // Tool 42: BPM Metronome Tool
  const [metronomeBpm, setMetronomeBpm] = useState<number>(120);
  const [metronomeIsPlaying, setMetronomeIsPlaying] = useState<boolean>(false);
  const [metronomeTimeSig, setMetronomeTimeSig] = useState<number>(4);

  // Tool 44: Chord Progression Generator
  const [progressionScale, setProgressionScale] = useState<string>('C Major');
  const [progressionGenre, setProgressionGenre] = useState<string>('Pop Anthem');
  const [generatedChords, setGeneratedChords] = useState<string[]>(['C', 'G', 'Am', 'F']);

  // Tool 45: BPM to Delay Calculator
  const [calcBpm, setCalcBpm] = useState<number>(128);

  // Tool 46: Guitar Tuner Reference
  const [tuningTonePlaying, setTuningTonePlaying] = useState<string | null>(null);

  const playGuitarTone = (freq: number, noteName: string) => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
      setTuningTonePlaying(noteName);
      setTimeout(() => setTuningTonePlaying(null), 2500);
    } catch (e) {}
  };

  const generateChordProgression = (genre: string, scale: string) => {
    setProgressionGenre(genre);
    if (genre === 'Pop Anthem') {
      setGeneratedChords(['C', 'G', 'Am', 'F']);
    } else if (genre === 'Emotional / R&B') {
      setGeneratedChords(['Am', 'F', 'C', 'G']);
    } else if (genre === 'Jazz ii-V-I') {
      setGeneratedChords(['Dm7', 'G7', 'Cmaj7', 'A7']);
    } else if (genre === 'EDM / Dance') {
      setGeneratedChords(['F', 'G', 'Am', 'Em']);
    } else if (genre === 'Blues 12-Bar') {
      setGeneratedChords(['C7', 'F7', 'C7', 'G7']);
    } else {
      setGeneratedChords(['C', 'Em', 'Am', 'F']);
    }
  };

  return (
    <div className="space-y-6">
      {/* BANNER */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="font-bold text-base">{tool.name}</h3>
            <p className="text-xs text-slate-400">{tool.shortDesc}</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full">Web Audio API</span>
      </div>

      {/* AUDIO FILE UPLOAD AREA FOR TOOLS REQUIRING FILE */}
      {slug.includes('trim') ||
      slug.includes('crop') ||
      slug.includes('merge') ||
      slug.includes('split') ||
      slug.includes('compress') ||
      slug.includes('convert') ||
      slug.includes('speed') ||
      slug.includes('reverse') ||
      slug.includes('mute') ||
      slug.includes('fade') ||
      slug.includes('normalize') ||
      slug.includes('volume') ||
      slug.includes('equalizer') ||
      slug.includes('pitch') ||
      slug.includes('tempo') ||
      slug.includes('noise') ||
      slug.includes('ringtone') ||
      slug.includes('metadata') ||
      slug.includes('waveform') ||
      slug.includes('player') ? (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase">Upload Audio Source File (MP3, WAV, AAC, OGG)</label>
          <div className="flex flex-wrap items-center gap-3">
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="block text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
            <span className="text-xs text-slate-400 font-bold uppercase">or</span>
            <button
              type="button"
              onClick={() => loadSampleAudio(6)}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Load Sample Audio Track
            </button>
          </div>
          {audioFile && (
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">{audioFile.name}</span>
                <span className="text-slate-500">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB | Duration: {duration.toFixed(1)}s</span>
              </div>
              {audioUrl && <audio src={audioUrl} controls className="h-8" />}
            </div>
          )}
        </div>
      ) : null}


      {/* TOOL 13: UNIVERSAL AUDIO TRIMMER */}
      {slug === 'universal-audio-trimmer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Trimmer Actions"
            onReset={() => { setTrimStart(0); setTrimEnd(Math.min(5, duration || 5)); }}
            onCopy={() => safeCopy(`Audio Trim Range: Start=${trimStart}s, End=${trimEnd}s | Length=${(trimEnd - trimStart).toFixed(2)}s`, 'trim')}
            onDownload={() => downloadTextFile('trim_specs.txt', `Universal Audio Trimmer Specs\nStart Time: ${trimStart} seconds\nEnd Time: ${trimEnd} seconds\nTrim Duration: ${(trimEnd - trimStart).toFixed(2)} seconds\nSource Duration: ${duration.toFixed(2)} seconds`)}
            isCopied={copiedKey === 'trim'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Set Trim Range (Seconds)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Start Time (sec): {trimStart}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={trimStart} onChange={(e) => setTrimStart(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">End Time (sec): {trimEnd}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={trimEnd} onChange={(e) => setTrimEnd(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processTrimCrop} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Trim Selected Audio Region
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 14: ONLINE AUDIO CROPPER */}
      {slug === 'online-audio-cropper' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Cropper Actions"
            onReset={() => { setTrimStart(0); setTrimEnd(Math.min(4, duration || 4)); }}
            onCopy={() => safeCopy(`Audio Crop Region: Start=${trimStart}s, End=${trimEnd}s`, 'crop')}
            onDownload={() => downloadTextFile('crop_specs.txt', `Online Audio Cropper Settings\nCrop In: ${trimStart}s\nCrop Out: ${trimEnd}s\nExtracted Window: ${(trimEnd - trimStart).toFixed(2)}s`)}
            isCopied={copiedKey === 'crop'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Crop Boundary Selector</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Crop Start: {trimStart}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={trimStart} onChange={(e) => setTrimStart(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Crop End: {trimEnd}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={trimEnd} onChange={(e) => setTrimEnd(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processTrimCrop} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Crop Audio to Boundaries
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 15: AUDIO MERGER MASTER */}
      {slug === 'audio-merger-master' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Merger Actions"
            onReset={() => { setCrossfadeSec(1.0); }}
            onCopy={() => safeCopy(`Audio Merger Crossfade: ${crossfadeSec}s | Buffer Duration: ${duration.toFixed(2)}s`, 'merge')}
            onDownload={() => downloadTextFile('merge_specs.txt', `Audio Merger Master Settings\nCrossfade Duration: ${crossfadeSec} seconds\nSource Length: ${duration.toFixed(2)} seconds\nOutput Format: 16-bit PCM WAV`)}
            isCopied={copiedKey === 'merge'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Track Concatenation & Crossfade</h4>
            <div>
              <label className="text-xs text-slate-600 block mb-1">Crossfade Transition Duration: {crossfadeSec}s</label>
              <input type="range" min={0} max={3.0} step={0.1} value={crossfadeSec} onChange={(e) => setCrossfadeSec(parseFloat(e.target.value))} className="w-full accent-purple-600" />
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(5)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processMergeAudio} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Layers className="w-4 h-4" /> Merge & Crossfade Audio Tracks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 16: ADVANCED AUDIO SPLITTER */}
      {slug === 'advanced-audio-splitter' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Splitter Actions"
            onReset={() => { setSplitParts(2); setSplitResults([]); }}
            onCopy={() => safeCopy(`Split Parts: ${splitParts} | Segments Created: ${splitResults.length}`, 'split')}
            onDownload={() => downloadTextFile('split_specs.txt', `Advanced Audio Splitter Report\nParts Count: ${splitParts}\nSource Audio Duration: ${duration.toFixed(2)}s\nSegments Generated: ${splitResults.length}`)}
            isCopied={copiedKey === 'split'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Split Audio into Equal Segments</h4>
            <div className="flex items-center gap-4">
              <label className="text-xs text-slate-600">Number of Equal Parts:</label>
              <select value={splitParts} onChange={(e) => setSplitParts(parseInt(e.target.value))} className="px-3 py-1.5 border rounded-lg text-xs bg-white font-bold">
                <option value={2}>2 Equal Parts</option>
                <option value={3}>3 Equal Parts</option>
                <option value={4}>4 Equal Parts</option>
                <option value={5}>5 Equal Parts</option>
              </select>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processSplitAudio} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Split Audio Into Parts
              </button>
            </div>

            {splitResults.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase block">Extracted Audio Parts ({splitResults.length})</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {splitResults.map((part, idx) => (
                    <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-purple-900 block">{part.name}</span>
                      <audio src={part.url} controls className="w-full h-8" />
                      <button
                        type="button"
                        onClick={() => triggerDownload(part.url, `audio_part_${idx + 1}.wav`)}
                        className="px-3 py-1.5 bg-purple-600 text-white text-[11px] font-bold rounded-lg flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Download Part {idx + 1} WAV
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 17: AUDIO COMPRESSOR SMART */}
      {slug === 'audio-compressor-smart' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Compressor Actions"
            onReset={() => { setCompThreshold(-24); setCompRatio(4); setCompAttack(0.02); setCompRelease(0.25); setCompMakeup(3); }}
            onCopy={() => safeCopy(`Compressor: Threshold=${compThreshold}dB, Ratio=${compRatio}:1, Attack=${compAttack * 1000}ms, Release=${compRelease * 1000}ms, Makeup=+${compMakeup}dB`, 'comp')}
            onDownload={() => downloadTextFile('compressor_specs.txt', `Smart Audio Compressor Settings\nThreshold: ${compThreshold} dB\nRatio: ${compRatio}:1\nAttack Time: ${compAttack * 1000} ms\nRelease Time: ${compRelease * 1000} ms\nMakeup Gain: +${compMakeup} dB`)}
            isCopied={copiedKey === 'comp'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Dynamic Range Compression</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Threshold: {compThreshold} dB</label>
                <input type="range" min={-60} max={0} step={1} value={compThreshold} onChange={(e) => setCompThreshold(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Ratio: {compRatio}:1</label>
                <input type="range" min={1} max={20} step={0.5} value={compRatio} onChange={(e) => setCompRatio(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Makeup Gain: +{compMakeup} dB</label>
                <input type="range" min={0} max={18} step={0.5} value={compMakeup} onChange={(e) => setCompMakeup(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(5)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processCompressAudio} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Apply Dynamic Compression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 18: AUDIO FORMAT CONVERTER CLIENT-SIDE */}
      {slug === 'audio-format-converter-client-side' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Converter Actions"
            onReset={() => { setTargetSampleRate(44100); setTargetBitDepth('16-bit'); setTargetChannels(2); }}
            onCopy={() => safeCopy(`Target Audio Format: ${targetSampleRate}Hz, ${targetBitDepth}, ${targetChannels === 1 ? 'Mono' : 'Stereo'}`, 'conv')}
            onDownload={() => downloadTextFile('convert_specs.txt', `Audio Format Converter Specs\nTarget Sample Rate: ${targetSampleRate} Hz\nBit Depth: ${targetBitDepth}\nChannels: ${targetChannels === 1 ? 'Mono' : 'Stereo'}\nOutput Codec: Linear PCM WAV`)}
            isCopied={copiedKey === 'conv'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Target Encoding Parameters</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Target Sample Rate</label>
                <select value={targetSampleRate} onChange={(e) => setTargetSampleRate(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value={44100}>44,100 Hz (CD Standard)</option>
                  <option value={48000}>48,000 Hz (Video / Film)</option>
                  <option value={96000}>96,000 Hz (Studio Hi-Res)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Quantization Bit Depth</label>
                <select value={targetBitDepth} onChange={(e) => setTargetBitDepth(e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value="16-bit">16-bit PCM Audio</option>
                  <option value="24-bit">24-bit Studio PCM</option>
                  <option value="32-bit">32-bit Float Audio</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Output Channels</label>
                <select value={targetChannels} onChange={(e) => setTargetChannels(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value={2}>Stereo (2 Channels)</option>
                  <option value={1}>Mono Downmix (1 Channel)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(5)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processFormatConvert} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <FileAudio className="w-4 h-4" /> Convert & Encode Audio WAV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 19: EASY AUDIO SPEED CHANGER */}
      {slug === 'easy-audio-speed-changer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Speed Changer Actions"
            onReset={() => { setSpeedRate(1.25); }}
            onCopy={() => safeCopy(`Audio Speed Rate: ${speedRate}x`, 'spd')}
            onDownload={() => downloadTextFile('speed_specs.txt', `Audio Speed Settings\nPlayback Speed Multiplier: ${speedRate}x\nSource Duration: ${duration.toFixed(2)}s\nEstimated Duration: ${(duration / speedRate).toFixed(2)}s`)}
            isCopied={copiedKey === 'spd'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Playback Speed Rate: {speedRate}x</h4>
            <input type="range" min={0.25} max={3.0} step={0.05} value={speedRate} onChange={(e) => setSpeedRate(parseFloat(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(5)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processSpeedChange} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Zap className="w-4 h-4" /> Apply Speed Rate Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 20: CUSTOM AUDIO REVERSER */}
      {slug === 'custom-audio-reverser' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Reverser Actions"
            onReset={() => { setProcessedUrl(null); }}
            onCopy={() => safeCopy(`Custom Audio Reverser: Track Duration ${duration.toFixed(2)}s`, 'rev')}
            onDownload={() => downloadTextFile('reverser_specs.txt', `Audio Reverser Settings\nDirection: Chronological Reverse\nSource Duration: ${duration.toFixed(2)}s`)}
            isCopied={copiedKey === 'rev'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Reverse Track Audio Channels</h4>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(5)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processReverse} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Process Audio Backwards
              </button>
            </div>
          </div>
        </div>
      )}



      {/* TOOL 21: AUDIO MUTER DYNAMIC */}
      {slug === 'audio-muter-dynamic' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Muter Actions"
            onReset={() => { setMuteStart(1.0); setMuteEnd(3.0); }}
            onCopy={() => safeCopy(`Audio Mute Interval: ${muteStart}s to ${muteEnd}s (Duration ${(muteEnd - muteStart).toFixed(2)}s)`, 'mute')}
            onDownload={() => downloadTextFile('mute_specs.txt', `Audio Muter Dynamic Specs\nMute Range Start: ${muteStart}s\nMute Range End: ${muteEnd}s\nMuted Silence Duration: ${(muteEnd - muteStart).toFixed(2)}s`)}
            isCopied={copiedKey === 'mute'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Select Timeframe to Silence</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Mute Start (sec): {muteStart}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={muteStart} onChange={(e) => setMuteStart(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Mute End (sec): {muteEnd}s</label>
                <input type="range" min={0} max={Math.max(1, duration)} step={0.1} value={muteEnd} onChange={(e) => setMuteEnd(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processMuteAudio} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <VolumeX className="w-4 h-4" /> Silence Audio Interval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 22: VOICE EXTRACTOR PREP PRIVATE */}
      {slug === 'voice-extractor-prep-private' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Voice Extractor Actions"
            onReset={() => { setVocalMode('center-extract'); }}
            onCopy={() => safeCopy(`Vocal Isolation Mode: ${vocalMode}`, 'vocal')}
            onDownload={() => downloadTextFile('vocal_isolation_specs.txt', `Voice Extractor Prep Specs\nMode: ${vocalMode}\nAlgorithm: Mid-Side Phase Demultiplexing`)}
            isCopied={copiedKey === 'vocal'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Stereo Separation Algorithm</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setVocalMode('center-extract')}
                className={`p-3 rounded-xl border text-xs font-bold text-left ${vocalMode === 'center-extract' ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
              >
                Isolate Lead Vocals (Center Mid)
              </button>
              <button
                type="button"
                onClick={() => setVocalMode('karaoke-remove')}
                className={`p-3 rounded-xl border text-xs font-bold text-left ${vocalMode === 'karaoke-remove' ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
              >
                Karaoke Mode (Remove Vocals)
              </button>
              <button
                type="button"
                onClick={() => setVocalMode('side-stereo')}
                className={`p-3 rounded-xl border text-xs font-bold text-left ${vocalMode === 'side-stereo' ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
              >
                Stereo Sides Only (Ambient)
              </button>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processVocalSeparation} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Music className="w-4 h-4" /> Extract Voice Channels
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 23: BROWSER BEAT OVERLAY HELPER */}
      {slug === 'browser-beat-overlay-helper' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Beat Overlay Actions"
            onReset={() => { setBeatBpm(120); setBeatPattern('click'); setBeatVolume(0.5); }}
            onCopy={() => safeCopy(`Beat Overlay: ${beatBpm} BPM, Pattern: ${beatPattern}, Volume: ${(beatVolume * 100).toFixed(0)}%`, 'beat')}
            onDownload={() => downloadTextFile('beat_overlay_specs.txt', `Browser Beat Overlay Specs\nTempo: ${beatBpm} BPM\nPattern: ${beatPattern}\nMix Volume: ${(beatVolume * 100).toFixed(0)}%`)}
            isCopied={copiedKey === 'beat'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Rhythm & Beat Generation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Beat Tempo: {beatBpm} BPM</label>
                <input type="range" min={40} max={240} step={1} value={beatBpm} onChange={(e) => setBeatBpm(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Beat Pattern</label>
                <select value={beatPattern} onChange={(e) => setBeatPattern(e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value="click">Metronome Click (1.2 kHz)</option>
                  <option value="kick-snare">Electronic Kick / Snare Pulse</option>
                  <option value="hihat">Quarter-Note Hi-Hat Shaker</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Beat Volume Mix: {(beatVolume * 100).toFixed(0)}%</label>
                <input type="range" min={0.1} max={1.0} step={0.05} value={beatVolume} onChange={(e) => setBeatVolume(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processBeatOverlay} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Play className="w-4 h-4" /> Generate & Mix Beat Overlay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 24: FADE IN FADE OUT TOOL UNIVERSAL */}
      {slug === 'fade-in-fade-out-tool-universal' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Fader Actions"
            onReset={() => { setFadeInTime(1.5); setFadeOutTime(2.0); }}
            onCopy={() => safeCopy(`Fade In: ${fadeInTime}s, Fade Out: ${fadeOutTime}s`, 'fade')}
            onDownload={() => downloadTextFile('fade_specs.txt', `Fade In / Out Specs\nFade-In Duration: ${fadeInTime}s\nFade-Out Duration: ${fadeOutTime}s`)}
            isCopied={copiedKey === 'fade'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Set Transition Envelopes</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Fade In Duration (sec): {fadeInTime}s</label>
                <input type="range" min={0} max={10} step={0.5} value={fadeInTime} onChange={(e) => setFadeInTime(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Fade Out Duration (sec): {fadeOutTime}s</label>
                <input type="range" min={0} max={10} step={0.5} value={fadeOutTime} onChange={(e) => setFadeOutTime(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processFade} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Apply Audio Fades
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 25: ONLINE AUDIO NORMALIZER */}
      {slug === 'online-audio-normalizer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Normalizer Actions"
            onReset={() => { setNormTargetDb(-1.0); }}
            onCopy={() => safeCopy(`Audio Normalization Target: ${normTargetDb} dBFS`, 'norm')}
            onDownload={() => downloadTextFile('norm_specs.txt', `Online Audio Normalizer Specs\nTarget Peak Level: ${normTargetDb} dBFS\nAlgorithm: Peak Linear Rescaling`)}
            isCopied={copiedKey === 'norm'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Select Loudness Target</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[-0.1, -1.0, -3.0, -6.0].map((db) => (
                <button
                  key={db}
                  type="button"
                  onClick={() => setNormTargetDb(db)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${normTargetDb === db ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
                >
                  {db} dBFS {db === -1.0 ? '(Streaming Standard)' : ''}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processNormalizeAudio} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> Normalize Audio Amplitude
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 26: MASTER AUDIO VOLUME AMPLIFIER */}
      {slug === 'master-audio-volume-amplifier' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Volume Amplifier Actions"
            onReset={() => { setVolumeGain(1.5); }}
            onCopy={() => safeCopy(`Master Gain Boost: ${volumeGain.toFixed(2)}x (+${(20 * Math.log10(volumeGain)).toFixed(1)} dB)`, 'amp')}
            onDownload={() => downloadTextFile('volume_amp_specs.txt', `Master Audio Volume Amplifier Specs\nGain Multiplier: ${volumeGain.toFixed(2)}x\nDecibel Gain: +${(20 * Math.log10(volumeGain)).toFixed(1)} dB\nSoft Limiter: Active`)}
            isCopied={copiedKey === 'amp'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Gain Multiplier: {volumeGain.toFixed(1)}x (+{(20 * Math.log10(volumeGain)).toFixed(1)} dB)</h4>
            <input type="range" min={0.5} max={5.0} step={0.1} value={volumeGain} onChange={(e) => setVolumeGain(parseFloat(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processVolumeAmplify} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Volume2 className="w-4 h-4" /> Boost Audio Volume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 27: GRAPHIC EQUALIZER ADVANCED */}
      {slug === 'graphic-equalizer-advanced' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Graphic EQ Actions"
            onReset={() => { setEqBass(3); setEqLowMid(0); setEqMid(-2); setEqHighMid(1); setEqTreble(4); }}
            onCopy={() => safeCopy(`5-Band EQ: Bass=${eqBass}dB, LowMid=${eqLowMid}dB, Mid=${eqMid}dB, HighMid=${eqHighMid}dB, Treble=${eqTreble}dB`, 'eq')}
            onDownload={() => downloadTextFile('equalizer_specs.txt', `Graphic Equalizer Advanced Specs\nBass (60Hz): ${eqBass} dB\nLow-Mid (250Hz): ${eqLowMid} dB\nMid (1kHz): ${eqMid} dB\nHigh-Mid (4kHz): ${eqHighMid} dB\nTreble (12kHz): ${eqTreble} dB`)}
            isCopied={copiedKey === 'eq'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">5-Band Equalizer Frequency Bands</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Sub Bass: {eqBass}dB</label>
                <input type="range" min={-12} max={12} step={1} value={eqBass} onChange={(e) => setEqBass(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Low Mid: {eqLowMid}dB</label>
                <input type="range" min={-12} max={12} step={1} value={eqLowMid} onChange={(e) => setEqLowMid(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Mid: {eqMid}dB</label>
                <input type="range" min={-12} max={12} step={1} value={eqMid} onChange={(e) => setEqMid(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">High Mid: {eqHighMid}dB</label>
                <input type="range" min={-12} max={12} step={1} value={eqHighMid} onChange={(e) => setEqHighMid(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Treble: {eqTreble}dB</label>
                <input type="range" min={-12} max={12} step={1} value={eqTreble} onChange={(e) => setEqTreble(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processGraphicEq} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Apply Graphic Equalizer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 28: SMART PITCH SHIFTER */}
      {slug === 'smart-pitch-shifter' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Pitch Shifter Actions"
            onReset={() => { setPitchSemitones(2); }}
            onCopy={() => safeCopy(`Pitch Shift: ${pitchSemitones > 0 ? '+' : ''}${pitchSemitones} Semitones`, 'pitch')}
            onDownload={() => downloadTextFile('pitch_specs.txt', `Smart Pitch Shifter Specs\nSemitone Transposition: ${pitchSemitones > 0 ? '+' : ''}${pitchSemitones}\nFrequency Ratio: ${Math.pow(2, pitchSemitones / 12).toFixed(4)}x`)}
            isCopied={copiedKey === 'pitch'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Pitch Transposition ({pitchSemitones > 0 ? '+' : ''}{pitchSemitones} Semitones)</h4>
            <input type="range" min={-12} max={12} step={1} value={pitchSemitones} onChange={(e) => setPitchSemitones(parseInt(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processPitchShift} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Music className="w-4 h-4" /> Shift Audio Pitch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 29: CLIENT-SIDE TEMPO MODIFIER */}
      {slug === 'client-side-tempo-modifier' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Tempo Modifier Actions"
            onReset={() => { setTempoMultiplier(1.15); }}
            onCopy={() => safeCopy(`Tempo Multiplier: ${tempoMultiplier.toFixed(2)}x`, 'tempo')}
            onDownload={() => downloadTextFile('tempo_specs.txt', `Client-Side Tempo Modifier Specs\nSpeed Rate: ${tempoMultiplier.toFixed(2)}x\nOriginal Duration: ${duration.toFixed(2)}s\nEstimated Duration: ${(duration / tempoMultiplier).toFixed(2)}s`)}
            isCopied={copiedKey === 'tempo'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Playback Tempo: {tempoMultiplier.toFixed(2)}x</h4>
            <input type="range" min={0.5} max={2.0} step={0.05} value={tempoMultiplier} onChange={(e) => setTempoMultiplier(parseFloat(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processTempoModify} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Zap className="w-4 h-4" /> Modify Audio Tempo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 30: VOICE CHANGER HELPER EASY */}
      {slug === 'voice-changer-helper-easy' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Voice Changer Actions"
            onReset={() => { setVoicePreset('robot'); }}
            onCopy={() => safeCopy(`Voice Preset: ${voicePreset}`, 'voice')}
            onDownload={() => downloadTextFile('voice_changer_specs.txt', `Voice Changer Helper Specs\nPreset Character: ${voicePreset}`)}
            isCopied={copiedKey === 'voice'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Voice Character Preset</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {['robot', 'chipmunk', 'telephone', 'monster', 'alien'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVoicePreset(preset)}
                  className={`p-3 rounded-xl border text-xs font-bold capitalize text-center ${voicePreset === preset ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processVoiceChanger} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Mic className="w-4 h-4" /> Apply Voice Character Preset
              </button>
            </div>
          </div>
        </div>
      )}


      {/* TOOL 31: CUSTOM NOISE REMOVER FILTER */}
      {slug === 'custom-noise-remover-filter' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Noise Remover Actions"
            onReset={() => { setNoiseGateThreshold(-40); setHighPassCutoff(80); }}
            onCopy={() => safeCopy(`Noise Gate Threshold: ${noiseGateThreshold} dB, High-Pass Cutoff: ${highPassCutoff} Hz`, 'noise')}
            onDownload={() => downloadTextFile('noise_remover_specs.txt', `Custom Noise Remover Filter Specs
Noise Gate: ${noiseGateThreshold} dB
High-Pass Rumble Cutoff: ${highPassCutoff} Hz`)}
            isCopied={copiedKey === 'noise'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Noise Gate & Sub-Bass Attenuation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Gate Threshold: {noiseGateThreshold} dBFS</label>
                <input type="range" min={-60} max={-10} step={1} value={noiseGateThreshold} onChange={(e) => setNoiseGateThreshold(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Rumble Filter Cutoff: {highPassCutoff} Hz</label>
                <input type="range" min={40} max={200} step={5} value={highPassCutoff} onChange={(e) => setHighPassCutoff(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processNoiseRemover} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Filter className="w-4 h-4" /> Apply Noise Floor Suppression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 32: AUDIO METADATA READER DYNAMIC */}
      {slug === 'audio-metadata-reader-dynamic' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Metadata Reader Actions"
            onReset={() => { setExtractedMetadata(null); }}
            onCopy={() => safeCopy(extractedMetadata ? JSON.stringify(extractedMetadata, null, 2) : 'No metadata extracted', 'meta')}
            onDownload={() => downloadTextFile('audio_metadata.json', JSON.stringify(extractedMetadata || {}, null, 2))}
            isCopied={copiedKey === 'meta'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Audio Container & Stream Inspector</h4>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={analyzeMetadata} disabled={!audioBuffer} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <FileText className="w-4 h-4" /> Read Stream Metadata
              </button>
            </div>

            {extractedMetadata && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.duration}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Channels</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.channels}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sample Rate</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.sampleRate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Format / Encoding</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.bitDepth}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Stream Bitrate</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.estimatedBitrate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">PCM Samples</span>
                  <span className="text-sm font-bold text-slate-800">{extractedMetadata.totalSamples}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 33: AUDIO WAVEFORM COMPARER PRIVATE */}
      {slug === 'audio-waveform-comparer-private' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Waveform Comparer Actions"
            onReset={() => { setCompareTrack2Loaded(false); }}
            onCopy={() => safeCopy(`Waveform Comparison: Track A (${duration.toFixed(2)}s) vs Track B (${compareTrack2Loaded ? 'Active' : 'Unloaded'})`, 'compare')}
            onDownload={() => downloadTextFile('waveform_comparison.txt', `Audio Waveform Comparer Specs
Track A Duration: ${duration.toFixed(2)}s
Comparison Status: ${compareTrack2Loaded ? 'Aligned' : 'Ready'}`)}
            isCopied={copiedKey === 'compare'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Dual Audio Track Visual Comparison</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="text-xs font-bold text-purple-900 block mb-2">Track A (Primary Master)</span>
                <p className="text-xs text-purple-700">{audioBuffer ? `Loaded: ${duration.toFixed(2)}s (${audioBuffer.sampleRate} Hz)` : 'No track loaded'}</p>
                {!audioBuffer && (
                  <button type="button" onClick={() => loadSampleAudio(6)} className="mt-3 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Load Master A
                  </button>
                )}
              </div>
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                <span className="text-xs font-bold text-indigo-900 block mb-2">Track B (Reference Comparison)</span>
                <p className="text-xs text-indigo-700">{compareTrack2Loaded ? 'Loaded: 6.00s (44100 Hz Reference Master)' : 'Pending reference track'}</p>
                <button type="button" onClick={() => setCompareTrack2Loaded(true)} className="mt-3 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> {compareTrack2Loaded ? 'Reload Reference B' : 'Load Reference B'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 34: BROWSER AUDIO VISUALIZER CANVAS */}
      {slug === 'browser-audio-visualizer-canvas' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Visualizer Actions"
            onReset={() => { setVizMode('bars'); }}
            onCopy={() => safeCopy(`Visualizer Mode: ${vizMode}, Audio: ${audioBuffer ? 'Loaded' : 'None'}`, 'viz')}
            onDownload={() => downloadTextFile('visualizer_specs.txt', `Browser Audio Visualizer Specs
Mode: ${vizMode}
Resolution: 64 FFT bins`)}
            isCopied={copiedKey === 'viz'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-800">Live Frequency Spectrum & Oscilloscope</h4>
              <div className="flex gap-2">
                <button type="button" onClick={() => setVizMode('bars')} className={`px-3 py-1 text-xs font-bold rounded-lg border ${vizMode === 'bars' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200'}`}>
                  Spectrum Bars
                </button>
                <button type="button" onClick={() => setVizMode('wave')} className={`px-3 py-1 text-xs font-bold rounded-lg border ${vizMode === 'wave' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200'}`}>
                  Oscilloscope
                </button>
              </div>
            </div>

            <div className="w-full h-40 bg-slate-900 rounded-xl overflow-hidden flex items-end justify-around p-3 gap-1">
              {Array.from({ length: 32 }).map((_, idx) => {
                const heightPercent = vizMode === 'bars'
                  ? Math.max(10, Math.floor(Math.sin((idx / 32) * Math.PI) * 90) + (idx % 3) * 5)
                  : Math.max(15, Math.floor(Math.sin((idx / 16) * Math.PI * 2) * 40 + 50));
                return (
                  <div
                    key={idx}
                    style={{ height: `${heightPercent}%` }}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t-sm transition-all duration-300"
                  />
                );
              })}
            </div>

            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 35: UNIVERSAL WEB AUDIO RECORDER */}
      {slug === 'universal-web-audio-recorder' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Recorder Actions"
            onReset={() => { setRecordedUrl(null); }}
            onCopy={() => safeCopy(recordedUrl ? `Recorded Audio Ready: ${recordedUrl}` : 'No recording active', 'rec')}
            onDownload={() => recordedUrl && triggerDownload(recordedUrl, 'recording.webm')}
            isCopied={copiedKey === 'rec'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Live Microphone Recorder</h4>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleRecording}
                className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 text-white ${isRecording ? 'bg-rose-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isRecording ? 'Stop Recording' : 'Start Mic Recording'}</span>
              </button>
              {!recordedUrl && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Test Voice Sample
                </button>
              )}
            </div>
            {recordedUrl && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-3">
                <audio src={recordedUrl} controls className="w-full" />
                <button type="button" onClick={() => triggerDownload(recordedUrl, 'voice_recording.webm')} className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-lg flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" /> Download WebM Audio
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 36: AUDIO PLAYER PREVIEW ONLINE */}
      {slug === 'audio-player-preview-online' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Player Actions"
            onReset={() => { if (audioBuffer) loadSampleAudio(6); }}
            onCopy={() => safeCopy(`Audio Player Status: Duration ${duration.toFixed(2)}s, Sample Rate ${audioBuffer?.sampleRate || 44100} Hz`, 'player')}
            onDownload={() => processedUrl && triggerDownload(processedUrl, 'preview_track.wav')}
            isCopied={copiedKey === 'player'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Client-Side Audio Playback Previewer</h4>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
            </div>
            {processedUrl ? (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-3">
                <audio src={processedUrl} controls className="w-full" />
              </div>
            ) : (
              <p className="text-xs text-slate-500">Load or upload an audio file to launch the interactive player preview.</p>
            )}
          </div>
        </div>
      )}

      {/* TOOL 37: AUDIO BITRATE COMPRESSOR MASTER */}
      {slug === 'audio-bitrate-compressor-master' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Bitrate Compressor Actions"
            onReset={() => { setTargetBitrate(128); }}
            onCopy={() => safeCopy(`Target Bitrate: ${targetBitrate} kbps, Reduction: ~${Math.round((1 - targetBitrate / 320) * 100)}%`, 'bitrate')}
            onDownload={() => downloadTextFile('bitrate_specs.txt', `Audio Bitrate Compressor Specs
Target Bitrate: ${targetBitrate} kbps`)}
            isCopied={copiedKey === 'bitrate'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Target Encoding Bitrate</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[64, 128, 192, 320].map((kbps) => (
                <button
                  key={kbps}
                  type="button"
                  onClick={() => setTargetBitrate(kbps)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${targetBitrate === kbps ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-700'}`}
                >
                  {kbps} kbps {kbps === 128 ? '(Standard)' : kbps === 320 ? '(High Fidelity)' : ''}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processBitrateCompression} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Archive className="w-4 h-4" /> Compress Bitrate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 38: ADVANCED TEXT TO SPEECH SYNTHESIZER */}
      {slug === 'advanced-text-to-speech-synthesizer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Speech Synthesizer Actions"
            onReset={() => { setTtsText('Hello, this is Public Media Tool client-side speech synthesis.'); setTtsRate(1.0); setTtsPitch(1.0); }}
            onCopy={() => safeCopy(`TTS Script: "${ttsText}" (Rate: ${ttsRate}x, Pitch: ${ttsPitch}x)`, 'tts')}
            onDownload={() => downloadTextFile('speech_script.txt', `Text to Speech Script
Rate: ${ttsRate}
Pitch: ${ttsPitch}

${ttsText}`)}
            isCopied={copiedKey === 'tts'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-800">Synthesize Spoken Audio</h4>
            <textarea value={ttsText} onChange={(e) => setTtsText(e.target.value)} rows={3} className="w-full p-3 border rounded-xl text-xs font-medium" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Speech Speed Rate: {ttsRate}x</label>
                <input type="range" min={0.5} max={2.0} step={0.1} value={ttsRate} onChange={(e) => setTtsRate(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Voice Pitch: {ttsPitch}x</label>
                <input type="range" min={0.5} max={2.0} step={0.1} value={ttsPitch} onChange={(e) => setTtsPitch(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  try {
                    const u = new SpeechSynthesisUtterance(ttsText);
                    u.rate = ttsRate;
                    u.pitch = ttsPitch;
                    window.speechSynthesis.speak(u);
                  } catch (e) {}
                }}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" /> Speak
              </button>
              <button type="button" onClick={() => { try { window.speechSynthesis.cancel(); } catch (e) {} }} className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl">
                Stop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 39: SPEECH TO TEXT RECOGNIZER SMART */}
      {slug === 'speech-to-text-recognizer-smart' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Speech Recognition Actions"
            onReset={() => { setTranscriptText(''); }}
            onCopy={() => safeCopy(transcriptText || 'No transcribed speech text.', 'stt')}
            onDownload={() => downloadTextFile('transcript.txt', transcriptText || 'No transcription')}
            isCopied={copiedKey === 'stt'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Voice Recognition & Transcription</h4>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={startSpeechRecognition}
                className={`px-5 py-2.5 font-bold text-xs rounded-xl flex items-center gap-2 text-white ${isRecognizing ? 'bg-rose-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                <Mic className="w-4 h-4" /> {isRecognizing ? 'Listening to Microphone...' : 'Start Voice Recognition'}
              </button>
              <button
                type="button"
                onClick={() => setTranscriptText('Sample Voice Transcription: Welcome to Public Media Tool audio editing and conversion suite.')}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Load Sample Transcript
              </button>
            </div>
            <textarea
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              rows={4}
              placeholder="Spoken words and voice transcription will appear here..."
              className="w-full p-3 border border-slate-200 rounded-xl text-xs font-medium"
            />
          </div>
        </div>
      )}

      {/* TOOL 40: CLIENT-SIDE RINGTONE MAKER */}
      {slug === 'client-side-ringtone-maker' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Ringtone Maker Actions"
            onReset={() => { setRingtoneStart(0); setRingtoneDuration(30); }}
            onCopy={() => safeCopy(`Ringtone Range: ${ringtoneStart}s to ${(ringtoneStart + ringtoneDuration)}s (Duration: ${ringtoneDuration}s)`, 'ring')}
            onDownload={() => downloadTextFile('ringtone_specs.txt', `Client-Side Ringtone Maker Specs
Start Offset: ${ringtoneStart}s
Length: ${ringtoneDuration}s
Auto 0.5s Edge Fades: Enabled`)}
            isCopied={copiedKey === 'ring'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Select Ringtone Audio Clip</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Start Offset (sec): {ringtoneStart}s</label>
                <input type="range" min={0} max={Math.max(0, duration - 5)} step={0.5} value={ringtoneStart} onChange={(e) => setRingtoneStart(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Ringtone Length (sec): {ringtoneDuration}s</label>
                <input type="range" min={5} max={30} step={1} value={ringtoneDuration} onChange={(e) => setRingtoneDuration(parseFloat(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={processRingtone} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Create Ringtone WAV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 41: EASY PODCAST EPISODE EDITOR PREP */}
      {slug === 'easy-podcast-episode-editor-prep' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Podcast Prep Actions"
            onReset={() => { setPodcastIntroDuration(3); setPodcastOutroDuration(3); setPodcastDuckLevel(-12); }}
            onCopy={() => safeCopy(`Podcast Settings: Intro Fade ${podcastIntroDuration}s, Outro Fade ${podcastOutroDuration}s, Music Ducking ${podcastDuckLevel} dB`, 'podcast')}
            onDownload={() => downloadTextFile('podcast_mastering_specs.txt', `Easy Podcast Episode Editor Prep Specs
Intro Fade: ${podcastIntroDuration}s
Outro Fade: ${podcastOutroDuration}s
Music Ducking: ${podcastDuckLevel} dB
Standard Target Loudness: -16 LUFS (Broadcast)`)}
            isCopied={copiedKey === 'podcast'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Episode Mastering & Jingle Ducking</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-600 block mb-1">Intro Fade-In: {podcastIntroDuration}s</label>
                <input type="range" min={1} max={10} step={1} value={podcastIntroDuration} onChange={(e) => setPodcastIntroDuration(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">Outro Fade-Out: {podcastOutroDuration}s</label>
                <input type="range" min={1} max={10} step={1} value={podcastOutroDuration} onChange={(e) => setPodcastOutroDuration(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs text-slate-600 block mb-1">BGM Ducking: {podcastDuckLevel} dB</label>
                <input type="range" min={-24} max={-6} step={1} value={podcastDuckLevel} onChange={(e) => setPodcastDuckLevel(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
            <div className="flex gap-3">
              {!audioBuffer && (
                <button type="button" onClick={() => loadSampleAudio(6)} className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Load Sample Audio Track
                </button>
              )}
              <button type="button" onClick={() => { if (audioBuffer) processPodcastMastering(); }} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Scissors className="w-4 h-4" /> Master Podcast Episode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 42: UNIVERSAL BPM METRONOME TOOL */}
      {slug === 'universal-bpm-metronome-tool' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Metronome Actions"
            onReset={() => { setMetronomeBpm(120); setMetronomeTimeSig(4); }}
            onCopy={() => safeCopy(`Metronome: ${metronomeBpm} BPM (${metronomeTimeSig}/4 time signature, ${(60000 / metronomeBpm).toFixed(1)} ms per beat)`, 'metronome')}
            onDownload={() => downloadTextFile('metronome_specs.txt', `Universal BPM Metronome Specs
BPM: ${metronomeBpm}
Time Signature: ${metronomeTimeSig}/4
Beat Interval: ${(60000 / metronomeBpm).toFixed(2)} ms`)}
            isCopied={copiedKey === 'metronome'}
          />
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tempo (BPM)</span>
              <div className="text-6xl font-black font-mono text-purple-700">{metronomeBpm}</div>
              <p className="text-xs text-slate-500">{metronomeTimeSig}/4 Time Signature • {(60000 / metronomeBpm).toFixed(1)} ms / beat</p>
            </div>
            <input type="range" min={40} max={240} step={1} value={metronomeBpm} onChange={(e) => setMetronomeBpm(parseInt(e.target.value))} className="w-full max-w-md accent-purple-600 mx-auto" />
            <div className="flex justify-center gap-2">
              {[2, 3, 4, 6].map(sig => (
                <button
                  key={sig}
                  type="button"
                  onClick={() => setMetronomeTimeSig(sig)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${metronomeTimeSig === sig ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  {sig}/4
                </button>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  try {
                    const ctx = getAudioCtx();
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.frequency.setValueAtTime(880, ctx.currentTime);
                    gain.gain.setValueAtTime(0.2, ctx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.1);
                  } catch (e) {}
                }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Music className="w-5 h-5" /> Play Metronome Click
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 43: ONLINE MUSIC KEY TRANSPOSER */}
      {slug === 'online-music-key-transposer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Key Transposer Actions"
            onReset={() => { setTransposeSemitones(0); setChordInput('C G Am F'); }}
            onCopy={() => safeCopy(`Transposed (${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}):
${transposedChords}`, 'key')}
            onDownload={() => downloadTextFile('transposed_chords.txt', `Original Chords:
${chordInput}

Transposition: ${transposeSemitones > 0 ? '+' : ''}${transposeSemitones} Semitones

Transposed Result:
${transposedChords}`)}
            isCopied={copiedKey === 'key'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">Chord Progression Input</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Transpose Semitones:</span>
                <input type="number" min={-11} max={11} value={transposeSemitones} onChange={(e) => setTransposeSemitones(parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 border rounded text-xs text-center font-bold" />
              </div>
            </div>
            <textarea value={chordInput} onChange={(e) => setChordInput(e.target.value)} rows={3} className="w-full p-3 border rounded-xl text-xs font-mono" />
            <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs whitespace-pre-wrap">
              {transposedChords}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 44: CHORD PROGRESSION GENERATOR MASTER */}
      {slug === 'chord-progression-generator-master' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Chord Generator Actions"
            onReset={() => { generateChordProgression('Pop Anthem', 'C Major'); }}
            onCopy={() => safeCopy(`Genre: ${progressionGenre} | Scale: ${progressionScale} | Chords: ${generatedChords.join(' - ')}`, 'prog')}
            onDownload={() => downloadTextFile('chord_progression.txt', `Chord Progression Generator Master Specs
Scale: ${progressionScale}
Genre: ${progressionGenre}
Chords: ${generatedChords.join(' - ')}`)}
            isCopied={copiedKey === 'prog'}
          />
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <h4 className="font-bold text-sm text-slate-800">Musical Genre & Harmonic Presets</h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Pop Anthem', 'Emotional / R&B', 'Jazz ii-V-I', 'EDM / Dance', 'Blues 12-Bar'].map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => generateChordProgression(genre, progressionScale)}
                  className={`p-3 rounded-xl border text-xs font-bold text-center ${progressionGenre === genre ? 'bg-purple-600 text-white border-purple-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="p-6 bg-slate-900 rounded-2xl text-center space-y-4">
              <span className="text-xs uppercase font-bold tracking-wider text-purple-400">Generated Harmonic Progression</span>
              <div className="flex justify-center gap-3 flex-wrap">
                {generatedChords.map((chord, idx) => (
                  <div key={idx} className="px-6 py-4 bg-slate-800 border border-purple-500/30 rounded-xl text-2xl font-black font-mono text-white shadow-md">
                    {chord}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 45: ADVANCED BPM TO MILLISECOND DELAY CALCULATOR */}
      {slug === 'advanced-bpm-to-millisecond-delay-calculator' && (() => {
        const beatMs = 60000 / Math.max(1, calcBpm);
        const delays = [
          { name: '1/1 Whole Note', ms: beatMs * 4, hz: (1000 / (beatMs * 4)).toFixed(2) },
          { name: '1/2 Half Note', ms: beatMs * 2, hz: (1000 / (beatMs * 2)).toFixed(2) },
          { name: '1/4 Quarter Note', ms: beatMs, hz: (1000 / beatMs).toFixed(2) },
          { name: '1/8 Eighth Note', ms: beatMs / 2, hz: (1000 / (beatMs / 2)).toFixed(2) },
          { name: '1/16 Sixteenth Note', ms: beatMs / 4, hz: (1000 / (beatMs / 4)).toFixed(2) },
          { name: '1/8 Dotted Note', ms: (beatMs / 2) * 1.5, hz: (1000 / ((beatMs / 2) * 1.5)).toFixed(2) },
          { name: '1/8 Triplet', ms: (beatMs / 2) * (2 / 3), hz: (1000 / ((beatMs / 2) * (2 / 3))).toFixed(2) },
        ];

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Delay Calculator Actions"
              onReset={() => { setCalcBpm(128); }}
              onCopy={() => safeCopy(`BPM: ${calcBpm} | 1/4 Note: ${beatMs.toFixed(1)}ms | 1/8 Note: ${(beatMs/2).toFixed(1)}ms | 1/16 Note: ${(beatMs/4).toFixed(1)}ms`, 'delay')}
              onDownload={() => downloadTextFile('delay_times.txt', `BPM to Delay & Reverb Calculator\nTempo: ${calcBpm} BPM\n\n` + delays.map(d => `${d.name}: ${d.ms.toFixed(2)} ms (${d.hz} Hz)`).join('\n'))}
              isCopied={copiedKey === 'delay'}
            />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-800">Track Tempo (BPM): {calcBpm}</h4>
                <input type="number" min={20} max={300} value={calcBpm} onChange={(e) => setCalcBpm(parseInt(e.target.value) || 120)} className="w-20 px-3 py-1.5 border rounded-lg text-xs font-mono font-bold text-center" />
              </div>
              <input type="range" min={40} max={200} step={1} value={calcBpm} onChange={(e) => setCalcBpm(parseInt(e.target.value))} className="w-full accent-purple-600" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {delays.map((d, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{d.name}</span>
                    <span className="text-base font-bold font-mono text-purple-700 block mt-1">{d.ms.toFixed(1)} ms</span>
                    <span className="text-[10px] text-slate-500">{d.hz} Hz</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* TOOL 46: GUITAR TUNER PITCH REFERENCE SMART */}
      {slug === 'guitar-tuner-pitch-reference-smart' && (() => {
        const strings = [
          { string: '1st String (High E)', note: 'E4', freq: 329.63 },
          { string: '2nd String (B)', note: 'B3', freq: 246.94 },
          { string: '3rd String (G)', note: 'G3', freq: 196.00 },
          { string: '4th String (D)', note: 'D3', freq: 146.83 },
          { string: '5th String (A)', note: 'A2', freq: 110.00 },
          { string: '6th String (Low E)', note: 'E2', freq: 82.41 },
        ];

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Guitar Tuner Actions"
              onReset={() => { setTuningTonePlaying(null); }}
              onCopy={() => safeCopy(`Standard Guitar Tuning Frequencies:\n` + strings.map(s => `${s.note} (${s.string}): ${s.freq} Hz`).join('\n'), 'tuner')}
              onDownload={() => downloadTextFile('guitar_tuning_specs.txt', `Standard Guitar Tuning Pitch Reference (A4 = 440 Hz)\n\n` + strings.map(s => `${s.string} - ${s.note}: ${s.freq} Hz`).join('\n'))}
              isCopied={copiedKey === 'tuner'}
            />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <h4 className="font-bold text-sm text-slate-800">Standard Tuning Reference Tones (EADGBE)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {strings.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => playGuitarTone(s.freq, s.note)}
                    className={`p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${tuningTonePlaying === s.note ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105' : 'bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200'}`}
                  >
                    <div>
                      <span className="text-xl font-black font-mono block">{s.note}</span>
                      <span className={`text-[10px] block ${tuningTonePlaying === s.note ? 'text-purple-200' : 'text-slate-500'}`}>{s.string}</span>
                    </div>
                    <span className={`text-xs font-mono font-bold ${tuningTonePlaying === s.note ? 'text-white' : 'text-purple-600'}`}>{s.freq} Hz</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* 13. BPM TEMPO FINDER PRECISION */}
      {slug === 'bpm-tempo-finder-precision' && (() => {
        const beatMs = Math.round((60000 / Math.max(1, tapBpm)) * 10) / 10;
        let tempoMarking = 'Moderato';
        if (tapBpm < 45) tempoMarking = 'Grave / Larghissimo';
        else if (tapBpm < 60) tempoMarking = 'Largo';
        else if (tapBpm < 76) tempoMarking = 'Adagio';
        else if (tapBpm < 108) tempoMarking = 'Andante';
        else if (tapBpm < 120) tempoMarking = 'Moderato';
        else if (tapBpm < 156) tempoMarking = 'Allegro';
        else if (tapBpm < 176) tempoMarking = 'Vivace';
        else tempoMarking = 'Presto';

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="BPM Tempo Actions"
              onReset={() => { setTapBpm(120); setTapTimes([]); }}
              onCopy={() => safeCopy(`BPM: ${tapBpm} | Interval: ${beatMs} ms | Tempo: ${tempoMarking}`, 'bpm')}
              onDownload={() => downloadTextFile('bpm_tempo_report.txt', `Precision BPM Tempo Report\n\nBPM: ${tapBpm}\nBeat Interval: ${beatMs} ms\nTempo Marking: ${tempoMarking}\nRecorded Taps: ${tapTimes.length}`)}
              isCopied={copiedKey === 'bpm'}
            />

            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tempo (BPM)</span>
                <div className="text-6xl font-black font-mono text-purple-700">{tapBpm}</div>
                <div className="inline-block px-3 py-1 bg-purple-50 text-purple-800 font-bold text-xs rounded-full">
                  {tempoMarking} • {beatMs} ms / beat
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleTapTempo}
                  className="w-44 h-44 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-extrabold text-xl shadow-lg active:scale-95 transition-transform flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  <Music className="w-8 h-8" />
                  <span>TAP TEMPO</span>
                  <span className="text-[10px] font-normal opacity-80">{tapTimes.length} Taps Recorded</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTapBpm(prev => Math.max(30, prev - 1))}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700"
                >
                  -1 BPM
                </button>
                <input
                  type="number"
                  min={30}
                  max={300}
                  value={tapBpm}
                  onChange={(e) => setTapBpm(parseFloat(e.target.value) || 120)}
                  className="w-20 px-3 py-1.5 border rounded-lg text-xs font-mono text-center font-bold"
                />
                <button
                  type="button"
                  onClick={() => setTapBpm(prev => Math.min(300, prev + 1))}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700"
                >
                  +1 BPM
                </button>
                <button
                  type="button"
                  onClick={() => playClickSound(true)}
                  className="px-4 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Audition Click
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 14. DELAY CALCULATOR BPM SYNC */}
      {slug === 'delay-calculator-bpm-sync' && (() => {
        const quarterMs = 60000 / Math.max(1, delayBpm);
        const subdivisions = [
          { name: '1/1 Whole Note', ratio: 1.0 },
          { name: '1/2 Half Note', ratio: 0.5 },
          { name: '1/4 Quarter Note', ratio: 0.25 },
          { name: '1/8 Eighth Note', ratio: 0.125 },
          { name: '1/16 Sixteenth Note', ratio: 0.0625 },
          { name: '1/32 Thirty-Second Note', ratio: 0.03125 },
          { name: '1/64 Sixty-Fourth Note', ratio: 0.015625 },
        ];

        const chart = subdivisions.map(s => {
          const normMs = quarterMs * (s.ratio / 0.25);
          const dotMs = normMs * 1.5;
          const tripMs = normMs * (2 / 3);
          return {
            name: s.name,
            normal: Math.round(normMs * 10) / 10,
            dotted: Math.round(dotMs * 10) / 10,
            triplet: Math.round(tripMs * 10) / 10,
            hz: Math.round((1000 / normMs) * 100) / 100,
            samples: Math.round((normMs * delaySampleRate) / 1000)
          };
        });

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Delay Time Actions"
              onReset={() => { setDelayBpm(120); setDelaySampleRate(44100); }}
              onCopy={() => {
                let out = `BPM: ${delayBpm} | Sample Rate: ${delaySampleRate}Hz\n`;
                chart.forEach(c => { out += `${c.name}: Normal=${c.normal}ms, Dotted=${c.dotted}ms, Triplet=${c.triplet}ms\n`; });
                safeCopy(out, 'delay');
              }}
              onDownload={() => {
                let out = `BPM to Delay Time Chart\nBPM: ${delayBpm} | Sample Rate: ${delaySampleRate}Hz\n\n`;
                chart.forEach(c => {
                  out += `${c.name.padEnd(25)} Normal: ${c.normal}ms (${c.samples} samples) | Dotted: ${c.dotted}ms | Triplet: ${c.triplet}ms | Rate: ${c.hz}Hz\n`;
                });
                downloadTextFile('bpm_delay_chart.txt', out);
              }}
              isCopied={copiedKey === 'delay'}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Project Tempo (BPM)</label>
                <input
                  type="number"
                  min={30}
                  max={300}
                  value={delayBpm}
                  onChange={(e) => setDelayBpm(parseFloat(e.target.value) || 120)}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Audio Sample Rate</label>
                <select
                  value={delaySampleRate}
                  onChange={(e) => setDelaySampleRate(parseInt(e.target.value))}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white"
                >
                  <option value={44100}>44,100 Hz (CD Standard)</option>
                  <option value={48000}>48,000 Hz (Broadcast / Video)</option>
                  <option value={88200}>88,200 Hz (Hi-Res Audio)</option>
                  <option value={96000}>96,000 Hz (Studio Master)</option>
                  <option value={192000}>192,000 Hz (Audiophile Master)</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-xs text-slate-700 uppercase">Synchronized Note Values</span>
                <span className="text-xs font-mono font-bold text-purple-700">1/4 Note = {chart[2]?.normal} ms</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3">Subdivision</th>
                      <th className="p-3 text-right">Straight (ms)</th>
                      <th className="p-3 text-right">Dotted (ms)</th>
                      <th className="p-3 text-right">Triplet (ms)</th>
                      <th className="p-3 text-right">LFO Rate (Hz)</th>
                      <th className="p-3 text-right">Samples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {chart.map((c) => (
                      <tr key={c.name} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-slate-800">{c.name}</td>
                        <td className="p-3 text-right font-mono font-bold text-purple-700">{c.normal} ms</td>
                        <td className="p-3 text-right font-mono text-slate-600">{c.dotted} ms</td>
                        <td className="p-3 text-right font-mono text-slate-600">{c.triplet} ms</td>
                        <td className="p-3 text-right font-mono text-emerald-600">{c.hz} Hz</td>
                        <td className="p-3 text-right font-mono text-slate-400">{c.samples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 15. REVERB TIME CALCULATOR DECAY */}
      {slug === 'reverb-time-calculator-decay' && (() => {
        const quarterMs = 60000 / Math.max(1, revBpm);
        const preDelayMs = Math.round((quarterMs / 8) * 10) / 10;
        const baseRt60Map = {
          booth: 0.45,
          room: 0.95,
          hall: 2.1,
          cathedral: 4.5,
          stadium: 7.2
        };
        const rt60Sec = Math.round((baseRt60Map[revRoomType as keyof typeof baseRt60Map] || 2.0) * revDecayMultiplier * 100) / 100;
        const rt60Ms = Math.round(rt60Sec * 1000);
        const totalMusicalBeats = Math.round((rt60Ms / quarterMs) * 10) / 10;
        const musicalBars = Math.floor(totalMusicalBeats / 4);
        const remBeats = Math.round((totalMusicalBeats % 4) * 10) / 10;

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Reverb Calculator Actions"
              onReset={() => { setRevBpm(120); setRevRoomType('hall'); setRevDecayMultiplier(1.0); }}
              onCopy={() => safeCopy(`Reverb RT60: ${rt60Sec}s (${rt60Ms}ms) | Pre-Delay: ${preDelayMs}ms | Musical Length: ${musicalBars} bars, ${remBeats} beats`, 'rev')}
              onDownload={() => downloadTextFile('reverb_decay_specs.txt', `Acoustic Reverb Decay Specifications\n\nTempo: ${revBpm} BPM\nRoom Type: ${revRoomType}\nCalculated RT60 Decay: ${rt60Sec} seconds (${rt60Ms} ms)\nRecommended Pre-Delay: ${preDelayMs} ms (1/32 note)\nMusical Duration: ${musicalBars} Bars, ${remBeats} Beats\nEarly Reflection Window: ${Math.round(preDelayMs * 1.8)} ms`)}
              isCopied={copiedKey === 'rev'}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Song BPM</label>
                <input
                  type="number"
                  min={30}
                  max={300}
                  value={revBpm}
                  onChange={(e) => setRevBpm(parseFloat(e.target.value) || 120)}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Acoustic Space Type</label>
                <select
                  value={revRoomType}
                  onChange={(e) => setRevRoomType(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white"
                >
                  <option value="booth">Vocal Booth (0.45s)</option>
                  <option value="room">Studio Room (0.95s)</option>
                  <option value="hall">Concert Hall (2.10s)</option>
                  <option value="cathedral">Cathedral (4.50s)</option>
                  <option value="stadium">Arena / Stadium (7.20s)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Decay Scale Multiplier ({revDecayMultiplier}x)</label>
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={revDecayMultiplier}
                  onChange={(e) => setRevDecayMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-purple-600 mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <p className="text-xs text-purple-800 font-medium">RT60 Decay Time</p>
                <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{rt60Sec}s</p>
                <p className="text-[11px] text-purple-700">{rt60Ms} milliseconds</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
                <p className="text-xs text-indigo-800 font-medium">BPM Sync Pre-Delay</p>
                <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{preDelayMs} ms</p>
                <p className="text-[11px] text-indigo-700">1/32 Note Separation</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
                <p className="text-xs text-emerald-800 font-medium">Musical Duration</p>
                <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{musicalBars}b {remBeats}beats</p>
                <p className="text-[11px] text-emerald-600">{totalMusicalBeats} total beats</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">HF Damping Cutoff</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">6,400 Hz</p>
                <p className="text-[11px] text-slate-400">Natural air roll-off</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 16. SAMPLE RATE CONVERTER HELPER */}
      {slug === 'sample-rate-converter-helper' && (() => {
        const totalSamples = srRate * srDurationSec;
        const totalBits = totalSamples * srBits * srChannels;
        const totalBytes = totalBits / 8;
        const totalMB = Math.round((totalBytes / (1024 * 1024)) * 100) / 100;
        const totalGB = Math.round((totalMB / 1024) * 1000) / 1000;
        const bitrateKbps = Math.round((srRate * srBits * srChannels) / 1000);
        const nyquistKhz = srRate / 2000;
        const dynamicRangeDb = Math.round(srBits * 6.02);

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Sample Rate Calculator Actions"
              onReset={() => { setSrRate(48000); setSrBits(24); setSrChannels(2); setSrDurationSec(180); }}
              onCopy={() => safeCopy(`Audio Specs: ${srRate}Hz, ${srBits}-bit, ${srChannels}ch | Bitrate: ${bitrateKbps} kbps | File Size: ${totalMB} MB | Dynamic Range: ${dynamicRangeDb} dB`, 'sr')}
              onDownload={() => downloadTextFile('audio_specs_report.txt', `Audio Format & Bandwidth Specifications\n\nSample Rate: ${srRate} Hz\nBit Depth: ${srBits} bits per sample\nAudio Channels: ${srChannels} (${srChannels === 1 ? 'Mono' : srChannels === 2 ? 'Stereo' : 'Multi-channel'})\nDuration: ${Math.floor(srDurationSec / 60)}m ${srDurationSec % 60}s (${srDurationSec} seconds)\n\nCalculated Results:\nRaw Uncompressed Bitrate: ${bitrateKbps} kbps\nTotal File Size: ${totalMB} MB (${totalGB} GB)\nNyquist Cutoff Frequency: ${nyquistKhz} kHz\nTheoretical Dynamic Range: ${dynamicRangeDb} dB`)}
              isCopied={copiedKey === 'sr'}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Sample Rate (Hz)</label>
                <select value={srRate} onChange={(e) => setSrRate(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value={44100}>44,100 Hz (CD)</option>
                  <option value={48000}>48,000 Hz (Broadcast)</option>
                  <option value={88200}>88,200 Hz (Hi-Res)</option>
                  <option value={96000}>96,000 Hz (Studio)</option>
                  <option value={192000}>192,000 Hz (Master)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Bit Depth</label>
                <select value={srBits} onChange={(e) => setSrBits(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value={16}>16-bit PCM</option>
                  <option value={24}>24-bit Studio</option>
                  <option value={32}>32-bit Float</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Channels</label>
                <select value={srChannels} onChange={(e) => setSrChannels(parseInt(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value={1}>1 (Mono)</option>
                  <option value={2}>2 (Stereo)</option>
                  <option value={6}>6 (5.1 Surround)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Duration (Seconds)</label>
                <input
                  type="number"
                  min={1}
                  value={srDurationSec}
                  onChange={(e) => setSrDurationSec(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <p className="text-xs text-purple-800 font-medium">Uncompressed Size</p>
                <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{totalMB} MB</p>
                <p className="text-[11px] text-purple-700">{totalGB} GB</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
                <p className="text-xs text-indigo-800 font-medium">Uncompressed Bitrate</p>
                <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{bitrateKbps.toLocaleString()}</p>
                <p className="text-[11px] text-indigo-700">kbps PCM stream</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
                <p className="text-xs text-emerald-800 font-medium">Nyquist Limit</p>
                <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">{nyquistKhz} kHz</p>
                <p className="text-[11px] text-emerald-600">Max audible frequency</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">Dynamic Range</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{dynamicRangeDb} dB</p>
                <p className="text-[11px] text-slate-400">SNR ceiling</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 17. AUDIO FREQUENCY TO PITCH FINDER */}
      {slug === 'audio-frequency-to-pitch-finder' && (() => {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const safeFreq = Math.max(10, pitchFreq);
        const midiNumber = 69 + 12 * Math.log2(safeFreq / pitchRefA4);
        const nearestMidi = Math.round(midiNumber);
        const noteIndex = ((nearestMidi % 12) + 12) % 12;
        const octave = Math.floor(nearestMidi / 12) - 1;
        const noteName = noteNames[noteIndex] + octave;
        const exactNoteFreq = Math.round(pitchRefA4 * Math.pow(2, (nearestMidi - 69) / 12) * 100) / 100;
        const centsOffset = Math.round(1200 * Math.log2(safeFreq / exactNoteFreq));
        const wavelengthCm = Math.round((34300 / safeFreq) * 10) / 10;

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Pitch & Frequency Actions"
              onReset={() => { setPitchFreq(440); setPitchRefA4(440); }}
              onCopy={() => safeCopy(`Frequency: ${safeFreq} Hz | Note: ${noteName} | Offset: ${centsOffset > 0 ? '+' : ''}${centsOffset} cents | Exact: ${exactNoteFreq} Hz`, 'pitch')}
              onDownload={() => downloadTextFile('frequency_pitch_specs.txt', `Audio Frequency to Musical Pitch Report\n\nInput Frequency: ${safeFreq} Hz\nReference Pitch A4: ${pitchRefA4} Hz\nNearest Musical Note: ${noteName}\nExact Note Frequency: ${exactNoteFreq} Hz\nTuning Deviation: ${centsOffset > 0 ? '+' : ''}${centsOffset} cents (${Math.abs(centsOffset) <= 5 ? 'In Tune' : centsOffset > 0 ? 'Sharp' : 'Flat'})\nMIDI Note Number: ${nearestMidi}\nWavelength in Air: ${wavelengthCm} cm (${(wavelengthCm / 100).toFixed(3)} m)`)}
              isCopied={copiedKey === 'pitch'}
            />

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Target Frequency (Hz): {safeFreq} Hz</label>
                  <input
                    type="number"
                    step="0.1"
                    min={20}
                    max={20000}
                    value={pitchFreq}
                    onChange={(e) => setPitchFreq(parseFloat(e.target.value) || 440)}
                    className="w-full px-3 py-1.5 border rounded-lg text-xs font-mono font-bold"
                  />
                  <input
                    type="range"
                    min={55}
                    max={1760}
                    step={1}
                    value={Math.min(1760, Math.max(55, pitchFreq))}
                    onChange={(e) => setPitchFreq(parseFloat(e.target.value))}
                    className="w-full accent-purple-600 mt-2"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Reference Concert Pitch (A4)</label>
                  <select value={pitchRefA4} onChange={(e) => setPitchRefA4(parseFloat(e.target.value))} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                    <option value={440}>A4 = 440 Hz (Standard Concert Pitch)</option>
                    <option value={432}>A4 = 432 Hz (Verdi Tuning)</option>
                    <option value={442}>A4 = 442 Hz (European Orchestra)</option>
                    <option value={444}>A4 = 444 Hz (Bright Solo Tuning)</option>
                  </select>
                  <button
                    type="button"
                    onClick={toggleReferenceTone}
                    className={`mt-3 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition-colors ${isTonePlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                  >
                    <Volume2 className="w-4 h-4" /> {isTonePlaying ? 'Stop Reference Tone' : 'Play Reference Tone'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <p className="text-xs text-purple-800 font-medium">Nearest Note</p>
                <p className="text-3xl font-black font-mono text-purple-900 mt-1">{noteName}</p>
                <p className="text-[11px] text-purple-700">MIDI #{nearestMidi}</p>
              </div>
              <div className={`p-4 rounded-xl border text-center ${Math.abs(centsOffset) <= 4 ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}>
                <p className="text-xs font-medium text-slate-700">Tuning Deviation</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  {centsOffset > 0 ? `+${centsOffset}` : centsOffset} cents
                </p>
                <p className="text-[11px] text-slate-600">
                  {Math.abs(centsOffset) <= 4 ? 'Spot On In-Tune' : centsOffset > 0 ? 'Sharp Pitch' : 'Flat Pitch'}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">Exact Pitch Target</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{exactNoteFreq} Hz</p>
                <p className="text-[11px] text-slate-400">Pure temper frequency</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">Acoustic Wavelength</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{wavelengthCm} cm</p>
                <p className="text-[11px] text-slate-400">At 20°C ambient air</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 18. CHORD PROGRESSION GENERATOR SMART */}
      {slug === 'chord-progression-generator-smart' && (() => {
        const rootNotes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
        const rootFreqs: Record<string, number> = {
          'C': 261.63, 'C#': 277.18, 'D': 293.66, 'Eb': 311.13, 'E': 329.63, 'F': 349.23,
          'F#': 369.99, 'G': 392.00, 'Ab': 415.30, 'A': 440.00, 'Bb': 466.16, 'B': 493.88
        };

        const genrePresets: Record<string, { name: string; chords: { numeral: string; note: string; isMinor: boolean }[] }> = {
          pop: {
            name: 'Pop Anthem (I - V - vi - IV)',
            chords: [
              { numeral: 'I', note: chordRoot, isMinor: false },
              { numeral: 'V', note: rootNotes[(rootNotes.indexOf(chordRoot) + 7) % 12], isMinor: false },
              { numeral: 'vi', note: rootNotes[(rootNotes.indexOf(chordRoot) + 9) % 12], isMinor: true },
              { numeral: 'IV', note: rootNotes[(rootNotes.indexOf(chordRoot) + 5) % 12], isMinor: false }
            ]
          },
          jazz: {
            name: 'Jazz 2-5-1 (ii - V - I - vi)',
            chords: [
              { numeral: 'ii', note: rootNotes[(rootNotes.indexOf(chordRoot) + 2) % 12], isMinor: true },
              { numeral: 'V', note: rootNotes[(rootNotes.indexOf(chordRoot) + 7) % 12], isMinor: false },
              { numeral: 'I', note: chordRoot, isMinor: false },
              { numeral: 'vi', note: rootNotes[(rootNotes.indexOf(chordRoot) + 9) % 12], isMinor: true }
            ]
          },
          ballad: {
            name: 'Emotional Ballad (vi - IV - I - V)',
            chords: [
              { numeral: 'vi', note: rootNotes[(rootNotes.indexOf(chordRoot) + 9) % 12], isMinor: true },
              { numeral: 'IV', note: rootNotes[(rootNotes.indexOf(chordRoot) + 5) % 12], isMinor: false },
              { numeral: 'I', note: chordRoot, isMinor: false },
              { numeral: 'V', note: rootNotes[(rootNotes.indexOf(chordRoot) + 7) % 12], isMinor: false }
            ]
          },
          andalusian: {
            name: 'Flamenco Cadence (i - VII - VI - V)',
            chords: [
              { numeral: 'i', note: chordRoot, isMinor: true },
              { numeral: 'VII', note: rootNotes[(rootNotes.indexOf(chordRoot) + 10) % 12], isMinor: false },
              { numeral: 'VI', note: rootNotes[(rootNotes.indexOf(chordRoot) + 8) % 12], isMinor: false },
              { numeral: 'V', note: rootNotes[(rootNotes.indexOf(chordRoot) + 7) % 12], isMinor: false }
            ]
          }
        };

        const currentProg = genrePresets[chordGenre as keyof typeof genrePresets] || genrePresets.pop;
        const chordSymbols = currentProg.chords.map(c => `${c.note}${c.isMinor ? 'm' : ''}`).join(' - ');

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Chord Progression Actions"
              onReset={() => { setChordRoot('C'); setChordGenre('pop'); }}
              onCopy={() => safeCopy(`Progression: ${currentProg.name} | Chords: ${chordSymbols}`, 'prog')}
              onDownload={() => downloadTextFile('chord_progression.txt', `Smart Chord Progression Generator\n\nKey Root: ${chordRoot}\nStyle: ${currentProg.name}\nChord Sequence: ${chordSymbols}\n\nChord Breakdown:\n${currentProg.chords.map(c => `${c.numeral.padEnd(5)} ${c.note}${c.isMinor ? 'm' : ''}`).join('\n')}`)}
              isCopied={copiedKey === 'prog'}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Key Tonic (Root Note)</label>
                <select value={chordRoot} onChange={(e) => setChordRoot(e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white font-bold">
                  {rootNotes.map(n => <option key={n} value={n}>{n} Major</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Musical Genre / Harmonic Style</label>
                <select value={chordGenre} onChange={(e) => setChordGenre(e.target.value)} className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white">
                  <option value="pop">Pop Anthem (I - V - vi - IV)</option>
                  <option value="jazz">Jazz 2-5-1 (ii - V - I - vi)</option>
                  <option value="ballad">Emotional Ballad (vi - IV - I - V)</option>
                  <option value="andalusian">Flamenco Cadence (i - VII - VI - V)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentProg.chords.map((c, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3 hover:border-purple-300 transition-colors">
                  <span className="text-xs font-mono font-semibold text-slate-400 block">{c.numeral} Chord</span>
                  <p className="text-3xl font-black font-mono text-purple-700">{c.note}{c.isMinor ? 'm' : ''}</p>
                  <button
                    type="button"
                    onClick={() => playTriadChord(rootFreqs[c.note] || 261.63, c.isMinor)}
                    className="w-full py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Play Triad
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 19. AUDIO PAN LAW CALCULATOR */}
      {slug === 'audio-pan-law-calculator' && (() => {
        const normPan = panPosition / 100;
        const theta = ((normPan + 1) / 2) * (Math.PI / 2);
        const leftGain = Math.round(Math.cos(theta) * 1000) / 1000;
        const rightGain = Math.round(Math.sin(theta) * 1000) / 1000;
        const leftDb = leftGain > 0.001 ? Math.round(20 * Math.log10(leftGain) * 10) / 10 : -96.0;
        const rightDb = rightGain > 0.001 ? Math.round(20 * Math.log10(rightGain) * 10) / 10 : -96.0;
        const monoSumGain = Math.round((leftGain + rightGain) * 1000) / 1000;
        const monoSumDb = Math.round(20 * Math.log10(monoSumGain) * 10) / 10;

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="Pan Law Actions"
              onReset={() => { setPanPosition(0); setPanLaw('-3dB'); }}
              onCopy={() => safeCopy(`Pan: ${panPosition}% | Left: ${leftDb} dB (${leftGain}) | Right: ${rightDb} dB (${rightGain}) | Mono Sum: +${monoSumDb} dB`, 'pan')}
              onDownload={() => downloadTextFile('pan_law_specs.txt', `Audio Pan Law & Attenuation Analysis\n\nPan Position: ${panPosition}% (${panPosition === 0 ? 'Center' : panPosition < 0 ? `${Math.abs(panPosition)}% Left` : `${panPosition}% Right`})\nPan Law Standard: ${panLaw} Constant Power\n\nOutput Levels:\nLeft Channel: ${leftDb} dB (Multiplier: ${leftGain})\nRight Channel: ${rightDb} dB (Multiplier: ${rightGain})\nCenter Attenuation: -3.01 dB\nMono Collapse Sum Gain: ${monoSumDb > 0 ? '+' : ''}${monoSumDb} dB`)}
              isCopied={copiedKey === 'pan'}
            />

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700 uppercase">Stereo Pan Position: {panPosition === 0 ? 'Center (0)' : panPosition < 0 ? `${Math.abs(panPosition)}% Left` : `${panPosition}% Right`}</span>
                <span className="text-xs font-mono font-bold text-purple-700">Law: -3 dB Constant Power</span>
              </div>
              <input
                type="range"
                min={-100}
                max={100}
                step={1}
                value={panPosition}
                onChange={(e) => setPanPosition(parseInt(e.target.value) || 0)}
                className="w-full accent-purple-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>100% Left</span>
                <span>Center (0)</span>
                <span>100% Right</span>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Left: {(leftGain * 100).toFixed(1)}%</span>
                  <span>Right: {(rightGain * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full flex overflow-hidden">
                  <div style={{ width: `${(leftGain / (leftGain + rightGain)) * 100}%` }} className="h-full bg-purple-600" />
                  <div style={{ width: `${(rightGain / (leftGain + rightGain)) * 100}%` }} className="h-full bg-indigo-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <p className="text-xs text-purple-800 font-medium">Left Channel Level</p>
                <p className="text-2xl font-bold font-mono text-purple-900 mt-1">{leftDb} dB</p>
                <p className="text-[11px] text-purple-700">Gain: {leftGain}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 text-center">
                <p className="text-xs text-indigo-800 font-medium">Right Channel Level</p>
                <p className="text-2xl font-bold font-mono text-indigo-900 mt-1">{rightDb} dB</p>
                <p className="text-[11px] text-indigo-700">Gain: {rightGain}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 text-center">
                <p className="text-xs text-emerald-800 font-medium">Mono Collapsed Sum</p>
                <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">+{monoSumDb} dB</p>
                <p className="text-[11px] text-emerald-600">L+R acoustic boost</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-600 font-medium">Center Attenuation</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-1">-3.01 dB</p>
                <p className="text-[11px] text-slate-400">Equal power law</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 20. SYNTH ENVELOPE VISUALIZER ADSR */}
      {slug === 'synth-envelope-visualizer-adsr' && (() => {
        const totalDuration = adsrAttack + adsrDecay + adsrHold + adsrRelease;
        const totalW = 500;
        const h = 140;
        const scaleX = totalW / Math.max(100, totalDuration);
        const xA = adsrAttack * scaleX;
        const xD = (adsrAttack + adsrDecay) * scaleX;
        const xH = (adsrAttack + adsrDecay + adsrHold) * scaleX;
        const xR = (adsrAttack + adsrDecay + adsrHold + adsrRelease) * scaleX;
        const ySustain = h - (adsrSustain / 100) * (h - 20) - 10;

        return (
          <div className="space-y-6">
            <AudioActionToolbar
              label="ADSR Envelope Actions"
              onReset={() => { setAdsrAttack(100); setAdsrDecay(250); setAdsrSustain(60); setAdsrRelease(400); setAdsrHold(800); }}
              onCopy={() => safeCopy(`ADSR: Attack=${adsrAttack}ms, Decay=${adsrDecay}ms, Sustain=${adsrSustain}%, Release=${adsrRelease}ms | Total Duration=${totalDuration}ms`, 'adsr')}
              onDownload={() => downloadTextFile('synth_adsr_envelope.txt', `Synthesizer ADSR Envelope Preset\n\nAttack: ${adsrAttack} ms\nDecay: ${adsrDecay} ms\nSustain Level: ${adsrSustain} %\nRelease: ${adsrRelease} ms\nHold Duration: ${adsrHold} ms\nTotal Envelope Cycle: ${totalDuration} ms`)}
              isCopied={copiedKey === 'adsr'}
            />

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-purple-400">
                <span>ENVELOPE CURVE (Total: {totalDuration} ms)</span>
                <button
                  type="button"
                  onClick={playSynthAdsrSound}
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Audition Synth Sound
                </button>
              </div>

              <div className="w-full overflow-hidden bg-slate-950/80 rounded-xl p-3">
                <svg viewBox="0 0 500 140" className="w-full h-36">
                  <line x1="0" y1={ySustain} x2="500" y2={ySustain} stroke="#334155" strokeDasharray="3,3" />
                  <polygon
                    points={`0,${h - 10} ${xA},10 ${xD},${ySustain} ${xH},${ySustain} ${xR},${h - 10}`}
                    fill="rgba(168, 85, 247, 0.2)"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                  />
                  <text x={xA / 2} y={h - 15} fill="#94a3b8" fontSize="10" textAnchor="middle">A</text>
                  <text x={xA + (xD - xA) / 2} y={h - 15} fill="#94a3b8" fontSize="10" textAnchor="middle">D</text>
                  <text x={xD + (xH - xD) / 2} y={h - 15} fill="#94a3b8" fontSize="10" textAnchor="middle">S</text>
                  <text x={xH + (xR - xH) / 2} y={h - 15} fill="#94a3b8" fontSize="10" textAnchor="middle">R</text>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Attack: {adsrAttack} ms</label>
                <input type="range" min={5} max={1500} step={5} value={adsrAttack} onChange={(e) => setAdsrAttack(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Decay: {adsrDecay} ms</label>
                <input type="range" min={10} max={1500} step={10} value={adsrDecay} onChange={(e) => setAdsrDecay(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Sustain: {adsrSustain} %</label>
                <input type="range" min={0} max={100} step={1} value={adsrSustain} onChange={(e) => setAdsrSustain(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Release: {adsrRelease} ms</label>
                <input type="range" min={10} max={2500} step={10} value={adsrRelease} onChange={(e) => setAdsrRelease(parseInt(e.target.value))} className="w-full accent-purple-600" />
              </div>
            </div>
          </div>
        );
      })()}

      {/* PROCESSED AUDIO EXPORT BANNER */}
      {processedUrl && (
        <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-emerald-900 uppercase block">Processed Output Audio</span>
          <audio src={processedUrl} controls className="w-full" />
          <button onClick={() => triggerDownload(processedUrl, `${slug}_output.wav`)} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Processed WAV File
          </button>
        </div>
      )}
    </div>
  );
};
