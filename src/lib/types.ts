export interface Tool {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  category: ToolCategory;
  iconName: string;
  isPopular?: boolean;
  isLatest?: boolean;
  usageCount: number;
  tags: string[];
  howToUse: { step: number; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export type ToolCategory =
  | 'Text Tools'
  | 'Image Tools'
  | 'PDF Tools'
  | 'Developer Tools'
  | 'SEO Tools'
  | 'Color Tools'
  | 'Converter Tools'
  | 'Calculator Tools'
  | 'Security Tools'
  | 'Web Tools';

export interface CategoryInfo {
  id: ToolCategory;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  colorGradient: string;
  bgLight: string;
}
