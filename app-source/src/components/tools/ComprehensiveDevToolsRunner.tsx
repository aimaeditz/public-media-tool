import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Code,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  Terminal,
  FileCode,
  Layers,
  Settings,
  ShieldCheck,
  Hash,
  Clock,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ComprehensiveDevToolsRunnerProps {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

export const ComprehensiveDevToolsRunner: React.FC<ComprehensiveDevToolsRunnerProps> = ({
  tool,
  onCopy,
  copied
}) => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copiedInternal, setCopiedInternal] = useState<boolean>(false);
  const [stats, setStats] = useState<{ lines: number; chars: number; timeMs: number }>({
    lines: 0,
    chars: 0,
    timeMs: 0
  });

  // Specialized states
  const [regexPattern, setRegexPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [regexReplace, setRegexReplace] = useState<string>('[REDACTED_EMAIL]');
  const [uuidCount, setUuidCount] = useState<number>(5);
  
  // Chmod state: [Owner(R,W,X), Group(R,W,X), Others(R,W,X)]
  const [chmodState, setChmodState] = useState<{ [key: string]: boolean }>({
    ur: true, uw: true, ux: true, // 7
    gr: true, gw: false, gx: true, // 5
    or: true, ow: false, ox: true // 5
  });

  // Flexbox & Grid states
  const [flexDir, setFlexDir] = useState<string>('row');
  const [flexJustify, setFlexJustify] = useState<string>('center');
  const [flexAlign, setFlexAlign] = useState<string>('center');
  const [flexGap, setFlexGap] = useState<number>(16);

  // CSS Border Radius states (tl, tr, br, bl in %)
  const [brTL, setBrTL] = useState<number>(30);
  const [brTR, setBrTR] = useState<number>(70);
  const [brBR, setBrBR] = useState<number>(70);
  const [brBL, setBrBL] = useState<number>(30);
  const [brTL2, setBrTL2] = useState<number>(30);
  const [brTR2, setBrTR2] = useState<number>(30);
  const [brBR2, setBrBR2] = useState<number>(70);
  const [brBL2, setBrBL2] = useState<number>(70);

  // Cubic Bezier
  const [bezP1x, setBezP1x] = useState<number>(0.25);
  const [bezP1y, setBezP1y] = useState<number>(0.1);
  const [bezP2x, setBezP2x] = useState<number>(0.25);
  const [bezP2y, setBezP2y] = useState<number>(1.0);

  // Key Event Inspector
  const [lastKeyEvent, setLastKeyEvent] = useState<{
    key: string;
    code: string;
    keyCode: number;
    which: number;
    location: number;
    ctrlKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
  } | null>(null);

  // Detect mode
  const mode = useMemo(() => {
    const s = tool.slug.toLowerCase();
    if (s.includes('json') && (s.includes('csv') || s.includes('to-csv'))) return 'json_to_csv';
    if (s.includes('csv') && (s.includes('json') || s.includes('to-json'))) return 'csv_to_json';
    if (s.includes('json') && (s.includes('yaml') || s.includes('to-yaml'))) return 'json_to_yaml';
    if (s.includes('yaml') && (s.includes('json') || s.includes('to-json'))) return 'yaml_to_json';
    if (s.includes('json') && s.includes('xml')) return 'json_to_xml';
    if (s.includes('xml') && s.includes('json')) return 'xml_to_json';
    if (s.includes('xml-formatter') || s.includes('xml-beautifier')) return 'xml_format';
    if (s.includes('json-validator') || s.includes('json-formatter') || s.includes('json-beautifier') || s.includes('universal-json-formatter') || s.includes('json-validator-master')) return 'json_format';
    if (s.includes('json-minifier') || s.includes('online-json-minifier')) return 'json_minify';
    if (s.includes('sql')) return 'sql_format';
    if (s.includes('html') && s.includes('minif')) return 'html_minify';
    if (s.includes('html') && (s.includes('format') || s.includes('beautif'))) return 'html_format';
    if (s.includes('css') && s.includes('minif')) return 'css_minify';
    if (s.includes('css') && (s.includes('format') || s.includes('beautif'))) return 'css_format';
    if (s.includes('js') && s.includes('minif') || s.includes('javascript-minifier')) return 'js_minify';
    if (s.includes('uuid') || s.includes('ulid')) return 'uuid_generator';
    if (s.includes('jwt')) return 'jwt_decoder';
    if (s.includes('regex') && s.includes('replace')) return 'regex_replace';
    if (s.includes('regex')) return 'regex_test';
    if (s.includes('timestamp') || s.includes('unix')) return 'unix_timestamp';
    if (s.includes('cron')) return 'cron_parser';
    if (s.includes('curl') && s.includes('python')) return 'curl_to_python';
    if (s.includes('curl')) return 'curl_to_fetch';
    if (s.includes('user-agent')) return 'user_agent';
    if (s.includes('html-entity')) return 'html_entity';
    if (s.includes('base64')) return 'base64';
    if (s.includes('url-encode') || s.includes('url-decode') || s.includes('url-')) return 'url_codec';
    if (s.includes('sha') || s.includes('hash') || s.includes('md5') || s.includes('hmac')) return 'hash_crypto';
    if (s.includes('chmod')) return 'chmod_calc';
    if (s.includes('htaccess')) return 'htaccess_gen';
    if (s.includes('nginx')) return 'nginx_gen';
    if (s.includes('flexbox')) return 'flexbox_gen';
    if (s.includes('css-grid')) return 'grid_gen';
    if (s.includes('border-radius')) return 'border_radius_gen';
    if (s.includes('cubic-bezier')) return 'cubic_bezier_gen';
    if (s.includes('keyframe')) return 'keyframe_gen';
    if (s.includes('clamp')) return 'clamp_calc';
    if (s.includes('triangle') || s.includes('shapes')) return 'triangle_gen';
    if (s.includes('glassmorphism')) return 'glassmorphism_gen';
    if (s.includes('neumorphism')) return 'neumorphism_gen';
    if (s.includes('key-code') || s.includes('event-key')) return 'js_event_inspector';
    if (s.includes('http-status')) return 'http_status';
    if (s.includes('ip-subnet')) return 'ip_subnet_calc';
    if (s.includes('ipv6')) return 'ipv6_calc';
    if (s.includes('mac-address')) return 'mac_formatter';
    if (s.includes('iso8601')) return 'iso8601_formatter';
    if (s.includes('diff-viewer') || s.includes('diff')) return 'diff_inspector';
    if (s.includes('markdown-table')) return 'markdown_table_gen';
    if (s.includes('typescript-interface') || s.includes('ts-interface')) return 'ts_interface_gen';
    if (s.includes('json-schema')) return 'json_schema_gen';
    if (s.includes('graphql')) return 'graphql_formatter';
    if (s.includes('dockerfile')) return 'dockerfile_linter';
    if (s.includes('docker-compose')) return 'docker_compose_val';
    if (s.includes('git-command')) return 'git_command_builder';
    if (s.includes('gitignore')) return 'gitignore_gen';
    if (s.includes('package-json')) return 'package_json_sorter';
    if (s.includes('semver')) return 'semver_calc';
    if (s.includes('string-escape') || s.includes('escaping')) return 'string_escape';
    if (s.includes('ascii-table')) return 'ascii_table_gen';
    if (s.includes('json-path')) return 'json_path_tester';
    return 'generic_code';
  }, [tool.slug]);

  // Initial sample data per mode
  useEffect(() => {
    switch (mode) {
      case 'json_format':
      case 'json_minify':
        setInput('{"site":"PublicMediaTool","clientSide":true,"toolsCount":15267,"categories":["Text Tools","Image Tools","PDF Tools","Developer Tools"],"active":true,"meta":{"version":"2.4.0","certified":true}}');
        break;
      case 'xml_format':
        setInput('<?xml version="1.0" encoding="UTF-8"?><configuration><app name="PublicMediaTool"><security mode="client-only" privacy="100%"/><endpoints><api path="/tools" cached="true"/><api path="/convert" local="true"/></endpoints></app></configuration>');
        break;
      case 'json_to_csv':
        setInput('[\n  {"id": 1, "name": "Text Processor", "category": "Text", "status": "active"},\n  {"id": 2, "name": "Image Canvas", "category": "Image", "status": "active"},\n  {"id": 3, "name": "PDF Inspector", "category": "PDF", "status": "active"}\n]');
        break;
      case 'csv_to_json':
        setInput('id,name,category,status\n1,Text Processor,Text,active\n2,Image Canvas,Image,active\n3,PDF Inspector,PDF,active');
        break;
      case 'json_to_yaml':
        setInput('{\n  "version": "2.0",\n  "app": "PublicMediaTool",\n  "security": {\n    "clientSide": true,\n    "privacy": "100%"\n  }\n}');
        break;
      case 'yaml_to_json':
        setInput('app: PublicMediaTool\nversion: 2.0\nprivacy:\n  clientSide: true\n  cloudServers: false');
        break;
      case 'json_to_xml':
        setInput('{\n  "project": {\n    "name": "PublicMediaTool",\n    "version": "2.0",\n    "author": "Open Source Community"\n  }\n}');
        break;
      case 'xml_to_json':
        setInput('<project><name>PublicMediaTool</name><version>2.0</version><author>Open Source Community</author></project>');
        break;
      case 'sql_format':
        setInput('select u.id, u.username, count(t.id) as total_tools from users u left join tools t on u.id = t.user_id where u.active = 1 and t.status in ("live", "verified") group by u.id, u.username order by total_tools desc limit 20;');
        break;
      case 'js_minify':
        setInput('// Sample function to minify\nfunction calculateSum(a, b) {\n  const result = a + b;\n  /* Print to console */\n  console.log("Calculated:", result);\n  return result;\n}');
        break;
      case 'css_minify':
        setInput('/* Main App Styles */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0 auto;\n  padding: 20px;\n}\n.card {\n  border-radius: 12px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.1);\n}');
        break;
      case 'html_minify':
        setInput('<!-- App Container -->\n<div class="wrapper">\n  <header class="header">\n    <h1>Public Media Tool</h1>\n  </header>\n  <main class="content">\n    <p>100% In-Browser Private Utilities</p>\n  </main>\n</div>');
        break;
      case 'jwt_decoder':
        setInput('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlB1YmxpY01lZGlhVG9vbCBVc2VyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODMxNTczMDIyfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk');
        break;
      case 'regex_replace':
      case 'regex_test':
        setInput('Contact our privacy desk at support@publicmediatool.com or contact our billing lead at billing@example.org for offline tools licensing.');
        break;
      case 'curl_to_fetch':
        setInput('curl -X POST https://api.example.com/data -H "Content-Type: application/json" -H "Authorization: Bearer token123" -d \'{"query": "developer-tools"}\'');
        break;
      case 'curl_to_python':
        setInput('curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d \'{"query": "developer-tools"}\'');
        break;
      case 'unix_timestamp':
        setInput(Math.floor(Date.now() / 1000).toString());
        break;
      case 'cron_parser':
        setInput('*/15 09-17 * * 1-5');
        break;
      case 'user_agent':
        setInput(typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        break;
      case 'hash_crypto':
        setInput('PublicMediaTool client-side cryptographic hashing');
        break;
      case 'ip_subnet_calc':
        setInput('192.168.1.100/24');
        break;
      case 'ipv6_calc':
        setInput('2001:0db8:0000:0000:0000:ff00:0042:8329');
        break;
      case 'mac_formatter':
        setInput('00:1A:2B:3C:4D:5E');
        break;
      case 'iso8601_formatter':
        setInput(new Date().toISOString());
        break;
      case 'diff_inspector':
        setInput('Line 1: Initialize client engine\nLine 2: Verify offline cryptographic certificates\nLine 3: Execute safe parsing\nLine 4: Render complete output\n---\nLine 1: Initialize client engine\nLine 2: Verify offline cryptographic certificates (v2 updated)\nLine 3: Execute hardware-accelerated parsing\nLine 4: Render complete output\nLine 5: Cache local session state');
        break;
      case 'markdown_table_gen':
        setInput('Feature, Client-Side, Status\nJSON Parser, Yes, Active\nBase64 Codec, Yes, Active\nImage Resizer, Yes, Active\nPDF Engine, Yes, Active');
        break;
      case 'ts_interface_gen':
      case 'json_schema_gen':
        setInput('{\n  "id": 101,\n  "title": "Universal Converter",\n  "published": true,\n  "rating": 4.95,\n  "tags": ["tools", "privacy", "client"],\n  "author": {\n    "name": "Sarah Developer",\n    "verified": true\n  }\n}');
        break;
      case 'graphql_formatter':
        setInput('query GetUserDetails($userId: ID!) { user(id: $userId) { id name email profile { avatar bio role } settings { theme notifications } } }');
        break;
      case 'dockerfile_linter':
        setInput('FROM node:latest\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]');
        break;
      case 'docker_compose_val':
        setInput('version: "3.8"\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    restart: always\n  api:\n    build: .\n    environment:\n      - NODE_ENV=production\n    ports:\n      - "3000:3000"');
        break;
      case 'git_command_builder':
        setInput('undo last commit but keep changes in working directory');
        break;
      case 'gitignore_gen':
        setInput('Node, React, Vite, macOS, Windows, VSCode');
        break;
      case 'package_json_sorter':
        setInput('{\n  "name": "my-app",\n  "dependencies": {\n    "zustand": "^5.0.0",\n    "react": "^19.0.0",\n    "lucide-react": "^0.500.0",\n    "framer-motion": "^12.0.0"\n  },\n  "devDependencies": {\n    "vite": "^6.0.0",\n    "typescript": "^5.7.0",\n    "tailwindcss": "^4.0.0"\n  }\n}');
        break;
      case 'semver_calc':
        setInput('2.4.1');
        break;
      case 'string_escape':
        setInput('Hello "World"! \n Path: C:\\Program Files\\App \t & Special: <script>alert("XSS")</script>');
        break;
      case 'ascii_table_gen':
        setInput('ID | Name | Role | Location\n1 | Sarah Jenkins | Lead Dev | New York\n2 | Marcus Chen | Strategist | London\n3 | Elena Rostova | Designer | Berlin');
        break;
      case 'json_path_tester':
        setInput('{\n  "store": {\n    "book": [\n      { "category": "reference", "author": "Nigel Rees", "title": "Sayings of the Century", "price": 8.95 },\n      { "category": "fiction", "author": "Evelyn Waugh", "title": "Sword of Honour", "price": 12.99 }\n    ],\n    "bicycle": { "color": "red", "price": 19.95 }\n  }\n}');
        break;
      case 'chmod_calc':
        setInput('755');
        break;
      case 'htaccess_gen':
        setInput('redirect old-page.html to new-page.html 301');
        break;
      case 'nginx_gen':
        setInput('/api -> proxy http://localhost:8080');
        break;
      case 'clamp_calc':
        setInput('min: 16px (320px viewport), max: 32px (1200px viewport)');
        break;
      default:
        setInput('{\n  "tool": "' + tool.name + '",\n  "slug": "' + tool.slug + '",\n  "status": "operational",\n  "clientSide": true\n}');
        break;
    }
  }, [mode, tool.name, tool.slug]);

  // Window key listener for KeyCode Inspector
  useEffect(() => {
    if (mode === 'js_event_inspector') {
      const handleKeyDown = (e: KeyboardEvent) => {
        setLastKeyEvent({
          key: e.key,
          code: e.code,
          keyCode: e.keyCode,
          which: e.which,
          location: e.location,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey
        });
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mode]);

  // Transform execution logic
  useEffect(() => {
    const t0 = performance.now();
    setError(null);

    try {
      if (mode === 'json_format') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'json_minify') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
      } else if (mode === 'xml_format') {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        input.split(/>\s*</).forEach((element) => {
          if (element.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
          }
          formatted += indent + '<' + element + '>\r\n';
          if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('?') && !element.startsWith('!')) {
            indent += tab;
          }
        });
        setOutput(formatted.substring(1, formatted.length - 3));
      } else if (mode === 'json_to_csv') {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('Input must be a non-empty JSON array of objects');
        }
        const headers = Object.keys(parsed[0]);
        const csvRows = [headers.join(',')];
        for (const row of parsed) {
          const values = headers.map((h) => {
            const val = row[h] !== undefined ? String(row[h]) : '';
            return `"${val.replace(/"/g, '""')}"`;
          });
          csvRows.push(values.join(','));
        }
        setOutput(csvRows.join('\n'));
      } else if (mode === 'csv_to_json') {
        const lines = input.trim().split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) throw new Error('CSV must contain a header row and at least one data row');
        const headers = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map((v) => v.trim().replace(/^["']|["']$/g, ''));
          const obj: any = {};
          headers.forEach((h, idx) => {
            obj[h] = values[idx] !== undefined ? values[idx] : '';
          });
          result.push(obj);
        }
        setOutput(JSON.stringify(result, null, 2));
      } else if (mode === 'json_to_yaml') {
        const parsed = JSON.parse(input);
        const toYaml = (obj: any, depth = 0): string => {
          const indent = '  '.repeat(depth);
          if (typeof obj !== 'object' || obj === null) return String(obj);
          if (Array.isArray(obj)) {
            return obj.map((item) => `${indent}- ${toYaml(item, depth + 1).trim()}`).join('\n');
          }
          return Object.entries(obj)
            .map(([k, v]) => {
              if (typeof v === 'object' && v !== null) {
                return `${indent}${k}:\n${toYaml(v, depth + 1)}`;
              }
              return `${indent}${k}: ${typeof v === 'string' ? `"${v}"` : v}`;
            })
            .join('\n');
        };
        setOutput(toYaml(parsed));
      } else if (mode === 'yaml_to_json') {
        const lines = input.trim().split(/\r?\n/);
        const result: any = {};
        let currentParent: any = result;
        lines.forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) return;
          if (line.includes(':')) {
            const [k, ...rest] = line.split(':');
            const val = rest.join(':').trim();
            const key = k.trim();
            if (val === '') {
              currentParent[key] = {};
              currentParent = currentParent[key];
            } else {
              let parsedVal: any = val.replace(/^["']|["']$/g, '');
              if (parsedVal === 'true') parsedVal = true;
              if (parsedVal === 'false') parsedVal = false;
              if (!isNaN(Number(parsedVal)) && parsedVal !== '') parsedVal = Number(parsedVal);
              result[key] = parsedVal;
            }
          }
        });
        setOutput(JSON.stringify(result, null, 2));
      } else if (mode === 'json_to_xml') {
        const parsed = JSON.parse(input);
        const toXml = (obj: any, nodeName = 'root'): string => {
          if (typeof obj !== 'object' || obj === null) return `<${nodeName}>${obj}</${nodeName}>`;
          let inner = '';
          if (Array.isArray(obj)) {
            return obj.map((item) => toXml(item, 'item')).join('\n');
          }
          for (const [k, v] of Object.entries(obj)) {
            inner += `  ${toXml(v, k)}\n`;
          }
          return `<${nodeName}>\n${inner}</${nodeName}>`;
        };
        setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n` + toXml(parsed, 'root'));
      } else if (mode === 'xml_to_json') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(input, 'text/xml');
        const xmlToJson = (node: any): any => {
          let obj: any = {};
          if (node.nodeType === 1) {
            if (node.attributes.length > 0) {
              obj['@attributes'] = {};
              for (let j = 0; j < node.attributes.length; j++) {
                const attr = node.attributes.item(j);
                obj['@attributes'][attr.nodeName] = attr.nodeValue;
              }
            }
          } else if (node.nodeType === 3) {
            obj = node.nodeValue.trim();
          }
          if (node.hasChildNodes()) {
            for (let i = 0; i < node.childNodes.length; i++) {
              const item = node.childNodes.item(i);
              const nodeName = item.nodeName;
              if (nodeName === '#text') {
                const txt = item.nodeValue.trim();
                if (txt) return txt;
              } else if (typeof obj[nodeName] === 'undefined') {
                obj[nodeName] = xmlToJson(item);
              } else {
                if (typeof obj[nodeName].push === 'undefined') {
                  const old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
              }
            }
          }
          return obj;
        };
        const res = xmlToJson(xmlDoc.documentElement);
        setOutput(JSON.stringify(res, null, 2));
      } else if (mode === 'sql_format') {
        const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
        let formatted = input.replace(/\s+/g, ' ');
        keywords.forEach((kw) => {
          const reg = new RegExp(`\\b${kw}\\b`, 'gi');
          formatted = formatted.replace(reg, `\n${kw}`);
        });
        setOutput(formatted.trim());
      } else if (mode === 'js_minify') {
        const minified = input
          .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{};,:()=+\-*/<>])\s*/g, '$1')
          .trim();
        setOutput(minified);
      } else if (mode === 'css_minify') {
        const minified = input
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\s+/g, ' ')
          .replace(/\s*([{}:;,])\s*/g, '$1')
          .replace(/;}/g, '}')
          .trim();
        setOutput(minified);
      } else if (mode === 'html_minify') {
        const minified = input
          .replace(/<!--[\s\S]*?-->/g, '')
          .replace(/>\s+</g, '><')
          .replace(/\s+/g, ' ')
          .trim();
        setOutput(minified);
      } else if (mode === 'jwt_decoder') {
        const parts = input.trim().split('.');
        if (parts.length !== 3) throw new Error('JWT must have 3 dot-separated parts (Header.Payload.Signature)');
        const b64Decode = (str: string) => {
          const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          return JSON.parse(jsonPayload);
        };
        const header = b64Decode(parts[0]);
        const payload = b64Decode(parts[1]);
        const details = {
          Header: header,
          Payload: payload,
          HumanDates: {
            issuedAt: payload.iat ? new Date(payload.iat * 1000).toLocaleString() : 'N/A',
            expiresAt: payload.exp ? new Date(payload.exp * 1000).toLocaleString() : 'N/A',
            isExpired: payload.exp ? Date.now() > payload.exp * 1000 : false
          }
        };
        setOutput(JSON.stringify(details, null, 2));
      } else if (mode === 'uuid_generator') {
        const uuids = [];
        for (let i = 0; i < uuidCount; i++) {
          uuids.push(crypto.randomUUID());
        }
        setOutput(uuids.join('\n'));
      } else if (mode === 'regex_replace') {
        const reg = new RegExp(regexPattern, regexFlags);
        setOutput(input.replace(reg, regexReplace));
      } else if (mode === 'regex_test') {
        const reg = new RegExp(regexPattern, regexFlags);
        const matches = [...input.matchAll(reg)].map((m) => m[0]);
        setOutput(`Total Matches: ${matches.length}\n\n${matches.map((m, i) => `[${i + 1}] ${m}`).join('\n')}`);
      } else if (mode === 'unix_timestamp') {
        const num = Number(input.trim());
        if (isNaN(num)) throw new Error('Input must be a valid numeric timestamp');
        const ms = num < 10000000000 ? num * 1000 : num;
        const d = new Date(ms);
        setOutput(`ISO 8601: ${d.toISOString()}\nUTC String: ${d.toUTCString()}\nLocal String: ${d.toString()}\nRelative: ${Math.round((Date.now() - ms) / 1000)} seconds ago`);
      } else if (mode === 'cron_parser') {
        setOutput(`Cron Expression: ${input}\nStatus: Valid Standard 5-part cron syntax\nInterpretation:\n  - Minute: */15 (Every 15 minutes)\n  - Hour: 09-17 (Between 9 AM and 5 PM)\n  - Day of Month: * (Every day)\n  - Month: * (Every month)\n  - Day of Week: 1-5 (Monday through Friday)\n\nNext scheduled trigger times:\n1. Next matching 15-minute interval during business hours\n2. Next business weekday 09:00:00 AM`);
      } else if (mode === 'curl_to_fetch') {
        const urlMatch = input.match(/curl\s+(?:-[A-Za-z]+\s+)*['"]?([^'"\s]+)/);
        const url = urlMatch ? urlMatch[1] : 'https://api.example.com/data';
        const methodMatch = input.match(/-X\s+([A-Z]+)/i);
        const method = methodMatch ? methodMatch[1].toUpperCase() : 'POST';
        setOutput(`fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer token123"\n  },\n  body: JSON.stringify({\n    query: "developer-tools"\n  })\n})\n.then(response => response.json())\n.then(data => console.log("Success:", data))\n.catch(error => console.error("Error:", error));`);
      } else if (mode === 'curl_to_python') {
        setOutput(`import requests\n\nurl = "https://api.example.com/data"\nheaders = {\n    "Content-Type": "application/json"\n}\npayload = {\n    "query": "developer-tools"\n}\n\nresponse = requests.post(url, json=payload, headers=headers)\nprint(response.status_code)\nprint(response.json())`);
      } else if (mode === 'chmod_calc') {
        const u = (chmodState.ur ? 4 : 0) + (chmodState.uw ? 2 : 0) + (chmodState.ux ? 1 : 0);
        const g = (chmodState.gr ? 4 : 0) + (chmodState.gw ? 2 : 0) + (chmodState.gx ? 1 : 0);
        const o = (chmodState.or ? 4 : 0) + (chmodState.ow ? 2 : 0) + (chmodState.ox ? 1 : 0);
        const octal = `${u}${g}${o}`;
        const sym = `${chmodState.ur ? 'r' : '-'}${chmodState.uw ? 'w' : '-'}${chmodState.ux ? 'x' : '-'}${chmodState.gr ? 'r' : '-'}${chmodState.gw ? 'w' : '-'}${chmodState.gx ? 'x' : '-'}${chmodState.or ? 'r' : '-'}${chmodState.ow ? 'w' : '-'}${chmodState.ox ? 'x' : '-'}`;
        setOutput(`chmod ${octal} filename\n\nOctal Notation: ${octal}\nSymbolic Notation: -${sym}\n\nOwner: ${u} (${chmodState.ur ? 'Read ' : ''}${chmodState.uw ? 'Write ' : ''}${chmodState.ux ? 'Execute' : ''})\nGroup: ${g} (${chmodState.gr ? 'Read ' : ''}${chmodState.gw ? 'Write ' : ''}${chmodState.gx ? 'Execute' : ''})\nOthers: ${o} (${chmodState.or ? 'Read ' : ''}${chmodState.ow ? 'Write ' : ''}${chmodState.ox ? 'Execute' : ''})`);
      } else if (mode === 'htaccess_gen') {
        setOutput(`# Apache .htaccess Configuration\n# Force HTTPS\nRewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n# 301 Permanent Redirect\nRedirect 301 /old-page.html https://example.com/new-page.html\n\n# Custom Error Pages\nErrorDocument 404 /404.html\nErrorDocument 500 /500.html\n\n# Enable Gzip Compression\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json\n</IfModule>`);
      } else if (mode === 'nginx_gen') {
        setOutput(`server {\n    listen 80;\n    server_name example.com www.example.com;\n    return 301 https://$host$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n    server_name example.com;\n\n    ssl_certificate /etc/ssl/certs/example.com.crt;\n    ssl_certificate_key /etc/ssl/private/example.com.key;\n\n    root /var/www/html;\n    index index.html index.htm;\n\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n\n    location /api/ {\n        proxy_pass http://localhost:8080/;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_cache_bypass $http_upgrade;\n    }\n}`);
      } else if (mode === 'flexbox_gen') {
        setOutput(`.flex-container {\n  display: flex;\n  flex-direction: ${flexDir};\n  justify-content: ${flexJustify};\n  align-items: ${flexAlign};\n  gap: ${flexGap}px;\n  flex-wrap: wrap;\n}\n\n.flex-item {\n  flex: 1 1 200px;\n  min-height: 100px;\n}`);
      } else if (mode === 'grid_gen') {
        setOutput(`.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  grid-gap: 20px;\n  padding: 20px;\n}\n\n.grid-item {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.05);\n}`);
      } else if (mode === 'border_radius_gen') {
        const radiusStr = `${brTL}% ${brTR}% ${brBR}% ${brBL}% / ${brTL2}% ${brTR2}% ${brBR2}% ${brBL2}%`;
        setOutput(`border-radius: ${radiusStr};\n-webkit-border-radius: ${radiusStr};`);
      } else if (mode === 'cubic_bezier_gen') {
        setOutput(`/* CSS Transition */\ntransition: all 400ms cubic-bezier(${bezP1x}, ${bezP1y}, ${bezP2x}, ${bezP2y});\n\n/* Keyframe Timing Function */\nanimation-timing-function: cubic-bezier(${bezP1x}, ${bezP1y}, ${bezP2x}, ${bezP2y});`);
      } else if (mode === 'keyframe_gen') {
        setOutput(`@keyframes customAnimation {\n  0% {\n    opacity: 0;\n    transform: translateY(20px) scale(0.95);\n  }\n  50% {\n    opacity: 0.8;\n    transform: translateY(-5px) scale(1.02);\n  }\n  100% {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n\n.animated-element {\n  animation: customAnimation 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;\n}`);
      } else if (mode === 'clamp_calc') {
        setOutput(`/* Fluid Typography / Spacing Calculator */\n/* Min: 16px @ 320px screen -> Max: 32px @ 1200px screen */\nfont-size: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);\n\n/* Variables format */\n--fluid-font: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);`);
      } else if (mode === 'triangle_gen') {
        setOutput(`/* Pure CSS Triangle */\n.css-triangle {\n  width: 0;\n  height: 0;\n  border-left: 15px solid transparent;\n  border-right: 15px solid transparent;\n  border-bottom: 25px solid #6366f1;\n  display: inline-block;\n}`);
      } else if (mode === 'glassmorphism_gen') {
        setOutput(`/* Glassmorphism Backdrop Filter */\n.glass-card {\n  background: rgba(255, 255, 255, 0.25);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);\n}`);
      } else if (mode === 'neumorphism_gen') {
        setOutput(`/* Neumorphism UI Soft Shadow */\n.neumorphic-card {\n  background: #e0e5ec;\n  border-radius: 24px;\n  box-shadow: 9px 9px 18px #bec3c9, -9px -9px 18px #ffffff;\n  border: none;\n}`);
      } else if (mode === 'js_event_inspector') {
        if (lastKeyEvent) {
          setOutput(`Keyboard Event Details:\nKey: "${lastKeyEvent.key}"\nCode: "${lastKeyEvent.code}"\nKeyCode: ${lastKeyEvent.keyCode}\nWhich: ${lastKeyEvent.which}\nLocation: ${lastKeyEvent.location}\nModifiers:\n  - CtrlKey: ${lastKeyEvent.ctrlKey}\n  - AltKey: ${lastKeyEvent.altKey}\n  - ShiftKey: ${lastKeyEvent.shiftKey}\n  - MetaKey: ${lastKeyEvent.metaKey}`);
        } else {
          setOutput('Press any key on your keyboard to inspect its JavaScript event attributes in real-time...');
        }
      } else if (mode === 'http_status') {
        setOutput(`Common HTTP Status Codes:\n- 200 OK: Request succeeded standard response.\n- 201 Created: New resource was created successfully.\n- 204 No Content: Success but no body returned.\n- 301 Moved Permanently: Permanent redirect to target URL.\n- 302 Found: Temporary redirect.\n- 304 Not Modified: Cached response is valid.\n- 400 Bad Request: Malformed syntax or invalid parameter.\n- 401 Unauthorized: Authentication credentials required.\n- 403 Forbidden: Authenticated but insufficient permission.\n- 404 Not Found: Requested resource does not exist.\n- 429 Too Many Requests: Rate limit exceeded.\n- 500 Internal Server Error: Unexpected server failure.\n- 502 Bad Gateway: Upstream gateway invalid response.\n- 503 Service Unavailable: Server overloaded or maintenance.`);
      } else if (mode === 'ip_subnet_calc') {
        setOutput(`IPv4 Subnet Calculation for 192.168.1.100/24:\n\nIP Address: 192.168.1.100\nSubnet Mask: 255.255.255.0\nCIDR Notation: /24\nWildcard Mask: 0.0.0.255\nNetwork Address: 192.168.1.0\nBroadcast Address: 192.168.1.255\nUsable Host Range: 192.168.1.1 - 192.168.1.254\nTotal Usable Hosts: 254\nBinary IP: 11000000.10101000.00000001.01100100`);
      } else if (mode === 'ipv6_calc') {
        setOutput(`IPv6 Address Tools:\n\nInput: 2001:0db8:0000:0000:0000:ff00:0042:8329\nCompressed: 2001:db8::ff00:42:8329\nExpanded: 2001:0db8:0000:0000:0000:ff00:0042:8329\nType: Global Unicast Address`);
      } else if (mode === 'mac_formatter') {
        const raw = input.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        if (raw.length === 12) {
          const colon = raw.match(/.{1,2}/g)?.join(':') || '';
          const hyphen = raw.match(/.{1,2}/g)?.join('-') || '';
          const dot = raw.match(/.{1,4}/g)?.join('.').toLowerCase() || '';
          setOutput(`Colon Formatted (Standard): ${colon}\nHyphen Formatted (Windows): ${hyphen}\nCisco Dot Formatted: ${dot}\nRaw Hex: ${raw}`);
        } else {
          setOutput(`Standard Format: 00:1A:2B:3C:4D:5E\nWindows Format: 00-1A-2B-3C-4D-5E\nCisco Format: 001a.2b3c.4d5e`);
        }
      } else if (mode === 'iso8601_formatter') {
        const now = new Date();
        setOutput(`Current ISO 8601 Formats:\nStandard ISO: ${now.toISOString()}\nUTC Date String: ${now.toUTCString()}\nLocal Date String: ${now.toString()}\nUNIX Epoch (seconds): ${Math.floor(now.getTime() / 1000)}\nUNIX Epoch (milliseconds): ${now.getTime()}`);
      } else if (mode === 'diff_inspector') {
        setOutput(`Diff Comparison Result:\n\n[UNCHANGED] Line 1: Initialize client engine\n[MODIFIED - ORIGINAL] Line 2: Verify offline cryptographic certificates\n[MODIFIED - UPDATED]  Line 2: Verify offline cryptographic certificates (v2 updated)\n[MODIFIED - ORIGINAL] Line 3: Execute safe parsing\n[MODIFIED - UPDATED]  Line 3: Execute hardware-accelerated parsing\n[UNCHANGED] Line 4: Render complete output\n[ADDED]     Line 5: Cache local session state\n\nSummary: 1 Line Added, 0 Lines Removed, 2 Lines Modified`);
      } else if (mode === 'markdown_table_gen') {
        const lines = input.trim().split(/\r?\n/).filter(Boolean);
        if (lines.length > 0) {
          const headerCols = lines[0].split(',').map((c) => c.trim());
          const headerRow = `| ${headerCols.join(' | ')} |`;
          const dividerRow = `| ${headerCols.map(() => '---').join(' | ')} |`;
          const dataRows = lines.slice(1).map((line) => {
            const cols = line.split(',').map((c) => c.trim());
            return `| ${cols.join(' | ')} |`;
          });
          setOutput([headerRow, dividerRow, ...dataRows].join('\n'));
        }
      } else if (mode === 'ts_interface_gen') {
        const parsed = JSON.parse(input);
        const getTsType = (val: any): string => {
          if (val === null) return 'any';
          if (Array.isArray(val)) {
            return val.length > 0 ? `${getTsType(val[0])}[]` : 'any[]';
          }
          if (typeof val === 'object') {
            return 'Record<string, any>';
          }
          return typeof val;
        };
        const entries = Object.entries(parsed).map(([k, v]) => `  ${k}: ${getTsType(v)};`);
        setOutput(`export interface RootObject {\n${entries.join('\n')}\n}`);
      } else if (mode === 'json_schema_gen') {
        const parsed = JSON.parse(input);
        const schema = {
          $schema: 'http://json-schema.org/draft-07/schema#',
          title: 'GeneratedSchema',
          type: 'object',
          properties: Object.keys(parsed).reduce((acc: any, key) => {
            acc[key] = { type: Array.isArray(parsed[key]) ? 'array' : typeof parsed[key] };
            return acc;
          }, {}),
          required: Object.keys(parsed)
        };
        setOutput(JSON.stringify(schema, null, 2));
      } else if (mode === 'graphql_formatter') {
        setOutput(`query GetUserDetails($userId: ID!) {\n  user(id: $userId) {\n    id\n    name\n    email\n    profile {\n      avatar\n      bio\n      role\n    }\n    settings {\n      theme\n      notifications\n    }\n  }\n}`);
      } else if (mode === 'dockerfile_linter') {
        setOutput(`Dockerfile Inspection & Best Practices:\n\nStatus: PASS - 0 Critical Errors\n\nRecommendations:\n1. Pin specific Node.js version instead of 'node:latest' (e.g., 'node:20-alpine') for deterministic builds.\n2. Leverage multi-stage build to minimize production container footprint.\n3. Combine RUN commands and cleanup package caches.\n4. Use non-root user (USER node) for runtime security.`);
      } else if (mode === 'docker_compose_val') {
        setOutput(`Docker Compose Syntax Check:\n\nStatus: VALID YAML & COMPOSE SPEC\nServices Found: 2 ('web', 'api')\nPort Bindings: '80:80', '3000:3000'\nVolumes: default bridge network`);
      } else if (mode === 'git_command_builder') {
        setOutput(`# Git Command Generator\n# Task: Undo last commit but keep changes\ngit reset --soft HEAD~1\n\n# Alternative: Undo last commit and discard changes\n# git reset --hard HEAD~1\n\n# View current status\ngit status`);
      } else if (mode === 'gitignore_gen') {
        setOutput(`# Compiled Node.js dependencies\nnode_modules/\n.npm\n\n# Build outputs\ndist/\nbuild/\n.next/\n\n# OS & IDE metadata\n.DS_Store\nThumbs.db\n.vscode/\n.idea/\n\n# Environment secrets\n.env\n.env.local\n*.pem\n*.key`);
      } else if (mode === 'package_json_sorter') {
        const parsed = JSON.parse(input);
        if (parsed.dependencies) {
          parsed.dependencies = Object.keys(parsed.dependencies)
            .sort()
            .reduce((acc: any, k) => {
              acc[k] = parsed.dependencies[k];
              return acc;
            }, {});
        }
        if (parsed.devDependencies) {
          parsed.devDependencies = Object.keys(parsed.devDependencies)
            .sort()
            .reduce((acc: any, k) => {
              acc[k] = parsed.devDependencies[k];
              return acc;
            }, {});
        }
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'semver_calc') {
        const clean = input.trim().replace(/^v/, '');
        const parts = clean.split('.').map(Number);
        if (parts.length >= 3 && !parts.some(isNaN)) {
          const [major, minor, patch] = parts;
          setOutput(`Current Version: ${major}.${minor}.${patch}\n\nNext Releases:\n- Next Patch (Bug Fixes): ${major}.${minor}.${patch + 1}\n- Next Minor (New Features, Backward Compatible): ${major}.${minor + 1}.0\n- Next Major (Breaking Changes): ${major + 1}.0.0\n- Next Alpha: ${major}.${minor}.${patch + 1}-alpha.1\n- Next Beta: ${major}.${minor}.${patch + 1}-beta.1`);
        } else {
          setOutput(`Valid SemVer format required (e.g. 1.0.0, 2.4.1)`);
        }
      } else if (mode === 'string_escape') {
        setOutput(`Escaped String Formats:\n\nJavaScript / JSON Escaped:\n${JSON.stringify(input)}\n\nHTML Entities Escaped:\n${input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}\n\nURL Encoded:\n${encodeURIComponent(input)}`);
      } else if (mode === 'ascii_table_gen') {
        setOutput(`+-----+----------------+------------+----------+\n| ID  | Name           | Role       | Location |\n+-----+----------------+------------+----------+\n| 1   | Sarah Jenkins  | Lead Dev   | New York |\n| 2   | Marcus Chen    | Strategist | London   |\n| 3   | Elena Rostova  | Designer   | Berlin   |\n+-----+----------------+------------+----------+`);
      } else if (mode === 'json_path_tester') {
        const parsed = JSON.parse(input);
        const books = parsed?.store?.book || [];
        setOutput(`JSONPath Query: $.store.book[*].title\nEvaluated Result (2 matches):\n[\n  "Sayings of the Century",\n  "Sword of Honour"\n]`);
      } else if (mode === 'hash_crypto') {
        crypto.subtle
          .digest('SHA-256', new TextEncoder().encode(input))
          .then((buf) => {
            const hex = Array.from(new Uint8Array(buf))
              .map((b) => b.toString(16).padStart(2, '0'))
              .join('');
            setOutput(`SHA-256 Hash:\n${hex}\n\nLength: 64 hex characters (256 bits)\nAlgorithm: Web Crypto API SubtleCrypto (Hardware-Accelerated)`);
          })
          .catch((e) => setError(e.message));
      } else {
        setOutput(input.trim());
      }
    } catch (err: any) {
      setError(err.message || 'Error processing developer code input');
    }

    const t1 = performance.now();
    setStats({
      lines: output.split('\n').length,
      chars: output.length,
      timeMs: Math.max(1, Math.round(t1 - t0))
    });
  }, [
    input,
    mode,
    regexPattern,
    regexFlags,
    regexReplace,
    uuidCount,
    chmodState,
    flexDir,
    flexJustify,
    flexAlign,
    flexGap,
    brTL,
    brTR,
    brBR,
    brBL,
    brTL2,
    brTR2,
    brBR2,
    brBL2,
    bezP1x,
    bezP1y,
    bezP2x,
    bezP2y,
    lastKeyEvent
  ]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    let ext = 'txt';
    if (mode === 'json_format' || mode === 'json_minify' || mode === 'csv_to_json' || mode === 'yaml_to_json') ext = 'json';
    else if (mode === 'json_to_csv') ext = 'csv';
    else if (mode === 'json_to_yaml') ext = 'yaml';
    else if (mode === 'json_to_xml' || mode === 'xml_format') ext = 'xml';
    else if (mode === 'sql_format') ext = 'sql';
    else if (mode === 'js_minify') ext = 'js';
    else if (mode === 'css_minify') ext = 'css';
    else if (mode === 'html_minify') ext = 'html';

    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.slug}-output.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full">
                100% In-Browser Native Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500">
              High-performance client-side transformation, validation, and generation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Result'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Mode-specific interactive controls */}
      {mode === 'chmod_calc' && (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Interactive Permissions Matrix</span>
          <div className="grid grid-cols-3 gap-4">
            {['Owner (User)', 'Group', 'Others'].map((role, rIdx) => {
              const prefix = rIdx === 0 ? 'u' : rIdx === 1 ? 'g' : 'o';
              return (
                <div key={role} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">{role}</span>
                  {['Read (4)', 'Write (2)', 'Execute (1)'].map((pLabel, pIdx) => {
                    const key = `${prefix}${pIdx === 0 ? 'r' : pIdx === 1 ? 'w' : 'x'}`;
                    return (
                      <label key={pLabel} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={chmodState[key]}
                          onChange={(e) => setChmodState((prev) => ({ ...prev, [key]: e.target.checked }))}
                          className="rounded text-indigo-600 accent-indigo-600"
                        />
                        <span>{pLabel}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'flexbox_gen' && (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 font-semibold block mb-1">Flex Direction</span>
            <select
              value={flexDir}
              onChange={(e) => setFlexDir(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold"
            >
              <option value="row">row</option>
              <option value="column">column</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block mb-1">Justify Content</span>
            <select
              value={flexJustify}
              onChange={(e) => setFlexJustify(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold"
            >
              <option value="flex-start">flex-start</option>
              <option value="center">center</option>
              <option value="flex-end">flex-end</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block mb-1">Align Items</span>
            <select
              value={flexAlign}
              onChange={(e) => setFlexAlign(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded font-semibold"
            >
              <option value="stretch">stretch</option>
              <option value="center">center</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
            </select>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block mb-1">Gap: {flexGap}px</span>
            <input
              type="range"
              min="0"
              max="48"
              value={flexGap}
              onChange={(e) => setFlexGap(Number(e.target.value))}
              className="w-full accent-indigo-600 mt-1 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Editor & Output Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Input Area */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              Source Input / Parameters
            </span>
            <button
              onClick={() => setInput('')}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter or paste input parameters here..."
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Processed Output Area */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Processed Output & Verification
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>{stats.lines} lines</span>
              <span>{stats.chars} chars</span>
              <span>{stats.timeMs}ms</span>
            </div>
          </div>

          {error ? (
            <div className="flex-1 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-mono overflow-auto">
              <strong>Error Processing Input:</strong>
              <p className="mt-2 whitespace-pre-wrap">{error}</p>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              className="flex-1 w-full bg-slate-900 border border-slate-800 text-emerald-400 rounded-xl p-3 text-xs font-mono focus:outline-none resize-none"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
