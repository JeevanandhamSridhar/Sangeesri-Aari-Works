import { NextResponse } from 'next/server'

export type StudioStatusKey = 'available' | 'busy_bridal' | 'paused'

export interface StudioStatusData {
  status: StudioStatusKey
  title: string
  subtitle: string
  badgeText: string
  color: string
  dotColor: string
  note: string
  updatedAt: string
}

// In-memory studio status state (defaults to available)
let currentStudioStatus: StudioStatusData = {
  status: 'available',
  title: 'Available for New Orders',
  subtitle: 'Taking custom Aari embroidery & bridal blouse orders',
  badgeText: '🟢 Taking New Orders',
  color: 'emerald',
  dotColor: '#10b981',
  note: 'Slots open for upcoming wedding season orders',
  updatedAt: new Date().toISOString(),
}

const statusConfigs: Record<StudioStatusKey, Omit<StudioStatusData, 'status' | 'updatedAt' | 'note'>> = {
  available: {
    title: 'Available for New Orders',
    subtitle: 'Taking custom Aari embroidery & bridal blouse orders',
    badgeText: '🟢 Taking New Orders',
    color: 'emerald',
    dotColor: '#10b981',
  },
  busy_bridal: {
    title: 'Working on Bridal Orders',
    subtitle: 'Currently crafting bridal blouses (Limited slots available)',
    badgeText: '🧵 Working on Bridal Orders',
    color: 'amber',
    dotColor: '#f59e0b',
  },
  paused: {
    title: 'Orders Currently Paused',
    subtitle: 'Full capacity for current batch — reopening slots soon',
    badgeText: '🔴 Orders Paused (Full)',
    color: 'rose',
    dotColor: '#f43f5e',
  },
}

export async function GET() {
  return NextResponse.json(currentStudioStatus)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { status, note } = body as { status: StudioStatusKey; note?: string }

    if (!status || !statusConfigs[status]) {
      return NextResponse.json({ error: 'Invalid status key' }, { status: 400 })
    }

    const config = statusConfigs[status]
    currentStudioStatus = {
      status,
      ...config,
      note: note ?? currentStudioStatus.note ?? '',
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data: currentStudioStatus })
  } catch {
    return NextResponse.json({ error: 'Failed to update studio status' }, { status: 500 })
  }
}
