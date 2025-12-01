import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generatePricingHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.background};
    padding: 96px 0;
    direction: ${direction};
  `;
  
  return `
    <section class="pricing-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        <div class="pricing-header" style="text-align: center; margin-bottom: 64px;">
          <h2 class="pricing-heading" style="font-size: 40px; font-weight: 700; margin-bottom: 16px; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
            ${langContent.heading}
          </h2>
          ${langContent.subheading ? `
            <p class="pricing-subheading" style="font-size: 20px; color: ${theme.colors.text}; font-family: '${theme.fonts.body}', sans-serif;">
              ${langContent.subheading}
            </p>
          ` : ''}
        </div>
        <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; max-width: 1000px; margin: 0 auto;">
          ${langContent.items?.map((item: any, index: number) => `
            <div class="pricing-item" style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative; ${item.popular ? `border: 2px solid ${theme.colors.primary}; transform: scale(1.05);` : ''}">
              ${item.popular ? `
                <div class="pricing-badge" style="position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background-color: ${theme.colors.primary}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                  ${isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                </div>
              ` : ''}
              <h3 class="pricing-name" style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
                ${item.name}
              </h3>
              <div class="pricing-price" style="margin-bottom: 24px;">
                <span class="pricing-amount" style="font-size: 40px; font-weight: 700; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
                  ${item.price}
                </span>
                <span class="pricing-period" style="color: #6b7280; font-family: '${theme.fonts.body}', sans-serif;">
                  ${item.period}
                </span>
              </div>
              <ul class="pricing-features" style="list-style: none; padding: 0; margin: 0 0 32px 0; space-y: 12px;">
                ${item.features?.map((feature: string, idx: number) => `
                  <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <svg style="width: 20px; height: 20px; flex-shrink: 0; color: ${theme.colors.primary};" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span style="color: #4b5563; font-family: '${theme.fonts.body}', sans-serif;">${feature}</span>
                  </li>
                `).join('') || ''}
              </ul>
              <a href="${item.buttonLink}" class="pricing-button" style="display: block; width: 100%; padding: 16px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; font-size: 18px; transition: opacity 0.3s; ${item.popular ? `background-color: ${theme.colors.primary}; color: white;` : `border: 2px solid ${theme.colors.primary}; color: ${theme.colors.primary}; background: transparent;`}">
                ${item.buttonText}
              </a>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `;
}


