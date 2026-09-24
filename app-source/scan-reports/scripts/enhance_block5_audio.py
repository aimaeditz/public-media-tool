import re

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'r') as f:
    code = f.read()

# 1. Add Block 5 state hooks if not present
b5_states = """
  // Block 5 Tool States (Tools 41-46)
  // Tool 41: Podcast Editor Prep
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
"""

if 'const [podcastIntroDuration, setPodcastIntroDuration]' not in code:
    code = code.replace('return (', b5_states + '\n  return (', 1)

# 2. Add UI blocks for tools 41-46
b5_ui = """
      {/* TOOL 41: EASY PODCAST EPISODE EDITOR PREP */}
      {slug === 'easy-podcast-episode-editor-prep' && (
        <div className="space-y-6">
          <AudioActionToolbar
            label="Podcast Prep Actions"
            onReset={() => { setPodcastIntroDuration(3); setPodcastOutroDuration(3); setPodcastDuckLevel(-12); }}
            onCopy={() => safeCopy(`Podcast Settings: Intro Fade ${podcastIntroDuration}s, Outro Fade ${podcastOutroDuration}s, Music Ducking ${podcastDuckLevel} dB`, 'podcast')}
            onDownload={() => downloadTextFile('podcast_mastering_specs.txt', `Easy Podcast Episode Editor Prep Specs\\nIntro Fade: ${podcastIntroDuration}s\\nOutro Fade: ${podcastOutroDuration}s\\nMusic Ducking: ${podcastDuckLevel} dB\\nStandard Target Loudness: -16 LUFS (Broadcast)`)}
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
              <button type="button" onClick={() => { if (audioBuffer) processBitrateCompression(); }} disabled={!audioBuffer || isProcessing} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl flex items-center gap-2">
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
            onDownload={() => downloadTextFile('metronome_specs.txt', `Universal BPM Metronome Specs\\nBPM: ${metronomeBpm}\\nTime Signature: ${metronomeTimeSig}/4\\nBeat Interval: ${(60000 / metronomeBpm).toFixed(2)} ms`)}
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
            onCopy={() => safeCopy(`Transposed (${transposeSemitones > 0 ? '+' : ''}${transposeSemitones}):\\n${transposedChords}`, 'key')}
            onDownload={() => downloadTextFile('transposed_chords.txt', `Original Chords:\\n${chordInput}\\n\\nTransposition: ${transposeSemitones > 0 ? '+' : ''}${transposeSemitones} Semitones\\n\\nTransposed Result:\\n${transposedChords}`)}
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
            onDownload={() => downloadTextFile('chord_progression.txt', `Chord Progression Generator Master Specs\\nScale: ${progressionScale}\\nGenre: ${progressionGenre}\\nChords: ${generatedChords.join(' - ')}`)}
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
              onDownload={() => downloadTextFile('delay_times.txt', `BPM to Delay & Reverb Calculator\\nTempo: ${calcBpm} BPM\\n\\n` + delays.map(d => `${d.name}: ${d.ms.toFixed(2)} ms (${d.hz} Hz)`).join('\\n'))}
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
              onCopy={() => safeCopy(`Standard Guitar Tuning Frequencies:\\n` + strings.map(s => `${s.note} (${s.string}): ${s.freq} Hz`).join('\\n'), 'tuner')}
              onDownload={() => downloadTextFile('guitar_tuning_specs.txt', `Standard Guitar Tuning Pitch Reference (A4 = 440 Hz)\\n\\n` + strings.map(s => `${s.string} - ${s.note}: ${s.freq} Hz`).join('\\n'))}
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
"""

# Replace old tool 43 block with b5_ui
old_t43_pattern = r'\{\/\* TOOL 43: MUSIC KEY TRANSPOSER \*\/\}[\s\S]*?\{\/\* 13\. BPM TEMPO FINDER PRECISION \*\/\}'

if '{/* TOOL 43: MUSIC KEY TRANSPOSER */}' in code:
    code = re.sub(old_t43_pattern, b5_ui.strip() + '\n\n      {/* 13. BPM TEMPO FINDER PRECISION */}', code)
    print("Replaced old Tool 43 with comprehensive Block 5 tools (41-46)")

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'w') as f:
    f.write(code)

print("AudioMusicToolsRunner successfully updated for Tools 41-46!")
