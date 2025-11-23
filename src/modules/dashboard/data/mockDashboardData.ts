import type { DashboardResponse } from '../types';

const UPDATED_AT = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: 'numeric',
}).format(new Date());

export const mockDashboardResponse: DashboardResponse = {
  meta: {
    updatedAt: UPDATED_AT,
  },
  navigation: [
    {
      id: 'overview',
      label: 'Overview',
      description: 'KPIs and health metrics',
    },
    {
      id: 'engagement',
      label: 'Engagement',
      description: 'Channel performance insights',
    },
    {
      id: 'automation',
      label: 'Automation',
      description: 'Workflow health and alerts',
    },
  ],
  overview: [
    { id: 'signups', label: 'New signups', value: '1,248', delta: '+12.5%', trend: 'up' },
    { id: 'revenue', label: 'Revenue', value: '$92.4k', delta: '+8.1%', trend: 'up' },
    { id: 'churn', label: 'Churn', value: '2.3%', delta: '-0.4%', trend: 'down' },
  ],
  engagement: [
    { id: 'email', name: 'Email', reach: '82%', trend: '↑ 6%', trendDirection: 'up' },
    { id: 'paid_social', name: 'Paid social', reach: '64%', trend: '↑ 3%', trendDirection: 'up' },
    { id: 'organic_social', name: 'Organic social', reach: '58%', trend: '↓ 1%', trendDirection: 'down' },
  ],
  automation: [
    {
      id: 'welcome_flow',
      name: 'Welcome flow',
      summary: 'Triggered journeys with AI nudges',
      status: 'Healthy',
    },
    {
      id: 'winback',
      name: 'Win-back journey',
      summary: 'Re-engage inactive accounts with incentives',
      status: 'Needs review',
    },
    {
      id: 'billing',
      name: 'Billing reminder',
      summary: 'Multi-channel payment reminders',
      status: 'Healthy',
    },
  ],
};
