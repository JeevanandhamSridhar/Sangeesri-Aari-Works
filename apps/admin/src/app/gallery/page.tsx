'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Tag, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface GalleryItem {
  id: string
  title: string
  category: string
  src: string
}

const initialGallery: GalleryItem[] = [
  { id: '1', title: 'Royal Gold Bridal Blouse', category: 'Bridal', src: 'https://picsum.photos/seed/gal1/400/500' },
  { id: '2', title: 'Maggam Work Masterpiece', category: 'Maggam', src: 'https://picsum.photos/seed/gal2/400/500' },
  { id: '3', title: 'Traditional Zardosi Blouse', category: 'Zardosi', src: 'https://picsum.photos/seed/gal3/400/500' },
  { id: '4', title: 'Pearl & Stone Work', category: 'Stone Work', src: 'https://picsum.photos/seed/gal4/400/500' },
]

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Bridal')
  const [url, setUrl] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !url) return
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title,
      category,
      src: url,
    }
    setItems([newItem, ...items])
    setTitle('')
    setUrl('')
    toast.success('Gallery design published!')
  }

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id))
    toast.success('Gallery item removed')
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Portfolio Gallery Manager</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">Upload and categorize completed Aari blouse design photos for the public website showcase.</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleAdd} className="glass-admin rounded-3xl p-6 border border-gold-500/20 space-y-4">
        <h2 className="font-playfair text-lg font-bold text-cream">Add New Design Photo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Design Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Peacock Zari Bridal Blouse"
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
              <option value="Bridal">Bridal</option>
              <option value="Aari Work">Aari Work</option>
              <option value="Maggam">Maggam</option>
              <option value="Zardosi">Zardosi</option>
              <option value="Stone Work">Stone Work</option>
              <option value="Designer">Designer</option>
            </select>
          </div>
          <div>
            <label className="font-inter text-xs text-cream/70 mb-1 block">Image URL *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/..."
              className="input-admin text-xs"
            />
          </div>
        </div>

        <button type="submit" className="btn-admin-gold text-xs py-2.5">
          <Plus size={14} /> Publish To Gallery
        </button>
      </form>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border border-white/10 group">
            <Image src={item.src} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-darkbase/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="font-playfair text-sm font-bold text-cream mb-1">{item.title}</p>
              <span className="text-[10px] text-gold-400 font-semibold">{item.category}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 p-1.5 rounded-lg bg-red-500/80 text-white self-start hover:bg-red-600 transition-colors"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
