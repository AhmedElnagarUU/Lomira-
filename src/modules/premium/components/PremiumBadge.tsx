import React from 'react';

interface PremiumBadgeProps {
  feature?: string;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({ feature }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
      <span>⭐</span>
      <span>Premium {feature ? `(${feature})` : ''}</span>
    </div>
  );
};


