import { getTranslations } from 'next-intl/server';

/**
 * 服务器端翻译回退选项
 */
export interface ServerTranslationFallbackOptions {
  /** 回退语言代码，默认为 'en' */
  fallbackLocale?: string;
  /** 错误时是否显示键名，默认为 false */
  showKeyOnError?: boolean;
  /** 是否记录缺失的翻译键，默认为开发环境启用 */
  logMissingKeys?: boolean;
}

/**
 * 检查翻译是否缺失（服务器端版本）
 * @param translation - 翻译结果
 * @param key - 翻译键
 * @returns 是否缺失翻译
 */
export function isServerTranslationMissing(translation: string, key: string): boolean {
  // 检查是否返回原始键名
  if (translation === key) {
    return true;
  }
  
  // 检查是否包含未翻译的键路径
  if (translation.includes('.') && translation.split('.').length > 1 && translation === key) {
    return true;
  }
  
  // 检查是否为空值
  if (!translation || translation.trim().length === 0) {
    return true;
  }
  
  // 检查是否为默认的英文回退值（避免重复显示相同内容）
  const commonEnglishDefaults = [
    'Elf Name Generator',
    'Generate fantasy elf names for your characters',
    'Ultimate Elf Name Generator'
  ];
  
  if (commonEnglishDefaults.includes(translation.trim())) {
    // 如果这是一个可能重复的英文回退值，进一步检查
    const keyParts = key.split('.');
    const lastPart = keyParts[keyParts.length - 1];
    
    // 如果键名暗示这应该是一个标题，且已经有相同内容，则认为缺失
    if (['title', 'name', 'siteName'].includes(lastPart) && 
        translation === 'Elf Name Generator') {
      return true;
    }
  }
  
  return false;
}

/**
 * 获取带回退的翻译（服务器端）
 * @param locale - 当前语言代码
 * @param key - 翻译键
 * @param options - 回退选项
 * @returns 翻译结果
 */
export async function getTranslationWithFallback(
  locale: string,
  key: string,
  options: ServerTranslationFallbackOptions = {}
): Promise<string> {
  const {
    fallbackLocale = 'en',
    showKeyOnError = false,
    logMissingKeys = process.env.NODE_ENV === 'development'
  } = options;

  try {
    // 尝试获取当前语言的翻译
    const t = await getTranslations({ locale });
    const translation = t(key);
    
    // 检查翻译是否缺失
    if (isServerTranslationMissing(translation, key)) {
      if (logMissingKeys) {
        console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
      }
      
      // 如果当前不是回退语言，尝试使用回退语言
      if (locale !== fallbackLocale) {
        try {
          const fallbackT = await getTranslations({ locale: fallbackLocale });
          const fallbackTranslation = fallbackT(key);
          
          if (!isServerTranslationMissing(fallbackTranslation, key)) {
            return fallbackTranslation;
          }
        } catch (fallbackError) {
          if (logMissingKeys) {
            console.warn(`Fallback translation also failed for key: ${key}`);
          }
        }
      }
      
      return showKeyOnError ? key : getServerDefaultTranslation(key);
    }
    
    return translation;
  } catch (error) {
    if (logMissingKeys) {
      console.error(`Translation error for key: ${key} in locale: ${locale}`, error);
    }
    
    return showKeyOnError ? key : getServerDefaultTranslation(key);
  }
}

/**
 * 获取默认翻译文本（服务器端）
 * @param key - 翻译键
 * @returns 默认翻译文本
 */
function getServerDefaultTranslation(key: string): string {
  const defaultTranslations: Record<string, string> = {
    'seo.toolLabel': 'Elf Name Generator Tool',
    'seo.infoLabel': 'Elf Name Information and Guide',
    'seo.breadcrumbHome': 'Home',
    'seo.breadcrumbGenerator': 'Elf Name Generator',
    'seo.noScriptTitle': 'Elf Name Generator - Create Magical Names',
    'seo.noScriptDescription': 'Generate authentic fantasy elf names for your characters.',
    'seo.structuredDataName': 'Elf Name Generator',
    'seo.structuredDataDescription': 'Generate authentic fantasy elf names for characters, RPG games, and creative writing.',
    
    // Wood Elf defaults
    'woodElf.seo.toolLabel': 'Wood Elf Name Generation Tool',
    'woodElf.seo.infoLabel': 'Wood Elf Name Information and Guide',
    'woodElf.seo.breadcrumbGenerator': 'Wood Elf Name Generator',
    'woodElf.seo.noScriptTitle': 'Wood Elf Name Generator - Create Forest Elf Names',
    'woodElf.seo.noScriptDescription': 'Generate authentic wood elf names for your fantasy characters.',
    'woodElf.seo.structuredDataName': 'Wood Elf Name Generator',
    'woodElf.seo.structuredDataDescription': 'Generate authentic wood elf names for fantasy characters, RPG games, and creative writing.',
    
    // Dark Elf defaults
    'darkElf.seo.toolLabel': 'Dark Elf Name Generation Tool',
    'darkElf.seo.infoLabel': 'Dark Elf Name Information and Guide',
    'darkElf.seo.breadcrumbGenerator': 'Dark Elf Name Generator',
    'darkElf.seo.noScriptTitle': 'Dark Elf Name Generator - Create Drow Names',
    'darkElf.seo.noScriptDescription': 'Generate authentic dark elf and drow names for your fantasy characters.',
    'darkElf.seo.structuredDataName': 'Dark Elf Name Generator',
    'darkElf.seo.structuredDataDescription': 'Generate authentic dark elf and drow names for fantasy characters, RPG games, and creative writing.',
    
    // Female Elf defaults
    'femaleElf.seo.toolLabel': 'Female Elf Name Generation Tool',
    'femaleElf.seo.infoLabel': 'Female Elf Name Information and Guide',
    'femaleElf.seo.breadcrumbGenerator': 'Female Elf Name Generator',
    'femaleElf.seo.noScriptTitle': 'Female Elf Name Generator - Create Feminine Elf Names',
    'femaleElf.seo.noScriptDescription': 'Generate authentic female elf names for your fantasy characters.',
    'femaleElf.seo.structuredDataName': 'Female Elf Name Generator',
    'femaleElf.seo.structuredDataDescription': 'Generate authentic female elf names for fantasy characters, RPG games, and creative writing.',
    
    // High Elf defaults
    'highElf.seo.toolLabel': 'High Elf Name Generation Tool',
    'highElf.seo.infoLabel': 'High Elf Name Information and Guide',
    'highElf.seo.breadcrumbGenerator': 'High Elf Name Generator',
    'highElf.seo.noScriptTitle': 'High Elf Name Generator - Create Noble Elf Names',
    'highElf.seo.noScriptDescription': 'Generate authentic high elf names for your fantasy characters.',
    'highElf.seo.structuredDataName': 'High Elf Name Generator',
    'highElf.seo.structuredDataDescription': 'Generate authentic high elf names for fantasy characters, RPG games, and creative writing.',
    
    // Blood Elf defaults
    'bloodElf.seo.toolLabel': 'Blood Elf Name Generation Tool',
    'bloodElf.seo.infoLabel': 'Blood Elf Name Information and Guide',
    'bloodElf.seo.breadcrumbGenerator': 'Blood Elf Name Generator',
    'bloodElf.seo.noScriptTitle': 'Blood Elf Name Generator - Create Blood Elf Names',
    'bloodElf.seo.noScriptDescription': 'Generate authentic blood elf names for your fantasy characters.',
    'bloodElf.seo.structuredDataName': 'Blood Elf Name Generator',
    'bloodElf.seo.structuredDataDescription': 'Generate authentic blood elf names for fantasy characters, RPG games, and creative writing.',
    
    // Tolkien defaults
    'tolkien.seo.toolLabel': 'Tolkien Elf Name Generation Tool',
    'tolkien.seo.infoLabel': 'Tolkien Elf Name Information and Guide',
    'tolkien.seo.breadcrumbGenerator': 'Tolkien Elf Names Generator',
    'tolkien.seo.noScriptTitle': 'Tolkien Elf Names Generator - Create Middle-earth Elf Names',
    'tolkien.seo.noScriptDescription': 'Generate authentic Tolkien-style elf names inspired by Middle-earth.',
    'tolkien.seo.structuredDataName': 'Tolkien Elf Names Generator',
    'tolkien.seo.structuredDataDescription': 'Generate authentic Tolkien-style elf names inspired by Middle-earth for fantasy characters and creative writing.',
    
    // DnD defaults
    'dnd.seo.toolLabel': 'D&D Elf Name Generation Tool',
    'dnd.seo.infoLabel': 'D&D Elf Name Information and Guide',
    'dnd.seo.breadcrumbGenerator': 'D&D Elf Names',
    'dnd.seo.noScriptTitle': 'D&D Elf Names - Create Dungeons & Dragons Elf Names',
    'dnd.seo.noScriptDescription': 'Generate authentic D&D elf names for your Dungeons & Dragons characters.',
    'dnd.seo.structuredDataName': 'D&D Elf Names Generator',
    'dnd.seo.structuredDataDescription': 'Generate authentic D&D elf names for Dungeons & Dragons characters, campaigns, and RPG games.',
    
    // Randomizer defaults
    'randomizer.header.title': 'Elf Name Randomizer',
    'randomizer.header.description': 'Generate diverse elf names randomly from all types and cultures',
    'randomizer.seo.toolLabel': 'Elf Name Randomizer Tool',
    'randomizer.seo.infoLabel': 'Elf Name Randomizer Information and Guide',
    'randomizer.seo.breadcrumbGenerator': 'Elf Name Randomizer',
    'randomizer.seo.noScriptTitle': 'Elf Name Randomizer - Random Elf Name Generator',
    'randomizer.seo.noScriptDescription': 'Generate random elf names instantly with our elf name randomizer tool.',
    'randomizer.seo.structuredDataName': 'Elf Name Randomizer',
    'randomizer.seo.structuredDataDescription': 'Generate random elf names instantly for fantasy characters, RPG games, and creative writing.',
    
    // Elven defaults
    'elven.seo.toolLabel': 'Elven Name Generation Tool',
    'elven.seo.infoLabel': 'Elven Name Information and Guide',
    'elven.seo.breadcrumbGenerator': 'Elven Name Generator',
    'elven.seo.noScriptTitle': 'Elven Name Generator - Create Elvish Names',
    'elven.seo.noScriptDescription': 'Generate authentic elven and elvish names for your fantasy characters.',
    'elven.seo.structuredDataName': 'Elven Name Generator',
    'elven.seo.structuredDataDescription': 'Generate authentic elven and elvish names for fantasy characters, RPG games, and creative writing.',
    
    'navigation.sectionLabel': 'Specialized Elf Name Generators'
  };
  
  return defaultTranslations[key] || key.split('.').pop() || key;
}

/**
 * 批量获取带回退的翻译（服务器端）
 */
export async function getTranslationsWithFallback(
  locale: string,
  keys: string[],
  options: ServerTranslationFallbackOptions = {}
): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  
  for (const key of keys) {
    results[key] = await getTranslationWithFallback(locale, key, options);
  }
  
  return results;
}

/**
 * 创建带回退的翻译函数（服务器端）
 */
export async function createServerTranslationWithFallback(
  locale: string,
  options: ServerTranslationFallbackOptions = {}
) {
  return async function translateWithFallback(key: string): Promise<string> {
    return getTranslationWithFallback(locale, key, options);
  };
}