'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { VideoLogo } from '@/components/ui/VideoLogo'

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  },
}

// Static pre-computed particle data — avoids SSR/client hydration mismatch
const PARTICLES = [
  { w: 2.5, h: 2.5, l: 12.3, t: 18.7, o: 0.28, dur: 5.2, del: 0.0 },
  { w: 1.5, h: 1.5, l: 28.6, t: 64.1, o: 0.18, dur: 6.8, del: 0.5 },
  { w: 3.0, h: 3.0, l: 45.9, t: 32.5, o: 0.35, dur: 4.4, del: 1.0 },
  { w: 2.0, h: 2.0, l: 61.2, t: 78.9, o: 0.22, dur: 7.1, del: 1.5 },
  { w: 1.8, h: 1.8, l: 78.4, t: 11.3, o: 0.42, dur: 5.9, del: 2.0 },
  { w: 2.8, h: 2.8, l: 90.1, t: 55.7, o: 0.15, dur: 6.2, del: 0.3 },
  { w: 1.2, h: 1.2, l: 5.7,  t: 88.4, o: 0.38, dur: 4.8, del: 0.8 },
  { w: 3.5, h: 3.5, l: 33.8, t: 44.6, o: 0.25, dur: 5.5, del: 1.3 },
  { w: 2.2, h: 2.2, l: 52.4, t: 7.2,  o: 0.32, dur: 7.3, del: 1.8 },
  { w: 1.7, h: 1.7, l: 70.5, t: 92.1, o: 0.19, dur: 4.6, del: 2.3 },
  { w: 2.9, h: 2.9, l: 83.3, t: 28.8, o: 0.44, dur: 6.0, del: 0.6 },
  { w: 1.4, h: 1.4, l: 19.7, t: 71.5, o: 0.27, dur: 5.7, del: 1.1 },
  { w: 3.2, h: 3.2, l: 40.0, t: 50.0, o: 0.21, dur: 4.2, del: 1.6 },
  { w: 2.6, h: 2.6, l: 56.8, t: 15.4, o: 0.36, dur: 6.5, del: 2.1 },
  { w: 1.9, h: 1.9, l: 74.2, t: 83.7, o: 0.13, dur: 5.1, del: 0.4 },
  { w: 2.4, h: 2.4, l: 88.9, t: 39.6, o: 0.40, dur: 6.9, del: 0.9 },
  { w: 1.6, h: 1.6, l: 3.1,  t: 60.3, o: 0.23, dur: 4.9, del: 1.4 },
  { w: 3.8, h: 3.8, l: 96.5, t: 25.8, o: 0.30, dur: 5.4, del: 1.9 },
]

function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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


// Big logo glow display for the right side
function LogoDisplay() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-gold-500/10"
          style={{ width: 280 + i * 80, height: 280 + i * 80 }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        />
      ))}

      {/* Core logo container */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Gold circle bg */}
        <div
          className="w-52 h-52 md:w-64 md:h-64 rounded-full flex items-center justify-center relative"
          style={{
            background: 'radial-gradient(circle at 40% 35%, rgba(212,175,55,0.18) 0%, rgba(183,110,121,0.08) 50%, transparent 70%)',
            boxShadow: '0 0 80px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.08)',
          }}
        >
          {/* Logo image or fallback text */}
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            <VideoLogo size="xl" showText={false} />
          </div>
        </div>

        {/* Studio name below logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-center"
        >
          <div className="font-cormorant text-xs tracking-[0.5em] text-gold-400/60 uppercase mb-1">
            Kaveripakkam · Est. 2017
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Fetch hero background media from admin settings (dynamic)
  const [heroBg, setHeroBg] = useState<string | null>(null)
  useEffect(() => {
    fetch('/api/settings?key=hero_media')
      .then((r) => r.json())
      .then((d) => { if (d?.value) setHeroBg(d.value) })
      .catch(() => {}) // silent fail, use default bg
  }, [])

  const isVideo = heroBg && (heroBg.includes('.mp4') || heroBg.includes('.webm'))
  const isGif = heroBg && heroBg.includes('.gif')

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background ───────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-mesh-gold opacity-25" />

      {/* Dynamic admin-controlled background */}
      {heroBg && !isVideo && (
        <div className="absolute inset-0">
          <Image src={heroBg} alt="Hero background" fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0806]/95 via-[#0A0806]/70 to-[#0A0806]/40" />
        </div>
      )}
      {isVideo && (
        <div className="absolute inset-0">
          <video
            src={heroBg!}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0806]/95 via-[#0A0806]/70 to-[#0A0806]/40" />
        </div>
      )}

      {/* Embroidery pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M40 40m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M10 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M70 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M10 70m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M70 70m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold floating particles */}
      <GoldParticles />

      {/* ── Main Content ─────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="container-luxury relative z-10 pt-24 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

          {/* ── Left: Text ─────────────────────────────── */}
          <motion.div
            variants={stagger.container}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Label */}
            <motion.div variants={stagger.item} className="flex items-center gap-3 mb-6">
              <div className="section-label mb-0">
                <Sparkles size={12} />
                Premium Aari Work · Kaveripakkam
                <Sparkles size={12} />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={stagger.item}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
            >
              <span className="block text-cream">Where Thread</span>
              <span className="block text-gradient-gold-animated">Meets Artistry</span>
              <span className="block text-cream/80 text-4xl sm:text-5xl lg:text-6xl font-normal italic mt-2">
                — in every stitch
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={stagger.item}
              className="font-cormorant text-xl sm:text-2xl text-cream/60 leading-relaxed mb-4 max-w-lg"
            >
              Exquisite Aari embroidery &amp; bridal blouse designs crafted with generations of tradition.
              Your dream design, woven into reality.
            </motion.p>

            {/* Address badge */}
            <motion.div variants={stagger.item} className="mb-10">
              <span className="badge-gold text-xs">
                📍 No. 6, Bazaar Street, Kaveripakkam · Ranipet · PIN 632508
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4">
              <Link href="/book-appointment" className="btn-luxury text-sm group">
                Book Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/gallery" className="btn-outline-gold text-sm">
                View Gallery
              </Link>
              <a
                href="https://wa.me/917604887356?text=Hi! I'd like to enquire about your services."
                className="flex items-center gap-2 text-sm font-inter font-semibold text-green-400 hover:text-green-300 transition-colors group"
                target="_blank"
                rel="noreferrer"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500/25 transition-all group-hover:scale-110">
                  <FaWhatsapp size={18} />
                </div>
                Chat Now
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={stagger.item}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10"
            >
              {[
                { value: '700+', label: 'Projects Done' },
                { value: '100+', label: 'Bridal Blouses' },
                { value: '8+', label: 'Years Experience' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-playfair text-2xl font-bold text-gradient-gold">{stat.value}</div>
                  <div className="font-inter text-xs text-cream/40 tracking-wide mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Logo Display ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <LogoDisplay />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] tracking-[0.3em] text-cream/30 uppercase">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-gold-500/60 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 w-full h-1/2 bg-gold-400"
            animate={{ y: ['0%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
