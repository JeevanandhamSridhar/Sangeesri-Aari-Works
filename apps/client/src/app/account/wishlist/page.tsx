'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowLeft, Trash2, Hash } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="section-label mb-1">
              <Heart size={12} className="text-red-400 fill-red-400" />
              Saved Items ({items.length})
            </div>
            <h1 className="font-playfair text-3xl font-bold text-cream">Your Saved Wishlist</h1>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={() => {
                  clearWishlist()
                  toast.success('Wishlist cleared!')
                }}
                className="px-3.5 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-inter font-semibold hover:bg-red-500/20 transition-all"
              >
                Clear All
              </button>
            )}
            <Link href="/gallery" className="btn-outline-gold text-xs flex items-center gap-2">
              <ArrowLeft size={14} /> Explore Gallery
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="glass-gold rounded-3xl p-12 text-center border border-gold-500/20 max-w-md mx-auto my-12">
            <Heart size={40} className="text-gold-400 mx-auto mb-4" />
            <h2 className="font-playfair text-2xl font-bold text-cream mb-2">No Saved Items Yet</h2>
            <p className="font-inter text-sm text-cream/50 mb-6">
              Browse our Design Gallery or Boutique Shop and tap the heart icon to save your favorite Aari blouse patterns.
            </p>
            <Link href="/gallery" className="btn-luxury text-xs inline-flex items-center gap-2">
              View Design Gallery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-gold rounded-2xl overflow-hidden border border-gold-500/20 relative flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image src={item.src} alt={item.title} fill unoptimized className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-transparent to-transparent opacity-80" />

                  {/* Top Left: Code */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-400 font-mono text-xs font-bold flex items-center gap-1">
                      <Hash size={11} /> {item.code}
                    </span>
                  </div>

                  {/* Top Right: Delete */}
                  <button
                    onClick={() => {
                      removeItem(item.id)
                      toast.success(`Removed ${item.code} from Wishlist`)
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 backdrop-blur-md flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={14} />
                  </button>

                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 space-y-2">
                    <span className="badge-gold text-[10px]">{item.category}</span>
                    <h3 className="font-playfair text-lg font-bold text-cream leading-tight">{item.title}</h3>

                    <a
                      href={`https://wa.me/917604887356?text=${encodeURIComponent(
                        `Hi Sangee Sri Aari Works! I saved design ${item.code} ("${item.title}") in my Wishlist and want to inquire about custom orders.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-luxury w-full text-xs justify-center flex items-center gap-2 py-2 mt-2"
                    >
                      <FaWhatsapp size={15} className="text-green-400" /> WhatsApp Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
