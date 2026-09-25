const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SITEMAP_URL = 'https://publicmediatool.com/sitemap.xml';
const HOST = 'publicmediatool.com';
const KEY = 'f13a52c928b143a4970e18c130f4e229';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 500;

function fetchUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, data, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
    });
    req.on('error', (err) => {
      resolve({ status: 0, error: err.message, ok: false });
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'Timeout', ok: false });
    });
  });
}

function sendIndexNowBatch(payload, batchNum, totalBatches) {
  return new Promise((resolve) => {
    try {
      const data = JSON.stringify(payload);
      const url = new URL(INDEXNOW_ENDPOINT);

      const req = https.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(data)
        },
        timeout: 10000
      }, (res) => {
        let resData = '';
        res.on('data', chunk => { resData += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`[IndexNow] Batch ${batchNum}/${totalBatches} (${payload.urlList.length} URLs) submitted successfully (HTTP ${res.statusCode}).`);
            resolve({ ok: true, status: res.statusCode });
          } else {
            console.warn(`[IndexNow] Batch ${batchNum}/${totalBatches} received HTTP ${res.statusCode}: ${resData}`);
            resolve({ ok: false, status: res.statusCode });
          }
        });
      });

      req.on('error', (err) => {
        console.warn(`[IndexNow] Batch ${batchNum}/${totalBatches} error: ${err.message}`);
        resolve({ ok: false, error: err.message });
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn(`[IndexNow] Batch ${batchNum}/${totalBatches} request timed out.`);
        resolve({ ok: false, error: 'Timeout' });
      });

      req.write(data);
      req.end();
    } catch (e) {
      console.warn(`[IndexNow] Batch ${batchNum}/${totalBatches} exception: ${e.message}`);
      resolve({ ok: false, error: e.message });
    }
  });
}

async function autoSubmit() {
  console.log('====================================================');
  console.log('Auto-SEO & Indexing Submission Engine for PMT');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log('====================================================');

  // 1. Read sitemap.xml
  const sitemapCandidates = [
    path.resolve(__dirname, '../sitemap.xml'),
    path.resolve(__dirname, '../public/sitemap.xml'),
    path.resolve(__dirname, '../app-source/public/sitemap.xml'),
    path.resolve(__dirname, '../dist/sitemap.xml')
  ];

  let sitemapPath = sitemapCandidates.find(p => fs.existsSync(p));
  let urlList = [];

  if (sitemapPath) {
    console.log(`[Sitemap] Reading sitemap from: ${sitemapPath}`);
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    urlList = matches.map(m => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);
    console.log(`[Sitemap] Found ${urlList.length} URLs in sitemap.`);
  } else {
    console.warn('[Sitemap] Warning: sitemap.xml not found on disk.');
  }

  // 2. Ping Search Engines with sitemap URL
  console.log('\n--- Pinging Search Engines with Sitemap URL ---');
  
  const pingTargets = [
    { name: 'Google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
    { name: 'Bing', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
    { name: 'Yandex', url: `https://yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` }
  ];

  for (const target of pingTargets) {
    console.log(`Pinging ${target.name}: ${target.url}...`);
    const res = await fetchUrl(target.url);
    if (res.ok) {
      console.log(`✓ ${target.name} ping succeeded (HTTP ${res.status})`);
    } else {
      console.log(`! ${target.name} ping status: HTTP ${res.status}${res.error ? ` (${res.error})` : ''}`);
    }
  }

  // 3. Submit all URLs to IndexNow
  console.log('\n--- Submitting URLs to IndexNow ---');
  if (urlList.length > 0) {
    const totalBatches = Math.ceil(urlList.length / BATCH_SIZE);
    console.log(`Submitting ${urlList.length} URLs in ${totalBatches} batch(es)...`);

    for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
      const batch = urlList.slice(i, i + BATCH_SIZE);
      const payload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch
      };
      await sendIndexNowBatch(payload, Math.floor(i / BATCH_SIZE) + 1, totalBatches);
    }
  } else {
    console.warn('Skipping IndexNow submission as no URLs were extracted.');
  }

  console.log('\n====================================================');
  console.log('Auto-SEO submission process finished.');
  console.log('====================================================');
}

autoSubmit().catch(err => {
  console.error('Fatal Auto-SEO submit error:', err);
});
