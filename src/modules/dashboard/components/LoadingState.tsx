import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div
      className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-500"
      data-testid="dashboard-loading"
    >
      Loading dashboard…
    </div>
  );
};
