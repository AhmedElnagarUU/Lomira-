import { NextResponse } from 'next/server';
import { publishPage } from '@/modules/pages/services/pageService';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ pageId: string }> }
) {
  try {
    const { pageId } = await params;
    const body = await request.json();
    const { slug } = body;

    const page = await publishPage(pageId, slug);
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error publishing page:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to publish page' },
      { status: 500 }
    );
  }
}

