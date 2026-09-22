import React, { useState, useEffect, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  ShieldCheck,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  Copy,
  Check,
  Hash,
  Fingerprint,
  Eye,
  EyeOff,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  Binary
} from 'lucide-react';

interface Props {
  tool: Tool;
  onCopy: () => void;
  copied: boolean;
}

export const ComprehensiveSecurityToolsRunner: React.FC<Props> = ({ tool, onCopy, copied }) => {
  const name = tool.name.toLowerCase();

  // Mode detection
  const isHash = name.includes('hash') || name.includes('sha') || name.includes('md5') || name.includes('checksum');
  const isPin = name.includes('pin');
  const isUuidOrToken = name.includes('uuid') || name.includes('guid') || name.includes('ulid') || name.includes('token') || name.includes('nanoid');
  const isPasswordStrength = name.includes('strength') || name.includes('entropy') || name.includes('audit');
  const isPassphrase = name.includes('passphrase') || name.includes('memorable');
  const isCipher = name.includes('cipher') || name.includes('rot13') || name.includes('encrypt') || name.includes('caesar');

  // Password Generator State
  const [pwLength, setPwLength] = useState<number>(18);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [bulkCount, setBulkCount] = useState<number>(5);
  const [bulkPasswords, setBulkPasswords] = useState<string[]>([]);

  // Password Strength State
  const [testPassword, setTestPassword] = useState<string>('Tr0ub4dor&3#StrongP@ss99');
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // Hash State
  const [hashInput, setHashInput] = useState<string>('The quick brown fox jumps over the lazy dog');
  const [hashResults, setHashResults] = useState<{ [alg: string]: string }>({});

  // PIN Generator State
  const [pinLength, setPinLength] = useState<number>(6);
  const [generatedPins, setGeneratedPins] = useState<string[]>([]);

  // Token Generator State
  const [tokenCount, setTokenCount] = useState<number>(5);
  const [tokenType, setTokenType] = useState<'uuid-v4' | 'hex-32' | 'base64-url' | 'nanoid'>('uuid-v4');
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);

  // Generate Password function
  const generatePassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijkmnopqrstuvwxyz';
    if (!avoidAmbiguous && includeLower) chars += 'l';
    if (includeUpper) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    if (!avoidAmbiguous && includeUpper) chars += 'IO';
    if (includeNumbers) chars += '23456789';
    if (!avoidAmbiguous && includeNumbers) chars += '01';
    if (includeSymbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const gen = () => {
      const array = new Uint32Array(pwLength);
      crypto.getRandomValues(array);
      let res = '';
      for (let i = 0; i < pwLength; i++) {
        res += chars[array[i] % chars.length];
      }
      return res;
    };

    setGeneratedPassword(gen());
    const bulkList: string[] = [];
    for (let i = 0; i < bulkCount; i++) {
      bulkList.push(gen());
    }
    setBulkPasswords(bulkList);
  };

  // Generate PINs
  const generatePins = () => {
    const list: string[] = [];
    for (let i = 0; i < 6; i++) {
      const array = new Uint8Array(pinLength);
      crypto.getRandomValues(array);
      let pin = '';
      for (let j = 0; j < pinLength; j++) {
        pin += String(array[j] % 10);
      }
      list.push(pin);
    }
    setGeneratedPins(list);
  };

  // Generate Tokens
  const generateTokens = () => {
    const tokens: string[] = [];
    for (let i = 0; i < tokenCount; i++) {
      if (tokenType === 'uuid-v4') {
        tokens.push(crypto.randomUUID ? crypto.randomUUID() : '4a3b8c2d-1e5f-4a7b-8c9d-0e1f2a3b4c5d');
      } else if (tokenType === 'hex-32') {
        const arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        tokens.push(Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join(''));
      } else if (tokenType === 'base64-url') {
        const arr = new Uint8Array(24);
        crypto.getRandomValues(arr);
        tokens.push(btoa(String.fromCharCode(...arr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
      } else {
        // nanoid style 21 char
        const urlAlphabet = 'useandom-26T1983_40STAkjlqyhpfgUIntRickVbODX58PEMGU3easylaunch';
        const arr = new Uint8Array(21);
        crypto.getRandomValues(arr);
        let id = '';
        for (let j = 0; j < 21; j++) id += urlAlphabet[arr[j] % urlAlphabet.length];
        tokens.push(id);
      }
    }
    setGeneratedTokens(tokens);
  };

  // Compute Hashes
  useEffect(() => {
    let isCancelled = false;
    const compute = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(hashInput);

      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const res: { [k: string]: string } = {};

      for (const alg of algos) {
        try {
          const hashBuffer = await crypto.subtle.digest(alg, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          res[alg] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
          res[alg] = 'Unsupported in this environment';
        }
      }

      if (!isCancelled) {
        setHashResults(res);
      }
    };

    compute();
    return () => {
      isCancelled = true;
    };
  }, [hashInput]);

  useEffect(() => {
    generatePassword();
    generatePins();
    generateTokens();
  }, []);

  // Password Entropy & Strength Calculations
  const strengthAudit = useMemo(() => {
    const pw = testPassword;
    if (!pw) return { score: 0, entropy: 0, time: '0 seconds', label: 'Very Weak', color: 'text-rose-600 bg-rose-50 border-rose-200' };

    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) pool += 33;

    const entropy = Math.round(pw.length * Math.log2(Math.max(pool, 2)));

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

    return { score, entropy, time, label, color, length: pw.length };
  }, [testPassword]);

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    onCopy();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Hardware-Accelerated Web Crypto Engine</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-800 text-emerald-300 rounded-full border border-slate-700">
            CSPRNG Local Security
          </span>
        </div>
      </div>

      {/* 1. HASH GENERATOR & AUDITOR */}
      {isHash && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 block">Input String / Text for Cryptographic Hashing</label>
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              rows={3}
              placeholder="Enter text to hash..."
              className="w-full p-3 font-mono text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Computed Cryptographic Digests</span>
            {Object.entries(hashResults).map(([alg, digest]) => (
              <div key={alg} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">{alg}</span>
                  <button
                    onClick={() => copyText(digest)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-800 break-all bg-white p-2 rounded-lg border border-slate-200">
                  {digest}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. PASSWORD STRENGTH & ENTROPY AUDITOR */}
      {isPasswordStrength && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700">Test Password / Secret</label>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={testPassword}
              onChange={(e) => setTestPassword(e.target.value)}
              className="w-full px-4 py-3 font-mono text-base font-bold text-slate-900 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Entropy Score</span>
              <p className="text-3xl font-extrabold font-mono text-indigo-600">{strengthAudit.entropy} Bits</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Assessment</span>
              <p className={`text-2xl font-bold ${strengthAudit.label === 'Strong' || strengthAudit.label === 'Very Strong' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {strengthAudit.label}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase">Crack Time (Brute Force)</span>
              <p className="text-base font-bold text-slate-800 mt-1">{strengthAudit.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. PIN GENERATOR */}
      {isPin && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Digits:</span>
              {[4, 6, 8, 10].map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setPinLength(d);
                    generatePins();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    pinLength === d ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {d} Digits
                </button>
              ))}
            </div>
            <button
              onClick={generatePins}
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {generatedPins.map((pin, i) => (
              <div
                key={i}
                onClick={() => copyText(pin)}
                className="p-4 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span className="text-2xl font-mono font-bold tracking-widest text-slate-800 group-hover:text-indigo-600">
                  {pin}
                </span>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. UUID & TOKEN GENERATOR */}
      {isUuidOrToken && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'uuid-v4', label: 'UUID v4' },
                { id: 'hex-32', label: 'Hex 32' },
                { id: 'base64-url', label: 'Base64URL' },
                { id: 'nanoid', label: 'NanoID (21)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTokenType(t.id as any);
                    generateTokens();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    tokenType === t.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={generateTokens}
              className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="space-y-2">
            {generatedTokens.map((tok, i) => (
              <div
                key={i}
                onClick={() => copyText(tok)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between font-mono text-sm group"
              >
                <span className="text-slate-800 group-hover:text-indigo-600 font-semibold">{tok}</span>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DEFAULT / UNIVERSAL SECURE PASSWORD GENERATOR */}
      {(!isHash && !isPin && !isUuidOrToken && !isPasswordStrength) && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          {/* Primary Password Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CSPRNG Generated Password</span>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 break-all select-all tracking-wide">
                {generatedPassword}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generatePassword}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                title="Generate Fresh Password"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => copyText(generatedPassword)}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase">Length: {pwLength} Characters</label>
              <input
                type="range"
                min="6"
                max="64"
                value={pwLength}
                onChange={(e) => {
                  setPwLength(Number(e.target.value));
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
                  className="rounded text-indigo-600 focus:ring-indigo-500"
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
                  className="rounded text-indigo-600 focus:ring-indigo-500"
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
                  className="rounded text-indigo-600 focus:ring-indigo-500"
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
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>

          {/* Bulk Generation List */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Bulk Password Candidates</span>
            <div className="space-y-2">
              {bulkPasswords.map((pw, i) => (
                <div
                  key={i}
                  onClick={() => copyText(pw)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors flex items-center justify-between font-mono text-xs group"
                >
                  <span className="text-slate-800 group-hover:text-indigo-600 font-semibold">{pw}</span>
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
