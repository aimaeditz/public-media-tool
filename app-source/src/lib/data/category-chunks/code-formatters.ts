import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "json-formatter-validator",
    "slug": "json-formatter-validator",
    "name": "JSON Formatter & Validator",
    "shortDesc": "Beautify, validate, minify, and fix JSON code syntax with error line highlighting.",
    "description": "Format raw JSON with customizable indentation spaces, syntax error highlighting, tree node inspection, and minification.",
    "category": "Code Formatters",
    "iconName": "Code",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 168900,
    "tags": [
      "json",
      "formatter",
      "validator",
      "beautify",
      "minify"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JSON Code",
        "desc": "Enter raw or stringified JSON."
      },
      {
        "step": 2,
        "title": "Click Format or Minify",
        "desc": "Formats JSON with selected indent spacing."
      },
      {
        "step": 3,
        "title": "Copy or Download",
        "desc": "Copy formatted JSON or download .json file."
      }
    ],
    "faqs": [
      {
        "question": "Does it highlight syntax errors?",
        "answer": "Yes! Exact line numbers and character positions of malformed syntax are displayed."
      }
    ]
  },
  {
    "id": "base64-encoder-decoder",
    "slug": "base64-encoder-decoder",
    "name": "Base64 Encoder & Decoder",
    "shortDesc": "Encode string data to Base64 or decode Base64 back into plain text.",
    "description": "Convert plain text strings into Base64 format or decode Base64 payloads back to UTF-8 plain text.",
    "category": "Code Formatters",
    "iconName": "Binary",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 112000,
    "tags": [
      "base64",
      "encoder",
      "decoder",
      "developer",
      "string"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Text",
        "desc": "Type string in the left pane."
      },
      {
        "step": 2,
        "title": "Toggle Mode",
        "desc": "Switch between Encode and Decode."
      },
      {
        "step": 3,
        "title": "Copy Result",
        "desc": "Copy output instantly."
      }
    ],
    "faqs": [
      {
        "question": "Is URL-safe Base64 supported?",
        "answer": "Yes, handles standard (+/) and URL-safe (-_) Base64 variants."
      }
    ]
  },
  {
    "id": "uuid-generator",
    "slug": "uuid-generator",
    "name": "UUID / GUID Generator (v4)",
    "shortDesc": "Generate random RFC 4122 v4 UUID / GUID unique identifier strings.",
    "description": "Generate bulk cryptographically strong version-4 UUID identifiers in uppercase, lowercase, or hyphenated formats.",
    "category": "Code Formatters",
    "iconName": "KeyRound",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 94100,
    "tags": [
      "uuid",
      "guid",
      "generator",
      "v4",
      "random"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose Quantity",
        "desc": "Select how many UUIDs to generate (1 to 100)."
      },
      {
        "step": 2,
        "title": "Configure Options",
        "desc": "Toggle hyphens or uppercase formatting."
      },
      {
        "step": 3,
        "title": "Generate & Copy",
        "desc": "Copy generated list to clipboard."
      }
    ],
    "faqs": [
      {
        "question": "How unique are UUID v4 identifiers?",
        "answer": "The probability of generating a duplicate UUID v4 is close to zero."
      }
    ]
  },
  {
    "id": "html-entity-encoder",
    "slug": "html-entity-encoder",
    "name": "HTML Entity Encoder & Decoder",
    "shortDesc": "Encode special characters (<, >, &, \") into HTML entities or decode them.",
    "description": "Convert reserved HTML characters into named (&lt;) or numeric (&#60;) entities to prevent XSS rendering issues.",
    "category": "Code Formatters",
    "iconName": "Code",
    "usageCount": 78100,
    "tags": [
      "html entity",
      "encoder",
      "decoder",
      "xss",
      "markup"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste string",
        "desc": "Enter text with <, >, & characters."
      },
      {
        "step": 2,
        "title": "Select Encode/Decode",
        "desc": "Transforms into &lt; or raw symbols."
      },
      {
        "step": 3,
        "title": "Copy result",
        "desc": "Copy encoded string."
      }
    ],
    "faqs": [
      {
        "question": "Which characters are encoded?",
        "answer": "<, >, &, \", ', and non-ASCII characters."
      }
    ]
  },
  {
    "id": "xml-formatter-beautifier",
    "slug": "xml-formatter-beautifier",
    "name": "XML Formatter & Beautifier",
    "shortDesc": "Format, re-indent, and validate XML documents with syntax error checking.",
    "description": "Clean up ugly unindented XML documents with customizable indent spacing and tag validation.",
    "category": "Code Formatters",
    "iconName": "Code",
    "usageCount": 65200,
    "tags": [
      "xml",
      "formatter",
      "beautifier",
      "indent",
      "markup"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste XML string",
        "desc": "Enter raw XML."
      },
      {
        "step": 2,
        "title": "Format XML",
        "desc": "Re-indents nested element tags."
      },
      {
        "step": 3,
        "title": "Copy output",
        "desc": "Copy beautified XML."
      }
    ],
    "faqs": [
      {
        "question": "Does it check closing tags?",
        "answer": "Yes, flags mismatched or unclosed XML tags."
      }
    ]
  },
  {
    "id": "yaml-to-json-converter",
    "slug": "yaml-to-json-converter",
    "name": "YAML to JSON Converter",
    "shortDesc": "Convert YAML configuration documents into valid JSON strings.",
    "description": "Transform Kubernetes or Docker YAML configuration files into valid JSON structures.",
    "category": "Code Formatters",
    "iconName": "FileType",
    "usageCount": 82400,
    "tags": [
      "yaml",
      "json",
      "converter",
      "config",
      "kubernetes"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste YAML code",
        "desc": "Enter YAML content."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Parses YAML into JSON object."
      },
      {
        "step": 3,
        "title": "Copy JSON",
        "desc": "Copy formatted JSON."
      }
    ],
    "faqs": [
      {
        "question": "Does it support multi-document YAML?",
        "answer": "Converts multi-doc YAML into JSON array streams."
      }
    ]
  },
  {
    "id": "json-to-yaml-converter",
    "slug": "json-to-yaml-converter",
    "name": "JSON to YAML Converter",
    "shortDesc": "Convert JSON payloads into clean, readable YAML configuration syntax.",
    "description": "Convert JSON object structures into indentation-based YAML configuration documents.",
    "category": "Code Formatters",
    "iconName": "FileType",
    "usageCount": 76100,
    "tags": [
      "json",
      "yaml",
      "converter",
      "config",
      "format"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JSON",
        "desc": "Enter JSON payload."
      },
      {
        "step": 2,
        "title": "Auto Convert",
        "desc": "Translates to YAML structure."
      },
      {
        "step": 3,
        "title": "Copy YAML",
        "desc": "Copy YAML file content."
      }
    ],
    "faqs": [
      {
        "question": "Are comments preserved?",
        "answer": "JSON does not support comments, but valid keys map cleanly."
      }
    ]
  },
  {
    "id": "json-to-csv-converter",
    "slug": "json-to-csv-converter",
    "name": "JSON to CSV Converter",
    "shortDesc": "Convert JSON object arrays into downloadable CSV spreadsheet files.",
    "description": "Extract API JSON array payloads into comma-separated CSV spreadsheets for Excel.",
    "category": "Code Formatters",
    "iconName": "Table",
    "usageCount": 94200,
    "tags": [
      "json",
      "csv",
      "converter",
      "excel",
      "spreadsheet"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JSON array",
        "desc": "Enter [{...}, {...}] payload."
      },
      {
        "step": 2,
        "title": "Detect headers",
        "desc": "Auto-detects object keys as column headers."
      },
      {
        "step": 3,
        "title": "Download CSV file",
        "desc": "Save .csv file."
      }
    ],
    "faqs": [
      {
        "question": "How are nested objects handled?",
        "answer": "Nested objects are flattened using dot notation (e.g. user.name)."
      }
    ]
  },
  {
    "id": "csv-to-json-converter",
    "slug": "csv-to-json-converter",
    "name": "CSV to JSON Converter",
    "shortDesc": "Parse CSV spreadsheet files or raw text into JSON object arrays.",
    "description": "Convert CSV spreadsheet rows into structured JSON arrays of objects with key-value pairs.",
    "category": "Code Formatters",
    "iconName": "Table",
    "usageCount": 88100,
    "tags": [
      "csv",
      "json",
      "converter",
      "parser",
      "spreadsheet"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload or paste CSV",
        "desc": "Enter CSV text."
      },
      {
        "step": 2,
        "title": "Set delimiter",
        "desc": "Select comma, tab, or semicolon."
      },
      {
        "step": 3,
        "title": "Copy JSON array",
        "desc": "Copy parsed JSON."
      }
    ],
    "faqs": [
      {
        "question": "Does first row become object keys?",
        "answer": "Yes, header row values are mapped to object keys."
      }
    ]
  },
  {
    "id": "sql-formatter-beautifier",
    "slug": "sql-formatter-beautifier",
    "name": "SQL Query Formatter & Beautifier",
    "shortDesc": "Format and re-indent messy SQL queries (SELECT, JOIN, WHERE, GROUP BY).",
    "description": "Format complex SQL queries with uppercase keywords and clean clause line breaks.",
    "category": "Code Formatters",
    "iconName": "Database",
    "usageCount": 91200,
    "tags": [
      "sql",
      "formatter",
      "beautifier",
      "database",
      "query"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste raw SQL",
        "desc": "Enter query string."
      },
      {
        "step": 2,
        "title": "Click Format SQL",
        "desc": "Keywords convert to uppercase with clause indentation."
      },
      {
        "step": 3,
        "title": "Copy clean SQL",
        "desc": "Copy query."
      }
    ],
    "faqs": [
      {
        "question": "Which SQL dialects are supported?",
        "answer": "Standard SQL, PostgreSQL, MySQL, SQLite, SQL Server."
      }
    ]
  },
  {
    "id": "javascript-minifier",
    "slug": "javascript-minifier",
    "name": "JavaScript Code Minifier",
    "shortDesc": "Strip whitespace, comments, and line breaks from JavaScript code.",
    "description": "Minify JavaScript scripts to reduce network transfer payload sizes.",
    "category": "Code Formatters",
    "iconName": "Code",
    "usageCount": 61400,
    "tags": [
      "javascript",
      "minifier",
      "code",
      "optimize",
      "js"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JS code",
        "desc": "Enter script."
      },
      {
        "step": 2,
        "title": "Minify",
        "desc": "Strips comments and unnecessary whitespace."
      },
      {
        "step": 3,
        "title": "Copy minified JS",
        "desc": "Copy snippet."
      }
    ],
    "faqs": [
      {
        "question": "Does it mangle variable names?",
        "answer": "Fast client-side whitespace/comment stripper preserves variable safety."
      }
    ]
  },
  {
    "id": "css-minifier",
    "slug": "css-minifier",
    "name": "CSS Stylesheet Minifier",
    "shortDesc": "Compress CSS files by stripping comments, spaces, and duplicate semicolons.",
    "description": "Minify CSS stylesheets to accelerate page load times and render performance.",
    "category": "Code Formatters",
    "iconName": "Code",
    "usageCount": 58900,
    "tags": [
      "css",
      "minifier",
      "stylesheet",
      "compress",
      "web"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste CSS rules",
        "desc": "Enter stylesheet."
      },
      {
        "step": 2,
        "title": "Minify CSS",
        "desc": "Compresses selectors and property blocks."
      },
      {
        "step": 3,
        "title": "Copy minified CSS",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Can I unminify/beautify CSS back?",
        "answer": "Yes, formatting rules restore readable line breaks."
      }
    ]
  },
  {
    "id": "html-minifier",
    "slug": "html-minifier",
    "name": "HTML Markup Minifier",
    "shortDesc": "Strip HTML comments, multi-line indentation, and line breaks.",
    "description": "Compress raw HTML markup files for faster server delivery.",
    "category": "Code Formatters",
    "iconName": "Code",
    "usageCount": 41200,
    "tags": [
      "html",
      "minifier",
      "markup",
      "compress",
      "web"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste HTML code",
        "desc": "Enter markup."
      },
      {
        "step": 2,
        "title": "Minify HTML",
        "desc": "Strips HTML comments and extra spaces."
      },
      {
        "step": 3,
        "title": "Copy minified HTML",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "Does it break <pre> tags?",
        "answer": "Preserves <pre> and <script> contents safely."
      }
    ]
  },
  {
    "id": "regex-tester-debugger",
    "slug": "regex-tester-debugger",
    "name": "Regular Expression (RegEx) Tester",
    "shortDesc": "Test and debug JavaScript RegEx patterns with real-time match highlighting.",
    "description": "Interactive RegEx tester with global, case-insensitive, and multiline flag controls.",
    "category": "Code Formatters",
    "iconName": "Search",
    "usageCount": 118200,
    "tags": [
      "regex",
      "regular expression",
      "tester",
      "match",
      "flags"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter pattern & flags",
        "desc": "Type RegEx (e.g. [a-z0-9]+ with g, i)."
      },
      {
        "step": 2,
        "title": "Enter test string",
        "desc": "Paste input text."
      },
      {
        "step": 3,
        "title": "Inspect matches",
        "desc": "Matched captures are highlighted in yellow."
      }
    ],
    "faqs": [
      {
        "question": "Which RegEx engine is used?",
        "answer": "Native browser JavaScript RegExp engine."
      }
    ]
  },
  {
    "id": "cron-expression-parser",
    "slug": "cron-expression-parser",
    "name": "Cron Expression Parser & Schedule Explainer",
    "shortDesc": "Parse crontab expressions (e.g. */15 * * * *) into plain English schedules.",
    "description": "Decode 5-part or 6-part cron expressions into human-readable schedules with upcoming run times.",
    "category": "Code Formatters",
    "iconName": "Clock",
    "usageCount": 89400,
    "tags": [
      "cron",
      "crontab",
      "schedule",
      "parser",
      "devops"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter cron expression",
        "desc": "E.g. 0 12 * * 1-5."
      },
      {
        "step": 2,
        "title": "Read English summary",
        "desc": "Explains \"At 12:00 PM, Monday through Friday\"."
      },
      {
        "step": 3,
        "title": "View next run dates",
        "desc": "Lists upcoming 5 execution dates."
      }
    ],
    "faqs": [
      {
        "question": "What do the 5 fields represent?",
        "answer": "Minute, Hour, Day of Month, Month, Day of Week."
      }
    ]
  },
  {
    "id": "jwt-decoder-inspector",
    "slug": "jwt-decoder-inspector",
    "name": "JSON Web Token (JWT) Decoder & Header Inspector",
    "shortDesc": "Decode JWT token header, payload claims, and expiration timestamps.",
    "description": "Decode Base64Url JWT bearer tokens to inspect claim properties and expiration dates without secret keys.",
    "category": "Code Formatters",
    "iconName": "ShieldCheck",
    "usageCount": 124300,
    "tags": [
      "jwt",
      "token",
      "decoder",
      "auth",
      "oauth"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JWT string",
        "desc": "Paste eyJhbGciOi..."
      },
      {
        "step": 2,
        "title": "Inspect decoded JSON",
        "desc": "View Header (alg, typ) and Payload (sub, exp, iat)."
      },
      {
        "step": 3,
        "title": "Check expiration status",
        "desc": "Highlights whether token is active or expired."
      }
    ],
    "faqs": [
      {
        "question": "Are my tokens sent anywhere?",
        "answer": "No, token parsing is 100% client-side in browser JS."
      }
    ]
  },
  {
    "id": "curl-to-fetch-converter",
    "slug": "curl-to-fetch-converter",
    "name": "cURL Command to JavaScript fetch() Converter",
    "shortDesc": "Convert cURL terminal commands into browser JavaScript fetch() code snippets.",
    "description": "Transform command-line cURL API calls into clean JS fetch() or async/await code snippets.",
    "category": "Code Formatters",
    "iconName": "Terminal",
    "usageCount": 79200,
    "tags": [
      "curl",
      "fetch",
      "javascript",
      "api",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste cURL command",
        "desc": "Paste curl -X POST https://api.example.com..."
      },
      {
        "step": 2,
        "title": "Auto parse",
        "desc": "Parses method, headers, and body parameters."
      },
      {
        "step": 3,
        "title": "Copy fetch() code",
        "desc": "Copy ready-to-run JS snippet."
      }
    ],
    "faqs": [
      {
        "question": "Does it support headers and bearer tokens?",
        "answer": "Yes, -H \"Authorization: Bearer ...\" maps to fetch headers object."
      }
    ]
  },
  {
    "id": "curl-to-python-converter",
    "slug": "curl-to-python-converter",
    "name": "cURL to Python requests Converter",
    "shortDesc": "Convert cURL commands into Python requests library script snippets.",
    "description": "Translate cURL terminal commands into clean Python requests.post() or requests.get() code.",
    "category": "Code Formatters",
    "iconName": "Terminal",
    "usageCount": 68100,
    "tags": [
      "curl",
      "python",
      "requests",
      "api",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste cURL command",
        "desc": "Enter cURL syntax."
      },
      {
        "step": 2,
        "title": "Generate Python script",
        "desc": "Parses headers, params, json payload."
      },
      {
        "step": 3,
        "title": "Copy Python code",
        "desc": "Copy script."
      }
    ],
    "faqs": [
      {
        "question": "Are JSON payloads mapped correctly?",
        "answer": "Yes, mapped to python json= parameter."
      }
    ]
  },
  {
    "id": "chmod-calculator",
    "slug": "chmod-calculator",
    "name": "Linux chmod File Permissions Calculator",
    "shortDesc": "Calculate numeric octal (e.g. 755, 644) and symbolic (rwxr-xr-x) Linux permissions.",
    "description": "Interactive checkbox calculator for Linux file permissions (Owner, Group, Public read/write/execute).",
    "category": "Code Formatters",
    "iconName": "Terminal",
    "usageCount": 62400,
    "tags": [
      "chmod",
      "linux",
      "permissions",
      "octal",
      "755"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Check Read/Write/Execute boxes",
        "desc": "Select permissions for User, Group, Others."
      },
      {
        "step": 2,
        "title": "Read octal code",
        "desc": "View 755 or 644 number."
      },
      {
        "step": 3,
        "title": "Copy chmod command",
        "desc": "Copy chmod 755 filename."
      }
    ],
    "faqs": [
      {
        "question": "What does chmod 755 mean?",
        "answer": "User has full rwx (7), Group has rx (5), Others have rx (5)."
      }
    ]
  },
  {
    "id": "htaccess-redirect-generator",
    "slug": "htaccess-redirect-generator",
    "name": "Apache .htaccess Redirect Rule Generator",
    "shortDesc": "Generate 301 redirects, WWW vs non-WWW rules, and HTTPS force rules.",
    "description": "Build Apache .htaccess rewrite rules for 301 redirects, HTTPS enforcement, and custom error pages.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 45200,
    "tags": [
      "htaccess",
      "apache",
      "redirect",
      "301",
      "rewrite"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select rule type",
        "desc": "Choose Force HTTPS, WWW to non-WWW, or 301 Page Redirect."
      },
      {
        "step": 2,
        "title": "Enter domain or paths",
        "desc": "Specify target URLs."
      },
      {
        "step": 3,
        "title": "Copy .htaccess code",
        "desc": "Paste into server .htaccess file."
      }
    ],
    "faqs": [
      {
        "question": "What is a 301 Permanent Redirect?",
        "answer": "Tells search engines and browsers that a URL has permanently moved to a new location."
      }
    ]
  },
  {
    "id": "nginx-config-formatter",
    "slug": "nginx-config-formatter",
    "name": "Nginx Location Block Generator",
    "shortDesc": "Generate Nginx server block, location proxy_pass, and header directives.",
    "description": "Configure Nginx reverse proxy directives, SSL configs, and static asset caching rules.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 51200,
    "tags": [
      "nginx",
      "server block",
      "proxy_pass",
      "config",
      "devops"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set domain & port",
        "desc": "E.g. example.com proxying to localhost:3000."
      },
      {
        "step": 2,
        "title": "Toggle options",
        "desc": "Enable WebSocket proxying or gzip compression."
      },
      {
        "step": 3,
        "title": "Copy Nginx snippet",
        "desc": "Paste into /etc/nginx/sites-available/."
      }
    ],
    "faqs": [
      {
        "question": "Does it support WebSocket upgrade headers?",
        "answer": "Yes, includes proxy_set_header Upgrade $http_upgrade directives."
      }
    ]
  },
  {
    "id": "flexbox-css-generator",
    "slug": "flexbox-css-generator",
    "name": "CSS Flexbox Layout Generator",
    "shortDesc": "Visual CSS Flexbox container and item alignment property builder.",
    "description": "Visually test flex-direction, justify-content, align-items, and gap properties with live preview.",
    "category": "Code Formatters",
    "iconName": "LayoutGrid",
    "usageCount": 88200,
    "tags": [
      "flexbox",
      "css",
      "layout",
      "generator",
      "frontend"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Click flex controls",
        "desc": "Toggle row/column, center, space-between."
      },
      {
        "step": 2,
        "title": "Observe live boxes",
        "desc": "Visual items adjust immediately."
      },
      {
        "step": 3,
        "title": "Copy CSS rules",
        "desc": "Copy CSS container code."
      }
    ],
    "faqs": [
      {
        "question": "Is modern gap property supported?",
        "answer": "Yes, gap property CSS rules included."
      }
    ]
  },
  {
    "id": "css-grid-layout-generator",
    "slug": "css-grid-layout-generator",
    "name": "CSS Grid Template Area Generator",
    "shortDesc": "Interactively design CSS grid-template-columns and grid-template-rows layout grids.",
    "description": "Visual 2D CSS grid layout builder to design responsive grid containers and areas.",
    "category": "Code Formatters",
    "iconName": "LayoutGrid",
    "usageCount": 82100,
    "tags": [
      "css grid",
      "layout",
      "grid template",
      "css",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set columns & rows",
        "desc": "E.g. 3 columns fr, 2 rows auto."
      },
      {
        "step": 2,
        "title": "Adjust gap spacing",
        "desc": "Set pixel or rem gap."
      },
      {
        "step": 3,
        "title": "Copy CSS grid code",
        "desc": "Copy container CSS."
      }
    ],
    "faqs": [
      {
        "question": "What does 1fr mean?",
        "answer": "A fractional unit representing 1 share of available grid space."
      }
    ]
  },
  {
    "id": "css-box-shadow-generator",
    "slug": "css-box-shadow-generator",
    "name": "CSS Box Shadow & Glow Generator",
    "shortDesc": "Design smooth multi-layered CSS box-shadows with blur, spread, and inset controls.",
    "description": "Build modern elevated card drop shadows and neon outer glow box shadows visually.",
    "category": "Code Formatters",
    "iconName": "Box",
    "usageCount": 104100,
    "tags": [
      "css",
      "box shadow",
      "drop shadow",
      "glow",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Slide X, Y, Blur, Spread",
        "desc": "Adjust shadow controls."
      },
      {
        "step": 2,
        "title": "Pick shadow color & opacity",
        "desc": "Set RGBA color."
      },
      {
        "step": 3,
        "title": "Copy box-shadow CSS",
        "desc": "Copy CSS property."
      }
    ],
    "faqs": [
      {
        "question": "Does it support inset shadows?",
        "answer": "Yes, toggle Inset checkbox for inner shadows."
      }
    ]
  },
  {
    "id": "css-border-radius-generator",
    "slug": "css-border-radius-generator",
    "name": "CSS Border Radius Fancy Shape Generator",
    "shortDesc": "Design organic asymmetrical CSS border-radius blob shapes.",
    "description": "Visual 8-value border-radius generator to create unique organic geometric shapes.",
    "category": "Code Formatters",
    "iconName": "Box",
    "usageCount": 49200,
    "tags": [
      "border radius",
      "css",
      "fancy shape",
      "blob",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Drag 4 corner handles",
        "desc": "Adjust individual horizontal & vertical radii."
      },
      {
        "step": 2,
        "title": "Preview organic shape",
        "desc": "View live blob container."
      },
      {
        "step": 3,
        "title": "Copy border-radius CSS",
        "desc": "Copy property rule."
      }
    ],
    "faqs": [
      {
        "question": "Why use 8-value border-radius?",
        "answer": "Syntax like 60% 40% 30% 70% / 60% 30% 70% 40% creates natural organic curves."
      }
    ]
  },
  {
    "id": "css-cubic-bezier-generator",
    "slug": "css-cubic-bezier-generator",
    "name": "CSS Cubic Bezier Transition Curve Generator",
    "shortDesc": "Interact with cubic-bezier transition handles (p1, p2) to create smooth animations.",
    "description": "Design custom CSS animation easing curves (ease-in-out, spring bounce) with visual curve graphs.",
    "category": "Code Formatters",
    "iconName": "Workflow",
    "usageCount": 39200,
    "tags": [
      "cubic bezier",
      "css transition",
      "easing",
      "animation",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Drag Bezier control handles",
        "desc": "Adjust slope points."
      },
      {
        "step": 2,
        "title": "Test animation preview",
        "desc": "Watch box animate across screen."
      },
      {
        "step": 3,
        "title": "Copy cubic-bezier() string",
        "desc": "Paste into CSS transition."
      }
    ],
    "faqs": [
      {
        "question": "Can values exceed 1.0?",
        "answer": "Yes, values >1.0 create elastic overshoot bounce effects."
      }
    ]
  },
  {
    "id": "css-keyframe-animation-builder",
    "slug": "css-keyframe-animation-builder",
    "name": "CSS Keyframe Animation Generator",
    "shortDesc": "Build multi-step @keyframes CSS animation code (0%, 50%, 100%).",
    "description": "Build pulse, spin, bounce, or fade @keyframes CSS animation blocks visually.",
    "category": "Code Formatters",
    "iconName": "Zap",
    "usageCount": 42100,
    "tags": [
      "keyframes",
      "css animation",
      "pulse",
      "spin",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select animation preset",
        "desc": "Choose Pulse, Bounce, or Spin."
      },
      {
        "step": 2,
        "title": "Adjust duration & iteration",
        "desc": "E.g. 2s infinite."
      },
      {
        "step": 3,
        "title": "Copy @keyframes CSS",
        "desc": "Paste into stylesheet."
      }
    ],
    "faqs": [
      {
        "question": "Is hardware acceleration recommended?",
        "answer": "Use transform and opacity properties for 60fps GPU rendering."
      }
    ]
  },
  {
    "id": "css-clamp-calculator",
    "slug": "css-clamp-calculator",
    "name": "CSS clamp() Fluid Typography Calculator",
    "shortDesc": "Calculate fluid font sizes clamp(min, val, max) across viewport widths.",
    "description": "Calculate responsive CSS clamp() formulas for smooth scaling typography without media queries.",
    "category": "Code Formatters",
    "iconName": "Maximize2",
    "usageCount": 68200,
    "tags": [
      "css clamp",
      "fluid typography",
      "responsive font",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter min & max font size",
        "desc": "E.g. 16px at 320px viewport to 32px at 1200px viewport."
      },
      {
        "step": 2,
        "title": "Calculate formula",
        "desc": "Generates clamp(1rem, 0.5rem + 2.5vw, 2rem)."
      },
      {
        "step": 3,
        "title": "Copy CSS clamp() rule",
        "desc": "Paste into CSS font-size."
      }
    ],
    "faqs": [
      {
        "question": "Why use clamp() for font sizes?",
        "answer": "Allows text to scale smoothly between min and max bounds based on viewport width."
      }
    ]
  },
  {
    "id": "css-triangle-generator",
    "slug": "css-triangle-generator",
    "name": "CSS Pure Shapes & Triangle Generator",
    "shortDesc": "Generate pure CSS border triangles pointing Up, Down, Left, or Right.",
    "description": "Generate lightweight pure CSS border triangles for tooltips and popover pointers without images.",
    "category": "Code Formatters",
    "iconName": "Box",
    "usageCount": 38100,
    "tags": [
      "css triangle",
      "tooltip",
      "border",
      "shapes",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose direction",
        "desc": "Select Up, Down, Left, or Right."
      },
      {
        "step": 2,
        "title": "Set width, height & color",
        "desc": "Adjust triangle dimensions."
      },
      {
        "step": 3,
        "title": "Copy CSS code",
        "desc": "Copy border tricks snippet."
      }
    ],
    "faqs": [
      {
        "question": "How do CSS triangles work?",
        "answer": "By setting 0px width/height and using transparent borders on 3 sides."
      }
    ]
  },
  {
    "id": "css-glassmorphism-generator",
    "slug": "css-glassmorphism-generator",
    "name": "CSS Glassmorphism Backdrop Filter Generator",
    "shortDesc": "Design frosted glass UI cards using CSS backdrop-filter: blur().",
    "description": "Build translucent frosted glass UI cards with border highlights and background blurs.",
    "category": "Code Formatters",
    "iconName": "Layers",
    "usageCount": 92400,
    "tags": [
      "glassmorphism",
      "frosted glass",
      "backdrop filter",
      "css",
      "ui design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Slide Blur & Opacity",
        "desc": "Adjust backdrop blur (px) and white opacity (%)."
      },
      {
        "step": 2,
        "title": "Set border highlights",
        "desc": "Fine-tune subtle white border outlines."
      },
      {
        "step": 3,
        "title": "Copy glass CSS",
        "desc": "Copy backdrop-filter CSS properties."
      }
    ],
    "faqs": [
      {
        "question": "Is backdrop-filter widely supported?",
        "answer": "Yes, supported in all modern WebKit and Chromium browsers."
      }
    ]
  },
  {
    "id": "css-neumorphism-generator",
    "slug": "css-neumorphism-generator",
    "name": "CSS Neumorphism UI Shadow Generator",
    "shortDesc": "Design soft extruded 3D UI cards with dual light and dark box-shadows.",
    "description": "Generate soft plastic neumorphic UI buttons and inset containers.",
    "category": "Code Formatters",
    "iconName": "Box",
    "usageCount": 41200,
    "tags": [
      "neumorphism",
      "soft ui",
      "box shadow",
      "css",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose background tint",
        "desc": "Pick soft neutral color (e.g. #e0e5ec)."
      },
      {
        "step": 2,
        "title": "Set distance & blur",
        "desc": "Generates dual light top-left and dark bottom-right shadows."
      },
      {
        "step": 3,
        "title": "Copy neumorphic CSS",
        "desc": "Paste into stylesheet."
      }
    ],
    "faqs": [
      {
        "question": "What is Neumorphism?",
        "answer": "A UI style that mimics extruded soft plastic shapes using subtle dual shadows."
      }
    ]
  },
  {
    "id": "js-event-key-code-inspector",
    "slug": "js-event-key-code-inspector",
    "name": "JavaScript Keyboard Event KeyCode Inspector",
    "shortDesc": "Press any key to inspect event.key, event.code, event.keyCode, and modifier flags.",
    "description": "Instant event listener debugging tool to inspect keyboard event properties in browser.",
    "category": "Code Formatters",
    "iconName": "Terminal",
    "usageCount": 71200,
    "tags": [
      "event keycode",
      "keyboard",
      "event.key",
      "event.code",
      "javascript"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Press any keyboard key",
        "desc": "E.g. Enter, Space, Escape, or Shift."
      },
      {
        "step": 2,
        "title": "Inspect values",
        "desc": "Displays event.key (\"Enter\"), event.code (\"Enter\"), event.keyCode (13)."
      },
      {
        "step": 3,
        "title": "Copy code snippet",
        "desc": "Copy if (e.key === \"Enter\") JS check."
      }
    ],
    "faqs": [
      {
        "question": "Is event.keyCode deprecated?",
        "answer": "Yes, modern JS recommends using event.key or event.code instead."
      }
    ]
  },
  {
    "id": "http-status-code-checker",
    "slug": "http-status-code-checker",
    "name": "HTTP Response Status Code Reference",
    "shortDesc": "Search and inspect all HTTP status codes (200, 301, 404, 500, 418).",
    "description": "Complete searchable reference guide for 1xx, 2xx, 3xx, 4xx, and 5xx HTTP response codes.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 88100,
    "tags": [
      "http status",
      "404",
      "200",
      "500",
      "rest api",
      "reference"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Search status code",
        "desc": "Type number (e.g. 401 or 503)."
      },
      {
        "step": 2,
        "title": "Read description",
        "desc": "Inspect RFC definition and REST API usage scenarios."
      },
      {
        "step": 3,
        "title": "Copy summary",
        "desc": "Copy reference details."
      }
    ],
    "faqs": [
      {
        "question": "What is HTTP 418?",
        "answer": "RFC 2324 \"I'm a teapot\" April Fools protocol response code."
      }
    ]
  },
  {
    "id": "user-agent-parser",
    "slug": "user-agent-parser",
    "name": "Browser User-Agent String Inspector",
    "shortDesc": "Parse browser family, OS version, device type, and engine from User-Agent strings.",
    "description": "Inspect your active browser User-Agent header or parse external UA strings.",
    "category": "Code Formatters",
    "iconName": "Terminal",
    "usageCount": 65200,
    "tags": [
      "user agent",
      "parser",
      "browser",
      "os",
      "device"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "View active User-Agent",
        "desc": "Auto-detects current browser headers."
      },
      {
        "step": 2,
        "title": "Or paste custom UA string",
        "desc": "Paste mobile or bot UA."
      },
      {
        "step": 3,
        "title": "Read breakdown",
        "desc": "Displays Browser, OS, Architecture, and Engine."
      }
    ],
    "faqs": [
      {
        "question": "What is User-Agent Client Hints?",
        "answer": "Modern privacy-focused headers replacing legacy long UA strings."
      }
    ]
  },
  {
    "id": "ip-subnet-calculator",
    "slug": "ip-subnet-calculator",
    "name": "IPv4 Subnet & CIDR Calculator",
    "shortDesc": "Calculate subnet masks, network addresses, broadcast addresses, and usable IP counts.",
    "description": "Calculate CIDR notation (e.g. /24, /28) network range bounds and broadcast IPs.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 91400,
    "tags": [
      "ip",
      "subnet",
      "cidr",
      "networking",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter IP & CIDR mask",
        "desc": "E.g. 192.168.1.1/24."
      },
      {
        "step": 2,
        "title": "Calculate range",
        "desc": "Displays Netmask, Network IP, Broadcast IP, First & Last Usable IP."
      },
      {
        "step": 3,
        "title": "Read host count",
        "desc": "Calculates 254 usable host addresses for /24."
      }
    ],
    "faqs": [
      {
        "question": "Why are 2 addresses reserved in subnets?",
        "answer": "Network address (first) and Broadcast address (last) cannot be assigned to hosts."
      }
    ]
  },
  {
    "id": "ipv6-address-compressor",
    "slug": "ipv6-address-compressor",
    "name": "IPv6 Address Compressor & Expander",
    "shortDesc": "Compress expanded IPv6 addresses using double colon :: notation or expand them fully.",
    "description": "Convert between full 8-hextet IPv6 addresses and RFC 5952 canonical compressed forms.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 29800,
    "tags": [
      "ipv6",
      "compress",
      "expand",
      "networking",
      "ip"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste IPv6 address",
        "desc": "E.g. 2001:0db8:0000:0000:0000:8a2e:0370:7334."
      },
      {
        "step": 2,
        "title": "Compress",
        "desc": "Shortens zero blocks to 2001:db8::8a2e:370:7334."
      },
      {
        "step": 3,
        "title": "Expand",
        "desc": "Restores all 32 hex digits."
      }
    ],
    "faqs": [
      {
        "question": "How many times can :: appear in an IPv6 address?",
        "answer": "Only once per address to avoid ambiguity in zero count."
      }
    ]
  },
  {
    "id": "mac-address-formatter",
    "slug": "mac-address-formatter",
    "name": "MAC Address Format Converter",
    "shortDesc": "Convert MAC hardware addresses between colon, hyphen, dot, or raw hex formats.",
    "description": "Reformat MAC addresses to 00:1A:2B:3C:4D:5E, 00-1A-2B-3C-4D-5E, or 001a.2b3c.4d5e Cisco notation.",
    "category": "Code Formatters",
    "iconName": "Server",
    "usageCount": 31200,
    "tags": [
      "mac address",
      "formatter",
      "cisco",
      "networking",
      "hex"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste MAC address",
        "desc": "Enter any format."
      },
      {
        "step": 2,
        "title": "Select output style",
        "desc": "Choose Colon (:), Hyphen (-), Dot (.), or Uppercase."
      },
      {
        "step": 3,
        "title": "Copy formatted MAC",
        "desc": "Copy string."
      }
    ],
    "faqs": [
      {
        "question": "What is a MAC address?",
        "answer": "A 48-bit unique hardware identifier assigned to network interface controllers."
      }
    ]
  },
  {
    "id": "unix-timestamp-converter",
    "slug": "unix-timestamp-converter",
    "name": "Epoch Unix Timestamp Converter",
    "shortDesc": "Convert Unix epoch timestamps (seconds/milliseconds) to human readable dates.",
    "description": "Convert Unix epoch numbers (e.g. 1700000000) to local time, UTC, and ISO date strings.",
    "category": "Code Formatters",
    "iconName": "Clock",
    "usageCount": 142100,
    "tags": [
      "unix timestamp",
      "epoch",
      "converter",
      "date",
      "utc"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter timestamp or date",
        "desc": "Type epoch number or pick calendar date."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Generates Local Time, UTC, and Relative time (x days ago)."
      },
      {
        "step": 3,
        "title": "Copy timestamp",
        "desc": "Copy epoch seconds or milliseconds."
      }
    ],
    "faqs": [
      {
        "question": "What is Unix Epoch time?",
        "answer": "The number of seconds elapsed since January 1, 1970 00:00:00 UTC."
      }
    ]
  }
];

export default tools;
