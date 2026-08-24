import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { AdminLayoutWrapper } from '@/components/AdminLayoutWrapper'
import { Toaster } from 'sonner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Admin Portal — Sangee Sri Aari Works',
  description: 'Management dashboard for products, orders, quotations, and studio bookings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-darkbase text-cream min-h-screen flex antialiased" suppressHydrationWarning>
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
