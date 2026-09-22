import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "image-resizer",
    "slug": "image-resizer",
    "name": "Image Resizer & Aspect Ratio Tool",
    "shortDesc": "Resize PNG, JPG, and WebP images by exact pixel dimensions or percentage.",
    "description": "Adjust image width, height, aspect ratio locking, and quality settings directly in browser Canvas.",
    "category": "Image Resizing & Cropping",
    "iconName": "Maximize2",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 118400,
    "tags": [
      "image",
      "resizer",
      "dimensions",
      "canvas",
      "aspect ratio"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload Image",
        "desc": "Drag and drop or browse photo."
      },
      {
        "step": 2,
        "title": "Set Width & Height",
        "desc": "Enter new dimensions in pixels or percent."
      },
      {
        "step": 3,
        "title": "Download Resized Image",
        "desc": "Save your newly resized image file."
      }
    ],
    "faqs": [
      {
        "question": "Is my photo uploaded to a server?",
        "answer": "Never. Canvas manipulation is executed locally in browser memory."
      }
    ]
  },
  {
    "id": "image-format-converter",
    "slug": "image-format-converter",
    "name": "Image Format Converter",
    "shortDesc": "Convert images between PNG, JPEG, WebP, GIF, and ICO client-side.",
    "description": "Convert file formats instantly with quality compression sliders and transparent background options.",
    "category": "Image Resizing & Cropping",
    "iconName": "FileType",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 89300,
    "tags": [
      "image",
      "converter",
      "png",
      "webp",
      "jpg",
      "ico"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select File",
        "desc": "Upload your image file."
      },
      {
        "step": 2,
        "title": "Choose Target Format",
        "desc": "Select PNG, JPEG, WebP, or ICO."
      },
      {
        "step": 3,
        "title": "Download",
        "desc": "Download transformed file."
      }
    ],
    "faqs": [
      {
        "question": "Which format is best for web?",
        "answer": "WebP offers superior compression with high visual fidelity and alpha transparency support."
      }
    ]
  },
  {
    "id": "image-compressor",
    "slug": "image-compressor",
    "name": "Image File Compressor",
    "shortDesc": "Reduce image file size with adjustable compression quality sliders.",
    "description": "Compress heavy JPEG and WebP photos to save web bandwidth without sacrificing visual quality.",
    "category": "Image Resizing & Cropping",
    "iconName": "Minimize",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 104200,
    "tags": [
      "compress",
      "image",
      "file size",
      "quality",
      "canvas"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select heavy image file."
      },
      {
        "step": 2,
        "title": "Adjust quality slider",
        "desc": "Choose compression level (e.g. 80%)."
      },
      {
        "step": 3,
        "title": "Download compressed image",
        "desc": "Save lighter file."
      }
    ],
    "faqs": [
      {
        "question": "Does compression affect original file?",
        "answer": "No, compression creates a new copy."
      }
    ]
  },
  {
    "id": "image-cropper",
    "slug": "image-cropper",
    "name": "Image Aspect Ratio Cropper",
    "shortDesc": "Crop images to 1:1, 16:9, 4:3, 9:16, or custom rectangular bounds.",
    "description": "Crop photo frames for Instagram posts, LinkedIn avatars, or web banners with live crop box bounds.",
    "category": "Image Resizing & Cropping",
    "iconName": "Scissors",
    "usageCount": 76500,
    "tags": [
      "crop",
      "image",
      "aspect ratio",
      "square",
      "16:9"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Drag crop boundary",
        "desc": "Select focal area."
      },
      {
        "step": 3,
        "title": "Download crop",
        "desc": "Save cropped image."
      }
    ],
    "faqs": [
      {
        "question": "Are standard social media presets available?",
        "answer": "Yes, 1:1 Square, 16:9 Landscape, 9:16 Story."
      }
    ]
  },
  {
    "id": "image-rotate-flip",
    "slug": "image-rotate-flip",
    "name": "Image Rotate & Flip Canvas",
    "shortDesc": "Rotate photos by 90°, 180°, 270° or flip horizontally and vertically.",
    "description": "Fix camera orientation errors or mirror photos horizontally/vertically in Canvas.",
    "category": "Image Resizing & Cropping",
    "iconName": "RotateCcw",
    "usageCount": 61200,
    "tags": [
      "rotate",
      "flip",
      "mirror",
      "image",
      "canvas"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Click Rotate or Flip",
        "desc": "Rotate 90° or mirror."
      },
      {
        "step": 3,
        "title": "Download photo",
        "desc": "Save corrected image."
      }
    ],
    "faqs": [
      {
        "question": "Is image quality reduced during rotation?",
        "answer": "No, lossless canvas redrawing preserves pixel clarity."
      }
    ]
  },
  {
    "id": "image-blur-sharpen",
    "slug": "image-blur-sharpen",
    "name": "Image Blur & Sharpen Filter",
    "shortDesc": "Apply Gaussian blur or sharp contrast matrix filters to photos.",
    "description": "Soft-focus background areas or crisp up blurred photo details client-side.",
    "category": "Image Resizing & Cropping",
    "iconName": "Eye",
    "usageCount": 45800,
    "tags": [
      "blur",
      "sharpen",
      "gaussian",
      "filter",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Adjust slider",
        "desc": "Slide blur radius or sharpen intensity."
      },
      {
        "step": 3,
        "title": "Download filtered image",
        "desc": "Save image."
      }
    ],
    "faqs": [
      {
        "question": "How does sharpening work?",
        "answer": "Uses an unsharp convolution matrix filter on pixel array data."
      }
    ]
  },
  {
    "id": "image-grayscale-sepia",
    "slug": "image-grayscale-sepia",
    "name": "Grayscale & Sepia Photo Filter",
    "shortDesc": "Convert colorful photos into monochrome black-and-white or retro sepia.",
    "description": "Apply vintage sepia tones or crisp black-and-white grayscale filters to photos.",
    "category": "Image Resizing & Cropping",
    "iconName": "Palette",
    "usageCount": 52900,
    "tags": [
      "grayscale",
      "sepia",
      "black and white",
      "retro",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Choose filter",
        "desc": "Click Grayscale or Sepia."
      },
      {
        "step": 3,
        "title": "Download image",
        "desc": "Save filtered photo."
      }
    ],
    "faqs": [
      {
        "question": "Can I combine filters?",
        "answer": "Yes, adjust intensity sliders for custom retro moods."
      }
    ]
  },
  {
    "id": "image-brightness-contrast",
    "slug": "image-brightness-contrast",
    "name": "Brightness & Contrast Photo Adjuster",
    "shortDesc": "Adjust photo brightness, exposure contrast, and saturation levels.",
    "description": "Fine-tune dark or overexposed photos with real-time browser canvas pixel processing.",
    "category": "Image Resizing & Cropping",
    "iconName": "Sliders",
    "usageCount": 68100,
    "tags": [
      "brightness",
      "contrast",
      "exposure",
      "photo",
      "adjuster"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Slide contrast & brightness",
        "desc": "Observe live canvas updates."
      },
      {
        "step": 3,
        "title": "Download photo",
        "desc": "Save enhanced image."
      }
    ],
    "faqs": [
      {
        "question": "Is processing instant?",
        "answer": "Yes, hardware-accelerated Canvas API handles pixels immediately."
      }
    ]
  },
  {
    "id": "image-watermark-adder",
    "slug": "image-watermark-adder",
    "name": "Client-Side Image Watermark Adder",
    "shortDesc": "Add text or logo watermarks over photos to protect copyright.",
    "description": "Overlay custom text copyright marks or transparent logo PNGs over photos before sharing.",
    "category": "Image Resizing & Cropping",
    "iconName": "ShieldCheck",
    "usageCount": 71400,
    "tags": [
      "watermark",
      "copyright",
      "overlay",
      "image",
      "logo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload main image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Type text or upload logo",
        "desc": "Set watermark opacity and position."
      },
      {
        "step": 3,
        "title": "Download watermarked photo",
        "desc": "Save protected file."
      }
    ],
    "faqs": [
      {
        "question": "Can I set watermark opacity?",
        "answer": "Yes, full control over alpha transparency (10% to 100%)."
      }
    ]
  },
  {
    "id": "image-border-generator",
    "slug": "image-border-generator",
    "name": "Photo Frame & Border Generator",
    "shortDesc": "Add clean solid colored, padded, or shadow frames around photos.",
    "description": "Add stylish white polaroid borders or custom color borders around photos.",
    "category": "Image Resizing & Cropping",
    "iconName": "Box",
    "usageCount": 39200,
    "tags": [
      "border",
      "frame",
      "polaroid",
      "image",
      "photo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Select border width & color",
        "desc": "Pick color and frame thickness."
      },
      {
        "step": 3,
        "title": "Download framed photo",
        "desc": "Save image."
      }
    ],
    "faqs": [
      {
        "question": "Does it support polaroid style?",
        "answer": "Yes, thicker bottom margin preset creates classic polaroid look."
      }
    ]
  },
  {
    "id": "image-noise-generator",
    "slug": "image-noise-generator",
    "name": "Noise & Grain Photo Texture Generator",
    "shortDesc": "Add film grain or digital noise textures to digital photos.",
    "description": "Simulate analog 35mm film grain texture or subtle camera noise overlays.",
    "category": "Image Resizing & Cropping",
    "iconName": "Sparkles",
    "usageCount": 28400,
    "tags": [
      "grain",
      "noise",
      "film",
      "texture",
      "photo"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Set noise percentage",
        "desc": "Adjust grain slider."
      },
      {
        "step": 3,
        "title": "Download textured photo",
        "desc": "Save image."
      }
    ],
    "faqs": [
      {
        "question": "What is film grain?",
        "answer": "Random optical texture caused by silver halide particles in analog film."
      }
    ]
  },
  {
    "id": "image-pixelator",
    "slug": "image-pixelator",
    "name": "Pixel Art & Image Pixelator",
    "shortDesc": "Pixelate photos into retro 8-bit or 16-bit pixel art styles.",
    "description": "Mosaic pixelate faces, sensitive areas, or create 8-bit style retro graphics.",
    "category": "Image Resizing & Cropping",
    "iconName": "Grid",
    "usageCount": 54100,
    "tags": [
      "pixelate",
      "8bit",
      "mosaic",
      "blur face",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Set pixel block size",
        "desc": "Slide block size from 4px to 32px."
      },
      {
        "step": 3,
        "title": "Download pixelated photo",
        "desc": "Save graphic."
      }
    ],
    "faqs": [
      {
        "question": "Can I pixelate only faces?",
        "answer": "You can crop or pixelate full canvas frames."
      }
    ]
  },
  {
    "id": "image-invert-colors",
    "slug": "image-invert-colors",
    "name": "Invert Image Colors Tool",
    "shortDesc": "Invert RGB colors to produce negative photo prints.",
    "description": "Invert photo colors to turn dark backgrounds white or view film negative scans.",
    "category": "Image Resizing & Cropping",
    "iconName": "RefreshCw",
    "usageCount": 38200,
    "tags": [
      "invert",
      "negative",
      "colors",
      "image",
      "rgb"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Click Invert",
        "desc": "Colors reverse instantly."
      },
      {
        "step": 3,
        "title": "Download negative image",
        "desc": "Save photo."
      }
    ],
    "faqs": [
      {
        "question": "Does it invert alpha transparency?",
        "answer": "No, transparent PNG channels remain transparent."
      }
    ]
  },
  {
    "id": "image-base64-encoder",
    "slug": "image-base64-encoder",
    "name": "Image to Base64 String Converter",
    "shortDesc": "Convert PNG/JPG images into data:image/png;base64 Data URIs.",
    "description": "Encode images into inline CSS or HTML Data URIs for embedding images without external files.",
    "category": "Image Resizing & Cropping",
    "iconName": "Code",
    "usageCount": 82400,
    "tags": [
      "base64",
      "data uri",
      "image",
      "encoder",
      "css"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select icon or graphic."
      },
      {
        "step": 2,
        "title": "View Base64 string",
        "desc": "Get data:image/png;base64,... string."
      },
      {
        "step": 3,
        "title": "Copy snippet",
        "desc": "Copy HTML <img> or CSS background string."
      }
    ],
    "faqs": [
      {
        "question": "When should I use Base64 images?",
        "answer": "For tiny icons and favicons to eliminate additional HTTP network requests."
      }
    ]
  },
  {
    "id": "base64-to-image-decoder",
    "slug": "base64-to-image-decoder",
    "name": "Base64 String to Image Decoder",
    "shortDesc": "Decode base64 Data URIs back into downloadable PNG/JPG files.",
    "description": "Paste raw base64 string codes to preview and download original image files.",
    "category": "Image Resizing & Cropping",
    "iconName": "Image",
    "usageCount": 65100,
    "tags": [
      "base64",
      "decoder",
      "image",
      "data uri",
      "download"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste Base64 code",
        "desc": "Paste data:image string."
      },
      {
        "step": 2,
        "title": "Preview rendered image",
        "desc": "Inspect image bounds."
      },
      {
        "step": 3,
        "title": "Download file",
        "desc": "Save PNG or JPG to disk."
      }
    ],
    "faqs": [
      {
        "question": "Does it work with SVG data URIs?",
        "answer": "Yes, decodes SVG base64 and utf8 encoded strings."
      }
    ]
  },
  {
    "id": "svg-to-png-converter",
    "slug": "svg-to-png-converter",
    "name": "SVG to PNG Rasterizer Converter",
    "shortDesc": "Convert vector SVG files into high-res PNG or JPEG raster images.",
    "description": "Render SVG graphics into custom resolution PNG files with transparent backgrounds.",
    "category": "Image Resizing & Cropping",
    "iconName": "FileType",
    "usageCount": 79200,
    "tags": [
      "svg",
      "png",
      "rasterizer",
      "converter",
      "vector"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload SVG file",
        "desc": "Select vector SVG."
      },
      {
        "step": 2,
        "title": "Set output resolution scale",
        "desc": "Choose 1x, 2x, or 4x Retina scale."
      },
      {
        "step": 3,
        "title": "Download PNG",
        "desc": "Save transparent raster image."
      }
    ],
    "faqs": [
      {
        "question": "Will text fonts render correctly?",
        "answer": "Standard web fonts render accurately in Canvas."
      }
    ]
  },
  {
    "id": "png-to-ico-converter",
    "slug": "png-to-ico-converter",
    "name": "PNG to Favicon ICO Generator",
    "shortDesc": "Convert square PNG logos into multi-resolution favicon.ico files.",
    "description": "Generate 16x16, 32x32, and 48x48 icon sets packaged into a standard web favicon.ico file.",
    "category": "Image Resizing & Cropping",
    "iconName": "Box",
    "usageCount": 88400,
    "tags": [
      "ico",
      "favicon",
      "png",
      "icon",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload PNG logo",
        "desc": "Select square icon."
      },
      {
        "step": 2,
        "title": "Generate ICO bundle",
        "desc": "Creates multi-layer ICO."
      },
      {
        "step": 3,
        "title": "Download favicon.ico",
        "desc": "Save file for website root."
      }
    ],
    "faqs": [
      {
        "question": "Why use .ICO instead of .PNG?",
        "answer": "Legacy browsers require favicon.ico at website domain root."
      }
    ]
  },
  {
    "id": "image-aspect-ratio-calculator",
    "slug": "image-aspect-ratio-calculator",
    "name": "Image Aspect Ratio Calculator",
    "shortDesc": "Calculate proportional dimensions (16:9, 4:3, 21:9) when scaling images.",
    "description": "Calculate target height automatically when changing width to keep exact ratio proportions.",
    "category": "Image Resizing & Cropping",
    "iconName": "Maximize2",
    "usageCount": 51200,
    "tags": [
      "aspect ratio",
      "calculator",
      "dimensions",
      "image",
      "scale"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter original width & height",
        "desc": "E.g. 1920x1080."
      },
      {
        "step": 2,
        "title": "Enter new target width",
        "desc": "E.g. 800."
      },
      {
        "step": 3,
        "title": "Read calculated height",
        "desc": "Calculates 450px automatically."
      }
    ],
    "faqs": [
      {
        "question": "What is 16:9 ratio?",
        "answer": "Standard widescreen display aspect ratio."
      }
    ]
  },
  {
    "id": "image-dimension-checker",
    "slug": "image-dimension-checker",
    "name": "Image Dimension & Metadata Inspector",
    "shortDesc": "Inspect pixel width, height, aspect ratio, file size, and MIME type.",
    "description": "Drop any photo to inspect exact pixel bounds, megapixel rating, and MIME properties without uploading.",
    "category": "Image Resizing & Cropping",
    "iconName": "Search",
    "usageCount": 36400,
    "tags": [
      "dimensions",
      "inspector",
      "metadata",
      "pixels",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Drop photo file",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Read stats table",
        "desc": "Inspect width, height, MP, file size."
      },
      {
        "step": 3,
        "title": "Copy metadata",
        "desc": "Copy summary info."
      }
    ],
    "faqs": [
      {
        "question": "What is a Megapixel (MP)?",
        "answer": "Width multiplied by height divided by 1,000,000."
      }
    ]
  },
  {
    "id": "photo-exif-stripper",
    "slug": "photo-exif-stripper",
    "name": "EXIF Metadata Inspector & Cleaner",
    "shortDesc": "Inspect and wipe GPS location data, camera model, and shot metadata.",
    "description": "Protect privacy by stripping GPS coordinates, date stamps, and camera details from photos before posting online.",
    "category": "Image Resizing & Cropping",
    "iconName": "ShieldCheck",
    "usageCount": 72100,
    "tags": [
      "exif",
      "metadata",
      "cleaner",
      "privacy",
      "gps"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select camera photo."
      },
      {
        "step": 2,
        "title": "Inspect EXIF tags",
        "desc": "View embedded GPS, camera model, lens."
      },
      {
        "step": 3,
        "title": "Click Wipe Metadata",
        "desc": "Download clean photo file."
      }
    ],
    "faqs": [
      {
        "question": "Does stripping EXIF change image quality?",
        "answer": "No, re-encoding cleanly removes header metadata tags."
      }
    ]
  },
  {
    "id": "image-histogram-viewer",
    "slug": "image-histogram-viewer",
    "name": "Image Color Histogram Viewer",
    "shortDesc": "Plot Red, Green, Blue, and Luminance pixel distribution graphs.",
    "description": "Inspect photo exposure balance with RGB channel distribution frequency graphs.",
    "category": "Image Resizing & Cropping",
    "iconName": "BarChart2",
    "usageCount": 29100,
    "tags": [
      "histogram",
      "rgb",
      "luminance",
      "exposure",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "View channel charts",
        "desc": "Inspect Red, Green, Blue curve levels."
      },
      {
        "step": 3,
        "title": "Evaluate exposure",
        "desc": "Check clipped shadows or highlights."
      }
    ],
    "faqs": [
      {
        "question": "What does a clipped histogram mean?",
        "answer": "Pixels clustered at 0 (pure black) or 255 (pure white) lost shadow/highlight detail."
      }
    ]
  },
  {
    "id": "image-color-replacer",
    "slug": "image-color-replacer",
    "name": "Image Color Replacer Tool",
    "shortDesc": "Swap a target color in an image with a new HEX color within tolerance bounds.",
    "description": "Replace specific icon or graphic colors with brand colors using color tolerance sliders.",
    "category": "Image Resizing & Cropping",
    "iconName": "Palette",
    "usageCount": 42900,
    "tags": [
      "color replace",
      "swap color",
      "tolerance",
      "image",
      "palette"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload graphic",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Click color to swap",
        "desc": "Pick source color and enter new color."
      },
      {
        "step": 3,
        "title": "Download photo",
        "desc": "Save updated image."
      }
    ],
    "faqs": [
      {
        "question": "What does tolerance do?",
        "answer": "Tolerance determines how similar neighboring shades must be to be swapped."
      }
    ]
  },
  {
    "id": "image-split-grid",
    "slug": "image-split-grid",
    "name": "Image Grid Splitter & Slicer",
    "shortDesc": "Split images into 2x2, 3x3, or custom grid tiles for Instagram carousels.",
    "description": "Slice large panorama photos into equal square tiles for grid social media posts.",
    "category": "Image Resizing & Cropping",
    "iconName": "Grid",
    "usageCount": 63100,
    "tags": [
      "grid",
      "split",
      "slicer",
      "instagram",
      "tiles"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select panorama."
      },
      {
        "step": 2,
        "title": "Choose grid size",
        "desc": "Select 3x1 or 3x3 grid."
      },
      {
        "step": 3,
        "title": "Download ZIP/Tiles",
        "desc": "Save slice tiles."
      }
    ],
    "faqs": [
      {
        "question": "Are tile dimensions identical?",
        "answer": "Yes, equal pixel dimensions across all sliced grid cells."
      }
    ]
  },
  {
    "id": "image-ascii-art-generator",
    "slug": "image-ascii-art-generator",
    "name": "Image to ASCII Art Converter",
    "shortDesc": "Convert photos into text ASCII art character graphics.",
    "description": "Translate photo light values into ASCII character density strings for retro terminal art.",
    "category": "Image Resizing & Cropping",
    "iconName": "Terminal",
    "usageCount": 58200,
    "tags": [
      "ascii",
      "art",
      "converter",
      "terminal",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select portrait or graphic."
      },
      {
        "step": 2,
        "title": "Set width columns",
        "desc": "Choose 80 or 120 character width."
      },
      {
        "step": 3,
        "title": "Copy ASCII text",
        "desc": "Copy plain text art."
      }
    ],
    "faqs": [
      {
        "question": "How is character density calculated?",
        "answer": "Light pixels map to spaces/dots, dark pixels map to @ and #."
      }
    ]
  },
  {
    "id": "image-duotone-filter",
    "slug": "image-duotone-filter",
    "name": "Duotone & Gradient Photo Filter",
    "shortDesc": "Apply trendy Spotify-style 2-color duotone gradient filters to photos.",
    "description": "Remap image shadows and highlights into dual brand colors for modern aesthetics.",
    "category": "Image Resizing & Cropping",
    "iconName": "Palette",
    "usageCount": 49200,
    "tags": [
      "duotone",
      "gradient",
      "spotify",
      "filter",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Pick shadow & highlight colors",
        "desc": "E.g. navy blue and neon pink."
      },
      {
        "step": 3,
        "title": "Download duotone photo",
        "desc": "Save graphic."
      }
    ],
    "faqs": [
      {
        "question": "Are preset duotone pairs included?",
        "answer": "Yes, Cyberpunk, Spotify Green, Sunset, and Neon Violet presets."
      }
    ]
  },
  {
    "id": "image-vignette-generator",
    "slug": "image-vignette-generator",
    "name": "Photo Vignette Effect Generator",
    "shortDesc": "Darken photo edges with smooth radial gradient vignette borders.",
    "description": "Add classic dark camera lens vignette shading to draw focus to center subjects.",
    "category": "Image Resizing & Cropping",
    "iconName": "Eye",
    "usageCount": 31900,
    "tags": [
      "vignette",
      "radial",
      "photo",
      "dark edges",
      "filter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Adjust vignette intensity",
        "desc": "Slide radial falloff."
      },
      {
        "step": 3,
        "title": "Download photo",
        "desc": "Save image."
      }
    ],
    "faqs": [
      {
        "question": "Can I make white vignettes too?",
        "answer": "Yes, toggle black or white edge shading."
      }
    ]
  },
  {
    "id": "image-thumbnail-generator",
    "slug": "image-thumbnail-generator",
    "name": "Batch Thumbnail Image Generator",
    "shortDesc": "Generate 128x128, 256x256, or custom thumbnail previews.",
    "description": "Create small thumbnail versions of heavy photos for fast web gallery loading.",
    "category": "Image Resizing & Cropping",
    "iconName": "Image",
    "usageCount": 38400,
    "tags": [
      "thumbnail",
      "resizer",
      "preview",
      "gallery",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Select thumbnail size",
        "desc": "Choose 150x150 square or 300x200."
      },
      {
        "step": 3,
        "title": "Download thumbnail",
        "desc": "Save file."
      }
    ],
    "faqs": [
      {
        "question": "Does it crop or fit?",
        "answer": "Choose between cover crop or contain padded fit."
      }
    ]
  },
  {
    "id": "image-rounded-corners",
    "slug": "image-rounded-corners",
    "name": "Image Rounded Corners & Circle Crop",
    "shortDesc": "Apply rounded border-radius or crop images into perfect circular avatars.",
    "description": "Add smooth rounded corners or cut photos into circular PNG profile pictures with alpha transparency.",
    "category": "Image Resizing & Cropping",
    "iconName": "Box",
    "usageCount": 67200,
    "tags": [
      "rounded corners",
      "circle crop",
      "avatar",
      "png",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select profile picture."
      },
      {
        "step": 2,
        "title": "Set corner radius",
        "desc": "Slide radius (e.g. 20px or 50% for circle)."
      },
      {
        "step": 3,
        "title": "Download transparent PNG",
        "desc": "Save cropped avatar."
      }
    ],
    "faqs": [
      {
        "question": "Does it save as PNG with transparency?",
        "answer": "Yes, clipped corners outside radius are transparent."
      }
    ]
  },
  {
    "id": "image-color-tint",
    "slug": "image-color-tint",
    "name": "Image Color Tint & Overlay Filter",
    "shortDesc": "Overlay solid color tints with adjustable alpha blend modes.",
    "description": "Add tinted color overlays (multiply, screen, overlay) over banner photos for text readability.",
    "category": "Image Resizing & Cropping",
    "iconName": "Palette",
    "usageCount": 34100,
    "tags": [
      "tint",
      "overlay",
      "color",
      "blend mode",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select banner."
      },
      {
        "step": 2,
        "title": "Choose tint color & mode",
        "desc": "Select dark navy with Multiply mode."
      },
      {
        "step": 3,
        "title": "Download image",
        "desc": "Save tinted graphic."
      }
    ],
    "faqs": [
      {
        "question": "Why add dark overlays to hero banners?",
        "answer": "Improves white header text legibility over busy photo backgrounds."
      }
    ]
  },
  {
    "id": "image-opacity-adjuster",
    "slug": "image-opacity-adjuster",
    "name": "Image Opacity & Transparency Tool",
    "shortDesc": "Adjust photo alpha transparency levels from 0% to 100%.",
    "description": "Make PNG or JPEG images semi-transparent for background layering.",
    "category": "Image Resizing & Cropping",
    "iconName": "Eye",
    "usageCount": 29800,
    "tags": [
      "opacity",
      "transparency",
      "alpha",
      "png",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Set opacity %",
        "desc": "Slide transparency (e.g. 50%)."
      },
      {
        "step": 3,
        "title": "Download PNG",
        "desc": "Save semi-transparent image."
      }
    ],
    "faqs": [
      {
        "question": "Must target file be PNG?",
        "answer": "Yes, PNG format is required to support alpha transparency."
      }
    ]
  },
  {
    "id": "image-threshold-binarizer",
    "slug": "image-threshold-binarizer",
    "name": "Binarize & Black/White Threshold Tool",
    "shortDesc": "Convert images into pure 1-bit high contrast black and white pixels.",
    "description": "Binarize scanned documents or stamps into pure black and white line art.",
    "category": "Image Resizing & Cropping",
    "iconName": "Sparkles",
    "usageCount": 31200,
    "tags": [
      "threshold",
      "binarize",
      "black and white",
      "1bit",
      "scan"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload document scan",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Adjust threshold slider",
        "desc": "Set cutoff luminance (0-255)."
      },
      {
        "step": 3,
        "title": "Download clean scan",
        "desc": "Save crisp black & white image."
      }
    ],
    "faqs": [
      {
        "question": "What is binarization useful for?",
        "answer": "Cleaning up handwritten notes or OCR text preparation."
      }
    ]
  },
  {
    "id": "image-emboss-filter",
    "slug": "image-emboss-filter",
    "name": "Emboss & 3D Relief Photo Filter",
    "shortDesc": "Transform photos into 3D metallic embossed stamp reliefs.",
    "description": "Apply 3x3 convolution matrix embossing filters to simulate stamped metallic paper textures.",
    "category": "Image Resizing & Cropping",
    "iconName": "Box",
    "usageCount": 21400,
    "tags": [
      "emboss",
      "3d relief",
      "convolution",
      "filter",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select graphic."
      },
      {
        "step": 2,
        "title": "Click Emboss",
        "desc": "View 3D paper stamp effect."
      },
      {
        "step": 3,
        "title": "Download image",
        "desc": "Save embossed file."
      }
    ],
    "faqs": [
      {
        "question": "How is embossing rendered?",
        "answer": "Calculates directional luminance pixel deltas."
      }
    ]
  },
  {
    "id": "image-edge-detection",
    "slug": "image-edge-detection",
    "name": "Sobel Edge Detection Photo Filter",
    "shortDesc": "Extract high-contrast outline sketches using Sobel edge detection algorithms.",
    "description": "Detect edge boundaries in photos to create pencil sketch style line art outlines.",
    "category": "Image Resizing & Cropping",
    "iconName": "Search",
    "usageCount": 27800,
    "tags": [
      "edge detection",
      "sobel",
      "sketch",
      "outline",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select portrait or scene."
      },
      {
        "step": 2,
        "title": "Run Sobel filter",
        "desc": "Canvas plots white edge lines."
      },
      {
        "step": 3,
        "title": "Download line art",
        "desc": "Save outline image."
      }
    ],
    "faqs": [
      {
        "question": "What is Sobel operator?",
        "answer": "A mathematical gradient calculation highlighting high spatial frequency intensity changes."
      }
    ]
  },
  {
    "id": "image-canvas-pad",
    "slug": "image-canvas-pad",
    "name": "Image Canvas Padding & Expand Tool",
    "shortDesc": "Expand canvas dimensions around photo with solid or transparent padding.",
    "description": "Pad image boundaries with extra white or color space without stretching photo contents.",
    "category": "Image Resizing & Cropping",
    "iconName": "Maximize2",
    "usageCount": 35100,
    "tags": [
      "pad canvas",
      "padding",
      "expand",
      "background",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo",
        "desc": "Select image."
      },
      {
        "step": 2,
        "title": "Set padding pixels",
        "desc": "Add 50px padding all around."
      },
      {
        "step": 3,
        "title": "Download padded photo",
        "desc": "Save image."
      }
    ],
    "faqs": [
      {
        "question": "Can padding be transparent?",
        "answer": "Yes, select transparent background for PNG files."
      }
    ]
  },
  {
    "id": "favicon-generator",
    "slug": "favicon-generator",
    "name": "Multi-Size Web Favicon Generator",
    "shortDesc": "Generate all web favicons (16x16, 32x32, 180x180 Apple Touch) from one logo.",
    "description": "Upload a square logo to generate all required web browser favicon icons and HTML tags.",
    "category": "Image Resizing & Cropping",
    "iconName": "Sparkles",
    "usageCount": 94100,
    "tags": [
      "favicon",
      "generator",
      "apple touch",
      "pwa",
      "icons"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload square logo",
        "desc": "Select high-res PNG."
      },
      {
        "step": 2,
        "title": "Generate favicon set",
        "desc": "Canvas resizes all icon tiers."
      },
      {
        "step": 3,
        "title": "Download icon package",
        "desc": "Copy HTML headers and download icon files."
      }
    ],
    "faqs": [
      {
        "question": "What size icon should I upload?",
        "answer": "512x512 PNG gives crisp downsampling for all tiers."
      }
    ]
  },
  {
    "id": "image-hue-saturation",
    "slug": "image-hue-saturation",
    "name": "Hue & Saturation Color Adjuster",
    "shortDesc": "Shift color hue angles (-180° to +180°) and boost saturation vibrancy.",
    "description": "Change full image color schemes by rotating color wheel angles in browser Canvas.",
    "category": "Image Resizing & Cropping",
    "iconName": "Palette",
    "usageCount": 41200,
    "tags": [
      "hue",
      "saturation",
      "color shift",
      "photo",
      "adjuster"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image",
        "desc": "Select photo."
      },
      {
        "step": 2,
        "title": "Slide Hue angle",
        "desc": "Rotate color wheel angle."
      },
      {
        "step": 3,
        "title": "Download photo",
        "desc": "Save adjusted image."
      }
    ],
    "faqs": [
      {
        "question": "Can I desaturate to black & white?",
        "answer": "Setting saturation to -100% creates pure grayscale."
      }
    ]
  }
];
export default tools;
