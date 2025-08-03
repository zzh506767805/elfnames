import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import GoogleAnalytics from '../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://elfname.pro'),
  title: 'Ultimate Elf Name Generator - Create Magical Names',
  description: 'Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters. Free tool for fantasy creators.',
  keywords: 'elf name generator, ultimate elf name generator, wood elf name generator, dark elf name generator, half elf name generator, elf names generator, elf name generator dnd, fantasy names, magical elf names',
  robots: 'index, follow',
  openGraph: {
    title: 'Ultimate Elf Name Generator - Create Magical Names',
    description: 'Generate authentic fantasy elf names instantly. Perfect for wood elves, dark elves, half elves, and DND characters.',
    type: 'website',
    url: 'https://elfname.pro/',
    locale: 'en_US',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://elfname.pro" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <main role="main">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
} 