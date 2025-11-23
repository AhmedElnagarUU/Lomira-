import React from 'react';
import { BaseComponentProps } from '../types';

interface CardProps extends BaseComponentProps {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
}) => {
  const baseStyles = 'bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-xl hover:border-gray-300 hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

