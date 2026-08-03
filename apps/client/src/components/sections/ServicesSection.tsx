'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'aari-work',
    title: 'Aari Work',
    tagline: 'Intricate threadwork mastery',
    description:
      'Traditional south Indian embroidery with golden threads, creating mesmerizing patterns on silk, cotton, and designer fabrics.',
    image: 'https://picsum.photos/seed/aari1/600/800',
    href: '/services#aari-work',
    accent: '#D4AF37',
    tags: ['Thread Work', 'Golden Zari', 'Stone Work'],
  },
  {
    id: 'bridal',
    title: 'Bridal Blouse',
    tagline: 'Your wedding moment, perfected',
    description:
      'Bespoke bridal blouse designs that capture the essence of your special day — crafted with love, delivered with perfection.',
    image: 'https://picsum.photos/seed/bridal2/600/800',
    href: '/services#bridal',
    accent: '#B76E79',
    tags: ['Bridal', 'Wedding', 'Reception'],
  },
  {
    id: 'designer',
    title: 'Designer Blouses',
    tagline: 'Fashion-forward embroidery',
    description:
      'Contemporary designs that blend modern aesthetics with traditional craft — for every occasion and every style.',
    image: 'https://picsum.photos/seed/design3/600/800',
    href: '/services#designer',
    accent: '#8f6e0d',
    tags: ['Modern', 'Maggam', 'Zardosi'],
  },
  {
    id: 'tailoring',
    title: 'Tailoring',
    tagline: 'Perfect fit, every time',
    description:
      'Expert tailoring services for blouses, salwars, and traditional wear — with precision stitching and premium finishing.',
    image: 'https://picsum.photos/seed/tailor4/600/800',
    href: '/services#tailoring',
    accent: '#5C1A1A',
    tags: ['Custom Fit', 'Alterations', 'Finishing'],
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-darkbase relative overflow-hidden">
      <div className="absolute inset-0 pattern-embroidery" />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label mb-4"
            >
              Our Expertise
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-playfair text-4xl md:text-5xl font-bold"
            >
              <span className="text-cream">What We </span>
              <span className="text-gradient-gold">Create</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/services" className="btn-outline-gold text-sm">
              All Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={service.href} className="group block card-luxury h-full">
                {/* Image */}
                <div className="relative h-72 overflow-hidden rounded-t-3xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120c08] via-transparent to-transparent" />

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${service.accent}20`,
                          border: `1px solid ${service.accent}40`,
                          color: service.accent,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p
                    className="font-cormorant text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ color: service.accent }}
                  >
                    {service.tagline}
                  </p>
                  <h3 className="font-playfair text-xl font-bold text-cream mb-3 group-hover:text-gold-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-inter text-sm text-cream/50 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                    style={{ color: service.accent }}
                  >
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
