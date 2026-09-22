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
  | 'Web Tools'
  | 'Social Media Tools'
  | 'Video Tools'
  | 'Audio Tools'
  | 'File Tools'
  | 'Generators'
  | 'Math Tools'
  | 'Date & Time'
  | 'Productivity'
  | 'Finance Tools'
  | 'Business Tools'
  | 'Health & Fitness'
  | 'Education'
  | 'Unit Converters'
  | 'Automotive'
  | 'Travel Tools'
  | 'Real Estate'
  | 'Legal Tools'
  | 'HR & Payroll'
  | 'Accounting'
  | 'E-commerce'
  | 'Inventory & Logistics'
  | 'Engineering'
  | 'Construction'
  | 'Electrical & Solar'
  | 'Agriculture'
  | 'Restaurant & Cafe'
  | 'Beauty & Salon'
  | 'Wedding & Event'
  | 'Photography'
  | 'Music Production'
  | 'Environment & Energy'
  | 'Pets & Animals'
  | 'Government & Public Services'
  | 'Office Administration'
  | 'Networking'
  | 'Data Management'
  | 'Project Management'
  | 'Marketing & Advertising'
  | 'YouTube Creator Tools'
  | 'Freelancing'
  | string;

export interface CategoryInfo {
  id: ToolCategory;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  colorGradient: string;
  bgLight: string;
}
