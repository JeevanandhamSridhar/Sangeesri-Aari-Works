'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Needles',
    mrp: '',
    salePrice: '',
    stock: '25',
    description: '',
    specifications: '',
  })

  // Multi-image management (Require 2+ images as per user requirement)
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://picsum.photos/seed/newprod1/600/750',
    'https://picsum.photos/seed/newprod2/600/750',
  ])
  const [newUrl, setNewUrl] = useState('')

  const handleAddImage = () => {
    if (!newUrl) return
    setImageUrls([...imageUrls, newUrl])
    setNewUrl('')
    toast.success('Image added to product gallery')
  }

  const handleRemoveImage = (index: number) => {
    if (imageUrls.length <= 2) {
      toast.error('Products must have at least 2 images attached!')
      return
    }
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const mrpNum = parseFloat(formData.mrp) || 0
  const saleNum = parseFloat(formData.salePrice) || 0
  const discountPct = mrpNum > 0 && saleNum > 0 ? Math.round(((mrpNum - saleNum) / mrpNum) * 100) : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrls.length < 2) {
      toast.error('Please attach at least 2 images for this product!')
      return
    }
    toast.success(`Product "${formData.name}" published successfully!`)
    router.push('/products')
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Back button */}
      <Link href="/products" className="inline-flex items-center gap-2 font-inter text-xs text-cream/60 hover:text-gold-400">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Add New Product</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">Fill out product details, pricing rates, and upload 2+ images for user storefront.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-admin rounded-3xl p-8 border border-white/10 space-y-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10">
            1. General Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="font-inter text-xs text-cream/70 mb-2 block">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Pure Zari Golden Thread (500m)"
                className="input-admin"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. SN-THRD-GLD-500"
                className="input-admin font-mono"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-admin bg-darkbase"
              >
                <option value="Needles">Needles</option>
                <option value="Thread">Thread</option>
                <option value="Frames">Frames</option>
                <option value="Fabric">Fabric</option>
                <option value="Tools">Tools</option>
                <option value="Kits">Kits</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-6">
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10">
            2. Rates, Discount & Stock Level
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">MRP Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                placeholder="e.g. 599"
                className="input-admin"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Sale Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                placeholder="e.g. 399"
                className="input-admin"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Stock Quantity *</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="25"
                className="input-admin"
              />
            </div>
          </div>

          {/* Computed discount badge preview */}
          {discountPct > 0 && (
            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between font-inter text-xs">
              <span className="text-cream/70">Calculated Store Discount:</span>
              <span className="font-bold text-gold-400 text-sm">{discountPct}% OFF (User saves ₹{mrpNum - saleNum})</span>
            </div>
          )}
        </div>

        {/* Product Images (Minimum 2 required) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="font-playfair text-xl font-bold text-gold-400">
              3. Product Images (2+ Images Required)
            </h2>
            <span className="font-inter text-xs text-green-400 font-semibold">
              ✓ {imageUrls.length} Image(s) Attached
            </span>
          </div>

          {/* Add Image URL input */}
          <div className="flex gap-3">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste Cloudinary / Image URL (e.g. https://res.cloudinary.com/...)"
              className="input-admin flex-1 text-xs"
            />
            <button type="button" onClick={handleAddImage} className="btn-admin-outline shrink-0 text-xs">
              <Plus size={14} /> Add Image
            </button>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border border-gold-500/20 group">
                <Image src={url} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-darkbase/80 px-2 py-0.5 rounded-full text-[10px] font-inter text-gold-400 border border-gold-500/30">
                  Image #{idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <h2 className="font-playfair text-xl font-bold text-gold-400 pb-2 border-b border-white/10">
            4. Description & Specifications
          </h2>

          <div>
            <label className="font-inter text-xs text-cream/70 mb-2 block">Product Description</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide key features, fabric compatibility, needle size, etc..."
              className="input-admin"
            />
          </div>
        </div>

        <button type="submit" className="btn-admin-gold w-full justify-center py-4 text-base">
          <CheckCircle2 size={18} /> Save & Publish Product To Store
        </button>
      </form>
    </div>
  )
}
