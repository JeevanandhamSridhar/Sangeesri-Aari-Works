'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

export function LocationMap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-[#060402]">
      <div className="absolute inset-0 bg-mesh-gold opacity-15" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="section-label justify-center mb-4">
            <MapPin size={12} />
            Find Us
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold">
            <span className="text-cream">Visit Our </span>
            <span className="text-gradient-gold">Studio</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 rounded-3xl overflow-hidden border border-gold-500/20
              shadow-[0_0_40px_rgba(212,175,55,0.07)]"
          >
            <div className="relative h-80 md:h-[420px]">
              <iframe
                title="Sangee Sri Aari Works Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234!2d79.4591371!3d12.9024993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52b1501f0e8bcd%3A0x58f1b736a2b05af4!2sSangee%20Sri%20aari%20works!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.85)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-gold rounded-3xl p-7 border border-gold-500/20 space-y-6"
          >
            <div>
              <h3 className="font-playfair text-xl font-bold text-cream mb-1">Sangee Sri Aari Works</h3>
              <p className="font-inter text-xs text-gold-400 tracking-widest uppercase">SS Collection Studio</p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-gold-400" />
                </div>
                <div>
                  <p className="font-inter text-xs text-cream/40 mb-1">Address</p>
                  <p className="font-inter text-sm text-cream/80 leading-relaxed">
                    No. 6, Bazaar Street<br />
                    Kaveripakkam, Ranipet District<br />
                    Tamil Nadu — 632 508
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-gold-400" />
                </div>
                <div>
                  <p className="font-inter text-xs text-cream/40 mb-1">Phone</p>
                  <a
                    href="tel:+917604887356"
                    className="font-inter text-sm text-cream/80 hover:text-gold-400 transition-colors"
                  >
                    +91 76048 87356
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Clock size={15} className="text-gold-400" />
                </div>
                <div>
                  <p className="font-inter text-xs text-cream/40 mb-1">Working Hours</p>
                  <p className="font-inter text-sm text-cream/80">Mon – Sat: 9 AM – 8 PM</p>
                  <p className="font-inter text-xs text-cream/40">Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir//Sangee+Sri+aari+works,+SS+collection,+6,+bazaar+street,+Kaveripakkam,+Tamil+Nadu+632508/@12.9024993,79.4591371,14z"
              target="_blank"
              rel="noreferrer"
              className="btn-luxury w-full justify-center text-sm group"
            >
              <MapPin size={14} />
              Get Directions
              <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
