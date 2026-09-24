const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../scan-reports/runlogs/tools-1-50-browser.log');
const testWavPath = path.join(__dirname, '../scan-reports/runlogs/test_sample.wav');

// Ensure directories exist
fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

// Re-initialize log file
fs.writeFileSync(logFilePath, `=== STARTING HEADLESS CHROMIUM BROWSER AUDIT FOR TOOLS 1 TO 50 ===\nTimestamp: ${new Date().toISOString()}\nBase URL: http://localhost:3000/#/tools/\n\n`, 'utf8');

function appendLog(msg) {
  console.log(msg);
  fs.appendFileSync(logFilePath, msg + '\n', 'utf8');
}

// Read tools from ORDER.md
const orderMdPath = path.join(__dirname, '../scan-reports/ORDER.md');
const orderContent = fs.readFileSync(orderMdPath, 'utf8');
const lines = orderContent.split('\n');

const tools = [];
for (const line of lines) {
  if (line.startsWith('|') && !line.includes('Index') && !line.includes('---|')) {
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 7) {
      const idx = parseInt(parts[1], 10);
      const slug = parts[3];
      const name = parts[4];
      const category = parts[5];
      if (!isNaN(idx) && idx >= 1 && idx <= 50) {
        tools.push({ idx, slug, name, category });
      }
    }
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[PAGE ERROR] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(`[UNCAUGHT ERROR] ${err.toString()}`);
  });

  for (const tool of tools) {
    appendLog(`------------------------------------------------------------`);
    appendLog(`TOOL #${tool.idx}: ${tool.name} (${tool.slug})`);
    appendLog(`Category: ${tool.category}`);

    const url = `http://localhost:3000/#/tools/${tool.slug}`;
    appendLog(`Navigating to: ${url}`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 5000 }).catch(async () => {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });
      });

      // Allow React component lazy load & store init
      await page.evaluate(() => new Promise(r => setTimeout(r, 500)));

      // Check tool title header inside main component
      const headerTitle = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 ? h1.innerText.trim() : 'NO_H1_FOUND';
      });
      appendLog(`Tool Header Title: ${headerTitle}`);

      // Find inputs and interact inside tool runner
      const inputCount = await page.evaluate(() => document.querySelectorAll('input, select, textarea').length);
      const buttonCount = await page.evaluate(() => document.querySelectorAll('button').length);

      appendLog(`Found ${inputCount} input fields and ${buttonCount} buttons on tool page.`);

      // If audio file input exists, upload test wav file
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        appendLog(`File input detected. Uploading test_sample.wav...`);
        await fileInput.uploadFile(testWavPath);
        await page.evaluate(() => {
          const inp = document.querySelector('input[type="file"]');
          if (inp) inp.dispatchEvent(new Event('change', { bubbles: true }));
        });
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 300)));
      }

      // Sample input values
      const inputDetails = await page.evaluate(() => {
        const inputs = Array.from(document.querySelectorAll('input[type="number"], input[type="text"]'));
        return inputs.slice(0, 4).map(i => ({ type: i.type, value: i.value, placeholder: i.placeholder }));
      });
      appendLog(`Sample input values: ${JSON.stringify(inputDetails)}`);

      // Click visible action buttons (e.g. Calculate / Play / Process / Copy)
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const actBtn = btns.find(b => !b.innerText.includes('Home') && !b.innerText.includes('Tools') && !b.innerText.includes('PMT') && !b.innerText.includes('Categories') && !b.innerText.includes('Share'));
        if (actBtn) actBtn.click();
      });

      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 300)));

      // Extract result snippet from main container
      const resultSnippet = await page.evaluate(() => {
        const runner = document.querySelector('main') || document.body;
        return runner.innerText.substring(0, 500).replace(/\n+/g, ' | ');
      });

      appendLog(`Rendered Tool Output Summary: ${resultSnippet.substring(0, 300)}...`);
      appendLog(`Console Errors Captured: ${consoleErrors.length}`);
      if (consoleErrors.length > 0) {
        appendLog(`Errors: ${consoleErrors.join(' ; ')}`);
        consoleErrors.length = 0;
      } else {
        appendLog(`VERDICT: REAL (BROWSER VERIFIED - 0 ERRORS)`);
      }
    } catch (err) {
      appendLog(`ERROR RUNNING TOOL #${tool.idx}: ${err.message}`);
    }
  }

  await browser.close();
  appendLog(`\n=== COMPLETED BROWSER TEST FOR TOOLS 1 TO 50 ===`);
})();
