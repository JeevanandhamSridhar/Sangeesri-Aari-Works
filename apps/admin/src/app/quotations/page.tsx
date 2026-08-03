'use client'

import { useState } from 'react'
import { FileText, CheckCircle2, Clock, DollarSign, Send, MessageSquare } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'sonner'

interface Quotation {
  id: string
  quotationNumber: string
  customerName: string
  customerPhone: string
  occasion: string
  blouseType: string
  budget: string
  deadline: string
  notes: string
  status: 'PENDING' | 'REVIEWING' | 'QUOTED' | 'APPROVED' | 'COMPLETED'
  quotedAmount?: number
}

const initialQuotations: Quotation[] = [
  { id: '1', quotationNumber: 'QUO-104', customerName: 'Divya Bharathi', customerPhone: '9876543210', occasion: 'Wedding / Muhurtham', blouseType: 'Bridal Heavy Aari Work', budget: '₹5,000 - ₹8,000', deadline: '2025-08-15', notes: 'Heavy peacock motif on back with golden zari & stone work.', status: 'PENDING' },
  { id: '2', quotationNumber: 'QUO-103', customerName: 'Anusha K.', customerPhone: '9789012345', occasion: 'Reception', blouseType: 'Stone & Kundan Embellishment', budget: '₹4,000 - ₹6,000', deadline: '2025-08-20', notes: 'Crystal highlights matching pink silk saree border.', status: 'QUOTED', quotedAmount: 4800 },
  { id: '3', quotationNumber: 'QUO-102', customerName: 'Subhashini M.', customerPhone: '9123456789', occasion: 'Festive Celebration', blouseType: 'Simple Neck & Sleeve Motif', budget: '₹2,000 - ₹3,500', deadline: '2025-08-12', notes: 'Simple traditional lotus neck design.', status: 'APPROVED', quotedAmount: 2500 },
]

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations)
  const [activeQuo, setActiveQuo] = useState<Quotation | null>(null)
  const [quoteInput, setQuoteInput] = useState('')

  const handleSendQuote = (quo: Quotation) => {
    const amt = parseFloat(quoteInput)
    if (!amt || amt <= 0) {
      toast.error('Please enter a valid quotation amount in ₹')
      return
    }

    setQuotations(
      quotations.map((q) =>
        q.id === quo.id ? { ...q, status: 'QUOTED', quotedAmount: amt } : q
      )
    )

    toast.success(`Quotation of ₹${amt} generated for ${quo.customerName}!`)
    
    // Open WhatsApp pre-filled estimate
    const waText = encodeURIComponent(
      `Hi ${quo.customerName}! Thank you for your inquiry with Sangee Sri Aari Works.\n\n` +
      `📌 Quotation #${quo.quotationNumber}\n` +
      `✨ Work: ${quo.blouseType}\n` +
      `💰 Estimated Price: ₹${amt.toLocaleString('en-IN')}\n` +
      `📅 Delivery Target: ${quo.deadline}\n\n` +
      `Please reply to confirm your order or request minor design modifications.`
    )
    window.open(`https://wa.me/91${quo.customerPhone}?text=${waText}`, '_blank')
    
    setActiveQuo(null)
    setQuoteInput('')
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-playfair text-3xl font-bold text-cream">Custom Design Quotations</h1>
        <p className="font-inter text-xs text-cream/50 mt-1">Review custom blouse requests, calculate pricing, and send estimates via WhatsApp.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {quotations.map((quo) => (
            <div
              key={quo.id}
              onClick={() => setActiveQuo(quo)}
              className={`p-6 rounded-3xl cursor-pointer transition-all border ${
                activeQuo?.id === quo.id
                  ? 'glass-gold border-gold-500 scale-[1.01]'
                  : 'glass-admin border-white/10 hover:border-gold-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-gold-400 text-sm">{quo.quotationNumber}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  quo.status === 'QUOTED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  quo.status === 'APPROVED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                }`}>
                  {quo.status}
                </span>
              </div>

              <h2 className="font-playfair text-lg font-bold text-cream">{quo.customerName}</h2>
              <p className="font-inter text-xs text-cream/70 mt-1">{quo.blouseType} · {quo.occasion}</p>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5 font-inter text-xs text-cream/50">
                <span>Budget: {quo.budget}</span>
                {quo.quotedAmount ? (
                  <span className="font-bold text-gold-400 text-sm">Quoted: ₹{quo.quotedAmount}</span>
                ) : (
                  <span className="text-amber-400 font-semibold">Click to Quote →</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Quotation Action Details (5 Cols) */}
        <div className="lg:col-span-5">
          {activeQuo ? (
            <div className="glass-admin rounded-3xl p-6 border border-gold-500/30 space-y-6 sticky top-24">
              <div className="pb-4 border-b border-white/10">
                <span className="font-mono text-xs text-gold-400">{activeQuo.quotationNumber}</span>
                <h2 className="font-playfair text-2xl font-bold text-cream">{activeQuo.customerName}</h2>
                <p className="font-inter text-xs text-cream/50 mt-1">Phone: {activeQuo.customerPhone}</p>
              </div>

              <div className="space-y-3 font-inter text-xs">
                <div>
                  <span className="text-cream/40 block">Blouse Type:</span>
                  <span className="text-cream font-medium">{activeQuo.blouseType}</span>
                </div>
                <div>
                  <span className="text-cream/40 block">Occasion:</span>
                  <span className="text-cream font-medium">{activeQuo.occasion}</span>
                </div>
                <div>
                  <span className="text-cream/40 block">Customer Budget:</span>
                  <span className="text-gold-400 font-semibold">{activeQuo.budget}</span>
                </div>
                <div>
                  <span className="text-cream/40 block">Requested Deadline:</span>
                  <span className="text-cream font-medium">{activeQuo.deadline}</span>
                </div>
                <div>
                  <span className="text-cream/40 block">Design Notes:</span>
                  <p className="text-cream/80 bg-white/5 p-3 rounded-xl mt-1 leading-relaxed">{activeQuo.notes}</p>
                </div>
              </div>

              {/* Provide Quote Box */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <label className="font-inter text-xs text-gold-400 font-semibold block">
                  Set Final Quotation Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5200"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(e.target.value)}
                  className="input-admin font-bold text-gold-400"
                />
                <button
                  onClick={() => handleSendQuote(activeQuo)}
                  className="btn-admin-gold w-full justify-center text-xs py-3"
                >
                  <FaWhatsapp size={16} /> Send Quotation via WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-admin rounded-3xl p-12 text-center border border-white/5 text-cream/40 font-inter text-xs">
              Select a quotation request from the list to review details and send estimate.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
