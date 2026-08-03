'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'

const faqs = [
  {
    q: 'How do I place a custom Aari blouse order?',
    a: 'You can browse our Design Gallery or Works page, click "Inquire Quote on WhatsApp" or fill out the quotation form with your blouse reference picture. Our lead artisan Kaviya S will consult with you on thread work, stone choices, and exact measurements.',
  },
  {
    q: 'How long does a bridal Aari blouse take to complete?',
    a: 'Standard Aari embroidery blouses take 3–5 working days. Heavy bridal zardosi & kundan designs take 5–8 days. Express 48-hour delivery is also available upon request.',
  },
  {
    q: 'What is the starting price for Aari embroidery work?',
    a: 'Basic neck & sleeve thread work starts from ₹1,500. Heavy bridal blouses range from ₹3,500 to ₹12,000 depending on stone work, zardosi, and pattern complexity.',
  },
  {
    q: 'Can I order raw Aari materials & tools from your shop?',
    a: 'Yes! We sell premium Aari needles, silk thread reels, gold zari, round embroidery frames, and beginner kits directly on our website with shipping across India.',
  },
  {
    q: 'Where is your studio located?',
    a: 'Our studio SS Collection is located at No. 6, Bazaar Street, Kaveripakkam, Ranipet District, Tamil Nadu — PIN 632508. You can also get direct directions using the Google Maps section on our home page.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-3xl">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">
            <HelpCircle size={12} />
            Got Questions?
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cream">Frequently Asked </span>
            <span className="text-gradient-gold">Questions</span>
          </h1>
          <p className="font-inter text-cream/50 text-sm">
            Everything you need to know about custom Aari embroidery, orders, pricing, and delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="glass-dark rounded-2xl border border-white/5 overflow-hidden transition-all">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-playfair font-semibold text-cream text-lg">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gold-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-0 font-inter text-sm text-cream/60 leading-relaxed border-t border-white/5"
                    >
                      <div className="pt-3">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
