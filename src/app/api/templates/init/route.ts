import { NextResponse } from 'next/server';
import { getDatabase } from '@/shared/lib/mongodb';
import { allProfessionalTemplates } from '@/modules/templates/data/professionalTemplates';
import type { TemplateDocument } from '@/modules/templates/types';

export async function POST() {
  try {
    const db = await getDatabase();
    const collection = db.collection<TemplateDocument>('templates');
    
    let inserted = 0;
    let skipped = 0;
    
    // Insert templates
    for (const template of allProfessionalTemplates) {
      const existing = await collection.findOne({ templateId: template.templateId });
      
      if (existing) {
        skipped++;
      } else {
        await collection.insertOne(template);
        inserted++;
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Templates initialized: ${inserted} inserted, ${skipped} already existed`,
      inserted,
      skipped,
      total: allProfessionalTemplates.length,
    });
  } catch (error) {
    console.error('Error initializing templates:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize templates',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const collection = db.collection<TemplateDocument>('templates');
    
    const count = await collection.countDocuments();
    const codeTemplateCount = allProfessionalTemplates.length;
    
    return NextResponse.json({
      databaseCount: count,
      codeTemplateCount,
      needsInitialization: count === 0,
      status: count > 0 ? 'initialized' : 'empty',
    });
  } catch (error) {
    console.error('Error checking template status:', error);
    return NextResponse.json(
      {
        error: 'Failed to check template status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


