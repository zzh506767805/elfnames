'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface SEOButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'link';
  children: React.ReactNode;
}

export default function SEOButton({
  onClick,
  href,
  className = '',
  variant = 'default',
  children
}: SEOButtonProps) {
  // 映射variant到tailwind类
  const getVariantClasses = () => {
    switch(variant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      case 'outline':
        return 'border border-white text-white hover:bg-white hover:text-gray-900';
      case 'link':
        return 'bg-transparent text-blue-600 hover:underline';
      default:
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
    }
  };

  // 应用样式类
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const combinedClasses = `${baseClasses} ${getVariantClasses()} ${className}`;

  // 如果提供了href，返回链接
  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  // 否则返回按钮
  return (
    <button
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
} 