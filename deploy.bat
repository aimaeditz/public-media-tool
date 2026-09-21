@echo off
echo Building project...
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

echo Adding dist folder to git...
git add dist -f

echo Committing deployment build...
git commit -m "Deploy to GitHub Pages"

echo Pushing subtree dist to gh-pages branch...
git subtree push --prefix dist origin gh-pages

echo Deployment complete!
