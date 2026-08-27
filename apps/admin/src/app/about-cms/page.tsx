'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Sparkles,
  Save,
  Upload,
  UserCheck,
  Award,
  Trophy,
  Plus,
  Trash2,
  Edit3,
  Medal,
  Star,
  Quote,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminAboutCmsPage() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingFounder, setUploadingFounder] = useState(false)
  const [uploadingEvent, setUploadingEvent] = useState(false)

  // Event Photo Add State
  const [eventTitle, setEventTitle] = useState('')
  const [eventSubtitle, setEventSubtitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventBadge, setEventBadge] = useState('World Record Event 🏆')
  const [eventSrc, setEventSrc] = useState('')
  const [eventModalOpen, setEventModalOpen] = useState(false)

  const fetchAboutData = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/about-store')
      const data = await res.json()
      if (data.success && data.data) {
        setAboutData(data.data)
      }
    } catch {
      toast.error('Failed to load About page configuration')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAboutData()
  }, [])

  const saveAboutData = async () => {
    if (!aboutData) return
    setSaving(true)
    try {
      const res = await fetch('/api/about-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_about', data: aboutData }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success('About page content & images updated live!')
      }
    } catch {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setUploadingFounder(true)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      if (base64) {
        fetch('/api/about-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload_file',
            fileData: base64,
            fileName: `founder_${Date.now()}_${file.name}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.uploadedSrc) {
              setAboutData((prev: any) => ({ ...prev, founderPhoto: data.uploadedSrc }))
              toast.success('Founder photo updated!')
            }
          })
          .finally(() => setUploadingFounder(false))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleEventPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    setUploadingEvent(true)

    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      if (base64) {
        fetch('/api/about-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'upload_file',
            fileData: base64,
            fileName: `event_${Date.now()}_${file.name}`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.uploadedSrc) {
              setEventSrc(data.uploadedSrc)
              toast.success('Event image uploaded!')
            }
          })
          .finally(() => setUploadingEvent(false))
      }
    }
    reader.readAsDataURL(file)
  }

  const addEventPhoto = () => {
    if (!eventTitle || !eventSrc) {
      toast.error('Please provide an event title and photo')
      return
    }

    const newPhoto = {
      id: Date.now(),
      src: eventSrc,
      title: eventTitle,
      subtitle: eventSubtitle || 'Indian Aari Work Federation event photo',
      date: eventDate || 'Official Event',
      badge: eventBadge,
    }

    setAboutData((prev: any) => ({
      ...prev,
      eventPhotos: [...(prev.eventPhotos || []), newPhoto],
    }))

    setEventTitle('')
    setEventSubtitle('')
    setEventDate('')
    setEventSrc('')
    setEventModalOpen(false)
    toast.success('New event photo added to About page!')
  }

  const removeEventPhoto = (id: number) => {
    setAboutData((prev: any) => ({
      ...prev,
      eventPhotos: (prev.eventPhotos || []).filter((p: any) => p.id !== id),
    }))
    toast.success('Event photo removed')
  }

  if (loading || !aboutData) {
    return <div className="p-8 text-cream font-inter text-xs">Loading About Page CMS...</div>
  }

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream flex items-center gap-2">
            <UserCheck className="text-gold-400" size={28} />
            About Page Content &amp; Image CMS
          </h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Update Founder details, bio quotes, studio statistics, skills, and Federation event photos live.
          </p>
        </div>

        <button
          onClick={saveAboutData}
          disabled={saving}
          className="btn-admin-gold py-2.5 px-6 flex items-center gap-2 text-xs"
        >
          <Save size={16} /> {saving ? 'Saving Live...' : 'Save All Changes'}
        </button>
      </div>

      {/* ── SECTION 1: FOUNDER DETAILS & PORTRAIT ────────────────── */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/30 space-y-6">
        <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2 border-b border-white/10 pb-3">
          <Medal className="text-gold-400" size={20} />
          Founder Profile &amp; Bio Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Portrait Photo Uploader */}
          <div className="space-y-3 text-center">
            <label className="font-inter text-xs text-gold-400 font-bold block">Founder Portrait Photo</label>
            <div className="relative aspect-[4/3] w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black">
              <Image
                src={aboutData.founderPhoto || '/owner.jpg'}
                alt="Founder"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <label className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer inline-flex items-center gap-2">
              <Upload size={14} />
              {uploadingFounder ? 'Uploading...' : 'Change Founder Photo'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFounderPhotoUpload}
              />
            </label>
          </div>

          {/* Text Fields */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Founder Full Name</label>
                <input
                  type="text"
                  value={aboutData.founderName}
                  onChange={(e) => setAboutData({ ...aboutData, founderName: e.target.value })}
                  className="input-admin text-sm font-semibold"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={aboutData.founderTitle}
                  onChange={(e) => setAboutData({ ...aboutData, founderTitle: e.target.value })}
                  className="input-admin text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-gold-400 font-bold block mb-1">Federation Role</label>
              <input
                type="text"
                value={aboutData.federationRole}
                onChange={(e) => setAboutData({ ...aboutData, federationRole: e.target.value })}
                className="input-admin text-xs font-mono"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Featured Quote</label>
              <textarea
                value={aboutData.quote}
                onChange={(e) => setAboutData({ ...aboutData, quote: e.target.value })}
                rows={2}
                className="input-admin text-xs w-full leading-relaxed"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Bio Paragraph 1</label>
              <textarea
                value={aboutData.bio1}
                onChange={(e) => setAboutData({ ...aboutData, bio1: e.target.value })}
                rows={2}
                className="input-admin text-xs w-full leading-relaxed"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Bio Paragraph 2</label>
              <textarea
                value={aboutData.bio2}
                onChange={(e) => setAboutData({ ...aboutData, bio2: e.target.value })}
                rows={2}
                className="input-admin text-xs w-full leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: STUDIO STATS & SKILLS ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-admin p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-playfair text-lg font-bold text-cream flex items-center gap-2 border-b border-white/10 pb-3">
            <Trophy className="text-gold-400" size={18} />
            Studio Legacy Counters
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-inter text-[11px] text-cream/60 block mb-1">Aari Blouses</label>
              <input
                type="text"
                value={aboutData.aariBlousesCount}
                onChange={(e) => setAboutData({ ...aboutData, aariBlousesCount: e.target.value })}
                className="input-admin text-center font-bold text-gold-400"
              />
            </div>
            <div>
              <label className="font-inter text-[11px] text-cream/60 block mb-1">Bridal Blouses</label>
              <input
                type="text"
                value={aboutData.bridalBlousesCount}
                onChange={(e) => setAboutData({ ...aboutData, bridalBlousesCount: e.target.value })}
                className="input-admin text-center font-bold text-gold-400"
              />
            </div>
            <div>
              <label className="font-inter text-[11px] text-cream/60 block mb-1">Years Mastery</label>
              <input
                type="text"
                value={aboutData.yearsMastery}
                onChange={(e) => setAboutData({ ...aboutData, yearsMastery: e.target.value })}
                className="input-admin text-center font-bold text-gold-400"
              />
            </div>
          </div>
        </div>

        <div className="glass-admin p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-playfair text-lg font-bold text-cream flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="text-gold-400" size={18} />
            Master Craft Skills (%)
          </h3>

          <div className="space-y-3">
            {aboutData.skills?.map((sk: any, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  type="text"
                  value={sk.label}
                  onChange={(e) => {
                    const newSkills = [...aboutData.skills]
                    newSkills[idx].label = e.target.value
                    setAboutData({ ...aboutData, skills: newSkills })
                  }}
                  className="input-admin text-xs flex-1"
                />
                <input
                  type="number"
                  value={sk.pct}
                  onChange={(e) => {
                    const newSkills = [...aboutData.skills]
                    newSkills[idx].pct = Number(e.target.value)
                    setAboutData({ ...aboutData, skills: newSkills })
                  }}
                  className="input-admin text-xs w-20 text-center font-bold text-gold-400"
                />
                <span className="font-inter text-xs text-cream/60">%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: FEDERATION EVENT PHOTOS MANAGER ───────────── */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
              <Award className="text-gold-400" size={20} />
              Federation Official Event Photos ({aboutData.eventPhotos?.length || 0} Photos)
            </h2>
            <p className="font-inter text-xs text-cream/50 mt-0.5">
              Manage real photos of World Record Events and International Conferences on the About page.
            </p>
          </div>

          <button
            onClick={() => setEventModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-2"
          >
            <Plus size={16} /> Add Event Photo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutData.eventPhotos?.map((photo: any) => (
            <div key={photo.id} className="glass rounded-2xl border border-white/10 p-4 flex gap-4 items-center">
              <div className="relative aspect-[4/3] w-32 rounded-xl overflow-hidden bg-black shrink-0">
                <Image src={photo.src} alt={photo.title} fill unoptimized className="object-cover" />
              </div>

              <div className="flex-1 space-y-1">
                <span className="badge-gold text-[9px] font-bold">{photo.badge}</span>
                <h4 className="font-playfair text-sm font-bold text-cream line-clamp-1">{photo.title}</h4>
                <p className="font-inter text-[11px] text-cream/60 line-clamp-2">{photo.subtitle}</p>
                <button
                  onClick={() => removeEventPhoto(photo.id)}
                  className="text-red-400 hover:text-red-300 font-inter text-[11px] flex items-center gap-1 pt-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD EVENT PHOTO MODAL */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-admin rounded-3xl border border-gold-500/40 p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-playfair text-lg font-bold text-cream flex items-center gap-2">
                <Award size={18} className="text-gold-400" /> Add Federation Event Photo
              </h3>
              <button onClick={() => setEventModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-cream/60">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Event Title *</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. World Record Aari Work Ceremony"
                  className="input-admin text-xs"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Subtitle / Description</label>
                <input
                  type="text"
                  value={eventSubtitle}
                  onChange={(e) => setEventSubtitle(e.target.value)}
                  placeholder="e.g. Kaviya S receiving federation recognition"
                  className="input-admin text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Date / Place</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. Nov 2025 · Ranipet"
                    className="input-admin text-xs"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Badge Label</label>
                  <input
                    type="text"
                    value={eventBadge}
                    onChange={(e) => setEventBadge(e.target.value)}
                    className="input-admin text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Event Photo *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={eventSrc}
                    onChange={(e) => setEventSrc(e.target.value)}
                    placeholder="/about/photo.jpg"
                    className="input-admin text-xs flex-1"
                  />
                  <label className="px-3 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload size={14} />
                    {uploadingEvent ? 'Uploading...' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEventPhotoUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setEventModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold glass border border-white/10 text-cream/60"
              >
                Cancel
              </button>
              <button
                onClick={addEventPhoto}
                className="btn-admin-gold text-xs py-2 px-6"
              >
                Add Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
