'use client'

import { useState } from 'react'
import { Save, Image as ImageIcon, Video, Film, Eye, Check, AlertCircle, X } from 'lucide-react'
import { toast } from 'sonner'

type HeroMediaType = 'none' | 'image' | 'video' | 'gif'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    studioName: 'Sangee Sri Aari Works',
    phone: '7604887356',
    whatsapp: '7604887356',
    address: 'No. 6, Bazaar Street, Kaveripakkam, Ranipet District, PIN - 632508',
    freeDeliveryThreshold: '999',
    deliveryCharge: '99',
    gstRate: '5',
  })

  const [heroMedia, setHeroMedia] = useState({
    type: 'none' as HeroMediaType,
    url: '',
  })
  const [heroSaving, setHeroSaving] = useState(false)
  const [heroPreview, setHeroPreview] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Studio configuration updated!')
  }

  const handleSaveHero = async () => {
    setHeroSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'hero_media', value: heroMedia.url }),
      })
      toast.success('Hero section background updated! Refresh the client site to see changes.')
    } catch {
      toast.error('Failed to save. Please try again.')
    } finally {
      setHeroSaving(false)
    }
  }

  const clearHero = async () => {
    setHeroMedia({ type: 'none', url: '' })
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'hero_media', value: '' }),
      })
      toast.success('Hero background cleared — using default design.')
    } catch {}
  }

  const mediaTypeConfig = [
    { type: 'image' as HeroMediaType, icon: ImageIcon, label: 'Photo', desc: 'JPG / PNG / WebP' },
    { type: 'video' as HeroMediaType, icon: Video, label: 'Video', desc: 'MP4 / WebM' },
    { type: 'gif' as HeroMediaType, icon: Film, label: 'GIF', desc: 'Animated GIF' },
  ]

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Store &amp; Studio Settings</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">Configure business details, delivery rates, hero section, and taxes.</p>
      </div>

      {/* ── Hero Section Control ─────────────────────────────── */}
      <div className="glass-admin rounded-3xl p-8 border border-gold-500/15 space-y-6">
        <div>
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10 mb-4">
            🎨 Hero Section Background
          </h2>
          <p className="font-inter text-xs text-cream/50 mb-6">
            Set a custom image, video, or GIF as the hero section background. Leave empty to use the default luxury design.
          </p>
        </div>

        {/* Type picker */}
        <div>
          <label className="font-inter text-xs text-cream/70 mb-3 block">Background Type</label>
          <div className="grid grid-cols-3 gap-3">
            {mediaTypeConfig.map(({ type, icon: Icon, label, desc }) => (
              <button
                key={type}
                type="button"
                onClick={() => setHeroMedia({ ...heroMedia, type })}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200
                  ${heroMedia.type === type
                    ? 'bg-gold-500/10 border-gold-500/40 text-gold-400'
                    : 'bg-white/3 border-white/10 text-cream/50 hover:border-gold-500/20 hover:text-cream/70'
                  }`}
              >
                <Icon size={22} />
                <div>
                  <div className="font-inter text-xs font-semibold">{label}</div>
                  <div className="font-inter text-[10px] opacity-60">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* URL input */}
        <div>
          <label className="font-inter text-xs text-cream/70 mb-1.5 block">
            {heroMedia.type === 'video' ? 'Video URL (MP4/WebM)' : heroMedia.type === 'gif' ? 'GIF URL' : 'Image URL'}
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={heroMedia.url}
              onChange={(e) => setHeroMedia({ ...heroMedia, url: e.target.value })}
              placeholder={
                heroMedia.type === 'video'
                  ? 'https://example.com/hero-video.mp4'
                  : heroMedia.type === 'gif'
                  ? 'https://example.com/animation.gif'
                  : 'https://example.com/hero-image.jpg'
              }
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                font-inter text-sm text-cream placeholder:text-cream/20
                focus:outline-none focus:border-gold-500/40 transition-colors"
            />
            {heroMedia.url && (
              <button
                type="button"
                onClick={() => setHeroPreview(!heroPreview)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-cream/60
                  hover:text-gold-400 hover:border-gold-500/20 transition-all font-inter text-xs flex items-center gap-1.5"
              >
                <Eye size={14} /> Preview
              </button>
            )}
          </div>

          {/* Tip */}
          <p className="font-inter text-[11px] text-cream/30 mt-2 flex items-center gap-1.5">
            <AlertCircle size={11} />
            You can use a Cloudinary URL, Google Drive direct link, or any public image/video URL.
          </p>
        </div>

        {/* Mini preview */}
        {heroPreview && heroMedia.url && (
          <div className="relative rounded-2xl overflow-hidden aspect-[16/6] border border-white/10">
            {heroMedia.type === 'video' ? (
              <video src={heroMedia.url} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-70" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroMedia.url} alt="Hero preview" className="w-full h-full object-cover opacity-70" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-darkbase/80 to-transparent flex items-center px-6">
              <div>
                <div className="font-playfair text-2xl font-bold text-cream mb-1">Where Thread Meets Artistry</div>
                <div className="font-inter text-xs text-cream/60">Hero preview</div>
              </div>
            </div>
            <button
              onClick={() => setHeroPreview(false)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white"
            >
              <X size={13} />
            </button>
          </div>
        )}

        {/* Save / Clear */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSaveHero}
            disabled={heroSaving || !heroMedia.url}
            className="btn-admin-gold flex-1 justify-center"
          >
            {heroSaving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check size={15} /> Apply Hero Background
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={clearHero}
            className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-cream/50
              hover:text-red-400 hover:border-red-500/30 transition-all font-inter text-xs"
          >
            Clear
          </button>
        </div>
      </div>

      {/* ── Business Details ─────────────────────────────────── */}
      <form onSubmit={handleSave} className="glass-admin rounded-3xl p-8 border border-white/10 space-y-8">
        <div className="space-y-4">
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10">
            Business Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">Business Name</label>
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="input-admin"
              />
            </div>
            <div>
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="input-admin"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">Studio Address</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="input-admin"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10">
            Store Shipping &amp; Tax Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">Standard Shipping Fee (₹)</label>
              <input type="number" value={settings.deliveryCharge}
                onChange={(e) => setSettings({ ...settings, deliveryCharge: e.target.value })} className="input-admin" />
            </div>
            <div>
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">Free Shipping Threshold (₹)</label>
              <input type="number" value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: e.target.value })} className="input-admin" />
            </div>
            <div>
              <label className="font-inter text-xs text-cream/70 mb-1.5 block">Default GST (%)</label>
              <input type="number" value={settings.gstRate}
                onChange={(e) => setSettings({ ...settings, gstRate: e.target.value })} className="input-admin" />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-admin-gold w-full justify-center py-4">
          <Save size={16} /> Save Business Settings
        </button>
      </form>
    </div>
  )
}
