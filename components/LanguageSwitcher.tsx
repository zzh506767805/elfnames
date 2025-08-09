"use client";

import { useState } from "react";
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

export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  const [isChanging, setIsChanging] = useState(false);

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale || isChanging) return;
    
    setIsChanging(true);
    
    try {
      // 完全重建正确的路径
      let newPath = '/';
      
      // 如果新语言不是英语（默认语言），添加语言前缀
      if (newLocale !== 'en') {
        newPath = `/${newLocale}`;
      }
      
      // 直接跳转到新路径
      router.push(newPath);
      router.refresh();
    } catch (error) {
      console.error('Language switch failed:', error);
      setIsChanging(false);
    }
  };

  const getCurrentLanguageName = () => {
    const name = localeNames[currentLocale as Locale];
    return name || 'English';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          disabled={isChanging}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {getCurrentLanguageName()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[200px] max-h-[300px] overflow-y-auto bg-white/95 backdrop-blur-sm"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLanguage(locale)}
            className={`flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${
              locale === currentLocale 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-700'
            }`}
            disabled={isChanging}
          >
            <span>{localeNames[locale]}</span>
            {locale === currentLocale && (
              <span className="ml-2 text-blue-500 text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}