import { NextResponse } from 'next/server';

import { mockGrapesTemplate } from '@/modules/grapesjs/data/mockGrapesTemplate';
import type { GrapesTemplatePayload } from '@/modules/grapesjs/types';

function simulateLatency(duration = 150) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function GET() {
  await simulateLatency();
  return NextResponse.json(mockGrapesTemplate);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as GrapesTemplatePayload;
  await simulateLatency(200);

  return NextResponse.json({
    message: 'Template received',
    projectId: payload.projectId,
    updatedAt: payload.updatedAt,
    previewLength: payload.components.length,
  });
}

