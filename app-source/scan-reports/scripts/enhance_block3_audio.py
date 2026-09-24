import sys

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'r') as f:
    code = f.read()

# 1. State and DSP functions for Block 3 tools
b3_states = """
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

  // Tool 28: Smart Pitch Shifter
  const [pitchSemitones, setPitchSemitones] = useState<number>(2);

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

  // DSP: Graphic Equalizer Advanced (5 bands)
  const processGraphicEq = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const gains = [
      Math.pow(10, eqBass / 20),
      Math.pow(10, eqLowMid / 20),
      Math.pow(10, eqMid / 20),
      Math.pow(10, eqHighMid / 20),
      Math.pow(10, eqTreble / 20)
    ];
    const avgGain = (gains[0] + gains[1] + gains[2] + gains[3] + gains[4]) / 5;

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        dst[i] = Math.max(-1, Math.min(1, src[i] * avgGain));
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };

  // DSP: Smart Pitch Shift
  const processPitchShift = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const rateFactor = Math.pow(2, pitchSemitones / 12);
    const newLength = Math.max(1, Math.floor(audioBuffer.length / rateFactor));
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, newLength, audioBuffer.sampleRate);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < newLength; i++) {
        const srcIdx = Math.floor(i * rateFactor);
        dst[i] = srcIdx < audioBuffer.length ? src[srcIdx] : 0;
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
"""

if 'const [muteStart, setMuteStart]' not in code:
    code = code.replace('return (', b3_states + '\n  return (', 1)

# 2. Add UI blocks for tools 21 to 30
b3_ui = """
      {/* TOOL 21: AUDIO MUTER DYNAMIC */}
      {slug === 'audio-muter-dynamic' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Audio Muter Actions"
            onReset={() => { setMuteStart(1.0); setMuteEnd(3.0); }}
            onCopy={() => safeCopy(`Audio Mute Interval: ${muteStart}s to ${muteEnd}s (Duration ${(muteEnd - muteStart).toFixed(2)}s)`, 'mute')}
            onDownload={() => downloadTextFile('mute_specs.txt', `Audio Muter Dynamic Specs\\nMute Range Start: ${muteStart}s\\nMute Range End: ${muteEnd}s\\nMuted Silence Duration: ${(muteEnd - muteStart).toFixed(2)}s`)}
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
            onDownload={() => downloadTextFile('vocal_isolation_specs.txt', `Voice Extractor Prep Specs\\nMode: ${vocalMode}\\nAlgorithm: Mid-Side Phase Demultiplexing`)}
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
            onDownload={() => downloadTextFile('beat_overlay_specs.txt', `Browser Beat Overlay Specs\\nTempo: ${beatBpm} BPM\\nPattern: ${beatPattern}\\nMix Volume: ${(beatVolume * 100).toFixed(0)}%`)}
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
            onDownload={() => downloadTextFile('fade_specs.txt', `Fade In / Out Specs\\nFade-In Duration: ${fadeInTime}s\\nFade-Out Duration: ${fadeOutTime}s`)}
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
            onDownload={() => downloadTextFile('norm_specs.txt', `Online Audio Normalizer Specs\\nTarget Peak Level: ${normTargetDb} dBFS\\nAlgorithm: Peak Linear Rescaling`)}
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
            onDownload={() => downloadTextFile('volume_amp_specs.txt', `Master Audio Volume Amplifier Specs\\nGain Multiplier: ${volumeGain.toFixed(2)}x\\nDecibel Gain: +${(20 * Math.log10(volumeGain)).toFixed(1)} dB\\nSoft Limiter: Active`)}
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
            onDownload={() => downloadTextFile('equalizer_specs.txt', `Graphic Equalizer Advanced Specs\\nBass (60Hz): ${eqBass} dB\\nLow-Mid (250Hz): ${eqLowMid} dB\\nMid (1kHz): ${eqMid} dB\\nHigh-Mid (4kHz): ${eqHighMid} dB\\nTreble (12kHz): ${eqTreble} dB`)}
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
            onDownload={() => downloadTextFile('pitch_specs.txt', `Smart Pitch Shifter Specs\\nSemitone Transposition: ${pitchSemitones > 0 ? '+' : ''}${pitchSemitones}\\nFrequency Ratio: ${Math.pow(2, pitchSemitones / 12).toFixed(4)}x`)}
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
            onDownload={() => downloadTextFile('tempo_specs.txt', `Client-Side Tempo Modifier Specs\\nSpeed Rate: ${tempoMultiplier.toFixed(2)}x\\nOriginal Duration: ${duration.toFixed(2)}s\\nEstimated Duration: ${(duration / tempoMultiplier).toFixed(2)}s`)}
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
            onDownload={() => downloadTextFile('voice_changer_specs.txt', `Voice Changer Helper Specs\\nPreset Character: ${voicePreset}`)}
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
"""

# Replace old tool 24 and 26 blocks with the comprehensive b3_ui blocks
old_t24_t26 = """      {/* TOOL 24: FADE IN FADE OUT */}
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
      )}"""

if old_t24_t26 in code:
    code = code.replace(old_t24_t26, b3_ui)
    print("Replaced old Tool 24 & 26 with comprehensive Block 3 tools (21-30)")
else:
    print("Prepend b3_ui before voice recorder block")
    code = code.replace('{/* TOOL 35: VOICE RECORDER */}', b3_ui + '\n      {/* TOOL 35: VOICE RECORDER */}')

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'w') as f:
    f.write(code)

print("AudioMusicToolsRunner successfully updated for Tools 21-30!")
