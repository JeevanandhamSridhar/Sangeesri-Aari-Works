'use client'

import Link from 'next/link'
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react'

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-4xl">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="section-label mb-1">
              <Heart size={12} />
              Saved Items
            </div>
            <h1 className="font-playfair text-3xl font-bold text-cream">Your Wishlist</h1>
          </div>
          <Link href="/gallery" className="btn-outline-gold text-xs flex items-center gap-2">
            <ArrowLeft size={14} /> Explore Gallery
          </Link>
        </div>

        <div className="glass-gold rounded-3xl p-12 text-center border border-gold-500/20 max-w-md mx-auto my-12">
          <Heart size={40} className="text-gold-400 mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-cream mb-2">No Saved Items Yet</h2>
          <p className="font-inter text-sm text-cream/50 mb-6">
            Browse our Design Gallery or Boutique Shop to save your favorite Aari blouse patterns.
          </p>
          <Link href="/gallery" className="btn-luxury text-xs inline-flex items-center gap-2">
            View Design Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}
