'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Navigation } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! We will respond shortly.')
  }

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} /> Kaveripakkam Studio <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Visit Or </span>
            <span className="text-gradient-gold">Contact Us</span>
          </h1>
          <p className="font-inter text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            We love welcoming brides and embroidery lovers to our Kaveripakkam design studio. Drop by or reach out online!
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-gold rounded-3xl p-8 border border-gold-500/20 space-y-6">
              <h2 className="font-playfair text-2xl font-bold text-cream mb-4">Studio Details</h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-inter text-sm font-semibold text-cream">Studio Address</h3>
                  <p className="font-inter text-xs text-cream/70 mt-1 leading-relaxed">
                    Sangee Sri Aari Works<br />
                    Banavaram Road, Kaveripakkam,<br />
                    Ranipet District, Tamil Nadu — 632508
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 shrink-0">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <h3 className="font-inter text-sm font-semibold text-cream">WhatsApp & Phone</h3>
                  <p className="font-inter text-xs text-gold-400 font-semibold mt-1">
                    +91 76048 87356
                  </p>
                  <span className="font-inter text-[11px] text-cream/40">Available 9:00 AM - 9:00 PM (Mon-Sun)</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-inter text-sm font-semibold text-cream">Opening Hours</h3>
                  <p className="font-inter text-xs text-cream/70 mt-1">
                    Monday — Sunday: 9:00 AM to 8:30 PM
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Kaveripakkam+Banavaram+Road"
                target="_blank"
                rel="noreferrer"
                className="btn-luxury w-full justify-center text-xs py-3 mt-4"
              >
                <Navigation size={14} /> Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Quick Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} data-lenis-prevent className="glass rounded-3xl p-8 md:p-10 border border-white/10 space-y-6">
              <h2 className="font-playfair text-2xl font-bold text-cream mb-2">Send Us A Message</h2>
              <p className="font-inter text-xs text-cream/50 mb-6">
                Have a question about blouse designing, materials, or delivery timelines? Write to us directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Your Name *</label>
                  <input type="text" required data-lenis-prevent placeholder="Name" className="input-luxury" />
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Phone / WhatsApp *</label>
                  <input type="tel" required data-lenis-prevent placeholder="Phone" className="input-luxury" />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 mb-2 block">Subject</label>
                <input type="text" data-lenis-prevent placeholder="e.g. Bridal Blouse Inquiry / Material Order" className="input-luxury" />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 mb-2 block">Your Message *</label>
                <textarea rows={4} required data-lenis-prevent placeholder="Write your message here..." className="input-luxury" />
              </div>

              <button type="submit" className="btn-luxury w-full justify-center py-4 text-sm">
                <Send size={16} /> Send Direct Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
