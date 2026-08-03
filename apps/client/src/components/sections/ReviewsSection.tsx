'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquarePlus, X, Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────
type Review = {
  id: string
  name: string
  location: string
  rating: number
  date: string
  occasion: string
  review: string
  verified: boolean
  avatarInitial?: string
}

// ── Star Picker ────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={24}
            className={cn(
              'transition-colors',
              (hover || value) >= n ? 'fill-gold-500 text-gold-500' : 'text-white/20'
            )}
          />
        </button>
      ))}
    </div>
  )
}

// ── Write Review Modal ─────────────────────────────────────
function WriteReviewModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', location: '', occasion: '', rating: 5, review: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.review || form.rating === 0) return
    setStatus('loading')
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 glass-gold rounded-3xl p-8 w-full max-w-lg border border-gold-500/20
          shadow-[0_0_60px_rgba(212,175,55,0.1)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center
            text-cream/60 hover:text-cream hover:bg-white/20 transition-all"
        >
          <X size={16} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle size={48} className="text-green-400 mx-auto" />
            <h3 className="font-playfair text-2xl font-bold text-cream">Thank You!</h3>
            <p className="font-inter text-sm text-cream/60">
              Your review has been submitted and is pending approval. We appreciate your feedback!
            </p>
            <button onClick={onClose} className="btn-luxury text-sm mt-4">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-playfair text-2xl font-bold text-cream mb-1">Share Your Experience</h3>
              <p className="font-inter text-xs text-cream/50">Your review helps other brides make better decisions</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-inter text-xs text-cream/50 mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Priya Lakshmi"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                      font-inter text-sm text-cream placeholder:text-cream/30
                      focus:outline-none focus:border-gold-500/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/50 mb-1 block">City</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Vellore"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                      font-inter text-sm text-cream placeholder:text-cream/30
                      focus:outline-none focus:border-gold-500/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/50 mb-1 block">Occasion</label>
                <select
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                    font-inter text-sm text-cream focus:outline-none focus:border-gold-500/40 transition-colors"
                >
                  <option value="" className="bg-[#0A0806]">Select occasion</option>
                  {['Wedding', 'Reception', 'Engagement', 'Festival', 'Party', 'Other'].map((o) => (
                    <option key={o} value={o} className="bg-[#0A0806]">{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/50 mb-2 block">Your Rating *</label>
                <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/50 mb-1 block">Your Review *</label>
                <textarea
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Tell us about your experience with Sangee Sri Aari Works…"
                  rows={4}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                    font-inter text-sm text-cream placeholder:text-cream/30 resize-none
                    focus:outline-none focus:border-gold-500/40 transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="font-inter text-xs text-red-400">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-luxury w-full justify-center text-sm"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={14} /> Submit Review
                  </span>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Avatar circle (initials fallback) ────────────────────
function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#D4AF37', '#B76E79', '#8f6e0d', '#5C1A1A', '#3d6e3a']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 shrink-0"
      style={{ background: `${color}20`, borderColor: `${color}40`, color }}
    >
      {initials}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────
export function ReviewsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch('/api/testimonials?approved=true')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data)
        } else {
          // Fallback demo reviews if API not yet connected
          setReviews([
            {
              id: '1', name: 'Priya Lakshmi', location: 'Vellore', rating: 5,
              date: 'December 2024', occasion: 'Wedding', verified: true,
              review: 'Absolutely stunning bridal blouse! The Aari work was so detailed and perfect. Everyone at my wedding complimented it.',
            },
            {
              id: '2', name: 'Meena Devi', location: 'Chennai', rating: 5,
              date: 'January 2025', occasion: 'Reception', verified: true,
              review: 'The maggam work on my reception blouse was breathtaking. Quality of thread work is exceptional and delivery was on time.',
            },
            {
              id: '3', name: 'Kavitha R.', location: 'Ranipet', rating: 5,
              date: 'February 2025', occasion: 'Festival', verified: true,
              review: 'Got a beautiful silk blouse with traditional Aari work done here. The attention to detail is amazing.',
            },
          ])
        }
        setLoading(false)
      })
      .catch(() => {
        setReviews([])
        setLoading(false)
      })
  }, [])

  const prev = () => setActive((a) => (a - 1 + reviews.length) % reviews.length)
  const next = () => setActive((a) => (a + 1) % reviews.length)

  return (
    <>
      <section ref={ref} className="section-padding bg-[#060402] relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gold opacity-20" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        <div className="container-luxury relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="section-label justify-center mb-4">
              <span className="w-8 h-px bg-gold-500" />
              Client Stories
              <span className="w-8 h-px bg-gold-500" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              <span className="text-cream">Loved by </span>
              <span className="text-gradient-gold">Every Bride</span>
            </h2>
            <p className="font-cormorant text-xl text-cream/50 mt-4">Real stories from real customers</p>

            {/* Write review CTA */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              onClick={() => setShowModal(true)}
              className="mt-6 flex items-center gap-2 btn-outline-gold text-sm mx-auto"
            >
              <MessageSquarePlus size={15} />
              Share Your Experience
            </motion.button>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-xl text-cream/40">Be the first to share your experience!</p>
            </div>
          ) : (
            <>
              {/* Main review card */}
              <div className="relative max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 60, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -60, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-gold rounded-4xl p-8 md:p-12"
                  >
                    <Quote className="text-gold-500/30 mb-6" size={48} />
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: reviews[active].rating }).map((_, i) => (
                        <Star key={i} size={20} className="fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                    <p className="font-cormorant text-xl md:text-2xl text-cream/80 leading-relaxed mb-8 italic">
                      &ldquo;{reviews[active].review}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <Avatar name={reviews[active].name} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-playfair text-lg font-semibold text-cream">{reviews[active].name}</p>
                          {reviews[active].verified && (
                            <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full font-inter">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="font-inter text-sm text-cream/40">
                          {reviews[active].location}
                          {reviews[active].occasion ? ` · ${reviews[active].occasion}` : ''}
                          {reviews[active].date ? ` · ${reviews[active].date}` : ''}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  <button
                    onClick={prev}
                    className="w-11 h-11 rounded-full glass border border-gold-500/20 flex items-center justify-center
                      text-cream/60 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="flex gap-2">
                    {reviews.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={cn(
                          'rounded-full transition-all duration-300',
                          i === active ? 'w-6 h-2 bg-gold-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                        )}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-11 h-11 rounded-full glass border border-gold-500/20 flex items-center justify-center
                      text-cream/60 hover:text-gold-400 hover:border-gold-500/40 transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Mini cards */}
              {reviews.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-12">
                  {reviews.slice(0, 5).map((r, i) => (
                    <motion.button
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      onClick={() => setActive(i)}
                      className={cn(
                        'p-4 rounded-2xl text-left transition-all duration-300 border',
                        i === active ? 'glass-gold border-gold-500/30' : 'glass border-white/5 hover:border-gold-500/20'
                      )}
                    >
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} size={10} className="fill-gold-500 text-gold-500" />
                        ))}
                      </div>
                      <p className="font-inter text-xs text-cream/50 line-clamp-2 mb-2">{r.review}</p>
                      <p className="font-playfair text-xs font-semibold text-cream/70">{r.name}</p>
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Write review modal */}
      <AnimatePresence>
        {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}
