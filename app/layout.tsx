import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import './globals.css'

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: 'Niharika Traders - Premium Indian Shagun Cards & Envelopes Since 1990',
    template: '%s | Niharika Traders',
  },
  description: 'Premium quality Indian shagun envelopes and traditional wedding cards. Wholesale and retail stationery experts since 1990, delivering across India. Shop wedding, festive, and ceremonial envelopes.',
  keywords: [
    'shagun envelopes', 'wedding envelopes', 'Niharika Traders',
    'bulk envelopes India', 'traditional shagun cards', 'Indian wedding cards',
    'premium envelopes', 'gaddi box', 'coin envelopes', 'wholesale envelopes',
    'wedding stationery India', 'shagun cards online'
  ],
  authors: [{ name: 'Niharika Traders' }],
  creator: 'Niharika Traders',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Niharika Traders',
    title: 'Niharika Traders - Premium Indian Shagun Cards & Envelopes Since 1990',
    description: 'Premium quality Indian shagun envelopes and traditional wedding cards. Wholesale and retail experts since 1990.',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'Niharika Traders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Niharika Traders - Premium Indian Shagun Cards & Envelopes',
    description: 'Premium quality shagun envelopes and wedding cards since 1990.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://niharika-traders.vercel.app'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
