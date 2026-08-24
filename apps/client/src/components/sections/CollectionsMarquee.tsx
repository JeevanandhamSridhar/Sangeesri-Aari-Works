'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const items = [
  { label: 'Aari Work', image: '/gallery/0021292954d624910413c938e24cf6eb.jpg' },
  { label: 'Bridal Blouses', image: '/gallery/6f817a312dab16b83919340a31c8f863.jpg' },
  { label: 'Maggam Work', image: '/gallery/28e8741d4e77e7232c4e239fd3c61d72.jpg' },
  { label: 'Stone Work', image: '/gallery/1188aeced112589e8ef70312c5f94ca6.jpg' },
  { label: 'Zardosi', image: '/gallery/3c5193ce7c639a340f1917dea3d31a26.jpg' },
  { label: 'Silk Blouses', image: '/gallery/715fa9a303a97a6886ac5dfc44249237.jpg' },
  { label: 'Thread Embroidery', image: '/gallery/634f4eedaea0edfaf805bef91ac2f3d1.jpg' },
  { label: 'Cutwork Designs', image: '/gallery/532a7fed4e07f55b76ad497abe48dddb.jpg' },
  { label: 'Kasu Work', image: '/gallery/52cada781684790f15b4e91021e86168.jpg' },
  { label: 'Wedding Blouses', image: '/gallery/88d922362499a71835583f04df9bf97a.jpg' },
  { label: 'Reception Wear', image: '/gallery/926fc3692dcb38a0ab85a87fc609da50.jpg' },
  { label: 'Traditional Designs', image: '/gallery/8af03220e9565478d9caad7c7213ad5b.jpg' },
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

