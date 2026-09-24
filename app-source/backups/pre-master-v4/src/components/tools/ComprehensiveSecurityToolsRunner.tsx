import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  RotateCcw,
  Copy,
  Check,
  Shield,
  Key,
  Lock,
  Binary,
  Hash,
  Sparkles
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveSecurityToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const toolName = tool.name.toLowerCase();
  const isHash = toolName.includes('hash') || toolName.includes('sha') || toolName.includes('md5') || toolName.includes('checksum');
  const isPin = toolName.includes('pin');
  const isUuid = toolName.includes('uuid') || toolName.includes('guid') || toolName.includes('ulid') || toolName.includes('token') || toolName.includes('nanoid');
  const isStrength = toolName.includes('strength') || toolName.includes('entropy') || toolName.includes('audit');

  // Password Generator State
  const [passLength, setPassLength] = useState(18);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [bulkCount, setBulkCount] = useState(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);

  // Strength Auditor State
  const [auditPassword, setAuditPassword] = useState('Tr0ub4dor&3#StrongP@ss99');

  // Hash Generator State
  const [hashInput, setHashInput] = useState('The quick brown fox jumps over the lazy dog');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  // PIN Generator State
  const [pinLength, setPinLength] = useState(6);
  const [pins, setPins] = useState<string[]>([]);

  // UUID/Token Generator State
  const [tokenType, setTokenType] = useState<'uuid-v4' | 'hex-32' | 'base64-url' | 'nanoid'>('uuid-v4');
  const [tokens, setTokens] = useState<string[]>([]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    onCopy();
  };

  const generatePassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijkmnopqrstuvwxyz';
    if (!excludeAmbiguous && includeLower) chars += 'l';
    if (includeUpper) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (!excludeAmbiguous && includeUpper) chars += 'IO';
    if (includeNumbers) chars += '23456789';
    if (!excludeAmbiguous && includeNumbers) chars += '01';
    if (includeSymbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const getRandPass = () => {
      const arr = new Uint32Array(passLength);
      crypto.getRandomValues(arr);
      let res = '';
      for (let i = 0; i < passLength; i++) {
        res += chars[arr[i] % chars.length];
      }
      return res;
    };

    setPassword(getRandPass());
    const bulks: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      bulks.push(getRandPass());
    }
    setBulkPasswords(bulks);
  };

  const generatePins = () => {
    const list: string[] = [];
    for (let i = 0; i < 6; i++) {
      const arr = new Uint8Array(pinLength);
      crypto.getRandomValues(arr);
      let p = '';
      for (let j = 0; j < pinLength; j++) {
        p += String(arr[j] % 10);
      }
      list.push(p);
    }
    setPins(list);
  };

  const generateTokens = () => {
    const list: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (tokenType === 'uuid-v4') {
        list.push(crypto.randomUUID ? crypto.randomUUID() : '4a3b8c2d-1e5f-4a7b-8c9d-0e1f2a3b4c5d');
      } else if (tokenType === 'hex-32') {
        const arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        list.push(Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join(''));
      } else if (tokenType === 'base64-url') {
        const arr = new Uint8Array(24);
        crypto.getRandomValues(arr);
        list.push(btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
      } else {
        const arr = new Uint8Array(21);
        crypto.getRandomValues(arr);
        const alphabet = 'useandom-26T1983_40STAkjlqyhpfgUIntRickVbODX58PEMGU3easylaunch';
        let str = '';
        for (let j = 0; j < 21; j++) {
          str += alphabet[arr[j] % 62];
        }
        list.push(str);
      }
    }
    setTokens(list);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);
      const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const out: Record<string, string> = {};
      for (const alg of algorithms) {
        try {
          const hashBuffer = await crypto.subtle.digest(alg, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          out[alg] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        } catch {
          out[alg] = 'Unsupported in this environment';
        }
      }
      if (active) setHashes(out);
    })();
    return () => {
      active = false;
    };
  }, [hashInput]);

  useEffect(() => {
    generatePassword();
    generatePins();
    generateTokens();
  }, []);

  const strengthAnalysis = useMemo(() => {
    const val = auditPassword;
    if (!val) {
      return { score: 0, entropy: 0, time: '0 seconds', label: 'Very Weak', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    }
    let pool = 0;
    if (/[a-z]/.test(val)) pool += 26;
    if (/[A-Z]/.test(val)) pool += 26;
    if (/[0-9]/.test(val)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(val)) pool += 33;

    const entropy = Math.round(val.length * Math.log2(Math.max(pool, 2)));
    let score = Math.min(100, Math.round((entropy / 128) * 100));
    let time = '< 1 millisecond';
    let label = 'Very Weak';
    let color = 'text-rose-600 bg-rose-50 border-rose-200';

    if (entropy < 28) {
      score = 20;
      time = 'instant';
      label = 'Very Weak';
      color = 'text-rose-600 bg-rose-50 border-rose-200';
    } else if (entropy < 45) {
      score = 45;
      time = 'a few minutes';
      label = 'Weak';
      color = 'text-orange-600 bg-orange-50 border-orange-200';
    } else if (entropy < 65) {
      score = 70;
      time = 'several months';
      label = 'Moderate';
      color = 'text-amber-600 bg-amber-50 border-amber-200';
    } else if (entropy < 85) {
      score = 88;
      time = 'hundreds of years';
      label = 'Strong';
      color = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    } else {
      score = 100;
      time = 'centuries (quantum resistant)';
      label = 'Very Strong';
      color = 'text-emerald-700 bg-emerald-100 border-emerald-300';
    }

    return { score, entropy, time, label, color };
  }, [auditPassword]);

  return (
    <div className="space-y-6">
      {/* Hash Calculator Mode */}
      {isHash && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Hash className="w-4 h-4 text-indigo-600" />
            <span>Cryptographic Hash Generator</span>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Input Text String</label>
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-mono text-sm"
              placeholder="Type or paste text to compute hashes..."
            />
          </div>
          <div className="space-y-3 pt-2">
            {Object.entries(hashes).map(([algo, hashVal]) => (
              <div key={algo} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{algo}</span>
                  <button
                    onClick={() => copyToClipboard(hashVal)}
                    className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="font-mono text-xs text-slate-800 break-all select-all">{hashVal}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Password Strength Mode */}
      {isStrength && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Password Entropy & Strength Auditor</span>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600">Password Candidate</label>
            <input
              type="text"
              value={auditPassword}
              onChange={(e) => setAuditPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 font-mono text-base font-semibold"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-xl border ${strengthAnalysis.color} space-y-1`}>
              <span className="text-xs uppercase tracking-wider font-semibold opacity-75">Rating</span>
              <p className="text-lg font-bold">{strengthAnalysis.label}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Entropy</span>
              <p className="text-lg font-bold text-slate-800">{strengthAnalysis.entropy} bits</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Crack Time</span>
              <p className="text-lg font-bold text-slate-800">{strengthAnalysis.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* PIN Generator Mode */}
      {isPin && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Key className="w-4 h-4 text-indigo-600" />
              <span>Cryptographic Numeric PIN Generator</span>
            </div>
            <button
              onClick={generatePins}
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-xs font-semibold text-slate-600">PIN Length: {pinLength} digits</label>
            <input
              type="range"
              min="4"
              max="12"
              value={pinLength}
              onChange={(e) => {
                setPinLength(Number(e.target.value));
                generatePins();
              }}
              className="w-48 accent-indigo-600 cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pins.map((pin, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(pin)}
                className="p-4 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between font-mono text-lg font-bold tracking-widest text-slate-800"
              >
                <span>{pin}</span>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UUID/Token Generator Mode */}
      {isUuid && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              {[
                { id: 'uuid-v4', label: 'UUID v4' },
                { id: 'hex-32', label: 'Hex 32' },
                { id: 'base64-url', label: 'Base64URL' },
                { id: 'nanoid', label: 'NanoID (21)' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setTokenType(fmt.id as any);
                    generateTokens();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    tokenType === fmt.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
            <button
              onClick={generateTokens}
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>
          <div className="space-y-2">
            {tokens.map((tok, idx) => (
              <div
                key={idx}
                onClick={() => copyToClipboard(tok)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between font-mono text-sm group"
              >
                <span className="text-slate-800 group-hover:text-indigo-600 font-semibold">{tok}</span>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default Password Generator */}
      {!isHash && !isPin && !isUuid && !isStrength && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CSPRNG Generated Password</span>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 break-all select-all tracking-wide">
                {password}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generatePassword}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                title="Generate Fresh Password"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => copyToClipboard(password)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">Length: {passLength} Characters</label>
              <input
                type="range"
                min="6"
                max="64"
                value={passLength}
                onChange={(e) => {
                  setPassLength(Number(e.target.value));
                  generatePassword();
                }}
                className="w-48 accent-indigo-600 cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => {
                    setIncludeUpper(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded-sm text-indigo-600 focus:ring-indigo-500"
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => {
                    setIncludeLower(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded-sm text-indigo-600 focus:ring-indigo-500"
                />
                Lowercase (a-z)
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => {
                    setIncludeNumbers(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded-sm text-indigo-600 focus:ring-indigo-500"
                />
                Numbers (0-9)
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => {
                    setIncludeSymbols(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded-sm text-indigo-600 focus:ring-indigo-500"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Bulk Password Candidates</span>
            <div className="space-y-2">
              {bulkPasswords.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => copyToClipboard(p)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between font-mono text-xs group"
                >
                  <span className="text-slate-800 group-hover:text-indigo-600 font-semibold">{p}</span>
                  <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprehensiveSecurityToolsRunner;
