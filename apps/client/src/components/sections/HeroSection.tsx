'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Eye, CheckCircle2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 35 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
}

// Curated high-resolution Bridal Blouse & Aari Work images
const BRIDAL_FEATURED = [
  {
    id: 1,
    title: 'Royal Gold Zari Bridal Blouse',
    category: 'Heavy Bridal Work',
    estimate: '₹4,500 – ₹7,500',
    src: '/gallery/88d922362499a71835583f04df9bf97a.jpg',
    desc: 'Intricate gold threadwork with hand-embroidered floral motifs along neck and sleeve borders.',
  },
  {
    id: 2,
    title: 'Grand Kundan Peacock Motif',
    category: 'Maggam & Stone Work',
    estimate: '₹5,200 – ₹8,800',
    src: '/gallery/6f817a312dab16b83919340a31c8f863.jpg',
    desc: 'Heritage temple design embellished with genuine Kundan stones and silk thread accents.',
  },
  {
    id: 3,
    title: 'Traditional Zardosi Velvet Blouse',
    category: 'Zardosi Special',
    estimate: '₹4,800 – ₹7,200',
    src: '/gallery/3c5193ce7c639a340f1917dea3d31a26.jpg',
    desc: 'Deep maroon velvet base crafted with metallic zardosi embroidery for grand wedding receptions.',
  },
  {
    id: 4,
    title: 'Cutwork Heritage Silk Blouse',
    category: 'Designer Cutwork',
    estimate: '₹3,600 – ₹5,800',
    src: '/gallery/532a7fed4e07f55b76ad497abe48dddb.jpg',
    desc: 'Precision hand-cut border embroidery with delicate pearl drop bead accents.',
  },
]

// Static pre-computed particle data
const PARTICLES = [
  { w: 2.5, h: 2.5, l: 12.3, t: 18.7, o: 0.28, dur: 5.2, del: 0.0 },
  { w: 1.5, h: 1.5, l: 28.6, t: 64.1, o: 0.18, dur: 6.8, del: 0.5 },
  { w: 3.0, h: 3.0, l: 45.9, t: 32.5, o: 0.35, dur: 4.4, del: 1.0 },
  { w: 2.0, h: 2.0, l: 61.2, t: 78.9, o: 0.22, dur: 7.1, del: 1.5 },
  { w: 1.8, h: 1.8, l: 78.4, t: 11.3, o: 0.42, dur: 5.9, del: 2.0 },
  { w: 2.8, h: 2.8, l: 90.1, t: 55.7, o: 0.15, dur: 6.2, del: 0.3 },
  { w: 3.5, h: 3.5, l: 33.8, t: 44.6, o: 0.25, dur: 5.5, del: 1.3 },
  { w: 2.2, h: 2.2, l: 52.4, t: 7.2,  o: 0.32, dur: 7.3, del: 1.8 },
]

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gold-500"
          style={{ width: p.w, height: p.h, left: `${p.l}%`, top: `${p.t}%`, opacity: p.o }}
          animate={{ y: [0, -(30 + i * 2), 0], opacity: [p.o, p.o * 2.2, p.o], scale: [1, 1.5, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const [activeIndex, setActiveIndex] = useState(0)
  const [studioStatus, setStudioStatus] = useState({
    badgeText: '🟢 Taking New Orders',
    note: 'Slots open for bridal season',
    dotColor: '#10b981',
  })

  useEffect(() => {
    fetch('/api/studio-status')
      .then((r) => r.json())
      .then((d) => {
        if (d?.badgeText) setStudioStatus(d)
      })
      .catch(() => {})
  }, [])

  // Auto-rotate featured image every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BRIDAL_FEATURED.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const activeItem = BRIDAL_FEATURED[activeIndex]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#080604]"
    >
      {/* ── Background Gradients ──────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-mesh-gold opacity-20" />

      {/* Subtle embroidery pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 40m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <GoldParticles />

      {/* ── Main Hero Content ─────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="container-luxury relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── Left Column: Headline & Studio Info (7 Cols) ─ */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Live Studio Availability Badge */}
            <motion.div variants={stagger.item} className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-gold-500/30 text-xs font-inter font-semibold text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: studioStatus.dotColor }} />
                <span>{studioStatus.badgeText}</span>
              </div>
              <span className="text-xs font-inter text-cream/50 flex items-center gap-1">
                <Sparkles size={12} className="text-gold-400" /> Premium Aari Embroidery Studio · Kaveripakkam
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={stagger.item}
              className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 text-cream"
            >
              Exquisite <span className="text-gradient-gold-animated">Bridal Blouse</span> Aari Embroidery
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={stagger.item}
              className="font-cormorant text-xl sm:text-2xl text-cream/75 leading-relaxed mb-6 max-w-xl"
            >
              Handcrafted with generations of bridal embroidery heritage. Every silk stitch, Kundan stone, and gold Zari detail tailored to perfection for your big day.
            </motion.p>

            {/* Address & Trust badges */}
            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs font-inter text-cream/60 glass py-1.5 px-3 rounded-xl border border-white/10">
                <CheckCircle2 size={14} className="text-gold-400" /> 1000+ Custom Aari Blouses Delivered
              </div>
              <div className="flex items-center gap-2 text-xs font-inter text-cream/60 glass py-1.5 px-3 rounded-xl border border-white/10">
                <CheckCircle2 size={14} className="text-gold-400" /> 100% Perfect Fitting Guarantee
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4">
              <Link href="/book-appointment" className="btn-luxury text-sm group">
                Book Bridal Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/gallery" className="btn-outline-gold text-sm flex items-center gap-2">
                <Eye size={15} /> View Full Gallery
              </Link>
              <a
                href={`https://wa.me/917604887356?text=${encodeURIComponent(
                  `Hi Sangee Sri Aari Works! I saw your "${activeItem.title}" on the website and want to inquire about custom bridal blouse orders.`
                )}`}
                className="flex items-center gap-2 text-sm font-inter font-semibold text-green-400 hover:text-green-300 transition-colors group"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/25 transition-all group-hover:scale-110">
                  <FaWhatsapp size={18} />
                </div>
                <span>WhatsApp Inquiry</span>
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Bridal Blouse Interactive Showcase (5 Cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            {/* Outer Glow frame */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-gold-500/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[#0d0906] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeItem.src}
                    alt={activeItem.title}
                    fill
                    unoptimized
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-transparent to-black/30" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="badge-gold text-xs font-semibold shadow-md">
                      ✨ {activeItem.category}
                    </span>
                  </div>

                  {/* Bottom Info Card */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#080604] via-[#080604]/90 to-transparent z-10">
                    <h3 className="font-playfair text-xl font-bold text-cream mb-1">
                      {activeItem.title}
                    </h3>
                    <p className="font-inter text-xs text-cream/70 line-clamp-2 mb-3 font-light">
                      {activeItem.desc}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                      <span className="font-inter text-xs text-gold-400 font-bold">
                        Estimate: {activeItem.estimate}
                      </span>
                      <Link
                        href="/gallery"
                        className="text-[11px] font-inter font-semibold text-cream/80 hover:text-gold-400 flex items-center gap-1 transition-colors"
                      >
                        Explore Gallery <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Thumbnail Selector Strip */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto max-w-md py-1">
              {BRIDAL_FEATURED.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                    activeIndex === idx
                      ? 'border-gold-400 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-gold-500/50'
                  }`}
                >
                  <Image src={item.src} alt={item.title} fill unoptimized className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}

