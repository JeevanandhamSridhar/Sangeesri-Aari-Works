import { NextResponse } from 'next/server'

let storeSettings = {
  freeShippingEnabled: false,
  freeDeliveryThreshold: 999,
  deliveryCharge: 99,
  studioName: 'Sangee Sri Aari Works',
  phone: '7604887356',
  whatsapp: '7604887356',
  address: 'No. 6, Bazaar Street, Kaveripakkam, Ranipet District, PIN - 632508',
  gstRate: 5,
  updatedAt: new Date().toISOString(),
}

export async function GET() {
  return NextResponse.json(storeSettings)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    storeSettings = {
      ...storeSettings,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Try to sync with client API if running
    try {
      await fetch('http://localhost:3000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch {}

    return NextResponse.json({ success: true, settings: storeSettings })
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
