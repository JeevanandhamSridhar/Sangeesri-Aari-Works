'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, UserPlus, ShieldCheck, Key, Phone, CheckCircle2, XCircle, Search, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface Student {
  id: string
  studentId: string
  name: string
  phone: string
  course: string
  batch: string
  pin: string
  status: 'ACTIVE' | 'SUSPENDED' | 'COMPLETED'
  registeredDate: string
}

const initialStudents: Student[] = [
  { id: '1', studentId: 'STU-101', name: 'Priya Dharshini', phone: '7604887356', course: 'Professional Basic to Advanced Aari Work', batch: 'Batch 2026-A', pin: '1234', status: 'ACTIVE', registeredDate: '2026-07-15' },
  { id: '2', studentId: 'STU-102', name: 'Kavitha Ramachandran', phone: '9876543210', course: 'Master Bridal Maggam & Zardosi', batch: 'Batch 2026-A', pin: '5678', status: 'ACTIVE', registeredDate: '2026-07-20' },
  { id: '3', studentId: 'STU-103', name: 'Anitha S.', phone: '9123456789', course: 'Boutique Tailoring & Perfect Fitting', batch: 'Batch 2026-B', pin: '4321', status: 'COMPLETED', registeredDate: '2026-06-10' },
]

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    course: 'Professional Basic to Advanced Aari Work',
    batch: 'Batch 2026-A',
    pin: '1234',
  })

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('sangee_sri_students') || '[]')
      if (Array.isArray(stored) && stored.length > 0) {
        const storedIds = new Set(stored.map((s: Student) => s.id))
        const filteredInitial = initialStudents.filter((s) => !storedIds.has(s.id))
        setStudents([...stored, ...filteredInitial])
      }
    } catch {}
  }, [])

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStudent.name || !newStudent.phone || !newStudent.pin) {
      toast.error('Please fill in all student details')
      return
    }

    const nextId = `STU-${Math.floor(100 + Math.random() * 900)}`
    const created: Student = {
      id: String(Date.now()),
      studentId: nextId,
      name: newStudent.name,
      phone: newStudent.phone,
      course: newStudent.course,
      batch: newStudent.batch,
      pin: newStudent.pin,
      status: 'ACTIVE',
      registeredDate: new Date().toISOString().split('T')[0],
    }

    const updated = [created, ...students]
    setStudents(updated)

    try {
      localStorage.setItem('sangee_sri_students', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch {}

    toast.success(`Student ${created.name} registered successfully! Student ID: ${nextId}`)
    setModalOpen(false)
    setNewStudent({ name: '', phone: '', course: 'Professional Basic to Advanced Aari Work', batch: 'Batch 2026-A', pin: '1234' })
  }

  const toggleStatus = (id: string) => {
    const updated = students.map((s) =>
      s.id === id ? { ...s, status: s.status === 'ACTIVE' ? ('SUSPENDED' as const) : ('ACTIVE' as const) } : s
    )
    setStudents(updated)
    try {
      localStorage.setItem('sangee_sri_students', JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch {}
    toast.info('Student access status updated.')
  }

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search)
  )

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <GraduationCap size={16} /> Sangee Sri Aari Academy
          </div>
          <h1 className="font-playfair text-3xl font-bold text-cream">Student Registration &amp; Management</h1>
          <p className="font-inter text-xs text-cream/50 mt-1">Register new students, assign access PINs, and approve student portal access.</p>
        </div>

        <button onClick={() => setModalOpen(true)} className="btn-admin-gold flex items-center gap-2">
          <UserPlus size={16} /> Register New Student
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Student Name, ID or Phone..."
          className="input-admin pl-11 text-xs"
        />
      </div>

      {/* Table */}
      <div className="glass-admin rounded-3xl p-6 border border-white/5 overflow-x-auto">
        <table className="w-full text-left font-inter text-xs">
          <thead>
            <tr className="border-b border-white/10 text-cream/40 uppercase tracking-wider pb-3">
              <th className="pb-3">Student ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Phone</th>
              <th className="pb-3">Enrolled Course</th>
              <th className="pb-3">Access PIN</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 font-mono font-bold text-gold-400">{s.studentId}</td>
                <td className="py-4 font-medium text-cream">{s.name}</td>
                <td className="py-4 text-cream/70">{s.phone}</td>
                <td className="py-4 text-cream/80">{s.course}</td>
                <td className="py-4 font-mono font-bold text-gold-300">{s.pin}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    s.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    s.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => toggleStatus(s.id)}
                    className="text-xs text-gold-400 hover:underline font-semibold"
                  >
                    {s.status === 'ACTIVE' ? 'Suspend Access' : 'Approve Access'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-admin rounded-3xl p-8 border border-gold-500/30 max-w-md w-full space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-playfair text-xl font-bold text-cream flex items-center gap-2">
                <UserPlus size={18} className="text-gold-400" /> Register New Student
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-cream/50 hover:text-cream">✕</button>
            </div>

            <form onSubmit={handleRegisterStudent} className="space-y-4 font-inter text-xs">
              <div>
                <label className="text-cream/70 block mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Kavya Priya"
                  className="input-admin"
                />
              </div>

              <div>
                <label className="text-cream/70 block mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="input-admin"
                />
              </div>

              <div>
                <label className="text-cream/70 block mb-1">Select Course Track</label>
                <select
                  value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                  className="input-admin bg-[#120c08]"
                >
                  <option value="Professional Basic to Advanced Aari Work">Professional Basic to Advanced Aari Work</option>
                  <option value="Master Bridal Maggam & Zardosi">Master Bridal Maggam & Zardosi</option>
                  <option value="Boutique Tailoring & Perfect Fitting">Boutique Tailoring & Perfect Fitting</option>
                </select>
              </div>

              <div>
                <label className="text-cream/70 block mb-1">Assign Login PIN (4 Digits) *</label>
                <input
                  type="text"
                  required
                  value={newStudent.pin}
                  onChange={(e) => setNewStudent({ ...newStudent, pin: e.target.value })}
                  placeholder="e.g. 1234"
                  className="input-admin font-mono font-bold text-gold-400"
                />
              </div>

              <button type="submit" className="btn-admin-gold w-full justify-center py-3 text-xs">
                Confirm Student Registration &amp; Enable Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
