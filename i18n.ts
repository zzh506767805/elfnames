import { getRequestConfig } from 'next-intl/server';

// 支持的语言列表
export const locales = [
  'en',   // 英语（默认）
  'es',   // 西班牙语
  'fr',   // 法语
  'de',   // 德语
  'ar',   // 阿拉伯语
  'ru',   // 俄语
  'pt',   // 葡萄牙语
  'ja',   // 日语
  'ko',   // 韩语
  'it',   // 意大利语
  'id',   // 印尼语
  'vi',   // 越南语
  'pl',   // 波兰语
  'th'    // 泰语
] as const;

export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

// 语言显示名称
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ar: 'العربية',
  ru: 'Русский',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  it: 'Italiano',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  pl: 'Polski',
  th: 'ไทย'
};

// RTL语言列表
export const rtlLocales: Locale[] = ['ar'];

// 深度合并翻译对象
function deepMergeTranslations(fallback: any, current: any): any {
  if (!fallback || !current) return current || fallback;
  
  const result = { ...fallback };
  
  for (const key in current) {
    if (current.hasOwnProperty(key)) {
      if (typeof current[key] === 'object' && current[key] !== null && 
          typeof result[key] === 'object' && result[key] !== null) {
        result[key] = deepMergeTranslations(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    }
  }
  
  return result;
}

export default getRequestConfig(async ({ locale }) => {
  // 验证并设置默认locale
  const validLocale = (locale && locales.includes(locale as Locale)) 
    ? locale as Locale 
    : defaultLocale;
  
  try {
    const messages = (await import(`./messages/${validLocale}.json`)).default;
    
    // 如果不是英语，加载英语作为回退
    let fallbackMessages: any = {};
    if (validLocale !== defaultLocale) {
      try {
        fallbackMessages = (await import(`./messages/${defaultLocale}.json`)).default;
      } catch (fallbackError) {
        console.warn(`Failed to load fallback messages for locale: ${validLocale}`);
      }
    }
    
    // 如果不是默认语言，深度合并fallback消息到当前消息中
    const finalMessages = validLocale !== defaultLocale && fallbackMessages 
      ? deepMergeTranslations(fallbackMessages, messages)
      : messages;
    
    return {
      locale: validLocale,
      messages: finalMessages,
      // 配置翻译缺失时的处理
      onError: (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Translation error:', error);
        }
      },
                   getMessageFallback: ({ namespace, key, error }: { namespace?: string; key: string; error: any }) => {
        // 当翻译缺失时，尝试从英语中获取
        if (validLocale !== defaultLocale && fallbackMessages) {
          let fallbackValue;
          
          if (namespace) {
            // 支持嵌套路径，如 'subPages.bloodElf.title'
            const namespaceObj = (fallbackMessages as any)[namespace];
            if (namespaceObj) {
              const keyParts = key.split('.');
              fallbackValue = keyParts.reduce((obj, part) => obj?.[part], namespaceObj);
            }
          } else {
            // 无命名空间的情况 - 支持完整的键路径查找
            const keyParts = key.split('.');
            fallbackValue = keyParts.reduce((obj, part) => obj?.[part], fallbackMessages);
          }
          
          if (fallbackValue && typeof fallbackValue === 'string') {
            return fallbackValue;
          }
        }
        
        // 如果上面的fallback失败，尝试直接查找完整键
        if (validLocale !== defaultLocale && fallbackMessages) {
          try {
            // 尝试查找完整的键路径（包括namespace）
            const fullKey = namespace ? `${namespace}.${key}` : key;
            const keyParts = fullKey.split('.');
            const fallbackValue = keyParts.reduce((obj, part) => obj?.[part], fallbackMessages);
            
            if (fallbackValue && typeof fallbackValue === 'string') {
              return fallbackValue;
            }
          } catch (e) {
            // 忽略查找错误，继续下面的处理
          }
        }
        
        // 如果英语回退也没有找到，直接返回键的最后部分，避免固定文本
        const keyParts = key.split('.');
        const lastPart = keyParts[keyParts.length - 1];
        
        // 将驼峰命名转换为可读文本
        return lastPart
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validLocale}`, error);
    // 如果加载失败，回退到默认语言
    return {
      locale: defaultLocale,
      messages: (await import(`./messages/${defaultLocale}.json`)).default
    };
  }
});