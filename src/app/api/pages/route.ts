import { NextResponse } from 'next/server';
import { createPage, getUserPages } from '@/modules/pages/services/pageService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const pages = await getUserPages(userId);
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, userId, title, username } = body;

    if (!templateId || !userId || !title) {
      return NextResponse.json(
        { error: 'templateId, userId, and title are required' },
        { status: 400 }
      );
    }

    const page = await createPage({ templateId, userId, title, username });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create page' },
      { status: 500 }
    );
  }
}


