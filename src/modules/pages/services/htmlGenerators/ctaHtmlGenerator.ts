import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generateCTAHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.primary};
    padding: 96px 0;
    direction: ${direction};
  `;
  
  return `
    <section class="cta-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px; text-align: center;">
        <h2 class="cta-heading" style="font-size: 40px; font-weight: 700; margin-bottom: 24px; color: white; max-width: 768px; margin-left: auto; margin-right: auto; font-family: '${theme.fonts.heading}', sans-serif;">
          ${langContent.heading}
        </h2>
        ${langContent.description ? `
          <p class="cta-description" style="font-size: 20px; color: rgba(255,255,255,0.9); margin-bottom: 32px; max-width: 640px; margin-left: auto; margin-right: auto; font-family: '${theme.fonts.body}', sans-serif;">
            ${langContent.description}
          </p>
        ` : ''}
        <a href="${langContent.buttonLink}" class="cta-button" style="display: inline-block; background-color: white; color: ${theme.colors.primary}; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 18px; transition: opacity 0.3s;">
          ${langContent.buttonText}
        </a>
      </div>
    </section>
  `;
}

