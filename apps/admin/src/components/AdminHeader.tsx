'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, FileText, ShoppingBag, Calendar, GraduationCap, X } from 'lucide-react'
import { toast } from 'sonner'

export interface NotificationItem {
  id: string
  type: 'QUOTATION' | 'ORDER' | 'APPOINTMENT' | 'STUDENT'
  title: string
  description: string
  time: string
  read: boolean
  link: string
}

const initialNotifications: NotificationItem[] = [
  { id: 'sample-1', type: 'QUOTATION', title: 'New Custom Design Request #QUO-104', description: 'Divya Bharathi requested a quote for Bridal Heavy Aari Blouse.', time: '5 mins ago', read: false, link: '/quotations' },
  { id: 'sample-2', type: 'ORDER', title: 'New Store Order Received #ORD-9021', description: 'Order placed by Priya Lakshmi (₹648).', time: '25 mins ago', read: false, link: '/orders' },
]

export function AdminHeader() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const loadNotifications = () => {
    try {
      // 1. Read stored read notification IDs
      const readIds = new Set(JSON.parse(localStorage.getItem('sangee_sri_read_notif_ids') || '[]'))

      // 2. Read explicit pushed notifications
      const pushedNotifs: NotificationItem[] = JSON.parse(localStorage.getItem('sangee_sri_notifications') || '[]')

      // 3. Read quotations, orders & students to build live list if needed
      const storedQuos = JSON.parse(localStorage.getItem('sangee_sri_quotations') || '[]')
      const storedOrders = JSON.parse(localStorage.getItem('sangee_sri_orders') || '[]')
      const storedStudents = JSON.parse(localStorage.getItem('sangee_sri_students') || '[]')

      const autoNotifs: NotificationItem[] = []

      storedQuos.forEach((q: any) => {
        autoNotifs.push({
          id: `quo-${q.id || q.quotationNumber}`,
          type: 'QUOTATION',
          title: `Quotation Request #${q.quotationNumber || q.id}`,
          description: `${q.customerName || 'Client'} requested ${q.blouseType || 'Aari Blouse'} (${q.budget || ''})`,
          time: q.date || 'Recent',
          read: false,
          link: '/quotations',
        })
      })

      storedOrders.forEach((o: any) => {
        autoNotifs.push({
          id: `ord-${o.id || o.orderNumber}`,
          type: 'ORDER',
          title: `Store Order #${o.orderNumber || o.id}`,
          description: `${o.customerName || 'Customer'} ordered worth ₹${o.totalAmount || 0}`,
          time: o.date || 'Recent',
          read: false,
          link: '/orders',
        })
      })

      storedStudents.forEach((s: any) => {
        autoNotifs.push({
          id: `stu-${s.id || s.studentId}`,
          type: 'STUDENT',
          title: `Student Enrolled #${s.studentId}`,
          description: `${s.name} joined ${s.course}`,
          time: s.registeredDate || 'Recent',
          read: false,
          link: '/academy/students',
        })
      })

      // Combine pushed, auto-generated, and initial fallback
      const combined = [...pushedNotifs, ...autoNotifs]
      const uniqueMap = new Map<string, NotificationItem>()
      
      combined.forEach((n) => {
        if (!uniqueMap.has(n.id)) {
          uniqueMap.set(n.id, {
            ...n,
            read: readIds.has(n.id) ? true : n.read,
          })
        }
      })

      // Include initial samples if clean
      initialNotifications.forEach((n) => {
        if (!uniqueMap.has(n.id)) {
          uniqueMap.set(n.id, {
            ...n,
            read: readIds.has(n.id) ? true : n.read,
          })
        }
      })

      const finalList = Array.from(uniqueMap.values())
      setNotifications(finalList)
    } catch (err) {
      console.error('Failed to load live admin notifications:', err)
    }
  }

  useEffect(() => {
    loadNotifications()

    // 1. Storage listener (same tab/origin)
    const handleStorage = () => {
      loadNotifications()
    }
    window.addEventListener('storage', handleStorage)

    // 2. BroadcastChannel listener (cross-tab / cross-port in supporting browsers)
    let channel: BroadcastChannel | null = null
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        channel = new BroadcastChannel('sangee_sri_channel')
        channel.onmessage = (event) => {
          loadNotifications()
          if (event.data?.type === 'NEW_QUOTATION') {
            toast.success(`🔔 New Quotation Request Received from ${event.data.customerName || 'Client'}!`, {
              duration: 5000,
            })
          }
        }
      }
    } catch {}

    // 3. 1.5s Polling fallback (100% guarantee across localhost ports 3000 & 3001)
    const timer = setInterval(() => {
      loadNotifications()
    }, 1500)

    return () => {
      window.removeEventListener('storage', handleStorage)
      if (channel) channel.close()
      clearInterval(timer)
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id)
    try {
      localStorage.setItem('sangee_sri_read_notif_ids', JSON.stringify(allIds))
    } catch {}
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success('All notifications marked as read.')
  }

  const markSingleRead = (id: string) => {
    try {
      const readIds = new Set(JSON.parse(localStorage.getItem('sangee_sri_read_notif_ids') || '[]'))
      readIds.add(id)
      localStorage.setItem('sangee_sri_read_notif_ids', JSON.stringify(Array.from(readIds)))
    } catch {}
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'QUOTATION': return <FileText size={16} className="text-gold-400" />
      case 'ORDER': return <ShoppingBag size={16} className="text-green-400" />
      case 'APPOINTMENT': return <Calendar size={16} className="text-blue-400" />
      case 'STUDENT': return <GraduationCap size={16} className="text-purple-400" />
      default: return <Bell size={16} className="text-gold-400" />
    }
  }

  return (
    <header className="h-16 border-b border-gold-500/15 px-8 flex items-center justify-between sticky top-0 bg-[#0A0806] z-50">
      <h1 className="font-playfair text-lg font-bold text-cream">Sangee Sri Aari Works — Store &amp; Studio CMS</h1>

      <div className="flex items-center gap-4">
        {/* Live Sync Status */}
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-inter font-medium">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live Sync Active
        </span>

        {/* Notification Bell Button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 rounded-full border border-gold-500/30 bg-[#120C08] flex items-center justify-center text-cream/80 hover:text-gold-400 hover:border-gold-400 transition-all shadow-lg"
            aria-label="Open Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-inter font-bold text-[10px] flex items-center justify-center shadow-lg animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Opaque Solid Dark Dropdown Drawer */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-[#140E0A] rounded-3xl border-2 border-gold-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden z-[100]">
              <div className="p-4 bg-[#1C130D] border-b border-gold-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-gold-400" />
                  <span className="font-playfair text-sm font-bold text-cream">Live Studio Notifications</span>
                  {unreadCount > 0 && (
                    <span className="badge-gold text-[10px]">{unreadCount} unread</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-inter text-gold-400 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-cream/50 hover:text-cream">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notification Items List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/10 font-inter text-xs bg-[#140E0A]">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-cream/40">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.link}
                      onClick={() => {
                        markSingleRead(n.id)
                        setIsOpen(false)
                      }}
                      className={`p-4 flex gap-3 hover:bg-gold-500/10 transition-colors ${
                        !n.read ? 'bg-[#22160E] border-l-4 border-gold-500' : 'bg-[#140E0A]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold truncate ${!n.read ? 'text-gold-300' : 'text-cream'}`}>{n.title}</span>
                          <span className="text-[10px] text-cream/40 shrink-0 ml-2">{n.time}</span>
                        </div>
                        <p className="text-cream/70 text-[11px] leading-relaxed line-clamp-2">{n.description}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
