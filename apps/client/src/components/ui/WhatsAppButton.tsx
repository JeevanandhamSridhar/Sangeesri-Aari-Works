'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { MessageCircle, X, Phone, Send, Map } from 'lucide-react'
import { useState } from 'react'

const quickActions = [
  {
    label: 'Book Appointment',
    icon: Phone,
    message: "Hi! I'd like to book a design consultation appointment.",
    color: '#D4AF37',
  },
  {
    label: 'Get Quotation',
    icon: Send,
    message: "Hi! I'd like to get a quotation for Aari work / blouse design.",
    color: '#B76E79',
  },
  {
    label: 'Send Design Reference',
    icon: MessageCircle,
    message: "Hi! I'd like to share a reference design for my blouse.",
    color: '#5C1A1A',
  },
  {
    label: 'Get Directions',
    icon: Map,
    message: 'Hi! Can you share the location/directions to your studio?',
    color: '#8f6e0d',
  },
]

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const baseUrl = 'https://wa.me/917604887356?text='

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Quick Actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="flex flex-col gap-2 mb-2"
          >
            {/* Header card */}
            <div className="glass-dark rounded-2xl p-4 border border-green-500/20 max-w-xs">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <FaWhatsapp size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-playfair text-sm font-semibold text-cream">Sangee Sri Aari Works</p>
                  <p className="font-inter text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <p className="font-inter text-xs text-cream/50">
                Hi! How can we help you today? Choose a quick option below or send a message. 👋
              </p>
            </div>

            {/* Quick action buttons */}
            {quickActions.map((action, i) => (
              <motion.a
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                href={`${baseUrl}${encodeURIComponent(action.message)}`}
                target="_blank"
                className="glass-dark rounded-xl px-4 py-3 border border-white/10 hover:border-green-500/30 flex items-center gap-3 transition-all duration-300 group max-w-xs"
              >
                <action.icon
                  size={16}
                  className="shrink-0 transition-colors group-hover:text-green-400"
                  style={{ color: action.color }}
                />
                <span className="font-inter text-sm text-cream/70 group-hover:text-cream transition-colors">
                  {action.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-luxury transition-all duration-300"
        style={{ background: open ? '#1a1a1a' : 'linear-gradient(135deg, #25D366, #128C7E)' }}
        aria-label="WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-cream" />
            </motion.div>
          ) : (
            <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FaWhatsapp size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-green-500/30" />
        )}
      </motion.button>
    </div>
  )
}
