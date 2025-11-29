import React from 'react';
import type { HeroSectionContent } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import { Button } from '@/shared/components/Button';

interface HeroSectionProps {
  content: {
    en: HeroSectionContent;
    ar: HeroSectionContent;
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
    padding?: {
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ content, theme, config }) => {
  const langContent = content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  const sectionStyle: React.CSSProperties = {
    backgroundColor: config?.backgroundColor || theme.colors.background,
    paddingTop: config?.padding?.top || '80px',
    paddingBottom: config?.padding?.bottom || '80px',
    paddingLeft: config?.padding?.left || '0',
    paddingRight: config?.padding?.right || '0',
  };

  return (
    <section
      className={`flex items-center justify-center min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      style={sectionStyle}
      dir={direction}
    >
      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="order-2 lg:order-1">
            {langContent.subheading && (
              <p
                className="text-lg font-semibold mb-4"
                style={{ color: theme.colors.accent }}
              >
                {langContent.subheading}
              </p>
            )}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ color: theme.colors.text }}
            >
              {langContent.heading}
            </h1>
            <p
              className="text-xl mb-8 leading-relaxed"
              style={{ color: theme.colors.text }}
            >
              {langContent.description}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button
                variant={langContent.primaryButton.style}
                size="lg"
                style={{
                  backgroundColor:
                    langContent.primaryButton.style === 'primary' ? theme.colors.primary : undefined,
                  borderColor: theme.colors.primary,
                }}
              >
                {langContent.primaryButton.text}
              </Button>
              {langContent.secondaryButton && (
                <Button
                  variant={langContent.secondaryButton.style}
                  size="lg"
                  style={{
                    borderColor: theme.colors.secondary,
                    color: theme.colors.secondary,
                  }}
                >
                  {langContent.secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {langContent.image?.url && (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={langContent.image.url}
                  alt={langContent.image.alt}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


