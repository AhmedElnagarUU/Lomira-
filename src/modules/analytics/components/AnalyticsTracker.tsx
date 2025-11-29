'use client';

import { useEffect } from 'react';
import { generateVisitorId } from '../lib/visitorUtils';
import type { AnalyticsEvent } from '../types';

interface AnalyticsTrackerProps {
  pageId: string;
}

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ pageId }) => {
  useEffect(() => {
    // Track page visit
    const visitorId = generateVisitorId();
    
    const track = async (event: AnalyticsEvent) => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pageId,
            event,
            visitorId,
          }),
        });
      } catch (error) {
        console.error('Failed to track event:', error);
      }
    };
    
    track({
      type: 'visit',
      timestamp: new Date(),
    });

    // Track button clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const buttonId = target.getAttribute('data-track-id');
      
      if (buttonId) {
        track({
          type: 'click',
          timestamp: new Date(),
          buttonId,
        });
      }
    };

    // Track scroll depth
    let scrollTracked = {
      25: false,
      50: false,
      75: false,
      100: false,
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      Object.keys(scrollTracked).forEach((key) => {
        const depth = parseInt(key);
        if (!scrollTracked[depth as keyof typeof scrollTracked] && scrollPercent >= depth) {
          scrollTracked[depth as keyof typeof scrollTracked] = true;
          track({
            type: 'scroll',
            timestamp: new Date(),
            metadata: { depth },
          });
        }
      });
    };

    // Track form submissions
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      const formId = form.getAttribute('data-track-id');
      
      if (formId) {
        track({
          type: 'conversion',
          timestamp: new Date(),
          formId,
        });
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('submit', handleSubmit);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('submit', handleSubmit);
    };
  }, [pageId]);

  return null;
};

