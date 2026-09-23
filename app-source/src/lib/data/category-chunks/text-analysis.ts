import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "text-repeater",
    "slug": "text-repeater",
    "name": "Text & String Multiplier Repeater",
    "shortDesc": "Repeat any text or character string multiple times (e.g. 100x).",
    "description": "Multiply strings or characters in batch for stress testing or text padding.",
    "category": "Text Analysis",
    "iconName": "RefreshCw",
    "usageCount": 38200,
    "tags": [
      "text",
      "repeater",
      "multiply",
      "string",
      "utility"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter string",
        "desc": "Type word or symbol."
      },
      {
        "step": 2,
        "title": "Set repeat count",
        "desc": "Choose 1 to 1000."
      },
      {
        "step": 3,
        "title": "Copy output",
        "desc": "Copy multiplied text."
      }
    ],
    "faqs": [
      {
        "question": "Can I add line breaks between repeats?",
        "answer": "Yes, toggle newline or space separator."
      }
    ]
  },
  {
    "id": "text-padding-utility",
    "slug": "text-padding-utility",
    "name": "Text Padding & Margin Aligner",
    "shortDesc": "Pad strings with spaces or custom characters to fixed lengths.",
    "description": "Pad text on the left or right with characters like zeros or spaces to match column alignment.",
    "category": "Text Analysis",
    "iconName": "AlignLeft",
    "usageCount": 21900,
    "tags": [
      "padding",
      "text",
      "aligner",
      "padstart",
      "padend"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter text",
        "desc": "Paste lines."
      },
      {
        "step": 2,
        "title": "Choose target length & character",
        "desc": "E.g. pad to 10 chars with 0."
      },
      {
        "step": 3,
        "title": "Copy padded lines",
        "desc": "Copy result."
      }
    ],
    "faqs": [
      {
        "question": "Is it similar to JS padStart?",
        "answer": "Yes, implements padStart and padEnd logic client-side."
      }
    ]
  },
  {
    "id": "text-column-formatter",
    "slug": "text-column-formatter",
    "name": "Text Column Table Formatter",
    "shortDesc": "Format delimiter text into aligned plain text columns.",
    "description": "Align messy tab or space delimited text into clean fixed-width monospaced columns.",
    "category": "Text Analysis",
    "iconName": "Table",
    "usageCount": 26800,
    "tags": [
      "column",
      "table",
      "formatter",
      "text",
      "align"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste delimited data",
        "desc": "Enter rows."
      },
      {
        "step": 2,
        "title": "Format columns",
        "desc": "Columns auto-align with spaces."
      },
      {
        "step": 3,
        "title": "Copy monospaced table",
        "desc": "Copy formatted block."
      }
    ],
    "faqs": [
      {
        "question": "Which font works best?",
        "answer": "Monospaced fonts like Courier or Consolas display columns perfectly."
      }
    ]
  },
  {
    "id": "text-scrambler",
    "slug": "text-scrambler",
    "name": "Word & Letter Scrambler",
    "shortDesc": "Scramble letter positions within words while preserving first and last letters.",
    "description": "Create typoglycemia scrambled text where inner letters are randomized.",
    "category": "Text Analysis",
    "iconName": "Sparkles",
    "usageCount": 29400,
    "tags": [
      "scramble",
      "text",
      "typoglycemia",
      "random",
      "fun"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type paragraph",
        "desc": "Enter sentence."
      },
      {
        "step": 2,
        "title": "Scramble",
        "desc": "Inner word letters flip."
      },
      {
        "step": 3,
        "title": "Copy scrambled text",
        "desc": "Copy result."
      }
    ],
    "faqs": [
      {
        "question": "What is typoglycemia?",
        "answer": "The cognitive ability to read text even when middle letters of words are scrambled."
      }
    ]
  },
  {
    "id": "leetspeak-generator",
    "slug": "leetspeak-generator",
    "name": "LeetSpeak (1337) Text Generator",
    "shortDesc": "Convert standard text into 1337 L33tSp34k hacker lettering.",
    "description": "Transform letters into classic 1337 numbers and symbols (e.g. E->3, A->4, T->7).",
    "category": "Text Analysis",
    "iconName": "Terminal",
    "usageCount": 51200,
    "tags": [
      "leetspeak",
      "1337",
      "hacker",
      "text",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter text",
        "desc": "Type message."
      },
      {
        "step": 2,
        "title": "Select 1337 level",
        "desc": "Choose Basic or Extreme 1337."
      },
      {
        "step": 3,
        "title": "Copy 1337 text",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Can I reverse 1337 text?",
        "answer": "Basic 1337 maps back cleanly."
      }
    ]
  },
  {
    "id": "strikethrough-text-generator",
    "slug": "strikethrough-text-generator",
    "name": "Strikethrough & Underline Text Generator",
    "shortDesc": "Generate s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶ and u̲n̲d̲e̲r̲l̲i̲n̲e̲d̲ text for social media posts.",
    "description": "Apply combining Unicode strikethrough and underline marks to text strings.",
    "category": "Text Analysis",
    "iconName": "Type",
    "usageCount": 68900,
    "tags": [
      "strikethrough",
      "underline",
      "unicode",
      "text",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter text",
        "desc": "Type caption."
      },
      {
        "step": 2,
        "title": "Select style",
        "desc": "Choose Strikethrough, Underline, or Slash."
      },
      {
        "step": 3,
        "title": "Copy styled text",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Does it work in social comments?",
        "answer": "Yes, works in Instagram, X, Facebook, and LinkedIn comments."
      }
    ]
  },
  {
    "id": "bubble-text-generator",
    "slug": "bubble-text-generator",
    "name": "Circled & Bubble Text Generator",
    "shortDesc": "Convert letters into Ⓟⓞⓟⓤⓛⓐⓡ circled bubble fonts.",
    "description": "Transform standard letters into dark or light circled bubble Unicode symbols.",
    "category": "Text Analysis",
    "iconName": "Sparkles",
    "usageCount": 54200,
    "tags": [
      "bubble text",
      "circled",
      "unicode",
      "font",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type name or word",
        "desc": "Enter string."
      },
      {
        "step": 2,
        "title": "Choose Bubble style",
        "desc": "Select Open or Filled bubbles."
      },
      {
        "step": 3,
        "title": "Copy bubble text",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Are these real fonts?",
        "answer": "No, they are special Unicode characters supported natively by operating systems."
      }
    ]
  },
  {
    "id": "invisible-character-detector",
    "slug": "invisible-character-detector",
    "name": "Invisible & Zero-Width Character Detector",
    "shortDesc": "Spot hidden zero-width spaces (​) and invisible characters in text.",
    "description": "Detect and remove invisible Unicode characters that cause mysterious syntax or formatting errors.",
    "category": "Text Analysis",
    "iconName": "Search",
    "usageCount": 41800,
    "tags": [
      "invisible",
      "zero width",
      "detector",
      "cleaner",
      "unicode"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste text or code",
        "desc": "Paste suspicious string."
      },
      {
        "step": 2,
        "title": "Inspect highlights",
        "desc": "Hidden characters are highlighted in red."
      },
      {
        "step": 3,
        "title": "Strip hidden chars",
        "desc": "Click Clean Text to remove them."
      }
    ],
    "faqs": [
      {
        "question": "What causes zero-width characters?",
        "answer": "Copying text from web PDF views or rich word processors."
      }
    ]
  },
  {
    "id": "text-punctuation-cleaner",
    "slug": "text-punctuation-cleaner",
    "name": "Text Punctuation & Accent Cleaner",
    "shortDesc": "Strip or replace smart quotes, em-dashes, and special punctuation.",
    "description": "Convert smart curly quotes (“”) into straight quotes (\"\") and replace em-dashes with simple hyphens.",
    "category": "Text Analysis",
    "iconName": "Scissors",
    "usageCount": 27900,
    "tags": [
      "punctuation",
      "cleaner",
      "quotes",
      "accents",
      "text"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste formatted document",
        "desc": "Enter text with smart quotes."
      },
      {
        "step": 2,
        "title": "Clean punctuation",
        "desc": "Curly quotes turn straight."
      },
      {
        "step": 3,
        "title": "Copy clean text",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Does it strip accents too?",
        "answer": "Optionally normalize accented vowels (é -> e)."
      }
    ]
  },
  {
    "id": "text-summarizer-extractor",
    "slug": "text-summarizer-extractor",
    "name": "Key Sentence Extractor",
    "shortDesc": "Extract key sentences and main bullet points from long documents without AI.",
    "description": "Uses statistical sentence length and term frequency algorithms to extract core sentences client-side.",
    "category": "Text Analysis",
    "iconName": "AlignLeft",
    "usageCount": 38200,
    "tags": [
      "summarizer",
      "extractor",
      "sentences",
      "text",
      "analysis"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste long article",
        "desc": "Enter text."
      },
      {
        "step": 2,
        "title": "Set summary ratio",
        "desc": "Choose 20% or top 5 sentences."
      },
      {
        "step": 3,
        "title": "Copy summary bullets",
        "desc": "Copy key points."
      }
    ],
    "faqs": [
      {
        "question": "Is this AI?",
        "answer": "No, uses pure deterministic TF-IDF statistical sentence ranking client-side."
      }
    ]
  },
  {
    "id": "universal-case-converter",
    "slug": "universal-case-converter",
    "name": "Universal Case Converter",
    "shortDesc": "Instant client-side universal case converter tool.",
    "description": "Perform universal case converter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 30327,
    "tags": [
      "text tools",
      "universal case converter",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Universal Case Converter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Universal Case Converter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Universal Case Converter?",
        "answer": "Yes! All Universal Case Converter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal Case Converter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-word-counter",
    "slug": "online-word-counter",
    "name": "Online Word Counter",
    "shortDesc": "Instant client-side online word counter tool.",
    "description": "Perform online word counter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 23922,
    "tags": [
      "text tools",
      "online word counter",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Online Word Counter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Online Word Counter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Online Word Counter?",
        "answer": "Yes! All Online Word Counter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Word Counter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "line-sorter-master",
    "slug": "line-sorter-master",
    "name": "Line Sorter Master",
    "shortDesc": "Instant client-side line sorter master tool.",
    "description": "Perform line sorter master calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 37894,
    "tags": [
      "text tools",
      "line sorter master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Line Sorter Master controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Line Sorter Master processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Line Sorter Master?",
        "answer": "Yes! All Line Sorter Master calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Line Sorter Master?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-text-reverser",
    "slug": "advanced-text-reverser",
    "name": "Advanced Text Reverser",
    "shortDesc": "Instant client-side advanced text reverser tool.",
    "description": "Perform advanced text reverser calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 10678,
    "tags": [
      "text tools",
      "advanced text reverser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Advanced Text Reverser controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Advanced Text Reverser processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Advanced Text Reverser?",
        "answer": "Yes! All Advanced Text Reverser calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced Text Reverser?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "duplicate-remover-smart",
    "slug": "duplicate-remover-smart",
    "name": "Duplicate Remover (Smart)",
    "shortDesc": "Instant client-side duplicate remover (smart) tool.",
    "description": "Perform duplicate remover (smart) calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 58654,
    "tags": [
      "text tools",
      "duplicate remover (smart)",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Duplicate Remover (Smart) controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Duplicate Remover (Smart) processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Duplicate Remover (Smart)?",
        "answer": "Yes! All Duplicate Remover (Smart) calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Duplicate Remover (Smart)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "slug-generator-client-side",
    "slug": "slug-generator-client-side",
    "name": "Slug Generator Client-Side",
    "shortDesc": "Instant client-side slug generator client-side tool.",
    "description": "Perform slug generator client-side calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 21467,
    "tags": [
      "text tools",
      "slug generator client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Slug Generator Client-Side controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Slug Generator Client-Side processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Slug Generator Client-Side?",
        "answer": "Yes! All Slug Generator Client-Side calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Slug Generator Client-Side?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-lorem-ipsum",
    "slug": "easy-lorem-ipsum",
    "name": "Easy Lorem Ipsum",
    "shortDesc": "Instant client-side easy lorem ipsum tool.",
    "description": "Perform easy lorem ipsum calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 38904,
    "tags": [
      "text tools",
      "easy lorem ipsum",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Easy Lorem Ipsum controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Easy Lorem Ipsum processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Easy Lorem Ipsum?",
        "answer": "Yes! All Easy Lorem Ipsum calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy Lorem Ipsum?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-text-trimmer",
    "slug": "custom-text-trimmer",
    "name": "Custom Text Trimmer",
    "shortDesc": "Instant client-side custom text trimmer tool.",
    "description": "Perform custom text trimmer calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 10163,
    "tags": [
      "text tools",
      "custom text trimmer",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Custom Text Trimmer controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Custom Text Trimmer processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Custom Text Trimmer?",
        "answer": "Yes! All Custom Text Trimmer calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom Text Trimmer?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "whitespace-cleaner-dynamic",
    "slug": "whitespace-cleaner-dynamic",
    "name": "Whitespace Cleaner Dynamic",
    "shortDesc": "Instant client-side whitespace cleaner dynamic tool.",
    "description": "Perform whitespace cleaner dynamic calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 18844,
    "tags": [
      "text tools",
      "whitespace cleaner dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Whitespace Cleaner Dynamic controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Whitespace Cleaner Dynamic processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Whitespace Cleaner Dynamic?",
        "answer": "Yes! All Whitespace Cleaner Dynamic calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Whitespace Cleaner Dynamic?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "binary-converter-private",
    "slug": "binary-converter-private",
    "name": "Binary Converter (Private)",
    "shortDesc": "Instant client-side binary converter (private) tool.",
    "description": "Perform binary converter (private) calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 13338,
    "tags": [
      "text tools",
      "binary converter (private)",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Binary Converter (Private) controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Binary Converter (Private) processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Binary Converter (Private)?",
        "answer": "Yes! All Binary Converter (Private) calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Binary Converter (Private)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-hex-converter",
    "slug": "browser-hex-converter",
    "name": "Browser Hex Converter",
    "shortDesc": "Instant client-side browser hex converter tool.",
    "description": "Perform browser hex converter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 40422,
    "tags": [
      "text tools",
      "browser hex converter",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Browser Hex Converter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Browser Hex Converter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Browser Hex Converter?",
        "answer": "Yes! All Browser Hex Converter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser Hex Converter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "octal-converter-universal",
    "slug": "octal-converter-universal",
    "name": "Octal Converter Universal",
    "shortDesc": "Instant client-side octal converter universal tool.",
    "description": "Perform octal converter universal calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 56443,
    "tags": [
      "text tools",
      "octal converter universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Octal Converter Universal controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Octal Converter Universal processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Octal Converter Universal?",
        "answer": "Yes! All Octal Converter Universal calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Octal Converter Universal?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "master-rot13-cipher",
    "slug": "master-rot13-cipher",
    "name": "Master ROT13 Cipher",
    "shortDesc": "Instant client-side master rot13 cipher tool.",
    "description": "Perform master rot13 cipher calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 10560,
    "tags": [
      "text tools",
      "master rot13 cipher",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Master ROT13 Cipher controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Master ROT13 Cipher processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Master ROT13 Cipher?",
        "answer": "Yes! All Master ROT13 Cipher calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Master ROT13 Cipher?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "caesar-cipher-advanced",
    "slug": "caesar-cipher-advanced",
    "name": "Caesar Cipher Advanced",
    "shortDesc": "Instant client-side caesar cipher advanced tool.",
    "description": "Perform caesar cipher advanced calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 15167,
    "tags": [
      "text tools",
      "caesar cipher advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Caesar Cipher Advanced controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Caesar Cipher Advanced processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Caesar Cipher Advanced?",
        "answer": "Yes! All Caesar Cipher Advanced calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Caesar Cipher Advanced?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "smart-zalgo-glitch",
    "slug": "smart-zalgo-glitch",
    "name": "Smart Zalgo Glitch",
    "shortDesc": "Instant client-side smart zalgo glitch tool.",
    "description": "Perform smart zalgo glitch calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 32963,
    "tags": [
      "text tools",
      "smart zalgo glitch",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Smart Zalgo Glitch controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Smart Zalgo Glitch processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Smart Zalgo Glitch?",
        "answer": "Yes! All Smart Zalgo Glitch calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Smart Zalgo Glitch?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-upside-down-text",
    "slug": "client-side-upside-down-text",
    "name": "Client-Side Upside Down Text",
    "shortDesc": "Instant client-side client-side upside down text tool.",
    "description": "Perform client-side upside down text calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 15379,
    "tags": [
      "text tools",
      "client-side upside down text",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Client-Side Upside Down Text controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Client-Side Upside Down Text processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Client-Side Upside Down Text?",
        "answer": "Yes! All Client-Side Upside Down Text calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side Upside Down Text?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "diff-checker-easy",
    "slug": "diff-checker-easy",
    "name": "Diff Checker Easy",
    "shortDesc": "Instant client-side diff checker easy tool.",
    "description": "Perform diff checker easy calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 15237,
    "tags": [
      "text tools",
      "diff checker easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Diff Checker Easy controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Diff Checker Easy processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Diff Checker Easy?",
        "answer": "Yes! All Diff Checker Easy calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Diff Checker Easy?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-line-numberer",
    "slug": "custom-line-numberer",
    "name": "Custom Line Numberer",
    "shortDesc": "Instant client-side custom line numberer tool.",
    "description": "Perform custom line numberer calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 39215,
    "tags": [
      "text tools",
      "custom line numberer",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Custom Line Numberer controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Custom Line Numberer processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Custom Line Numberer?",
        "answer": "Yes! All Custom Line Numberer calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom Line Numberer?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "column-aligner-dynamic",
    "slug": "column-aligner-dynamic",
    "name": "Column Aligner (Dynamic)",
    "shortDesc": "Instant client-side column aligner (dynamic) tool.",
    "description": "Perform column aligner (dynamic) calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 59127,
    "tags": [
      "text tools",
      "column aligner (dynamic)",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Column Aligner (Dynamic) controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Column Aligner (Dynamic) processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Column Aligner (Dynamic)?",
        "answer": "Yes! All Column Aligner (Dynamic) calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Column Aligner (Dynamic)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "comma-list-generator-private",
    "slug": "comma-list-generator-private",
    "name": "Comma List Generator Private",
    "shortDesc": "Instant client-side comma list generator private tool.",
    "description": "Perform comma list generator private calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 43442,
    "tags": [
      "text tools",
      "comma list generator private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Comma List Generator Private controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Comma List Generator Private processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Comma List Generator Private?",
        "answer": "Yes! All Comma List Generator Private calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Comma List Generator Private?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-list-to-json-array",
    "slug": "browser-list-to-json-array",
    "name": "Browser List to JSON Array",
    "shortDesc": "Instant client-side browser list to json array tool.",
    "description": "Perform browser list to json array calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 25923,
    "tags": [
      "text tools",
      "browser list to json array",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Browser List to JSON Array controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Browser List to JSON Array processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Browser List to JSON Array?",
        "answer": "Yes! All Browser List to JSON Array calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser List to JSON Array?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "universal-camelcase-converter",
    "slug": "universal-camelcase-converter",
    "name": "Universal camelCase Converter",
    "shortDesc": "Instant client-side universal camelcase converter tool.",
    "description": "Perform universal camelcase converter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 19198,
    "tags": [
      "text tools",
      "universal camelcase converter",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Universal camelCase Converter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Universal camelCase Converter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Universal camelCase Converter?",
        "answer": "Yes! All Universal camelCase Converter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal camelCase Converter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "snake-case-converter-online",
    "slug": "snake-case-converter-online",
    "name": "snake_case Converter Online",
    "shortDesc": "Instant client-side snake_case converter online tool.",
    "description": "Perform snake_case converter online calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 56634,
    "tags": [
      "text tools",
      "snake_case converter online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the snake_case Converter Online controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The snake_case Converter Online processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for snake_case Converter Online?",
        "answer": "Yes! All snake_case Converter Online calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on snake_case Converter Online?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "kebab-case-converter-master",
    "slug": "kebab-case-converter-master",
    "name": "kebab-case Converter (Master)",
    "shortDesc": "Instant client-side kebab-case converter (master) tool.",
    "description": "Perform kebab-case converter (master) calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 57566,
    "tags": [
      "text tools",
      "kebab-case converter (master)",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the kebab-case Converter (Master) controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The kebab-case Converter (Master) processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for kebab-case Converter (Master)?",
        "answer": "Yes! All kebab-case Converter (Master) calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on kebab-case Converter (Master)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "random-word-generator-smart",
    "slug": "random-word-generator-smart",
    "name": "Random Word Generator Smart",
    "shortDesc": "Instant client-side random word generator smart tool.",
    "description": "Perform random word generator smart calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 37425,
    "tags": [
      "text tools",
      "random word generator smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Random Word Generator Smart controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Random Word Generator Smart processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Random Word Generator Smart?",
        "answer": "Yes! All Random Word Generator Smart calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Random Word Generator Smart?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-frequency-counter",
    "slug": "client-side-frequency-counter",
    "name": "Client-Side Frequency Counter",
    "shortDesc": "Instant client-side client-side frequency counter tool.",
    "description": "Perform client-side frequency counter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 30177,
    "tags": [
      "text tools",
      "client-side frequency counter",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Client-Side Frequency Counter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Client-Side Frequency Counter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Client-Side Frequency Counter?",
        "answer": "Yes! All Client-Side Frequency Counter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side Frequency Counter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-nato-phonetic",
    "slug": "easy-nato-phonetic",
    "name": "Easy NATO Phonetic",
    "shortDesc": "Instant client-side easy nato phonetic tool.",
    "description": "Perform easy nato phonetic calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 47466,
    "tags": [
      "text tools",
      "easy nato phonetic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Easy NATO Phonetic controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Easy NATO Phonetic processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Easy NATO Phonetic?",
        "answer": "Yes! All Easy NATO Phonetic calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy NATO Phonetic?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "text-obfuscator-custom",
    "slug": "text-obfuscator-custom",
    "name": "Text Obfuscator Custom",
    "shortDesc": "Instant client-side text obfuscator custom tool.",
    "description": "Perform text obfuscator custom calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 37206,
    "tags": [
      "text tools",
      "text obfuscator custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Text Obfuscator Custom controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Text Obfuscator Custom processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Text Obfuscator Custom?",
        "answer": "Yes! All Text Obfuscator Custom calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Text Obfuscator Custom?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "private-bbcode-to-html",
    "slug": "private-bbcode-to-html",
    "name": "Private BBCode to HTML",
    "shortDesc": "Instant client-side private bbcode to html tool.",
    "description": "Perform private bbcode to html calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 50878,
    "tags": [
      "text tools",
      "private bbcode to html",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Private BBCode to HTML controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Private BBCode to HTML processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Private BBCode to HTML?",
        "answer": "Yes! All Private BBCode to HTML calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Private BBCode to HTML?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "markdown-to-html-browser",
    "slug": "markdown-to-html-browser",
    "name": "Markdown to HTML Browser",
    "shortDesc": "Instant client-side markdown to html browser tool.",
    "description": "Perform markdown to html browser calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 52983,
    "tags": [
      "text tools",
      "markdown to html browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Markdown to HTML Browser controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Markdown to HTML Browser processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Markdown to HTML Browser?",
        "answer": "Yes! All Markdown to HTML Browser calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Markdown to HTML Browser?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "universal-html-to-markdown",
    "slug": "universal-html-to-markdown",
    "name": "Universal HTML to Markdown",
    "shortDesc": "Instant client-side universal html to markdown tool.",
    "description": "Perform universal html to markdown calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 26048,
    "tags": [
      "text tools",
      "universal html to markdown",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Universal HTML to Markdown controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Universal HTML to Markdown processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Universal HTML to Markdown?",
        "answer": "Yes! All Universal HTML to Markdown calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal HTML to Markdown?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "text-repeater-online",
    "slug": "text-repeater-online",
    "name": "Text Repeater (Online)",
    "shortDesc": "Instant client-side text repeater (online) tool.",
    "description": "Perform text repeater (online) calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Text Analysis",
    "iconName": "FileText",
    "usageCount": 32091,
    "tags": [
      "text tools",
      "text repeater (online)",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Text Repeater (Online) controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Text Repeater (Online) processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Text Repeater (Online)?",
        "answer": "Yes! All Text Repeater (Online) calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Text Repeater (Online)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  }
];
export default tools;
