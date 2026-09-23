import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "meta-tag-generator",
    "slug": "meta-tag-generator",
    "name": "SEO Meta Tag & OpenGraph Generator",
    "shortDesc": "Generate HTML meta tags, OpenGraph social card tags, and Twitter Cards.",
    "description": "Create complete SEO meta tag headers with live search result snippet preview cards for Google, Facebook, and Twitter.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 134200,
    "tags": [
      "seo",
      "meta tags",
      "opengraph",
      "twitter cards",
      "search"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Fill Page Details",
        "desc": "Enter title, description, URL, and og:image thumbnail."
      },
      {
        "step": 2,
        "title": "Preview Cards",
        "desc": "Inspect live Google SERP and Facebook social share previews."
      },
      {
        "step": 3,
        "title": "Copy Meta HTML",
        "desc": "Copy generated <meta> tags directly into your site <head>."
      }
    ],
    "faqs": [
      {
        "question": "What is ideal meta description length?",
        "answer": "Between 120 and 160 characters (approx. 960 pixels on desktop)."
      }
    ]
  },
  {
    "id": "keyword-density-analyzer",
    "slug": "keyword-density-analyzer",
    "name": "Keyword Density & Frequency Analyzer",
    "shortDesc": "Analyze keyword frequency, 1-word, 2-word, and 3-word n-gram density ratios.",
    "description": "Calculate word frequency percentages, detect keyword stuffing risks, and optimize content phrase distribution.",
    "category": "SERP & Search Optimization",
    "iconName": "BarChart3",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 81200,
    "tags": [
      "seo",
      "keywords",
      "density",
      "frequency",
      "n-grams"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste Content",
        "desc": "Paste article text into analyzer."
      },
      {
        "step": 2,
        "title": "Analyze Density",
        "desc": "Examines single words and multi-word phrase combinations."
      },
      {
        "step": 3,
        "title": "Optimize Content",
        "desc": "Adjust overused keywords to maintain a natural 1-2% density."
      }
    ],
    "faqs": [
      {
        "question": "What is a good keyword density target?",
        "answer": "Most SEO experts recommend maintaining 1% to 2% density for target keywords."
      }
    ]
  },
  {
    "id": "robots-txt-generator",
    "slug": "robots-txt-generator",
    "name": "Robots.txt Rules Generator",
    "shortDesc": "Generate robots.txt rules to allow/disallow Googlebot and search crawlers.",
    "description": "Build robots.txt crawler directives with User-agent rules, Disallow paths, and Sitemap locations.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "usageCount": 78100,
    "tags": [
      "robots.txt",
      "crawlers",
      "googlebot",
      "seo",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set crawler access",
        "desc": "Choose default Allow or Disallow for All or specific bots."
      },
      {
        "step": 2,
        "title": "Add path exceptions",
        "desc": "Enter paths like /admin or /private/."
      },
      {
        "step": 3,
        "title": "Add sitemap URL & Copy",
        "desc": "Copy robots.txt file for root server directory."
      }
    ],
    "faqs": [
      {
        "question": "Where should robots.txt be uploaded?",
        "answer": "At the exact domain root: https://example.com/robots.txt."
      }
    ]
  },
  {
    "id": "sitemap-xml-generator",
    "slug": "sitemap-xml-generator",
    "name": "Sitemap.xml Tag Builder",
    "shortDesc": "Build clean XML sitemap entries (<url>, <loc>, <lastmod>, <changefreq>).",
    "description": "Format compliant XML sitemap documents for Google Search Console index submission.",
    "category": "SERP & Search Optimization",
    "iconName": "FileText",
    "usageCount": 89400,
    "tags": [
      "sitemap",
      "xml",
      "google",
      "search console",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter site URLs",
        "desc": "Paste page URLs line by line."
      },
      {
        "step": 2,
        "title": "Set change frequency & priority",
        "desc": "E.g. daily, 0.8 priority."
      },
      {
        "step": 3,
        "title": "Copy sitemap.xml",
        "desc": "Save .xml file and submit to Search Console."
      }
    ],
    "faqs": [
      {
        "question": "What is maximum sitemap URL limit?",
        "answer": "A single sitemap.xml can hold up to 50,000 URLs or 50MB uncompressed."
      }
    ]
  },
  {
    "id": "canonical-url-tag-builder",
    "slug": "canonical-url-tag-builder",
    "name": "Canonical URL Tag Builder",
    "shortDesc": "Generate <link rel=\"canonical\"> tags to prevent duplicate content penalties.",
    "description": "Build canonical tag markup to consolidate link signals and specify primary page URLs.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 41200,
    "tags": [
      "canonical",
      "seo",
      "duplicate content",
      "link rel",
      "tags"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter preferred canonical URL",
        "desc": "E.g. https://example.com/page/."
      },
      {
        "step": 2,
        "title": "Generate tag",
        "desc": "Creates <link rel=\"canonical\" href=\"...\">."
      },
      {
        "step": 3,
        "title": "Paste in HTML <head>",
        "desc": "Add tag to page header."
      }
    ],
    "faqs": [
      {
        "question": "Why are canonical tags crucial?",
        "answer": "They prevent search engines from penalizing duplicate content across trailing slash or query variations."
      }
    ]
  },
  {
    "id": "href-lang-tag-generator",
    "slug": "href-lang-tag-generator",
    "name": "Hreflang Language Tag Generator",
    "shortDesc": "Generate hreflang tags for multi-language and international SEO targeting.",
    "description": "Generate rel=\"alternate\" hreflang HTML tags for English (en), Spanish (es), French (fr), and region codes.",
    "category": "SERP & Search Optimization",
    "iconName": "Globe",
    "usageCount": 38200,
    "tags": [
      "hreflang",
      "international seo",
      "language tags",
      "multilingual",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Add language & region codes",
        "desc": "Select en-US, es-ES, fr-FR."
      },
      {
        "step": 2,
        "title": "Enter corresponding URLs",
        "desc": "Provide localized page links."
      },
      {
        "step": 3,
        "title": "Copy hreflang block",
        "desc": "Paste in HTML <head>."
      }
    ],
    "faqs": [
      {
        "question": "What is x-default hreflang?",
        "answer": "The fallback URL for unmatched user language settings."
      }
    ]
  },
  {
    "id": "schema-json-ld-generator",
    "slug": "schema-json-ld-generator",
    "name": "Schema.org Structured Data (JSON-LD) Builder",
    "shortDesc": "Generate JSON-LD structured data for Articles, Products, FAQs, and Organizations.",
    "description": "Build Google Rich Snippet JSON-LD structured data markup for high search SERP visibility.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 94200,
    "tags": [
      "schema",
      "json-ld",
      "rich snippets",
      "structured data",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select schema type",
        "desc": "Choose Article, FAQPage, Product, or LocalBusiness."
      },
      {
        "step": 2,
        "title": "Fill schema fields",
        "desc": "Enter headline, author, prices, ratings."
      },
      {
        "step": 3,
        "title": "Copy JSON-LD script",
        "desc": "Embed <script type=\"application/ld+json\">."
      }
    ],
    "faqs": [
      {
        "question": "How to test schema code?",
        "answer": "Use Google's Rich Results Test tool."
      }
    ]
  },
  {
    "id": "title-tag-length-checker",
    "slug": "title-tag-length-checker",
    "name": "SEO Page Title Length & Pixel Checker",
    "shortDesc": "Measure title character count and pixel width to avoid Google SERP truncation.",
    "description": "Simulate Google desktop and mobile title truncation limits (max 60 chars / 580 pixels).",
    "category": "SERP & Search Optimization",
    "iconName": "Type",
    "usageCount": 71200,
    "tags": [
      "title tag",
      "pixel width",
      "truncation",
      "serp",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter page title",
        "desc": "Type proposed title."
      },
      {
        "step": 2,
        "title": "Check pixel width",
        "desc": "Calculates exact pixel width (Arial 18px font scale)."
      },
      {
        "step": 3,
        "title": "Ensure under 580px",
        "desc": "Adjust title to prevent ellipsis truncation."
      }
    ],
    "faqs": [
      {
        "question": "Why measure pixels instead of character count?",
        "answer": "Wide letters like \"W\" take more pixel width than narrow letters like \"i\"."
      }
    ]
  },
  {
    "id": "meta-description-pixel-checker",
    "slug": "meta-description-pixel-checker",
    "name": "Meta Description SERP Snippet Previewer",
    "shortDesc": "Measure meta description length and preview live Google snippet rendering.",
    "description": "Preview meta descriptions in Google search results for desktop and mobile viewports.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "usageCount": 68100,
    "tags": [
      "meta description",
      "snippet",
      "serp",
      "google preview",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type description",
        "desc": "Enter meta description text."
      },
      {
        "step": 2,
        "title": "Preview desktop & mobile",
        "desc": "Inspect Google snippet box."
      },
      {
        "step": 3,
        "title": "Optimize call-to-action",
        "desc": "Keep within 120-160 characters."
      }
    ],
    "faqs": [
      {
        "question": "Will Google always display my meta description?",
        "answer": "Google rewrites descriptions ~60% of the time if page text matches query better."
      }
    ]
  },
  {
    "id": "heading-structure-checker",
    "slug": "heading-structure-checker",
    "name": "HTML Heading Tag (H1-H6) Hierarchy Auditor",
    "shortDesc": "Paste HTML or text to audit heading tag order and check for missing H1 tags.",
    "description": "Validate document heading tag hierarchy (H1 -> H2 -> H3) to avoid skipped heading levels.",
    "category": "SERP & Search Optimization",
    "iconName": "Type",
    "usageCount": 52100,
    "tags": [
      "heading tags",
      "h1",
      "h2",
      "hierarchy",
      "seo audit"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste HTML or content",
        "desc": "Enter article markup."
      },
      {
        "step": 2,
        "title": "Inspect tree",
        "desc": "View nested tree of H1, H2, H3 tags."
      },
      {
        "step": 3,
        "title": "Fix hierarchy errors",
        "desc": "Ensure exactly one H1 tag per page."
      }
    ],
    "faqs": [
      {
        "question": "Can a page have multiple H1 tags?",
        "answer": "Technically valid in HTML5, but 1 unique H1 is best practice for clear SEO topics."
      }
    ]
  },
  {
    "id": "open-graph-preview-tool",
    "slug": "open-graph-preview-tool",
    "name": "Social Open Graph Card Simulator",
    "shortDesc": "Preview og:title, og:description, and og:image as Facebook & LinkedIn share cards.",
    "description": "Simulate how your URL link preview cards will look when shared on Facebook, LinkedIn, and Slack.",
    "category": "SERP & Search Optimization",
    "iconName": "Share2",
    "usageCount": 84200,
    "tags": [
      "open graph",
      "facebook card",
      "social preview",
      "og:image",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter OG tags",
        "desc": "Provide og:title, og:description, and og:image URL."
      },
      {
        "step": 2,
        "title": "Preview social card",
        "desc": "Inspect Facebook 1200x630 link preview."
      },
      {
        "step": 3,
        "title": "Copy OG markup",
        "desc": "Paste into site header."
      }
    ],
    "faqs": [
      {
        "question": "What is recommended og:image dimension?",
        "answer": "1200 x 630 pixels (1.91:1 aspect ratio)."
      }
    ]
  },
  {
    "id": "twitter-card-generator",
    "slug": "twitter-card-generator",
    "name": "X / Twitter Summary Card Builder",
    "shortDesc": "Build twitter:card, twitter:title, twitter:image, and twitter:site meta tags.",
    "description": "Generate Twitter Card markup for summary_large_image and summary card formats on X.",
    "category": "SERP & Search Optimization",
    "iconName": "Share2",
    "usageCount": 61200,
    "tags": [
      "twitter card",
      "x card",
      "social media",
      "meta tags",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose card type",
        "desc": "Select summary_large_image or summary."
      },
      {
        "step": 2,
        "title": "Fill handle & details",
        "desc": "Enter @username, title, description, image."
      },
      {
        "step": 3,
        "title": "Copy tags",
        "desc": "Embed tags in HTML."
      }
    ],
    "faqs": [
      {
        "question": "What is summary_large_image?",
        "answer": "Displays a large 2:1 ratio image card above tweet title."
      }
    ]
  },
  {
    "id": "redirect-301-generator",
    "slug": "redirect-301-generator",
    "name": "301 / 302 HTTP Redirect Rule Generator",
    "shortDesc": "Generate server redirect rules for Apache, Nginx, and Cloudflare.",
    "description": "Generate error-free 301 Permanent Redirect syntax for Nginx, .htaccess, or HTML meta refresh.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 49800,
    "tags": [
      "301 redirect",
      "nginx",
      "apache",
      "seo",
      "urls"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter old URL & new URL",
        "desc": "E.g. /old-page -> /new-page."
      },
      {
        "step": 2,
        "title": "Select server engine",
        "desc": "Choose Nginx, Apache .htaccess, or Cloudflare."
      },
      {
        "step": 3,
        "title": "Copy redirect rule",
        "desc": "Paste into server config."
      }
    ],
    "faqs": [
      {
        "question": "Does 301 redirect pass PageRank link equity?",
        "answer": "Yes, Google passes ~100% link equity through 301 permanent redirects."
      }
    ]
  },
  {
    "id": "url-slug-seo-optimizer",
    "slug": "url-slug-seo-optimizer",
    "name": "SEO URL Slug Sanitizer & Optimizer",
    "shortDesc": "Clean titles into short, keyword-dense lowercase URL slugs.",
    "description": "Strip stop words (and, the, of), punctuation, and accents to produce short SEO-friendly URL slugs.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 52400,
    "tags": [
      "url slug",
      "seo",
      "permalink",
      "sanitizer",
      "urls"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter headline",
        "desc": "Type article headline."
      },
      {
        "step": 2,
        "title": "Toggle stop word removal",
        "desc": "Strips filler words for concise URLs."
      },
      {
        "step": 3,
        "title": "Copy slug",
        "desc": "Use in CMS permalink setting."
      }
    ],
    "faqs": [
      {
        "question": "Are shorter URLs better for SEO?",
        "answer": "Short, clean URLs are easier for users to share and crawlers to parse."
      }
    ]
  },
  {
    "id": "image-alt-tag-generator",
    "slug": "image-alt-tag-generator",
    "name": "Image Alt Attribute Formula Builder",
    "shortDesc": "Format accessibility image alt text following WCAG & Google Image SEO guidelines.",
    "description": "Format concise, descriptive alt attributes for web images combining target keywords and image context.",
    "category": "SERP & Search Optimization",
    "iconName": "Image",
    "usageCount": 41800,
    "tags": [
      "alt text",
      "image seo",
      "wcag",
      "accessibility",
      "alt tag"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Describe image content",
        "desc": "What is shown in photo?"
      },
      {
        "step": 2,
        "title": "Add target keyword",
        "desc": "Include relevant page topic naturally."
      },
      {
        "step": 3,
        "title": "Copy alt=\"...\" code",
        "desc": "Paste into HTML <img> tag."
      }
    ],
    "faqs": [
      {
        "question": "Should decorative images have alt text?",
        "answer": "Decorative images should use empty alt=\"\" so screen readers skip them."
      }
    ]
  },
  {
    "id": "word-count-seo-evaluator",
    "slug": "word-count-seo-evaluator",
    "name": "SEO Content Length & Depth Evaluator",
    "shortDesc": "Evaluate article word count depth against search engine content benchmarks.",
    "description": "Benchmark content length against top-ranking search target averages (e.g. 1500+ words).",
    "category": "SERP & Search Optimization",
    "iconName": "FileText",
    "usageCount": 39100,
    "tags": [
      "word count",
      "seo",
      "content depth",
      "evaluator",
      "length"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste draft article",
        "desc": "Enter full text."
      },
      {
        "step": 2,
        "title": "Evaluate depth category",
        "desc": "Ranks content depth: Short, Medium, Comprehensive, In-Depth."
      },
      {
        "step": 3,
        "title": "Read recommendations",
        "desc": "Check heading and section recommendations."
      }
    ],
    "faqs": [
      {
        "question": "Is word count a direct Google ranking factor?",
        "answer": "Word count isn't a direct factor, but comprehensive coverage of user intent is."
      }
    ]
  },
  {
    "id": "readability-score-calculator",
    "slug": "readability-score-calculator",
    "name": "Flesch-Kincaid Readability Grade Calculator",
    "shortDesc": "Calculate Flesch Reading Ease and Flesch-Kincaid Grade Level for copy.",
    "description": "Calculate readability grade scores to ensure content is accessible to general web audiences.",
    "category": "SERP & Search Optimization",
    "iconName": "FileText",
    "usageCount": 64200,
    "tags": [
      "readability",
      "flesch kincaid",
      "grade level",
      "copywriting",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste article text",
        "desc": "Enter text."
      },
      {
        "step": 2,
        "title": "Calculate score",
        "desc": "Computes Flesch Reading Ease score (0-100)."
      },
      {
        "step": 3,
        "title": "Review grade level",
        "desc": "Target 60-70 ease score (8th grade level) for web copy."
      }
    ],
    "faqs": [
      {
        "question": "What is a good Flesch Reading Ease score?",
        "answer": "60 to 70 is considered plain English easily understood by 13-to-15-year-olds."
      }
    ]
  },
  {
    "id": "stop-words-remover",
    "slug": "stop-words-remover",
    "name": "SEO Stop Words Filter & Remover",
    "shortDesc": "Strip common stop words (a, in, of, the, is) from text and keywords.",
    "description": "Strip noise words from keyword lists to prepare clean search queries and URL parameters.",
    "category": "SERP & Search Optimization",
    "iconName": "Scissors",
    "usageCount": 32100,
    "tags": [
      "stop words",
      "filter",
      "keywords",
      "text cleaner",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste keyword list or text",
        "desc": "Enter words."
      },
      {
        "step": 2,
        "title": "Filter stop words",
        "desc": "Strips common English prepositions and articles."
      },
      {
        "step": 3,
        "title": "Copy clean keywords",
        "desc": "Copy keyword phrases."
      }
    ],
    "faqs": [
      {
        "question": "What are stop words?",
        "answer": "Extremely common words like \"the\", \"is\", \"at\" that search engines often ignore when processing queries."
      }
    ]
  },
  {
    "id": "anchor-text-diversity-analyzer",
    "slug": "anchor-text-diversity-analyzer",
    "name": "Anchor Text Classification Helper",
    "shortDesc": "Categorize link anchor text into Exact Match, Branded, Naked URL, or Generic.",
    "description": "Classify backlink anchor text distribution profiles to audit backlink safety.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 28400,
    "tags": [
      "anchor text",
      "backlinks",
      "link building",
      "classification",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste anchor text list",
        "desc": "Enter anchors."
      },
      {
        "step": 2,
        "title": "Classify types",
        "desc": "Categorizes Brand, URL, Keyword, Generic (\"click here\")."
      },
      {
        "step": 3,
        "title": "Inspect breakdown",
        "desc": "Displays percentage ratios."
      }
    ],
    "faqs": [
      {
        "question": "Why is anchor text diversity important?",
        "answer": "Over-optimized exact match anchor text can trigger Google Penguin penalty algorithms."
      }
    ]
  },
  {
    "id": "utm-builder-generator",
    "slug": "utm-builder-generator",
    "name": "Google Analytics UTM Tracking Link Builder",
    "shortDesc": "Build clean campaign tracking links with utm_source, utm_medium, and utm_campaign.",
    "description": "Build Google Analytics tracking campaign URLs with clean parameter encoding.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 112000,
    "tags": [
      "utm",
      "google analytics",
      "campaign builder",
      "tracking link",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Website URL",
        "desc": "E.g. https://example.com/landing/"
      },
      {
        "step": 2,
        "title": "Fill UTM parameters",
        "desc": "Enter Source (newsletter), Medium (email), Campaign (spring_sale)."
      },
      {
        "step": 3,
        "title": "Copy UTM Link",
        "desc": "Use in marketing emails and social ads."
      }
    ],
    "faqs": [
      {
        "question": "Are UTM parameters case-sensitive?",
        "answer": "Yes! utm_source=Twitter and utm_source=twitter will register as separate sources in GA4."
      }
    ]
  },
  {
    "id": "utm-link-parser",
    "slug": "utm-link-parser",
    "name": "UTM Parameter URL Inspector & Unpacker",
    "shortDesc": "Unpack and decode utm_source, utm_medium, utm_campaign from complex URLs.",
    "description": "Extract and inspect marketing tracking parameters embedded inside long URLs.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "usageCount": 38100,
    "tags": [
      "utm",
      "parser",
      "inspector",
      "urls",
      "analytics"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste tracked URL",
        "desc": "Enter URL with ?utm_..."
      },
      {
        "step": 2,
        "title": "View unpacked table",
        "desc": "Lists Source, Medium, Campaign, Term, Content."
      },
      {
        "step": 3,
        "title": "Copy clean base URL",
        "desc": "Strips tracking parameters to leave clean link."
      }
    ],
    "faqs": [
      {
        "question": "Does it strip tracking params?",
        "answer": "Yes, click \"Strip UTM\" to get clean destination URL."
      }
    ]
  },
  {
    "id": "domain-name-cleaner",
    "slug": "domain-name-cleaner",
    "name": "Domain Name & Hostname Extractor",
    "shortDesc": "Extract clean root domains (example.com) from list of raw URLs or links.",
    "description": "Strip protocol (https://), subdomains, query parameters, and paths to extract root domain hostnames.",
    "category": "SERP & Search Optimization",
    "iconName": "Globe",
    "usageCount": 45200,
    "tags": [
      "domain",
      "hostname",
      "extractor",
      "cleaner",
      "urls"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste link list",
        "desc": "Enter raw URLs."
      },
      {
        "step": 2,
        "title": "Extract domains",
        "desc": "Extracts clean hostnames."
      },
      {
        "step": 3,
        "title": "Deduplicate & Copy",
        "desc": "Copy unique domain list."
      }
    ],
    "faqs": [
      {
        "question": "Does it support subdomains?",
        "answer": "Optionally preserve or strip subdomains like blog.example.com."
      }
    ]
  },
  {
    "id": "url-query-parameter-extractor",
    "slug": "url-query-parameter-extractor",
    "name": "URL Query Parameter Key-Value Extractor",
    "shortDesc": "Parse URL search queries (?key=value&id=123) into clean structured tables.",
    "description": "Unpack complex URL query strings into key-value parameter tables.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "usageCount": 39400,
    "tags": [
      "url query",
      "parameters",
      "key value",
      "parser",
      "urls"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste long URL",
        "desc": "Enter URL with search parameters."
      },
      {
        "step": 2,
        "title": "Inspect key-value table",
        "desc": "Lists decoded parameter values."
      },
      {
        "step": 3,
        "title": "Copy JSON or CSV",
        "desc": "Export parameter map."
      }
    ],
    "faqs": [
      {
        "question": "Does it decode percent-encoded values?",
        "answer": "Yes, URL percent-encoding (e.g. %20 -> space) is decoded automatically."
      }
    ]
  },
  {
    "id": "search-snippet-simulator",
    "slug": "search-snippet-simulator",
    "name": "Google SERP Desktop & Mobile Previewer",
    "shortDesc": "Simulate exact Google desktop and mobile search result listings.",
    "description": "Simulate Google search engine result page (SERP) cards with custom title, URL breadcrumb, description, and rich snippet stars.",
    "category": "SERP & Search Optimization",
    "iconName": "Search",
    "usageCount": 88100,
    "tags": [
      "serp",
      "google preview",
      "mobile serp",
      "search snippet",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter title, URL, description",
        "desc": "Type page metadata."
      },
      {
        "step": 2,
        "title": "Toggle Desktop / Mobile view",
        "desc": "Inspect Google card layout."
      },
      {
        "step": 3,
        "title": "Add star rating & date",
        "desc": "Preview rich snippet badge extensions."
      }
    ],
    "faqs": [
      {
        "question": "What is mobile title character limit?",
        "answer": "Mobile displays up to ~55-60 characters depending on pixel width."
      }
    ]
  },
  {
    "id": "internal-link-ratio-calculator",
    "slug": "internal-link-ratio-calculator",
    "name": "Internal vs External Link Ratio Calculator",
    "shortDesc": "Calculate internal link vs external out-bound link count ratios from HTML.",
    "description": "Audit internal vs external anchor link balance across web articles.",
    "category": "SERP & Search Optimization",
    "iconName": "Link",
    "usageCount": 29800,
    "tags": [
      "internal links",
      "external links",
      "link ratio",
      "html",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste HTML content",
        "desc": "Enter article markup."
      },
      {
        "step": 2,
        "title": "Set domain hostname",
        "desc": "E.g. example.com."
      },
      {
        "step": 3,
        "title": "View link counts",
        "desc": "Displays internal links, external links, and follow/nofollow flags."
      }
    ],
    "faqs": [
      {
        "question": "Why are internal links vital for SEO?",
        "answer": "Internal links distribute PageRank link authority across your site hierarchy."
      }
    ]
  },
  {
    "id": "page-speed-checklist",
    "slug": "page-speed-checklist",
    "name": "Core Web Vitals & Optimization Checklist",
    "shortDesc": "Interactive checklist for LCP, INP, CLS Core Web Vitals optimization.",
    "description": "Actionable performance optimization checklist covering image compression, font preloading, and caching.",
    "category": "SERP & Search Optimization",
    "iconName": "Zap",
    "usageCount": 54100,
    "tags": [
      "core web vitals",
      "page speed",
      "lcp",
      "inp",
      "cls",
      "checklist"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Review performance criteria",
        "desc": "Check off LCP, INP, and CLS optimizations."
      },
      {
        "step": 2,
        "title": "Read implementation guides",
        "desc": "Learn how to defer non-critical JS and optimize web fonts."
      },
      {
        "step": 3,
        "title": "Export checklist",
        "desc": "Copy site performance audit status."
      }
    ],
    "faqs": [
      {
        "question": "What is INP?",
        "answer": "Interaction to Next Paint (INP) measures overall page responsiveness to user clicks and inputs."
      }
    ]
  },
  {
    "id": "mobile-first-seo-checklist",
    "slug": "mobile-first-seo-checklist",
    "name": "Mobile SEO Best Practices Inspector",
    "shortDesc": "Audit mobile-first indexing requirements, touch targets, and viewport meta tags.",
    "description": "Checklist to verify viewport meta settings, responsive font sizes, and mobile target padding.",
    "category": "SERP & Search Optimization",
    "iconName": "CheckSquare",
    "usageCount": 38200,
    "tags": [
      "mobile seo",
      "mobile-first",
      "viewport",
      "responsive",
      "checklist"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Audit viewport meta tag",
        "desc": "Verify <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">."
      },
      {
        "step": 2,
        "title": "Check touch targets",
        "desc": "Ensure buttons have minimum 44x44px touch areas."
      },
      {
        "step": 3,
        "title": "Export report",
        "desc": "Copy mobile compliance report."
      }
    ],
    "faqs": [
      {
        "question": "What is mobile-first indexing?",
        "answer": "Google predominantly uses the mobile version of content for indexing and ranking."
      }
    ]
  },
  {
    "id": "local-seo-nap-formatter",
    "slug": "local-seo-nap-formatter",
    "name": "Local SEO NAP (Name, Address, Phone) Formatter",
    "shortDesc": "Format consistent NAP information for local Google Business profiles.",
    "description": "Standardize Business Name, Address, and Phone Number (NAP) formatting across directory listings.",
    "category": "SERP & Search Optimization",
    "iconName": "Globe",
    "usageCount": 42100,
    "tags": [
      "local seo",
      "nap",
      "google business",
      "address",
      "formatter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter business details",
        "desc": "Type Name, Street Address, City, State, ZIP, Phone."
      },
      {
        "step": 2,
        "title": "Choose format style",
        "desc": "Standard USPS or Single Line format."
      },
      {
        "step": 3,
        "title": "Copy NAP block",
        "desc": "Paste across citation directories."
      }
    ],
    "faqs": [
      {
        "question": "Why is NAP consistency essential?",
        "answer": "Inconsistent address formats across directories confuse search engine local algorithms."
      }
    ]
  },
  {
    "id": "faq-schema-generator",
    "slug": "faq-schema-generator",
    "name": "FAQ Page Schema.org JSON-LD Builder",
    "shortDesc": "Build Google FAQ accordion rich snippet JSON-LD structured data.",
    "description": "Build Schema.org FAQPage structured data to trigger accordion expandable question boxes in Google search.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 79200,
    "tags": [
      "faq schema",
      "json-ld",
      "rich snippets",
      "accordions",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Questions & Answers",
        "desc": "Add Q&A pairs."
      },
      {
        "step": 2,
        "title": "Generate JSON-LD",
        "desc": "Creates @type: \"FAQPage\" schema object."
      },
      {
        "step": 3,
        "title": "Paste in page HTML",
        "desc": "Embed <script type=\"application/ld+json\">."
      }
    ],
    "faqs": [
      {
        "question": "Are FAQ rich snippets eligible for all sites?",
        "answer": "Google shows FAQ rich snippets primarily for authoritative government and health sites, but schema is valid for all."
      }
    ]
  },
  {
    "id": "article-schema-generator",
    "slug": "article-schema-generator",
    "name": "Article & NewsArticle Schema Builder",
    "shortDesc": "Generate Article or BlogPosting JSON-LD schema with author and publisher info.",
    "description": "Build Google News and Article JSON-LD markup with author Person objects and publisher Logos.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 65100,
    "tags": [
      "article schema",
      "blogposting",
      "json-ld",
      "author",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter article details",
        "desc": "Headline, image URL, publish date, author name."
      },
      {
        "step": 2,
        "title": "Add publisher info",
        "desc": "Organization name and logo URL."
      },
      {
        "step": 3,
        "title": "Copy JSON-LD script",
        "desc": "Embed in blog article HTML."
      }
    ],
    "faqs": [
      {
        "question": "Why specify author Person object?",
        "answer": "Supports Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals."
      }
    ]
  },
  {
    "id": "product-schema-generator",
    "slug": "product-schema-generator",
    "name": "Product & Offer Schema.org Builder",
    "shortDesc": "Generate Product schema with price, currency, availability, and review ratings.",
    "description": "Build Product and Offer JSON-LD schema for Google Shopping merchant search results.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 82400,
    "tags": [
      "product schema",
      "json-ld",
      "price",
      "google shopping",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter product info",
        "desc": "Product name, SKU, brand, price, currency."
      },
      {
        "step": 2,
        "title": "Set availability",
        "desc": "InStock, OutOfStock, or PreOrder."
      },
      {
        "step": 3,
        "title": "Copy Product JSON-LD",
        "desc": "Embed on e-commerce product page."
      }
    ],
    "faqs": [
      {
        "question": "Does it trigger price drops in SERP?",
        "answer": "Valid offer schema enables Google price and stock status badges."
      }
    ]
  },
  {
    "id": "breadcrumb-schema-generator",
    "slug": "breadcrumb-schema-generator",
    "name": "BreadcrumbList Schema.org Builder",
    "shortDesc": "Generate BreadcrumbList JSON-LD markup to display clean URL path trails in Google.",
    "description": "Replace raw URL links in Google search results with elegant hierarchical breadcrumb trails.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 51200,
    "tags": [
      "breadcrumb",
      "schema",
      "json-ld",
      "serp trail",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Define breadcrumb steps",
        "desc": "Home -> Category -> Subcategory -> Article."
      },
      {
        "step": 2,
        "title": "Provide page URLs",
        "desc": "Specify item link for each step."
      },
      {
        "step": 3,
        "title": "Copy Breadcrumb JSON-LD",
        "desc": "Paste into site template."
      }
    ],
    "faqs": [
      {
        "question": "What does BreadcrumbList do in search?",
        "answer": "Replaces plain URL strings with clean clickable category trails."
      }
    ]
  },
  {
    "id": "organization-schema-generator",
    "slug": "organization-schema-generator",
    "name": "Organization & LocalBusiness Schema Builder",
    "shortDesc": "Generate Organization schema with logo, social profiles, and contact points.",
    "description": "Build Google Knowledge Graph Organization JSON-LD markup with official logo and social sameAs links.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 58400,
    "tags": [
      "organization schema",
      "knowledge graph",
      "json-ld",
      "logo",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter organization details",
        "desc": "Company name, official site URL, logo URL."
      },
      {
        "step": 2,
        "title": "Add social profile links",
        "desc": "LinkedIn, X, Facebook, YouTube URLs."
      },
      {
        "step": 3,
        "title": "Copy Organization schema",
        "desc": "Embed on home page."
      }
    ],
    "faqs": [
      {
        "question": "What is sameAs property?",
        "answer": "Connects your official site to your verified social media profiles."
      }
    ]
  },
  {
    "id": "recipe-schema-generator",
    "slug": "recipe-schema-generator",
    "name": "Recipe Schema.org JSON-LD Builder",
    "shortDesc": "Generate Recipe schema with cook time, calories, ingredients, and rating stars.",
    "description": "Build recipe structured data for Google recipe search cards with cook times and calorie counts.",
    "category": "SERP & Search Optimization",
    "iconName": "Code",
    "usageCount": 34100,
    "tags": [
      "recipe schema",
      "json-ld",
      "cook time",
      "calories",
      "seo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter recipe info",
        "desc": "Title, prep time, cook time, calories."
      },
      {
        "step": 2,
        "title": "Add ingredients list",
        "desc": "Enter items separated by lines."
      },
      {
        "step": 3,
        "title": "Copy Recipe schema",
        "desc": "Embed on food blog post."
      }
    ],
    "faqs": [
      {
        "question": "Are prepTime and cookTime in ISO 8601 duration format?",
        "answer": "Yes, formatted as PT15M (15 minutes) or PT1H (1 hour)."
      }
    ]
  }
];
export default tools;
