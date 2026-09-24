import re

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'r') as f:
    code = f.read()

# 1. Add applyBiquadFilter helper before AudioMusicToolsRunner
biquad_code = """
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
"""

if 'function applyBiquadFilter' not in code:
    code = code.replace('export const AudioMusicToolsRunner:', biquad_code + '\nexport const AudioMusicToolsRunner:')

# 2. Update processGraphicEq with real multi-band cascaded IIR filters
old_eq = """  // DSP: Graphic Equalizer Advanced (5 bands)
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
  };"""

new_eq = """  // DSP: Graphic Equalizer Advanced (5 discrete IIR bands)
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
  };"""

code = code.replace(old_eq, new_eq)

# 3. Update processPitchShift with granular pitch shifter preserving duration
old_pitch = """  // DSP: Smart Pitch Shift
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
  };"""

new_pitch = """  // DSP: Smart Pitch Shift (Granular Overlap-Add preserving duration)
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
  };"""

code = code.replace(old_pitch, new_pitch)

# 4. Update processNoiseRemover with real High-Pass Cutoff + Noise Gate
old_noise = """  // DSP: Noise Remover Gate & Rumble Filter
  const processNoiseRemover = () => {
    if (!audioBuffer) return;
    setIsProcessing(true);
    const ctx = getAudioCtx();
    const newBuffer = ctx.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
    const thresholdLinear = Math.pow(10, noiseGateThreshold / 20);

    for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
      const src = audioBuffer.getChannelData(c);
      const dst = newBuffer.getChannelData(c);
      for (let i = 0; i < audioBuffer.length; i++) {
        const absVal = Math.abs(src[i]);
        // Soft-knee noise gate attenuation
        if (absVal < thresholdLinear) {
          dst[i] = src[i] * 0.05; // 26dB attenuation for noise floor
        } else {
          dst[i] = src[i];
        }
      }
    }
    const wav = audioBufferToWav(newBuffer);
    setProcessedUrl(URL.createObjectURL(wav));
    setIsProcessing(false);
  };"""

new_noise = """  // DSP: Noise Remover Gate & Rumble High-Pass Filter
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
  };"""

code = code.replace(old_noise, new_noise)

# 5. Update startSpeechRecognition to remove fake strings
old_stt = """  // Tool 39: Speech to Text Recognizer
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setTranscriptText('Speech Recognition API not supported in this browser environment. Showing demo transcribed text: "Welcome to Public Media Tool audio processing suite."');
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecognizing(true);
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
      setTranscriptText('Listening simulated: "Audio track processing successfully completed."');
    }
  };"""

new_stt = """  // Tool 39: Speech to Text Recognizer (Honest Browser API Detection)
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
  };"""

code = code.replace(old_stt, new_stt)

# 6. Add Tool 41 real podcast mastering function
podcast_func = """  // Tool 41: Podcast Mastering (Intro/Outro Fade + Ducking)
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
"""

if 'const processPodcastMastering =' not in code:
    code = code.replace('const [podcastIntroDuration, setPodcastIntroDuration]', podcast_func + '\n  const [podcastIntroDuration, setPodcastIntroDuration]')

# 7. Update Tool 41 button to call processPodcastMastering
code = code.replace('if (audioBuffer) processBitrateCompression();', 'if (audioBuffer) processPodcastMastering();')

with open('app-source/src/components/tools/AudioMusicToolsRunner.tsx', 'w') as f:
    f.write(code)

print("Audio DSP functions successfully updated!")
