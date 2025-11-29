export type DashboardSectionId = 'overview' | 'pages' | 'analytics' | 'templates';

export interface DashboardNavItem {
  id: DashboardSectionId;
  label: string;
  description: string;
}

export interface DashboardMeta {
  updatedAt: string;
}

export interface DashboardResponse {
  meta: DashboardMeta;
  navigation: DashboardNavItem[];
}
