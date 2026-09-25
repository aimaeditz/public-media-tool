export interface ToolStep {
  step: number;
  title: string;
  desc: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  description?: string;
  category: string;
  iconName: string;
  usageCount: number;
  tags: string[];
  keywords?: string[];
  isPopular?: boolean;
  isLatest?: boolean;
  features?: string[];
  relatedTools?: string[];
  howToUse?: ToolStep[];
  faqs?: ToolFaq[];
  [key: string]: any;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  colorGradient: string;
  bgLight: string;
  count?: number;
  subCategories?: string[];
  [key: string]: any;
}
