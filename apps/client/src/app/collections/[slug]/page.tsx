'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, ZoomIn } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const categoryData: Record<string, { title: string; desc: string; items: Array<{ id: number; title: string; price: string; image: string }> }> = {
  bridal: {
    title: 'Bridal Collection',
    desc: 'Opulent gold zari, zardosi embroidery, and kundan stone work designed for unforgettable wedding blouses.',
    items: [
      { id: 1, title: 'Royal Zari Grand Bridal Blouse', price: '₹4,999 – ₹7,500', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=800&q=80' },
      { id: 2, title: 'Kundan & Mirror Bridal Masterpiece', price: '₹5,500 – ₹8,900', image: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80' },
      { id: 3, title: 'Velvet Reception Aari Blouse', price: '₹4,200 – ₹6,800', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
    ],
  },
  designer: {
    title: 'Designer Blouses',
    desc: 'Modern cutwork, thread painting, and contemporary sleeve motifs crafted for stylish celebrations.',
    items: [
      { id: 1, title: 'Silk Thread Painted Art Blouse', price: '₹3,500 – ₹5,500', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80' },
      { id: 2, title: 'Contemporary Cutwork Blouse', price: '₹2,900 – ₹4,200', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80' },
    ],
  },
  traditional: {
    title: 'Traditional Collection',
    desc: 'Pure heritage Maggam work, temple borders, and traditional lotus & peacock motifs.',
    items: [
      { id: 1, title: 'Temple Border Maggam Blouse', price: '₹2,800 – ₹4,500', image: 'https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7?w=800&q=80' },
      { id: 2, title: 'Peacock Motif Silk Blouse', price: '₹3,200 – ₹5,000', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
    ],
  },
  modern: {
    title: 'Modern Collection',
    desc: 'Minimalist necklines, delicate stone work, and trendy party-wear blouse stitches.',
    items: [
      { id: 1, title: 'Pearl & Stone Accent Blouse', price: '₹2,500 – ₹4,000', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80' },
      { id: 2, title: 'Delicate Golden Thread Work', price: '₹2,200 – ₹3,500', image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80' },
    ],
  },
}

export default function CollectionCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const category = categoryData[resolvedParams.slug] || categoryData.bridal

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-6xl">
        <div className="mb-8">
          <Link href="/collections" className="btn-outline-gold text-xs inline-flex items-center gap-2 mb-6">
            <ArrowLeft size={14} /> Back to Collections
          </Link>
          <div className="section-label mb-2">
            <Sparkles size={12} />
            Collection Showcase
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-3">{category.title}</h1>
          <p className="font-inter text-cream/60 text-sm max-w-xl">{category.desc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-dark rounded-3xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-darkbase via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="font-playfair font-bold text-cream text-lg mb-1">{item.title}</h3>
                  <p className="font-inter text-xs text-gold-400 font-semibold mb-4">Estimate: {item.price}</p>
                  <a
                    href={`https://wa.me/917604887356?text=${encodeURIComponent(
                      `Hi Sangee Sri Aari Works! I would like to inquire about "${item.title}" from your ${category.title}. Estimated price is ${item.price}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury w-full justify-center text-xs py-2.5 flex items-center gap-2"
                  >
                    <FaWhatsapp size={16} className="text-green-400" /> Inquire on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
