import { Tool } from '../types';

export const TEXT_TOOLS: Tool[] = [
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
    id: 'text-reverser',
    slug: 'text-reverser',
    name: 'Text & String Reverser',
    shortDesc: 'Reverse letters, words, or full paragraphs instantly with client-side speed.',
    description: 'Reverse character order, word sequences, or line sequences for cryptography, puzzle solving, or text manipulation.',
    category: 'Text Tools',
    iconName: 'RotateCcw',
    usageCount: 31200,
    tags: ['text', 'reverse', 'flip', 'string', 'utility'],
    howToUse: [
      { step: 1, title: 'Paste text', desc: 'Enter string in editor.' },
      { step: 2, title: 'Select mode', desc: 'Choose Reverse Letters, Words, or Lines.' },
      { step: 3, title: 'Copy output', desc: 'Copy reversed string instantly.' }
    ],
    faqs: [{ question: 'Does it preserve special characters?', answer: 'Yes, Unicode and emojis are cleanly handled.' }]
  },
  {
    id: 'duplicate-line-remover',
    slug: 'duplicate-line-remover',
    name: 'Duplicate Line Remover',
    shortDesc: 'Deduplicate list lines, strip duplicate rows, and clean up raw text data.',
    description: 'Clean up large data lists, emails, or logs by removing repeated identical lines automatically.',
    category: 'Text Tools',
    iconName: 'Scissors',
    usageCount: 64100,
    tags: ['text', 'deduplicate', 'list', 'cleaner', 'lines'],
    howToUse: [
      { step: 1, title: 'Paste list', desc: 'Paste raw list with duplicates.' },
      { step: 2, title: 'Set options', desc: 'Choose case sensitivity or trim whitespace.' },
      { step: 3, title: 'Get unique list', desc: 'Copy deduplicated lines.' }
    ],
    faqs: [{ question: 'Is ordering preserved?', answer: 'Yes, the first occurrence of each unique line is preserved.' }]
  },
  {
    id: 'text-sorter-alphabetical',
    slug: 'text-sorter-alphabetical',
    name: 'Alphabetical Text & List Sorter',
    shortDesc: 'Sort list items alphabetically (A-Z, Z-A), numerically, or by line length.',
    description: 'Order strings, keyword lists, or CSV rows alphabetically or numerically with custom delimiter options.',
    category: 'Text Tools',
    iconName: 'ArrowUpDown',
    usageCount: 48900,
    tags: ['text', 'sort', 'alphabetical', 'numerical', 'list'],
    howToUse: [
      { step: 1, title: 'Enter lines', desc: 'Paste un-ordered list items.' },
      { step: 2, title: 'Click Sort Order', desc: 'Choose A-Z, Z-A, or Length sort.' },
      { step: 3, title: 'Copy sorted result', desc: 'Copy formatted list.' }
    ],
    faqs: [{ question: 'Can it sort numbers correctly?', answer: 'Yes, natural numerical sorting handles numbers like 2, 10, 20 correctly.' }]
  },
  {
    id: 'find-and-replace-text',
    slug: 'find-and-replace-text',
    name: 'Find & Replace Text Utility',
    shortDesc: 'Find and replace target keywords or patterns across paragraphs with case options.',
    description: 'Batch replace words, characters, or RegEx patterns across articles or code blocks client-side.',
    category: 'Text Tools',
    iconName: 'Search',
    usageCount: 52300,
    tags: ['text', 'replace', 'find', 'regex', 'utility'],
    howToUse: [
      { step: 1, title: 'Paste text', desc: 'Paste content into the box.' },
      { step: 2, title: 'Enter find & replace terms', desc: 'Specify keyword to replace and target replacement.' },
      { step: 3, title: 'Execute', desc: 'Copy updated text.' }
    ],
    faqs: [{ question: 'Does it support RegEx?', answer: 'Yes, toggle RegEx mode to replace advanced matching patterns.' }]
  },
  {
    id: 'string-length-calculator',
    slug: 'string-length-calculator',
    name: 'String Length & Byte Counter',
    shortDesc: 'Calculate string character length, byte count in UTF-8, and word statistics.',
    description: 'Inspect exact byte payload size and character count for buffer allocations, database columns, and API parameters.',
    category: 'Text Tools',
    iconName: 'FileText',
    usageCount: 29800,
    tags: ['string', 'length', 'byte count', 'utf8', 'text'],
    howToUse: [
      { step: 1, title: 'Input string', desc: 'Type or paste input.' },
      { step: 2, title: 'Inspect bytes', desc: 'View live UTF-8 byte size.' },
      { step: 3, title: 'Copy metric', desc: 'Copy metrics.' }
    ],
    faqs: [{ question: 'Why does byte count differ from character count?', answer: 'Multi-byte characters like emojis use 3 or 4 bytes in UTF-8 encoding.' }]
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'URL Slug Generator',
    shortDesc: 'Convert article titles into clean, SEO-friendly web URL slugs.',
    description: 'Transform headlines with special characters into clean lowercase hyphenated URL slugs for web publishing.',
    category: 'Text Tools',
    iconName: 'Link',
    usageCount: 41200,
    tags: ['slug', 'url', 'seo', 'text', 'generator'],
    howToUse: [
      { step: 1, title: 'Enter headline', desc: 'Type article or page title.' },
      { step: 2, title: 'Auto sanitize', desc: 'Accents and punctuation are stripped.' },
      { step: 3, title: 'Copy slug', desc: 'Copy clean URL slug.' }
    ],
    faqs: [{ question: 'Are accent marks removed?', answer: 'Yes, accents like café are converted to clean ASCII like cafe.' }]
  },
  {
    id: 'text-trimmer-cleaner',
    slug: 'text-trimmer-cleaner',
    name: 'Whitespace & Tab Trimmer',
    shortDesc: 'Strip leading/trailing spaces, extra tabs, and consecutive empty lines.',
    description: 'Clean messily formatted code or copied text by collapsing extra spaces and removing trailing whitespace.',
    category: 'Text Tools',
    iconName: 'Scissors',
    usageCount: 38900,
    tags: ['whitespace', 'trimmer', 'cleaner', 'text', 'format'],
    howToUse: [
      { step: 1, title: 'Paste text', desc: 'Enter text with extra spaces.' },
      { step: 2, title: 'Select clean rule', desc: 'Choose trim spaces or collapse empty lines.' },
      { step: 3, title: 'Copy result', desc: 'Copy pristine text.' }
    ],
    faqs: [{ question: 'Does it remove tabs?', answer: 'You can choose to replace tabs with 2 or 4 spaces.' }]
  },
  {
    id: 'text-to-binary-converter',
    slug: 'text-to-binary-converter',
    name: 'Text to Binary Converter',
    shortDesc: 'Convert plain text strings into 8-bit binary 0s and 1s.',
    description: 'Translate English text into binary code representation for computer science study or secret encoding.',
    category: 'Text Tools',
    iconName: 'Binary',
    usageCount: 57400,
    tags: ['text', 'binary', 'converter', 'encoder', '01'],
    howToUse: [
      { step: 1, title: 'Type message', desc: 'Enter any text.' },
      { step: 2, title: 'View binary', desc: 'Read 8-bit binary output.' },
      { step: 3, title: 'Copy binary', desc: 'Copy binary string.' }
    ],
    faqs: [{ question: 'Is each character 8 bits?', answer: 'Standard ASCII characters map to 8-bit byte sequences.' }]
  },
  {
    id: 'binary-to-text-converter',
    slug: 'binary-to-text-converter',
    name: 'Binary to Text Converter',
    shortDesc: 'Decode binary 0s and 1s back into readable English text.',
    description: 'Convert 8-bit binary code streams back into ASCII plain text instantly.',
    category: 'Text Tools',
    iconName: 'Binary',
    usageCount: 53100,
    tags: ['binary', 'text', 'decoder', 'converter', '01'],
    howToUse: [
      { step: 1, title: 'Paste binary', desc: 'Paste space-separated binary code.' },
      { step: 2, title: 'Decode', desc: 'Read decoded text.' },
      { step: 3, title: 'Copy text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'What if binary is malformed?', answer: 'Invalid bits are highlighted cleanly.' }]
  },
  {
    id: 'text-to-hex-converter',
    slug: 'text-to-hex-converter',
    name: 'Text to Hexadecimal Converter',
    shortDesc: 'Convert plain text characters into hex bytes (e.g. 0x48 0x65 0x6C 0x6C 0x6F).',
    description: 'Encode text strings into hexadecimal representation for debugging or low-level byte analysis.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 34100,
    tags: ['text', 'hex', 'converter', 'encoder', 'hexadecimal'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type string.' },
      { step: 2, title: 'Get Hex', desc: 'View hex byte array.' },
      { step: 3, title: 'Copy Hex', desc: 'Copy result.' }
    ],
    faqs: [{ question: 'Can I choose prefix?', answer: 'Yes, toggle 0x prefix or spaces.' }]
  },
  {
    id: 'hex-to-text-converter',
    slug: 'hex-to-text-converter',
    name: 'Hexadecimal to Text Converter',
    shortDesc: 'Decode hex byte codes back into readable text characters.',
    description: 'Convert hexadecimal string streams back into plain text UTF-8 characters.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 32900,
    tags: ['hex', 'text', 'decoder', 'converter', 'hexadecimal'],
    howToUse: [
      { step: 1, title: 'Paste Hex string', desc: 'Paste hex codes.' },
      { step: 2, title: 'Decode string', desc: 'Read decoded text.' },
      { step: 3, title: 'Copy output', desc: 'Copy text.' }
    ],
    faqs: [{ question: 'Does it support 0x notation?', answer: 'Yes, handles 0x, spaces, or raw hex sequences.' }]
  },
  {
    id: 'text-to-octal-converter',
    slug: 'text-to-octal-converter',
    name: 'Text to Octal Converter',
    shortDesc: 'Convert plain text into base-8 octal representation.',
    description: 'Translate text strings into octal code values for computing and mathematical exercises.',
    category: 'Text Tools',
    iconName: 'Binary',
    usageCount: 19400,
    tags: ['text', 'octal', 'converter', 'base8'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type string.' },
      { step: 2, title: 'View Octal', desc: 'Read octal sequence.' },
      { step: 3, title: 'Copy result', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'What is base 8?', answer: 'Octal uses digits 0-7 to represent byte values.' }]
  },
  {
    id: 'text-to-morse-code',
    slug: 'text-to-morse-code',
    name: 'Morse Code Translator',
    shortDesc: 'Translate English text into dots and dashes with audio playback beep.',
    description: 'Convert text into Morse code (. and -) with interactive browser audio oscillator beep playback.',
    category: 'Text Tools',
    iconName: 'Radio',
    usageCount: 68100,
    tags: ['morse code', 'translator', 'audio', 'text', 'dots'],
    howToUse: [
      { step: 1, title: 'Type message', desc: 'Enter message.' },
      { step: 2, title: 'View Morse', desc: 'Read dots and dashes.' },
      { step: 3, title: 'Play Audio Beep', desc: 'Listen to Morse sound.' }
    ],
    faqs: [{ question: 'Is audio generated client-side?', answer: 'Yes, uses Web Audio API oscillator.' }]
  },
  {
    id: 'morse-code-to-text',
    slug: 'morse-code-to-text',
    name: 'Morse Code to Text Decoder',
    shortDesc: 'Decode dots (.) and dashes (-) back into English text.',
    description: 'Translate Morse code messages separated by spaces back into readable text.',
    category: 'Text Tools',
    iconName: 'Radio',
    usageCount: 45100,
    tags: ['morse code', 'decoder', 'text', 'translator'],
    howToUse: [
      { step: 1, title: 'Paste Morse', desc: 'Paste dots and dashes.' },
      { step: 2, title: 'Decode', desc: 'Read decoded message.' },
      { step: 3, title: 'Copy', desc: 'Copy decoded text.' }
    ],
    faqs: [{ question: 'How are letters separated?', answer: 'Letters are separated by spaces, words by slash /.' }]
  },
  {
    id: 'rot13-cipher-encoder',
    slug: 'rot13-cipher-encoder',
    name: 'ROT13 Cipher Encoder & Decoder',
    shortDesc: 'Obfuscate text using 13-position letter rotation cipher.',
    description: 'Rotate alphabet letters by 13 positions to hide spoilers or obfuscate plain text.',
    category: 'Text Tools',
    iconName: 'Lock',
    usageCount: 38200,
    tags: ['rot13', 'cipher', 'encoder', 'decoder', 'text'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type string.' },
      { step: 2, title: 'Auto rotate', desc: 'ROT13 applies instantly.' },
      { step: 3, title: 'Copy', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Is ROT13 symmetric?', answer: 'Yes, running ROT13 twice restores original text.' }]
  },
  {
    id: 'caesar-cipher-tool',
    slug: 'caesar-cipher-tool',
    name: 'Caesar Cipher Encoder & Decoder',
    shortDesc: 'Shift alphabet characters by custom key shift values (1-25).',
    description: 'Classic Caesar cipher tool to encode or decode historical shift ciphers with custom keys.',
    category: 'Text Tools',
    iconName: 'Lock',
    usageCount: 51200,
    tags: ['caesar cipher', 'shift', 'cipher', 'encoder', 'decoder'],
    howToUse: [
      { step: 1, title: 'Set Shift Key', desc: 'Choose shift count (e.g. 3).' },
      { step: 2, title: 'Enter text', desc: 'Type string.' },
      { step: 3, title: 'Get Cipher', desc: 'Copy shifted text.' }
    ],
    faqs: [{ question: 'Does it affect numbers?', answer: 'Only alphabetic letters A-Z are shifted by default.' }]
  },
  {
    id: 'zalgo-glitch-text-generator',
    slug: 'zalgo-glitch-text-generator',
    name: 'Zalgo Glitch Text Generator',
    shortDesc: 'Generate creepy corrupted glitch text with combining diacritics.',
    description: 'Add stacked combining mark unicode accents to create scary glitch text for social media.',
    category: 'Text Tools',
    iconName: 'Sparkles',
    usageCount: 84300,
    tags: ['zalgo', 'glitch text', 'creepy', 'generator', 'unicode'],
    howToUse: [
      { step: 1, title: 'Enter normal text', desc: 'Type headline.' },
      { step: 2, title: 'Set glitch intensity', desc: 'Adjust mini/max slider.' },
      { step: 3, title: 'Copy Zalgo', desc: 'Copy corrupted text.' }
    ],
    faqs: [{ question: 'Will glitch text paste on Discord/X?', answer: 'Yes, standard Unicode combining characters work across most platforms.' }]
  },
  {
    id: 'upside-down-text-generator',
    slug: 'upside-down-text-generator',
    name: 'Upside Down Text Converter',
    shortDesc: 'Flip text upside down (uʍop ǝpısdn) for fun posts and captions.',
    description: 'Map standard ASCII characters to inverted Unicode upside-down character equivalents.',
    category: 'Text Tools',
    iconName: 'RotateCcw',
    usageCount: 61900,
    tags: ['upside down', 'flip text', 'unicode', 'fun', 'generator'],
    howToUse: [
      { step: 1, title: 'Type text', desc: 'Enter sentence.' },
      { step: 2, title: 'Auto flip', desc: 'Read upside-down text.' },
      { step: 3, title: 'Copy flipped text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it flip numbers too?', answer: 'Yes, inverted digit mappings are included.' }]
  },
  {
    id: 'text-diff-checker',
    slug: 'text-diff-checker',
    name: 'Text Difference & Diff Checker',
    shortDesc: 'Compare two text blocks side-by-side to highlight added/removed lines.',
    description: 'Inspect differences between two text documents or code snippets with highlighted line diffs.',
    category: 'Text Tools',
    iconName: 'FileText',
    usageCount: 71200,
    tags: ['diff', 'compare', 'text', 'checker', 'side by side'],
    howToUse: [
      { step: 1, title: 'Paste original text', desc: 'Enter left document.' },
      { step: 2, title: 'Paste modified text', desc: 'Enter right document.' },
      { step: 3, title: 'View highlights', desc: 'Inspect additions and removals.' }
    ],
    faqs: [{ question: 'Is comparison instant?', answer: 'Yes, client-side diffing computes within milliseconds.' }]
  },
  {
    id: 'line-number-adder',
    slug: 'line-number-adder',
    name: 'Line Number Adder',
    shortDesc: 'Add sequential line numbers (1., 2., 3.) or custom prefixes to raw text.',
    description: 'Format raw code or lists with custom numbered prefixes, padded zeros, or line markers.',
    category: 'Text Tools',
    iconName: 'ListOrdered',
    usageCount: 31000,
    tags: ['line numbers', 'prefix', 'text', 'format', 'list'],
    howToUse: [
      { step: 1, title: 'Paste lines', desc: 'Enter unnumbered list.' },
      { step: 2, title: 'Select format', desc: 'Choose 01. or 1) style.' },
      { step: 3, title: 'Copy output', desc: 'Copy numbered text.' }
    ],
    faqs: [{ question: 'Can I start from custom number?', answer: 'Yes, specify start index like 10.' }]
  },
  {
    id: 'line-wrapper-formatter',
    slug: 'line-wrapper-formatter',
    name: 'Line Length Wrapper',
    shortDesc: 'Wrap text lines at fixed character column widths (e.g. 80 chars).',
    description: 'Hard-wrap paragraph text at exact character column limits for plain text emails or code comments.',
    category: 'Text Tools',
    iconName: 'AlignLeft',
    usageCount: 22400,
    tags: ['line wrap', 'column width', 'text', 'formatter'],
    howToUse: [
      { step: 1, title: 'Set column width', desc: 'Enter max width like 80.' },
      { step: 2, title: 'Paste text', desc: 'Enter paragraphs.' },
      { step: 3, title: 'Copy wrapped text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it split words mid-way?', answer: 'No, line breaks occur cleanly at word boundaries.' }]
  },
  {
    id: 'paragraph-counter-analyzer',
    slug: 'paragraph-counter-analyzer',
    name: 'Paragraph Structure Analyzer',
    shortDesc: 'Count total paragraphs, average paragraph length, and structural flow.',
    description: 'Analyze document readability structure with detailed paragraph count metrics.',
    category: 'Text Tools',
    iconName: 'AlignLeft',
    usageCount: 18900,
    tags: ['paragraph', 'counter', 'structure', 'text', 'analysis'],
    howToUse: [
      { step: 1, title: 'Paste article', desc: 'Enter full text.' },
      { step: 2, title: 'View paragraph stats', desc: 'Read average words per paragraph.' },
      { step: 3, title: 'Optimize flow', desc: 'Adjust long paragraphs.' }
    ],
    faqs: [{ question: 'How are paragraphs separated?', answer: 'By double newline line breaks.' }]
  },
  {
    id: 'comma-separated-list-generator',
    slug: 'comma-separated-list-generator',
    name: 'Comma-Separated List Generator',
    shortDesc: 'Convert newlines into comma-separated CSV lists or custom delimiters.',
    description: 'Convert multiline items into single line comma-separated lists with optional quotes.',
    category: 'Text Tools',
    iconName: 'List',
    usageCount: 49800,
    tags: ['list', 'comma separated', 'csv', 'delimiter', 'converter'],
    howToUse: [
      { step: 1, title: 'Paste lines', desc: 'Enter items on separate lines.' },
      { step: 2, title: 'Choose delimiter', desc: 'Select comma, pipe, or semicolon.' },
      { step: 3, title: 'Copy single line', desc: 'Copy formatted string.' }
    ],
    faqs: [{ question: 'Can I add quotes around items?', answer: 'Yes, toggle single or double quote wrappers.' }]
  },
  {
    id: 'list-to-json-array',
    slug: 'list-to-json-array',
    name: 'Text List to JSON Array',
    shortDesc: 'Convert plain text lines into a formatted JSON string array ["item1", "item2"].',
    description: 'Instantly convert multiline lists into valid JavaScript/JSON string arrays for programming.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 58200,
    tags: ['json', 'array', 'list', 'converter', 'developer'],
    howToUse: [
      { step: 1, title: 'Paste items', desc: 'Enter items on new lines.' },
      { step: 2, title: 'Auto convert', desc: 'JSON array is formatted.' },
      { step: 3, title: 'Copy JSON array', desc: 'Copy array snippet.' }
    ],
    faqs: [{ question: 'Does it handle numbers?', answer: 'Optionally parse numbers as numeric types instead of strings.' }]
  },
  {
    id: 'json-array-to-list',
    slug: 'json-array-to-list',
    name: 'JSON Array to Text List Converter',
    shortDesc: 'Extract JSON string arrays into clean plain text lines.',
    description: 'Unpack JSON string arrays back into multiline text lists for easy reading.',
    category: 'Text Tools',
    iconName: 'FileText',
    usageCount: 39100,
    tags: ['json', 'list', 'text', 'converter', 'array'],
    howToUse: [
      { step: 1, title: 'Paste JSON array', desc: 'Paste ["a", "b"].' },
      { step: 2, title: 'Extract lines', desc: 'View plain text list.' },
      { step: 3, title: 'Copy items', desc: 'Copy clean list.' }
    ],
    faqs: [{ question: 'Does it work with object arrays?', answer: 'You can select target object property key to extract.' }]
  },
  {
    id: 'camel-case-converter',
    slug: 'camel-case-converter',
    name: 'camelCase & PascalCase Converter',
    shortDesc: 'Convert spaces and hyphens into programming camelCase or PascalCase.',
    description: 'Format code variable names into clean camelCase or PascalCase identifiers.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 41200,
    tags: ['camelcase', 'pascalcase', 'code', 'variable', 'converter'],
    howToUse: [
      { step: 1, title: 'Enter title', desc: 'Type plain text string.' },
      { step: 2, title: 'Click format', desc: 'Choose camelCase or PascalCase.' },
      { step: 3, title: 'Copy code name', desc: 'Copy variable.' }
    ],
    faqs: [{ question: 'What is PascalCase?', answer: 'PascalCase capitalizes the first letter of every word including the first.' }]
  },
  {
    id: 'snake-case-converter',
    slug: 'snake-case-converter',
    name: 'snake_case & CONSTANT_CASE Converter',
    shortDesc: 'Convert text into lowercase snake_case or uppercase CONSTANT_CASE.',
    description: 'Format database column names and configuration constants into snake_case.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 38400,
    tags: ['snake_case', 'constant_case', 'database', 'format'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type string.' },
      { step: 2, title: 'Select format', desc: 'Choose snake_case or CONSTANT_CASE.' },
      { step: 3, title: 'Copy output', desc: 'Copy string.' }
    ],
    faqs: [{ question: 'Where is CONSTANT_CASE used?', answer: 'In environment variables and global programming constants.' }]
  },
  {
    id: 'kebab-case-converter',
    slug: 'kebab-case-converter',
    name: 'kebab-case Header Converter',
    shortDesc: 'Convert spaces and underscores into lowercase hyphenated kebab-case.',
    description: 'Format CSS class names and URL paths cleanly with hyphenated kebab-case.',
    category: 'Text Tools',
    iconName: 'Link',
    usageCount: 31800,
    tags: ['kebab-case', 'hyphen', 'css', 'url', 'format'],
    howToUse: [
      { step: 1, title: 'Paste title', desc: 'Enter text.' },
      { step: 2, title: 'Format', desc: 'Read kebab-case output.' },
      { step: 3, title: 'Copy', desc: 'Copy result.' }
    ],
    faqs: [{ question: 'Does it strip symbols?', answer: 'Yes, non-alphanumeric characters are converted to hyphens.' }]
  },
  {
    id: 'title-case-converter',
    slug: 'title-case-converter',
    name: 'Title Case Capitalizer',
    shortDesc: 'Capitalize headlines following APA, Chicago, or Wikipedia title rules.',
    description: 'Auto-capitalize book titles and blog headlines while keeping minor words lowercase.',
    category: 'Text Tools',
    iconName: 'Type',
    usageCount: 47200,
    tags: ['title case', 'headline', 'apa', 'chicago', 'capitalizer'],
    howToUse: [
      { step: 1, title: 'Enter headline', desc: 'Type lowercase or unformatted headline.' },
      { step: 2, title: 'Apply title rules', desc: 'Articles and short prepositions stay lowercase.' },
      { step: 3, title: 'Copy title', desc: 'Copy formatted title.' }
    ],
    faqs: [{ question: 'Are prepositions handled correctly?', answer: 'Yes, short words like in, on, of, the remain lowercase.' }]
  },
  {
    id: 'random-word-generator',
    slug: 'random-word-generator',
    name: 'Random Word & Vocabulary Generator',
    shortDesc: 'Generate lists of random English words for brainstorming and creative writing.',
    description: 'Generate customizable lists of nouns, verbs, or adjectives for writing prompts.',
    category: 'Text Tools',
    iconName: 'Sparkles',
    usageCount: 52100,
    tags: ['random words', 'vocabulary', 'brainstorm', 'writing', 'generator'],
    howToUse: [
      { step: 1, title: 'Select count', desc: 'Choose word count (1-50).' },
      { step: 2, title: 'Filter type', desc: 'Choose All, Nouns, or Verbs.' },
      { step: 3, title: 'Generate', desc: 'Copy word list.' }
    ],
    faqs: [{ question: 'Are words family-friendly?', answer: 'Yes, dictionary contains clean standard vocabulary.' }]
  },
  {
    id: 'random-sentence-generator',
    slug: 'random-sentence-generator',
    name: 'Random Sentence Generator',
    shortDesc: 'Generate random grammatically correct sentences for design mockups.',
    description: 'Create realistic random sentences to test UI text wrapping and font layouts.',
    category: 'Text Tools',
    iconName: 'Type',
    usageCount: 39400,
    tags: ['random sentence', 'mockup', 'text', 'generator'],
    howToUse: [
      { step: 1, title: 'Select sentence count', desc: 'Choose 1 to 10 sentences.' },
      { step: 2, title: 'Generate', desc: 'View random text.' },
      { step: 3, title: 'Copy sentences', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Are sentences grammatically valid?', answer: 'Yes, constructed using subject-verb-object structures.' }]
  },
  {
    id: 'text-frequency-counter',
    slug: 'text-frequency-counter',
    name: 'Character & Letter Frequency Counter',
    shortDesc: 'Analyze letter usage percentages and character distribution histograms.',
    description: 'Inspect letter frequency distribution charts for linguistics and cryptography.',
    category: 'Text Tools',
    iconName: 'BarChart2',
    usageCount: 28400,
    tags: ['frequency', 'character', 'letter', 'histogram', 'text'],
    howToUse: [
      { step: 1, title: 'Paste text', desc: 'Enter document.' },
      { step: 2, title: 'View histogram', desc: 'Inspect top letters A-Z.' },
      { step: 3, title: 'Copy breakdown', desc: 'Copy metrics.' }
    ],
    faqs: [{ question: 'Which letter is most common in English?', answer: 'Letter E is the most common (~12.7%).' }]
  },
  {
    id: 'nato-phonetic-alphabet-converter',
    slug: 'nato-phonetic-alphabet-converter',
    name: 'NATO Phonetic Alphabet Converter',
    shortDesc: 'Convert spelling into NATO phonetic words (Alpha, Bravo, Charlie).',
    description: 'Translate codes and names into NATO phonetic alphabet spellings for clear radio calls.',
    category: 'Text Tools',
    iconName: 'Radio',
    usageCount: 46100,
    tags: ['nato', 'phonetic', 'spelling', 'radio', 'alpha bravo'],
    howToUse: [
      { step: 1, title: 'Enter word or code', desc: 'Type name or tracking ID.' },
      { step: 2, title: 'Read NATO words', desc: 'View Alpha, Bravo, Charlie breakdown.' },
      { step: 3, title: 'Copy phonetics', desc: 'Copy spelled list.' }
    ],
    faqs: [{ question: 'Are numbers supported?', answer: 'Yes, numbers map to Zero, One, Two... Niner.' }]
  },
  {
    id: 'text-obfuscator',
    slug: 'text-obfuscator',
    name: 'Text Obfuscator & Entity Encoder',
    shortDesc: 'Obfuscate email addresses or text into HTML decimal/hex entities.',
    description: 'Hide email addresses from web scraper bots using HTML numeric entity encoding.',
    category: 'Text Tools',
    iconName: 'Lock',
    usageCount: 37800,
    tags: ['obfuscator', 'email', 'html entity', 'encoder', 'security'],
    howToUse: [
      { step: 1, title: 'Enter email', desc: 'Type email address.' },
      { step: 2, title: 'Encode entities', desc: 'Read numeric HTML entity string.' },
      { step: 3, title: 'Paste in HTML', desc: 'Embed safely in web page.' }
    ],
    faqs: [{ question: 'Will browsers display it normally?', answer: 'Yes, web browsers render the text seamlessly to humans.' }]
  },
  {
    id: 'html-strip-tags',
    slug: 'html-strip-tags',
    name: 'HTML Tag Stripper',
    shortDesc: 'Strip HTML tags (<p>, <div>, <a>) from rich content to extract plain text.',
    description: 'Clean HTML markup from web copy to leave pure plain text without tags or inline styles.',
    category: 'Text Tools',
    iconName: 'Scissors',
    usageCount: 59300,
    tags: ['html', 'strip tags', 'plain text', 'cleaner', 'markup'],
    howToUse: [
      { step: 1, title: 'Paste HTML code', desc: 'Paste raw HTML.' },
      { step: 2, title: 'Strip tags', desc: 'Tags are removed instantly.' },
      { step: 3, title: 'Copy plain text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it remove script/style blocks?', answer: 'Yes, inner script and CSS blocks are stripped.' }]
  },
  {
    id: 'bbcode-to-html-converter',
    slug: 'bbcode-to-html-converter',
    name: 'BBCode to HTML Converter',
    shortDesc: 'Convert forum BBCode tags ([b], [i], [url]) into standard HTML.',
    description: 'Translate legacy forum markup like [b]text[/b] into modern HTML tags.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 21900,
    tags: ['bbcode', 'html', 'converter', 'forum', 'tags'],
    howToUse: [
      { step: 1, title: 'Paste BBCode', desc: 'Paste forum post.' },
      { step: 2, title: 'Convert', desc: 'Read generated HTML.' },
      { step: 3, title: 'Copy HTML', desc: 'Copy markup.' }
    ],
    faqs: [{ question: 'Which tags are supported?', answer: '[b], [i], [u], [url], [img], [code], and [quote].' }]
  },
  {
    id: 'markdown-to-html-converter',
    slug: 'markdown-to-html-converter',
    name: 'Markdown to Raw HTML Converter',
    shortDesc: 'Convert Markdown code into clean raw HTML strings.',
    description: 'Transform markdown files into HTML markup to paste directly into web pages.',
    category: 'Text Tools',
    iconName: 'Code',
    usageCount: 48100,
    tags: ['markdown', 'html', 'converter', 'raw', 'markup'],
    howToUse: [
      { step: 1, title: 'Paste Markdown', desc: 'Enter markdown text.' },
      { step: 2, title: 'View HTML code', desc: 'Inspect clean HTML tags.' },
      { step: 3, title: 'Copy HTML', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it handle tables?', answer: 'Yes, markdown table syntax converts to <table> HTML.' }]
  },
  {
    id: 'html-to-markdown-converter',
    slug: 'html-to-markdown-converter',
    name: 'HTML to Markdown Converter',
    shortDesc: 'Convert HTML markup back into clean Markdown code.',
    description: 'Convert web HTML tags into markdown headers, bold, links, and lists.',
    category: 'Text Tools',
    iconName: 'FileText',
    usageCount: 42300,
    tags: ['html', 'markdown', 'converter', 'text'],
    howToUse: [
      { step: 1, title: 'Paste HTML', desc: 'Enter HTML markup.' },
      { step: 2, title: 'Convert to MD', desc: 'Read clean Markdown.' },
      { step: 3, title: 'Copy Markdown', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Are images converted?', answer: 'Yes, <img src=""> maps to ![alt](src).' }]
  },
  {
    id: 'text-repeater',
    slug: 'text-repeater',
    name: 'Text & String Multiplier Repeater',
    shortDesc: 'Repeat any text or character string multiple times (e.g. 100x).',
    description: 'Multiply strings or characters in batch for stress testing or text padding.',
    category: 'Text Tools',
    iconName: 'RefreshCw',
    usageCount: 38200,
    tags: ['text', 'repeater', 'multiply', 'string', 'utility'],
    howToUse: [
      { step: 1, title: 'Enter string', desc: 'Type word or symbol.' },
      { step: 2, title: 'Set repeat count', desc: 'Choose 1 to 1000.' },
      { step: 3, title: 'Copy output', desc: 'Copy multiplied text.' }
    ],
    faqs: [{ question: 'Can I add line breaks between repeats?', answer: 'Yes, toggle newline or space separator.' }]
  },
  {
    id: 'text-padding-utility',
    slug: 'text-padding-utility',
    name: 'Text Padding & Margin Aligner',
    shortDesc: 'Pad strings with spaces or custom characters to fixed lengths.',
    description: 'Pad text on the left or right with characters like zeros or spaces to match column alignment.',
    category: 'Text Tools',
    iconName: 'AlignLeft',
    usageCount: 21900,
    tags: ['padding', 'text', 'aligner', 'padstart', 'padend'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Paste lines.' },
      { step: 2, title: 'Choose target length & character', desc: 'E.g. pad to 10 chars with 0.' },
      { step: 3, title: 'Copy padded lines', desc: 'Copy result.' }
    ],
    faqs: [{ question: 'Is it similar to JS padStart?', answer: 'Yes, implements padStart and padEnd logic client-side.' }]
  },
  {
    id: 'text-column-formatter',
    slug: 'text-column-formatter',
    name: 'Text Column Table Formatter',
    shortDesc: 'Format delimiter text into aligned plain text columns.',
    description: 'Align messy tab or space delimited text into clean fixed-width monospaced columns.',
    category: 'Text Tools',
    iconName: 'Table',
    usageCount: 26800,
    tags: ['column', 'table', 'formatter', 'text', 'align'],
    howToUse: [
      { step: 1, title: 'Paste delimited data', desc: 'Enter rows.' },
      { step: 2, title: 'Format columns', desc: 'Columns auto-align with spaces.' },
      { step: 3, title: 'Copy monospaced table', desc: 'Copy formatted block.' }
    ],
    faqs: [{ question: 'Which font works best?', answer: 'Monospaced fonts like Courier or Consolas display columns perfectly.' }]
  },
  {
    id: 'text-scrambler',
    slug: 'text-scrambler',
    name: 'Word & Letter Scrambler',
    shortDesc: 'Scramble letter positions within words while preserving first and last letters.',
    description: 'Create typoglycemia scrambled text where inner letters are randomized.',
    category: 'Text Tools',
    iconName: 'Sparkles',
    usageCount: 29400,
    tags: ['scramble', 'text', 'typoglycemia', 'random', 'fun'],
    howToUse: [
      { step: 1, title: 'Type paragraph', desc: 'Enter sentence.' },
      { step: 2, title: 'Scramble', desc: 'Inner word letters flip.' },
      { step: 3, title: 'Copy scrambled text', desc: 'Copy result.' }
    ],
    faqs: [{ question: 'What is typoglycemia?', answer: 'The cognitive ability to read text even when middle letters of words are scrambled.' }]
  },
  {
    id: 'leetspeak-generator',
    slug: 'leetspeak-generator',
    name: 'LeetSpeak (1337) Text Generator',
    shortDesc: 'Convert standard text into 1337 L33tSp34k hacker lettering.',
    description: 'Transform letters into classic 1337 numbers and symbols (e.g. E->3, A->4, T->7).',
    category: 'Text Tools',
    iconName: 'Terminal',
    usageCount: 51200,
    tags: ['leetspeak', '1337', 'hacker', 'text', 'generator'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type message.' },
      { step: 2, title: 'Select 1337 level', desc: 'Choose Basic or Extreme 1337.' },
      { step: 3, title: 'Copy 1337 text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Can I reverse 1337 text?', answer: 'Basic 1337 maps back cleanly.' }]
  },
  {
    id: 'strikethrough-text-generator',
    slug: 'strikethrough-text-generator',
    name: 'Strikethrough & Underline Text Generator',
    shortDesc: 'Generate s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ and u̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ text for social media posts.',
    description: 'Apply combining Unicode strikethrough and underline marks to text strings.',
    category: 'Text Tools',
    iconName: 'Type',
    usageCount: 68900,
    tags: ['strikethrough', 'underline', 'unicode', 'text', 'generator'],
    howToUse: [
      { step: 1, title: 'Enter text', desc: 'Type caption.' },
      { step: 2, title: 'Select style', desc: 'Choose Strikethrough, Underline, or Slash.' },
      { step: 3, title: 'Copy styled text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it work in social comments?', answer: 'Yes, works in Instagram, X, Facebook, and LinkedIn comments.' }]
  },
  {
    id: 'bubble-text-generator',
    slug: 'bubble-text-generator',
    name: 'Circled & Bubble Text Generator',
    shortDesc: 'Convert letters into Ⓟⓞⓟⓤⓛⓐⓡ circled bubble fonts.',
    description: 'Transform standard letters into dark or light circled bubble Unicode symbols.',
    category: 'Text Tools',
    iconName: 'Sparkles',
    usageCount: 54200,
    tags: ['bubble text', 'circled', 'unicode', 'font', 'generator'],
    howToUse: [
      { step: 1, title: 'Type name or word', desc: 'Enter string.' },
      { step: 2, title: 'Choose Bubble style', desc: 'Select Open or Filled bubbles.' },
      { step: 3, title: 'Copy bubble text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Are these real fonts?', answer: 'No, they are special Unicode characters supported natively by operating systems.' }]
  },
  {
    id: 'invisible-character-detector',
    slug: 'invisible-character-detector',
    name: 'Invisible & Zero-Width Character Detector',
    shortDesc: 'Spot hidden zero-width spaces (\u200B) and invisible characters in text.',
    description: 'Detect and remove invisible Unicode characters that cause mysterious syntax or formatting errors.',
    category: 'Text Tools',
    iconName: 'Search',
    usageCount: 41800,
    tags: ['invisible', 'zero width', 'detector', 'cleaner', 'unicode'],
    howToUse: [
      { step: 1, title: 'Paste text or code', desc: 'Paste suspicious string.' },
      { step: 2, title: 'Inspect highlights', desc: 'Hidden characters are highlighted in red.' },
      { step: 3, title: 'Strip hidden chars', desc: 'Click Clean Text to remove them.' }
    ],
    faqs: [{ question: 'What causes zero-width characters?', answer: 'Copying text from web PDF views or rich word processors.' }]
  },
  {
    id: 'text-punctuation-cleaner',
    slug: 'text-punctuation-cleaner',
    name: 'Text Punctuation & Accent Cleaner',
    shortDesc: 'Strip or replace smart quotes, em-dashes, and special punctuation.',
    description: 'Convert smart curly quotes (“”) into straight quotes ("") and replace em-dashes with simple hyphens.',
    category: 'Text Tools',
    iconName: 'Scissors',
    usageCount: 27900,
    tags: ['punctuation', 'cleaner', 'quotes', 'accents', 'text'],
    howToUse: [
      { step: 1, title: 'Paste formatted document', desc: 'Enter text with smart quotes.' },
      { step: 2, title: 'Clean punctuation', desc: 'Curly quotes turn straight.' },
      { step: 3, title: 'Copy clean text', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Does it strip accents too?', answer: 'Optionally normalize accented vowels (é -> e).' }]
  },
  {
    id: 'text-summarizer-extractor',
    slug: 'text-summarizer-extractor',
    name: 'Key Sentence Extractor',
    shortDesc: 'Extract key sentences and main bullet points from long documents without AI.',
    description: 'Uses statistical sentence length and term frequency algorithms to extract core sentences client-side.',
    category: 'Text Tools',
    iconName: 'AlignLeft',
    usageCount: 38200,
    tags: ['summarizer', 'extractor', 'sentences', 'text', 'analysis'],
    howToUse: [
      { step: 1, title: 'Paste long article', desc: 'Enter text.' },
      { step: 2, title: 'Set summary ratio', desc: 'Choose 20% or top 5 sentences.' },
      { step: 3, title: 'Copy summary bullets', desc: 'Copy key points.' }
    ],
    faqs: [{ question: 'Is this AI?', answer: 'No, uses pure deterministic TF-IDF statistical sentence ranking client-side.' }]
  }
];
