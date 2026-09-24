// Automatically generated - DO NOT EDIT MANUALLY
import { CategoryInfo } from './types';
import { SEARCH_INDEX } from './search-index';

export interface CategoryWithMeta extends CategoryInfo {
  count: number;
  department: string;
  subCategories?: string[];
  parentId?: string;
  parentSlug?: string;
  toolSlugs?: string[];
}

export const STATIC_CATEGORIES: CategoryWithMeta[] = [
  {
    "id": "Text Formatting",
    "slug": "text-formatting",
    "name": "Text Formatting",
    "iconName": "FileText",
    "description": "Format, clean, case-convert, deduplicate, and sort text strings client-side.",
    "department": "Text & Content",
    "colorGradient": "from-indigo-500 to-blue-600",
    "bgLight": "bg-indigo-50 text-indigo-700",
    "count": 42,
    "subCategories": [
      "List",
      "Html",
      "Encoder",
      "Decoder",
      "Markdown"
    ]
  },
  {
    "id": "Text Analysis",
    "slug": "text-analysis",
    "name": "Text Analysis",
    "iconName": "Search",
    "description": "Word counts, character metrics, reading speed, and text comparison tools.",
    "department": "Text & Content",
    "colorGradient": "from-blue-500 to-cyan-600",
    "bgLight": "bg-blue-50 text-blue-700",
    "count": 42,
    "subCategories": [
      "Text tools",
      "Unicode",
      "Cleaner",
      "1337",
      "Repeater"
    ]
  },
  {
    "id": "Text Generators & Encoding",
    "slug": "text-encoding",
    "name": "Text Generators & Encoding",
    "iconName": "Sparkles",
    "description": "Lorem ipsum generators, text encoders, ROT13, and string transformation tools.",
    "department": "Text & Content",
    "colorGradient": "from-violet-500 to-purple-600",
    "bgLight": "bg-violet-50 text-violet-700",
    "count": 41,
    "subCategories": [
      "Text tools",
      "Text padding master",
      "Advanced text column formatter",
      "Smart text scrambler",
      "Leetspeak generator client-side"
    ]
  },
  {
    "id": "Code Formatters",
    "slug": "code-formatters",
    "name": "Code Formatters",
    "iconName": "Code",
    "description": "Format, beautify, and validate JSON, XML, SQL, HTML, CSS, and modern code.",
    "department": "Developer & Code",
    "colorGradient": "from-emerald-500 to-teal-600",
    "bgLight": "bg-emerald-50 text-emerald-700",
    "count": 38,
    "subCategories": [
      "Css",
      "Json",
      "Decoder",
      "Markup",
      "Config"
    ]
  },
  {
    "id": "Web & API Utilities",
    "slug": "web-api-tools",
    "name": "Web & API Utilities",
    "iconName": "Globe",
    "description": "Base64, UUIDs, JWT decoding, cURL converters, and client-side API utilities.",
    "department": "Developer & Code",
    "colorGradient": "from-teal-500 to-cyan-600",
    "bgLight": "bg-teal-50 text-teal-700",
    "count": 38,
    "subCategories": [
      "Developer tools",
      "Json",
      "Devops",
      "Containers",
      "Git"
    ]
  },
  {
    "id": "Data & Schema Tools",
    "slug": "data-schema-tools",
    "name": "Data & Schema Tools",
    "iconName": "Database",
    "description": "YAML, CSV, JSON data converters, regex testers, and schema generators.",
    "department": "Developer & Code",
    "colorGradient": "from-cyan-500 to-blue-600",
    "bgLight": "bg-cyan-50 text-cyan-700",
    "count": 37,
    "subCategories": [
      "Developer tools",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "Image Resizing & Cropping",
    "slug": "image-resizing",
    "name": "Image Resizing & Cropping",
    "iconName": "Image",
    "description": "Resize images, crop aspect ratios, rotate canvas, and scale dimensions in-browser.",
    "department": "Design & Media",
    "colorGradient": "from-pink-500 to-rose-600",
    "bgLight": "bg-pink-50 text-pink-700",
    "count": 36,
    "subCategories": [
      "Png",
      "Photo",
      "Filter",
      "Dimensions",
      "Canvas"
    ]
  },
  {
    "id": "Image Optimization & Conversion",
    "slug": "image-conversion",
    "name": "Image Optimization & Conversion",
    "iconName": "RefreshCw",
    "description": "Compress image file sizes, convert between PNG, JPEG, WebP, SVG, and ICO.",
    "department": "Design & Media",
    "colorGradient": "from-rose-500 to-orange-600",
    "bgLight": "bg-rose-50 text-rose-700",
    "count": 37,
    "subCategories": [
      "Image tools",
      "Retro",
      "Photo",
      "Rgb",
      "Client-side"
    ]
  },
  {
    "id": "Photo Filters & Effects",
    "slug": "photo-filters",
    "name": "Photo Filters & Effects",
    "iconName": "Camera",
    "description": "Apply photo adjustments, color filters, watermarks, frames, and inspect EXIF data.",
    "department": "Design & Media",
    "colorGradient": "from-fuchsia-500 to-pink-600",
    "bgLight": "bg-fuchsia-50 text-fuchsia-700",
    "count": 37,
    "subCategories": [
      "Image tools",
      "Photography",
      "Browser",
      "Client-side",
      "Custom"
    ]
  },
  {
    "id": "Financial Calculators",
    "slug": "financial-calculators",
    "name": "Financial Calculators",
    "iconName": "DollarSign",
    "description": "Mortgage loan, compound interest, tax discounts, and investment growth estimators.",
    "department": "Calculators & Finance",
    "colorGradient": "from-green-500 to-emerald-600",
    "bgLight": "bg-green-50 text-green-700",
    "count": 35,
    "subCategories": [
      "Finance",
      "Health",
      "Discount",
      "Savings",
      "Percentage"
    ]
  },
  {
    "id": "Everyday Calculators",
    "slug": "everyday-calculators",
    "name": "Everyday Calculators",
    "iconName": "Calculator",
    "description": "Restaurant tip splitters, fuel economy, age difference, and consumer calculators.",
    "department": "Calculators & Finance",
    "colorGradient": "from-lime-500 to-green-600",
    "bgLight": "bg-lime-50 text-lime-700",
    "count": 35,
    "subCategories": [
      "Calculator tools",
      "Math",
      "Geometry",
      "Statistics",
      "Probability"
    ]
  },
  {
    "id": "Math Calculators",
    "slug": "math-calculators",
    "name": "Math Calculators",
    "iconName": "Percent",
    "description": "Scientific trig, fractions, percentages, logarithm, and algebra calculators.",
    "department": "Calculators & Finance",
    "colorGradient": "from-teal-500 to-emerald-600",
    "bgLight": "bg-teal-50 text-teal-700",
    "count": 34,
    "subCategories": [
      "Calculator tools",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "SERP & Search Optimization",
    "slug": "serp-seo-tools",
    "name": "SERP & Search Optimization",
    "iconName": "Search",
    "description": "Google SERP snippet previews, title pixel checkers, robots.txt, and sitemaps.",
    "department": "SEO & Marketing",
    "colorGradient": "from-purple-500 to-indigo-600",
    "bgLight": "bg-purple-50 text-purple-700",
    "count": 34,
    "subCategories": [
      "Seo",
      "Json-ld",
      "Urls",
      "Meta tags",
      "Keywords"
    ]
  },
  {
    "id": "Meta Tags & Structured Data",
    "slug": "meta-structured-data",
    "name": "Meta Tags & Structured Data",
    "iconName": "Code",
    "description": "OpenGraph social cards, Twitter cards, and Schema.org JSON-LD structured data.",
    "department": "SEO & Marketing",
    "colorGradient": "from-indigo-500 to-violet-600",
    "bgLight": "bg-indigo-50 text-indigo-700",
    "count": 34,
    "subCategories": [
      "Seo",
      "Seo tools",
      "Json-ld",
      "Title tag",
      "Featured snippet"
    ]
  },
  {
    "id": "Content & Keyword SEO",
    "slug": "content-seo-tools",
    "name": "Content & Keyword SEO",
    "iconName": "TrendingUp",
    "description": "Keyword density analyzers, heading hierarchy auditors, and anchor text tools.",
    "department": "SEO & Marketing",
    "colorGradient": "from-violet-500 to-purple-600",
    "bgLight": "bg-violet-50 text-violet-700",
    "count": 34,
    "subCategories": [
      "Seo tools",
      "Client-side canonical tag checker",
      "Redirect chain checker easy",
      "Custom http status code checker",
      "Broken link auditor (dynamic)"
    ]
  },
  {
    "id": "Measurement Converters",
    "slug": "measurement-converters",
    "name": "Measurement Converters",
    "iconName": "RefreshCw",
    "description": "Convert length, area, volume, mass, weight, speed, and time dimensions.",
    "department": "Everyday & Practical",
    "colorGradient": "from-yellow-500 to-orange-600",
    "bgLight": "bg-yellow-50 text-yellow-700",
    "count": 47,
    "subCategories": [
      "Calculator",
      "Length",
      "Weight",
      "Automotive",
      "Physics"
    ]
  },
  {
    "id": "Scientific Converters",
    "slug": "scientific-converters",
    "name": "Scientific Converters",
    "iconName": "Cpu",
    "description": "Convert temperature, digital storage, pressure, energy, torque, and power units.",
    "department": "Engineering & Science",
    "colorGradient": "from-orange-500 to-amber-600",
    "bgLight": "bg-orange-50 text-orange-700",
    "count": 46,
    "subCategories": [
      "Converter tools",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "Color Palettes & Contrast",
    "slug": "color-palettes",
    "name": "Color Palettes & Contrast",
    "iconName": "Palette",
    "description": "Color picker, WCAG contrast checkers, palette extraction, and harmony finders.",
    "department": "Design & Media",
    "colorGradient": "from-cyan-500 to-sky-600",
    "bgLight": "bg-cyan-50 text-cyan-700",
    "count": 43,
    "subCategories": [
      "Design",
      "Accessibility",
      "Hex",
      "Rgb",
      "Hsl"
    ]
  },
  {
    "id": "Color Converters & Gradients",
    "slug": "color-converters",
    "name": "Color Converters & Gradients",
    "iconName": "Sparkles",
    "description": "HEX, RGB, HSL, CMYK conversions, CSS gradient builders, and tint generators.",
    "department": "Design & Media",
    "colorGradient": "from-sky-500 to-indigo-600",
    "bgLight": "bg-sky-50 text-sky-700",
    "count": 43,
    "subCategories": [
      "Color tools",
      "Client-side",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "PDF Inspection & Analysis",
    "slug": "pdf-inspection",
    "name": "PDF Inspection & Analysis",
    "iconName": "FileCheck",
    "description": "Inspect PDF metadata, count pages, check font structures, and analyze document specs.",
    "department": "Text & Content",
    "colorGradient": "from-amber-500 to-orange-600",
    "bgLight": "bg-amber-50 text-amber-700",
    "count": 41,
    "subCategories": [
      "Inspector",
      "Print",
      "Layout",
      "Metadata",
      "Page numbers"
    ]
  },
  {
    "id": "PDF Document Utilities",
    "slug": "pdf-document-tools",
    "name": "PDF Document Utilities",
    "iconName": "FileText",
    "description": "Extract client-side text, generate clean previews, and organize PDF documents.",
    "department": "Text & Content",
    "colorGradient": "from-orange-500 to-red-600",
    "bgLight": "bg-orange-50 text-orange-700",
    "count": 41,
    "subCategories": [
      "Pdf tools",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "Cryptography & Hashing",
    "slug": "cryptography-hashing",
    "name": "Cryptography & Hashing",
    "iconName": "Lock",
    "description": "Generate SHA-256, SHA-512, MD5, and HMAC hashes securely in your browser.",
    "department": "Developer & Code",
    "colorGradient": "from-red-500 to-rose-600",
    "bgLight": "bg-red-50 text-red-700",
    "count": 36,
    "subCategories": [
      "Security",
      "Pem",
      "Entropy",
      "Bcrypt",
      "Password hash"
    ]
  },
  {
    "id": "Password & Security Tools",
    "slug": "passwords-security",
    "name": "Password & Security Tools",
    "iconName": "Shield",
    "description": "Cryptographically strong password generators, entropy checkers, and privacy tools.",
    "department": "Developer & Code",
    "colorGradient": "from-rose-500 to-pink-600",
    "bgLight": "bg-rose-50 text-rose-700",
    "count": 36,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Finance Tools",
    "slug": "finance-tools",
    "name": "Finance Tools",
    "iconName": "DollarSign",
    "description": "SIP calculators, salary take-home estimators, and ROI financial tools.",
    "department": "Calculators & Finance",
    "colorGradient": "from-green-500 to-teal-600",
    "bgLight": "bg-green-50 text-green-700",
    "count": 45,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Math Tools",
    "slug": "math-tools",
    "name": "Math Tools",
    "iconName": "Percent",
    "description": "Fraction converters, prime number checkers, quadratic solvers, and statistics tools.",
    "department": "Calculators & Finance",
    "colorGradient": "from-teal-500 to-emerald-600",
    "bgLight": "bg-teal-50 text-teal-700",
    "count": 44,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Generators",
    "slug": "generators",
    "name": "Generators",
    "iconName": "Zap",
    "description": "Generate mock user profiles, random numbers, dummy data, and placeholder assets.",
    "department": "Developer & Code",
    "colorGradient": "from-amber-500 to-yellow-600",
    "bgLight": "bg-amber-50 text-amber-700",
    "count": 43,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Productivity",
    "slug": "productivity",
    "name": "Productivity",
    "iconName": "CheckSquare",
    "description": "Pomodoro timers, reading speed calculators, and daily habit helpers.",
    "department": "Everyday & Practical",
    "colorGradient": "from-emerald-500 to-green-600",
    "bgLight": "bg-emerald-50 text-emerald-700",
    "count": 39,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Business Tools",
    "slug": "business-tools",
    "name": "Business Tools",
    "iconName": "Briefcase",
    "description": "Break-even point calculators, profit margin tools, and invoice formatters.",
    "department": "Business & Professional",
    "colorGradient": "from-blue-500 to-cyan-600",
    "bgLight": "bg-blue-50 text-blue-700",
    "count": 39,
    "subCategories": [
      "Client-side",
      "Dynamic",
      "Custom",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Web Tools",
    "slug": "web-tools",
    "name": "Web Tools",
    "iconName": "Globe",
    "description": "Encode URLs, generate HTML QR codes, test user agents, and format web data.",
    "department": "Developer & Code",
    "colorGradient": "from-blue-500 to-indigo-600",
    "bgLight": "bg-blue-50 text-blue-700",
    "count": 37,
    "subCategories": [
      "Seo",
      "Decoder",
      "Json",
      "Cheat sheet",
      "Javascript"
    ]
  },
  {
    "id": "Audio & Music Production",
    "slug": "audio-production",
    "name": "Audio & Music Production",
    "iconName": "Music",
    "description": "BPM metronomes, key transposer, audio sample rates, and decibel sound level calculators.",
    "department": "Design & Media",
    "colorGradient": "from-violet-500 to-purple-600",
    "bgLight": "bg-violet-50 text-violet-700",
    "count": 34,
    "subCategories": [
      "Audio tools",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "Health & Fitness",
    "slug": "health-fitness",
    "name": "Health & Fitness",
    "iconName": "Heart",
    "description": "BMI calculators, calorie trackers, water intake estimators, and pace planners.",
    "department": "Everyday & Practical",
    "colorGradient": "from-rose-500 to-pink-600",
    "bgLight": "bg-rose-50 text-rose-700",
    "count": 32,
    "subCategories": [
      "Browser",
      "Client-side",
      "Custom",
      "Dynamic",
      "Private"
    ]
  },
  {
    "id": "File Tools",
    "slug": "file-tools",
    "name": "File Tools",
    "iconName": "Folder",
    "description": "File size converters, MIME type lookups, and filename batch sanitizers.",
    "department": "Developer & Code",
    "colorGradient": "from-slate-500 to-zinc-600",
    "bgLight": "bg-zinc-50 text-zinc-700",
    "count": 30,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Education",
    "slug": "education",
    "name": "Education",
    "iconName": "GraduationCap",
    "description": "GPA calculators, flashcard generators, and citation formatters.",
    "department": "Everyday & Practical",
    "colorGradient": "from-amber-500 to-orange-600",
    "bgLight": "bg-amber-50 text-amber-700",
    "count": 30,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Date & Time",
    "slug": "date-time",
    "name": "Date & Time",
    "iconName": "Clock",
    "description": "Timezone converters, UNIX timestamp formatters, and date difference calculators.",
    "department": "Everyday & Practical",
    "colorGradient": "from-indigo-500 to-sky-600",
    "bgLight": "bg-indigo-50 text-indigo-700",
    "count": 28,
    "subCategories": [
      "Client-side",
      "Browser",
      "Dynamic",
      "Date difference calculator",
      "Age calculator"
    ]
  },
  {
    "id": "Unit Converters",
    "slug": "unit-converters",
    "name": "Unit Converters",
    "iconName": "Cpu",
    "description": "Convert metric and imperial units across scientific and everyday dimensions.",
    "department": "Everyday & Practical",
    "colorGradient": "from-indigo-500 to-purple-600",
    "bgLight": "bg-indigo-50 text-indigo-700",
    "count": 27,
    "subCategories": [
      "Universal length unit converter",
      "Volume capacity converter master",
      "Advanced area surface converter",
      "Speed velocity converter (smart)",
      "Time duration converter client-side"
    ]
  },
  {
    "id": "Automotive",
    "slug": "automotive",
    "name": "Automotive",
    "iconName": "Gauge",
    "description": "Fuel economy calculators, horsepower to kilowatt converters, and tire sizing.",
    "department": "Engineering & Science",
    "colorGradient": "from-red-500 to-orange-600",
    "bgLight": "bg-red-50 text-red-700",
    "count": 22,
    "subCategories": [
      "Client-side",
      "Custom",
      "Dynamic",
      "Private",
      "Browser"
    ]
  },
  {
    "id": "Travel Tools",
    "slug": "travel-tools",
    "name": "Travel Tools",
    "iconName": "Compass",
    "description": "Flight duration estimators, packing checklist generators, and currency helpers.",
    "department": "Everyday & Practical",
    "colorGradient": "from-sky-500 to-teal-600",
    "bgLight": "bg-sky-50 text-sky-700",
    "count": 16,
    "subCategories": [
      "Universal trip itinerary planner",
      "Online travel budget calculator",
      "Packing list builder master",
      "Advanced travel checklist helper",
      "Visa requirement checker (smart)"
    ]
  },
  {
    "id": "Real Estate",
    "slug": "real-estate",
    "name": "Real Estate",
    "iconName": "Home",
    "description": "Rental yield calculators, mortgage amortization, and square footage converters.",
    "department": "Business & Professional",
    "colorGradient": "from-emerald-500 to-cyan-600",
    "bgLight": "bg-emerald-50 text-emerald-700",
    "count": 12,
    "subCategories": [
      "Mortgage loan payment calculator",
      "Property down payment planner",
      "Closing cost estimator",
      "Property tax calculator",
      "Home appraisal estimator"
    ]
  },
  {
    "id": "HR & Payroll",
    "slug": "hr-payroll",
    "name": "HR & Payroll",
    "iconName": "Users",
    "description": "Overtime pay calculators, employee turnover rate, and PTO accrual estimators.",
    "department": "Business & Professional",
    "colorGradient": "from-violet-500 to-indigo-600",
    "bgLight": "bg-violet-50 text-violet-700",
    "count": 12,
    "subCategories": [
      "Payroll salary calculator",
      "Payslip builder",
      "Hourly wage overtime calculator",
      "Sales commission calculator",
      "Tax deduction calculator"
    ]
  },
  {
    "id": "Accounting",
    "slug": "accounting",
    "name": "Accounting",
    "iconName": "BookOpen",
    "description": "Depreciation calculators, bad debt provisions, and ledger reconciliation helpers.",
    "department": "Business & Professional",
    "colorGradient": "from-blue-500 to-emerald-600",
    "bgLight": "bg-blue-50 text-blue-700",
    "count": 12,
    "subCategories": [
      "General ledger entry helper",
      "Balance sheet calculator",
      "Profit and loss estimator",
      "Cash flow projection tool",
      "Bank reconciliation helper"
    ]
  },
  {
    "id": "E-commerce",
    "slug": "e-commerce",
    "name": "E-commerce",
    "iconName": "ShoppingCart",
    "description": "Order profit calculators, free shipping threshold estimators, and return rate tools.",
    "department": "Business & Professional",
    "colorGradient": "from-pink-500 to-orange-600",
    "bgLight": "bg-pink-50 text-pink-700",
    "count": 10,
    "subCategories": [
      "Product sku generator",
      "Product barcode generator",
      "Product margin calculator",
      "Product bundle pricing",
      "Shipping fee estimator"
    ]
  },
  {
    "id": "Inventory & Logistics",
    "slug": "inventory-logistics",
    "name": "Inventory & Logistics",
    "iconName": "Package",
    "description": "Reorder point calculators, safety stock estimators, and freight density tools.",
    "department": "Business & Professional",
    "colorGradient": "from-amber-500 to-emerald-600",
    "bgLight": "bg-amber-50 text-amber-700",
    "count": 10,
    "subCategories": [
      "Stock reorder point calculator",
      "Inventory valuation fifo lifo",
      "Warehouse bin locator helper",
      "Sku barcode generator",
      "Freight shipping cost estimator"
    ]
  },
  {
    "id": "Engineering Tools",
    "slug": "engineering-tools",
    "name": "Engineering Tools",
    "iconName": "Wrench",
    "description": "Stress-strain solvers, beam deflection, fluid pressure, and mechanics calculators.",
    "department": "Engineering & Science",
    "colorGradient": "from-cyan-500 to-blue-600",
    "bgLight": "bg-cyan-50 text-cyan-700",
    "count": 10,
    "subCategories": [
      "Beam bending stress calculator",
      "Column structural load calculator",
      "Staircase rise run calculator",
      "Truss member force solver",
      "Fluid pipe pressure drop calculator"
    ]
  },
  {
    "id": "Construction Tools",
    "slug": "construction-tools",
    "name": "Construction Tools",
    "iconName": "HardHat",
    "description": "Concrete volume, brick count, floor tile count, and drywall estimators.",
    "department": "Engineering & Science",
    "colorGradient": "from-orange-500 to-yellow-600",
    "bgLight": "bg-orange-50 text-orange-700",
    "count": 8,
    "subCategories": [
      "Concrete mix volume calculator",
      "Rebar steel weight calculator",
      "Wall brick count estimator",
      "Floor tile count estimator",
      "Wall paint area calculator"
    ]
  },
  {
    "id": "Electrical & Solar",
    "slug": "electrical-solar",
    "name": "Electrical & Solar",
    "iconName": "Zap",
    "description": "Ohm’s law, solar panel arrays, battery storage, and electrical wiring calculators.",
    "department": "Engineering & Science",
    "colorGradient": "from-yellow-500 to-amber-600",
    "bgLight": "bg-yellow-50 text-yellow-700",
    "count": 8,
    "subCategories": [
      "Ohms law voltage current calculator",
      "Wire gauge voltage drop calculator",
      "Circuit breaker ampere sizing",
      "Solar panel array roi calculator",
      "Solar battery storage sizing"
    ]
  },
  {
    "id": "Dining & Food Service",
    "slug": "dining-hospitality",
    "name": "Dining & Food Service",
    "iconName": "Utensils",
    "description": "Recipe food costing, menu profit margins, portion estimators, and restaurant tools.",
    "department": "Everyday & Practical",
    "colorGradient": "from-red-500 to-amber-600",
    "bgLight": "bg-red-50 text-red-700",
    "count": 7,
    "subCategories": [
      "Restaurant & cafe",
      "Recipe food costing calculator",
      "Menu item margin calculator",
      "Food portion size estimator",
      "Restaurant pos billing tip calculator"
    ]
  },
  {
    "id": "Events & Lifestyle",
    "slug": "events-lifestyle",
    "name": "Events & Lifestyle",
    "iconName": "Calendar",
    "description": "Wedding budgets, guest RSVP trackers, seating charts, and salon appointment tools.",
    "department": "Everyday & Practical",
    "colorGradient": "from-rose-500 to-indigo-600",
    "bgLight": "bg-rose-50 text-rose-700",
    "count": 9,
    "subCategories": [
      "Wedding & event",
      "Beauty & salon",
      "Universal wedding budget calculator",
      "Online guest list rsvp tracker",
      "Seating chart planner master"
    ]
  },
  {
    "id": "Agriculture & Environment",
    "slug": "nature-environment",
    "name": "Agriculture & Environment",
    "iconName": "Trees",
    "description": "Crop yield calculators, carbon footprint metrics, solar offsets, and pet health tools.",
    "department": "Everyday & Practical",
    "colorGradient": "from-green-500 to-emerald-600",
    "bgLight": "bg-green-50 text-green-700",
    "count": 16,
    "subCategories": [
      "Environment & energy",
      "Pets & animals",
      "Crop yield per acre calculator",
      "Seed requirement calculator",
      "Npk fertilizer mixture calculator"
    ]
  },
  {
    "id": "Legal & Public Services",
    "slug": "legal-civic-tools",
    "name": "Legal & Public Services",
    "iconName": "Scale",
    "description": "Legal agreements, statutory interest, property tax estimators, and civic utilities.",
    "department": "Business & Professional",
    "colorGradient": "from-slate-500 to-indigo-600",
    "bgLight": "bg-slate-50 text-slate-700",
    "count": 14,
    "subCategories": [
      "Legal tools",
      "Government & public services",
      "Contract builder template",
      "Non disclosure agreement nda builder",
      "Lease agreement template"
    ]
  },
  {
    "id": "Networking & Data Management",
    "slug": "networking-data",
    "name": "Networking & Data Management",
    "iconName": "Network",
    "description": "Subnet masks, CIDR ranges, SQL schemas, CSV reordering, and data helpers.",
    "department": "Developer & Code",
    "colorGradient": "from-cyan-500 to-indigo-600",
    "bgLight": "bg-cyan-50 text-cyan-700",
    "count": 10,
    "subCategories": [
      "Ip subnet mask calculator",
      "Cidr notation range solver",
      "Network port lookup",
      "Bandwidth download time calculator",
      "Ping latency estimator"
    ]
  },
  {
    "id": "Office & Project Management",
    "slug": "workplace-productivity",
    "name": "Office & Project Management",
    "iconName": "Clipboard",
    "description": "Gantt timelines, RACI matrices, freelance quotes, memos, and agendas.",
    "department": "Business & Professional",
    "colorGradient": "from-slate-500 to-blue-600",
    "bgLight": "bg-slate-50 text-slate-700",
    "count": 15,
    "subCategories": [
      "Freelancing",
      "Office administration",
      "Freelance hourly rate calculator",
      "Project quote estimate builder",
      "Freelance contract template builder"
    ]
  },
  {
    "id": "Marketing & Creator Tools",
    "slug": "marketing-creator-tools",
    "name": "Marketing & Creator Tools",
    "iconName": "TrendingUp",
    "description": "Ad ROAS calculators, CTR estimators, and YouTube creator optimization utilities.",
    "department": "SEO & Marketing",
    "colorGradient": "from-red-500 to-pink-600",
    "bgLight": "bg-red-50 text-red-700",
    "count": 10,
    "subCategories": [
      "Marketing & advertising",
      "Youtube creator tools",
      "Ad campaign roas calculator",
      "Click through rate ctr calculator",
      "Cost per click cpc estimator"
    ]
  }
];

export const CATEGORIES: CategoryWithMeta[] = STATIC_CATEGORIES;

export function getToolsForCategory(categorySlug: string): any[] {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return SEARCH_INDEX.filter(t => t.category === cat.id);
}
