'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const items = [
  { label: 'Aari Work', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=120&q=80' },
  { label: 'Bridal Blouses', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=120&q=80' },
  { label: 'Maggam Work', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=120&q=80' },
  { label: 'Stone Work', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&q=80' },
  { label: 'Zardosi', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=120&q=80' },
  { label: 'Silk Blouses', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=120&q=80' },
  { label: 'Thread Embroidery', image: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?w=120&q=80' },
  { label: 'Tailoring', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=120&q=80' },
  { label: 'Custom Designs', image: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=120&q=80' },
  { label: 'Wedding Blouses', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=120&q=80' },
  { label: 'Reception Wear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=120&q=80' },
  { label: 'Traditional Designs', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=120&q=80' },
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? '0%' : '-50%' }}
        initial={{ x: reverse ? '-50%' : '0%' }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex gap-0 shrink-0"
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5 py-2 group cursor-default"
          >
            {/* Thumbnail */}
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-gold-500/20
              group-hover:border-gold-500/50 transition-all duration-300 shrink-0">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-darkbase/30" />
            </div>
            {/* Label */}
            <span className="font-cormorant text-base font-medium text-cream/50 group-hover:text-gold-400 transition-colors whitespace-nowrap">
              {item.label}
            </span>
            {/* Separator */}
            <span className="text-gold-500/20 text-sm ml-2">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function CollectionsMarquee() {
  return (
    <div className="relative py-5 bg-[#0d0804] border-y border-gold-500/10 overflow-hidden space-y-2">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0d0804] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0d0804] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — scrolls left */}
      <MarqueeRow reverse={false} />
      {/* Row 2 — scrolls right */}
      <MarqueeRow reverse={true} />
    </div>
  )
}
