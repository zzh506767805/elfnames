import { useTranslations } from 'next-intl';

/**
 * 翻译回退选项接口
 */
export interface TranslationFallbackOptions {
  fallbackLocale?: string;
  showKeyOnError?: boolean;
  logMissingKeys?: boolean;
}

/**
 * 检查翻译是否缺失
 * @param translation - 翻译结果
 * @param key - 翻译键
 * @returns 是否缺失翻译
 */
export function isTranslationMissing(translation: string, key: string): boolean {
  // 如果翻译结果等于键名，说明翻译缺失
  if (translation === key) {
    return true;
  }
  
  // 如果翻译结果包含点号且完全等于键名，说明翻译缺失
  if (translation.includes('.') && translation.split('.').length > 1 && translation === key) {
    return true;
  }
  
  // 如果翻译结果为空或只包含空白字符
  if (!translation || translation.trim().length === 0) {
    return true;
  }
  
  // 检查是否为可能重复显示的常见英文回退值
  const commonDefaults = [
    'Elf Name Generator',
    'Generate fantasy elf names for your characters',
    'Ultimate Elf Name Generator'
  ];
  
  if (commonDefaults.includes(translation.trim())) {
    const keyParts = key.split('.');
    const lastPart = keyParts[keyParts.length - 1];
    
    // 如果键名暗示这是一个标题，且内容可能重复，则使用更具体的回退
    if (['title', 'name', 'siteName'].includes(lastPart)) {
      return true;
    }
  }
  
  return false;
}

/**
 * 创建带回退机制的翻译函数
 * @param t - next-intl 翻译函数
 * @param options - 回退选项
 * @returns 带回退机制的翻译函数
 */
export function createTranslationWithFallback(
  t: ReturnType<typeof useTranslations>,
  options: TranslationFallbackOptions = {}
) {
  const {
    fallbackLocale = 'en',
    showKeyOnError = false,
    logMissingKeys = process.env.NODE_ENV === 'development'
  } = options;

  return function translateWithFallback(key: string, params?: any): string {
    try {
      const translation = t(key, params);
      
      // 检查翻译是否缺失
      if (isTranslationMissing(translation, key)) {
        if (logMissingKeys) {
          console.warn(`Missing translation for key: ${key}`);
        }
        
        // 如果当前不是回退语言，尝试使用回退语言
        if (fallbackLocale !== 'en') {
          // 这里需要获取英语翻译，但由于 next-intl 的限制，
          // 我们暂时返回键名或默认文本
          return showKeyOnError ? key : getDefaultTranslation(key);
        }
        
        return showKeyOnError ? key : getDefaultTranslation(key);
      }
      
      return translation;
    } catch (error) {
      if (logMissingKeys) {
        console.error(`Translation error for key: ${key}`, error);
      }
      
      return showKeyOnError ? key : getDefaultTranslation(key);
    }
  };
}

/**
 * 获取默认翻译文本
 * @param key - 翻译键
 * @returns 默认翻译文本
 */
function getDefaultTranslation(key: string): string {
  // 根据键名提供一些默认翻译
  const defaultTranslations: Record<string, string> = {
    // 通用SEO相关
    'seo.toolLabel': 'Elf Name Generator Tool',
    'seo.infoLabel': 'Elf Name Information and Guide',
    'seo.breadcrumbHome': 'Home',
    'seo.breadcrumbGenerator': 'Elf Name Generator',
    
    // 专门页面的回退值（避免重复显示"Elf Name Generator"）
    'randomizer.header.title': 'Elf Name Randomizer',
    'randomizer.header.description': 'Generate diverse elf names randomly from all types and cultures',
    'randomizer.metadata.title': 'Elf Name Randomizer - Random Name Generator',
    'randomizer.seo.toolLabel': 'Elf Name Randomizer Tool',
    'randomizer.seo.infoLabel': 'Elf Name Randomizer Information and Guide',
    'randomizer.seo.breadcrumbGenerator': 'Elf Name Randomizer',
    
    'woodElf.seo.toolLabel': 'Wood Elf Name Generation Tool',
    'woodElf.seo.infoLabel': 'Wood Elf Name Information and Guide',
    'woodElf.seo.breadcrumbGenerator': 'Wood Elf Names',
    
    'darkElf.seo.toolLabel': 'Dark Elf Name Generation Tool',
    'darkElf.seo.infoLabel': 'Dark Elf Name Information and Guide',
    'darkElf.seo.breadcrumbGenerator': 'Dark Elf Names',
    
    'highElf.seo.toolLabel': 'High Elf Name Generation Tool',
    'highElf.seo.infoLabel': 'High Elf Name Information and Guide', 
    'highElf.seo.breadcrumbGenerator': 'High Elf Names',
    
    'bloodElf.seo.toolLabel': 'Blood Elf Name Generation Tool',
    'bloodElf.seo.infoLabel': 'Blood Elf Name Information and Guide',
    'bloodElf.seo.breadcrumbGenerator': 'Blood Elf Names',
    
    'femaleElf.seo.toolLabel': 'Female Elf Name Generation Tool',
    'femaleElf.seo.infoLabel': 'Female Elf Name Information and Guide',
    'femaleElf.seo.breadcrumbGenerator': 'Female Elf Names',
    
    'tolkien.seo.toolLabel': 'Tolkien Elf Name Generation Tool',
    'tolkien.seo.infoLabel': 'Tolkien Elf Name Information and Guide',
    'tolkien.seo.breadcrumbGenerator': 'Tolkien Elf Names',
    
    'dnd.seo.toolLabel': 'D&D Elf Name Generation Tool',
    'dnd.seo.infoLabel': 'D&D Elf Name Information and Guide',
    'dnd.seo.breadcrumbGenerator': 'D&D Elf Names',
    
    'elven.seo.toolLabel': 'Elven Name Generation Tool',
    'elven.seo.infoLabel': 'Elven Name Information and Guide',
    'elven.seo.breadcrumbGenerator': 'Elven Names',
    
    'navigation.sectionLabel': 'Specialized Elf Name Generators',
    
    // 导航标题，避免重复
    'navigation.title': 'Specialized Elf Name Generators',
    'navigation.description': 'Explore our collection of specialized elf name generators',
    
    // 各种精灵类型的导航标题
    'navigation.elfRandomizer.title': 'Elf Name Randomizer',
    'navigation.elfRandomizer.description': 'Generate random elf names from all types'
  };
  
  // 如果有特定的默认值，使用它
  if (defaultTranslations[key]) {
    return defaultTranslations[key];
  }
  
  // 否则从键名生成一个简单的默认值
  const keyParts = key.split('.');
  const lastPart = keyParts[keyParts.length - 1];
  
  // 转换驼峰命名为可读文本
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * 验证翻译键是否存在
 * @param t - next-intl 翻译函数
 * @param key - 翻译键
 * @returns 翻译键是否存在
 */
export function validateTranslationKey(
  t: ReturnType<typeof useTranslations>,
  key: string
): boolean {
  try {
    const translation = t(key);
    return !isTranslationMissing(translation, key);
  } catch {
    return false;
  }
}

/**
 * 批量验证翻译键
 * @param t - next-intl 翻译函数
 * @param keys - 翻译键数组
 * @returns 缺失的翻译键数组
 */
export function validateTranslationKeys(
  t: ReturnType<typeof useTranslations>,
  keys: string[]
): string[] {
  return keys.filter(key => !validateTranslationKey(t, key));
}/**
 *
 React Hook for translation with fallback
 * 使用示例：
 * const tWithFallback = useTranslationWithFallback();
 * const label = tWithFallback('seo.toolLabel');
 */
export function useTranslationWithFallback(options: TranslationFallbackOptions = {}) {
  // 注意：这个函数需要在 React 组件中使用
  // 实际的 hook 实现需要在组件中调用 useTranslations
  return function createFallbackTranslator(t: ReturnType<typeof useTranslations>) {
    return createTranslationWithFallback(t, options);
  };
}

/**
 * 常用的SEO相关翻译键
 */
export const SEO_TRANSLATION_KEYS = {
  TOOL_LABEL: 'seo.toolLabel',
  INFO_LABEL: 'seo.infoLabel',
  BREADCRUMB_HOME: 'seo.breadcrumbHome',
  BREADCRUMB_GENERATOR: 'seo.breadcrumbGenerator',
  NO_SCRIPT_TITLE: 'seo.noScriptTitle',
  NO_SCRIPT_DESCRIPTION: 'seo.noScriptDescription',
  STRUCTURED_DATA_NAME: 'seo.structuredDataName',
  STRUCTURED_DATA_DESCRIPTION: 'seo.structuredDataDescription'
} as const;

/**
 * Wood Elf 相关的SEO翻译键
 */
export const WOOD_ELF_SEO_KEYS = {
  TOOL_LABEL: 'woodElf.seo.toolLabel',
  INFO_LABEL: 'woodElf.seo.infoLabel',
  BREADCRUMB_GENERATOR: 'woodElf.seo.breadcrumbGenerator',
  NO_SCRIPT_TITLE: 'woodElf.seo.noScriptTitle',
  NO_SCRIPT_DESCRIPTION: 'woodElf.seo.noScriptDescription',
  STRUCTURED_DATA_NAME: 'woodElf.seo.structuredDataName',
  STRUCTURED_DATA_DESCRIPTION: 'woodElf.seo.structuredDataDescription'
} as const;

/**
 * Elven 相关的SEO翻译键
 */
export const ELVEN_SEO_KEYS = {
  TOOL_LABEL: 'elven.seo.toolLabel',
  INFO_LABEL: 'elven.seo.infoLabel',
  BREADCRUMB_GENERATOR: 'elven.seo.breadcrumbGenerator',
  NO_SCRIPT_TITLE: 'elven.seo.noScriptTitle',
  NO_SCRIPT_DESCRIPTION: 'elven.seo.noScriptDescription',
  STRUCTURED_DATA_NAME: 'elven.seo.structuredDataName',
  STRUCTURED_DATA_DESCRIPTION: 'elven.seo.structuredDataDescription'
} as const;