import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Wrench } from 'lucide-react';

export function getIconComponent(iconName?: string): React.ComponentType<{ className?: string }> {
  if (!iconName) return Wrench;
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[iconName] || Wrench;
}

export function formatNumber(num?: number): string {
  if (typeof num !== 'number') return '0';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
  return num.toString();
}
