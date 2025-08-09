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

export default getRequestConfig(async ({ locale }) => {
  // 验证并设置默认locale
  const validLocale = (locale && locales.includes(locale as Locale)) 
    ? locale as Locale 
    : defaultLocale;
  
  try {
    return {
      locale: validLocale,
      messages: (await import(`./messages/${validLocale}.json`)).default
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