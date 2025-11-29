import { NextResponse } from 'next/server';
import { getAllTemplates, getTemplatesByCategory } from '@/modules/templates/data/templateService';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const premium = searchParams.get('premium');

    let templates;
    if (category) {
      templates = await getTemplatesByCategory(category);
    } else {
      templates = await getAllTemplates();
    }

    // Filter by premium if specified
    if (premium !== null) {
      const isPremium = premium === 'true';
      templates = templates.filter((t) => t.isPremium === isPremium);
    }

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    // Even if there's an error, try to return templates from code as last resort
    try {
      const { allProfessionalTemplates } = await import('@/modules/templates/data/professionalTemplates');
      const fallbackTemplates = allProfessionalTemplates.map((t) => ({
        templateId: t.templateId,
        name: t.name,
        category: t.category,
        thumbnail: t.thumbnail,
        tags: t.tags,
        isPremium: t.isPremium,
      }));
      return NextResponse.json(fallbackTemplates);
    } catch (fallbackError) {
      return NextResponse.json(
        { error: 'Failed to fetch templates', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  }
}


