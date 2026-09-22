import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "color-picker-from-image",
    "slug": "color-picker-from-image",
    "name": "Image Color Palette Extractor",
    "shortDesc": "Upload an image to pick exact pixel colors or extract dominant color palettes.",
    "description": "Extract dominant palette swatches and click anywhere on photos to inspect HEX, RGB, and HSL color values.",
    "category": "Color Palettes & Contrast",
    "iconName": "Pipette",
    "isPopular": false,
    "isLatest": true,
    "usageCount": 54100,
    "tags": [
      "color",
      "image",
      "palette",
      "picker",
      "hex",
      "rgb"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select an image",
        "desc": "Upload a banner, photo, or screenshot."
      },
      {
        "step": 2,
        "title": "Hover & click",
        "desc": "Hover over pixels to inspect colors or review auto-extracted palette cards."
      },
      {
        "step": 3,
        "title": "Copy HEX code",
        "desc": "Click any color card to copy its HEX value."
      }
    ],
    "faqs": [
      {
        "question": "How many colors does it extract?",
        "answer": "It extracts the 6 top dominant color swatches across your uploaded photo."
      }
    ]
  },
  {
    "id": "color-contrast-checker",
    "slug": "color-contrast-checker",
    "name": "Color Contrast Checker (WCAG)",
    "shortDesc": "Test text and background color ratios against WCAG 2.1 AA and AAA standards.",
    "description": "Ensure web accessibility by checking contrast ratios for small text, large text, and UI components in real-time.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "isPopular": false,
    "isLatest": true,
    "usageCount": 62400,
    "tags": [
      "color",
      "contrast",
      "wcag",
      "accessibility",
      "aa",
      "aaa"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Text Color",
        "desc": "Pick foreground color or enter HEX code."
      },
      {
        "step": 2,
        "title": "Select Background Color",
        "desc": "Pick background color."
      },
      {
        "step": 3,
        "title": "Check WCAG score",
        "desc": "Review pass/fail badges for WCAG AA and AAA accessibility compliance."
      }
    ],
    "faqs": [
      {
        "question": "What contrast ratio passes WCAG AA?",
        "answer": "A minimum ratio of 4.5:1 is required for normal text and 3:1 for large text."
      }
    ]
  },
  {
    "id": "hex-rgb-hsl-converter",
    "slug": "hex-rgb-hsl-converter",
    "name": "HEX to RGB / HSL Color Converter",
    "shortDesc": "Convert color codes seamlessly between HEX, RGB, HSL, and HSV formats.",
    "description": "Instant multi-format color converter with visual color picker, alpha transparency support, and CSS code snippet copy.",
    "category": "Color Palettes & Contrast",
    "iconName": "Sparkles",
    "isPopular": false,
    "isLatest": false,
    "usageCount": 88100,
    "tags": [
      "color",
      "hex",
      "rgb",
      "hsl",
      "hsv",
      "css"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input color code",
        "desc": "Enter any HEX value like #6366F1 or RGB values."
      },
      {
        "step": 2,
        "title": "Inspect outputs",
        "desc": "View live synchronized HEX, RGB, HSL, and HSV color strings."
      },
      {
        "step": 3,
        "title": "Copy CSS snippet",
        "desc": "Click copy next to any format."
      }
    ],
    "faqs": [
      {
        "question": "Does it support alpha channels?",
        "answer": "Yes, 8-digit HEX and RGBA values are fully supported."
      }
    ]
  },
  {
    "id": "css-gradient-generator",
    "slug": "css-gradient-generator",
    "name": "CSS Gradient Generator",
    "shortDesc": "Create gorgeous linear and radial CSS gradients with multi-stop color controls.",
    "description": "Design smooth background gradients visually, set angles, add color stops, and copy production CSS declarations instantly.",
    "category": "Color Palettes & Contrast",
    "iconName": "Layers",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 124000,
    "tags": [
      "css",
      "gradient",
      "linear",
      "radial",
      "design",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose type & angle",
        "desc": "Select Linear or Radial and adjust the angle dial."
      },
      {
        "step": 2,
        "title": "Set color stops",
        "desc": "Add or adjust gradient color stops on the interactive bar."
      },
      {
        "step": 3,
        "title": "Copy CSS",
        "desc": "Copy the CSS `background: linear-gradient(...)` snippet."
      }
    ],
    "faqs": [
      {
        "question": "Is the generated CSS compatible with all browsers?",
        "answer": "Yes, standard modern CSS gradient syntax is generated."
      }
    ]
  },
  {
    "id": "color-picker-converter",
    "slug": "color-picker-converter",
    "name": "Color Picker & Multi-Format Converter",
    "shortDesc": "Pick colors and convert between HEX, RGB, HSL, HSV, CMYK, and CSS string values.",
    "description": "Interactive visual color picker with real-time conversion between HEX, RGB, HSL, HSV, CMYK, CSS color strings, and color shade variations.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 142100,
    "tags": [
      "color picker",
      "hex",
      "rgb",
      "hsl",
      "cmyk",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick a Color",
        "desc": "Use visual color wheel or enter HEX/RGB code."
      },
      {
        "step": 2,
        "title": "Convert Values",
        "desc": "Instant conversion to HEX, RGB, HSL, HSV, CMYK, and CSS formats."
      },
      {
        "step": 3,
        "title": "Copy Color Code",
        "desc": "Click copy button next to preferred color format."
      }
    ],
    "faqs": [
      {
        "question": "What is CMYK used for?",
        "answer": "CMYK (Cyan, Magenta, Yellow, Key/Black) is used for commercial print production."
      }
    ]
  },
  {
    "id": "contrast-checker",
    "slug": "contrast-checker",
    "name": "WCAG Color Contrast Checker",
    "shortDesc": "Calculate WCAG 2.1 contrast ratio for foreground text against background colors.",
    "description": "Audit text legibility compliance against WCAG AA and AAA accessibility standards for normal and large text.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 98400,
    "tags": [
      "contrast checker",
      "wcag",
      "accessibility",
      "aa",
      "aaa"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Foreground Color",
        "desc": "Choose text color code."
      },
      {
        "step": 2,
        "title": "Select Background Color",
        "desc": "Choose background surface color code."
      },
      {
        "step": 3,
        "title": "Read Compliance Badges",
        "desc": "View contrast ratio (e.g., 7.1:1) and PASS/FAIL badges."
      }
    ],
    "faqs": [
      {
        "question": "What ratio is required for WCAG AA compliance?",
        "answer": "Minimum 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold)."
      }
    ]
  },
  {
    "id": "palette-generator",
    "slug": "palette-generator",
    "name": "Harmonic Color Palette Generator",
    "shortDesc": "Generate complementary, triadic, monochromatic, and analogous color palettes.",
    "description": "Generate balanced color palettes using color harmony mathematical rules (Complementary, Analogous, Triadic, Tetradic).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 118200,
    "tags": [
      "color palette",
      "generator",
      "complementary",
      "analogous",
      "triadic"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Choose Base Color",
        "desc": "Pick anchor color."
      },
      {
        "step": 2,
        "title": "Select Harmony Rule",
        "desc": "Select Complementary, Analogous, Triadic, or Split-Complementary."
      },
      {
        "step": 3,
        "title": "Export Swatches",
        "desc": "Copy HEX codes, CSS variables, or JSON palette."
      }
    ],
    "faqs": [
      {
        "question": "What are Analogous colors?",
        "answer": "Colors sitting adjacent to each other on the 360° color wheel."
      }
    ]
  },
  {
    "id": "hex-to-rgb-converter",
    "slug": "hex-to-rgb-converter",
    "name": "HEX to RGB & RGBA Color Converter",
    "shortDesc": "Convert #RRGGBB or 3-digit #RGB hex strings into rgb(r, g, b) and rgba() values.",
    "description": "Convert HEX color codes into RGB decimal values with alpha opacity channel sliders.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 88100,
    "tags": [
      "hex to rgb",
      "rgba",
      "converter",
      "css",
      "color"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter HEX code",
        "desc": "E.g. #3B82F6."
      },
      {
        "step": 2,
        "title": "Adjust Alpha opacity",
        "desc": "Slide opacity from 0.0 to 1.0."
      },
      {
        "step": 3,
        "title": "Copy CSS value",
        "desc": "Copy rgba(59, 130, 246, 0.8)."
      }
    ],
    "faqs": [
      {
        "question": "Does it support 3-digit shorthand hex like #38f?",
        "answer": "Yes, expands #38f to #3388ff automatically."
      }
    ]
  },
  {
    "id": "rgb-to-hex-converter",
    "slug": "rgb-to-hex-converter",
    "name": "RGB to HEX Color Code Converter",
    "shortDesc": "Convert rgb(r, g, b) values (0-255) into standard 6-digit #RRGGBB hex strings.",
    "description": "Convert decimal Red, Green, Blue channel intensity values into 6-character hexadecimal codes.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 76400,
    "tags": [
      "rgb to hex",
      "hex code",
      "color converter",
      "css",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter R, G, B values",
        "desc": "Red (0-255), Green (0-255), Blue (0-255)."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Generates uppercase #HEX string."
      },
      {
        "step": 3,
        "title": "Copy HEX code",
        "desc": "Copy code."
      }
    ],
    "faqs": [
      {
        "question": "What happens if R > 255 is entered?",
        "answer": "Values are automatically clamped to 0-255 bounds."
      }
    ]
  },
  {
    "id": "hsl-to-hex-converter",
    "slug": "hsl-to-hex-converter",
    "name": "HSL to HEX & RGB Color Converter",
    "shortDesc": "Convert HSL hue (0-360°), saturation (%), and lightness (%) into HEX and RGB.",
    "description": "Convert HSL cylindrical color values into CSS HEX and RGB formats.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 52100,
    "tags": [
      "hsl to hex",
      "hue",
      "saturation",
      "lightness",
      "color converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter H, S, L values",
        "desc": "Hue 0-360, Saturation 0-100%, Lightness 0-100%."
      },
      {
        "step": 2,
        "title": "Auto Convert",
        "desc": "Translates to HEX #code and RGB."
      },
      {
        "step": 3,
        "title": "Copy HEX string",
        "desc": "Copy converted color."
      }
    ],
    "faqs": [
      {
        "question": "What is Hue value 0°?",
        "answer": "0° (and 360°) corresponds to pure red."
      }
    ]
  },
  {
    "id": "hex-to-hsl-converter",
    "slug": "hex-to-hsl-converter",
    "name": "HEX to HSL & HSLA Color Converter",
    "shortDesc": "Convert HEX color codes into CSS hsl(hue, sat%, light%) strings.",
    "description": "Convert HEX colors into cylindrical HSL coordinates for programmatic hue rotation.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 48900,
    "tags": [
      "hex to hsl",
      "hsla",
      "hue",
      "saturation",
      "color"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter HEX code",
        "desc": "Enter #10B981."
      },
      {
        "step": 2,
        "title": "Convert to HSL",
        "desc": "Generates hsl(159, 78%, 39%)."
      },
      {
        "step": 3,
        "title": "Copy HSL string",
        "desc": "Copy CSS declaration."
      }
    ],
    "faqs": [
      {
        "question": "Why use HSL in CSS?",
        "answer": "HSL makes it intuitive to darken, lighten, or adjust color saturation."
      }
    ]
  },
  {
    "id": "color-shade-tint-generator",
    "slug": "color-shade-tint-generator",
    "name": "Color Shades & Tints Scale Generator",
    "shortDesc": "Generate a 10-step gradient scale from dark shade to base color to light tint.",
    "description": "Generate 10-step design system color scales adding black (shades) or white (tints).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 92400,
    "tags": [
      "shades",
      "tints",
      "color scale",
      "design system",
      "tailwind"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick base color",
        "desc": "Select target HEX code."
      },
      {
        "step": 2,
        "title": "Generate scale",
        "desc": "Generates 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 scale."
      },
      {
        "step": 3,
        "title": "Copy CSS variables or JSON",
        "desc": "Copy Tailwind or CSS color object."
      }
    ],
    "faqs": [
      {
        "question": "What is difference between Shade and Tint?",
        "answer": "Shades mix color with black; Tints mix color with white."
      }
    ]
  },
  {
    "id": "gradient-generator-css",
    "slug": "gradient-generator-css",
    "name": "CSS Linear & Radial Gradient Generator",
    "shortDesc": "Design smooth multi-stop linear and radial CSS gradient backgrounds.",
    "description": "Interactive visual gradient builder supporting angle rotation, multi-stop color handles, and CSS export.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 124100,
    "tags": [
      "css gradient",
      "linear gradient",
      "radial gradient",
      "css background",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Add color stops",
        "desc": "Click track to place color points."
      },
      {
        "step": 2,
        "title": "Adjust angle handle",
        "desc": "Rotate linear gradient from 0° to 360°."
      },
      {
        "step": 3,
        "title": "Copy background CSS",
        "desc": "Copy background: linear-gradient(...)."
      }
    ],
    "faqs": [
      {
        "question": "Does it support conic gradients?",
        "answer": "Yes, toggle Linear, Radial, or Conic gradient modes."
      }
    ]
  },
  {
    "id": "color-blender-interpolator",
    "slug": "color-blender-interpolator",
    "name": "Color Blender & Midpoint Interpolator",
    "shortDesc": "Blend two colors together across N steps using RGB or Lab color space.",
    "description": "Calculate smooth color step transitions between Color A and Color B.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 61200,
    "tags": [
      "color blender",
      "interpolation",
      "gradient steps",
      "lab color",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Start & End color",
        "desc": "Pick Color A and Color B."
      },
      {
        "step": 2,
        "title": "Set step count",
        "desc": "Choose 3, 5, 7, or 10 intermediate blend steps."
      },
      {
        "step": 3,
        "title": "Copy color steps",
        "desc": "Copy array of intermediate HEX values."
      }
    ],
    "faqs": [
      {
        "question": "Why blend in Lab color space?",
        "answer": "CIE Lab blending preserves perceptual human brightness better than plain RGB."
      }
    ]
  },
  {
    "id": "tailwind-color-palette-finder",
    "slug": "tailwind-color-palette-finder",
    "name": "Tailwind CSS Color Matching Tool",
    "shortDesc": "Find the closest matching default Tailwind CSS v3 color shade for any HEX code.",
    "description": "Match arbitrary HEX color inputs to the nearest default Tailwind CSS color class (e.g. bg-sky-500).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 88400,
    "tags": [
      "tailwind css",
      "color matcher",
      "slate",
      "indigo",
      "emerald"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter custom HEX color",
        "desc": "E.g. #2266cc."
      },
      {
        "step": 2,
        "title": "Find nearest match",
        "desc": "Calculates Delta-E distance to Tailwind 50-950 scale."
      },
      {
        "step": 3,
        "title": "Copy Tailwind class name",
        "desc": "Copies bg-blue-600."
      }
    ],
    "faqs": [
      {
        "question": "How is nearest color calculated?",
        "answer": "Uses Euclidean color distance across RGB/Lab color dimensions."
      }
    ]
  },
  {
    "id": "color-blindness-simulator",
    "slug": "color-blindness-simulator",
    "name": "Color Blindness Accessibility Simulator",
    "shortDesc": "Simulate Protanopia, Deuteranopia, Tritanopia, and Achromatopsia vision.",
    "description": "Test how color swatches appear to users with Protanopia, Deuteranopia, Tritanopia, and total color blindness.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "usageCount": 54200,
    "tags": [
      "color blindness",
      "protanopia",
      "deuteranopia",
      "tritanopia",
      "accessibility"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick palette colors",
        "desc": "Select design palette."
      },
      {
        "step": 2,
        "title": "Toggle vision simulation",
        "desc": "Switch between Protanopia (Red-Blind), Deuteranopia (Green-Blind), Tritanopia (Blue-Blind)."
      },
      {
        "step": 3,
        "title": "Verify contrast distinction",
        "desc": "Ensure colors remain distinguishable."
      }
    ],
    "faqs": [
      {
        "question": "What percentage of population has color vision deficiency?",
        "answer": "Approximately 8% of men and 0.5% of women worldwide."
      }
    ]
  },
  {
    "id": "color-name-finder",
    "slug": "color-name-finder",
    "name": "Color Name & Nearest Named Shade Finder",
    "shortDesc": "Find human named color names (e.g. \"Cerulean\", \"Coral\", \"Teal\") for any HEX.",
    "description": "Map numeric HEX color codes to standard HTML/CSS named colors and 1,500+ named shades.",
    "category": "Color Palettes & Contrast",
    "iconName": "Search",
    "usageCount": 68100,
    "tags": [
      "color name",
      "named colors",
      "css names",
      "hex name",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter HEX code",
        "desc": "E.g. #008080."
      },
      {
        "step": 2,
        "title": "Find named match",
        "desc": "Outputs \"Teal\" (exact CSS named match)."
      },
      {
        "step": 3,
        "title": "Copy color name",
        "desc": "Copy string."
      }
    ],
    "faqs": [
      {
        "question": "How many named CSS colors exist?",
        "answer": "There are 148 official named CSS colors."
      }
    ]
  },
  {
    "id": "cmyk-to-rgb-converter",
    "slug": "cmyk-to-rgb-converter",
    "name": "CMYK to RGB & HEX Color Converter",
    "shortDesc": "Convert CMYK print ink percentages (C%, M%, Y%, K%) to screen RGB & HEX.",
    "description": "Convert print CMYK ink percentages into sRGB screen values.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 41200,
    "tags": [
      "cmyk to rgb",
      "cmyk",
      "print to screen",
      "converter",
      "colors"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter C, M, Y, K %",
        "desc": "Cyan, Magenta, Yellow, Key/Black."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Translates to RGB and HEX."
      },
      {
        "step": 3,
        "title": "Copy screen color",
        "desc": "Copy RGB values."
      }
    ],
    "faqs": [
      {
        "question": "Why do print colors look dimmer on screen?",
        "answer": "CMYK is subtractive ink mixing, while RGB is additive light emission."
      }
    ]
  },
  {
    "id": "hsv-to-rgb-converter",
    "slug": "hsv-to-rgb-converter",
    "name": "HSV / HSB to RGB Color Converter",
    "shortDesc": "Convert HSV / HSB (Hue, Saturation, Value/Brightness) into RGB and HEX.",
    "description": "Convert HSV coordinates used in graphics software into standard web RGB/HEX codes.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 38200,
    "tags": [
      "hsv",
      "hsb",
      "rgb",
      "converter",
      "photoshop"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Hue (0-360°), Sat (%), Value (%)",
        "desc": "Enter HSB coordinates."
      },
      {
        "step": 2,
        "title": "Convert to RGB",
        "desc": "Translates to RGB."
      },
      {
        "step": 3,
        "title": "Copy RGB value",
        "desc": "Copy string."
      }
    ],
    "faqs": [
      {
        "question": "Is HSV identical to HSB?",
        "answer": "Yes, HSV (Hue Saturation Value) and HSB (Hue Saturation Brightness) refer to the same color model."
      }
    ]
  },
  {
    "id": "random-color-generator",
    "slug": "random-color-generator",
    "name": "Random Aesthetic Color Palette Generator",
    "shortDesc": "Generate pleasing random HEX colors with one-click spacebar refresh.",
    "description": "Generate endless curated aesthetic colors and copy HEX values instantly.",
    "category": "Color Palettes & Contrast",
    "iconName": "Zap",
    "usageCount": 71200,
    "tags": [
      "random color",
      "aesthetic",
      "generator",
      "hex",
      "inspiration"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Click Generate",
        "desc": "Produces vibrant random color swatch."
      },
      {
        "step": 2,
        "title": "Lock favorite swatches",
        "desc": "Keep preferred colors locked."
      },
      {
        "step": 3,
        "title": "Copy HEX code",
        "desc": "Copy code."
      }
    ],
    "faqs": [
      {
        "question": "Are generated colors constrained for aesthetics?",
        "answer": "Uses saturation and lightness bounds to ensure vibrant, non-muddy colors."
      }
    ]
  },
  {
    "id": "material-design-color-generator",
    "slug": "material-design-color-generator",
    "name": "Material Design Color Palette Builder",
    "shortDesc": "Generate Material Design 50 to 900 color shade swatches for Android & Web.",
    "description": "Generate Material Design spec color palettes with primary, secondary, and surface tones.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 65100,
    "tags": [
      "material design",
      "android",
      "color palette",
      "shades",
      "ui design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select primary color",
        "desc": "Choose base seed color."
      },
      {
        "step": 2,
        "title": "Generate Material scale",
        "desc": "Outputs 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 scale."
      },
      {
        "step": 3,
        "title": "Copy XML or CSS variables",
        "desc": "Copy Android colors.xml or CSS."
      }
    ],
    "faqs": [
      {
        "question": "What is Material Design 500 shade?",
        "answer": "The default standard primary theme color."
      }
    ]
  },
  {
    "id": "flat-ui-color-picker",
    "slug": "flat-ui-color-picker",
    "name": "Flat UI Palette Reference Swatches",
    "shortDesc": "Browse modern Flat UI, Metro, and Pastel color swatches with 1-click copy.",
    "description": "Curated collection of vibrant Flat UI swatches (Turquoise, Emerald, Peter River, Amethyst).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 58200,
    "tags": [
      "flat ui",
      "swatches",
      "metro",
      "pastel",
      "colors"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Browse flat swatches",
        "desc": "View grid of Flat UI colors."
      },
      {
        "step": 2,
        "title": "Click swatch",
        "desc": "Copies HEX code to clipboard."
      },
      {
        "step": 3,
        "title": "Paste in design",
        "desc": "Use in CSS."
      }
    ],
    "faqs": [
      {
        "question": "Are these swatches free for commercial use?",
        "answer": "Yes, standard open-source UI palette swatches."
      }
    ]
  },
  {
    "id": "monochromatic-color-generator",
    "slug": "monochromatic-color-generator",
    "name": "Monochromatic Color Palette Builder",
    "shortDesc": "Generate elegant monochromatic palettes varying lightness and saturation.",
    "description": "Generate single-hue monochromatic palettes ideal for cohesive dark/light mode UI themes.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 49100,
    "tags": [
      "monochromatic",
      "color palette",
      "single hue",
      "dark mode",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick base hue",
        "desc": "Select seed color."
      },
      {
        "step": 2,
        "title": "Generate monochrome scale",
        "desc": "Calculates 5 matching monochromatic steps."
      },
      {
        "step": 3,
        "title": "Copy palette",
        "desc": "Copy HEX array."
      }
    ],
    "faqs": [
      {
        "question": "Why use monochromatic palettes?",
        "answer": "Ensures visual harmony without color clutter."
      }
    ]
  },
  {
    "id": "analogous-color-generator",
    "slug": "analogous-color-generator",
    "name": "Analogous Color Palette Generator",
    "shortDesc": "Generate 3 adjacent analogous color wheel swatches (30° hue offset).",
    "description": "Calculate smooth 30° adjacent color wheel palettes found in nature photography.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 41200,
    "tags": [
      "analogous",
      "color wheel",
      "palette",
      "harmony",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick base color",
        "desc": "Select center color."
      },
      {
        "step": 2,
        "title": "Set hue step angle",
        "desc": "Default 30° offset."
      },
      {
        "step": 3,
        "title": "Copy 3 analogous swatches",
        "desc": "Copy HEX codes."
      }
    ],
    "faqs": [
      {
        "question": "Where are analogous colors found?",
        "answer": "In nature landscapes, e.g., yellow, yellow-green, green."
      }
    ]
  },
  {
    "id": "triadic-color-generator",
    "slug": "triadic-color-generator",
    "name": "Triadic Color Scheme Generator",
    "shortDesc": "Calculate vibrant 120° equidistant color wheel triadic triplets.",
    "description": "Calculate 3 high-contrast, evenly spaced (120°) color wheel triplets.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 38400,
    "tags": [
      "triadic",
      "color wheel",
      "triplet",
      "120 degrees",
      "harmony"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick base color",
        "desc": "Select starting hue."
      },
      {
        "step": 2,
        "title": "Calculate triadic points",
        "desc": "Rotates 120° and 240° on color wheel."
      },
      {
        "step": 3,
        "title": "Copy 3 triadic HEX codes",
        "desc": "Copy palette."
      }
    ],
    "faqs": [
      {
        "question": "How to use triadic colors in UI design?",
        "answer": "Use 1 dominant color, and the other 2 as subtle accent highlights."
      }
    ]
  },
  {
    "id": "tetradic-color-generator",
    "slug": "tetradic-color-generator",
    "name": "Tetradic (Double-Complementary) Color Scheme Generator",
    "shortDesc": "Generate 4-color rectangle tetradic schemes pairing 2 complementary sets.",
    "description": "Calculate rich 4-color double-complementary palettes for illustrations and branding.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 31200,
    "tags": [
      "tetradic",
      "double complementary",
      "color scheme",
      "design",
      "palette"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick primary color",
        "desc": "Select base hue."
      },
      {
        "step": 2,
        "title": "Calculate tetradic scheme",
        "desc": "Generates 2 complementary pairs."
      },
      {
        "step": 3,
        "title": "Copy 4 HEX swatches",
        "desc": "Copy palette."
      }
    ],
    "faqs": [
      {
        "question": "Is tetradic scheme hard to balance?",
        "answer": "Yes, balance by letting 1 color dominate while using others for minor details."
      }
    ]
  },
  {
    "id": "pantone-to-hex-converter",
    "slug": "pantone-to-hex-converter",
    "name": "Pantone PMS to HEX Color Matcher",
    "shortDesc": "Find the nearest matching Pantone spot ink code for any digital HEX color.",
    "description": "Match digital sRGB HEX swatches to physical Pantone Matching System (PMS) print inks.",
    "category": "Color Palettes & Contrast",
    "iconName": "Search",
    "usageCount": 71400,
    "tags": [
      "pantone",
      "pms",
      "hex to pantone",
      "print ink",
      "matching"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter digital HEX color",
        "desc": "E.g. #FF5733."
      },
      {
        "step": 2,
        "title": "Find nearest Pantone PMS",
        "desc": "Outputs matching PMS code (e.g. Pantone 1655 C)."
      },
      {
        "step": 3,
        "title": "Copy PMS code",
        "desc": "Use in print production specs."
      }
    ],
    "faqs": [
      {
        "question": "What does \"C\" mean in Pantone 1655 C?",
        "answer": "\"C\" stands for Coated paper stock."
      }
    ]
  },
  {
    "id": "color-luminance-calculator",
    "slug": "color-luminance-calculator",
    "name": "Relative Luminance & Brightness Calculator",
    "shortDesc": "Calculate WCAG relative luminance (Y value 0.0 to 1.0) for any color.",
    "description": "Calculate WCAG 2.1 relative luminance formula values for perceptual brightness analysis.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "usageCount": 29800,
    "tags": [
      "luminance",
      "wcag",
      "perceptual brightness",
      "color",
      "accessibility"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter HEX or RGB",
        "desc": "Provide color."
      },
      {
        "step": 2,
        "title": "Calculate relative luminance",
        "desc": "Applies linearized gamma correction formula."
      },
      {
        "step": 3,
        "title": "Read Y value",
        "desc": "0.0 is pure black, 1.0 is pure white."
      }
    ],
    "faqs": [
      {
        "question": "What is relative luminance formula?",
        "answer": "Y = 0.2126 * R + 0.7152 * G + 0.0722 * B in sRGB linear space."
      }
    ]
  },
  {
    "id": "css-color-keyword-reference",
    "slug": "css-color-keyword-reference",
    "name": "CSS Named Colors Cheatsheet & Filter",
    "shortDesc": "Filter and search all 148 official named CSS colors with live swatches.",
    "description": "Complete searchable gallery of all 148 CSS named colors (e.g. rebeccapurple, crimson, teal).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 45200,
    "tags": [
      "css named colors",
      "rebeccapurple",
      "crimson",
      "cheatsheet",
      "reference"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Search color name",
        "desc": "Type name like \"blue\" or \"pink\"."
      },
      {
        "step": 2,
        "title": "Click color card",
        "desc": "Copies exact CSS named string."
      },
      {
        "step": 3,
        "title": "Paste in CSS",
        "desc": "Use directly in stylesheets."
      }
    ],
    "faqs": [
      {
        "question": "What is history of rebeccapurple color?",
        "answer": "Added to CSS spec in memory of Eric Meyer's daughter Rebecca."
      }
    ]
  },
  {
    "id": "dark-mode-palette-generator",
    "slug": "dark-mode-palette-generator",
    "name": "Dark Mode Surface & Elevation Color Generator",
    "shortDesc": "Generate Material Design dark mode surface elevation grays (1dp to 24dp).",
    "description": "Generate dark mode surface elevation colors with progressive white opacity overlays.",
    "category": "Color Palettes & Contrast",
    "iconName": "Moon",
    "usageCount": 81200,
    "tags": [
      "dark mode",
      "surface elevation",
      "material design",
      "grays",
      "ui design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick base dark background",
        "desc": "Default #121212."
      },
      {
        "step": 2,
        "title": "Generate elevation cards",
        "desc": "Outputs 1dp, 2dp, 4dp, 8dp, 12dp, 24dp surface colors."
      },
      {
        "step": 3,
        "title": "Copy CSS surface variables",
        "desc": "Paste into dark theme stylesheet."
      }
    ],
    "faqs": [
      {
        "question": "Why use elevated grays in dark mode instead of shadows?",
        "answer": "Drop shadows are invisible on pitch black backgrounds; lighter grays indicate physical elevation."
      }
    ]
  },
  {
    "id": "color-difference-delta-e-calculator",
    "slug": "color-difference-delta-e-calculator",
    "name": "Color Difference Delta E (ΔE) Calculator",
    "shortDesc": "Calculate CIE76 Delta E perceptual distance between two colors.",
    "description": "Calculate whether two colors look visually distinguishable to the human eye using Delta E formulas.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "usageCount": 31200,
    "tags": [
      "delta e",
      "color difference",
      "cie76",
      "perceptual distance",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Color 1 & Color 2",
        "desc": "Enter HEX codes."
      },
      {
        "step": 2,
        "title": "Calculate ΔE value",
        "desc": "Computes CIE76 perceptual distance."
      },
      {
        "step": 3,
        "title": "Read verdict",
        "desc": "ΔE < 1 is imperceptible; ΔE > 5 are visibly different colors."
      }
    ],
    "faqs": [
      {
        "question": "What ΔE score means imperceptible difference?",
        "answer": "ΔE <= 1.0 is considered the threshold of human visual perception."
      }
    ]
  },
  {
    "id": "pastel-color-palette-generator",
    "slug": "pastel-color-palette-generator",
    "name": "Pastel Color Palette Generator",
    "shortDesc": "Generate soft, high-lightness, low-saturation pastel color swatches.",
    "description": "Generate dreamy pastel palettes with high lightness (80-90%) and low saturation (30-50%).",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 65200,
    "tags": [
      "pastel",
      "color palette",
      "soft colors",
      "generator",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Click Generate",
        "desc": "Generates 5 matching soft pastel swatches."
      },
      {
        "step": 2,
        "title": "Adjust hue slider",
        "desc": "Shift overall palette tone."
      },
      {
        "step": 3,
        "title": "Copy HEX codes",
        "desc": "Copy palette."
      }
    ],
    "faqs": [
      {
        "question": "Why are pastels popular in modern UI?",
        "answer": "Pastel backgrounds create comfortable, low-strain visual environments."
      }
    ]
  },
  {
    "id": "neon-cyberpunk-color-generator",
    "slug": "neon-cyberpunk-color-generator",
    "name": "Neon & Cyberpunk Color Palette Generator",
    "shortDesc": "Generate vibrant high-saturation neon colors for dark gaming UI.",
    "description": "Generate high-intensity electric cyan, magenta, and neon green palettes for gaming interfaces.",
    "category": "Color Palettes & Contrast",
    "iconName": "Zap",
    "usageCount": 54200,
    "tags": [
      "neon",
      "cyberpunk",
      "gaming ui",
      "electric color",
      "generator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Click Generate Neon Palette",
        "desc": "Generates 100% saturation electric swatches."
      },
      {
        "step": 2,
        "title": "Preview on dark canvas",
        "desc": "Inspect glow against dark background."
      },
      {
        "step": 3,
        "title": "Copy CSS glow code",
        "desc": "Copy box-shadow neon code."
      }
    ],
    "faqs": [
      {
        "question": "What saturation is used for neon colors?",
        "answer": "Maximum 90-100% saturation at 50-60% lightness."
      }
    ]
  },
  {
    "id": "vintage-retro-color-generator",
    "slug": "vintage-retro-color-generator",
    "name": "Vintage & Retro 70s Color Palette Generator",
    "shortDesc": "Generate muted mustard, terracotta, sage green, and warm vintage swatches.",
    "description": "Generate 1970s warm retro color schemes with muted earthy saturation.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 42100,
    "tags": [
      "vintage",
      "retro",
      "70s",
      "terracotta",
      "earthy"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Generate Retro Palette",
        "desc": "Produces mustard, rust, sage, warm cream swatches."
      },
      {
        "step": 2,
        "title": "Fine-tune warmth",
        "desc": "Adjust warm temperature slider."
      },
      {
        "step": 3,
        "title": "Copy HEX codes",
        "desc": "Copy palette."
      }
    ],
    "faqs": [
      {
        "question": "What defines retro palettes?",
        "answer": "Desaturated warm hues with high yellow/brown undertones."
      }
    ]
  },
  {
    "id": "duotone-gradient-generator",
    "slug": "duotone-gradient-generator",
    "name": "Duotone Photo Filter Color Pair Generator",
    "shortDesc": "Pick shadow and highlight color pairs for Spotify-style duotone images.",
    "description": "Select complementary shadow and highlight color pairs for duotone CSS blend filters.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 38100,
    "tags": [
      "duotone",
      "spotify style",
      "shadow highlight",
      "css blend mode",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick Shadow color",
        "desc": "E.g. deep navy or purple."
      },
      {
        "step": 2,
        "title": "Pick Highlight color",
        "desc": "E.g. bright yellow or hot pink."
      },
      {
        "step": 3,
        "title": "Copy CSS mix-blend-mode code",
        "desc": "Apply to photo overlays."
      }
    ],
    "faqs": [
      {
        "question": "How is duotone achieved in CSS?",
        "answer": "Using background color overlays with mix-blend-mode: screen and multiply."
      }
    ]
  },
  {
    "id": "color-temperature-converter",
    "slug": "color-temperature-converter",
    "name": "Color Temperature (Kelvin) to RGB Converter",
    "shortDesc": "Convert color temperature in Kelvin (1000K candle to 10000K blue sky) to RGB.",
    "description": "Convert lighting color temperatures (2700K warm white, 6500K daylight) to RGB/HEX values.",
    "category": "Color Palettes & Contrast",
    "iconName": "Sun",
    "usageCount": 34100,
    "tags": [
      "kelvin",
      "color temperature",
      "warm white",
      "daylight",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Slide Kelvin temperature",
        "desc": "Range 1000K to 10000K."
      },
      {
        "step": 2,
        "title": "Inspect lighting color",
        "desc": "2700K warm candle, 6500K noon daylight."
      },
      {
        "step": 3,
        "title": "Copy RGB value",
        "desc": "Copy hex/rgb code."
      }
    ],
    "faqs": [
      {
        "question": "What Kelvin is standard daylight white?",
        "answer": "6500 Kelvin (D65 standard illuminant)."
      }
    ]
  },
  {
    "id": "css-variables-color-exporter",
    "slug": "css-variables-color-exporter",
    "name": "CSS Custom Properties (:root) Color Exporter",
    "shortDesc": "Convert any color palette array into clean CSS :root variables.",
    "description": "Format color swatch lists into formatted CSS --color-primary variable syntax.",
    "category": "Color Palettes & Contrast",
    "iconName": "Code",
    "usageCount": 51200,
    "tags": [
      "css variables",
      "root",
      "custom properties",
      "theme",
      "exporter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste HEX color list",
        "desc": "Enter swatches."
      },
      {
        "step": 2,
        "title": "Set variable prefix",
        "desc": "E.g. --brand-."
      },
      {
        "step": 3,
        "title": "Copy CSS :root block",
        "desc": "Paste into global stylesheet."
      }
    ],
    "faqs": [
      {
        "question": "Why use CSS variables for theme colors?",
        "answer": "Permits runtime theme switching without rebuilding CSS files."
      }
    ]
  },
  {
    "id": "json-color-palette-exporter",
    "slug": "json-color-palette-exporter",
    "name": "Color Palette to JSON / Tokens Exporter",
    "shortDesc": "Export color swatches as Design Tokens JSON for Figma and Style Dictionary.",
    "description": "Format custom color palettes into W3C Design Tokens JSON format for cross-platform apps.",
    "category": "Color Palettes & Contrast",
    "iconName": "Code",
    "usageCount": 39400,
    "tags": [
      "design tokens",
      "json",
      "figma",
      "exporter",
      "style dictionary"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter palette name & swatches",
        "desc": "Provide colors."
      },
      {
        "step": 2,
        "title": "Select JSON format",
        "desc": "Choose Design Tokens W3C format."
      },
      {
        "step": 3,
        "title": "Download tokens.json",
        "desc": "Import into build tools."
      }
    ],
    "faqs": [
      {
        "question": "What are Design Tokens?",
        "answer": "Platform-agnostic single-source-of-truth style variables (colors, spacing, fonts)."
      }
    ]
  },
  {
    "id": "image-color-palette-extractor",
    "slug": "image-color-palette-extractor",
    "name": "Image Dominant Color Palette Extractor",
    "shortDesc": "Upload photos to extract top 5 dominant colors using Canvas quantization.",
    "description": "Extract dominant color swatches and accent colors from uploaded image files in browser.",
    "category": "Color Palettes & Contrast",
    "iconName": "Image",
    "usageCount": 94100,
    "tags": [
      "image colors",
      "dominant colors",
      "palette extractor",
      "canvas",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload photo image",
        "desc": "Select JPG/PNG."
      },
      {
        "step": 2,
        "title": "Run color quantization",
        "desc": "Canvas analyzes pixel histogram."
      },
      {
        "step": 3,
        "title": "Copy 5 dominant HEX codes",
        "desc": "Copy extracted palette."
      }
    ],
    "faqs": [
      {
        "question": "Are images sent to external servers?",
        "answer": "No, image pixel analysis happens 100% in local browser Canvas."
      }
    ]
  },
  {
    "id": "color-palette-contrast-matrix",
    "slug": "color-palette-contrast-matrix",
    "name": "Multi-Color Palette Contrast Grid Matrix",
    "shortDesc": "Test WCAG contrast ratios across every combination pair in a 5-color palette.",
    "description": "Grid matrix calculator testing WCAG contrast pass/fail across all text/background combinations in a palette.",
    "category": "Color Palettes & Contrast",
    "iconName": "Eye",
    "usageCount": 42100,
    "tags": [
      "contrast matrix",
      "palette audit",
      "wcag grid",
      "accessibility",
      "design system"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter 5 palette colors",
        "desc": "Provide swatches."
      },
      {
        "step": 2,
        "title": "View 5x5 grid matrix",
        "desc": "Rows indicate background, columns indicate text."
      },
      {
        "step": 3,
        "title": "Identify accessible pairs",
        "desc": "Green cells pass WCAG AA contrast (4.5:1+)."
      }
    ],
    "faqs": [
      {
        "question": "Why use a contrast matrix?",
        "answer": "Quickly reveals which theme colors can be paired safely for text legibility."
      }
    ]
  },
  {
    "id": "hex-color-shorter",
    "slug": "hex-color-shorter",
    "name": "HEX Color 3-Digit Shorthand Minifier",
    "shortDesc": "Check if 6-digit #RRGGBB colors can be shortened to 3-digit #RGB CSS shorthand.",
    "description": "Optimize CSS file sizes by minifying double-digit HEX colors (e.g. #ff0033 -> #f03).",
    "category": "Color Palettes & Contrast",
    "iconName": "Code",
    "usageCount": 28400,
    "tags": [
      "hex shorthand",
      "minifier",
      "css optimization",
      "color",
      "shorthand"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste HEX code",
        "desc": "E.g. #00bb88."
      },
      {
        "step": 2,
        "title": "Check shorthand eligibility",
        "desc": "If R1=R2, G1=G2, B1=B2, converts to #0b8."
      },
      {
        "step": 3,
        "title": "Copy minified HEX",
        "desc": "Save shorthand code."
      }
    ],
    "faqs": [
      {
        "question": "Can #123456 be shortened?",
        "answer": "No, only pairs with identical hex digits (e.g., #112233 -> #123) can be minified."
      }
    ]
  },
  {
    "id": "color-hue-rotator",
    "slug": "color-hue-rotator",
    "name": "Color Hue Angle Rotator",
    "shortDesc": "Rotate hue of any color by +30°, +90°, +180° around the HSL color wheel.",
    "description": "Rotate HSL hue degrees to shift color wheel tone while preserving saturation and lightness.",
    "category": "Color Palettes & Contrast",
    "iconName": "RotateCcw",
    "usageCount": 31200,
    "tags": [
      "hue rotate",
      "color wheel",
      "hsl",
      "angle",
      "color"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter base color",
        "desc": "Provide HEX code."
      },
      {
        "step": 2,
        "title": "Slide rotation angle",
        "desc": "Shift hue -180° to +180°."
      },
      {
        "step": 3,
        "title": "Copy shifted color",
        "desc": "Copy new HEX value."
      }
    ],
    "faqs": [
      {
        "question": "What angle produces the exact opposite complementary color?",
        "answer": "180 degrees hue rotation."
      }
    ]
  },
  {
    "id": "color-saturator-desaturator",
    "slug": "color-saturator-desaturator",
    "name": "Color Saturation & Desaturation Tool",
    "shortDesc": "Increase or decrease color saturation percentage from vibrant to desaturated gray.",
    "description": "Adjust HSL saturation percentage to tone down vibrant colors or boost muted swatches.",
    "category": "Color Palettes & Contrast",
    "iconName": "Palette",
    "usageCount": 29800,
    "tags": [
      "saturation",
      "desaturate",
      "hsl",
      "color adjustment",
      "design"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter base color",
        "desc": "Provide HEX code."
      },
      {
        "step": 2,
        "title": "Slide Saturation slider",
        "desc": "0% is grayscale, 100% is full saturation."
      },
      {
        "step": 3,
        "title": "Copy adjusted color",
        "desc": "Copy HEX code."
      }
    ],
    "faqs": [
      {
        "question": "What happens at 0% saturation?",
        "answer": "Color converts completely to neutral gray."
      }
    ]
  }
];
export default tools;
