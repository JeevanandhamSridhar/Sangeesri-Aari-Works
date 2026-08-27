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
  Calendar,
  Building,
  FileText,
  Layers,
  Eye,
  ArrowUp,
  ArrowDown,
  Layout,
} from 'lucide-react'
import { toast } from 'sonner'

export interface AchievementItem {
  highlight: string
  date: string
  title: string
  org: string
  description: string
  image?: string
}

export interface EventPhotoItem {
  id: number
  src: string
  title: string
  subtitle: string
  date: string
  badge: string
}

export interface CustomSectionItem {
  id: string
  title: string
  subtitle?: string
  position: 'above_milestones' | 'below_milestones' | 'below_story'
  image?: string
  content: string
  badge?: string
}

export default function AdminAboutCmsPage() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingFounder, setUploadingFounder] = useState(false)
  const [uploadingStory, setUploadingStory] = useState(false)
  const [uploadingEvent, setUploadingEvent] = useState(false)
  const [uploadingMilestone, setUploadingMilestone] = useState(false)
  const [uploadingCustomSection, setUploadingCustomSection] = useState(false)

  // Event Photo Modal State
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [eventTitle, setEventTitle] = useState('')
  const [eventSubtitle, setEventSubtitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventBadge, setEventBadge] = useState('World Record Event 🏆')
  const [eventSrc, setEventSrc] = useState('')

  // Milestone Modal State
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false)
  const [editingMilestoneIdx, setEditingMilestoneIdx] = useState<number | null>(null)
  const [mTitle, setMTitle] = useState('')
  const [mOrg, setMOrg] = useState('')
  const [mDate, setMDate] = useState('')
  const [mHighlight, setMHighlight] = useState('District Leadership')
  const [mDescription, setMDescription] = useState('')
  const [mImage, setMImage] = useState('')

  // Custom Dynamic Section Modal State
  const [customSectionModalOpen, setCustomSectionModalOpen] = useState(false)
  const [editingCustomSectionId, setEditingCustomSectionId] = useState<string | null>(null)
  const [csTitle, setCsTitle] = useState('')
  const [csSubtitle, setCsSubtitle] = useState('')
  const [csBadge, setCsBadge] = useState('Featured Category')
  const [csPosition, setCsPosition] = useState<'above_milestones' | 'below_milestones' | 'below_story'>('below_milestones')
  const [csImage, setCsImage] = useState('')
  const [csContent, setCsContent] = useState('')

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
        toast.success('About page content, milestones & custom sections updated live!')
      }
    } catch {
      toast.error('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  // ── FILE UPLOAD HANDLERS ─────────────────────────────────────────
  const uploadImageFile = async (file: File, prefix: string): Promise<string | null> => {
    return new Promise((resolve) => {
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
              fileName: `${prefix}_${Date.now()}_${file.name}`,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.uploadedSrc) {
                resolve(data.uploadedSrc)
              } else {
                resolve(null)
              }
            })
            .catch(() => resolve(null))
        } else {
          resolve(null)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleStoryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingStory(true)
    const src = await uploadImageFile(e.target.files[0], 'story')
    if (src) {
      const updated = { ...aboutData, storyPhoto: src }
      persistAboutData(updated)
      toast.success('Studio Story image updated live!')
    } else {
      toast.error('Failed to upload story image')
    }
    setUploadingStory(false)
  }

  const handleFounderPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingFounder(true)
    const src = await uploadImageFile(e.target.files[0], 'founder')
    if (src) {
      setAboutData((prev: any) => ({ ...prev, founderPhoto: src }))
      toast.success('Founder photo updated!')
    } else {
      toast.error('Failed to upload founder photo')
    }
    setUploadingFounder(false)
  }

  const handleEventPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingEvent(true)
    const src = await uploadImageFile(e.target.files[0], 'event')
    if (src) {
      setEventSrc(src)
      toast.success('Event image uploaded successfully!')
    } else {
      toast.error('Failed to upload event image')
    }
    setUploadingEvent(false)
  }

  const handleMilestoneImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingMilestone(true)
    const src = await uploadImageFile(e.target.files[0], 'milestone')
    if (src) {
      setMImage(src)
      toast.success('Milestone image uploaded successfully!')
    } else {
      toast.error('Failed to upload milestone image')
    }
    setUploadingMilestone(false)
  }

  const handleCustomSectionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setUploadingCustomSection(true)
    const src = await uploadImageFile(e.target.files[0], 'custom_section')
    if (src) {
      setCsImage(src)
      toast.success('Section image uploaded successfully!')
    } else {
      toast.error('Failed to upload section image')
    }
    setUploadingCustomSection(false)
  }

  // ── EVENT PHOTOS ──────────────────────────────────────────────────
  const addEventPhoto = () => {
    if (!eventTitle || !eventSrc) {
      toast.error('Please upload an event image and enter a title')
      return
    }

    const newPhoto: EventPhotoItem = {
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
    toast.success('New event photo added!')
  }

  const removeEventPhoto = (id: number) => {
    setAboutData((prev: any) => ({
      ...prev,
      eventPhotos: (prev.eventPhotos || []).filter((p: any) => p.id !== id),
    }))
    toast.success('Event photo removed')
  }

  // ── MILESTONES CONTROLLER ────────────────────────────────────────
  const openAddMilestoneModal = () => {
    setEditingMilestoneIdx(null)
    setMTitle('')
    setMOrg('Indian Aari Work Federation')
    setMDate('November 2025')
    setMHighlight('District Leadership')
    setMDescription('')
    setMImage('')
    setMilestoneModalOpen(true)
  }

  const openEditMilestoneModal = (idx: number) => {
    const item = aboutData.achievements[idx]
    if (!item) return
    setEditingMilestoneIdx(idx)
    setMTitle(item.title)
    setMOrg(item.org)
    setMDate(item.date)
    setMHighlight(item.highlight)
    setMDescription(item.description)
    setMImage(item.image || '')
    setMilestoneModalOpen(true)
  }

  const persistAboutData = async (newData: any) => {
    setAboutData(newData)
    try {
      const res = await fetch('/api/about-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_about', data: newData }),
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Changes saved live to About page!')
      }
    } catch {
      toast.error('Failed to auto-save changes')
    }
  }

  const saveMilestone = () => {
    if (!mTitle || !mDescription) {
      toast.error('Please enter a milestone title and description')
      return
    }

    const newMilestone: AchievementItem = {
      title: mTitle,
      org: mOrg,
      date: mDate,
      highlight: mHighlight,
      description: mDescription,
      image: mImage || undefined,
    }

    const updatedAchievements = [...(aboutData.achievements || [])]
    if (editingMilestoneIdx !== null) {
      updatedAchievements[editingMilestoneIdx] = newMilestone
    } else {
      updatedAchievements.push(newMilestone)
    }

    const newAboutData = { ...aboutData, achievements: updatedAchievements }
    persistAboutData(newAboutData)
    setMilestoneModalOpen(false)
  }

  const removeMilestone = (idx: number) => {
    if (confirm('Are you sure you want to delete this Key Federation Milestone?')) {
      const updatedAchievements = (aboutData.achievements || []).filter((_: any, i: number) => i !== idx)
      const newAboutData = { ...aboutData, achievements: updatedAchievements }
      persistAboutData(newAboutData)
    }
  }

  // ── CUSTOM DYNAMIC SECTIONS CONTROLLER ─────────────────────────────
  const openAddCustomSectionModal = () => {
    setEditingCustomSectionId(null)
    setCsTitle('')
    setCsSubtitle('')
    setCsBadge('Special Category')
    setCsPosition('below_milestones')
    setCsImage('')
    setCsContent('')
    setCustomSectionModalOpen(true)
  }

  const openEditCustomSectionModal = (sec: CustomSectionItem) => {
    setEditingCustomSectionId(sec.id)
    setCsTitle(sec.title)
    setCsSubtitle(sec.subtitle || '')
    setCsBadge(sec.badge || 'Featured Category')
    setCsPosition(sec.position || 'below_milestones')
    setCsImage(sec.image || '')
    setCsContent(sec.content)
    setCustomSectionModalOpen(true)
  }

  const saveCustomSection = () => {
    if (!csTitle || !csContent) {
      toast.error('Please provide a section title and description content')
      return
    }

    const newSec: CustomSectionItem = {
      id: editingCustomSectionId || `cs_${Date.now()}`,
      title: csTitle,
      subtitle: csSubtitle,
      badge: csBadge,
      position: csPosition,
      image: csImage || undefined,
      content: csContent,
    }

    const existingSections: CustomSectionItem[] = [...(aboutData.customSections || [])]
    if (editingCustomSectionId) {
      const idx = existingSections.findIndex((s) => s.id === editingCustomSectionId)
      if (idx !== -1) existingSections[idx] = newSec
    } else {
      existingSections.push(newSec)
    }

    setAboutData((prev: any) => ({ ...prev, customSections: existingSections }))
    setCustomSectionModalOpen(false)
    toast.success('Custom Section saved!')
  }

  const removeCustomSection = (id: string) => {
    if (confirm('Are you sure you want to delete this custom section?')) {
      const updated = (aboutData.customSections || []).filter((s: CustomSectionItem) => s.id !== id)
      setAboutData((prev: any) => ({ ...prev, customSections: updated }))
      toast.success('Custom section removed')
    }
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
            Update Founder details, Key Federation Milestones (with images!), and add custom content sections above or below milestones live.
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

      {/* ── SECTION: OUR STUDIO STORY & FEATURE IMAGE ─────────────── */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/30 space-y-6">
        <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="text-gold-400" size={20} />
          Our Studio Story &amp; Main Feature Image
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Studio Story Photo Uploader */}
          <div className="space-y-3 text-center">
            <label className="font-inter text-xs text-gold-400 font-bold block">Studio Story Main Image</label>
            <div className="relative aspect-[4/5] w-full max-w-[240px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black shadow-lg">
              <Image
                src={aboutData.storyPhoto || '/about/federation-convention.jpg'}
                alt="Studio Story Feature"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <label className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer inline-flex items-center gap-2">
              <Upload size={14} />
              {uploadingStory ? 'Uploading Image...' : 'Change Story Image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleStoryPhotoUpload}
              />
            </label>
          </div>

          {/* Studio Story Text Inputs */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Story Subtitle / Badge</label>
                <input
                  type="text"
                  value={aboutData.storySubtitle || 'Our Studio Story'}
                  onChange={(e) => setAboutData({ ...aboutData, storySubtitle: e.target.value })}
                  className="input-admin text-xs font-semibold"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Story Main Heading</label>
                <input
                  type="text"
                  value={aboutData.storyTitle || 'Preserving Tradition, Embracing Perfection'}
                  onChange={(e) => setAboutData({ ...aboutData, storyTitle: e.target.value })}
                  className="input-admin text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Story Paragraph 1</label>
              <textarea
                value={aboutData.storyParagraph1 || ''}
                onChange={(e) => setAboutData({ ...aboutData, storyParagraph1: e.target.value })}
                rows={3}
                className="input-admin text-xs w-full leading-relaxed"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Story Paragraph 2</label>
              <textarea
                value={aboutData.storyParagraph2 || ''}
                onChange={(e) => setAboutData({ ...aboutData, storyParagraph2: e.target.value })}
                rows={3}
                className="input-admin text-xs w-full leading-relaxed"
              />
            </div>
          </div>
        </div>
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
            <div className="relative aspect-[4/3] w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black shadow-lg">
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

      {/* ── SECTION 2: KEY FEDERATION MILESTONES (WITH IMAGE UPLOAD) ─ */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
              <Trophy className="text-gold-400" size={22} />
              Key Federation Milestones Manager ({aboutData.achievements?.length || 0} Milestones)
            </h2>
            <p className="font-inter text-xs text-cream/50 mt-0.5">
              Edit milestones and upload images for each achievement card.
            </p>
          </div>

          <button
            onClick={openAddMilestoneModal}
            className="btn-admin-gold py-2 px-4 flex items-center gap-1.5 text-xs"
          >
            <Plus size={15} /> Add Milestone
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutData.achievements?.map((item: AchievementItem, idx: number) => (
            <div key={idx} className="glass rounded-2xl border border-gold-500/25 p-5 space-y-3 relative group hover:border-gold-400/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                {/* Optional Milestone Image Display */}
                {item.image ? (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-gold-500/30">
                    <Image src={item.image} alt={item.title} fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="h-12 w-full rounded-xl border border-dashed border-white/10 flex items-center justify-center font-inter text-[11px] text-cream/40 bg-black/20">
                    No Milestone Image Attached (Click Edit to upload)
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="badge-gold text-[10px] font-bold">{item.highlight}</span>
                  <span className="font-inter text-xs text-gold-400 font-bold">{item.date}</span>
                </div>

                <div>
                  <h3 className="font-playfair text-base font-bold text-cream">{item.title}</h3>
                  <p className="font-inter text-xs text-gold-400/80 font-medium mt-0.5">{item.org}</p>
                </div>

                <p className="font-inter text-xs text-cream/70 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-2">
                <button
                  onClick={() => openEditMilestoneModal(idx)}
                  className="px-3 py-1 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-1"
                >
                  <Edit3 size={12} /> Edit &amp; Upload Image
                </button>
                <button
                  onClick={() => removeMilestone(idx)}
                  className="p-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete Milestone"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: CUSTOM DYNAMIC CONTENT SECTIONS BUILDER ─────── */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
              <Layers className="text-gold-400" size={22} />
              Custom Content Sections Builder ({aboutData.customSections?.length || 0} Custom Sections)
            </h2>
            <p className="font-inter text-xs text-cream/50 mt-0.5">
              Add new custom categories/sections to the About page and position them above or below milestones!
            </p>
          </div>

          <button
            onClick={openAddCustomSectionModal}
            className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-2"
          >
            <Plus size={16} /> Add Custom Section
          </button>
        </div>

        {(!aboutData.customSections || aboutData.customSections.length === 0) ? (
          <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
            <Layout size={32} className="text-gold-400/50 mx-auto" />
            <p className="font-playfair text-base font-bold text-cream">No Custom Sections Added Yet</p>
            <p className="font-inter text-xs text-cream/50 max-w-md mx-auto">
              Want to add a custom category like "Artisan Training", "Awards", or "Studio Highlights"? Click "Add Custom Section" to create one anytime!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutData.customSections.map((sec: CustomSectionItem) => (
              <div key={sec.id} className="glass rounded-2xl border border-white/10 p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="badge-gold text-[10px] font-bold">{sec.badge || 'Custom Section'}</span>
                    <span className="font-inter text-[10px] text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded-full font-mono">
                      Position: {sec.position.replace('_', ' ')}
                    </span>
                  </div>

                  {sec.image && (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-white/10">
                      <Image src={sec.image} alt={sec.title} fill unoptimized className="object-cover" />
                    </div>
                  )}

                  <div>
                    <h3 className="font-playfair text-base font-bold text-cream">{sec.title}</h3>
                    {sec.subtitle && <p className="font-inter text-xs text-gold-400/80 font-medium">{sec.subtitle}</p>}
                  </div>

                  <p className="font-inter text-xs text-cream/70 leading-relaxed line-clamp-3">
                    {sec.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-2">
                  <button
                    onClick={() => openEditCustomSectionModal(sec)}
                    className="px-3 py-1 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-1"
                  >
                    <Edit3 size={12} /> Edit Section
                  </button>
                  <button
                    onClick={() => removeCustomSection(sec.id)}
                    className="p-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 4: STUDIO STATS & SKILLS ───────────────────── */}
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

      {/* ── SECTION 5: FEDERATION EVENT PHOTOS MANAGER ───────────── */}
      <div className="glass-admin p-6 rounded-3xl border border-gold-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
              <Award className="text-gold-400" size={20} />
              Federation Official Event Photos ({aboutData.eventPhotos?.length || 0} Photos)
            </h2>
            <p className="font-inter text-xs text-cream/50 mt-0.5">
              Upload real photos of World Record Events and International Conferences on the About page.
            </p>
          </div>

          <button
            onClick={() => { setEventSrc(''); setEventTitle(''); setEventSubtitle(''); setEventModalOpen(true) }}
            className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-2"
          >
            <Plus size={16} /> Add Event Photo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutData.eventPhotos?.map((photo: any) => (
            <div key={photo.id} className="glass rounded-2xl border border-white/10 p-4 flex gap-4 items-center">
              <div className="relative aspect-[4/3] w-32 rounded-xl overflow-hidden bg-black shrink-0 border border-gold-500/30">
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

      {/* ADD / EDIT MILESTONE MODAL (WITH IMAGE FILE UPLOADER) */}
      {milestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-admin rounded-3xl border border-gold-500/40 p-6 max-w-lg w-full space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-playfair text-lg font-bold text-cream flex items-center gap-2">
                <Trophy size={18} className="text-gold-400" />
                {editingMilestoneIdx !== null ? 'Edit Key Federation Milestone' : 'Add Key Federation Milestone'}
              </h3>
              <button onClick={() => setMilestoneModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-cream/60">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* MILESTONE IMAGE UPLOADER & PREVIEW */}
              <div className="text-center">
                <label className="font-inter text-xs text-gold-400 font-bold block mb-1.5">Milestone Card Image (Optional)</label>
                {mImage ? (
                  <div className="relative aspect-[16/9] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black mb-3">
                    <Image src={mImage} alt="Milestone Preview" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full max-w-[320px] mx-auto rounded-2xl border-2 border-dashed border-gold-500/30 flex flex-col items-center justify-center p-4 bg-black/40 mb-3">
                    <Upload className="text-gold-400 mb-1" size={22} />
                    <span className="font-inter text-xs text-cream/60">Upload photo for this milestone card</span>
                  </div>
                )}

                <label className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer inline-flex items-center gap-2">
                  <Upload size={14} />
                  {uploadingMilestone ? 'Uploading Image...' : mImage ? 'Change Milestone Image' : 'Upload Milestone Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMilestoneImageUpload}
                  />
                </label>
              </div>

              <div>
                <label className="font-inter text-xs text-gold-400 font-bold block mb-1">Milestone Title *</label>
                <input
                  type="text"
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="e.g. Conducted Noble World Record Event"
                  className="input-admin text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Organization / Location</label>
                  <input
                    type="text"
                    value={mOrg}
                    onChange={(e) => setMOrg(e.target.value)}
                    placeholder="e.g. Indian Aari Work Federation"
                    className="input-admin text-xs"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Date / Month</label>
                  <input
                    type="text"
                    value={mDate}
                    onChange={(e) => setMDate(e.target.value)}
                    placeholder="e.g. November 2025"
                    className="input-admin text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Highlight Badge Label</label>
                <input
                  type="text"
                  value={mHighlight}
                  onChange={(e) => setMHighlight(e.target.value)}
                  placeholder="e.g. World Record Event"
                  className="input-admin text-xs"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Full Description *</label>
                <textarea
                  value={mDescription}
                  onChange={(e) => setMDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe the achievement, artisan attendance, or official federation governance..."
                  className="input-admin text-xs w-full leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setMilestoneModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold glass border border-white/10 text-cream/60"
              >
                Cancel
              </button>
              <button
                onClick={saveMilestone}
                className="btn-admin-gold text-xs py-2 px-6 flex items-center gap-1.5"
              >
                <Save size={14} /> Save Milestone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT CUSTOM DYNAMIC SECTION MODAL */}
      {customSectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-admin rounded-3xl border border-gold-500/40 p-6 max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-playfair text-lg font-bold text-cream flex items-center gap-2">
                <Layers size={18} className="text-gold-400" />
                {editingCustomSectionId ? 'Edit Custom Content Section' : 'Create Custom Content Section'}
              </h3>
              <button onClick={() => setCustomSectionModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 text-cream/60">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* POSITION CHOICE DROPDOWN */}
              <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 space-y-1">
                <label className="font-inter text-xs text-gold-400 font-bold block">
                  Section Position Preference *
                </label>
                <select
                  value={csPosition}
                  onChange={(e: any) => setCsPosition(e.target.value)}
                  className="input-admin text-xs font-bold"
                >
                  <option value="above_milestones">⬆ Above Key Federation Milestones</option>
                  <option value="below_milestones">⬇ Below Key Federation Milestones</option>
                  <option value="below_story">📌 Below Studio Story</option>
                </select>
                <p className="font-inter text-[11px] text-cream/60">Choose where this custom section will appear on the About page.</p>
              </div>

              {/* CUSTOM SECTION IMAGE UPLOADER */}
              <div className="text-center">
                <label className="font-inter text-xs text-cream/70 block mb-1">Section Feature Image (Optional)</label>
                {csImage ? (
                  <div className="relative aspect-[16/9] w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black mb-2">
                    <Image src={csImage} alt="Section Preview" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] w-full max-w-[320px] mx-auto rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-4 bg-black/40 mb-2">
                    <Upload className="text-gold-400 mb-1" size={20} />
                    <span className="font-inter text-xs text-cream/60">Upload section banner photo</span>
                  </div>
                )}

                <label className="px-3 py-1.5 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Upload size={14} />
                  {uploadingCustomSection ? 'Uploading Image...' : csImage ? 'Change Image' : 'Upload Section Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCustomSectionImageUpload}
                  />
                </label>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Section Title *</label>
                <input
                  type="text"
                  value={csTitle}
                  onChange={(e) => setCsTitle(e.target.value)}
                  placeholder="e.g. Master Artisan Workshops &amp; Training"
                  className="input-admin text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Subtitle / Location</label>
                  <input
                    type="text"
                    value={csSubtitle}
                    onChange={(e) => setCsSubtitle(e.target.value)}
                    placeholder="e.g. Ranipet Training Center"
                    className="input-admin text-xs"
                  />
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 block mb-1">Badge Label</label>
                  <input
                    type="text"
                    value={csBadge}
                    onChange={(e) => setCsBadge(e.target.value)}
                    placeholder="e.g. Artisan Empowerment"
                    className="input-admin text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Section Content *</label>
                <textarea
                  value={csContent}
                  onChange={(e) => setCsContent(e.target.value)}
                  rows={4}
                  placeholder="Write full section information and details..."
                  className="input-admin text-xs w-full leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setCustomSectionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold glass border border-white/10 text-cream/60"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomSection}
                className="btn-admin-gold text-xs py-2 px-6 flex items-center gap-1.5"
              >
                <Save size={14} /> Save Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EVENT PHOTO MODAL WITH INSTANT FILE PREVIEW */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
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
              {/* IMAGE PREVIEW BOX */}
              <div className="text-center">
                <label className="font-inter text-xs text-cream/70 block mb-1.5">Select Event Image *</label>
                {eventSrc ? (
                  <div className="relative aspect-[4/3] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-gold-500/40 bg-black mb-3">
                    <Image src={eventSrc} alt="Preview" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] w-full max-w-[280px] mx-auto rounded-2xl border-2 border-dashed border-gold-500/30 flex flex-col items-center justify-center p-4 bg-black/40 mb-3">
                    <Upload className="text-gold-400 mb-1" size={24} />
                    <span className="font-inter text-xs text-cream/60">Click below to upload image file</span>
                  </div>
                )}

                <label className="px-4 py-2 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer inline-flex items-center gap-2">
                  <Upload size={14} />
                  {uploadingEvent ? 'Uploading Image...' : eventSrc ? 'Change Image File' : 'Upload Image File'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEventPhotoUpload}
                  />
                </label>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Event Title *</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. World Record Aari Work Ceremony"
                  className="input-admin text-xs font-bold"
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
                className="btn-admin-gold text-xs py-2 px-6 flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Event Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
