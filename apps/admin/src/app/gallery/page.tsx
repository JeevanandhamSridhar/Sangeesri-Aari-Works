'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Hash, UploadCloud, Copy, Check, Search, Sparkles, Eye, EyeOff, Edit3, Save, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { galleryDesigns as initialGalleryDesigns, GalleryDesign } from '@/data/galleryData'

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryDesign[]>(initialGalleryDesigns)
  const [globalShowPrices, setGlobalShowPrices] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editPrice, setEditPrice] = useState('')

  // Upload Form states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Bridal Blouses')
  const [url, setUrl] = useState('')
  const [priceEstimate, setPriceEstimate] = useState('₹3,500 – ₹6,000')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Load single-source storage database
  const loadGalleryFromStore = () => {
    fetch('/api/gallery-store')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.designs)) {
          setItems(data.designs)
        }
      })
      .catch(() => {
        fetch('http://localhost:3000/api/gallery-store')
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.designs)) setItems(data.designs)
          })
          .catch(() => {})
      })
  }

  useEffect(() => {
    loadGalleryFromStore()
  }, [])

  const syncWithServerStore = async (payload: any) => {
    try {
      const res = await fetch('/api/gallery-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success && Array.isArray(data.designs)) {
        setItems(data.designs)
        return data.designs
      }
    } catch {
      try {
        const res = await fetch('http://localhost:3000/api/gallery-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.success && Array.isArray(data.designs)) {
          setItems(data.designs)
          return data.designs
        }
      } catch (e) {
        console.error('Error syncing with gallery store:', e)
      }
    }
  }

  const toggleGlobalShowPrices = (val: boolean) => {
    setGlobalShowPrices(val)
    syncWithServerStore({ action: 'toggle_price_mode', showPrice: val })
    toast.success(val ? 'Prices are now VISIBLE on the public website!' : 'Prices are now HIDDEN (Price on Request mode) on website!')
  }

  const toggleItemShowPrice = (id: string) => {
    const target = items.find((i) => i.id === id)
    const nextVal = !target?.showPrice
    syncWithServerStore({ action: 'toggle_price_mode', id, showPrice: nextVal })
    toast.success(
      nextVal
        ? `Price enabled for design ${target?.code}`
        : `Price hidden for design ${target?.code}`
    )
  }

  const startEditing = (item: GalleryDesign) => {
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditPrice(item.priceEstimate || '₹3,500 – ₹6,000')
  }

  const saveEditing = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (target) {
      const updatedItem = { ...target, title: editTitle, priceEstimate: editPrice }
      syncWithServerStore({ action: 'update_item', item: updatedItem })
      setEditingId(null)
      toast.success('Design details updated successfully!')
    }
  }

  const handleDelete = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (confirm(`Are you sure you want to delete design ${target?.code || ''}? This will remove it from website and server disk.`)) {
      syncWithServerStore({ action: 'delete', id })
      toast.success(`Design ${target?.code || ''} deleted successfully!`)
    }
  }

  // Generate next SSAW code (e.g. SSAW-035)
  const generateNextCode = () => {
    const numbers = items
      .map((i) => {
        const match = i.code.match(/SSAW-(\d+)/)
        return match ? parseInt(match[1], 10) : 0
      })
      .filter((n) => !isNaN(n))
    const max = numbers.length > 0 ? Math.max(...numbers) : 0
    const nextNum = max + 1
    return `SSAW-${String(nextNum).padStart(3, '0')}`
  }

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return
    const newCode = generateNextCode()
    const newItem = {
      id: `custom-${Date.now()}`,
      code: newCode,
      title,
      category,
      src: url,
      showPrice: false,
      priceEstimate,
      tags: ['Custom Design', 'Handcrafted'],
      description: 'Custom handcrafted Aari embroidery design based on client size & material preferences.',
    }
    syncWithServerStore({ action: 'add_item', item: newItem })
    setTitle('')
    setUrl('')
    toast.success(`Design ${newCode} added to gallery!`)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'))
    if (files.length === 0) {
      toast.error('Please drop valid image files (JPG, PNG, WEBP)')
      return
    }
    processFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files).filter((file) => file.type.startsWith('image/'))
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    files.forEach((file, idx) => {
      const objectUrl = URL.createObjectURL(file)
      const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      const formattedTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1) || 'Aari Blouse Design'

      syncWithServerStore({
        action: 'add_item',
        item: {
          title: formattedTitle,
          category: 'Bridal Blouses',
          src: objectUrl,
          showPrice: false,
          priceEstimate: '₹3,500 – ₹6,500',
          tags: ['New Arrival', 'Custom'],
        },
      })
    })
    toast.success(`Uploaded ${files.length} images!`)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Code ${code} copied!`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      item.code.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  const [syncingFolder, setSyncingFolder] = useState(false)

  const syncLocalFolder = async () => {
    setSyncingFolder(true)
    try {
      await syncWithServerStore({ action: 'sync_folder' })
      toast.success('Gallery synchronized with server storage!')
    } catch {
      toast.error('Sync failed')
    } finally {
      setSyncingFolder(false)
    }
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream flex items-center gap-2">
            <Sparkles className="text-gold-400" size={24} />
            Design Gallery &amp; Price Visibility Manager
          </h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Manage your {items.length} real Aari blouse design images, custom titles, prices, and visibility to website visitors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={syncLocalFolder}
            disabled={syncingFolder}
            className="px-4 py-2 rounded-2xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold flex items-center gap-2"
          >
            <UploadCloud size={16} className={syncingFolder ? 'animate-bounce' : ''} />
            {syncingFolder ? 'Syncing Folder...' : 'Sync Pictures Folder'}
          </button>
          <div className="bg-gold-500/10 px-4 py-2 rounded-2xl border border-gold-500/20 text-right">
            <span className="text-[10px] text-cream/50 uppercase block font-inter">Next Auto Code</span>
            <span className="font-mono text-lg font-bold text-gold-400">{generateNextCode()}</span>
          </div>
        </div>
      </div>

      {/* BULK PRICE VISIBILITY CONTROLLER BAR */}
      <div className="glass-admin rounded-3xl p-6 border border-gold-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#120c08] to-[#1c130c]">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl ${globalShowPrices ? 'bg-gold-500/20 text-gold-400' : 'bg-green-500/20 text-green-400'}`}>
            {globalShowPrices ? <Eye size={24} /> : <EyeOff size={24} />}
          </div>
          <div>
            <h2 className="font-playfair text-base font-bold text-cream">
              Website Price Display Mode: <span className={globalShowPrices ? 'text-gold-400' : 'text-green-400'}>{globalShowPrices ? 'All Prices Visible' : 'Price on Request (Default)'}</span>
            </h2>
            <p className="font-inter text-xs text-cream/60 mt-0.5">
              {globalShowPrices
                ? 'Customers will see estimated price ranges on all images across the website.'
                : 'Prices are hidden on images. Customers see "Price on Request" & WhatsApp Quote button.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleGlobalShowPrices(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-inter transition-all ${
              !globalShowPrices
                ? 'bg-green-500 text-darkbase shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : 'glass border border-white/10 text-cream/60 hover:text-cream'
            }`}
          >
            <EyeOff size={14} className="inline mr-1.5" />
            Hide Prices (Price on Request)
          </button>

          <button
            onClick={() => toggleGlobalShowPrices(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-inter transition-all ${
              globalShowPrices
                ? 'bg-gold-500 text-darkbase shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'glass border border-white/10 text-cream/60 hover:text-cream'
            }`}
          >
            <Eye size={14} className="inline mr-1.5" />
            Show Prices to Users
          </button>
        </div>
      </div>

      {/* DRAG AND DROP BULK UPLOADER ZONE */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-gold-400 bg-gold-500/10 scale-[1.01]'
            : 'border-gold-500/30 bg-black/40 hover:border-gold-400/60 hover:bg-gold-500/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 shadow-lg">
            <UploadCloud size={28} />
          </div>
          <div>
            <h3 className="font-playfair text-lg font-bold text-cream">
              Drag &amp; Drop More Design Images Here
            </h3>
            <p className="font-inter text-xs text-cream/60 mt-1">
              Codes like <span className="font-mono text-gold-400 font-bold">{generateNextCode()}</span> will be auto-assigned!
            </p>
          </div>
          <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-cream/50 font-inter">
            Supports JPG, PNG, WEBP (Batch upload supported)
          </span>
        </div>
      </div>

      {/* MANUAL ADD FORM */}
      <form onSubmit={handleManualAdd} className="glass-admin rounded-3xl p-6 border border-gold-500/20 space-y-4">
        <h2 className="font-playfair text-base font-bold text-cream flex items-center justify-between">
          <span>Add Single Design Image via URL</span>
          <span className="font-mono text-xs text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
            Assigned Code: {generateNextCode()}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Design Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Peacock Zari Blouse"
              className="input-admin text-xs"
            />
          </div>
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-admin text-xs bg-darkbase"
            >
              <option value="Bridal Blouses">Bridal Blouses</option>
              <option value="Aari Embroidery">Aari Embroidery</option>
              <option value="Maggam Work">Maggam Work</option>
              <option value="Zardosi & Kundan">Zardosi & Kundan</option>
              <option value="Stone & Pearl Work">Stone & Pearl Work</option>
              <option value="Cutwork & Designer">Cutwork & Designer</option>
              <option value="Traditional Motifs">Traditional Motifs</option>
            </select>
          </div>
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Price Estimate Range *</label>
            <input
              type="text"
              required
              value={priceEstimate}
              onChange={(e) => setPriceEstimate(e.target.value)}
              placeholder="₹3,500 – ₹6,000"
              className="input-admin text-xs"
            />
          </div>
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Image URL *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="input-admin text-xs"
            />
          </div>
        </div>

        <button type="submit" className="btn-admin-gold text-xs py-2.5">
          <Plus size={14} /> Add Single Design ({generateNextCode()})
        </button>
      </form>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code (e.g. SSAW-001) or title..."
            className="input-admin pl-9 text-xs w-full"
          />
        </div>

        <p className="font-inter text-xs text-cream/60">
          Showing <span className="text-gold-400 font-bold">{filteredItems.length}</span> of {items.length} designs
        </p>
      </div>

      {/* GALLERY MANAGEMENT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isEditing = editingId === item.id
          const isPriceShown = globalShowPrices || item.showPrice

          return (
            <div
              key={item.id}
              className="glass-admin rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 transition-all"
            >
              {/* IMAGE PREVIEW WITH BADGES */}
              <div className="relative aspect-[4/3] w-full bg-black/60">
                <Image src={item.src} alt={item.title} fill unoptimized className="object-cover" />

                {/* CODE BADGE */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyCode(item.code)}
                    className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-500/40 text-gold-400 font-mono text-xs font-bold flex items-center gap-1 hover:bg-gold-500 hover:text-darkbase transition-all"
                  >
                    <Hash size={10} />
                    {item.code}
                    {copiedCode === item.code ? <Check size={10} className="text-green-400" /> : <Copy size={9} />}
                  </button>
                </div>

                {/* PRICE VISIBILITY TOGGLE BADGE */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => toggleItemShowPrice(item.id)}
                    title={item.showPrice ? 'Individual price display ENABLED' : 'Individual price display HIDDEN'}
                    className={`px-2.5 py-1 rounded-full backdrop-blur-md font-inter text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                      item.showPrice
                        ? 'bg-gold-500 text-darkbase border border-gold-400'
                        : 'bg-black/80 text-green-400 border border-green-500/40'
                    }`}
                  >
                    {item.showPrice ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.showPrice ? 'Price ON' : 'Price HIDDEN'}
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 z-10">
                  <span className="badge-gold text-[9px]">{item.category}</span>
                </div>
              </div>

              {/* CARD DETAILS & EDITING */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                {isEditing ? (
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] text-cream/50 uppercase font-inter block mb-1">Design Title</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="input-admin text-xs w-full"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-cream/50 uppercase font-inter block mb-1">Price Range Estimate</label>
                      <input
                        type="text"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        placeholder="₹3,500 – ₹6,000"
                        className="input-admin text-xs w-full"
                      />
                    </div>
                    <button
                      onClick={() => saveEditing(item.id)}
                      className="btn-admin-gold text-xs py-1.5 w-full flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Save size={12} /> Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-playfair text-base font-bold text-cream mb-1">{item.title}</h3>

                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/10">
                      <span className="font-inter text-cream/50 text-[11px]">Price Status:</span>
                      {isPriceShown ? (
                        <span className="font-inter font-bold text-gold-400">{item.priceEstimate}</span>
                      ) : (
                        <span className="font-inter text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                          Price on Request
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* CARD ACTIONS */}
                {!isEditing && (
                  <div className="flex items-center justify-between pt-3 border-t border-white/5 gap-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="btn-luxury py-1.5 px-3 text-[11px] flex items-center gap-1 text-cream/80 hover:text-gold-400"
                    >
                      <Edit3 size={12} /> Edit Name &amp; Price
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete design"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


