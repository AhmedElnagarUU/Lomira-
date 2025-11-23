import React from 'react';

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div
      className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700"
      data-testid="dashboard-error"
    >
      {message ?? 'Something went wrong while loading the dashboard.'}
    </div>
  );
};
