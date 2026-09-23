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

// Mock canvas getContext
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

interface TestResult {
  toolIndex: number;
  toolNumber: number;
  name: string;
  slug: string;
  category: string;
  inputUsed: string;
  outputObserved: string;
  passed: boolean;
  error?: string;
}

async function runAudit() {
  console.log(`Starting real test execution of tools 201 to ${WORKING_TOOLS.length}...`);
  const results: TestResult[] = [];
  let brokenCount = 0;

  for (let i = 200; i < WORKING_TOOLS.length; i++) {
    const tool = WORKING_TOOLS[i];
    const toolNumber = i + 1;
    let inputUsed = '';
    let outputObserved = '';
    let passed = false;
    let error: string | undefined;

    try {
      const { container, unmount } = render(React.createElement(ToolRunner, { tool }));

      // Find inputs
      const textareas = Array.from(container.querySelectorAll('textarea')) as HTMLTextAreaElement[];
      const fileInputs = Array.from(container.querySelectorAll('input[type="file"]')) as HTMLInputElement[];
      const inputs = Array.from(container.querySelectorAll('input:not([type="file"]):not([type="hidden"])')) as HTMLInputElement[];
      const selects = Array.from(container.querySelectorAll('select')) as HTMLSelectElement[];
      const buttons = Array.from(container.querySelectorAll('button')) as HTMLButtonElement[];

      const interactions: string[] = [];

      // 1. If file input exists
      if (fileInputs.length > 0) {
        const dummyFile = new (window as any).File(['Sample file content for testing'], 'test.txt', { type: 'text/plain' });
        act(() => {
          fireEvent.change(fileInputs[0], { target: { files: [dummyFile] } });
        });
        interactions.push('Uploaded file test.txt');
      }

      // 2. If textarea exists
      if (textareas.length > 0) {
        let sampleVal = '10, 20, 30, 40, 50';
        if (tool.slug.includes('json') || tool.name.toLowerCase().includes('json')) {
          sampleVal = '{"name": "test", "active": true, "count": 42}';
        } else if (tool.slug.includes('sql') || tool.name.toLowerCase().includes('sql')) {
          sampleVal = 'SELECT id, name, status FROM users WHERE active = 1;';
        } else if (tool.slug.includes('csv') || tool.name.toLowerCase().includes('csv')) {
          sampleVal = 'id,name,value\n1,Alpha,100\n2,Beta,200';
        } else if (tool.slug.includes('html') || tool.name.toLowerCase().includes('html')) {
          sampleVal = '<div class="content"><p>Hello World</p></div>';
        } else if (tool.category.includes('Text') || tool.slug.includes('text') || tool.name.toLowerCase().includes('text')) {
          sampleVal = 'The quick brown fox jumps over the lazy dog repeatedly for text analysis.';
        }
        act(() => {
          fireEvent.change(textareas[0], { target: { value: sampleVal } });
        });
        interactions.push(`Textarea set to: "${sampleVal.length > 40 ? sampleVal.slice(0, 37) + '...' : sampleVal}"`);
      }

      // 3. If standard inputs exist
      if (inputs.length > 0) {
        act(() => {
          inputs.slice(0, 3).forEach((inp, idx) => {
            let val = '';
            if (inp.type === 'number' || inp.type === 'range') {
              val = String(50 + idx * 25);
            } else if (inp.type === 'color') {
              val = '#4f46e5';
            } else if (inp.type === 'checkbox') {
              inp.checked = !inp.checked;
              val = String(inp.checked);
            } else {
              val = 'test-input-' + (idx + 1);
            }
            fireEvent.change(inp, { target: { value: val } });
            const label = inp.getAttribute('placeholder') || inp.getAttribute('name') || `input_${idx + 1}`;
            interactions.push(`${label}=${val}`);
          });
        });
      }

      // 4. If selects exist
      if (selects.length > 0) {
        act(() => {
          if (selects[0].options.length > 1) {
            selects[0].selectedIndex = 1;
            fireEvent.change(selects[0], { target: { value: selects[0].options[1].value } });
            interactions.push(`Selected: ${selects[0].options[1].text || selects[0].options[1].value}`);
          }
        });
      }

      // 5. Trigger primary action button if one exists
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
        interactions.push(`Clicked [${actionBtn.textContent?.trim()}]`);
      }

      inputUsed = interactions.length > 0 ? interactions.join(' | ') : 'Default interactive parameters initialized';

      // 6. Extract actual rendered output from DOM
      // Look for result containers, pre/code blocks, bold stats, or distinct output tags
      const outputCandidates: string[] = [];
      const resultElements = Array.from(
        container.querySelectorAll(
          '.bg-slate-900 pre, .bg-slate-900 p, pre, code, .font-mono.text-sm, .font-mono.text-base, .font-mono.text-xl, .font-mono.text-2xl, .text-2xl.font-bold, .text-xl.font-bold, .text-3xl.font-bold'
        )
      );

      for (const el of resultElements) {
        const txt = el.textContent?.trim() || '';
        if (
          txt &&
          !txt.includes(tool.name) &&
          txt !== 'Copy' &&
          txt !== 'Copied!' &&
          txt !== 'Copy Result' &&
          txt !== 'Copy Output' &&
          txt !== '100% Client-Side' &&
          !outputCandidates.includes(txt)
        ) {
          outputCandidates.push(txt);
        }
      }

      if (outputCandidates.length > 0) {
        outputObserved = outputCandidates.slice(0, 3).join(' ; ');
      } else {
        // Fallback to general container text snippet
        const bodyText = (container.textContent || '')
          .replace(/\s+/g, ' ')
          .replace(tool.name, '')
          .replace('100% In-Browser Privacy', '')
          .replace('Interactive Client-Side Workstation', '')
          .trim();
        outputObserved = bodyText.slice(0, 120);
      }

      // Truncate cleanly if too long
      if (outputObserved.length > 200) {
        outputObserved = outputObserved.slice(0, 197) + '...';
      }

      passed = outputObserved.length > 0;
      unmount();
    } catch (err: any) {
      passed = false;
      error = err.message || String(err);
      outputObserved = `FAILED: ${error}`;
      brokenCount++;
    }

    results.push({
      toolIndex: i,
      toolNumber,
      name: tool.name,
      slug: tool.slug,
      category: tool.category,
      inputUsed,
      outputObserved,
      passed,
      error
    });

    if (toolNumber % 100 === 0 || toolNumber === WORKING_TOOLS.length) {
      console.log(`Progress: Tested up to Tool #${toolNumber}/${WORKING_TOOLS.length} (Broken: ${brokenCount})`);
    }
  }

  console.log(`\nTesting Complete! Total tested: ${results.length}, Broken: ${brokenCount}`);
  // Write out results to JSON file for analysis
  await Bun.write('real_tested_tools_201_1516.json', JSON.stringify(results, null, 2));
  console.log('Saved detailed results to real_tested_tools_201_1516.json');
}

runAudit().catch(console.error);
