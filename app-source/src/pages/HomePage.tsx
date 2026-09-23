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

interface HomePageProps {
  navigate: (path: string) => void;
  onOpenSearchWithQuery: (q: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onOpenSearchWithQuery }) => (
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

