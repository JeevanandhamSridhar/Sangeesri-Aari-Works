'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  UploadCloud,
  Check,
  Copy,
  Hash,
  Search,
  Edit3,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  ArrowUpDown,
} from 'lucide-react'
import { toast } from 'sonner'

export interface GalleryItem {
  id: string
  code: string
  title: string
  category: string
  src: string
  images?: string[]
  showPrice?: boolean
  priceEstimate?: string
  tags: string[]
  description?: string
  workType?: string
  hidden?: boolean
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [globalShowPrices, setGlobalShowPrices] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [syncingFolder, setSyncingFolder] = useState(false)

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [editCode, setEditCode] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editPrice, setEditPrice] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editHidden, setEditHidden] = useState(false)
  const [editImages, setEditImages] = useState<string[]>([])

  // Manual Add State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Bridal Blouses')
  const [priceEstimate, setPriceEstimate] = useState('₹3,500 – ₹6,500')
  const [url, setUrl] = useState('')

  const fetchStoreItems = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/gallery-store?admin=true')
      const data = await res.json()
      if (data.success && Array.isArray(data.designs)) {
        setItems(data.designs)
      }
    } catch (err) {
      toast.error('Failed to load gallery data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStoreItems()
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
      }
    } catch {
      toast.error('Failed to sync with server store')
    }
  }

  const toggleGlobalShowPrices = (enabled: boolean) => {
    setGlobalShowPrices(enabled)
    syncWithServerStore({
      action: 'toggle_price_mode',
      showPrice: enabled,
    })
    toast.success(
      enabled
        ? 'Website Price Display: Enabled for all designs!'
        : 'Website Price Display: Hidden (Price on Request mode)'
    )
  }

  const toggleItemShowPrice = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (!target) return
    const newStatus = !target.showPrice

    syncWithServerStore({
      action: 'toggle_price_mode',
      id,
      showPrice: newStatus,
    })
    toast.success(newStatus ? `Price enabled for ${target.code}` : `Price hidden for ${target.code}`)
  }

  const toggleItemHidden = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (!target) return
    const newHidden = !target.hidden

    syncWithServerStore({
      action: 'toggle_hidden',
      id,
      hidden: newHidden,
    })
    toast.success(newHidden ? `Design ${target.code} hidden from website` : `Design ${target.code} published to website`)
  }

  const handleDelete = (id: string) => {
    const target = items.find((i) => i.id === id)
    if (confirm(`Are you sure you want to delete design ${target?.code || ''}?`)) {
      syncWithServerStore({ action: 'delete', id })
      toast.success('Design removed from gallery!')
    }
  }

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) {
      toast.error('Please enter a title and image URL')
      return
    }

    syncWithServerStore({
      action: 'add_item',
      item: {
        title,
        category,
        src: url,
        images: [url],
        showPrice: false,
        priceEstimate,
        tags: ['New Arrival', 'Custom'],
      },
    })

    setTitle('')
    setUrl('')
    toast.success('New design added!')
  }

  const generateNextCode = () => {
    let maxNum = 0
    items.forEach((item) => {
      const match = item.code.match(/SSAW-(\d+)/)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    })
    return `SSAW-${String(maxNum + 1).padStart(3, '0')}`
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
    toast.info(`Uploading ${files.length} images to server...`)
    let completed = 0

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        if (base64) {
          const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
          const formattedTitle = rawName.charAt(0).toUpperCase() + rawName.slice(1) || 'Aari Blouse Design'

          syncWithServerStore({
            action: 'upload_file',
            fileData: base64,
            fileName: file.name,
            title: formattedTitle,
            category: 'Bridal Blouses',
            priceEstimate: '₹3,500 – ₹6,500',
          })

          completed++
          if (completed === files.length) {
            toast.success(`Successfully uploaded ${files.length} images to gallery!`)
          }
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Code ${code} copied!`)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item)
    setEditCode(item.code)
    setEditTitle(item.title)
    setEditCategory(item.category || 'Bridal Blouses')
    setEditPrice(item.priceEstimate || '₹3,500 – ₹6,500')
    setEditDescription(item.description || '')
    setEditHidden(!!item.hidden)
    setEditImages(item.images && item.images.length > 0 ? [...item.images] : [item.src])
  }

  const handleAddAnglePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string
        if (base64) {
          // Send to upload route to save to disk
          fetch('/api/gallery-store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'upload_file',
              fileData: base64,
              fileName: `angle_${Date.now()}_${file.name}`,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.designs && data.designs.length > 0) {
                const uploadedSrc = data.designs[0].src
                setEditImages((prev) => [...prev, uploadedSrc])
                toast.success('New angle photo added!')
              }
            })
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveAnglePhoto = (index: number) => {
    if (editImages.length <= 1) {
      toast.error('A design must have at least 1 main photo.')
      return
    }
    setEditImages((prev) => prev.filter((_, i) => i !== index))
  }

  const saveModalEdit = () => {
    if (!editingItem) return

    const updatedItem = {
      ...editingItem,
      code: editCode,
      title: editTitle,
      category: editCategory,
      priceEstimate: editPrice,
      description: editDescription,
      hidden: editHidden,
      src: editImages[0] || editingItem.src,
      images: editImages,
    }

    syncWithServerStore({
      action: 'update_item',
      item: updatedItem,
    })

    setEditingItem(null)
    toast.success(`Updated design ${editCode}!`)
  }

  const syncLocalFolder = async () => {
    setSyncingFolder(true)
    try {
      await syncWithServerStore({ action: 'sync_folder' })
      toast.success('Gallery synced bidirectionally with disk folder!')
    } finally {
      setSyncingFolder(false)
    }
  }

  const filteredItems = items.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream flex items-center gap-2">
            <Sparkles className="text-gold-400" size={24} />
            Design Gallery &amp; Code Manager
          </h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Manage your {items.length} real Aari blouse design images, codes (`SSAW-001`), prices, and hide/publish status.
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
            Price on Request
          </button>
          <button
            onClick={() => toggleGlobalShowPrices(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-inter transition-all ${
              globalShowPrices
                ? 'bg-gold-500 text-darkbase shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'glass border border-white/10 text-cream/60 hover:text-cream'
            }`}
          >
            Show Prices
          </button>
        </div>
      </div>

      {/* DROP ZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`glass-admin rounded-3xl p-8 border-2 border-dashed text-center transition-all cursor-pointer ${
          isDragging ? 'border-gold-400 bg-gold-500/10' : 'border-gold-500/30 hover:border-gold-500/50'
        }`}
        onClick={() => document.getElementById('admin-file-upload')?.click()}
      >
        <input
          id="admin-file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-4 rounded-full bg-gold-500/20 text-gold-400">
            <UploadCloud size={32} />
          </div>
          <div>
            <h3 className="font-playfair text-lg font-bold text-cream">
              Drop Images Here or Click to Upload
            </h3>
            <p className="font-inter text-xs text-cream/60 mt-1">
              Codes like <span className="font-mono text-gold-400 font-bold">{generateNextCode()}</span> will be auto-assigned in clean order!
            </p>
          </div>
        </div>
      </div>

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
          const isPriceShown = globalShowPrices || item.showPrice
          const isHidden = !!item.hidden
          const angleCount = item.images ? item.images.length : 1

          return (
            <div
              key={item.id}
              className={`glass-admin rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                isHidden ? 'border-red-500/30 opacity-70 bg-black/40' : 'border-white/10 hover:border-gold-500/40'
              }`}
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
                  {angleCount > 1 && (
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/90 text-darkbase font-inter text-[10px] font-bold">
                      {angleCount} Angles 🎠
                    </span>
                  )}
                </div>

                {/* HIDE / PUBLISH BADGE */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                  <button
                    onClick={() => toggleItemHidden(item.id)}
                    title={isHidden ? 'Hidden from website. Click to publish.' : 'Visible on website. Click to hide.'}
                    className={`px-2.5 py-1 rounded-full backdrop-blur-md font-inter text-[10px] font-bold flex items-center gap-1 transition-all ${
                      isHidden
                        ? 'bg-red-500 text-white border border-red-400'
                        : 'bg-black/80 text-green-400 border border-green-500/40'
                    }`}
                  >
                    {isHidden ? <EyeOff size={11} /> : <Eye size={11} />}
                    {isHidden ? 'HIDDEN' : 'VISIBLE'}
                  </button>
                </div>

                <div className="absolute bottom-2 left-3 z-10">
                  <span className="badge-gold text-[9px]">{item.category}</span>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-playfair text-base font-bold text-cream mb-1 flex items-center justify-between">
                    <span>{item.title}</span>
                  </h3>

                  <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-white/10">
                    <span className="font-inter text-cream/50 text-[11px]">Price Estimate:</span>
                    {isPriceShown ? (
                      <span className="font-inter font-bold text-gold-400">{item.priceEstimate}</span>
                    ) : (
                      <span className="font-inter text-[10px] text-green-400 font-semibold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                        Price on Request
                      </span>
                    )}
                  </div>
                </div>

                {/* CARD ACTIONS */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="btn-luxury py-1.5 px-3 text-[11px] flex items-center gap-1 text-gold-400 hover:text-white"
                  >
                    <Edit3 size={12} /> Edit Code &amp; Photos
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete design"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* RICH EDIT DESIGN MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-admin rounded-3xl border border-gold-500/40 p-6 max-w-2xl w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
                  <Edit3 className="text-gold-400" size={20} />
                  Edit Design Details &amp; Photos
                </h2>
                <p className="font-inter text-xs text-cream/50 mt-0.5">
                  Update design code, name, category, price, website visibility, or add angle photos.
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 rounded-full hover:bg-white/10 text-cream/60 hover:text-cream"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-xs text-gold-400 font-bold block mb-1">Design Code (Rearrange Order) *</label>
                <input
                  type="text"
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  placeholder="e.g. SSAW-001"
                  className="input-admin text-sm font-mono font-bold border-gold-500/50"
                />
                <span className="text-[10px] text-cream/40 mt-1 block">
                  Change code to rearrange display position (e.g. SSAW-001 appears first).
                </span>
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Design Name / Title *</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="input-admin text-sm"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Category *</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
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
                <label className="font-inter text-xs text-cream/70 block mb-1">Price Estimate Range</label>
                <input
                  type="text"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="₹3,500 – ₹6,500"
                  className="input-admin text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-inter text-xs text-cream/70 block mb-1">Website Visibility</label>
                <button
                  type="button"
                  onClick={() => setEditHidden(!editHidden)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    editHidden
                      ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-green-500/20 border-green-500/40 text-green-400'
                  }`}
                >
                  {editHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                  {editHidden ? 'Hidden from Website (Draft Mode)' : 'Visible to Website Visitors'}
                </button>
              </div>
            </div>

            {/* MULTI ANGLE PHOTO MANAGER */}
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-playfair text-sm font-bold text-cream flex items-center gap-2">
                  <ImageIcon size={16} className="text-gold-400" />
                  Angle Photos Manager ({editImages.length} Photos)
                </h3>
                <label className="px-3 py-1.5 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-darkbase transition-all font-inter text-xs font-bold cursor-pointer flex items-center gap-1.5">
                  <Plus size={14} />
                  Add Angle Photo
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleAddAnglePhoto}
                  />
                </label>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {editImages.map((imgSrc, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/20 group bg-black/60">
                    <Image src={imgSrc} alt={`Angle ${idx + 1}`} fill unoptimized className="object-cover" />
                    <span className="absolute top-1 left-1 bg-black/80 text-gold-400 font-mono text-[9px] px-1.5 py-0.5 rounded">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAnglePhoto(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove this photo angle"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold font-inter glass border border-white/10 text-cream/60 hover:text-cream"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveModalEdit}
                className="btn-admin-gold text-xs py-2 px-6 flex items-center gap-2"
              >
                <Save size={14} /> Save All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
