import { NextResponse } from 'next/server'

export interface StoreSettingsData {
  freeShippingEnabled: boolean
  freeDeliveryThreshold: number
  deliveryCharge: number
  studioName: string
  phone: string
  whatsapp: string
  address: string
  gstRate: number
  updatedAt: string
}

let storeSettings: StoreSettingsData = {
  freeShippingEnabled: false, // Default to false so free shipping is disabled unless explicitly turned ON by admin
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
    return NextResponse.json({ success: true, settings: storeSettings })
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
