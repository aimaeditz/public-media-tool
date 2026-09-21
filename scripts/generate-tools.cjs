const fs = require('fs');
const path = require('path');

// Target category distribution for Batch 2 totaling EXACTLY 5,000 tools:
const TARGETS = [
  { category: 'SEO Tools', count: 330, defaultIcon: 'Search' },
  { category: 'Social Media Tools', count: 330, defaultIcon: 'Share2' },
  { category: 'Video Tools', count: 220, defaultIcon: 'Video' },
  { category: 'Audio Tools', count: 220, defaultIcon: 'Music' },
  { category: 'File Tools', count: 330, defaultIcon: 'FolderArchive' },
  { category: 'Web Tools', count: 330, defaultIcon: 'Globe' },
  { category: 'Generators', count: 400, defaultIcon: 'Sparkles' },
  { category: 'Math Tools', count: 400, defaultIcon: 'Calculator' },
  { category: 'Date & Time', count: 220, defaultIcon: 'Clock' },
  { category: 'Productivity', count: 400, defaultIcon: 'CheckSquare' },
  { category: 'Finance Tools', count: 500, defaultIcon: 'DollarSign' },
  { category: 'Business Tools', count: 330, defaultIcon: 'Briefcase' },
  { category: 'Health & Fitness', count: 220, defaultIcon: 'Activity' },
  { category: 'Education', count: 330, defaultIcon: 'GraduationCap' },
  { category: 'Unit Converters', count: 340, defaultIcon: 'RefreshCw' },
];

// Scan existing files across data/ and data/generated/ to ensure strict auto-deduplication
const seenSlugs = new Set();
const seenNames = new Set();

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
    const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
    for (const match of slugMatches) {
      const slug = match.replace(/slug:\s*['"]/, '').replace(/['"]$/, '');
      seenSlugs.add(slug);
    }
    const nameMatches = content.match(/name:\s*['"]([^'"]+)['"]/g) || [];
    for (const match of nameMatches) {
      const name = match.replace(/name:\s*['"]/, '').replace(/['"]$/, '');
      seenNames.add(name.toLowerCase());
    }
  }
}

scanDirectory(path.join(__dirname, '../src/lib/data'));
scanDirectory(path.join(__dirname, '../src/lib/data/generated'));

console.log(`Initial database scan complete: ${seenSlugs.size} unique slugs loaded for auto-deduplication.`);

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TOPICS = {
  'SEO Tools': [
    'Meta Tag Generator', 'Meta Tag Analyzer', 'Title Tag Checker', 'Description Length Auditor',
    'Keyword Density Analyzer', 'Keyword Extractor', 'Keyword Suggestion Engine', 'SERP Preview Snippet',
    'OpenGraph Meta Generator', 'Twitter Card Generator', 'Schema Markup Generator', 'Schema Validator',
    'Robots.txt Generator', 'Robots.txt Tester', 'Sitemap XML Generator', 'Sitemap Validator',
    'Canonical Tag Checker', 'Redirect Chain Checker', 'HTTP Status Code Checker', 'Broken Link Auditor',
    'Backlink Inspector', 'Domain Authority Estimator', 'Page Authority Estimator', 'MozRank Calculator',
    'Alexa Rank Inspector', 'Google Index Checker', 'Bing Index Checker', 'Wayback Machine Lookup',
    'Whois Domain Lookup', 'DNS Records Inspector', 'IP Address Lookup', 'Reverse IP Auditor',
    'Server Info Inspector', 'SSL Certificate Validator', 'Security Headers Auditor', 'Page Speed Score Estimator',
    'Mobile Friendly Tester', 'Readability Score Calculator', 'Word Count SEO Analyzer', 'Heading Tag Auditor',
    'Image Alt Tag Checker', 'Internal Link Counter', 'External Link Counter', 'Anchor Text Analyzer',
    'Content Freshness Checker', 'Competitor Keyword Comparison', 'Rank Position Estimator', 'Traffic Potential Estimator',
    'SEO Audit Report Builder', 'Lighthouse Score Predictor'
  ],
  'Social Media Tools': [
    'Bio Generator', 'Instagram Bio Formatter', 'Twitter Bio Builder', 'LinkedIn Headline Generator',
    'TikTok Bio Creator', 'Caption Generator', 'Hashtag Recommendation Engine', 'Post Schedule Planner',
    'Post Size Inspector', 'Image Aspect Ratio Guide', 'Video Aspect Ratio Helper', 'Instagram Story Size Crop',
    'YouTube Thumbnail Inspector', 'Facebook Cover Cropper', 'Profile Picture Resizer', 'Banner Dimension Checker',
    'Ad Copy Generator', 'Engagement Rate Calculator', 'Follower Growth Estimator', 'Social Media Analytics Helper',
    'Content Calendar Grid', 'Best Time To Post Estimator', 'Emoji Picker for Posts', 'GIF Keyword Finder',
    'Meme Generator Prep', 'Quote Card Builder', 'Poll Question Generator', 'Quiz Question Builder',
    'Giveaway Picker Helper', 'Contest Entry Manager', 'UTM Link Builder', 'Social Link Shortener',
    'Social QR Code Generator', 'Social Share Button Builder'
  ],
  'Video Tools': [
    'Video Trimmer Prep', 'Video Cropper Helper', 'Video Resizer', 'Video Rotator',
    'Video Flipper', 'Video Compression Estimator', 'Video Format Converter', 'Video Merger Preview',
    'Video Splitter Prep', 'Video Speed Adjuster', 'Video Reverser Helper', 'Video Mute Helper',
    'Audio Extractor from Video', 'Video Audio Overlay', 'Subtitle Generator Helper', 'Caption Aligner',
    'Watermark Overlay Tool', 'Video Thumbnail Generator', 'Video to GIF Converter', 'Video Frame Extractor',
    'Screen Recorder Helper', 'Video to Image Sequence', 'Images to Video Slideshow', 'Video Metadata Inspector',
    'Video Side by Side Comparer', 'Video Filter Previewer', 'Video Stabilizer Inspector', 'Video Quality Enhancer',
    'Video to Text Transcript', 'Video Timeline Editor Prep'
  ],
  'Audio Tools': [
    'Audio Trimmer', 'Audio Cropper', 'Audio Merger', 'Audio Splitter',
    'Audio Compressor', 'Audio Format Converter', 'Audio Speed Changer', 'Audio Reverser',
    'Audio Muter', 'Voice Extractor Prep', 'Beat Overlay Helper', 'Fade In Fade Out Tool',
    'Audio Normalizer', 'Audio Volume Amplifier', 'Graphic Equalizer', 'Pitch Shifter',
    'Tempo Modifier', 'Voice Changer Helper', 'Noise Remover Filter', 'Audio Metadata Reader',
    'Audio Waveform Comparer', 'Audio Visualizer Canvas', 'Web Audio Recorder', 'Audio Player Preview',
    'Audio Bitrate Compressor', 'Text to Speech Synthesizer', 'Speech to Text Recognizer', 'Ringtone Maker',
    'Podcast Episode Editor Prep'
  ],
  'File Tools': [
    'Bulk File Renamer', 'File Copier Helper', 'File Mover Helper', 'File Shredder Prep',
    'ZIP File Archiver', 'File Compressor', 'ZIP Extractor Inspector', 'RAR File Inspector',
    '7Z File Inspector', 'TAR Archive Inspector', 'GZ Archive Inspector', 'BZ2 File Inspector',
    'File Chunk Splitter', 'File Merger Tool', 'File MD5 Hash Calculator', 'File SHA256 Checksum',
    'File Byte Comparer', 'File Diff Inspector', 'File Metadata Reader', 'File Format Converter',
    'File Hex Viewer', 'File Text Editor Prep', 'File Structure Analyzer', 'File Extension Finder',
    'File Duplicate Finder', 'File Organizer Sorter', 'File Encryptor Prep', 'File Decryptor Prep',
    'File Locker Inspector', 'File Magic Bytes Inspector'
  ],
  'Web Tools': [
    'URL Encoder', 'URL Decoder', 'URL Query Parser', 'URL Builder',
    'URL Shortener', 'URL Expander', 'URL Cleaner', 'URL Validator',
    'URL Slugifier', 'HTML Minifier', 'HTML Beautifier', 'HTML Validator',
    'HTML to Plain Text', 'CSS Minifier', 'CSS Beautifier', 'CSS Autoprefixer',
    'JS Minifier', 'JS Beautifier', 'JS Obfuscator', 'XML Minifier',
    'XML Beautifier', 'XML Validator', 'JSON Formatter', 'JSON Validator',
    'JSON to XML Converter', 'XML to JSON Converter', 'CSV to JSON Converter', 'JSON to CSV Converter',
    'YAML to JSON Converter', 'JSON to YAML Converter', 'Markdown to HTML Converter', 'HTML to Markdown Converter',
    'Text to HTML Converter', 'Meta Tag Generator', 'Favicon Generator', 'OpenGraph Image Preview',
    'Robots.txt Builder', 'Sitemap XML Builder', '.htaccess Generator', 'Redirect Rule Builder',
    'CNAME Generator', 'DNS Lookup Tool', 'IP Lookup Tool', 'Whois Lookup Tool',
    'HTTP Headers Inspector', 'User Agent String Parser', 'Screen Resolution Checker', 'Browser Info Inspector'
  ],
  'Generators': [
    'Password Generator', 'UUID v4 Generator', 'QR Code Generator', 'Barcode Generator',
    'Hash Generator', 'Lorem Ipsum Generator', 'Random Text Generator', 'Random Number Generator',
    'Random Name Generator', 'Random Email Generator', 'Random Address Generator', 'Random Phone Generator',
    'Random Date Generator', 'Random Color Generator', 'Random Image Generator', 'Random Username Generator',
    'Random Word Generator', 'Random Sentence Generator', 'Random Paragraph Generator', 'Random Quote Generator',
    'Random Joke Generator', 'Random Fact Generator', 'Random Emoji Generator', 'Random Avatar Generator',
    'Random Logo Text Generator', 'Random Favicon Generator', 'Random Gradient Generator', 'Random Palette Generator',
    'Random Font Pairing', 'Random Song Generator', 'Random Movie Selector', 'Random Book Picker',
    'Random Recipe Generator', 'Random Workout Routine', 'Random Meal Plan', 'Random Travel Itinerary',
    'Random Business Name', 'Random Domain Name Idea', 'Random Slogan Generator', 'Random Tagline Generator',
    'Random Bio Generator', 'Random Caption Generator', 'Random Hashtag Generator'
  ],
  'Math Tools': [
    'Arithmetic Calculator', 'Algebra Equation Solver', 'Geometry Area Calculator', 'Geometry Volume Calculator',
    'Trigonometry Sine Cosine Calculator', 'Calculus Derivative Calculator', 'Calculus Integral Calculator', 'Statistics Mean Median Mode',
    'Probability Events Calculator', 'Matrix Addition Multiplication', 'Vector Dot Cross Product', 'Complex Number Arithmetic',
    'Polynomial Solver', 'Linear Equation System', 'Quadratic Formula Solver', 'Logarithm Calculator',
    'Exponential Growth Calculator', 'Factorial Calculator', 'Fibonacci Sequence Generator', 'Prime Number Checker',
    'Greatest Common Divisor GCD', 'Least Common Multiple LCM', 'Percentage Calculator', 'Ratio Proportion Solver',
    'Standard Deviation Calculator', 'Variance Calculator', 'Correlation Coefficient', 'Linear Regression Model',
    'Polynomial Interpolation', 'Trend Extrapolation', 'Limit Calculator', 'Infinite Series Calculator',
    'Combinatorics nCr Calculator', 'Permutation nPr Calculator', 'Binomial Distribution Calculator', 'Normal Distribution Z-Score',
    'Poisson Distribution Calculator', 'Chi-Square Calculator', 'Student T-Test Calculator', 'Z-Test Calculator',
    'ANOVA Table Calculator', 'Confidence Interval Calculator', 'Sample Size Calculator', 'Margin of Error Calculator'
  ],
  'Date & Time': [
    'Date Difference Calculator', 'Age Calculator', 'Add Subtract Days Calculator', 'Time Zone Converter',
    'Time Unit Converter', 'Unix Timestamp Converter', 'Timestamp Generator', 'Week Number Calculator',
    'Day of Year Calculator', 'Moon Phase Calculator', 'Zodiac Sign Calculator', 'Perpetual Calendar',
    'Countdown Timer', 'Stopwatch Tool', 'Pomodoro Timer', 'Alarm Clock Helper',
    'Reminder Scheduler', 'Work Schedule Calculator', 'Date Format Converter', 'Time Format Converter',
    'Date String Parser', 'Date Comparator', 'Time Comparator', 'Date Sorter',
    'Date Range Calculator', 'Business Working Days Calculator', 'Working Hours Calculator', 'Sunrise Sunset Time Calculator'
  ],
  'Productivity': [
    'To-Do List Manager', 'Task Priority Matrix', 'Project Milestone Planner', 'Quick Note Pad',
    'Mind Map Node Editor', 'Flowchart Builder Prep', 'Diagram Maker Prep', 'Kanban Column Board',
    'Gantt Chart Previewer', 'Daily Calendar Planner', 'Weekly Schedule Builder', 'Task Reminder Helper',
    'Pomodoro Timer', 'Habit Tracker Table', 'Goal Tracking Sheet', 'Goal Setting Framework',
    'Daily Journal Scratchpad', 'Private Diary Pad', 'Daily Agenda Builder', 'Meeting Schedule Planner',
    'Email Template Generator', 'Email Signature Builder', 'Letter Template Builder', 'Resume CV Builder Prep',
    'Cover Letter Generator', 'Invoice Builder', 'Receipt Builder', 'Price Quotation Builder',
    'Cost Estimate Generator', 'Purchase Order Generator', 'Packing Slip Builder', 'Business Card Previewer',
    'Label Maker Prep', 'Badge Maker', 'Certificate Generator', 'Award Maker',
    'Event Invitation Generator', 'Greeting Card Builder', 'Thank You Note Generator'
  ],
  'Finance Tools': [
    'Loan Payment EMI Calculator', 'Mortgage Calculator', 'Interest Rate Calculator', 'Compound Interest Calculator',
    'Simple Interest Calculator', 'SIP Investment Calculator', 'Fixed Deposit FD Calculator', 'Recurring Deposit RD Calculator',
    'Public Provident Fund PPF', 'NPS Retirement Calculator', 'Retirement Savings Planner', 'Savings Growth Estimator',
    'Investment ROI Calculator', 'CAGR Growth Rate Calculator', 'XIRR Return Calculator', 'Net Present Value NPV',
    'Internal Rate of Return IRR', 'Payback Period Calculator', 'Break-Even Point Calculator', 'Profit Margin Calculator',
    'Gross Margin Calculator', 'Markup Percentage Calculator', 'Discount Savings Calculator', 'Sales Tax Calculator',
    'GST Tax Calculator', 'VAT Tax Calculator', 'Income Tax Estimator', 'Property Tax Calculator',
    'Capital Gains Tax Calculator', 'Dividend Yield Calculator', 'Stock Profit Calculator', 'Mutual Fund Return Estimator',
    'ETF Growth Calculator', 'Crypto Profit Calculator', 'Forex Exchange Estimator', 'Currency Conversion Engine',
    'Monthly Budget Planner', 'Expense Tracker Helper', 'Net Worth Calculator', 'Debt Payoff Snowball',
    'Credit Card Payment Calculator', 'Credit Score Estimator', 'Loan Comparison Engine', 'Mortgage Refinance Calculator',
    'Amortization Schedule Builder'
  ],
  'Business Tools': [
    'Invoice Builder', 'Receipt Builder', 'Quotation Builder', 'Estimate Builder',
    'Purchase Order Builder', 'Packing Slip Generator', 'Delivery Note Builder', 'Credit Note Builder',
    'General Ledger Helper', 'Balance Sheet Builder', 'Profit & Loss Statement Builder', 'Cash Flow Statement Builder',
    'Trial Balance Checker', 'Payroll Calculator', 'Employee Payslip Generator', 'Timesheet Calculator',
    'Attendance Tracker', 'Employee Leave Tracker', 'Employee Directory Table', 'Customer CRM Directory',
    'Vendor Directory Table', 'Inventory Tracker', 'Stock Level Auditor', 'Order Tracking Helper',
    'Shipment Tracker Helper', 'Barcode SKU Generator', 'Price List Builder', 'Product Catalog Builder',
    'Brochure Builder', 'Business Plan Outline', 'SWOT Analysis Matrix', 'Pitch Deck Outline',
    'Proposal Generator', 'Contract Template Prep', 'Non-Disclosure Agreement NDA', 'Service Agreement Builder',
    'Terms of Service Generator', 'Privacy Policy Generator', 'Refund Policy Generator'
  ],
  'Health & Fitness': [
    'BMI Calculator', 'BMR Calculator', 'Total Daily Energy Expenditure TDEE', 'Calorie Deficit Surplus Calculator',
    'Macronutrient Ratio Calculator', 'Protein Requirement Calculator', 'Carb Intake Calculator', 'Healthy Fat Calculator',
    'Daily Water Intake Calculator', 'Sleep Cycle Calculator', 'Target Heart Rate Zone', 'Blood Pressure Category Checker',
    'Blood Sugar Log Helper', 'Cholesterol Ratio Checker', 'Body Fat Percentage Calculator', 'Lean Body Mass Calculator',
    'Ideal Body Weight Calculator', 'Weight Loss Timeline', 'Weight Gain Planner', 'Meal Plan Macro Calculator',
    'Workout Routine Planner', 'Exercise Rep Counter', 'Exercise Set Counter', 'Rest Interval Timer',
    'Step Distance Converter', 'Pace Calculator Running', 'Cycling Speed Calculator', 'Swimming Pace Calculator',
    'Yoga Session Timer', 'Meditation Timer', 'Pregnancy Due Date Calculator', 'Ovulation Window Calculator'
  ],
  'Education': [
    'GPA Calculator', 'CGPA Calculator', 'Grade Percentage Converter', 'Marks to Percentage Calculator',
    'Test Score Analyzer', 'Quiz Score Calculator', 'Exam Countdown Timer', 'Study Timetable Planner',
    'Assignment Tracker', 'Homework Organizer', 'Citation Generator APA MLA', 'Bibliography Builder',
    'Reference List Maker', 'Essay Outline Builder', 'Paragraph Structure Helper', 'Sentence Structure Analyzer',
    'Grammar Checker Helper', 'Spell Checker Helper', 'Plagiarism Checker Preview', 'Word Count Analyzer',
    'Reading Time Estimator', 'Vocabulary Builder', 'Dictionary Lookup Helper', 'Thesaurus Synonym Finder',
    'Flashcard Maker Prep', 'Quiz Question Builder', 'Test Question Builder', 'Certificate Builder',
    'Student Transcript Builder', 'Student Resume Builder'
  ],
  'Unit Converters': [
    'Length Unit Converter', 'Weight Mass Converter', 'Volume Capacity Converter', 'Area Surface Converter',
    'Speed Velocity Converter', 'Time Duration Converter', 'Temperature Converter', 'Pressure Unit Converter',
    'Energy Joule Converter', 'Power Watt Converter', 'Force Newton Converter', 'Angle Degree Converter',
    'Frequency Hertz Converter', 'Data Storage Converter', 'Digital Bandwidth Converter', 'Fuel Consumption Converter',
    'Cooking Measurement Converter', 'Shoe Size Converter', 'Clothing Size Converter', 'Ring Size Converter',
    'Paper Size Dimensions', 'Pixel to REM Converter', 'DPI PPI Screen Calculator', 'Screen Resolution Scaler',
    'Aspect Ratio Calculator', 'File Size Unit Converter', 'Download Time Calculator'
  ]
};

const QUALIFIERS = [
  'Pro', 'Universal', 'Instant', 'Online', 'Studio', 'Master', 'Express', 'Advanced',
  'Ultimate', 'Smart', 'Precision', 'Client-Side', 'Fast', 'Easy', 'Interactive',
  'Custom', 'Standard', 'Dynamic', 'Live', 'Private', 'Zero-Server', 'Browser'
];

const CONTEXTS = [
  'for Web Professionals', 'for Developers', 'for Content Marketers', 'for Writers',
  'for Social Media Managers', 'for SEO Analysts', 'for Students', 'for Engineers',
  'for Financial Advisors', 'for Business Leaders', 'for Daily Operations', 'for Security Compliance',
  'for Digital Publishers', 'for Data Analysts', 'for Workflow Efficiency'
];

// Sub-batching setup (starting at subBatchIndex = 21 for Batch 2)
const subBatchSize = 250;
let totalGenerated = 0;
let subBatchIndex = 21;
let currentBatchTools = [];

function flushSubBatch() {
  if (currentBatchTools.length === 0) return;
  const fileName = `batch-${subBatchIndex}.ts`;
  const filePath = path.join(__dirname, '../src/lib/data/generated', fileName);
  
  const content = `import { Tool } from '../../types';\n\nexport const BATCH_${subBatchIndex}_TOOLS: Tool[] = ${JSON.stringify(currentBatchTools, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved Sub-batch ${subBatchIndex}: ${currentBatchTools.length} tools -> ${fileName}`);
  
  subBatchIndex++;
  currentBatchTools = [];
}

for (const target of TARGETS) {
  const category = target.category;
  const countNeeded = target.count;
  const topics = TOPICS[category] || TOPICS['SEO Tools'];
  let countForCategory = 0;

  console.log(`\nGenerating ${countNeeded} tools for category: "${category}"...`);

  let attempt = 0;
  while (countForCategory < countNeeded) {
    attempt++;
    const topic = topics[countForCategory % topics.length];
    const qualifier = QUALIFIERS[(countForCategory + attempt) % QUALIFIERS.length];
    const context = CONTEXTS[(countForCategory * 3 + attempt) % CONTEXTS.length];

    let rawName = `${qualifier} ${topic}`;
    if (attempt % 3 === 0) {
      rawName = `${topic} ${qualifier}`;
    } else if (attempt % 5 === 0) {
      rawName = `${topic} (${qualifier})`;
    }

    let slug = toSlug(rawName);
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${countForCategory + 1}`;
    }

    let name = rawName;
    if (seenNames.has(name.toLowerCase())) {
      name = `${rawName} #${countForCategory + 1}`;
    }

    seenSlugs.add(slug);
    seenNames.add(name.toLowerCase());

    const usageCount = Math.floor(15000 + Math.random() * 180000);
    const shortDesc = `Instant client-side ${topic.toLowerCase()} tool ${context.toLowerCase()}.`;
    const description = `Perform ${topic.toLowerCase()} calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.`;

    const toolObj = {
      id: slug,
      slug: slug,
      name: name,
      shortDesc: shortDesc,
      description: description,
      category: category,
      iconName: target.defaultIcon,
      usageCount: usageCount,
      tags: [category.toLowerCase(), topic.toLowerCase(), qualifier.toLowerCase(), 'browser tool', 'client side'],
      howToUse: [
        { step: 1, title: 'Input or Select Options', desc: `Enter or upload your data into the ${topic} controls.` },
        { step: 2, title: 'Execute Calculation', desc: `The ${topic} processes your inputs instantly using browser APIs.` },
        { step: 3, title: 'Copy or Export Result', desc: 'Click "Copy Result" or export your calculated data with one click.' }
      ],
      faqs: [
        { question: `Is my data processed securely for ${topic}?`, answer: `Yes! All ${topic} calculations execute 100% locally in your web browser JavaScript engine.` },
        { question: `Are there usage limits on ${name}?`, answer: 'No, you can use this tool unlimited times for free without any signups or subscriptions.' }
      ]
    };

    currentBatchTools.push(toolObj);
    countForCategory++;
    totalGenerated++;

    if (currentBatchTools.length >= subBatchSize) {
      flushSubBatch();
    }
  }
}

flushSubBatch();

console.log(`\n==================================================`);
console.log(`TOTAL NEW TOOLS GENERATED IN BATCH 2: ${totalGenerated}`);
console.log(`TOTAL SUB-BATCHES (Batch 1 & 2): ${subBatchIndex - 1}`);
console.log(`TOTAL UNIQUE SLUGS IN DATABASE: ${seenSlugs.size}`);
console.log(`==================================================\n`);

// Update generated index export for ALL sub-batches (1 to 40)
const indexFilePath = path.join(__dirname, '../src/lib/data/generated/index.ts');
let indexImports = '';
let indexExports = 'export const ALL_GENERATED_TOOLS: Tool[] = [\n';

for (let i = 1; i < subBatchIndex; i++) {
  indexImports += `import { BATCH_${i}_TOOLS } from './batch-${i}';\n`;
  indexExports += `  ...BATCH_${i}_TOOLS,\n`;
}
indexExports += '];\n';

const indexContent = `import { Tool } from '../../types';\n${indexImports}\n${indexExports}`;
fs.writeFileSync(indexFilePath, indexContent, 'utf8');
console.log(`Updated src/lib/data/generated/index.ts with ${subBatchIndex - 1} batch imports.`);
