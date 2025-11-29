import { getDatabase } from '@/shared/lib/mongodb';
import type { AnalyticsDocument, AnalyticsEvent, TrackEventInput, AnalyticsSummary } from '../types';

export async function trackEvent(input: TrackEventInput): Promise<void> {
  const db = await getDatabase();
  const collection = db.collection<AnalyticsDocument>('analytics');
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const event: AnalyticsEvent = {
    ...input.event,
    timestamp: new Date(),
  };
  
  await collection.updateOne(
    {
      pageId: input.pageId,
      date: today,
    },
    {
      $push: { events: event },
      $inc: {
        visits: input.event.type === 'visit' ? 1 : 0,
        uniqueVisitors: input.event.type === 'visit' && input.visitorId ? 1 : 0,
        'clicks.$[elem].count': input.event.type === 'click' ? 1 : 0,
        'conversions.$[elem].count': input.event.type === 'conversion' ? 1 : 0,
      },
      $setOnInsert: {
        pageId: input.pageId,
        date: today,
        visits: input.event.type === 'visit' ? 1 : 0,
        uniqueVisitors: input.event.type === 'visit' ? 1 : 0,
        clicks: [],
        conversions: [],
        events: [event],
      },
    },
    {
      upsert: true,
      arrayFilters: input.event.buttonId
        ? [{ 'elem.buttonId': input.event.buttonId }]
        : input.event.formId
        ? [{ 'elem.formId': input.event.formId }]
        : [],
    }
  );
  
  // Initialize click/conversion counters if they don't exist
  if (input.event.type === 'click' && input.event.buttonId) {
    await collection.updateOne(
      { pageId: input.pageId, date: today },
      {
        $addToSet: {
          clicks: { buttonId: input.event.buttonId, count: 0 },
        },
      }
    );
  }
  
  if (input.event.type === 'conversion' && input.event.formId) {
    await collection.updateOne(
      { pageId: input.pageId, date: today },
      {
        $addToSet: {
          conversions: { formId: input.event.formId, count: 0 },
        },
      }
    );
  }
}

export async function getAnalytics(
  pageId: string,
  dateRange?: { start: Date; end: Date }
): Promise<AnalyticsSummary> {
  const db = await getDatabase();
  const collection = db.collection<AnalyticsDocument>('analytics');
  
  const query: any = { pageId };
  
  if (dateRange) {
    query.date = {
      $gte: dateRange.start,
      $lte: dateRange.end,
    };
  }
  
  const docs = await collection.find(query).sort({ date: 1 }).toArray();
  
  const summary: AnalyticsSummary = {
    totalVisits: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    totalConversions: 0,
    dailyData: [],
    topButtons: [],
  };
  
  const buttonCounts: Record<string, number> = {};
  
  for (const doc of docs) {
    summary.totalVisits += doc.visits;
    summary.uniqueVisitors += doc.uniqueVisitors;
    
    doc.clicks?.forEach((click) => {
      summary.totalClicks += click.count;
      buttonCounts[click.buttonId] = (buttonCounts[click.buttonId] || 0) + click.count;
    });
    
    doc.conversions?.forEach((conv) => {
      summary.totalConversions += conv.count;
    });
    
    summary.dailyData.push({
      date: doc.date.toISOString().split('T')[0],
      visits: doc.visits,
      clicks: doc.clicks?.reduce((sum, c) => sum + c.count, 0) || 0,
      conversions: doc.conversions?.reduce((sum, c) => sum + c.count, 0) || 0,
    });
  }
  
  summary.topButtons = Object.entries(buttonCounts)
    .map(([buttonId, count]) => ({ buttonId, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return summary;
}


