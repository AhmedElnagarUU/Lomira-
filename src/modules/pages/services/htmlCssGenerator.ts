import type { PageDocument } from '../types';
import type { Section } from '@/modules/templates/types';
import type { ThemeSettings } from '@/shared/types';
import { generateHeroHTML } from './htmlGenerators/heroHtmlGenerator';
import { generateFeaturesHTML } from './htmlGenerators/featuresHtmlGenerator';
import { generateStatsHTML } from './htmlGenerators/statsHtmlGenerator';
import { generateTestimonialsHTML } from './htmlGenerators/testimonialsHtmlGenerator';
import { generatePricingHTML } from './htmlGenerators/pricingHtmlGenerator';
import { generateCTAHTML } from './htmlGenerators/ctaHtmlGenerator';

/**
 * Generate CSS from theme settings
 */
export function generateCSS(theme: ThemeSettings): string {
  const isRTL = theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  
  return `
    :root {
      --primary-color: ${theme.colors.primary};
      --secondary-color: ${theme.colors.secondary};
      --background-color: ${theme.colors.background};
      --text-color: ${theme.colors.text};
      --accent-color: ${theme.colors.accent};
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html {
      direction: ${direction};
      scroll-behavior: smooth;
    }
    
    body {
      font-family: '${theme.fonts.body}', sans-serif;
      color: ${theme.colors.text};
      background-color: ${theme.colors.background};
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: '${theme.fonts.heading}', sans-serif;
      font-weight: 700;
      line-height: 1.2;
      color: ${theme.colors.text};
    }
    
    a {
      color: ${theme.colors.primary};
      text-decoration: none;
      transition: opacity 0.3s ease;
    }
    
    a:hover {
      opacity: 0.8;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }
    
    @media (min-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr 1fr !important;
      }
    }
    
    @media (max-width: 768px) {
      .hero-heading {
        font-size: 32px !important;
      }
      
      .features-heading,
      .testimonials-heading,
      .pricing-heading,
      .cta-heading {
        font-size: 32px !important;
      }
      
      .hero-grid {
        grid-template-columns: 1fr !important;
      }
      
      .hero-content {
        order: 2 !important;
      }
      
      .hero-image {
        order: 1 !important;
      }
    }
  `;
}

/**
 * Generate HTML for a single section
 */
export function generateSectionHTML(section: Section, theme: ThemeSettings): string {
  switch (section.type) {
    case 'hero':
      return generateHeroHTML(section, theme);
    case 'features':
      return generateFeaturesHTML(section, theme);
    case 'stats':
      return generateStatsHTML(section, theme);
    case 'testimonials':
      return generateTestimonialsHTML(section, theme);
    case 'pricing':
      return generatePricingHTML(section, theme);
    case 'cta':
      return generateCTAHTML(section, theme);
    default:
      return `<section><p>Section type "${section.type}" not supported</p></section>`;
  }
}

/**
 * Generate complete HTML document from page
 */
export function generateHTML(page: PageDocument): string {
  const sortedSections = [...page.structure.sections].sort((a, b) => a.order - b.order);
  const isRTL = page.theme.language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';
  const lang = page.theme.language;
  
  const sectionsHTML = sortedSections
    .map(section => generateSectionHTML(section, page.theme))
    .join('\n');
  
  const css = generateCSS(page.theme);
  
  // Analytics tracking script
  const analyticsScript = `
    <script>
      (function() {
        const pageId = '${page.pageId}';
        const appUrl = '${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}';
        
        // Track page view
        fetch(appUrl + '/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pageId: pageId,
            eventType: 'visit',
            timestamp: new Date().toISOString()
          })
        }).catch(() => {});
        
        // Track clicks
        document.addEventListener('click', function(e) {
          const target = e.target.closest('a, button');
          if (target) {
            fetch(appUrl + '/api/analytics/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                pageId: pageId,
                eventType: 'click',
                element: target.tagName,
                timestamp: new Date().toISOString()
              })
            }).catch(() => {});
          }
        });
      })();
    </script>
  `;
  
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${direction}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seo.title || page.title}</title>
  ${page.seo.description ? `<meta name="description" content="${page.seo.description}">` : ''}
  ${page.seo.keywords && page.seo.keywords.length > 0 ? `<meta name="keywords" content="${page.seo.keywords.join(', ')}">` : ''}
  ${page.seo.ogImage ? `<meta property="og:image" content="${page.seo.ogImage}">` : ''}
  <meta property="og:title" content="${page.seo.title || page.title}">
  ${page.seo.description ? `<meta property="og:description" content="${page.seo.description}">` : ''}
  <style>
    ${css}
  </style>
</head>
<body>
  ${sectionsHTML}
  ${analyticsScript}
</body>
</html>`;
}

