export type AnalyticsEventType = 'visit' | 'click' | 'conversion' | 'scroll';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  timestamp: Date;
  buttonId?: string;
  formId?: string;
  metadata?: Record<string, any>;
}

export interface AnalyticsDocument {
  _id?: string;
  pageId: string;
  date: Date;
  visits: number;
  uniqueVisitors: number;
  clicks: {
    buttonId: string;
    count: number;
  }[];
  conversions: {
    formId: string;
    count: number;
  }[];
  events: AnalyticsEvent[];
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  totalClicks: number;
  totalConversions: number;
  dailyData: {
    date: string;
    visits: number;
    clicks: number;
    conversions: number;
  }[];
  topButtons: {
    buttonId: string;
    count: number;
  }[];
}

export interface TrackEventInput {
  pageId: string;
  event: AnalyticsEvent;
  visitorId?: string;
}


