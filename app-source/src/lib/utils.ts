import * as Icons from 'lucide-react';
import React from 'react';

// Helper to map dynamic string icon names to Lucide icon components
export function getIconComponent(iconName: string): React.FC<{ className?: string }> {
  const iconRecord = Icons as unknown as Record<string, React.FC<{ className?: string }>>;
  const IconComponent = iconRecord[iconName];
  if (IconComponent) {
    return IconComponent;
  }
  return Icons.Wrench as React.FC<{ className?: string }>; // fallback
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
