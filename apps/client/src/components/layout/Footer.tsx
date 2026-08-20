import Link from 'next/link'
import { Phone, MapPin, Mail, Instagram } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const footerLinks = {
  Services: [
    { label: 'Aari Work', href: '/services#aari-work' },
    { label: 'Bridal Blouse Design', href: '/services#bridal' },
    { label: 'Designer Blouses', href: '/services#designer' },
    { label: 'Tailoring', href: '/services#tailoring' },
    { label: 'Custom Design', href: '/collections/custom' },
    { label: 'Express Orders', href: '/services#express' },
  ],
  Collections: [
    { label: 'Bridal Collection', href: '/collections/bridal' },
    { label: 'Designer Collection', href: '/collections/designer' },
    { label: 'Traditional', href: '/collections/traditional' },
    { label: 'Modern Collection', href: '/collections/modern' },
    { label: 'Stone Work', href: '/collections/stone' },
    { label: 'Maggam Work', href: '/collections/maggam' },
  ],
  Shop: [
    { label: 'Aari Materials', href: '/shop' },
    { label: 'Aari Needles', href: '/shop?category=needles' },
    { label: 'Embroidery Thread', href: '/shop?category=thread' },
    { label: 'Frames & Hoops', href: '/shop?category=frames' },
    { label: 'Fabric', href: '/shop?category=fabric' },
    { label: 'Tool Kits', href: '/shop?category=kits' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Works & Posters', href: '/blog' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-[#060402] border-t border-gold-500/10 overflow-hidden">
      {/* Mesh gradient bg */}
      <div className="absolute inset-0 bg-mesh-gold opacity-40 pointer-events-none" />

      {/* Main Footer */}
      <div className="container-luxury py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="font-playfair text-3xl font-bold text-gradient-gold">
                Sangee Sri
              </div>
              <div className="font-cormorant text-sm tracking-[0.4em] text-gold-400/60 uppercase mt-1">
                Aari Works
              </div>
            </Link>

            <p className="font-inter text-sm text-cream/50 leading-relaxed mb-6 max-w-xs">
              Crafting exquisite Aari work & bridal blouses with love and precision since 2019. 
              Your dream design, brought to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="https://wa.me/917604887356"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold-400 transition-colors group"
                target="_blank"
              >
                <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <FaWhatsapp size={14} className="text-green-400" />
                </div>
                +91 76048 87356
              </a>

              <a
                href="tel:+917604887356"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Phone size={14} className="text-gold-400" />
                </div>
                +91 76048 87356
              </a>

              <div className="flex items-start gap-3 text-sm text-cream/60">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gold-400" />
                </div>
                <span>
                  No. 6, Bazaar Street, Kaveripakkam<br />
                  Ranipet District — 632 508
                </span>
              </div>
            </div>

            {/* Social Links — Instagram & WhatsApp */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/sangeesri_aari_works"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-inter text-xs font-semibold shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <Instagram size={16} />
                <span>@sangeesri_aari_works</span>
              </a>

              <a
                href="https://wa.me/917604887356"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Studio"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-inter text-xs font-semibold shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <FaWhatsapp size={16} />
                <span>WhatsApp Studio (+91 76048 87356)</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-playfair text-sm font-semibold text-gold-400 tracking-widest uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter text-sm text-cream/50 hover:text-gold-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-gold-500 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-3xl glass-gold p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gradient-gold mb-2">
              Ready to Create Your Dream Design?
            </h3>
            <p className="font-inter text-sm text-cream/60">
              Book a free consultation today. WhatsApp us your reference images.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/917604887356?text=Hi! I'd like to book a design consultation."
              className="btn-luxury"
              target="_blank"
            >
              <FaWhatsapp size={16} />
              Chat on WhatsApp
            </a>
            <Link href="/quotation" className="btn-outline-gold">
              Get Quotation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 relative z-10">
        <div className="container-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-cream/30">
            © {new Date().getFullYear()} Sangee Sri Aari Works. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="font-inter text-xs text-cream/30 hover:text-gold-400 transition-colors"
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
