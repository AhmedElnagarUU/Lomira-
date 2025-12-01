import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generateTestimonialsHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.background};
    padding: 96px 0;
    direction: ${direction};
  `;
  
  return `
    <section class="testimonials-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        <div class="testimonials-header" style="text-align: center; margin-bottom: 64px;">
          <h2 class="testimonials-heading" style="font-size: 40px; font-weight: 700; margin-bottom: 16px; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
            ${langContent.heading}
          </h2>
          ${langContent.subheading ? `
            <p class="testimonials-subheading" style="font-size: 20px; color: ${theme.colors.text}; font-family: '${theme.fonts.body}', sans-serif;">
              ${langContent.subheading}
            </p>
          ` : ''}
        </div>
        <div class="testimonials-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
          ${langContent.testimonials?.map((testimonial: any, index: number) => `
            <div class="testimonial-item" style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div class="testimonial-stars" style="display: flex; gap: 4px; margin-bottom: 16px;">
                ${Array(5).fill(0).map(() => `
                  <svg style="width: 20px; height: 20px; color: #fbbf24;" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                `).join('')}
              </div>
              <p class="testimonial-quote" style="color: #4b5563; margin-bottom: 24px; line-height: 1.6; font-family: '${theme.fonts.body}', sans-serif;">
                ${testimonial.quote}
              </p>
              <div class="testimonial-author" style="display: flex; align-items: center; gap: 12px;">
                <div class="testimonial-avatar" style="width: 48px; height: 48px; border-radius: 50%; background-color: ${theme.colors.primary}; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px;">
                  ${testimonial.author?.charAt(0) || 'A'}
                </div>
                <div>
                  <p class="testimonial-author-name" style="font-weight: 600; color: ${theme.colors.text}; font-family: '${theme.fonts.heading}', sans-serif;">
                    ${testimonial.author}
                  </p>
                  <p class="testimonial-author-role" style="font-size: 14px; color: #6b7280; font-family: '${theme.fonts.body}', sans-serif;">
                    ${testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `;
}


