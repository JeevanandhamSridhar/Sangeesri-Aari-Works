'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const collectionsList = [
  {
    slug: 'bridal',
    title: 'Bridal Collection',
    desc: 'Opulent zari, zardosi, and kundan embroidery designed for grand wedding blouses.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=800&q=80',
    count: '150+ Designs',
  },
  {
    slug: 'designer',
    title: 'Designer Blouses',
    desc: 'Modern cutwork, thread painting, and contemporary sleeve motifs for receptions.',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
    count: '120+ Designs',
  },
  {
    slug: 'traditional',
    title: 'Traditional Collection',
    desc: 'Pure heritage Maggam work, temple borders, and traditional lotus & peacock patterns.',
    image: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?w=800&q=80',
    count: '200+ Designs',
  },
  {
    slug: 'modern',
    title: 'Modern Collection',
    desc: 'Minimalist necklines, delicate stone work, and trendy party-wear blouse stitches.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    count: '90+ Designs',
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-6xl">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} />
            Curated Categories
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Our Signature </span>
            <span className="text-gradient-gold">Collections</span>
          </h1>
          <p className="font-inter text-cream/50 text-sm max-w-lg mx-auto">
            Discover our specialized Aari embroidery categories handcrafted for every special occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collectionsList.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group block relative rounded-3xl overflow-hidden border border-white/10 hover:border-gold-500/30 transition-all duration-500 glass-dark"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-darkbase/40 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="badge-gold text-xs">{c.count}</span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-cream mb-2 group-hover:text-gold-400 transition-colors flex items-center justify-between">
                    {c.title}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="font-inter text-sm text-cream/60 leading-relaxed">{c.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
