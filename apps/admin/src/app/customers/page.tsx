'use client'

import { useState } from 'react'
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  Award,
  Scissors,
  Check,
  X,
  Sparkles,
  ChevronRight,
  Filter,
  MessageCircle,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

interface Customer {
  id: string
  name: string
  phone: string
  city: string
  category: 'Bridal VIP' | 'Repeat Client' | 'Academy Student' | 'New Inquiry'
  totalOrders: number
  totalSpent: string
  lastOrderDate: string
  measurements?: string
  notes?: string
}

const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Priyanka R.',
    phone: '+91 98765 43210',
    city: 'Kaveripakkam',
    category: 'Bridal VIP',
    totalOrders: 3,
    totalSpent: '₹24,500',
    lastOrderDate: '12 Aug 2026',
    measurements: 'Bust: 36", Waist: 30", Sleeve Length: 11.5", Front Neck: 7", Back Neck: 9.5"',
    notes: 'Requested heavy peacock Zari work on maroon raw silk base with Kundan stone border.',
  },
  {
    id: 'cust-2',
    name: 'Divya M.',
    phone: '+91 91234 56789',
    city: 'Ranipet',
    category: 'Bridal VIP',
    totalOrders: 2,
    totalSpent: '₹18,200',
    lastOrderDate: '02 Jul 2026',
    measurements: 'Bust: 38", Waist: 32", Sleeve Length: 10.5", Front Neck: 6.5", Back Neck: 8.5"',
    notes: 'Grand reception velvet blouse with metallic Zardosi motifs matching Kanchipuram saree.',
  },
  {
    id: 'cust-3',
    name: 'Kavitha S.',
    phone: '+91 94433 22110',
    city: 'Vellore',
    category: 'Academy Student',
    totalOrders: 1,
    totalSpent: '₹6,500',
    lastOrderDate: '20 Jul 2026',
    measurements: 'N/A — Professional Aari Course Enrollment',
    notes: 'Completed 1-Month Master Aari Embroidery Certification under Kaviya S.',
  },
  {
    id: 'cust-4',
    name: 'Ananya S.',
    phone: '+91 99887 76655',
    city: 'Chennai',
    category: 'Bridal VIP',
    totalOrders: 4,
    totalSpent: '₹32,000',
    lastOrderDate: '15 Jun 2026',
    measurements: 'Bust: 34", Waist: 28", Sleeve Length: 12", Front Neck: 7", Back Neck: 10"',
    notes: 'Cutwork scalloped neck border with pearl drop beads on royal blue silk.',
  },
  {
    id: 'cust-5',
    name: 'Meenakshi K.',
    phone: '+91 97654 32109',
    city: 'Kanchipuram',
    category: 'Repeat Client',
    totalOrders: 2,
    totalSpent: '₹11,400',
    lastOrderDate: '28 May 2026',
    measurements: 'Bust: 40", Waist: 34", Sleeve Length: 11", Front Neck: 6.5", Back Neck: 9"',
    notes: 'Traditional Temple Maggam embroidery with gold zari threadwork.',
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  // New Customer Form State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [newCustomerCity, setNewCustomerCity] = useState('Kaveripakkam')
  const [newCustomerCategory, setNewCustomerCategory] = useState<Customer['category']>('Bridal VIP')
  const [newCustomerMeasurements, setNewCustomerMeasurements] = useState('')
  const [newCustomerNotes, setNewCustomerNotes] = useState('')

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCustomerName || !newCustomerPhone) {
      toast.error('Please enter client name and phone number')
      return
    }

    const created: Customer = {
      id: `cust-${Date.now()}`,
      name: newCustomerName,
      phone: newCustomerPhone,
      city: newCustomerCity,
      category: newCustomerCategory,
      totalOrders: 1,
      totalSpent: '₹4,500',
      lastOrderDate: 'Just now',
      measurements: newCustomerMeasurements || 'Standard size measurements provided',
      notes: newCustomerNotes || 'New client added via Admin Portal',
    }

    setCustomers([created, ...customers])
    setShowAddModal(false)
    setNewCustomerName('')
    setNewCustomerPhone('')
    setNewCustomerMeasurements('')
    setNewCustomerNotes('')
    toast.success(`Client ${newCustomerName} added successfully!`)
  }

  const filteredCustomers = customers.filter((cust) => {
    if (activeCategoryFilter !== 'All' && cust.category !== activeCategoryFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        cust.name.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        cust.city.toLowerCase().includes(q) ||
        cust.notes?.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-8 max-w-6xl">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream flex items-center gap-2">
            <Users className="text-gold-400" size={24} />
            Client Directory &amp; Bridal Profiles
          </h1>
          <p className="font-inter text-xs text-cream/50 mt-1">
            Manage {customers.length} registered clients, size measurements, order histories, and WhatsApp communications.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-admin-gold text-xs py-2.5 px-4 flex items-center gap-2 shrink-0"
          suppressHydrationWarning
        >
          <Plus size={15} /> Add New Client Profile
        </button>
      </div>

      {/* ── Quick Stats Grid ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-admin p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="font-inter text-xs text-cream/50 block">Total Clients</span>
          <p className="font-playfair text-2xl font-bold text-cream">{customers.length}</p>
          <span className="font-inter text-[10px] text-green-400 font-semibold">+12 this month</span>
        </div>

        <div className="glass-admin p-5 rounded-2xl border border-gold-500/20 space-y-1">
          <span className="font-inter text-xs text-gold-400/80 block">Bridal VIPs</span>
          <p className="font-playfair text-2xl font-bold text-gold-400">
            {customers.filter((c) => c.category === 'Bridal VIP').length}
          </p>
          <span className="font-inter text-[10px] text-cream/50">Priority custom blouse orders</span>
        </div>

        <div className="glass-admin p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="font-inter text-xs text-cream/50 block">Academy Students</span>
          <p className="font-playfair text-2xl font-bold text-cream">
            {customers.filter((c) => c.category === 'Academy Student').length}
          </p>
          <span className="font-inter text-[10px] text-cream/50">Enrolled in Aari Training</span>
        </div>

        <div className="glass-admin p-5 rounded-2xl border border-white/10 space-y-1">
          <span className="font-inter text-xs text-cream/50 block">Client Satisfaction</span>
          <p className="font-playfair text-2xl font-bold text-green-400 flex items-center gap-1">
            5.0 <Star size={16} className="fill-gold-400 text-gold-400 inline" />
          </p>
          <span className="font-inter text-[10px] text-cream/50">100% fitting guarantee</span>
        </div>
      </div>

      {/* ── Filter & Search Bar ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone, or city..."
            className="input-admin pl-10 text-xs w-full"
            suppressHydrationWarning
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Bridal VIP', 'Repeat Client', 'Academy Student', 'New Inquiry'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-inter text-xs transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-gold-500 text-darkbase font-bold'
                  : 'glass border border-white/10 text-cream/60 hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Client Data Table ───────────────────────────────────────── */}
      <div className="glass-admin rounded-3xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-cream/60 uppercase text-[10px] tracking-wider">
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Location</th>
                <th className="p-4">Orders &amp; Spent</th>
                <th className="p-4">Last Order</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/5 transition-colors group">
                  {/* Name & Avatar */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center font-playfair font-bold text-gold-400">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-playfair text-sm font-bold text-cream group-hover:text-gold-400 transition-colors">
                          {cust.name}
                        </p>
                        <p className="font-mono text-[11px] text-cream/50 flex items-center gap-1">
                          <Phone size={10} /> {cust.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        cust.category === 'Bridal VIP'
                          ? 'bg-gold-500/15 text-gold-400 border-gold-500/30'
                          : cust.category === 'Academy Student'
                          ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                          : 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {cust.category}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="p-4 text-cream/70">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-gold-400 shrink-0" />
                      {cust.city}
                    </span>
                  </td>

                  {/* Orders & Spent */}
                  <td className="p-4">
                    <p className="text-cream font-bold">{cust.totalSpent}</p>
                    <p className="text-[10px] text-cream/50">{cust.totalOrders} Blouses Order</p>
                  </td>

                  {/* Last Order Date */}
                  <td className="p-4 text-cream/60">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-gold-400/70" />
                      {cust.lastOrderDate}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Measurements */}
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-2.5 py-1.5 rounded-lg glass border border-white/10 text-cream/80 hover:text-gold-400 hover:border-gold-500/30 text-[11px] font-semibold transition-all flex items-center gap-1"
                      >
                        <Scissors size={12} /> Measurements
                      </button>

                      {/* WhatsApp Direct Chat */}
                      <a
                        href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${cust.name}! Greetings from Sangee Sri Aari Works Kaveripakkam.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 transition-all"
                        title="Chat on WhatsApp"
                      >
                        <FaWhatsapp size={15} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-16">
            <p className="font-playfair text-lg text-cream/60 mb-1">No client matches your search.</p>
            <p className="font-inter text-xs text-cream/40">Try searching for another client name or location.</p>
          </div>
        )}
      </div>

      {/* ── Measurements & Profile Details Drawer / Modal ─────────── */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="glass-admin rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gold-500/30 shadow-2xl relative space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-playfair font-bold text-gold-400 text-lg">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-cream">{selectedCustomer.name}</h3>
                  <p className="font-inter text-xs text-gold-400">{selectedCustomer.category} · {selectedCustomer.city}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cream hover:text-gold-400"
              >
                <X size={16} />
              </button>
            </div>

            {/* Measurements Box */}
            <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 space-y-2">
              <span className="font-inter text-xs text-gold-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Scissors size={14} /> Size Measurements Notes
              </span>
              <p className="font-mono text-xs text-cream/90 leading-relaxed">
                {selectedCustomer.measurements || 'No specific measurement notes recorded.'}
              </p>
            </div>

            {/* Notes Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="font-inter text-xs text-cream/60 font-semibold block">Design Preferences &amp; History:</span>
              <p className="font-inter text-xs text-cream/80 leading-relaxed">
                {selectedCustomer.notes || 'No design notes available.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-inter text-xs text-cream/50">Total Orders: {selectedCustomer.totalOrders} ({selectedCustomer.totalSpent})</span>
              <a
                href={`https://wa.me/${selectedCustomer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-admin-gold text-xs py-2 px-4 flex items-center gap-2"
              >
                <FaWhatsapp size={14} /> Contact Client
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Add New Client Modal ────────────────────────────────────── */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onSubmit={handleAddCustomer}
            className="glass-admin rounded-3xl p-6 md:p-8 max-w-lg w-full border border-gold-500/30 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
                <Plus className="text-gold-400" size={18} /> Register New Client Profile
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cream"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="e.g. Swetha Sundar"
                  className="input-admin text-xs w-full"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input-admin text-xs w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">City / Location</label>
                <input
                  type="text"
                  value={newCustomerCity}
                  onChange={(e) => setNewCustomerCity(e.target.value)}
                  placeholder="Kaveripakkam"
                  className="input-admin text-xs w-full"
                />
              </div>

              <div>
                <label className="font-inter text-xs text-cream/70 block mb-1">Client Category</label>
                <select
                  value={newCustomerCategory}
                  onChange={(e) => setNewCustomerCategory(e.target.value as any)}
                  className="input-admin text-xs w-full bg-darkbase"
                >
                  <option value="Bridal VIP">Bridal VIP</option>
                  <option value="Repeat Client">Repeat Client</option>
                  <option value="Academy Student">Academy Student</option>
                  <option value="New Inquiry">New Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Size Measurements (Bust, Sleeve, Neck...)</label>
              <textarea
                value={newCustomerMeasurements}
                onChange={(e) => setNewCustomerMeasurements(e.target.value)}
                rows={2}
                placeholder="e.g. Bust: 36, Waist: 30, Sleeve: 11.5 inch, Front Neck: 7 inch"
                className="input-admin text-xs w-full"
              />
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 block mb-1">Design Notes &amp; Preferences</label>
              <textarea
                value={newCustomerNotes}
                onChange={(e) => setNewCustomerNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Prefers Peacock Zari motifs on velvet fabric"
                className="input-admin text-xs w-full"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-inter text-cream/60 hover:text-cream"
              >
                Cancel
              </button>
              <button type="submit" className="btn-admin-gold text-xs py-2 px-6">
                Save Client Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
