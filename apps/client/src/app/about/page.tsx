'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Sparkles, Award, Heart, ShieldCheck, ArrowRight, Scissors, Star, Quote, Globe, Trophy, Calendar, Medal } from 'lucide-react'

const skills = [
  { label: 'Aari Embroidery & Zari Work', pct: 98 },
  { label: 'Bridal Blouse Designing', pct: 96 },
  { label: 'Kundan, Stone & Cutwork', pct: 94 },
  { label: 'Zardosi & Heritage Motifs', pct: 92 },
]

const achievements = [
  {
    icon: Medal,
    date: 'Official Role',
    title: 'Joint Secretary of Ranipet District',
    org: 'Indian Aari Work Federation',
    description: 'Appointed Joint Secretary of Ranipet District, leading initiatives to empower local embroidery artisans, promote traditional needlework, and enforce high quality standards.',
    highlight: 'District Leadership',
  },
  {
    icon: Trophy,
    date: 'November 2025',
    title: 'Conducted Noble World Record Event',
    org: 'World Record Achievement',
    description: 'Successfully organized and conducted the Noble World Record Event for Aari Work, bringing together master craftspeople to create record-breaking hand-embroidered art.',
    highlight: 'World Record Event',
  },
  {
    icon: Globe,
    date: 'March 9th, 2025',
    title: 'First International Aari Work Conference',
    org: 'Virudhunagar, Tamil Nadu',
    description: 'Participated as a key delegate at the 1st International Aari Work Conference in Virudhunagar, sharing insights on bridal couture embroidery and design innovation.',
    highlight: 'International Conference',
  },
  {
    icon: Calendar,
    date: 'July 4th, 2026',
    title: '4th General Body Meeting',
    org: 'Indian Aari Work Federation',
    description: 'Attended the 4th General Body Meeting of the Indian Aari Work Federation, collaborating on artisan welfare, training programs, and federation governance.',
    highlight: 'Federation Meeting',
  },
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
            Heritage &amp; Federation Leadership
            <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            <span className="text-cream">Crafting Timeless </span>
            <span className="text-gradient-gold">Aari Masterpieces</span>
          </h1>
          <p className="font-cormorant text-xl text-cream/70 leading-relaxed">
            Located in Kaveripakkam, Ranipet District, Sangee Sri Aari Works is led by Kaviya S — Joint Secretary of Ranipet District, Indian Aari Work Federation.
          </p>
        </div>

        {/* ── Story Section ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-4xl overflow-hidden glass border border-gold-500/20">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="Artisan at work"
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkbase/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark border border-gold-500/30">
              <p className="font-inter text-xs text-gold-400 font-bold uppercase tracking-wider">Studio Legacy</p>
              <p className="font-playfair text-lg text-cream font-bold mt-1">1000+ Aari Blouses · 200+ Bridal Blouses Crafted</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="font-inter text-xs text-gold-500 tracking-widest uppercase font-semibold">
              Our Studio Story
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
              Preserving Tradition, Embracing Perfection
            </h2>
            <p className="font-inter text-sm text-cream/70 leading-relaxed">
              Founded with a deep devotion to authentic needlecraft, Sangee Sri Aari Works has grown into Kaveripakkam's premier boutique for bespoke bridal blouses and handcrafted Aari embroidery.
            </p>
            <p className="font-inter text-sm text-cream/70 leading-relaxed">
              Every stitch tells a story of patience and perfection. From selecting pure silk zari threads to hand-setting each Kundan stone and pearl, every blouse is treated as a regal canvas.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass p-5 rounded-2xl border border-white/10 text-center">
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-gold-400">1000+</p>
                <p className="font-inter text-[11px] text-cream/60 mt-1">Aari Blouses</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/10 text-center">
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-gold-400">200+</p>
                <p className="font-inter text-[11px] text-cream/60 mt-1">Bridal Blouses</p>
              </div>
              <div className="glass p-5 rounded-2xl border border-white/10 text-center">
                <p className="font-playfair text-2xl sm:text-3xl font-bold text-gold-400">10+</p>
                <p className="font-inter text-[11px] text-cream/60 mt-1">Years Mastery</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Meet the Founder & Artist ─────────────────────────────── */}
        <div ref={artistRef} className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isArtistInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-label justify-center mb-4">
              <Scissors size={12} />
              The Founder &amp; Leader
              <Scissors size={12} />
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold">
              <span className="text-cream">Meet </span>
              <span className="text-gradient-gold">Kaviya S</span>
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
              <div className="relative w-80 sm:w-[440px] aspect-[4/3] rounded-[32px] overflow-hidden
                border-2 border-gold-500/40 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
                <Image
                  src="/owner.jpg"
                  alt="Kaviya S — Founder of Sangee Sri Aari Works & Joint Secretary Ranipet District"
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
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
                <div className="font-playfair text-3xl font-bold text-gradient-gold">10+</div>
                <div className="font-inter text-[10px] text-cream/70 tracking-widest uppercase mt-0.5 font-semibold">
                  Years of<br />Mastery
                </div>
              </motion.div>

              {/* Floating rating badge */}
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
                <span className="font-inter text-[10px] text-cream/80 font-medium">Joint Secretary · Ranipet</span>
              </motion.div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isArtistInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-1">
                  Sangee Sri (Kaviya S)
                </h3>
                <p className="font-cormorant text-lg font-semibold tracking-wider text-gold-400 uppercase">
                  Fashion Designer &amp; Master Aari Artist
                </p>
                <p className="font-inter text-xs text-cream/60 mt-1 flex items-center gap-1.5">
                  <Medal size={14} className="text-gold-400" />
                  Joint Secretary of Ranipet District — <span className="text-gold-300 font-semibold">Indian Aari Work Federation</span>
                </p>
              </div>

              {/* Quote */}
              <div className="relative pl-6 border-l-2 border-gold-500/40">
                <Quote size={18} className="text-gold-500/40 absolute -left-2 -top-1" />
                <p className="font-cormorant text-xl text-cream/80 italic leading-relaxed">
                  Every blouse is crafted with reverence. As Joint Secretary of the Indian Aari Work Federation, my mission is to uphold the highest standard of needlecraft for every bride.
                </p>
              </div>

              <p className="font-inter text-sm text-cream/70 leading-relaxed">
                With over 10+ years of master practice in traditional Aari embroidery and bridal couture design, Kaviya S has established Sangee Sri Aari Works as Ranipet district's leading studio.
              </p>

              <p className="font-inter text-sm text-cream/70 leading-relaxed">
                Her expertise spans Kundan stone setting, Zardosi metallic work, traditional Maggam embroidery, and modern cutwork borders. Each blouse undergoes rigorous quality craftsmanship under her personal supervision.
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
                      <span className="font-inter text-xs text-gold-400 font-semibold">{skill.pct}%</span>
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

              <Link href="/book-appointment" className="btn-luxury text-sm inline-flex group mt-2">
                Book a Personal Consultation
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Federation Achievements & Events Timeline ─────────────── */}
        <div className="space-y-12 pt-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-label justify-center mb-3">
              <Award size={12} />
              Honors &amp; Federation Leadership
              <Award size={12} />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-3">
              Indian Aari Work Federation <span className="text-gradient-gold">Milestones</span>
            </h2>
            <p className="font-inter text-xs text-cream/60">
              Recognitions and historic events led and attended by Kaviya S
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div
                  key={idx}
                  className="glass-gold p-6 rounded-3xl border border-gold-500/25 relative group hover:border-gold-400/50 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge-gold text-[10px] font-semibold">{item.highlight}</span>
                    <span className="font-inter text-xs text-gold-400 font-bold">{item.date}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 group-hover:scale-110 transition-transform">
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-cream">{item.title}</h3>
                      <p className="font-inter text-xs text-gold-400/80 font-medium">{item.org}</p>
                    </div>
                  </div>
                  <p className="font-inter text-xs text-cream/70 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Event & Certificate Photo Gallery (Placeholders for upcoming photos) ─ */}
        <div className="glass rounded-4xl p-8 md:p-12 border border-gold-500/20 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-cream flex items-center gap-2">
                🏆 Federation Event &amp; Certificate Gallery
              </h3>
              <p className="font-inter text-xs text-cream/60 mt-1">
                Official photos from the Noble World Record Event &amp; International Conferences (Uploading soon)
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gold-500/15 border border-gold-500/30 text-gold-400">
              📸 Photos Upload Pending
            </span>
          </div>

          {/* Photo slots placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Noble World Record Event', date: 'Nov 2025' },
              { label: '1st International Aari Conference', date: 'Virudhunagar · Mar 2025' },
              { label: '4th General Body Meeting', date: 'July 4, 2026' },
            ].map((slot, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-2xl bg-white/3 border border-dashed border-gold-500/30 flex flex-col items-center justify-center p-4 text-center group hover:bg-gold-500/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-2 group-hover:scale-110 transition-transform">
                  <Award size={20} />
                </div>
                <p className="font-playfair text-sm font-bold text-cream">{slot.label}</p>
                <p className="font-inter text-[11px] text-gold-400 mt-0.5">{slot.date}</p>
                <span className="font-inter text-[10px] text-cream/40 mt-2">Photo Slot Ready</span>
              </div>
            ))}
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
                10+ years of artisan mastery guaranteeing sharp embroidery motifs and sturdy thread knotting.
              </p>
            </div>
            <div className="glass-gold p-8 rounded-3xl border border-gold-500/20 text-center space-y-4">
              <ShieldCheck size={36} className="text-gold-400 mx-auto" />
              <h3 className="font-playfair text-xl font-bold text-cream">Genuine Materials</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                We use high-grade zari, pure mulberry silk threads, and crystal Kundan stones that retain brilliance.
              </p>
            </div>
            <div className="glass-gold p-8 rounded-3xl border border-gold-500/20 text-center space-y-4">
              <Heart size={36} className="text-gold-400 mx-auto" />
              <h3 className="font-playfair text-xl font-bold text-cream">Personal Care</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                Direct consultation with Kaviya S, customized matching to your saree border, and guaranteed delivery.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA Banner ──────────────────────────────────────────── */}
        <div className="glass-gold rounded-4xl p-12 text-center border border-gold-500/30 space-y-6">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream">
            Ready to Begin Your Bridal Design Story?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quotation" className="btn-luxury text-xs">
              Get Custom Quotation <ArrowRight size={14} />
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

