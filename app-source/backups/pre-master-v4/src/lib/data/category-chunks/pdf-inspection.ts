import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "pdf-page-inspector",
    "slug": "pdf-page-inspector",
    "name": "PDF Page & Layout Inspector",
    "shortDesc": "Inspect PDF page counts, document structure, dimensions, and metadata.",
    "description": "Inspect PDF file details, page counts, paper orientation, encryption, and embedded metadata in browser.",
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
    "category": "PDF Inspection & Analysis",
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
  }
];

export default tools;
