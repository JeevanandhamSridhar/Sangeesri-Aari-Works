'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'

const counters = [
  {
    value: 1000,
    suffix: '+',
    label: 'Aari Blouses Crafted',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    alt: 'Aari embroidery threadwork',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Bridal Blouses',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=800&q=80',
    alt: 'Bridal blouse detail',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Years of Experience',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80',
    alt: 'Embroidery craftsmanship',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Customer Satisfaction',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Happy brides',
  },
]

function CounterItem({
  value,
  suffix,
  label,
  image,
  alt,
  delay,
}: {
  value: number
  suffix: string
  label: string
  image: string
  alt: string
  delay: number
}) {
  const numRef = useRef<HTMLSpanElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || !numRef.current) return
    gsap.fromTo(
      numRef.current,
      { textContent: '0' },
      {
        textContent: value,
        duration: 2.5,
        delay,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = Math.round(
              parseFloat(numRef.current.textContent || '0')
            ).toString()
          }
        },
      }
    )
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
    >
      {/* Background image */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark gradient overlay — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/50 to-[#0A0806]/20" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
      />

      {/* Gold top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent
        scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-8 text-center">
        {/* Number */}
        <div className="font-playfair text-5xl md:text-6xl font-bold leading-none mb-3">
          <span ref={numRef} className="text-gradient-gold">0</span>
          <span className="text-gradient-gold">{suffix}</span>
        </div>

        {/* Divider */}
        <div className="w-10 h-px bg-gold-500/50 mb-3 group-hover:w-16 transition-all duration-500" />

        {/* Label */}
        <div className="font-inter text-sm text-cream/80 tracking-wide leading-snug">
          {label}
        </div>
      </div>

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-gold-500/30 transition-colors duration-500" />
    </motion.div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060402]" />
      <div className="absolute inset-0 bg-mesh-gold opacity-30" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

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
            Our Numbers
            <span className="w-8 h-px bg-gold-500" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold">
            <span className="text-cream">Crafted With </span>
            <span className="text-gradient-gold">Dedication</span>
          </h2>
        </motion.div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {counters.map((counter, i) => (
            <CounterItem key={counter.label} {...counter} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
