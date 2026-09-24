import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "unit-converter",
    "slug": "unit-converter",
    "name": "Universal Unit Converter",
    "shortDesc": "Convert length, mass, temperature, area, volume, and data storage metrics.",
    "description": "Comprehensive multi-unit converter supporting meters to feet, kilograms to pounds, Celsius to Fahrenheit, megabytes to gigabytes, and more.",
    "category": "Measurement Converters",
    "iconName": "RefreshCw",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 154000,
    "tags": [
      "converter",
      "units",
      "length",
      "weight",
      "temperature",
      "storage"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select category",
        "desc": "Choose Length, Weight, Temperature, or Digital Storage."
      },
      {
        "step": 2,
        "title": "Enter value & units",
        "desc": "Select \"From\" and \"To\" units."
      },
      {
        "step": 3,
        "title": "Instant result",
        "desc": "Read precise converted calculation."
      }
    ],
    "faqs": [
      {
        "question": "How precise are conversions?",
        "answer": "Calculations use standard high-precision floating-point arithmetic up to 8 decimal places."
      }
    ]
  },
  {
    "id": "unit-converter-length-weight",
    "slug": "unit-converter-length-weight",
    "name": "Universal Unit Converter (Length, Weight, Volume)",
    "shortDesc": "Convert metric and imperial units for length, mass, volume, temperature, and speed.",
    "description": "Convert between metric and imperial measurement systems (meters, feet, inches, kilometers, miles, kilograms, pounds, ounces, liters, gallons).",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 124100,
    "tags": [
      "unit converter",
      "metric",
      "imperial",
      "length",
      "weight",
      "volume"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Measurement Category",
        "desc": "Choose Length, Weight, Volume, Temperature, or Speed."
      },
      {
        "step": 2,
        "title": "Enter Value & Units",
        "desc": "Type input value and select From and To units."
      },
      {
        "step": 3,
        "title": "Copy Result",
        "desc": "Copy converted unit value with unit symbol."
      }
    ],
    "faqs": [
      {
        "question": "What formula is used for Celsius to Fahrenheit?",
        "answer": "F = (C * 9/5) + 32"
      }
    ]
  },
  {
    "id": "currency-converter-static",
    "slug": "currency-converter-static",
    "name": "Currency & Exchange Rate Reference Calculator",
    "shortDesc": "Convert major world currencies (USD, EUR, GBP, JPY, AUD, CAD) with reference rates.",
    "description": "Calculate currency exchanges between 30+ international currencies with reference exchange rates.",
    "category": "Measurement Converters",
    "iconName": "DollarSign",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 118400,
    "tags": [
      "currency",
      "exchange rate",
      "usd",
      "eur",
      "gbp",
      "jpy"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Source Currency",
        "desc": "Select currency code (e.g., USD)."
      },
      {
        "step": 2,
        "title": "Select Target Currency",
        "desc": "Select target currency code (e.g., EUR)."
      },
      {
        "step": 3,
        "title": "Read Converted Total",
        "desc": "View calculated conversion amount."
      }
    ],
    "faqs": [
      {
        "question": "How often are reference rates updated?",
        "answer": "Rates are updated continuously or set to daily ECB benchmark reference rates."
      }
    ]
  },
  {
    "id": "time-zone-converter",
    "slug": "time-zone-converter",
    "name": "Global Time Zone & Meeting Scheduler",
    "shortDesc": "Convert local times across UTC, EST, PST, GMT, CET, IST, and Tokyo time zones.",
    "description": "Compare local times across world time zones and plan international remote team meetings.",
    "category": "Measurement Converters",
    "iconName": "Globe",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 96200,
    "tags": [
      "time zone",
      "utc",
      "est",
      "pst",
      "meeting scheduler",
      "clock"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Pick Source Time & Date",
        "desc": "Select date and time."
      },
      {
        "step": 2,
        "title": "Add Target Time Zones",
        "desc": "Add UTC, EST, PST, CET, IST city zones."
      },
      {
        "step": 3,
        "title": "View Synced Grid",
        "desc": "View synchronized local times across all selected zones."
      }
    ],
    "faqs": [
      {
        "question": "Does it account for Daylight Saving Time (DST)?",
        "answer": "Yes, browser Intl API handles regional DST adjustments automatically."
      }
    ]
  },
  {
    "id": "temperature-converter",
    "slug": "temperature-converter",
    "name": "Temperature Unit Converter (C, F, K)",
    "shortDesc": "Convert temperatures instantly between Celsius (°C), Fahrenheit (°F), and Kelvin (K).",
    "description": "Instant temperature unit converter for scientific and weather measurements.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 88100,
    "tags": [
      "temperature",
      "celsius",
      "fahrenheit",
      "kelvin",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter value",
        "desc": "Type number (e.g. 37)."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Choose °C, °F, or K."
      },
      {
        "step": 3,
        "title": "Read converted table",
        "desc": "Displays 37°C = 98.6°F = 310.15 K."
      }
    ],
    "faqs": [
      {
        "question": "What is absolute zero in Celsius?",
        "answer": "-273.15 °C (0 Kelvin)."
      }
    ]
  },
  {
    "id": "data-storage-unit-converter",
    "slug": "data-storage-unit-converter",
    "name": "Data Storage & Byte Unit Converter (KB, MB, GB, TB)",
    "shortDesc": "Convert Bytes, KB, MB, GB, TB, PB (Decimal 1000 vs Binary 1024 KiB).",
    "description": "Convert digital storage sizes in decimal (1 KB = 1000 B) and binary kibibytes (1 KiB = 1024 B).",
    "category": "Measurement Converters",
    "iconName": "HardDrive",
    "usageCount": 71200,
    "tags": [
      "bytes",
      "megabytes",
      "gigabytes",
      "terabytes",
      "kibibytes",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter storage amount",
        "desc": "E.g. 500."
      },
      {
        "step": 2,
        "title": "Choose source unit",
        "desc": "Select GB or GiB."
      },
      {
        "step": 3,
        "title": "View conversion matrix",
        "desc": "Shows MB, GB, TB, and binary KiB, MiB, GiB."
      }
    ],
    "faqs": [
      {
        "question": "Why does a 1TB hard drive show as ~931GB in Windows?",
        "answer": "Drive manufacturers use decimal (1 TB = 10^12 bytes), while Windows measures in binary GiB (2^30 bytes)."
      }
    ]
  },
  {
    "id": "speed-unit-converter",
    "slug": "speed-unit-converter",
    "name": "Speed & Velocity Unit Converter",
    "shortDesc": "Convert speed between mph, km/h, m/s, knots, and Mach number.",
    "description": "Convert speed units for automotive, aviation, and maritime navigation.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 54100,
    "tags": [
      "speed",
      "mph",
      "km/h",
      "knots",
      "m/s",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter speed value",
        "desc": "E.g. 60."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Choose Miles/hr or Km/hr."
      },
      {
        "step": 3,
        "title": "Read speed breakdown",
        "desc": "Shows 60 mph = 96.56 km/h = 52.14 knots."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 Knot in km/h?",
        "answer": "1 Knot equals 1 nautical mile per hour (1.852 km/h)."
      }
    ]
  },
  {
    "id": "pressure-unit-converter",
    "slug": "pressure-unit-converter",
    "name": "Pressure Unit Converter (PSI, Bar, Pascal, atm)",
    "shortDesc": "Convert pressure units: PSI, Bar, Pascals (Pa), Kilopascals (kPa), and atmospheres.",
    "description": "Convert atmospheric, tire, and hydraulic pressure units.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 48200,
    "tags": [
      "pressure",
      "psi",
      "bar",
      "pascal",
      "atm",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter pressure number",
        "desc": "E.g. 32."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select PSI or Bar."
      },
      {
        "step": 3,
        "title": "Read converted table",
        "desc": "32 PSI = 2.206 Bar = 220.6 kPa."
      }
    ],
    "faqs": [
      {
        "question": "What is standard sea-level atmospheric pressure?",
        "answer": "1 atm = 101.325 kPa = 14.696 PSI = 1.01325 bar."
      }
    ]
  },
  {
    "id": "energy-unit-converter",
    "slug": "energy-unit-converter",
    "name": "Energy & Work Unit Converter (Joules, Calories, kWh, BTU)",
    "shortDesc": "Convert Joules (J), Kilocalories (kcal), Kilowatt-hours (kWh), and BTUs.",
    "description": "Convert dietary calories, electrical energy (kWh), thermal BTUs, and mechanical Joules.",
    "category": "Measurement Converters",
    "iconName": "Zap",
    "usageCount": 61200,
    "tags": [
      "energy",
      "calories",
      "joules",
      "kwh",
      "btu",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter value",
        "desc": "E.g. 500."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select Food Calories (kcal) or kWh."
      },
      {
        "step": 3,
        "title": "View conversion matrix",
        "desc": "500 kcal = 2.092 Megajoules = 0.581 kWh."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 food Calorie in Joules?",
        "answer": "1 food Calorie (kcal) equals 4,184 Joules."
      }
    ]
  },
  {
    "id": "power-unit-converter",
    "slug": "power-unit-converter",
    "name": "Power & Wattage Unit Converter (Watts, Horsepower, kW)",
    "shortDesc": "Convert Watts (W), Kilowatts (kW), Megawatts (MW), and Horsepower (hp).",
    "description": "Convert mechanical horsepower, electrical watts, and thermal BTU/hr power outputs.",
    "category": "Measurement Converters",
    "iconName": "Zap",
    "usageCount": 52100,
    "tags": [
      "power",
      "watts",
      "horsepower",
      "kilowatts",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter power rating",
        "desc": "E.g. 300."
      },
      {
        "step": 2,
        "title": "Select unit",
        "desc": "Choose Mechanical Horsepower (hp) or Watts."
      },
      {
        "step": 3,
        "title": "Read power table",
        "desc": "300 hp = 223.7 Kilowatts (kW)."
      }
    ],
    "faqs": [
      {
        "question": "How many Watts in 1 Horsepower?",
        "answer": "1 mechanical horsepower equals approx. 745.7 Watts."
      }
    ]
  },
  {
    "id": "area-unit-converter",
    "slug": "area-unit-converter",
    "name": "Area & Land Surface Converter (Sq Ft, Sq Meters, Acres, Hectares)",
    "shortDesc": "Convert square feet, square meters, acres, hectares, and square miles.",
    "description": "Convert real estate and agricultural land surface area measurements.",
    "category": "Measurement Converters",
    "iconName": "Maximize2",
    "usageCount": 78200,
    "tags": [
      "area",
      "square feet",
      "acres",
      "hectares",
      "square meters",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter land area",
        "desc": "E.g. 1."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Select Acre or Hectare."
      },
      {
        "step": 3,
        "title": "Read converted metrics",
        "desc": "1 Acre = 43,560 sq ft = 0.4047 Hectares."
      }
    ],
    "faqs": [
      {
        "question": "How many square feet in 1 Acre?",
        "answer": "1 Acre equals exactly 43,560 square feet."
      }
    ]
  },
  {
    "id": "fuel-consumption-converter",
    "slug": "fuel-consumption-converter",
    "name": "Fuel Economy & Consumption Converter (MPG, L/100km)",
    "shortDesc": "Convert Miles Per Gallon (US MPG / UK MPG) to Liters per 100 Kilometers (L/100km).",
    "description": "Convert automotive fuel efficiency between MPG and L/100km inverse metrics.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 45200,
    "tags": [
      "fuel economy",
      "mpg",
      "l/100km",
      "automotive",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter fuel efficiency number",
        "desc": "E.g. 30."
      },
      {
        "step": 2,
        "title": "Select unit",
        "desc": "Select US MPG, UK MPG, or L/100km."
      },
      {
        "step": 3,
        "title": "Read conversion",
        "desc": "30 US MPG = 7.84 L/100km."
      }
    ],
    "faqs": [
      {
        "question": "Why is L/100km an inverse calculation?",
        "answer": "Higher MPG means better efficiency, whereas lower L/100km means better efficiency."
      }
    ]
  },
  {
    "id": "angle-unit-converter",
    "slug": "angle-unit-converter",
    "name": "Angle Unit Converter (Degrees, Radians, Gradians)",
    "shortDesc": "Convert angle measurements between Degrees (°), Radians (rad), and Gradians (gon).",
    "description": "Convert geometric and trigonometric angle units for mathematics and engineering.",
    "category": "Measurement Converters",
    "iconName": "RotateCcw",
    "usageCount": 39100,
    "tags": [
      "angle",
      "degrees",
      "radians",
      "gradians",
      "trigonometry",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter angle value",
        "desc": "E.g. 180."
      },
      {
        "step": 2,
        "title": "Select unit",
        "desc": "Select Degrees or Radians."
      },
      {
        "step": 3,
        "title": "Read result",
        "desc": "180° = π Radians (3.14159 rad) = 200 Gradians."
      }
    ],
    "faqs": [
      {
        "question": "How many radians in a full circle (360°)?",
        "answer": "2π radians (approx. 6.28318 rad)."
      }
    ]
  },
  {
    "id": "frequency-unit-converter",
    "slug": "frequency-unit-converter",
    "name": "Frequency Unit Converter (Hz, kHz, MHz, GHz)",
    "shortDesc": "Convert Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), and Gigahertz (GHz).",
    "description": "Convert frequency measurements for audio, radio frequencies, and processor clock speeds.",
    "category": "Measurement Converters",
    "iconName": "Activity",
    "usageCount": 34100,
    "tags": [
      "frequency",
      "hertz",
      "mhz",
      "ghz",
      "audio",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter frequency",
        "desc": "E.g. 2.4."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select GHz or MHz."
      },
      {
        "step": 3,
        "title": "Read conversion",
        "desc": "2.4 GHz = 2,400 MHz = 2,400,000,000 Hz."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 Hertz?",
        "answer": "1 Hertz equals 1 cycle per second."
      }
    ]
  },
  {
    "id": "cooking-recipe-unit-converter",
    "slug": "cooking-recipe-unit-converter",
    "name": "Cooking & Baking Recipe Measurement Converter",
    "shortDesc": "Convert cups, tablespoons, teaspoons, fluid ounces, grams, and milliliters.",
    "description": "Convert culinary baking measurements between volume cups/spoons and weight grams.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 89400,
    "tags": [
      "cooking",
      "baking",
      "cups",
      "grams",
      "tablespoons",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select ingredient density preset",
        "desc": "Choose All-Purpose Flour, Sugar, Butter, or Water."
      },
      {
        "step": 2,
        "title": "Enter amount & unit",
        "desc": "E.g. 1 Cup."
      },
      {
        "step": 3,
        "title": "Read grams weight",
        "desc": "1 Cup All-Purpose Flour = 120 grams."
      }
    ],
    "faqs": [
      {
        "question": "Why does 1 cup of flour weigh differently than 1 cup of sugar?",
        "answer": "Different ingredients have different physical densities."
      }
    ]
  },
  {
    "id": "shoe-size-converter",
    "slug": "shoe-size-converter",
    "name": "International Shoe Size Converter (US, UK, EU, CM)",
    "shortDesc": "Convert men's, women's, and kids' shoe sizes across US, UK, EU, and CM/Mondopoint.",
    "description": "Convert footwear sizes between US, UK, European, and Japanese centimeter sizing.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 65200,
    "tags": [
      "shoe size",
      "us",
      "uk",
      "eu",
      "mondopoint",
      "footwear",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select category",
        "desc": "Men's, Women's, or Kids."
      },
      {
        "step": 2,
        "title": "Select size number",
        "desc": "E.g. US 9."
      },
      {
        "step": 3,
        "title": "Read size chart match",
        "desc": "US 9 Men's = UK 8.5 = EU 42.5 = 27 cm."
      }
    ],
    "faqs": [
      {
        "question": "What is Mondopoint size?",
        "answer": "Mondopoint measures foot length directly in millimeters or centimeters."
      }
    ]
  },
  {
    "id": "clothing-size-converter",
    "slug": "clothing-size-converter",
    "name": "International Clothing Size Converter (US, UK, EU)",
    "shortDesc": "Convert dress, shirt, and suit sizes between US, UK, EU, and International (S/M/L).",
    "description": "Convert apparel sizes across international sizing systems for online shopping.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 51200,
    "tags": [
      "clothing size",
      "dresses",
      "shirts",
      "us",
      "uk",
      "eu",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select category",
        "desc": "Choose Women's Dresses or Men's Shirts."
      },
      {
        "step": 2,
        "title": "Select regional size",
        "desc": "E.g. US 8."
      },
      {
        "step": 3,
        "title": "View equivalent sizes",
        "desc": "US 8 = UK 12 = EU 40 = Medium."
      }
    ],
    "faqs": [
      {
        "question": "Do dress sizes vary by brand?",
        "answer": "Yes, \"vanity sizing\" causes variations; always check bust/waist inch metrics."
      }
    ]
  },
  {
    "id": "torque-unit-converter",
    "slug": "torque-unit-converter",
    "name": "Torque Unit Converter (Nm, ft-lbs, in-lbs)",
    "shortDesc": "Convert Newton-meters (N·m), Foot-pounds (ft-lbf), and Inch-pounds (in-lbf).",
    "description": "Convert rotational torque units for automotive bolt specifications and engineering.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 42100,
    "tags": [
      "torque",
      "newton meters",
      "foot pounds",
      "automotive",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter torque spec",
        "desc": "E.g. 100."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Select N·m or ft-lbs."
      },
      {
        "step": 3,
        "title": "Read conversion",
        "desc": "100 N·m = 73.75 ft-lbs = 885.1 in-lbs."
      }
    ],
    "faqs": [
      {
        "question": "How to convert ft-lbs to N·m?",
        "answer": "Multiply ft-lbs by 1.35582."
      }
    ]
  },
  {
    "id": "force-unit-converter",
    "slug": "force-unit-converter",
    "name": "Force Unit Converter (Newtons, Pound-force, Dynes)",
    "shortDesc": "Convert Newtons (N), Kilonewtons (kN), Pound-force (lbf), and Dynes.",
    "description": "Convert physical force units for physics calculations and structural engineering.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 31200,
    "tags": [
      "force",
      "newtons",
      "pound force",
      "kilonewtons",
      "physics",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter force value",
        "desc": "E.g. 1000."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select Newtons or Kilonewtons."
      },
      {
        "step": 3,
        "title": "Read conversion table",
        "desc": "1000 N = 1 kN = 224.81 lbf."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 Newton of force?",
        "answer": "The force required to accelerate 1 kg at 1 meter per second squared (1 N = 1 kg·m/s²)."
      }
    ]
  },
  {
    "id": "flow-rate-unit-converter",
    "slug": "flow-rate-unit-converter",
    "name": "Volumetric Flow Rate Converter (GPM, L/min, m³/h)",
    "shortDesc": "Convert Gallons Per Minute (GPM), Liters/min (L/min), and Cubic meters/hr (m³/h).",
    "description": "Convert liquid and gas volumetric flow rate units for plumbing and HVAC engineering.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 38200,
    "tags": [
      "flow rate",
      "gpm",
      "liters per minute",
      "plumbing",
      "hvac",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter flow rate number",
        "desc": "E.g. 10."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Select US GPM or L/min."
      },
      {
        "step": 3,
        "title": "Read conversion",
        "desc": "10 GPM = 37.85 L/min = 2.27 m³/h."
      }
    ],
    "faqs": [
      {
        "question": "What is standard residential shower head flow rate?",
        "answer": "Max 2.5 GPM (9.5 L/min)."
      }
    ]
  },
  {
    "id": "density-unit-converter",
    "slug": "density-unit-converter",
    "name": "Density Unit Converter (g/cm³, kg/m³, lb/ft³)",
    "shortDesc": "Convert grams/cm³, kilograms/m³, pounds/ft³, and pounds/gallon.",
    "description": "Convert material density units for chemistry, fluid mechanics, and shipping.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 29800,
    "tags": [
      "density",
      "grams per cm3",
      "kg per m3",
      "lb per ft3",
      "chemistry",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter material density",
        "desc": "E.g. 1.0 (water)."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Select g/cm³ or kg/m³."
      },
      {
        "step": 3,
        "title": "Read converted metrics",
        "desc": "1 g/cm³ = 1000 kg/m³ = 62.43 lb/ft³."
      }
    ],
    "faqs": [
      {
        "question": "What is density of liquid water?",
        "answer": "1.0 g/cm³ at 4°C (1000 kg/m³)."
      }
    ]
  },
  {
    "id": "digital-audio-bitrate-calculator",
    "slug": "digital-audio-bitrate-calculator",
    "name": "Audio Bitrate & Uncompressed File Size Calculator",
    "shortDesc": "Calculate uncompressed WAV/AIFF audio file size based on sample rate & bit depth.",
    "description": "Calculate digital audio file storage sizes (e.g., 44.1kHz / 16-bit stereo CD audio).",
    "category": "Measurement Converters",
    "iconName": "Activity",
    "usageCount": 34100,
    "tags": [
      "audio bitrate",
      "wav size",
      "sample rate",
      "bit depth",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select sample rate",
        "desc": "Choose 44.1kHz, 48kHz, 96kHz."
      },
      {
        "step": 2,
        "title": "Select bit depth & channels",
        "desc": "Choose 16-bit or 24-bit, Mono or Stereo."
      },
      {
        "step": 3,
        "title": "Set audio duration",
        "desc": "E.g. 3 minutes."
      }
    ],
    "faqs": [
      {
        "question": "How big is 1 minute of 44.1kHz 16-bit stereo audio?",
        "answer": "Approx. 10.1 Megabytes uncompressed."
      }
    ]
  },
  {
    "id": "video-bitrate-file-size-calculator",
    "slug": "video-bitrate-file-size-calculator",
    "name": "Video Bitrate to File Size Calculator",
    "shortDesc": "Calculate estimated video file size from video bitrate (Mbps), audio bitrate, and duration.",
    "description": "Calculate video export file sizes for H.264, MP4, and ProRes video edits.",
    "category": "Measurement Converters",
    "iconName": "Film",
    "usageCount": 58200,
    "tags": [
      "video bitrate",
      "file size",
      "h264",
      "mp4",
      "prores",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter video bitrate",
        "desc": "E.g. 15 Mbps."
      },
      {
        "step": 2,
        "title": "Enter audio bitrate",
        "desc": "E.g. 320 kbps."
      },
      {
        "step": 3,
        "title": "Set duration in minutes",
        "desc": "E.g. 10 minutes = ~1.15 GB file."
      }
    ],
    "faqs": [
      {
        "question": "What bitrate is recommended for 1080p YouTube video?",
        "answer": "8 to 12 Mbps for 1080p SDR video."
      }
    ]
  },
  {
    "id": "number-base-converter-binary-hex",
    "slug": "number-base-converter-binary-hex",
    "name": "Number Base Converter (Binary, Octal, Decimal, Hex)",
    "shortDesc": "Convert numbers between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hex (Base 16).",
    "description": "Convert integer values between Binary, Octal, Decimal, and Hexadecimal representations.",
    "category": "Measurement Converters",
    "iconName": "Binary",
    "usageCount": 91400,
    "tags": [
      "number base",
      "binary",
      "octal",
      "decimal",
      "hexadecimal",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter number",
        "desc": "E.g. 255."
      },
      {
        "step": 2,
        "title": "Select input base",
        "desc": "Select Decimal (10), Hex (16), or Binary (2)."
      },
      {
        "step": 3,
        "title": "Read converted output table",
        "desc": "Decimal 255 = Hex FF = Binary 11111111 = Octal 377."
      }
    ],
    "faqs": [
      {
        "question": "Why is Hexadecimal widely used in computer science?",
        "answer": "Each hex digit represents exactly 4 binary bits (a nibble)."
      }
    ]
  },
  {
    "id": "roman-numeral-converter",
    "slug": "roman-numeral-converter",
    "name": "Roman Numeral to Decimal Converter",
    "shortDesc": "Convert numbers to Roman Numerals (e.g. 2026 -> MMXXVI) or decode Roman text.",
    "description": "Convert integers to valid Roman numerals or parse Roman numeral text back to numbers.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 61200,
    "tags": [
      "roman numerals",
      "decimal",
      "converter",
      "mmxxvi",
      "math"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type integer or Roman string",
        "desc": "E.g. 2026 or MMXXVI."
      },
      {
        "step": 2,
        "title": "Auto Convert",
        "desc": "Translates instantly."
      },
      {
        "step": 3,
        "title": "Copy converted result",
        "desc": "Copy string."
      }
    ],
    "faqs": [
      {
        "question": "What is 2026 in Roman Numerals?",
        "answer": "MMXXVI (M=1000, M=1000, X=10, X=10, V=5, I=1)."
      }
    ]
  },
  {
    "id": "text-to-binary-stream-converter",
    "slug": "text-to-binary-stream-converter",
    "name": "Text to Binary & Binary to Text Converter",
    "shortDesc": "Convert UTF-8 text strings into 8-bit binary code (01000001) or decode binary.",
    "description": "Convert plain text letters into 8-bit ASCII/UTF-8 binary code streams.",
    "category": "Measurement Converters",
    "iconName": "Binary",
    "usageCount": 84200,
    "tags": [
      "text to binary",
      "binary code",
      "ascii",
      "decoder",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type or paste text",
        "desc": "E.g. \"Hello\"."
      },
      {
        "step": 2,
        "title": "Click Convert to Binary",
        "desc": "Produces 01001000 01100101 01101100..."
      },
      {
        "step": 3,
        "title": "Toggle mode to decode",
        "desc": "Paste binary code to decode back to text."
      }
    ],
    "faqs": [
      {
        "question": "What is binary code for letter \"A\"?",
        "answer": "01000001 (ASCII 65)."
      }
    ]
  },
  {
    "id": "text-to-hex-stream-converter",
    "slug": "text-to-hex-stream-converter",
    "name": "Text to Hex Stream Converter",
    "shortDesc": "Convert plain text characters into hex byte representations (e.g. 48 65 6c 6c 6f).",
    "description": "Convert text strings into space-separated hexadecimal byte codes.",
    "category": "Measurement Converters",
    "iconName": "Binary",
    "usageCount": 51200,
    "tags": [
      "text to hex",
      "hexadecimal",
      "bytes",
      "converter",
      "string"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste plain text",
        "desc": "E.g. \"ABC\"."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Generates 41 42 43."
      },
      {
        "step": 3,
        "title": "Copy hex string",
        "desc": "Copy hex output."
      }
    ],
    "faqs": [
      {
        "question": "Is this case-sensitive?",
        "answer": "Yes, uppercase \"A\" is hex 41, while lowercase \"a\" is hex 61."
      }
    ]
  },
  {
    "id": "morse-code-converter",
    "slug": "morse-code-converter",
    "name": "Morse Code Audio & Text Translator",
    "shortDesc": "Translate plain text into International Morse Code (... --- ...) or decode dots & dashes.",
    "description": "Translate text to Morse code dots and dashes with visual audio tone playback.",
    "category": "Measurement Converters",
    "iconName": "Volume2",
    "usageCount": 78100,
    "tags": [
      "morse code",
      "translator",
      "dots and dashes",
      "sos",
      "audio tone"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type message",
        "desc": "E.g. \"SOS\"."
      },
      {
        "step": 2,
        "title": "Translate",
        "desc": "Generates ... --- ..."
      },
      {
        "step": 3,
        "title": "Click Play Audio",
        "desc": "Web Audio API synthesizes 700Hz beeps."
      }
    ],
    "faqs": [
      {
        "question": "What is Morse code for SOS?",
        "answer": "Three dots, three dashes, three dots (... --- ...)."
      }
    ]
  },
  {
    "id": "rot13-caesar-cipher-converter",
    "slug": "rot13-caesar-cipher-converter",
    "name": "ROT13 & Caesar Cipher Encoder / Decoder",
    "shortDesc": "Rotate alphabetical letters by 13 positions (ROT13) or custom N-shift Caesar cipher.",
    "description": "Encrypt or decrypt plain text using the classic ROT13 and Caesar shift ciphers.",
    "category": "Measurement Converters",
    "iconName": "Lock",
    "usageCount": 49200,
    "tags": [
      "rot13",
      "caesar cipher",
      "encoder",
      "decoder",
      "cipher"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type input text",
        "desc": "Enter text message."
      },
      {
        "step": 2,
        "title": "Select shift key",
        "desc": "Default +13 positions."
      },
      {
        "step": 3,
        "title": "Copy obfuscated text",
        "desc": "Copy cipher result."
      }
    ],
    "faqs": [
      {
        "question": "Why is ROT13 its own inverse?",
        "answer": "Because the alphabet has 26 letters, applying ROT13 twice restores original text."
      }
    ]
  },
  {
    "id": "image-base64-converter",
    "slug": "image-base64-converter",
    "name": "Image to Data URI Base64 Converter",
    "shortDesc": "Convert local PNG/JPG images into inline data:image/png;base64,... code strings.",
    "description": "Encode image files into Base64 data URIs for direct HTML/CSS stylesheet embedding.",
    "category": "Measurement Converters",
    "iconName": "Image",
    "usageCount": 92100,
    "tags": [
      "image to base64",
      "data uri",
      "base64 image",
      "css inline",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Upload image file",
        "desc": "Select PNG, JPG, SVG, or WebP."
      },
      {
        "step": 2,
        "title": "Encode to Base64",
        "desc": "Generates data:image/... string."
      },
      {
        "step": 3,
        "title": "Copy <img> or CSS snippet",
        "desc": "Paste directly into code."
      }
    ],
    "faqs": [
      {
        "question": "When should Base64 images be used?",
        "answer": "For tiny icons/logos (<5KB) to reduce HTTP network requests."
      }
    ]
  },
  {
    "id": "svg-to-png-canvas-converter",
    "slug": "svg-to-png-canvas-converter",
    "name": "SVG to PNG Canvas Image Exporter",
    "shortDesc": "Render vector SVG code into high-resolution PNG raster graphics in browser.",
    "description": "Render SVG vector code into downloadable PNG raster files using HTML Canvas.",
    "category": "Measurement Converters",
    "iconName": "Image",
    "usageCount": 88400,
    "tags": [
      "svg to png",
      "vector to raster",
      "canvas",
      "converter",
      "image"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Paste SVG code or upload file",
        "desc": "Enter <svg> XML."
      },
      {
        "step": 2,
        "title": "Set output resolution scale",
        "desc": "Choose 1x, 2x, 4x Retina scale."
      },
      {
        "step": 3,
        "title": "Download PNG image",
        "desc": "Save transparent PNG file."
      }
    ],
    "faqs": [
      {
        "question": "Does it preserve transparent background?",
        "answer": "Yes, PNG transparent alpha channel is preserved."
      }
    ]
  },
  {
    "id": "case-converter-text",
    "slug": "case-converter-text",
    "name": "Case Converter (camelCase, snake_case, kebab-case, PascalCase)",
    "shortDesc": "Transform string variable names between camelCase, snake_case, kebab-case, and PascalCase.",
    "description": "Convert variable naming conventions between popular programming code cases.",
    "category": "Measurement Converters",
    "iconName": "ArrowUpDown",
    "usageCount": 112000,
    "tags": [
      "case converter",
      "camelcase",
      "snake_case",
      "kebab-case",
      "pascalcase"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Type or paste variable string",
        "desc": "E.g. \"user profile settings\"."
      },
      {
        "step": 2,
        "title": "Select target case",
        "desc": "Choose camelCase, snake_case, kebab-case, or PascalCase."
      },
      {
        "step": 3,
        "title": "Copy output variable",
        "desc": "Generates userProfileSettings, user_profile_settings, user-profile-settings."
      }
    ],
    "faqs": [
      {
        "question": "What is kebab-case used for?",
        "answer": "Kebab-case (dash-separated) is standard for CSS class names and URL slugs."
      }
    ]
  },
  {
    "id": "screen-resolution-px-rem-converter",
    "slug": "screen-resolution-px-rem-converter",
    "name": "PX to REM & EM CSS Converter",
    "shortDesc": "Convert pixel (px) font measurements to rem and em relative CSS units.",
    "description": "Convert static pixel font values into responsive rem and em relative units.",
    "category": "Measurement Converters",
    "iconName": "Maximize2",
    "usageCount": 104200,
    "tags": [
      "px to rem",
      "em",
      "css units",
      "responsive font",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Set base font size",
        "desc": "Default 16px root font size."
      },
      {
        "step": 2,
        "title": "Type pixel value",
        "desc": "E.g. 24px."
      },
      {
        "step": 3,
        "title": "Copy REM value",
        "desc": "24px = 1.5rem."
      }
    ],
    "faqs": [
      {
        "question": "Why use REM instead of PX in CSS?",
        "answer": "REM scales gracefully when users adjust their browser font accessibility settings."
      }
    ]
  },
  {
    "id": "aspect-ratio-calculator-converter",
    "slug": "aspect-ratio-calculator-converter",
    "name": "Aspect Ratio & Dimension Calculator (16:9, 4:3, 1:1)",
    "shortDesc": "Calculate missing width or height dimensions maintaining 16:9, 4:3, or 21:9 ratios.",
    "description": "Calculate scaled pixel dimensions while preserving target visual aspect ratios.",
    "category": "Measurement Converters",
    "iconName": "Maximize2",
    "usageCount": 91200,
    "tags": [
      "aspect ratio",
      "16:9",
      "4:3",
      "dimensions",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select ratio preset",
        "desc": "16:9 (Video), 4:3 (Classic), 1:1 (Square), 21:9 (Ultrawide)."
      },
      {
        "step": 2,
        "title": "Enter known Width or Height",
        "desc": "E.g. Width 1920."
      },
      {
        "step": 3,
        "title": "Read calculated dimension",
        "desc": "Outputs Height 1080."
      }
    ],
    "faqs": [
      {
        "question": "What is 16:9 pixel resolution for 4K?",
        "answer": "3840 x 2160 pixels."
      }
    ]
  },
  {
    "id": "weight-mass-converter",
    "slug": "weight-mass-converter",
    "name": "Weight & Mass Unit Converter (kg, lbs, oz, stone)",
    "shortDesc": "Convert Kilograms (kg), Pounds (lbs), Ounces (oz), Grams (g), and Stones (st).",
    "description": "Convert body weight and package mass measurements across metric and imperial systems.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 78200,
    "tags": [
      "weight",
      "kilograms",
      "pounds",
      "ounces",
      "stones",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter weight number",
        "desc": "E.g. 70."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select Kilograms or Pounds."
      },
      {
        "step": 3,
        "title": "Read converted metrics",
        "desc": "70 kg = 154.32 lbs = 11 stone 0 lbs."
      }
    ],
    "faqs": [
      {
        "question": "How many pounds in 1 Stone?",
        "answer": "1 Stone equals exactly 14 Pounds."
      }
    ]
  },
  {
    "id": "length-distance-converter",
    "slug": "length-distance-converter",
    "name": "Length & Distance Unit Converter (Meters, Feet, Miles, Inches)",
    "shortDesc": "Convert Millimeters, Centimeters, Meters, Kilometers, Inches, Feet, Yards, Miles.",
    "description": "Convert distance measurements between metric meters and imperial feet/miles.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 81200,
    "tags": [
      "length",
      "meters",
      "feet",
      "miles",
      "kilometers",
      "inches",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter distance",
        "desc": "E.g. 5."
      },
      {
        "step": 2,
        "title": "Select source unit",
        "desc": "Select Kilometers or Miles."
      },
      {
        "step": 3,
        "title": "Read conversion",
        "desc": "5 km = 3.107 Miles = 16,404 Feet."
      }
    ],
    "faqs": [
      {
        "question": "How many feet in 1 Meter?",
        "answer": "1 Meter equals approx. 3.28084 feet."
      }
    ]
  },
  {
    "id": "volume-liquid-converter",
    "slug": "volume-liquid-converter",
    "name": "Liquid Volume Unit Converter (Liters, Gallons, Fl Oz, mL)",
    "shortDesc": "Convert Liters (L), Milliliters (mL), US Gallons, UK Gallons, and Fluid Ounces (fl oz).",
    "description": "Convert liquid volume capacity for shipping tanks and automotive fluids.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 65100,
    "tags": [
      "volume",
      "liters",
      "gallons",
      "fluid ounces",
      "milliliters",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter liquid volume",
        "desc": "E.g. 1."
      },
      {
        "step": 2,
        "title": "Select input unit",
        "desc": "Select US Gallon or Liter."
      },
      {
        "step": 3,
        "title": "Read volume metrics",
        "desc": "1 US Gallon = 3.785 Liters = 128 US fl oz."
      }
    ],
    "faqs": [
      {
        "question": "Is a US Gallon different from a UK Imperial Gallon?",
        "answer": "Yes! 1 US Gallon = 3.785 L, whereas 1 UK Imperial Gallon = 4.546 L."
      }
    ]
  },
  {
    "id": "work-energy-torque-converter",
    "slug": "work-energy-torque-converter",
    "name": "Joules to Foot-Pounds Energy Converter",
    "shortDesc": "Convert Joules (J) to Foot-pounds force (ft-lbf) and Watt-seconds.",
    "description": "Convert mechanical work energy between Joules and imperial foot-pounds.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 29800,
    "tags": [
      "joules",
      "foot pounds",
      "energy",
      "work",
      "physics",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter energy number",
        "desc": "E.g. 100."
      },
      {
        "step": 2,
        "title": "Select Joules or ft-lbs",
        "desc": "Select input unit."
      },
      {
        "step": 3,
        "title": "Read result",
        "desc": "100 Joules = 73.756 ft-lbf."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 Joule?",
        "answer": "The energy expended applying 1 Newton of force through 1 meter."
      }
    ]
  },
  {
    "id": "time-duration-unit-converter",
    "slug": "time-duration-unit-converter",
    "name": "Time Duration Unit Converter (Seconds, Hours, Days, Years)",
    "shortDesc": "Convert Milliseconds, Seconds, Minutes, Hours, Days, Weeks, Months, and Years.",
    "description": "Convert time duration spans between seconds, hours, and calendar years.",
    "category": "Measurement Converters",
    "iconName": "Clock",
    "usageCount": 45200,
    "tags": [
      "time",
      "seconds",
      "hours",
      "days",
      "weeks",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter duration value",
        "desc": "E.g. 10,000."
      },
      {
        "step": 2,
        "title": "Select unit",
        "desc": "Select Seconds or Hours."
      },
      {
        "step": 3,
        "title": "Read converted metrics",
        "desc": "10,000 Seconds = 2 hours 46 minutes 40 seconds."
      }
    ],
    "faqs": [
      {
        "question": "How many seconds in a 365-day year?",
        "answer": "31,536,000 seconds."
      }
    ]
  },
  {
    "id": "ppm-percentage-converter",
    "slug": "ppm-percentage-converter",
    "name": "PPM (Parts Per Million) to Percentage Converter",
    "shortDesc": "Convert PPM (Parts Per Million) concentration into Percentage (%) and PPB.",
    "description": "Convert chemical and atmospheric gas concentrations between PPM and percentage metrics.",
    "category": "Measurement Converters",
    "iconName": "ArrowLeftRight",
    "usageCount": 38200,
    "tags": [
      "ppm",
      "percentage",
      "parts per million",
      "concentration",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter PPM value",
        "desc": "E.g. 10,000."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "10,000 PPM = 1.0% concentration."
      },
      {
        "step": 3,
        "title": "Read PPB metrics",
        "desc": "10,000 PPM = 10,000,000 PPB."
      }
    ],
    "faqs": [
      {
        "question": "How many PPM equals 1%?",
        "answer": "10,000 PPM equals 1% (1% = 1/100; 1 PPM = 1/1,000,000)."
      }
    ]
  },
  {
    "id": "torque-power-rpm-calculator",
    "slug": "torque-power-rpm-calculator",
    "name": "Engine Horsepower, Torque & RPM Calculator",
    "shortDesc": "Calculate Horsepower = (Torque x RPM) / 5252 for automotive engines.",
    "description": "Calculate engine horsepower, rotational torque (ft-lbs), or RPM using the classic physics equation.",
    "category": "Measurement Converters",
    "iconName": "Activity",
    "usageCount": 49200,
    "tags": [
      "horsepower",
      "torque",
      "rpm",
      "engine",
      "automotive",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Torque (ft-lbs) & RPM",
        "desc": "E.g. 300 ft-lbs at 6000 RPM."
      },
      {
        "step": 2,
        "title": "Calculate Horsepower",
        "desc": "Applies HP = (Torque * RPM) / 5252 formula."
      },
      {
        "step": 3,
        "title": "Read peak output",
        "desc": "300 ft-lbs at 6000 RPM = 342.7 HP."
      }
    ],
    "faqs": [
      {
        "question": "Why do Horsepower and Torque curves always cross at 5252 RPM?",
        "answer": "Because 5252 is the mathematical constant derived from (33,000 ft-lbf/min) / (2π radians)."
      }
    ]
  },
  {
    "id": "electric-charge-converter",
    "slug": "electric-charge-converter",
    "name": "Electric Charge Converter (Coulombs, Ampere-hours, mAh)",
    "shortDesc": "Convert Coulombs (C), Ampere-hours (Ah), and Milliampere-hours (mAh).",
    "description": "Convert battery storage capacities between mAh, Ah, and Coulombs.",
    "category": "Measurement Converters",
    "iconName": "Zap",
    "usageCount": 34100,
    "tags": [
      "mah",
      "ampere hours",
      "coulombs",
      "battery capacity",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter mAh battery capacity",
        "desc": "E.g. 5000 mAh (phone battery)."
      },
      {
        "step": 2,
        "title": "Convert",
        "desc": "Translates to 5.0 Ah and 18,000 Coulombs."
      },
      {
        "step": 3,
        "title": "Copy converted metrics",
        "desc": "Copy charge values."
      }
    ],
    "faqs": [
      {
        "question": "How many Coulombs in 1 Ampere-hour?",
        "answer": "1 Ah equals 3,600 Coulombs of charge."
      }
    ]
  },
  {
    "id": "electrical-conductance-converter",
    "slug": "electrical-conductance-converter",
    "name": "Electrical Conductance & Resistance Converter (Siemens, Ohms)",
    "shortDesc": "Convert Electrical Conductance Siemens (S) to Resistance Ohms (Ω) (G = 1/R).",
    "description": "Invert electrical resistance Ohms into conductance Siemens.",
    "category": "Measurement Converters",
    "iconName": "Zap",
    "usageCount": 22100,
    "tags": [
      "siemens",
      "ohms",
      "conductance",
      "resistance",
      "electronics",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Resistance in Ohms (Ω)",
        "desc": "E.g. 50 Ω."
      },
      {
        "step": 2,
        "title": "Calculate Conductance",
        "desc": "Applies G = 1 / R."
      },
      {
        "step": 3,
        "title": "Read Siemens result",
        "desc": "50 Ω = 0.02 Siemens (20 mS)."
      }
    ],
    "faqs": [
      {
        "question": "What is 1 Siemens equal to?",
        "answer": "1 Siemens is the reciprocal of 1 Ohm (1 S = 1 / Ω)."
      }
    ]
  },
  {
    "id": "force-mass-acceleration-calculator",
    "slug": "force-mass-acceleration-calculator",
    "name": "Newton's Second Law (F = m * a) Calculator",
    "shortDesc": "Calculate Force (N), Mass (kg), or Acceleration (m/s²) using Newton's second law.",
    "description": "Calculate physics force, mass, and acceleration variables.",
    "category": "Measurement Converters",
    "iconName": "Activity",
    "usageCount": 41200,
    "tags": [
      "force",
      "mass",
      "acceleration",
      "newton second law",
      "physics",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select unknown variable",
        "desc": "Choose to solve for Force, Mass, or Acceleration."
      },
      {
        "step": 2,
        "title": "Enter known values",
        "desc": "E.g. Mass = 10 kg, Acceleration = 9.8 m/s²."
      },
      {
        "step": 3,
        "title": "Read calculated Force",
        "desc": "Outputs Force = 98 Newtons."
      }
    ],
    "faqs": [
      {
        "question": "What is acceleration due to gravity on Earth?",
        "answer": "Standard gravity g = 9.80665 m/s²."
      }
    ]
  },
  {
    "id": "kinematic-velocity-time-calculator",
    "slug": "kinematic-velocity-time-calculator",
    "name": "Kinematic Distance, Speed & Time Calculator (d = v * t)",
    "shortDesc": "Calculate Distance, Velocity, or Travel Duration (d = v * t).",
    "description": "Calculate travel distance, speed, or elapsed trip duration.",
    "category": "Measurement Converters",
    "iconName": "Clock",
    "usageCount": 51200,
    "tags": [
      "distance",
      "velocity",
      "time",
      "travel duration",
      "kinematics",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select variable to solve",
        "desc": "Choose Distance, Speed, or Time."
      },
      {
        "step": 2,
        "title": "Enter known values",
        "desc": "E.g. Speed = 60 mph, Time = 2.5 hours."
      },
      {
        "step": 3,
        "title": "Read calculated Distance",
        "desc": "Outputs Distance = 150 miles."
      }
    ],
    "faqs": [
      {
        "question": "How to calculate travel time for a 300 mile trip at 60 mph?",
        "answer": "Time = Distance / Speed = 300 / 60 = 5 hours."
      }
    ]
  },
  {
    "id": "universal-length-converter",
    "slug": "universal-length-converter",
    "name": "Universal Length Converter",
    "shortDesc": "Instant client-side length converter tool for developers.",
    "description": "Perform length converter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Measurement Converters",
    "iconName": "RefreshCw",
    "usageCount": 23598,
    "tags": [
      "converter tools",
      "length converter",
      "universal",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Length Converter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Length Converter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Length Converter?",
        "answer": "Yes! All Length Converter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Universal Length Converter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  },
  {
    "id": "online-weight-mass-converter",
    "slug": "online-weight-mass-converter",
    "name": "Online Weight Mass Converter",
    "shortDesc": "Instant client-side weight mass converter tool for seo specialists.",
    "description": "Perform weight mass converter calculations and transformations instantly inside your web browser. 100% private, client-side, and zero server upload.",
    "category": "Measurement Converters",
    "iconName": "RefreshCw",
    "usageCount": 157021,
    "tags": [
      "converter tools",
      "weight mass converter",
      "online",
      "browser tool",
      "client side"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Input or Select Options",
        "desc": "Enter or upload your data into the Weight Mass Converter controls."
      },
      {
        "step": 2,
        "title": "Execute Calculation",
        "desc": "The Weight Mass Converter processes your inputs instantly using browser APIs."
      },
      {
        "step": 3,
        "title": "Copy or Export Result",
        "desc": "Click \"Copy Result\" or export your calculated data with one click."
      }
    ],
    "faqs": [
      {
        "question": "Is my data processed securely for Weight Mass Converter?",
        "answer": "Yes! All Weight Mass Converter calculations execute 100% locally in your web browser JavaScript engine."
      },
      {
        "question": "Are there usage limits on Online Weight Mass Converter?",
        "answer": "No, you can use this tool unlimited times for free without any signups or subscriptions."
      }
    ]
  }
];

export default tools;
