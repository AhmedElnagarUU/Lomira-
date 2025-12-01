import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';

export function generateStatsHTML(section: Section, theme: ThemeSettings): string {
  const langContent = section.content[theme.language];
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  const sectionStyle = `
    background-color: ${section.config?.backgroundColor || theme.colors.primary};
    padding: 64px 0;
    direction: ${direction};
  `;
  
  return `
    <section class="stats-section" style="${sectionStyle.trim()}">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 32px; text-align: center;">
          ${langContent.stats?.map((stat: any, index: number) => `
            <div class="stat-item">
              <div class="stat-value" style="font-size: 48px; font-weight: 700; margin-bottom: 8px; color: white; font-family: '${theme.fonts.heading}', sans-serif;">
                ${stat.value}
              </div>
              <div class="stat-label" style="font-size: 18px; color: rgba(255,255,255,0.9); font-family: '${theme.fonts.body}', sans-serif;">
                ${stat.label}
              </div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </section>
  `;
}


