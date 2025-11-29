import React from 'react';
import type { ThemeSettings } from '@/shared/types';
import { Button } from '@/shared/components/Button';

interface CTASectionProps {
  content: {
    en: {
      heading: string;
      description?: string;
      buttonText: string;
      buttonLink: string;
    };
    ar: {
      heading: string;
      description?: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
  };
}

export const CTASection: React.FC<CTASectionProps> = ({ content, theme, config }) => {
  const langContent = content[theme.language];
  const isRTL = theme.language === 'ar';

  return (
    <section
      className={`py-24 ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ backgroundColor: config?.backgroundColor || theme.colors.primary }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white max-w-3xl mx-auto">
          {langContent.heading}
        </h2>
        {langContent.description && (
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {langContent.description}
          </p>
        )}
        <Button
          variant="primary"
          size="lg"
          className="bg-white hover:bg-gray-100"
          style={{ color: theme.colors.primary }}
        >
          {langContent.buttonText}
        </Button>
      </div>
    </section>
  );
};

