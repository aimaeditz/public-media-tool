import sys

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'r') as f:
    code = f.read()

# 1. Add loadSampleAudio function if not present
if 'const loadSampleAudio =' not in code:
    sample_loader = """
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
"""
    code = code.replace('const handleFileUpload =', sample_loader + '\n  const handleFileUpload =')

# 2. Add sample audio button to the upload block
upload_needle = '<input type="file" accept="audio/*"'
sample_btn = """<div className="flex flex-wrap items-center gap-3">
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="block text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
            <span className="text-xs text-slate-400 font-bold uppercase">or</span>
            <button
              type="button"
              onClick={() => loadSampleAudio(6)}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Load Sample Audio Track
            </button>
          </div>"""

if 'Load Sample Audio Track' not in code:
    code = code.replace('<input type="file" accept="audio/*" onChange={handleFileUpload} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />', sample_btn)

# 3. Add states for tools 15, 16, 17, 18
extra_states = """
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
"""

if 'const [crossfadeSec, setCrossfadeSec]' not in code:
    code = code.replace('return (', extra_states + '\n  return (', 1)

# 4. Now add specific UI blocks for tools 13, 14, 15, 16, 17, 18, 19, 20
tools_ui = """
      {/* TOOL 13: UNIVERSAL AUDIO TRIMMER */}
      {slug === 'universal-audio-trimmer' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Trimmer Actions"
            onReset={() => { setTrimStart(0); setTrimEnd(Math.min(5, duration || 5)); }}
            onCopy={() => safeCopy(`Audio Trim Range: Start=${trimStart}s, End=${trimEnd}s | Length=${(trimEnd - trimStart).toFixed(2)}s`, 'trim')}
            onDownload={() => downloadTextFile('trim_specs.txt', `Universal Audio Trimmer Specs\\nStart Time: ${trimStart} seconds\\nEnd Time: ${trimEnd} seconds\\nTrim Duration: ${(trimEnd - trimStart).toFixed(2)} seconds\\nSource Duration: ${duration.toFixed(2)} seconds`)}
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
            onDownload={() => downloadTextFile('crop_specs.txt', `Online Audio Cropper Settings\\nCrop In: ${trimStart}s\\nCrop Out: ${trimEnd}s\\nExtracted Window: ${(trimEnd - trimStart).toFixed(2)}s`)}
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
            onDownload={() => downloadTextFile('merge_specs.txt', `Audio Merger Master Settings\\nCrossfade Duration: ${crossfadeSec} seconds\\nSource Length: ${duration.toFixed(2)} seconds\\nOutput Format: 16-bit PCM WAV`)}
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
            onDownload={() => downloadTextFile('split_specs.txt', `Advanced Audio Splitter Report\\nParts Count: ${splitParts}\\nSource Audio Duration: ${duration.toFixed(2)}s\\nSegments Generated: ${splitResults.length}`)}
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
            onDownload={() => downloadTextFile('compressor_specs.txt', `Smart Audio Compressor Settings\\nThreshold: ${compThreshold} dB\\nRatio: ${compRatio}:1\\nAttack Time: ${compAttack * 1000} ms\\nRelease Time: ${compRelease * 1000} ms\\nMakeup Gain: +${compMakeup} dB`)}
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
            onDownload={() => downloadTextFile('convert_specs.txt', `Audio Format Converter Specs\\nTarget Sample Rate: ${targetSampleRate} Hz\\nBit Depth: ${targetBitDepth}\\nChannels: ${targetChannels === 1 ? 'Mono' : 'Stereo'}\\nOutput Codec: Linear PCM WAV`)}
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
            onDownload={() => downloadTextFile('speed_specs.txt', `Audio Speed Settings\\nPlayback Speed Multiplier: ${speedRate}x\\nSource Duration: ${duration.toFixed(2)}s\\nEstimated Duration: ${(duration / speedRate).toFixed(2)}s`)}
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
            onDownload={() => downloadTextFile('reverser_specs.txt', `Audio Reverser Settings\\nDirection: Chronological Reverse\\nSource Duration: ${duration.toFixed(2)}s`)}
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
"""

# Replace old Tool 13, 19, 20 sections with our comprehensive blocks
old_t13 = """      {/* TOOL 13: AUDIO TRIMMER */}
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
      )}"""

if old_t13 in code:
    code = code.replace(old_t13, tools_ui)
    print("Replaced old audio blocks with comprehensive tools 13-20")
else:
    print("Could not find exact old_t13 string; prepending tools_ui")
    code = code.replace('{/* PROCESSED AUDIO EXPORT BANNER */}', tools_ui + '\n      {/* PROCESSED AUDIO EXPORT BANNER */}')

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'w') as f:
    f.write(code)

print("AudioMusicToolsRunner successfully updated for Tools 13-20!")
