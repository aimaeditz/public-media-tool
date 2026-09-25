const fs = require('fs');
const path = require('path');

// Active canonical base URL for custom domain
const BASE_URL = 'https://publicmediatool.com';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const todayDate = new Date().toISOString().split('T')[0];

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

// 2. Read tools across category chunks to ensure 100% coverage of all 1,516 tools
let tools = [];
const chunksDir = path.join(__dirname, '../src/lib/data/category-chunks');
try {
  const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const filePath = path.join(chunksDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStart = content.indexOf('[');
    const arrayEnd = content.lastIndexOf(']');
    if (arrayStart !== -1 && arrayEnd !== -1) {
      const jsonStr = content.substring(arrayStart, arrayEnd + 1);
      try {
        const items = eval(jsonStr);
        for (const item of items) {
          if (item && item.slug) {
            tools.push(item);
          }
        }
      } catch (e) {}
    }
  }
} catch (err) {
  console.error('[generate-sitemap] Error reading category chunks:', err);
}

// Fallback to search index if needed
if (tools.length === 0) {
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
}

// 3. Read programmatic long-tail pages from src/lib/long-tail-data.ts
let longTailPaths = [];
try {
  const ltPath = path.resolve(__dirname, '../src/lib/long-tail-data.ts');
  const ltContent = fs.readFileSync(ltPath, 'utf8');
  const matches = ltContent.match(/path:\s*'([^']+)'/g);
  if (matches) {
    longTailPaths = matches.map(m => m.replace(/path:\s*'/, '').replace(/'$/, ''));
  }
} catch (err) {
  console.error('[generate-sitemap] Error reading long tail pages:', err);
}

console.log(`[generate-sitemap] Loaded ${categories.length} categories, ${tools.length} tools, and ${longTailPaths.length} long-tail routes for sitemap.`);

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

function addUrl(loc, changefreq, priority, lastmod = todayDate) {
  if (seenLocs.has(loc)) return;
  seenLocs.add(loc);
  urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>${changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : ''}${priority !== undefined ? `\n    <priority>${priority.toFixed(1)}</priority>` : ''}
  </url>`);
}

// Homepage
addUrl(`${BASE_URL}/`, 'daily', 1.0);

// Core pages
addUrl(`${BASE_URL}/tools`, 'daily', 0.9);
addUrl(`${BASE_URL}/categories`, 'weekly', 0.9);

// Category pages
const seenCatSlugs = new Set();
for (const cat of categories) {
  if (cat.slug && !seenCatSlugs.has(cat.slug)) {
    seenCatSlugs.add(cat.slug);
    addUrl(`${BASE_URL}/categories/${cat.slug}`, 'weekly', 0.8);
  }
}

// Tool pages (All 1,516 Tools)
const seenToolSlugs = new Set();
for (const tool of tools) {
  if (tool.slug && !seenToolSlugs.has(tool.slug)) {
    seenToolSlugs.add(tool.slug);
    addUrl(`${BASE_URL}/tools/${tool.slug}`, 'weekly', 0.8);
  }
}

// Programmatic Long-Tail Pages
for (const ltPath of longTailPaths) {
  const fullUrl = ltPath.startsWith('/') ? `${BASE_URL}${ltPath}` : `${BASE_URL}/${ltPath}`;
  addUrl(fullUrl, 'weekly', 0.8);
}

// Static informational pages
const staticPages = ['about', 'contact', 'privacy-policy', 'terms', 'disclaimer', 'credits'];
for (const page of staticPages) {
  addUrl(`${BASE_URL}/${page}`, 'monthly', 0.5);
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
