import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ElfNameClient from "@/components/ElfNameClient";
import ElfNameSEO from "@/components/ElfNameSEO";
import StructuredData from "@/components/StructuredData";
import { locales } from "../../../i18n";
import { getTranslationWithFallback } from "../../../lib/serverTranslationUtils";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  const baseUrl = "https://elfname.pro";
  const pagePath = "high-elf-name-generator";
  const canonicalUrl = locale === 'en' ? `${baseUrl}/${pagePath}` : `${baseUrl}/${locale}/${pagePath}`;

  return {
    title: t('highElf.metadata.title'),
    description: t('highElf.metadata.description'),
    keywords: t('highElf.metadata.keywords'),
    authors: [{ name: "DreamfinityX" }],
    creator: "DreamfinityX",
    publisher: "DreamfinityX",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        locales.map(loc => [
          loc,
          loc === 'en' ? `${baseUrl}/${pagePath}` : `${baseUrl}/${loc}/${pagePath}`
        ])
      )
    },
    openGraph: {
      title: t('highElf.metadata.openGraphTitle'),
      description: t('highElf.metadata.openGraphDescription'),
      url: canonicalUrl,
      siteName: t('common.siteName'),
      locale,
      type: "website",
      images: [
        {
          url: "/og-elf-name-generator.jpg",
          width: 1200,
          height: 630,
          alt: t('highElf.metadata.title'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('highElf.metadata.twitterTitle'),
      description: t('highElf.metadata.twitterDescription'),
      images: ["/og-elf-name-generator.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HighElfNameGeneratorPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  const seoTranslations = await getTranslations({ locale, namespace: 'highElfSeo' });
  const baseUrl = "https://elfname.pro";
  const pagePath = "high-elf-name-generator";
  const canonicalUrl = locale === 'en' ? `${baseUrl}/${pagePath}` : `${baseUrl}/${locale}/${pagePath}`;

  // 获取带回退的翻译
  const toolLabel = await getTranslationWithFallback(locale, 'highElf.seo.toolLabel');
  const infoLabel = await getTranslationWithFallback(locale, 'highElf.seo.infoLabel');
  const noScriptTitle = await getTranslationWithFallback(locale, 'highElf.seo.noScriptTitle');
  const noScriptDescription = await getTranslationWithFallback(locale, 'highElf.seo.noScriptDescription');
  const structuredDataName = await getTranslationWithFallback(locale, 'highElf.seo.structuredDataName');
  const structuredDataDescription = await getTranslationWithFallback(locale, 'highElf.seo.structuredDataDescription');
  const breadcrumbHome = await getTranslationWithFallback(locale, 'seo.breadcrumbHome');
  const breadcrumbGenerator = await getTranslationWithFallback(locale, 'highElf.seo.breadcrumbGenerator');

  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": structuredDataName,
          "applicationCategory": "EntertainmentApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": structuredDataDescription,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": breadcrumbHome,
                "item": locale === 'en' ? baseUrl : `${baseUrl}/${locale}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": breadcrumbGenerator,
                "item": canonicalUrl
              }
            ]
          }
        }}
      />
      
      {/* NoScript SEO内容 */}
      <noscript>
        <section>
          <h1>{noScriptTitle}</h1>
          <p>
            {noScriptDescription}
          </p>
        </section>
      </noscript>
      
      <div className="min-h-screen">
        {/* 主要功能区 - 客户端组件 */}
        <section aria-label={toolLabel}>
          <ElfNameClient />
        </section>
        
        {/* SEO内容 - 服务器端渲染 */}
        <section aria-label={infoLabel}>
          <ElfNameSEO translations={seoTranslations} />
        </section>
      </div>
    </>
  );
}