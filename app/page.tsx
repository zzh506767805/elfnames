import { Metadata } from "next";
import ElfNameClient from "@/components/ElfNameClient";
import ElfNameSEO from "@/components/ElfNameSEO";
import StructuredData from "@/components/StructuredData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ultimate Elf Name Generator - Create Magical Names",
  description: "Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters. Free tool for fantasy creators.",
  keywords: [
    "elf name generator",
    "half elf name generator",
    "wood elf name generator", 
    "dark elf name generator",
    "elf names generator",
    "elf name generator dnd",
    "blood elf name generator",
    "fantasy name generator", 
    "D&D elf names",
    "fantasy names",
    "RPG names",
    "character names",
    "random elf names",
    "fantasy character generator",
    "elvish names",
    "elven names"
  ],
  authors: [{ name: "DreamfinityX" }],
  creator: "DreamfinityX",
  publisher: "DreamfinityX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://elfnamegenerator.pro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ultimate Elf Name Generator - Create Magical Names",
    description: "Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters.",
    url: "https://elfnamegenerator.pro",
    siteName: "Ultimate Elf Name Generator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-elf-name-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Elf Name Generator - Create Fantasy Elf Names",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Elf Name Generator - Create Magical Names",
    description: "Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters.",
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

export default function ElfNameGeneratorPage() {
  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type="software"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Ultimate Elf Name Generator",
          "applicationCategory": "EntertainmentApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Generate authentic fantasy elf names for wood elves, dark elves, half elves, and DND characters with our ultimate elf name generator.",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://elfnamegenerator.pro"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Elf Name Generator",
                "item": "https://elfnamegenerator.pro"
              }
            ]
          }
        }}
      />
      
      {/* NoScript SEO内容 */}
      <noscript>
        <section>
          <h1>Ultimate Elf Name Generator - Create Magical Names</h1>
          <p>
            Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters.
            Our elf name generator creates names for wood elves, dark elves, half elves, and more fantasy RPG characters.
          </p>
        </section>
      </noscript>
      
      <div className="min-h-screen">
        {/* 主要功能区 - 客户端组件 */}
        <section aria-label="Elf Name Generator Tool">
          <ElfNameClient />
        </section>
        
        {/* SEO内容 - 直接渲染 */}
        <section aria-label="Elf Name Generator Information">
          <ElfNameSEO />
        </section>
      </div>
    </>
  );
} 