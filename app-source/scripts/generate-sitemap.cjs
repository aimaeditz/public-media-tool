const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://aimaeditz.github.io/public-media-tool';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// 1. Read categories from src/lib/categories.ts
let categories = [];
try {
  const catPath = path.resolve(__dirname, '../src/lib/categories.ts');
  const catContent = fs.readFileSync(catPath, 'utf8');
  const startMarker = 'export const STATIC_CATEGORIES';
  const startIdx = catContent.indexOf(startMarker);
  if (startIdx !== -1) {
    const equalsIdx = catContent.indexOf('=', startIdx);
    const arrayStart = catContent.indexOf('[', equalsIdx);
    const arrayEnd = catContent.indexOf('];', arrayStart);
    if (arrayStart !== -1 && arrayEnd !== -1) {
      categories = JSON.parse(catContent.slice(arrayStart, arrayEnd + 1));
    }
  }
} catch (err) {
  console.error('[generate-sitemap] Error reading categories:', err);
}

// 2. Read search items / tools from src/lib/search-index.ts
let tools = [];
try {
  const indexPath = path.resolve(__dirname, '../src/lib/search-index.ts');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const startMarker = 'export const SEARCH_INDEX';
  const startIdx = indexContent.indexOf(startMarker);
  if (startIdx !== -1) {
    const equalsIdx = indexContent.indexOf('=', startIdx);
    const arrayStart = indexContent.indexOf('[', equalsIdx);
    const arrayEnd = indexContent.lastIndexOf('];');
    if (arrayStart !== -1 && arrayEnd !== -1) {
      tools = JSON.parse(indexContent.slice(arrayStart, arrayEnd + 1));
    }
  }
} catch (err) {
  console.error('[generate-sitemap] Error reading search index:', err);
}

console.log(`[generate-sitemap] Found ${categories.length} categories and ${tools.length} tools.`);

// Escape XML special characters
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

const urlEntries = [];
const seenLocs = new Set();

function addUrl(loc, changefreq, priority) {
  if (seenLocs.has(loc)) return;
  seenLocs.add(loc);
  urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>${changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : ''}${priority !== undefined ? `\n    <priority>${priority.toFixed(1)}</priority>` : ''}
  </url>`);
}

// Homepage
addUrl(`${BASE_URL}/`, 'weekly', 1.0);

// Core pages
addUrl(`${BASE_URL}/tools`, 'weekly', 0.8);
addUrl(`${BASE_URL}/categories`, 'weekly', 0.8);

// Category pages
const seenCatSlugs = new Set();
for (const cat of categories) {
  if (cat.slug && !seenCatSlugs.has(cat.slug)) {
    seenCatSlugs.add(cat.slug);
    addUrl(`${BASE_URL}/categories/${cat.slug}`, 'weekly', 0.7);
  }
}

// Tool pages
const seenToolSlugs = new Set();
for (const tool of tools) {
  if (tool.slug && !seenToolSlugs.has(tool.slug)) {
    seenToolSlugs.add(tool.slug);
    addUrl(`${BASE_URL}/tools/${tool.slug}`, 'monthly', 0.6);
  }
}

// Static pages
const staticPages = ['about', 'contact', 'privacy-policy', 'terms', 'disclaimer', 'credits'];
for (const page of staticPages) {
  addUrl(`${BASE_URL}/${page}`, 'monthly', 0.3);
}

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;

const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`[generate-sitemap] Generated sitemap.xml with ${seenLocs.size} total URLs at ${sitemapPath}`);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml
`;

const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`[generate-sitemap] Generated robots.txt at ${robotsPath}`);
