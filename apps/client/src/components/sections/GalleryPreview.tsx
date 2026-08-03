'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const galleryItems = [
  { id: 1, src: 'https://picsum.photos/seed/g1/600/700', category: 'Bridal', title: 'Royal Gold Bridal Blouse' },
  { id: 2, src: 'https://picsum.photos/seed/g2/600/800', category: 'Aari Work', title: 'Traditional Maggam Design' },
  { id: 3, src: 'https://picsum.photos/seed/g3/700/600', category: 'Designer', title: 'Modern Stone Work' },
  { id: 4, src: 'https://picsum.photos/seed/g4/600/700', category: 'Zardosi', title: 'Zardosi Embroidery' },
  { id: 5, src: 'https://picsum.photos/seed/g5/600/800', category: 'Bridal', title: 'Silk Wedding Blouse' },
  { id: 6, src: 'https://picsum.photos/seed/g6/700/700', category: 'Traditional', title: 'Temple Motif Design' },
]

export function GalleryPreview() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-darkbase relative overflow-hidden">
      <div className="absolute inset-0 pattern-embroidery" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-4"
            >
              Our Portfolio
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-4xl md:text-5xl font-bold"
            >
              <span className="text-cream">Our </span>
              <span className="text-gradient-gold">Creations</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/gallery" className="btn-luxury text-sm group">
              View Full Gallery
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer ${
                i === 0 || i === 3 ? 'row-span-2 aspect-[4/5]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkbase/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="badge-gold text-[10px]">{item.category}</span>
              </div>

              {/* Info on hover */}
              <div className="absolute bottom-0 inset-x-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-playfair text-base font-semibold text-cream mb-1">{item.title}</p>
                <div className="flex items-center gap-1 text-gold-400 text-xs font-inter">
                  <ExternalLink size={12} /> View Design
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-3xl border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
