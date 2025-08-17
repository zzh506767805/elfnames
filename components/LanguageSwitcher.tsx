"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { locales, localeNames, type Locale } from "../i18n";
import { parseCurrentPath, buildLanguageRoute, validatePath, buildLocalizedPath } from "../lib/pathUtils";

/**
 * 语言切换器组件
 * 提供多语言切换功能，支持保持当前页面路径
 */
export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeLanguage = useCallback(async (newLocale: Locale) => {
    if (newLocale === currentLocale || isChanging) return;
    
    setIsChanging(true);
    setError(null);
    
    try {
      // 解析当前路径信息
      const currentPath = parseCurrentPath(pathname);
      
      // 验证当前页面路径是否有效
      if (!validatePath(currentPath.pagePath)) {
        console.warn('Invalid page path detected, redirecting to home page');
        // 如果当前页面无效，跳转到目标语言的首页
        const homePath = buildLocalizedPath(newLocale, []);
        router.push(homePath);
        return;
      }
      
      // 构建目标语言的路径
      const targetRoute = buildLanguageRoute(currentPath, newLocale);
      
      // 跳转到新路径
      router.push(targetRoute.path);
      
      // 添加短暂延迟后刷新，确保路由切换完成
      setTimeout(() => {
        router.refresh();
      }, 100);
      
    } catch (error) {
      console.error('Language switch failed:', error);
      setError('语言切换失败，请重试');
      setIsChanging(false);
      
      // 3秒后清除错误信息
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [currentLocale, isChanging, pathname, router]);

  /**
   * 获取当前语言的显示名称
   * @returns 当前语言的本地化名称
   */
  const getCurrentLanguageName = () => {
    const name = localeNames[currentLocale as Locale];
    return name || 'English';
  };

  /**
   * 重试语言切换
   * @param locale - 目标语言代码
   */
  const retryLanguageChange = useCallback((locale: Locale) => {
    setError(null);
    changeLanguage(locale);
  }, [changeLanguage]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className={`flex items-center gap-2 bg-white/90 backdrop-blur-sm border transition-colors ${
            error 
              ? 'border-red-300 hover:bg-red-50' 
              : 'border-gray-200 hover:bg-gray-50'
          }`}
          disabled={isChanging}
          title={error || t('selectLanguage')}
        >
          <Languages className={`h-4 w-4 ${isChanging ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">
            {isChanging ? '切换中...' : getCurrentLanguageName()}
          </span>
          {error && (
            <span className="text-red-500 text-xs ml-1">!</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[200px] max-h-[300px] overflow-y-auto bg-white/95 backdrop-blur-sm"
      >
        {error && (
          <div className="px-3 py-2 text-sm text-red-600 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 ml-2"
                title="关闭错误提示"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => error ? retryLanguageChange(locale) : changeLanguage(locale)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              locale === currentLocale 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-700'
            } ${isChanging ? 'opacity-50' : ''}`}
            disabled={isChanging}
          >
            <span>{localeNames[locale]}</span>
            <div className="flex items-center gap-1">
              {locale === currentLocale && (
                <span className="text-blue-500 text-xs">✓</span>
              )}
              {error && (
                <span className="text-xs text-gray-400">重试</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}