import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    badgeText: '🟢 Taking New Orders',
    note: 'Slots open for bridal season & custom Aari blouses',
    dotColor: '#10b981',
    isAccepting: true,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    return NextResponse.json({
      success: true,
      studioStatus: {
        badgeText: body.badgeText || '🟢 Taking New Orders',
        note: body.note || 'Slots open for bridal season',
        dotColor: body.dotColor || '#10b981',
        isAccepting: body.isAccepting ?? true,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}
