import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: "Katachi — Design furniture for spaces that breathe.",
  description: "Architected in Belgium, built to last—timeless pieces.",
  generator: "v0.app",
  alternates: {
    canonical: "https://katachi.example/",
  },
  openGraph: {
    siteName: "Katachi",
    title: "Design furniture for spaces that breathe. | Katachi",
    description: "Architected in Belgium, built to last—timeless pieces.",
    type: "website",
    url: "https://katachi.example/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Katachi design furniture — timeless pieces, architected in Belgium",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design furniture for spaces that breathe. | Katachi",
    description: "Architected in Belgium, built to last—timeless pieces.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-katachi.jpg-7vz2r3hxZA6woukGOmH115Fg7Piyjs.jpeg",
        alt: "Katachi design furniture — timeless pieces, architected in Belgium",
      },
    ],
    site: "@katachi",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://katachi.example"),
  viewport: {
    width: "device-width",
    initialScale: 1,
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
}

export const viewport_const = viewport

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for analytics and tracking */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL || "https://katachi.example"} />

        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter.var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
        {children}
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "KATACHI Studio",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://katachi.example",
              description: "Architected in Belgium, built to last—timeless design furniture.",
            }),
          }}
        />
      </body>
    </html>
  )
}
