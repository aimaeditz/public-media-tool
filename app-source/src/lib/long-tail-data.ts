export interface LongTailConversionItem {
  inputVal: number;
  outputVal: number | string;
  note?: string;
}

export interface LongTailPageData {
  slug: string;
  path: string;
  type: 'converter' | 'finance' | 'math' | 'color';
  category: string;
  categorySlug: string;
  parentToolSlug: string;
  parentToolName: string;
  title: string;
  h1: string;
  metaDescription: string;
  unitFrom?: string;
  unitTo?: string;
  factor?: number; // output = input * factor
  offset?: number; // for temperature e.g. celsius to fahrenheit: (C * 9/5) + 32
  formula: string;
  summary: string;
  content: string; // 200+ words in-depth article
  tableHeaderFrom?: string;
  tableHeaderTo?: string;
  sampleRows?: LongTailConversionItem[];
  howToSteps: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  features: string[];
  relatedSlugs: string[];
}

export const LONG_TAIL_PAGES: LongTailPageData[] = [
  // 1. Liters to Gallons
  {
    slug: 'liters-to-gallons',
    path: '/converters/volume/liters-to-gallons',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'volume-capacity-converter-master',
    parentToolName: 'Volume Capacity Converter Master',
    title: 'Liters to Gallons Converter (L to Gal) — Free Online Tool',
    h1: 'Liters to Gallons Converter (L to US Gallons)',
    metaDescription: 'Convert Liters to US Gallons (L to Gal) instantly with exact decimal precision. 100% private, free client-side calculator with zero server uploads.',
    unitFrom: 'Liters (L)',
    unitTo: 'US Liquid Gallons (gal)',
    factor: 0.264172052,
    formula: 'Gallons = Liters × 0.264172052 (or Liters ÷ 3.785411784)',
    summary: 'Instantly convert volume measurements from metric Liters to US Liquid Gallons with high decimal precision.',
    content: `Converting liters (L) to US liquid gallons (gal) is a standard mathematical and physical transformation used across fuel calculations, science laboratories, automotive fluids, brewing, aquatics, and international commerce. A liter is the International System of Units (SI) metric measure of volume equal to 1 cubic decimeter (1,000 cm³), whereas the US liquid gallon is defined as 231 cubic inches, exactly 3.785411784 liters. To convert any value from liters to gallons, multiply the number of liters by 0.264172052, or divide the volume by 3.785411784. This tool runs entirely in your local web browser engine, ensuring instant calculation with zero network latency and complete privacy for all engineering and personal logs.`,
    tableHeaderFrom: 'Liters (L)',
    tableHeaderTo: 'US Gallons (gal)',
    sampleRows: [
      { inputVal: 1, outputVal: '0.2642 gal' },
      { inputVal: 2, outputVal: '0.5283 gal' },
      { inputVal: 3.785, outputVal: '1.0000 gal' },
      { inputVal: 5, outputVal: '1.3209 gal' },
      { inputVal: 10, outputVal: '2.6417 gal' },
      { inputVal: 20, outputVal: '5.2834 gal' },
      { inputVal: 50, outputVal: '13.2086 gal' },
      { inputVal: 100, outputVal: '26.4172 gal' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter Liters', desc: 'Type the volume in liters into the input box below.' },
      { step: 2, title: 'Instant Calculation', desc: 'The client-side engine calculates the exact US gallon equivalent in real-time.' },
      { step: 3, title: 'Copy Result', desc: 'Copy the formatted answer to your clipboard or adjust decimal precision.' },
    ],
    faqs: [
      { question: 'How many gallons are in 1 liter?', answer: 'There are approximately 0.264172 US liquid gallons in 1 metric liter.' },
      { question: 'What is the exact conversion formula from liters to gallons?', answer: 'Gallons = Liters × 0.264172052, or Gallons = Liters / 3.785411784.' },
      { question: 'Is this converter free and private?', answer: 'Yes, 100% free with unlimited conversions running completely on your device without server transmission.' },
    ],
    features: [
      'High-precision float calculations up to 8 decimal places',
      'Instant bidirectional live updating',
      'Zero server upload — 100% client-side security',
      'Responsive interface for mobile, tablet and desktop',
    ],
    relatedSlugs: ['cups-to-ml', 'cubic-meters-to-liters', 'gallons-to-liters', 'fluid-ounces-to-ml'],
  },

  // 2. Cups to mL
  {
    slug: 'cups-to-ml',
    path: '/converters/volume/cups-to-ml',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'volume-capacity-converter-master',
    parentToolName: 'Volume Capacity Converter Master',
    title: 'Cups to mL Converter (US Cups to Milliliters) — Free Tool',
    h1: 'Cups to Milliliters Converter (US Cups to mL)',
    metaDescription: 'Convert US Cups to Milliliters (cups to mL) instantly for recipes, baking, and science. 100% private, free online conversion tool with zero signup.',
    unitFrom: 'US Cups (cup)',
    unitTo: 'Milliliters (mL)',
    factor: 236.5882365,
    formula: 'Milliliters (mL) = Cups × 236.5882365',
    summary: 'Accurately convert US measuring cups into metric milliliters (mL) for cooking, culinary measurements, and chemistry.',
    content: `Converting cups to milliliters (mL) is essential for cooking, culinary arts, pastry baking, beverage preparation, and nutritional planning. A standard US customary cup is defined as exactly 8 fluid ounces, which equals 236.5882365 milliliters. When adapting recipes from imperial to metric measurements, converting cups to mL ensures perfect baking ratios, dough consistency, and flavor balance. This converter calculates results to extreme mathematical precision in your browser instantly.`,
    tableHeaderFrom: 'US Cups',
    tableHeaderTo: 'Milliliters (mL)',
    sampleRows: [
      { inputVal: 0.25, outputVal: '59.15 mL' },
      { inputVal: 0.33, outputVal: '78.07 mL' },
      { inputVal: 0.5, outputVal: '118.29 mL' },
      { inputVal: 0.75, outputVal: '177.44 mL' },
      { inputVal: 1, outputVal: '236.59 mL' },
      { inputVal: 2, outputVal: '473.18 mL' },
      { inputVal: 3, outputVal: '709.76 mL' },
      { inputVal: 4, outputVal: '946.35 mL' },
    ],
    howToSteps: [
      { step: 1, title: 'Input Cup Fraction or Decimal', desc: 'Type in whole or decimal cup amounts (e.g., 0.5, 1.5, 2.25).' },
      { step: 2, title: 'Instant Metric Result', desc: 'The exact volume in milliliters is calculated automatically.' },
      { step: 3, title: 'Apply to Recipe', desc: 'Copy the milliliter value for exact ingredient portioning.' },
    ],
    faqs: [
      { question: 'How many mL are in 1 US cup?', answer: 'One standard US cup equals exactly 236.5882365 mL (commonly rounded to 237 mL or 240 mL for metric cups).' },
      { question: 'How many mL is half a cup?', answer: 'Half a US cup (0.5 cup) equals 118.29 mL.' },
      { question: 'Can I convert fractions like 1/4 or 3/4 cup?', answer: 'Yes! Enter 0.25 for 1/4 cup (59.15 mL) or 0.75 for 3/4 cup (177.44 mL).' },
    ],
    features: [
      'Tailored for culinary and baking accuracy',
      'Supports fractional and decimal input',
      'Zero server logs or data transmission',
      'Instant copy to clipboard',
    ],
    relatedSlugs: ['liters-to-gallons', 'tablespoons-to-teaspoons', 'fluid-ounces-to-ml', 'gallons-to-liters'],
  },

  // 3. Meters to Feet
  {
    slug: 'meters-to-feet',
    path: '/converters/length/meters-to-feet',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'universal-length-unit-converter',
    parentToolName: 'Universal Length Unit Converter',
    title: 'Meters to Feet Converter (m to ft) — Free Online Tool',
    h1: 'Meters to Feet Converter (m to ft)',
    metaDescription: 'Convert Meters to Feet (m to ft) with exact mathematical precision. Free, fast browser-based conversion calculator with zero uploads.',
    unitFrom: 'Meters (m)',
    unitTo: 'Feet (ft)',
    factor: 3.280839895,
    formula: 'Feet = Meters × 3.280839895 (or Meters ÷ 0.3048)',
    summary: 'Convert metric meters into imperial feet and inches for construction, architecture, athletics, and engineering.',
    content: `Converting meters (m) to feet (ft) is one of the most widely performed length transformations worldwide. The meter is the base unit of length in the International System of Units (SI), defined by the distance light travels in a vacuum in 1/299,792,458 of a second. The international foot is defined as exactly 0.3048 meters. To convert meters to feet, multiply the distance in meters by 3.280839895. Whether you are blueprinting architectural layouts, reviewing real estate dimensions, or computing athletic track distances, this utility provides exact calculations instantly.`,
    tableHeaderFrom: 'Meters (m)',
    tableHeaderTo: 'Feet (ft)',
    sampleRows: [
      { inputVal: 1, outputVal: '3.2808 ft' },
      { inputVal: 2, outputVal: '6.5617 ft' },
      { inputVal: 5, outputVal: '16.4042 ft' },
      { inputVal: 10, outputVal: '32.8084 ft' },
      { inputVal: 25, outputVal: '82.0210 ft' },
      { inputVal: 50, outputVal: '164.0420 ft' },
      { inputVal: 100, outputVal: '328.0840 ft' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter Length in Meters', desc: 'Type your length or distance in meters into the field.' },
      { step: 2, title: 'View Feet Output', desc: 'The client-side engine calculates the exact feet equivalent.' },
      { step: 3, title: 'Export or Copy', desc: 'Copy the numeric value or note the feet measurement.' },
    ],
    faqs: [
      { question: 'How many feet are in 1 meter?', answer: 'One meter equals approximately 3.28084 feet (3 feet and 3.37 inches).' },
      { question: 'What is the conversion factor between meters and feet?', answer: '1 foot is defined as exactly 0.3048 meters. Thus, 1 meter = 1 / 0.3048 = 3.280839895 feet.' },
      { question: 'How do I convert 1.8 meters to feet?', answer: '1.8 meters × 3.28084 = 5.9055 feet (approximately 5 feet 11 inches).' },
    ],
    features: [
      'Exact SI to Imperial conversion algorithms',
      'Real-time output with high float precision',
      '100% private client-side processing',
      'No registration or payment required',
    ],
    relatedSlugs: ['inches-to-cm', 'miles-to-km', 'feet-to-meters', 'centimeters-to-inches'],
  },

  // 4. Inches to Centimeters
  {
    slug: 'inches-to-cm',
    path: '/converters/length/inches-to-cm',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'universal-length-unit-converter',
    parentToolName: 'Universal Length Unit Converter',
    title: 'Inches to Centimeters Converter (in to cm) — Free Tool',
    h1: 'Inches to Centimeters Converter (in to cm)',
    metaDescription: 'Convert Inches to Centimeters (in to cm) instantly with exact 2.54 conversion ratio. Free online calculator with zero server uploads.',
    unitFrom: 'Inches (in)',
    unitTo: 'Centimeters (cm)',
    factor: 2.54,
    formula: 'Centimeters (cm) = Inches × 2.54',
    summary: 'Convert imperial inches into metric centimeters (cm) with exact mathematical ratio (1 in = 2.54 cm).',
    content: `Converting inches (in) to centimeters (cm) is an exact mathematical transformation. Under the 1959 international agreement, 1 yard is defined as 0.9144 meters, making 1 inch exactly equal to 2.54 centimeters. This clean 2.54 constant means there is zero rounding error when converting between inches and metric centimeters. This conversion is crucial for 3D printing tolerances, clothing tailoring, screen sizing, photography prints, and precision machining.`,
    tableHeaderFrom: 'Inches (in)',
    tableHeaderTo: 'Centimeters (cm)',
    sampleRows: [
      { inputVal: 1, outputVal: '2.54 cm' },
      { inputVal: 2, outputVal: '5.08 cm' },
      { inputVal: 4, outputVal: '10.16 cm' },
      { inputVal: 6, outputVal: '15.24 cm' },
      { inputVal: 8, outputVal: '20.32 cm' },
      { inputVal: 10, outputVal: '25.40 cm' },
      { inputVal: 12, outputVal: '30.48 cm' },
      { inputVal: 24, outputVal: '60.96 cm' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter Inches', desc: 'Type the value in inches into the input box.' },
      { step: 2, title: 'Instant Conversion', desc: 'The exact value is multiplied by 2.54 in real time.' },
      { step: 3, title: 'Copy Result', desc: 'Copy your centimeter measurement with one click.' },
    ],
    faqs: [
      { question: 'Is 1 inch exactly 2.54 cm?', answer: 'Yes! By international definition since 1959, 1 inch is defined as exactly 2.54 centimeters.' },
      { question: 'How do you convert 6 inches to cm?', answer: '6 inches × 2.54 = 15.24 cm.' },
      { question: 'How do you convert 12 inches (1 foot) to cm?', answer: '12 inches × 2.54 = 30.48 cm.' },
    ],
    features: [
      'Exact 2.54 international standard calculation',
      'Instant real-time bidirectional output',
      'No cookies, tracking, or server uploads',
      'Works seamlessly offline once loaded',
    ],
    relatedSlugs: ['meters-to-feet', 'centimeters-to-inches', 'miles-to-km', 'feet-to-meters'],
  },

  // 5. Kilograms to Pounds
  {
    slug: 'kg-to-lbs',
    path: '/converters/weight/kg-to-lbs',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'universal-length-unit-converter',
    parentToolName: 'Universal Length Unit Converter',
    title: 'Kilograms to Pounds Converter (kg to lbs) — Free Tool',
    h1: 'Kilograms to Pounds Converter (kg to lbs)',
    metaDescription: 'Convert Kilograms to Pounds (kg to lbs) instantly with high precision. 100% private, free browser-based conversion calculator with no signup.',
    unitFrom: 'Kilograms (kg)',
    unitTo: 'Pounds (lbs)',
    factor: 2.20462262185,
    formula: 'Pounds (lbs) = Kilograms × 2.20462262185 (or kg ÷ 0.45359237)',
    summary: 'Convert metric kilograms into avoirdupois pounds (lbs) for fitness, shipping weight, body mass, and aviation.',
    content: `Converting kilograms (kg) to pounds (lbs) is an essential mass conversion used in aviation weight and balance, fitness and bodybuilding tracking, international cargo logistics, and medical dosage calculations. One international avoirdupois pound is legally defined as exactly 0.45359237 kilograms. Therefore, to convert kilograms to pounds, multiply by 2.20462262185. This web app computes weight transformations in real-time on your computer or smartphone without sending any data over the network.`,
    tableHeaderFrom: 'Kilograms (kg)',
    tableHeaderTo: 'Pounds (lbs)',
    sampleRows: [
      { inputVal: 1, outputVal: '2.2046 lbs' },
      { inputVal: 5, outputVal: '11.0231 lbs' },
      { inputVal: 10, outputVal: '22.0462 lbs' },
      { inputVal: 20, outputVal: '44.0925 lbs' },
      { inputVal: 50, outputVal: '110.2311 lbs' },
      { inputVal: 70, outputVal: '154.3236 lbs' },
      { inputVal: 100, outputVal: '220.4623 lbs' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter Kilograms', desc: 'Type your weight in kilograms in the field below.' },
      { step: 2, title: 'Real-Time Calculation', desc: 'The exact pound equivalent is computed instantly.' },
      { step: 3, title: 'Copy or Note', desc: 'Copy the resulting pounds directly to your clipboard.' },
    ],
    faqs: [
      { question: 'How many pounds are in 1 kilogram?', answer: '1 kilogram equals approximately 2.20462 pounds.' },
      { question: 'What is 70 kg in pounds?', answer: '70 kg × 2.2046226 = 154.32 pounds.' },
      { question: 'What is 80 kg in pounds?', answer: '80 kg × 2.2046226 = 176.37 pounds.' },
    ],
    features: [
      'High accuracy based on international 0.45359237 standard',
      'Instant sub-millisecond calculation',
      'No signups, subscriptions, or paywalls',
      'Optimized for mobile touchscreens',
    ],
    relatedSlugs: ['grams-to-ounces', 'pounds-to-kilograms', 'ounces-to-grams', 'liters-to-gallons'],
  },

  // 6. Celsius to Fahrenheit
  {
    slug: 'celsius-to-fahrenheit',
    path: '/converters/temperature/celsius-to-fahrenheit',
    type: 'converter',
    category: 'Unit Converters',
    categorySlug: 'unit-converters',
    parentToolSlug: 'universal-length-unit-converter',
    parentToolName: 'Universal Length Unit Converter',
    title: 'Celsius to Fahrenheit Converter (°C to °F) — Free Tool',
    h1: 'Celsius to Fahrenheit Converter (°C to °F)',
    metaDescription: 'Convert Celsius to Fahrenheit (°C to °F) instantly using the exact formula (C × 9/5) + 32. 100% private, free online temperature calculator.',
    unitFrom: 'Celsius (°C)',
    unitTo: 'Fahrenheit (°F)',
    factor: 1.8,
    offset: 32,
    formula: '°F = (°C × 9/5) + 32 (or °F = °C × 1.8 + 32)',
    summary: 'Accurately convert temperature between Celsius and Fahrenheit scales with exact mathematical scaling.',
    content: `Converting Celsius (°C) to Fahrenheit (°F) is the primary temperature conversion used for weather forecasts, HVAC calibration, cooking oven temperatures, and scientific measurements. The Celsius scale sets the freezing point of pure water at 0°C and boiling point at 100°C at 1 atmosphere of pressure, while Fahrenheit sets them at 32°F and 212°F respectively. Because a degree Celsius represents 1.8 degrees Fahrenheit (180/100 = 9/5), the conversion requires multiplying Celsius by 9/5 and adding 32. This tool calculates exact temperatures instantaneously.`,
    tableHeaderFrom: 'Celsius (°C)',
    tableHeaderTo: 'Fahrenheit (°F)',
    sampleRows: [
      { inputVal: -40, outputVal: '-40.0 °F', note: 'Intersection point' },
      { inputVal: 0, outputVal: '32.0 °F', note: 'Freezing point of water' },
      { inputVal: 20, outputVal: '68.0 °F', note: 'Room temperature' },
      { inputVal: 37, outputVal: '98.6 °F', note: 'Human body temperature' },
      { inputVal: 100, outputVal: '212.0 °F', note: 'Boiling point of water' },
      { inputVal: 180, outputVal: '356.0 °F', note: 'Baking temperature' },
      { inputVal: 200, outputVal: '392.0 °F', note: 'High oven temperature' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter Temperature in °C', desc: 'Type your temperature in degrees Celsius.' },
      { step: 2, title: 'Instant Calculation', desc: 'The mathematical equation (°C × 1.8 + 32) is applied instantly.' },
      { step: 3, title: 'Copy Result', desc: 'View the Fahrenheit output and copy to clipboard.' },
    ],
    faqs: [
      { question: 'What is the formula to convert Celsius to Fahrenheit?', answer: 'Multiply the Celsius temperature by 1.8 (or 9/5) and add 32: °F = (°C × 1.8) + 32.' },
      { question: 'What temperature is the same in Celsius and Fahrenheit?', answer: '-40°C is exactly equal to -40°F.' },
      { question: 'What is 37°C in Fahrenheit?', answer: '37°C equals 98.6°F (normal average human body temperature).' },
    ],
    features: [
      'Exact temperature scaling algorithm',
      'Supports negative and decimal temperatures',
      'Real-time output with one-click copy',
      'Zero server dependencies',
    ],
    relatedSlugs: ['fahrenheit-to-celsius', 'kg-to-lbs', 'liters-to-gallons', 'inches-to-cm'],
  },

  // 7. Compound Interest Calculator
  {
    slug: 'compound-interest-calculator',
    path: '/calculators/finance/compound-interest-calculator',
    type: 'finance',
    category: 'Financial Calculators',
    categorySlug: 'financial-calculators',
    parentToolSlug: 'personal-loan-emi-calculator-pro',
    parentToolName: 'Financial Calculators Pro',
    title: 'Compound Interest Calculator — Free Online Investment Tool',
    h1: 'Compound Interest Calculator (Annual, Monthly & Daily)',
    metaDescription: 'Calculate compound interest growth over time with monthly deposits. 100% private, free investment growth calculator with zero server uploads.',
    formula: 'A = P × (1 + r/n)^(n×t)',
    summary: 'Forecast the future exponential growth of your investments and savings with compound interest.',
    content: `Compound interest is the interest calculated on the initial principal and also on the accumulated interest of previous periods. Often described as interest on interest, it causes investments to grow exponentially over time rather than linearly. The standard compound interest formula is A = P(1 + r/n)^(nt), where A represents the final amount, P is the initial principal balance, r is the annual nominal interest rate in decimal form, n is the number of times interest compounds per year, and t is the total number of years the money is invested. Using this browser tool, you can model different compounding frequencies, monthly contributions, and time horizons instantly with complete privacy.`,
    howToSteps: [
      { step: 1, title: 'Set Principal & Contribution', desc: 'Enter initial investment balance and optional monthly additions.' },
      { step: 2, title: 'Set Rate & Term', desc: 'Input expected annual interest rate and duration in years.' },
      { step: 3, title: 'Review Growth Breakdown', desc: 'Inspect total final balance, total principal invested, and interest accrued.' },
    ],
    faqs: [
      { question: 'What is the compound interest formula?', answer: 'A = P(1 + r/n)^(nt), where P is principal, r is interest rate, n is compounding frequency per year, and t is time in years.' },
      { question: 'How often does interest compound in bank accounts?', answer: 'Most savings and deposit accounts compound either daily or monthly and credit interest monthly.' },
      { question: 'What is the Rule of 72 in finance?', answer: 'The Rule of 72 is a quick estimation: divide 72 by the annual interest rate to determine approximately how many years it takes for an investment to double.' },
    ],
    features: [
      'Visual breakdown of principal vs accumulated interest',
      'Adjustable compounding intervals (Annually, Monthly, Daily)',
      '100% client-side privacy for financial data',
      'No login or account creation required',
    ],
    relatedSlugs: ['mortgage-amortization-calculator', 'simple-interest-calculator', 'percentage-difference-calculator'],
  },

  // 8. Hex to RGB Converter
  {
    slug: 'hex-to-rgb-converter',
    path: '/tools/color/hex-to-rgb-converter',
    type: 'color',
    category: 'Color Converters',
    categorySlug: 'color-converters',
    parentToolSlug: 'hex-rgb-hsl-color-matrix-suite',
    parentToolName: 'Hex RGB HSL Color Matrix Suite',
    title: 'HEX to RGB Color Converter — Free Online CSS Tool',
    h1: 'HEX to RGB Color Converter (with CSS Code & Preview)',
    metaDescription: 'Convert HEX color codes (#ffffff) to RGB (rgb(255, 255, 255)) and RGBA CSS values instantly. 100% private, free web developer tool with live preview.',
    formula: 'R = hex[1..2] in base 16, G = hex[3..4] in base 16, B = hex[5..6] in base 16',
    summary: 'Convert 3-digit and 6-digit hexadecimal color codes into standard RGB, RGBA, and HSL CSS color strings.',
    content: `Hexadecimal (HEX) color codes and Red-Green-Blue (RGB) representations are the foundation of digital color formatting in CSS, HTML, WebGL, and graphic software. A 6-character hex code represents three 8-bit bytes for Red, Green, and Blue in base 16 (00 to FF, corresponding to 0 to 255 in base 10). Converting HEX to RGB allows web designers and frontend engineers to apply alpha transparency channels (RGBA), animate color channels in CSS transitions, and integrate colors programmatically. This utility converts colors in real time directly inside your browser.`,
    tableHeaderFrom: 'HEX Color',
    tableHeaderTo: 'RGB Values',
    sampleRows: [
      { inputVal: 0, outputVal: 'rgb(0, 0, 0)', note: '#000000 (Pure Black)' },
      { inputVal: 0, outputVal: 'rgb(255, 255, 255)', note: '#FFFFFF (Pure White)' },
      { inputVal: 0, outputVal: 'rgb(239, 68, 68)', note: '#EF4444 (Red 500)' },
      { inputVal: 0, outputVal: 'rgb(59, 130, 246)', note: '#3B82F6 (Blue 500)' },
      { inputVal: 0, outputVal: 'rgb(16, 185, 129)', note: '#10B981 (Emerald 500)' },
      { inputVal: 0, outputVal: 'rgb(99, 102, 241)', note: '#6366F1 (Indigo 500)' },
    ],
    howToSteps: [
      { step: 1, title: 'Enter HEX Code', desc: 'Type or paste your 3-character or 6-character hex color (e.g., #4F46E5).' },
      { step: 2, title: 'Instant Live Preview', desc: 'View the parsed RGB values and live color swatch immediately.' },
      { step: 3, title: 'Copy CSS Snippet', desc: 'Copy rgb(...) or rgba(...) format directly into your stylesheet.' },
    ],
    faqs: [
      { question: 'How do you convert HEX to RGB manually?', answer: 'Take each two-character pair (RR, GG, BB) and convert from base-16 hex to base-10 decimal. For example, FF in hex is (15 × 16) + 15 = 255.' },
      { question: 'Can I convert 3-digit shorthand HEX codes?', answer: 'Yes, shorthand HEX codes like #F00 expand to #FF0000 (rgb(255, 0, 0)).' },
      { question: 'How do I add transparency in CSS with RGB?', answer: 'Use the RGBA notation: rgba(R, G, B, Alpha), where Alpha is between 0.0 (fully transparent) and 1.0 (fully opaque).' },
    ],
    features: [
      'Supports 3-digit, 6-digit, and 8-digit HEX inputs',
      'Real-time interactive color swatch preview',
      'One-click CSS code generation for RGB & RGBA',
      'Zero network traffic — runs 100% locally',
    ],
    relatedSlugs: ['rgb-to-hsl-converter', 'meters-to-feet', 'liters-to-gallons'],
  },
];

export function getLongTailPageBySlug(slug: string): LongTailPageData | undefined {
  return LONG_TAIL_PAGES.find((p) => p.slug === slug);
}

export function getLongTailPageByPath(path: string): LongTailPageData | undefined {
  const norm = path.startsWith('/') ? path : `/${path}`;
  return LONG_TAIL_PAGES.find((p) => p.path === norm || p.slug === norm.replace(/^\//, ''));
}
