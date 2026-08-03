'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, X, ZoomIn, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { cn } from '@/lib/utils'

const categories = ['All', 'Bridal', 'Aari Work', 'Designer', 'Traditional', 'Maggam', 'Stone Work', 'Zardosi']

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=800&q=80',
    title: 'Royal Gold Zari Bridal Blouse',
    category: 'Bridal',
    priceEstimate: '₹4,500 – ₹7,500',
    tags: ['Bridal', 'Gold Zari', 'Heavy Work'],
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80',
    title: 'Maggam Work Handcrafted Special',
    category: 'Maggam',
    priceEstimate: '₹3,200 – ₹5,800',
    tags: ['Maggam', 'Stone', 'Silk'],
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    title: 'Traditional Zardosi Peacock Motif',
    category: 'Zardosi',
    priceEstimate: '₹3,800 – ₹6,200',
    tags: ['Zardosi', 'Traditional', 'Peacock'],
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80',
    title: 'Pearl & Kundan Stone Blouse',
    category: 'Stone Work',
    priceEstimate: '₹2,900 – ₹4,800',
    tags: ['Stone Work', 'Pearl', 'Kundan'],
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    title: 'Grand Reception Velvet Aari Work',
    category: 'Bridal',
    priceEstimate: '₹5,500 – ₹9,000',
    tags: ['Bridal', 'Velvet', 'Reception'],
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80',
    title: 'Contemporary Silk Thread Motifs',
    category: 'Aari Work',
    priceEstimate: '₹2,200 – ₹3,800',
    tags: ['Aari', 'Silk Thread', 'Modern'],
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
    title: 'Designer Cutwork Embroidery',
    category: 'Designer',
    priceEstimate: '₹3,500 – ₹5,500',
    tags: ['Designer', 'Cutwork', 'Party Wear'],
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?w=800&q=80',
    title: 'Temple Border Heritage Blouse',
    category: 'Traditional',
    priceEstimate: '₹2,800 – ₹4,500',
    tags: ['Temple Border', 'Heritage', 'Traditional'],
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80',
    title: 'Kundan Mirror Accent Bridal',
    category: 'Bridal',
    priceEstimate: '₹4,800 – ₹8,200',
    tags: ['Bridal', 'Kundan', 'Mirror Work'],
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

  const filtered = galleryImages.filter((img) => {
    if (activeCategory !== 'All' && img.category !== activeCategory) return false
    if (searchQuery && !img.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      {/* Header */}
      <div className="relative pb-12 text-center overflow-hidden">
        <div className="container-luxury relative z-10">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} />
            Handcrafted Masterpieces
            <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Our Design </span>
            <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="font-cormorant text-xl text-cream/60 max-w-xl mx-auto">
            Explore 700+ custom Aari embroidery creations crafted at Sangee Sri Aari Works studio.
          </p>
        </div>
      </div>

      <div className="container-luxury">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs e.g. Bridal, Zardosi, Kundan..."
            className="input-luxury pl-12 text-sm"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2 rounded-full font-inter text-xs font-medium transition-all duration-300',
                activeCategory === cat
                  ? 'bg-gold-500 text-darkbase font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'glass border border-white/10 text-cream/60 hover:text-cream hover:border-gold-500/30'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid relative group cursor-pointer rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500"
                onClick={() => setLightboxImage(img)}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient on bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbase/90 via-darkbase/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="badge-gold text-[10px]">{img.category}</span>
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-cream/80 group-hover:text-gold-400 group-hover:scale-110 transition-all">
                    <ZoomIn size={14} />
                  </div>

                  {/* Info footer */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <p className="font-playfair text-sm font-bold text-cream mb-1">{img.title}</p>
                    <p className="font-inter text-xs text-gold-400 font-semibold mb-2">
                      Estimate: {img.priceEstimate}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {img.tags.map((t) => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-cream/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full glass-gold rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[3/4] md:aspect-auto w-full min-h-[320px]">
                  <Image
                    src={lightboxImage.src}
                    alt={lightboxImage.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between bg-[#0e0a07]">
                  <div>
                    <span className="badge-gold text-xs mb-3 inline-block">{lightboxImage.category}</span>
                    <h3 className="font-playfair text-2xl font-bold text-cream mb-2">{lightboxImage.title}</h3>
                    <p className="font-inter text-xs text-cream/60 leading-relaxed mb-6">
                      Handcrafted custom Aari embroidery tailored to your exact measurements, color preferences, and saree design.
                    </p>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                      <span className="font-inter text-xs text-cream/40 block mb-1">Estimated Price Range:</span>
                      <span className="font-playfair text-2xl font-bold text-gold-400">{lightboxImage.priceEstimate}</span>
                      <span className="font-inter text-[10px] text-cream/40 block mt-1">Final price varies based on pattern complexity & materials.</span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Quote Action */}
                  <div>
                    <a
                      href={`https://wa.me/917604887356?text=${encodeURIComponent(
                        `Hi Sangee Sri Aari Works! I am interested in getting a quote for design: "${lightboxImage.title}" (${lightboxImage.category}). Estimated price is ${lightboxImage.priceEstimate}. Please share details.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-luxury w-full justify-center text-sm group flex items-center gap-2"
                    >
                      <FaWhatsapp size={18} className="text-green-400" />
                      Inquire Quote on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-cream hover:text-gold-400 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
