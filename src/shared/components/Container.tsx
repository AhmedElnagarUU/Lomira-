import React from 'react';
import { BaseComponentProps } from '../types';

export const Container: React.FC<BaseComponentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

