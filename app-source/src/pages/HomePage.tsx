import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustMarquee } from '../components/sections/TrustMarquee';
import { CategoriesSection } from '../components/sections/CategoriesSection';
import { PopularTools } from '../components/sections/PopularTools';
import { StatsSection } from '../components/sections/StatsSection';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FaqSection } from '../components/sections/FaqSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { useSeo } from '../lib/useSeo';

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenSearchWithQuery: (q: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenSearchWithQuery }) => {
  const homeDesc = 'Public Media Tool (PMT) provides 1,516+ free online, browser-based tools. Simple, 100% private, and fast with zero signups or file uploads.';

  useSeo({
    title: 'Public Media Tool (PMT) — 1,516+ Free Browser-Based Tools',
    description: homeDesc,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Public Media Tool',
          alternateName: 'PMT',
          url: 'https://aimaeditz.github.io/public-media-tool/',
          description: homeDesc,
        },
        {
          '@type': 'Organization',
          name: 'Public Media Tool',
          url: 'https://aimaeditz.github.io/public-media-tool/',
          logo: 'https://aimaeditz.github.io/public-media-tool/apple-touch-icon.png',
        },
      ],
    },
  });

  return (
    <div className="space-y-0">
      <HeroSection navigate={navigate} onOpenSearchWithQuery={onOpenSearchWithQuery} />
      <TrustMarquee />
      <CategoriesSection navigate={navigate} />
      <PopularTools navigate={navigate} />
      <StatsSection />
      <WhyChooseUs />
      <HowItWorks />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
};

