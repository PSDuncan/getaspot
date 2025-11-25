import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from "next/script"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "GetASpot - South Africa's Premier Property Platform",
    template: "%s | GetASpot",
  },
  description:
    "Find, list, and manage properties across South Africa. Buy, rent, or sell residential and commercial properties with GetASpot.",
  keywords: [
    "property",
    "real estate",
    "south africa",
    "buy property",
    "rent property",
    "sell property",
    "property listings",
  ],
  authors: [{ name: "GetASpot" }],
  creator: "GetASpot",
  publisher: "GetASpot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GetASpot",
  },
  applicationName: "GetASpot",
  icons: {
    icon: [
      { url: "/icon-192.jpg", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.jpg", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.jpg", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "GetASpot",
    title: "GetASpot - South Africa's Premier Property Platform",
    description: "Find, list, and manage properties across South Africa",
    url: "https://getaspot.co.za",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetASpot - South Africa's Premier Property Platform",
    description: "Find, list, and manage properties across South Africa",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GetASpot" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <PWAInstallPrompt />
        <Analytics />
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('[PWA] Service Worker registered:', registration);
                    
                    // Check for updates periodically
                    setInterval(() => {
                      registration.update();
                    }, 60000); // Check every minute
                  })
                  .catch((error) => {
                    console.log('[PWA] Service Worker registration failed:', error);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
