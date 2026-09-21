#!/usr/bin/env bash
# Build project and push dist folder to gh-pages branch
set -e

echo "Building project..."
npm run build

echo "Adding dist folder to git..."
git add dist -f

echo "Committing deployment build..."
git commit -m "Deploy to GitHub Pages" || true

echo "Pushing subtree dist to gh-pages branch..."
git subtree push --prefix dist origin gh-pages

echo "Deployment complete!"
