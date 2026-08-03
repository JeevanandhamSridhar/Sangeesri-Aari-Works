'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export function QuotationCTA() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Full background: Aari blouse image at low opacity */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80"
          alt="Aari worked blouse background"
          fill
          className="object-cover"
          priority={false}
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-darkbase/88" />
        {/* Subtle gold gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0c02]/70 via-darkbase/50 to-[#0a0806]/80" />
        <div className="absolute inset-0 bg-mesh-gold opacity-15" />
      </div>

      {/* Top / bottom gold lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="section-label justify-center mb-6">
            <Sparkles size={12} />
            Start Your Journey
            <Sparkles size={12} />
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-cream">Ready to Create Your</span>
            <br />
            <span className="text-gradient-gold-animated">Dream Design?</span>
          </h2>

          <p className="font-cormorant text-xl md:text-2xl text-cream/60 leading-relaxed mb-10">
            From a simple idea to an exquisite masterpiece — tell us your vision and we'll
            craft it with love. 3 Minute Free consultation. No commitment.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quotation" className="btn-luxury text-sm group">
              Get Free Quotation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/book-appointment" className="btn-outline-gold text-sm">
              Book Appointment
            </Link>

            <a
              href="https://wa.me/917604887356?text=Hi! I'd like to discuss a design."
              className="flex items-center gap-2 text-sm font-inter font-semibold text-green-400 hover:text-green-300 transition-colors"
              target="_blank"
            >
              <FaWhatsapp size={18} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: '✦', text: '700+ Happy Customers' },
              { icon: '✦', text: 'No. 6, Bazaar Street, Kaveripakkam' },
              { icon: '✦', text: 'Quality Guaranteed' },
              { icon: '✦', text: 'Express Orders Available' },
            ].map((badge) => (
              <span key={badge.text} className="font-inter text-sm text-cream/40 flex items-center gap-2">
                <span className="text-gold-500/40 text-xs">{badge.icon}</span>
                {badge.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
