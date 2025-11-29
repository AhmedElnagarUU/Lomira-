/**
 * Client-side analytics tracker
 * Used for tracking events from published pages
 */

export class PageTracker {
  private pageId: string;
  private visitorId: string;

  constructor(pageId: string) {
    this.pageId = pageId;
    this.visitorId = this.getOrCreateVisitorId();
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === 'undefined') {
      return 'server-' + Date.now();
    }

    const existingId = localStorage.getItem('visitor_id');
    if (existingId) {
      return existingId;
    }

    const visitorId = 'visitor-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitor_id', visitorId);
    return visitorId;
  }

  private async track(event: {
    type: string;
    timestamp: Date;
    buttonId?: string;
    formId?: string;
    metadata?: Record<string, any>;
  }) {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: this.pageId,
          event,
          visitorId: this.visitorId,
        }),
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  trackVisit() {
    this.track({
      type: 'visit',
      timestamp: new Date(),
    });
  }

  trackClick(buttonId: string) {
    this.track({
      type: 'click',
      timestamp: new Date(),
      buttonId,
    });
  }

  trackConversion(formId: string, data?: Record<string, any>) {
    this.track({
      type: 'conversion',
      timestamp: new Date(),
      formId,
      metadata: data,
    });
  }

  trackScroll(depth: number) {
    this.track({
      type: 'scroll',
      timestamp: new Date(),
      metadata: { depth },
    });
  }
}


