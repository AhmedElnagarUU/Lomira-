import React from 'react';
import type { ThemeSettings } from '@/shared/types';

interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  content: {
    en: {
      stats: Stat[];
    };
    ar: {
      stats: Stat[];
    };
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
  };
}

export const StatsSection: React.FC<StatsSectionProps> = ({ content, theme, config }) => {
  const langContent = content[theme.language];
  const isRTL = theme.language === 'ar';

  return (
    <section
      className={`py-16 ${isRTL ? 'rtl' : 'ltr'}`}
      style={{ backgroundColor: config?.backgroundColor || theme.colors.primary }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {langContent.stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                {stat.value}
              </div>
              <div className="text-lg text-white/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

