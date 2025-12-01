import { NextResponse } from 'next/server';
import { getPage } from '@/modules/pages/services/pageService';
import { generateHTML, generateCSS } from '@/modules/pages/services/htmlCssGenerator';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;
    const page = await getPage(pageId);
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Generate HTML and CSS
    const html = page.generatedHtml || generateHTML(page);
    const css = page.generatedCss || generateCSS(page.theme);

    // Return as JSON with both HTML and CSS
    return NextResponse.json({
      html,
      css,
      pageId: page.pageId,
      title: page.title,
      slug: page.slug,
    });
  } catch (error) {
    console.error('Error exporting page:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to export page' },
      { status: 500 }
    );
  }
}


