import { useCallback, useEffect, useState } from 'react';
import type { DashboardResponse } from '../types';

export const fetchDashboardData = async (): Promise<DashboardResponse> => {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('Unable to load dashboard data.');
  }
  return response.json();
};

export const useDashboardData = (initialData?: DashboardResponse) => {
  const [data, setData] = useState<DashboardResponse | undefined>(initialData);
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
