const fs = require('fs');
const path = require('path');

const chunkFiles = [
  'text-formatting.ts',
  'text-analysis.ts',
  'text-encoding.ts',
  'code-formatters.ts',
  'web-api-tools.ts',
  'data-schema-tools.ts',
  'image-resizing.ts',
  'image-conversion.ts',
  'photo-filters.ts',
  'financial-calculators.ts',
  'everyday-calculators.ts',
  'math-calculators.ts',
  'serp-seo-tools.ts',
  'meta-structured-data.ts',
  'content-seo-tools.ts',
  'measurement-converters.ts',
  'scientific-converters.ts',
  'color-palettes.ts',
  'color-converters.ts',
  'pdf-inspection.ts',
  'pdf-document-tools.ts',
  'cryptography-hashing.ts',
  'passwords-security.ts',
  'finance-tools.ts',
  'math-tools.ts',
  'generators.ts',
  'productivity.ts',
  'business-tools.ts',
  'web-tools.ts',
  'audio-production.ts',
  'health-fitness.ts',
  'file-tools.ts',
  'education.ts',
  'date-time.ts',
  'unit-converters.ts',
  'automotive.ts',
  'travel-tools.ts',
  'real-estate.ts',
  'hr-payroll.ts',
  'accounting.ts',
  'e-commerce.ts',
  'inventory-logistics.ts',
  'engineering-tools.ts',
  'construction-tools.ts',
  'electrical-solar.ts',
  'dining-hospitality.ts',
  'events-lifestyle.ts',
  'nature-environment.ts',
  'legal-civic-tools.ts',
  'networking-data.ts',
  'workplace-productivity.ts',
  'marketing-creator-tools.ts'
];

let allTools = [];
for (const file of chunkFiles) {
  const filePath = path.join(__dirname, '../src/lib/data/category-chunks', file);
  const content = fs.readFileSync(filePath, 'utf8');
  const eqIdx = content.indexOf('=');
  const startIdx = content.indexOf('[', eqIdx);
  const endIdx = content.lastIndexOf(']');
  if (startIdx === -1 || endIdx === -1) {
    console.error('Failed to parse chunk:', file);
    continue;
  }
  const jsonStr = content.slice(startIdx, endIdx + 1);
  try {
    const tools = JSON.parse(jsonStr);
    allTools.push(...tools);
  } catch (e) {
    console.error('JSON parse error in', file, e.message);
  }
}

console.log('Parsed tools count:', allTools.length);

function getRunner(tool) {
  const directTools = [
    'word-counter', 'case-converter', 'lorem-ipsum-generator', 'image-resizer',
    'image-format-converter', 'color-picker-from-image', 'json-formatter-validator',
    'base64-encoder-decoder', 'uuid-generator', 'color-contrast-checker',
    'hex-rgb-hsl-converter', 'css-gradient-generator', 'meta-tag-generator',
    'keyword-density-analyzer', 'unit-converter', 'discount-tax-calculator',
    'password-generator', 'hash-generator', 'url-encoder-decoder',
    'qr-code-generator', 'markdown-editor-previewer'
  ];
  if (directTools.includes(tool.slug)) {
    return 'ToolRunner (Direct Built-in)';
  }

  const pdfSlugs = ['pdf-page-inspector', 'pdf-splitter', 'pdf-to-text', 'pdf-image-extractor', 'pdf-merger', 'pdf-compressor'];
  if (pdfSlugs.includes(tool.slug)) {
    return 'ComprehensivePdfToolsRunner';
  }

  const cat = tool.category;
  const slug = tool.slug.toLowerCase();
  const name = tool.name.toLowerCase();

  if (
    cat === 'PDF Tools' ||
    cat === 'PDF Inspection & Analysis' ||
    cat === 'PDF Document Utilities' ||
    slug.includes('pdf') ||
    name.includes('pdf')
  ) {
    return 'ComprehensivePdfToolsRunner';
  }
  if (
    cat === 'Text Tools' ||
    cat === 'Text Formatting' ||
    cat === 'Text Analysis' ||
    cat === 'Text Generators & Encoding'
  ) {
    return 'Batch1TextToolsRunner';
  }
  if (
    cat === 'Image Tools' ||
    cat === 'Image Resizing & Cropping' ||
    cat === 'Image Optimization & Conversion' ||
    cat === 'Photo Filters & Effects'
  ) {
    return 'ComprehensiveImageToolsRunner';
  }
  if (
    cat === 'Developer Tools' ||
    cat === 'Code Formatters' ||
    cat === 'Web & API Utilities' ||
    cat === 'Data & Schema Tools'
  ) {
    return 'ComprehensiveDevToolsRunner';
  }
  if (
    cat === 'Calculator Tools' ||
    cat === 'Converter Tools' ||
    cat === 'Financial Calculators' ||
    cat === 'Everyday Calculators' ||
    cat === 'Math Calculators' ||
    cat === 'Measurement Converters' ||
    cat === 'Scientific Converters'
  ) {
    return 'ComprehensiveCalculatorToolsRunner';
  }
  if (
    cat === 'Color Tools' ||
    cat === 'Color Palettes & Contrast' ||
    cat === 'Color Converters & Gradients'
  ) {
    return 'ComprehensiveColorToolsRunner';
  }
  if (
    cat === 'Security Tools' ||
    cat === 'Cryptography & Hashing' ||
    cat === 'Password & Security Tools'
  ) {
    return 'ComprehensiveSecurityToolsRunner';
  }
  if (
    cat === 'SEO Tools' ||
    cat === 'SERP & Search Optimization' ||
    cat === 'Meta Tags & Structured Data' ||
    cat === 'Content & Keyword SEO' ||
    cat === 'Social Media Tools' ||
    cat === 'Video Tools' ||
    cat === 'Audio Tools' ||
    cat === 'Audio & Music Production' ||
    cat === 'Web Tools' ||
    cat === 'File Tools' ||
    cat === 'Marketing & Creator Tools'
  ) {
    return 'ComprehensiveMediaWebToolsRunner';
  }
  if (
    cat === 'Math Tools' ||
    cat === 'Finance Tools' ||
    cat === 'Business Tools' ||
    cat === 'Date & Time' ||
    cat === 'Health & Fitness' ||
    cat === 'Productivity' ||
    cat === 'Education' ||
    cat === 'Generators' ||
    cat === 'Unit Converters' ||
    cat === 'Automotive'
  ) {
    return 'ComprehensiveMathFinanceToolsRunner';
  }
  return 'ComprehensiveIndustryToolsRunner';
}

let md = '# Master Tool Order (1 to 1516)\n\n';
md += '| Index | ID | Slug | Name | Category | Runner |\n';
md += '|---|---|---|---|---|---|\n';

allTools.forEach((t, i) => {
  const runner = getRunner(t);
  const cleanName = t.name.replace(/\|/g, '-');
  md += `| ${i + 1} | ${t.id} | ${t.slug} | ${cleanName} | ${t.category} | ${runner} |\n`;
});

const outPath = path.join(__dirname, '../scan-reports/ORDER.md');
fs.writeFileSync(outPath, md);
console.log('ORDER.md written successfully with', allTools.length, 'tools at', outPath);
