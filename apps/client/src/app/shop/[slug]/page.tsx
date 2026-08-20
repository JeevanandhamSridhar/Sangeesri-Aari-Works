'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Share2,
  Minus,
  Plus,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import { toast } from 'sonner'
import { getProductBySlug, products } from '@/data/products'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = (params?.slug as string) || 'premium-aari-needle-set'
  
  // Fallback to first product if slug not found in mock
  const product = getProductBySlug(slug) || products[0]
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc')
  
  const addItem = useCartStore((s) => s.addItem)
  const discount = calculateDiscount(product.mrp, product.salePrice)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        mrp: product.mrp,
        salePrice: product.salePrice,
        category: product.category,
      })
    }
    toast.success(`${quantity}x ${product.name} added to cart!`, { icon: '🛒' })
  }

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-20">
      <div className="container-luxury">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-inter text-xs text-cream/50 mb-8">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-gold-400">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-gold-400 font-medium">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 font-inter text-xs text-cream/60 hover:text-gold-400 mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Images Section (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border border-gold-500/20 group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isBestSeller && <span className="badge-gold text-xs">⭐ Best Seller</span>}
                {discount >= 10 && <span className="badge-discount">{discount}% OFF</span>}
              </div>

              <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-cream/70 hover:text-red-400 transition-colors">
                <Heart size={18} />
              </button>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                    selectedImageIndex === idx ? 'border-gold-500 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-inter text-xs text-gold-500 tracking-widest uppercase mb-2 block">
                {product.category} · SKU: {product.sku}
              </span>

              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-gold-500 text-gold-500' : 'text-cream/20'}
                    />
                  ))}
                </div>
                <span className="font-inter text-sm font-semibold text-gold-400">{product.rating}</span>
                <span className="font-inter text-xs text-cream/40">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing */}
              <div className="glass-gold rounded-2xl p-4 mb-6 flex items-baseline gap-4">
                <span className="font-playfair text-3xl font-bold text-gold-400">
                  {formatCurrency(product.salePrice)}
                </span>
                <span className="font-inter text-base text-cream/40 line-through">
                  {formatCurrency(product.mrp)}
                </span>
                <span className="badge-discount ml-auto">Save {formatCurrency(product.mrp - product.salePrice)}</span>
              </div>

              <p className="font-inter text-sm text-cream/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="font-inter text-xs font-medium text-cream/80">
                  {product.inStock ? `In Stock (${product.stockCount} units available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <div className="flex items-center justify-between border border-white/15 rounded-full px-4 py-3 min-w-[130px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-cream/60 hover:text-gold-400"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-inter font-bold text-cream px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-cream/60 hover:text-gold-400"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="btn-luxury flex-1 py-4 justify-center"
                >
                  <ShoppingBag size={18} /> Add To Cart
                </button>
              </div>

              {/* Direct WhatsApp Inquiry */}
              <a
                href={`https://wa.me/917604887356?text=Hi! I am interested in buying ${encodeURIComponent(product.name)} (SKU: ${product.sku}).`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 glass rounded-full py-3 text-sm font-inter font-semibold text-green-400 hover:bg-green-500/10 border border-green-500/30 transition-all mb-8"
              >
                <FaWhatsapp size={18} /> Order / Inquire on WhatsApp
              </a>

              {/* Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-gold-400 shrink-0" />
                  <span className="font-inter text-xs text-cream/70">Fast Delivery Across Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-gold-400 shrink-0" />
                  <span className="font-inter text-xs text-cream/70">100% Original Craft Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info (Description, Specs, Reviews) */}
        <div className="glass rounded-3xl p-8 border border-white/10 mb-16">
          <div className="flex gap-8 border-b border-white/10 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('desc')}
              className={`font-playfair text-lg font-bold pb-2 transition-all relative ${
                activeTab === 'desc' ? 'text-gold-400' : 'text-cream/40 hover:text-cream'
              }`}
            >
              Key Features
              {activeTab === 'desc' && <motion.div layoutId="tab" className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-500" />}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`font-playfair text-lg font-bold pb-2 transition-all relative ${
                activeTab === 'specs' ? 'text-gold-400' : 'text-cream/40 hover:text-cream'
              }`}
            >
              Specifications
              {activeTab === 'specs' && <motion.div layoutId="tab" className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-500" />}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-playfair text-lg font-bold pb-2 transition-all relative ${
                activeTab === 'reviews' ? 'text-gold-400' : 'text-cream/40 hover:text-cream'
              }`}
            >
              Reviews ({product.reviews.length})
              {activeTab === 'reviews' && <motion.div layoutId="tab" className="absolute bottom-0 inset-x-0 h-0.5 bg-gold-500" />}
            </button>
          </div>

          {/* Content */}
          {activeTab === 'desc' && (
            <div className="space-y-4">
              <h3 className="font-playfair text-xl font-bold text-cream">Product Features & Advantages</h3>
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 font-inter text-sm text-cream/80">
                    <Check size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-4 glass-dark rounded-xl border border-white/5 font-inter text-sm">
                  <span className="text-cream/40">{key}</span>
                  <span className="text-cream font-medium">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-6 glass-dark rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-playfair font-semibold text-cream">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-inter">
                          ✓ Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="font-inter text-xs text-cream/40">{rev.date}</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: rev.rating }).map((_, j) => (
                      <Star key={j} size={12} className="fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="font-inter text-sm text-cream/70">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
