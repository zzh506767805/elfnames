import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '../i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elfname.pro'

  // 定义所有子页面路径
  const subPages = [
    'wood-elf-name-generator',
    'elven-name-generator', 
    'high-elf-name-generator',
    'dnd-elf-names',
    'dark-elf-name-generator',
    'blood-elf-name-generator',
    'elf-name-randomizer',
    'tolkien-elf-names-generator',
    'female-elf-name-generator'
  ]

  // 统一生成每个语言主页的 URL
  const localeToUrl = (loc: string, path: string = '') => {
    const basePath = loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`
    return path ? `${basePath}/${path}` : basePath
  }

  // 为 hreflang 生成完整互链
  const generateLanguagesMap = (path: string = ''): Record<string, string> => {
    const languagesMap: Record<string, string> = Object.fromEntries(
      locales.map((loc) => [loc, localeToUrl(loc, path)])
    )
    languagesMap['x-default'] = path ? `${baseUrl}/${path}` : baseUrl
    return languagesMap
  }

  const now = new Date()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // 添加主页面
  locales.forEach((loc) => {
    sitemapEntries.push({
      url: localeToUrl(loc),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: generateLanguagesMap()
      }
    })
  })

  // 添加所有子页面
  subPages.forEach((subPage) => {
    locales.forEach((loc) => {
      sitemapEntries.push({
        url: localeToUrl(loc, subPage),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: generateLanguagesMap(subPage)
        }
      })
    })
  })

  return sitemapEntries
}