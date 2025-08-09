import { MetadataRoute } from 'next'
import { locales, defaultLocale } from '../i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elfname.pro'

  // 统一生成每个语言主页的 URL
  const localeToUrl = (loc: string) => (loc === defaultLocale ? baseUrl : `${baseUrl}/${loc}`)

  // 为 hreflang 生成完整互链（包含 x-default）
  const languagesMap: Record<string, string> = Object.fromEntries(
    locales.map((loc) => [loc, localeToUrl(loc)])
  )
  languagesMap['x-default'] = baseUrl

  const now = new Date()

  // 输出每个语言版本的入口页，并为每个入口页附上所有语言的互链
  return locales.map((loc) => ({
    url: localeToUrl(loc),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: languagesMap
    }
  }))
}