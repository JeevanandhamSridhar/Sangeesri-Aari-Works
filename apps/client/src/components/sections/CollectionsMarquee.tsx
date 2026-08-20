'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const items = [
  { label: 'Aari Work', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=120&q=80' },
  { label: 'Bridal Blouses', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=120&q=80' },
  { label: 'Maggam Work', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=120&q=80' },
  { label: 'Stone Work', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?auto=format&fit=crop&w=120&q=80' },
  { label: 'Zardosi', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=120&q=80' },
  { label: 'Silk Blouses', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=120&q=80' },
  { label: 'Thread Embroidery', image: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?auto=format&fit=crop&w=120&q=80' },
  { label: 'Tailoring', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=120&q=80' },
  { label: 'Custom Designs', image: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?auto=format&fit=crop&w=120&q=80' },
  { label: 'Wedding Blouses', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=120&q=80' },
  { label: 'Reception Wear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?auto=format&fit=crop&w=120&q=80' },
  { label: 'Traditional Designs', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=120&q=80' },
]

function MarqueeRow() {
  const tripled = [...items, ...items, ...items]
  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        animate={{ x: '-33.33%' }}
        initial={{ x: '0%' }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex gap-0 shrink-0"
      >
        {tripled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-1 group cursor-default"
          >
            {/* Thumbnail */}
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-gold-500/25
              group-hover:border-gold-500/60 transition-all duration-300 shrink-0 bg-stone-900">
              <Image
                src={item.image}
                alt={item.label}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
            {/* Label */}
            <span className="font-cormorant text-base font-medium text-cream/70 group-hover:text-gold-400 transition-colors whitespace-nowrap">
              {item.label}
            </span>
            {/* Separator */}
            <span className="text-gold-500/30 text-xs ml-3 font-serif">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function CollectionsMarquee() {
  return (
    <div className="relative py-4 bg-[#0d0804] border-y border-gold-500/15 overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0d0804] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0d0804] to-transparent z-10 pointer-events-none" />

      {/* Single Marquee Row */}
      <MarqueeRow />
    </div>
  )
}

