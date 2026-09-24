const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function run() {
  console.log('Launching browser for baseline fingerprint sampling...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();

  // Test loading base page
  await page.goto('http://localhost:3000/public-media-tool/', { waitUntil: 'domcontentloaded' });
  console.log('Base page loaded. Title:', await page.title());

  // Read tools from ORDER.md or chunks
  const orderContent = fs.readFileSync(path.join(__dirname, '../scan-reports/ORDER.md'), 'utf8');
  const lines = orderContent.split('\n').filter(l => l.startsWith('|') && !l.includes('Index') && !l.includes('---'));

  console.log(`Sampling baseline fingerprints for ${lines.length} tools...`);
  
  let md = '# UI Fingerprint Baseline\n\n';
  md += '| Index | Slug | Inputs | Buttons | Textareas | Selects | Canvases | Fingerprint Hash |\n';
  md += '|---|---|---|---|---|---|---|---|\n';

  // Sample tools
  let sampleCount = Math.min(lines.length, 100); // Baseline sample first 100 tools live
  for (let i = 0; i < sampleCount; i++) {
    const parts = lines[i].split('|').map(s => s.trim()).filter(Boolean);
    const index = parts[0];
    const slug = parts[2];
    
    try {
      await page.goto(`http://localhost:3000/public-media-tool/tool/${slug}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const metrics = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input').length;
        const buttons = document.querySelectorAll('button').length;
        const textareas = document.querySelectorAll('textarea').length;
        const selects = document.querySelectorAll('select').length;
        const canvases = document.querySelectorAll('canvas').length;
        return { inputs, buttons, textareas, selects, canvases };
      });

      const hash = `in:${metrics.inputs}_btn:${metrics.buttons}_txt:${metrics.textareas}_sel:${metrics.selects}_cvs:${metrics.canvases}`;
      md += `| ${index} | ${slug} | ${metrics.inputs} | ${metrics.buttons} | ${metrics.textareas} | ${metrics.selects} | ${metrics.canvases} | ${hash} |\n`;
      if ((i + 1) % 25 === 0) {
        console.log(`Measured ${i + 1}/${sampleCount} tools...`);
      }
    } catch (e) {
      console.error(`Error measuring ${slug}:`, e.message);
      md += `| ${index} | ${slug} | ERROR | ERROR | ERROR | ERROR | ERROR | error |\n`;
    }
  }

  await browser.close();

  const outPath = path.join(__dirname, '../scan-reports/05_UI_FINGERPRINT_BASELINE.md');
  fs.writeFileSync(outPath, md);
  console.log('UI Fingerprint baseline recorded at', outPath);
}

run().catch(err => {
  console.error('Fatal in measure-fingerprints:', err);
  process.exit(1);
});
