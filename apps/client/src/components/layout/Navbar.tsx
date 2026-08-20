'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, Phone, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { VideoLogo } from '@/components/ui/VideoLogo'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Collections',
    href: '/collections',
    submenu: [
      { label: 'Bridal Collection', href: '/collections/bridal' },
      { label: 'Designer Blouses', href: '/collections/designer' },
      { label: 'Traditional', href: '/collections/traditional' },
      { label: 'Modern Collection', href: '/collections/modern' },
      { label: 'Custom Design', href: '/collections/custom' },
    ],
  },
  { label: 'Academy', href: '/academy' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Works & Posters', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))

  const [studioStatus, setStudioStatus] = useState<{
    badgeText: string
    note: string
    color: string
    dotColor: string
  }>({
    badgeText: '🟢 Taking New Orders',
    note: 'Slots open for upcoming wedding season orders',
    color: 'emerald',
    dotColor: '#10b981',
  })

  useEffect(() => {
    fetch('/api/studio-status')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.badgeText) {
          setStudioStatus(data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top Studio Order Availability Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0c0805] border-b border-gold-500/10 py-1.5 px-4 text-center font-inter text-xs text-cream/70 flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gold-500/10 border border-gold-500/20 text-gold-400">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: studioStatus.dotColor || '#10b981' }} />
          {studioStatus.badgeText}
        </span>
        {studioStatus.note && (
          <span className="hidden sm:inline text-cream/50 text-[11px] border-l border-white/10 pl-3">
            {studioStatus.note}
          </span>
        )}
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-7 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-dark shadow-luxury border-b border-gold-500/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <VideoLogo size="md" showText={true} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'relative flex items-center gap-1 px-4 py-2 text-sm font-inter font-medium tracking-wide transition-colors duration-200',
                      pathname === link.href
                        ? 'text-gold-400'
                        : 'text-cream/70 hover:text-gold-400'
                    )}
                  >
                    {pathname === link.href && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-gold-500/10 border border-gold-500/20"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {link.submenu && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'relative z-10 transition-transform duration-200',
                          activeDropdown === link.label ? 'rotate-180' : ''
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.submenu && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 mt-2 w-56 glass-dark rounded-2xl border border-gold-500/15 overflow-hidden shadow-luxury"
                      >
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-cream/70 hover:text-gold-400 hover:bg-gold-500/5 transition-all duration-200 border-b border-white/5 last:border-0"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold-500/50" />
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="tel:+917604887356"
                className="hidden md:flex items-center gap-2 btn-outline-gold py-2.5 px-5 text-xs"
              >
                <Phone size={14} />
                Book Now
              </Link>

              <Link
                href="/account/wishlist"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-gold-500/30 text-cream/60 hover:text-gold-400 transition-all duration-300"
              >
                <Heart size={18} />
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-gold-500/30 text-cream/60 hover:text-gold-400 transition-all duration-300"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #B76E79)', color: '#0A0806' }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-gold-500/30 text-cream/60 hover:text-gold-400 transition-all duration-300"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-darkbase/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 glass-dark border-l border-gold-500/10 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="font-playfair text-xl text-gradient-gold">Sangee Sri Aari Works</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-cream/60" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl font-inter font-medium transition-all duration-200',
                        pathname === link.href
                          ? 'text-gold-400 bg-gold-500/10 border border-gold-500/20'
                          : 'text-cream/70 hover:text-gold-400 hover:bg-white/5'
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50" />
                      {link.label}
                    </Link>
                    {link.submenu && (
                      <div className="ml-6 mt-1 space-y-1">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-cream/50 hover:text-gold-400 rounded-lg transition-all duration-200"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold-500/30" />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="p-6 border-t border-white/5 space-y-3">
                <Link href="tel:+917604887356" className="btn-luxury w-full justify-center">
                  <Phone size={16} />
                  Book Consultation
                </Link>
                <Link
                  href="https://wa.me/917604887356"
                  className="btn-outline-gold w-full justify-center"
                  target="_blank"
                >
                  WhatsApp Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
