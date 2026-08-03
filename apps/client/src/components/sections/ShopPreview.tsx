'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, Heart, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { toast } from 'sonner'

const featuredProducts = [
  {
    id: 'p1',
    productId: 'prod-1',
    name: 'Premium Aari Needle Set (12 pcs)',
    slug: 'premium-aari-needle-set',
    category: 'Needles',
    image: 'https://picsum.photos/seed/prod1/400/500',
    mrp: 399,
    salePrice: 249,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 'p2',
    productId: 'prod-2',
    name: 'Silk Aari Embroidery Thread — Gold',
    slug: 'silk-aari-thread-gold',
    category: 'Thread',
    image: 'https://picsum.photos/seed/prod2/400/500',
    mrp: 299,
    salePrice: 199,
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 'p3',
    productId: 'prod-3',
    name: 'Round Aari Frame — 12 inch',
    slug: 'round-aari-frame-12',
    category: 'Frames',
    image: 'https://picsum.photos/seed/prod3/400/500',
    mrp: 699,
    salePrice: 499,
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 'p4',
    productId: 'prod-4',
    name: 'Beginner Aari Work Complete Kit',
    slug: 'beginner-aari-kit',
    category: 'Kits',
    image: 'https://picsum.photos/seed/prod4/400/500',
    mrp: 1499,
    salePrice: 999,
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
]

function ProductCard({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const addItem = useCartStore((s) => s.addItem)
  const isInView = useInView(useRef<HTMLDivElement>(null), { once: true })
  const discount = calculateDiscount(product.mrp, product.salePrice)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.productId,
      name: product.name,
      slug: product.slug,
      image: product.image,
      mrp: product.mrp,
      salePrice: product.salePrice,
      category: product.category,
    })
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="product-card group"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="badge-gold text-[10px]">⭐ Best Seller</span>
          )}
          {product.isNew && (
            <span className="text-[10px] font-inter font-bold px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              New
            </span>
          )}
          {discount >= 20 && (
            <span className="badge-discount">{discount}% OFF</span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-cream/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 duration-300">
          <Heart size={15} />
        </button>

        {/* Quick add button */}
        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <button
            onClick={handleAddToCart}
            className="btn-luxury w-full justify-center text-xs py-3"
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-inter text-xs text-gold-500/60 mb-1 tracking-wide uppercase">
          {product.category}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-inter text-sm font-semibold text-cream/90 hover:text-gold-400 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream/20'}
              />
            ))}
          </div>
          <span className="font-inter text-[11px] text-cream/40">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-playfair text-lg font-bold text-gold-400">
              {formatCurrency(product.salePrice)}
            </span>
            <span className="font-inter text-xs text-cream/30 line-through">
              {formatCurrency(product.mrp)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 hover:border-gold-500/60 transition-all duration-300"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function ShopPreview() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-[#060402] relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gold opacity-30" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="section-label mb-4"
            >
              🛒 Online Store
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-4xl md:text-5xl font-bold"
            >
              <span className="text-cream">Aari Work </span>
              <span className="text-gradient-gold">Materials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-inter text-sm text-cream/50 mt-2"
            >
              Premium needles, threads, frames & kits — delivered to your doorstep
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/shop" className="btn-luxury text-sm group">
              Shop All Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Free shipping banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 glass-gold rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-8">
            {[
              { icon: '🚚', text: 'Free delivery above ₹999' },
              { icon: '📦', text: 'Genuine materials only' },
              { icon: '↩️', text: '7-day easy returns' },
              { icon: '💳', text: 'UPI · Cards · COD' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 font-inter text-sm text-cream/70">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
