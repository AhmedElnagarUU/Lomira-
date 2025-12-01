import { NextResponse } from 'next/server';
import { getPage } from '@/modules/pages/services/pageService';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;
    const page = await getPage(pageId);
    
    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    // If generated HTML exists, serve it
    if (page.generatedHtml) {
      return new NextResponse(page.generatedHtml, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    // Otherwise return 404 or redirect to regular page
    return new NextResponse('HTML not generated yet', { status: 404 });
  } catch (error) {
    console.error('Error serving HTML:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}


