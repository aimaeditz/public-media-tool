# ⚠️ PERMANENT PROJECT RULES — DO NOT CHANGE, EVEN IF IT SEEMS HELPFUL

This project is a 100% static, client-side-only site. These rules are permanent and must never be changed by any future edit, "helpful" refactor, or template default, no matter what:

1. There is NO backend server. Never create server.ts, an Express server, an API server, or any backend file.
2. Deployment method is PERMANENTLY: GitHub Pages → Settings → Pages → Source = "Deploy from a branch" → Branch = `main` → Folder = `/(root)`. NEVER use GitHub Actions. NEVER use a `gh-pages` branch. NEVER create `deploy.sh` / `deploy.bat` / `dist/` folder workflows.
3. All real source code lives inside `app-source/` only. The repository root contains ONLY the built static output.
4. Before every push, run `npm run build:root` from inside `app-source/` to refresh the root with the latest build.
5. `app-source/vite.config.ts` base must stay `/public-media-tool/`. `app-source/src/App.tsx` BASE_PATH must stay `/public-media-tool`.

If any of the above appears to have changed or gone missing, that is a mistake — restore it, do not build on top of the wrong state.

---

# Public Media Tool

Premium web app with 1,516+ free non-AI browser-based tools. Simple. Private. Fast. Zero server uploads.

🌐 **Live Website**: [https://publicmediatool.com/](https://publicmediatool.com/)  
*(Legacy GitHub Pages mirror: https://aimaeditz.github.io/public-media-tool/)*

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
From the repository root:
```bash
npm install
```
*(Or directly inside `app-source/`: `cd app-source && npm install`)*

### 2. Start Development Server
From the repository root:
```bash
npm run dev
```
*(Runs the Vite dev server inside `app-source` on port 3000)*

### 3. Build Static Output to Repository Root
From the repository root:
```bash
npm run build
```
*(Or from inside `app-source/`: `npm run build:root`)*

This builds all production assets and outputs them directly to the repository root (`index.html`, `assets/`, `404.html`, etc.) for direct deployment.

---

## 📦 How to Deploy to GitHub Pages

1. In `app-source/`, run the build command to generate fresh static assets into the root:
   ```bash
   npm run build:root
   ```
   *(or run `npm run build` from the repo root)*
2. Commit all changes (including the updated root files: `index.html`, `assets/`, `404.html`) and push to the `main` branch:
   ```bash
   git add .
   git commit -m "Update static site build"
   git push origin main
   ```

---

## ⚙️ GitHub Repository Setup

1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **Deploy from a branch**.
3. Choose the **`main`** branch and the **`/(root)`** folder.
4. Click **Save**.
5. Wait 1–2 minutes, then visit your live site at:  
   `https://aimaeditz.github.io/public-media-tool/`
