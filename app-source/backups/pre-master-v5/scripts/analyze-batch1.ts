import { WORKING_TOOLS } from '../src/lib/tools-data/index';

const batch1 = WORKING_TOOLS.slice(0, 500);

console.log(`Total tools in Batch 1: ${batch1.length}`);

// Let's inspect categories in Batch 1
const catMap: Record<string, number> = {};
batch1.forEach(t => {
  catMap[t.category] = (catMap[t.category] || 0) + 1;
});
console.log('Categories in Batch 1:', JSON.stringify(catMap, null, 2));

// Check slugs and mapping
let specificSwitches = 0;
let pdfRunner = 0;
let textRunner = 0;
let imageRunner = 0;
let devRunner = 0;
let calcRunner = 0;
let colorRunner = 0;
let securityRunner = 0;
let mediaRunner = 0;
let mathFinanceRunner = 0;
let industryRunner = 0;
let fallbackUniversal = 0;

const specificSlugs = new Set([
  'word-counter', 'case-converter', 'lorem-ipsum-generator', 'image-resizer',
  'image-format-converter', 'color-picker-from-image', 'json-formatter-validator',
  'base64-encoder-decoder', 'uuid-generator', 'color-contrast-checker',
  'hex-rgb-hsl-converter', 'css-gradient-generator', 'meta-tag-generator',
  'keyword-density-analyzer', 'unit-converter', 'discount-tax-calculator',
  'password-generator', 'hash-generator', 'url-encoder-decoder', 'qr-code-generator',
  'markdown-editor-previewer', 'pdf-page-inspector', 'pdf-splitter', 'pdf-to-text',
  'pdf-image-extractor', 'pdf-merger', 'pdf-compressor'
]);

const unhandledInBatch1: Array<{ index: number; slug: string; name: string; category: string }> = [];

batch1.forEach((tool, idx) => {
  if (specificSlugs.has(tool.slug)) {
    specificSwitches++;
  } else if (
    tool.category === 'PDF Tools' ||
    tool.category === 'PDF Inspection & Analysis' ||
    tool.category === 'PDF Document Utilities' ||
    tool.slug.includes('pdf') ||
    tool.name.toLowerCase().includes('pdf')
  ) {
    pdfRunner++;
  } else if (
    tool.category === 'Text Tools' ||
    tool.category === 'Text Formatting' ||
    tool.category === 'Text Analysis' ||
    tool.category === 'Text Generators & Encoding'
  ) {
    textRunner++;
  } else if (
    tool.category === 'Image Tools' ||
    tool.category === 'Image Resizing & Cropping' ||
    tool.category === 'Image Optimization & Conversion' ||
    tool.category === 'Photo Filters & Effects'
  ) {
    imageRunner++;
  } else if (
    tool.category === 'Developer Tools' ||
    tool.category === 'Code Formatters' ||
    tool.category === 'Web & API Utilities' ||
    tool.category === 'Data & Schema Tools'
  ) {
    devRunner++;
  } else if (
    tool.category === 'Calculator Tools' ||
    tool.category === 'Converter Tools' ||
    tool.category === 'Financial Calculators' ||
    tool.category === 'Everyday Calculators' ||
    tool.category === 'Math Calculators' ||
    tool.category === 'Measurement Converters' ||
    tool.category === 'Scientific Converters'
  ) {
    calcRunner++;
  } else if (
    tool.category === 'Color Tools' ||
    tool.category === 'Color Palettes & Contrast' ||
    tool.category === 'Color Converters & Gradients'
  ) {
    colorRunner++;
  } else if (
    tool.category === 'Security Tools' ||
    tool.category === 'Cryptography & Hashing' ||
    tool.category === 'Password & Security Tools'
  ) {
    securityRunner++;
  } else if (
    tool.category === 'SEO Tools' ||
    tool.category === 'SERP & Search Optimization' ||
    tool.category === 'Meta Tags & Structured Data' ||
    tool.category === 'Content & Keyword SEO' ||
    tool.category === 'Social Media Tools' ||
    tool.category === 'Video Tools' ||
    tool.category === 'Audio Tools' ||
    tool.category === 'Audio & Music Production' ||
    tool.category === 'Web Tools' ||
    tool.category === 'File Tools' ||
    tool.category === 'Marketing & Creator Tools'
  ) {
    mediaRunner++;
  } else if (
    tool.category === 'Math Tools' ||
    tool.category === 'Finance Tools' ||
    tool.category === 'Business Tools' ||
    tool.category === 'Date & Time' ||
    tool.category === 'Health & Fitness' ||
    tool.category === 'Productivity' ||
    tool.category === 'Education' ||
    tool.category === 'Generators' ||
    tool.category === 'Unit Converters' ||
    tool.category === 'Automotive'
  ) {
    mathFinanceRunner++;
  } else if (
    tool.category === 'Accounting' ||
    tool.category === 'HR & Payroll' ||
    tool.category === 'Freelancing' ||
    tool.category === 'Real Estate' ||
    tool.category === 'Legal Tools' ||
    tool.category === 'Legal & Public Services' ||
    tool.category === 'E-commerce' ||
    tool.category === 'Inventory & Logistics' ||
    tool.category === 'Restaurant & Cafe' ||
    tool.category === 'Dining & Food Service' ||
    tool.category === 'Events & Lifestyle' ||
    tool.category === 'Engineering' ||
    tool.category === 'Engineering Tools' ||
    tool.category === 'Construction' ||
    tool.category === 'Construction Tools' ||
    tool.category === 'Electrical & Solar' ||
    tool.category === 'Agriculture' ||
    tool.category === 'Agriculture & Environment' ||
    tool.category === 'Environment & Energy' ||
    tool.category === 'Marketing & Advertising' ||
    tool.category === 'YouTube Creator Tools' ||
    tool.category === 'Travel Tools' ||
    tool.category === 'Beauty & Salon' ||
    tool.category === 'Wedding & Event' ||
    tool.category === 'Photography' ||
    tool.category === 'Music Production' ||
    tool.category === 'Pets & Animals' ||
    tool.category === 'Government & Public Services' ||
    tool.category === 'Office Administration' ||
    tool.category === 'Office & Project Management' ||
    tool.category === 'Networking' ||
    tool.category === 'Networking & Data Management' ||
    tool.category === 'Data Management' ||
    tool.category === 'Project Management'
  ) {
    industryRunner++;
  } else {
    fallbackUniversal++;
    unhandledInBatch1.push({ index: idx + 1, slug: tool.slug, name: tool.name, category: tool.category });
  }
});

console.log({
  specificSwitches,
  pdfRunner,
  textRunner,
  imageRunner,
  devRunner,
  calcRunner,
  colorRunner,
  securityRunner,
  mediaRunner,
  mathFinanceRunner,
  industryRunner,
  fallbackUniversal
});

if (unhandledInBatch1.length > 0) {
  console.log('Unhandled in Batch 1:', unhandledInBatch1);
}
