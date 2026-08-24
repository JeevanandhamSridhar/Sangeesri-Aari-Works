'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, ShoppingBag, Heart, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { toast } from 'sonner'

import { categories, products } from '@/data/products'

const sortOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Rated', value: 'rating' },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [filterOpen, setFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlySale, setOnlySale] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const addItem = useCartStore((s) => s.addItem)

  const filtered = products
    .filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) return false
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      if (onlyInStock && !p.inStock) return false
      if (onlySale && p.salePrice >= p.mrp) return false
      if (p.salePrice < priceRange[0] || p.salePrice > priceRange[1]) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.salePrice - b.salePrice
      if (sortBy === 'price-desc') return b.salePrice - a.salePrice
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return b.isNew ? 1 : -1
      return b.reviewCount - a.reviewCount
    })

  const handleAddToCart = useCallback((product: typeof products[0]) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      mrp: product.mrp,
      salePrice: product.salePrice,
      category: product.category,
    })
    toast.success(`${product.name} added to cart!`, { icon: '🛒' })
  }, [addItem])

  return (
    <div className="min-h-screen bg-darkbase">
      {/* Hero banner */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-mesh-gold opacity-40" />
        <div className="container-luxury relative z-10 text-center">
          <div className="section-label justify-center mb-4">🛒 Online Store</div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Aari Work </span>
            <span className="text-gradient-gold">Materials</span>
          </h1>
          <p className="font-inter text-cream/50 max-w-xl mx-auto">
            Premium needles, silk threads, embroidery frames, stone kits & more — sourced for quality, priced fairly.
          </p>
        </div>
      </div>

      <div className="container-luxury py-12">
        {/* Search + Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="input-luxury pl-12"
              suppressHydrationWarning
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="btn-outline-gold flex items-center gap-2 py-3 px-5"
              suppressHydrationWarning
            >
              Sort: {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={16} className={sortOpen ? 'rotate-180' : ''} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-52 glass-dark rounded-2xl border border-white/10 overflow-hidden z-20"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-5 py-3 font-inter text-sm transition-colors border-b border-white/5 last:border-0 ${sortBy === opt.value ? 'text-gold-400 bg-gold-500/10' : 'text-cream/60 hover:text-cream hover:bg-white/5'}`}
                      suppressHydrationWarning
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`btn-outline-gold flex items-center gap-2 py-3 px-5 ${filterOpen ? 'border-gold-500 bg-gold-500/10' : ''}`}
            suppressHydrationWarning
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass rounded-3xl p-6 border border-gold-500/15 flex flex-wrap gap-8">
                {/* In Stock */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setOnlyInStock(!onlyInStock)}
                    className={`w-10 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${onlyInStock ? 'bg-gold-500' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${onlyInStock ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <span className="font-inter text-sm text-cream/70">In Stock Only</span>
                </label>

                {/* On Sale */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setOnlySale(!onlySale)}
                    className={`w-10 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${onlySale ? 'bg-gold-500' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${onlySale ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <span className="font-inter text-sm text-cream/70">On Sale Only</span>
                </label>

                {/* Price Range */}
                <div className="flex items-center gap-4">
                  <span className="font-inter text-sm text-cream/50">Price:</span>
                  <span className="font-inter text-sm text-gold-400">
                    {formatCurrency(priceRange[0])} — {formatCurrency(priceRange[1])}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2.5 rounded-full font-inter text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-darkbase font-bold'
                  : 'glass border border-white/10 text-cream/60 hover:text-cream hover:border-gold-500/30'
              }`}
              suppressHydrationWarning
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-inter text-sm text-cream/40">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="font-playfair text-2xl text-cream/30 mb-2">No products found</p>
              <p className="font-inter text-sm text-cream/20">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
            >
              {filtered.map((product, i) => {
                const discount = calculateDiscount(product.mrp, product.salePrice)
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="product-card group"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                        {product.isBestSeller && <span className="badge-gold text-[9px] shadow-sm">⭐ Best Seller</span>}
                        {product.isNew && <span className="text-[9px] font-inter font-bold px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">New</span>}
                        {discount >= 20 && <span className="badge-discount text-[9px]">{discount}% OFF</span>}
                        {!product.inStock && <span className="text-[9px] font-inter font-bold px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300">Out of Stock</span>}
                      </div>

                      {/* Wishlist */}
                      <button className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full glass flex items-center justify-center text-cream/70 hover:text-red-400 transition-colors z-10" suppressHydrationWarning>
                        <Heart size={14} />
                      </button>

                      {/* Desktop Quick add overlay */}
                      {product.inStock && (
                        <div className="hidden md:block absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                          <button onClick={() => handleAddToCart(product)} className="btn-luxury w-full justify-center text-xs py-2.5" suppressHydrationWarning>
                            <ShoppingBag size={14} /> Quick Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-3 sm:p-4">
                      <p className="font-inter text-[9px] sm:text-[10px] text-gold-500/70 mb-1 tracking-widest uppercase font-semibold">{product.category}</p>
                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-inter text-xs sm:text-sm font-semibold text-cream/90 hover:text-gold-400 transition-colors line-clamp-2 mb-2 leading-snug">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} size={10} className={j < Math.floor(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream/20'} />
                        ))}
                        <span className="font-inter text-[9px] text-cream/40 ml-0.5">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center justify-between gap-1 pt-1 border-t border-white/5">
                        <div>
                          <span className="font-playfair text-sm sm:text-base font-bold text-gold-400">{formatCurrency(product.salePrice)}</span>
                          {product.mrp > product.salePrice && (
                            <span className="font-inter text-[10px] sm:text-xs text-cream/30 line-through block sm:inline sm:ml-1.5">{formatCurrency(product.mrp)}</span>
                          )}
                        </div>
                        {product.inStock ? (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all shrink-0 active:scale-95"
                            title="Add to cart"
                            suppressHydrationWarning
                          >
                            <ShoppingBag size={14} />
                          </button>
                        ) : (
                          <span className="font-inter text-[10px] text-red-400/60 font-semibold">Sold Out</span>
                        )}
                      </div>
                    </div>

                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
