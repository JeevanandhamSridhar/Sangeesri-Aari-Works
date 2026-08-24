'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { AdminHeader } from '@/components/AdminHeader'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 md:p-8 flex-1 overflow-y-auto" suppressHydrationWarning>
          {children}
        </main>
      </div>
    </>
  )
}
