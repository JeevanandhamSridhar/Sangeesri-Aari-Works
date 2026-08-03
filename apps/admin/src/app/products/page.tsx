'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Tag,
  Package,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  sku: string
  category: string
  mrp: number
  salePrice: number
  stock: number
  images: string[]
  inStock: boolean
}

const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Aari Needle Set (12 pcs)',
    sku: 'SN-AARI-NDL-12',
    category: 'Needles',
    mrp: 399,
    salePrice: 249,
    stock: 45,
    images: ['https://picsum.photos/seed/prod1/200/200', 'https://picsum.photos/seed/prod1b/200/200'],
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'Silk Aari Thread — Gold (10 reels)',
    sku: 'SN-THRD-GLD-10',
    category: 'Thread',
    mrp: 599,
    salePrice: 399,
    stock: 28,
    images: ['https://picsum.photos/seed/prod2/200/200', 'https://picsum.photos/seed/prod2b/200/200'],
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Round Aari Embroidery Frame — 12"',
    sku: 'SN-FRM-RND-12',
    category: 'Frames',
    mrp: 699,
    salePrice: 499,
    stock: 15,
    images: ['https://picsum.photos/seed/prod3/200/200', 'https://picsum.photos/seed/prod3b/200/200'],
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Beginner Aari Work Complete Kit',
    sku: 'SN-KIT-BEG-01',
    category: 'Kits',
    mrp: 1499,
    salePrice: 999,
    stock: 20,
    images: ['https://picsum.photos/seed/prod4/200/200', 'https://picsum.photos/seed/prod4b/200/200'],
    inStock: true,
  },
  {
    id: 'prod-5',
    name: 'Zari Thread Combo Pack (5 colors)',
    sku: 'SN-THRD-ZARI-5',
    category: 'Thread',
    mrp: 449,
    salePrice: 299,
    stock: 0,
    images: ['https://picsum.photos/seed/prod8/200/200', 'https://picsum.photos/seed/prod8b/200/200'],
    inStock: false,
  },
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setProducts(products.filter((p) => p.id !== id))
      toast.success(`${name} deleted successfully`)
    }
  }

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'All' && p.category !== categoryFilter) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Product Inventory</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">Manage Aari materials, rates, stock levels, and multi-image galleries.</p>
        </div>
        <Link href="/products/new" className="btn-admin-gold">
          <Plus size={16} /> Add Product (2+ Images)
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-admin rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="input-admin pl-10 py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-inter text-xs text-cream/50">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-admin py-2 px-3 text-xs bg-darkbase w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Needles">Needles</option>
            <option value="Thread">Thread</option>
            <option value="Frames">Frames</option>
            <option value="Kits">Kits</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-admin rounded-3xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs">
            <thead>
              <tr className="border-b border-white/10 text-cream/40 uppercase tracking-wider bg-white/5">
                <th className="p-4">Product Info</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">MRP / Sale Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((prod) => {
                const discountPct = Math.round(((prod.mrp - prod.salePrice) / prod.mrp) * 100)
                return (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-cream text-sm line-clamp-1">{prod.name}</p>
                          <span className="font-inter text-[10px] text-gold-400">
                            {prod.images.length} Image(s) Attached
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-cream/70">{prod.sku}</td>
                    <td className="p-4 text-cream/70">{prod.category}</td>
                    <td className="p-4">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-gold-400">₹{prod.salePrice}</span>
                        <span className="text-cream/40 line-through text-[11px]">₹{prod.mrp}</span>
                        <span className="text-green-400 text-[10px] font-bold">({discountPct}% OFF)</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-cream">{prod.stock} units</td>
                    <td className="p-4">
                      {prod.stock > 0 ? (
                        <span className="inline-flex items-center gap-1 text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <CheckCircle2 size={12} /> In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          <XCircle size={12} /> Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/edit/${prod.id}`}
                          className="p-2 rounded-lg bg-white/5 hover:bg-gold-500/20 hover:text-gold-400 transition-colors text-cream/60"
                          title="Edit Product"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors text-cream/60"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
