'use server';

import {
  trackEvent as trackEventService,
  getAnalytics as getAnalyticsService,
} from '@/modules/analytics/services/analyticsService';
import type { AnalyticsEvent, AnalyticsSummary, TrackEventInput } from '@/modules/analytics/types';

export async function trackEvent(input: TrackEventInput): Promise<void> {
  try {
    await trackEventService(input);
  } catch (error) {
    console.error('Error tracking event:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

export async function getAnalytics(
  pageId: string,
  dateRange?: { start: Date; end: Date }
): Promise<AnalyticsSummary> {
  try {
    return await getAnalyticsService(pageId, dateRange);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw new Error('Failed to fetch analytics');
  }
}


