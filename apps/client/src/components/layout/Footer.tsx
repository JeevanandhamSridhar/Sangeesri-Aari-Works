'use client'

import Link from 'next/link'
import { Phone, MapPin, Instagram, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { VideoLogo } from '@/components/ui/VideoLogo'

const footerLinks = {
  Services: [
    { label: 'Aari Embroidery Work', href: '/services#aari-work' },
    { label: 'Bridal Blouse Design', href: '/services#bridal' },
    { label: 'Designer Cutwork', href: '/services#designer' },
    { label: 'Tailoring & Fitting', href: '/services#tailoring' },
    { label: 'Custom Saree Matching', href: '/collections/custom' },
    { label: 'Express Order Slots', href: '/services#express' },
  ],
  Collections: [
    { label: 'Bridal Collection', href: '/collections/bridal' },
    { label: 'Designer Cutwork', href: '/collections/designer' },
    { label: 'Traditional Motifs', href: '/collections/traditional' },
    { label: 'Modern Patterns', href: '/collections/modern' },
    { label: 'Stone & Pearl Work', href: '/collections/stone' },
    { label: 'Maggam & Zardosi', href: '/collections/maggam' },
  ],
  Shop: [
    { label: 'Aari Materials Shop', href: '/shop' },
    { label: 'Aari Needles', href: '/shop?category=needles' },
    { label: 'Silk Threads', href: '/shop?category=thread' },
    { label: 'Embroidery Frames', href: '/shop?category=frames' },
    { label: 'Velvet & Raw Silk', href: '/shop?category=fabric' },
    { label: 'Beginner Tool Kits', href: '/shop?category=kits' },
  ],
  Company: [
    { label: 'About Kaviya S', href: '/about' },
    { label: 'Design Gallery', href: '/gallery' },
    { label: 'Academy Courses', href: '/academy' },
    { label: 'Blogspot Daily Updates', href: '/blog' },
    { label: 'Customer Wishlist', href: '/account/wishlist' },
    { label: 'Contact Studio', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-[#050302] border-t border-gold-500/20 overflow-hidden">
      {/* Dynamic ambient background mesh glow */}
      <div className="absolute inset-0 bg-mesh-gold opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="container-luxury py-16 md:py-20 relative z-10 space-y-16">
        
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 items-start">

          {/* ── Brand & Interactive Contact Column (2 Cols) ───────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Official Brand Logo matching Navbar */}
            <Link href="/" className="inline-block group">
              <VideoLogo size="lg" showText={true} />
            </Link>

            <p className="font-inter text-xs sm:text-sm text-cream/60 leading-relaxed max-w-sm">
              Crafting exquisite Aari work &amp; bridal blouses with generations of needlecraft heritage in Kaveripakkam. Your dream bridal design, tailored to perfection.
            </p>

            {/* ── Interactive Contact Cards ─────────────────────────────────── */}
            <div className="space-y-3 pt-1">
              {/* WhatsApp Direct Item */}
              <a
                href="https://wa.me/917604887356?text=Hi%20Sangee%20Sri%20Aari%20Works!%20I%20want%20to%20inquire%20about%20bridal%20blouse%20embroidery."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:bg-green-500 group-hover:text-darkbase transition-all duration-300 shrink-0">
                    <FaWhatsapp size={18} />
                  </div>
                  <div>
                    <span className="font-inter text-[10px] text-cream/40 block uppercase tracking-wider font-semibold">WhatsApp Studio</span>
                    <span className="font-mono text-xs font-bold text-cream group-hover:text-green-400 transition-colors">+91 76048 87356</span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-cream/30 group-hover:text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              {/* Direct Call Item */}
              <a
                href="tel:+917604887356"
                className="group flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-darkbase transition-all duration-300 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="font-inter text-[10px] text-cream/40 block uppercase tracking-wider font-semibold">Call Studio Direct</span>
                    <span className="font-mono text-xs font-bold text-cream group-hover:text-gold-400 transition-colors">+91 76048 87356</span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-cream/30 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </a>

              {/* Physical Studio Address Item */}
              <a
                href="https://maps.google.com/?q=No+6+Bazaar+Street+Kaveripakkam+Ranipet+632508"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-darkbase transition-all duration-300 shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="font-inter text-[10px] text-cream/40 block uppercase tracking-wider font-semibold mb-0.5">Studio Location</span>
                    <span className="font-inter text-xs text-cream/80 leading-snug block group-hover:text-cream transition-colors">
                      No. 6, Bazaar Street, Kaveripakkam<br />
                      Ranipet District — 632 508, Tamil Nadu
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-cream/30 group-hover:text-gold-400 group-hover:scale-110 transition-all duration-300 shrink-0 mt-1" />
              </a>
            </div>

            {/* ── Social Action Buttons (Instagram & WhatsApp Studio) ──────── */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="https://www.instagram.com/sangeesri_aari_works"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Page"
                className="relative overflow-hidden group px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-inter text-xs font-bold shadow-lg hover:shadow-[0_0_30px_rgba(225,48,108,0.5)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Instagram size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>@sangeesri_aari_works</span>
              </a>

              <a
                href="https://wa.me/917604887356"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Studio"
                className="relative overflow-hidden group px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-inter text-xs font-bold shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={16} className="group-hover:scale-110 transition-transform duration-300" />
                <span>WhatsApp Studio</span>
              </a>
            </div>
          </div>

          {/* ── Nav Columns (4 Cols) ───────────────────────────────────────── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-playfair text-xs font-bold text-gold-400 tracking-widest uppercase pb-2 border-b border-gold-500/20">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-xs text-cream/50 hover:text-gold-400 transition-all duration-300 flex items-center gap-2 group py-0.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30 group-hover:bg-gold-400 group-hover:scale-125 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom Sub-Footer ────────────────────────────────────────────── */}
      <div className="border-t border-white/5 py-6 relative z-10 bg-[#030201]">
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-cream/40 text-center sm:text-left">
            © {new Date().getFullYear()} Sangee Sri Aari Works — Kaveripakkam, Ranipet. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="font-inter text-xs text-cream/40 hover:text-gold-400 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
