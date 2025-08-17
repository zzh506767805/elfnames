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
  const pagePath = "wood-elf-name-generator";
  const canonicalUrl = locale === 'en' ? `${baseUrl}/${pagePath}` : `${baseUrl}/${locale}/${pagePath}`;

  return {
    title: t('woodElf.metadata.title'),
    description: t('woodElf.metadata.description'),
    keywords: t('woodElf.metadata.keywords'),
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
      title: t('woodElf.metadata.openGraphTitle'),
      description: t('woodElf.metadata.openGraphDescription'),
      url: canonicalUrl,
      siteName: t('common.siteName'),
      locale,
      type: "website",
      images: [
        {
          url: "/og-elf-name-generator.jpg",
          width: 1200,
          height: 630,
          alt: t('woodElf.metadata.title'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('woodElf.metadata.twitterTitle'),
      description: t('woodElf.metadata.twitterDescription'),
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

export default async function WoodElfNameGeneratorPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  const seoTranslations = await getTranslations({ locale, namespace: 'woodElfSeo' });
  const baseUrl = "https://elfname.pro";
  const pagePath = "wood-elf-name-generator";
  const canonicalUrl = locale === 'en' ? `${baseUrl}/${pagePath}` : `${baseUrl}/${locale}/${pagePath}`;

  // 获取带回退的翻译
  const toolLabel = await getTranslationWithFallback(locale, 'woodElf.seo.toolLabel');
  const infoLabel = await getTranslationWithFallback(locale, 'woodElf.seo.infoLabel');
  const noScriptTitle = await getTranslationWithFallback(locale, 'woodElf.seo.noScriptTitle');
  const noScriptDescription = await getTranslationWithFallback(locale, 'woodElf.seo.noScriptDescription');
  const structuredDataName = await getTranslationWithFallback(locale, 'woodElf.seo.structuredDataName');
  const structuredDataDescription = await getTranslationWithFallback(locale, 'woodElf.seo.structuredDataDescription');
  const breadcrumbHome = await getTranslationWithFallback(locale, 'seo.breadcrumbHome');
  const breadcrumbGenerator = await getTranslationWithFallback(locale, 'woodElf.seo.breadcrumbGenerator');

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