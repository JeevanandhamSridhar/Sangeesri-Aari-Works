import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { AdminHeader } from '@/components/AdminHeader'
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
          <AdminHeader />
          <main className="p-8 flex-1 overflow-y-auto">{children}</main>
        </div>
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
