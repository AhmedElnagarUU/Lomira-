import React from 'react';
import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import { HeroSection } from './Hero/HeroSection';
import { FeaturesSection } from './Features/FeaturesSection';
import { TestimonialsSection } from './Testimonials/TestimonialsSection';
import { PricingSection } from './Pricing/PricingSection';
import { StatsSection } from './Stats/StatsSection';
import { CTASection } from './CTA/CTASection';

interface SectionRendererProps {
  section: Section;
  theme: ThemeSettings;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ section, theme }) => {
  switch (section.type) {
    case 'hero':
      return (
        <HeroSection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    case 'features':
      return (
        <FeaturesSection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    case 'testimonials':
      return (
        <TestimonialsSection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    case 'pricing':
      return (
        <PricingSection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    case 'stats':
      return (
        <StatsSection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    case 'cta':
      return (
        <CTASection
          content={section.content as any}
          theme={theme}
          config={section.config}
        />
      );
    default:
      return (
        <div className="py-8 text-center">
          <p>Section type "{section.type}" not implemented yet</p>
        </div>
      );
  }
};


