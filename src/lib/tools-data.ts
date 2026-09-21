import { Tool, CategoryInfo } from './types';
import { TEXT_TOOLS } from './data/text-tools';
import { IMAGE_TOOLS } from './data/image-tools';
import { PDF_TOOLS } from './data/pdf-tools';
import { DEVELOPER_TOOLS } from './data/developer-tools';
import { SEO_TOOLS } from './data/seo-tools';
import { COLOR_TOOLS } from './data/color-tools';
import { CONVERTER_TOOLS } from './data/converter-tools';
import { CALCULATOR_TOOLS } from './data/calculator-tools';
import { SECURITY_TOOLS } from './data/security-tools';
import { WEB_TOOLS } from './data/web-tools';
import { ALL_GENERATED_TOOLS } from './data/generated';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Text Tools',
    slug: 'text-tools',
    name: 'Text Tools',
    iconName: 'FileText',
    description: 'Transform, clean, format, and analyze text instantly without data leaving your browser.',
    colorGradient: 'from-indigo-500 to-purple-600',
    bgLight: 'bg-indigo-50 text-indigo-700',
  },
  {
    id: 'Image Tools',
    slug: 'image-tools',
    name: 'Image Tools',
    iconName: 'Image',
    description: 'Crop, resize, compress, and convert images directly in your browser with canvas API.',
    colorGradient: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50 text-pink-700',
  },
  {
    id: 'PDF Tools',
    slug: 'pdf-tools',
    name: 'PDF Tools',
    iconName: 'FileCheck',
    description: 'Inspect PDF metadata, count pages, generate clean PDF previews, and extract text client-side.',
    colorGradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'Developer Tools',
    slug: 'developer-tools',
    name: 'Developer Tools',
    iconName: 'Code',
    description: 'JSON formatters, Base64, UUID generators, HTML entity encoders, and code helpers.',
    colorGradient: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'SEO Tools',
    slug: 'seo-tools',
    name: 'SEO Tools',
    iconName: 'Search',
    description: 'Generate Meta tags, analyze keyword density, audit title lengths, and craft schema tags.',
    colorGradient: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'Color Tools',
    slug: 'color-tools',
    name: 'Color Tools',
    iconName: 'Palette',
    description: 'Hex, RGB, HSL converters, contrast checkers, and CSS gradient generators.',
    colorGradient: 'from-violet-500 to-fuchsia-600',
    bgLight: 'bg-violet-50 text-violet-700',
  },
  {
    id: 'Converter Tools',
    slug: 'converter-tools',
    name: 'Converter Tools',
    iconName: 'RefreshCw',
    description: 'Convert length, weight, speed, temperature, and digital storage units accurately.',
    colorGradient: 'from-sky-500 to-indigo-600',
    bgLight: 'bg-sky-50 text-sky-700',
  },
  {
    id: 'Calculator Tools',
    slug: 'calculator-tools',
    name: 'Calculator Tools',
    iconName: 'Calculator',
    description: 'Discount, sales tax, percentage, margin, and loan payment calculators.',
    colorGradient: 'from-lime-500 to-emerald-600',
    bgLight: 'bg-lime-50 text-lime-700',
  },
  {
    id: 'Security Tools',
    slug: 'security-tools',
    name: 'Security Tools',
    iconName: 'ShieldCheck',
    description: 'High-entropy password generator, SHA-256 hash generator, and key strength tester.',
    colorGradient: 'from-red-500 to-pink-600',
    bgLight: 'bg-red-50 text-red-700',
  },
  {
    id: 'Web Tools',
    slug: 'web-tools',
    name: 'Web Tools',
    iconName: 'Globe',
    description: 'QR Code generators, URL encoder/decoders, and web inspector utilities.',
    colorGradient: 'from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50 text-purple-700',
  },
  {
    id: 'Social Media Tools',
    slug: 'social-media-tools',
    name: 'Social Media Tools',
    iconName: 'Share2',
    description: 'Bio generators, caption formatters, hashtag generators, and image sizing helpers.',
    colorGradient: 'from-fuchsia-500 to-rose-600',
    bgLight: 'bg-fuchsia-50 text-fuchsia-700',
  },
  {
    id: 'Video Tools',
    slug: 'video-tools',
    name: 'Video Tools',
    iconName: 'Video',
    description: 'Video metadata inspectors, frame extractors, canvas video croppers and format tools.',
    colorGradient: 'from-purple-600 to-pink-600',
    bgLight: 'bg-purple-50 text-purple-700',
  },
  {
    id: 'Audio Tools',
    slug: 'audio-tools',
    name: 'Audio Tools',
    iconName: 'Music',
    description: 'Audio waveform previewers, frequency analyzers, and Web Audio API tools.',
    colorGradient: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50 text-cyan-700',
  },
  {
    id: 'File Tools',
    slug: 'file-tools',
    name: 'File Tools',
    iconName: 'FolderArchive',
    description: 'Archive inspectors, file checksum calculators, file diff checkers, and metadata tools.',
    colorGradient: 'from-amber-600 to-yellow-500',
    bgLight: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'Generators',
    slug: 'generators',
    name: 'Generators',
    iconName: 'Sparkles',
    description: 'Random data generators, UUIDs, QR codes, passwords, and mock data suites.',
    colorGradient: 'from-indigo-600 to-blue-600',
    bgLight: 'bg-indigo-50 text-indigo-700',
  },
  {
    id: 'Math Tools',
    slug: 'math-tools',
    name: 'Math Tools',
    iconName: 'Calculator',
    description: 'Algebra solvers, matrix calculators, statistical analyzers, and geometry tools.',
    colorGradient: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'Date & Time',
    slug: 'date-time',
    name: 'Date & Time',
    iconName: 'Clock',
    description: 'Timezone converters, date duration calculators, age calculators, and timestamps.',
    colorGradient: 'from-blue-600 to-indigo-600',
    bgLight: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'Productivity',
    slug: 'productivity',
    name: 'Productivity',
    iconName: 'CheckSquare',
    description: 'Timer scratchpads, task checklists, habit trackers, and document layout tools.',
    colorGradient: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50 text-teal-700',
  },
  {
    id: 'Finance Tools',
    slug: 'finance-tools',
    name: 'Finance Tools',
    iconName: 'DollarSign',
    description: 'Mortgage, interest, ROI, NPV, amortization, and financial growth planners.',
    colorGradient: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50 text-green-700',
  },
  {
    id: 'Business Tools',
    slug: 'business-tools',
    name: 'Business Tools',
    iconName: 'Briefcase',
    description: 'Invoice formatters, margin calculators, business planning, and ROI tools.',
    colorGradient: 'from-slate-700 to-slate-900',
    bgLight: 'bg-slate-100 text-slate-800',
  },
  {
    id: 'Health & Fitness',
    slug: 'health-fitness',
    name: 'Health & Fitness',
    iconName: 'Activity',
    description: 'BMI, TDEE, macronutrient ratios, body fat %, and pace calculators.',
    colorGradient: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50 text-rose-700',
  },
  {
    id: 'Education',
    slug: 'education',
    name: 'Education',
    iconName: 'GraduationCap',
    description: 'GPA calculators, test score converters, reading speed analyzers, and study tools.',
    colorGradient: 'from-violet-600 to-indigo-700',
    bgLight: 'bg-violet-50 text-violet-700',
  },
  {
    id: 'Unit Converters',
    slug: 'unit-converters',
    name: 'Unit Converters',
    iconName: 'RefreshCw',
    description: 'Multi-unit conversion engines for physics, geometry, data, and daily metrics.',
    colorGradient: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50 text-sky-700',
  },
];

const INITIAL_TOOLS: Tool[] = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDesc: 'Instant real-time word, character, sentence, paragraph, and reading time counter.',
    description: 'Analyze your text length with live word count, character count, sentence estimation, reading duration, and speaking duration. Completely private in browser.',
    category: 'Text Tools',
    iconName: 'Type',
    isPopular: true,
    isLatest: true,
    usageCount: 142300,
    tags: ['text', 'counter', 'words', 'characters', 'reading time', 'analysis'],
    howToUse: [
      { step: 1, title: 'Paste or type text', desc: 'Enter text into the large editor area.' },
      { step: 2, title: 'View instant metrics', desc: 'Read real-time statistics including words, characters without spaces, sentences, and estimated reading time.' },
      { step: 3, title: 'Copy or Clear', desc: 'Use one-click buttons to copy processed statistics or reset the input.' }
    ],
    faqs: [
      { question: 'Is my text stored or uploaded?', answer: 'No. The entire analysis runs client-side in your web browser JavaScript runtime.' },
      { question: 'Does it support special characters and emojis?', answer: 'Yes! Unicode characters and emojis are counted accurately according to standard text processing.' }
    ]
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Text Case Converter',
    shortDesc: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    description: 'Easily switch string case formatting for programming, copywriting, or formatting clean document headers.',
    category: 'Text Tools',
    iconName: 'ArrowUpDown',
    isPopular: true,
    isLatest: false,
    usageCount: 98120,
    tags: ['text', 'case', 'uppercase', 'camelcase', 'snake_case', 'titlecase'],
    howToUse: [
      { step: 1, title: 'Input your text', desc: 'Paste the string or document you wish to transform.' },
      { step: 2, title: 'Choose target case', desc: 'Click any format button such as UPPERCASE, Title Case, or camelCase.' },
      { step: 3, title: 'Copy transformed text', desc: 'Click "Copy to Clipboard" to use your converted text anywhere.' }
    ],
    faqs: [
      { question: 'What is slug/kebab-case?', answer: 'Kebab-case replaces spaces with hyphens and converts all letters to lowercase, ideal for web URLs.' }
    ]
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Placeholder Generator',
    shortDesc: 'Generate custom dummy text paragraphs, sentences, or words for web designs.',
    description: 'Create realistic placeholder text with custom paragraph counts, optional HTML tags wrapper, and start-with-Lorem options.',
    category: 'Text Tools',
    iconName: 'AlignLeft',
    isPopular: false,
    isLatest: true,
    usageCount: 45200,
    tags: ['text', 'lorem', 'placeholder', 'dummy text', 'generator'],
    howToUse: [
      { step: 1, title: 'Set paragraph count', desc: 'Adjust the slider or input field for desired paragraph count.' },
      { step: 2, title: 'Select options', desc: 'Choose whether to wrap with <p> tags or start with standard "Lorem ipsum dolor...".' },
      { step: 3, title: 'Generate & Copy', desc: 'Copy the generated dummy text with one click.' }
    ],
    faqs: [
      { question: 'Why use Lorem Ipsum?', answer: 'Lorem Ipsum provides a natural distribution of letters without distracting from visual layout design.' }
    ]
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer & Crop',
    shortDesc: 'Resize photos to exact width/height pixels or percentage while maintaining quality.',
    description: 'Fast client-side image resizing powered by HTML5 Canvas. Supports aspect ratio lock, percentage scaling, and high resolution export.',
    category: 'Image Tools',
    iconName: 'Maximize2',
    isPopular: true,
    isLatest: true,
    usageCount: 189400,
    tags: ['image', 'resize', 'crop', 'dimensions', 'aspect ratio', 'photo'],
    howToUse: [
      { step: 1, title: 'Upload image', desc: 'Drag and drop or select an image from your device.' },
      { step: 2, title: 'Set dimensions', desc: 'Enter exact pixel width and height or select a scaling percentage.' },
      { step: 3, title: 'Download resized image', desc: 'Save your newly sized image directly to your device.' }
    ],
    faqs: [
      { question: 'Is my photo uploaded to a server?', answer: 'Never. Your browser processes the photo locally inside memory using Web Canvas APIs.' }
    ]
  },
  {
    id: 'image-format-converter',
    slug: 'image-format-converter',
    name: 'Image Format Converter (PNG / JPG / WEBP)',
    shortDesc: 'Convert PNG, JPG, WEBP, and GIF images instantly right in your browser.',
    description: 'Convert images to WebP for faster website loading speeds, PNG for transparency, or JPEG for smaller file sizes with quality slider controls.',
    category: 'Image Tools',
    iconName: 'FileType',
    isPopular: true,
    isLatest: false,
    usageCount: 162000,
    tags: ['image', 'convert', 'png', 'jpg', 'webp', 'compression'],
    howToUse: [
      { step: 1, title: 'Drop your image', desc: 'Select any image file from your computer.' },
      { step: 2, title: 'Choose format & quality', desc: 'Select target format (WEBP, PNG, JPG) and adjust quality ratio.' },
      { step: 3, title: 'Export', desc: 'Click Download to receive your converted file.' }
    ],
    faqs: [
      { question: 'Which format is best for websites?', answer: 'WebP offers superior compression and visual quality for modern web browsers.' }
    ]
  },
  {
    id: 'color-picker-from-image',
    slug: 'color-picker-from-image',
    name: 'Image Color Palette Extractor',
    shortDesc: 'Upload an image to pick exact pixel colors or extract dominant color palettes.',
    description: 'Extract dominant palette swatches and click anywhere on photos to inspect HEX, RGB, and HSL color values.',
    category: 'Color Tools',
    iconName: 'Pipette',
    isPopular: false,
    isLatest: true,
    usageCount: 54100,
    tags: ['color', 'image', 'palette', 'picker', 'hex', 'rgb'],
    howToUse: [
      { step: 1, title: 'Select an image', desc: 'Upload a banner, photo, or screenshot.' },
      { step: 2, title: 'Hover & click', desc: 'Hover over pixels to inspect colors or review auto-extracted palette cards.' },
      { step: 3, title: 'Copy HEX code', desc: 'Click any color card to copy its HEX value.' }
    ],
    faqs: [
      { question: 'How many colors does it extract?', answer: 'It extracts the 6 top dominant color swatches across your uploaded photo.' }
    ]
  },
  {
    id: 'json-formatter-validator',
    slug: 'json-formatter-validator',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Beautify, minify, validate, and tree-view inspect raw JSON strings.',
    description: 'Format unreadable JSON with custom indentation (2 or 4 spaces), validate syntax errors with line indicators, and minify for API payloads.',
    category: 'Developer Tools',
    iconName: 'FileCode2',
    isPopular: true,
    isLatest: false,
    usageCount: 210500,
    tags: ['json', 'formatter', 'validator', 'beautify', 'minify', 'developer'],
    howToUse: [
      { step: 1, title: 'Paste JSON', desc: 'Paste raw or compressed JSON data into the editor.' },
      { step: 2, title: 'Format or Minify', desc: 'Click "Beautify" to format or "Minify" to strip whitespace.' },
      { step: 3, title: 'Review validation', desc: 'Fix any syntax issues identified with clear error highlights.' }
    ],
    faqs: [
      { question: 'Can large JSON files be processed?', answer: 'Yes, because processing runs in client memory, it handles multi-megabyte JSON payloads seamlessly.' }
    ]
  },
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder & Decoder',
    shortDesc: 'Encode plain text or decode Base64 strings safely in your browser.',
    description: 'Simple and fast Base64 string encoder and decoder supporting UTF-8 special characters and URL-safe Base64 modes.',
    category: 'Developer Tools',
    iconName: 'Binary',
    isPopular: true,
    isLatest: false,
    usageCount: 134200,
    tags: ['base64', 'encode', 'decode', 'developer', 'string', 'utf8'],
    howToUse: [
      { step: 1, title: 'Choose Mode', desc: 'Select Encode or Decode tab.' },
      { step: 2, title: 'Enter input', desc: 'Type or paste the input text.' },
      { step: 3, title: 'Get result', desc: 'Copy the processed Base64 output immediately.' }
    ],
    faqs: [
      { question: 'Is Base64 encryption?', answer: 'No, Base64 is an encoding format, not an encryption protocol.' }
    ]
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    shortDesc: 'Generate random v4 UUIDs in bulk with customizable uppercase & hyphen settings.',
    description: 'Generate cryptographic RFC-compliant Version-4 UUIDs individually or in batch for database keys and system testing.',
    category: 'Developer Tools',
    iconName: 'KeyRound',
    isPopular: false,
    isLatest: true,
    usageCount: 78900,
    tags: ['uuid', 'guid', 'v4', 'random', 'generator', 'developer'],
    howToUse: [
      { step: 1, title: 'Select quantity', desc: 'Choose how many UUIDs to generate (1 to 100).' },
      { step: 2, title: 'Customize format', desc: 'Toggle hyphens or uppercase letters.' },
      { step: 3, title: 'Copy UUIDs', desc: 'Click "Generate" and copy single or all generated UUIDs.' }
    ],
    faqs: [
      { question: 'Are these UUIDs secure?', answer: 'Yes, generated using your browser crypto.getRandomValues API.' }
    ]
  },
  {
    id: 'color-contrast-checker',
    slug: 'color-contrast-checker',
    name: 'Color Contrast Checker (WCAG)',
    shortDesc: 'Test text and background color ratios against WCAG 2.1 AA and AAA standards.',
    description: 'Ensure web accessibility by checking contrast ratios for small text, large text, and UI components in real-time.',
    category: 'Color Tools',
    iconName: 'Eye',
    isPopular: false,
    isLatest: true,
    usageCount: 62400,
    tags: ['color', 'contrast', 'wcag', 'accessibility', 'aa', 'aaa'],
    howToUse: [
      { step: 1, title: 'Select Text Color', desc: 'Pick foreground color or enter HEX code.' },
      { step: 2, title: 'Select Background Color', desc: 'Pick background color.' },
      { step: 3, title: 'Check WCAG score', desc: 'Review pass/fail badges for WCAG AA and AAA accessibility compliance.' }
    ],
    faqs: [
      { question: 'What contrast ratio passes WCAG AA?', answer: 'A minimum ratio of 4.5:1 is required for normal text and 3:1 for large text.' }
    ]
  },
  {
    id: 'hex-rgb-hsl-converter',
    slug: 'hex-rgb-hsl-converter',
    name: 'HEX to RGB / HSL Color Converter',
    shortDesc: 'Convert color codes seamlessly between HEX, RGB, HSL, and HSV formats.',
    description: 'Instant multi-format color converter with visual color picker, alpha transparency support, and CSS code snippet copy.',
    category: 'Color Tools',
    iconName: 'Sparkles',
    isPopular: false,
    isLatest: false,
    usageCount: 88100,
    tags: ['color', 'hex', 'rgb', 'hsl', 'hsv', 'css'],
    howToUse: [
      { step: 1, title: 'Input color code', desc: 'Enter any HEX value like #6366F1 or RGB values.' },
      { step: 2, title: 'Inspect outputs', desc: 'View live synchronized HEX, RGB, HSL, and HSV color strings.' },
      { step: 3, title: 'Copy CSS snippet', desc: 'Click copy next to any format.' }
    ],
    faqs: [
      { question: 'Does it support alpha channels?', answer: 'Yes, 8-digit HEX and RGBA values are fully supported.' }
    ]
  },
  {
    id: 'css-gradient-generator',
    slug: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    shortDesc: 'Create gorgeous linear and radial CSS gradients with multi-stop color controls.',
    description: 'Design smooth background gradients visually, set angles, add color stops, and copy production CSS declarations instantly.',
    category: 'Color Tools',
    iconName: 'Layers',
    isPopular: true,
    isLatest: false,
    usageCount: 124000,
    tags: ['css', 'gradient', 'linear', 'radial', 'design', 'generator'],
    howToUse: [
      { step: 1, title: 'Choose type & angle', desc: 'Select Linear or Radial and adjust the angle dial.' },
      { step: 2, title: 'Set color stops', desc: 'Add or adjust gradient color stops on the interactive bar.' },
      { step: 3, title: 'Copy CSS', desc: 'Copy the CSS `background: linear-gradient(...)` snippet.' }
    ],
    faqs: [
      { question: 'Is the generated CSS compatible with all browsers?', answer: 'Yes, standard modern CSS gradient syntax is generated.' }
    ]
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'SEO Meta Tag Generator',
    shortDesc: 'Generate Open Graph, Twitter Cards, and search title/description meta tags.',
    description: 'Craft perfect meta tags for Google Search, Facebook, LinkedIn, and X/Twitter previews with live search snippet simulator.',
    category: 'SEO Tools',
    iconName: 'Search',
    isPopular: true,
    isLatest: false,
    usageCount: 94300,
    tags: ['seo', 'meta tags', 'open graph', 'twitter card', 'html', 'generator'],
    howToUse: [
      { step: 1, title: 'Enter page details', desc: 'Type site title, description, URL, and OG image link.' },
      { step: 2, title: 'Preview search snippet', desc: 'Check Google title and description character count limits.' },
      { step: 3, title: 'Copy HTML code', desc: 'Copy the block of meta tags to insert into your website header.' }
    ],
    faqs: [
      { question: 'What is ideal meta description length?', answer: 'Between 120 and 160 characters for optimal rendering on desktop and mobile.' }
    ]
  },
  {
    id: 'keyword-density-analyzer',
    slug: 'keyword-density-analyzer',
    name: 'Keyword Density Analyzer',
    shortDesc: 'Analyze word frequency and keyword percentages in blog posts or landing pages.',
    description: 'Discover single-word, 2-word, and 3-word phrase frequencies in any text to optimize SEO keyword density.',
    category: 'SEO Tools',
    iconName: 'BarChart3',
    isPopular: false,
    isLatest: true,
    usageCount: 41200,
    tags: ['seo', 'keyword', 'density', 'frequency', 'content', 'optimization'],
    howToUse: [
      { step: 1, title: 'Paste article text', desc: 'Paste raw article content.' },
      { step: 2, title: 'Run analysis', desc: 'View top 1-word, 2-word, and 3-word phrase tables with percentage distributions.' },
      { step: 3, title: 'Refine content', desc: 'Adjust overused keywords to avoid search keyword stuffing penalties.' }
    ],
    faqs: [
      { question: 'Does it filter common stop words?', answer: 'Yes, standard stop words like "the", "and", "is" can be toggled on/off.' }
    ]
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Universal Unit Converter',
    shortDesc: 'Convert length, mass, temperature, area, volume, and data storage metrics.',
    description: 'Comprehensive multi-unit converter supporting meters to feet, kilograms to pounds, Celsius to Fahrenheit, megabytes to gigabytes, and more.',
    category: 'Converter Tools',
    iconName: 'RefreshCw',
    isPopular: true,
    isLatest: false,
    usageCount: 154000,
    tags: ['converter', 'units', 'length', 'weight', 'temperature', 'storage'],
    howToUse: [
      { step: 1, title: 'Select category', desc: 'Choose Length, Weight, Temperature, or Digital Storage.' },
      { step: 2, title: 'Enter value & units', desc: 'Select "From" and "To" units.' },
      { step: 3, title: 'Instant result', desc: 'Read precise converted calculation.' }
    ],
    faqs: [
      { question: 'How precise are conversions?', answer: 'Calculations use standard high-precision floating-point arithmetic up to 8 decimal places.' }
    ]
  },
  {
    id: 'discount-tax-calculator',
    slug: 'discount-tax-calculator',
    name: 'Discount & Sales Tax Calculator',
    shortDesc: 'Calculate final prices, savings, tax amounts, and percentage discounts.',
    description: 'Quickly compute final checkout totals after discounts and regional sales taxes with clear itemized breakdown charts.',
    category: 'Calculator Tools',
    iconName: 'Percent',
    isPopular: true,
    isLatest: false,
    usageCount: 112000,
    tags: ['calculator', 'discount', 'tax', 'price', 'savings', 'percent'],
    howToUse: [
      { step: 1, title: 'Enter original price', desc: 'Type initial price tag amount.' },
      { step: 2, title: 'Enter discount & tax rates', desc: 'Specify discount percentage and sales tax rate.' },
      { step: 3, title: 'View total saved', desc: 'Read exact final price and total saved money.' }
    ],
    faqs: [
      { question: 'Does discount apply before or after tax?', answer: 'The calculator applies the discount first to the original price, then computes sales tax on the discounted subtotal.' }
    ]
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Strong Password & Key Generator',
    shortDesc: 'Generate secure, high-entropy passwords with custom length and character sets.',
    description: 'Create cryptographically strong random passwords with numbers, uppercase, lowercase, and special symbols.',
    category: 'Security Tools',
    iconName: 'Lock',
    isPopular: true,
    isLatest: true,
    usageCount: 228000,
    tags: ['security', 'password', 'generator', 'crypto', 'strong', 'privacy'],
    howToUse: [
      { step: 1, title: 'Choose length', desc: 'Adjust password length slider (8 to 64 characters).' },
      { step: 2, title: 'Select character types', desc: 'Toggle uppercase, lowercase, numbers, and symbols.' },
      { step: 3, title: 'Copy password', desc: 'Click Copy to save your secure password.' }
    ],
    faqs: [
      { question: 'Are these passwords generated locally?', answer: 'Yes! Generated using browser Window.crypto API without network transmissions.' }
    ]
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator (SHA-256 / SHA-512 / MD5)',
    shortDesc: 'Compute cryptographic message digests (SHA-256, SHA-1, SHA-512) for text.',
    description: 'Calculate cryptographic hashes using Web Crypto API to verify checksums or sanitize passwords client-side.',
    category: 'Security Tools',
    iconName: 'ShieldAlert',
    isPopular: false,
    isLatest: false,
    usageCount: 71000,
    tags: ['hash', 'sha256', 'sha512', 'crypto', 'security', 'digest'],
    howToUse: [
      { step: 1, title: 'Input string', desc: 'Type or paste the input message.' },
      { step: 2, title: 'View computed hashes', desc: 'Read instant SHA-256, SHA-384, and SHA-512 values.' },
      { step: 3, title: 'Copy hash', desc: 'Click to copy the desired hash hex digest.' }
    ],
    faqs: [
      { question: 'Why SHA-256 instead of MD5?', answer: 'SHA-256 is collision-resistant and modern standard for cryptographic verification.' }
    ]
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder',
    shortDesc: 'Encode query parameters into URL component strings or decode percent-encoded URLs.',
    description: 'Safely format query params for web links using encodeURIComponent or decode complex tracking URLs.',
    category: 'Web Tools',
    iconName: 'Link',
    isPopular: true,
    isLatest: false,
    usageCount: 148000,
    tags: ['url', 'encode', 'decode', 'uri', 'web', 'developer'],
    howToUse: [
      { step: 1, title: 'Select Encode or Decode', desc: 'Choose your desired operation.' },
      { step: 2, title: 'Paste URL or query', desc: 'Enter the raw or percent-encoded link.' },
      { step: 3, title: 'Copy result', desc: 'Copy formatted output.' }
    ],
    faqs: [
      { question: 'What does encodeURIComponent handle?', answer: 'It converts characters like spaces, ?, &, and = into percent-encoded equivalents like %20, %3F.' }
    ]
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDesc: 'Create customizable vector QR codes for websites, WiFi, emails, and contact info.',
    description: 'Generate high-resolution QR codes instantly. Customize foreground and background colors and download as PNG image.',
    category: 'Web Tools',
    iconName: 'QrCode',
    isPopular: true,
    isLatest: true,
    usageCount: 205000,
    tags: ['qr code', 'generator', 'wifi', 'url', 'web', 'download'],
    howToUse: [
      { step: 1, title: 'Enter URL or Text', desc: 'Type website link or text.' },
      { step: 2, title: 'Customize colors', desc: 'Select custom dark/light color options.' },
      { step: 3, title: 'Download QR PNG', desc: 'Click Download to receive your QR image.' }
    ],
    faqs: [
      { question: 'Do these QR codes expire?', answer: 'No, static QR codes directly embed the string and never expire.' }
    ]
  },
  {
    id: 'markdown-editor-previewer',
    slug: 'markdown-editor-previewer',
    name: 'Markdown Editor & Live Previewer',
    shortDesc: 'Write Markdown with real-time rendered HTML preview, word count, and HTML export.',
    description: 'Clean side-by-side Markdown editor with live preview rendering, headings, lists, tables, and HTML source export.',
    category: 'Text Tools',
    iconName: 'FileText',
    isPopular: false,
    isLatest: true,
    usageCount: 52000,
    tags: ['markdown', 'editor', 'preview', 'html', 'writer', 'text'],
    howToUse: [
      { step: 1, title: 'Write Markdown', desc: 'Enter markdown code on the left pane.' },
      { step: 2, title: 'Inspect Live Preview', desc: 'View rendered HTML instantly on the right pane.' },
      { step: 3, title: 'Export HTML or MD', desc: 'Copy rendered HTML or original Markdown.' }
    ],
    faqs: [
      { question: 'Does it support standard Markdown syntax?', answer: 'Yes, headers (#), bold (**), lists, links, code blocks, and blockquotes.' }
    ]
  },
  {
    id: 'pdf-page-inspector',
    slug: 'pdf-page-inspector',
    name: 'PDF Inspector & Text Extractor',
    shortDesc: 'Inspect PDF file details, count total pages, and preview document metadata.',
    description: 'Inspect local PDF files directly in browser memory without sending private documents to any external server.',
    category: 'PDF Tools',
    iconName: 'FileCheck',
    isPopular: true,
    isLatest: true,
    usageCount: 93400,
    tags: ['pdf', 'inspector', 'pages', 'metadata', 'document', 'privacy'],
    howToUse: [
      { step: 1, title: 'Select PDF file', desc: 'Drop your PDF into the file area.' },
      { step: 2, title: 'Inspect metadata', desc: 'View file size, page count, document title, and creation timestamp.' },
      { step: 3, title: 'Copy extracted summary', desc: 'Copy file summary report.' }
    ],
    faqs: [
      { question: 'Is my confidential PDF uploaded?', answer: 'No! The file is parsed purely inside your browser using FileReader and ArrayBuffer APIs.' }
    ]
  }
];

// Combine all category tools
const ALL_RAW_TOOLS = [
  ...INITIAL_TOOLS,
  ...TEXT_TOOLS,
  ...IMAGE_TOOLS,
  ...PDF_TOOLS,
  ...DEVELOPER_TOOLS,
  ...SEO_TOOLS,
  ...COLOR_TOOLS,
  ...CONVERTER_TOOLS,
  ...CALCULATOR_TOOLS,
  ...SECURITY_TOOLS,
  ...WEB_TOOLS,
  ...ALL_GENERATED_TOOLS,
];

// Strict Auto-deduplication by slug
const seenSlugs = new Set<string>();
export const TOOLS: Tool[] = ALL_RAW_TOOLS.filter(tool => {
  if (seenSlugs.has(tool.slug)) {
    return false;
  }
  seenSlugs.add(tool.slug);
  return true;
});

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: 'Public Media Tool is my daily bookmark. Having JSON formatters, Base64, and image converters running 100% locally with zero server upload gives me complete peace of mind with client data.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Digital Content Strategist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'The Word Counter and Keyword Density tools are blazingly fast. No ads popping up, no mandatory login required, just clean and powerful tools that work instantly.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'UI/UX Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'The CSS Gradient Generator and WCAG Contrast Checker are permanent fixtures in my design workflow. The light, vibrant UI feels so modern and refreshing!',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Miller',
    role: 'Cybersecurity Analyst',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Finding a tool site that doesn’t silently phone home with input data is rare. Public Media Tool does all cryptographic hashing and password generation strictly in-browser.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'Is my data uploaded to any server?',
    answer: 'No, absolutely not. 100% of the tools on Public Media Tool run entirely inside your browser using JavaScript, Web APIs, and Canvas. Your text, photos, and files never touch a server.',
  },
  {
    question: 'Do I need an account to use these tools?',
    answer: 'No account or signup is required. All tools are immediately accessible and free forever.',
  },
  {
    question: 'Is Public Media Tool really 100% free forever?',
    answer: 'Yes! All tools are free with zero subscription fees, hidden paywalls, or limits on usage volume.',
  },
  {
    question: 'How many tools are available on the platform?',
    answer: 'We feature 500+ high-performance client-side tools across 10 main categories, with instant browser calculation.',
  },
  {
    question: 'Can I use these tools on mobile devices?',
    answer: 'Yes! All tools are fully responsive and work seamlessly on mobile, tablet, and desktop browsers.',
  },
  {
    question: 'Can I suggest or request a new tool?',
    answer: 'We love user feedback! You can submit tool requests directly using our Contact form.',
  },
];
