import React from 'react';
import type { ThemeSettings } from '@/shared/types';
import { Card } from '@/shared/components/Card';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  content: {
    en: {
      heading: string;
      subheading?: string;
      testimonials: Testimonial[];
    };
    ar: {
      heading: string;
      subheading?: string;
      testimonials: Testimonial[];
    };
  };
  theme: ThemeSettings;
  config?: {
    backgroundColor?: string;
  };
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content, theme, config }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {langContent.testimonials.map((testimonial, index) => (
            <Card key={index} hover className="p-6 bg-white">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: theme.colors.text }}>
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

