'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Package, Truck, CheckCircle2, Clock, Star, MessageSquarePlus, Sparkles } from 'lucide-react'
import { ReviewsSection } from '@/components/sections/ReviewsSection'

interface TrackedOrder {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  city: string
  itemsCount: number
  totalAmount: number
  orderStatus: 'PLACED' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  trackingNumber?: string
  date: string
}

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('orderId') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(null)
  const [searched, setSearched] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  // Demo order catalog for lookup lookup fallback
  const demoOrders: TrackedOrder[] = [
    { id: '1', orderNumber: 'ORD-2026-9021', customerName: 'Priya Lakshmi', customerPhone: '9876543210', city: 'Vellore', itemsCount: 2, totalAmount: 4999, orderStatus: 'DELIVERED', trackingNumber: 'ST-VEL-99182', date: '2026-07-28' },
    { id: '2', orderNumber: 'ORD-2026-9020', customerName: 'Meena Devi', customerPhone: '9789012345', city: 'Chennai', itemsCount: 1, totalAmount: 999, orderStatus: 'SHIPPED', trackingNumber: 'ST-CHN-44102', date: '2026-07-30' },
    { id: '3', orderNumber: 'ORD-2026-9019', customerName: 'Kavitha R.', customerPhone: '9123456789', city: 'Ranipet', itemsCount: 1, totalAmount: 499, orderStatus: 'PACKED', date: '2026-08-01' },
  ]

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    // Search in local storage first
    let found: TrackedOrder | null = null
    try {
      const local = JSON.parse(localStorage.getItem('sangee_sri_orders') || '[]')
      found = local.find(
        (o: TrackedOrder) => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase()
      )
    } catch {}

    if (!found) {
      found = demoOrders.find(
        (o) => o.orderNumber.toLowerCase() === searchQuery.trim().toLowerCase()
      ) || null
    }

    setActiveOrder(found)
    setSearched(true)
  }

  useEffect(() => {
    if (initialQuery) {
      handleSearch()
    }
  }, [initialQuery])

  const statusSteps = ['PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED']

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">
            <Package size={12} />
            Live Tracking &amp; Reviews
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cream">Track Your </span>
            <span className="text-gradient-gold">Order</span>
          </h1>
          <p className="font-inter text-cream/50 text-sm max-w-md mx-auto">
            Enter your Order ID (e.g. #ORD-2026-9021) to check live status and leave a review once delivered.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-lg mx-auto mb-12">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. ORD-2026-9021)"
              className="input-luxury pl-12 text-sm uppercase font-mono"
            />
          </div>
          <button type="submit" className="btn-luxury text-sm shrink-0">
            Track Status
          </button>
        </form>

        {/* Active Order Result */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            {activeOrder ? (
              <div className="glass-gold rounded-3xl p-8 border border-gold-500/20 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="font-mono text-gold-400 text-lg font-bold">#{activeOrder.orderNumber}</span>
                    <h2 className="font-playfair text-xl font-bold text-cream mt-1">{activeOrder.customerName}</h2>
                    <p className="font-inter text-xs text-cream/40">{activeOrder.city} · Placed on {activeOrder.date}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-inter ${
                      activeOrder.orderStatus === 'DELIVERED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      activeOrder.orderStatus === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    }`}>
                      STATUS: {activeOrder.orderStatus}
                    </span>
                    {activeOrder.trackingNumber && (
                      <p className="font-mono text-[11px] text-cream/50 mt-2">Tracking #: {activeOrder.trackingNumber}</p>
                    )}
                  </div>
                </div>

                {/* Stepper */}
                <div>
                  <h3 className="font-inter text-xs text-cream/50 uppercase tracking-widest mb-6">Delivery Progress</h3>
                  <div className="grid grid-cols-5 gap-2 relative">
                    {statusSteps.map((step, i) => {
                      const currentIndex = statusSteps.indexOf(activeOrder.orderStatus)
                      const isDone = i <= currentIndex
                      const isCurrent = i === currentIndex

                      return (
                        <div key={step} className="text-center space-y-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${
                            isDone ? 'bg-gold-500 text-darkbase font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]' : 'bg-white/5 border border-white/10 text-cream/30'
                          }`}>
                            {isDone ? '✓' : i + 1}
                          </div>
                          <span className={`font-inter text-[10px] block ${isCurrent ? 'text-gold-400 font-bold' : isDone ? 'text-cream/70' : 'text-cream/30'}`}>
                            {step}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* REVIEW SYSTEM TRIGGER: ONLY POPPED UP FOR DELIVERED / COMPLETED ORDERS */}
                {activeOrder.orderStatus === 'DELIVERED' ? (
                  <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center space-y-3">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-gold-500 text-gold-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <h4 className="font-playfair text-xl font-bold text-cream">Your Order Has Been Delivered!</h4>
                    <p className="font-inter text-xs text-cream/60 max-w-md mx-auto">
                      We hope you love your handcrafted Aari design! As a verified customer, please take 1 minute to share your review.
                    </p>
                    <button
                      onClick={() => setShowReviewModal(true)}
                      className="btn-luxury text-xs px-6 py-2.5 inline-flex items-center gap-2"
                    >
                      <MessageSquarePlus size={16} /> Write Verified Customer Review
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="font-inter text-xs text-cream/50">
                      🚚 Your order is currently being processed. Once delivered, you will be able to submit a customer review here!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="glass-dark rounded-3xl p-8 text-center border border-white/5">
                <p className="font-inter text-sm text-cream/50">No order found matching &quot;{searchQuery}&quot;. Please check your Order ID.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Dynamic Reviews Section Component */}
        <ReviewsSection />
      </div>
    </div>
  )
}
