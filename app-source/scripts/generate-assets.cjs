const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Base PMT Logo SVG for icons
const getIconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0F172A" />
  <polygon points="50,12 85,31 85,69 50,88 15,69 15,31" fill="url(#pmtGrad)" />
  <text x="50" y="58" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="800" text-anchor="middle" letter-spacing="-1">PMT</text>
</svg>
`;

// Clean transparent icon SVG for smaller favicons
const getFaviconTransparentSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <polygon points="50,5 92,28 92,72 50,95 8,72 8,28" fill="url(#pmtGrad)" />
  <text x="50" y="59" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" text-anchor="middle" letter-spacing="-1">PMT</text>
</svg>
`;

// OG Image SVG (1200x630)
const ogImageSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="40%" stop-color="#1E1B4B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>

    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>

    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#818CF8" />
      <stop offset="50%" stop-color="#F472B6" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>

    <radialGradient id="glow1" cx="20%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="glow2" cx="80%" cy="70%" r="40%">
      <stop offset="0%" stop-color="#EC4899" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#EC4899" stop-opacity="0" />
    </radialGradient>

    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" fill-opacity="0.07" />
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#glow1)" />
  <rect width="1200" height="630" fill="url(#glow2)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <rect x="40" y="40" width="1120" height="550" rx="32" fill="#1E293B" fill-opacity="0.4" stroke="#334155" stroke-width="2" />

  <g transform="translate(600, 115)">
    <rect x="-180" y="-20" width="360" height="40" rx="20" fill="#312E81" fill-opacity="0.8" stroke="#6366F1" stroke-width="1.5" />
    <text x="0" y="6" fill="#A5B4FC" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" text-anchor="middle" letter-spacing="1">100% CLIENT-SIDE • FREE • PRIVATE</text>
  </g>

  <g transform="translate(600, 225) scale(1.4)">
    <polygon points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5" fill="#000000" opacity="0.3" transform="translate(0, 4)" />
    <polygon points="0,-45 39,-22.5 39,22.5 0,45 -39,22.5 -39,-22.5" fill="url(#logoGrad)" />
    <text x="0" y="10" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" text-anchor="middle" letter-spacing="-1">PMT</text>
  </g>

  <text x="600" y="375" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="900" text-anchor="middle" letter-spacing="-1">Public Media Tool</text>

  <text x="600" y="440" fill="url(#textGrad)" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" text-anchor="middle">1,516+ Free Browser-Based Tools</text>

  <text x="600" y="495" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" text-anchor="middle">Fast • No AI • No Signup Required • Zero File Uploads</text>
</svg>
`;

async function generateAssets() {
  console.log('[generate-assets] Generating app icons and social preview image...');

  // 1. OG Social Image (1200x630)
  await sharp(Buffer.from(ogImageSvg))
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created og-image.png (1200x630)');

  // 2. Favicons
  await sharp(Buffer.from(getFaviconTransparentSvg(16)))
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('✓ Created favicon-16x16.png');

  await sharp(Buffer.from(getFaviconTransparentSvg(32)))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Created favicon-32x32.png');

  // 3. Apple Touch Icon (180x180)
  await sharp(Buffer.from(getIconSvg(180)))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // 4. Manifest Icons
  await sharp(Buffer.from(getIconSvg(192)))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
  console.log('✓ Created icon-192x192.png');

  await sharp(Buffer.from(getIconSvg(512)))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
  console.log('✓ Created icon-512x512.png');

  // 5. favicon.ico (32x32 png formatted as ico header or sharp png buffer)
  const png32Buffer = await sharp(Buffer.from(getFaviconTransparentSvg(32)))
    .resize(32, 32)
    .png()
    .toBuffer();

  // ICO header wrapper for single 32x32 PNG image
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Image type (1 = ICO)
  icoHeader.writeUInt16LE(1, 4); // Number of images

  const icoDirectory = Buffer.alloc(16);
  icoDirectory.writeUInt8(32, 0); // Width
  icoDirectory.writeUInt8(32, 1); // Height
  icoDirectory.writeUInt8(0, 2);  // Palette color count
  icoDirectory.writeUInt8(0, 3);  // Reserved
  icoDirectory.writeUInt16LE(1, 4); // Color planes
  icoDirectory.writeUInt16LE(32, 6); // Bits per pixel
  icoDirectory.writeUInt32LE(png32Buffer.length, 8); // Size of image data
  icoDirectory.writeUInt32LE(22, 12); // Offset of image data (6 + 16 = 22)

  const icoBuffer = Buffer.concat([icoHeader, icoDirectory, png32Buffer]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created favicon.ico');

  console.log('[generate-assets] All assets generated successfully!');
}

generateAssets().catch((err) => {
  console.error('[generate-assets] Error generating assets:', err);
  process.exit(1);
});
