const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. PMT Logo SVG with rounded dark container for app icons & android chrome
const getAppIconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)" />
  <polygon points="256,60 435,163 435,349 256,452 77,349 77,163" fill="url(#pmtGrad)" />
  <text x="256" y="298" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="136" font-weight="900" text-anchor="middle" letter-spacing="-3">PMT</text>
</svg>
`;

// 2. PMT Logo SVG for Favicons (Hexagon with PMT text, gradient fill #6366F1 -> #EC4899)
const getFaviconSvg = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366F1" />
      <stop offset="100%" stop-color="#EC4899" />
    </linearGradient>
  </defs>
  <polygon points="256,20 472,144 472,368 256,492 40,368 40,144" fill="url(#pmtGrad)" />
  <text x="256" y="302" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="160" font-weight="900" text-anchor="middle" letter-spacing="-4">PMT</text>
</svg>
`;

// 3. OG Social Image (1200x630)
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

// Multi-resolution ICO builder
function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  let currentOffset = 6 + count * 16;
  const dirBuffers = [];
  const imageBuffers = [];

  for (const img of images) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    dir.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    dir.writeUInt8(0, 2); // Color palette
    dir.writeUInt8(0, 3); // Reserved
    dir.writeUInt16LE(1, 4); // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel
    dir.writeUInt32LE(img.buffer.length, 8); // Image size in bytes
    dir.writeUInt32LE(currentOffset, 12); // Image data offset

    dirBuffers.push(dir);
    imageBuffers.push(img.buffer);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirBuffers, ...imageBuffers]);
}

async function generateAssets() {
  console.log('[generate-assets] Generating app icons and social preview image...');

  // 1. OG Social Image (1200x630)
  await sharp(Buffer.from(ogImageSvg))
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✓ Created og-image.png (1200x630)');

  // 2. Favicon PNGs (16x16, 32x32, 48x48)
  const png16 = await sharp(Buffer.from(getFaviconSvg(16)))
    .resize(16, 16)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  console.log('✓ Created favicon-16x16.png');

  const png32 = await sharp(Buffer.from(getFaviconSvg(32)))
    .resize(32, 32)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  console.log('✓ Created favicon-32x32.png');

  const png48 = await sharp(Buffer.from(getFaviconSvg(48)))
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
  console.log('✓ Created favicon-48x48.png');

  // 3. Apple Touch Icon (180x180)
  await sharp(Buffer.from(getAppIconSvg(180)))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png (180x180)');

  // 4. Android Chrome Icons (192x192, 512x512)
  await sharp(Buffer.from(getAppIconSvg(192)))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('✓ Created android-chrome-192x192.png (192x192)');

  await sharp(Buffer.from(getAppIconSvg(512)))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('✓ Created android-chrome-512x512.png (512x512)');

  // Legacy/PWA mirror icons
  await sharp(Buffer.from(getAppIconSvg(192)))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
  console.log('✓ Created icon-192x192.png');

  await sharp(Buffer.from(getAppIconSvg(512)))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
  console.log('✓ Created icon-512x512.png');

  // 5. Multi-size favicon.ico containing 16x16, 32x32, 48x48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Created multi-resolution favicon.ico (16x16, 32x32, 48x48)');

  console.log('[generate-assets] All assets generated successfully!');
}

generateAssets().catch((err) => {
  console.error('[generate-assets] Error generating assets:', err);
  process.exit(1);
});
