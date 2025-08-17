'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { buildLocalizedPath, parseCurrentPath, supportedPagePaths } from '../lib/pathUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TreePine, 
  Moon, 
  Sword, 
  Crown, 
  Eclipse,
  Sparkles,
  Users,
  Shuffle
} from "lucide-react";

interface SubPage {
  path: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  category: 'type' | 'gender' | 'style';
}

export default function SubPageNavigation() {
  const t = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  // 获取当前语言，优先使用路径中的语言参数
  const currentPath = parseCurrentPath(pathname);
  const locale = currentPath.locale || currentLocale || (params.locale as string) || 'en';
  
  const subPages: SubPage[] = [
    // 精灵类型
    {
      path: 'wood-elf-name-generator',
      titleKey: 'navigation.woodElf.title',
      descriptionKey: 'navigation.woodElf.description',
      icon: <TreePine className="h-5 w-5" />,
      category: 'type'
    },
    {
      path: 'dark-elf-name-generator',
      titleKey: 'navigation.darkElf.title',
      descriptionKey: 'navigation.darkElf.description',
      icon: <Eclipse className="h-5 w-5" />,
      category: 'type'
    },
    {
      path: 'high-elf-name-generator',
      titleKey: 'navigation.highElf.title',
      descriptionKey: 'navigation.highElf.description',
      icon: <Crown className="h-5 w-5" />,
      category: 'type'
    },
    {
      path: 'blood-elf-name-generator',
      titleKey: 'navigation.bloodElf.title',
      descriptionKey: 'navigation.bloodElf.description',
      icon: <Sword className="h-5 w-5" />,
      category: 'type'
    },
    // 性别特定
    {
      path: 'female-elf-name-generator',
      titleKey: 'navigation.femaleElf.title',
      descriptionKey: 'navigation.femaleElf.description',
      icon: <Users className="h-5 w-5" />,
      category: 'gender'
    },
    // 风格特定
    {
      path: 'tolkien-elf-names-generator',
      titleKey: 'navigation.tolkienElf.title',
      descriptionKey: 'navigation.tolkienElf.description',
      icon: <Sparkles className="h-5 w-5" />,
      category: 'style'
    },
    {
      path: 'dnd-elf-names',
      titleKey: 'navigation.dndElf.title',
      descriptionKey: 'navigation.dndElf.description',
      icon: <Shuffle className="h-5 w-5" />,
      category: 'style'
    },
    {
      path: 'elven-name-generator',
      titleKey: 'navigation.elvenName.title',
      descriptionKey: 'navigation.elvenName.description',
      icon: <Moon className="h-5 w-5" />,
      category: 'style'
    },
    {
      path: 'elf-name-randomizer',
      titleKey: 'navigation.elfRandomizer.title',
      descriptionKey: 'navigation.elfRandomizer.description',
      icon: <Shuffle className="h-5 w-5" />,
      category: 'style'
    }
  ];

  // 验证所有子页面路径是否在支持的路径列表中
  const validateSubPages = () => {
    const invalidPaths = subPages
      .map(page => page.path)
      .filter(path => !supportedPagePaths.includes(path as any));
    
    if (invalidPaths.length > 0) {
      console.warn('Found unsupported page paths:', invalidPaths);
    }
    
    return invalidPaths.length === 0;
  };
  
  // 在开发环境中验证子页面路径
  if (process.env.NODE_ENV === 'development') {
    validateSubPages();
  }

  /**
   * 构建子页面的链接
   * @param pagePath - 页面路径
   * @returns 完整的链接路径
   */
  const buildPageHref = (pagePath: string): string => {
    // 使用统一的路径构建工具
    const href = buildLocalizedPath(locale as any, [pagePath]);
    
    // 在开发环境中添加调试信息
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Building href for ${pagePath} with locale ${locale}: ${href}`);
    }
    
    return href;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'type':
        return t('navigation.categories.elfTypes');
      case 'gender':
        return t('navigation.categories.genderSpecific');
      case 'style':
        return t('navigation.categories.styleSpecific');
      default:
        return '';
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'type':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'gender':
        return 'bg-pink-100 text-pink-800 hover:bg-pink-200';
      case 'style':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const groupedPages = subPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, SubPage[]>);

  return (
    <div className="mt-16 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t('navigation.title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('navigation.description')}
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedPages).map(([category, pages]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Badge variant="secondary" className={getCategoryBadgeColor(category)}>
                {getCategoryTitle(category)}
              </Badge>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => {
                const href = buildPageHref(page.path);
                
                return (
                  <Link key={page.path} href={href}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg group-hover:text-blue-600 transition-colors">
                          <span className="text-blue-500 group-hover:text-blue-600">
                            {page.icon}
                          </span>
                          {t(page.titleKey)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">
                          {t(page.descriptionKey)}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}