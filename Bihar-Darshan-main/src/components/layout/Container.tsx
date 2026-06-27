import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1920px] mx-auto px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
