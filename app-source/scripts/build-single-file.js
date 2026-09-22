import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

async function run() {
  console.log('Building single file bundle...');
  
  // Build using Vite programmatically
  await build({
    configFile: false, // ignore vite.config.ts
    base: './', // local relative path for fully self-contained
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    build: {
      outDir: 'dist-single',
      emptyOutDir: true,
      minify: true,
      rollupOptions: {
        output: {
          inlineDynamicImports: true, // inline all dynamic imports!
        }
      }
    }
  });

  console.log('Vite build complete. Inlining assets...');

  // Now, read dist-single/index.html
  let html = fs.readFileSync('dist-single/index.html', 'utf8');

  // Find all generated JS and CSS files in dist-single/assets
  const files = fs.readdirSync('dist-single/assets');
  let jsContent = '';
  let cssContent = '';

  for (const file of files) {
    if (file.endsWith('.js')) {
      jsContent += fs.readFileSync(path.join('dist-single/assets', file), 'utf8') + '\n';
    } else if (file.endsWith('.css')) {
      cssContent += fs.readFileSync(path.join('dist-single/assets', file), 'utf8') + '\n';
    }
  }

  // Remove existing scripts and styles links from the HTML
  html = html.replace(/<script\b[^>]*src="[^"]*assets\/[^"]*"\s*>[^<]*<\/script>/gi, '');
  html = html.replace(/<script\b[^>]*src='[^']*assets\/[^']*'\s*>[^<]*<\/script>/gi, '');
  html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, '');
  html = html.replace(/<link\b[^>]*rel='modulepreload'[^>]*>/gi, '');
  html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="[^"]*assets\/[^"]*"[^>]*>/gi, '');
  html = html.replace(/<link\b[^>]*rel='stylesheet'[^>]*href='[^']*assets\/[^']*'[^>]*>/gi, '');

  // Inject the styles in <head> and script in <body>
  const styleTag = `<style>${cssContent}</style>`;
  const scriptTag = `<script type="module">${jsContent}</script>`;

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${styleTag}</head>`);
  } else {
    html = html + styleTag;
  }

  if (html.includes('</body>')) {
    html = html.replace('</body>', `${scriptTag}</body>`);
  } else {
    html = html + scriptTag;
  }

  // Save as public-media-tool-full.html at project root
  fs.writeFileSync('public-media-tool-full.html', html, 'utf8');
  console.log('Successfully created public-media-tool-full.html!');
  
  // Clean up temp directory
  fs.rmSync('dist-single', { recursive: true, force: true });
}

run().catch(err => {
  console.error('Error during single file build:', err);
  process.exit(1);
});
