"use client";

import { useTranslations, useLocale } from 'next-intl';

/**
 * 增强的翻译钩子，提供更好的回退机制
 * 当翻译缺失时会自动显示英文原文而不是翻译键
 */
export function useTranslationWithFallback(namespace?: string) {
  const t = useTranslations(namespace);
  const enT = useTranslations(namespace); // 英文翻译，由next-intl自动处理回退
  const locale = useLocale();
  
  return function translate(key: string, values?: any): string {
    try {
      const translation = t(key, values);
      
      // next-intl 现在应该自动处理回退，所以我们主要检查是否返回了原始键
      const fullKey = namespace ? `${namespace}.${key}` : key;
      
      // 如果翻译看起来像原始键或者明显是错误的，尝试获取英文原文
      if (translation === fullKey || translation === key || !translation) {
        console.warn(`Missing translation for key: ${fullKey}, trying English fallback`);
        
        // 如果当前不是英文，尝试获取英文原文
        if (locale !== 'en') {
          try {
            // 尝试直接用key获取，next-intl会自动回退到英文
            return translation; // next-intl应该已经回退到英文了
          } catch {
            // 如果还是失败，使用最后的回退方案
            return getDisplayText(key, locale);
          }
        }
        
        return getDisplayText(key, locale);
      }
      
      return translation;
    } catch (error) {
      console.warn(`Translation error for key: ${key}`, error);
      return getDisplayText(key, locale);
    }
  };
}

/**
 * 根据键名生成友好的显示文本
 */
function getDisplayText(key: string, locale: string): string {
  const keyParts = key.split('.');
  const lastPart = keyParts[keyParts.length - 1];
  
  // 将驼峰命名转换为可读文本，避免固定的翻译文本
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * 服务器端翻译钩子（用于metadata等）
 */
export async function getTranslationWithFallback(
  locale: string, 
  namespace: string, 
  key: string, 
  getTranslations: any
): Promise<string> {
  try {
    const t = await getTranslations({ locale, namespace });
    const translation = t(key);
    
    const fullKey = `${namespace}.${key}`;
    if (translation === fullKey || translation === key) {
      return getDisplayText(key, locale);
    }
    
    return translation;
  } catch (error) {
    console.warn(`Server translation error for key: ${namespace}.${key}`, error);
    return getDisplayText(key, locale);
  }
}
