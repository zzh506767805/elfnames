import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'software' | 'service' | 'faq'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "DreamfinityX",
          "url": "https://dreamfinityx.com",
          "description": "Professional AI platform for text and image generation. Create stunning visuals from text descriptions, edit images with AI, and unleash your creativity.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://dreamfinityx.com/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      
      case 'software':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "DreamfinityX - AI Image Generator",
          "description": "Professional AI platform for text and image generation using Azure OpenAI technology",
          "url": "https://dreamfinityx.com",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "ratingCount": "1024"
          }
        }
      
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "AI Image Generation Service",
          "description": "Professional AI-powered image generation and editing service",
          "provider": {
            "@type": "Organization",
            "name": "DreamfinityX",
            "url": "https://dreamfinityx.com"
          },
          "serviceType": "AI Image Generation",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "AI Image Generation Plans",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Free Plan"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Premium Plan"
                }
              }
            ]
          }
        }
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is DreamfinityX and how does it work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DreamfinityX is an AI-powered creative platform that uses Azure OpenAI's GPT-image-1 model - ChatGPT's most advanced image generation model - to generate and edit images. Simply describe what you want to create, and our AI will generate high-quality images that match your description."
              }
            },
            {
              "@type": "Question",
              "name": "What image sizes and formats are supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We support three image sizes: 1024×1024 (square), 1024×1536 (portrait), and 1536×1024 (landscape). You can choose between PNG and JPEG output formats. You can also generate up to 10 images in a single request."
              }
            },
            {
              "@type": "Question",
              "name": "How do I get the best results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Be specific and descriptive in your prompts. Include details about style, lighting, composition, and quality. Use medium or high quality settings for better results. Use specific keywords like 'photorealistic', '4K', 'professional lighting'."
              }
            },
            {
              "@type": "Question",
              "name": "Is DreamfinityX free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "DreamfinityX offers both free and premium tiers. The free tier allows you to explore our AI capabilities. For unlimited generations and advanced features, consider upgrading to premium plans."
              }
            }
          ]
        }
      
      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 