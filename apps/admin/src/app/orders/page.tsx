'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ShoppingBag, Eye, Truck, CheckCircle2, Clock, XCircle, MessageSquare, Send } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

interface OrderItem {
  name: string
  sku?: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  city: string
  address?: string
  pincode?: string
  itemsCount: number
  items?: OrderItem[]
  totalAmount: number
  paymentMethod: string
  paymentStatus: 'PAID' | 'PENDING'
  orderStatus: 'PLACED' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  trackingNumber?: string
  date: string
}

const initialOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-9021',
    customerName: 'Priya Lakshmi',
    customerPhone: '9876543210',
    city: 'Vellore',
    address: 'No. 12, Main Street',
    pincode: '632001',
    itemsCount: 2,
    items: [
      { name: 'Royal Gold Zari Bridal Blouse', sku: 'SSA-101', quantity: 1, price: 4500 },
      { name: 'Aari Needle Set', sku: 'SSA-NDL-12', quantity: 2, price: 499 },
    ],
    totalAmount: 4999,
    paymentMethod: 'RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'DELIVERED',
    trackingNumber: 'ST-VEL-99182',
    date: '2026-07-28',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-9020',
    customerName: 'Meena Devi',
    customerPhone: '9789012345',
    city: 'Chennai',
    address: '2nd Cross, T Nagar',
    pincode: '600017',
    itemsCount: 1,
    items: [{ name: 'Beginner Aari Kit', sku: 'SSA-KIT-01', quantity: 1, price: 999 }],
    totalAmount: 999,
    paymentMethod: 'RAZORPAY',
    paymentStatus: 'PAID',
    orderStatus: 'SHIPPED',
    trackingNumber: 'ST-CHN-44102',
    date: '2026-07-30',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-9019',
    customerName: 'Kavitha R.',
    customerPhone: '9123456789',
    city: 'Ranipet',
    address: 'Station Road',
    pincode: '632401',
    itemsCount: 1,
    items: [{ name: 'Round Aari Frame 12"', sku: 'SSA-FRM-12', quantity: 1, price: 499 }],
    totalAmount: 499,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    orderStatus: 'PACKED',
    date: '2026-08-01',
  },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  // Load orders placed dynamically from client site
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('sangee_sri_orders') || '[]')
      if (Array.isArray(local) && local.length > 0) {
        // Merge without duplicating IDs
        const existingIds = new Set(initialOrders.map((o) => o.orderNumber))
        const newFromClient = local.filter((o: Order) => !existingIds.has(o.orderNumber))
        setOrders([...newFromClient, ...initialOrders])
      }
    } catch {}
  }, [])

  const handleStatusChange = (orderId: string, newStatus: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    )
    toast.success(`Order #${orderId} status updated to ${newStatus}`)
  }

  const handleUpdateTracking = (orderId: string, trackingNo: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, trackingNumber: trackingNo } : o))
    )
    toast.success('Tracking number saved')
  }

  // Generate automated WhatsApp status notification link for customer
  const getWhatsAppNotifyUrl = (ord: Order) => {
    const phone = ord.customerPhone.replace(/\D/g, '')
    const targetPhone = phone.length === 10 ? `91${phone}` : phone

    let statusMsg = ''
    if (ord.orderStatus === 'DELIVERED') {
      statusMsg = `✨ *ORDER DELIVERED — SANGEE SRI AARI WORKS* ✨\n\nHi ${ord.customerName}! Your Order #${ord.orderNumber} has been successfully delivered!\n\nWe hope you love your handcrafted Aari blouse/materials. Please share your customer review here:\nhttp://localhost:3000/orders?orderId=${ord.orderNumber}\n\nThank you for choosing Sangee Sri Aari Works!`
    } else if (ord.orderStatus === 'SHIPPED') {
      statusMsg = `🚚 *ORDER SHIPPED — SANGEE SRI AARI WORKS* 🚚\n\nHi ${ord.customerName}! Your Order #${ord.orderNumber} has been dispatched via courier.\n${ord.trackingNumber ? `*Tracking #:* ${ord.trackingNumber}\n` : ''}Expected delivery within 1-2 days!\n\nThank you for choosing Sangee Sri Aari Works!`
    } else if (ord.orderStatus === 'PACKED' || ord.orderStatus === 'CONFIRMED') {
      statusMsg = `🌸 *ORDER PROCESSING UPDATE — SANGEE SRI AARI WORKS* 🌸\n\nHi ${ord.customerName}! Your Order #${ord.orderNumber} is currently being handcrafted/packed at our studio.\nExpected dispatch within 1-2 days!\n\nThank you for your patience.`
    } else {
      statusMsg = `🌸 *ORDER CONFIRMATION — SANGEE SRI AARI WORKS* 🌸\n\nHi ${ord.customerName}! We have received your Order #${ord.orderNumber} (Total: ₹${ord.totalAmount}). We will notify you once dispatched.\n\nThank you!`
    }

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(statusMsg)}`
  }

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.orderStatus !== statusFilter) return false
    if (
      search &&
      !o.orderNumber.toLowerCase().includes(search.toLowerCase()) &&
      !o.customerName.toLowerCase().includes(search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Store Order Management</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">
          Track customer orders, update delivery status, view internal SKUs, and send automated WhatsApp alerts to customers.
        </p>
      </div>

      {/* Toolbar */}
      <div className="glass-admin rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order # or Customer Name..."
            className="input-admin pl-10 py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="font-inter text-xs text-cream/50">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-admin py-2 px-3 text-xs bg-darkbase w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="PLACED">Placed</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-admin rounded-3xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs">
            <thead>
              <tr className="border-b border-white/10 text-cream/40 uppercase tracking-wider bg-white/5">
                <th className="p-4">Order #</th>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Items &amp; SKUs</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status &amp; Tracking</th>
                <th className="p-4 text-right">Actions &amp; WhatsApp Alert</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  {/* Order Number */}
                  <td className="p-4">
                    <p className="font-mono font-bold text-gold-400 text-sm">#{ord.orderNumber}</p>
                    <span className="text-[10px] text-cream/40">{ord.date}</span>
                  </td>

                  {/* Customer details */}
                  <td className="p-4">
                    <p className="font-semibold text-cream text-sm">{ord.customerName}</p>
                    <p className="text-cream/60 text-[11px]">{ord.customerPhone}</p>
                    <p className="text-cream/40 text-[10px]">{ord.city} {ord.pincode ? `(${ord.pincode})` : ''}</p>
                  </td>

                  {/* Items with internal Product SKU numbers */}
                  <td className="p-4">
                    <div className="space-y-1">
                      {ord.items && ord.items.length > 0 ? (
                        ord.items.map((item, idx) => (
                          <div key={idx} className="text-[11px]">
                            <span className="font-medium text-cream">{item.name}</span>{' '}
                            {item.sku && (
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20">
                                SKU: {item.sku}
                              </span>
                            )}
                            <span className="text-cream/50 ml-1">x{item.quantity}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-cream/70">{ord.itemsCount} item(s)</span>
                      )}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="p-4">
                    <p className="font-bold text-cream text-sm">₹{ord.totalAmount}</p>
                    <span
                      className={`text-[10px] font-semibold ${
                        ord.paymentStatus === 'PAID' ? 'text-green-400' : 'text-amber-400'
                      }`}
                    >
                      {ord.paymentMethod} · {ord.paymentStatus}
                    </span>
                  </td>

                  {/* Order Status & Tracking Input */}
                  <td className="p-4 space-y-2">
                    <div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ord.orderStatus === 'DELIVERED'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : ord.orderStatus === 'SHIPPED'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : ord.orderStatus === 'PACKED'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}
                      >
                        {ord.orderStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        defaultValue={ord.trackingNumber || ''}
                        onBlur={(e) => handleUpdateTracking(ord.id, e.target.value)}
                        placeholder="Add Courier Tracking #"
                        className="input-admin py-1 px-2 text-[10px] font-mono bg-darkbase w-32"
                      />
                    </div>
                  </td>

                  {/* Actions & WhatsApp status notification button */}
                  <td className="p-4 text-right space-y-2">
                    <div>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as Order['orderStatus'])}
                        className="input-admin py-1.5 px-2 text-[11px] bg-darkbase w-auto inline-block font-semibold"
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>

                    <div>
                      <a
                        href={getWhatsAppNotifyUrl(ord)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 transition-all text-[11px] font-semibold"
                        title="Send automated WhatsApp update to customer"
                      >
                        <FaWhatsapp size={13} /> Send WhatsApp Alert
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
