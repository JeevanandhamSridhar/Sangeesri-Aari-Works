'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, Sparkles, MapPin } from 'lucide-react'
import { toast } from 'sonner'

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
]

export default function BookAppointmentPage() {
  const [booked, setBooked] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0])
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    consultationType: 'Studio Visit (Kaveripakkam)',
    notes: '',
  })

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.date) {
      toast.error('Please complete all required fields')
      return
    }
    setBooked(true)
    toast.success('Consultation appointment confirmed!')
  }

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury max-w-3xl">
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} /> Personal Design Consultation <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Book A Design </span>
            <span className="text-gradient-gold">Consultation</span>
          </h1>
          <p className="font-inter text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            Schedule a 1-on-1 session with our senior designer. We will take measurements, showcase thread/fabric samples, and create a custom sketch for your blouse.
          </p>
        </div>

        {booked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-gold rounded-4xl p-12 text-center border border-gold-500/30 space-y-6"
          >
            <CheckCircle2 size={64} className="text-gold-400 mx-auto" />
            <h2 className="font-playfair text-3xl font-bold text-cream">Appointment Confirmed!</h2>
            <div className="glass-dark rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 font-inter text-sm border border-white/10">
              <div className="flex justify-between">
                <span className="text-cream/50">Client:</span>
                <span className="text-cream font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Date:</span>
                <span className="text-gold-400 font-semibold">{formData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Time Slot:</span>
                <span className="text-gold-400 font-semibold">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">Type:</span>
                <span className="text-cream font-medium">{formData.consultationType}</span>
              </div>
            </div>
            <p className="font-inter text-xs text-cream/50">
              📍 Location: Banavaram Road, Kaveripakkam, Ranipet District (PIN: 632508)
            </p>
            <button onClick={() => setBooked(false)} className="btn-luxury text-xs py-3">
              Book Another Appointment
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleBooking} data-lenis-prevent className="glass rounded-4xl p-8 md:p-12 border border-white/10 space-y-8">
            {/* Consultation Type */}
            <div>
              <label className="font-inter text-xs text-cream/70 mb-3 block">Consultation Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Studio Visit (Kaveripakkam)', 'WhatsApp Video Call'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, consultationType: type })}
                    className={`p-4 rounded-2xl border text-left font-inter text-sm transition-all ${
                      formData.consultationType === type
                        ? 'border-gold-500 bg-gold-500/10 text-gold-300 font-semibold'
                        : 'border-white/10 text-cream/60 hover:border-gold-500/30'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="font-inter text-xs text-cream/70 mb-2 block">Your Name *</label>
                <input
                  type="text"
                  required
                  data-lenis-prevent
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Anitha Kumar"
                  className="input-luxury"
                />
              </div>
              <div>
                <label className="font-inter text-xs text-cream/70 mb-2 block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  data-lenis-prevent
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 7604887356"
                  className="input-luxury"
                />
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Select Preferred Date *</label>
              <input
                type="date"
                required
                data-lenis-prevent
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-luxury"
              />
            </div>

            {/* Slot Selection */}
            <div>
              <label className="font-inter text-xs text-cream/70 mb-3 block">Select Available Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 px-3 rounded-xl text-xs font-inter font-medium border transition-all text-center ${
                      selectedSlot === slot
                        ? 'border-gold-500 bg-gold-500 text-darkbase font-bold'
                        : 'border-white/10 text-cream/60 hover:border-gold-500/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Notes / Special Requests</label>
              <textarea
                rows={3}
                data-lenis-prevent
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any specific sarees or blouse models you will bring..."
                className="input-luxury"
              />
            </div>

            <button type="submit" className="btn-luxury w-full justify-center py-5 text-base">
              <CalendarIcon size={18} /> Confirm Appointment Booking
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
