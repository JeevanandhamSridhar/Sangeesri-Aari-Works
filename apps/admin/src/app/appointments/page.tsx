'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Clock, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'

interface Appointment {
  id: string
  clientName: string
  phone: string
  date: string
  timeSlot: string
  type: string
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
}

const initialAppointments: Appointment[] = [
  { id: 'APT-1', clientName: 'Anitha Kumar', phone: '7604887356', date: '2025-08-05', timeSlot: '11:30 AM - 12:30 PM', type: 'Studio Visit (Kaveripakkam)', status: 'CONFIRMED', notes: 'Bringing silk saree for matching zari thread sample.' },
  { id: 'APT-2', clientName: 'Priyanka S.', phone: '9876543210', date: '2025-08-05', timeSlot: '02:00 PM - 03:00 PM', type: 'WhatsApp Video Call', status: 'CONFIRMED', notes: 'Discussing bridal blouse neckline cutwork.' },
  { id: 'APT-3', clientName: 'Revathi M.', phone: '9443322110', date: '2025-08-04', timeSlot: '05:00 PM - 06:00 PM', type: 'Studio Visit (Kaveripakkam)', status: 'COMPLETED' },
]

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const handleStatus = (id: string, status: Appointment['status']) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status } : a))
    )
    toast.success(`Appointment status updated to ${status}`)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Studio Consultation Bookings</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">Manage 1-on-1 design sessions, studio visits in Kaveripakkam, and video consultations.</p>
      </div>

      <div className="glass-admin rounded-3xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-inter text-xs">
            <thead>
              <tr className="border-b border-white/10 text-cream/40 uppercase tracking-wider bg-white/5">
                <th className="p-4">Client Details</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Consultation Type</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold text-cream text-sm">{apt.clientName}</p>
                    <p className="text-gold-400 font-mono text-[11px]">{apt.phone}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-cream">
                      <CalendarIcon size={14} className="text-gold-400" />
                      <span className="font-bold">{apt.date}</span>
                    </div>
                    <span className="text-cream/50 text-[10px] block mt-0.5">{apt.timeSlot}</span>
                  </td>
                  <td className="p-4 font-medium text-cream/80">{apt.type}</td>
                  <td className="p-4 text-cream/60 max-w-xs truncate">{apt.notes || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      apt.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      apt.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {apt.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleStatus(apt.id, 'COMPLETED')}
                        className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 font-semibold transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}
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
