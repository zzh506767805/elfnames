'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import ElfNameGenerator from '@/components/ElfNameGenerator';

export default function ElfNameClient() {
  const pathname = usePathname();
  
  // 根据路径确定页面类型和标题键
  const getPageConfig = () => {
    if (pathname.includes('elf-name-randomizer')) {
      return {
        titleKey: 'randomizer.header.title',
        descriptionKey: 'randomizer.header.description',
        pageType: 'randomizer' as const
      };
    }
    
    // 其他专门页面可以在这里添加
    if (pathname.includes('wood-elf-name-generator')) {
      return {
        titleKey: 'woodElf.header.title',
        descriptionKey: 'woodElf.header.description', 
        pageType: 'specialized' as const
      };
    }
    
    if (pathname.includes('dark-elf-name-generator')) {
      return {
        titleKey: 'darkElf.header.title',
        descriptionKey: 'darkElf.header.description',
        pageType: 'specialized' as const
      };
    }
    
    // 默认首页配置
    return {
      titleKey: 'header.title',
      descriptionKey: 'header.description',
      pageType: 'home' as const
    };
  };
  
  const config = getPageConfig();
  
  return <ElfNameGenerator {...config} />;
} 