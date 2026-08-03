import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { Toaster } from 'sonner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-darkbase text-cream min-h-screen flex antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-gold-500/15 px-8 flex items-center justify-between sticky top-0 bg-[#0A0806]/90 backdrop-blur-md z-30">
            <h1 className="font-playfair text-lg font-bold text-cream">Sangee Sri Aari Works — Store & Studio CMS</h1>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-inter font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Sync Active
              </span>
            </div>
          </header>
          <main className="p-8 flex-1 overflow-y-auto">{children}</main>
        </div>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
