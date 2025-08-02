'use client';

import React from 'react';

interface ScrollTopButtonProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'default';
}

export default function ScrollTopButton({
  className = '',
  children,
  variant = 'primary'
}: ScrollTopButtonProps) {
  // 映射variant到tailwind类
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
    }
  };

  // 应用样式类
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${className}`;
  
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={handleClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
} 