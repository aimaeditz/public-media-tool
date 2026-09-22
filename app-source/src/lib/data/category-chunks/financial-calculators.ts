import { Tool } from '../../types';

export const tools: Tool[] = [
  {
    "id": "discount-tax-calculator",
    "slug": "discount-tax-calculator",
    "name": "Discount & Sales Tax Calculator",
    "shortDesc": "Calculate final prices, savings, tax amounts, and percentage discounts.",
    "description": "Quickly compute final checkout totals after discounts and regional sales taxes with clear itemized breakdown charts.",
    "category": "Financial Calculators",
    "iconName": "Percent",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 112000,
    "tags": [
      "calculator",
      "discount",
      "tax",
      "price",
      "savings",
      "percent"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter original price",
        "desc": "Type initial price tag amount."
      },
      {
        "step": 2,
        "title": "Enter discount & tax rates",
        "desc": "Specify discount percentage and sales tax rate."
      },
      {
        "step": 3,
        "title": "View total saved",
        "desc": "Read exact final price and total saved money."
      }
    ],
    "faqs": [
      {
        "question": "Does discount apply before or after tax?",
        "answer": "The calculator applies the discount first to the original price, then computes sales tax on the discounted subtotal."
      }
    ]
  },
  {
    "id": "percentage-calculator",
    "slug": "percentage-calculator",
    "name": "Universal Percentage & Percent Change Calculator",
    "shortDesc": "Calculate percentage of a value, percentage increases, decreases, and difference ratios.",
    "description": "Solve all percentage math problems: what is X% of Y, X is what % of Y, percentage increase or discount savings.",
    "category": "Financial Calculators",
    "iconName": "Percent",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 184200,
    "tags": [
      "percentage",
      "calculator",
      "discount",
      "increase",
      "percent difference"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Calculation Mode",
        "desc": "Choose \"X% of Y\", \"Percent Increase/Decrease\", or \"X is what % of Y\"."
      },
      {
        "step": 2,
        "title": "Enter Numbers",
        "desc": "Type input values."
      },
      {
        "step": 3,
        "title": "View Result",
        "desc": "Read exact calculated percentage value."
      }
    ],
    "faqs": [
      {
        "question": "How is percentage increase calculated?",
        "answer": "((New Value - Original Value) / Original Value) * 100"
      }
    ]
  },
  {
    "id": "mortgage-loan-calculator",
    "slug": "mortgage-loan-calculator",
    "name": "Mortgage & Loan Principal Payment Calculator",
    "shortDesc": "Calculate monthly loan payments, interest breakdowns, and total amortization schedules.",
    "description": "Calculate monthly home mortgage or loan repayments with fixed interest rates, loan terms (15 yr / 30 yr), and property tax estimates.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "isPopular": true,
    "isLatest": false,
    "usageCount": 142100,
    "tags": [
      "mortgage",
      "loan",
      "amortization",
      "interest rate",
      "monthly payment"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Home Price & Down Payment",
        "desc": "Type total purchase amount and down payment."
      },
      {
        "step": 2,
        "title": "Set Interest Rate & Term",
        "desc": "Select annual interest rate (e.g. 6.5%) and term (30 years)."
      },
      {
        "step": 3,
        "title": "Read Payment Summary",
        "desc": "Displays monthly principal + interest payment and amortization schedule."
      }
    ],
    "faqs": [
      {
        "question": "What is PMI (Private Mortgage Insurance)?",
        "answer": "Insurance required by lenders if down payment is less than 20% of purchase price."
      }
    ]
  },
  {
    "id": "bmi-calculator",
    "slug": "bmi-calculator",
    "name": "BMI (Body Mass Index) & Healthy Weight Calculator",
    "shortDesc": "Calculate BMI score and healthy weight range for adults based on height and weight.",
    "description": "Calculate Body Mass Index (BMI) using metric or US customary units and view WHO category classifications.",
    "category": "Financial Calculators",
    "iconName": "Activity",
    "isPopular": true,
    "isLatest": true,
    "usageCount": 162900,
    "tags": [
      "bmi",
      "body mass index",
      "health",
      "weight",
      "fitness"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Units",
        "desc": "Choose Metric (kg / cm) or US Customary (lbs / ft & in)."
      },
      {
        "step": 2,
        "title": "Enter Height & Weight",
        "desc": "Input height and weight numbers."
      },
      {
        "step": 3,
        "title": "View BMI Gauge",
        "desc": "Displays BMI score and classification (Underweight, Normal, Overweight, Obese)."
      }
    ],
    "faqs": [
      {
        "question": "What is normal adult BMI range?",
        "answer": "A BMI between 18.5 and 24.9 is classified as normal weight by WHO."
      }
    ]
  },
  {
    "id": "scientific-calculator-online",
    "slug": "scientific-calculator-online",
    "name": "Full Scientific Calculator (Trig, Log, Exponents)",
    "shortDesc": "Perform advanced scientific calculations: sin, cos, tan, log, ln, square root, power, and factorial.",
    "description": "Full-featured online scientific calculator with trigonometric functions, logarithmic functions, parentheses nesting, and memory functions.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 121400,
    "tags": [
      "scientific calculator",
      "trigonometry",
      "logarithm",
      "exponents",
      "math"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Click or type numbers",
        "desc": "Use screen keypad or keyboard."
      },
      {
        "step": 2,
        "title": "Apply functions",
        "desc": "Click sin, cos, tan, log, x^y, or √."
      },
      {
        "step": 3,
        "title": "Toggle Deg/Rad",
        "desc": "Switch between Degree and Radian modes."
      }
    ],
    "faqs": [
      {
        "question": "Does it support parentheses precedence?",
        "answer": "Yes, follows standard mathematical order of operations (PEMDAS)."
      }
    ]
  },
  {
    "id": "compound-interest-calculator",
    "slug": "compound-interest-calculator",
    "name": "Compound Interest & Investment Growth Calculator",
    "shortDesc": "Calculate compound interest growth over time with regular monthly deposits.",
    "description": "Project future investment growth using annual, monthly, or daily compounding interest rates.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 114200,
    "tags": [
      "compound interest",
      "investment",
      "growth",
      "savings",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter initial principal",
        "desc": "Type starting investment amount."
      },
      {
        "step": 2,
        "title": "Set annual rate & monthly deposit",
        "desc": "E.g. 7% return with $200/month deposit."
      },
      {
        "step": 3,
        "title": "View total growth table",
        "desc": "Displays total interest earned over 10, 20, or 30 years."
      }
    ],
    "faqs": [
      {
        "question": "What is the Rule of 72?",
        "answer": "Divide 72 by annual interest rate to estimate years needed to double investment."
      }
    ]
  },
  {
    "id": "simple-interest-calculator",
    "slug": "simple-interest-calculator",
    "name": "Simple Interest Rate Calculator (I = P * r * t)",
    "shortDesc": "Calculate simple interest, total principal repayment, and loan interest.",
    "description": "Calculate simple interest earnings and total loan repayment (Interest = Principal × Rate × Time).",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 68200,
    "tags": [
      "simple interest",
      "principal",
      "interest rate",
      "finance",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Principal amount",
        "desc": "Type principal loan or deposit."
      },
      {
        "step": 2,
        "title": "Enter Interest Rate & Time",
        "desc": "E.g. 5% for 3 years."
      },
      {
        "step": 3,
        "title": "Read calculated Interest",
        "desc": "View accrued simple interest and total balance."
      }
    ],
    "faqs": [
      {
        "question": "What is difference between simple and compound interest?",
        "answer": "Simple interest accrues only on the initial principal, whereas compound interest accrues on principal plus accumulated interest."
      }
    ]
  },
  {
    "id": "calorie-tdee-calculator",
    "slug": "calorie-tdee-calculator",
    "name": "TDEE (Total Daily Energy Expenditure) Calorie Calculator",
    "shortDesc": "Calculate your daily maintenance calories, BMR, and fitness goal calorie targets.",
    "description": "Calculate Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR) based on activity level.",
    "category": "Financial Calculators",
    "iconName": "Activity",
    "usageCount": 98200,
    "tags": [
      "tdee",
      "bmr",
      "calories",
      "maintenance calories",
      "weight loss"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter age, gender, height, weight",
        "desc": "Type personal metrics."
      },
      {
        "step": 2,
        "title": "Select daily activity level",
        "desc": "Sedentary, Lightly Active, Moderate, Heavy."
      },
      {
        "step": 3,
        "title": "Read TDEE breakdown",
        "desc": "View maintenance, weight loss (-500 kcal), and bulking targets."
      }
    ],
    "faqs": [
      {
        "question": "What is BMR?",
        "answer": "Basal Metabolic Rate: calories burned by your body at complete rest."
      }
    ]
  },
  {
    "id": "macro-nutrient-calculator",
    "slug": "macro-nutrient-calculator",
    "name": "Macronutrient Ratio Calculator (Protein, Carbs, Fat)",
    "shortDesc": "Calculate daily protein, carbohydrate, and fat gram targets for fitness goals.",
    "description": "Calculate daily protein, carb, and fat gram targets tailored for Keto, Balanced, or High-Protein diets.",
    "category": "Financial Calculators",
    "iconName": "Activity",
    "usageCount": 81200,
    "tags": [
      "macros",
      "protein",
      "carbs",
      "fats",
      "keto",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter daily calorie goal",
        "desc": "E.g. 2,000 calories."
      },
      {
        "step": 2,
        "title": "Select diet profile",
        "desc": "Choose Balanced (40/30/30), Low Carb, or High Protein."
      },
      {
        "step": 3,
        "title": "Read macro grams",
        "desc": "Displays exact grams of Protein, Carbs, and Fats to eat daily."
      }
    ],
    "faqs": [
      {
        "question": "How many calories per gram of protein, carb, and fat?",
        "answer": "1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal."
      }
    ]
  },
  {
    "id": "tip-bill-splitter-calculator",
    "slug": "tip-bill-splitter-calculator",
    "name": "Restaurant Tip & Bill Splitter Calculator",
    "shortDesc": "Calculate tip amount, total bill with tax, and individual per-person split costs.",
    "description": "Calculate restaurant gratuity tips (15%, 18%, 20%) and split total bill evenly across group members.",
    "category": "Financial Calculators",
    "iconName": "DollarSign",
    "usageCount": 91400,
    "tags": [
      "tip calculator",
      "bill splitter",
      "gratuity",
      "restaurant",
      "diners"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter total bill amount",
        "desc": "Type pre-tax or post-tax bill total."
      },
      {
        "step": 2,
        "title": "Select tip percentage",
        "desc": "Click 15%, 18%, 20%, or enter custom %."
      },
      {
        "step": 3,
        "title": "Set number of people",
        "desc": "Divide cost to see per-person payment."
      }
    ],
    "faqs": [
      {
        "question": "Is tip calculated before or after tax?",
        "answer": "Standard etiquette calculates tips on the pre-tax food and beverage subtotal."
      }
    ]
  },
  {
    "id": "sales-tax-vat-calculator",
    "slug": "sales-tax-vat-calculator",
    "name": "Sales Tax & VAT (Value Added Tax) Calculator",
    "shortDesc": "Calculate gross total with tax added or extract net price from tax-inclusive price.",
    "description": "Calculate sales tax and VAT additions or back-calculate net prices from tax-inclusive receipt totals.",
    "category": "Financial Calculators",
    "iconName": "DollarSign",
    "usageCount": 76200,
    "tags": [
      "sales tax",
      "vat",
      "gst",
      "tax calculator",
      "net price"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select mode",
        "desc": "Choose \"Add Tax\" or \"Remove/Extract Tax\"."
      },
      {
        "step": 2,
        "title": "Enter price & tax rate",
        "desc": "E.g. $100 with 20% VAT."
      },
      {
        "step": 3,
        "title": "Read tax breakdown",
        "desc": "Shows net price, tax amount, and gross price."
      }
    ],
    "faqs": [
      {
        "question": "How to extract 20% VAT from a $120 total?",
        "answer": "Net = $120 / 1.20 = $100; Tax = $20."
      }
    ]
  },
  {
    "id": "discount-savings-calculator",
    "slug": "discount-savings-calculator",
    "name": "Shopping Discount & Sale Price Calculator",
    "shortDesc": "Calculate sale price and money saved with percentage discounts and double coupons.",
    "description": "Calculate final store sale prices and total savings from percentage or stacked discount coupons.",
    "category": "Financial Calculators",
    "iconName": "Tag",
    "usageCount": 88100,
    "tags": [
      "discount",
      "sale price",
      "savings",
      "shopping",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter original retail price",
        "desc": "E.g. $79.99."
      },
      {
        "step": 2,
        "title": "Enter discount percentage",
        "desc": "E.g. 25% OFF."
      },
      {
        "step": 3,
        "title": "Read final price & savings",
        "desc": "Final price: $59.99; Saved: $20.00."
      }
    ],
    "faqs": [
      {
        "question": "How are double stacked discounts calculated?",
        "answer": "First discount applies to original price, second discount applies to reduced intermediate price."
      }
    ]
  },
  {
    "id": "loan-payoff-paycheck-calculator",
    "slug": "loan-payoff-paycheck-calculator",
    "name": "Loan Early Payoff & Interest Savings Calculator",
    "shortDesc": "Calculate how extra monthly payments shorten loan duration and save interest.",
    "description": "Calculate total interest savings and shortened repayment timeline from making extra monthly loan principal payments.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 54100,
    "tags": [
      "loan payoff",
      "extra payment",
      "interest savings",
      "amortization",
      "finance"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter loan balance & rate",
        "desc": "E.g. $25,000 auto loan at 5%."
      },
      {
        "step": 2,
        "title": "Enter extra monthly payment",
        "desc": "E.g. +$100 extra/month."
      },
      {
        "step": 3,
        "title": "Read time & interest saved",
        "desc": "Shows months shaved off loan term and total interest saved."
      }
    ],
    "faqs": [
      {
        "question": "Do extra payments go directly to principal balance?",
        "answer": "Yes, provided you specify \"Principal Only\" with your loan servicer."
      }
    ]
  },
  {
    "id": "auto-loan-financing-calculator",
    "slug": "auto-loan-financing-calculator",
    "name": "Car Auto Loan Payment & Financing Calculator",
    "shortDesc": "Calculate monthly car payments with trade-in value, down payment, and sales tax.",
    "description": "Calculate monthly vehicle financing payments including trade-in allowance, sales tax, and dealer fees.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 71200,
    "tags": [
      "auto loan",
      "car payment",
      "trade in",
      "vehicle financing",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter car purchase price",
        "desc": "E.g. $32,000."
      },
      {
        "step": 2,
        "title": "Enter trade-in value & down payment",
        "desc": "E.g. $5,000 trade-in + $2,000 cash."
      },
      {
        "step": 3,
        "title": "Set interest rate & loan term",
        "desc": "E.g. 5.9% APR for 60 months."
      }
    ],
    "faqs": [
      {
        "question": "What is standard auto loan term duration?",
        "answer": "Common terms are 48, 60, or 72 months."
      }
    ]
  },
  {
    "id": "credit-card-payoff-calculator",
    "slug": "credit-card-payoff-calculator",
    "name": "Credit Card Debt Payoff Timeline Calculator",
    "shortDesc": "Calculate months to become debt-free paying minimum vs fixed monthly payments.",
    "description": "Calculate credit card debt payoff schedules comparing minimum payments against fixed monthly payment targets.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 65200,
    "tags": [
      "credit card",
      "debt payoff",
      "minimum payment",
      "interest",
      "finance"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter credit card balance",
        "desc": "E.g. $8,500."
      },
      {
        "step": 2,
        "title": "Enter APR interest rate",
        "desc": "E.g. 21.99% APR."
      },
      {
        "step": 3,
        "title": "Set monthly payment amount",
        "desc": "Compare paying minimum vs $300/month."
      }
    ],
    "faqs": [
      {
        "question": "Why does paying only minimum balance take decades?",
        "answer": "Minimum payments mostly cover accrued monthly interest rather than principal debt."
      }
    ]
  },
  {
    "id": "salary-hourly-pay-calculator",
    "slug": "salary-hourly-pay-calculator",
    "name": "Salary to Hourly Pay Rate Converter",
    "shortDesc": "Convert annual salary to hourly, weekly, bi-weekly, and monthly pay rates.",
    "description": "Convert annual salaries (e.g. $75,000/yr) into equivalent hourly, daily, bi-weekly, and monthly wage rates.",
    "category": "Financial Calculators",
    "iconName": "DollarSign",
    "usageCount": 89400,
    "tags": [
      "salary to hourly",
      "wage converter",
      "paycheck",
      "income",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter annual salary or hourly wage",
        "desc": "E.g. $65,000/year."
      },
      {
        "step": 2,
        "title": "Set work hours per week",
        "desc": "Default 40 hours/week."
      },
      {
        "step": 3,
        "title": "Read pay breakdown",
        "desc": "Displays $31.25/hr, $1,250/wk, $2,708 bi-weekly, $5,416/mo."
      }
    ],
    "faqs": [
      {
        "question": "How many work hours in a standard year?",
        "answer": "2,080 hours (40 hours/week × 52 weeks)."
      }
    ]
  },
  {
    "id": "hourly-to-salary-calculator",
    "slug": "hourly-to-salary-calculator",
    "name": "Hourly Wage to Annual Salary Calculator",
    "shortDesc": "Calculate total annual income and monthly pay from hourly wage rates.",
    "description": "Calculate full-year gross annual income from hourly wage rates and overtime hours.",
    "category": "Financial Calculators",
    "iconName": "DollarSign",
    "usageCount": 78100,
    "tags": [
      "hourly to salary",
      "wage",
      "overtime",
      "annual income",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter hourly pay rate",
        "desc": "E.g. $25.00/hr."
      },
      {
        "step": 2,
        "title": "Enter weekly work hours",
        "desc": "E.g. 40 hours standard + 5 hours overtime (1.5x)."
      },
      {
        "step": 3,
        "title": "Read annual gross income",
        "desc": "Calculates total annual gross earnings."
      }
    ],
    "faqs": [
      {
        "question": "How is overtime pay calculated?",
        "answer": "Standard overtime pays 1.5 times regular hourly wage rate for hours >40 per week."
      }
    ]
  },
  {
    "id": "apy-effective-interest-calculator",
    "slug": "apy-effective-interest-calculator",
    "name": "APY (Annual Percentage Yield) Calculator",
    "shortDesc": "Calculate APY from APR and compounding frequency (daily, monthly, quarterly).",
    "description": "Calculate effective Annual Percentage Yield (APY) from nominal interest rate (APR) and compounding intervals.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 42100,
    "tags": [
      "apy",
      "apr",
      "effective rate",
      "compounding",
      "bank account"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter nominal APR rate",
        "desc": "E.g. 5.0% APR."
      },
      {
        "step": 2,
        "title": "Select compounding frequency",
        "desc": "Daily (365), Monthly (12), Quarterly (4)."
      },
      {
        "step": 3,
        "title": "Read effective APY",
        "desc": "5.0% APR compounded daily = 5.13% APY."
      }
    ],
    "faqs": [
      {
        "question": "What is difference between APR and APY?",
        "answer": "APR does not include compounding effects, whereas APY includes compound growth interest."
      }
    ]
  },
  {
    "id": "roi-return-on-investment-calculator",
    "slug": "roi-return-on-investment-calculator",
    "name": "ROI (Return on Investment) Calculator",
    "shortDesc": "Calculate percentage ROI, total profit/loss, and annualized return rate.",
    "description": "Calculate total investment profit margin and annualized Return on Investment (ROI) percentage.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 84200,
    "tags": [
      "roi",
      "return on investment",
      "profit",
      "investment",
      "finance"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter initial investment cost",
        "desc": "E.g. $10,000."
      },
      {
        "step": 2,
        "title": "Enter final value returned",
        "desc": "E.g. $14,500."
      },
      {
        "step": 3,
        "title": "Enter holding period in years",
        "desc": "E.g. 3 years."
      }
    ],
    "faqs": [
      {
        "question": "What is annualized ROI formula?",
        "answer": "Annualized ROI = ((Final / Initial) ^ (1 / Years) - 1) * 100"
      }
    ]
  },
  {
    "id": "margin-markup-calculator",
    "slug": "margin-markup-calculator",
    "name": "Profit Margin & Price Markup Calculator",
    "shortDesc": "Calculate gross profit margin %, markup %, and selling price from cost.",
    "description": "Calculate retail selling prices, gross profit margin percentages, and markup percentages.",
    "category": "Financial Calculators",
    "iconName": "Percent",
    "usageCount": 79200,
    "tags": [
      "profit margin",
      "markup",
      "gross profit",
      "retail price",
      "business"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter item cost price",
        "desc": "E.g. $40 cost."
      },
      {
        "step": 2,
        "title": "Enter target Margin % or Markup %",
        "desc": "E.g. 50% Profit Margin."
      },
      {
        "step": 3,
        "title": "Read required selling price",
        "desc": "Selling price: $80; Profit: $40; Markup: 100%."
      }
    ],
    "faqs": [
      {
        "question": "What is difference between Margin and Markup?",
        "answer": "Margin is profit divided by revenue; Markup is profit divided by cost."
      }
    ]
  },
  {
    "id": "break-even-analysis-calculator",
    "slug": "break-even-analysis-calculator",
    "name": "Business Break-Even Point Calculator",
    "shortDesc": "Calculate sales unit volume needed to cover fixed costs and variable costs.",
    "description": "Calculate business break-even sales volume required to cover fixed overhead costs.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 48200,
    "tags": [
      "break even",
      "fixed costs",
      "variable costs",
      "business",
      "profit"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter total fixed costs",
        "desc": "E.g. $5,000/month rent and salaries."
      },
      {
        "step": 2,
        "title": "Enter selling price per unit",
        "desc": "E.g. $50/unit."
      },
      {
        "step": 3,
        "title": "Enter variable cost per unit",
        "desc": "E.g. $20/unit."
      }
    ],
    "faqs": [
      {
        "question": "What is contribution margin per unit?",
        "answer": "Selling Price minus Variable Cost per unit ($50 - $20 = $30)."
      }
    ]
  },
  {
    "id": "inflation-adjusted-calculator",
    "slug": "inflation-adjusted-calculator",
    "name": "Historical Inflation & Purchasing Power Calculator",
    "shortDesc": "Calculate future or past purchasing power loss based on annual inflation rates.",
    "description": "Calculate future purchasing power loss and equivalent money values over time.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 51200,
    "tags": [
      "inflation",
      "purchasing power",
      "cpi",
      "historical money",
      "finance"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter starting dollar amount",
        "desc": "E.g. $10,000."
      },
      {
        "step": 2,
        "title": "Enter average inflation rate",
        "desc": "E.g. 3.2% annual CPI."
      },
      {
        "step": 3,
        "title": "Set duration in years",
        "desc": "E.g. 20 years."
      }
    ],
    "faqs": [
      {
        "question": "What happens to $10,000 at 3% inflation over 24 years?",
        "answer": "Purchasing power drops by half (worth ~$5,000 in today's money)."
      }
    ]
  },
  {
    "id": "depreciation-asset-calculator",
    "slug": "depreciation-asset-calculator",
    "name": "Straight-Line Asset Depreciation Calculator",
    "shortDesc": "Calculate annual asset value depreciation and remaining book value over time.",
    "description": "Calculate annual straight-line asset depreciation expenses and book value schedules for business equipment.",
    "category": "Financial Calculators",
    "iconName": "TrendingUp",
    "usageCount": 38200,
    "tags": [
      "depreciation",
      "straight line",
      "book value",
      "salvage value",
      "accounting"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter initial asset cost",
        "desc": "E.g. $15,000 machine."
      },
      {
        "step": 2,
        "title": "Enter estimated salvage value",
        "desc": "E.g. $3,000."
      },
      {
        "step": 3,
        "title": "Set useful lifespan in years",
        "desc": "E.g. 5 years."
      }
    ],
    "faqs": [
      {
        "question": "What is straight-line depreciation formula?",
        "answer": "Annual Expense = (Initial Cost - Salvage Value) / Lifespan Years."
      }
    ]
  },
  {
    "id": "pregnancy-due-date-calculator",
    "slug": "pregnancy-due-date-calculator",
    "name": "Pregnancy Due Date & Trimester Calculator",
    "shortDesc": "Calculate estimated baby due date based on Last Menstrual Period (LMP).",
    "description": "Calculate estimated due date, pregnancy milestones, and current week/trimester progress using Naegele's rule.",
    "category": "Financial Calculators",
    "iconName": "Calendar",
    "usageCount": 112000,
    "tags": [
      "pregnancy",
      "due date",
      "trimester",
      "lmp",
      "health"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select First Day of Last Period (LMP)",
        "desc": "Pick date on calendar."
      },
      {
        "step": 2,
        "title": "Select average cycle length",
        "desc": "Default 28 days."
      },
      {
        "step": 3,
        "title": "Read estimated Due Date",
        "desc": "Displays due date, current pregnancy week, and trimester timeline."
      }
    ],
    "faqs": [
      {
        "question": "What is Naegele's Rule?",
        "answer": "Add 1 year, subtract 3 months, and add 7 days to first day of LMP."
      }
    ]
  },
  {
    "id": "ovulation-fertility-calculator",
    "slug": "ovulation-fertility-calculator",
    "name": "Ovulation & Fertile Window Calculator",
    "shortDesc": "Estimate peak fertile window dates and upcoming ovulation days.",
    "description": "Estimate upcoming fertile window dates and peak conception probability days.",
    "category": "Financial Calculators",
    "iconName": "Calendar",
    "usageCount": 78200,
    "tags": [
      "ovulation",
      "fertility",
      "conception",
      "cycle",
      "health"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter first day of last period",
        "desc": "Select calendar date."
      },
      {
        "step": 2,
        "title": "Enter average cycle length",
        "desc": "E.g. 28 to 30 days."
      },
      {
        "step": 3,
        "title": "View fertile window calendar",
        "desc": "Highlights 6 peak fertile days and ovulation date."
      }
    ],
    "faqs": [
      {
        "question": "When does ovulation typically occur?",
        "answer": "Approximately 14 days before the start of the next menstrual period."
      }
    ]
  },
  {
    "id": "body-fat-percentage-calculator",
    "slug": "body-fat-percentage-calculator",
    "name": "Body Fat Percentage US Navy Method Calculator",
    "shortDesc": "Estimate body fat % using US Navy circumference tape measurements.",
    "description": "Estimate body fat percentage and lean muscle mass using the US Navy tape measure method.",
    "category": "Financial Calculators",
    "iconName": "Activity",
    "usageCount": 92100,
    "tags": [
      "body fat",
      "navy method",
      "lean mass",
      "fitness",
      "tape measure"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select gender & height",
        "desc": "Type height."
      },
      {
        "step": 2,
        "title": "Enter neck, waist, and hip tape measurements",
        "desc": "Measure neck below larynx, waist at belly button."
      },
      {
        "step": 3,
        "title": "Read Body Fat %",
        "desc": "Displays body fat % and lean body mass weight."
      }
    ],
    "faqs": [
      {
        "question": "What is healthy body fat % for men and women?",
        "answer": "Essential fat: Men 2-5%, Women 10-13%; Fitness: Men 14-17%, Women 21-24%."
      }
    ]
  },
  {
    "id": "water-intake-hydration-calculator",
    "slug": "water-intake-hydration-calculator",
    "name": "Daily Water Intake Hydration Calculator",
    "shortDesc": "Calculate recommended daily water intake liters and cups based on weight and activity.",
    "description": "Calculate daily fluid hydration targets tailored to body weight, exercise duration, and climate.",
    "category": "Financial Calculators",
    "iconName": "Activity",
    "usageCount": 65100,
    "tags": [
      "water intake",
      "hydration",
      "liters",
      "cups",
      "health"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter body weight",
        "desc": "E.g. 160 lbs or 72 kg."
      },
      {
        "step": 2,
        "title": "Enter daily exercise minutes",
        "desc": "E.g. 45 minutes workout."
      },
      {
        "step": 3,
        "title": "Read water goal",
        "desc": "Outputs total Liters, Ounces, and 8oz Glass counts."
      }
    ],
    "faqs": [
      {
        "question": "How much extra water should be added per 30 minutes of exercise?",
        "answer": "Add approx. 12 ounces (350 mL) for every 30 minutes of intense exercise."
      }
    ]
  },
  {
    "id": "pace-running-calculator",
    "slug": "pace-running-calculator",
    "name": "Running Pace, Distance & Finish Time Calculator",
    "shortDesc": "Calculate running pace (min/mile or min/km) for 5K, 10K, Half Marathon, Full Marathon.",
    "description": "Calculate target running paces, race finish times, and split times for 5K, 10K, 21K, 42K races.",
    "category": "Financial Calculators",
    "iconName": "Clock",
    "usageCount": 88200,
    "tags": [
      "running pace",
      "marathon",
      "5k",
      "finish time",
      "splits"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select distance preset",
        "desc": "Choose 5K, 10K, Half Marathon (21.1 km), or Full Marathon (42.2 km)."
      },
      {
        "step": 2,
        "title": "Enter finish time target",
        "desc": "E.g. 1 hour 45 minutes for Half Marathon."
      },
      {
        "step": 3,
        "title": "Read required pace",
        "desc": "Displays 8:00 min/mile or 4:58 min/km pace."
      }
    ],
    "faqs": [
      {
        "question": "What is marathon distance in miles and kilometers?",
        "answer": "26.219 miles or 42.195 kilometers."
      }
    ]
  },
  {
    "id": "gpa-grade-point-calculator",
    "slug": "gpa-grade-point-calculator",
    "name": "College & High School Cumulative GPA Calculator",
    "shortDesc": "Calculate semester or cumulative Grade Point Average (GPA) on a 4.0 scale.",
    "description": "Calculate unweighted and weighted semester Grade Point Average (GPA) on a 4.0 scale.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 114200,
    "tags": [
      "gpa",
      "grade point average",
      "college",
      "high school",
      "grades"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter course names & credit hours",
        "desc": "E.g. Math (3 credits)."
      },
      {
        "step": 2,
        "title": "Select letter grades",
        "desc": "Select A (4.0), B+ (3.3), B (3.0), etc."
      },
      {
        "step": 3,
        "title": "Read cumulative GPA",
        "desc": "Calculates total grade points divided by total credits."
      }
    ],
    "faqs": [
      {
        "question": "What grade point value is assigned to letter grades?",
        "answer": "A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, D=1.0, F=0.0"
      }
    ]
  },
  {
    "id": "grade-percentage-letter-converter",
    "slug": "grade-percentage-letter-converter",
    "name": "Test Score Grade Percentage to Letter Grade Converter",
    "shortDesc": "Convert test score percentages into letter grades (A+, A, A-, B, C, D, F) and 4.0 scale.",
    "description": "Convert test percentage scores into letter grades and GPA scale points.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 58200,
    "tags": [
      "test grade",
      "letter grade",
      "percentage",
      "school",
      "converter"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter score & max possible",
        "desc": "E.g. 42 out of 50."
      },
      {
        "step": 2,
        "title": "Calculate percentage",
        "desc": "42 / 50 = 84%."
      },
      {
        "step": 3,
        "title": "Read letter grade",
        "desc": "84% = B letter grade (3.0 GPA point)."
      }
    ],
    "faqs": [
      {
        "question": "What percentage is standard B grade range?",
        "answer": "83% to 86% is standard B grade range."
      }
    ]
  },
  {
    "id": "final-grade-exam-calculator",
    "slug": "final-grade-exam-calculator",
    "name": "Final Exam Required Grade Calculator",
    "shortDesc": "Calculate the minimum final exam score required to achieve your target class grade.",
    "description": "Calculate the minimum final exam score required to maintain or reach a target overall course grade.",
    "category": "Financial Calculators",
    "iconName": "Calculator",
    "usageCount": 91200,
    "tags": [
      "final grade",
      "exam score",
      "target grade",
      "school",
      "calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter current class grade %",
        "desc": "E.g. 88% overall."
      },
      {
        "step": 2,
        "title": "Enter desired target grade %",
        "desc": "E.g. 90% (A-)."
      },
      {
        "step": 3,
        "title": "Enter final exam weight %",
        "desc": "E.g. Final is worth 20% of class grade."
      }
    ],
    "faqs": [
      {
        "question": "How is required final score calculated?",
        "answer": "Required Score = (Target Grade - Current Grade * (1 - Weight)) / Weight"
      }
    ]
  },
  {
    "id": "age-birthday-calculator",
    "slug": "age-birthday-calculator",
    "name": "Exact Chronological Age & Birthday Calculator",
    "shortDesc": "Calculate exact age in years, months, days, hours, and days until next birthday.",
    "description": "Calculate chronological age in years, months, weeks, days, and count down days until next birthday.",
    "category": "Financial Calculators",
    "iconName": "Calendar",
    "usageCount": 148200,
    "tags": [
      "age calculator",
      "birthday",
      "chronological age",
      "days old",
      "calendar"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Date of Birth",
        "desc": "Pick birth year, month, and day."
      },
      {
        "step": 2,
        "title": "Select Target Date",
        "desc": "Default today's date."
      },
      {
        "step": 3,
        "title": "Read age report",
        "desc": "Displays exact age (e.g., 28 years, 4 months, 12 days) and total days lived."
      }
    ],
    "faqs": [
      {
        "question": "Does it handle leap years?",
        "answer": "Yes, leap years with 366 days are calculated precisely."
      }
    ]
  },
  {
    "id": "date-duration-difference-calculator",
    "slug": "date-duration-difference-calculator",
    "name": "Days Between Dates Duration Calculator",
    "shortDesc": "Calculate total days, business workdays, and weeks between two calendar dates.",
    "description": "Calculate exact calendar days, business workdays (excluding weekends), and week spans between two dates.",
    "category": "Financial Calculators",
    "iconName": "Calendar",
    "usageCount": 104200,
    "tags": [
      "days between dates",
      "workdays",
      "date duration",
      "business days",
      "calendar"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Select Start Date",
        "desc": "Pick date."
      },
      {
        "step": 2,
        "title": "Select End Date",
        "desc": "Pick target date."
      },
      {
        "step": 3,
        "title": "Toggle weekend exclusion",
        "desc": "Calculates total days vs Monday-Friday workdays."
      }
    ],
    "faqs": [
      {
        "question": "How many workdays in a typical month?",
        "answer": "Approximately 20 to 22 business workdays per month."
      }
    ]
  },
  {
    "id": "time-addition-subtraction-calculator",
    "slug": "time-addition-subtraction-calculator",
    "name": "Time Addition & Subtraction Calculator (Hours:Mins:Secs)",
    "shortDesc": "Add or subtract multiple time duration entries (hh:mm:ss) together.",
    "description": "Sum or subtract time duration entries (hours, minutes, seconds) for video editing and timesheets.",
    "category": "Financial Calculators",
    "iconName": "Clock",
    "usageCount": 71200,
    "tags": [
      "time calculator",
      "add hours",
      "subtract time",
      "hh:mm:ss",
      "timesheet"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter time entries",
        "desc": "E.g. 1h 45m 30s + 2h 20m 45s."
      },
      {
        "step": 2,
        "title": "Select Add or Subtract",
        "desc": "Combine multiple duration items."
      },
      {
        "step": 3,
        "title": "Read total time",
        "desc": "Outputs 4 hours 06 minutes 15 seconds."
      }
    ],
    "faqs": [
      {
        "question": "Does it roll over minutes >60 to hours?",
        "answer": "Yes, automatically normalizes 60 seconds = 1 minute and 60 minutes = 1 hour."
      }
    ]
  },
  {
    "id": "fuel-trip-cost-calculator",
    "slug": "fuel-trip-cost-calculator",
    "name": "Road Trip Gas & Fuel Cost Calculator",
    "shortDesc": "Calculate total gas cost for road trips based on mileage, MPG, and gas price.",
    "description": "Calculate total trip fuel expenses and split gas costs among passengers.",
    "category": "Financial Calculators",
    "iconName": "DollarSign",
    "usageCount": 89400,
    "tags": [
      "gas cost",
      "fuel cost",
      "road trip",
      "mpg",
      "travel calculator"
    ],
    "howToUse": [
      {
        "step": 1,
        "title": "Enter total trip distance",
        "desc": "E.g. 450 miles."
      },
      {
        "step": 2,
        "title": "Enter vehicle MPG & gas price",
        "desc": "E.g. 28 MPG at $3.60/gallon."
      },
      {
        "step": 3,
        "title": "Read fuel cost total",
        "desc": "Total gas cost: $57.86; split across passengers."
      }
    ],
    "faqs": [
      {
        "question": "How is trip gas cost calculated?",
        "answer": "Cost = (Distance / MPG) * Price per Gallon"
      }
    ]
  }
];

export default tools;
