# Project Architecture & Routing Map (v5 Baseline)

## 1. Project Directory Structure
- **Root Directory (`/`)**: Static output published directly via GitHub Pages (Branch: `main`, Folder: `/(root)`).
- **Source Directory (`/app-source/`)**: Contains all source code, components, pages, category definitions, assets, and build scripts.
  - `app-source/src/`:
    - `components/layout/`: Navbar, Footer, SearchModal
    - `components/sections/`: Landing page sections
    - `components/tools/`: Tool execution runners (`ToolRunner.tsx` and specialized domain runners)
    - `lib/`: Store, search index, utility functions, SEO handlers, type definitions
    - `lib/data/category-chunks/`: 52 modular category data chunk files defining 1516 tools
    - `pages/`: Page views (HomePage, ToolsPage, ToolDetailPage, CategoriesPage, CategoryDetailPage, legal pages)
  - `app-source/scripts/`: Build helpers, category generators, dedup checkers, verification scripts
  - `app-source/scan-reports/`: Project audit, tool-by-tool logs, specs, and progress checkpoints

## 2. Browser Testing Environment
- **Headless Chromium**: Automated via Puppeteer (Chromium binary in environment)
- **Launch Args**:
  - `--no-sandbox`
  - `--disable-setuid-sandbox`
  - `--use-fake-device-for-media-stream`
  - `--use-fake-ui-for-media-stream`
- **Permissions**: Context granted `['clipboard-read', 'clipboard-write']`
- **Capabilities Verified**:
  - DOM element rendering, click, and typing: WORKING
  - File upload / download buffer inspection: WORKING
  - Web Audio API / AudioContext playback & offline rendering: WORKING
  - Canvas 2D image pixel rendering: WORKING
  - PDF manipulation via pdf-lib and jspdf: WORKING

## 3. Data Flow
1. **Tool Definitions**: 52 chunks in `app-source/src/lib/data/category-chunks/<category-name>.ts`.
2. **Aggregation**: `app-source/src/lib/tools-data/index.ts` imports all 52 chunks and aggregates them into `WORKING_TOOLS` (1516 tools).
3. **Category Catalog**: `app-source/src/lib/categories.ts` specifies the 52 category metadata entries.
4. **Search Index**: `app-source/src/lib/search-index.ts` indexes all 1516 tools with keywords, slugs, and summaries.
5. **State Store**: `app-source/src/lib/tools-store.ts` (Zustand) loads tools, category filters, and search states.

## 4. Tool Routing Architecture in ToolRunner.tsx
- **Direct Built-in Tools (21 tools)**: Handled directly in `ToolRunner.tsx`
- **Specialized Runners**:
  - `AccountingToolsRunner.tsx`: Category `Accounting`
  - `AudioMusicToolsRunner.tsx`: Categories `Audio Tools`, `Audio & Music Production`
  - `AutomotiveToolsRunner.tsx`: Category `Automotive`
  - `Batch1TextToolsRunner.tsx`: Categories `Text Tools`, `Text Formatting`, `Text Analysis`, `Text Generators & Encoding`
  - `ComprehensiveImageToolsRunner.tsx`: Categories `Image Tools`, `Image Resizing & Cropping`, `Image Optimization & Conversion`, `Photo Filters & Effects`
  - `ComprehensivePdfToolsRunner.tsx`: Categories `PDF Tools`, `PDF Inspection & Analysis`, `PDF Document Utilities`, and tools with `pdf` in slug or name
  - `ComprehensiveDevToolsRunner.tsx`: Categories `Developer Tools`, `Code Formatters`, `Web & API Utilities`, `Data & Schema Tools`
  - `ComprehensiveCalculatorToolsRunner.tsx`: Categories `Calculator Tools`, `Converter Tools`, `Financial Calculators`, `Everyday Calculators`, `Math Calculators`, `Measurement Converters`, `Scientific Converters`
  - `ComprehensiveColorToolsRunner.tsx`: Categories `Color Tools`, `Color Palettes & Contrast`, `Color Converters & Gradients`
  - `ComprehensiveSecurityToolsRunner.tsx`: Categories `Security Tools`, `Cryptography & Hashing`, `Password & Security Tools`
  - `ComprehensiveMediaWebToolsRunner.tsx`: Categories `SEO Tools`, `SERP & Search Optimization`, `Meta Tags & Structured Data`, `Content & Keyword SEO`, `Social Media Tools`, `Video Tools`, `Web Tools`, `File Tools`, `Marketing & Creator Tools`
  - `ComprehensiveMathFinanceToolsRunner.tsx`: Categories `Math Tools`, `Finance Tools`, `Business Tools`, `Date & Time`, `Health & Fitness`, `Productivity`, `Education`, `Generators`, `Unit Converters`
  - `ComprehensiveIndustryToolsRunner.tsx`: Industry, Trade, Civic, Legal, Real Estate, Construction, Engineering, etc.
- **Fallback Runner**: `UniversalInteractiveToolRunner` in `ToolRunner.tsx` (all 1516 tools mapped; 0 unmapped)

## 5. Verified Metric Baseline
- Total tools in `WORKING_TOOLS`: 1516
- Unique slugs: 1516
- Total categories: 52
- ORDER.md entries: exactly 1516
