'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCartStore()
  const { subtotal, itemCount } = getTotal()

  const [settings, setSettings] = useState({
    freeShippingEnabled: false,
    freeDeliveryThreshold: 999,
    deliveryCharge: 99,
  })

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            freeShippingEnabled: Boolean(data.freeShippingEnabled),
            freeDeliveryThreshold: Number(data.freeDeliveryThreshold) || 999,
            deliveryCharge: Number(data.deliveryCharge) || 99,
          })
        }
      })
      .catch(() => {})
  }, [])

  const isFreeDeliveryEligible = settings.freeShippingEnabled && subtotal >= settings.freeDeliveryThreshold
  const deliveryCharge = subtotal === 0 || isFreeDeliveryEligible ? 0 : settings.deliveryCharge
  const grandTotal = subtotal + deliveryCharge

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="section-label mb-1">
              <ShoppingBag size={12} />
              Your Selection
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream">Shopping Cart</h1>
          </div>
          <Link href="/shop" className="btn-outline-gold text-xs flex items-center gap-2">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="glass-gold rounded-3xl p-12 text-center border border-gold-500/20 max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-cream mb-2">Your Cart is Empty</h2>
            <p className="font-inter text-sm text-cream/50 mb-8">
              Explore our boutique collection of Aari needles, threads, frames, and custom bridal materials.
            </p>
            <Link href="/shop" className="btn-luxury text-sm inline-flex items-center gap-2">
              Browse Store <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="badge-gold text-[9px] mb-1">{item.category}</span>
                      <h3 className="font-playfair font-bold text-cream text-base leading-tight mb-1">{item.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-gold-400 text-sm">₹{item.salePrice}</span>
                        {item.mrp > item.salePrice && (
                          <span className="text-cream/40 line-through text-xs">₹{item.mrp}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    <div className="flex items-center gap-2 glass rounded-xl border border-white/10 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-cream/70 hover:text-gold-400 hover:bg-white/5 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-inter text-sm font-bold text-cream w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-cream/70 hover:text-gold-400 hover:bg-white/5 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <div className="font-playfair font-bold text-cream text-base">
                        ₹{item.salePrice * item.quantity}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 rounded-xl text-cream/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="font-inter text-xs text-cream/40 hover:text-red-400 transition-colors"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="glass-gold rounded-3xl p-6 border border-gold-500/20 space-y-6 sticky top-28">
                <h2 className="font-playfair text-xl font-bold text-cream pb-3 border-b border-white/10">
                  Order Summary
                </h2>

                <div className="space-y-3 font-inter text-sm">
                  <div className="flex justify-between text-cream/70">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-cream">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-cream/70">
                    <span>Estimated Shipping</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-green-400 font-semibold">FREE</span>
                    ) : (
                      <span className="font-semibold text-cream">₹{deliveryCharge}</span>
                    )}
                  </div>

                  {settings.freeShippingEnabled && subtotal < settings.freeDeliveryThreshold && (
                    <div className="text-[11px] text-gold-400/80 p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20">
                      Add ₹{settings.freeDeliveryThreshold - subtotal} more for FREE Delivery!
                    </div>
                  )}

                  <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-playfair font-bold text-lg text-cream">Total</span>
                    <span className="font-playfair text-2xl font-bold text-gold-400">₹{grandTotal}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="btn-luxury w-full justify-center text-sm py-3.5 group flex items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-2 justify-center text-[11px] text-cream/40 font-inter">
                  <ShieldCheck size={14} className="text-gold-400" /> Secure Order &amp; Express WhatsApp Confirmation
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
