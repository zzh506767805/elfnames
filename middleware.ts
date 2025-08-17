import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false  // 禁用自动语言检测，始终使用默认英语
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|og-.*\\.jpg|.*\\.png|.*\\.ico|.*\\.webmanifest).*)'
  ]
};