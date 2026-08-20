'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GraduationCap, Play, Download, Award, CheckCircle2, BookOpen, Video, FileText, LogOut, Sparkles, Clock } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

const sampleModules = [
  { id: 'm1', title: 'Module 1: Needle Types, Wooden Frame Setup & Thread Loading', duration: '45 mins', completed: true, videoUrl: 'https://www.youtube.com/watch?v=sample1' },
  { id: 'm2', title: 'Module 2: Chain Stitch, Double Chain & Reverse Stitch Mastery', duration: '60 mins', completed: true, videoUrl: 'https://www.youtube.com/watch?v=sample2' },
  { id: 'm3', title: 'Module 3: Silk Zari Loading, Sugar Bead Stitching & Cutwork Borders', duration: '90 mins', completed: false, videoUrl: 'https://www.youtube.com/watch?v=sample3' },
  { id: 'm4', title: 'Module 4: Kundan Stone Setting, Pearl Dropping & Heavy Peacock Neck', duration: '120 mins', completed: false, videoUrl: 'https://www.youtube.com/watch?v=sample4' },
]

export default function StudentDashboardPage() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [activeVideo, setActiveVideo] = useState(sampleModules[0])

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('sangee_sri_active_student')
      if (stored) {
        setStudent(JSON.parse(stored))
      } else {
        router.push('/academy/login')
      }
    } catch {
      router.push('/academy/login')
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('sangee_sri_active_student')
    toast.success('Logged out successfully.')
    router.push('/academy/login')
  }

  if (!student) {
    return <div className="min-h-screen bg-darkbase pt-32 text-center text-cream">Loading Student Portal...</div>
  }

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury space-y-8">
        {/* Top Student Header */}
        <div className="glass-gold rounded-3xl p-6 md:p-8 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-playfair text-2xl font-bold">
              {student.name ? student.name.charAt(0) : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-gold text-[10px]">{student.studentId || 'STU-101'}</span>
                <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Active Enrolled Student
                </span>
              </div>
              <h1 className="font-playfair text-2xl md:text-3xl font-bold text-cream mt-1">{student.name}</h1>
              <p className="font-inter text-xs text-cream/70 mt-0.5">
                Enrolled Course: <span className="text-gold-400 font-semibold">{student.course}</span> ({student.batch || 'Batch 2026'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button onClick={handleLogout} className="btn-outline-gold text-xs py-2.5 px-4 flex items-center gap-2">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video & Content Viewer (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass rounded-3xl overflow-hidden border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-gold text-xs">📹 Current Video Lesson</span>
                <span className="font-inter text-xs text-cream/50 flex items-center gap-1">
                  <Clock size={12} /> {activeVideo.duration}
                </span>
              </div>
              
              <h2 className="font-playfair text-xl md:text-2xl font-bold text-cream">{activeVideo.title}</h2>

              {/* Video Player Box */}
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-dark border border-gold-500/20 flex flex-col items-center justify-center text-center p-6 space-y-4 group">
                <Image src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80" alt="Video thumbnail" fill unoptimized className="object-cover opacity-30 group-hover:scale-105 transition-transform" />
                <div className="relative z-10 w-16 h-16 rounded-full bg-gold-500 text-darkbase flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={28} className="fill-darkbase ml-1" />
                </div>
                <div className="relative z-10">
                  <p className="font-playfair text-lg font-bold text-cream">Video Practical Stream Ready</p>
                  <p className="font-inter text-xs text-gold-400">Instructed by Fashion Designer Sangee Sri</p>
                </div>
              </div>

              {/* Lesson Instructions & Downloads */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-inter text-cream/70">
                  <BookOpen size={16} className="text-gold-400" />
                  <span>Download Trace Sheet #04 for this lesson</span>
                </div>
                <button
                  onClick={() => toast.success('Trace Pattern Sheet (PDF) downloaded!')}
                  className="btn-outline-gold text-xs py-2 px-4 flex items-center gap-2"
                >
                  <Download size={14} /> Download PDF Tracing Pattern
                </button>
              </div>
            </div>
          </div>

          {/* Module Playlist Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-dark rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-playfair text-lg font-bold text-cream border-b border-white/10 pb-3 flex items-center gap-2">
                <Video size={18} className="text-gold-400" /> Course Syllabus Modules
              </h3>

              <div className="space-y-3">
                {sampleModules.map((mod, idx) => (
                  <div
                    key={mod.id}
                    onClick={() => setActiveVideo(mod)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      activeVideo.id === mod.id
                        ? 'glass-gold border-gold-500'
                        : 'bg-white/5 border-white/5 hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-inter text-[10px] font-bold text-gold-400 uppercase">Lesson {idx + 1}</span>
                      {mod.completed && (
                        <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Done
                        </span>
                      )}
                    </div>
                    <p className="font-playfair text-sm font-bold text-cream line-clamp-2">{mod.title}</p>
                    <span className="font-inter text-[11px] text-cream/40 mt-1 block">{mod.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Box */}
            <div className="glass-gold rounded-3xl p-6 border border-gold-500/30 space-y-3 text-center">
              <Award size={32} className="text-gold-400 mx-auto" />
              <h4 className="font-playfair text-base font-bold text-cream">Course Completion Certificate</h4>
              <p className="font-inter text-xs text-cream/70 leading-relaxed">
                Complete all modules and submit final blouse assignment to unlock your official Indian Aari Work Federation certificate.
              </p>
              <button
                onClick={() => toast.info('Certificate will be issued by Studio Admin upon course completion.')}
                className="btn-luxury text-xs w-full justify-center py-2.5"
              >
                View Certificate Progress
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
