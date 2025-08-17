import { Locale, locales, defaultLocale } from '../i18n';

/**
 * 路径信息接口
 */
export interface PathInfo {
  locale: string;        // 当前语言代码
  pagePath: string[];    // 页面路径段
  isHomePage: boolean;   // 是否为首页
  fullPath: string;      // 完整路径
}

/**
 * 语言路由接口
 */
export interface LanguageRoute {
  locale: Locale;        // 目标语言
  path: string;          // 构建的路径
  isDefault: boolean;    // 是否为默认语言
}

/**
 * 支持的页面路径列表
 */
export const supportedPagePaths = [
  'wood-elf-name-generator',
  'dark-elf-name-generator',
  'high-elf-name-generator',
  'blood-elf-name-generator',
  'female-elf-name-generator',
  'tolkien-elf-names-generator',
  'dnd-elf-names',
  'elven-name-generator',
  'elf-name-randomizer'
] as const;

/**
 * 解析当前路径信息
 * @param pathname - 当前路径名
 * @returns PathInfo 对象
 */
export function parseCurrentPath(pathname: string): PathInfo {
  // 移除开头和结尾的斜杠，然后分割路径
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // 检查第一个段是否为语言代码
  const firstSegment = pathSegments[0];
  const isLocaleInPath = firstSegment && locales.includes(firstSegment as Locale);
  
  let locale: string;
  let pagePath: string[];
  
  if (isLocaleInPath) {
    // 路径包含语言前缀
    locale = firstSegment;
    pagePath = pathSegments.slice(1);
  } else {
    // 路径不包含语言前缀，使用默认语言
    locale = defaultLocale;
    pagePath = pathSegments;
  }
  
  const isHomePage = pagePath.length === 0;
  
  return {
    locale,
    pagePath,
    isHomePage,
    fullPath: pathname
  };
}

/**
 * 构建本地化路径
 * @param targetLocale - 目标语言
 * @param pagePath - 页面路径段数组
 * @returns 构建的完整路径
 */
export function buildLocalizedPath(targetLocale: Locale, pagePath: string[] = []): string {
  let newPath = '';
  
  // 如果目标语言不是默认语言（英语），添加语言前缀
  if (targetLocale !== defaultLocale) {
    newPath = `/${targetLocale}`;
  }
  
  // 添加页面路径
  if (pagePath.length > 0) {
    newPath += `/${pagePath.join('/')}`;
  }
  
  // 确保路径以斜杠开头
  return newPath || '/';
}

/**
 * 验证路径是否有效
 * @param pagePath - 页面路径段数组
 * @returns 是否为有效路径
 */
export function validatePath(pagePath: string[]): boolean {
  // 首页总是有效的
  if (pagePath.length === 0) {
    return true;
  }
  
  // 检查是否为支持的页面路径
  const pageRoute = pagePath.join('/');
  return supportedPagePaths.includes(pageRoute as any);
}

/**
 * 为指定语言构建语言路由
 * @param currentPath - 当前路径信息
 * @param targetLocale - 目标语言
 * @returns LanguageRoute 对象
 */
export function buildLanguageRoute(currentPath: PathInfo, targetLocale: Locale): LanguageRoute {
  const path = buildLocalizedPath(targetLocale, currentPath.pagePath);
  
  return {
    locale: targetLocale,
    path,
    isDefault: targetLocale === defaultLocale
  };
}

/**
 * 获取页面的所有语言版本路径
 * @param currentPath - 当前路径信息
 * @returns 所有语言的路由数组
 */
export function getAllLanguageRoutes(currentPath: PathInfo): LanguageRoute[] {
  return locales.map(locale => buildLanguageRoute(currentPath, locale));
}

/**
 * 检查路径是否需要重定向
 * @param currentPath - 当前路径信息
 * @returns 如果需要重定向，返回重定向路径；否则返回 null
 */
export function getRedirectPath(currentPath: PathInfo): string | null {
  // 如果页面路径无效，重定向到对应语言的首页
  if (!validatePath(currentPath.pagePath)) {
    return buildLocalizedPath(currentPath.locale as Locale, []);
  }
  
  return null;
}

/**
 * 从路径中提取页面标识符
 * @param pagePath - 页面路径段数组
 * @returns 页面标识符或 null
 */
export function getPageIdentifier(pagePath: string[]): string | null {
  if (pagePath.length === 0) {
    return 'home';
  }
  
  const pageRoute = pagePath.join('/');
  return supportedPagePaths.includes(pageRoute as any) ? pageRoute : null;
}

/**
 * 构建规范URL
 * @param baseUrl - 基础URL
 * @param pagePath - 页面路径
 * @param locale - 语言代码
 * @returns 完整的规范URL
 */
export function buildCanonicalUrl(baseUrl: string, pagePath: string, locale: string): string {
  if (locale === defaultLocale) {
    return pagePath ? `${baseUrl}/${pagePath}` : baseUrl;
  }
  return pagePath ? `${baseUrl}/${locale}/${pagePath}` : `${baseUrl}/${locale}`;
}

/**
 * 构建所有语言的备用URL映射
 * @param baseUrl - 基础URL
 * @param pagePath - 页面路径（可选）
 * @returns 语言到URL的映射
 */
export function buildAlternateUrls(baseUrl: string, pagePath?: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  for (const locale of locales) {
    alternates[locale] = buildCanonicalUrl(baseUrl, pagePath || '', locale);
  }
  
  return alternates;
}