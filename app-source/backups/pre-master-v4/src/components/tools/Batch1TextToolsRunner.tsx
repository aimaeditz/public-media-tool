import React, { useState, useMemo } from 'react';
import { Tool } from '../../lib/types';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Download,
  FileText,
  RefreshCw,
  Eye,
  ShieldCheck,
  ArrowUpDown,
  Code,
  List,
  Binary,
  Volume2,
  AlertCircle,
  HelpCircle,
  Hash
} from 'lucide-react';

interface Batch1TextToolsRunnerProps {
  tool: Tool;
  onCopy?: () => void;
  copied?: boolean;
}

// Universal Morse Code mapping
const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};
const REVERSE_MORSE = Object.entries(MORSE_MAP).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {} as Record<string, string>);

// NATO Phonetic mapping
const NATO_MAP: Record<string, string> = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
  'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
  '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

// Upside Down map
const UPSIDE_DOWN_MAP: Record<string, string> = {
  'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
  'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
  'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
  'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
  'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'ᗡ', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
  'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
  'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩',
  'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
  '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9',
  '7': 'ㄥ', '8': '8', '9': '6', '.': '˙', ',': '\'', '?': '¿', '!': '¡'
};

// Bubble Text map
const BUBBLE_MAP: Record<string, string> = {
  'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ',
  'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ',
  'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ',
  'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
  'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ',
  'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ',
  'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ',
  'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
  '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥',
  '7': '⑦', '8': '⑧', '9': '⑨'
};

// Zalgo diacritics
const ZALGO_UP = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌', '̃', '̂', '̌', '͐'];
const ZALGO_MID = ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͜', '͝', '͢', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ'];
const ZALGO_DOWN = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲'];

// Sample texts for different modes
const SAMPLES = {
  article: `The quick brown fox jumps over the lazy dog. Web development in 2026 demands high-performance, client-side browser computing. With HTML5, Web Crypto, and Canvas APIs, modern applications process data safely in memory without sending confidential documents to external servers.`,
  code: `function calculateMetrics(text) {\n  const words = text.trim().split(/\\s+/);\n  return { count: words.length };\n}`,
  list: `Apple\nBanana\nOrange\nMango\nPineapple\nStrawberry\nBlueberry\nWatermelon`,
  crlf: `First line of text.\r\nSecond line with "curly quotes" and an em—dash.\r\nThird line with diacritics: café résumé cliché.`,
  loremWords: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum']
};

export const Batch1TextToolsRunner: React.FC<Batch1TextToolsRunnerProps> = ({
  tool,
  onCopy,
  copied: extCopied
}) => {
  const [copied, setCopied] = useState(false);
  const isCopied = extCopied !== undefined ? extCopied : copied;

  const [input, setInput] = useState(SAMPLES.article);
  const [secondInput, setSecondInput] = useState(
    `The fast brown fox leaps over the lazy dog. Web development in 2026 demands client-side computing.`
  );
  const [optionNumber, setOptionNumber] = useState(3);
  const [optionString, setOptionString] = useState('-');
  const [optionMode, setOptionMode] = useState('encode');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('code');

  const triggerCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    if (onCopy) {
      onCopy();
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (content: string, filename = 'output.txt') => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Determine tool category classifier
  const toolKind = useMemo(() => {
    const s = tool.slug.toLowerCase();
    if (s.includes('camelcase')) return 'camelcase';
    if (s.includes('snake-case') || s.includes('snake_case')) return 'snake_case';
    if (s.includes('kebab-case')) return 'kebab_case';
    if (s.includes('title-case') || s.includes('capitalizer')) return 'title_case';
    if (s.includes('case-converter') || s.includes('case')) return 'universal_case';
    if (s.includes('word-counter') || s.includes('word-count')) return 'word_counter';
    if (s.includes('line-sorter') || s.includes('sorter')) return 'line_sorter';
    if (s.includes('reverser') || s.includes('reverse')) return 'text_reverser';
    if (s.includes('duplicate-remover') || s.includes('duplicate')) return 'duplicate_remover';
    if (s.includes('slug-generator') || s.includes('slug')) return 'slug_generator';
    if (s.includes('lorem-ipsum') || s.includes('lipsum') || s.includes('greeking')) return 'lorem_generator';
    if (s.includes('trimmer') || s.includes('whitespace')) return 'whitespace_cleaner';
    if (s.includes('binary')) return 'binary_converter';
    if (s.includes('hex-converter') || s.includes('hex')) return 'hex_converter';
    if (s.includes('octal')) return 'octal_converter';
    if (s.includes('morse')) return 'morse_code';
    if (s.includes('rot13')) return 'rot13';
    if (s.includes('caesar')) return 'caesar_cipher';
    if (s.includes('zalgo')) return 'zalgo';
    if (s.includes('upside-down')) return 'upside_down';
    if (s.includes('diff-checker') || s.includes('diff')) return 'diff_checker';
    if (s.includes('line-numberer') || s.includes('numberer')) return 'line_numberer';
    if (s.includes('column-aligner') || s.includes('aligner')) return 'column_aligner';
    if (s.includes('comma-list')) return 'comma_list';
    if (s.includes('list-to-json') || s.includes('json-array')) return 'list_to_json';
    if (s.includes('random-word')) return 'random_word';
    if (s.includes('nato-phonetic') || s.includes('nato')) return 'nato_phonetic';
    if (s.includes('obfuscator')) return 'obfuscator';
    if (s.includes('html-tag-stripper') || s.includes('tag-stripper')) return 'html_tag_stripper';
    if (s.includes('bbcode-to-html') || s.includes('bbcode')) return 'bbcode_to_html';
    if (s.includes('markdown-to-html')) return 'markdown_to_html';
    if (s.includes('html-to-markdown')) return 'html_to_markdown';
    if (s.includes('repeater')) return 'text_repeater';
    if (s.includes('padding')) return 'text_padding';
    if (s.includes('column-formatter')) return 'column_formatter';
    if (s.includes('scrambler')) return 'text_scrambler';
    if (s.includes('leetspeak') || s.includes('hacker-text')) return 'leetspeak';
    if (s.includes('strikethrough')) return 'strikethrough';
    if (s.includes('bubble-text') || s.includes('bubble')) return 'bubble_text';
    if (s.includes('invisible-char')) return 'invisible_char_detector';
    if (s.includes('punctuation')) return 'punctuation_cleaner';
    if (s.includes('summarizer')) return 'text_summarizer';
    if (s.includes('anagram')) return 'anagram_finder';
    if (s.includes('palindrome')) return 'palindrome_checker';
    if (s.includes('vowel-counter') || s.includes('vowel')) return 'vowel_counter';
    if (s.includes('consonant-counter') || s.includes('consonant')) return 'consonant_counter';
    if (s.includes('sentence-splitter')) return 'sentence_splitter';
    if (s.includes('paragraph-wrapper')) return 'paragraph_wrapper';
    if (s.includes('indent-formatter')) return 'indent_formatter';
    if (s.includes('tab-to-space')) return 'tab_to_space';
    if (s.includes('space-to-tab')) return 'space_to_tab';
    if (s.includes('ascii-art')) return 'ascii_art';
    if (s.includes('emoji-stripper')) return 'emoji_stripper';
    if (s.includes('emoji-extractor')) return 'emoji_extractor';
    if (s.includes('readability') || s.includes('flesch-kincaid')) return 'readability_analyzer';
    if (s.includes('syllable')) return 'syllable_counter';
    if (s.includes('frequency') || s.includes('keyword-density')) return 'frequency_counter';
    if (s.includes('n-gram')) return 'n_gram_extractor';
    if (s.includes('pattern-matcher')) return 'pattern_matcher';
    if (s.includes('prefix-adder')) return 'prefix_adder';
    if (s.includes('suffix-adder')) return 'suffix_adder';
    if (s.includes('line-joiner')) return 'line_joiner';
    if (s.includes('line-splitter')) return 'line_splitter';
    if (s.includes('random-sentence')) return 'random_sentence';
    if (s.includes('diacritics-stripper') || s.includes('accented-char')) return 'diacritics_stripper';
    if (s.includes('smart-quotes')) return 'smart_quotes_fixer';
    if (s.includes('em-dash')) return 'em_dash_fixer';
    return 'unicode_normalizer';
  }, [tool.slug]);

  // Execute processing logic
  const resultData = useMemo(() => {
    const raw = input || '';

    switch (toolKind) {
      case 'universal_case': {
        const upper = raw.toUpperCase();
        const lower = raw.toLowerCase();
        const title = raw.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
        const camel = raw.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        const snake = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_');
        const kebab = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
        return {
          main: `UPPERCASE:\n${upper}\n\nlowercase:\n${lower}\n\nTitle Case:\n${title}\n\ncamelCase:\n${camel}\n\nsnake_case:\n${snake}\n\nkebab-case:\n${kebab}`,
          stats: `${raw.length} characters processed`
        };
      }

      case 'camelcase': {
        const camel = raw.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
        return {
          main: `camelCase:\n${camel}\n\nPascalCase:\n${pascal}`,
          stats: `Converted into valid identifiers`
        };
      }

      case 'snake_case': {
        const snake = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
        const upperSnake = snake.toUpperCase();
        return {
          main: `snake_case:\n${snake}\n\nUPPER_SNAKE_CASE:\n${upperSnake}`,
          stats: `Formatted with underscore separators`
        };
      }

      case 'kebab_case': {
        const kebab = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return {
          main: kebab,
          stats: `URL/CSS slug formatted (${kebab.length} chars)`
        };
      }

      case 'title_case': {
        const minorWords = new Set(['and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet', 'a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via']);
        const title = raw.split('\n').map(line => {
          return line.split(' ').map((word, index) => {
            const lower = word.toLowerCase();
            if (index > 0 && minorWords.has(lower)) return lower;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          }).join(' ');
        }).join('\n');
        return {
          main: title,
          stats: `Title Case formatted with AP/Chicago grammar rules`
        };
      }

      case 'word_counter': {
        const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
        const chars = raw.length;
        const charsNoSpaces = raw.replace(/\s/g, '').length;
        const lines = raw ? raw.split('\n').length : 0;
        const sentences = raw.trim() ? (raw.match(/[^.!?]+[.!?]+/g) || [raw]).length : 0;
        const paragraphs = raw.trim() ? raw.split(/\n\s*\n/).filter(Boolean).length : 0;
        const readingTime = Math.ceil(words / 200);
        const speakingTime = Math.ceil(words / 130);
        return {
          main: `--- TEXT STATISTICS REPORT ---\nWords: ${words.toLocaleString()}\nCharacters (with spaces): ${chars.toLocaleString()}\nCharacters (without spaces): ${charsNoSpaces.toLocaleString()}\nSentences: ${sentences}\nParagraphs: ${paragraphs}\nLines: ${lines}\nEstimated Reading Time: ~${readingTime} min\nEstimated Speaking Time: ~${speakingTime} min\nAverage Word Length: ${words ? (charsNoSpaces / words).toFixed(1) : 0} characters`,
          stats: `${words} Words | ${chars} Chars`
        };
      }

      case 'line_sorter': {
        const lines = raw.split('\n');
        let sorted = [...lines];
        if (optionMode === 'desc') {
          sorted.sort((a, b) => b.localeCompare(a));
        } else if (optionMode === 'length') {
          sorted.sort((a, b) => a.length - b.length);
        } else if (optionMode === 'reverse') {
          sorted.reverse();
        } else {
          sorted.sort((a, b) => a.localeCompare(b));
        }
        return {
          main: sorted.join('\n'),
          stats: `${lines.length} lines sorted (${optionMode})`
        };
      }

      case 'text_reverser': {
        const charReverse = raw.split('').reverse().join('');
        const lineReverse = raw.split('\n').reverse().join('\n');
        const wordReverse = raw.split('\n').map(l => l.split(/\s+/).reverse().join(' ')).join('\n');
        return {
          main: `Character-Reversed:\n${charReverse}\n\nLine-by-Line Reversed:\n${lineReverse}\n\nWord-by-Word Reversed:\n${wordReverse}`,
          stats: `${raw.length} characters inverted`
        };
      }

      case 'duplicate_remover': {
        const lines = raw.split('\n');
        const unique = Array.from(new Set(lines));
        const removed = lines.length - unique.length;
        return {
          main: unique.join('\n'),
          stats: `${removed} duplicates removed (${unique.length} unique lines remaining)`
        };
      }

      case 'slug_generator': {
        const sep = optionString || '-';
        const slug = raw
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/[\s-]+/g, sep)
          .replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), '');
        return {
          main: slug,
          stats: `Clean SEO URL slug generated`
        };
      }

      case 'lorem_generator': {
        const count = Math.max(1, Math.min(50, optionNumber || 3));
        const words = SAMPLES.loremWords;
        const paras: string[] = [];
        for (let p = 0; p < count; p++) {
          let para = '';
          const sentencesInPara = 4 + (p % 3);
          for (let s = 0; s < sentencesInPara; s++) {
            const sentenceLen = 8 + Math.floor(Math.random() * 8);
            const sentenceWords: string[] = [];
            for (let w = 0; w < sentenceLen; w++) {
              sentenceWords.push(words[Math.floor(Math.random() * words.length)]);
            }
            let sentence = sentenceWords.join(' ');
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '. ';
            para += sentence;
          }
          paras.push(para.trim());
        }
        return {
          main: paras.join('\n\n'),
          stats: `${count} placeholder paragraphs generated`
        };
      }

      case 'whitespace_cleaner': {
        const cleaned = raw
          .split('\n')
          .map(l => l.trim().replace(/[ \t]+/g, ' '))
          .join('\n')
          .replace(/\n{3,}/g, '\n\n');
        const diff = raw.length - cleaned.length;
        return {
          main: cleaned,
          stats: `${diff} unnecessary whitespace characters stripped`
        };
      }

      case 'binary_converter': {
        if (optionMode === 'decode') {
          try {
            const clean = raw.replace(/[^01\s]/g, '').trim();
            const bytes = clean.split(/\s+/);
            const decoded = bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('');
            return {
              main: decoded || 'Invalid binary sequence',
              stats: `${bytes.length} bytes decoded`
            };
          } catch {
            return { main: 'Error decoding binary', stats: 'Parsing failed' };
          }
        } else {
          const binary = Array.from(raw)
            .map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
          return {
            main: binary,
            stats: `${raw.length} characters converted to 8-bit ASCII binary`
          };
        }
      }

      case 'hex_converter': {
        if (optionMode === 'decode') {
          try {
            const clean = raw.replace(/[^0-9a-fA-F]/g, '');
            let str = '';
            for (let i = 0; i < clean.length; i += 2) {
              str += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
            }
            return { main: str, stats: `${clean.length / 2} hex bytes decoded` };
          } catch {
            return { main: 'Invalid hex input', stats: 'Decoding error' };
          }
        } else {
          const hex = Array.from(raw)
            .map(ch => ch.charCodeAt(0).toString(16).padStart(2, '0'))
            .join(' ');
          return { main: hex, stats: `${raw.length} bytes converted to Hexadecimal` };
        }
      }

      case 'octal_converter': {
        if (optionMode === 'decode') {
          try {
            const nums = raw.trim().split(/\s+/);
            const str = nums.map(n => String.fromCharCode(parseInt(n, 8))).join('');
            return { main: str, stats: `${nums.length} octal values decoded` };
          } catch {
            return { main: 'Invalid octal sequence', stats: 'Decoding error' };
          }
        } else {
          const octal = Array.from(raw)
            .map(ch => ch.charCodeAt(0).toString(8).padStart(3, '0'))
            .join(' ');
          return { main: octal, stats: `${raw.length} characters converted to Base-8 Octal` };
        }
      }

      case 'morse_code': {
        if (optionMode === 'decode') {
          const tokens = raw.trim().split(/\s+/);
          const decoded = tokens.map(t => REVERSE_MORSE[t] || '?').join('');
          return { main: decoded, stats: `${tokens.length} Morse symbols decoded` };
        } else {
          const upper = raw.toUpperCase();
          const morse = Array.from(upper)
            .map(c => MORSE_MAP[c] || '')
            .filter(Boolean)
            .join(' ');
          return { main: morse, stats: `${morse.split(' ').length} Morse tokens generated` };
        }
      }

      case 'rot13': {
        const rot13 = raw.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97;
          return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
        });
        return { main: rot13, stats: `ROT13 symmetric cipher processed` };
      }

      case 'caesar_cipher': {
        const shift = ((optionNumber % 26) + 26) % 26;
        const cipher = raw.replace(/[a-zA-Z]/g, (c) => {
          const base = c <= 'Z' ? 65 : 97;
          const s = optionMode === 'decode' ? 26 - shift : shift;
          return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
        });
        return {
          main: cipher,
          stats: `Caesar cipher (Shift ${shift}, Mode: ${optionMode})`
        };
      }

      case 'zalgo': {
        const intensity = Math.max(1, Math.min(10, optionNumber || 3));
        let out = '';
        for (const char of raw) {
          out += char;
          if (/[a-zA-Z0-9]/.test(char)) {
            for (let i = 0; i < intensity; i++) {
              out += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
              out += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
              out += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
            }
          }
        }
        return { main: out, stats: `Zalgo text generated (Intensity: ${intensity})` };
      }

      case 'upside_down': {
        const flipped = Array.from(raw)
          .map(c => UPSIDE_DOWN_MAP[c] || c)
          .reverse()
          .join('');
        return { main: flipped, stats: `Inverted upside-down text generated` };
      }

      case 'bubble_text': {
        const bubbled = Array.from(raw).map(c => BUBBLE_MAP[c] || c).join('');
        return { main: bubbled, stats: `Circled unicode bubble text generated` };
      }

      case 'strikethrough': {
        const striked = Array.from(raw).map(c => c + '\u0336').join('');
        const underlined = Array.from(raw).map(c => c + '\u0332').join('');
        return {
          main: `Strikethrough:\n${striked}\n\nUnderline:\n${underlined}`,
          stats: `Unicode combining decorators applied`
        };
      }

      case 'leetspeak': {
        const leetMap: Record<string, string> = {
          'a': '4', 'A': '4', 'e': '3', 'E': '3', 'i': '1', 'I': '1',
          'o': '0', 'O': '0', 's': '5', 'S': '5', 't': '7', 'T': '7',
          'b': '8', 'B': '8', 'g': '9', 'G': '9'
        };
        const leet = Array.from(raw).map(c => leetMap[c] || c).join('');
        return { main: leet, stats: `1337 / Leetspeak translation complete` };
      }

      case 'nato_phonetic': {
        const phonetic = Array.from(raw.toUpperCase())
          .map(c => NATO_MAP[c] || (c === ' ' ? '[SPACE]' : c))
          .join(' ');
        return { main: phonetic, stats: `NATO phonetic translation generated` };
      }

      case 'diff_checker': {
        const lines1 = raw.split('\n');
        const lines2 = secondInput.split('\n');
        const max = Math.max(lines1.length, lines2.length);
        const report: string[] = [];
        let diffCount = 0;
        for (let i = 0; i < max; i++) {
          const l1 = lines1[i] !== undefined ? lines1[i] : '<EOF>';
          const l2 = lines2[i] !== undefined ? lines2[i] : '<EOF>';
          if (l1 === l2) {
            report.push(`  [Line ${i + 1}] ${l1}`);
          } else {
            diffCount++;
            report.push(`- [Line ${i + 1} Original] ${l1}`);
            report.push(`+ [Line ${i + 1} Modified] ${l2}`);
          }
        }
        return {
          main: `--- COMPARISON RESULTS ---\nDifferences detected: ${diffCount} line(s)\n\n${report.join('\n')}`,
          stats: `${diffCount} line differences identified`
        };
      }

      case 'line_numberer': {
        const lines = raw.split('\n');
        const pad = String(lines.length).length;
        const numbered = lines
          .map((line, idx) => `${String(idx + 1).padStart(pad, '0')}: ${line}`)
          .join('\n');
        return { main: numbered, stats: `${lines.length} lines numbered sequentially` };
      }

      case 'column_aligner': {
        const lines = raw.split('\n');
        const sep = optionString || ',';
        const parsed = lines.map(l => l.split(sep).map(col => col.trim()));
        const colWidths: number[] = [];
        parsed.forEach(row => {
          row.forEach((col, cIdx) => {
            colWidths[cIdx] = Math.max(colWidths[cIdx] || 0, col.length);
          });
        });
        const aligned = parsed
          .map(row => row.map((col, cIdx) => col.padEnd(colWidths[cIdx], ' ')).join(' | '))
          .join('\n');
        return { main: aligned, stats: `Aligned table across ${colWidths.length} columns` };
      }

      case 'comma_list': {
        if (optionMode === 'to_lines') {
          const lines = raw.split(',').map(s => s.trim()).filter(Boolean).join('\n');
          return { main: lines, stats: `Comma list converted to newline items` };
        } else {
          const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
          const quotes = optionString === 'quotes';
          const formatted = lines.map(l => (quotes ? `"${l}"` : l)).join(', ');
          return { main: formatted, stats: `${lines.length} items joined with commas` };
        }
      }

      case 'list_to_json': {
        const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
        const json = JSON.stringify(lines, null, 2);
        return { main: json, stats: `JSON array with ${lines.length} strings produced` };
      }

      case 'html_tag_stripper': {
        const stripped = raw.replace(/<\/?[^>]+(>|$)/g, '');
        return { main: stripped, stats: `HTML tags stripped (${raw.length - stripped.length} chars removed)` };
      }

      case 'bbcode_to_html': {
        let html = raw
          .replace(/\[b\](.*?)\[\/b\]/gi, '<strong>$1</strong>')
          .replace(/\[i\](.*?)\[\/i\]/gi, '<em>$1</em>')
          .replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>')
          .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1" target="_blank" rel="noopener">$2</a>')
          .replace(/\[quote\](.*?)\[\/quote\]/gi, '<blockquote>$1</blockquote>')
          .replace(/\[code\](.*?)\[\/code\]/gi, '<pre><code>$1</code></pre>');
        return { main: html, stats: `BBCode converted to semantic HTML5` };
      }

      case 'markdown_to_html': {
        let html = raw
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/gim, '<em>$1</em>')
          .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
          .replace(/^\s*\n\*/gm, '<ul>\n*')
          .replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2')
          .replace(/^\* (.*$)/gim, '<li>$1</li>')
          .replace(/\n\n/gim, '</p><p>');
        html = '<p>' + html + '</p>';
        return { main: html, stats: `Markdown compiled to HTML` };
      }

      case 'html_to_markdown': {
        let md = raw
          .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n')
          .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n')
          .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n')
          .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
          .replace(/<b>(.*?)<\/b>/gi, '**$1**')
          .replace(/<em>(.*?)<\/em>/gi, '*$1*')
          .replace(/<i>(.*?)<\/i>/gi, '*$1*')
          .replace(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, '[$2]($1)')
          .replace(/<li>(.*?)<\/li>/gi, '* $1\n')
          .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
          .replace(/<\/?[^>]+(>|$)/g, '');
        return { main: md.trim(), stats: `HTML decompiled to clean Markdown` };
      }

      case 'text_repeater': {
        const count = Math.max(1, Math.min(100, optionNumber || 5));
        const sep = optionString === 'newline' ? '\n' : (optionString || ' ');
        const repeated = Array(count).fill(raw).join(sep);
        return { main: repeated, stats: `Repeated ${count} times` };
      }

      case 'text_padding': {
        const len = Math.max(raw.length, optionNumber || 30);
        const padChar = (optionString || ' ')[0] || ' ';
        const left = raw.padStart(len, padChar);
        const right = raw.padEnd(len, padChar);
        return {
          main: `Left-Padded (${len}):\n${left}\n\nRight-Padded (${len}):\n${right}`,
          stats: `Padded with '${padChar}' to length ${len}`
        };
      }

      case 'column_formatter': {
        const width = Math.max(10, Math.min(120, optionNumber || 40));
        const words = raw.split(/\s+/);
        let cur = '';
        const lines: string[] = [];
        words.forEach(w => {
          if ((cur + ' ' + w).trim().length > width) {
            lines.push(cur.trim());
            cur = w;
          } else {
            cur = (cur + ' ' + w).trim();
          }
        });
        if (cur) lines.push(cur.trim());
        return { main: lines.join('\n'), stats: `Wrapped cleanly at ${width} characters per line` };
      }

      case 'text_scrambler': {
        const scrambled = raw.split('\n').map(line => {
          return line.split(/\s+/).map(word => {
            if (word.length <= 3) return word;
            const mid = word.slice(1, -1).split('');
            for (let i = mid.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [mid[i], mid[j]] = [mid[j], mid[i]];
            }
            return word[0] + mid.join('') + word[word.length - 1];
          }).join(' ');
        }).join('\n');
        return { main: scrambled, stats: `Cognitive text scramble (first & last letters preserved)` };
      }

      case 'invisible_char_detector': {
        const invisibleChars = [
          { name: 'Zero-Width Space', regex: /\u200B/g },
          { name: 'Zero-Width Non-Joiner', regex: /\u200C/g },
          { name: 'Zero-Width Joiner', regex: /\u200D/g },
          { name: 'Left-To-Right Mark', regex: /\u200E/g },
          { name: 'Right-To-Left Mark', regex: /\u200F/g },
          { name: 'Non-Breaking Space', regex: /\u00A0/g },
          { name: 'Soft Hyphen', regex: /\u00AD/g }
        ];
        const findings: string[] = [];
        let clean = raw;
        invisibleChars.forEach(ch => {
          const count = (raw.match(ch.regex) || []).length;
          if (count > 0) {
            findings.push(`${ch.name}: ${count} occurrence(s) detected`);
            clean = clean.replace(ch.regex, '');
          }
        });
        return {
          main: findings.length > 0
            ? `--- INVISIBLE CHARACTERS FOUND ---\n${findings.join('\n')}\n\n--- CLEANED TEXT ---\n${clean}`
            : `Clean! No hidden or zero-width unicode characters were detected in your text.`,
          stats: findings.length > 0 ? `${findings.length} invisible character types found` : `100% clean`
        };
      }

      case 'punctuation_cleaner': {
        const cleaned = raw.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'\[\]]/g, '');
        return { main: cleaned, stats: `${raw.length - cleaned.length} punctuation characters stripped` };
      }

      case 'text_summarizer': {
        const sentences = raw.match(/[^.!?]+[.!?]+/g) || [raw];
        const wordFreq: Record<string, number> = {};
        const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'i', 'is', 'that', 'it', 'on', 'you', 'this', 'for', 'but', 'with', 'are', 'have', 'be', 'at', 'or', 'as', 'was', 'so', 'if', 'out', 'not']);
        raw.toLowerCase().split(/\W+/).forEach(w => {
          if (w && !stopWords.has(w) && w.length > 2) {
            wordFreq[w] = (wordFreq[w] || 0) + 1;
          }
        });
        const scored = sentences.map(s => {
          let score = 0;
          s.toLowerCase().split(/\W+/).forEach(w => {
            if (wordFreq[w]) score += wordFreq[w];
          });
          return { sentence: s.trim(), score };
        });
        scored.sort((a, b) => b.score - a.score);
        const topCount = Math.max(1, Math.min(sentences.length, optionNumber || 2));
        const summary = scored.slice(0, topCount).map(s => s.sentence).join(' ');
        return {
          main: `--- EXTRACTIVE TEXT SUMMARY (${topCount} key sentences) ---\n${summary}`,
          stats: `Reduced from ${sentences.length} to ${topCount} sentences`
        };
      }

      case 'palindrome_checker': {
        const clean = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = clean.split('').reverse().join('');
        const isPal = clean.length > 0 && clean === reversed;
        return {
          main: isPal
            ? `VALID PALINDROME!\n\nOriginal cleaned: "${clean}"\nReversed string:  "${reversed}"\nLength: ${clean.length} characters\nMatches forward and backward perfectly.`
            : `NOT a palindrome.\n\nOriginal cleaned: "${clean}"\nReversed string:  "${reversed}"`,
          stats: isPal ? 'Valid Palindrome' : 'Not a Palindrome'
        };
      }

      case 'anagram_finder': {
        const words = raw.trim().toLowerCase().split(/\s+/);
        const map: Record<string, string[]> = {};
        words.forEach(w => {
          const sorted = w.split('').sort().join('');
          map[sorted] = map[sorted] || [];
          map[sorted].push(w);
        });
        const groups = Object.values(map).filter(g => g.length > 1);
        return {
          main: groups.length > 0
            ? groups.map(g => `Anagram Group: [${Array.from(new Set(g)).join(', ')}]`).join('\n')
            : `No multi-word anagrams found in this text. Try pasting words like "listen silent enlisted" or "cinema iceman".`,
          stats: `${groups.length} anagram sets found`
        };
      }

      case 'vowel_counter': {
        const vowels = (raw.match(/[aeiou]/gi) || []).length;
        const total = raw.replace(/\s/g, '').length;
        const pct = total ? ((vowels / total) * 100).toFixed(1) : '0';
        return {
          main: `Total Vowels (A, E, I, O, U): ${vowels.toLocaleString()}\nTotal Letters (no spaces): ${total.toLocaleString()}\nVowel Percentage: ${pct}%`,
          stats: `${vowels} vowels counted (${pct}%)`
        };
      }

      case 'consonant_counter': {
        const consonants = (raw.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
        const total = raw.replace(/\s/g, '').length;
        const pct = total ? ((consonants / total) * 100).toFixed(1) : '0';
        return {
          main: `Total Consonants: ${consonants.toLocaleString()}\nTotal Letters (no spaces): ${total.toLocaleString()}\nConsonant Percentage: ${pct}%`,
          stats: `${consonants} consonants counted (${pct}%)`
        };
      }

      case 'sentence_splitter': {
        const sentences = raw.match(/[^.!?]+[.!?]+|\S+$/g) || [raw];
        const split = sentences.map((s, idx) => `[${idx + 1}] ${s.trim()}`).join('\n\n');
        return { main: split, stats: `${sentences.length} sentences segmented` };
      }

      case 'paragraph_wrapper': {
        const paras = raw.split(/\n+/).filter(Boolean);
        const tag = optionString || 'p';
        const wrapped = paras.map(p => `<${tag}>${p.trim()}</${tag}>`).join('\n');
        return { main: wrapped, stats: `${paras.length} paragraphs wrapped in <${tag}>` };
      }

      case 'indent_formatter': {
        const lines = raw.split('\n');
        const spaces = ' '.repeat(optionNumber || 2);
        const indented = lines.map(l => (optionMode === 'remove' ? l.replace(/^\s+/, '') : spaces + l)).join('\n');
        return { main: indented, stats: `${lines.length} lines ${optionMode === 'remove' ? 'unindented' : 'indented'}` };
      }

      case 'tab_to_space': {
        const spaces = ' '.repeat(optionNumber || 4);
        const converted = raw.replace(/\t/g, spaces);
        return { main: converted, stats: `Tabs converted to ${optionNumber || 4} spaces` };
      }

      case 'space_to_tab': {
        const count = optionNumber || 4;
        const regex = new RegExp(' '.repeat(count), 'g');
        const converted = raw.replace(regex, '\t');
        return { main: converted, stats: `Sets of ${count} spaces converted to tabs` };
      }

      case 'ascii_art': {
        const banner = raw
          .toUpperCase()
          .split('')
          .map(c => `[ ${c} ]`)
          .join(' ');
        return { main: banner, stats: `ASCII character block generated` };
      }

      case 'emoji_stripper': {
        const stripped = raw.replace(/[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}]/gu, '');
        return { main: stripped, stats: `All emojis removed from text` };
      }

      case 'emoji_extractor': {
        const emojis = raw.match(/[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}]/gu) || [];
        const unique = Array.from(new Set(emojis));
        return {
          main: emojis.length > 0
            ? `Found ${emojis.length} total emoji(s):\n${emojis.join(' ')}\n\nUnique Emojis (${unique.length}):\n${unique.join(' ')}`
            : `No emojis found in input text.`,
          stats: `${emojis.length} emojis extracted`
        };
      }

      case 'readability_analyzer': {
        const words = raw.trim() ? raw.trim().split(/\s+/).length : 0;
        const sentences = raw.trim() ? (raw.match(/[^.!?]+[.!?]+/g) || [raw]).length : 0;
        const syllables = (raw.match(/[aeiouy]{1,2}/gi) || []).length;
        if (words === 0 || sentences === 0) {
          return { main: 'Enter text to calculate readability metrics.', stats: 'No input' };
        }
        // Flesch Reading Ease
        const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        // Flesch-Kincaid Grade Level
        const grade = (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59;

        let interpretation = 'Standard reading material (8th-9th grade)';
        if (score >= 90) interpretation = 'Very Easy (5th grade level)';
        else if (score >= 80) interpretation = 'Easy (6th grade level)';
        else if (score >= 70) interpretation = 'Fairly Easy (7th grade level)';
        else if (score >= 60) interpretation = 'Standard (8th-9th grade level)';
        else if (score >= 50) interpretation = 'Fairly Difficult (High school)';
        else if (score >= 30) interpretation = 'Difficult (College level)';
        else interpretation = 'Very Confusing (Graduate level)';

        return {
          main: `--- READABILITY REPORT ---\nFlesch Reading Ease Score: ${score.toFixed(1)} / 100\nFlesch-Kincaid Grade Level: ${grade.toFixed(1)}\nReading Level: ${interpretation}\nWords: ${words} | Sentences: ${sentences} | Syllables: ${syllables}`,
          stats: `Score: ${score.toFixed(1)} (${interpretation})`
        };
      }

      case 'syllable_counter': {
        const words = raw.trim() ? raw.trim().split(/\s+/) : [];
        let totalSyllables = 0;
        const breakdown = words.slice(0, 50).map(w => {
          const count = Math.max(1, (w.match(/[aeiouy]{1,2}/gi) || []).length);
          totalSyllables += count;
          return `${w}: ${count}`;
        });
        return {
          main: `Total Estimated Syllables: ${totalSyllables}\nAverage Syllables per Word: ${words.length ? (totalSyllables / words.length).toFixed(2) : 0}\n\nSample Word Breakdown:\n${breakdown.join(' | ')}`,
          stats: `${totalSyllables} total syllables`
        };
      }

      case 'frequency_counter': {
        const words = raw.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
        const freq: Record<string, number> = {};
        words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30);
        const report = sorted.map(([w, cnt], idx) => {
          const pct = ((cnt / words.length) * 100).toFixed(1);
          return `${idx + 1}. "${w}": ${cnt} time(s) (${pct}%)`;
        });
        return {
          main: `Total Words Analyzed: ${words.length}\nUnique Vocabulary: ${Object.keys(freq).length}\n\nTop Word Frequencies:\n${report.join('\n')}`,
          stats: `${Object.keys(freq).length} unique words`
        };
      }

      case 'n_gram_extractor': {
        const words = raw.toLowerCase().match(/\b[a-z0-9'-]+\b/g) || [];
        const n = Math.max(2, Math.min(5, optionNumber || 2));
        const ngrams: Record<string, number> = {};
        for (let i = 0; i <= words.length - n; i++) {
          const gram = words.slice(i, i + n).join(' ');
          ngrams[gram] = (ngrams[gram] || 0) + 1;
        }
        const sorted = Object.entries(ngrams).sort((a, b) => b[1] - a[1]).slice(0, 20);
        const report = sorted.map(([gram, cnt]) => `"${gram}" → ${cnt} occurrence(s)`);
        return {
          main: `Top ${n}-Grams Extracted:\n${report.join('\n') || 'Not enough words for ' + n + '-grams'}`,
          stats: `${sorted.length} ${n}-gram phrases found`
        };
      }

      case 'pattern_matcher': {
        const pattern = optionString || 'the';
        try {
          const regex = new RegExp(pattern, 'gi');
          const matches = raw.match(regex) || [];
          return {
            main: `Search Pattern: "${pattern}"\nMatches Found: ${matches.length}\n\nMatch List: [ ${matches.join(', ')} ]`,
            stats: `${matches.length} matches found`
          };
        } catch {
          return { main: 'Invalid Regular Expression syntax', stats: 'Regex error' };
        }
      }

      case 'prefix_adder': {
        const prefix = optionString !== undefined ? optionString : '>> ';
        const prefixed = raw.split('\n').map(l => prefix + l).join('\n');
        return { main: prefixed, stats: `Prefix "${prefix}" added to all lines` };
      }

      case 'suffix_adder': {
        const suffix = optionString !== undefined ? optionString : ';';
        const suffixed = raw.split('\n').map(l => l + suffix).join('\n');
        return { main: suffixed, stats: `Suffix "${suffix}" added to all lines` };
      }

      case 'line_joiner': {
        const delimiter = optionString === 'space' ? ' ' : (optionString || ', ');
        const joined = raw.split('\n').map(l => l.trim()).filter(Boolean).join(delimiter);
        return { main: joined, stats: `Lines joined with delimiter "${delimiter}"` };
      }

      case 'line_splitter': {
        const delimiter = optionString || ',';
        const split = raw.split(delimiter).map(l => l.trim()).join('\n');
        return { main: split, stats: `Split by "${delimiter}" into new lines` };
      }

      case 'random_sentence': {
        const count = optionNumber || 3;
        const subjects = ['The frontend engineer', 'A high-performance algorithm', 'The modern web application', 'Our client-side architecture', 'Every dedicated developer', 'The digital creative'];
        const verbs = ['optimizes', 'transforms', 'accelerates', 'evaluates', 'inspects', 'secures'];
        const objects = ['in-memory data processing', 'local browser storage', 'cryptographic operations', 'responsive responsive interfaces', 'typography hierarchy', 'seamless user workflows'];
        const sentences: string[] = [];
        for (let i = 0; i < count; i++) {
          const s = subjects[Math.floor(Math.random() * subjects.length)];
          const v = verbs[Math.floor(Math.random() * verbs.length)];
          const o = objects[Math.floor(Math.random() * objects.length)];
          sentences.push(`${s} ${v} ${o} with zero server dependencies.`);
        }
        return { main: sentences.join('\n\n'), stats: `${count} sentences generated` };
      }

      case 'diacritics_stripper': {
        const stripped = raw.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return { main: stripped, stats: `Accents and diacritics normalized to plain ASCII` };
      }

      case 'smart_quotes_fixer': {
        const fixed = raw
          .replace(/[\u2018\u2019]/g, "'")
          .replace(/[\u201C\u201D]/g, '"');
        return { main: fixed, stats: `Curly quotes converted to straight ASCII quotes` };
      }

      case 'em_dash_fixer': {
        const fixed = raw
          .replace(/\u2014/g, ' -- ')
          .replace(/\u2013/g, ' - ');
        return { main: fixed, stats: `Em-dashes (—) and en-dashes (–) standardized` };
      }

      default: {
        // Unicode normalizer / cleaner
        const normalized = raw.normalize('NFC').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        return { main: normalized, stats: `Normalized to standard NFC unicode formatting` };
      }
    }
  }, [input, secondInput, toolKind, optionNumber, optionString, optionMode]);

  return (
    <div className="space-y-6">
      {/* Tool Header Status Badge */}
      <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 p-4 rounded-2xl border border-indigo-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Interactive Client-Side Workstation: {tool.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-emerald-700 rounded-full border border-emerald-200 flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% In-Browser Privacy
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-100/70 text-indigo-800 rounded-full">
            {resultData.stats}
          </span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Sample loader buttons */}
          <span className="font-semibold text-slate-600">Sample:</span>
          <button
            onClick={() => setInput(SAMPLES.article)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors"
          >
            Article
          </button>
          <button
            onClick={() => setInput(SAMPLES.list)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors"
          >
            List
          </button>
          <button
            onClick={() => setInput(SAMPLES.code)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors"
          >
            Code
          </button>
          <button
            onClick={() => setInput(SAMPLES.crlf)}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md font-medium text-slate-700 transition-colors"
          >
            Quotes & Dashes
          </button>
        </div>

        {/* Specific tool options */}
        <div className="flex items-center gap-2">
          {toolKind === 'caesar_cipher' && (
            <div className="flex items-center gap-1">
              <span className="text-slate-600 font-semibold">Shift:</span>
              <input
                type="number"
                min="1"
                max="25"
                value={optionNumber}
                onChange={(e) => setOptionNumber(parseInt(e.target.value) || 3)}
                className="w-14 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-center font-bold"
              />
              <button
                onClick={() => setOptionMode(m => m === 'encode' ? 'decode' : 'encode')}
                className="px-2 py-1 bg-indigo-50 text-indigo-700 font-bold rounded border border-indigo-200"
              >
                {optionMode.toUpperCase()}
              </button>
            </div>
          )}

          {(toolKind === 'binary_converter' || toolKind === 'hex_converter' || toolKind === 'octal_converter' || toolKind === 'morse_code') && (
            <button
              onClick={() => setOptionMode(m => m === 'encode' ? 'decode' : 'encode')}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
            >
              <ArrowUpDown className="w-3 h-3" />
              <span>Mode: {optionMode === 'encode' ? 'Text → Target' : 'Target → Text'}</span>
            </button>
          )}

          {(toolKind === 'lorem_generator' || toolKind === 'random_sentence' || toolKind === 'text_repeater' || toolKind === 'n_gram_extractor') && (
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold">Count:</span>
              <input
                type="number"
                min="1"
                max="50"
                value={optionNumber}
                onChange={(e) => setOptionNumber(parseInt(e.target.value) || 3)}
                className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-center font-bold"
              />
            </div>
          )}

          {toolKind === 'line_sorter' && (
            <select
              value={optionMode}
              onChange={(e) => setOptionMode(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded font-semibold text-slate-700"
            >
              <option value="asc">A to Z (Ascending)</option>
              <option value="desc">Z to A (Descending)</option>
              <option value="length">By Line Length</option>
              <option value="reverse">Reverse Order</option>
            </select>
          )}

          {toolKind === 'slug_generator' && (
            <div className="flex items-center gap-1">
              <span className="text-slate-600 font-semibold">Separator:</span>
              <input
                type="text"
                value={optionString}
                onChange={(e) => setOptionString(e.target.value)}
                className="w-10 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-center font-bold"
              />
            </div>
          )}

          {toolKind === 'pattern_matcher' && (
            <div className="flex items-center gap-1">
              <span className="text-slate-600 font-semibold">Regex / Substring:</span>
              <input
                type="text"
                value={optionString}
                onChange={(e) => setOptionString(e.target.value)}
                className="w-32 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs font-bold"
              />
            </div>
          )}

          {toolKind === 'prefix_adder' && (
            <div className="flex items-center gap-1">
              <span className="text-slate-600 font-semibold">Prefix:</span>
              <input
                type="text"
                value={optionString}
                onChange={(e) => setOptionString(e.target.value)}
                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs font-bold"
              />
            </div>
          )}

          {toolKind === 'suffix_adder' && (
            <div className="flex items-center gap-1">
              <span className="text-slate-600 font-semibold">Suffix:</span>
              <input
                type="text"
                value={optionString}
                onChange={(e) => setOptionString(e.target.value)}
                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs font-bold"
              />
            </div>
          )}

          <button
            onClick={() => setInput('')}
            className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-md font-medium transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Two-pane Input Workspace (For Diff Checker or Regular) */}
      {toolKind === 'diff_checker' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Original Text</label>
              <span className="text-[10px] text-slate-400">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
              placeholder="Paste original text here..."
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Modified Text</label>
              <span className="text-[10px] text-slate-400">{secondInput.length} chars</span>
            </div>
            <textarea
              value={secondInput}
              onChange={(e) => setSecondInput(e.target.value)}
              rows={8}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
              placeholder="Paste modified text here..."
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Source Text Input</label>
            <span className="text-[10px] text-slate-400">{input.length} chars | {input.trim() ? input.trim().split(/\s+/).length : 0} words</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500/20 shadow-inner"
            placeholder="Type or paste your content here..."
          />
        </div>
      )}

      {/* Processed Output Result Panel */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 text-slate-100 space-y-3 relative shadow-inner">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Calculated Output Result
            </span>
            {(toolKind === 'bbcode_to_html' || toolKind === 'markdown_to_html') && (
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg ml-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  HTML Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Visual Preview
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerCopy(resultData.main)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? 'Copied!' : 'Copy Result'}
            </button>
            <button
              onClick={() => handleDownload(resultData.main, `${tool.slug}-result.txt`)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>

        {activeTab === 'preview' && (toolKind === 'bbcode_to_html' || toolKind === 'markdown_to_html') ? (
          <div
            className="p-4 bg-white text-slate-900 rounded-xl max-h-[360px] overflow-y-auto prose prose-sm"
            dangerouslySetInnerHTML={{ __html: resultData.main }}
          />
        ) : (
          <pre className="text-xs sm:text-sm font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto p-1 selection:bg-emerald-900 selection:text-white">
            {resultData.main}
          </pre>
        )}
      </div>
    </div>
  );
};
