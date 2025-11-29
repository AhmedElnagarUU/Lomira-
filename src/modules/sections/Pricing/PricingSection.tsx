import React from 'react';
import type { ThemeSettings } from '@/shared/types';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';

interface PricingItem {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  popular?: boolean;
}

interface PricingSectionProps {
  content: {
    en: {
      heading: string;
      subheading?: string;
      items: PricingItem[];
    };
    ar: {
      heading: string;
      subheading?: string;
      items: PricingItem[];
    };
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
  };
}

export const PricingSection: React.FC<PricingSectionProps> = ({ content, theme, config }) => {
  const langContent = content[theme.language];
  const isRTL = theme.language === 'ar';

  return (
    <section
      className={`py-24 ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ backgroundColor: config?.backgroundColor || theme.colors.background }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: theme.colors.text }}>
            {langContent.heading}
          </h2>
          {langContent.subheading && (
            <p className="text-xl" style={{ color: theme.colors.text }}>
              {langContent.subheading}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {langContent.items.map((item, index) => (
            <Card
              key={index}
              hover
              className={`relative p-8 bg-white ${
                item.popular ? 'border-2' : ''
              }`}
              style={{
                borderColor: item.popular ? theme.colors.primary : undefined,
                transform: item.popular ? 'scale(1.05)' : undefined,
              }}
            >
              {item.popular && (
                <div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {theme.language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text }}>
                {item.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: theme.colors.text }}>
                  {item.price}
                </span>
                <span className="text-gray-600">{item.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: theme.colors.primary }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={item.popular ? 'primary' : 'outline'}
                className="w-full"
                style={{
                  backgroundColor: item.popular ? theme.colors.primary : undefined,
                  borderColor: theme.colors.primary,
                  color: item.popular ? 'white' : theme.colors.primary,
                }}
              >
                {item.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

