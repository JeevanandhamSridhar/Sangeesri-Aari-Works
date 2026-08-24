import { NextResponse } from 'next/server'

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  date: string
  occasion: string
  review: string
  verified: boolean
}

let mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Lakshmi',
    location: 'Vellore',
    rating: 5,
    date: 'December 2024',
    occasion: 'Wedding',
    verified: true,
    review: 'Absolutely stunning bridal blouse! The Aari work was so detailed and perfect. Everyone at my wedding complimented it.',
  },
  {
    id: '2',
    name: 'Meena Devi',
    location: 'Chennai',
    rating: 5,
    date: 'January 2025',
    occasion: 'Reception',
    verified: true,
    review: 'The maggam work on my reception blouse was breathtaking. Quality of thread work is exceptional and delivery was on time.',
  },
  {
    id: '3',
    name: 'Kavitha R.',
    location: 'Ranipet',
    rating: 5,
    date: 'February 2025',
    occasion: 'Festival',
    verified: true,
    review: 'Got a beautiful silk blouse with traditional Aari work done here. The attention to detail is amazing.',
  },
  {
    id: '4',
    name: 'Sowmya V.',
    location: 'Bengaluru',
    rating: 5,
    date: 'March 2025',
    occasion: 'Engagement',
    verified: true,
    review: 'Sangee Sri Aari Works created the exact peacock motif design I asked for. Super responsive team on WhatsApp!',
  },
]

export async function GET() {
  return NextResponse.json(mockTestimonials)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: body.name || 'Anonymous Client',
      location: body.location || 'Tamil Nadu',
      rating: body.rating || 5,
      date: 'Just Now',
      occasion: body.occasion || 'Custom Order',
      review: body.review || '',
      verified: true,
    }
    mockTestimonials.unshift(newTestimonial)
    return NextResponse.json({ success: true, testimonial: newTestimonial })
  } catch {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 400 })
  }
}
