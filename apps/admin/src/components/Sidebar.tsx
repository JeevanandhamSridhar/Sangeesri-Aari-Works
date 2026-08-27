'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { VideoLogo } from '@/components/ui/VideoLogo'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  Calendar,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Newspaper,
  UserCheck,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Quotations', href: '/quotations', icon: FileText },
  { label: 'Blogspot Daily Updates', href: '/blog', icon: Newspaper },
  { label: 'About Page CMS', href: '/about-cms', icon: UserCheck },
  { label: 'Academy Students', href: '/academy/students', icon: GraduationCap },
  { label: 'Academy Courses', href: '/academy/courses', icon: BookOpen },
  { label: 'Appointments', href: '/appointments', icon: Calendar },
  { label: 'Gallery', href: '/gallery', icon: ImageIcon },
  { label: 'Reviews', href: '/reviews', icon: MessageSquare },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-[#0e0a07] text-cream">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <VideoLogo size="md" showText={true} />
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cream hover:text-gold-400"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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
      <div className="p-4 border-t border-white/5 space-y-3 bg-[#0e0a07]">
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
          <button className="text-cream/40 hover:text-red-400 transition-colors" suppressHydrationWarning>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-gold-500/15 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
