import { Tool, CategoryInfo } from '../types';
import { CATEGORIES as DYNAMIC_CATEGORIES, STATIC_CATEGORIES } from '../categories';
import { SEARCH_INDEX } from '../search-index';

import { tools as textFormattingTools } from '../data/category-chunks/text-formatting';
import { tools as textAnalysisTools } from '../data/category-chunks/text-analysis';
import { tools as textEncodingTools } from '../data/category-chunks/text-encoding';
import { tools as codeFormattersTools } from '../data/category-chunks/code-formatters';
import { tools as webApiToolsTools } from '../data/category-chunks/web-api-tools';
import { tools as dataSchemaToolsTools } from '../data/category-chunks/data-schema-tools';
import { tools as imageResizingTools } from '../data/category-chunks/image-resizing';
import { tools as imageConversionTools } from '../data/category-chunks/image-conversion';
import { tools as photoFiltersTools } from '../data/category-chunks/photo-filters';
import { tools as financialCalculatorsTools } from '../data/category-chunks/financial-calculators';
import { tools as everydayCalculatorsTools } from '../data/category-chunks/everyday-calculators';
import { tools as mathCalculatorsTools } from '../data/category-chunks/math-calculators';
import { tools as serpSeoToolsTools } from '../data/category-chunks/serp-seo-tools';
import { tools as metaStructuredDataTools } from '../data/category-chunks/meta-structured-data';
import { tools as contentSeoToolsTools } from '../data/category-chunks/content-seo-tools';
import { tools as measurementConvertersTools } from '../data/category-chunks/measurement-converters';
import { tools as scientificConvertersTools } from '../data/category-chunks/scientific-converters';
import { tools as colorPalettesTools } from '../data/category-chunks/color-palettes';
import { tools as colorConvertersTools } from '../data/category-chunks/color-converters';
import { tools as pdfInspectionTools } from '../data/category-chunks/pdf-inspection';
import { tools as pdfDocumentToolsTools } from '../data/category-chunks/pdf-document-tools';
import { tools as cryptographyHashingTools } from '../data/category-chunks/cryptography-hashing';
import { tools as passwordsSecurityTools } from '../data/category-chunks/passwords-security';
import { tools as financeToolsTools } from '../data/category-chunks/finance-tools';
import { tools as mathToolsTools } from '../data/category-chunks/math-tools';
import { tools as generatorsTools } from '../data/category-chunks/generators';
import { tools as productivityTools } from '../data/category-chunks/productivity';
import { tools as businessToolsTools } from '../data/category-chunks/business-tools';
import { tools as webToolsTools } from '../data/category-chunks/web-tools';
import { tools as audioProductionTools } from '../data/category-chunks/audio-production';
import { tools as healthFitnessTools } from '../data/category-chunks/health-fitness';
import { tools as fileToolsTools } from '../data/category-chunks/file-tools';
import { tools as educationTools } from '../data/category-chunks/education';
import { tools as dateTimeTools } from '../data/category-chunks/date-time';
import { tools as unitConvertersTools } from '../data/category-chunks/unit-converters';
import { tools as automotiveTools } from '../data/category-chunks/automotive';
import { tools as travelToolsTools } from '../data/category-chunks/travel-tools';
import { tools as realEstateTools } from '../data/category-chunks/real-estate';
import { tools as hrPayrollTools } from '../data/category-chunks/hr-payroll';
import { tools as accountingTools } from '../data/category-chunks/accounting';
import { tools as eCommerceTools } from '../data/category-chunks/e-commerce';
import { tools as inventoryLogisticsTools } from '../data/category-chunks/inventory-logistics';
import { tools as engineeringToolsTools } from '../data/category-chunks/engineering-tools';
import { tools as constructionToolsTools } from '../data/category-chunks/construction-tools';
import { tools as electricalSolarTools } from '../data/category-chunks/electrical-solar';
import { tools as diningHospitalityTools } from '../data/category-chunks/dining-hospitality';
import { tools as eventsLifestyleTools } from '../data/category-chunks/events-lifestyle';
import { tools as natureEnvironmentTools } from '../data/category-chunks/nature-environment';
import { tools as legalCivicToolsTools } from '../data/category-chunks/legal-civic-tools';
import { tools as networkingDataTools } from '../data/category-chunks/networking-data';
import { tools as workplaceProductivityTools } from '../data/category-chunks/workplace-productivity';
import { tools as marketingCreatorToolsTools } from '../data/category-chunks/marketing-creator-tools';

export const CATEGORIES: any[] = DYNAMIC_CATEGORIES;

export const WORKING_TOOLS: Tool[] = [
  ...textFormattingTools,
  ...textAnalysisTools,
  ...textEncodingTools,
  ...codeFormattersTools,
  ...webApiToolsTools,
  ...dataSchemaToolsTools,
  ...imageResizingTools,
  ...imageConversionTools,
  ...photoFiltersTools,
  ...financialCalculatorsTools,
  ...everydayCalculatorsTools,
  ...mathCalculatorsTools,
  ...serpSeoToolsTools,
  ...metaStructuredDataTools,
  ...contentSeoToolsTools,
  ...measurementConvertersTools,
  ...scientificConvertersTools,
  ...colorPalettesTools,
  ...colorConvertersTools,
  ...pdfInspectionTools,
  ...pdfDocumentToolsTools,
  ...cryptographyHashingTools,
  ...passwordsSecurityTools,
  ...financeToolsTools,
  ...mathToolsTools,
  ...generatorsTools,
  ...productivityTools,
  ...businessToolsTools,
  ...webToolsTools,
  ...audioProductionTools,
  ...healthFitnessTools,
  ...fileToolsTools,
  ...educationTools,
  ...dateTimeTools,
  ...unitConvertersTools,
  ...automotiveTools,
  ...travelToolsTools,
  ...realEstateTools,
  ...hrPayrollTools,
  ...accountingTools,
  ...eCommerceTools,
  ...inventoryLogisticsTools,
  ...engineeringToolsTools,
  ...constructionToolsTools,
  ...electricalSolarTools,
  ...diningHospitalityTools,
  ...eventsLifestyleTools,
  ...natureEnvironmentTools,
  ...legalCivicToolsTools,
  ...networkingDataTools,
  ...workplaceProductivityTools,
  ...marketingCreatorToolsTools,
];

export const TOTAL_TOOLS = WORKING_TOOLS.length;
export const TOTAL_CATEGORIES = CATEGORIES.length;

export function getCategoryById(categoryId: string): any {
  return CATEGORIES.find((c) => c.id === categoryId);
}

export function getCategoryBySlug(slug: string): any {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return WORKING_TOOLS.filter((t) => t.category === categoryId);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return WORKING_TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDesc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
  );
}

export const TOOLS = WORKING_TOOLS;
