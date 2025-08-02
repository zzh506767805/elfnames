'use client';

import React from 'react';

interface LinkButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'default' | 'outline';
}

export default function LinkButton({
  href,
  className = '',
  children,
  variant = 'default'
}: LinkButtonProps) {
  // 映射variant到tailwind类
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      case 'outline':
        return 'border border-white text-white hover:bg-white hover:text-gray-900';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
    }
  };

  // 应用样式类
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${className}`;

  return (
    <a 
      href={href}
      className={combinedClasses}
    >
      {children}
    </a>
  );
} 