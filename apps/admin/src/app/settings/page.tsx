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

  const [studioStatus, setStudioStatus] = useState<'available' | 'busy_bridal' | 'paused'>('available')
  const [statusNote, setStatusNote] = useState('Slots open for upcoming wedding season orders')
  const [statusSaving, setStatusSaving] = useState(false)

  const handleSaveStatus = async () => {
    setStatusSaving(true)
    try {
      await fetch('/api/studio-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: studioStatus, note: statusNote }),
      })
      toast.success('Studio activity status updated! Live website badge updated.')
    } catch {
      toast.error('Failed to update status.')
    } finally {
      setStatusSaving(false)
    }
  }

  const [freeShippingEnabled, setFreeShippingEnabled] = useState(false)
  const [shippingSaving, setShippingSaving] = useState(false)

  const handleSaveShippingSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setShippingSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          freeShippingEnabled,
          freeDeliveryThreshold: Number(settings.freeDeliveryThreshold),
          deliveryCharge: Number(settings.deliveryCharge),
          gstRate: Number(settings.gstRate),
        }),
      })
      toast.success('Store shipping & free delivery policy updated successfully!')
    } catch {
      toast.error('Failed to update shipping settings.')
    } finally {
      setShippingSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Store &amp; Studio Settings</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">Configure business details, order availability status, hero section, and delivery rates.</p>
      </div>

      {/* ── Free Shipping Promotion Control ────────────────── */}
      <div className="glass-admin rounded-3xl p-8 border border-gold-500/20 space-y-6 bg-gradient-to-b from-darkcard to-darkbase">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-playfair text-xl font-bold text-gold-400 flex items-center gap-2">
              🚚 Free Shipping Promotion Control
            </h2>
            <p className="font-inter text-xs text-cream/60 mt-1">
              Enable or disable free shipping promotions across the user storefront.
            </p>
          </div>

          {/* Status Pill */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
            freeShippingEnabled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            {freeShippingEnabled ? '🟢 Free Shipping ON' : '🔴 Free Shipping OFF'}
          </span>
        </div>

        {/* Interactive Toggle Card */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="font-inter text-sm font-semibold text-cream">
              {freeShippingEnabled ? 'Free Shipping Enabled for Orders Above Threshold' : 'Free Shipping Disabled (Standard Delivery Applies to All Orders)'}
            </div>
            <div className="font-inter text-xs text-cream/50 mt-0.5">
              {freeShippingEnabled
                ? `Customers ordering above ₹${settings.freeDeliveryThreshold} receive 100% free delivery.`
                : `All orders will charge the standard ₹${settings.deliveryCharge} shipping fee.`}
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => setFreeShippingEnabled(!freeShippingEnabled)}
            className={`w-14 h-8 rounded-full transition-colors duration-300 relative shrink-0 p-1 ${
              freeShippingEnabled ? 'bg-emerald-500' : 'bg-white/20'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 shadow-md ${
              freeShippingEnabled ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* ── Studio Order Activity & Booking Status ──────────────── */}
      <div className="glass-admin rounded-3xl p-8 border border-gold-500/20 space-y-6 bg-gradient-to-b from-darkcard to-darkbase">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h2 className="font-playfair text-xl font-bold text-gold-400 flex items-center gap-2">
              ⚡ Studio Order Activity &amp; Availability Status
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              studioStatus === 'available'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : studioStatus === 'busy_bridal'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {studioStatus === 'available' && '🟢 Available for Orders'}
              {studioStatus === 'busy_bridal' && '🧵 Working on Bridal Orders'}
              {studioStatus === 'paused' && '🔴 Orders Paused'}
            </span>
          </div>
          <p className="font-inter text-xs text-cream/60">
            Control the real-time order acceptance indicator shown to customers on the studio website.
          </p>
        </div>

        {/* Status Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              key: 'available' as const,
              title: '🟢 Taking New Orders',
              subtitle: 'Open for custom Aari & bridal blouse orders',
              accent: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
            },
            {
              key: 'busy_bridal' as const,
              title: '🧵 Working on Bridal Orders',
              subtitle: 'Currently crafting bridal orders (Limited slots)',
              accent: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
            },
            {
              key: 'paused' as const,
              title: '🔴 Orders Paused',
              subtitle: 'Full capacity — not accepting new orders currently',
              accent: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setStudioStatus(item.key)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                studioStatus === item.key
                  ? item.accent
                  : 'bg-white/5 border-white/10 text-cream/60 hover:border-gold-500/30 hover:text-cream'
              }`}
            >
              <div>
                <div className="font-inter text-xs font-bold mb-1">{item.title}</div>
                <div className="font-inter text-[11px] opacity-75">{item.subtitle}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-wider uppercase opacity-60">Status Pill</span>
                <input
                  type="radio"
                  name="studioStatus"
                  checked={studioStatus === item.key}
                  onChange={() => setStudioStatus(item.key)}
                  className="accent-gold-400"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Note input */}
        <div>
          <label className="font-inter text-xs text-cream/70 mb-1.5 block">
            Customer Announcement Note (Optional)
          </label>
          <input
            type="text"
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
            placeholder="e.g. Booking open for October bridal season..."
            className="input-admin text-xs"
          />
        </div>

        <button
          type="button"
          onClick={handleSaveStatus}
          disabled={statusSaving}
          className="btn-admin-gold w-full justify-center"
        >
          {statusSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Updating Status...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check size={16} /> Save Studio Order Availability Status
            </span>
          )}
        </button>
      </div>

      {/* ── Business Details ─────────────────────────────────── */}
      <form onSubmit={handleSaveShippingSettings} className="glass-admin rounded-3xl p-8 border border-white/10 space-y-8">
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

        <button type="submit" disabled={shippingSaving} className="btn-admin-gold w-full justify-center py-4">
          <Save size={16} /> Save Business &amp; Shipping Settings
        </button>
      </form>
    </div>
  )
}
