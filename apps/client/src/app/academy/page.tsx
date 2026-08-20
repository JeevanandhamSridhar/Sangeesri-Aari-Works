'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, GraduationCap, Award, BookOpen, CheckCircle2, UserCheck, ArrowRight, Video, FileText, Lock, Globe, MapPin, ExternalLink, HelpCircle } from 'lucide-react'
import { FaWhatsapp, FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'

const defaultCourses = [
  {
    id: 'c1',
    title: 'Professional Basic to Advanced Aari Work',
    duration: '3 Months (Full Course)',
    level: 'Beginner to Professional',
    fee: '₹7,500',
    description: 'Master 40+ needle technique stitches, thread loading, sugar bead work, cutwork borders, and stone embellishments.',
    onlineAvailable: true,
    offlineAvailable: true,
    highlights: ['40+ Hand Embroidery Stitches', 'Needle Handling & Frame Setup', 'Blouse Neck & Sleeve Tracing', 'Official Certificate of Completion'],
  },
  {
    id: 'c2',
    title: 'Master Bridal Maggam & Zardosi Specialization',
    duration: '2 Months (Intensive)',
    level: 'Advanced Level',
    fee: '₹9,800',
    description: 'Expert-level training in heavy bridal 3D motifs, genuine Kundan setting, antique Zardosi wire work, and peacock/temple designs.',
    onlineAvailable: true,
    offlineAvailable: true,
    highlights: ['3D Zardosi & Peacock Motifs', 'Heavy Kundan & Pearl Setting', 'Bridal Blouse Layout Planning', 'Direct Mentorship by Sangee Sri'],
  },
  {
    id: 'c3',
    title: 'Boutique Tailoring & Perfect Fitting Masterclass',
    duration: '1 Month',
    level: 'Intermediate',
    fee: '₹4,500',
    description: 'Learn scientific pattern cutting, padded blouse construction, lining attachment, and zero-wrinkle sleeve setting.',
    onlineAvailable: false,
    offlineAvailable: true,
    highlights: ['Body Measurement Standards', 'Padded & Princess Cut Blouses', 'Neckline Finishing & Piping', 'Client Fitting Troubleshooting'],
  },
]

export default function AcademyPage() {
  const [courses, setCourses] = useState(defaultCourses)
  const [googleFormModal, setGoogleFormModal] = useState(false)

  const loadCourses = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('sangee_sri_courses') || '[]')
      if (Array.isArray(stored) && stored.length > 0) {
        setCourses(stored)
      }
    } catch {}
  }

  useEffect(() => {
    loadCourses()
    window.addEventListener('storage', loadCourses)
    return () => window.removeEventListener('storage', loadCourses)
  }, [])

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="section-label justify-center">
            <GraduationCap size={14} /> Sangee Sri Aari Academy <GraduationCap size={14} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold">
            <span className="text-cream">Learn Aari Work From </span>
            <span className="text-gradient-gold">Fashion Designer Sangee Sri</span>
          </h1>
          <p className="font-inter text-cream/70 text-sm md:text-base leading-relaxed">
            Government-recognized training, hands-on masterclasses, and certified diploma courses in Kaveripakkam. Train directly under Kaviya S — Joint Secretary of Ranipet District, Indian Aari Work Federation.
          </p>

          {/* Online & Offline Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-inter text-xs">
            <span className="px-4 py-2 rounded-full glass-gold border border-gold-500/30 text-gold-300 font-semibold flex items-center gap-2">
              <Globe size={16} className="text-green-400" /> Online Classes (Live Zoom &amp; Recorded HD)
            </span>
            <span className="px-4 py-2 rounded-full glass border border-white/10 text-cream font-semibold flex items-center gap-2">
              <MapPin size={16} className="text-gold-400" /> Offline Classes (Kaveripakkam Studio)
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setGoogleFormModal(true)}
              className="btn-luxury text-sm flex items-center gap-2 py-4 px-6"
            >
              <FaGoogle size={16} className="text-gold-300" /> Google Form Registration
            </button>

            <a
              href="https://wa.me/917604887356?text=Hi Sangee Sri Aari Academy! I would like to inquire about batch dates, fees, and admission."
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold text-sm flex items-center gap-2 py-4 px-6"
            >
              <FaWhatsapp size={18} className="text-green-400" /> Contact WhatsApp (7604887356)
            </a>

            <Link href="/academy/login" className="btn-outline-gold text-sm flex items-center gap-2 py-4 px-6">
              <UserCheck size={18} /> Student Portal Sign In
            </Link>
          </div>
        </div>

        {/* Access Notice */}
        <div className="glass-gold rounded-3xl p-6 md:p-8 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="font-playfair text-lg font-bold text-cream">Admin-Authorized Student Access Only</h3>
              <p className="font-inter text-xs text-cream/70 mt-1">
                Student accounts are registered directly by Studio Admin upon course enrollment. Self-registration is disabled for quality control.
              </p>
            </div>
          </div>
          <Link href="/academy/login" className="btn-outline-gold text-xs shrink-0">
            Sign In with Assigned Passcode →
          </Link>
        </div>

        {/* Courses Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-3">Our Certified Diploma Programs</h2>
            <p className="font-inter text-xs text-cream/50">Comprehensive practical modules tailored for aspiring designers &amp; boutique owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((c: any) => (
              <div key={c.id} className="glass-dark rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-6 hover:border-gold-500/40 transition-all group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="badge-gold text-[10px]">{c.level}</span>
                    <span className="font-inter text-xs text-gold-400 font-semibold">{c.duration}</span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-cream group-hover:text-gold-300 transition-colors">{c.title}</h3>
                  <p className="font-inter text-xs text-cream/70 leading-relaxed">{c.description}</p>
                  
                  {/* Mode Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-inter text-[10px]">
                    {c.onlineAvailable && (
                      <span className="px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 font-medium flex items-center gap-1">
                        <Globe size={12} /> Online Available
                      </span>
                    )}
                    {c.offlineAvailable && (
                      <span className="px-2.5 py-1 rounded-md bg-gold-500/10 border border-gold-500/20 text-gold-400 font-medium flex items-center gap-1">
                        <MapPin size={12} /> Studio Offline
                      </span>
                    )}
                  </div>

                  {c.highlights && (
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {c.highlights.map((h: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 font-inter text-xs text-cream/80">
                          <CheckCircle2 size={14} className="text-gold-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-inter text-[10px] text-cream/40 block">Course Fee</span>
                    <span className="font-playfair text-2xl font-bold text-gold-400">{c.fee}</span>
                  </div>
                  <a
                    href={`https://wa.me/917604887356?text=Hi! I want to enroll in ${encodeURIComponent(c.title)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-luxury text-xs py-3 px-4"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Instructor Banner */}
        <div className="glass-gold rounded-4xl p-8 md:p-12 border border-gold-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 relative aspect-square rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-2xl">
            <Image src="/owner.jpg" alt="Sangee Sri — Fashion Designer" fill unoptimized className="object-cover" />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <span className="badge-gold text-xs">🎓 Chief Academy Director</span>
            <h2 className="font-playfair text-3xl font-bold text-cream">Sangee Sri (Kaviya S)</h2>
            <p className="font-cormorant text-lg text-gold-400 uppercase tracking-widest font-semibold">
              Fashion Designer &amp; Master Aari Artist
            </p>
            <p className="font-inter text-xs text-cream/70 leading-relaxed">
              Joint Secretary of Ranipet District, Indian Aari Work Federation. Organizer of the Noble World Record Event for Aari Work. Under her direct guidance, hundreds of students have launched successful home-based boutique businesses.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 font-inter text-xs text-cream/80">
                <Award size={16} className="text-gold-400" /> Authorized Federation Certification
              </div>
              <div className="flex items-center gap-2 font-inter text-xs text-cream/80">
                <BookOpen size={16} className="text-gold-400" /> Tracing Patterns &amp; Materials Kit Included
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Google Form Registration Modal */}
      {googleFormModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 border border-gold-500/30 max-w-lg w-full space-y-6 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto">
              <FaGoogle size={28} />
            </div>

            <div className="space-y-2">
              <h3 className="font-playfair text-2xl font-bold text-cream">Sangee Sri Aari Academy Registration</h3>
              <p className="font-inter text-xs text-cream/70">
                Complete the official Google Form for course registration, preferred batch dates, and Online vs Offline mode selection.
              </p>
            </div>

            <div className="p-4 glass-dark rounded-2xl border border-white/10 text-left font-inter text-xs space-y-2">
              <p className="text-gold-400 font-semibold flex items-center gap-1.5">
                <Globe size={14} /> Online Classes: Live Zoom + 24/7 Recorded HD Modules
              </p>
              <p className="text-gold-400 font-semibold flex items-center gap-1.5">
                <MapPin size={14} /> Offline Classes: Kaveripakkam Studio (Ranipet Dist)
              </p>
              <p className="text-cream/50 pt-1">
                For instant assistance, message studio director directly on WhatsApp: <strong className="text-cream">7604887356</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  toast.success('Opening official Google Form...')
                  setGoogleFormModal(false)
                }}
                className="btn-luxury text-xs flex-1 justify-center py-3.5 flex items-center gap-2"
              >
                Open Google Form <ExternalLink size={14} />
              </a>

              <a
                href="https://wa.me/917604887356?text=Hi! I am filling out the Academy Google Form and need batch details."
                target="_blank"
                rel="noreferrer"
                className="btn-outline-gold text-xs flex-1 justify-center py-3.5 flex items-center gap-2"
              >
                <FaWhatsapp size={16} className="text-green-400" /> Inquiry via WhatsApp
              </a>
            </div>

            <button
              onClick={() => setGoogleFormModal(false)}
              className="text-xs font-inter text-cream/40 hover:text-cream block mx-auto pt-2"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
