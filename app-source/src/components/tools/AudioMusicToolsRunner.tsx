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
  RotateCcw
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
          <input type="file" accept="audio/*" onChange={handleFileUpload} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
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

      {/* TOOL 13: AUDIO TRIMMER */}
      {(slug === 'universal-audio-trimmer' || slug === 'online-audio-cropper') && (
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
          <button onClick={processTrimCrop} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <Scissors className="w-4 h-4" /> Trim Selected Audio Region
          </button>
        </div>
      )}

      {/* TOOL 19: SPEED CHANGER */}
      {slug === 'easy-audio-speed-changer' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <h4 className="font-bold text-sm text-slate-800">Playback Speed Rate: {speedRate}x</h4>
          <input type="range" min={0.25} max={3.0} step={0.05} value={speedRate} onChange={(e) => setSpeedRate(parseFloat(e.target.value))} className="w-full accent-purple-600" />
          <button onClick={processSpeedChange} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <Zap className="w-4 h-4" /> Apply Speed Rate Change
          </button>
        </div>
      )}

      {/* TOOL 20: AUDIO REVERSER */}
      {slug === 'custom-audio-reverser' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <h4 className="font-bold text-sm text-slate-800">Reverse Track Audio Channels</h4>
          <button onClick={processReverse} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <RotateCcw className="w-4 h-4" /> Process Audio Backwards
          </button>
        </div>
      )}

      {/* TOOL 24: FADE IN FADE OUT */}
      {slug === 'fade-in-fade-out-tool-universal' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
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
          <button onClick={processFade} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Apply Fades
          </button>
        </div>
      )}

      {/* TOOL 26: VOLUME AMPLIFIER */}
      {slug === 'master-audio-volume-amplifier' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <h4 className="font-bold text-sm text-slate-800">Gain Multiplier: {volumeGain.toFixed(1)}x (+{(20 * Math.log10(volumeGain)).toFixed(1)} dB)</h4>
          <input type="range" min={0.5} max={5.0} step={0.1} value={volumeGain} onChange={(e) => setVolumeGain(parseFloat(e.target.value))} className="w-full accent-purple-600" />
          <button onClick={processVolumeAmplify} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center gap-2">
            <Volume2 className="w-4 h-4" /> Boost Audio Volume
          </button>
        </div>
      )}

      {/* TOOL 35: VOICE RECORDER */}
      {slug === 'universal-web-audio-recorder' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
          <h4 className="font-bold text-sm text-slate-800">Live Microphone Recorder</h4>
          <button onClick={toggleRecording} className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 text-white ${isRecording ? 'bg-rose-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-700'}`}>
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isRecording ? 'Stop Recording' : 'Start Mic Recording'}</span>
          </button>
          {recordedUrl && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl space-y-3">
              <audio src={recordedUrl} controls className="w-full" />
              <button onClick={() => triggerDownload(recordedUrl, 'voice_recording.webm')} className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-lg flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> Download WebM Audio
              </button>
            </div>
          )}
        </div>
      )}

      {/* TOOL 38: TEXT TO SPEECH */}
      {slug === 'advanced-text-to-speech-synthesizer' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <textarea value={ttsText} onChange={(e) => setTtsText(e.target.value)} rows={3} className="w-full p-3 border rounded-xl text-xs font-medium" />
          <div className="flex gap-4">
            <button
              onClick={() => {
                const u = new SpeechSynthesisUtterance(ttsText);
                u.rate = ttsRate;
                u.pitch = ttsPitch;
                window.speechSynthesis.speak(u);
              }}
              className="px-5 py-2.5 bg-purple-600 text-white font-bold text-xs rounded-xl flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" /> Speak
            </button>
            <button onClick={() => window.speechSynthesis.cancel()} className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">
              Stop
            </button>
          </div>
        </div>
      )}

      {/* TOOL 43: MUSIC KEY TRANSPOSER */}
      {slug === 'online-music-key-transposer' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-700">Chord Chart Input</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Transpose Semitones:</span>
              <input type="number" min={-11} max={11} value={transposeSemitones} onChange={(e) => setTransposeSemitones(parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 border rounded text-xs text-center font-bold" />
            </div>
          </div>
          <textarea value={chordInput} onChange={(e) => setChordInput(e.target.value)} rows={4} className="w-full p-3 border rounded-xl text-xs font-mono" />
          <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs whitespace-pre-wrap">
            {transposedChords}
          </div>
        </div>
      )}

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
