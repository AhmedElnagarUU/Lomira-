import { NextResponse } from 'next/server';
import { getUserPages } from '@/modules/pages/services/pageService';

export async function GET(request: Request) {
  try {
    // For now, use user ID from query param
    // In the future, this will come from auth session
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';

    const pages = await getUserPages(userId);

    const navigation = [
      {
        id: 'overview',
        label: 'Overview',
        description: 'Dashboard overview and metrics',
      },
      {
        id: 'pages',
        label: 'My Pages',
        description: 'All your landing pages',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: 'Page performance insights',
      },
    ];

    return NextResponse.json({
      meta: {
        updatedAt: new Intl.DateTimeFormat('en', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date()),
      },
      navigation,
      pages, // Include pages in response
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        meta: {
          updatedAt: new Date().toISOString(),
        },
        navigation: [],
        pages: [],
      },
      { status: 200 } // Return empty data instead of error for graceful fallback
    );
  }
}
