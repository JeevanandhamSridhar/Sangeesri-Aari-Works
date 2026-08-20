'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, BookOpen, Plus, Video, FileText, CheckCircle2, Edit3, Save, X, Globe, MapPin, DollarSign, Clock } from 'lucide-react'
import { toast } from 'sonner'

export interface CourseModule {
  id: string
  title: string
  duration: string
  videoUrl: string
  pdfUrl?: string
}

export interface Course {
  id: string
  title: string
  level: string
  duration: string
  fee: string
  description: string
  onlineAvailable: boolean
  offlineAvailable: boolean
  modules: CourseModule[]
}

const defaultCourses: Course[] = [
  {
    id: 'c1',
    title: 'Professional Basic to Advanced Aari Work',
    level: 'Beginner to Professional',
    duration: '3 Months',
    fee: '₹7,500',
    description: 'Master 40+ needle technique stitches, thread loading, sugar bead work, cutwork borders, and stone embellishments.',
    onlineAvailable: true,
    offlineAvailable: true,
    modules: [
      { id: 'm1', title: 'Module 1: Needle Types, Wooden Frame Setup & Thread Loading', duration: '45 mins', videoUrl: 'https://youtube.com/watch?v=sample1', pdfUrl: '/patterns/sheet1.pdf' },
      { id: 'm2', title: 'Module 2: Chain Stitch, Double Chain & Reverse Stitch Mastery', duration: '60 mins', videoUrl: 'https://youtube.com/watch?v=sample2', pdfUrl: '/patterns/sheet2.pdf' },
      { id: 'm3', title: 'Module 3: Silk Zari Loading, Sugar Bead Stitching & Cutwork Borders', duration: '90 mins', videoUrl: 'https://youtube.com/watch?v=sample3', pdfUrl: '/patterns/sheet3.pdf' },
    ],
  },
  {
    id: 'c2',
    title: 'Master Bridal Maggam & Zardosi Specialization',
    level: 'Advanced Level',
    duration: '2 Months',
    fee: '₹9,800',
    description: 'Expert-level training in heavy bridal 3D motifs, genuine Kundan setting, antique Zardosi wire work, and peacock/temple designs.',
    onlineAvailable: true,
    offlineAvailable: true,
    modules: [
      { id: 'm4', title: 'Module 1: Kundan Stone Setting & Antique Zardosi Prep', duration: '90 mins', videoUrl: 'https://youtube.com/watch?v=sample4' },
      { id: 'm5', title: 'Module 2: 3D Peacock Motif & Velvet Base Attachment', duration: '120 mins', videoUrl: 'https://youtube.com/watch?v=sample5' },
    ],
  },
  {
    id: 'c3',
    title: 'Boutique Tailoring & Perfect Fitting Masterclass',
    level: 'Intermediate',
    duration: '1 Month',
    fee: '₹4,500',
    description: 'Learn scientific pattern cutting, padded blouse construction, lining attachment, and zero-wrinkle sleeve setting.',
    onlineAvailable: false,
    offlineAvailable: true,
    modules: [
      { id: 'm6', title: 'Module 1: Body Measurements & Princess Cut Drafting', duration: '60 mins', videoUrl: 'https://youtube.com/watch?v=sample6' },
    ],
  },
]

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>(defaultCourses)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('sangee_sri_courses') || '[]')
      if (Array.isArray(stored) && stored.length > 0) {
        setCourses(stored)
      }
    } catch {}
  }, [])

  const saveCoursesToStorage = (updated: Course[]) => {
    setCourses(updated)
    try {
      localStorage.setItem('sangee_sri_courses', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch {}
  }

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCourse) return

    const updated = courses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
    saveCoursesToStorage(updated)
    toast.success(`Course "${editingCourse.title}" updated successfully!`)
    setEditingCourse(null)
  }

  const handleAddModule = () => {
    if (!editingCourse) return
    const newMod: CourseModule = {
      id: `mod-${Date.now()}`,
      title: 'New Lesson Module',
      duration: '45 mins',
      videoUrl: '',
      pdfUrl: '',
    }
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newMod],
    })
  }

  const updateModule = (index: number, field: keyof CourseModule, value: string) => {
    if (!editingCourse) return
    const updatedMods = [...editingCourse.modules]
    updatedMods[index] = { ...updatedMods[index], [field]: value }
    setEditingCourse({ ...editingCourse, modules: updatedMods })
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap size={16} /> Academy Course CMS
          </div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Course Curriculum &amp; Module Editor</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Edit course titles, pricing, video lesson streams, PDF trace sheets, and online/offline class availability.
          </p>
        </div>
      </div>

      {/* Course List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="glass-admin rounded-3xl p-6 border border-white/5 space-y-4 hover:border-gold-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge-gold text-[10px]">{course.level}</span>
                <span className="font-inter text-xs text-gold-400 font-semibold">{course.duration}</span>
              </div>
              <h3 className="font-playfair text-lg font-bold text-cream">{course.title}</h3>
              <p className="font-inter text-xs text-cream/70 leading-relaxed line-clamp-3">{course.description}</p>
              
              <div className="flex items-center gap-3 pt-2 text-[11px] font-inter">
                {course.onlineAvailable && (
                  <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Globe size={11} /> Online Class
                  </span>
                )}
                {course.offlineAvailable && (
                  <span className="text-gold-400 bg-gold-500/10 border border-gold-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <MapPin size={11} /> Studio Offline
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-white/5 font-inter text-xs text-cream/60 flex justify-between items-center">
                <span>Fee: <strong className="text-gold-400">{course.fee}</strong></span>
                <span>{course.modules.length} Video Modules</span>
              </div>
            </div>

            <button
              onClick={() => setEditingCourse(course)}
              className="btn-admin-gold w-full justify-center text-xs py-2.5 flex items-center gap-2 mt-4"
            >
              <Edit3 size={14} /> Edit Course &amp; Lessons
            </button>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-admin rounded-3xl p-8 border border-gold-500/30 max-w-2xl w-full my-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
                <Edit3 size={18} className="text-gold-400" /> Edit Course Details
              </h2>
              <button onClick={() => setEditingCourse(null)} className="text-cream/50 hover:text-cream">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-5 font-inter text-xs">
              <div>
                <label className="text-cream/70 block mb-1 font-medium">Course Title *</label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="input-admin"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Course Fee (₹)</label>
                  <input
                    type="text"
                    value={editingCourse.fee}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fee: e.target.value })}
                    className="input-admin text-gold-400 font-bold"
                  />
                </div>
                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Level</label>
                  <input
                    type="text"
                    value={editingCourse.level}
                    onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })}
                    className="input-admin"
                  />
                </div>
              </div>

              <div>
                <label className="text-cream/70 block mb-1 font-medium">Course Description</label>
                <textarea
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="input-admin resize-none"
                />
              </div>

              {/* Class Mode Checkboxes */}
              <div className="flex items-center gap-6 p-4 glass rounded-2xl border border-white/5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCourse.onlineAvailable}
                    onChange={(e) => setEditingCourse({ ...editingCourse, onlineAvailable: e.target.checked })}
                    className="accent-gold-500 w-4 h-4"
                  />
                  <span className="text-cream font-medium">Online Classes Available (Zoom / Recorded Video)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCourse.offlineAvailable}
                    onChange={(e) => setEditingCourse({ ...editingCourse, offlineAvailable: e.target.checked })}
                    className="accent-gold-500 w-4 h-4"
                  />
                  <span className="text-cream font-medium">Offline Classes (Kaveripakkam Studio)</span>
                </label>
              </div>

              {/* Video Modules Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-playfair text-base font-bold text-cream">Video Lessons &amp; PDF Tracing Sheets</h3>
                  <button type="button" onClick={handleAddModule} className="text-gold-400 hover:underline font-semibold flex items-center gap-1">
                    <Plus size={14} /> Add Module
                  </button>
                </div>

                <div className="space-y-3">
                  {editingCourse.modules.map((mod, idx) => (
                    <div key={mod.id} className="p-4 glass rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-gold-400 font-bold">Module {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const filtered = editingCourse.modules.filter((_, i) => i !== idx)
                            setEditingCourse({ ...editingCourse, modules: filtered })
                          }}
                          className="text-red-400/80 hover:text-red-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={mod.title}
                          onChange={(e) => updateModule(idx, 'title', e.target.value)}
                          placeholder="Lesson Title"
                          className="input-admin"
                        />
                        <input
                          type="text"
                          value={mod.duration}
                          onChange={(e) => updateModule(idx, 'duration', e.target.value)}
                          placeholder="Duration (e.g. 45 mins)"
                          className="input-admin"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={mod.videoUrl}
                          onChange={(e) => updateModule(idx, 'videoUrl', e.target.value)}
                          placeholder="Video Embed / Stream URL"
                          className="input-admin"
                        />
                        <input
                          type="text"
                          value={mod.pdfUrl || ''}
                          onChange={(e) => updateModule(idx, 'pdfUrl', e.target.value)}
                          placeholder="PDF Tracing Pattern URL"
                          className="input-admin"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setEditingCourse(null)} className="btn-admin-outline text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-admin-gold text-xs flex items-center gap-2">
                  <Save size={14} /> Save Course Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
