const fs = require('fs');
let code = fs.readFileSync('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'utf8');

// 1. Add downloadTextFile helper if not present
if (!code.includes('function downloadTextFile')) {
  const downloadHelper = `
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
`;
  code = code.replace('export const AudioMusicToolsRunner', downloadHelper + '\nexport const AudioMusicToolsRunner');
}

// 2. Add AudioActionToolbar component if not present
if (!code.includes('const AudioActionToolbar')) {
  const actionToolbar = `
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
`;
  code = code.replace('export const AudioMusicToolsRunner', actionToolbar + '\nexport const AudioMusicToolsRunner');
}

// 3. Add States for Tools 13-20 inside AudioMusicToolsRunner
const newStates = `
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
`;

if (!code.includes('// Tool 13: BPM & Tap Tempo')) {
  code = code.replace('return (', newStates + '\n  return (');
}

fs.writeFileSync('app-source/src/components/tools/AudioMusicToolsRunner.tsx', code, 'utf8');
console.log('Successfully injected audio tools state and helpers');
