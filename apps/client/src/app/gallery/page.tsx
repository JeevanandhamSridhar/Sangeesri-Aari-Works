'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
  Heart,
  Share2,
  Hash,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { galleryCategories, GalleryDesign } from '@/data/galleryData'
import { useWishlistStore } from '@/store/wishlistStore'
import { generatePdfCatalog } from '@/utils/generatePdfCatalog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function DesignCardWithCarousel({
  img,
  index,
  onOpenLightbox,
}: {
  img: GalleryDesign
  index: number
  onOpenLightbox: (img: GalleryDesign, initialIndex?: number) => void
}) {
  const { isInWishlist, toggleItem } = useWishlistStore()
  const saved = isInWishlist(img.id)
  const imageList = img.images && img.images.length > 0 ? img.images : [img.src]
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % imageList.length)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(code)
    toast.success(`Design Code ${code} copied!`)
  }

  const activeSrc = imageList[activeImgIndex] || img.src

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-500 bg-[#0d0906] shadow-lg flex flex-col justify-between"
      onClick={() => onOpenLightbox(img, activeImgIndex)}
    >
      <div className="relative aspect-[4/5] w-full bg-black/40 overflow-hidden">
        {/* Animated Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSrc}
            initial={{ opacity: 0.5, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={activeSrc}
              alt={img.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                if (target && target.src !== img.src) {
                  target.src = img.src || '/gallery/0021292954d624910413c938e24cf6eb.jpg'
                }
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-darkbase/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

        {/* Top Left: Category Badge */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="badge-gold text-[10px] shadow-sm">{img.category}</span>
        </div>

        {/* Top Right: Wishlist & Code Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleItem(img)
              toast.success(saved ? 'Removed from Wishlist' : 'Saved to Wishlist!')
            }}
            title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
            className={cn(
              'w-8 h-8 rounded-full border backdrop-blur-md flex items-center justify-center transition-all',
              saved
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-black/60 border-white/20 text-cream/70 hover:text-gold-400'
            )}
          >
            <Heart size={14} className={cn(saved && 'fill-red-400')} />
          </button>

          <button
            onClick={(e) => handleCopyCode(img.code, e)}
            title="Click to copy design code"
            className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-400 font-mono text-xs font-bold flex items-center gap-1 hover:bg-gold-500 hover:text-darkbase transition-all"
          >
            <Hash size={11} />
            {img.code}
          </button>
        </div>

        {/* Multiple Images Sliding Controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-cream/80 hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md"
              title="Previous photo angle"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-cream/80 hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md"
              title="Next photo angle"
            >
              <ChevronRight size={16} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-16 inset-x-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
              {imageList.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    dotIdx === activeImgIndex ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/40'
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Info Footer Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 z-10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs font-semibold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
              {img.code}
            </span>
            {img.showPrice ? (
              <span className="font-playfair text-xs font-bold text-gold-400">{img.priceEstimate}</span>
            ) : (
              <span className="font-inter text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                Price on Request
              </span>
            )}
          </div>

          <h3 className="font-playfair text-sm font-bold text-cream line-clamp-1 group-hover:text-gold-300 transition-colors">
            {img.title}
          </h3>

          <div className="flex flex-wrap gap-1 mt-2">
            {(img.tags || []).slice(0, 4).map((tag, tIdx) => (
              <span key={tIdx} className="text-[9px] font-inter text-cream/50 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [designs, setDesigns] = useState<GalleryDesign[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxImage, setLightboxImage] = useState<GalleryDesign | null>(null)
  const [lightboxImgIndex, setLightboxImgIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [globalShowPrices, setGlobalShowPrices] = useState(false)

  const { isInWishlist, toggleItem } = useWishlistStore()

  // Real-time synchronization loader
  const loadGalleryFromStore = () => {
    fetch('/api/gallery-store', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.designs)) {
          setDesigns(data.designs)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadGalleryFromStore()

    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel('sangee_sri_gallery_sync')
      channel.onmessage = () => loadGalleryFromStore()
    } catch {}

    const timer = setInterval(() => {
      loadGalleryFromStore()
    }, 2500)

    return () => {
      if (channel) channel.close()
      clearInterval(timer)
    }
  }, [])

  const handleOpenLightbox = (img: GalleryDesign, initialIndex: number = 0) => {
    setLightboxImage(img)
    setLightboxImgIndex(initialIndex)
  }

  const handleCopyCode = (code: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Design Code ${code} copied!`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true)
    toast.info('Generating official Sangee Sri Aari Works PDF catalog with embedded photos...')
    try {
      await generatePdfCatalog(designs, globalShowPrices)
      toast.success('Official PDF Catalog downloaded successfully!')
    } catch (err) {
      console.error('PDF generation error:', err)
      toast.error('Failed to generate PDF catalog')
    } finally {
      setDownloadingPdf(false)
    }
  }

  const filtered = designs.filter((img) => {
    if (activeCategory !== 'All' && img.category !== activeCategory) return false
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      const matchTitle = img.title.toLowerCase().includes(q)
      const matchCode = img.code.toLowerCase().includes(q)
      const matchTag = img.tags.some((t) => t.toLowerCase().includes(q))
      return matchTitle || matchCode || matchTag
    }
    return true
  })

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-20 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-luxury relative z-10">
        {/* Top Header & CTA Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-inter font-semibold mb-3">
              <Sparkles size={13} />
              <span>Official Handcrafted Portfolio</span>
            </div>
            <h1 className="font-playfair text-3xl md:text-5xl font-bold text-cream">
              Exclusive Blouse <span className="text-gradient-gold">Design Gallery</span>
            </h1>
            <p className="font-inter text-xs md:text-sm text-cream/60 max-w-2xl mt-2">
              Browse {designs.length} unique handcrafted bridal, zardosi, &amp; cutwork designs. Every design features a unique verified SSAW Code for instant WhatsApp estimates!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="btn-luxury py-2.5 px-5 text-xs flex items-center gap-2 shadow-lg hover:shadow-gold-500/20"
            >
              <Download size={15} className={cn(downloadingPdf && 'animate-bounce')} />
              <span>{downloadingPdf ? 'Generating PDF Brochure...' : 'Download Official PDF Brochure'}</span>
            </button>

            <a
              href="https://wa.me/917604887356?text=Hi%20Kaviya!%20I%20want%20to%20inquire%20about%20a%20custom%20Aari%20blouse%20design."
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold py-2.5 px-4 text-xs flex items-center gap-2"
            >
              <FaWhatsapp size={15} className="text-green-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-xs font-inter font-medium whitespace-nowrap transition-all duration-300',
                  activeCategory === cat
                    ? 'bg-gold-500 text-darkbase font-bold shadow-md shadow-gold-500/20'
                    : 'bg-white/5 border border-white/10 text-cream/70 hover:text-gold-300 hover:bg-white/10'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
            <input
              type="text"
              placeholder="Search SSAW-001, Bridal, Pearl..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-cream text-xs placeholder:text-cream/30 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream text-xs"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Filter size={40} className="mx-auto text-gold-500/40 mb-3" />
            <h3 className="font-playfair text-xl font-bold text-cream">No designs found</h3>
            <p className="font-inter text-xs text-cream/50 mt-1 max-w-sm mx-auto">
              Try choosing another category or clearing your search input.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All')
                setSearchQuery('')
              }}
              className="btn-outline-gold text-xs mt-4 py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((img, i) => (
              <DesignCardWithCarousel
                key={img.id}
                img={img}
                index={i}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal with Multi-Angle Image Slider */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full glass-gold rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/80 text-cream/70 hover:text-gold-400 border border-white/20 flex items-center justify-center backdrop-blur-md transition-all"
              >
                <X size={18} />
              </button>

              {(() => {
                const lightboxImageList =
                  lightboxImage.images && lightboxImage.images.length > 0
                    ? lightboxImage.images
                    : [lightboxImage.src]
                const currentLightSrc = lightboxImageList[lightboxImgIndex] || lightboxImage.src

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: Image Slider Container */}
                    <div className="relative aspect-[3/4] md:aspect-auto w-full min-h-[380px] bg-black/60 flex flex-col justify-between p-4">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={currentLightSrc}
                          alt={lightboxImage.title}
                          fill
                          unoptimized
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (target && target.src !== lightboxImage.src) {
                              target.src = lightboxImage.src || '/gallery/0021292954d624910413c938e24cf6eb.jpg'
                            }
                          }}
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="badge-gold text-xs">{lightboxImage.category}</span>
                        </div>

                        {/* Slider Arrows if multiple images */}
                        {lightboxImageList.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setLightboxImgIndex(
                                  (prev) => (prev - 1 + lightboxImageList.length) % lightboxImageList.length
                                )
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-cream hover:text-gold-400 flex items-center justify-center"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={() =>
                                setLightboxImgIndex((prev) => (prev + 1) % lightboxImageList.length)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-cream hover:text-gold-400 flex items-center justify-center"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Thumbnails Bar for Multiple Angles */}
                      {lightboxImageList.length > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-3 z-20">
                          {lightboxImageList.map((tSrc, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => setLightboxImgIndex(tIdx)}
                              className={cn(
                                'relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all',
                                tIdx === lightboxImgIndex ? 'border-gold-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                              )}
                            >
                              <Image src={tSrc} alt={`Angle ${tIdx + 1}`} fill unoptimized className="object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Content Info */}
                    <div className="p-6 md:p-8 flex flex-col justify-between bg-[#0e0a07]">
                      <div>
                        {/* Code Header */}
                        <div className="flex items-center justify-between mb-4 bg-gold-500/10 p-3.5 rounded-2xl border border-gold-500/30">
                          <div>
                            <span className="text-[10px] text-cream/50 uppercase tracking-widest block font-inter">Verified Design Code</span>
                            <span className="font-mono text-xl font-bold text-gold-400">{lightboxImage.code}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                toggleItem(lightboxImage)
                                toast.success(isInWishlist(lightboxImage.id) ? 'Removed from Wishlist' : 'Saved to Wishlist!')
                              }}
                              className={cn(
                                'p-2 rounded-xl border transition-all',
                                isInWishlist(lightboxImage.id)
                                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                                  : 'bg-white/10 border-white/20 text-cream/80'
                              )}
                            >
                              <Heart size={16} className={cn(isInWishlist(lightboxImage.id) && 'fill-red-400')} />
                            </button>
                            <button
                              onClick={() => handleCopyCode(lightboxImage.code)}
                              className="btn-luxury py-1.5 px-3 text-xs flex items-center gap-1.5"
                            >
                              {copiedCode === lightboxImage.code ? (
                                <>
                                  <Check size={12} className="text-green-400" /> Copied!
                                </>
                              ) : (
                                <>
                                  <Copy size={12} /> Copy Code
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <h3 className="font-playfair text-2xl font-bold text-cream mb-2">{lightboxImage.title}</h3>
                        <p className="font-inter text-xs text-cream/60 leading-relaxed mb-6">
                          {lightboxImage.description || 'Handcrafted custom Aari embroidery tailored to your exact measurements, color preferences, and saree pattern.'}
                        </p>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                          {(globalShowPrices || lightboxImage.showPrice) ? (
                            <>
                              <span className="font-inter text-xs text-cream/40 block mb-1">Estimated Price Range:</span>
                              <span className="font-playfair text-2xl font-bold text-gold-400">{lightboxImage.priceEstimate}</span>
                              <span className="font-inter text-[10px] text-cream/40 block mt-1">Final cost depends on sleeve length, work density &amp; silk material choice.</span>
                            </>
                          ) : (
                            <>
                              <span className="font-inter text-xs text-green-400 font-semibold block mb-1">Custom Pricing on Request</span>
                              <p className="font-inter text-xs text-cream/70">
                                Charges depend on work intricacy, sleeve length, size measurements, and silk materials used. Quote Code <strong className="text-gold-400 font-mono">&quot;{lightboxImage.code}&quot;</strong> for instant WhatsApp estimate!
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Direct WhatsApp CTA Button */}
                      <a
                        href={`https://wa.me/917604887356?text=Hi%20Kaviya!%20I%20want%20to%20order%20or%20inquire%20about%20Design%20Code%20"${lightboxImage.code}"%20(${lightboxImage.title}).`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-luxury py-3 px-6 text-xs w-full flex items-center justify-center gap-2 group shadow-xl"
                      >
                        <FaWhatsapp size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
                        <span>Inquire Design {lightboxImage.code} on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
