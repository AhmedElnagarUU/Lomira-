export type DashboardSectionId = 'overview' | 'engagement' | 'automation';

export interface DashboardNavItem {
  id: DashboardSectionId;
  label: string;
  description: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
}

export interface EngagementChannel {
  id: string;
  name: string;
  reach: string;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface AutomationFlow {
  id: string;
  name: string;
  summary: string;
  status: 'Healthy' | 'Needs review' | 'Paused';
}

export interface DashboardMeta {
  updatedAt: string;
}

export interface DashboardResponse {
  meta: DashboardMeta;
  navigation: DashboardNavItem[];
  overview: KpiMetric[];
  engagement: EngagementChannel[];
  automation: AutomationFlow[];
}
