# Project Architecture & Routing Map

## 1. Project Directory Structure
- **Root Directory (`/`)**: Static output published directly via GitHub Pages (Branch: `main`, Folder: `/(root)`). Contains root build files (`index.html`, `404.html`, `assets/`, `sitemap.xml`, `robots.txt`, `README.md`, `package.json`, `tsconfig.json`).
- **Source Directory (`/app-source/`)**: Contains all source code, components, pages, category definitions, assets, and build scripts.
  - `app-source/src/`:
    - `components/layout/`: Navbar, Footer, SearchModal
    - `components/sections/`: Landing page sections (HeroSection, CategoriesSection, PopularTools, etc.)
    - `components/tools/`: Tool execution runners (`ToolRunner.tsx` and 10 domain runners)
    - `lib/`: Store, search index, utility functions, SEO handlers, type definitions
    - `lib/data/category-chunks/`: 52 modular category data chunk files defining 1516 tools
    - `pages/`: Page views (HomePage, ToolsPage, ToolDetailPage, CategoriesPage, CategoryDetailPage, legal pages)
  - `app-source/scripts/`: Build helpers, category generators, dedup checkers, verification scripts
  - `app-source/scan-reports/`: Project audit, tool-by-tool logs, pattern groups, and progress checkpoints

## 2. Data Flow
1. **Tool Definitions**: Each of the 52 categories has a chunk in `app-source/src/lib/data/category-chunks/<category-name>.ts`.
2. **Aggregation**: `app-source/src/lib/tools-data/index.ts` imports all 52 chunks and aggregates them into `WORKING_TOOLS` (1516 tools).
3. **Category Catalog**: `app-source/src/lib/categories.ts` specifies the 52 category metadata entries with IDs, slugs, names, icons, and descriptions.
4. **Search Index**: `app-source/src/lib/search-index.ts` indexes all 1516 tools with keywords, slugs, and summaries for instant search.
5. **State Store**: `app-source/src/lib/tools-store.ts` (Zustand) loads tools, category filters, search states, and favorites.

## 3. Tool Routing Architecture
The central router is `app-source/src/components/tools/ToolRunner.tsx`.
It inspects `tool.slug` and `tool.category` to dispatch the tool into its designated runner:

- **Built-in Specialized Single-Tool Components (20 tools)**: Directly in `ToolRunner.tsx` (e.g. `word-counter`, `qr-code-generator`, `json-formatter-validator`, `markdown-editor-previewer`, `uuid-generator`, etc.)
- **`Batch1TextToolsRunner.tsx` (121 tools)**:
  - Categories: `Text Tools`, `Text Formatting`, `Text Analysis`, `Text Generators & Encoding`
- **`ComprehensiveImageToolsRunner.tsx` (108 tools)**:
  - Categories: `Image Tools`, `Image Resizing & Cropping`, `Image Optimization & Conversion`, `Photo Filters & Effects`
- **`ComprehensivePdfToolsRunner.tsx` (82 tools)**:
  - Categories: `PDF Tools`, `PDF Inspection & Analysis`, `PDF Document Utilities`, and any tool containing `pdf` in slug or name
- **`ComprehensiveDevToolsRunner.tsx` (110 tools)**:
  - Categories: `Developer Tools`, `Code Formatters`, `Web & API Utilities`, `Data & Schema Tools`
- **`ComprehensiveCalculatorToolsRunner.tsx` (195 tools)**:
  - Categories: `Calculator Tools`, `Converter Tools`, `Financial Calculators`, `Everyday Calculators`, `Math Calculators`, `Measurement Converters`, `Scientific Converters`
- **`ComprehensiveColorToolsRunner.tsx` (82 tools)**:
  - Categories: `Color Tools`, `Color Palettes & Contrast`, `Color Converters & Gradients`
- **`ComprehensiveSecurityToolsRunner.tsx` (70 tools)**:
  - Categories: `Security Tools`, `Cryptography & Hashing`, `Password & Security Tools`
- **`ComprehensiveMediaWebToolsRunner.tsx` (210 tools)**:
  - Categories: `SEO Tools`, `SERP & Search Optimization`, `Meta Tags & Structured Data`, `Content & Keyword SEO`, `Social Media Tools`, `Video Tools`, `Audio Tools`, `Audio & Music Production`, `Web Tools`, `File Tools`, `Marketing & Creator Tools`
- **`ComprehensiveMathFinanceToolsRunner.tsx` (349 tools)**:
  - Categories: `Math Tools`, `Finance Tools`, `Business Tools`, `Date & Time`, `Health & Fitness`, `Productivity`, `Education`, `Generators`, `Unit Converters`, `Automotive`
- **`ComprehensiveIndustryToolsRunner.tsx` (169 tools)**:
  - Categories: `Accounting`, `HR & Payroll`, `Freelancing`, `Real Estate`, `Legal Tools`, `Legal & Public Services`, `E-commerce`, `Inventory & Logistics`, `Restaurant & Cafe`, `Dining & Food Service`, `Events & Lifestyle`, `Engineering`, `Engineering Tools`, `Construction`, `Construction Tools`, `Electrical & Solar`, `Agriculture`, `Agriculture & Environment`, `Environment & Energy`, `Marketing & Advertising`, `YouTube Creator Tools`, `Travel Tools`, `Beauty & Salon`, `Wedding & Event`, `Photography`, `Music Production`, `Pets & Animals`, `Government & Public Services`, `Office Administration`, `Office & Project Management`, `Networking`, `Networking & Data Management`, `Data Management`, `Project Management`
- **Fallback `UniversalInteractiveToolRunner` (0 tools fall through)**:
  - Fallback handler for unmapped categories. All 1516 tools are explicitly mapped to runner branches.

## 4. Confirmed Counts
- **Total Tools**: 1516
- **Unique Tool Slugs**: 1516 (0 duplicates)
- **Total Categories**: 52
- **Sitemap XML URLs**: 1577 (1516 tools + 52 categories + 9 static pages)
- **Unrouted / Fallback Tools**: 0
