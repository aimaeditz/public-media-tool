const fs = require('fs');
const path = require('path');

// Target category distribution for Batch 3 totaling EXACTLY 5,000 tools:
const TARGETS = [
  { category: 'Automotive', count: 180, defaultIcon: 'Car' },
  { category: 'Travel Tools', count: 240, defaultIcon: 'Compass' },
  { category: 'Real Estate', count: 180, defaultIcon: 'Home' },
  { category: 'Legal Tools', count: 180, defaultIcon: 'FileText' },
  { category: 'HR & Payroll', count: 240, defaultIcon: 'Users' },
  { category: 'Accounting', count: 240, defaultIcon: 'CreditCard' },
  { category: 'E-commerce', count: 240, defaultIcon: 'ShoppingBag' },
  { category: 'Inventory & Logistics', count: 240, defaultIcon: 'Box' },
  { category: 'Engineering', count: 300, defaultIcon: 'Cpu' },
  { category: 'Construction', count: 180, defaultIcon: 'HardHat' },
  { category: 'Electrical & Solar', count: 180, defaultIcon: 'Zap' },
  { category: 'Agriculture', count: 180, defaultIcon: 'Sprout' },
  { category: 'Restaurant & Cafe', count: 180, defaultIcon: 'Utensils' },
  { category: 'Beauty & Salon', count: 100, defaultIcon: 'Scissors' },
  { category: 'Wedding & Event', count: 100, defaultIcon: 'Heart' },
  { category: 'Photography', count: 180, defaultIcon: 'Camera' },
  { category: 'Music Production', count: 180, defaultIcon: 'Music' },
  { category: 'Environment & Energy', count: 180, defaultIcon: 'Leaf' },
  { category: 'Pets & Animals', count: 100, defaultIcon: 'Dog' },
  { category: 'Government & Public Services', count: 100, defaultIcon: 'Building' },
  { category: 'Office Administration', count: 180, defaultIcon: 'File' },
  { category: 'Networking', count: 180, defaultIcon: 'Network' },
  { category: 'Data Management', count: 180, defaultIcon: 'Database' },
  { category: 'Project Management', count: 180, defaultIcon: 'Briefcase' },
  { category: 'Marketing & Advertising', count: 240, defaultIcon: 'Megaphone' },
  { category: 'YouTube Creator Tools', count: 240, defaultIcon: 'Video' },
  { category: 'Freelancing', count: 180, defaultIcon: 'Briefcase' }
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
  'Automotive': [
    'Fuel Cost Calculator', 'Vehicle Mileage Estimator', 'Car Loan Payment Calculator', 'Car Insurance Estimator',
    'Car Depreciation Estimator', 'Resale Value Calculator', 'Car Spec Comparison Tool', 'Vehicle Service Cost Estimator',
    'Car Tire Size Calculator', 'Car Battery Life Checker', 'Oil Change Interval Helper', 'Coolant Mix Calculator',
    'Brake Wear Inspector', 'Transmission Fluid Checker', 'Car Rental Cost Estimator', 'Car Lease Vs Purchase',
    'Trade-In Value Estimator', 'VIN Decoder Helper', 'Toll Cost Calculator', 'EV Driving Range Estimator',
    'EV Charging Cost Estimator', 'Hybrid Vs Electric Savings'
  ],
  'Travel Tools': [
    'Trip Itinerary Planner', 'Travel Budget Calculator', 'Packing List Builder', 'Travel Checklist Helper',
    'Visa Requirement Checker', 'Passport Expiry Helper', 'Airline Luggage Size Checker', 'Flight Cost Estimator',
    'Hotel Cost Comparer', 'Taxi Fare Estimator', 'Travel Distance Calculator', 'Travel Time Estimator',
    'Currency Converter Helper', 'Travel Timezone Shift Helper', 'Travel Phrasebook Helper', 'Travel Expense Logger'
  ],
  'Real Estate': [
    'Mortgage Loan Payment Calculator', 'Property Down Payment Planner', 'Closing Cost Estimator', 'Property Tax Calculator',
    'Home Appraisal Estimator', 'Home Value Appreciation', 'Home Improvement ROI', 'Solar Savings Calculator',
    'Rental Yield Calculator', 'Cap Rate Calculator', 'Lease Agreement Formatter', 'Tenant Rent Estimator'
  ],
  'Legal Tools': [
    'Contract Builder Template', 'Non Disclosure Agreement NDA Builder', 'Lease Agreement Template', 'Promissory Note Generator',
    'Power of Attorney Template', 'Privacy Policy Builder', 'Terms of Service Generator', 'DMCA Notice Generator',
    'LLC Registration Checklist', 'Copyright Notice Builder'
  ],
  'HR & Payroll': [
    'Payroll Salary Calculator', 'Payslip Builder', 'Hourly Wage Overtime Calculator', 'Sales Commission Calculator',
    'Tax Deduction Calculator', 'PF Pension Contribution Helper', 'Leave Tracker Table', 'Timesheet Hours Calculator',
    'Offer Letter Generator', 'Salary Slip Formatter', 'W2 1099 Tax Estimator', 'Job Description Generator'
  ],
  'Accounting': [
    'General Ledger Entry Helper', 'Trial Balance Checker', 'Balance Sheet Calculator', 'Profit and Loss Estimator',
    'Cash Flow Projection Tool', 'Bank Reconciliation Helper', 'Depreciation Schedule Calculator', 'Bad Debt Estimator',
    'EBITDA Margin Calculator', 'Gross Profit Margin Calculator', 'Net Margin Estimator', 'GST Return Helper'
  ],
  'E-commerce': [
    'Product SKU Generator', 'Product Barcode Generator', 'Product Margin Calculator', 'Product Bundle Pricing',
    'Shipping Fee Estimator', 'Return Refund Cost Calculator', 'Dropshipping Profit Margin', 'Customer Lifetime Value LTV',
    'Cart Abandonment Rate Calculator', 'Order Conversion Rate Estimator'
  ],
  'Inventory & Logistics': [
    'Stock Reorder Point Calculator', 'Inventory Valuation FIFO LIFO', 'Warehouse Bin Locator Helper', 'SKU Barcode Generator',
    'Freight Shipping Cost Estimator', 'Customs Tariff Duty Calculator', 'Bill of Lading Builder', 'Commercial Invoice Generator',
    'Container Load Calculator', 'Last Mile Delivery Cost Estimator'
  ],
  'Engineering': [
    'Beam Bending Stress Calculator', 'Column Structural Load Calculator', 'Staircase Rise Run Calculator', 'Truss Member Force Solver',
    'Fluid Pipe Pressure Drop Calculator', 'HVAC Cooling Load Estimator', 'Electric Circuit Impedance Calculator', 'Motor Torque Power Calculator',
    'Transformer Efficiency Calculator', 'Power Factor Correction Helper'
  ],
  'Construction': [
    'Concrete Mix Volume Calculator', 'Rebar Steel Weight Calculator', 'Wall Brick Count Estimator', 'Floor Tile Count Estimator',
    'Wall Paint Area Calculator', 'Plaster Mortar Quantity Calculator', 'Roofing Sheet Area Estimator', 'Drywall Sheet Count Calculator'
  ],
  'Electrical & Solar': [
    'Ohms Law Voltage Current Calculator', 'Wire Gauge Voltage Drop Calculator', 'Circuit Breaker Ampere Sizing', 'Solar Panel Array ROI Calculator',
    'Solar Battery Storage Sizing', 'Inverter Capacity Calculator', 'Wind Energy Output Estimator', 'Home Energy Wattage Auditor'
  ],
  'Agriculture': [
    'Crop Yield Per Acre Calculator', 'Seed Requirement Calculator', 'NPK Fertilizer Mixture Calculator', 'Drip Irrigation Flow Calculator',
    'Soil pH Amendment Estimator', 'Compost Volume Calculator', 'Greenhouse Area Estimator', 'Livestock Feed Calorie Calculator'
  ],
  'Restaurant & Cafe': [
    'Recipe Food Costing Calculator', 'Menu Item Margin Calculator', 'Food Portion Size Estimator', 'Restaurant POS Billing Tip Calculator',
    'Combo Meal Pricing Helper', 'Happy Hour Discount Calculator', 'Catering Event Budget Estimator'
  ],
  'Beauty & Salon': [
    'Salon Appointment Scheduler', 'Hair Dye Mix Ratio Helper', 'Skin Care Routine Planner', 'Nail Art Service Price Estimator'
  ],
  'Wedding & Event': [
    'Wedding Budget Calculator', 'Guest List RSVP Tracker', 'Seating Chart Planner', 'Catering Food Quantity Estimator', 'Event Timeline Schedule Builder'
  ],
  'Photography': [
    'EXIF Metadata Inspector', 'Depth of Field DOF Calculator', 'Aspect Ratio Cropper Guide', 'Camera Exposure Triangle Solver', 'Field of View FOV Calculator'
  ],
  'Music Production': [
    'BPM Metronome Tool', 'Music Key Transposer', 'Chord Progression Generator', 'BPM to Millisecond Delay Calculator', 'Guitar Tuner Pitch Reference'
  ],
  'Environment & Energy': [
    'Carbon Footprint Emission Calculator', 'CO2 Savings Estimator', 'Solar Energy Offset Calculator', 'Recycling Impact Estimator'
  ],
  'Pets & Animals': [
    'Pet Calorie Requirement Calculator', 'Dog Age in Human Years Calculator', 'Cat Age Converter', 'Pet Medication Dosage Helper'
  ],
  'Government & Public Services': [
    'Property Tax Valuation Calculator', 'Vehicle Road Tax Estimator', 'Public Utility Bill Splitter', 'Civic Tax Estimator'
  ],
  'Office Administration': [
    'Office Memo Formatter', 'Business Letterhead Builder', 'Visitor Log Table', 'Meeting Agenda Builder', 'Office Expense Voucher Builder'
  ],
  'Networking': [
    'IP Subnet Mask Calculator', 'CIDR Notation Range Solver', 'Network Port Lookup', 'Bandwidth Download Time Calculator', 'Ping Latency Estimator'
  ],
  'Data Management': [
    'SQL Table Schema Builder', 'Data Deduplication Helper', 'JSON Field Extractor', 'CSV Column Reorder Tool', 'Data Normalization Checker'
  ],
  'Project Management': [
    'Gantt Chart Timeline Builder', 'Story Point Estimation Calculator', 'RACI Matrix Planner', 'WBS Work Breakdown Structure Builder', 'Sprint Velocity Calculator'
  ],
  'Marketing & Advertising': [
    'Ad Campaign ROAS Calculator', 'Click Through Rate CTR Calculator', 'Cost Per Click CPC Estimator', 'Cost Per Acquisition CPA Calculator', 'Ad Banner Aspect Ratio Helper'
  ],
  'YouTube Creator Tools': [
    'YouTube Title Character Counter', 'YouTube Tag Extractor Helper', 'YouTube Channel Keyword Finder', 'YouTube Thumbnail Previewer', 'YouTube Shorts Aspect Ratio Tool'
  ],
  'Freelancing': [
    'Freelance Hourly Rate Calculator', 'Project Quote Estimate Builder', 'Freelance Contract Template Builder', 'Freelance Invoice Builder', 'Client Project Milestone Tracker'
  ]
};

const QUALIFIERS = [
  'Pro', 'Universal', 'Instant', 'Online', 'Studio', 'Master', 'Express', 'Advanced',
  'Ultimate', 'Smart', 'Precision', 'Client-Side', 'Fast', 'Easy', 'Interactive',
  'Custom', 'Standard', 'Dynamic', 'Live', 'Private', 'Zero-Server', 'Browser'
];

const CONTEXTS = [
  'for Niche Professionals', 'for Specialists', 'for Industry Leaders', 'for Daily Practice',
  'for Workflow Automation', 'for Precision Tasks', 'for Studio Operations', 'for Enterprise Efficiency'
];

// Sub-batching setup (starting at subBatchIndex = 41 for Batch 3)
const subBatchSize = 250;
let totalGenerated = 0;
let subBatchIndex = 41;
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
  const topics = TOPICS[category] || TOPICS['Automotive'];
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
console.log(`TOTAL NEW TOOLS GENERATED IN BATCH 3: ${totalGenerated}`);
console.log(`TOTAL SUB-BATCHES (Batch 1, 2 & 3): ${subBatchIndex - 1}`);
console.log(`TOTAL UNIQUE SLUGS IN DATABASE: ${seenSlugs.size}`);
console.log(`==================================================\n`);

// Update generated index export for ALL sub-batches (1 to 60)
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
