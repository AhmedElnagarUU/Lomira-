import React from 'react';
import type { FeaturesSectionContent } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import { Card } from '@/shared/components/Card';

interface FeaturesSectionProps {
  content: {
    en: FeaturesSectionContent;
    ar: FeaturesSectionContent;
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
  };
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ content, theme, config }) => {
  const langContent = content[theme.language];
  const isRTL = theme.language === 'ar';

  const sectionStyle: React.CSSProperties = {
    backgroundColor: config?.backgroundColor || theme.colors.background,
  };

  const gridClass =
    langContent.layout === 'grid-2'
      ? 'grid-cols-1 md:grid-cols-2'
      : langContent.layout === 'grid-3'
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      : langContent.layout === 'grid-4'
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1';

  return (
    <section
      className={`py-24 ${isRTL ? 'rtl' : 'ltr'}`}
      style={sectionStyle}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            {langContent.heading}
          </h2>
          {langContent.subheading && (
            <p
              className="text-xl"
              style={{ color: theme.colors.text }}
            >
              {langContent.subheading}
            </p>
          )}
        </div>
        <div className={`grid ${gridClass} gap-8`}>
          {langContent.items.map((item, index) => (
            <Card key={index} hover className="flex flex-col bg-white p-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: theme.colors.text }}
              >
                {item.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


