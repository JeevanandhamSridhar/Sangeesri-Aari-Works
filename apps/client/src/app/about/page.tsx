'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Sparkles, Award, Heart, ShieldCheck, ArrowRight, Scissors, Star, Quote } from 'lucide-react'

const skills = [
  { label: 'Aari Embroidery', pct: 98 },
  { label: 'Bridal Blouse Design', pct: 95 },
  { label: 'Stone & Zardosi Work', pct: 92 },
  { label: 'Custom Tailoring', pct: 90 },
]

export default function AboutPage() {
  const artistRef = useRef<HTMLDivElement>(null)
  const isArtistInView = useInView(artistRef, { once: true, margin: '-80px' })

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury space-y-28">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} />
            Heritage &amp; Craftsmanship
            <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cream">Crafting Timeless </span>
            <span className="text-gradient-gold">Aari Embroidery</span>
          </h1>
          <p className="font-cormorant text-xl text-cream/70 leading-relaxed">
            Located in Kaveripakkam, Ranipet District, Sangee Sri Aari Works is dedicated
            to transforming raw silk into regal bridal masterpieces.
          </p>
        </div>

        {/* ── Story Section ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-4xl overflow-hidden glass border border-gold-500/20">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Artisan at work"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkbase/60 via-transparent to-transparent" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="font-inter text-xs text-gold-500 tracking-widest uppercase font-semibold">
              Our Journey
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
              Preserving Tradition, Embracing Perfection
            </h2>
            <p className="font-inter text-sm text-cream/70 leading-relaxed">
              Started with a passion for intricate needlecraft, Sangee Sri Aari Works has grown
              into Kaveripakkam's premier destination for custom bridal blouse design and
              authentic Aari work materials.
            </p>
            <p className="font-inter text-sm text-cream/70 leading-relaxed">
              Every stitch tells a story of patience. From selecting the finest zari threads
              to hand-placing each kundan stone, we treat every blouse as an individual canvas.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="glass p-6 rounded-2xl border border-white/10">
                <p className="font-playfair text-3xl font-bold text-gold-400">700+</p>
                <p className="font-inter text-xs text-cream/50 mt-1">Bridal &amp; Event Blouses Delivered</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/10">
                <p className="font-playfair text-3xl font-bold text-gold-400">100%</p>
                <p className="font-inter text-xs text-cream/50 mt-1">Hand-Crafted Precision</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Meet the Artist ──────────────────────────────────────── */}
        <div ref={artistRef} className="relative overflow-hidden">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isArtistInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-label justify-center mb-4">
              <Scissors size={12} />
              The Founder
              <Scissors size={12} />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold">
              <span className="text-cream">Meet </span>
              <span className="text-gradient-gold">The Artist</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isArtistInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto lg:mx-0"
            >
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-[40px] border border-gold-500/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-[50px] border border-gold-500/5" />

              {/* Main photo container */}
              <div className="relative w-72 md:w-96 aspect-[3/4] rounded-[32px] overflow-hidden
                border-2 border-gold-500/30 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
                <Image
                  src="/owner.png"
                  alt="Sangeetha — Founder of Sangee Sri Aari Works"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/40 via-transparent to-transparent" />
              </div>

              {/* Floating experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isArtistInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -right-4 top-8 glass-gold rounded-2xl p-4 border border-gold-500/40
                  shadow-luxury text-center"
              >
                <div className="font-playfair text-3xl font-bold text-gradient-gold">8+</div>
                <div className="font-inter text-[10px] text-cream/60 tracking-widest uppercase mt-0.5">
                  Years of<br />Mastery
                </div>
              </motion.div>

              {/* Floating star rating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isArtistInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="absolute -left-4 bottom-12 glass rounded-xl px-4 py-3 border border-white/10
                  flex items-center gap-2"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <span className="font-inter text-[10px] text-cream/70">100% Satisfied</span>
              </motion.div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isArtistInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              <div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-1">
                  Kaviya S
                </h3>
                <p className="font-cormorant text-base tracking-widest text-gold-400/80 uppercase">
                  Founder &amp; Lead Artisan
                </p>
              </div>

              {/* Quote */}
              <div className="relative pl-6 border-l-2 border-gold-500/40">
                <Quote size={18} className="text-gold-500/40 absolute -left-2 -top-1" />
                <p className="font-cormorant text-xl text-cream/80 italic leading-relaxed">
                  Every thread I place is a promise — that your blouse will be as
                  beautiful as the day itself. That is my commitment to every bride.
                </p>
              </div>

              <p className="font-inter text-sm text-cream/65 leading-relaxed">
                With over 8 years of dedicated practice in traditional Aari embroidery,
                Kaviya S has transformed a passion for needlecraft into one of Kaveripakkam's
                most loved boutiques. She personally oversees every design — from the first
                consultation sketch to the final stitch.
              </p>

              <p className="font-inter text-sm text-cream/65 leading-relaxed">
                Trained in both traditional Maggam work and modern Zardosi techniques,
                she blends cultural heritage with contemporary fashion sensibilities —
                creating blouses that are timeless yet trend-aware.
              </p>

              {/* Skill bars */}
              <div className="space-y-4 pt-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isArtistInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex justify-between mb-1.5">
                      <span className="font-inter text-xs text-cream/70">{skill.label}</span>
                      <span className="font-inter text-xs text-gold-400">{skill.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #D4AF37, #B76E79)' }}
                        initial={{ width: 0 }}
                        animate={isArtistInView ? { width: `${skill.pct}%` } : {}}
                        transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/book-appointment" className="btn-luxury text-sm inline-flex group">
                Book a Personal Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Core Values ─────────────────────────────────────────── */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-cream mb-3">Why Brides Trust Us</h2>
            <p className="font-inter text-xs text-cream/50">Our unyielding standards for excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-gold p-8 rounded-3xl border border-gold-500/20 text-center space-y-4">
              <Award size={36} className="text-gold-400 mx-auto" />
              <h3 className="font-playfair text-xl font-bold text-cream">Master Artistry</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                8+ years of cumulative artisan experience guaranteeing sharp motifs and sturdy thread knotting.
              </p>
            </div>
            <div className="glass-gold p-8 rounded-3xl border border-gold-500/20 text-center space-y-4">
              <ShieldCheck size={36} className="text-gold-400 mx-auto" />
              <h3 className="font-playfair text-xl font-bold text-cream">Genuine Materials</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                We use high-grade zari, pure mulberry silk threads, and crystal stones that retain their shine for years.
              </p>
            </div>
            <div className="glass-gold p-8 rounded-3xl border border-gold-500/20 text-center space-y-4">
              <Heart size={36} className="text-gold-400 mx-auto" />
              <h3 className="font-playfair text-xl font-bold text-cream">Personal Care</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                Direct consultation, customization to match your exact saree border, and guaranteed on-time delivery.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA Banner ──────────────────────────────────────────── */}
        <div className="glass-gold rounded-4xl p-12 text-center border border-gold-500/30 space-y-6">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
            Ready to Begin Your Design Story?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quotation" className="btn-luxury text-xs">
              Get Quotation <ArrowRight size={14} />
            </Link>
            <Link href="/shop" className="btn-outline-gold text-xs">
              Explore Aari Shop
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
