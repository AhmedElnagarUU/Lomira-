import React from 'react';
import { getPageBySlug } from '@/modules/pages/services/pageService';
import { SectionRenderer } from '@/modules/sections/SectionRenderer';
import { AnalyticsTracker } from '@/modules/analytics/components/AnalyticsTracker';
import { generateHTML } from '@/modules/pages/services/htmlCssGenerator';
import type { Metadata } from 'next';

interface PublishedPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PublishedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo.title || page.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.title || page.title,
      description: page.seo.description,
      images: page.seo.ogImage ? [page.seo.ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title || page.title,
      description: page.seo.description,
      images: page.seo.ogImage ? [page.seo.ogImage] : [],
    },
  };
}

export default async function PublishedPage({ params }: PublishedPageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // If generated HTML exists, serve it directly
  // Page components run on Node.js runtime, so they support MongoDB/crypto
  if (page.generatedHtml) {
    // Extract body content from full HTML document
    const bodyMatch = page.generatedHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const headMatch = page.generatedHtml.match(/<head[^>]*>([\s\S]*)<\/head>/i);
    const htmlMatch = page.generatedHtml.match(/<html[^>]*lang=["']([^"']+)["'][^>]*dir=["']([^"']+)["']/i);
    
    const lang = htmlMatch?.[1] || page.theme.language;
    const dir = htmlMatch?.[2] || (page.theme.language === 'ar' ? 'rtl' : 'ltr');
    const bodyContent = bodyMatch?.[1] || '';
    const headContent = headMatch?.[1] || '';
    
    return (
      <html lang={lang} dir={dir}>
        <head dangerouslySetInnerHTML={{ __html: headContent }} />
        <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </html>
    );
  }

  // Fallback to React rendering (backward compatibility)
  const sortedSections = [...page.structure.sections].sort((a, b) => a.order - b.order);
  const direction = page.theme.language === 'ar' ? 'rtl' : 'ltr';
  const lang = page.theme.language;

  return (
    <html lang={lang} dir={direction}>
      <head>
        <style>{`
          :root {
            --primary-color: ${page.theme.colors.primary};
            --secondary-color: ${page.theme.colors.secondary};
            --background-color: ${page.theme.colors.background};
            --text-color: ${page.theme.colors.text};
            --accent-color: ${page.theme.colors.accent};
          }
          
          body {
            font-family: '${page.theme.fonts.body}', sans-serif;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: '${page.theme.fonts.heading}', sans-serif;
          }
        `}</style>
      </head>
      <body style={{ direction, fontFamily: page.theme.fonts.body }}>
        <AnalyticsTracker pageId={page.pageId} />
        {sortedSections.map((section) => (
          <SectionRenderer key={section.id} section={section} theme={page.theme} />
        ))}
      </body>
    </html>
  );
}

