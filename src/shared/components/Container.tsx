import React from 'react';
import type { BaseComponentProps } from '../types';

type ContainerProps = BaseComponentProps & React.HTMLAttributes<HTMLDivElement>;

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};









