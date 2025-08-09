import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ElfNameClient from "@/components/ElfNameClient";
import ElfNameSEO from "@/components/ElfNameSEO";
import StructuredData from "@/components/StructuredData";
import { locales } from "../../i18n";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  const baseUrl = "https://elfname.pro";
  const canonicalUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    keywords: t('metadata.keywords'),
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
          loc === 'en' ? baseUrl : `${baseUrl}/${loc}`
        ])
      )
    },
    openGraph: {
      title: t('metadata.openGraphTitle'),
      description: t('metadata.openGraphDescription'),
      url: canonicalUrl,
      siteName: t('common.siteName'),
      locale,
      type: "website",
      images: [
        {
          url: "/og-elf-name-generator.jpg",
          width: 1200,
          height: 630,
          alt: t('metadata.title'),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('metadata.twitterTitle'),
      description: t('metadata.twitterDescription'),
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

export default async function ElfNameGeneratorPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  const seoTranslations = await getTranslations({ locale, namespace: 'seo' });
  const baseUrl = "https://elfname.pro";
  const canonicalUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": t('seo.structuredDataName'),
          "applicationCategory": "EntertainmentApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": t('seo.structuredDataDescription'),
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": t('seo.breadcrumbHome'),
                "item": canonicalUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t('seo.breadcrumbGenerator'),
                "item": canonicalUrl
              }
            ]
          }
        }}
      />
      
      {/* NoScript SEO内容 */}
      <noscript>
        <section>
          <h1>{t('seo.noScriptTitle')}</h1>
          <p>
            {t('seo.noScriptDescription')}
          </p>
        </section>
      </noscript>
      
      <div className="min-h-screen">
        {/* 主要功能区 - 客户端组件 */}
        <section aria-label={t('seo.toolLabel')}>
          <ElfNameClient />
        </section>
        
        {/* SEO内容 - 服务器端渲染 */}
        <section aria-label={t('seo.infoLabel')}>
          <ElfNameSEO translations={seoTranslations} />
        </section>
      </div>
    </>
  );
}