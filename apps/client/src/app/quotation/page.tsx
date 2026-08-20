'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Upload, CheckCircle2, Phone, Calendar } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

export default function QuotationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    occasion: 'Wedding',
    blouseType: 'Bridal Heavy Aari',
    budget: '₹3,000 - ₹5,000',
    deadline: '',
    notes: '',
  })
  const [submittedData, setSubmittedData] = useState<{
    quoId: string
    name: string
    phone: string
    waUrl: string
  } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number')
      return
    }

    const quoId = `QUO-${Math.floor(1000 + Math.random() * 9000)}`
    const dateStr = new Date().toLocaleDateString('en-IN')

    const newQuotation = {
      id: String(Date.now()),
      quotationNumber: quoId,
      customerName: formData.name,
      customerPhone: formData.phone,
      occasion: formData.occasion,
      blouseType: formData.blouseType,
      budget: formData.budget,
      deadline: formData.deadline || 'Flexible',
      notes: formData.notes || 'No specific notes',
      status: 'PENDING',
      date: dateStr,
    }

    // Save quotation & notification to localStorage for instant Admin alert
    try {
      const existingQuos = JSON.parse(localStorage.getItem('sangee_sri_quotations') || '[]')
      localStorage.setItem('sangee_sri_quotations', JSON.stringify([newQuotation, ...existingQuos]))

      const notifItem = {
        id: `notif-${Date.now()}`,
        type: 'QUOTATION',
        title: `New Custom Design Request #${quoId}`,
        description: `${formData.name} requested quote for ${formData.blouseType} (${formData.budget}).`,
        time: 'Just now',
        read: false,
        link: '/quotations',
      }
      const existingNotifs = JSON.parse(localStorage.getItem('sangee_sri_notifications') || '[]')
      localStorage.setItem('sangee_sri_notifications', JSON.stringify([notifItem, ...existingNotifs]))

      window.dispatchEvent(new Event('storage'))

      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('sangee_sri_channel')
        bc.postMessage({ type: 'NEW_QUOTATION', quoId, customerName: formData.name })
        bc.close()
      }
    } catch (err) {
      console.error('Failed to save quotation / notification:', err)
    }

    // Build automated WhatsApp message for 7604887356
    const message = `🌸 *NEW CUSTOM DESIGN QUOTATION REQUEST* 🌸
*Quotation ID:* #${quoId}
*Date:* ${dateStr}

*CLIENT DETAILS:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}

*DESIGN SPECIFICATIONS:*
• *Occasion:* ${formData.occasion}
• *Work Type:* ${formData.blouseType}
• *Estimated Budget:* ${formData.budget}
• *Target Date:* ${formData.deadline || 'As per designer availability'}
${formData.notes ? `• *Design Notes:* ${formData.notes}\n` : ''}
Hi Sangee Sri Aari Works! I submitted a quotation request on the website. Please review my details and send an estimate.`

    const waUrl = `https://wa.me/917604887356?text=${encodeURIComponent(message)}`

    setSubmittedData({
      quoId,
      name: formData.name,
      phone: formData.phone,
      waUrl,
    })
    setSubmitted(true)
    toast.success('Quotation request submitted! Admin dashboard updated.')
  }

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24">
      <div className="container-luxury max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <Sparkles size={12} /> Free Custom Estimate <Sparkles size={12} />
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
            <span className="text-cream">Get A Custom </span>
            <span className="text-gradient-gold">Design Quotation</span>
          </h1>
          <p className="font-inter text-cream/60 max-w-xl mx-auto text-sm leading-relaxed">
            Fill out your blouse design preferences below. Our design team led by Fashion Designer Sangee Sri will review your requirements and provide an accurate cost & timeframe estimate within 2 hours.
          </p>
        </div>

        {submitted && submittedData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-gold rounded-4xl p-12 text-center border border-gold-500/30 shadow-2xl"
          >
            <CheckCircle2 size={64} className="text-gold-400 mx-auto mb-6" />
            <span className="badge-gold text-xs mb-3 inline-block">Quotation Registered #{submittedData.quoId}</span>
            <h2 className="font-playfair text-3xl font-bold text-cream mb-4">
              Quotation Request Received!
            </h2>
            <p className="font-inter text-cream/70 max-w-md mx-auto mb-8">
              Thank you, <span className="text-gold-400 font-semibold">{submittedData.name}</span>. Your request has been logged in our studio system. Fashion Designer Sangee Sri will review your details and contact you at <span className="text-gold-400 font-semibold">{submittedData.phone}</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={submittedData.waUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury text-sm flex items-center gap-2 py-4 px-6"
              >
                <FaWhatsapp size={20} className="text-green-400" /> Chat Directly on WhatsApp
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline-gold text-sm"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} data-lenis-prevent className="glass rounded-4xl p-8 md:p-12 border border-white/10 space-y-8">
            {/* Personal Details */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                1. Your Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    data-lenis-prevent
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sangeetha Priya"
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
                    placeholder="e.g. 9876543210"
                    className="input-luxury"
                  />
                </div>
              </div>
            </div>

            {/* Design Preferences */}
            <div>
              <h3 className="font-playfair text-xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                2. Design & Occasion Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Occasion</label>
                  <select
                    data-lenis-prevent
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="input-luxury bg-darkbase"
                  >
                    <option value="Wedding">Wedding / Muhurtham</option>
                    <option value="Reception">Reception</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Festival">Festive Celebration</option>
                    <option value="Casual">Party / Casual</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Work Type</label>
                  <select
                    data-lenis-prevent
                    value={formData.blouseType}
                    onChange={(e) => setFormData({ ...formData, blouseType: e.target.value })}
                    className="input-luxury bg-darkbase"
                  >
                    <option value="Bridal Heavy Aari">Bridal Heavy Aari Work</option>
                    <option value="Medium Thread Zari">Medium Thread & Zari Work</option>
                    <option value="Simple Neck Motif">Simple Neck & Sleeve Motif</option>
                    <option value="Stone Kundan Work">Stone & Kundan Embellishment</option>
                    <option value="Custom Tailoring">Custom Tailoring + Stitching</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Estimated Budget</label>
                  <select
                    data-lenis-prevent
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="input-luxury bg-darkbase"
                  >
                    <option value="Under ₹2,000">Under ₹2,000</option>
                    <option value="₹2,000 - ₹3,500">₹2,000 - ₹3,500</option>
                    <option value="₹3,500 - ₹6,000">₹3,500 - ₹6,000</option>
                    <option value="Above ₹6,000">Above ₹6,000 (Luxury Heavy)</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-xs text-cream/70 mb-2 block">Target Completion Date</label>
                  <input
                    type="date"
                    data-lenis-prevent
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="input-luxury"
                  />
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block">Design Notes & Specific Ideas</label>
              <textarea
                rows={4}
                data-lenis-prevent
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention neck pattern, sleeve length, saree color, or special motif preferences (e.g. peacock, temple bell, floral)..."
                className="input-luxury"
              />
            </div>

            <button type="submit" className="btn-luxury w-full justify-center py-5 text-base">
              <Send size={18} /> Submit Quotation Request
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
