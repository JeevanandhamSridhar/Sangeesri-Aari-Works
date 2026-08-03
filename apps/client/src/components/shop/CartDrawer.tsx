'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, getTotal } = useCartStore()
  const { subtotal, itemCount } = getTotal()
  const delivery = subtotal > 999 ? 0 : 99
  const total = subtotal + delivery

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-darkbase/70 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass-dark border-l border-gold-500/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold-400" />
                <span className="font-playfair text-xl font-semibold text-cream">
                  Your Cart
                </span>
                {itemCount > 0 && (
                  <span className="badge-gold text-xs">{itemCount} items</span>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold-500/30 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={48} className="text-cream/20 mb-4" />
                  <p className="font-playfair text-xl text-cream/50 mb-2">Your cart is empty</p>
                  <p className="font-inter text-sm text-cream/30 mb-6">
                    Add some beautiful Aari materials
                  </p>
                  <Link href="/shop" onClick={closeDrawer} className="btn-luxury text-sm">
                    Shop Now
                  </Link>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="flex gap-4 p-4 glass rounded-2xl border border-white/5"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-inter text-sm font-medium text-cream line-clamp-1">
                            {item.name}
                          </p>
                          <p className="font-inter text-xs text-cream/40 mt-0.5">{item.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-playfair text-sm font-bold text-gold-400">
                              {formatCurrency(item.salePrice)}
                            </span>
                            {item.mrp > item.salePrice && (
                              <span className="font-inter text-xs text-cream/30 line-through">
                                {formatCurrency(item.mrp)}
                              </span>
                            )}
                          </div>

                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold-500/30 transition-all"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center font-inter text-sm text-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-cream/60 hover:text-cream hover:border-gold-500/30 transition-all"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="self-start text-cream/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}
            </div>

            {/* Summary + Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                {/* Price breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between font-inter text-sm text-cream/60">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-inter text-sm text-cream/60">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-400' : ''}>
                      {delivery === 0 ? 'Free' : formatCurrency(delivery)}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <p className="font-inter text-xs text-cream/30">
                      Free delivery on orders above ₹999
                    </p>
                  )}
                  <div className="flex justify-between font-playfair text-lg font-bold text-cream pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-gradient-gold">{formatCurrency(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn-luxury w-full justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="btn-outline-gold w-full justify-center text-sm"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
