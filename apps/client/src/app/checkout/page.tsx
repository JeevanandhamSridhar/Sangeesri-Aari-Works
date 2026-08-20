'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useCartStore } from '@/store/cartStore'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const { subtotal } = getTotal()

  const [settings, setSettings] = useState({
    freeShippingEnabled: false,
    freeDeliveryThreshold: 999,
    deliveryCharge: 99,
  })

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSettings({
            freeShippingEnabled: Boolean(data.freeShippingEnabled),
            freeDeliveryThreshold: Number(data.freeDeliveryThreshold) || 999,
            deliveryCharge: Number(data.deliveryCharge) || 99,
          })
        }
      })
      .catch(() => {})
  }, [])

  const isFreeDeliveryEligible = settings.freeShippingEnabled && subtotal >= settings.freeDeliveryThreshold
  const deliveryCharge = subtotal === 0 || isFreeDeliveryEligible ? 0 : settings.deliveryCharge
  const grandTotal = subtotal + deliveryCharge

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '632508',
    city: 'Kaveripakkam',
    notes: '',
  })

  const [orderPlaced, setOrderPlaced] = useState<{
    orderId: string
    whatsappUrl: string
  } | null>(null)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address) return

    // Generate unique order ID
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const orderId = `ORD-${new Date().getFullYear()}-${randomNum}`

    // Build items list with internal SKU / Product # (Hidden on customer site UI, included in WhatsApp summary)
    const itemLines = items
      .map((item, i) => {
        const productSku = item.sku || `SSA-${item.productId.replace(/\D/g, '') || (i + 1)}`
        return `${i + 1}. ${item.name} (Product #${productSku}) — ${item.quantity}x ₹${item.salePrice * item.quantity}`
      })
      .join('\n')

    // Construct formatted WhatsApp message
    const message = `🌸 *NEW ORDER — SANGEE SRI AARI WORKS* 🌸
*Order ID:* #${orderId}
*Date:* ${new Date().toLocaleDateString('en-IN')}

*CUSTOMER DETAILS:*
• *Name:* ${form.name}
• *Phone:* ${form.phone}
• *Address:* ${form.address}
• *City:* ${form.city}
• *Pincode:* ${form.pincode}
${form.notes ? `• *Notes:* ${form.notes}\n` : ''}
*ITEMS ORDERED:*
${itemLines}

*ORDER SUMMARY:*
• *Subtotal:* ₹${subtotal}
• *Shipping:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
• *TOTAL AMOUNT:* ₹${grandTotal}

Please confirm my order details & payment options. Thank you!`

    const whatsappUrl = `https://wa.me/917604887356?text=${encodeURIComponent(message)}`

    // Save order snapshot to local storage for live sync with admin
    try {
      const existingOrders = JSON.parse(localStorage.getItem('sangee_sri_orders') || '[]')
      const newOrder = {
        id: String(Date.now()),
        orderNumber: orderId,
        customerName: form.name,
        customerPhone: form.phone,
        city: form.city,
        address: form.address,
        pincode: form.pincode,
        itemsCount: items.reduce((a, b) => a + b.quantity, 0),
        items: items.map((item, i) => ({
          name: item.name,
          sku: item.sku || `SSA-${item.productId.replace(/\D/g, '') || (i + 1)}`,
          quantity: item.quantity,
          price: item.salePrice,
        })),
        totalAmount: grandTotal,
        paymentMethod: 'WhatsApp Order',
        paymentStatus: 'PENDING',
        orderStatus: 'PLACED',
        date: new Date().toISOString().split('T')[0],
      }
      localStorage.setItem('sangee_sri_orders', JSON.stringify([newOrder, ...existingOrders]))

      const notifItem = {
        id: `notif-ord-${Date.now()}`,
        type: 'ORDER',
        title: `New Order Received #${orderId}`,
        description: `${form.name} placed order for ${items.length} items (₹${grandTotal}).`,
        time: 'Just now',
        read: false,
        link: '/orders',
      }
      const existingNotifs = JSON.parse(localStorage.getItem('sangee_sri_notifications') || '[]')
      localStorage.setItem('sangee_sri_notifications', JSON.stringify([notifItem, ...existingNotifs]))

      window.dispatchEvent(new Event('storage'))
    } catch {}

    setOrderPlaced({ orderId, whatsappUrl })
    clearCart()
  }

  return (
    <div className="min-h-screen bg-darkbase pt-28 pb-24">
      <div className="container-luxury max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="section-label mb-1">
              <ShieldCheck size={12} />
              Checkout
            </div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream">Order Confirmation</h1>
          </div>
          <Link href="/cart" className="btn-outline-gold text-xs flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
        </div>

        {orderPlaced ? (
          /* Order Success Modal */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-gold rounded-3xl p-10 text-center max-w-xl mx-auto border border-gold-500/30 my-8 shadow-2xl"
          >
            <CheckCircle2 size={56} className="text-green-400 mx-auto mb-4" />
            <span className="badge-gold text-xs mb-2 inline-block">Order Generated #{orderPlaced.orderId}</span>
            <h2 className="font-playfair text-3xl font-bold text-cream mb-3">Order Ready for Dispatch!</h2>
            <p className="font-inter text-sm text-cream/70 leading-relaxed mb-8">
              Click the button below to send your order summary to our studio WhatsApp. Our team will immediately verify stock and confirm delivery details.
            </p>

            <div className="space-y-3">
              <a
                href={orderPlaced.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-luxury w-full justify-center text-sm py-4 group flex items-center gap-2"
              >
                <FaWhatsapp size={20} className="text-green-400" />
                Send Order to WhatsApp Studio
              </a>

              <Link
                href={`/orders?orderId=${orderPlaced.orderId}`}
                className="btn-outline-gold w-full justify-center text-xs py-3 block"
              >
                Track Order Status
              </Link>
            </div>
          </motion.div>
        ) : items.length === 0 ? (
          <div className="glass-dark rounded-3xl p-12 text-center border border-white/5 max-w-md mx-auto my-12">
            <ShoppingBag size={32} className="text-cream/30 mx-auto mb-4" />
            <p className="font-inter text-sm text-cream/60 mb-6">No items in your cart to checkout.</p>
            <Link href="/shop" className="btn-luxury text-xs">Return to Shop</Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} data-lenis-prevent className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-7 glass-dark rounded-3xl p-6 sm:p-8 border border-white/5 space-y-6">
              <h2 className="font-playfair text-xl font-bold text-cream pb-3 border-b border-white/10">
                Delivery Details
              </h2>

              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    data-lenis-prevent
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Priya Lakshmi"
                    required
                    className="input-luxury text-sm"
                  />
                </div>

                <div>
                  <label className="text-cream/70 block mb-1 font-medium">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    data-lenis-prevent
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    required
                    className="input-luxury text-sm"
                  />
                </div>

                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Full Delivery Address *</label>
                  <textarea
                    rows={3}
                    data-lenis-prevent
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Door No, Street Name, Landmark..."
                    required
                    className="input-luxury text-sm resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-cream/70 block mb-1 font-medium">City / District</label>
                    <input
                      type="text"
                      data-lenis-prevent
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Kaveripakkam / Ranipet"
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-cream/70 block mb-1 font-medium">PIN Code</label>
                    <input
                      type="text"
                      data-lenis-prevent
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="632508"
                      className="input-luxury text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-cream/70 block mb-1 font-medium">Special Instructions / Customization Notes (Optional)</label>
                  <textarea
                    rows={2}
                    data-lenis-prevent
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Blouse size, color preference, urgent delivery..."
                    className="input-luxury text-sm resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Items & Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-gold rounded-3xl p-6 border border-gold-500/20 space-y-6 sticky top-28">
                <h2 className="font-playfair text-xl font-bold text-cream pb-3 border-b border-white/10">
                  Items ({items.length})
                </h2>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair font-semibold text-cream text-xs truncate">{item.name}</p>
                        <p className="font-inter text-[10px] text-cream/40">{item.quantity}x ₹{item.salePrice}</p>
                      </div>
                      <span className="font-playfair font-bold text-gold-400 text-sm">₹{item.salePrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 font-inter text-xs">
                  <div className="flex justify-between text-cream/60">
                    <span>Subtotal</span>
                    <span className="text-cream font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <span>Delivery Fee</span>
                    <span className="text-green-400 font-semibold">{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                    <span className="font-playfair font-bold text-base text-cream">Grand Total</span>
                    <span className="font-playfair text-2xl font-bold text-gold-400">₹{grandTotal}</span>
                  </div>
                </div>

                <button type="submit" className="btn-luxury w-full justify-center text-sm py-4 group flex items-center gap-2">
                  <FaWhatsapp size={18} className="text-green-400" />
                  Confirm &amp; Place WhatsApp Order
                </button>

                <div className="text-[10px] text-cream/40 text-center font-inter">
                  Instant order confirmation via official Sangee Sri Aari Works WhatsApp.
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
