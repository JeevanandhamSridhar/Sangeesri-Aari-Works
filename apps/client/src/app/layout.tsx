import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/shop/CartDrawer'
import { Toaster } from 'sonner'
import { Providers } from './providers'

const playfair = { variable: 'font-playfair' }
const inter = { variable: 'font-inter' }
const cormorant = { variable: 'font-cormorant' }

export const metadata: Metadata = {
  metadataBase: new URL('https://sangeesriaariworks.com'),
  title: {
    default: 'Sangee Sri Aari Works — Premium Aari & Bridal Blouse Design',
    template: '%s | Sangee Sri Aari Works',
  },
  description:
    'Premium Aari work, bridal blouse designing & tailoring in Kaveripakkam, Ranipet. Exquisite craftsmanship for weddings, receptions & special occasions. Book a design consultation today.',
  keywords: [
    'Aari work Kaveripakkam',
    'bridal blouse design Ranipet',
    'designer blouse Tamil Nadu',
    'embroidery work',
    'Maggam work',
    'Zardosi work',
    'stone work blouse',
    'silk blouse design',
    'wedding blouse',
    'Sangee Sri Aari Works',
  ],
  authors: [{ name: 'Sangee Sri Aari Works' }],
  creator: 'Sangee Sri Aari Works',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sangeesriaariworks.com',
    siteName: 'Sangee Sri Aari Works',
    title: 'Sangee Sri Aari Works — Premium Aari & Bridal Blouse Design',
    description:
      'Exquisite Aari work & bridal blouse designs crafted with love in Kaveripakkam, Ranipet District.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sangee Sri Aari Works',
    description: 'Premium Aari & Bridal Blouse Design',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-darkbase text-cream antialiased overflow-x-hidden" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main suppressHydrationWarning>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1c1208',
                border: '1px solid rgba(212,175,55,0.2)',
                color: '#FDF8F0',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
