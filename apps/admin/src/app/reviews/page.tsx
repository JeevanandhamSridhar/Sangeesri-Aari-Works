'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle2, XCircle, Clock, MessageSquare, Trash2 } from 'lucide-react'

type Review = {
  id: string
  name: string
  location: string
  rating: number
  occasion: string
  review: string
  isApproved: boolean
  createdAt: string
}

const statusBadge = (approved: boolean) =>
  approved
    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        // Demo data while API is not connected
        setReviews([
          { id: '1', name: 'Priya Lakshmi', location: 'Vellore', rating: 5, occasion: 'Wedding', review: 'Absolutely stunning bridal blouse!', isApproved: true, createdAt: '2025-01-15' },
          { id: '2', name: 'Meena Devi', location: 'Chennai', rating: 5, occasion: 'Reception', review: 'The maggam work was breathtaking.', isApproved: false, createdAt: '2025-02-01' },
          { id: '3', name: 'Kavitha R.', location: 'Ranipet', rating: 4, occasion: 'Festival', review: 'Beautiful silk blouse with traditional Aari work.', isApproved: false, createdAt: '2025-02-10' },
        ])
        setLoading(false)
      })
  }, [])

  const approve = async (id: string) => {
    try {
      await fetch(`/api/testimonials/${id}/approve`, { method: 'PATCH' })
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, isApproved: true } : r))
    } catch {
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, isApproved: true } : r))
    }
  }

  const reject = async (id: string) => {
    if (!confirm('Delete this review permanently?')) return
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      setReviews((prev) => prev.filter((r) => r.id !== id))
    } catch {
      setReviews((prev) => prev.filter((r) => r.id !== id))
    }
  }

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.isApproved
    if (filter === 'approved') return r.isApproved
    return true
  })

  const pendingCount = reviews.filter((r) => !r.isApproved).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Customer Reviews</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">Approve reviews to show them on the client website</p>
        </div>
        {pendingCount > 0 && (
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full font-inter text-xs font-semibold">
            {pendingCount} Pending Approval
          </span>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3">
        {(['all', 'pending', 'approved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-inter text-xs font-medium capitalize transition-all duration-200
              ${filter === f
                ? 'bg-gold-500 text-darkbase'
                : 'glass border border-white/10 text-cream/60 hover:border-gold-500/30 hover:text-gold-400'
              }`}
          >
            {f === 'all' ? `All (${reviews.length})` : f === 'pending' ? `Pending (${pendingCount})` : `Approved (${reviews.filter(r => r.isApproved).length})`}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-admin rounded-3xl p-12 text-center border border-white/5">
          <MessageSquare size={36} className="text-cream/20 mx-auto mb-4" />
          <p className="font-cormorant text-xl text-cream/40">No reviews in this category</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-admin rounded-2xl p-6 border border-white/5 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-playfair text-base font-bold text-cream">{review.name}</span>
                    {review.location && (
                      <span className="font-inter text-xs text-cream/40">{review.location}</span>
                    )}
                    {review.occasion && (
                      <span className="font-inter text-xs text-cream/40">· {review.occasion}</span>
                    )}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-inter font-semibold ${statusBadge(review.isApproved)}`}>
                      {review.isApproved ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={12} className={j < review.rating ? 'fill-gold-500 text-gold-500' : 'text-white/20'} />
                    ))}
                  </div>

                  <p className="font-inter text-sm text-cream/70 leading-relaxed italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  {!review.isApproved && (
                    <button
                      onClick={() => approve(review.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/30
                        text-green-400 font-inter text-xs font-semibold hover:bg-green-500/25 transition-colors"
                    >
                      <CheckCircle2 size={13} /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => reject(review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20
                      text-red-400 font-inter text-xs font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>

              <div className="font-inter text-[11px] text-cream/30 border-t border-white/5 pt-3">
                Submitted: {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
