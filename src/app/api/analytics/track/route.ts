import { NextResponse } from 'next/server';
import { trackEvent } from '@/modules/analytics/services/analyticsService';
import type { TrackEventInput } from '@/modules/analytics/types';

export async function POST(request: Request) {
  try {
    const body: TrackEventInput = await request.json();
    
    await trackEvent(body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    // Don't fail the request - analytics shouldn't break the app
    return NextResponse.json({ success: false }, { status: 200 });
  }
}


