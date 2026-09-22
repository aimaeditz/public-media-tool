import React, { useState, useEffect, useRef } from 'react';
import { Tool } from '../../lib/types';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import {
  FileText,
  Upload,
  Download,
  RotateCw,
  Eye,
  ShieldCheck,
  Hash,
  Layers,
  Copy,
  Check,
  Info,
  Stamp,
  Sliders,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface ComprehensivePdfToolsRunnerProps {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

interface PdfPageInfo {
  pageNumber: number;
  width: number;
  height: number;
  rotation: number;
}

export const ComprehensivePdfToolsRunner: React.FC<ComprehensivePdfToolsRunnerProps> = ({
  tool,
  onCopy,
  copied
}) => {
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState<string>('sample-document.pdf');
  const [fileSize, setFileSize] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pagesInfo, setPagesInfo] = useState<PdfPageInfo[]>([]);
  const [metadata, setMetadata] = useState<{
    title: string;
    author: string;
    subject: string;
    creator: string;
    producer: string;
    creationDate: string;
  }>({
    title: 'Client-Side Document',
    author: 'PublicMediaTool User',
    subject: 'Client-Side PDF Processing',
    creator: 'PublicMediaTool Browser Engine',
    producer: 'pdf-lib',
    creationDate: new Date().toLocaleDateString()
  });

  // Action states
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [watermarkText, setWatermarkText] = useState<string>('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.3);
  const [watermarkSize, setWatermarkSize] = useState<number>(48);
  const [checksumSha256, setChecksumSha256] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('PDF loaded and ready');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Generate an initial sample PDF in memory on first mount
  useEffect(() => {
    async function createSamplePdf() {
      try {
        const doc = await PDFDocument.create();
        const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await doc.embedFont(StandardFonts.Helvetica);

        // Page 1
        const page1 = doc.addPage([595.28, 841.89]); // A4
        page1.drawText('Public Media Tool', {
          x: 50,
          y: 780,
          size: 28,
          font: helveticaBold,
          color: rgb(0.12, 0.4, 0.9)
        });
        page1.drawText('Client-Side Browser PDF Engine', {
          x: 50,
          y: 745,
          size: 16,
          font: helvetica,
          color: rgb(0.3, 0.3, 0.3)
        });
        page1.drawText(`Tool Name: ${tool.name}`, {
          x: 50,
          y: 700,
          size: 12,
          font: helveticaBold,
          color: rgb(0.1, 0.1, 0.1)
        });
        page1.drawText(
          'This PDF was dynamically created client-side using pdf-lib in your web browser.\nNo servers or AI APIs are touched. Everything runs 100% privately on your machine.',
          {
            x: 50,
            y: 660,
            size: 11,
            font: helvetica,
            color: rgb(0.25, 0.25, 0.25),
            lineHeight: 18
          }
        );

        // Decorative line
        page1.drawLine({
          start: { x: 50, y: 620 },
          end: { x: 545, y: 620 },
          thickness: 1,
          color: rgb(0.85, 0.85, 0.88)
        });

        // Page 2
        const page2 = doc.addPage([595.28, 841.89]);
        page2.drawText('Page 2 - Metadata & Inspection Demo', {
          x: 50,
          y: 780,
          size: 20,
          font: helveticaBold,
          color: rgb(0.12, 0.4, 0.9)
        });
        page2.drawText(
          'Page 2 is ready for rotation, watermarking, stamping, and redaction tests.',
          {
            x: 50,
            y: 740,
            size: 12,
            font: helvetica,
            color: rgb(0.3, 0.3, 0.3)
          }
        );

        const bytes = await doc.save();
        setPdfBytes(bytes);
        setFileSize(bytes.byteLength);
        setPageCount(2);
        setPagesInfo([
          { pageNumber: 1, width: 595.28, height: 841.89, rotation: 0 },
          { pageNumber: 2, width: 595.28, height: 841.89, rotation: 0 }
        ]);

        // Calculate SHA-256
        const hashBuffer = await crypto.subtle.digest('SHA-256', bytes as any);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setChecksumSha256(hashHex);
      } catch (err) {
        console.error('Failed to create sample PDF:', err);
      }
    }

    createSamplePdf();
  }, [tool.name]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setFileSize(file.size);
    setIsProcessing(true);
    setStatusMessage('Reading PDF file...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });

      const pCount = doc.getPageCount();
      setPageCount(pCount);
      const pInfo: PdfPageInfo[] = [];
      for (let i = 0; i < pCount; i++) {
        const page = doc.getPage(i);
        const { width, height } = page.getSize();
        const rotation = page.getRotation().angle;
        pInfo.push({ pageNumber: i + 1, width, height, rotation });
      }
      setPagesInfo(pInfo);
      setPdfBytes(bytes);

      // Metadata
      setMetadata({
        title: doc.getTitle() || 'Untitled Document',
        author: doc.getAuthor() || 'Unknown Author',
        subject: doc.getSubject() || 'None',
        creator: doc.getCreator() || 'Unknown Application',
        producer: doc.getProducer() || 'Unknown Producer',
        creationDate: doc.getCreationDate()?.toLocaleDateString() || 'Not specified'
      });

      // Calculate SHA-256
      const hashBuffer = await crypto.subtle.digest('SHA-256', bytes as any);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setChecksumSha256(hashHex);

      setStatusMessage(`Successfully loaded ${pCount} pages`);
    } catch (err) {
      console.error('PDF Load Error:', err);
      setStatusMessage('Error parsing PDF file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRotateAll = async (angle: number) => {
    if (!pdfBytes) return;
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.load(pdfBytes);
      const count = doc.getPageCount();
      for (let i = 0; i < count; i++) {
        const page = doc.getPage(i);
        const curRot = page.getRotation().angle;
        page.setRotation(degrees((curRot + angle) % 360));
      }
      const newBytes = await doc.save();
      setPdfBytes(newBytes);
      setStatusMessage(`Rotated ${count} pages by ${angle}°`);

      // Update pages info
      setPagesInfo((prev) =>
        prev.map((p) => ({ ...p, rotation: (p.rotation + angle) % 360 }))
      );
    } catch (err) {
      console.error('Rotate error:', err);
      setStatusMessage('Failed to rotate pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyWatermark = async () => {
    if (!pdfBytes || !watermarkText) return;
    setIsProcessing(true);
    try {
      const doc = await PDFDocument.load(pdfBytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const count = doc.getPageCount();

      for (let i = 0; i < count; i++) {
        const page = doc.getPage(i);
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 2 - 120,
          y: height / 2,
          size: watermarkSize,
          font,
          color: rgb(0.8, 0.1, 0.1),
          opacity: watermarkOpacity,
          rotate: degrees(45)
        });
      }

      const newBytes = await doc.save();
      setPdfBytes(newBytes);
      setStatusMessage(`Applied watermark to ${count} pages`);
    } catch (err) {
      console.error('Watermark error:', err);
      setStatusMessage('Failed to apply watermark.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBytes) return;
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    link.download = `${baseName}-modified.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyHashToClipboard = () => {
    if (!checksumSha256) return;
    navigator.clipboard.writeText(checksumSha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium px-2 py-0.5 rounded-full">
                pdf-lib Client Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {fileName} • {pageCount} Pages • {(fileSize / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={handleDownload}
            disabled={!pdfBytes}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Save & Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive PDF Page Grid & Metadata */}
        <div className="lg:col-span-2 space-y-6">
          {/* Page Grid Inspector */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Document Pages ({pagesInfo.length})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">{statusMessage}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[380px] overflow-y-auto p-1">
              {pagesInfo.map((page) => (
                <div
                  key={page.pageNumber}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex flex-col items-center justify-between text-center relative group"
                >
                  <div className="w-full aspect-[1/1.4] bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center p-2 shadow-xs transition-transform transform">
                    <FileText className="w-8 h-8 text-red-500 mb-1" />
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Page {page.pageNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {Math.round(page.width)} × {Math.round(page.height)} pt
                    </span>
                    {page.rotation > 0 && (
                      <span className="mt-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[9px] font-bold rounded">
                        {page.rotation}°
                      </span>
                    )}
                  </div>

                  <div className="w-full mt-2 flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleRotateAll(90)}
                      className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded transition-colors text-xs flex items-center gap-1"
                      title="Rotate 90° Clockwise"
                    >
                      <RotateCw className="w-3 h-3" />
                      Rotate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Properties & Metadata */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <Info className="w-4 h-4 text-emerald-500" />
              Document Properties & EXIF Headers
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Title</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{metadata.title}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Author</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{metadata.author}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Producer</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{metadata.producer}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Creator Tool</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{metadata.creator}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Created Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{metadata.creationDate}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <span className="text-slate-400 block mb-0.5">Page Size</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Standard A4 / Letter</span>
              </div>
            </div>

            {/* Checksum Bar */}
            {checksumSha256 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono overflow-hidden">
                  <Hash className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">SHA-256:</span>
                  <span className="truncate">{checksumSha256}</span>
                </div>
                <button
                  onClick={copyHashToClipboard}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-medium text-slate-700 dark:text-slate-300 rounded flex items-center gap-1 self-start sm:self-auto shrink-0 transition-colors"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copiedHash ? 'Copied' : 'Copy Hash'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Operations & Tools Controls */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              PDF Tools & Modifications
            </h3>
          </div>

          {/* Rotation Tool */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Rotate All Pages
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleRotateAll(90)}
                disabled={isProcessing}
                className="py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                +90°
              </button>
              <button
                onClick={() => handleRotateAll(180)}
                disabled={isProcessing}
                className="py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                180°
              </button>
              <button
                onClick={() => handleRotateAll(270)}
                disabled={isProcessing}
                className="py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                270°
              </button>
            </div>
          </div>

          {/* Watermark & Stamp Tool */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-blue-500" />
              Add Watermark / Stamp
            </label>
            <div>
              <span className="text-xs text-slate-500 block mb-1">Watermark Text</span>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="CONFIDENTIAL, APPROVED, etc."
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Opacity</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {Math.round(watermarkOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={watermarkOpacity}
                onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
            <button
              onClick={handleApplyWatermark}
              disabled={isProcessing || !watermarkText}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply Watermark to All Pages
            </button>
          </div>

          {/* Client-Side Security Guarantee Banner */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Client-Side Privacy
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
              Your PDF documents are never uploaded to any remote server or third-party cloud. All manipulation, parsing, and rendering are executed in your web browser memory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
