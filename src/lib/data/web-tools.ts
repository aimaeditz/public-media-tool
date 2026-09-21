import { Tool } from '../types';

export const WEB_TOOLS: Tool[] = [
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL Encoder & Decoder (encodeURIComponent)',
    shortDesc: 'Encode or decode strings for safe query parameter transmission.',
    description: 'Convert special query characters into %XX URL hex escapes or parse encoded URL strings.',
    category: 'Web Tools',
    iconName: 'Globe',
    isPopular: true,
    isLatest: false,
    usageCount: 142100,
    tags: ['url encoder', 'decoder', 'percent encoding', 'uri component', 'web'],
    howToUse: [
      { step: 1, title: 'Paste String', desc: 'Type URL string in input field.' },
      { step: 2, title: 'Select Encode or Decode', desc: 'Click encode or decode button.' },
      { step: 3, title: 'Copy Escaped Output', desc: 'Copy safe percent-encoded string.' }
    ],
    faqs: [
      { question: 'What characters are encoded by encodeURIComponent?', answer: 'Encodes all characters except A-Z a-z 0-9 - _ . ! ~ * \' ( )' }
    ]
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JSON Web Token (JWT) Header & Payload Decoder',
    shortDesc: 'Decode JWT token header, payload claims, expiration time, and signatures.',
    description: 'Inspect JWT tokens in real-time, decoding Header, Payload claims (sub, exp, iat, iss), and verify signature structure local to browser.',
    category: 'Web Tools',
    iconName: 'ShieldCheck',
    isPopular: true,
    isLatest: false,
    usageCount: 168400,
    tags: ['jwt', 'json web token', 'auth', 'payload', 'decoder', 'claims'],
    howToUse: [
      { step: 1, title: 'Paste JWT Token', desc: 'Paste eyJhbGciOiJKV1QiLC...' },
      { step: 2, title: 'Inspect JSON Sections', desc: 'Decodes Base64Url header and payload JSON objects.' },
      { step: 3, title: 'Check Expiration Status', desc: 'Checks `exp` timestamp against current time.' }
    ],
    faqs: [
      { question: 'Is my JWT sent to a remote server?', answer: 'No, decoding takes place 100% locally in your client browser session.' }
    ]
  },
  {
    id: 'user-agent-parser',
    slug: 'user-agent-parser',
    name: 'Browser User-Agent & Device Spec Inspector',
    shortDesc: 'Inspect browser engine, operating system, device screen resolution, and hardware.',
    description: 'Parse browser User-Agent strings to extract OS version, browser engine, client hardware, screen viewport, and touch capabilities.',
    category: 'Web Tools',
    iconName: 'Smartphone',
    isPopular: true,
    isLatest: true,
    usageCount: 112400,
    tags: ['user agent', 'browser inspect', 'device specs', 'screen resolution', 'os detector'],
    howToUse: [
      { step: 1, title: 'View Current Device Specs', desc: 'Auto-detects active browser session capabilities.' },
      { step: 2, title: 'Paste Custom UA String', desc: 'Optionally paste external User-Agent string to parse.' },
      { step: 3, title: 'Read Hardware Breakdown', desc: 'View OS name, CPU arch, rendering engine, and screen DPI.' }
    ],
    faqs: [
      { question: 'What is devicePixelRatio?', answer: 'Ratio of physical display pixels to CSS logical pixels (e.g. Retina displays = 2 or 3).' }
    ]
  },
  {
    id: 'dns-record-lookup-reference',
    slug: 'dns-record-lookup-reference',
    name: 'DNS Record Types Cheat Sheet & Validator',
    shortDesc: 'Inspect DNS record structures for A, AAAA, CNAME, MX, TXT, NS, and SOA.',
    description: 'Learn and validate DNS record syntax configurations for custom domain names.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 88100,
    tags: ['dns', 'domain', 'cname', 'mx record', 'txt record', 'cheat sheet'],
    howToUse: [
      { step: 1, title: 'Select record type', desc: 'Choose A, CNAME, MX, or TXT.' },
      { step: 2, title: 'View record syntax', desc: 'Inspect example records and TTL values.' },
      { step: 3, title: 'Validate domain string', desc: 'Tests syntax correctness for zone files.' }
    ],
    faqs: [{ question: 'What is a CNAME record?', answer: 'Canonical Name alias mapping one domain name to another domain.' }]
  },
  {
    id: 'ip-address-subnet-mask-calculator',
    slug: 'ip-address-subnet-mask-calculator',
    name: 'IPv4 Subnet & CIDR Mask Calculator',
    shortDesc: 'Calculate CIDR subnet ranges, usable IP counts, network addresses, and broadcast IPs.',
    description: 'Calculate IPv4 CIDR subnet ranges (/24, /16), netmasks, wildcards, and total usable host IPs.',
    category: 'Web Tools',
    iconName: 'Server',
    usageCount: 94200,
    tags: ['cidr', 'subnet', 'ipv4', 'netmask', 'network', 'calculator'],
    howToUse: [
      { step: 1, title: 'Enter IP address & CIDR prefix', desc: 'E.g. 192.168.1.1/24.' },
      { step: 2, title: 'Calculate subnet', desc: 'Computes Network IP, Broadcast IP, Netmask (255.255.255.0).' },
      { step: 3, title: 'Read usable host count', desc: 'Displays total usable IP addresses (254 hosts).' }
    ],
    faqs: [{ question: 'How many usable IPs in a /24 subnet?', answer: '254 usable IPs (256 total minus Network .0 and Broadcast .255).' }]
  },
  {
    id: 'ipv6-address-compressor-expander',
    slug: 'ipv6-address-compressor-expander',
    name: 'IPv6 Address Compression & Expansion Tool',
    shortDesc: 'Compress expanded 128-bit IPv6 addresses or expand compressed "::" syntax.',
    description: 'Compress full 128-bit IPv6 addresses using RFC 5952 rules or expand short "::" notation.',
    category: 'Web Tools',
    iconName: 'Server',
    usageCount: 42100,
    tags: ['ipv6', 'compress', 'expand', 'rfc 5952', 'networking', 'web'],
    howToUse: [
      { step: 1, title: 'Enter IPv6 address', desc: 'E.g. 2001:0db8:0000:0000:0000:8a2e:0370:7334.' },
      { step: 2, title: 'Click Compress / Expand', desc: 'Converts to 2001:db8::8a2e:370:7334 or expands fully.' },
      { step: 3, title: 'Copy converted address', desc: 'Copy string.' }
    ],
    faqs: [{ question: 'What does "::" mean in IPv6?', answer: 'Replaces a single contiguous run of zeros with double colons.' }]
  },
  {
    id: 'http-status-code-reference',
    slug: 'http-status-code-reference',
    name: 'HTTP Status Codes Dictionary & Search',
    shortDesc: 'Search all 1xx, 2xx, 3xx, 4xx, 5xx HTTP response codes with cause & solutions.',
    description: 'Comprehensive directory of HTTP response status codes with explanations and troubleshooting guides.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 114200,
    tags: ['http status codes', '404', '500', '301 redirect', 'rest api', 'dictionary'],
    howToUse: [
      { step: 1, title: 'Search code or keyword', desc: 'Type 401, 403, 502, "unauthorized", "gateway".' },
      { step: 2, title: 'Read specifications', desc: 'View RFC descriptions, server causes, and client fixes.' },
      { step: 3, title: 'Copy HTTP code snippet', desc: 'Copy code reference.' }
    ],
    faqs: [{ question: 'What is difference between 401 and 403 status codes?', answer: '401 means Unauthenticated (missing credentials); 403 means Forbidden (authenticated but lacking permissions).' }]
  },
  {
    id: 'http-request-header-parser',
    slug: 'http-request-header-parser',
    name: 'Raw HTTP Request / Response Header Inspector',
    shortDesc: 'Parse raw HTTP response headers into structured JSON Key-Value pairs.',
    description: 'Parse raw HTTP response headers into structured key-value maps.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 65200,
    tags: ['http headers', 'parser', 'key value', 'json', 'web'],
    howToUse: [
      { step: 1, title: 'Paste raw HTTP headers block', desc: 'Paste raw HTTP text.' },
      { step: 2, title: 'Parse headers', desc: 'Extracts status code and header key-value dictionary.' },
      { step: 3, title: 'Copy as JSON object', desc: 'Copy formatted JSON.' }
    ],
    faqs: [{ question: 'Is header name case-sensitive?', answer: 'HTTP header names are case-insensitive per HTTP specifications.' }]
  },
  {
    id: 'html-entity-encoder-decoder',
    slug: 'html-entity-encoder-decoder',
    name: 'HTML Entity Encoder & Decoder (&lt; &gt; &amp;)',
    shortDesc: 'Convert special HTML characters into entities (&amp;lt;, &amp;gt;, &amp;amp;, &amp;quot;) or decode.',
    description: 'Convert special characters into named/numeric HTML entities to prevent rendering errors.',
    category: 'Web Tools',
    iconName: 'Code',
    usageCount: 88400,
    tags: ['html entity', 'encoder', 'decoder', 'escape html', 'web'],
    howToUse: [
      { step: 1, title: 'Paste text or HTML string', desc: 'Type input string.' },
      { step: 2, title: 'Select Encode or Decode', desc: 'Converts < to &lt;, > to &gt;, & to &amp;.' },
      { step: 3, title: 'Copy escaped markup', desc: 'Copy output.' }
    ],
    faqs: [{ question: 'Why encode HTML entities?', answer: 'To safely display markup code as plain text without rendering as active DOM tags.' }]
  },
  {
    id: 'cookie-string-json-parser',
    slug: 'cookie-string-json-parser',
    name: 'HTTP Cookie Header String to JSON Parser',
    shortDesc: 'Parse raw document.cookie header strings into formatted JSON key-value objects.',
    description: 'Parse document.cookie string text into clean JSON key-value pairs.',
    category: 'Web Tools',
    iconName: 'Code',
    usageCount: 51200,
    tags: ['cookie parser', 'document.cookie', 'json', 'web', 'javascript'],
    howToUse: [
      { step: 1, title: 'Paste raw cookie string', desc: 'E.g. session_id=123; theme=dark; analytics_id=xyz;' },
      { step: 2, title: 'Parse to JSON', desc: 'Extracts key-value dictionary.' },
      { step: 3, title: 'Copy JSON object', desc: 'Copy output JSON.' }
    ],
    faqs: [{ question: 'How are cookies separated in document.cookie?', answer: 'Separated by semicolon and space (; ).' }]
  },
  {
    id: 'url-query-parameter-extractor',
    slug: 'url-query-parameter-extractor',
    name: 'URL Query Parameter Extractor & Builder',
    shortDesc: 'Parse complex URL query string parameters (?utm_source=...&id=...) into clean JSON.',
    description: 'Parse and build complex query strings from URLs.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 78200,
    tags: ['query parameters', 'url parser', 'utm tags', 'search params', 'json'],
    howToUse: [
      { step: 1, title: 'Paste target URL', desc: 'E.g. https://example.com/shop?cat=shoes&sort=price&page=2' },
      { step: 2, title: 'Extract parameter table', desc: 'Lists all query keys and decoded values.' },
      { step: 3, title: 'Add/Edit params & rebuild URL', desc: 'Re-generates updated URL.' }
    ],
    faqs: [{ question: 'Does it handle array parameters like ?tags=a&tags=b?', answer: 'Yes, groups duplicate keys into array values.' }]
  },
  {
    id: 'utm-builder-campaign-links',
    slug: 'utm-builder-campaign-links',
    name: 'Google Analytics UTM Campaign Link Builder',
    shortDesc: 'Build trackable marketing campaign URLs with utm_source, utm_medium, utm_campaign.',
    description: 'Build Google Analytics tracking campaign URLs with source, medium, campaign, term, and content params.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 91400,
    tags: ['utm builder', 'campaign tracking', 'google analytics', 'marketing link', 'web'],
    howToUse: [
      { step: 1, title: 'Enter destination URL', desc: 'E.g. https://example.com/landing-page.' },
      { step: 2, title: 'Enter Campaign Source & Medium', desc: 'E.g. source=newsletter, medium=email.' },
      { step: 3, title: 'Enter Campaign Name', desc: 'E.g. campaign=summer_sale.' }
    ],
    faqs: [{ question: 'Are UTM parameters case-sensitive in Google Analytics?', answer: 'Yes, "Newsletter" and "newsletter" track as separate sources in GA4 reports.' }]
  },
  {
    id: 'robots-txt-generator-validator',
    slug: 'robots-txt-generator-validator',
    name: 'Robots.txt Generator & Directives Validator',
    shortDesc: 'Build robots.txt files with User-Agent rules, Disallow paths, and Sitemap links.',
    description: 'Build robots.txt files with User-Agent rules, Disallow paths, and Sitemap declarations.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 84200,
    tags: ['robots.txt', 'seo', 'web crawlers', 'disallow', 'sitemap', 'generator'],
    howToUse: [
      { step: 1, title: 'Select User-Agent', desc: 'Default * or specific Googlebot/Bingbot.' },
      { step: 2, title: 'Add Disallow / Allow paths', desc: 'E.g. Disallow: /admin/ and /private/.' },
      { step: 3, title: 'Add Sitemap URL', desc: 'E.g. Sitemap: https://example.com/sitemap.xml.' }
    ],
    faqs: [{ question: 'Where must robots.txt be placed?', answer: 'In the root web directory at https://domain.com/robots.txt' }]
  },
  {
    id: 'sitemap-xml-generator-preview',
    slug: 'sitemap-xml-generator-preview',
    name: 'Sitemap.xml Generator & Syntax Formatter',
    shortDesc: 'Generate valid XML sitemaps with <url>, <loc>, <lastmod>, and <changefreq> tags.',
    description: 'Generate valid XML sitemap files for Google Search Console indexation.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 76200,
    tags: ['sitemap.xml', 'seo', 'google search console', 'xml generator', 'web'],
    howToUse: [
      { step: 1, title: 'Enter list of page URLs', desc: 'Type one URL per line.' },
      { step: 2, title: 'Set changefreq & priority', desc: 'Select daily, weekly, or monthly.' },
      { step: 3, title: 'Download sitemap.xml', desc: 'Copy formatted XML sitemap.' }
    ],
    faqs: [{ question: 'What is maximum URL limit per sitemap.xml file?', answer: 'Max 50,000 URLs and max 50 MB uncompressed size per file.' }]
  },
  {
    id: 'meta-tag-social-share-preview',
    slug: 'meta-tag-social-share-preview',
    name: 'Social Open Graph (OG) & Twitter Card Meta Tag Generator',
    shortDesc: 'Generate Open Graph (og:title, og:image) and Twitter Card tags with live preview.',
    description: 'Build Open Graph and Twitter Card HTML meta tags with visual previews for social media sharing.',
    category: 'Web Tools',
    iconName: 'Share2',
    usageCount: 98200,
    tags: ['open graph', 'og tags', 'twitter card', 'social meta tags', 'generator'],
    howToUse: [
      { step: 1, title: 'Enter Page Title & Description', desc: 'Type social title and summary text.' },
      { step: 2, title: 'Enter Image URL', desc: 'Provide 1200x630 banner photo link.' },
      { step: 3, title: 'Copy HTML <head> tags', desc: 'Paste into webpage <head> section.' }
    ],
    faqs: [{ question: 'What is ideal image size for Open Graph social cards?', answer: '1200 x 630 pixels (1.91:1 aspect ratio).' }]
  },
  {
    id: 'schema-org-json-ld-generator',
    slug: 'schema-org-json-ld-generator',
    name: 'Schema.org JSON-LD Structured Data Builder',
    shortDesc: 'Generate JSON-LD structured data for Article, Product, Organization, and FAQ.',
    description: 'Generate Schema.org JSON-LD structured data for Articles, Products, Organizations, and FAQs.',
    category: 'Web Tools',
    iconName: 'Code',
    usageCount: 65200,
    tags: ['json-ld', 'schema.org', 'structured data', 'rich snippets', 'seo'],
    howToUse: [
      { step: 1, title: 'Select schema type', desc: 'Choose Article, Product, FAQPage, or LocalBusiness.' },
      { step: 2, title: 'Fill schema fields', desc: 'Type name, author, price, question/answers.' },
      { step: 3, title: 'Copy <script type="application/ld+json"> snippet', desc: 'Paste into HTML.' }
    ],
    faqs: [{ question: 'Why use JSON-LD for SEO?', answer: 'Helps search engines understand page entity context and enables rich search result snippets.' }]
  },
  {
    id: 'css-flexbox-playground-generator',
    slug: 'css-flexbox-playground-generator',
    name: 'CSS Flexbox Visual Layout Generator',
    shortDesc: 'Interactively test flex-direction, justify-content, align-items, and copy CSS code.',
    description: 'Visual CSS Flexbox container playground with controls for direction, alignment, and wrapping.',
    category: 'Web Tools',
    iconName: 'Layout',
    usageCount: 112000,
    tags: ['flexbox', 'css layout', 'justify content', 'align items', 'playground'],
    howToUse: [
      { step: 1, title: 'Toggle flex-direction', desc: 'Row, Column, Row-reverse.' },
      { step: 2, title: 'Select justify-content & align-items', desc: 'Flex-start, Center, Space-between, Stretch.' },
      { step: 3, title: 'Copy CSS code snippet', desc: 'Copy generated CSS stylesheet rule.' }
    ],
    faqs: [{ question: 'What does space-between do in Flexbox?', answer: 'Distributes items evenly; first item is at start edge, last item at end edge.' }]
  },
  {
    id: 'css-grid-layout-generator',
    slug: 'css-grid-layout-generator',
    name: 'CSS Grid Template Columns Visual Builder',
    shortDesc: 'Build CSS grid layouts with grid-template-columns, gap, and fr unit controls.',
    description: 'Visual CSS Grid container playground to configure grid-template-columns, fr units, and gap dimensions.',
    category: 'Web Tools',
    iconName: 'Grid',
    usageCount: 98200,
    tags: ['css grid', 'grid template columns', 'gap', 'fr units', 'layout builder'],
    howToUse: [
      { step: 1, title: 'Set column count & fr ratios', desc: 'E.g. repeat(3, 1fr) or 200px 1fr 1fr.' },
      { step: 2, title: 'Set grid gap spacing', desc: 'E.g. 16px gap.' },
      { step: 3, title: 'Copy CSS code snippet', desc: 'Copy CSS grid container styles.' }
    ],
    faqs: [{ question: 'What does 1fr unit mean in CSS Grid?', answer: '1 fraction of the available free space inside the grid container.' }]
  },
  {
    id: 'css-glassmorphism-generator',
    slug: 'css-glassmorphism-generator',
    name: 'CSS Glassmorphism & Backdrop-Filter Studio',
    shortDesc: 'Design glass UI components with blur, opacity, border, and backdrop-filter CSS.',
    description: 'Design glassmorphism UI card components with controls for backdrop blur, background transparency, and border light.',
    category: 'Web Tools',
    iconName: 'Layout',
    usageCount: 84200,
    tags: ['glassmorphism', 'backdrop-filter', 'blur', 'css UI', 'glass card'],
    howToUse: [
      { step: 1, title: 'Adjust Blur amount (px)', desc: 'E.g. backdrop-filter: blur(12px).' },
      { step: 2, title: 'Adjust background opacity', desc: 'E.g. rgba(255,255,255,0.15).' },
      { step: 3, title: 'Copy CSS rules', desc: 'Copy glass stylesheet declarations.' }
    ],
    faqs: [{ question: 'Is backdrop-filter supported in all modern browsers?', answer: 'Yes, supported in all modern Chrome, Safari, Firefox, and Edge browsers.' }]
  },
  {
    id: 'css-box-shadow-generator',
    slug: 'css-box-shadow-generator',
    name: 'CSS Box Shadow & Drop Shadow Builder',
    shortDesc: 'Interactively adjust X/Y offset, blur radius, spread, opacity, and inset shadow.',
    description: 'Design custom CSS box shadows with interactive controls for offset, blur, spread, color, and inset.',
    category: 'Web Tools',
    iconName: 'Layout',
    usageCount: 104200,
    tags: ['box shadow', 'css shadow', 'drop shadow', 'inset shadow', 'generator'],
    howToUse: [
      { step: 1, title: 'Adjust X and Y offsets', desc: 'Set horizontal and vertical shadow distance.' },
      { step: 2, title: 'Set Blur and Spread radius', desc: 'Set softness and expansion.' },
      { step: 3, title: 'Copy box-shadow CSS code', desc: 'Copy generated CSS rule.' }
    ],
    faqs: [{ question: 'How to create soft elevated card shadows?', answer: 'Use multiple layered box-shadow declarations with low opacity.' }]
  },
  {
    id: 'css-border-radius-custom-corner-generator',
    slug: 'css-border-radius-custom-corner-generator',
    name: 'CSS Border Radius & Fancy Shape Studio',
    shortDesc: 'Adjust independent top-left, top-right, bottom-right, bottom-left border radii.',
    description: 'Design unique CSS shapes by configuring non-uniform 8-point corner border radii.',
    category: 'Web Tools',
    iconName: 'Maximize2',
    usageCount: 65200,
    tags: ['border-radius', 'css shapes', 'rounded corners', 'generator', 'web'],
    howToUse: [
      { step: 1, title: 'Adjust 4 corner handles', desc: 'Set top-left, top-right, bottom-right, bottom-left values.' },
      { step: 2, title: 'Toggle 8-point percentage handles', desc: 'Generates organic fluid blob shapes.' },
      { step: 3, title: 'Copy border-radius CSS', desc: 'Paste into CSS stylesheet.' }
    ],
    faqs: [{ question: 'What is 8-value border-radius syntax?', answer: 'E.g. border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;' }]
  },
  {
    id: 'css-gradient-background-generator',
    slug: 'css-gradient-background-generator',
    name: 'CSS Linear & Radial Gradient Studio',
    shortDesc: 'Create multi-stop CSS gradients with angle controls and copy background CSS.',
    description: 'Create multi-stop linear and radial CSS gradient backgrounds with direction angle controls.',
    category: 'Web Tools',
    iconName: 'Palette',
    usageCount: 121400,
    tags: ['css gradient', 'linear gradient', 'radial gradient', 'color stops', 'background'],
    howToUse: [
      { step: 1, title: 'Select gradient type', desc: 'Linear or Radial.' },
      { step: 2, title: 'Add color stops & set angle', desc: 'Set gradient direction angle (0° to 360°).' },
      { step: 3, title: 'Copy CSS background code', desc: 'Copy CSS background declaration.' }
    ],
    faqs: [{ question: 'How to make 45-degree angle gradient?', answer: 'background: linear-gradient(45deg, #color1, #color2);' }]
  },
  {
    id: 'css-keyframe-animation-generator',
    slug: 'css-keyframe-animation-generator',
    name: 'CSS @keyframes Animation Studio',
    shortDesc: 'Create CSS pulse, bounce, shake, rotate animations and export @keyframes code.',
    description: 'Design custom CSS keyframe animations (pulse, shake, bounce, spin, fade) with timing curve controls.',
    category: 'Web Tools',
    iconName: 'Activity',
    usageCount: 71200,
    tags: ['css keyframes', 'animation', 'pulse', 'bounce', 'css studio'],
    howToUse: [
      { step: 1, title: 'Select animation preset or edit keyframes', desc: '0%, 50%, 100% keyframe steps.' },
      { step: 2, title: 'Set duration & timing function', desc: 'E.g. 1s ease-in-out infinite.' },
      { step: 3, title: 'Copy @keyframes CSS snippet', desc: 'Copy CSS code.' }
    ],
    faqs: [{ question: 'What is transition-timing-function cubic-bezier?', answer: 'Custom mathematical acceleration curve for smooth motion.' }]
  },
  {
    id: 'html-table-generator-visual',
    slug: 'html-table-generator-visual',
    name: 'Visual HTML Table Code Builder',
    shortDesc: 'Build styled <table> HTML markup with <thead>, <tbody>, padding, and CSS classes.',
    description: 'Build HTML data tables with customizable columns, headers, zebra striping, and CSS classes.',
    category: 'Web Tools',
    iconName: 'Grid',
    usageCount: 88100,
    tags: ['html table', 'table generator', 'thead', 'tbody', 'css table', 'builder'],
    howToUse: [
      { step: 1, title: 'Set grid dimensions', desc: 'Choose row count and column count.' },
      { step: 2, title: 'Type cell content', desc: 'Enter table header and data cell text.' },
      { step: 3, title: 'Copy HTML & CSS', desc: 'Copy responsive table markup.' }
    ],
    faqs: [{ question: 'How to make HTML table responsive on mobile screen?', answer: 'Wrap <table> inside a container element with CSS overflow-x: auto.' }]
  },
  {
    id: 'markdown-table-generator',
    slug: 'markdown-table-generator',
    name: 'Markdown Grid Table Generator',
    shortDesc: 'Build clean formatted Markdown grid tables (| Header | Value |) with column alignments.',
    description: 'Build clean Markdown grid tables with left, center, or right column alignment options.',
    category: 'Web Tools',
    iconName: 'Grid',
    usageCount: 94200,
    tags: ['markdown table', 'grid', 'alignment', 'readme', 'generator'],
    howToUse: [
      { step: 1, title: 'Set table size', desc: 'Choose row and column count.' },
      { step: 2, title: 'Set column alignment', desc: 'Left (:---), Center (:---:), Right (---:).' },
      { step: 3, title: 'Copy Markdown syntax', desc: 'Paste into GitHub README.md file.' }
    ],
    faqs: [{ question: 'How to right-align a Markdown table column?', answer: 'Use three dashes followed by a colon (---:).' }]
  },
  {
    id: 'iframe-embed-code-generator',
    slug: 'iframe-embed-code-generator',
    name: 'Responsive HTML <iframe> Embed Code Generator',
    shortDesc: 'Generate responsive <iframe> embed tags with aspect ratio wrappers and security sandbox.',
    description: 'Generate responsive HTML <iframe> embed code with aspect ratio CSS wrappers and sandbox permissions.',
    category: 'Web Tools',
    iconName: 'Maximize2',
    usageCount: 51200,
    tags: ['iframe', 'embed code', 'responsive iframe', 'aspect ratio', 'sandbox'],
    howToUse: [
      { step: 1, title: 'Enter source URL', desc: 'E.g. https://example.com/embed.' },
      { step: 2, title: 'Select aspect ratio preset', desc: '16:9, 4:3, or custom dimensions.' },
      { step: 3, title: 'Toggle sandbox flags', desc: 'Check allow-scripts, allow-same-origin.' }
    ],
    faqs: [{ question: 'Why wrap iframe in aspect ratio CSS container?', answer: 'Prevents video or canvas embeds from overflowing mobile viewports.' }]
  },
  {
    id: 'svg-data-uri-css-converter',
    slug: 'svg-data-uri-css-converter',
    name: 'SVG Vector to Encoded CSS Data URI Generator',
    shortDesc: 'Convert raw <svg> markup into clean background-image: url("data:image/svg+xml,...") CSS.',
    description: 'Convert SVG XML markup into clean background-image CSS data URI strings.',
    category: 'Web Tools',
    iconName: 'Image',
    usageCount: 65200,
    tags: ['svg to css', 'data uri', 'background image', 'svg encoded', 'web'],
    howToUse: [
      { step: 1, title: 'Paste <svg> XML code', desc: 'Enter vector markup.' },
      { step: 2, title: 'Convert to Data URI', desc: 'Percent-escapes special vector characters.' },
      { step: 3, title: 'Copy CSS background rule', desc: 'Paste directly into CSS stylesheet.' }
    ],
    faqs: [{ question: 'Why percent-encode SVG instead of Base64 in CSS?', answer: 'Percent-encoded SVG strings are smaller in file size and easier to inspect in CSS.' }]
  },
  {
    id: 'web-font-font-face-generator',
    slug: 'web-font-font-face-generator',
    name: 'CSS @font-face Code Snippet Generator',
    shortDesc: 'Build CSS @font-face directives for WOFF2 / WOFF custom web fonts.',
    description: 'Build CSS @font-face directives supporting WOFF2, WOFF, font-display: swap, and unicode-range.',
    category: 'Web Tools',
    iconName: 'Type',
    usageCount: 48200,
    tags: ['font-face', 'web font', 'woff2', 'font-display', 'css'],
    howToUse: [
      { step: 1, title: 'Enter Font Family name', desc: 'E.g. "CustomSans".' },
      { step: 2, title: 'Enter font file paths', desc: 'Specify .woff2 and .woff file URLs.' },
      { step: 3, title: 'Set font-weight & font-display', desc: 'Choose 400, 700 and font-display: swap.' }
    ],
    faqs: [{ question: 'Why use font-display: swap?', answer: 'Ensures fallback text displays immediately while custom web font downloads to prevent flash of invisible text (FOIT).' }]
  },
  {
    id: 'screen-viewport-breakpoint-tester',
    slug: 'screen-viewport-breakpoint-tester',
    name: 'Responsive CSS Breakpoint Cheat Sheet',
    shortDesc: 'Reference standard media query breakpoints for Mobile, Tablet, Desktop, and 4K displays.',
    description: 'Reference standard CSS media query breakpoints for mobile, tablet, laptop, and desktop displays.',
    category: 'Web Tools',
    iconName: 'Smartphone',
    usageCount: 78200,
    tags: ['media query', 'breakpoints', 'responsive design', 'css', 'cheat sheet'],
    howToUse: [
      { step: 1, title: 'Select CSS framework preset', desc: 'Choose Tailwind CSS, Bootstrap 5, or Bulma.' },
      { step: 2, title: 'View pixel range breakdown', desc: 'Inspect sm (640px), md (768px), lg (1024px), xl (1280px).' },
      { step: 3, title: 'Copy media query CSS code', desc: 'Copy @media (min-width: ...) rules.' }
    ],
    faqs: [{ question: 'What is mobile-first responsive design?', answer: 'Writing default styles for mobile screens first, then adding min-width media queries for larger displays.' }]
  },
  {
    id: 'browser-storage-quota-estimator',
    slug: 'browser-storage-quota-estimator',
    name: 'Browser LocalStorage & IndexedDB Storage Quota Inspector',
    shortDesc: 'Inspect browser storage usage (Bytes used) and available IndexedDB storage quota.',
    description: 'Inspect current browser LocalStorage key count, byte usage, and IndexedDB storage quota using navigator.storage.estimate().',
    category: 'Web Tools',
    iconName: 'HardDrive',
    usageCount: 42100,
    tags: ['localstorage', 'indexeddb', 'storage quota', 'browser storage', 'bytes used'],
    howToUse: [
      { step: 1, title: 'Inspect local storage keys', desc: 'Lists all LocalStorage key names and string lengths.' },
      { step: 2, title: 'Query Storage Estimate API', desc: 'Calls navigator.storage.estimate().' },
      { step: 3, title: 'Read MB used vs quota available', desc: 'Displays total storage usage.' }
    ],
    faqs: [{ question: 'What is standard LocalStorage limit in web browsers?', answer: 'Typically 5 MB per origin domain.' }]
  },
  {
    id: 'cross-tab-broadcast-channel-tester',
    slug: 'cross-tab-broadcast-channel-tester',
    name: 'Browser BroadcastChannel Cross-Tab Event Tester',
    shortDesc: 'Send and receive real-time messages across open browser tabs on same origin.',
    description: 'Test real-time cross-tab message communication using browser native BroadcastChannel API.',
    category: 'Web Tools',
    iconName: 'Share2',
    usageCount: 31200,
    tags: ['broadcastchannel', 'cross tab', 'javascript api', 'messages', 'web'],
    howToUse: [
      { step: 1, title: 'Open tool in two separate browser tabs', desc: 'Connects to shared channel name.' },
      { step: 2, title: 'Type message & click Broadcast', desc: 'Sends message payload.' },
      { step: 3, title: 'Observe real-time sync', desc: 'Other open tab receives event payload instantly.' }
    ],
    faqs: [{ question: 'What is BroadcastChannel API?', answer: 'A native web API allowing simple pub/sub communication between tabs/windows of the same origin.' }]
  },
  {
    id: 'web-speech-synthesis-tts-tester',
    slug: 'web-speech-synthesis-tts-tester',
    name: 'Web Speech Synthesis Text-to-Speech (TTS) Tester',
    shortDesc: 'Test browser native speech synthesis voices, pitch, rate, and audio spoken text.',
    description: 'Test browser native Text-To-Speech (TTS) using window.speechSynthesis API with custom voices and pitch.',
    category: 'Web Tools',
    iconName: 'Volume2',
    usageCount: 58200,
    tags: ['web speech', 'tts', 'speech synthesis', 'voices', 'audio'],
    howToUse: [
      { step: 1, title: 'Type speech text', desc: 'Enter message to speak.' },
      { step: 2, title: 'Select system voice', desc: 'Choose from installed browser voices.' },
      { step: 3, title: 'Adjust rate & pitch sliders', desc: 'Click Speak to trigger audio synthesis.' }
    ],
    faqs: [{ question: 'Are extra audio libraries required for Web Speech TTS?', answer: 'No, window.speechSynthesis is natively built into all modern web browsers.' }]
  },
  {
    id: 'web-vitals-performance-reference',
    slug: 'web-vitals-performance-reference',
    name: 'Core Web Vitals (LCP, FID/INP, CLS) Metrics Guide',
    shortDesc: 'Learn target thresholds for Largest Contentful Paint (LCP), INP, and Cumulative Layout Shift (CLS).',
    description: 'Target performance metric guide for Google Core Web Vitals (LCP, INP, CLS) and site speed optimization.',
    category: 'Web Tools',
    iconName: 'Activity',
    usageCount: 65200,
    tags: ['core web vitals', 'lcp', 'inp', 'cls', 'performance', 'seo'],
    howToUse: [
      { step: 1, title: 'Select Web Vital metric', desc: 'Choose LCP, INP, or CLS.' },
      { step: 2, title: 'Read target threshold', desc: 'LCP < 2.5s (Good), INP < 200ms, CLS < 0.1.' },
      { step: 3, title: 'View fix recommendations', desc: 'Read actionable frontend optimizations.' }
    ],
    faqs: [{ question: 'What metric replaced FID in 2024?', answer: 'Interaction to Next Paint (INP) replaced First Input Delay (FID) as an official Core Web Vital in March 2024.' }]
  },
  {
    id: 'canonical-tag-url-generator',
    slug: 'canonical-tag-url-generator',
    name: 'Canonical Tag & Duplicate Content URL Builder',
    shortDesc: 'Generate <link rel="canonical" href="..."> tags to prevent duplicate content SEO penalties.',
    description: 'Generate canonical link HTML tags to prevent duplicate content indexing issues.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 48200,
    tags: ['canonical tag', 'seo', 'duplicate content', 'html head', 'web'],
    howToUse: [
      { step: 1, title: 'Enter primary canonical URL', desc: 'E.g. https://example.com/products/shoes.' },
      { step: 2, title: 'Generate canonical HTML tag', desc: 'Creates <link rel="canonical" href="...">.' },
      { step: 3, title: 'Paste into <head>', desc: 'Embed in webpage.' }
    ],
    faqs: [{ question: 'Why are canonical tags vital for ecommerce sites?', answer: 'Consolidates SEO link equity across paginated or parameterized product filter URLs.' }]
  },
  {
    id: 'hreflang-multilingual-generator',
    slug: 'hreflang-multilingual-generator',
    name: 'Hreflang Multilingual & Regional Language Tag Builder',
    shortDesc: 'Generate <link rel="hreflang" ...> tags for international multi-language websites.',
    description: 'Build hreflang tags to serve localized language and country page versions to search engines.',
    category: 'Web Tools',
    iconName: 'Globe',
    usageCount: 38200,
    tags: ['hreflang', 'multilingual', 'seo', 'international', 'language tags'],
    howToUse: [
      { step: 1, title: 'Add language & country codes', desc: 'E.g. en-US, es-ES, fr-FR, x-default.' },
      { step: 2, title: 'Enter regional URL mappings', desc: 'Provide localized page links.' },
      { step: 3, title: 'Copy hreflang block', desc: 'Paste into HTML <head>.' }
    ],
    faqs: [{ question: 'What is x-default hreflang reserved for?', answer: 'Fallback link for international users whose language is not explicitly listed.' }]
  },
  {
    id: 'web-manifest-pwa-generator',
    slug: 'web-manifest-pwa-generator',
    name: 'Web App Manifest (manifest.json) PWA Builder',
    shortDesc: 'Generate Web App Manifest JSON for Progressive Web Apps (PWA) installability.',
    description: 'Generate manifest.json files specifying app name, theme color, display mode, and app icons for PWAs.',
    category: 'Web Tools',
    iconName: 'Smartphone',
    usageCount: 71200,
    tags: ['manifest.json', 'pwa', 'progressive web app', 'icons', 'web'],
    howToUse: [
      { step: 1, title: 'Enter App Name & Short Name', desc: 'E.g. "My Application".' },
      { step: 2, title: 'Set theme_color & background_color', desc: 'Choose hex colors.' },
      { step: 3, title: 'Set display mode & download JSON', desc: 'Select standalone, minimal-ui, or browser.' }
    ],
    faqs: [{ question: 'Where is manifest.json linked in HTML?', answer: '<link rel="manifest" href="/manifest.json">' }]
  },
  {
    id: 'data-attribute-selector-builder',
    slug: 'data-attribute-selector-builder',
    name: 'HTML5 Data Attribute & QuerySelector Builder',
    shortDesc: 'Generate custom data-* attributes and corresponding CSS / JS querySelectors.',
    description: 'Build custom HTML5 data-* attributes and corresponding JavaScript dataset query selectors.',
    category: 'Web Tools',
    iconName: 'Code',
    usageCount: 39200,
    tags: ['data attributes', 'dataset', 'queryselector', 'html5', 'javascript'],
    howToUse: [
      { step: 1, title: 'Enter attribute key & value', desc: 'E.g. data-user-role="admin".' },
      { step: 2, title: 'Generate HTML markup', desc: 'Creates <div data-user-role="admin">.' },
      { step: 3, title: 'Copy JS dataset code', desc: 'Copy element.dataset.userRole.' }
    ],
    faqs: [{ question: 'How is data-user-role accessed in JavaScript?', answer: 'Via camelCase property: element.dataset.userRole.' }]
  }
];
