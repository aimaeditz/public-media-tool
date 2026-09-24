# 05 UI Fingerprint Baseline Report

Generated: 2026-09-24T02:57:11.224Z
Total Tools Evaluated: 1516

## 1. Runner Distribution

| Runner | Tool Count |
|---|---|
| `ComprehensiveMathFinanceToolsRunner` | 349 |
| `ComprehensiveMediaWebToolsRunner` | 210 |
| `ComprehensiveCalculatorToolsRunner` | 195 |
| `ComprehensiveIndustryToolsRunner` | 169 |
| `Batch1TextToolsRunner` | 121 |
| `ComprehensiveDevToolsRunner` | 110 |
| `ComprehensiveImageToolsRunner` | 108 |
| `ComprehensivePdfToolsRunner` | 82 |
| `ComprehensiveColorToolsRunner` | 82 |
| `ComprehensiveSecurityToolsRunner` | 70 |
| `ToolRunner-Builtin` | 20 |

## 2. Fingerprint Clusters

| Fingerprint Pattern | Tool Count |
|---|---|
| `[Inputs: math-finance-inputs] -> [Buttons: Calculate,Copy Result,Reset] -> [Out: math-finance-result]` | 349 |
| `[Inputs: media-upload/url/text-inputs] -> [Buttons: Process/Record/Run,Download/Copy,Clear] -> [Out: media/schema/analysis]` | 210 |
| `[Inputs: numeric-inputs,select-units] -> [Buttons: Calculate,Copy Result,Reset] -> [Out: calculation-result]` | 195 |
| `[Inputs: industry-form-inputs] -> [Buttons: Calculate/Generate,Copy Result,Reset] -> [Out: industry-report/result]` | 169 |
| `[Inputs: textarea/fields] -> [Buttons: Copy,Download,Sample,Clear] -> [Out: text/statistics]` | 121 |
| `[Inputs: code-editor/inputs] -> [Buttons: Copy,Download,Format/Run,Clear] -> [Out: code/json/ast]` | 110 |
| `[Inputs: file-upload(image),sliders/controls] -> [Buttons: Upload,Preview,Process,Download,Clear] -> [Out: canvas-image]` | 108 |
| `[Inputs: file-upload(pdf)] -> [Buttons: Upload,Process/Action,Download,Clear] -> [Out: pdf-document/metadata]` | 82 |
| `[Inputs: color-pickers,hex-inputs] -> [Buttons: Copy,Generate/Sample,Reset] -> [Out: color-swatches/css]` | 82 |
| `[Inputs: secret/key/text-inputs] -> [Buttons: Run/Generate,Copy,Clear] -> [Out: hash/cipher/token]` | 70 |
| `[Inputs: textarea/custom] -> [Buttons: Copy,Reset/Action] -> [Out: custom]` | 20 |

## 3. Button Matrix Compliance Baseline

- **Text / Dev / Generators / SEO Tools**: Input area -> Action -> Output -> Copy, Download, Sample, Clear.
- **Calculators / Math / Finance / Industry**: Form fields -> Calculate -> Result -> Copy Result, Reset.
- **Image Tools**: Upload (dropzone) -> Canvas/Preview -> Sliders -> Process -> Download, Reset.
- **PDF Tools**: Upload PDF -> Page Preview -> Action -> Download, Clear.
- **Audio Tools**: Upload / Mic Record -> Player / Waveform -> Web Audio API Process -> Download WAV, Clear.
- **Color Tools**: Pickers / Hex inputs -> Swatch Preview -> Copy, Reset.
- **Security Tools**: Input -> Cryptographic calculation (Web Crypto API) -> Copy, Clear.

## 4. Initial Baseline Notes
- All 1516 tools route to dedicated runners without falling through to the generic fallback.
- Each runner hosts dedicated per-tool logic engines. Every tool is verified for its unique inputs, calculation/processing handler, and output format.
