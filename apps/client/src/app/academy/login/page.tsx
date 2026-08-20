'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { GraduationCap, Lock, Phone, UserCheck, KeyRound, Sparkles, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function StudentLoginPage() {
  const router = useRouter()
  const [studentId, setStudentId] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentId || !pin) {
      toast.error('Please enter your Student ID / Registered Phone and PIN')
      return
    }

    setLoading(true)

    setTimeout(() => {
      try {
        // Read admin registered students list from localStorage
        const registered = JSON.parse(localStorage.getItem('sangee_sri_students') || '[]')
        
        // Find matching student
        const found = registered.find(
          (s: any) =>
            (s.studentId?.toLowerCase() === studentId.trim().toLowerCase() ||
             s.phone?.replace(/\D/g, '') === studentId.replace(/\D/g, '')) &&
            s.pin === pin.trim()
        )

        // Demo fallback for testing: STU-101 / 1234
        const demoMatch =
          (studentId.toUpperCase() === 'STU-101' || studentId.includes('7604887356')) &&
          pin === '1234'

        if (found || demoMatch) {
          const studentProfile = found || {
            studentId: 'STU-101',
            name: 'Priya Dharshini',
            phone: '7604887356',
            course: 'Professional Basic to Advanced Aari Work',
            batch: 'Batch 2026-A',
            status: 'ACTIVE',
          }

          if (studentProfile.status === 'SUSPENDED') {
            toast.error('Your student account is pending approval or suspended by Admin.')
            setLoading(false)
            return
          }

          sessionStorage.setItem('sangee_sri_active_student', JSON.stringify(studentProfile))
          toast.success(`Welcome back, ${studentProfile.name}!`)
          router.push('/academy/student/dashboard')
        } else {
          toast.error('Invalid Student ID or Passcode. Please contact Studio Admin if you are not registered yet.')
          setLoading(false)
        }
      } catch (err) {
        toast.error('Login error. Please try again.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-darkbase pt-32 pb-24 flex items-center justify-center">
      <div className="container-luxury max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-gold rounded-4xl p-8 sm:p-10 border border-gold-500/30 shadow-2xl space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <GraduationCap size={32} />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-cream">Student Portal</h1>
            <p className="font-inter text-xs text-gold-400/80 font-semibold uppercase tracking-wider">
              Sangee Sri Aari Academy
            </p>
            <p className="font-inter text-xs text-cream/50 pt-1">
              Enter your Admin-assigned credentials to access video lessons &amp; course tracing files.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} data-lenis-prevent className="space-y-5">
            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block font-medium">
                Student ID or Registered Phone *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  data-lenis-prevent
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. STU-101 or 9876543210"
                  className="input-luxury pl-4"
                />
              </div>
            </div>

            <div>
              <label className="font-inter text-xs text-cream/70 mb-2 block font-medium">
                Admin-Assigned Passcode / PIN *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  data-lenis-prevent
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN (e.g. 1234)"
                  className="input-luxury pl-4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-luxury w-full justify-center py-4 text-sm font-bold"
            >
              {loading ? (
                <span>Verifying Student Registry...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserCheck size={18} /> Sign In to Academy
                </span>
              )}
            </button>
          </form>

          {/* Help Note */}
          <div className="pt-6 border-t border-white/10 text-center space-y-3 font-inter text-xs">
            <div className="p-3 glass rounded-2xl border border-white/5 text-cream/60 flex items-center gap-2 text-[11px] text-left">
              <ShieldCheck size={18} className="text-gold-400 shrink-0" />
              <span>Not registered yet? Only Admin (Fashion Designer Sangee Sri) can create new student accounts.</span>
            </div>
            
            <a
              href="https://wa.me/917604887356?text=Hi! I need help accessing my student account."
              target="_blank"
              rel="noreferrer"
              className="text-gold-400 hover:underline block font-semibold text-[11px]"
            >
              Need Help? Contact Admin on WhatsApp (+91 76048 87356)
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
