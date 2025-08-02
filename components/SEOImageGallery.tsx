import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

interface SEOImage {
  url: string
  alt: string
  title: string
  description?: string
}

interface SEOImageGalleryProps {
  images: SEOImage[]
  title: string
  description?: string
}

export default function SEOImageGallery({ images, title, description }: SEOImageGalleryProps) {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full h-[300px]">
                <Image
                  src={image.url}
                  alt={image.alt}
                  title={image.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                {image.description && (
                  <p className="text-sm text-gray-600">{image.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}