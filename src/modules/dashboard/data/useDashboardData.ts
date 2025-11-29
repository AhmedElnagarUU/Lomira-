import { useCallback, useEffect, useState } from 'react';
import { getUserId } from '@/shared/lib/userSession';
import type { PageDocument } from '@/modules/pages/types';

import type { DashboardNavItem } from '../types';

export interface DashboardData {
  meta: { updatedAt: string };
  navigation: DashboardNavItem[];
  pages?: PageDocument[];
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const userId = typeof window !== 'undefined' ? getUserId() : 'default-user';
  const response = await fetch(`/api/dashboard?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Unable to load dashboard data.');
  }
  return response.json();
};

export const useDashboardData = (initialData?: DashboardData) => {
  const [data, setData] = useState<DashboardData | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | undefined>();

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const payload = await fetchDashboardData();
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialData) {
      load();
    }
  }, [initialData, load]);

  return { data, loading, error, refresh: load };
};
