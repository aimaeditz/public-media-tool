import sys

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'r') as f:
    code = f.read()

target = '{/* PROCESSED AUDIO EXPORT BANNER */}'
if 'BPM TEMPO FINDER PRECISION' in code:
    print('Already injected')
    sys.exit(0)

ui_code = """
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
              onDownload={() => downloadTextFile('bpm_tempo_report.txt', `Precision BPM Tempo Report\\n\\nBPM: ${tapBpm}\\nBeat Interval: ${beatMs} ms\\nTempo Marking: ${tempoMarking}\\nRecorded Taps: ${tapTimes.length}`)}
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
                let out = `BPM: ${delayBpm} | Sample Rate: ${delaySampleRate}Hz\\n`;
                chart.forEach(c => { out += `${c.name}: Normal=${c.normal}ms, Dotted=${c.dotted}ms, Triplet=${c.triplet}ms\\n`; });
                safeCopy(out, 'delay');
              }}
              onDownload={() => {
                let out = `BPM to Delay Time Chart\\nBPM: ${delayBpm} | Sample Rate: ${delaySampleRate}Hz\\n\\n`;
                chart.forEach(c => {
                  out += `${c.name.padEnd(25)} Normal: ${c.normal}ms (${c.samples} samples) | Dotted: ${c.dotted}ms | Triplet: ${c.triplet}ms | Rate: ${c.hz}Hz\\n`;
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
              onDownload={() => downloadTextFile('reverb_decay_specs.txt', `Acoustic Reverb Decay Specifications\\n\\nTempo: ${revBpm} BPM\\nRoom Type: ${revRoomType}\\nCalculated RT60 Decay: ${rt60Sec} seconds (${rt60Ms} ms)\\nRecommended Pre-Delay: ${preDelayMs} ms (1/32 note)\\nMusical Duration: ${musicalBars} Bars, ${remBeats} Beats\\nEarly Reflection Window: ${Math.round(preDelayMs * 1.8)} ms`)}
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
              onDownload={() => downloadTextFile('audio_specs_report.txt', `Audio Format & Bandwidth Specifications\\n\\nSample Rate: ${srRate} Hz\\nBit Depth: ${srBits} bits per sample\\nAudio Channels: ${srChannels} (${srChannels === 1 ? 'Mono' : srChannels === 2 ? 'Stereo' : 'Multi-channel'})\\nDuration: ${Math.floor(srDurationSec / 60)}m ${srDurationSec % 60}s (${srDurationSec} seconds)\\n\\nCalculated Results:\\nRaw Uncompressed Bitrate: ${bitrateKbps} kbps\\nTotal File Size: ${totalMB} MB (${totalGB} GB)\\nNyquist Cutoff Frequency: ${nyquistKhz} kHz\\nTheoretical Dynamic Range: ${dynamicRangeDb} dB`)}
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
              onDownload={() => downloadTextFile('frequency_pitch_specs.txt', `Audio Frequency to Musical Pitch Report\\n\\nInput Frequency: ${safeFreq} Hz\\nReference Pitch A4: ${pitchRefA4} Hz\\nNearest Musical Note: ${noteName}\\nExact Note Frequency: ${exactNoteFreq} Hz\\nTuning Deviation: ${centsOffset > 0 ? '+' : ''}${centsOffset} cents (${Math.abs(centsOffset) <= 5 ? 'In Tune' : centsOffset > 0 ? 'Sharp' : 'Flat'})\\nMIDI Note Number: ${nearestMidi}\\nWavelength in Air: ${wavelengthCm} cm (${(wavelengthCm / 100).toFixed(3)} m)`)}
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
              onDownload={() => downloadTextFile('chord_progression.txt', `Smart Chord Progression Generator\\n\\nKey Root: ${chordRoot}\\nStyle: ${currentProg.name}\\nChord Sequence: ${chordSymbols}\\n\\nChord Breakdown:\\n${currentProg.chords.map(c => `${c.numeral.padEnd(5)} ${c.note}${c.isMinor ? 'm' : ''}`).join('\\n')}`)}
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
              onDownload={() => downloadTextFile('pan_law_specs.txt', `Audio Pan Law & Attenuation Analysis\\n\\nPan Position: ${panPosition}% (${panPosition === 0 ? 'Center' : panPosition < 0 ? `${Math.abs(panPosition)}% Left` : `${panPosition}% Right`})\\nPan Law Standard: ${panLaw} Constant Power\\n\\nOutput Levels:\\nLeft Channel: ${leftDb} dB (Multiplier: ${leftGain})\\nRight Channel: ${rightDb} dB (Multiplier: ${rightGain})\\nCenter Attenuation: -3.01 dB\\nMono Collapse Sum Gain: ${monoSumDb > 0 ? '+' : ''}${monoSumDb} dB`)}
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
              onDownload={() => downloadTextFile('synth_adsr_envelope.txt', `Synthesizer ADSR Envelope Preset\\n\\nAttack: ${adsrAttack} ms\\nDecay: ${adsrDecay} ms\\nSustain Level: ${adsrSustain} %\\nRelease: ${adsrRelease} ms\\nHold Duration: ${adsrHold} ms\\nTotal Envelope Cycle: ${totalDuration} ms`)}
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
"""

idx = code.find(target)
if idx != -1:
    new_code = code[:idx] + ui_code + '\n      ' + code[idx:]
    with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'w') as f:
        f.write(new_code)
    print("Successfully injected audio tools 13-20!")
else:
    print("Could not find target string")
