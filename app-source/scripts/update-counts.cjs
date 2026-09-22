const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function updateCounts() {
  console.log('--- RUNNING BUILD-TIME METADATA SYNC ---');

  let totalTools = 1516;
  try {
    const output = execSync(`bun -e "import { WORKING_TOOLS } from './src/lib/tools-data/index'; console.log(WORKING_TOOLS.length);"`, {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8'
    }).trim();
    const parsed = parseInt(output, 10);
    if (!isNaN(parsed) && parsed > 0) {
      totalTools = parsed;
    }
  } catch (err) {
    console.error('Warning: Failed to evaluate WORKING_TOOLS.length via bun, using fallback count 1516.', err);
  }

  console.log(`Dynamic count detected: ${totalTools.toLocaleString()} tools`);

  // 2. Update index.html (both root and app-source if exists)
  const appSourceIndexHtmlPath = path.resolve(__dirname, '../index.html');
  const rootIndexHtmlPath = path.resolve(__dirname, '../../index.html');

  [appSourceIndexHtmlPath, rootIndexHtmlPath].forEach((htmlPath) => {
    if (fs.existsSync(htmlPath)) {
      let indexHtml = fs.readFileSync(htmlPath, 'utf8');
      
      // Replace description meta tag
      indexHtml = indexHtml.replace(
        /<meta name="description" content=".*?" \/>/g,
        `<meta name="description" content="${totalTools.toLocaleString()}+ free browser-based tools. Simple. Private. Fast. No AI, no signup required, 100% client-side execution." />`
      );

      // Replace og:description meta tag
      indexHtml = indexHtml.replace(
        /<meta property="og:description" content=".*?" \/>/g,
        `<meta property="og:description" content="${totalTools.toLocaleString()}+ free browser-based tools. Simple. Private. Fast. No AI, no signup required, 100% client-side execution." />`
      );

      fs.writeFileSync(htmlPath, indexHtml, 'utf8');
      console.log(`Successfully updated ${htmlPath} metadata tags!`);
    }
  });

  // 3. Update metadata.json (both root and app-source if exists)
  const rootMetadataPath = path.resolve(__dirname, '../../metadata.json');
  const appSourceMetadataPath = path.resolve(__dirname, '../metadata.json');
  
  [rootMetadataPath, appSourceMetadataPath].forEach((metaPath) => {
    if (fs.existsSync(metaPath)) {
      const metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      metadata.description = `Free Browser-Based Tools. Simple. Private. Fast. Over ${totalTools.toLocaleString()} free browser-based tools with zero server uploads.`;
      fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');
      console.log(`Successfully updated ${metaPath} description!`);
    }
  });

  // 4. Update README.md
  const readmePath = path.resolve(__dirname, '../README.md');
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, 'utf8');
    
    // Replace "with 500+ free" or similar counts
    readme = readme.replace(
      /Premium web app with \d+(?:,\d+)?\+? free/g,
      `Premium web app with ${totalTools.toLocaleString()}+ free`
    );

    fs.writeFileSync(readmePath, readme, 'utf8');
    console.log('Successfully updated README.md counts!');
  }

  console.log('--- METADATA SYNC COMPLETED SUCCESSFULLY ---');
}

updateCounts();
