import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generateHeroHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.background};
    padding-top: ${section.config?.padding?.top || '80px'};
    padding-bottom: ${section.config?.padding?.bottom || '80px'};
    padding-left: ${section.config?.padding?.left || '0'};
    padding-right: ${section.config?.padding?.right || '0'};
    direction: ${direction};
  `;
  
  const primaryButtonStyle = langContent.primaryButton?.style === 'primary'
    ? `background-color: ${theme.colors.primary}; color: white;`
    : `border: 2px solid ${theme.colors.primary}; color: ${theme.colors.primary}; background: transparent;`;
  
  const secondaryButtonStyle = langContent.secondaryButton
    ? langContent.secondaryButton.style === 'primary'
      ? `background-color: ${theme.colors.secondary}; color: white;`
      : `border: 2px solid ${theme.colors.secondary}; color: ${theme.colors.secondary}; background: transparent;`
    : '';
  
  return `
    <section class="hero-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        <div class="hero-grid" style="display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center;">
          ${isRTL ? `
            <div class="hero-image" style="order: 1;">
              ${langContent.image?.url ? `
                <img src="${langContent.image.url}" alt="${langContent.image.alt || ''}" style="width: 100%; height: auto; border-radius: 8px;" />
              ` : ''}
            </div>
            <div class="hero-content" style="order: 2; text-align: ${textAlign};">
          ` : `
            <div class="hero-content" style="text-align: ${textAlign};">
          `}
            ${langContent.subheading ? `
              <p class="hero-subheading" style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${theme.colors.accent};">
                ${langContent.subheading}
              </p>
            ` : ''}
            <h1 class="hero-heading" style="font-size: 48px; font-weight: 700; margin-bottom: 24px; line-height: 1.2; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
              ${langContent.heading}
            </h1>
            <p class="hero-description" style="font-size: 20px; margin-bottom: 32px; line-height: 1.6; color: ${theme.colors.text}; font-family: '${theme.fonts.body}', sans-serif;">
              ${langContent.description}
            </p>
            <div class="hero-buttons" style="display: flex; flex-direction: column; gap: 16px; ${isRTL ? 'flex-direction: row-reverse;' : ''}">
              ${langContent.primaryButton ? `
                <a href="${langContent.primaryButton.link}" class="hero-button-primary" style="${primaryButtonStyle} padding: 16px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 18px; transition: opacity 0.3s;">
                  ${langContent.primaryButton.text}
                </a>
              ` : ''}
              ${langContent.secondaryButton ? `
                <a href="${langContent.secondaryButton.link}" class="hero-button-secondary" style="${secondaryButtonStyle} padding: 16px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 18px; transition: opacity 0.3s;">
                  ${langContent.secondaryButton.text}
                </a>
              ` : ''}
            </div>
          </div>
          ${!isRTL ? `
            <div class="hero-image">
              ${langContent.image?.url ? `
                <img src="${langContent.image.url}" alt="${langContent.image.alt || ''}" style="width: 100%; height: auto; border-radius: 8px;" />
              ` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;
}

