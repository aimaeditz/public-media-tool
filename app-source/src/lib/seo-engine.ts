import { Tool, ToolStep, ToolFaq } from './types';
import { BASE_URL } from './useSeo';

/**
 * Generates ~50 high-intent keyword variations for any tool across multiple taxonomies:
 * 1. Primary & Exact Match
 * 2. Secondary Variations
 * 3. Long-Tail Queries
 * 4. Problem-Solving / Solution Queries
 * 5. Format & Input Specific
 * 6. Platform & Browser Specific
 * 7. Device Specific (Mobile/Desktop/Tablet)
 * 8. Commercial & Utility Intent
 * 9. Audience & Use-Case Specific
 */
export function generateToolKeywords(tool: Tool): string[] {
  const cleanName = tool.name.toLowerCase().trim();
  const catName = (tool.category || 'Utilities').toLowerCase().trim();
  const slugTerms = tool.slug.split('-').filter((w) => w.length > 2);

  const keywords: string[] = [
    // 1. Primary & Exact Match
    cleanName,
    `${cleanName} online`,
    `free ${cleanName}`,
    `${cleanName} tool`,
    `online ${cleanName} free`,
    `best ${cleanName}`,

    // 2. Secondary Variations
    `${cleanName} calculator`,
    `${cleanName} converter`,
    `${cleanName} generator`,
    `${cleanName} analyzer`,
    `${cleanName} utility`,
    `${catName} ${cleanName}`,

    // 3. Long-Tail Queries
    `how to use ${cleanName}`,
    `best free ${cleanName} online`,
    `instant ${cleanName} in browser`,
    `${cleanName} without signup`,
    `${cleanName} client side`,
    `${cleanName} zero upload`,
    `${cleanName} private and secure`,
    `simple ${cleanName} for everyday use`,

    // 4. Problem-Solving & Solution Queries
    `fastest way to use ${cleanName}`,
    `free alternative to ${cleanName} software`,
    `easy online ${cleanName} helper`,
    `how to calculate ${cleanName} accurately`,
    `solve ${cleanName} problems online`,
    `instant browser ${cleanName} processing`,

    // 5. Format & Input Specific
    `${cleanName} copy to clipboard`,
    `${cleanName} export result`,
    `${cleanName} format converter`,
    `${cleanName} real time preview`,
    `${cleanName} clean output`,

    // 6. Platform & Browser Specific
    `${cleanName} web app`,
    `${cleanName} chrome browser`,
    `${cleanName} mac windows linux`,
    `${cleanName} browser extension alternative`,
    `${cleanName} safari edge firefox`,

    // 7. Device Specific
    `${cleanName} mobile friendly`,
    `${cleanName} for iphone android`,
    `${cleanName} on tablet ipad`,
    `${cleanName} responsive browser tool`,

    // 8. Commercial & Utility Intent
    `top rated ${cleanName} website`,
    `unlimited ${cleanName} no subscription`,
    `lightweight ${cleanName} online`,
    `high precision ${cleanName}`,
    `open web ${cleanName}`,

    // 9. Audience & Use-Case Specific
    `${cleanName} for professionals`,
    `${cleanName} for students and teachers`,
    `${cleanName} for developers and designers`,
    `${cleanName} for content creators`,
    `${cleanName} for business and finance`,
    `${cleanName} daily productivity`,
  ];

  // Add category specific keywords
  slugTerms.forEach((term) => {
    keywords.push(`online ${term} tool`);
    keywords.push(`free ${term} utility`);
  });

  // Ensure unique and filtered
  return Array.from(new Set(keywords.map((k) => k.trim()).filter(Boolean)));
}

/**
 * Returns comprehensive 4-5 tool FAQs covering usage, client-side privacy, free status, and precision.
 */
export function generateToolFaqs(tool: Tool): ToolFaq[] {
  if (tool.faqs && Array.isArray(tool.faqs) && tool.faqs.length >= 3) {
    return tool.faqs;
  }

  const existingFaqs = tool.faqs || [];
  const baseFaqs: ToolFaq[] = [
    {
      question: `Is ${tool.name} completely free to use?`,
      answer: `Yes, ${tool.name} on Public Media Tool is 100% free with unlimited usage. There are no paywalls, subscriptions, registrations, or usage caps.`,
    },
    {
      question: `How does ${tool.name} protect my privacy and data?`,
      answer: `All calculations and operations run 100% locally in your browser using modern Web APIs. None of your data, files, or inputs are transmitted or stored on remote servers.`,
    },
    {
      question: `Does ${tool.name} work on mobile devices and tablets?`,
      answer: `Yes! ${tool.name} is fully responsive and optimized for smartphones, tablets, laptops, and desktop computers across Chrome, Safari, Edge, and Firefox.`,
    },
    {
      question: `Do I need to download or install software to use ${tool.name}?`,
      answer: `No installation is required. Everything runs instantly in your web browser with zero setup or browser plugins needed.`,
    },
    {
      question: `Can I export or copy results from ${tool.name}?`,
      answer: `Yes, results can be copied directly to your clipboard or exported instantly with a single click.`,
    },
  ];

  const merged = [...existingFaqs];
  for (const bf of baseFaqs) {
    if (!merged.some((m) => m.question.toLowerCase() === bf.question.toLowerCase())) {
      merged.push(bf);
    }
  }

  return merged.slice(0, 5);
}

/**
 * Returns step-by-step actionable guide for the tool.
 */
export function generateToolHowTo(tool: Tool): ToolStep[] {
  if (tool.howToUse && Array.isArray(tool.howToUse) && tool.howToUse.length >= 3) {
    return tool.howToUse;
  }

  return [
    {
      step: 1,
      title: 'Enter or Configure Parameters',
      desc: `Provide your input data or adjust settings in the ${tool.name} interactive interface.`,
    },
    {
      step: 2,
      title: 'Instant Client-Side Processing',
      desc: 'The tool executes algorithms immediately inside your browser engine with zero delay.',
    },
    {
      step: 3,
      title: 'Copy or Download Output',
      desc: 'Inspect your calculated output and copy to clipboard or download results securely.',
    },
  ];
}

/**
 * Generates programmatic long-tail presets and query shortcuts for the tool.
 */
export interface LongTailPreset {
  title: string;
  query: string;
  description: string;
}

export function generateLongTailPresets(tool: Tool): LongTailPreset[] {
  const name = tool.name;
  const slug = tool.slug;
  const cat = tool.category || 'Utilities';

  return [
    {
      title: `Quick ${name} Workflow`,
      query: `?preset=quick`,
      description: `Run standard high-speed ${name} transformations with default parameters.`,
    },
    {
      title: `High-Precision Mode`,
      query: `?preset=precision`,
      description: `Execute detailed, multi-decimal precision calculations tailored for specialists.`,
    },
    {
      title: `Batch Processing Mode`,
      query: `?preset=batch`,
      description: `Format or process multiple items concurrently client-side with zero latency.`,
    },
    {
      title: `Compact Mobile View`,
      query: `?preset=compact`,
      description: `Streamlined interface optimized for rapid single-handed mobile lookups.`,
    },
  ];
}

/**
 * Generates rich Schema.org structured data graph for rich Google/Bing search snippets.
 */
export function generateToolSchema(tool: Tool, categorySlug: string) {
  const faqs = generateToolFaqs(tool);
  const steps = generateToolHowTo(tool);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.name,
        url: `${BASE_URL}/tools/${tool.slug}`,
        applicationCategory: `${tool.category} Application`,
        operatingSystem: 'All modern operating systems (Chrome, Safari, Firefox, Edge)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description: tool.shortDesc || tool.description || `${tool.name} free online browser tool.`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          '100% Client-Side Execution',
          'Zero Server File Uploads',
          'Free and Unlimited Usage',
          'Instant Real-Time Output',
          'Mobile and Desktop Responsive',
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tool.category || 'Categories',
            item: `${BASE_URL}/categories/${categorySlug}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.name,
            item: `${BASE_URL}/tools/${tool.slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'HowTo',
        name: `How to use ${tool.name} online`,
        description: `Follow these simple steps to use ${tool.name} quickly and privately in your browser.`,
        step: steps.map((s) => ({
          '@type': 'HowToStep',
          position: s.step,
          name: s.title,
          text: s.desc,
        })),
      },
    ],
  };
}
