'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, CheckCircle2, Save } from 'lucide-react'
import { toast } from 'sonner'

// Default mock database lookup for initial edit pre-fill
const initialProducts: Record<string, {
  name: string
  sku: string
  category: string
  mrp: number
  salePrice: number
  stock: number
  description: string
  images: string[]
}> = {
  'prod-1': {
    name: 'Premium Aari Needle Set (12 pcs)',
    sku: 'SN-AARI-NDL-12',
    category: 'Needles',
    mrp: 399,
    salePrice: 249,
    stock: 45,
    description: 'Engineered for ultimate precision and smooth stitching. This 12-piece professional Aari needle set is crafted from hardened high-carbon steel with micro-polished hook points.',
    images: ['https://picsum.photos/seed/prod1/600/750', 'https://picsum.photos/seed/prod1b/600/750'],
  },
  'prod-2': {
    name: 'Silk Aari Thread — Gold (10 reels)',
    sku: 'SN-THRD-GLD-10',
    category: 'Thread',
    mrp: 599,
    salePrice: 399,
    stock: 28,
    description: 'Ultra-lustrous 100% mulberry silk golden embroidery threads designed specifically for heavy Aari and Maggam bridal work.',
    images: ['https://picsum.photos/seed/prod2/600/750', 'https://picsum.photos/seed/prod2b/600/750'],
  },
  'prod-3': {
    name: 'Round Aari Embroidery Frame — 12"',
    sku: 'SN-FRM-RND-12',
    category: 'Frames',
    mrp: 699,
    salePrice: 499,
    stock: 15,
    description: 'Sturdy wooden round embroidery frame with brass adjustment tension screw for holding silk and velvet taut.',
    images: ['https://picsum.photos/seed/prod3/600/750', 'https://picsum.photos/seed/prod3b/600/750'],
  },
  'prod-4': {
    name: 'Beginner Aari Work Complete Kit',
    sku: 'SN-KIT-BEG-01',
    category: 'Kits',
    mrp: 1499,
    salePrice: 999,
    stock: 20,
    description: 'Everything needed to start learning professional Aari work: 12-inch frame, 12 needles, 5 silk thread spools, zari reel, and marking chalk.',
    images: ['https://picsum.photos/seed/prod4/600/750', 'https://picsum.photos/seed/prod4b/600/750'],
  },
  'prod-5': {
    name: 'Zari Thread Combo Pack (5 colors)',
    sku: 'SN-THRD-ZARI-5',
    category: 'Thread',
    mrp: 449,
    salePrice: 299,
    stock: 0,
    description: 'Assorted metallic zari thread spools in Antique Gold, Bright Silver, Rose Gold, Copper, and Bronze.',
    images: ['https://picsum.photos/seed/prod8/600/750', 'https://picsum.photos/seed/prod8b/600/750'],
  },
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = (params?.id as string) || 'prod-1'

  const product = initialProducts[productId] || {
    name: 'Aari Work Craft Product',
    sku: `SN-PROD-${productId}`,
    category: 'Needles',
    mrp: 499,
    salePrice: 299,
    stock: 20,
    description: 'Premium handcrafted Aari embroidery product.',
    images: ['https://picsum.photos/seed/editprod/600/750', 'https://picsum.photos/seed/editprod2/600/750'],
  }

  const [formData, setFormData] = useState({
    name: product.name,
    sku: product.sku,
    category: product.category,
    mrp: product.mrp.toString(),
    salePrice: product.salePrice.toString(),
    stock: product.stock.toString(),
    description: product.description,
  })

  const [imageUrls, setImageUrls] = useState<string[]>(product.images)
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        mrp: product.mrp.toString(),
        salePrice: product.salePrice.toString(),
        stock: product.stock.toString(),
        description: product.description,
      })
      setImageUrls(product.images)
    }
  }, [productId])

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
    toast.success(`Product "${formData.name}" updated successfully!`)
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
          <h1 className="font-playfair text-3xl font-bold text-cream">Edit Product details</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Updating Product ID: <span className="font-mono text-gold-400">{productId}</span>
          </p>
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
            2. Rates, Discount &amp; Stock Level
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">MRP Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
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
                className="input-admin"
              />
            </div>
          </div>

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
              3. Product Images ({imageUrls.length} Attached)
            </h2>
            <span className="font-inter text-xs text-green-400 font-semibold">
              ✓ Minimum 2 Images Met
            </span>
          </div>

          <div className="flex gap-3">
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Paste Image URL (e.g. https://res.cloudinary.com/...)"
              className="input-admin flex-1 text-xs"
            />
            <button type="button" onClick={handleAddImage} className="btn-admin-outline shrink-0 text-xs">
              <Plus size={14} /> Add Image
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageUrls.map((url, idx) => (
              <div key={idx} className="relative aspect-[4/5] rounded-2xl overflow-hidden glass border border-gold-500/20 group">
                <Image src={url} alt={`Preview ${idx + 1}`} fill unoptimized className="object-cover" />
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
            4. Description
          </h2>

          <div>
            <label className="font-inter text-xs text-cream/70 mb-2 block">Product Description</label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-admin"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-admin-gold flex-1 justify-center py-4 text-base">
            <Save size={18} /> Update &amp; Save Product Changes
          </button>
          <Link href="/products" className="btn-admin-outline py-4">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
