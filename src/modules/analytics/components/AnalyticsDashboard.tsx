'use client';

import React, { useEffect, useState } from 'react';
import type { AnalyticsSummary } from '../types';

interface AnalyticsDashboardProps {
  pageId: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ pageId }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics/${pageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [pageId]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Visits</p>
          <p className="text-2xl font-bold">{analytics.totalVisits}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Unique Visitors</p>
          <p className="text-2xl font-bold">{analytics.uniqueVisitors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Clicks</p>
          <p className="text-2xl font-bold">{analytics.totalClicks}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Conversions</p>
          <p className="text-2xl font-bold">{analytics.totalConversions}</p>
        </div>
      </div>

      {/* Daily Data */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Daily Performance</h3>
        <div className="space-y-2">
          {analytics.dailyData.slice(-7).map((day) => (
            <div key={day.date} className="flex items-center justify-between border-b pb-2">
              <span className="text-sm">{day.date}</span>
              <div className="flex gap-4">
                <span className="text-sm text-gray-600">Visits: {day.visits}</span>
                <span className="text-sm text-gray-600">Clicks: {day.clicks}</span>
                <span className="text-sm text-gray-600">Conversions: {day.conversions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Buttons */}
      {analytics.topButtons.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Top Performing Buttons</h3>
          <div className="space-y-2">
            {analytics.topButtons.map((button) => (
              <div key={button.buttonId} className="flex items-center justify-between">
                <span className="text-sm">{button.buttonId}</span>
                <span className="text-sm font-semibold">{button.count} clicks</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


