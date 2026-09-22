import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "password-generator",
    "slug": "password-generator",
    "name": "Strong Password & Key Generator",
    "shortDesc": "Generate secure, high-entropy passwords with custom length and character sets.",
    "description": "Create cryptographically strong random passwords with numbers, uppercase, lowercase, and special symbols.",
    "category": "Security Tools",
    "iconName": "Lock",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 228000,
    "tags": [
      "security",
      "password",
      "generator",
      "crypto",
      "strong",
      "privacy"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose length",
        "desc": "Adjust password length slider (8 to 64 characters)."
      },
      {
        "step": 2,
        "title": "Select character types",
        "desc": "Toggle uppercase, lowercase, numbers, and symbols."
      },
      {
        "step": 3,
        "title": "Copy password",
        "desc": "Click Copy to save your secure password."
      }
    ],
    "faqs": [
      {
        "question": "Are these passwords generated locally?",
        "answer": "Yes! Generated using browser Window.crypto API without network transmissions."
      }
    ]
  },
  {
    "id": "hash-generator",
    "slug": "hash-generator",
    "name": "Hash Generator (SHA-256 / SHA-512 / MD5)",
    "shortDesc": "Compute cryptographic message digests (SHA-256, SHA-1, SHA-512) for text.",
    "description": "Calculate cryptographic hashes using Web Crypto API to verify checksums or sanitize passwords client-side.",
    "category": "Security Tools",
    "iconName": "ShieldAlert",
    "isPopular": false,
    "isLatest": false,
    "usageCount": 71000,
    "tags": [
      "hash",
      "sha256",
      "sha512",
      "crypto",
      "security",
      "digest"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input string",
        "desc": "Type or paste the input message."
      },
      {
        "step": 2,
        "title": "View computed hashes",
        "desc": "Read instant SHA-256, SHA-384, and SHA-512 values."
      },
      {
        "step": 3,
        "title": "Copy hash",
        "desc": "Click to copy the desired hash hex digest."
      }
    ],
    "faqs": [
      {
        "question": "Why SHA-256 instead of MD5?",
        "answer": "SHA-256 is collision-resistant and modern standard for cryptographic verification."
      }
    ]
  },
  {
    "id": "password-generator-checker",
    "slug": "password-generator-checker",
    "name": "Secure Password Generator & Entropy Tester",
    "shortDesc": "Generate strong random passwords and calculate cryptographic entropy strength.",
    "description": "Generate customizable cryptographically secure passwords with symbols, numbers, and custom lengths, paired with entropy bits testing.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 178200,
    "tags": [
      "password generator",
      "entropy",
      "security",
      "strong password",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Configure Length & Character Sets",
        "desc": "Set password length (8-64 chars) and toggle uppercase, numbers, symbols."
      },
      {
        "step": 2,
        "title": "Generate Secure Password",
        "desc": "Uses Web Crypto window.crypto.getRandomValues()."
      },
      {
        "step": 3,
        "title": "Check Entropy Strength",
        "desc": "Displays bit strength (e.g. 128-bit strong) and time to crack."
      }
    ],
    "faqs": [
      {
        "question": "What is considered a strong password entropy?",
        "answer": "An entropy score above 60-80 bits is considered resistant to brute-force attacks."
      }
    ]
  },
  {
    "id": "bcrypt-hash-generator",
    "slug": "bcrypt-hash-generator",
    "name": "Bcrypt Hash Generator & Verifier",
    "shortDesc": "Generate salted bcrypt password hashes with configurable work factor rounds.",
    "description": "Generate $2a$ or $2b$ bcrypt password hashes with custom cost factors (rounds 4 to 12) and verify plaintext passwords.",
    "category": "Security Tools",
    "iconName": "Lock",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 94100,
    "tags": [
      "bcrypt",
      "password hash",
      "salt",
      "work factor",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Plaintext Password",
        "desc": "Type target password."
      },
      {
        "step": 2,
        "title": "Set Work Factor Cost",
        "desc": "Select cost rounds (default 10)."
      },
      {
        "step": 3,
        "title": "Generate & Test",
        "desc": "Generates salted $2b$10$... hash and test password verification."
      }
    ],
    "faqs": [
      {
        "question": "Why is bcrypt preferred for password storage over plain SHA-256?",
        "answer": "Bcrypt incorporates intentional work factor slowness to defend against GPU hardware cracking."
      }
    ]
  },
  {
    "id": "aes-encryption-decryption",
    "slug": "aes-encryption-decryption",
    "name": "AES-256 Encryption & Decryption Tool",
    "shortDesc": "Encrypt text messages using AES-256-GCM / CBC with a secret passphrase.",
    "description": "Encrypt plain text into secure AES-256 ciphertext strings using Web Crypto API key derivation (PBKDF2).",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 114200,
    "tags": [
      "aes-256",
      "encryption",
      "decryption",
      "crypto",
      "passphrase"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type plaintext or ciphertext",
        "desc": "Enter message payload."
      },
      {
        "step": 2,
        "title": "Enter secret passphrase",
        "desc": "Type encryption password."
      },
      {
        "step": 3,
        "title": "Click Encrypt or Decrypt",
        "desc": "Generates Base64 AES ciphertext or decrypts message."
      }
    ],
    "faqs": [
      {
        "question": "What is AES-256?",
        "answer": "Advanced Encryption Standard using 256-bit key length, adopted worldwide by military and financial institutions."
      }
    ]
  },
  {
    "id": "rsa-key-pair-generator-preview",
    "slug": "rsa-key-pair-generator-preview",
    "name": "RSA Public / Private Key Pair Generator",
    "shortDesc": "Generate 2048-bit or 4096-bit RSA PEM key pairs using Web Crypto API.",
    "description": "Generate asymmetric RSA public and private cryptographic key pairs in standard PEM format.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 88100,
    "tags": [
      "rsa",
      "key pair",
      "public key",
      "private key",
      "pem",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select bit length",
        "desc": "Choose 2048-bit or 4096-bit RSA keys."
      },
      {
        "step": 2,
        "title": "Click Generate Key Pair",
        "desc": "Web Crypto API derives key pair."
      },
      {
        "step": 3,
        "title": "Copy PEM keys",
        "desc": "Copy -----BEGIN PUBLIC KEY----- and PRIVATE KEY strings."
      }
    ],
    "faqs": [
      {
        "question": "Is key generation private?",
        "answer": "Yes, Web Crypto executes completely local to your browser tab."
      }
    ]
  },
  {
    "id": "hmac-generator-sha256",
    "slug": "hmac-generator-sha256",
    "name": "HMAC Signature Generator (HMAC-SHA256, HMAC-SHA512)",
    "shortDesc": "Generate keyed-hash message authentication codes (HMAC) with a secret key.",
    "description": "Calculate HMAC-SHA256 and HMAC-SHA512 signature hashes for API webhook verification.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 76200,
    "tags": [
      "hmac",
      "hmac-sha256",
      "signature",
      "webhook",
      "secret key"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter secret key",
        "desc": "Type API signing secret."
      },
      {
        "step": 2,
        "title": "Enter message payload",
        "desc": "Paste raw JSON or text body."
      },
      {
        "step": 3,
        "title": "Read HMAC signature",
        "desc": "Copy hex or Base64 signature."
      }
    ],
    "faqs": [
      {
        "question": "What is HMAC used for?",
        "answer": "Verifying data integrity and authenticity for payment webhooks (Stripe, GitHub, Shopify)."
      }
    ]
  },
  {
    "id": "crc32-checksum-calculator",
    "slug": "crc32-checksum-calculator",
    "name": "CRC32 Checksum Calculator",
    "shortDesc": "Calculate 32-bit Cyclic Redundancy Check (CRC32) hexadecimal strings.",
    "description": "Calculate CRC32 checksum hashes for file integrity checks and ZIP archive validation.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 51200,
    "tags": [
      "crc32",
      "checksum",
      "integrity",
      "zip",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter string or file text",
        "desc": "Type input payload."
      },
      {
        "step": 2,
        "title": "Calculate CRC32",
        "desc": "Computes 8-character hex checksum."
      },
      {
        "step": 3,
        "title": "Copy checksum",
        "desc": "Copy CRC32 string."
      }
    ],
    "faqs": [
      {
        "question": "Is CRC32 cryptographically secure?",
        "answer": "No, CRC32 is designed to detect accidental network noise, not intentional tampering."
      }
    ]
  },
  {
    "id": "pbkdf2-key-derivation-generator",
    "slug": "pbkdf2-key-derivation-generator",
    "name": "PBKDF2 Key Derivation Generator",
    "shortDesc": "Derive cryptographic key bytes from passwords using PBKDF2 with salt & iterations.",
    "description": "Generate PBKDF2 derived key hashes using SHA-256, custom salt strings, and iteration counts.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 42100,
    "tags": [
      "pbkdf2",
      "key derivation",
      "salt",
      "iterations",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter password & salt string",
        "desc": "Type password and salt."
      },
      {
        "step": 2,
        "title": "Set iteration count",
        "desc": "E.g. 100,000 iterations."
      },
      {
        "step": 3,
        "title": "Generate derived key",
        "desc": "Outputs 256-bit or 512-bit hex key."
      }
    ],
    "faqs": [
      {
        "question": "Why use salt with PBKDF2?",
        "answer": "Salting prevents rainbow table dictionary lookup attacks."
      }
    ]
  },
  {
    "id": "random-bytes-hex-generator",
    "slug": "random-bytes-hex-generator",
    "name": "Cryptographic Random Bytes & Hex Token Generator",
    "shortDesc": "Generate secure random bytes in Hex, Base64, or Raw Uint8Array formats.",
    "description": "Generate cryptographically strong pseudo-random byte sequences for API tokens and OAuth state.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 68100,
    "tags": [
      "random bytes",
      "hex token",
      "web crypto",
      "api keys",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select byte length",
        "desc": "Choose 16, 32, 64, or 128 bytes."
      },
      {
        "step": 2,
        "title": "Select output encoding",
        "desc": "Choose Hexadecimal or Base64."
      },
      {
        "step": 3,
        "title": "Generate tokens",
        "desc": "Generates secure secret tokens."
      }
    ],
    "faqs": [
      {
        "question": "What random source is used?",
        "answer": "window.crypto.getRandomValues() CSPRNG."
      }
    ]
  },
  {
    "id": "totp-2fa-authenticator-inspector",
    "slug": "totp-2fa-authenticator-inspector",
    "name": "TOTP 2FA Secret Key & QR Code Inspector",
    "shortDesc": "Inspect 2FA Base32 secret keys and calculate current 6-digit TOTP security codes.",
    "description": "Calculate 30-second time-based one-time passwords (TOTP) from Base32 secret keys.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 91200,
    "tags": [
      "totp",
      "2fa",
      "authenticator",
      "otp",
      "base32",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Base32 secret key",
        "desc": "E.g. JBSWY3DPEHPK3PXP."
      },
      {
        "step": 2,
        "title": "Inspect TOTP code",
        "desc": "Calculates active 6-digit TOTP code."
      },
      {
        "step": 3,
        "title": "View 30-second countdown",
        "desc": "Shows remaining seconds before code refresh."
      }
    ],
    "faqs": [
      {
        "question": "How does TOTP work?",
        "answer": "Uses HMAC-SHA1 combining secret key with 30-second Unix time windows."
      }
    ]
  },
  {
    "id": "base32-encoder-decoder",
    "slug": "base32-encoder-decoder",
    "name": "Base32 Encoder & Decoder (RFC 4648)",
    "shortDesc": "Encode string data to RFC 4648 Base32 alphabet or decode Base32 keys.",
    "description": "Convert strings to Base32 format (A-Z, 2-7) used in 2FA secrets.",
    "category": "Security Tools",
    "iconName": "Binary",
    "usageCount": 39400,
    "tags": [
      "base32",
      "encoder",
      "decoder",
      "rfc 4648",
      "totp",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter text or Base32 string",
        "desc": "Type input payload."
      },
      {
        "step": 2,
        "title": "Select Encode or Decode",
        "desc": "Converts to/from Base32."
      },
      {
        "step": 3,
        "title": "Copy converted result",
        "desc": "Copy string."
      }
    ],
    "faqs": [
      {
        "question": "Why does Base32 omit numbers 0, 1, 8, 9?",
        "answer": "To prevent visual confusion with letters O, I, B, and L."
      }
    ]
  },
  {
    "id": "password-strength-meter",
    "slug": "password-strength-meter",
    "name": "Password Strength & Time-to-Crack Analyzer",
    "shortDesc": "Test password vulnerability against common dictionary lists and estimate crack times.",
    "description": "Analyze password strength against dictionary wordlists, pattern repetition, and brute force calculations.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 114200,
    "tags": [
      "password strength",
      "time to crack",
      "security",
      "zxcvbn",
      "vulnerability"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type test password",
        "desc": "Enter password in box."
      },
      {
        "step": 2,
        "title": "Inspect weakness flags",
        "desc": "Checks dictionary words, sequential numbers, and character sets."
      },
      {
        "step": 3,
        "title": "Read estimated crack time",
        "desc": "Displays time to crack at 10 billion guesses/sec."
      }
    ],
    "faqs": [
      {
        "question": "What makes a password strong?",
        "answer": "Length (14+ characters) matters more than complex character variation alone."
      }
    ]
  },
  {
    "id": "content-security-policy-generator",
    "slug": "content-security-policy-generator",
    "name": "Content Security Policy (CSP) Header Builder",
    "shortDesc": "Build HTTP Content-Security-Policy rules for script-src, style-src, and img-src.",
    "description": "Build CSP security headers to defend websites against Cross-Site Scripting (XSS) and data injection.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 65100,
    "tags": [
      "csp",
      "content security policy",
      "xss defense",
      "security header",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set script-src directives",
        "desc": "Choose 'self', trusted CDN domains, or nonces."
      },
      {
        "step": 2,
        "title": "Set style-src & img-src",
        "desc": "Define approved stylesheet and photo hosts."
      },
      {
        "step": 3,
        "title": "Copy CSP header text",
        "desc": "Paste into server HTTP headers or meta tag."
      }
    ],
    "faqs": [
      {
        "question": "What does default-src 'self' mean?",
        "answer": "Fallback restriction allowing resources only from the exact site origin domain."
      }
    ]
  },
  {
    "id": "subresource-integrity-sri-hash-generator",
    "slug": "subresource-integrity-sri-hash-generator",
    "name": "Subresource Integrity (SRI) Hash Builder",
    "shortDesc": "Generate integrity=\"sha384-...\" attributes for CDN scripts and stylesheets.",
    "description": "Calculate SRI hashes to verify CDN script files have not been maliciously modified.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 48200,
    "tags": [
      "sri",
      "subresource integrity",
      "sha384",
      "cdn security",
      "script integrity"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste CDN script / CSS code",
        "desc": "Enter raw JavaScript file content."
      },
      {
        "step": 2,
        "title": "Generate SRI hash",
        "desc": "Computes Base64 sha384 hash."
      },
      {
        "step": 3,
        "title": "Copy HTML <script> tag",
        "desc": "Copy <script src=\"...\" integrity=\"sha384-...\" crossorigin=\"anonymous\">."
      }
    ],
    "faqs": [
      {
        "question": "Why is SRI important for CDN scripts?",
        "answer": "Prevents compromised third-party CDNs from executing malicious scripts on your site."
      }
    ]
  },
  {
    "id": "ssl-tls-certificate-decoder",
    "slug": "ssl-tls-certificate-decoder",
    "name": "X.509 SSL / TLS Certificate PEM Inspector",
    "shortDesc": "Decode PEM certificate files (-----BEGIN CERTIFICATE-----) to inspect subject & issuer.",
    "description": "Decode X.509 PEM certificate files to inspect Common Name (CN), Subject Alternative Names (SAN), issuer, and validity dates.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 58200,
    "tags": [
      "x509",
      "ssl certificate",
      "pem",
      "tls",
      "common name",
      "san"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste PEM certificate string",
        "desc": "Paste -----BEGIN CERTIFICATE-----"
      },
      {
        "step": 2,
        "title": "Decode certificate",
        "desc": "Parses ASN.1 X.509 structure."
      },
      {
        "step": 3,
        "title": "Read property report",
        "desc": "View Issuer CA, Subject CN, Valid From / To dates, and SAN domains."
      }
    ],
    "faqs": [
      {
        "question": "What are SANs (Subject Alternative Names)?",
        "answer": "Domain names protected by a single multi-domain SSL certificate."
      }
    ]
  },
  {
    "id": "pem-to-jwk-converter",
    "slug": "pem-to-jwk-converter",
    "name": "RSA PEM Key to JWK (JSON Web Key) Converter",
    "shortDesc": "Convert RSA PEM public/private keys into JWK format objects.",
    "description": "Convert PEM formatted RSA public keys into JSON Web Key (JWK) objects for OAuth 2.0 endpoints.",
    "category": "Security Tools",
    "iconName": "Code",
    "usageCount": 34100,
    "tags": [
      "jwk",
      "pem",
      "rsa",
      "oauth",
      "converter",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste RSA PEM key",
        "desc": "Enter PEM string."
      },
      {
        "step": 2,
        "title": "Convert to JWK",
        "desc": "Extracts modulus (n) and exponent (e)."
      },
      {
        "step": 3,
        "title": "Copy JWK JSON",
        "desc": "Copy JSON Web Key object."
      }
    ],
    "faqs": [
      {
        "question": "What is JWK used for?",
        "answer": "Exposing public verification keys at .well-known/jwks.json OAuth endpoints."
      }
    ]
  },
  {
    "id": "cors-header-generator",
    "slug": "cors-header-generator",
    "name": "CORS (Cross-Origin Resource Sharing) Header Builder",
    "shortDesc": "Build Access-Control-Allow-Origin, Methods, and Headers HTTP response directives.",
    "description": "Build safe Access-Control-Allow-Origin CORS server headers for API endpoints.",
    "category": "Security Tools",
    "iconName": "Server",
    "usageCount": 51200,
    "tags": [
      "cors",
      "access control allow origin",
      "headers",
      "api",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set Allowed Origins",
        "desc": "Specify allowed origin domains or wildcard."
      },
      {
        "step": 2,
        "title": "Select Allowed Methods",
        "desc": "Toggle GET, POST, PUT, DELETE, OPTIONS."
      },
      {
        "step": 3,
        "title": "Copy CORS header rules",
        "desc": "Paste into Express, Nginx, or Cloudflare worker."
      }
    ],
    "faqs": [
      {
        "question": "Is Access-Control-Allow-Origin: * safe for authenticated APIs?",
        "answer": "No, wildcards should not be used when APIs handle credentials or cookies."
      }
    ]
  },
  {
    "id": "security-txt-generator",
    "slug": "security-txt-generator",
    "name": "security.txt Vulnerability Disclosure File Generator",
    "shortDesc": "Generate RFC 9116 security.txt files for security researchers and bug bounties.",
    "description": "Build RFC 9116 security.txt files providing contact information for vulnerability disclosures.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 38200,
    "tags": [
      "security.txt",
      "rfc 9116",
      "vulnerability disclosure",
      "bug bounty",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter contact email or URL",
        "desc": "E.g. mailto:security@example.com."
      },
      {
        "step": 2,
        "title": "Set expiration date & policy URL",
        "desc": "Select security policy link."
      },
      {
        "step": 3,
        "title": "Copy security.txt file",
        "desc": "Upload to https://example.com/.well-known/security.txt."
      }
    ],
    "faqs": [
      {
        "question": "Where must security.txt be hosted?",
        "answer": "At https://example.com/.well-known/security.txt"
      }
    ]
  },
  {
    "id": "cookie-security-flag-builder",
    "slug": "cookie-security-flag-builder",
    "name": "Secure Set-Cookie Header Builder",
    "shortDesc": "Format Set-Cookie headers with Secure, HttpOnly, SameSite=Strict, and Domain flags.",
    "description": "Format Set-Cookie headers with Secure, HttpOnly, SameSite, and Max-Age security directives.",
    "category": "Security Tools",
    "iconName": "Lock",
    "usageCount": 42100,
    "tags": [
      "cookie",
      "set-cookie",
      "httponly",
      "samesite",
      "secure flag",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter cookie name & value",
        "desc": "E.g. session_id=xyz123."
      },
      {
        "step": 2,
        "title": "Toggle security flags",
        "desc": "Check HttpOnly, Secure, SameSite=Strict."
      },
      {
        "step": 3,
        "title": "Copy Set-Cookie string",
        "desc": "Paste into server HTTP headers."
      }
    ],
    "faqs": [
      {
        "question": "What does HttpOnly flag prevent?",
        "answer": "Blocks client-side JavaScript (document.cookie) from accessing the cookie, mitigating XSS stealing."
      }
    ]
  },
  {
    "id": "xss-payload-sanitizer-tester",
    "slug": "xss-payload-sanitizer-tester",
    "name": "HTML XSS Input Sanitizer & Escaper",
    "shortDesc": "Sanitize untrusted HTML inputs to strip dangerous <script> tags and onerror events.",
    "description": "Sanitize untrusted HTML user input to neutralize Cross-Site Scripting (XSS) attack payloads.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 71200,
    "tags": [
      "xss",
      "sanitizer",
      "html escape",
      "vulnerability",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste untrusted HTML snippet",
        "desc": "E.g. <img src=x onerror=alert(1)>."
      },
      {
        "step": 2,
        "title": "Run sanitizer",
        "desc": "Strips inline event handlers and forbidden tags."
      },
      {
        "step": 3,
        "title": "Copy safe HTML",
        "desc": "Copy sanitized markup."
      }
    ],
    "faqs": [
      {
        "question": "What are event handler XSS vectors?",
        "answer": "Attributes like onload=, onerror=, onmouseover= that execute JavaScript."
      }
    ]
  },
  {
    "id": "sql-injection-escaping-helper",
    "slug": "sql-injection-escaping-helper",
    "name": "SQL Query Escaping & Parameterized Query Builder",
    "shortDesc": "Convert raw SQL queries into parameterized prepared statement place-holders.",
    "description": "Convert hardcoded dynamic SQL queries into safe parameterized prepared statements ($1, ?).",
    "category": "Security Tools",
    "iconName": "Database",
    "usageCount": 65200,
    "tags": [
      "sql injection",
      "prepared statement",
      "parameterized query",
      "security",
      "database"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste dynamic SQL query",
        "desc": "E.g. SELECT * FROM users WHERE name = 'John'."
      },
      {
        "step": 2,
        "title": "Convert to parameterized syntax",
        "desc": "Generates SELECT * FROM users WHERE name = $1."
      },
      {
        "step": 3,
        "title": "Copy parameterized query",
        "desc": "Use with database query drivers."
      }
    ],
    "faqs": [
      {
        "question": "Why are prepared statements effective against SQLi?",
        "answer": "By separating SQL query code from user data parameters at the database protocol level."
      }
    ]
  },
  {
    "id": "uuid-v7-time-ordered-generator",
    "slug": "uuid-v7-time-ordered-generator",
    "name": "UUID v7 Time-Ordered Unique ID Generator",
    "shortDesc": "Generate time-ordered RFC 9562 UUID v7 unique identifiers with millisecond timestamps.",
    "description": "Generate database-index-friendly time-ordered UUID v7 identifiers.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 78200,
    "tags": [
      "uuid v7",
      "time ordered",
      "rfc 9562",
      "database index",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select count",
        "desc": "Choose 1 to 50 UUIDs."
      },
      {
        "step": 2,
        "title": "Generate UUID v7",
        "desc": "Embeds current Unix millisecond timestamp in first 48 bits."
      },
      {
        "step": 3,
        "title": "Copy list",
        "desc": "Copy time-sorted UUID v7 list."
      }
    ],
    "faqs": [
      {
        "question": "Why is UUID v7 superior to UUID v4 for database primary keys?",
        "answer": "Time-ordered prefixes prevent B-tree index fragmentation in PostgreSQL and MySQL."
      }
    ]
  },
  {
    "id": "nanoid-generator",
    "slug": "nanoid-generator",
    "name": "NanoID URL-Friendly Unique String Generator",
    "shortDesc": "Generate compact URL-friendly NanoID unique strings (e.g. V1StGXR8_Z5jdHi6B-myT).",
    "description": "Generate compact cryptographically secure NanoID strings with custom alphabets and lengths.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 84200,
    "tags": [
      "nanoid",
      "unique id",
      "url friendly",
      "generator",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set NanoID length",
        "desc": "Default 21 characters."
      },
      {
        "step": 2,
        "title": "Configure custom alphabet",
        "desc": "E.g. A-Za-z0-9_- or custom subset."
      },
      {
        "step": 3,
        "title": "Generate IDs",
        "desc": "Copy generated NanoIDs."
      }
    ],
    "faqs": [
      {
        "question": "How compact is NanoID compared to UUID?",
        "answer": "21-character NanoID offers equal collision resistance as 36-character UUID v4."
      }
    ]
  },
  {
    "id": "ulid-generator",
    "slug": "ulid-generator",
    "name": "ULID (Universally Unique Lexicographically Sortable Identifier) Generator",
    "shortDesc": "Generate 26-character Crockford Base32 lexicographically sortable ULID identifiers.",
    "description": "Generate 26-character time-sortable ULID identifiers using Crockford's Base32 alphabet.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 54100,
    "tags": [
      "ulid",
      "sortable id",
      "crockford base32",
      "generator",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set quantity",
        "desc": "Choose 1 to 50 ULIDs."
      },
      {
        "step": 2,
        "title": "Generate ULIDs",
        "desc": "Embeds 48-bit timestamp + 80-bit random entropy."
      },
      {
        "step": 3,
        "title": "Copy ULIDs",
        "desc": "Copy sortable ID list."
      }
    ],
    "faqs": [
      {
        "question": "What is Crockford Base32 alphabet?",
        "answer": "Excludes I, L, O, U to avoid visual confusion and offensive words."
      }
    ]
  },
  {
    "id": "securerandom-passphrase-wordlist-generator",
    "slug": "securerandom-passphrase-wordlist-generator",
    "name": "Diceware Multi-Word Passphrase Generator",
    "shortDesc": "Generate memorable 4 to 8 word Diceware passphrases (e.g. correct-horse-battery-staple).",
    "description": "Generate memorable multi-word Diceware passphrases with high entropy.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 61200,
    "tags": [
      "diceware",
      "passphrase",
      "memorable password",
      "eff wordlist",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select word count",
        "desc": "Choose 4, 5, 6, or 7 words."
      },
      {
        "step": 2,
        "title": "Select separator",
        "desc": "Choose hyphen (-), space, or custom symbol."
      },
      {
        "step": 3,
        "title": "Generate Passphrase",
        "desc": "Generates high-entropy multi-word passphrase."
      }
    ],
    "faqs": [
      {
        "question": "Why are passphrases easier to remember?",
        "answer": "Random words create distinct mental images while maintaining high cryptographic length."
      }
    ]
  },
  {
    "id": "argon2-parameter-calculator",
    "slug": "argon2-parameter-calculator",
    "name": "Argon2id Hash Parameter Calculator",
    "shortDesc": "Calculate recommended memory (m), time cost (t), and parallelism (p) for Argon2id.",
    "description": "Calculate Argon2id password hashing parameters according to OWASP security guidelines.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 38200,
    "tags": [
      "argon2",
      "argon2id",
      "owasp",
      "password hash",
      "parameters"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select target memory size",
        "desc": "Choose 19 MiB, 46 MiB, or 64 MiB."
      },
      {
        "step": 2,
        "title": "Select time cost iterations",
        "desc": "Choose 1 to 3 iterations."
      },
      {
        "step": 3,
        "title": "Read OWASP configuration",
        "desc": "View recommended Argon2id config."
      }
    ],
    "faqs": [
      {
        "question": "Why Argon2 won Password Hashing Competition (PHC)?",
        "answer": "Argon2 won PHC in 2015 for superior resistance against side-channel and GPU attacks."
      }
    ]
  },
  {
    "id": "jwt-secret-strength-checker",
    "slug": "jwt-secret-strength-checker",
    "name": "JWT Secret Key Entropy & Security Auditor",
    "shortDesc": "Evaluate HMAC secret key length and brute-force vulnerability for JWT tokens.",
    "description": "Audit JWT HS256 secret key entropy to defend against dictionary cracking tools.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 45200,
    "tags": [
      "jwt secret",
      "entropy",
      "hs256",
      "cracking",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type or paste JWT signing secret key",
        "desc": "Enter secret."
      },
      {
        "step": 2,
        "title": "Run security audit",
        "desc": "Calculates key length bits and checks against top 100,000 weak secret wordlists."
      },
      {
        "step": 3,
        "title": "Read verdict",
        "desc": "Recommends 256-bit+ (32+ byte) random secrets for HS256."
      }
    ],
    "faqs": [
      {
        "question": "What is minimum recommended secret key length for HS256?",
        "answer": "At least 256 bits (32 random characters/bytes)."
      }
    ]
  },
  {
    "id": "sha3-keccak-hash-generator",
    "slug": "sha3-keccak-hash-generator",
    "name": "SHA-3 / Keccak Hash Generator (SHA3-256, SHA3-512)",
    "shortDesc": "Calculate NIST SHA-3 and Keccak-256 cryptographic hashes in browser.",
    "description": "Calculate SHA-3 and Ethereum Keccak-256 cryptographic hashes for blockchain verification.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 49200,
    "tags": [
      "sha3",
      "keccak-256",
      "ethereum",
      "nist",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter text message",
        "desc": "Type payload."
      },
      {
        "step": 2,
        "title": "Select algorithm",
        "desc": "Choose SHA3-256, SHA3-512, or Keccak-256."
      },
      {
        "step": 3,
        "title": "Copy hash hex",
        "desc": "Copy output hash."
      }
    ],
    "faqs": [
      {
        "question": "How does Keccak-256 differ from official NIST SHA3-256?",
        "answer": "Differs in padding bytes (0x01 for Keccak-256 vs 0x06 for NIST SHA3-256)."
      }
    ]
  },
  {
    "id": "base58-encoder-decoder",
    "slug": "base58-encoder-decoder",
    "name": "Base58 Encoder & Decoder (Bitcoin Alphabet)",
    "shortDesc": "Encode and decode Base58 strings used in Bitcoin and Solana blockchain addresses.",
    "description": "Convert byte data into Base58 alphanumeric strings using the Bitcoin alphabet.",
    "category": "Security Tools",
    "iconName": "Binary",
    "usageCount": 51200,
    "tags": [
      "base58",
      "bitcoin",
      "solana",
      "encoder",
      "decoder",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type or paste payload",
        "desc": "Enter text or Base58 address."
      },
      {
        "step": 2,
        "title": "Select Encode or Decode",
        "desc": "Converts payload."
      },
      {
        "step": 3,
        "title": "Copy converted Base58 string",
        "desc": "Copy output."
      }
    ],
    "faqs": [
      {
        "question": "What characters are omitted in Base58?",
        "answer": "Omits 0, O, I, l, +, / to prevent visual errors when copying addresses."
      }
    ]
  },
  {
    "id": "rot47-cipher-tool",
    "slug": "rot47-cipher-tool",
    "name": "ROT47 ASCII Character Cipher Encoder / Decoder",
    "shortDesc": "Encrypt text by shifting printable ASCII characters (33-126) by 47 positions.",
    "description": "Encrypt or decrypt text messages shifting ASCII characters across numbers, letters, and symbols.",
    "category": "Security Tools",
    "iconName": "Lock",
    "usageCount": 28400,
    "tags": [
      "rot47",
      "ascii cipher",
      "obfuscation",
      "crypto"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type message",
        "desc": "Enter string."
      },
      {
        "step": 2,
        "title": "Apply ROT47 shift",
        "desc": "Shifts printable ASCII characters."
      },
      {
        "step": 3,
        "title": "Copy obfuscated text",
        "desc": "Copy cipher result."
      }
    ],
    "faqs": [
      {
        "question": "How is ROT47 different from ROT13?",
        "answer": "ROT13 shifts only 26 letters, while ROT47 shifts 94 printable ASCII characters."
      }
    ]
  },
  {
    "id": "character-frequency-crypto-analyzer",
    "slug": "character-frequency-crypto-analyzer",
    "name": "Ciphertext Frequency Analysis Inspector",
    "shortDesc": "Analyze character frequency histograms in ciphertext to break simple substitution ciphers.",
    "description": "Calculate letter frequency percentages in encrypted text to analyze simple substitution ciphers.",
    "category": "Security Tools",
    "iconName": "BarChart2",
    "usageCount": 31200,
    "tags": [
      "frequency analysis",
      "ciphertext",
      "cryptanalysis",
      "letters",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste ciphertext",
        "desc": "Enter encrypted text."
      },
      {
        "step": 2,
        "title": "View letter distribution graph",
        "desc": "Displays percentage frequency of each character."
      },
      {
        "step": 3,
        "title": "Compare against English ETAOIN",
        "desc": "Compare most frequent letters to standard English frequencies."
      }
    ],
    "faqs": [
      {
        "question": "What are the 6 most common letters in English text?",
        "answer": "E, T, A, O, I, N (ETAOIN)."
      }
    ]
  },
  {
    "id": "htpasswd-generator-bcrypt-md5",
    "slug": "htpasswd-generator-bcrypt-md5",
    "name": "Apache .htpasswd Password Hash Generator",
    "shortDesc": "Generate Apache .htpasswd entries using Bcrypt ($2y$) or APR1 MD5 hashes.",
    "description": "Generate htpasswd username:hash entries for Apache HTTP basic authentication.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 41200,
    "tags": [
      "htpasswd",
      "apache",
      "basic auth",
      "bcrypt",
      "md5",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter username & password",
        "desc": "E.g. admin and secretpass."
      },
      {
        "step": 2,
        "title": "Select algorithm",
        "desc": "Choose Bcrypt ($2y$) or Apache MD5 ($apr1$)."
      },
      {
        "step": 3,
        "title": "Copy .htpasswd line",
        "desc": "Paste into server .htpasswd file."
      }
    ],
    "faqs": [
      {
        "question": "Where is .htpasswd placed?",
        "answer": "Outside the public web root directory for security."
      }
    ]
  },
  {
    "id": "security-headers-evaluator",
    "slug": "security-headers-evaluator",
    "name": "HTTP Security Headers Grade Evaluator",
    "shortDesc": "Evaluate HTTP response headers for HSTS, CSP, X-Frame-Options, and Referrer-Policy.",
    "description": "Audit server HTTP security response headers and calculate a letter grade (A+ to F).",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 54100,
    "tags": [
      "security headers",
      "hsts",
      "x-frame-options",
      "referrer-policy",
      "audit"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste server header text",
        "desc": "Enter HTTP headers response."
      },
      {
        "step": 2,
        "title": "Run audit",
        "desc": "Checks HSTS, CSP, X-Frame-Options, X-Content-Type-Options."
      },
      {
        "step": 3,
        "title": "Read letter grade",
        "desc": "View compliance score and missing header recommendations."
      }
    ],
    "faqs": [
      {
        "question": "What does X-Frame-Options: DENY do?",
        "answer": "Prevents your website from being embedded inside <iframe tags to stop clickjacking."
      }
    ]
  },
  {
    "id": "hsts-header-generator",
    "slug": "hsts-header-generator",
    "name": "HSTS (Strict-Transport-Security) Header Builder",
    "shortDesc": "Build Strict-Transport-Security headers with max-age, includeSubDomains, and preload.",
    "description": "Build HSTS headers to force browsers to connect exclusively over secure HTTPS.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 36200,
    "tags": [
      "hsts",
      "strict-transport-security",
      "https",
      "preload",
      "security header"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select max-age duration",
        "desc": "Default 1 year (31536000 seconds)."
      },
      {
        "step": 2,
        "title": "Toggle includeSubDomains & preload",
        "desc": "Check preload eligibility."
      },
      {
        "step": 3,
        "title": "Copy HSTS header",
        "desc": "Paste into server config."
      }
    ],
    "faqs": [
      {
        "question": "What is HSTS Preload list?",
        "answer": "A hardcoded list built into major browsers forcing HTTPS on domain before first visit."
      }
    ]
  },
  {
    "id": "cross-origin-policies-generator",
    "slug": "cross-origin-policies-generator",
    "name": "COOP / COEP / CORP Cross-Origin Security Headers Builder",
    "shortDesc": "Build Cross-Origin-Opener-Policy and Embedder-Policy headers for SharedArrayBuffer.",
    "description": "Configure COOP, COEP, and CORP isolation headers required for high-performance multi-threading APIs.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 29800,
    "tags": [
      "coop",
      "coep",
      "corp",
      "cross-origin",
      "sharedarraybuffer",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select COOP mode",
        "desc": "Choose same-origin or same-origin-allow-popups."
      },
      {
        "step": 2,
        "title": "Select COEP mode",
        "desc": "Choose require-corp."
      },
      {
        "step": 3,
        "title": "Copy isolation headers",
        "desc": "Paste into server response headers."
      }
    ],
    "faqs": [
      {
        "question": "Why are COOP and COEP required for SharedArrayBuffer?",
        "answer": "To protect against Spectre side-channel timing attacks across cross-origin browsing contexts."
      }
    ]
  },
  {
    "id": "sql-injection-payload-cheat-sheet",
    "slug": "sql-injection-payload-cheat-sheet",
    "name": "SQL Injection Defense & Prevention Guide",
    "shortDesc": "Learn how to detect and fix SQL injection vulnerabilities across Node, Python, and PHP.",
    "description": "Interactive educational guide for discovering and fixing SQL injection vulnerabilities.",
    "category": "Security Tools",
    "iconName": "Database",
    "usageCount": 42100,
    "tags": [
      "sql injection",
      "defense",
      "prepared statements",
      "security guide",
      "owasp"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select backend framework",
        "desc": "Choose Node.js, Python, PHP, or Java."
      },
      {
        "step": 2,
        "title": "View vulnerable code vs fixed code",
        "desc": "Compare string concatenation against prepared statements."
      },
      {
        "step": 3,
        "title": "Copy secure code snippets",
        "desc": "Apply safe ORM or driver patterns."
      }
    ],
    "faqs": [
      {
        "question": "What is OWASP Top 10 rank for Injection?",
        "answer": "Injection vulnerabilities consistently rank among OWASP's top web security risks."
      }
    ]
  },
  {
    "id": "ssh-key-fingerprint-calculator",
    "slug": "ssh-key-fingerprint-calculator",
    "name": "SSH Public Key SHA-256 Fingerprint Calculator",
    "shortDesc": "Calculate SHA-256 and MD5 fingerprints from public SSH keys (ssh-rsa, ed25519).",
    "description": "Calculate SHA-256 Base64 and MD5 hex fingerprints for public SSH keys in browser.",
    "category": "Security Tools",
    "iconName": "KeyRound",
    "usageCount": 48200,
    "tags": [
      "ssh key",
      "fingerprint",
      "sha256",
      "ed25519",
      "ssh-rsa",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste public SSH key",
        "desc": "Paste ssh-rsa AAAAB3NzaC1... user@host"
      },
      {
        "step": 2,
        "title": "Calculate fingerprints",
        "desc": "Extracts Key Type, Bit Size, SHA-256 Base64, and MD5 Hex."
      },
      {
        "step": 3,
        "title": "Compare server fingerprints",
        "desc": "Verify host key against server prompt."
      }
    ],
    "faqs": [
      {
        "question": "What key type is recommended over legacy RSA?",
        "answer": "Ed25519 (Edwards-curve Digital Signature Algorithm) is compact and highly secure."
      }
    ]
  },
  {
    "id": "clickjacking-defense-meta-generator",
    "slug": "clickjacking-defense-meta-generator",
    "name": "Clickjacking Defense & X-Frame-Options Generator",
    "shortDesc": "Generate X-Frame-Options: DENY and CSP frame-ancestors headers to stop clickjacking.",
    "description": "Generate X-Frame-Options and CSP frame-ancestors headers to defend websites against clickjacking.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 31200,
    "tags": [
      "clickjacking",
      "x-frame-options",
      "frame-ancestors",
      "iframe",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select frame restriction level",
        "desc": "Choose DENY, SAMEORIGIN, or ALLOW-FROM."
      },
      {
        "step": 2,
        "title": "Generate headers",
        "desc": "Creates X-Frame-Options and CSP frame-ancestors directive."
      },
      {
        "step": 3,
        "title": "Paste into server config",
        "desc": "Embed in server response."
      }
    ],
    "faqs": [
      {
        "question": "What is Clickjacking?",
        "answer": "An attack where a malicious site embeds your page in an invisible iframe to trick users into clicking buttons."
      }
    ]
  },
  {
    "id": "file-entropy-calculator",
    "slug": "file-entropy-calculator",
    "name": "Shannon Entropy Text & Data File Calculator",
    "shortDesc": "Calculate Shannon Entropy (0 to 8 bits/byte) to detect encrypted vs plain text data.",
    "description": "Calculate Shannon Entropy scores to distinguish plaintext from compressed or encrypted data.",
    "category": "Security Tools",
    "iconName": "Activity",
    "usageCount": 22100,
    "tags": [
      "shannon entropy",
      "randomness",
      "encrypted data",
      "bits per byte",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste text payload or data",
        "desc": "Enter string."
      },
      {
        "step": 2,
        "title": "Calculate Shannon Entropy",
        "desc": "Computes byte probability distribution score."
      },
      {
        "step": 3,
        "title": "Read entropy score",
        "desc": "Plain English text ~3.5-4.5; Encrypted/Compressed data ~7.9-8.0."
      }
    ],
    "faqs": [
      {
        "question": "What is max theoretical Shannon entropy per byte?",
        "answer": "8.0 bits per byte (indicating complete uniform randomness)."
      }
    ]
  },
  {
    "id": "universal-password-generator",
    "slug": "universal-password-generator",
    "name": "Universal Password Generator",
    "shortDesc": "Instant client-side password generator tool for developers.",
    "description": "Perform password generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 59398,
    "tags": [
      "security tools",
      "password generator",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Password Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Password Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Password Generator?",
        "answer": "Yes! All Password Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal Password Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-password-strength-checker",
    "slug": "online-password-strength-checker",
    "name": "Online Password Strength Checker",
    "shortDesc": "Instant client-side password strength checker tool for seo specialists.",
    "description": "Perform password strength checker calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 93007,
    "tags": [
      "security tools",
      "password strength checker",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Password Strength Checker controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Password Strength Checker processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Password Strength Checker?",
        "answer": "Yes! All Password Strength Checker calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Password Strength Checker?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pin-generator-master",
    "slug": "pin-generator-master",
    "name": "PIN Generator Master",
    "shortDesc": "Instant client-side pin generator tool for finance managers.",
    "description": "Perform pin generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 93214,
    "tags": [
      "security tools",
      "pin generator",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PIN Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PIN Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PIN Generator?",
        "answer": "Yes! All PIN Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PIN Generator Master?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-passphrase-generator",
    "slug": "advanced-passphrase-generator",
    "name": "Advanced Passphrase Generator",
    "shortDesc": "Instant client-side passphrase generator tool for data processing.",
    "description": "Perform passphrase generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 153940,
    "tags": [
      "security tools",
      "passphrase generator",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Passphrase Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Passphrase Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Passphrase Generator?",
        "answer": "Yes! All Passphrase Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced Passphrase Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "uuid-security-key-generator-smart",
    "slug": "uuid-security-key-generator-smart",
    "name": "UUID Security Key Generator (Smart)",
    "shortDesc": "Instant client-side uuid security key generator tool for content creators.",
    "description": "Perform uuid security key generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 118724,
    "tags": [
      "security tools",
      "uuid security key generator",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the UUID Security Key Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The UUID Security Key Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for UUID Security Key Generator?",
        "answer": "Yes! All UUID Security Key Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on UUID Security Key Generator (Smart)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "guid-generator-client-side",
    "slug": "guid-generator-client-side",
    "name": "GUID Generator Client-Side",
    "shortDesc": "Instant client-side guid generator tool for students.",
    "description": "Perform guid generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 168211,
    "tags": [
      "security tools",
      "guid generator",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the GUID Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The GUID Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for GUID Generator?",
        "answer": "Yes! All GUID Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on GUID Generator Client-Side?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-hash-md5-generator",
    "slug": "easy-hash-md5-generator",
    "name": "Easy Hash MD5 Generator",
    "shortDesc": "Instant client-side hash md5 generator tool for everyday use.",
    "description": "Perform hash md5 generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 146010,
    "tags": [
      "security tools",
      "hash md5 generator",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Hash MD5 Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Hash MD5 Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Hash MD5 Generator?",
        "answer": "Yes! All Hash MD5 Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy Hash MD5 Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-hash-sha1-generator",
    "slug": "custom-hash-sha1-generator",
    "name": "Custom Hash SHA1 Generator",
    "shortDesc": "Instant client-side hash sha1 generator tool for ui ux testing.",
    "description": "Perform hash sha1 generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 86273,
    "tags": [
      "security tools",
      "hash sha1 generator",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Hash SHA1 Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Hash SHA1 Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Hash SHA1 Generator?",
        "answer": "Yes! All Hash SHA1 Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom Hash SHA1 Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "hash-sha256-generator-dynamic",
    "slug": "hash-sha256-generator-dynamic",
    "name": "Hash SHA256 Generator Dynamic",
    "shortDesc": "Instant client-side hash sha256 generator tool for writers.",
    "description": "Perform hash sha256 generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 162519,
    "tags": [
      "security tools",
      "hash sha256 generator",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Hash SHA256 Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Hash SHA256 Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Hash SHA256 Generator?",
        "answer": "Yes! All Hash SHA256 Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Hash SHA256 Generator Dynamic?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "hash-sha512-generator-private",
    "slug": "hash-sha512-generator-private",
    "name": "Hash SHA512 Generator (Private)",
    "shortDesc": "Instant client-side hash sha512 generator tool for engineers.",
    "description": "Perform hash sha512 generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 44452,
    "tags": [
      "security tools",
      "hash sha512 generator",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Hash SHA512 Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Hash SHA512 Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Hash SHA512 Generator?",
        "answer": "Yes! All Hash SHA512 Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Hash SHA512 Generator (Private)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-hmac-sha256-generator",
    "slug": "browser-hmac-sha256-generator",
    "name": "Browser HMAC SHA256 Generator",
    "shortDesc": "Instant client-side hmac sha256 generator tool for security audits.",
    "description": "Perform hmac sha256 generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 36908,
    "tags": [
      "security tools",
      "hmac sha256 generator",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the HMAC SHA256 Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The HMAC SHA256 Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for HMAC SHA256 Generator?",
        "answer": "Yes! All HMAC SHA256 Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser HMAC SHA256 Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "crc32-checksum-universal",
    "slug": "crc32-checksum-universal",
    "name": "CRC32 Checksum Universal",
    "shortDesc": "Instant client-side crc32 checksum tool for web designers.",
    "description": "Perform crc32 checksum calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 136930,
    "tags": [
      "security tools",
      "crc32 checksum",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the CRC32 Checksum controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The CRC32 Checksum processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for CRC32 Checksum?",
        "answer": "Yes! All CRC32 Checksum calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on CRC32 Checksum Universal?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-bcrypt-hash-generator",
    "slug": "online-bcrypt-hash-generator",
    "name": "Online Bcrypt Hash Generator",
    "shortDesc": "Instant client-side bcrypt hash generator tool for marketers.",
    "description": "Perform bcrypt hash generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 86191,
    "tags": [
      "security tools",
      "bcrypt hash generator",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Bcrypt Hash Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Bcrypt Hash Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Bcrypt Hash Generator?",
        "answer": "Yes! All Bcrypt Hash Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Bcrypt Hash Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "master-aes-encryption-tool",
    "slug": "master-aes-encryption-tool",
    "name": "Master AES Encryption Tool",
    "shortDesc": "Instant client-side aes encryption tool tool for analysts.",
    "description": "Perform aes encryption tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 191073,
    "tags": [
      "security tools",
      "aes encryption tool",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the AES Encryption Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The AES Encryption Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for AES Encryption Tool?",
        "answer": "Yes! All AES Encryption Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Master AES Encryption Tool?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "aes-decryption-tool-advanced",
    "slug": "aes-decryption-tool-advanced",
    "name": "AES Decryption Tool Advanced",
    "shortDesc": "Instant client-side aes decryption tool tool for digital publishing.",
    "description": "Perform aes decryption tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 104058,
    "tags": [
      "security tools",
      "aes decryption tool",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the AES Decryption Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The AES Decryption Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for AES Decryption Tool?",
        "answer": "Yes! All AES Decryption Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on AES Decryption Tool Advanced?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "smart-rsa-key-pair-generator",
    "slug": "smart-rsa-key-pair-generator",
    "name": "Smart RSA Key Pair Generator",
    "shortDesc": "Instant client-side rsa key pair generator tool for developers.",
    "description": "Perform rsa key pair generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 22050,
    "tags": [
      "security tools",
      "rsa key pair generator",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the RSA Key Pair Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The RSA Key Pair Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for RSA Key Pair Generator?",
        "answer": "Yes! All RSA Key Pair Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Smart RSA Key Pair Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-jwt-decoder-inspector",
    "slug": "client-side-jwt-decoder-inspector",
    "name": "Client-Side JWT Decoder Inspector",
    "shortDesc": "Instant client-side jwt decoder inspector tool for seo specialists.",
    "description": "Perform jwt decoder inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 137423,
    "tags": [
      "security tools",
      "jwt decoder inspector",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the JWT Decoder Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The JWT Decoder Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for JWT Decoder Inspector?",
        "answer": "Yes! All JWT Decoder Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side JWT Decoder Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "qr-code-security-generator-easy",
    "slug": "qr-code-security-generator-easy",
    "name": "QR Code Security Generator Easy",
    "shortDesc": "Instant client-side qr code security generator tool for finance managers.",
    "description": "Perform qr code security generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 71628,
    "tags": [
      "security tools",
      "qr code security generator",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the QR Code Security Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The QR Code Security Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for QR Code Security Generator?",
        "answer": "Yes! All QR Code Security Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on QR Code Security Generator Easy?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-barcode-generator",
    "slug": "custom-barcode-generator",
    "name": "Custom Barcode Generator",
    "shortDesc": "Instant client-side barcode generator tool for data processing.",
    "description": "Perform barcode generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 89457,
    "tags": [
      "security tools",
      "barcode generator",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Barcode Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Barcode Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Barcode Generator?",
        "answer": "Yes! All Barcode Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom Barcode Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "base64-security-cipher-dynamic",
    "slug": "base64-security-cipher-dynamic",
    "name": "Base64 Security Cipher (Dynamic)",
    "shortDesc": "Instant client-side base64 security cipher tool for content creators.",
    "description": "Perform base64 security cipher calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 39133,
    "tags": [
      "security tools",
      "base64 security cipher",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Base64 Security Cipher controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Base64 Security Cipher processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Base64 Security Cipher?",
        "answer": "Yes! All Base64 Security Cipher calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Base64 Security Cipher (Dynamic)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "url-security-cipher-private",
    "slug": "url-security-cipher-private",
    "name": "URL Security Cipher Private",
    "shortDesc": "Instant client-side url security cipher tool for students.",
    "description": "Perform url security cipher calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 181476,
    "tags": [
      "security tools",
      "url security cipher",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the URL Security Cipher controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The URL Security Cipher processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for URL Security Cipher?",
        "answer": "Yes! All URL Security Cipher calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on URL Security Cipher Private?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-caesar-cipher-tool",
    "slug": "browser-caesar-cipher-tool",
    "name": "Browser Caesar Cipher Tool",
    "shortDesc": "Instant client-side caesar cipher tool tool for everyday use.",
    "description": "Perform caesar cipher tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 69494,
    "tags": [
      "security tools",
      "caesar cipher tool",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Caesar Cipher Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Caesar Cipher Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Caesar Cipher Tool?",
        "answer": "Yes! All Caesar Cipher Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser Caesar Cipher Tool?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "universal-rot13-cipher-tool",
    "slug": "universal-rot13-cipher-tool",
    "name": "Universal ROT13 Cipher Tool",
    "shortDesc": "Instant client-side rot13 cipher tool tool for ui ux testing.",
    "description": "Perform rot13 cipher tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 73258,
    "tags": [
      "security tools",
      "rot13 cipher tool",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the ROT13 Cipher Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The ROT13 Cipher Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for ROT13 Cipher Tool?",
        "answer": "Yes! All ROT13 Cipher Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal ROT13 Cipher Tool?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "vigenere-cipher-tool-online",
    "slug": "vigenere-cipher-tool-online",
    "name": "Vigenere Cipher Tool Online",
    "shortDesc": "Instant client-side vigenere cipher tool tool for writers.",
    "description": "Perform vigenere cipher tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 88474,
    "tags": [
      "security tools",
      "vigenere cipher tool",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Vigenere Cipher Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Vigenere Cipher Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Vigenere Cipher Tool?",
        "answer": "Yes! All Vigenere Cipher Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Vigenere Cipher Tool Online?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "xor-cipher-tool-master",
    "slug": "xor-cipher-tool-master",
    "name": "XOR Cipher Tool (Master)",
    "shortDesc": "Instant client-side xor cipher tool tool for engineers.",
    "description": "Perform xor cipher tool calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 68136,
    "tags": [
      "security tools",
      "xor cipher tool",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the XOR Cipher Tool controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The XOR Cipher Tool processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for XOR Cipher Tool?",
        "answer": "Yes! All XOR Cipher Tool calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on XOR Cipher Tool (Master)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-steganography-text-encoder",
    "slug": "advanced-steganography-text-encoder",
    "name": "Advanced Steganography Text Encoder",
    "shortDesc": "Instant client-side steganography text encoder tool for security audits.",
    "description": "Perform steganography text encoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 125190,
    "tags": [
      "security tools",
      "steganography text encoder",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Steganography Text Encoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Steganography Text Encoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Steganography Text Encoder?",
        "answer": "Yes! All Steganography Text Encoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced Steganography Text Encoder?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "steganography-text-decoder-smart",
    "slug": "steganography-text-decoder-smart",
    "name": "Steganography Text Decoder Smart",
    "shortDesc": "Instant client-side steganography text decoder tool for web designers.",
    "description": "Perform steganography text decoder calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 39994,
    "tags": [
      "security tools",
      "steganography text decoder",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Steganography Text Decoder controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Steganography Text Decoder processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Steganography Text Decoder?",
        "answer": "Yes! All Steganography Text Decoder calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Steganography Text Decoder Smart?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-file-hash-checksum",
    "slug": "client-side-file-hash-checksum",
    "name": "Client-Side File Hash Checksum",
    "shortDesc": "Instant client-side file hash checksum tool for marketers.",
    "description": "Perform file hash checksum calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 59216,
    "tags": [
      "security tools",
      "file hash checksum",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the File Hash Checksum controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The File Hash Checksum processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for File Hash Checksum?",
        "answer": "Yes! All File Hash Checksum calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side File Hash Checksum?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-digital-signature-generator",
    "slug": "easy-digital-signature-generator",
    "name": "Easy Digital Signature Generator",
    "shortDesc": "Instant client-side digital signature generator tool for analysts.",
    "description": "Perform digital signature generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 20196,
    "tags": [
      "security tools",
      "digital signature generator",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Digital Signature Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Digital Signature Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Digital Signature Generator?",
        "answer": "Yes! All Digital Signature Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy Digital Signature Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "ssl-cert-inspector-custom",
    "slug": "ssl-cert-inspector-custom",
    "name": "SSL Cert Inspector Custom",
    "shortDesc": "Instant client-side ssl cert inspector tool for digital publishing.",
    "description": "Perform ssl cert inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 157486,
    "tags": [
      "security tools",
      "ssl cert inspector",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the SSL Cert Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The SSL Cert Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for SSL Cert Inspector?",
        "answer": "Yes! All SSL Cert Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on SSL Cert Inspector Custom?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "dynamic-csr-generator-helper",
    "slug": "dynamic-csr-generator-helper",
    "name": "Dynamic CSR Generator Helper",
    "shortDesc": "Instant client-side csr generator helper tool for developers.",
    "description": "Perform csr generator helper calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 117848,
    "tags": [
      "security tools",
      "csr generator helper",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the CSR Generator Helper controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The CSR Generator Helper processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for CSR Generator Helper?",
        "answer": "Yes! All CSR Generator Helper calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Dynamic CSR Generator Helper?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "private-ssh-key-generator",
    "slug": "private-ssh-key-generator",
    "name": "Private SSH Key Generator",
    "shortDesc": "Instant client-side ssh key generator tool for seo specialists.",
    "description": "Perform ssh key generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Security Tools",
    "iconName": "ShieldCheck",
    "usageCount": 100543,
    "tags": [
      "security tools",
      "ssh key generator",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the SSH Key Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The SSH Key Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for SSH Key Generator?",
        "answer": "Yes! All SSH Key Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Private SSH Key Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  }
];

export default tools;
