import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "iso8601-date-formatter",
    "slug": "iso8601-date-formatter",
    "name": "ISO 8601 Date & Time String Formatter",
    "shortDesc": "Format date objects into ISO 8601 strings (2026-09-20T12:00:00Z) or RFC 2822.",
    "description": "Generate standardized ISO 8601 and RFC 2822 date-time strings for REST API payloads.",
    "category": "Web & API Utilities",
    "iconName": "Clock",
    "usageCount": 48200,
    "tags": [
      "iso 8601",
      "rfc 2822",
      "date format",
      "utc",
      "api"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick date & time",
        "desc": "Select date."
      },
      {
        "step": 2,
        "title": "Select timezone offset",
        "desc": "Choose UTC (Z) or local offset (+05:00)."
      },
      {
        "step": 3,
        "title": "Copy ISO string",
        "desc": "Copy ISO 8601 timestamp."
      }
    ],
    "faqs": [
      {
        "question": "Why is ISO 8601 preferred in APIs?",
        "answer": "Eliminates date ambiguity across international timezones."
      }
    ]
  },
  {
    "id": "diff-viewer-checker",
    "slug": "diff-viewer-checker",
    "name": "Code Line Difference & Diff Inspector",
    "shortDesc": "Compare two code snippets side-by-side to highlight modified lines.",
    "description": "Syntax-aware code diff viewer comparing two code versions line by line.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 88400,
    "tags": [
      "diff",
      "code diff",
      "compare",
      "git diff",
      "side by side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste original code",
        "desc": "Left panel."
      },
      {
        "step": 2,
        "title": "Paste modified code",
        "desc": "Right panel."
      },
      {
        "step": 3,
        "title": "Inspect diff",
        "desc": "Green additions and red deletions are highlighted."
      }
    ],
    "faqs": [
      {
        "question": "Does it support split or unified diff views?",
        "answer": "Toggle between side-by-side split and single column unified diff views."
      }
    ]
  },
  {
    "id": "markdown-table-generator",
    "slug": "markdown-table-generator",
    "name": "Markdown Table Code Generator",
    "shortDesc": "Visual table spreadsheet editor that outputs clean Markdown table syntax.",
    "description": "Enter spreadsheet cells visually to generate formatted Markdown table syntax with alignment indicators.",
    "category": "Web & API Utilities",
    "iconName": "Table",
    "usageCount": 65100,
    "tags": [
      "markdown table",
      "generator",
      "table",
      "alignment",
      "readme"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set rows & columns",
        "desc": "Add or remove table cells visually."
      },
      {
        "step": 2,
        "title": "Choose column alignment",
        "desc": "Align Left (:---), Center (:---:), Right (---:)."
      },
      {
        "step": 3,
        "title": "Copy Markdown code",
        "desc": "Paste into GitHub README.md."
      }
    ],
    "faqs": [
      {
        "question": "How is alignment specified in Markdown?",
        "answer": "Using colon positioning in header delimiter rows."
      }
    ]
  },
  {
    "id": "typescript-interface-from-json",
    "slug": "typescript-interface-from-json",
    "name": "JSON to TypeScript Interface Generator",
    "shortDesc": "Convert JSON API response payloads into strongly typed TypeScript interfaces.",
    "description": "Auto-generate TypeScript interface or type definitions from sample JSON response payloads.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 114200,
    "tags": [
      "typescript",
      "json",
      "interface",
      "type definition",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste sample JSON",
        "desc": "Enter API response object."
      },
      {
        "step": 2,
        "title": "Set Root Type name",
        "desc": "E.g. UserProfile."
      },
      {
        "step": 3,
        "title": "Copy TypeScript code",
        "desc": "Generates nested interfaces."
      }
    ],
    "faqs": [
      {
        "question": "Does it handle optional fields and arrays?",
        "answer": "Infers primitives, array item types, and optional properties."
      }
    ]
  },
  {
    "id": "json-schema-generator",
    "slug": "json-schema-generator",
    "name": "JSON to JSON Schema Generator",
    "shortDesc": "Generate draft-07 JSON Schema validation definitions from JSON samples.",
    "description": "Invert JSON data samples into draft-07 JSON Schema specification definitions.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 42100,
    "tags": [
      "json schema",
      "draft-07",
      "validation",
      "json",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste JSON object",
        "desc": "Enter sample JSON."
      },
      {
        "step": 2,
        "title": "Generate Schema",
        "desc": "Creates $schema, properties, type definitions."
      },
      {
        "step": 3,
        "title": "Copy Schema",
        "desc": "Copy JSON Schema document."
      }
    ],
    "faqs": [
      {
        "question": "What is JSON Schema used for?",
        "answer": "Validating API request bodies in Express, Fastify, or OpenAPI specs."
      }
    ]
  },
  {
    "id": "graphql-query-formatter",
    "slug": "graphql-query-formatter",
    "name": "GraphQL Query Formatter & Minifier",
    "shortDesc": "Beautify or minify GraphQL query documents, mutations, and fragments.",
    "description": "Format GraphQL query strings with clean field indentation and variable formatting.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 38200,
    "tags": [
      "graphql",
      "query",
      "formatter",
      "minifier",
      "api"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste GraphQL query",
        "desc": "Enter query { user { id name } }"
      },
      {
        "step": 2,
        "title": "Format Query",
        "desc": "Re-indents selection sets and field arguments."
      },
      {
        "step": 3,
        "title": "Copy output",
        "desc": "Copy formatted query."
      }
    ],
    "faqs": [
      {
        "question": "Does it support fragments?",
        "answer": "Yes, formats queries, mutations, subscriptions, and fragments."
      }
    ]
  },
  {
    "id": "dockerfile-linter-helper",
    "slug": "dockerfile-linter-helper",
    "name": "Dockerfile Best Practice Checker",
    "shortDesc": "Scan Dockerfile instructions for layer optimization, security, and root user warnings.",
    "description": "Linter helper to spot non-root USER best practices, multi-stage build suggestions, and cache optimization.",
    "category": "Web & API Utilities",
    "iconName": "Box",
    "usageCount": 51200,
    "tags": [
      "dockerfile",
      "docker",
      "linter",
      "devops",
      "containers"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste Dockerfile",
        "desc": "Enter Dockerfile instructions."
      },
      {
        "step": 2,
        "title": "Run analysis",
        "desc": "Checks FROM base images, RUN layer merging, and EXPOSE directives."
      },
      {
        "step": 3,
        "title": "Review suggestions",
        "desc": "Apply security and layer caching recommendations."
      }
    ],
    "faqs": [
      {
        "question": "Why use multi-stage Docker builds?",
        "answer": "To keep final container images lean by omitting build dependencies."
      }
    ]
  },
  {
    "id": "docker-compose-validator",
    "slug": "docker-compose-validator",
    "name": "Docker Compose YAML Syntax Checker",
    "shortDesc": "Validate docker-compose.yml structure, service definitions, ports, and volumes.",
    "description": "Syntax and property validator for docker-compose.yml version 3 specification files.",
    "category": "Web & API Utilities",
    "iconName": "Box",
    "usageCount": 48100,
    "tags": [
      "docker compose",
      "yaml",
      "validator",
      "containers",
      "devops"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste docker-compose.yml",
        "desc": "Enter YAML content."
      },
      {
        "step": 2,
        "title": "Validate schema",
        "desc": "Checks services, networks, volumes, and environment keys."
      },
      {
        "step": 3,
        "title": "Fix syntax issues",
        "desc": "Displays line numbers of indentation errors."
      }
    ],
    "faqs": [
      {
        "question": "What is version: \"3.8\"?",
        "answer": "Standard Docker Compose specification file version."
      }
    ]
  },
  {
    "id": "git-command-builder",
    "slug": "git-command-builder",
    "name": "Git Command Helper & Syntax Generator",
    "shortDesc": "Generate exact Git terminal commands for rebase, stash, cherry-pick, and undo.",
    "description": "Interactive selector to generate tricky Git commands for branch management, cherry-picking, and resetting commits.",
    "category": "Web & API Utilities",
    "iconName": "Terminal",
    "usageCount": 95400,
    "tags": [
      "git",
      "command builder",
      "stash",
      "rebase",
      "cherry pick"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select task",
        "desc": "Choose \"Undo Last Commit\", \"Stash Changes\", or \"Interactive Rebase\"."
      },
      {
        "step": 2,
        "title": "Fill parameters",
        "desc": "Enter branch name or commit hash."
      },
      {
        "step": 3,
        "title": "Copy Git command",
        "desc": "Paste into terminal."
      }
    ],
    "faqs": [
      {
        "question": "How to undo last commit keeping changes?",
        "answer": "git reset --soft HEAD~1"
      }
    ]
  },
  {
    "id": "gitignore-file-generator",
    "slug": "gitignore-file-generator",
    "name": "Custom .gitignore Template Generator",
    "shortDesc": "Generate curated .gitignore files for Node.js, Python, React, macOS, and VS Code.",
    "description": "Combine platform ignore rules (node_modules, .env, .DS_Store, .vscode) into a single clean .gitignore file.",
    "category": "Web & API Utilities",
    "iconName": "FileText",
    "usageCount": 88100,
    "tags": [
      "gitignore",
      "git",
      "template",
      "node",
      "python"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select tech stack badges",
        "desc": "Click Node, React, Python, macOS, VS Code."
      },
      {
        "step": 2,
        "title": "Combine rules",
        "desc": "Merges rules into unified .gitignore."
      },
      {
        "step": 3,
        "title": "Download .gitignore",
        "desc": "Save to repository root."
      }
    ],
    "faqs": [
      {
        "question": "Should .env files be ignored?",
        "answer": "Always! Never commit secret API keys or environment secrets to git."
      }
    ]
  },
  {
    "id": "package-json-formatter",
    "slug": "package-json-formatter",
    "name": "package.json Dependency Sorter",
    "shortDesc": "Alphabetize and clean package.json dependencies and devDependencies.",
    "description": "Sort NPM package.json dependencies alphabetically and format script keys.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 39400,
    "tags": [
      "package.json",
      "npm",
      "dependencies",
      "sorter",
      "javascript"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste package.json",
        "desc": "Enter JSON file."
      },
      {
        "step": 2,
        "title": "Sort dependencies",
        "desc": "Alphabetizes dependencies and devDependencies keys."
      },
      {
        "step": 3,
        "title": "Copy formatted package.json",
        "desc": "Save clean file."
      }
    ],
    "faqs": [
      {
        "question": "Does sorting affect NPM install?",
        "answer": "No, but keeps git diffs clean and easy to review."
      }
    ]
  },
  {
    "id": "semver-version-calculator",
    "slug": "semver-version-calculator",
    "name": "Semantic Versioning (SemVer) Calculator",
    "shortDesc": "Calculate MAJOR.MINOR.PATCH version increments and check ^ / ~ ranges.",
    "description": "Calculate SemVer increments (Major breaking, Minor feature, Patch bugfix) and evaluate version constraint ranges.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 34100,
    "tags": [
      "semver",
      "semantic versioning",
      "npm",
      "major minor patch",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter current version",
        "desc": "E.g. 1.4.2."
      },
      {
        "step": 2,
        "title": "Choose change type",
        "desc": "Select Patch (1.4.3), Minor (1.5.0), or Major (2.0.0)."
      },
      {
        "step": 3,
        "title": "Evaluate range constraints",
        "desc": "Test whether ^1.4.0 satisfies target version."
      }
    ],
    "faqs": [
      {
        "question": "What is caret ^ vs tilde ~ in package.json?",
        "answer": "^ permits minor and patch updates; ~ permits patch updates only."
      }
    ]
  },
  {
    "id": "string-escaping-utility",
    "slug": "string-escaping-utility",
    "name": "String Escape & Unescape Tool",
    "shortDesc": "Escape strings for JavaScript (\" \\n \\t \"), JSON, Java, or SQL.",
    "description": "Escape newlines, quotes, and backslashes for multi-language string literal embedding.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 42900,
    "tags": [
      "escape",
      "unescape",
      "string",
      "javascript",
      "json"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste raw multi-line string",
        "desc": "Enter text."
      },
      {
        "step": 2,
        "title": "Select target language",
        "desc": "Choose JavaScript string literal, JSON, or C#."
      },
      {
        "step": 3,
        "title": "Copy escaped string",
        "desc": "Copy string with \\n and \\\" escapes."
      }
    ],
    "faqs": [
      {
        "question": "What does unescaping do?",
        "answer": "Translates literal \\n back into actual multiline line breaks."
      }
    ]
  },
  {
    "id": "ascii-table-generator",
    "slug": "ascii-table-generator",
    "name": "ASCII Text Table Generator",
    "shortDesc": "Convert CSV or table data into monospaced ASCII box art (+---+---+).",
    "description": "Draw ASCII text box tables for code comments and terminal output displays.",
    "category": "Web & API Utilities",
    "iconName": "Terminal",
    "usageCount": 38100,
    "tags": [
      "ascii table",
      "box art",
      "monospaced",
      "terminal",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter table data",
        "desc": "Paste CSV or tabbed rows."
      },
      {
        "step": 2,
        "title": "Select box border style",
        "desc": "Choose Single line (+--+), Double line (╔═╦═╗), or Unicode."
      },
      {
        "step": 3,
        "title": "Copy ASCII table",
        "desc": "Paste into terminal or source code comment."
      }
    ],
    "faqs": [
      {
        "question": "Where are ASCII tables useful?",
        "answer": "In CLI tool terminal outputs, GitHub issue comments, and source documentation."
      }
    ]
  },
  {
    "id": "universal-json-formatter",
    "slug": "universal-json-formatter",
    "name": "Universal JSON Formatter",
    "shortDesc": "Instant client-side json formatter tool for developers.",
    "description": "Perform json formatter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 62887,
    "tags": [
      "developer tools",
      "json formatter",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON Formatter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON Formatter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON Formatter?",
        "answer": "Yes! All JSON Formatter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal JSON Formatter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-json-minifier",
    "slug": "online-json-minifier",
    "name": "Online JSON Minifier",
    "shortDesc": "Instant client-side json minifier tool for seo specialists.",
    "description": "Perform json minifier calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 58104,
    "tags": [
      "developer tools",
      "json minifier",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON Minifier controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON Minifier processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON Minifier?",
        "answer": "Yes! All JSON Minifier calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online JSON Minifier?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "json-validator-master",
    "slug": "json-validator-master",
    "name": "JSON Validator Master",
    "shortDesc": "Instant client-side json validator tool for finance managers.",
    "description": "Perform json validator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 171485,
    "tags": [
      "developer tools",
      "json validator",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON Validator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON Validator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON Validator?",
        "answer": "Yes! All JSON Validator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on JSON Validator Master?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-json-to-csv",
    "slug": "advanced-json-to-csv",
    "name": "Advanced JSON to CSV",
    "shortDesc": "Instant client-side json to csv tool for data processing.",
    "description": "Perform json to csv calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 76483,
    "tags": [
      "developer tools",
      "json to csv",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON to CSV controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON to CSV processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON to CSV?",
        "answer": "Yes! All JSON to CSV calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced JSON to CSV?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "csv-to-json-smart",
    "slug": "csv-to-json-smart",
    "name": "CSV to JSON (Smart)",
    "shortDesc": "Instant client-side csv to json tool for content creators.",
    "description": "Perform csv to json calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 133957,
    "tags": [
      "developer tools",
      "csv to json",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the CSV to JSON controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The CSV to JSON processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for CSV to JSON?",
        "answer": "Yes! All CSV to JSON calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on CSV to JSON (Smart)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "json-to-xml-client-side",
    "slug": "json-to-xml-client-side",
    "name": "JSON to XML Client-Side",
    "shortDesc": "Instant client-side json to xml tool for students.",
    "description": "Perform json to xml calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 56146,
    "tags": [
      "developer tools",
      "json to xml",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON to XML controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON to XML processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON to XML?",
        "answer": "Yes! All JSON to XML calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on JSON to XML Client-Side?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-xml-to-json",
    "slug": "easy-xml-to-json",
    "name": "Easy XML to JSON",
    "shortDesc": "Instant client-side xml to json tool for everyday use.",
    "description": "Perform xml to json calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 108482,
    "tags": [
      "developer tools",
      "xml to json",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the XML to JSON controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The XML to JSON processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for XML to JSON?",
        "answer": "Yes! All XML to JSON calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy XML to JSON?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-json-to-yaml",
    "slug": "custom-json-to-yaml",
    "name": "Custom JSON to YAML",
    "shortDesc": "Instant client-side json to yaml tool for ui ux testing.",
    "description": "Perform json to yaml calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 174364,
    "tags": [
      "developer tools",
      "json to yaml",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON to YAML controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON to YAML processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON to YAML?",
        "answer": "Yes! All JSON to YAML calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom JSON to YAML?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "yaml-to-json-dynamic",
    "slug": "yaml-to-json-dynamic",
    "name": "YAML to JSON Dynamic",
    "shortDesc": "Instant client-side yaml to json tool for writers.",
    "description": "Perform yaml to json calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 90848,
    "tags": [
      "developer tools",
      "yaml to json",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the YAML to JSON controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The YAML to JSON processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for YAML to JSON?",
        "answer": "Yes! All YAML to JSON calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on YAML to JSON Dynamic?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "json-path-tester-private",
    "slug": "json-path-tester-private",
    "name": "JSON Path Tester (Private)",
    "shortDesc": "Instant client-side json path tester tool for engineers.",
    "description": "Perform json path tester calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 58047,
    "tags": [
      "developer tools",
      "json path tester",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON Path Tester controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON Path Tester processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON Path Tester?",
        "answer": "Yes! All JSON Path Tester calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on JSON Path Tester (Private)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-json-diff",
    "slug": "browser-json-diff",
    "name": "Browser JSON Diff",
    "shortDesc": "Instant client-side json diff tool for security audits.",
    "description": "Perform json diff calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 163870,
    "tags": [
      "developer tools",
      "json diff",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JSON Diff controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JSON Diff processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JSON Diff?",
        "answer": "Yes! All JSON Diff calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser JSON Diff?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "base64-encoder-universal",
    "slug": "base64-encoder-universal",
    "name": "Base64 Encoder Universal",
    "shortDesc": "Instant client-side base64 encoder tool for web designers.",
    "description": "Perform base64 encoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 91874,
    "tags": [
      "developer tools",
      "base64 encoder",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Base64 Encoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Base64 Encoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Base64 Encoder?",
        "answer": "Yes! All Base64 Encoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Base64 Encoder Universal?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-base64-decoder",
    "slug": "online-base64-decoder",
    "name": "Online Base64 Decoder",
    "shortDesc": "Instant client-side base64 decoder tool for marketers.",
    "description": "Perform base64 decoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 158577,
    "tags": [
      "developer tools",
      "base64 decoder",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Base64 Decoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Base64 Decoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Base64 Decoder?",
        "answer": "Yes! All Base64 Decoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Base64 Decoder?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "master-url-encoder",
    "slug": "master-url-encoder",
    "name": "Master URL Encoder",
    "shortDesc": "Instant client-side url encoder tool for analysts.",
    "description": "Perform url encoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 43727,
    "tags": [
      "developer tools",
      "url encoder",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the URL Encoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The URL Encoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for URL Encoder?",
        "answer": "Yes! All URL Encoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Master URL Encoder?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "url-decoder-advanced",
    "slug": "url-decoder-advanced",
    "name": "URL Decoder Advanced",
    "shortDesc": "Instant client-side url decoder tool for digital publishing.",
    "description": "Perform url decoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 69469,
    "tags": [
      "developer tools",
      "url decoder",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the URL Decoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The URL Decoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for URL Decoder?",
        "answer": "Yes! All URL Decoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on URL Decoder Advanced?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "smart-html-entity-encoder",
    "slug": "smart-html-entity-encoder",
    "name": "Smart HTML Entity Encoder",
    "shortDesc": "Instant client-side html entity encoder tool for developers.",
    "description": "Perform html entity encoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 38928,
    "tags": [
      "developer tools",
      "html entity encoder",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the HTML Entity Encoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The HTML Entity Encoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for HTML Entity Encoder?",
        "answer": "Yes! All HTML Entity Encoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Smart HTML Entity Encoder?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-html-entity-decoder",
    "slug": "client-side-html-entity-decoder",
    "name": "Client-Side HTML Entity Decoder",
    "shortDesc": "Instant client-side html entity decoder tool for seo specialists.",
    "description": "Perform html entity decoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 182925,
    "tags": [
      "developer tools",
      "html entity decoder",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the HTML Entity Decoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The HTML Entity Decoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for HTML Entity Decoder?",
        "answer": "Yes! All HTML Entity Decoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side HTML Entity Decoder?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "html-formatter-easy",
    "slug": "html-formatter-easy",
    "name": "HTML Formatter Easy",
    "shortDesc": "Instant client-side html formatter tool for finance managers.",
    "description": "Perform html formatter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 63121,
    "tags": [
      "developer tools",
      "html formatter",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the HTML Formatter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The HTML Formatter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for HTML Formatter?",
        "answer": "Yes! All HTML Formatter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on HTML Formatter Easy?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-html-minifier",
    "slug": "custom-html-minifier",
    "name": "Custom HTML Minifier",
    "shortDesc": "Instant client-side html minifier tool for data processing.",
    "description": "Perform html minifier calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 94337,
    "tags": [
      "developer tools",
      "html minifier",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the HTML Minifier controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The HTML Minifier processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for HTML Minifier?",
        "answer": "Yes! All HTML Minifier calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom HTML Minifier?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "css-formatter-dynamic",
    "slug": "css-formatter-dynamic",
    "name": "CSS Formatter (Dynamic)",
    "shortDesc": "Instant client-side css formatter tool for content creators.",
    "description": "Perform css formatter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 88162,
    "tags": [
      "developer tools",
      "css formatter",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the CSS Formatter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The CSS Formatter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for CSS Formatter?",
        "answer": "Yes! All CSS Formatter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on CSS Formatter (Dynamic)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "css-minifier-private",
    "slug": "css-minifier-private",
    "name": "CSS Minifier Private",
    "shortDesc": "Instant client-side css minifier tool for students.",
    "description": "Perform css minifier calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 150507,
    "tags": [
      "developer tools",
      "css minifier",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the CSS Minifier controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The CSS Minifier processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for CSS Minifier?",
        "answer": "Yes! All CSS Minifier calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on CSS Minifier Private?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-js-formatter",
    "slug": "browser-js-formatter",
    "name": "Browser JS Formatter",
    "shortDesc": "Instant client-side js formatter tool for everyday use.",
    "description": "Perform js formatter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 93186,
    "tags": [
      "developer tools",
      "js formatter",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JS Formatter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JS Formatter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JS Formatter?",
        "answer": "Yes! All JS Formatter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser JS Formatter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "universal-js-minifier",
    "slug": "universal-js-minifier",
    "name": "Universal JS Minifier",
    "shortDesc": "Instant client-side js minifier tool for ui ux testing.",
    "description": "Perform js minifier calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 139366,
    "tags": [
      "developer tools",
      "js minifier",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JS Minifier controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JS Minifier processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JS Minifier?",
        "answer": "Yes! All JS Minifier calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal JS Minifier?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "sql-formatter-online",
    "slug": "sql-formatter-online",
    "name": "SQL Formatter Online",
    "shortDesc": "Instant client-side sql formatter tool for writers.",
    "description": "Perform sql formatter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Web & API Utilities",
    "iconName": "Code",
    "usageCount": 91119,
    "tags": [
      "developer tools",
      "sql formatter",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the SQL Formatter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The SQL Formatter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for SQL Formatter?",
        "answer": "Yes! All SQL Formatter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on SQL Formatter Online?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  }
];
export default tools;
