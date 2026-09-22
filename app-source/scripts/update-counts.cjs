const fs = require('fs');
const path = require('path');

function updateCounts() {
  console.log('--- RUNNING BUILD-TIME METADATA SYNC ---');

  // 1. Read Search Index to count total tools
  const searchIndexPath = path.resolve(__dirname, '../src/lib/search-index.ts');
  if (!fs.existsSync(searchIndexPath)) {
    console.error('Error: search-index.ts not found at ' + searchIndexPath);
    process.exit(1);
  }

  const searchIndexContent = fs.readFileSync(searchIndexPath, 'utf8');
  const declIndex = searchIndexContent.indexOf('export const SEARCH_INDEX');
  if (declIndex === -1) {
    console.error('Error: Could not find SEARCH_INDEX declaration in search-index.ts');
    process.exit(1);
  }
  const startIndex = searchIndexContent.indexOf('[', declIndex);
  const endIndex = searchIndexContent.lastIndexOf(']') + 1;
  if (startIndex === -1 || endIndex === 0) {
    console.error('Error: Could not parse SEARCH_INDEX array.');
    process.exit(1);
  }

  const arrayText = searchIndexContent.substring(startIndex, endIndex);
  let totalTools = 15267; // Fallback
  try {
    // Safely evaluate the array literal inside Node context
    const searchIndex = eval(arrayText);
    if (Array.isArray(searchIndex)) {
      totalTools = searchIndex.length;
    }
  } catch (err) {
    console.error('Warning: Failed to eval search-index.ts, using fallback count.', err);
  }

  console.log(`Dynamic count detected: ${totalTools.toLocaleString()} tools`);

  // 2. Update index.html
  const indexHtmlPath = path.resolve(__dirname, '../index.html');
  if (fs.existsSync(indexHtmlPath)) {
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
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

    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log('Successfully updated index.html metadata tags!');
  }

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
