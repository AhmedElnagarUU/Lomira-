import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generateFeaturesHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.background};
    padding: 96px 0;
    direction: ${direction};
  `;
  
  const gridClass = 
    langContent.layout === 'grid-2' ? 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));'
    : langContent.layout === 'grid-3' ? 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));'
    : langContent.layout === 'grid-4' ? 'grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));'
    : 'grid-template-columns: 1fr;';
  
  return `
    <section class="features-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        <div class="features-header" style="text-align: center; margin-bottom: 64px;">
          <h2 class="features-heading" style="font-size: 40px; font-weight: 700; margin-bottom: 16px; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
            ${langContent.heading}
          </h2>
          ${langContent.subheading ? `
            <p class="features-subheading" style="font-size: 20px; color: ${theme.colors.text}; font-family: '${theme.fonts.body}', sans-serif;">
              ${langContent.subheading}
            </p>
          ` : ''}
        </div>
        <div class="features-grid" style="display: grid; ${gridClass} gap: 32px;">
          ${langContent.items?.map((item: any, index: number) => `
            <div class="feature-item" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div class="feature-icon" style="width: 56px; height: 56px; border-radius: 16px; background-color: ${theme.colors.primary}; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <svg style="width: 28px; height: 28px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="feature-title" style="font-size: 20px; font-weight: 700; margin-bottom: 12px; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
                ${item.title}
              </h3>
              <p class="feature-description" style="line-height: 1.6; color: ${theme.colors.text}; font-family: '${theme.fonts.body}', sans-serif;">
                ${item.description}
              </p>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `;
}


