import { NextResponse } from 'next/server';
import { mockDashboardResponse } from '@/modules/dashboard/data/mockDashboardData';

export async function GET() {
  // Simulate downstream latency to mimic future database work.
  await new Promise((resolve) => setTimeout(resolve, 150));

  return NextResponse.json(mockDashboardResponse);
}
