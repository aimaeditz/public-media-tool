import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Upload,
  Download,
  RotateCcw,
  Sliders,
  Image as ImageIcon,
  Check,
  Copy,
  Sparkles,
  RefreshCw,
  Eye,
  Info,
  Maximize2,
  ZoomIn,
  Palette,
  FileCheck
} from 'lucide-react';

interface ComprehensiveImageToolsRunnerProps {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

export const ComprehensiveImageToolsRunner: React.FC<ComprehensiveImageToolsRunnerProps> = ({
  tool,
  onCopy,
  copied
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('sample-image.png');
  const [fileSize, setFileSize] = useState<number>(0);
  const [naturalDimensions, setNaturalDimensions] = useState<{ width: number; height: number }>({ width: 800, height: 600 });

  // Filter & Transform controls
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [hue, setHue] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [cornerRadius, setCornerRadius] = useState<number>(0);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<string>('#3b82f6');
  const [watermarkText, setWatermarkText] = useState<string>('PublicMediaTool');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [pixelateSize, setPixelateSize] = useState<number>(0);
  const [vignetteAmount, setVignetteAmount] = useState<number>(0);
  const [noiseAmount, setNoiseAmount] = useState<number>(0);
  const [duotonePrimary, setDuotonePrimary] = useState<string>('#1e40af');
  const [duotoneSecondary, setDuotoneSecondary] = useState<string>('#f59e0b');
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [outputQuality, setOutputQuality] = useState<number>(92);
  const [extractedPalette, setExtractedPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize tool defaults based on slug
  useEffect(() => {
    const s = tool.slug.toLowerCase();
    if (s.includes('grayscale')) setGrayscale(100);
    else if (s.includes('sepia')) setSepia(100);
    else if (s.includes('inverter') || s.includes('invert')) setInvert(100);
    else if (s.includes('brightness')) setBrightness(130);
    else if (s.includes('contrast')) setContrast(140);
    else if (s.includes('saturation')) setSaturation(150);
    else if (s.includes('hue')) setHue(90);
    else if (s.includes('blur')) setBlur(6);
    else if (s.includes('pixelat')) setPixelateSize(12);
    else if (s.includes('vignette')) setVignetteAmount(60);
    else if (s.includes('noise')) setNoiseAmount(30);
    else if (s.includes('rounded')) setCornerRadius(24);
    else if (s.includes('border')) setBorderWidth(12);
    else if (s.includes('duotone')) { setGrayscale(100); }
    else if (s.includes('webp')) setOutputFormat('image/webp');
    else if (s.includes('ico') || s.includes('favicon')) {
      setTargetWidth(64);
      setTargetHeight(64);
    } else if (s.includes('thumbnail')) {
      setTargetWidth(320);
      setTargetHeight(180);
    }
  }, [tool.slug]);

  // Generate initial sample canvas image if none uploaded
  useEffect(() => {
    if (!imageSrc) {
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = 800;
      sampleCanvas.height = 500;
      const ctx = sampleCanvas.getContext('2d');
      if (ctx) {
        // Draw elegant gradient & graphic
        const grad = ctx.createLinearGradient(0, 0, 800, 500);
        grad.addColorStop(0, '#3b82f6');
        grad.addColorStop(0.5, '#6366f1');
        grad.addColorStop(1, '#ec4899');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 800, 500);

        // Pattern circles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(200, 150, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(650, 350, 180, 0, Math.PI * 2);
        ctx.fill();

        // Sample typography
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Public Media Tool', 400, 230);
        ctx.font = '20px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText('Client-Side Browser Processing Engine', 400, 280);

        const dataUrl = sampleCanvas.toDataURL('image/png');
        setImageSrc(dataUrl);
        setNaturalDimensions({ width: 800, height: 500 });
        setTargetWidth(800);
        setTargetHeight(500);
        setFileSize(28400);
      }
    }
  }, [imageSrc]);

  // Process and draw to canvas whenever parameters or imageSrc change
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = targetWidth || img.width;
      const h = targetHeight || img.height;
      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.save();

      // Rounded corners clipping if active
      if (cornerRadius > 0) {
        ctx.beginPath();
        const r = Math.min(cornerRadius, w / 2, h / 2);
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.quadraticCurveTo(w, 0, w, r);
        ctx.lineTo(w, h - r);
        ctx.quadraticCurveTo(w, h, w - r, h);
        ctx.lineTo(r, h);
        ctx.quadraticCurveTo(0, h, 0, h - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();
        ctx.clip();
      }

      // Transforms (rotation & flip)
      ctx.translate(w / 2, h / 2);
      if (rotation !== 0) ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

      // Filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%)`;

      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();

      // Pixelation effect if active
      if (pixelateSize > 1) {
        const pSize = Math.max(2, pixelateSize);
        const smallCanvas = document.createElement('canvas');
        const sW = Math.max(1, Math.floor(w / pSize));
        const sH = Math.max(1, Math.floor(h / pSize));
        smallCanvas.width = sW;
        smallCanvas.height = sH;
        const sCtx = smallCanvas.getContext('2d');
        if (sCtx) {
          sCtx.drawImage(canvas, 0, 0, sW, sH);
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(smallCanvas, 0, 0, sW, sH, 0, 0, w, h);
          ctx.imageSmoothingEnabled = true;
        }
      }

      // Vignette effect if active
      if (vignetteAmount > 0) {
        const grad = ctx.createRadialGradient(w / 2, h / 2, (w / 2) * 0.4, w / 2, h / 2, Math.max(w, h) / 1.4);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, `rgba(0,0,0,${vignetteAmount / 100})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Border if active
      if (borderWidth > 0) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, w - borderWidth, h - borderWidth);
      }

      // Watermark text if enabled
      if (watermarkText && watermarkOpacity > 0 && tool.slug.toLowerCase().includes('watermark')) {
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${watermarkOpacity / 100})`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 6;
        ctx.font = `bold ${Math.max(18, Math.floor(w * 0.045))}px sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText(watermarkText, w - 24, h - 24);
        ctx.restore();
      }

      // Extract color palette
      try {
        const idata = ctx.getImageData(0, 0, Math.min(w, 100), Math.min(h, 100)).data;
        const colorCounts: Record<string, number> = {};
        for (let i = 0; i < idata.length; i += 4 * 16) {
          const r = Math.round(idata[i] / 32) * 32;
          const g = Math.round(idata[i + 1] / 32) * 32;
          const b = Math.round(idata[i + 2] / 32) * 32;
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
        const sorted = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([hex]) => hex);
        setExtractedPalette(sorted);
      } catch (e) {
        // ignore cross-origin restriction
      }
    };
    img.src = imageSrc;
  }, [
    imageSrc,
    brightness,
    contrast,
    saturation,
    hue,
    blur,
    grayscale,
    sepia,
    invert,
    rotation,
    flipH,
    flipV,
    cornerRadius,
    borderWidth,
    borderColor,
    watermarkText,
    watermarkOpacity,
    pixelateSize,
    vignetteAmount,
    noiseAmount,
    targetWidth,
    targetHeight,
    tool.slug
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setNaturalDimensions({ width: img.width, height: img.height });
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        setImageSrc(res);
      };
      img.src = res;
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setHue(0);
    setBlur(0);
    setGrayscale(0);
    setSepia(0);
    setInvert(0);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setCornerRadius(0);
    setBorderWidth(0);
    setPixelateSize(0);
    setVignetteAmount(0);
    setTargetWidth(naturalDimensions.width);
    setTargetHeight(naturalDimensions.height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    const ext = outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/jpeg' ? 'jpg' : 'png';
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}-processed.${ext}`;
    link.href = canvas.toDataURL(outputFormat, outputQuality / 100);
    link.click();
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspect && naturalDimensions.width > 0) {
      setTargetHeight(Math.round((val / naturalDimensions.width) * naturalDimensions.height));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspect && naturalDimensions.height > 0) {
      setTargetWidth(Math.round((val / naturalDimensions.height) * naturalDimensions.width));
    }
  };

  const copyColorToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Header & Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium px-2 py-0.5 rounded-full">
                100% Client-Side Canvas
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {fileName} • {naturalDimensions.width} × {naturalDimensions.height} px • {(fileSize / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
            title="Reset transformations"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Preview Canvas */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden">
          <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60 mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Live Processed Canvas
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Zoom: 100%</span>
              <span>Output: {targetWidth} × {targetHeight}</span>
            </div>
          </div>

          <div className="w-full overflow-auto max-h-[520px] flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800/80">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto object-contain rounded shadow-sm transition-all"
              style={{ maxHeight: '480px' }}
            />
          </div>

          {/* Extracted Palette / Color Inspector */}
          {extractedPalette.length > 0 && (
            <div className="w-full mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <Palette className="w-3.5 h-3.5 text-blue-500" />
                Dominant Palette:
              </div>
              <div className="flex items-center gap-2">
                {extractedPalette.map((col) => (
                  <button
                    key={col}
                    onClick={() => copyColorToClipboard(col)}
                    className="group relative flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-xs text-slate-700 dark:text-slate-200 font-mono transition-colors"
                    title={`Click to copy ${col}`}
                  >
                    <span className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-500" style={{ backgroundColor: col }} />
                    {col}
                    {copiedColor === col && (
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-slate-900 text-white text-[10px] rounded shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls Sidebar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              Adjustments & Filters
            </h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Auto-Render</span>
          </div>

          {/* Dimension controls */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Resize & Dimensions
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Width (px)</span>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Height (px)</span>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Lock Aspect Ratio
            </label>
          </div>

          {/* Orientation & Flip */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Rotation & Flip
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                Rotate 90°
              </button>
              <button
                onClick={() => setFlipH((h) => !h)}
                className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${flipH ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
              >
                Flip H
              </button>
              <button
                onClick={() => setFlipV((v) => !v)}
                className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${flipV ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
              >
                Flip V
              </button>
            </div>
          </div>

          {/* Sliders for core visual adjustments */}
          <div className="space-y-3.5 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Brightness</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{brightness}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Contrast</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{contrast}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Saturation</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Blur Radius</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Grayscale / B&W</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{grayscale}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={grayscale}
                onChange={(e) => setGrayscale(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Sepia Tone</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{sepia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Rounded Corners</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{cornerRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={cornerRadius}
                onChange={(e) => setCornerRadius(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Export Settings */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Output Format & Quality
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['image/png', 'image/jpeg', 'image/webp'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setOutputFormat(fmt)}
                  className={`py-1.5 text-xs font-medium rounded transition-colors ${outputFormat === fmt ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                >
                  {fmt.replace('image/', '').toUpperCase()}
                </button>
              ))}
            </div>
            {outputFormat !== 'image/png' && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Compression Quality</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{outputQuality}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={outputQuality}
                  onChange={(e) => setOutputQuality(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
