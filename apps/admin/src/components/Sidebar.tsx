'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  Calendar,
  Image as ImageIcon,
  Users,
  Settings,
  Sparkles,
  LogOut,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Quotations', href: '/quotations', icon: FileText },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
  { label: 'Gallery', href: '/gallery', icon: ImageIcon },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0e0a07] border-r border-gold-500/15 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-darkbase text-sm">
              S
            </div>
            <div>
              <p className="font-playfair text-base font-bold text-cream">Sangee Sri</p>
              <p className="font-inter text-[10px] text-gold-400 tracking-wider uppercase">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm transition-all ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-400 font-semibold border border-gold-500/30'
                    : 'text-cream/60 hover:text-cream hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl glass-admin text-xs text-cream/70 hover:text-gold-400 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink size={14} />
        </a>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-xs">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-inter text-xs font-semibold text-cream truncate">Administrator</p>
            <p className="font-inter text-[10px] text-cream/40 truncate">admin@sangeesri.com</p>
          </div>
          <button className="text-cream/40 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
