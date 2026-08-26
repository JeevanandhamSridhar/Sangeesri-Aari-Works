'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Scissors, Clock, Award, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const services = [
  {
    id: 'aari-work',
    title: 'Aari & Needlework Embroidery',
    subtitle: 'Handcrafted precision Zari, bead, and Kundan embroidery',
    description:
      'Our signature service: traditional Aari needlework crafted on silk, velvet, raw silk, and organza fabrics. From intricate thread shading to heavy metallic Zardosi motifs.',
    features: ['Custom Motif Designing', 'Zari & Metallic Threadwork', 'Kundan & Pearl Embellishments', 'Cutwork & Scallop Borders'],
    price: 'Starting from ₹2,500',
    image: '/gallery/0021292954d624910413c938e24cf6eb.jpg',
  },
  {
    id: 'bridal',
    title: 'Bridal Blouse Custom Designing',
    subtitle: 'Grand wedding reception & muhurtham Aari blouses',
    description:
      'Bespoke bridal embroidery designed to match your Kanchipuram wedding saree. Includes 1-on-1 consultation with lead designer Kaviya S, custom tracing, and perfect size fitting guarantee.',
    features: ['1-on-1 Saree Matching Consultation', '3D Peacock & Temple Motifs', 'Grand Back Neck & Sleeve Artistry', '100% Fit Guarantee'],
    price: 'Starting from ₹4,500',
    image: '/gallery/3c5193ce7c639a340f1917dea3d31a26.jpg',
  },
  {
    id: 'designer',
    title: 'Designer Cutwork & Pattern Work',
    subtitle: 'Modern sheer necklines, net sleeves & scallop designs',
    description:
      'Contemporary cutwork embroidery with transparent organza panel inserts, sheer back designs, drop pearl hangings, and scalloped edges for fashion-forward sarees.',
    features: ['Scalloped Cutwork Borders', 'Organza Sheer Sleeve Inserts', 'Drop Pearl & Hanging Latkan Details', 'Modern Trendy Necklines'],
    price: 'Starting from ₹3,600',
    image: '/gallery/532a7fed4e07f55b76ad497abe48dddb.jpg',
  },
  {
    id: 'tailoring',
    title: 'Precision Tailoring & Stitching',
    subtitle: 'Custom measurement fitting & reinforced lining',
    description:
      'Flawless stitching for Aari embroidered blouses with padded cups, heavy-duty lining, reinforced armhole seams, and concealed side zippers.',
    features: ['Padded Cup Insertion Option', 'Double Stitch Lining', 'Custom Armhole & Armhole Shaping', 'Fast Turnaround'],
    price: 'Starting from ₹1,200',
    image: '/gallery/28e8741d4e77e7232c4e239fd3c61d72.jpg',
  },
  {
    id: 'express',
    title: 'Express Delivery Slots',
    subtitle: 'Emergency 3 to 7 day priority stitching for urgent weddings',
    description:
      'Short notice wedding or event? Reserved priority slot options for quick delivery without compromising on handcrafted needlework quality.',
    features: ['Priority 3-Day Expedited Slots', 'Daily Progress Photo Updates on WhatsApp', 'Direct Doorstep Courier Delivery'],
    price: 'Custom Priority Express Rate',
    image: '/gallery/1188aeced112589e8ef70312c5f94ca6.jpg',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-darkbase text-cream">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="container-luxury text-center max-w-3xl mb-16 space-y-4">
        <span className="badge-gold inline-flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles size={14} /> Master Craftsmanship Services
        </span>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gradient-gold">
          Our Handcrafted Aari Services
        </h1>
        <p className="font-inter text-cream/60 text-sm sm:text-base leading-relaxed">
          From heavy Kanchipuram bridal blouses to delicate cutwork &amp; express tailoring — every stitch is crafted with passion by lead designer Kaviya S in Kaveripakkam.
        </p>
      </div>

      {/* ── Services Sections ─────────────────────────────────── */}
      <div className="container-luxury space-y-20">
        {services.map((svc, i) => (
          <div
            key={svc.id}
            id={svc.id}
            className={`scroll-mt-32 rounded-3xl glass-gold p-6 sm:p-10 border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              i % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-gold text-xs font-bold shadow-lg">{svc.price}</span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-5">
              <div>
                <span className="font-inter text-xs text-gold-400 font-bold uppercase tracking-widest block mb-1">
                  Service #{i + 1}
                </span>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-cream">
                  {svc.title}
                </h2>
                <p className="font-inter text-xs text-gold-400/80 mt-1">{svc.subtitle}</p>
              </div>

              <p className="font-inter text-sm text-cream/70 leading-relaxed">
                {svc.description}
              </p>

              <div className="space-y-2">
                <span className="font-inter text-xs text-cream/50 font-semibold uppercase tracking-wider block">Key Highlights:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {svc.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 font-inter text-xs text-cream/90">
                      <CheckCircle2 size={14} className="text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/917604887356?text=${encodeURIComponent(
                    `Hi Sangee Sri Aari Works! I want to inquire about your service: ${svc.title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury text-xs py-3 px-5 flex items-center gap-2"
                >
                  <FaWhatsapp size={16} /> Book Service on WhatsApp
                </a>
                <Link href="/quotation" className="btn-outline-gold text-xs py-3 px-5">
                  Get Custom Estimate
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
