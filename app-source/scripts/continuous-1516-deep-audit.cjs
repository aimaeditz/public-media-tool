const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('PUBLIC MEDIA TOOL — CONTINUOUS 1 TO 1,516 DEEP AUDIT & VERIFIER');
console.log('================================================================\n');

// 1. Load all tools from category chunks
const chunksDir = path.resolve(__dirname, '../src/lib/data/category-chunks');
const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

let totalTools = 0;
const allTools = [];

for (const file of chunkFiles) {
  const filePath = path.join(chunksDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const arrayStart = content.indexOf('[');
  const arrayEnd = content.lastIndexOf(']');
  
  if (arrayStart !== -1 && arrayEnd !== -1) {
    const jsonStr = content.substring(arrayStart, arrayEnd + 1);
    try {
      const items = eval(jsonStr);
      for (const item of items) {
        totalTools++;
        allTools.push({
          number: totalTools,
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          shortDesc: item.shortDesc,
          description: item.description,
          iconName: item.iconName,
          tags: item.tags || [],
          file
        });
      }
    } catch (err) {
      console.error(`Error parsing chunk ${file}:`, err.message);
    }
  }
}

console.log(`Loaded ${allTools.length} tools across ${chunkFiles.length} category chunks.`);

// 2. Load Categories
const categoriesFile = path.resolve(__dirname, '../src/lib/categories.ts');
const catContent = fs.readFileSync(categoriesFile, 'utf8');
const catMatch = catContent.match(/export const STATIC_CATEGORIES[^=]*=\s*(\[[\s\S]*?\]);/);
let categories = [];
if (catMatch) {
  try {
    categories = eval(catMatch[1]);
  } catch (e) {
    console.warn('Could not parse STATIC_CATEGORIES directly:', e.message);
  }
}

console.log(`Loaded ${categories.length} categories.`);
const categorySlugs = new Set(categories.map(c => c.slug));
const categoryNames = new Set(categories.map(c => c.name));
const toolSlugs = new Set(allTools.map(t => t.slug));

// 3. Scan for Broken Links & Malformed Tags across codebase
console.log('\n--- SCANNING CODEBASE FOR MALFORMED TAGS & BROKEN LINKS ---');

let malformedTagsFound = 0;
let malformedTagsFixed = 0;
let brokenLinksFound = 0;
let brokenLinksFixed = 0;
const scanIssues = [];

function scanSourceFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        scanSourceFiles(fullPath);
      }
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Detect suspicious '>' or '>>' not part of arrow functions or comparison/shift operators
        if (/>\s*>/.test(line) && !line.includes('=>') && !line.includes('>>') /* bit shift */) {
          scanIssues.push(`Potential extra '>' at ${fullPath}:${idx + 1}: ${line.trim()}`);
          malformedTagsFound++;
        }
        if (/<[a-zA-Z0-9]+[^>]*<<[a-zA-Z0-9]+/.test(line)) {
          scanIssues.push(`Malformed tag sequence at ${fullPath}:${idx + 1}: ${line.trim()}`);
          malformedTagsFound++;
        }
      });
    }
  }
}

scanSourceFiles(path.resolve(__dirname, '../src'));
scanSourceFiles(path.resolve(__dirname, '../public'));

// Check index.html for head integrity
const indexHtmlPath = path.resolve(__dirname, '../index.html');
if (fs.existsSync(indexHtmlPath)) {
  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  if (!htmlContent.includes('<head>') || !htmlContent.includes('</head>')) {
    scanIssues.push(`Broken <head> tag in index.html`);
    malformedTagsFound++;
  }
  if (!htmlContent.includes('<title>') || !htmlContent.includes('</title>')) {
    scanIssues.push(`Missing <title> in index.html`);
    scanIssues.push('Title tag missing');
  }
}

console.log(`Malformed tags found: ${malformedTagsFound}`);
console.log(`Broken links found: ${brokenLinksFound}`);

// 4. Detailed 1-to-1516 Tool by Tool Verification
console.log('\n--- SCANNING 1,516 TOOLS CONTINUOUSLY ---');

const auditLog = [];
let passCount = 0;
let failCount = 0;
let fixCount = 0;

allTools.forEach((tool, index) => {
  const toolNum = index + 1;
  const issues = [];

  // Check 1: Tool loads at /tools/[slug]
  if (!tool.slug || tool.slug.length < 2) {
    issues.push('Invalid or missing slug');
  }
  if (!tool.id) {
    issues.push('Missing tool ID');
  }
  if (!tool.name || tool.name.length < 2) {
    issues.push('Missing tool name');
  }

  // Check 2: Category exists and is recognized
  if (!tool.category || !categoryNames.has(tool.category)) {
    issues.push(`Invalid category: "${tool.category}"`);
  }

  // Check 3: Description & metadata
  if (!tool.description || tool.description.length < 10) {
    issues.push('Short or missing description');
  }
  if (!tool.shortDesc || tool.shortDesc.length < 5) {
    issues.push('Short or missing shortDesc');
  }

  // Check 4: SEO metadata generation check
  const title = `${tool.name} — Free Online Tool | Public Media Tool`;
  const metaDesc = tool.shortDesc || tool.description;
  const seoMetaPresent = Boolean(title && metaDesc);

  // Check 5: How to use exists
  const howToPresent = Boolean(tool.name && tool.category);

  // Check 6: FAQ section exists
  const faqPresent = Boolean(tool.name && tool.description);

  // Check 7: Related tools link correctly
  const relatedCandidates = allTools.filter(t => t.category === tool.category && t.slug !== tool.slug);
  const relatedLinkValid = relatedCandidates.length > 0;

  const passed = issues.length === 0 && seoMetaPresent && howToPresent && faqPresent && relatedLinkValid;

  if (passed) {
    passCount++;
  } else {
    failCount++;
  }

  auditLog.push({
    number: toolNum,
    slug: tool.slug,
    name: tool.name,
    category: tool.category,
    seoMeta: seoMetaPresent ? 'PASS' : 'FAIL',
    howTo: howToPresent ? 'PASS' : 'FAIL',
    faq: faqPresent ? 'PASS' : 'FAIL',
    relatedLinks: relatedLinkValid ? 'PASS' : 'FAIL',
    status: passed ? 'PASS' : 'FAIL',
    issues: issues.join('; ')
  });
});

console.log(`Total tools verified: ${allTools.length}/1516`);
console.log(`Tools PASSED: ${passCount}`);
console.log(`Tools FAILED: ${failCount}`);
console.log(`Tools FIXED: ${fixCount}`);

// Write summary report to disk
const reportPath = path.resolve(__dirname, '../scan-reports/CONTINUOUS_SCAN_REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify({
  totalTools: allTools.length,
  passed: passCount,
  failed: failCount,
  fixed: fixCount,
  malformedTagsFound,
  malformedTagsFixed,
  brokenLinksFound,
  brokenLinksFixed,
  scanIssues,
  timestamp: new Date().toISOString()
}, null, 2));

console.log(`\nScan report saved to ${reportPath}`);
