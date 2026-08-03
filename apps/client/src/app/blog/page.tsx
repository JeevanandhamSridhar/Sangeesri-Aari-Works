'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ZoomIn, Sparkles, ImageIcon } from 'lucide-react'

// ── Poster / works data ─────────────────────────────────────
// Replace image URLs with your actual work photos from Cloudinary or local files
const works = [
  {
    id: 1,
    title: 'Royal Bridal Gold Blouse',
    category: 'Bridal',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=800&q=80',
    tags: ['Gold Zari', 'Bridal', 'Silk'],
    description: 'Hand-crafted golden zari aari work on pure silk for a royal bridal look.',
  },
  {
    id: 2,
    title: 'Festival Aari Special',
    category: 'Festival',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    tags: ['Aari Work', 'Festive', 'Stone'],
    description: 'Vibrant festival blouse with intricate thread and stone detailing.',
  },
  {
    id: 3,
    title: 'Stone & Pearl Designer',
    category: 'Designer',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    tags: ['Stone Work', 'Pearls', 'Modern'],
    description: 'Modern stone and pearl combination for a contemporary celebration look.',
  },
  {
    id: 4,
    title: 'Traditional Maggam Blouse',
    category: 'Traditional',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?w=800&q=80',
    tags: ['Maggam', 'Traditional', 'Zari'],
    description: 'Pure traditional Maggam work with handmade motifs on kanchipuram silk.',
  },
  {
    id: 5,
    title: 'Reception Zardosi Masterpiece',
    category: 'Bridal',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    tags: ['Zardosi', 'Reception', 'Embroidery'],
    description: 'Opulent Zardosi embroidery perfect for a grand reception look.',
  },
  {
    id: 6,
    title: 'Silk Thread Aari Poster',
    category: 'Poster',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80',
    tags: ['Poster', 'Promotion', 'Silk'],
    description: 'Promotional poster showcasing our signature silk thread work.',
  },
  {
    id: 7,
    title: 'Kundan Bridal Masterwork',
    category: 'Bridal',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    tags: ['Kundan', 'Bridal', 'Luxury'],
    description: 'Exquisite kundan stone setting with gold thread work for the ultimate bride.',
  },
  {
    id: 8,
    title: 'Mirror Work Designer Blouse',
    category: 'Designer',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80',
    tags: ['Mirror Work', 'Designer', 'Party'],
    description: 'Trendy mirror-work embroidery blouse for modern celebratory occasions.',
  },
  {
    id: 9,
    title: 'Thread Painting Art',
    category: 'Traditional',
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
    tags: ['Thread Painting', 'Art', 'Heritage'],
    description: 'Rare thread painting technique — an heirloom-quality wearable art piece.',
  },
]

const categories = ['All', 'Bridal', 'Designer', 'Traditional', 'Festival', 'Poster']

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<(typeof works)[0] | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' })

  const filtered =
    activeCategory === 'All'
      ? works
      : works.filter((w) => w.category === activeCategory)

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury">

        {/* ── Header ───────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-4"
          >
            <Sparkles size={12} />
            Our Portfolio &amp; Posters
            <Sparkles size={12} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-4xl md:text-6xl font-bold mb-5"
          >
            <span className="text-cream">Works &amp; </span>
            <span className="text-gradient-gold">Creations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-cormorant text-xl text-cream/60 leading-relaxed"
          >
            Browse our portfolio of handcrafted Aari blouses, bridal creations,
            promotional posters and more — every piece a labour of love.
          </motion.p>
        </div>

        {/* ── Category Filters ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-inter text-sm font-medium transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-gold-500 text-darkbase shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                  : 'glass border border-white/10 text-cream/60 hover:border-gold-500/30 hover:text-gold-400'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Masonry Grid ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer
                  border border-white/5 hover:border-gold-500/25 transition-all duration-500"
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={600}
                    height={800}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/90 via-[#0A0806]/20 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm
                    flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300
                    scale-75 group-hover:scale-100 border border-white/20"
                  >
                    <ZoomIn size={14} className="text-white" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="badge-gold text-[9px]">{item.category}</span>
                  </div>

                  {/* Bottom info on hover */}
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-3 opacity-0
                    group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <p className="font-playfair text-sm font-semibold text-cream leading-tight mb-1">
                      {item.title}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full
                          bg-gold-500/20 border border-gold-500/30 text-gold-400 font-inter"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Upload notice for admin */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 glass rounded-2xl border border-white/5 p-6 flex items-center gap-4 text-center justify-center"
        >
          <ImageIcon size={20} className="text-gold-400 shrink-0" />
          <p className="font-inter text-sm text-cream/50">
            Add your real work photos &amp; promotional posters through the{' '}
            <span className="text-gold-400 font-medium">Admin Panel → Media Library</span>
          </p>
        </motion.div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxItem(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col md:flex-row gap-0 max-w-4xl w-full rounded-3xl overflow-hidden
                border border-gold-500/20 shadow-[0_0_80px_rgba(212,175,55,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full md:w-3/5 aspect-[4/5] md:aspect-auto">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info panel */}
              <div className="w-full md:w-2/5 bg-[#0A0806] p-8 flex flex-col justify-center space-y-4
                border-t md:border-t-0 md:border-l border-gold-500/10"
              >
                <span className="badge-gold text-[10px] self-start">{lightboxItem.category}</span>
                <h3 className="font-playfair text-2xl font-bold text-cream">{lightboxItem.title}</h3>
                <p className="font-inter text-sm text-cream/60 leading-relaxed">{lightboxItem.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {lightboxItem.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full
                      bg-gold-500/10 border border-gold-500/20 text-gold-400 font-inter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20
                flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
