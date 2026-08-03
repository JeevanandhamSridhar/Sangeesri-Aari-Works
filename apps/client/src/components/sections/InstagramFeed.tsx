'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, ExternalLink, Play, AlertCircle, RefreshCw } from 'lucide-react'

// ─── IMPORTANT: How to get your Behold Feed ID ────────────────────────────────
// 1. Log in to https://behold.so
// 2. Click "Sources" in the left sidebar
// 3. Click your Instagram source
// 4. Copy the "Feed ID" shown on the source page (NOT the share link)
// 5. Replace BEHOLD_FEED_ID below with that value
//
// Feed ID confirmed from Behold dashboard embed code
// ─────────────────────────────────────────────────────────────────────────────
const BEHOLD_FEED_ID = 'K3iA5eJMWNjRWoRP7StO'

export function InstagramFeed() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [feedError, setFeedError] = useState(false)
  const [feedLoaded, setFeedLoaded] = useState(false)

  // Load Behold widget using the official embed script pattern
  useEffect(() => {
    if (!isInView) return
    try {
      const w = window as Window & { __bhldScript?: boolean }
      if (w.__bhldScript) { setFeedLoaded(true); return }
      w.__bhldScript = true
      const d = document
      const s = d.createElement('script')
      s.type = 'module'
      s.src = 'https://w.behold.so/widget.js'
      s.onload = () => setFeedLoaded(true)
      s.onerror = () => setFeedError(true)
      setTimeout(() => { d.head.append(s) }, 0)
    } catch {
      setFeedError(true)
    }
  }, [isInView])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060402]" />
      <div className="absolute inset-0 bg-mesh-gold opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="section-label mb-4">
              <Instagram size={12} />
              Live Feed
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              <span className="text-cream">Our </span>
              <span className="text-gradient-gold">Instagram Reels</span>
            </h2>
            <p className="font-inter text-sm text-cream/50 mt-3 max-w-md">
              Watch our latest Aari work in action — live from our Instagram feed.
            </p>
          </div>

          <motion.a
            href="https://www.instagram.com/sangeesri_aari_works"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 btn-outline-gold text-sm shrink-0 group"
          >
            <Instagram size={15} />
            Follow on Instagram
            <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Behold Widget or fallback */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden border border-white/5 min-h-[200px] relative"
        >
          {feedError ? (
            // Error state
            <div className="flex flex-col items-center justify-center py-16 gap-4 glass">
              <AlertCircle size={36} className="text-cream/30" />
              <p className="font-inter text-sm text-cream/50 text-center max-w-sm">
                Could not load Instagram feed. Please verify the Feed ID in your Behold dashboard.
              </p>
              <a
                href="https://behold.so"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 btn-outline-gold text-xs"
              >
                <RefreshCw size={12} /> Open Behold Dashboard
              </a>
            </div>
          ) : (
            /* Behold embed widget */
            // @ts-ignore — custom element
            <behold-widget feed-id={BEHOLD_FEED_ID} />
          )}
        </motion.div>

        {/* Play hint */}
        {!feedError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 mt-6 text-cream/30"
          >
            <Play size={12} className="fill-current" />
            <span className="font-inter text-xs tracking-widest uppercase">Click any reel to watch</span>
            <Play size={12} className="fill-current" />
          </motion.div>
        )}
      </div>
    </section>
  )
}
