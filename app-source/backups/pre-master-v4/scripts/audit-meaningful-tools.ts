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
import { Tool } from '../src/lib/types';

export function getFieldSensibleInput(
  el: HTMLInputElement | HTMLTextAreaElement,
  tool: Tool,
  container: HTMLElement
): { value: string; file?: any; checked?: boolean } {
  // Extract contextual clues from label, placeholder, name, id, and nearby text
  const labelText = (() => {
    let text = '';
    const id = el.id;
    if (id) {
      const lbl = container.querySelector(`label[for="${id}"]`);
      if (lbl?.textContent) text += ' ' + lbl.textContent;
    }
    const parentLabel = el.closest('label');
    if (parentLabel?.textContent) text += ' ' + parentLabel.textContent;
    const prevSibling = el.previousElementSibling;
    if (prevSibling?.textContent && (prevSibling.tagName === 'LABEL' || prevSibling.tagName === 'P' || prevSibling.tagName === 'SPAN')) {
      text += ' ' + prevSibling.textContent;
    }
    const parentPrev = el.parentElement?.previousElementSibling;
    if (parentPrev?.textContent && parentPrev.tagName === 'LABEL') {
      text += ' ' + parentPrev.textContent;
    }
    return text.toLowerCase();
  })();

  const placeholder = (el.getAttribute('placeholder') || '').toLowerCase();
  const name = (el.getAttribute('name') || '').toLowerCase();
  const fieldType = (el.getAttribute('type') || (el.tagName === 'TEXTAREA' ? 'textarea' : 'text')).toLowerCase();
  const context = `${labelText} ${placeholder} ${name} ${tool.name.toLowerCase()} ${tool.slug}`.toLowerCase();

  // 1. Files
  if (fieldType === 'file') {
    const accept = (el.getAttribute('accept') || '').toLowerCase();
    if (accept.includes('pdf') || context.includes('pdf')) {
      const pdfContent = '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF';
      const file = new (window as any).File([pdfContent], 'document.pdf', { type: 'application/pdf' });
      return { value: '', file };
    }
    if (accept.includes('image') || context.includes('image') || context.includes('photo') || context.includes('filter') || context.includes('crop') || context.includes('resize')) {
      const file = new (window as any).File(['fake-png-binary-data'], 'sample-photo.png', { type: 'image/png' });
      return { value: '', file };
    }
    if (accept.includes('json') || context.includes('json')) {
      const file = new (window as any).File(['{"project":"media-tool","valid":true,"items":[1,2,3]}'], 'data.json', { type: 'application/json' });
      return { value: '', file };
    }
    if (accept.includes('csv') || context.includes('csv') || context.includes('spreadsheet')) {
      const file = new (window as any).File(['id,item,qty,price\n1,Widget Alpha,5,19.99\n2,Widget Beta,2,49.50'], 'report.csv', { type: 'text/csv' });
      return { value: '', file };
    }
    const file = new (window as any).File(['Public Media Tools - Verified Production Content\nReady for client-side processing.'], 'document.txt', { type: 'text/plain' });
    return { value: '', file };
  }

  // 2. Color picker
  if (fieldType === 'color') {
    if (context.includes('background') || context.includes('bg')) return { value: '#f1f5f9' };
    if (context.includes('secondary') || context.includes('accent')) return { value: '#10b981' };
    return { value: '#3b82f6' };
  }

  // 3. Date & Time inputs
  if (fieldType === 'date') {
    if (context.includes('birth') || context.includes('dob')) return { value: '1996-05-18' };
    if (context.includes('start') || context.includes('from') || context.includes('period')) return { value: '2025-01-15' };
    if (context.includes('end') || context.includes('to') || context.includes('target') || context.includes('due')) return { value: '2025-11-20' };
    return { value: '2025-06-15' };
  }
  if (fieldType === 'time') {
    return { value: '14:30' };
  }
  if (fieldType === 'month') {
    return { value: '2025-06' };
  }

  // 4. Checkbox
  if (fieldType === 'checkbox') {
    return { value: 'true', checked: true };
  }

  // 5. Numeric inputs (number & range)
  if (fieldType === 'number' || fieldType === 'range') {
    const minAttr = el.getAttribute('min');
    const maxAttr = el.getAttribute('max');
    const min = minAttr !== null ? parseFloat(minAttr) : null;
    const max = maxAttr !== null ? parseFloat(maxAttr) : null;

    if (context.includes('birth month') || (context.includes('month') && max === 12)) return { value: '6' };
    if (context.includes('birth day') || (context.includes('day') && max === 31)) return { value: '15' };
    if (context.includes('birth year') || (context.includes('year') && min && min >= 1900)) return { value: '1995' };
    if (context.includes('current year') || (context.includes('target year') && min && min >= 2000)) return { value: '2026' };

    // Human biometrics
    if (context.includes('age')) return { value: '32' };
    if (context.includes('weight') && context.includes('kg')) return { value: '74' };
    if (context.includes('weight') && context.includes('lb')) return { value: '165' };
    if (context.includes('height') && (context.includes('cm') || context.includes('centimeter'))) return { value: '178' };
    if (context.includes('height') && (context.includes('in') || context.includes('inch'))) return { value: '70' };
    if (context.includes('heart rate') || context.includes('bpm') || context.includes('pulse')) return { value: '72' };
    if (context.includes('step')) return { value: '8500' };
    if (context.includes('calorie') || context.includes('kcal')) return { value: '2150' };
    if (context.includes('protein')) return { value: '135' };
    if (context.includes('water') && context.includes('ml')) return { value: '2500' };
    if (context.includes('water') && (context.includes('oz') || context.includes('ounce'))) return { value: '85' };
    if (context.includes('sleep') && context.includes('hour')) return { value: '7.5' };

    // Financial
    if (context.includes('annual salary') || context.includes('yearly income')) return { value: '85000' };
    if (context.includes('hourly') || context.includes('wage')) return { value: '42' };
    if (context.includes('loan') || context.includes('principal') || context.includes('mortgage') || context.includes('borrow')) return { value: '240000' };
    if (context.includes('asset') || context.includes('portfolio') || context.includes('net worth')) return { value: '150000' };
    if (context.includes('liabilit') || context.includes('debt')) return { value: '35000' };
    if (context.includes('beginning') || context.includes('initial invest') || context.includes('start val')) return { value: '12000' };
    if (context.includes('ending') || context.includes('final val') || context.includes('target val')) return { value: '32000' };
    if (context.includes('price') || context.includes('cost') || context.includes('budget') || context.includes('amount') || context.includes('bill')) return { value: '450' };
    if (context.includes('down payment')) return { value: '48000' };
    if (context.includes('tip') && context.includes('%')) return { value: '18' };
    if (context.includes('discount') && context.includes('%')) return { value: '20' };
    if (context.includes('tax') && context.includes('%')) return { value: '8.25' };
    if (context.includes('interest') && context.includes('%')) return { value: '6.5' };
    if (context.includes('inflation') && context.includes('%')) return { value: '3.2' };
    if (context.includes('cagr') || (context.includes('rate') && context.includes('%'))) return { value: '9.5' };
    if (context.includes('percent') || context.includes('percentage') || context.includes('ratio %')) return { value: '25' };
    if (context.includes('tenure') || (context.includes('term') && context.includes('month'))) return { value: '36' };
    if (context.includes('tenure') || (context.includes('term') && context.includes('year'))) return { value: '5' };

    // Automotive & Physics
    if (context.includes('tire width') || context.includes('section width')) return { value: '225' };
    if (context.includes('aspect ratio') && context.includes('tire')) return { value: '50' };
    if (context.includes('rim') || context.includes('wheel diameter')) return { value: '17' };
    if (context.includes('battery') && context.includes('kwh')) return { value: '78' };
    if (context.includes('consumption') || context.includes('wh/mi')) return { value: '265' };
    if (context.includes('charger') && context.includes('kw')) return { value: '11' };
    if (context.includes('soc') || context.includes('charge %')) return { value: '20' };
    if (context.includes('mpg')) return { value: '32' };
    if (context.includes('gas price') || context.includes('fuel price')) return { value: '3.75' };
    if (context.includes('speed') && (context.includes('mph') || context.includes('km/h'))) return { value: '65' };
    if (context.includes('watt') || context.includes('power')) return { value: '1400' };
    if (context.includes('kwh') && context.includes('cost')) return { value: '0.15' };
    if (context.includes('pressure') && (context.includes('psi') || context.includes('bar'))) return { value: '32' };
    if (context.includes('temperature') && context.includes('c')) return { value: '24' };
    if (context.includes('temperature') && context.includes('f')) return { value: '75' };

    // Dimensions & Math
    if (context.includes('width') && context.includes('px')) return { value: '1280' };
    if (context.includes('height') && context.includes('px')) return { value: '720' };
    if (context.includes('scale') || context.includes('zoom')) return { value: '150' };
    if (context.includes('side a') || context.includes('length a')) return { value: '6' };
    if (context.includes('side b') || context.includes('length b')) return { value: '8' };
    if (context.includes('side c') || context.includes('hypotenuse')) return { value: '10' };
    if (context.includes('n (total') || context.includes('perm n') || context.includes('objects (n)')) return { value: '10' };
    if (context.includes('r (sample') || context.includes('perm r') || context.includes('sample (r)')) return { value: '3' };
    if (context.includes('fraction') && context.includes('numerator')) return { value: '3' };
    if (context.includes('fraction') && context.includes('denominator')) return { value: '4' };
    if (context.includes('score') || context.includes('grade')) return { value: '86' };
    if (context.includes('gpa')) return { value: '3.7' };
    if (context.includes('credits')) return { value: '4' };
    if (context.includes('days') || context.includes('duration')) return { value: '14' };
    if (context.includes('hours')) return { value: '8' };
    if (context.includes('minutes')) return { value: '45' };
    if (context.includes('file size') && (context.includes('gb') || context.includes('mb'))) return { value: '15' };
    if (context.includes('download speed') || context.includes('mbps')) return { value: '120' };

    // Constrained bounds fallback
    if (min !== null && max !== null) {
      const mid = min + (max - min) * 0.4;
      return { value: String(Math.round(mid * 10) / 10) };
    }
    if (min !== null && min > 0) return { value: String(min * 2) };
    if (max !== null && max < 50) return { value: String(Math.floor(max * 0.75)) };

    return { value: '25' };
  }

  // 6. Text, TextArea, Email, URL, Search
  if (fieldType === 'email' || context.includes('email')) {
    return { value: 'sarah.engineer@example.com' };
  }
  if (fieldType === 'url' || context.includes('url') || context.includes('website') || context.includes('domain') || context.includes('link')) {
    return { value: 'https://example.com/production/analytics-overview' };
  }
  if (context.includes('ip address') || context.includes('ipv4')) {
    return { value: '192.168.1.100' };
  }
  if (context.includes('phone') || context.includes('tel')) {
    return { value: '+1 (555) 789-0123' };
  }
  if (context.includes('postal') || context.includes('zip')) {
    return { value: '94107' };
  }
  if (context.includes('json')) {
    return { value: '{"appName": "MediaTool", "version": "3.1.0", "status": "active", "totalModules": 52}' };
  }
  if (context.includes('csv')) {
    return { value: 'dept,employees,annual_budget\nEngineering,48,6500000\nMarketing,18,2200000\nDesign,12,1400000' };
  }
  if (context.includes('sql') || context.includes('query')) {
    return { value: 'SELECT user_id, email, created_at FROM platform_users WHERE is_verified = TRUE ORDER BY created_at DESC;' };
  }
  if (context.includes('html')) {
    return { value: '<section class="featured"><h2 class="title">Production System</h2><p class="desc">Client-side execution verified.</p></section>' };
  }
  if (context.includes('css')) {
    return { value: '.production-card { display: grid; gap: 1rem; border-radius: 0.75rem; background: #ffffff; padding: 1.5rem; }' };
  }
  if (context.includes('markdown') || context.includes('md')) {
    return { value: '# System Architecture\n\n- Pure client-side execution\n- Complete sandbox privacy\n- Zero latency processing' };
  }
  if (context.includes('roman')) {
    return { value: 'MMXXIV' };
  }
  if (context.includes('binary')) {
    return { value: '101010' };
  }
  if (context.includes('hex')) {
    return { value: '#4f46e5' };
  }
  if (context.includes('morse')) {
    return { value: '... --- ...' };
  }
  if (context.includes('base64')) {
    return { value: 'UHVibGljIE1lZGlhIFRvb2wgVmVyaWZpZWQ=' };
  }
  if (context.includes('password') || context.includes('secret') || context.includes('key')) {
    return { value: 'K9#mQ8$vL2!wZ7@x' };
  }
  if (context.includes('name') || context.includes('student') || context.includes('author') || context.includes('client')) {
    return { value: 'Alex Morgan' };
  }
  if (context.includes('company') || context.includes('organization') || context.includes('issuer') || context.includes('brand')) {
    return { value: 'Vertex Media Global' };
  }
  if (context.includes('title') || context.includes('subject') || context.includes('course')) {
    return { value: 'Full-Stack Distributed Systems Engineering' };
  }

  if (el.tagName === 'TEXTAREA') {
    return { value: 'The quick brown fox jumps over the lazy dog. Real-time verification ensures reliable performance across all interactive browser utilities with high accuracy.' };
  }

  return { value: 'Verified Production Sample' };
}

async function runSampleAudit() {
  console.log('Testing first 20 tools with meaningful inputs...');
  for (let i = 0; i < 20; i++) {
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
        interactions.push(`Textarea: "${inputData.value.slice(0, 30)}..."`);
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
        const label = inp.getAttribute('placeholder') || inp.getAttribute('name') || inp.type;
        interactions.push(`${label}=${inputData.value}`);
      });

      selects.forEach((sel) => {
        if (sel.options.length > 1) {
          act(() => {
            sel.selectedIndex = 1;
            fireEvent.change(sel, { target: { value: sel.options[1].value } });
          });
          interactions.push(`Select: ${sel.options[1].text}`);
        }
      });

      // Click primary action button
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

      // Read output
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
      console.log(`Tool ${i + 1}: ${tool.name}`);
      console.log(`   Inputs: ${interactions.join(' , ')}`);
      console.log(`   Output: ${output.slice(0, 120)}`);
      console.log('---');
      unmount();
    } catch (e: any) {
      console.error(`Tool ${i + 1} (${tool.name}) ERROR:`, e.message);
    }
  }
}

runSampleAudit().catch(console.error);
