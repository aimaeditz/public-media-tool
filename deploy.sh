#!/usr/bin/env bash
# Build project and push dist folder to gh-pages branch
set -e

echo "Building project..."
npm run build

echo "Syncing live directory..."
mkdir -p live
cp -r dist/* live/ || true

echo "Adding dist and live folder to git..."
git add dist live -f

echo "Committing deployment build..."
git commit -m "Deploy to GitHub Pages" || true

echo "Pushing subtree dist to gh-pages branch..."
git subtree push --prefix dist origin gh-pages

echo "Deployment complete!"
