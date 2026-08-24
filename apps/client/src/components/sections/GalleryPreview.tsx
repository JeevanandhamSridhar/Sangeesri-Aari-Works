'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Hash, Sparkles } from 'lucide-react'
import { galleryDesigns as initialGalleryDesigns, GalleryDesign } from '@/data/galleryData'

export function GalleryPreview() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [designs, setDesigns] = useState<GalleryDesign[]>(initialGalleryDesigns)

  // Load custom admin-saved gallery items if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ssaw_admin_gallery_designs')
      if (saved) {
        setDesigns(JSON.parse(saved))
      }
    } catch {}
  }, [])

  // Showcase 6 featured designs on homepage
  const featuredDesigns = designs.slice(0, 6)

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
              <Sparkles size={12} />
              Real Studio Creations
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-4xl md:text-5xl font-bold"
            >
              <span className="text-cream">Our Handcrafted </span>
              <span className="text-gradient-gold">Creations</span>
            </motion.h2>
            <p className="font-inter text-xs text-cream/50 mt-2">
              Showing verified design codes (<span className="text-gold-400 font-mono font-bold">SSAW-001</span> to <span className="text-gold-400 font-mono font-bold">SSAW-034</span>)
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/gallery" className="btn-luxury text-sm group">
              View All {designs.length} Designs
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Masonry-style grid featuring live real images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featuredDesigns.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold-500/40 transition-all ${
                i === 0 || i === 3 ? 'row-span-2 aspect-[4/5]' : 'aspect-[4/3]'
              }`}
            >
              <Link href={`/gallery`} className="relative block w-full h-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-darkbase/95 via-darkbase/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Top Left: Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="badge-gold text-[10px] shadow-sm">{item.category}</span>
                </div>

                {/* Top Right: Unique Code Pill */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-400 font-mono text-[11px] font-bold flex items-center gap-1">
                    <Hash size={10} />
                    {item.code}
                  </span>
                </div>

                {/* Info on hover */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 z-10">
                  <span className="font-mono text-[11px] text-gold-400 font-bold block mb-0.5">Code: {item.code}</span>
                  <p className="font-playfair text-sm md:text-base font-semibold text-cream mb-1 leading-snug">{item.title}</p>
                  <div className="flex items-center gap-1 text-gold-400 text-xs font-inter font-medium">
                    <ExternalLink size={12} /> Quote Code on WhatsApp
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

