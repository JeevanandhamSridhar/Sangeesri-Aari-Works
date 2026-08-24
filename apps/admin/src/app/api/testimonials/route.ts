import { NextResponse } from 'next/server'

const initialTestimonials = [
  {
    id: 't-1',
    name: 'Priyanka R.',
    city: 'Kaveripakkam',
    role: 'Bridal Client',
    rating: 5,
    date: '2 weeks ago',
    text: 'Sangee Sri Aari Works made my wedding blouse an absolute dream! The gold Zari and peacock work received endless compliments.',
    blouseCode: 'SSAW-001',
    approved: true,
  },
  {
    id: 't-2',
    name: 'Divya M.',
    city: 'Ranipet',
    role: 'Reception Wear',
    rating: 5,
    date: '1 month ago',
    text: 'Extremely professional fitting and grand Zardosi embroidery. Kaviya ma’am personally guided me for border matching.',
    blouseCode: 'SSAW-008',
    approved: true,
  },
  {
    id: 't-3',
    name: 'Kavitha S.',
    city: 'Vellore',
    role: 'Academy Student',
    rating: 5,
    date: '3 weeks ago',
    text: 'Enrolled in the professional Aari embroidery course. Clear step-by-step guidance and certificate upon completion!',
    approved: true,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const approvedOnly = searchParams.get('approved') === 'true'

  const filtered = approvedOnly
    ? initialTestimonials.filter((t) => t.approved)
    : initialTestimonials

  return NextResponse.json(filtered)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newTestimonial = {
      id: `t-${Date.now()}`,
      name: body.name || 'Anonymous',
      city: body.city || 'Tamil Nadu',
      role: body.role || 'Verified Client',
      rating: body.rating || 5,
      date: 'Just now',
      text: body.text || '',
      blouseCode: body.blouseCode || '',
      approved: false,
    }
    return NextResponse.json({ success: true, testimonial: newTestimonial })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}
