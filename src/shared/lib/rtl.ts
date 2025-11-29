import type { Language } from '@/shared/types';

export function getDirection(language: Language): 'rtl' | 'ltr' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

export function getTextAlignment(language: Language, defaultAlign: 'left' | 'right' | 'center' = 'left'): string {
  if (language === 'ar') {
    return defaultAlign === 'left' ? 'text-right' : defaultAlign === 'right' ? 'text-left' : 'text-center';
  }
  return defaultAlign === 'left' ? 'text-left' : defaultAlign === 'right' ? 'text-right' : 'text-center';
}

export function getMarginStart(language: Language, value: string): string {
  return language === 'ar' ? `me-${value}` : `ms-${value}`;
}

export function getMarginEnd(language: Language, value: string): string {
  return language === 'ar' ? `ms-${value}` : `me-${value}`;
}

export function getPaddingStart(language: Language, value: string): string {
  return language === 'ar' ? `pe-${value}` : `ps-${value}`;
}

export function getPaddingEnd(language: Language, value: string): string {
  return language === 'ar' ? `ps-${value}` : `pe-${value}`;
}


