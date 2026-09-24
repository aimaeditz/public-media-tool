import { GlobalWindow } from 'happy-dom';

const window = new GlobalWindow();
(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = window.navigator;
(global as any).HTMLElement = window.HTMLElement;
(global as any).HTMLInputElement = window.HTMLInputElement;
(global as any).HTMLTextAreaElement = window.HTMLTextAreaElement;
(global as any).HTMLButtonElement = window.HTMLButtonElement;
(global as any).HTMLSelectElement = window.HTMLSelectElement;
(global as any).Event = window.Event;
(global as any).CustomEvent = window.CustomEvent;
(global as any).File = window.File;
(global as any).FileReader = window.FileReader;
(global as any).Blob = window.Blob;
(global as any).Image = window.Image;
(global as any).ImageData = (window as any).ImageData || function(w: number, h: number) { return { width: w, height: h, data: new Uint8ClampedArray(w * h * 4) }; };
(global as any).Audio = (window as any).Audio || function() { return { play: () => Promise.resolve(), pause: () => {}, addEventListener: () => {} }; };
(global as any).AudioContext = function() {
  return {
    createOscillator: () => ({ start: () => {}, stop: () => {}, connect: () => {} }),
    createGain: () => ({ connect: () => {}, gain: { value: 1 } }),
    destination: {}
  };
};
(global as any).webkitAudioContext = (global as any).AudioContext;
const nativeCrypto = globalThis.crypto;
(global as any).crypto = {
  subtle: nativeCrypto?.subtle,
  randomUUID: nativeCrypto?.randomUUID ? nativeCrypto.randomUUID.bind(nativeCrypto) : () => '11111111-2222-3333-4444-555555555555',
  getRandomValues: nativeCrypto?.getRandomValues ? nativeCrypto.getRandomValues.bind(nativeCrypto) : ((arr: any) => arr)
};

if (window.HTMLCanvasElement) {
  window.HTMLCanvasElement.prototype.getContext = function () {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x: number, y: number, w: number, h: number) => ({
        data: new Uint8ClampedArray(w * h * 4)
      }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 10 }),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} }),
      createPattern: () => ({})
    } as any;
  };
  window.HTMLCanvasElement.prototype.toDataURL = function () {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  };
}

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { WORKING_TOOLS } from '../src/lib/tools-data/index';
import { ToolRunner } from '../src/components/tools/ToolRunner';
import { getFieldSensibleInput } from './audit-meaningful-tools';

interface SuspiciousTool {
  index: number;
  name: string;
  slug: string;
  category: string;
  inputs: string;
  output: string;
  reason: string;
}

async function diagnose() {
  console.log(`Diagnosing all ${WORKING_TOOLS.length} tools for generic / mismatched outputs...`);
  const suspicious: SuspiciousTool[] = [];

  for (let i = 0; i < WORKING_TOOLS.length; i++) {
    const tool = WORKING_TOOLS[i];
    try {
      const { container, unmount } = render(React.createElement(ToolRunner, { tool }));

      const textareas = Array.from(container.querySelectorAll('textarea')) as HTMLTextAreaElement[];
      const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')) as HTMLInputElement[];
      const inputs = Array.from(container.querySelectorAll('input:not([type="file"]):not([type="hidden"])')) as HTMLInputElement[];
      const selects = Array.from(container.querySelectorAll('select')) as HTMLSelectElement[];
      const buttons = Array.from(container.querySelectorAll('button')) as HTMLButtonElement[];

      const interactions: string[] = [];

      fileInputs.forEach((fi) => {
        const inputData = getFieldSensibleInput(fi, tool, container);
        if (inputData.file) {
          act(() => {
            fireEvent.change(fi, { target: { files: [inputData.file] } });
          });
          interactions.push(`File: ${inputData.file.name}`);
        }
      });

      textareas.forEach((ta) => {
        const inputData = getFieldSensibleInput(ta, tool, container);
        act(() => {
          fireEvent.change(ta, { target: { value: inputData.value } });
        });
        interactions.push(`ta: "${inputData.value.slice(0, 20)}..."`);
      });

      inputs.forEach((inp) => {
        const inputData = getFieldSensibleInput(inp, tool, container);
        act(() => {
          if (inp.type === 'checkbox') {
            inp.checked = inputData.checked ?? true;
            fireEvent.click(inp);
          } else {
            fireEvent.change(inp, { target: { value: inputData.value } });
          }
        });
        interactions.push(`${inp.name || inp.type}=${inputData.value}`);
      });

      selects.forEach((sel) => {
        if (sel.options.length > 1) {
          act(() => {
            sel.selectedIndex = 1;
            fireEvent.change(sel, { target: { value: sel.options[1].value } });
          });
          interactions.push(`sel: ${sel.options[1].value}`);
        }
      });

      // Primary button
      const actionBtn = buttons.find(b => {
        const txt = (b.textContent || '').trim().toLowerCase();
        return (
          txt.includes('calculate') ||
          txt.includes('generate') ||
          txt.includes('convert') ||
          txt.includes('process') ||
          txt.includes('run') ||
          txt.includes('apply') ||
          txt.includes('format') ||
          txt.includes('validate') ||
          txt.includes('minify') ||
          txt.includes('encode') ||
          txt.includes('decode')
        ) && !txt.includes('copy') && !txt.includes('download') && !txt.includes('reset');
      });

      if (actionBtn) {
        act(() => {
          fireEvent.click(actionBtn);
        });
        interactions.push(`btn[${actionBtn.textContent?.trim()}]`);
      }

      const resultElements = Array.from(
        container.querySelectorAll(
          '.bg-slate-900 pre, .bg-slate-900 p, pre, code, .font-mono.text-sm, .font-mono.text-base, .font-mono.text-xl, .font-mono.text-2xl, .text-2xl.font-bold, .text-xl.font-bold, .text-3xl.font-bold'
        )
      );

      const outputCandidates: string[] = [];
      for (const el of resultElements) {
        const txt = el.textContent?.trim() || '';
        if (txt && !txt.includes(tool.name) && !txt.includes('Copy') && !outputCandidates.includes(txt)) {
          outputCandidates.push(txt);
        }
      }

      const output = outputCandidates.slice(0, 3).join(' | ') || (container.textContent || '').slice(0, 100);

      // Check if output is suspicious:
      let reason = '';
      const s = tool.slug.toLowerCase();
      const n = tool.name.toLowerCase();

      // 1. Fallback 400.00 | 125.00
      if (output.includes('400.00 | 125.00') || output.includes('400.00') && output.includes('125.00')) {
        reason = 'Calculator fallback (A * B / C = 400.00, sum = 125.00)';
      }
      // 2. Fallback EMI $766.23/mo when tool is not a loan
      else if ((output.includes('$766.23/mo') || output.includes('$2584.10')) && !s.includes('loan') && !s.includes('emi') && !s.includes('mortgage')) {
        reason = 'Finance fallback ($766.23/mo EMI) on non-loan tool';
      }
      // 3. Karvonen Heart Rate 190 BPM on non-heart rate tool
      else if ((output.includes('190 BPM') || output.includes('140 - 153 BPM')) && !s.includes('heart-rate') && !s.includes('pace') && !s.includes('karvonen')) {
        reason = 'Karvonen Heart Rate 190 BPM on non-cardio fitness tool';
      }
      // 4. Sidewall Height / tire size on retirement or non-car tool
      else if (output.includes('Sidewall Height') && !s.includes('tire') && !s.includes('wheel')) {
        reason = 'Automotive tire size output on non-tire tool (e.g., retirement)';
      }
      // 5. Epoch timestamp / world clock on specific date tool (e.g. age calculator, date difference)
      else if ((s.includes('age') || s.includes('birthday')) && output.includes('Unix timestamp conversion')) {
        reason = 'Generic epoch clock on Age/Birthday tool';
      }
      // 6. Generic certificate builder on GPA/CGPA or grading tool
      else if ((s.includes('gpa') || s.includes('cgpa')) && output.includes('Full-Stack Web Development')) {
        reason = 'Certificate builder template on GPA calculator';
      }

      if (reason) {
        suspicious.push({
          index: i + 1,
          name: tool.name,
          slug: tool.slug,
          category: tool.category,
          inputs: interactions.join(' , '),
          output: output.slice(0, 80),
          reason
        });
      }

      unmount();
    } catch (e: any) {
      suspicious.push({
        index: i + 1,
        name: tool.name,
        slug: tool.slug,
        category: tool.category,
        inputs: 'CRASH',
        output: e.message,
        reason: 'CRASH: ' + e.message
      });
    }

    if ((i + 1) % 200 === 0 || i === WORKING_TOOLS.length - 1) {
      console.log(`Diagnosed ${i + 1}/${WORKING_TOOLS.length} tools. Found ${suspicious.length} suspicious so far.`);
    }
  }

  console.log(`\n=== DIAGNOSTIC REPORT ===`);
  console.log(`Total suspicious tools found: ${suspicious.length}`);

  // Group by reason
  const reasons: Record<string, number> = {};
  suspicious.forEach(s => {
    reasons[s.reason] = (reasons[s.reason] || 0) + 1;
  });
  console.log('Breakdown by reason:');
  console.log(reasons);

  await Bun.write('suspicious_tools.json', JSON.stringify(suspicious, null, 2));
  console.log('Saved suspicious tools to suspicious_tools.json');
}

diagnose().catch(console.error);
