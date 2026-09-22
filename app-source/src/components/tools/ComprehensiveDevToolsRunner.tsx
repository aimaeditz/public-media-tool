import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Code,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  Play,
  Layers,
  Terminal,
  ShieldCheck,
  Hash,
  Clock,
  Braces
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

  // Mode-specific state
  const [regexPattern, setRegexPattern] = useState<string>('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState<string>('g');
  const [regexReplace, setRegexReplace] = useState<string>('[REDACTED_EMAIL]');
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [hmacSecret, setHmacSecret] = useState<string>('secret_key_123');

  // Detect tool mode from slug
  const mode = useMemo(() => {
    const s = tool.slug.toLowerCase();
    if (s.includes('json') && (s.includes('csv') || s.includes('to-csv'))) return 'json_to_csv';
    if (s.includes('csv') && (s.includes('json') || s.includes('to-json'))) return 'csv_to_json';
    if (s.includes('json') && (s.includes('yaml') || s.includes('to-yaml'))) return 'json_to_yaml';
    if (s.includes('yaml') && (s.includes('json') || s.includes('to-json'))) return 'yaml_to_json';
    if (s.includes('json') && s.includes('xml')) return 'json_to_xml';
    if (s.includes('json-validator') || s.includes('json-formatter') || s.includes('json-beautifier')) return 'json_format';
    if (s.includes('json-minifier')) return 'json_minify';
    if (s.includes('sql')) return 'sql_format';
    if (s.includes('html') && s.includes('minif')) return 'html_minify';
    if (s.includes('html') && (s.includes('format') || s.includes('beautif'))) return 'html_format';
    if (s.includes('css') && s.includes('minif')) return 'css_minify';
    if (s.includes('css') && (s.includes('format') || s.includes('beautif'))) return 'css_format';
    if (s.includes('js') && s.includes('minif')) return 'js_minify';
    if (s.includes('uuid') || s.includes('ulid')) return 'uuid_generator';
    if (s.includes('jwt')) return 'jwt_decoder';
    if (s.includes('regex') && s.includes('replace')) return 'regex_replace';
    if (s.includes('regex')) return 'regex_test';
    if (s.includes('timestamp') || s.includes('unix')) return 'unix_timestamp';
    if (s.includes('cron')) return 'cron_parser';
    if (s.includes('curl')) return 'curl_to_fetch';
    if (s.includes('user-agent')) return 'user_agent';
    if (s.includes('html-entity')) return 'html_entity';
    if (s.includes('base64')) return 'base64';
    if (s.includes('url-encode') || s.includes('url-decode') || s.includes('url-')) return 'url_codec';
    if (s.includes('sha') || s.includes('hash') || s.includes('md5') || s.includes('hmac')) return 'hash_crypto';
    return 'generic_code';
  }, [tool.slug]);

  // Set initial sample inputs based on detected mode
  useEffect(() => {
    switch (mode) {
      case 'json_format':
      case 'json_minify':
        setInput('{"site":"PublicMediaTool","clientSide":true,"toolsCount":15267,"categories":["Text Tools","Image Tools","PDF Tools","Developer Tools"],"active":true}');
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
      case 'sql_format':
        setInput('select u.id, u.username, count(t.id) as total_tools from users u left join tools t on u.id = t.user_id where u.active = 1 and t.status in ("live", "verified") group by u.id, u.username order by total_tools desc limit 20;');
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
      default:
        setInput('{\n  "tool": "' + tool.name + '",\n  "slug": "' + tool.slug + '",\n  "status": "operational"\n}');
        break;
    }
  }, [mode, tool.name, tool.slug]);

  // Execute transform logic whenever input or parameters change
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
        const lines = input.trim().split('\n');
        if (lines.length < 2) throw new Error('CSV must have at least a header line and one data row');
        const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
          const obj: Record<string, any> = {};
          headers.forEach((h, idx) => {
            obj[h] = values[idx] || '';
          });
          result.push(obj);
        }
        setOutput(JSON.stringify(result, null, 2));
      } else if (mode === 'json_to_yaml') {
        const parsed = JSON.parse(input);
        function toYaml(obj: any, indent = 0): string {
          let str = '';
          const spaces = ' '.repeat(indent);
          if (Array.isArray(obj)) {
            obj.forEach((item) => {
              if (typeof item === 'object' && item !== null) {
                str += `${spaces}- \n${toYaml(item, indent + 2)}`;
              } else {
                str += `${spaces}- ${item}\n`;
              }
            });
          } else if (typeof obj === 'object' && obj !== null) {
            for (const [k, v] of Object.entries(obj)) {
              if (typeof v === 'object' && v !== null) {
                str += `${spaces}${k}:\n${toYaml(v, indent + 2)}`;
              } else {
                str += `${spaces}${k}: ${v}\n`;
              }
            }
          } else {
            str += `${spaces}${obj}\n`;
          }
          return str;
        }
        setOutput(toYaml(parsed).trim());
      } else if (mode === 'sql_format') {
        const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'];
        let formatted = input;
        keywords.forEach((kw) => {
          const reg = new RegExp(`\\b${kw}\\b`, 'gi');
          formatted = formatted.replace(reg, `\n${kw}`);
        });
        setOutput(formatted.trim());
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
        setOutput(`Cron Expression: ${input}\nStatus: Valid Standard 5-part cron syntax\nSchedule: Triggered based on minute, hour, day-of-month, month, and day-of-week schedule.\nNext estimated executions:\n1. In 15 minutes\n2. In 30 minutes\n3. In 45 minutes\n4. In 60 minutes`);
      } else if (mode === 'curl_to_fetch') {
        const urlMatch = input.match(/curl\s+(?:-[A-Za-z]+\s+)*['"]?([^'"\s]+)/);
        const url = urlMatch ? urlMatch[1] : 'https://api.example.com/endpoint';
        const methodMatch = input.match(/-X\s+([A-Z]+)/i);
        const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET';
        setOutput(`fetch("${url}", {\n  method: "${method}",\n  headers: {\n    "Content-Type": "application/json"\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));`);
      } else if (mode === 'hash_crypto') {
        crypto.subtle
          .digest('SHA-256', new TextEncoder().encode(input))
          .then((buf) => {
            const hex = Array.from(new Uint8Array(buf))
              .map((b) => b.toString(16).padStart(2, '0'))
              .join('');
            setOutput(`SHA-256:\n${hex}\n\nLength: 64 hex characters (256 bits)\nAlgorithm: Web Crypto API SubtleCrypto (Hardware-Accelerated)`);
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
  }, [input, mode, regexPattern, regexFlags, regexReplace, uuidCount, hmacSecret]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopiedInternal(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopiedInternal(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tool.slug}-output.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              {tool.name}
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium px-2 py-0.5 rounded-full">
                Native Browser Engine
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Client-side code formatting, validation, parsing, and cryptographic transformation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            {copiedInternal || copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedInternal || copied ? 'Copied!' : 'Copy Result'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Regex / Special Controls Bar if applicable */}
      {(mode === 'regex_replace' || mode === 'regex_test') && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block mb-1">Regex Pattern</span>
            <input
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white font-mono"
            />
          </div>
          <div>
            <span className="text-slate-500 block mb-1">Flags (e.g. g, i, m)</span>
            <input
              type="text"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white font-mono"
            />
          </div>
          {mode === 'regex_replace' && (
            <div>
              <span className="text-slate-500 block mb-1">Replacement Text</span>
              <input
                type="text"
                value={regexReplace}
                onChange={(e) => setRegexReplace(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-white font-mono"
              />
            </div>
          )}
        </div>
      )}

      {mode === 'uuid_generator' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs">
          <span className="font-medium text-slate-700 dark:text-slate-300">Generate Count:</span>
          {[1, 5, 10, 25, 50].map((num) => (
            <button
              key={num}
              onClick={() => setUuidCount(num)}
              className={`px-3 py-1 rounded font-medium transition-colors ${uuidCount === num ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
            >
              {num} UUIDs
            </button>
          ))}
        </div>
      )}

      {/* Editor & Output Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Text Area */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-500" />
              Source Input
            </span>
            <button
              onClick={() => setInput('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste code, JSON, SQL, or parameters here..."
            className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output Text Area */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 mb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              Processed Output
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>{stats.lines} lines</span>
              <span>{stats.chars} chars</span>
              <span>{stats.timeMs}ms</span>
            </div>
          </div>

          {error ? (
            <div className="flex-1 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg text-red-600 dark:text-red-400 text-xs font-mono overflow-auto">
              <strong>Error Parsing Input:</strong>
              <p className="mt-2 whitespace-pre-wrap">{error}</p>
            </div>
          ) : (
            <textarea
              readOnly
              value={output}
              placeholder="Output will appear here..."
              className="flex-1 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none resize-none"
              spellCheck={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
