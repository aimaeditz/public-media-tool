# Public Media Tool

Premium web app with 500+ free non-AI browser-based tools. Simple. Private. Fast. Zero server uploads.

🌐 **Live Demo**: [https://aimaeditz.github.io/public-media-tool/](https://aimaeditz.github.io/public-media-tool/)

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand

---

## 🚀 How to Build & Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
This outputs all production assets to the `dist/` directory, including relative asset paths and a `404.html` fallback for single-page application routing.

---

## 📦 How to Deploy to GitHub Pages

Run the single deploy script:
```bash
./deploy.sh
```
*(On Windows command prompt, run `deploy.bat`)*

This script automatically:
1. Builds the production bundle (`npm run build`)
2. Stages the `dist` directory
3. Pushes the `dist` folder to the `gh-pages` branch using `git subtree push`

---

## ⚙️ GitHub Repository Setup

1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Choose the **`gh-pages`** branch (and **`/ (root)`** folder).
4. Click **Save**.
5. Wait 1–2 minutes, then visit your live site at:  
   `https://aimaeditz.github.io/public-media-tool/`
