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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      toast.error('Please enter your name and phone number')
      return
    }
    setSubmitted(true)
    toast.success('Quotation request submitted! We will contact you on WhatsApp shortly.')
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
            Fill out your blouse design preferences below. Our design team will review your requirements and provide an accurate cost & timeframe estimate within 2 hours.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-gold rounded-4xl p-12 text-center border border-gold-500/30"
          >
            <CheckCircle2 size={64} className="text-gold-400 mx-auto mb-6" />
            <h2 className="font-playfair text-3xl font-bold text-cream mb-4">
              Quotation Request Received!
            </h2>
            <p className="font-inter text-cream/70 max-w-md mx-auto mb-8">
              Thank you, <span className="text-gold-400 font-semibold">{formData.name}</span>. Our designer will analyze your details and contact you at <span className="text-gold-400 font-semibold">{formData.phone}</span>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/917604887356?text=Hi! I submitted a quotation request for a ${formData.blouseType} blouse (${formData.occasion}). Name: ${formData.name}`}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury text-sm"
              >
                <FaWhatsapp size={18} /> Chat Directly on WhatsApp
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
          <form onSubmit={handleSubmit} className="glass rounded-4xl p-8 md:p-12 border border-white/10 space-y-8">
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
