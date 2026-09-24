const fs = require('fs');
const path = require('path');
const https = require('https');

const KEY = 'f13a52c928b143a4970e18c130f4e229';
// Legacy GitHub Pages host kept as fallback reference
const LEGACY_GITHUB_PAGES_HOST = 'aimaeditz.github.io';
const HOST = 'publicmediatool.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 500;

async function submitIndexNow() {
  try {
    console.log('[indexnow] Preparing IndexNow submission...');
    
    // Locate sitemap.xml
    const publicSitemap = path.resolve(__dirname, '../public/sitemap.xml');
    const distSitemap = path.resolve(__dirname, '../dist/sitemap.xml');
    const rootSitemap = path.resolve(__dirname, '../../sitemap.xml');
    
    let sitemapPath = '';
    if (fs.existsSync(publicSitemap)) sitemapPath = publicSitemap;
    else if (fs.existsSync(distSitemap)) sitemapPath = distSitemap;
    else if (fs.existsSync(rootSitemap)) sitemapPath = rootSitemap;

    if (!sitemapPath) {
      console.warn('[indexnow] Warning: sitemap.xml not found. Skipping IndexNow submission.');
      return;
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const matches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const urlList = matches.map(m => m.replace(/<\/?loc>/g, '').trim()).filter(Boolean);

    if (urlList.length === 0) {
      console.warn('[indexnow] Warning: No URLs found in sitemap.xml.');
      return;
    }

    console.log(`[indexnow] Found ${urlList.length} URLs to submit in batches of ${BATCH_SIZE}.`);

    // Split into batches
    for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
      const batch = urlList.slice(i, i + BATCH_SIZE);
      const payload = {
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch
      };

      await sendBatch(payload, Math.floor(i / BATCH_SIZE) + 1, Math.ceil(urlList.length / BATCH_SIZE));
    }

    console.log('[indexnow] IndexNow submission sequence completed successfully.');
  } catch (err) {
    console.warn('[indexnow] Non-blocking IndexNow notice:', err.message || err);
  }
}

function sendBatch(payload, batchNum, totalBatches) {
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
            console.log(`[indexnow] Batch ${batchNum}/${totalBatches} submitted successfully (HTTP ${res.statusCode}).`);
          } else {
            console.warn(`[indexnow] Batch ${batchNum}/${totalBatches} received status HTTP ${res.statusCode}: ${resData}`);
          }
          resolve();
        });
      });

      req.on('error', (err) => {
        console.warn(`[indexnow] Batch ${batchNum}/${totalBatches} request warning: ${err.message}`);
        resolve(); // Continue without throwing
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn(`[indexnow] Batch ${batchNum}/${totalBatches} request timed out.`);
        resolve(); // Continue without throwing
      });

      req.write(data);
      req.end();
    } catch (e) {
      console.warn(`[indexnow] Batch ${batchNum}/${totalBatches} exception: ${e.message}`);
      resolve(); // Non-blocking
    }
  });
}

submitIndexNow();
