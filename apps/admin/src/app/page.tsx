'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  DollarSign,
  ShoppingBag,
  Package,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

const stats = [
  { label: 'Total Revenue', value: '₹1,42,850', change: '+14.2%', icon: DollarSign, color: '#D4AF37' },
  { label: 'Total Orders', value: '184', change: '+8.5%', icon: ShoppingBag, color: '#B76E79' },
  { label: 'Active Products', value: '36', change: '+4 New', icon: Package, color: '#e8bb18' },
  { label: 'Pending Quotations', value: '12', change: 'Action Required', icon: FileText, color: '#ff6464' },
]

const recentOrders = [
  { id: 'ORD-9021', customer: 'Priya Lakshmi', items: '2x Aari Needles, 1x Silk Gold Thread', total: 648, status: 'DELIVERED', date: 'Today, 2:30 PM' },
  { id: 'ORD-9020', customer: 'Meena Devi', items: '1x Beginner Aari Complete Kit', total: 999, status: 'SHIPPED', date: 'Today, 11:15 AM' },
  { id: 'ORD-9019', customer: 'Kavitha R.', items: '1x Round Frame 12"', total: 499, status: 'PACKED', date: 'Yesterday' },
  { id: 'ORD-9018', customer: 'Sangeetha M.', items: '3x Silk Thread Gold', total: 1197, status: 'PLACED', date: 'Yesterday' },
]

const pendingQuotations = [
  { id: 'QUO-104', name: 'Divya Bharathi', work: 'Bridal Heavy Aari Blouse', budget: '₹5,000 - ₹8,000', deadline: '15 Aug 2025' },
  { id: 'QUO-103', name: 'Anusha K.', work: 'Zardosi & Kundan Reception Blouse', budget: '₹4,000 - ₹6,000', deadline: '20 Aug 2025' },
  { id: 'QUO-102', name: 'Subhashini M.', work: 'Simple Neck & Sleeve Motif', budget: '₹2,000 - ₹3,500', deadline: '12 Aug 2025' },
]

export default function AdminDashboard() {
  const [orders, setOrders] = useState(recentOrders)
  const [quotations, setQuotations] = useState(pendingQuotations)
  const [metrics, setMetrics] = useState({
    revenue: '₹1,42,850',
    totalOrders: 184,
    activeProducts: 36,
    pendingQuotations: 12,
  })

  const loadLiveData = () => {
    try {
      // Load quotations
      const storedQuos = JSON.parse(localStorage.getItem('sangee_sri_quotations') || '[]')
      let mergedQuos = pendingQuotations
      if (Array.isArray(storedQuos) && storedQuos.length > 0) {
        const mappedStoredQuos = storedQuos.map((q: any) => ({
          id: q.quotationNumber || q.id,
          name: q.customerName,
          work: q.blouseType,
          budget: q.budget,
          deadline: q.deadline,
        }))
        const storedIds = new Set(mappedStoredQuos.map((q: any) => q.id))
        mergedQuos = [...mappedStoredQuos, ...pendingQuotations.filter((q) => !storedIds.has(q.id))]
      }
      setQuotations(mergedQuos)

      // Load orders
      const storedOrders = JSON.parse(localStorage.getItem('sangee_sri_orders') || '[]')
      let mergedOrders = recentOrders
      if (Array.isArray(storedOrders) && storedOrders.length > 0) {
        const mappedOrders = storedOrders.map((o: any) => ({
          id: o.orderNumber || o.id,
          customer: o.customerName,
          items: `${o.itemsCount || 1} items`,
          total: o.totalAmount || 0,
          status: o.orderStatus || 'PLACED',
          date: o.date || 'Today',
        }))
        const orderIds = new Set(mappedOrders.map((o: any) => o.id))
        mergedOrders = [...mappedOrders, ...recentOrders.filter((o) => !orderIds.has(o.id))]
      }
      setOrders(mergedOrders)

      // Calculate total metrics
      const addedRevenue = (storedOrders || []).reduce((acc: number, curr: any) => acc + (Number(curr.totalAmount) || 0), 0)
      setMetrics({
        revenue: `₹${(142850 + addedRevenue).toLocaleString('en-IN')}`,
        totalOrders: 184 + (storedOrders?.length || 0),
        activeProducts: 36,
        pendingQuotations: 12 + (storedQuos?.length || 0),
      })
    } catch (err) {
      console.error('Failed to load admin live data:', err)
    }
  }

  useEffect(() => {
    loadLiveData()
    window.addEventListener('storage', loadLiveData)

    let channel: BroadcastChannel | null = null
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('sangee_sri_channel')
        channel.onmessage = () => loadLiveData()
      }
    } catch {}

    const timer = setInterval(() => {
      loadLiveData()
    }, 1500)

    return () => {
      window.removeEventListener('storage', loadLiveData)
      if (channel) channel.close()
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Dashboard Overview</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">Welcome back, Admin. Here is what's happening in your studio today.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/products/new" className="btn-admin-gold">
            <Plus size={16} /> Add New Product
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Revenue', value: metrics.revenue, change: '+14.2%', icon: DollarSign, color: '#D4AF37' },
          { label: 'Total Orders', value: String(metrics.totalOrders), change: '+8.5%', icon: ShoppingBag, color: '#B76E79' },
          { label: 'Active Products', value: String(metrics.activeProducts), change: '+4 New', icon: Package, color: '#e8bb18' },
          { label: 'Pending Quotations', value: String(metrics.pendingQuotations), change: 'Action Required', icon: FileText, color: '#ff6464' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-admin rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-inter text-xs text-cream/50">{stat.label}</span>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  <Icon size={20} />
                </div>
              </div>
              <p className="font-playfair text-3xl font-bold text-cream mb-2">{stat.value}</p>
              <span className="font-inter text-xs text-gold-400 font-medium flex items-center gap-1">
                <TrendingUp size={12} /> {stat.change}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Main Grid: Orders & Quotations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 glass-admin rounded-3xl p-6 border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-xl font-bold text-cream">Recent Store Orders</h2>
            <Link href="/orders" className="font-inter text-xs text-gold-400 hover:underline flex items-center gap-1">
              View All Orders <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter text-xs">
              <thead>
                <tr className="border-b border-white/10 text-cream/40 uppercase tracking-wider pb-3">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((ord: any) => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 font-mono font-semibold text-gold-400">{ord.id}</td>
                    <td className="py-4 font-medium text-cream">{ord.customer}</td>
                    <td className="py-4 font-bold text-cream">₹{ord.total}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        ord.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        ord.status === 'PACKED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Quotations (5 cols) */}
        <div className="lg:col-span-5 glass-admin rounded-3xl p-6 border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-xl font-bold text-cream">Pending Quotation Requests</h2>
            <Link href="/quotations" className="font-inter text-xs text-gold-400 hover:underline">
              Review All
            </Link>
          </div>

          <div className="space-y-4">
            {quotations.map((quo: any) => (
              <div key={quo.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-playfair font-bold text-cream text-sm">{quo.name}</span>
                  <span className="font-mono text-[11px] text-gold-400">{quo.id}</span>
                </div>
                <p className="font-inter text-xs text-cream/70">{quo.work}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 font-inter text-[11px]">
                  <span className="text-cream/40">Budget: {quo.budget}</span>
                  <Link href="/quotations" className="text-gold-400 hover:underline font-semibold">
                    Provide Estimate →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
