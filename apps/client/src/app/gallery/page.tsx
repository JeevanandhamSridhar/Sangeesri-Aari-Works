'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Search, X, ZoomIn, Sparkles, Copy, Check, Hash, Heart, Download, FileText } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { galleryCategories, GalleryDesign } from '@/data/galleryData'
import { toast } from 'sonner'
import { useWishlistStore } from '@/store/wishlistStore'
import { generatePdfCatalog } from '@/utils/generatePdfCatalog'

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxImage, setLightboxImage] = useState<GalleryDesign | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [designs, setDesigns] = useState<GalleryDesign[]>([])
  const [loading, setLoading] = useState(true)
  const [globalShowPrices, setGlobalShowPrices] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)

  const { isInWishlist, toggleItem } = useWishlistStore()

  // Load single-source gallery database from server storage
  useEffect(() => {
    fetch('/api/gallery-store')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.designs)) {
          setDesigns(data.designs)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCopyCode = (code: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Design Code ${code} copied!`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDownloadPdf = () => {
    setDownloadingPdf(true)
    toast.info('Generating official Sangee Sri Aari Works PDF catalog...')
    setTimeout(() => {
      try {
        generatePdfCatalog(designs, globalShowPrices)
        toast.success('PDF Catalog downloaded successfully!')
      } catch (err) {
        console.error('PDF generation error:', err)
        toast.error('Failed to generate PDF catalog')
      } finally {
        setDownloadingPdf(false)
      }
    }, 400)
  }

  const filtered = designs.filter((img) => {
    if (activeCategory !== 'All' && img.category !== activeCategory) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchCode = img.code.toLowerCase().includes(q)
      const matchTitle = img.title.toLowerCase().includes(q)
      const matchTag = img.tags?.some((t) => t.toLowerCase().includes(q))
      const matchCategory = img.category.toLowerCase().includes(q)
      return matchCode || matchTitle || matchTag || matchCategory
    }
    return true
  })

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      {/* Header */}
      <div className="relative pb-10 text-center overflow-hidden">
        <div className="container-luxury relative z-10">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} />
            Handcrafted Masterpieces &amp; Verified Codes
            <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Our Design </span>
            <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="font-cormorant text-xl text-cream/60 max-w-2xl mx-auto mb-6">
            Explore {designs.length}+ authentic Aari embroidery designs with unique verification codes (<span className="text-gold-400 font-mono font-bold">SSAW-001</span> to <span className="text-gold-400 font-mono font-bold">SSAW-{String(designs.length).padStart(3, '0')}</span>). Quote any code for instant WhatsApp price estimate!
          </p>

          {/* Action Bar: Download PDF & Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf}
              className="btn-luxury text-xs py-2.5 px-5 flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <FileText size={15} />
              {downloadingPdf ? 'Generating PDF Catalogue...' : 'Download Official PDF Catalogue'}
              <Download size={14} className="text-gold-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-luxury">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Code (e.g. SSAW-001), Title, Zardosi..."
            className="input-luxury pl-12 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {galleryCategories.map((cat) => (
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

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-inter text-xs text-cream/60">Loading design gallery...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filtered.map((img, i) => {
                const displayPrice = globalShowPrices || img.showPrice
                const saved = isInWishlist(img.id)

                return (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.02 }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all duration-500 bg-[#0d0906] shadow-lg flex flex-col justify-between"
                    onClick={() => setLightboxImage(img)}
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Dark gradient on bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-darkbase/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                      {/* Top Left: Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="badge-gold text-[10px] shadow-sm">{img.category}</span>
                      </div>

                      {/* Top Right: Code Badge & Wishlist Button */}
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

                      {/* Info footer */}
                      <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-semibold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                            {img.code}
                          </span>

                          {displayPrice ? (
                            <span className="font-inter text-xs text-gold-400 font-bold bg-black/60 px-2 py-0.5 rounded border border-gold-500/30">
                              {img.priceEstimate}
                            </span>
                          ) : (
                            <span className="font-inter text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                              Price on Request
                            </span>
                          )}
                        </div>

                        <p className="font-playfair text-sm font-bold text-cream mb-2 leading-snug line-clamp-1">{img.title}</p>

                        <div className="flex flex-wrap gap-1">
                          {img.tags?.map((t) => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-inter">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-playfair text-xl text-cream/60 mb-2">No design matches your search criteria.</p>
            <p className="font-inter text-xs text-cream/40">Try searching for &quot;SSAW-001&quot;, &quot;Bridal&quot;, or &quot;Zardosi&quot;</p>
          </div>
        )}
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
              className="relative max-w-3xl w-full glass-gold rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-[3/4] md:aspect-auto w-full min-h-[340px]">
                  <Image
                    src={lightboxImage.src}
                    alt={lightboxImage.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="badge-gold text-xs">{lightboxImage.category}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between bg-[#0e0a07]">
                  <div>
                    {/* Code Header */}
                    <div className="flex items-center justify-between mb-3 bg-gold-500/10 p-3 rounded-2xl border border-gold-500/30">
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
                          <span className="font-inter text-xs text-cream/40 block mb-1">Admin Price Estimate:</span>
                          <span className="font-playfair text-2xl font-bold text-gold-400">{lightboxImage.priceEstimate}</span>
                          <span className="font-inter text-[10px] text-cream/40 block mt-1">Final price varies based on sleeve length, work density &amp; fabric choice.</span>
                        </>
                      ) : (
                        <>
                          <span className="font-inter text-xs text-green-400 font-semibold block mb-1">Custom Pricing on Request</span>
                          <p className="font-inter text-xs text-cream/70">
                            Charges depend on work intricacy, sleeve length, size measurements, and silk materials used. Mention Code <strong className="text-gold-400 font-mono">&quot;{lightboxImage.code}&quot;</strong> for instant quote!
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Direct WhatsApp Quote Action */}
                  <div>
                    <a
                      href={`https://wa.me/917604887356?text=${encodeURIComponent(
                        `Hi Sangee Sri Aari Works! I would like to get a price quotation for Design Code: ${lightboxImage.code} ("${lightboxImage.title}"). Please share customization options, size measurements & pricing.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-luxury w-full justify-center text-sm group flex items-center gap-2 py-3"
                    >
                      <FaWhatsapp size={18} className="text-green-400" />
                      Get WhatsApp Quote for {lightboxImage.code}
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
