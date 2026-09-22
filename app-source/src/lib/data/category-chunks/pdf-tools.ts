import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "pdf-page-inspector",
    "slug": "pdf-page-inspector",
    "name": "PDF Page & Layout Inspector",
    "shortDesc": "Inspect PDF page counts, document structure, dimensions, and metadata.",
    "description": "Inspect PDF file details, page counts, paper orientation, encryption, and embedded metadata in browser.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 68400,
    "tags": [
      "pdf",
      "inspector",
      "page count",
      "metadata",
      "layout"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF Document",
        "desc": "Drag and drop any PDF file."
      },
      {
        "step": 2,
        "title": "Inspect Details",
        "desc": "View page count, title, author, creation date, and paper sizes."
      },
      {
        "step": 3,
        "title": "Copy Summary",
        "desc": "Copy document summary metadata."
      }
    ],
    "faqs": [
      {
        "question": "Are PDF contents sent to a server?",
        "answer": "No, PDF file parsing occurs in your browser using client-side JavaScript."
      }
    ]
  },
  {
    "id": "pdf-word-counter",
    "slug": "pdf-word-counter",
    "name": "PDF Word & Character Counter",
    "shortDesc": "Extract and count total words, characters, and pages in any PDF document.",
    "description": "Parse PDF document text streams to compute accurate word counts, character counts, and reading time estimates.",
    "category": "PDF Tools",
    "iconName": "FileText",
    "usageCount": 84200,
    "tags": [
      "pdf",
      "word count",
      "character count",
      "reading time",
      "text"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF file",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Parse text stream",
        "desc": "Client-side parser counts words."
      },
      {
        "step": 3,
        "title": "Read statistics",
        "desc": "Copy total word and character counts."
      }
    ],
    "faqs": [
      {
        "question": "Does it work on scanned image PDFs?",
        "answer": "Text must be selectable vector/font text rather than raw flat images."
      }
    ]
  },
  {
    "id": "pdf-page-rotator",
    "slug": "pdf-page-rotator",
    "name": "PDF Page Orientation Rotator",
    "shortDesc": "Rotate upside-down PDF pages 90°, 180°, or 270° clockwise.",
    "description": "Fix portrait vs landscape orientation errors on individual PDF pages.",
    "category": "PDF Tools",
    "iconName": "RotateCcw",
    "usageCount": 52100,
    "tags": [
      "pdf",
      "rotate",
      "orientation",
      "landscape",
      "portrait"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select PDF document."
      },
      {
        "step": 2,
        "title": "Click rotate on pages",
        "desc": "Rotate specific or all pages."
      },
      {
        "step": 3,
        "title": "Download rotated PDF",
        "desc": "Save updated PDF layout."
      }
    ],
    "faqs": [
      {
        "question": "Can I rotate just one page?",
        "answer": "Yes, inspect page thumbnails and rotate target pages individually."
      }
    ]
  },
  {
    "id": "pdf-metadata-viewer",
    "slug": "pdf-metadata-viewer",
    "name": "PDF Metadata & Author Inspector",
    "shortDesc": "View author, creation date, producer software, and PDF keywords.",
    "description": "Inspect hidden document properties, creator software signatures, and modification timestamps.",
    "category": "PDF Tools",
    "iconName": "Search",
    "usageCount": 41200,
    "tags": [
      "pdf",
      "metadata",
      "author",
      "producer",
      "inspector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select PDF."
      },
      {
        "step": 2,
        "title": "View property fields",
        "desc": "Inspect Title, Author, Subject, Keywords."
      },
      {
        "step": 3,
        "title": "Copy metadata text",
        "desc": "Copy summary."
      }
    ],
    "faqs": [
      {
        "question": "What is Producer software?",
        "answer": "The tool or PDF library used to render the PDF file (e.g. Acrobat, Quartz)."
      }
    ]
  },
  {
    "id": "pdf-to-text-extractor",
    "slug": "pdf-to-text-extractor",
    "name": "PDF Plain Text Extractor",
    "shortDesc": "Extract all text content from PDF pages into a clean TXT file.",
    "description": "Extract raw selectable text from multi-page PDF documents without formatting noise.",
    "category": "PDF Tools",
    "iconName": "FileText",
    "usageCount": 91400,
    "tags": [
      "pdf",
      "extract text",
      "txt",
      "converter",
      "content"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF file",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Extract text",
        "desc": "Reads vector font glyph streams."
      },
      {
        "step": 3,
        "title": "Copy or Download .txt",
        "desc": "Save plain text."
      }
    ],
    "faqs": [
      {
        "question": "Are layout columns preserved?",
        "answer": "Reading order algorithms attempt to reconstruct natural paragraph order."
      }
    ]
  },
  {
    "id": "pdf-page-deleter",
    "slug": "pdf-page-deleter",
    "name": "PDF Page Selection Deleter",
    "shortDesc": "Select and remove unwanted cover pages, blank pages, or specific pages from PDFs.",
    "description": "Select page thumbnails to delete confidential or irrelevant pages from PDF documents.",
    "category": "PDF Tools",
    "iconName": "Scissors",
    "usageCount": 61900,
    "tags": [
      "pdf",
      "delete pages",
      "remove page",
      "editor",
      "pdf"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Click pages to remove",
        "desc": "Mark page numbers."
      },
      {
        "step": 3,
        "title": "Download trimmed PDF",
        "desc": "Save document without deleted pages."
      }
    ],
    "faqs": [
      {
        "question": "Are remaining pages renumbered?",
        "answer": "Yes, page index shifts automatically."
      }
    ]
  },
  {
    "id": "pdf-encryption-status-checker",
    "slug": "pdf-encryption-status-checker",
    "name": "PDF Security & Password Status Checker",
    "shortDesc": "Check whether a PDF has password protection, printing, or copying restrictions.",
    "description": "Inspect PDF document security permissions, owner passwords, and encryption flags.",
    "category": "PDF Tools",
    "iconName": "ShieldCheck",
    "usageCount": 38200,
    "tags": [
      "pdf",
      "encryption",
      "password",
      "security",
      "permissions"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect flags",
        "desc": "Check Print, Copy, Edit, and Annotate flags."
      },
      {
        "step": 3,
        "title": "Read status",
        "desc": "Confirms whether file is encrypted."
      }
    ],
    "faqs": [
      {
        "question": "What is Owner Password vs User Password?",
        "answer": "User passwords block viewing; Owner passwords restrict printing/copying."
      }
    ]
  },
  {
    "id": "pdf-paper-size-checker",
    "slug": "pdf-paper-size-checker",
    "name": "PDF Page Dimensions & Paper Size Checker",
    "shortDesc": "Check exact page dimensions in points, inches, millimeters, and standard sizes (A4, Letter, Legal).",
    "description": "Inspect whether PDF pages are standard US Letter, A4, A3, or custom architectural dimensions.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 45100,
    "tags": [
      "pdf",
      "paper size",
      "a4",
      "letter",
      "dimensions"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Read dimensions",
        "desc": "View mm, inches, points, and paper standard label."
      },
      {
        "step": 3,
        "title": "Verify consistency",
        "desc": "Check if all pages match paper size."
      }
    ],
    "faqs": [
      {
        "question": "What are standard A4 dimensions?",
        "answer": "210 x 297 mm (8.27 x 11.69 inches)."
      }
    ]
  },
  {
    "id": "pdf-font-inspector",
    "slug": "pdf-font-inspector",
    "name": "PDF Embedded Font List Inspector",
    "shortDesc": "List all embedded fonts (Type1, TrueType, CID, Subset) inside PDF documents.",
    "description": "Inspect document typography dependencies and check whether fonts are embedded or missing.",
    "category": "PDF Tools",
    "iconName": "Type",
    "usageCount": 31200,
    "tags": [
      "pdf",
      "fonts",
      "embedded",
      "truetype",
      "typography"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF file",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect font list",
        "desc": "View Helvetica, Times, Arial embedded font dictionaries."
      },
      {
        "step": 3,
        "title": "Verify embedding",
        "desc": "Check for Subset or fully embedded flags."
      }
    ],
    "faqs": [
      {
        "question": "Why does print output look strange when fonts are missing?",
        "answer": "If fonts are not embedded, printers fall back to local substitute fonts."
      }
    ]
  },
  {
    "id": "pdf-page-reorder",
    "slug": "pdf-page-reorder",
    "name": "PDF Page Sequence Reorder Tool",
    "shortDesc": "Drag and drop PDF page thumbnails to reorder document sequence.",
    "description": "Rearrange PDF page sequences with visual drag-and-drop page thumbnail order.",
    "category": "PDF Tools",
    "iconName": "Layers",
    "usageCount": 58400,
    "tags": [
      "pdf",
      "reorder",
      "pages",
      "sequence",
      "organize"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Drag page thumbnails",
        "desc": "Move page 3 before page 1."
      },
      {
        "step": 3,
        "title": "Download reordered PDF",
        "desc": "Save document."
      }
    ],
    "faqs": [
      {
        "question": "Is page quality changed?",
        "answer": "No re-compression happens, page object streams are simply re-indexed."
      }
    ]
  },
  {
    "id": "pdf-grayscale-converter",
    "slug": "pdf-grayscale-converter",
    "name": "PDF Grayscale Preview Inspector",
    "shortDesc": "Preview how color PDF pages will render in monochrome black-and-white print.",
    "description": "Check color contrast and legibility before printing PDF files on black-and-white printers.",
    "category": "PDF Tools",
    "iconName": "Eye",
    "usageCount": 34100,
    "tags": [
      "pdf",
      "grayscale",
      "print",
      "monochrome",
      "black white"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select color document."
      },
      {
        "step": 2,
        "title": "Toggle Grayscale View",
        "desc": "Inspect luminance values."
      },
      {
        "step": 3,
        "title": "Verify text legibility",
        "desc": "Ensure high contrast."
      }
    ],
    "faqs": [
      {
        "question": "Why test grayscale print previews?",
        "answer": "To ensure yellow or light blue text does not become invisible on monochrome printouts."
      }
    ]
  },
  {
    "id": "pdf-blank-page-detector",
    "slug": "pdf-blank-page-detector",
    "name": "PDF Blank Page Spotter & Inspector",
    "shortDesc": "Automatically detect blank pages with zero text or graphics in PDF files.",
    "description": "Scan large PDF documents to locate accidentally inserted blank scanner pages.",
    "category": "PDF Tools",
    "iconName": "Search",
    "usageCount": 29800,
    "tags": [
      "pdf",
      "blank page",
      "detector",
      "scan",
      "cleaner"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload multi-page PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Run scan",
        "desc": "Inspector highlights empty page numbers."
      },
      {
        "step": 3,
        "title": "Remove blank pages",
        "desc": "Download clean PDF."
      }
    ],
    "faqs": [
      {
        "question": "How is a blank page detected?",
        "answer": "By checking for absence of vector paths, font streams, and image objects."
      }
    ]
  },
  {
    "id": "pdf-watermark-preview",
    "slug": "pdf-watermark-preview",
    "name": "PDF Watermark Overlay Previewer",
    "shortDesc": "Simulate text watermarks (\"CONFIDENTIAL\", \"DRAFT\") over PDF pages.",
    "description": "Preview diagonal red \"CONFIDENTIAL\" or \"DRAFT\" stamp overlays across PDF pages.",
    "category": "PDF Tools",
    "iconName": "ShieldCheck",
    "usageCount": 42100,
    "tags": [
      "pdf",
      "watermark",
      "confidential",
      "draft",
      "overlay"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Type watermark text",
        "desc": "E.g. DRAFT or CONFIDENTIAL."
      },
      {
        "step": 3,
        "title": "Preview & Download",
        "desc": "Save watermarked document."
      }
    ],
    "faqs": [
      {
        "question": "Can I set diagonal angle?",
        "answer": "Yes, standard 45° diagonal angle or horizontal."
      }
    ]
  },
  {
    "id": "pdf-image-extractor-preview",
    "slug": "pdf-image-extractor-preview",
    "name": "PDF Embedded Image Count Inspector",
    "shortDesc": "Detect and count all embedded JPG/PNG raster photos inside a PDF document.",
    "description": "Locate embedded photo objects, resolution specs, and image dimensions inside PDFs.",
    "category": "PDF Tools",
    "iconName": "Image",
    "usageCount": 49200,
    "tags": [
      "pdf",
      "images",
      "count",
      "embedded photo",
      "inspector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect image objects",
        "desc": "View count, formats, and pixel bounds."
      },
      {
        "step": 3,
        "title": "Copy summary",
        "desc": "Copy image report."
      }
    ],
    "faqs": [
      {
        "question": "Does it detect inline vector shapes?",
        "answer": "Separates raster photo objects from vector path instructions."
      }
    ]
  },
  {
    "id": "pdf-bookmark-reader",
    "slug": "pdf-bookmark-reader",
    "name": "PDF Outline & Bookmark Tree Inspector",
    "shortDesc": "Inspect document outline table of contents and internal page bookmarks.",
    "description": "View hierarchical PDF bookmarks, chapter outlines, and jump link structures.",
    "category": "PDF Tools",
    "iconName": "List",
    "usageCount": 28400,
    "tags": [
      "pdf",
      "bookmarks",
      "outline",
      "table of contents",
      "tree"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF document",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Expand bookmark tree",
        "desc": "View chapter titles and target pages."
      },
      {
        "step": 3,
        "title": "Export bookmark list",
        "desc": "Copy outline hierarchy."
      }
    ],
    "faqs": [
      {
        "question": "What if PDF has no bookmarks?",
        "answer": "Displays \"No Bookmark Tree Object Found\" status."
      }
    ]
  },
  {
    "id": "pdf-annotation-reader",
    "slug": "pdf-annotation-reader",
    "name": "PDF Markup & Comments Counter",
    "shortDesc": "Scan PDF documents for highlight markup, text notes, and sticky annotations.",
    "description": "Audit document annotations, reviewer comments, and highlighted text callouts.",
    "category": "PDF Tools",
    "iconName": "FileText",
    "usageCount": 26100,
    "tags": [
      "pdf",
      "annotations",
      "comments",
      "notes",
      "highlights"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload annotated PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "View comment list",
        "desc": "Inspect author names and text notes."
      },
      {
        "step": 3,
        "title": "Export comments",
        "desc": "Copy review notes."
      }
    ],
    "faqs": [
      {
        "question": "Does it support sticky notes?",
        "answer": "Yes, parses Text, Highlight, Underline, and Pop-up annotations."
      }
    ]
  },
  {
    "id": "pdf-version-checker",
    "slug": "pdf-version-checker",
    "name": "PDF Specification Version Inspector",
    "shortDesc": "Check exact PDF header version (PDF 1.3, 1.4, 1.7, 2.0).",
    "description": "Verify PDF specification version numbers for printer compatibility and archival standards.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 31800,
    "tags": [
      "pdf version",
      "spec",
      "pdf 1.7",
      "pdf 2.0",
      "inspector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF file",
        "desc": "Select PDF."
      },
      {
        "step": 2,
        "title": "Read header version",
        "desc": "Inspect %PDF-1.x version string."
      },
      {
        "step": 3,
        "title": "Check features",
        "desc": "Confirms supported PDF features."
      }
    ],
    "faqs": [
      {
        "question": "What is PDF 2.0?",
        "answer": "ISO 32000-2 specification standard released in 2017."
      }
    ]
  },
  {
    "id": "pdf-linearization-checker",
    "slug": "pdf-linearization-checker",
    "name": "PDF Fast Web View Inspector",
    "shortDesc": "Check if a PDF is linearized for fast web page streaming.",
    "description": "Inspect whether PDF files are optimized for progressive web page rendering.",
    "category": "PDF Tools",
    "iconName": "Zap",
    "usageCount": 22100,
    "tags": [
      "pdf",
      "fast web view",
      "linearized",
      "streaming",
      "web"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect linear dictionary",
        "desc": "Check for Fast Web View flag."
      },
      {
        "step": 3,
        "title": "Read recommendation",
        "desc": "Learn how to optimize web delivery."
      }
    ],
    "faqs": [
      {
        "question": "What is Fast Web View?",
        "answer": "Structure where page 1 data appears first in file stream so browsers display it immediately."
      }
    ]
  },
  {
    "id": "pdf-form-field-inspector",
    "slug": "pdf-form-field-inspector",
    "name": "PDF Interactive Form Field Detector",
    "shortDesc": "Inspect AcroForm interactive form fields (text boxes, checkboxes, radio buttons).",
    "description": "Count fillable text inputs, checkbox fields, and dropdown selections in PDF forms.",
    "category": "PDF Tools",
    "iconName": "CheckSquare",
    "usageCount": 35400,
    "tags": [
      "pdf",
      "acroform",
      "form fields",
      "inputs",
      "checkboxes"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF form",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect field table",
        "desc": "View field names, types, and values."
      },
      {
        "step": 3,
        "title": "Export field map",
        "desc": "Copy form layout map."
      }
    ],
    "faqs": [
      {
        "question": "What is AcroForm?",
        "answer": "Standard interactive form object structure inside PDF documents."
      }
    ]
  },
  {
    "id": "pdf-margin-calculator",
    "slug": "pdf-margin-calculator",
    "name": "PDF Page Margin & Print Area Calculator",
    "shortDesc": "Measure document top, bottom, left, and right printing margin gaps.",
    "description": "Calculate page margin widths in inches and points for binder printing.",
    "category": "PDF Tools",
    "iconName": "Maximize2",
    "usageCount": 24800,
    "tags": [
      "pdf",
      "margins",
      "print area",
      "binding",
      "layout"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect page box boundaries",
        "desc": "View MediaBox vs CropBox margin deltas."
      },
      {
        "step": 3,
        "title": "Check binding clearance",
        "desc": "Verify gutter space."
      }
    ],
    "faqs": [
      {
        "question": "How much gutter margin is needed for spiral binding?",
        "answer": "At least 0.5 inches (36 pt) on inner page edge."
      }
    ]
  },
  {
    "id": "pdf-dpi-calculator",
    "slug": "pdf-dpi-calculator",
    "name": "PDF Print Quality & Resolution DPI Calculator",
    "shortDesc": "Calculate effective print DPI resolution for embedded photo images.",
    "description": "Verify if embedded photos meet 300 DPI high-quality press print standards.",
    "category": "PDF Tools",
    "iconName": "Search",
    "usageCount": 39100,
    "tags": [
      "pdf",
      "dpi",
      "print quality",
      "resolution",
      "300dpi"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Calculate image DPI",
        "desc": "Divides pixel dimensions by physical page display inches."
      },
      {
        "step": 3,
        "title": "Verify print readiness",
        "desc": "Green flag for 300+ DPI, warning for <150 DPI."
      }
    ],
    "faqs": [
      {
        "question": "What is minimum DPI for crisp printing?",
        "answer": "300 DPI is standard commercial printing resolution."
      }
    ]
  },
  {
    "id": "pdf-a-compliance-checker",
    "slug": "pdf-a-compliance-checker",
    "name": "PDF/A Archival Standard Inspector",
    "shortDesc": "Inspect PDF/A metadata flags for long-term document preservation compliance.",
    "description": "Check whether a PDF adheres to PDF/A-1b or PDF/A-2b archival standards.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 28900,
    "tags": [
      "pdf/a",
      "archival",
      "compliance",
      "preservation",
      "standards"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect PDF/A profile",
        "desc": "Check XMP Metadata pdfaid schema tags."
      },
      {
        "step": 3,
        "title": "Read report",
        "desc": "Confirms archival compliance."
      }
    ],
    "faqs": [
      {
        "question": "What is PDF/A?",
        "answer": "ISO standardized version designed for digital preservation without external font/color dependencies."
      }
    ]
  },
  {
    "id": "pdf-compression-estimator",
    "slug": "pdf-compression-estimator",
    "name": "PDF File Size & Compression Estimator",
    "shortDesc": "Analyze PDF stream breakdown to estimate potential compression savings.",
    "description": "Inspect bytes spent on fonts, embedded images, vector paths, and metadata streams.",
    "category": "PDF Tools",
    "iconName": "BarChart2",
    "usageCount": 47200,
    "tags": [
      "pdf",
      "compression",
      "file size",
      "bytes",
      "optimization"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF document",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect stream graph",
        "desc": "View breakdown of photos vs text vs fonts."
      },
      {
        "step": 3,
        "title": "Read optimization tips",
        "desc": "Discover how to shrink file size."
      }
    ],
    "faqs": [
      {
        "question": "What consumes most space in PDFs?",
        "answer": "Uncompressed high-resolution raster images usually account for 80%+ of file size."
      }
    ]
  },
  {
    "id": "pdf-split-preview",
    "slug": "pdf-split-preview",
    "name": "PDF Range & Split Range Calculator",
    "shortDesc": "Plan document splitting ranges (e.g. 1-5, 6-12, 13-20).",
    "description": "Calculate page count splits and page ranges for multi-volume splitting.",
    "category": "PDF Tools",
    "iconName": "Scissors",
    "usageCount": 38100,
    "tags": [
      "pdf",
      "split",
      "page range",
      "volumes",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Set split intervals",
        "desc": "Specify split every N pages or page ranges."
      },
      {
        "step": 3,
        "title": "Preview split files",
        "desc": "View resulting file bundle names."
      }
    ],
    "faqs": [
      {
        "question": "Can I split by custom ranges?",
        "answer": "Yes, comma-separated page ranges like 1-3, 4-10."
      }
    ]
  },
  {
    "id": "pdf-merge-order-planner",
    "slug": "pdf-merge-order-planner",
    "name": "PDF Document Merge Order Planner",
    "shortDesc": "Plan document combining order and calculate final combined page counts.",
    "description": "Organize multi-file PDF merge queues, check file order, and calculate final combined page totals.",
    "category": "PDF Tools",
    "iconName": "Layers",
    "usageCount": 51200,
    "tags": [
      "pdf",
      "merge",
      "combine",
      "order",
      "planner"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload multiple PDFs",
        "desc": "Select documents."
      },
      {
        "step": 2,
        "title": "Drag files in queue",
        "desc": "Arrange desired sequence."
      },
      {
        "step": 3,
        "title": "View total combined pages",
        "desc": "Inspect sum page count."
      }
    ],
    "faqs": [
      {
        "question": "Is total file size calculated?",
        "answer": "Yes, sums individual file sizes."
      }
    ]
  },
  {
    "id": "pdf-header-footer-generator",
    "slug": "pdf-header-footer-generator",
    "name": "PDF Header & Footer Text Layout Planner",
    "shortDesc": "Design running headers, footers, page numbers, and document titles.",
    "description": "Calculate running header and footer margin positions for document publishing.",
    "category": "PDF Tools",
    "iconName": "AlignLeft",
    "usageCount": 29400,
    "tags": [
      "pdf",
      "header",
      "footer",
      "page numbers",
      "layout"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter header & footer text",
        "desc": "Type running titles."
      },
      {
        "step": 2,
        "title": "Select placement",
        "desc": "Choose Top-Left, Center, or Right."
      },
      {
        "step": 3,
        "title": "Preview placement",
        "desc": "View page margin alignment."
      }
    ],
    "faqs": [
      {
        "question": "Can page numbers auto-increment?",
        "answer": "Yes, {page} of {total} token placeholders supported."
      }
    ]
  },
  {
    "id": "pdf-page-number-planner",
    "slug": "pdf-page-number-planner",
    "name": "PDF Page Numbering Scheme Planner",
    "shortDesc": "Plan Roman numeral preface pages (i, ii) and Arabic body pages (1, 2, 3).",
    "description": "Design multi-section page numbering schemes with preface Roman numerals.",
    "category": "PDF Tools",
    "iconName": "ListOrdered",
    "usageCount": 23100,
    "tags": [
      "pdf",
      "page numbers",
      "roman numerals",
      "sections",
      "numbering"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set preface range",
        "desc": "Pages 1-4 use i, ii, iii, iv."
      },
      {
        "step": 2,
        "title": "Set body range",
        "desc": "Page 5 starts body Page 1."
      },
      {
        "step": 3,
        "title": "Export numbering plan",
        "desc": "Copy section map."
      }
    ],
    "faqs": [
      {
        "question": "Is this standard for academic books?",
        "answer": "Yes, preface uses lowercase Roman, main chapters use Arabic."
      }
    ]
  },
  {
    "id": "pdf-attachment-inspector",
    "slug": "pdf-attachment-inspector",
    "name": "PDF Embedded File Attachments Inspector",
    "shortDesc": "Scan PDF documents for embedded file attachments (XML, CSV, images).",
    "description": "Inspect embedded files stored inside PDF file package attachments.",
    "category": "PDF Tools",
    "iconName": "FolderArchive",
    "usageCount": 21900,
    "tags": [
      "pdf",
      "attachments",
      "embedded files",
      "package",
      "inspector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Scan attachments",
        "desc": "Inspect embedded filename list and byte sizes."
      },
      {
        "step": 3,
        "title": "Read status",
        "desc": "Confirms embedded file contents."
      }
    ],
    "faqs": [
      {
        "question": "What files are typically attached to PDFs?",
        "answer": "Invoices often attach raw ZUGFeRD/Factur-X XML data."
      }
    ]
  },
  {
    "id": "pdf-color-space-inspector",
    "slug": "pdf-color-space-inspector",
    "name": "PDF Color Space (RGB/CMYK) Inspector",
    "shortDesc": "Check whether PDF graphics use RGB, CMYK press, or Grayscale color spaces.",
    "description": "Verify if PDF assets are formatted in commercial CMYK press colors or screen RGB.",
    "category": "PDF Tools",
    "iconName": "Palette",
    "usageCount": 31200,
    "tags": [
      "pdf",
      "cmyk",
      "rgb",
      "color space",
      "print"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect color dictionaries",
        "desc": "View DeviceCMYK, DeviceRGB, or ICCBased flags."
      },
      {
        "step": 3,
        "title": "Verify for press",
        "desc": "Ensure commercial printers receive CMYK files."
      }
    ],
    "faqs": [
      {
        "question": "Why do printers require CMYK?",
        "answer": "Cyan, Magenta, Yellow, Black are physical ink mixing primaries."
      }
    ]
  },
  {
    "id": "pdf-duplex-print-planner",
    "slug": "pdf-duplex-print-planner",
    "name": "PDF Double-Sided Duplex Print Layout Planner",
    "shortDesc": "Plan odd/even page duplex flip orientation for double-sided printing.",
    "description": "Prevent upside-down back pages when double-sided printing landscape or portrait PDFs.",
    "category": "PDF Tools",
    "iconName": "RotateCcw",
    "usageCount": 27400,
    "tags": [
      "pdf",
      "duplex",
      "double sided",
      "print",
      "flip"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Choose binding edge",
        "desc": "Long edge flip vs Short edge flip."
      },
      {
        "step": 3,
        "title": "View preview orientation",
        "desc": "Confirms front and back page alignment."
      }
    ],
    "faqs": [
      {
        "question": "When to use Short Edge Flip?",
        "answer": "For landscape binding or top-bound notepad flipping."
      }
    ]
  },
  {
    "id": "pdf-booklet-imposition-calculator",
    "slug": "pdf-booklet-imposition-calculator",
    "name": "PDF Booklet Saddle-Stitch Imposition Calculator",
    "shortDesc": "Calculate 4-page sheet pairing order (Page 1 & 16, 2 & 15) for folded booklets.",
    "description": "Calculate sheet imposition order for folding printed pages into saddle-stitched booklets.",
    "category": "PDF Tools",
    "iconName": "BookOpen",
    "usageCount": 22900,
    "tags": [
      "pdf",
      "booklet",
      "imposition",
      "saddle stitch",
      "print"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter total page count",
        "desc": "Must be multiple of 4 (e.g. 16 pages)."
      },
      {
        "step": 2,
        "title": "Calculate sheet pairs",
        "desc": "Generates sheet 1 front (16, 1) & back (2, 15)."
      },
      {
        "step": 3,
        "title": "Export sheet sequence",
        "desc": "Copy print imposition guide."
      }
    ],
    "faqs": [
      {
        "question": "Why must booklet page count be divisible by 4?",
        "answer": "Each folded paper sheet contains 4 logical document pages."
      }
    ]
  },
  {
    "id": "pdf-nup-page-grid-planner",
    "slug": "pdf-nup-page-grid-planner",
    "name": "PDF 2-Up / 4-Up Grid Sheet Layout Planner",
    "shortDesc": "Plan multi-page 2-Up or 4-Up per sheet layout grids for printing slide decks.",
    "description": "Arrange 2, 4, or 9 PDF pages per physical printed sheet to save paper.",
    "category": "PDF Tools",
    "iconName": "Grid",
    "usageCount": 36200,
    "tags": [
      "pdf",
      "2-up",
      "4-up",
      "n-up",
      "grid layout"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF slides",
        "desc": "Select presentation file."
      },
      {
        "step": 2,
        "title": "Choose N-Up count",
        "desc": "Select 2-Up, 4-Up, or 6-Up grid."
      },
      {
        "step": 3,
        "title": "Calculate printed sheet count",
        "desc": "Reduces paper consumption."
      }
    ],
    "faqs": [
      {
        "question": "Is margin border added between grid cells?",
        "answer": "Optionally add thin cell borders and divider lines."
      }
    ]
  },
  {
    "id": "pdf-cropping-box-inspector",
    "slug": "pdf-cropping-box-inspector",
    "name": "PDF MediaBox & CropBox Dimensions Inspector",
    "shortDesc": "Inspect raw PDF page geometry boxes (MediaBox, CropBox, BleedBox, TrimBox).",
    "description": "Inspect exact bounding box coordinates for pre-press printing boundaries.",
    "category": "PDF Tools",
    "iconName": "Search",
    "usageCount": 19400,
    "tags": [
      "pdf",
      "mediabox",
      "cropbox",
      "trimbox",
      "bleedbox"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect bounding box values",
        "desc": "View [llx, lly, urx, ury] coordinates."
      },
      {
        "step": 3,
        "title": "Check print margins",
        "desc": "Verify trim and bleed box offsets."
      }
    ],
    "faqs": [
      {
        "question": "What is MediaBox?",
        "answer": "The physical boundaries of the medium page paper."
      }
    ]
  },
  {
    "id": "pdf-layer-inspector",
    "slug": "pdf-layer-inspector",
    "name": "PDF Optional Content Group (OCG) Layer Detector",
    "shortDesc": "Detect architectural or multi-language OCG layers inside PDF documents.",
    "description": "Inspect hidden or optional visual layers (OCGs) in CAD blueprints or multi-language PDFs.",
    "category": "PDF Tools",
    "iconName": "Layers",
    "usageCount": 18200,
    "tags": [
      "pdf",
      "layers",
      "ocg",
      "cad",
      "blueprints"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF blueprint",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect layer dictionary",
        "desc": "View layer names and default visibility states."
      },
      {
        "step": 3,
        "title": "Export layer list",
        "desc": "Copy layer inventory."
      }
    ],
    "faqs": [
      {
        "question": "What is OCG?",
        "answer": "Optional Content Groups permit turning specific PDF design layers on/off."
      }
    ]
  },
  {
    "id": "pdf-hyperlink-checker",
    "slug": "pdf-hyperlink-checker",
    "name": "PDF External URL Hyperlink Inspector",
    "shortDesc": "Extract all web links (http/https) embedded inside PDF documents.",
    "description": "Scan PDF files to compile an inventory of all external URL hyperlinks and target pages.",
    "category": "PDF Tools",
    "iconName": "Link",
    "usageCount": 41200,
    "tags": [
      "pdf",
      "links",
      "hyperlinks",
      "urls",
      "inspector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Run link extractor",
        "desc": "Lists page number and target web URL."
      },
      {
        "step": 3,
        "title": "Copy link list",
        "desc": "Copy URL inventory."
      }
    ],
    "faqs": [
      {
        "question": "Does it check broken URLs?",
        "answer": "Compiles clean clickable URL lists to test in browser."
      }
    ]
  },
  {
    "id": "pdf-signature-status-checker",
    "slug": "pdf-signature-status-checker",
    "name": "PDF Digital Signature Inspector",
    "shortDesc": "Inspect whether a PDF contains digital cryptographic signature dictionaries.",
    "description": "Check for PKCS#7 or X.509 digital signature fields, signers, and timestamps.",
    "category": "PDF Tools",
    "iconName": "ShieldCheck",
    "usageCount": 32900,
    "tags": [
      "pdf",
      "digital signature",
      "pkcs7",
      "certificate",
      "signer"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload signed PDF",
        "desc": "Select contract."
      },
      {
        "step": 2,
        "title": "Inspect signature objects",
        "desc": "View signer name and signature field flags."
      },
      {
        "step": 3,
        "title": "Read status report",
        "desc": "Confirms signature object presence."
      }
    ],
    "faqs": [
      {
        "question": "Does it verify certificate validity?",
        "answer": "Inspects embedded signature dictionary structures."
      }
    ]
  },
  {
    "id": "pdf-structure-tree-inspector",
    "slug": "pdf-structure-tree-inspector",
    "name": "PDF Tagged Document Accessibility Tree Inspector",
    "shortDesc": "Check whether a PDF is Tagged for screen reader accessibility (UA/Section 508).",
    "description": "Verify document accessibility tags for blind and vision-impaired screen readers.",
    "category": "PDF Tools",
    "iconName": "CheckSquare",
    "usageCount": 21800,
    "tags": [
      "pdf",
      "tagged pdf",
      "accessibility",
      "screen reader",
      "section 508"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect StructTreeRoot",
        "desc": "Check for /MarkInfo and /StructTreeRoot tags."
      },
      {
        "step": 3,
        "title": "Read compliance status",
        "desc": "Confirms if document is Tagged PDF."
      }
    ],
    "faqs": [
      {
        "question": "Why are PDF tags necessary?",
        "answer": "Screen readers require logical tag structures to read content in correct order."
      }
    ]
  },
  {
    "id": "pdf-thumbnail-grid-generator",
    "slug": "pdf-thumbnail-grid-generator",
    "name": "PDF Page Thumbnail Sheet Planner",
    "shortDesc": "Plan visual page thumbnail contact sheets for quick document previews.",
    "description": "Generate thumbnail grid overviews of all pages for catalog indexes.",
    "category": "PDF Tools",
    "iconName": "Grid",
    "usageCount": 27900,
    "tags": [
      "pdf",
      "thumbnail",
      "contact sheet",
      "preview",
      "grid"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Select thumbnail grid size",
        "desc": "Choose 3x3 or 4x4 grid."
      },
      {
        "step": 3,
        "title": "Preview thumbnail sheet",
        "desc": "Inspect document overview."
      }
    ],
    "faqs": [
      {
        "question": "Can I select specific page ranges?",
        "answer": "Yes, select custom page thumbnails."
      }
    ]
  },
  {
    "id": "pdf-thumbnail-extractor",
    "slug": "pdf-thumbnail-extractor",
    "name": "PDF First Page Cover Generator",
    "shortDesc": "Render PDF page 1 into a crisp PNG cover image.",
    "description": "Convert PDF front page covers into PNG image files for website preview cards.",
    "category": "PDF Tools",
    "iconName": "Image",
    "usageCount": 54100,
    "tags": [
      "pdf",
      "cover image",
      "thumbnail",
      "png",
      "page 1"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF file",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Render Page 1",
        "desc": "Canvas renders high-res cover image."
      },
      {
        "step": 3,
        "title": "Download PNG Cover",
        "desc": "Save cover graphic."
      }
    ],
    "faqs": [
      {
        "question": "What resolution is generated?",
        "answer": "Rendered at crisp 150-300 DPI for sharp web presentation."
      }
    ]
  },
  {
    "id": "pdf-stamp-previewer",
    "slug": "pdf-stamp-previewer",
    "name": "PDF Custom Rubber Stamp Layout Generator",
    "shortDesc": "Design custom red/green \"APPROVED\", \"RECEIVED\", or \"PAID\" rubber stamps.",
    "description": "Create framed rubber stamp graphics with custom dates and text callouts.",
    "category": "PDF Tools",
    "iconName": "Box",
    "usageCount": 31200,
    "tags": [
      "pdf",
      "rubber stamp",
      "approved",
      "received",
      "paid"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select stamp type",
        "desc": "Choose APPROVED, PAID, or REJECTED."
      },
      {
        "step": 2,
        "title": "Set date & reviewer name",
        "desc": "Enter current date."
      },
      {
        "step": 3,
        "title": "Preview & Download",
        "desc": "Save stamp overlay."
      }
    ],
    "faqs": [
      {
        "question": "Does stamp use standard distressed font border?",
        "answer": "Yes, classic framed stamp styling."
      }
    ]
  },
  {
    "id": "pdf-poster-split-calculator",
    "slug": "pdf-poster-split-calculator",
    "name": "PDF Tile Poster Print Split Calculator",
    "shortDesc": "Calculate tiling multi-page grid prints for giant wall posters.",
    "description": "Split a large single PDF page across multiple standard A4/Letter sheets to assemble wall posters.",
    "category": "PDF Tools",
    "iconName": "Grid",
    "usageCount": 22400,
    "tags": [
      "pdf",
      "poster",
      "tile print",
      "wall poster",
      "grid"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter target wall dimensions",
        "desc": "E.g. 2x2 grid (4 sheets)."
      },
      {
        "step": 2,
        "title": "Set overlap margin",
        "desc": "Add 0.5 inch tile gluing margins."
      },
      {
        "step": 3,
        "title": "Export poster guide",
        "desc": "Copy printing guide."
      }
    ],
    "faqs": [
      {
        "question": "Why include overlap margins?",
        "answer": "Overlap margins allow trimming and gluing printed sheets together seamlessly."
      }
    ]
  },
  {
    "id": "pdf-bleeding-box-inspector",
    "slug": "pdf-bleeding-box-inspector",
    "name": "PDF BleedBox & TrimBox Print Area Inspector",
    "shortDesc": "Verify 3mm commercial print bleed area margins on pre-press PDF files.",
    "description": "Inspect trim box cut lines and 3mm bleed margin clearances for professional print shops.",
    "category": "PDF Tools",
    "iconName": "Scissors",
    "usageCount": 19100,
    "tags": [
      "pdf",
      "bleedbox",
      "trimbox",
      "print bleed",
      "pre-press"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload artwork PDF",
        "desc": "Select flyer or business card."
      },
      {
        "step": 2,
        "title": "Inspect BleedBox offset",
        "desc": "Confirms standard 3mm (8.5 pt) bleed margins."
      },
      {
        "step": 3,
        "title": "Verify safety zone",
        "desc": "Ensure text stays inside TrimBox."
      }
    ],
    "faqs": [
      {
        "question": "Why is print bleed needed?",
        "answer": "To prevent white paper edges after mechanical paper trimming."
      }
    ]
  },
  {
    "id": "pdf-bates-numbering-generator",
    "slug": "pdf-bates-numbering-generator",
    "name": "Bates Stamp & Serial Number Layout Planner",
    "shortDesc": "Plan legal Bates numbering stamps (e.g. ABC-0001, ABC-0002) across page sets.",
    "description": "Format legal document discovery Bates numbering labels with custom prefixes and zero-padding.",
    "category": "PDF Tools",
    "iconName": "ListOrdered",
    "usageCount": 28400,
    "tags": [
      "pdf",
      "bates stamp",
      "legal",
      "serial number",
      "prefix"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter prefix",
        "desc": "E.g. CASE2026-."
      },
      {
        "step": 2,
        "title": "Set start number & digits",
        "desc": "Start at 1 with 4 zero-padded digits."
      },
      {
        "step": 3,
        "title": "Generate Bates plan",
        "desc": "Outputs CASE2026-0001 through CASE2026-0150."
      }
    ],
    "faqs": [
      {
        "question": "What is Bates numbering used for?",
        "answer": "Identification and indexing of legal discovery documents."
      }
    ]
  },
  {
    "id": "pdf-file-hash-verifier",
    "slug": "pdf-file-hash-verifier",
    "name": "PDF Security SHA-256 Checksum Verifier",
    "shortDesc": "Compute exact cryptographic SHA-256 and MD5 hash checksums for PDF files.",
    "description": "Verify PDF document tamper-proof integrity with instant browser Web Crypto SHA-256 hashing.",
    "category": "PDF Tools",
    "iconName": "ShieldCheck",
    "usageCount": 39800,
    "tags": [
      "pdf",
      "sha256",
      "checksum",
      "hash",
      "security"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF document",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Compute hash",
        "desc": "Web Crypto API computes SHA-256 hash."
      },
      {
        "step": 3,
        "title": "Copy checksum string",
        "desc": "Copy 64-character hex hash."
      }
    ],
    "faqs": [
      {
        "question": "If 1 character changes in the PDF, does the hash change?",
        "answer": "Yes, any minor change completely changes the SHA-256 hash output."
      }
    ]
  },
  {
    "id": "pdf-redaction-box-planner",
    "slug": "pdf-redaction-box-planner",
    "name": "PDF Sensitive Data Redaction Box Planner",
    "shortDesc": "Plan black redaction boxes over SSNs, credit card numbers, and sensitive text.",
    "description": "Calculate visual coordinate overlay boxes for redacting confidential terms.",
    "category": "PDF Tools",
    "iconName": "Lock",
    "usageCount": 31200,
    "tags": [
      "pdf",
      "redaction",
      "confidential",
      "black box",
      "privacy"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Search terms to redact",
        "desc": "E.g. SSN or phone numbers."
      },
      {
        "step": 3,
        "title": "Generate redaction coordinates",
        "desc": "Locates exact box locations on pages."
      }
    ],
    "faqs": [
      {
        "question": "Is true redaction permanent?",
        "answer": "True redaction permanently strips underlying text objects from stream."
      }
    ]
  },
  {
    "id": "pdf-text-search-highlighter",
    "slug": "pdf-text-search-highlighter",
    "name": "PDF Keyword Search Position Inspector",
    "shortDesc": "Locate all keyword occurrence page numbers and line indices inside PDFs.",
    "description": "Search long PDF manuals for specific terms and list matching page locations.",
    "category": "PDF Tools",
    "iconName": "Search",
    "usageCount": 36100,
    "tags": [
      "pdf",
      "search",
      "keyword",
      "highlight",
      "find"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Type keyword query",
        "desc": "Enter target term."
      },
      {
        "step": 3,
        "title": "View page matches",
        "desc": "Inspect snippet excerpts and page numbers."
      }
    ],
    "faqs": [
      {
        "question": "Is search case-sensitive?",
        "answer": "Toggle case-sensitive or whole word matching."
      }
    ]
  },
  {
    "id": "pdf-text-case-converter",
    "slug": "pdf-text-case-converter",
    "name": "PDF Extracted Text Case Converter",
    "shortDesc": "Extract text from PDF and convert case to UPPERCASE or Title Case.",
    "description": "Extract PDF text directly into formatted UPPERCASE or lowercase text.",
    "category": "PDF Tools",
    "iconName": "ArrowUpDown",
    "usageCount": 22900,
    "tags": [
      "pdf",
      "case converter",
      "uppercase",
      "text",
      "format"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Choose target case",
        "desc": "Select UPPERCASE or Title Case."
      },
      {
        "step": 3,
        "title": "Copy converted text",
        "desc": "Save formatted text."
      }
    ],
    "faqs": [
      {
        "question": "Is original PDF modified?",
        "answer": "No, operates on extracted text stream."
      }
    ]
  },
  {
    "id": "pdf-line-break-cleaner",
    "slug": "pdf-line-break-cleaner",
    "name": "PDF Extracted Text Paragraph Unwrapper",
    "shortDesc": "Fix broken mid-sentence line breaks in text copied from PDF files.",
    "description": "Unwrap unwanted line breaks from PDF copy-paste text to restore smooth paragraphs.",
    "category": "PDF Tools",
    "iconName": "Scissors",
    "usageCount": 48900,
    "tags": [
      "pdf",
      "line break",
      "unwrap",
      "paragraphs",
      "text cleaner"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste text copied from PDF",
        "desc": "Enter broken text block."
      },
      {
        "step": 2,
        "title": "Unwrap paragraphs",
        "desc": "Joins hyphenated and broken lines."
      },
      {
        "step": 3,
        "title": "Copy clean text",
        "desc": "Copy continuous text."
      }
    ],
    "faqs": [
      {
        "question": "Why does PDF copy-paste add weird line breaks?",
        "answer": "PDF text streams store individual line coordinates rather than continuous paragraphs."
      }
    ]
  },
  {
    "id": "pdf-table-text-formatter",
    "slug": "pdf-table-text-formatter",
    "name": "PDF Extracted Table Text to CSV Formatter",
    "shortDesc": "Format tabular text extracted from PDFs into clean CSV columns.",
    "description": "Convert raw PDF table text streams into structured comma-separated spreadsheet data.",
    "category": "PDF Tools",
    "iconName": "Table",
    "usageCount": 52400,
    "tags": [
      "pdf",
      "table",
      "csv",
      "extractor",
      "spreadsheet"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste PDF table text",
        "desc": "Copy table from PDF."
      },
      {
        "step": 2,
        "title": "Set column delimiter",
        "desc": "Detect spaces or tabs."
      },
      {
        "step": 3,
        "title": "Download CSV",
        "desc": "Open in Excel or Google Sheets."
      }
    ],
    "faqs": [
      {
        "question": "Does it auto-detect columns?",
        "answer": "Detects multi-space alignment gaps to delimit cells."
      }
    ]
  },
  {
    "id": "pdf-reading-order-inspector",
    "slug": "pdf-reading-order-inspector",
    "name": "PDF Screen Reader Flow Inspector",
    "shortDesc": "Inspect text stream reading order sequence across multi-column PDF layouts.",
    "description": "Verify if 2-column or 3-column PDF text streams read sequentially for accessibility.",
    "category": "PDF Tools",
    "iconName": "FileText",
    "usageCount": 18400,
    "tags": [
      "pdf",
      "reading order",
      "flow",
      "columns",
      "accessibility"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select document."
      },
      {
        "step": 2,
        "title": "Inspect sentence sequence",
        "desc": "Verify left column reads before right column."
      },
      {
        "step": 3,
        "title": "Audit flow",
        "desc": "Ensure logical text order."
      }
    ],
    "faqs": [
      {
        "question": "What causes reading order bugs?",
        "answer": "Placing text frames out of chronological order in design software."
      }
    ]
  },
  {
    "id": "pdf-catalog-dictionary-inspector",
    "slug": "pdf-catalog-dictionary-inspector",
    "name": "PDF Root Catalog Object Inspector",
    "shortDesc": "Inspect raw PDF Catalog object dictionaries and page tree structures.",
    "description": "Developer low-level PDF object dictionary structure inspector.",
    "category": "PDF Tools",
    "iconName": "Code",
    "usageCount": 15200,
    "tags": [
      "pdf",
      "catalog",
      "dictionary",
      "objects",
      "developer"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF document",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Inspect Root Catalog",
        "desc": "View /Pages, /Names, /Outlines dictionary references."
      },
      {
        "step": 3,
        "title": "Copy object tree",
        "desc": "Copy JSON object representation."
      }
    ],
    "faqs": [
      {
        "question": "What is PDF Root Catalog?",
        "answer": "The root dictionary entry point from which all PDF document object references resolve."
      }
    ]
  },
  {
    "id": "pdf-file-size-unit-converter",
    "slug": "pdf-file-size-unit-converter",
    "name": "PDF Document File Size Unit Calculator",
    "shortDesc": "Convert PDF file byte size into KB, MB, GB, and email attachment percentages.",
    "description": "Check whether your PDF file complies with 25 MB email attachment limits.",
    "category": "PDF Tools",
    "iconName": "Calculator",
    "usageCount": 29400,
    "tags": [
      "pdf",
      "file size",
      "bytes",
      "mb",
      "email limit"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PDF",
        "desc": "Select file."
      },
      {
        "step": 2,
        "title": "Read file size breakdown",
        "desc": "View bytes, KB, MB metrics."
      },
      {
        "step": 3,
        "title": "Check email status",
        "desc": "Green flag if under 25 MB Gmail limit."
      }
    ],
    "faqs": [
      {
        "question": "What is standard Gmail attachment cap?",
        "answer": "25 Megabytes (26,214,400 bytes)."
      }
    ]
  },
  {
    "id": "universal-page-inspector",
    "slug": "universal-page-inspector",
    "name": "Universal Page Inspector",
    "shortDesc": "Instant client-side page inspector tool for developers.",
    "description": "Perform page inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 193548,
    "tags": [
      "pdf tools",
      "page inspector",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Page Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Page Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Page Inspector?",
        "answer": "Yes! All Page Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal Page Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-text-extractor",
    "slug": "online-text-extractor",
    "name": "Online Text Extractor",
    "shortDesc": "Instant client-side text extractor tool for seo specialists.",
    "description": "Perform text extractor calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 70424,
    "tags": [
      "pdf tools",
      "text extractor",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Text Extractor controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Text Extractor processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Text Extractor?",
        "answer": "Yes! All Text Extractor calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Text Extractor?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "metadata-viewer-master",
    "slug": "metadata-viewer-master",
    "name": "Metadata Viewer Master",
    "shortDesc": "Instant client-side metadata viewer tool for finance managers.",
    "description": "Perform metadata viewer calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 120239,
    "tags": [
      "pdf tools",
      "metadata viewer",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Metadata Viewer controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Metadata Viewer processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Metadata Viewer?",
        "answer": "Yes! All Metadata Viewer calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Metadata Viewer Master?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-page-counter",
    "slug": "advanced-page-counter",
    "name": "Advanced Page Counter",
    "shortDesc": "Instant client-side page counter tool for data processing.",
    "description": "Perform page counter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 62032,
    "tags": [
      "pdf tools",
      "page counter",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Page Counter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Page Counter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Page Counter?",
        "answer": "Yes! All Page Counter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced Page Counter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "page-rotator-smart",
    "slug": "page-rotator-smart",
    "name": "Page Rotator (Smart)",
    "shortDesc": "Instant client-side page rotator tool for content creators.",
    "description": "Perform page rotator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 123963,
    "tags": [
      "pdf tools",
      "page rotator",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Page Rotator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Page Rotator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Page Rotator?",
        "answer": "Yes! All Page Rotator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Page Rotator (Smart)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "page-reorder-prep-client-side",
    "slug": "page-reorder-prep-client-side",
    "name": "Page Reorder Prep Client-Side",
    "shortDesc": "Instant client-side page reorder prep tool for students.",
    "description": "Perform page reorder prep calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 67980,
    "tags": [
      "pdf tools",
      "page reorder prep",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Page Reorder Prep controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Page Reorder Prep processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Page Reorder Prep?",
        "answer": "Yes! All Page Reorder Prep calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Page Reorder Prep Client-Side?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-watermark-generator",
    "slug": "easy-watermark-generator",
    "name": "Easy Watermark Generator",
    "shortDesc": "Instant client-side watermark generator tool for everyday use.",
    "description": "Perform watermark generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 31545,
    "tags": [
      "pdf tools",
      "watermark generator",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Watermark Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Watermark Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Watermark Generator?",
        "answer": "Yes! All Watermark Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy Watermark Generator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-header-footer-prep",
    "slug": "custom-header-footer-prep",
    "name": "Custom Header Footer Prep",
    "shortDesc": "Instant client-side header footer prep tool for ui ux testing.",
    "description": "Perform header footer prep calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 128621,
    "tags": [
      "pdf tools",
      "header footer prep",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Header Footer Prep controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Header Footer Prep processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Header Footer Prep?",
        "answer": "Yes! All Header Footer Prep calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom Header Footer Prep?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "margin-adjuster-dynamic",
    "slug": "margin-adjuster-dynamic",
    "name": "Margin Adjuster Dynamic",
    "shortDesc": "Instant client-side margin adjuster tool for writers.",
    "description": "Perform margin adjuster calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 181930,
    "tags": [
      "pdf tools",
      "margin adjuster",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Margin Adjuster controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Margin Adjuster processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Margin Adjuster?",
        "answer": "Yes! All Margin Adjuster calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Margin Adjuster Dynamic?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "page-size-inspector-private",
    "slug": "page-size-inspector-private",
    "name": "Page Size Inspector (Private)",
    "shortDesc": "Instant client-side page size inspector tool for engineers.",
    "description": "Perform page size inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 51933,
    "tags": [
      "pdf tools",
      "page size inspector",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Page Size Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Page Size Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Page Size Inspector?",
        "answer": "Yes! All Page Size Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Page Size Inspector (Private)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-n-up-previewer",
    "slug": "browser-n-up-previewer",
    "name": "Browser N-Up Previewer",
    "shortDesc": "Instant client-side n-up previewer tool for security audits.",
    "description": "Perform n-up previewer calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 159117,
    "tags": [
      "pdf tools",
      "n-up previewer",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the N-Up Previewer controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The N-Up Previewer processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for N-Up Previewer?",
        "answer": "Yes! All N-Up Previewer calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser N-Up Previewer?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-to-text-universal",
    "slug": "pdf-to-text-universal",
    "name": "PDF to Text Universal",
    "shortDesc": "Instant client-side pdf to text tool for web designers.",
    "description": "Perform pdf to text calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 96956,
    "tags": [
      "pdf tools",
      "pdf to text",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF to Text controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF to Text processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF to Text?",
        "answer": "Yes! All PDF to Text calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF to Text Universal?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-text-to-pdf-prep",
    "slug": "online-text-to-pdf-prep",
    "name": "Online Text to PDF Prep",
    "shortDesc": "Instant client-side text to pdf prep tool for marketers.",
    "description": "Perform text to pdf prep calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 101074,
    "tags": [
      "pdf tools",
      "text to pdf prep",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Text to PDF Prep controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Text to PDF Prep processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Text to PDF Prep?",
        "answer": "Yes! All Text to PDF Prep calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Text to PDF Prep?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "master-pdf-to-image-prep",
    "slug": "master-pdf-to-image-prep",
    "name": "Master PDF to Image Prep",
    "shortDesc": "Instant client-side pdf to image prep tool for analysts.",
    "description": "Perform pdf to image prep calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 50608,
    "tags": [
      "pdf tools",
      "pdf to image prep",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF to Image Prep controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF to Image Prep processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF to Image Prep?",
        "answer": "Yes! All PDF to Image Prep calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Master PDF to Image Prep?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "image-to-pdf-prep-advanced",
    "slug": "image-to-pdf-prep-advanced",
    "name": "Image to PDF Prep Advanced",
    "shortDesc": "Instant client-side image to pdf prep tool for digital publishing.",
    "description": "Perform image to pdf prep calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 114539,
    "tags": [
      "pdf tools",
      "image to pdf prep",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Image to PDF Prep controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Image to PDF Prep processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Image to PDF Prep?",
        "answer": "Yes! All Image to PDF Prep calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Image to PDF Prep Advanced?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "smart-pdf-form-inspector",
    "slug": "smart-pdf-form-inspector",
    "name": "Smart PDF Form Inspector",
    "shortDesc": "Instant client-side pdf form inspector tool for developers.",
    "description": "Perform pdf form inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 147235,
    "tags": [
      "pdf tools",
      "pdf form inspector",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Form Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Form Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Form Inspector?",
        "answer": "Yes! All PDF Form Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Smart PDF Form Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-pdf-security-check",
    "slug": "client-side-pdf-security-check",
    "name": "Client-Side PDF Security Check",
    "shortDesc": "Instant client-side pdf security check tool for seo specialists.",
    "description": "Perform pdf security check calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 141008,
    "tags": [
      "pdf tools",
      "pdf security check",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Security Check controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Security Check processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Security Check?",
        "answer": "Yes! All PDF Security Check calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side PDF Security Check?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-checksum-calculator-easy",
    "slug": "pdf-checksum-calculator-easy",
    "name": "PDF Checksum Calculator Easy",
    "shortDesc": "Instant client-side pdf checksum calculator tool for finance managers.",
    "description": "Perform pdf checksum calculator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 100330,
    "tags": [
      "pdf tools",
      "pdf checksum calculator",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Checksum Calculator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Checksum Calculator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Checksum Calculator?",
        "answer": "Yes! All PDF Checksum Calculator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Checksum Calculator Easy?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "custom-pdf-linearize-inspector",
    "slug": "custom-pdf-linearize-inspector",
    "name": "Custom PDF Linearize Inspector",
    "shortDesc": "Instant client-side pdf linearize inspector tool for data processing.",
    "description": "Perform pdf linearize inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 146879,
    "tags": [
      "pdf tools",
      "pdf linearize inspector",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Linearize Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Linearize Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Linearize Inspector?",
        "answer": "Yes! All PDF Linearize Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Custom PDF Linearize Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-version-checker-dynamic",
    "slug": "pdf-version-checker-dynamic",
    "name": "PDF Version Checker (Dynamic)",
    "shortDesc": "Instant client-side pdf version checker tool for content creators.",
    "description": "Perform pdf version checker calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 47957,
    "tags": [
      "pdf tools",
      "pdf version checker",
      "dynamic",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Version Checker controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Version Checker processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Version Checker?",
        "answer": "Yes! All PDF Version Checker calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Version Checker (Dynamic)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-font-inspector-private",
    "slug": "pdf-font-inspector-private",
    "name": "PDF Font Inspector Private",
    "shortDesc": "Instant client-side pdf font inspector tool for students.",
    "description": "Perform pdf font inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 149971,
    "tags": [
      "pdf tools",
      "pdf font inspector",
      "private",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Font Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Font Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Font Inspector?",
        "answer": "Yes! All PDF Font Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Font Inspector Private?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "browser-pdf-link-extractor",
    "slug": "browser-pdf-link-extractor",
    "name": "Browser PDF Link Extractor",
    "shortDesc": "Instant client-side pdf link extractor tool for everyday use.",
    "description": "Perform pdf link extractor calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 193200,
    "tags": [
      "pdf tools",
      "pdf link extractor",
      "browser",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Link Extractor controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Link Extractor processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Link Extractor?",
        "answer": "Yes! All PDF Link Extractor calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Browser PDF Link Extractor?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "universal-pdf-bookmark-inspector",
    "slug": "universal-pdf-bookmark-inspector",
    "name": "Universal PDF Bookmark Inspector",
    "shortDesc": "Instant client-side pdf bookmark inspector tool for ui ux testing.",
    "description": "Perform pdf bookmark inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 175806,
    "tags": [
      "pdf tools",
      "pdf bookmark inspector",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Bookmark Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Bookmark Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Bookmark Inspector?",
        "answer": "Yes! All PDF Bookmark Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal PDF Bookmark Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-annotation-viewer-online",
    "slug": "pdf-annotation-viewer-online",
    "name": "PDF Annotation Viewer Online",
    "shortDesc": "Instant client-side pdf annotation viewer tool for writers.",
    "description": "Perform pdf annotation viewer calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 93384,
    "tags": [
      "pdf tools",
      "pdf annotation viewer",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Annotation Viewer controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Annotation Viewer processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Annotation Viewer?",
        "answer": "Yes! All PDF Annotation Viewer calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Annotation Viewer Online?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-redaction-marker-master",
    "slug": "pdf-redaction-marker-master",
    "name": "PDF Redaction Marker (Master)",
    "shortDesc": "Instant client-side pdf redaction marker tool for engineers.",
    "description": "Perform pdf redaction marker calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 135565,
    "tags": [
      "pdf tools",
      "pdf redaction marker",
      "master",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Redaction Marker controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Redaction Marker processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Redaction Marker?",
        "answer": "Yes! All PDF Redaction Marker calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Redaction Marker (Master)?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "advanced-pdf-booklet-preview",
    "slug": "advanced-pdf-booklet-preview",
    "name": "Advanced PDF Booklet Preview",
    "shortDesc": "Instant client-side pdf booklet preview tool for security audits.",
    "description": "Perform pdf booklet preview calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 132657,
    "tags": [
      "pdf tools",
      "pdf booklet preview",
      "advanced",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Booklet Preview controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Booklet Preview processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Booklet Preview?",
        "answer": "Yes! All PDF Booklet Preview calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Advanced PDF Booklet Preview?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-page-crop-inspector-smart",
    "slug": "pdf-page-crop-inspector-smart",
    "name": "PDF Page Crop Inspector Smart",
    "shortDesc": "Instant client-side pdf page crop inspector tool for web designers.",
    "description": "Perform pdf page crop inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 175968,
    "tags": [
      "pdf tools",
      "pdf page crop inspector",
      "smart",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Page Crop Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Page Crop Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Page Crop Inspector?",
        "answer": "Yes! All PDF Page Crop Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Page Crop Inspector Smart?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "client-side-pdf-compression-estimator",
    "slug": "client-side-pdf-compression-estimator",
    "name": "Client-Side PDF Compression Estimator",
    "shortDesc": "Instant client-side pdf compression estimator tool for marketers.",
    "description": "Perform pdf compression estimator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 83917,
    "tags": [
      "pdf tools",
      "pdf compression estimator",
      "client-side",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Compression Estimator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Compression Estimator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Compression Estimator?",
        "answer": "Yes! All PDF Compression Estimator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Client-Side PDF Compression Estimator?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "easy-pdf-flatten-inspector",
    "slug": "easy-pdf-flatten-inspector",
    "name": "Easy PDF Flatten Inspector",
    "shortDesc": "Instant client-side pdf flatten inspector tool for analysts.",
    "description": "Perform pdf flatten inspector calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 52195,
    "tags": [
      "pdf tools",
      "pdf flatten inspector",
      "easy",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Flatten Inspector controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Flatten Inspector processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Flatten Inspector?",
        "answer": "Yes! All PDF Flatten Inspector calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Easy PDF Flatten Inspector?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "pdf-stamp-generator-custom",
    "slug": "pdf-stamp-generator-custom",
    "name": "PDF Stamp Generator Custom",
    "shortDesc": "Instant client-side pdf stamp generator tool for digital publishing.",
    "description": "Perform pdf stamp generator calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "PDF Tools",
    "iconName": "FileCheck",
    "usageCount": 169031,
    "tags": [
      "pdf tools",
      "pdf stamp generator",
      "custom",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the PDF Stamp Generator controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The PDF Stamp Generator processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for PDF Stamp Generator?",
        "answer": "Yes! All PDF Stamp Generator calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on PDF Stamp Generator Custom?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  }
];

export default tools;
