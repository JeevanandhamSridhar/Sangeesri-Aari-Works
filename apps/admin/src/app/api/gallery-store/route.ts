import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), '../client/src/data/gallery-storage.json')
const PUBLIC_GALLERY_DIR = path.join(process.cwd(), '../client/public/gallery')

export interface GalleryItem {
  id: string
  code: string
  title: string
  category: string
  src: string
  showPrice?: boolean
  priceEstimate?: string
  tags: string[]
  description?: string
  workType?: string
}

function readStorageFile(): GalleryItem[] {
  try {
    if (!fs.existsSync(JSON_PATH)) {
      return []
    }
    const raw = fs.readFileSync(JSON_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeStorageFile(items: GalleryItem[]) {
  try {
    const dir = path.dirname(JSON_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(JSON_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing gallery storage JSON:', err)
  }
}

function syncWithPublicGallery(existingItems: GalleryItem[]): GalleryItem[] {
  if (!fs.existsSync(PUBLIC_GALLERY_DIR)) return existingItems

  const files = fs.readdirSync(PUBLIC_GALLERY_DIR).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  )

  const registeredSrcs = new Set(existingItems.map((item) => item.src))
  let maxNum = 0
  existingItems.forEach((item) => {
    const match = item.code.match(/SSAW-(\d+)/)
    if (match) {
      const num = parseInt(match[1], 10)
      if (num > maxNum) maxNum = num
    }
  })

  let updated = [...existingItems]
  let added = false

  files.forEach((file) => {
    const relativeSrc = `/gallery/${file}`
    if (!registeredSrcs.has(relativeSrc)) {
      maxNum++
      const code = `SSAW-${String(maxNum).padStart(3, '0')}`
      updated.push({
        id: `gal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        code,
        title: `Aari Blouse Design ${code}`,
        category: 'Bridal Blouses',
        src: relativeSrc,
        showPrice: false,
        priceEstimate: '₹3,500 – ₹6,500',
        tags: ['Bridal', 'Handcrafted', 'Aari Work'],
        description: 'Custom handcrafted Aari embroidery blouse design.',
      })
      added = true
    }
  })

  if (added) {
    writeStorageFile(updated)
  }

  return updated
}

export async function GET() {
  const existing = readStorageFile()
  const synced = syncWithPublicGallery(existing)
  return NextResponse.json({ success: true, designs: synced })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, id, showPrice, item } = body
    let current = readStorageFile()

    if (action === 'delete' && id) {
      const targetItem = current.find((i) => i.id === id)
      if (targetItem) {
        if (targetItem.src.startsWith('/gallery/')) {
          const filename = targetItem.src.replace('/gallery/', '')
          const filePath = path.join(PUBLIC_GALLERY_DIR, filename)
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath)
            } catch (e) {
              console.warn('Could not unlink physical file:', e)
            }
          }
        }
      }
      current = current.filter((i) => i.id !== id)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'toggle_price_mode') {
      if (id) {
        current = current.map((i) =>
          i.id === id ? { ...i, showPrice: typeof showPrice === 'boolean' ? showPrice : !i.showPrice } : i
        )
      } else {
        current = current.map((i) => ({
          ...i,
          showPrice: typeof showPrice === 'boolean' ? showPrice : !i.showPrice,
        }))
      }
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'update_item' && item && item.id) {
      current = current.map((i) => (i.id === item.id ? { ...i, ...item } : i))
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'add_item' && item) {
      let maxNum = 0
      current.forEach((i) => {
        const match = i.code.match(/SSAW-(\d+)/)
        if (match) {
          const num = parseInt(match[1], 10)
          if (num > maxNum) maxNum = num
        }
      })
      maxNum++
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        code: `SSAW-${String(maxNum).padStart(3, '0')}`,
        title: item.title || `Aari Blouse Design SSAW-${String(maxNum).padStart(3, '0')}`,
        category: item.category || 'Bridal Blouses',
        src: item.src || '/gallery/default.jpg',
        showPrice: item.showPrice || false,
        priceEstimate: item.priceEstimate || '₹3,500 – ₹6,000',
        tags: item.tags || ['Handcrafted'],
        description: item.description || 'Custom Aari work design.',
      }
      current.unshift(newItem)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'sync_folder') {
      current = syncWithPublicGallery(current)
      return NextResponse.json({ success: true, designs: current })
    }

    return NextResponse.json({ success: true, designs: current })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
