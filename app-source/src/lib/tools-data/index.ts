import { Tool, CategoryInfo } from '../types';
import { CATEGORIES as DYNAMIC_CATEGORIES, STATIC_CATEGORIES } from '../categories';
import { SEARCH_INDEX } from '../search-index';

import { tools as accountingTools } from '../data/category-chunks/accounting';
import { tools as agricultureTools } from '../data/category-chunks/agriculture';
import { tools as audioToolsTools } from '../data/category-chunks/audio-tools';
import { tools as automotiveTools } from '../data/category-chunks/automotive';
import { tools as beautySalonTools } from '../data/category-chunks/beauty-salon';
import { tools as businessToolsTools } from '../data/category-chunks/business-tools';
import { tools as calculatorToolsTools } from '../data/category-chunks/calculator-tools';
import { tools as colorToolsTools } from '../data/category-chunks/color-tools';
import { tools as constructionTools } from '../data/category-chunks/construction';
import { tools as converterToolsTools } from '../data/category-chunks/converter-tools';
import { tools as dataManagementTools } from '../data/category-chunks/data-management';
import { tools as dateTimeTools } from '../data/category-chunks/date-time';
import { tools as developerToolsTools } from '../data/category-chunks/developer-tools';
import { tools as eCommerceTools } from '../data/category-chunks/e-commerce';
import { tools as educationTools } from '../data/category-chunks/education';
import { tools as electricalSolarTools } from '../data/category-chunks/electrical-solar';
import { tools as engineeringTools } from '../data/category-chunks/engineering';
import { tools as environmentEnergyTools } from '../data/category-chunks/environment-energy';
import { tools as fileToolsTools } from '../data/category-chunks/file-tools';
import { tools as financeToolsTools } from '../data/category-chunks/finance-tools';
import { tools as freelancingTools } from '../data/category-chunks/freelancing';
import { tools as generatorsTools } from '../data/category-chunks/generators';
import { tools as governmentPublicServicesTools } from '../data/category-chunks/government-public-services';
import { tools as healthFitnessTools } from '../data/category-chunks/health-fitness';
import { tools as hrPayrollTools } from '../data/category-chunks/hr-payroll';
import { tools as imageToolsTools } from '../data/category-chunks/image-tools';
import { tools as inventoryLogisticsTools } from '../data/category-chunks/inventory-logistics';
import { tools as legalToolsTools } from '../data/category-chunks/legal-tools';
import { tools as marketingAdvertisingTools } from '../data/category-chunks/marketing-advertising';
import { tools as mathToolsTools } from '../data/category-chunks/math-tools';
import { tools as musicProductionTools } from '../data/category-chunks/music-production';
import { tools as networkingTools } from '../data/category-chunks/networking';
import { tools as officeAdministrationTools } from '../data/category-chunks/office-administration';
import { tools as pdfToolsTools } from '../data/category-chunks/pdf-tools';
import { tools as petsAnimalsTools } from '../data/category-chunks/pets-animals';
import { tools as photographyTools } from '../data/category-chunks/photography';
import { tools as productivityTools } from '../data/category-chunks/productivity';
import { tools as projectManagementTools } from '../data/category-chunks/project-management';
import { tools as realEstateTools } from '../data/category-chunks/real-estate';
import { tools as restaurantCafeTools } from '../data/category-chunks/restaurant-cafe';
import { tools as securityToolsTools } from '../data/category-chunks/security-tools';
import { tools as seoToolsTools } from '../data/category-chunks/seo-tools';
import { tools as socialMediaToolsTools } from '../data/category-chunks/social-media-tools';
import { tools as textToolsTools } from '../data/category-chunks/text-tools';
import { tools as travelToolsTools } from '../data/category-chunks/travel-tools';
import { tools as unitConvertersTools } from '../data/category-chunks/unit-converters';
import { tools as videoToolsTools } from '../data/category-chunks/video-tools';
import { tools as webToolsTools } from '../data/category-chunks/web-tools';
import { tools as weddingEventTools } from '../data/category-chunks/wedding-event';
import { tools as youtubeCreatorToolsTools } from '../data/category-chunks/youtube-creator-tools';

export const CATEGORIES: CategoryInfo[] = DYNAMIC_CATEGORIES;

export const WORKING_TOOLS: Tool[] = [
  ...accountingTools,
  ...agricultureTools,
  ...audioToolsTools,
  ...automotiveTools,
  ...beautySalonTools,
  ...businessToolsTools,
  ...calculatorToolsTools,
  ...colorToolsTools,
  ...constructionTools,
  ...converterToolsTools,
  ...dataManagementTools,
  ...dateTimeTools,
  ...developerToolsTools,
  ...eCommerceTools,
  ...educationTools,
  ...electricalSolarTools,
  ...engineeringTools,
  ...environmentEnergyTools,
  ...fileToolsTools,
  ...financeToolsTools,
  ...freelancingTools,
  ...generatorsTools,
  ...governmentPublicServicesTools,
  ...healthFitnessTools,
  ...hrPayrollTools,
  ...imageToolsTools,
  ...inventoryLogisticsTools,
  ...legalToolsTools,
  ...marketingAdvertisingTools,
  ...mathToolsTools,
  ...musicProductionTools,
  ...networkingTools,
  ...officeAdministrationTools,
  ...pdfToolsTools,
  ...petsAnimalsTools,
  ...photographyTools,
  ...productivityTools,
  ...projectManagementTools,
  ...realEstateTools,
  ...restaurantCafeTools,
  ...securityToolsTools,
  ...seoToolsTools,
  ...socialMediaToolsTools,
  ...textToolsTools,
  ...travelToolsTools,
  ...unitConvertersTools,
  ...videoToolsTools,
  ...webToolsTools,
  ...weddingEventTools,
  ...youtubeCreatorToolsTools,
];

export const TOOLS: Tool[] = WORKING_TOOLS;

export const INITIAL_TOOLS: Tool[] = WORKING_TOOLS.slice(0, 22);

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: 'Public Media Tool is my daily bookmark. Having JSON formatters, Base64, and image converters running 100% locally with zero server upload gives me complete peace of mind with client data.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    role: 'Digital Content Strategist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'The Word Counter and Keyword Density tools are blazingly fast. No ads popping up, no mandatory login required, just clean and powerful tools that work instantly.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rostova',
    role: 'UI/UX Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'The CSS Gradient Generator and WCAG Contrast Checker are permanent fixtures in my design workflow. The light, vibrant UI feels so modern and refreshing!',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Miller',
    role: 'Cybersecurity Analyst',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Finding a tool site that doesn’t silently phone home with input data is rare. Public Media Tool does all cryptographic hashing and password generation strictly in-browser.',
    rating: 5,
  },
];

// Single Source of Truth for dynamically updated counts
// Auto-generated from tools-data.ts. Do not edit manually.
export const TOTAL_TOOLS = WORKING_TOOLS.length;
export const TOTAL_CATEGORIES = STATIC_CATEGORIES.length;
export const TOTAL_WORKING_TOOLS = WORKING_TOOLS.length;
export const TOTAL_PLATFORMS = 1;

export const FAQS = [
  {
    question: 'Is my data uploaded to any server?',
    answer: 'No, absolutely not. 100% of the tools on Public Media Tool run entirely inside your browser using JavaScript, Web APIs, and Canvas. Your text, photos, and files never touch a server.',
  },
  {
    question: 'Do I need an account to use these tools?',
    answer: 'No account or signup is required. All tools are immediately accessible and free forever.',
  },
  {
    question: 'Is Public Media Tool really 100% free forever?',
    answer: 'Yes! All tools are free with zero subscription fees, hidden paywalls, or limits on usage volume.',
  },
  {
    question: 'How many tools are available on the platform?',
    answer: `We feature ${TOTAL_TOOLS.toLocaleString()}+ high-performance client-side tools across ${TOTAL_CATEGORIES} main categories, with instant browser calculation.`,
  },
  {
    question: 'Can I use these tools on mobile devices?',
    answer: 'Yes! All tools are fully responsive and work seamlessly on mobile, tablet, and desktop browsers.',
  },
  {
    question: 'Can I suggest or request a new tool?',
    answer: 'We love user feedback! You can submit tool requests directly using our Contact form.',
  },
];
