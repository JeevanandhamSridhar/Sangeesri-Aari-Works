'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X, Sparkles } from 'lucide-react'

interface VideoLogoProps {
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  className?: string
  showText?: boolean
}

export function VideoLogo({
  src = '/video-logo.mp4',
  size = 'md',
  className = '',
  showText = true,
}: VideoLogoProps) {
  const [hasVideoError, setHasVideoError] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [])

  const sizeClasses = {
    sm: 'w-9 h-9 rounded-full',
    md: 'w-11 h-11 rounded-full',
    lg: 'w-16 h-16 rounded-2xl',
    hero: 'w-28 h-28 sm:w-36 sm:h-36 rounded-full',
  }

  return (
    <>
      <div className={`flex items-center gap-3.5 ${className}`}>
        {/* Animated Video Container */}
        <div
          onClick={() => setModalOpen(true)}
          className={`relative ${sizeClasses[size]} shrink-0 overflow-hidden border-2 border-gold-500/50 shadow-gold group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-gold-400`}
          style={{
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2)',
          }}
        >
          {!hasVideoError ? (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setHasVideoError(true)}
              className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
            >
              <source src="/video-logo.mp4" type="video/mp4" />
              <source src="/hero-logo.mp4.mp4" type="video/mp4" />
              <source src="/hero-logo.mp4" type="video/mp4" />
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            /* Fallback Monogram */
            <div className="w-full h-full bg-gradient-to-br from-gold-400 via-gold-600 to-maroon-950 flex items-center justify-center font-playfair font-bold text-darkbase shadow-inner relative overflow-hidden">
              <span className={size === 'hero' ? 'text-4xl' : size === 'lg' ? 'text-2xl' : 'text-base'}>
                S
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          )}

          {/* Glowing Ring Animation */}
          <div className="absolute inset-0 rounded-full border border-gold-400/40 group-hover:border-gold-300 transition-colors pointer-events-none" />
          <div className="absolute inset-0 rounded-full animate-ping bg-gold-500/10 pointer-events-none" />

          {/* Quick Expand Hint on Hover */}
          <div className="absolute inset-0 bg-darkbase/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <Maximize2 size={size === 'hero' ? 24 : 16} className="text-gold-300" />
          </div>
        </div>

        {/* Brand Text */}
        {showText && (
          <div>
            <span className="font-playfair text-lg font-bold tracking-tight text-cream block leading-none">
              Sangee Sri
            </span>
            <span className="font-inter text-[10px] font-semibold tracking-[0.2em] text-gradient-gold uppercase block mt-1">
              Admin Portal
            </span>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-darkbase/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-3xl w-full glass-gold rounded-4xl overflow-hidden p-6 md:p-8 border border-gold-500/40 text-center space-y-6 shadow-luxury"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-gold-400 font-inter text-xs font-semibold uppercase tracking-wider">
                  <Sparkles size={16} /> Sangee Sri Aari Works — Official Brand Video
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-10 h-10 rounded-full glass border border-gold-500/30 flex items-center justify-center text-cream/70 hover:text-gold-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-gold-500/20 shadow-2xl group">
                <video autoPlay loop controls playsInline className="w-full h-full object-cover">
                  <source src="/video-logo.mp4" type="video/mp4" />
                  <source src="/hero-logo.mp4.mp4" type="video/mp4" />
                  <source src="/hero-logo.mp4" type="video/mp4" />
                </video>
              </div>

              <div className="flex items-center justify-between font-inter text-xs text-cream/60 pt-2">
                <span>📍 Studio: Kaveripakkam, Ranipet</span>
                <span className="text-gold-400 font-semibold">✨ Admin Control System</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
