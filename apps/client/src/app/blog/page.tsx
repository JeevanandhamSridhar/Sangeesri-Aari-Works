'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Calendar, Clock, User, ArrowRight, X, Newspaper, Share2, Tag } from 'lucide-react'
import { toast } from 'sonner'

export interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  readTime: string
  date: string
  author: string
  image: string
  excerpt: string
  content: string
  published?: boolean
}

export default function BlogspotPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetch('/api/blog-store')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts)
        }
      })
      .catch(() => toast.error('Failed to load blog updates'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', 'Bridal Trends', 'Federation Updates', 'Embroidery Guides', 'Care & Maintenance', 'Studio Updates']

  const filteredPosts = posts.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  )

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-darkbase pt-28 md:pt-36 pb-24 overflow-x-hidden">
      <div className="container-luxury space-y-12 px-4 sm:px-6">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="section-label justify-center">
            <Sparkles size={12} />
            Daily Updates &amp; Bridal Insights
            <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold">
            <span className="text-cream">Sangee Sri </span>
            <span className="text-gradient-gold">Blogspot</span>
          </h1>
          <p className="font-cormorant text-lg sm:text-xl text-cream/70 leading-relaxed">
            Daily updates on Aari embroidery design trends, bridal blouse care guides, and official Indian Aari Work Federation news from Kaviya S.
          </p>
        </div>

        {/* ── Category Filter Tabs ─────────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl font-inter text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-darkbase shadow-[0_0_20px_rgba(212,175,55,0.3)] font-bold'
                  : 'glass border border-white/10 text-cream/60 hover:text-cream hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Blog Grid ────────────────────────────────────────────── */}
        {loading ? (
          <div className="text-center py-20 text-cream/50 font-inter text-xs">
            Loading daily updates...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
            <Newspaper size={36} className="text-gold-400 mx-auto opacity-60" />
            <h3 className="font-playfair text-lg font-bold text-cream">No Articles Found</h3>
            <p className="font-inter text-xs text-cream/60">Check back soon for daily Aari work updates in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="glass-admin rounded-3xl border border-white/10 overflow-hidden group cursor-pointer hover:border-gold-400/50 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-black/60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-transparent to-transparent opacity-60" />

                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-gold-400 border border-gold-500/40 text-[10px] font-bold px-3 py-1 rounded-full font-inter">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-gold-400/80 font-inter font-medium">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h3 className="font-playfair text-xl font-bold text-cream group-hover:text-gold-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="font-inter text-xs text-cream/70 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                  <span className="font-inter text-[11px] text-cream/50 flex items-center gap-1">
                    <User size={12} className="text-gold-400" /> {post.author}
                  </span>
                  <span className="font-inter text-xs font-bold text-gold-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── FULL ARTICLE READER MODAL ────────────────────────────── */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-3xl w-full glass-admin rounded-3xl border border-gold-500/40 p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="badge-gold text-xs font-bold">{selectedPost.category}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(selectedPost)}
                    className="p-2 rounded-full hover:bg-white/10 text-cream/70 hover:text-gold-400 transition-colors"
                    title="Share Article"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-full hover:bg-white/10 text-cream/70 hover:text-cream transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gold-400 font-inter">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {selectedPost.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {selectedPost.readTime}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><User size={12} /> {selectedPost.author}</span>
                </div>

                <h2 className="font-playfair text-2xl sm:text-4xl font-bold text-cream leading-tight">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="font-inter text-sm sm:text-base text-cream/80 leading-relaxed whitespace-pre-line space-y-4 border-t border-white/10 pt-4">
                {selectedPost.content}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-inter text-cream/50">
                <span>Sangee Sri Aari Works — Official Blogspot</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="btn-luxury text-xs py-2 px-4"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
