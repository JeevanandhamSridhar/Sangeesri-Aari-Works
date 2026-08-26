import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), 'src/data/gallery-storage.json')
const CLIENT_GALLERY_DIR = path.join(process.cwd(), 'public/gallery')
const ADMIN_GALLERY_DIR = path.join(process.cwd(), '../admin/public/gallery')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export interface GalleryItem {
  id: string
  code: string
  title: string
  category: string
  src: string
  images?: string[]
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
    const parsed: GalleryItem[] = JSON.parse(raw)
    // Filter out invalid blob: URLs
    return parsed.filter((item) => !item.src.includes('blob:'))
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
    // Clean out blob: URLs before saving
    const cleanItems = items.filter((item) => !item.src.includes('blob:'))
    fs.writeFileSync(JSON_PATH, JSON.stringify(cleanItems, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing gallery storage JSON:', err)
  }
}

function syncDirectoriesAndStorage(existingItems: GalleryItem[]): GalleryItem[] {
  // Purge any blob: entries
  let cleaned = existingItems.filter((item) => !item.src.includes('blob:'))

  // Ensure directories exist
  if (!fs.existsSync(CLIENT_GALLERY_DIR)) {
    fs.mkdirSync(CLIENT_GALLERY_DIR, { recursive: true })
  }
  if (!fs.existsSync(ADMIN_GALLERY_DIR)) {
    try {
      fs.mkdirSync(ADMIN_GALLERY_DIR, { recursive: true })
    } catch {}
  }

  // Bidirectional file copy between Client & Admin
  const clientFiles = fs.readdirSync(CLIENT_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  let adminFiles: string[] = []
  if (fs.existsSync(ADMIN_GALLERY_DIR)) {
    adminFiles = fs.readdirSync(ADMIN_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  }

  adminFiles.forEach((file) => {
    const dest = path.join(CLIENT_GALLERY_DIR, file)
    if (!fs.existsSync(dest)) {
      try {
        fs.copyFileSync(path.join(ADMIN_GALLERY_DIR, file), dest)
      } catch {}
    }
  })

  if (fs.existsSync(ADMIN_GALLERY_DIR)) {
    clientFiles.forEach((file) => {
      const dest = path.join(ADMIN_GALLERY_DIR, file)
      if (!fs.existsSync(dest)) {
        try {
          fs.copyFileSync(path.join(CLIENT_GALLERY_DIR, file), dest)
        } catch {}
      }
    })
  }

  const allFiles = fs.readdirSync(CLIENT_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const registeredSrcs = new Set(cleaned.map((item) => item.src))

  let maxNum = 0
  cleaned.forEach((item) => {
    const match = item.code.match(/SSAW-(\d+)/)
    if (match) {
      const num = parseInt(match[1], 10)
      if (num > maxNum) maxNum = num
    }
  })

  let updated = [...cleaned]
  let added = false

  allFiles.forEach((file) => {
    const relativeSrc = `/gallery/${file}`
    if (!registeredSrcs.has(relativeSrc)) {
      maxNum++
      const code = `SSAW-${String(maxNum).padStart(3, '0')}`
      const formattedTitle = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      const title = formattedTitle.length > 5 ? formattedTitle : `Aari Blouse Design ${code}`

      updated.unshift({
        id: `gal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        code,
        title,
        category: 'Bridal Blouses',
        src: relativeSrc,
        images: [relativeSrc],
        showPrice: false,
        priceEstimate: '₹3,500 – ₹6,500',
        tags: ['New Arrival', 'Custom'],
        description: 'Custom handcrafted Aari embroidery blouse design.',
      })
      added = true
    }
  })

  updated = updated.map((item) => ({
    ...item,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images.filter(i => !i.includes('blob:')) : [item.src],
  }))

  if (added) {
    writeStorageFile(updated)
  }

  return updated
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  const existing = readStorageFile()
  const synced = syncDirectoriesAndStorage(existing)
  return NextResponse.json({ success: true, designs: synced }, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, id, showPrice, item, fileData, fileName, title, category, priceEstimate } = body
    let current = readStorageFile()

    if (action === 'upload_file' && fileData && fileName) {
      const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      const clientPath = path.join(CLIENT_GALLERY_DIR, cleanName)
      const adminPath = path.join(ADMIN_GALLERY_DIR, cleanName)

      fs.writeFileSync(clientPath, buffer)
      if (fs.existsSync(path.dirname(adminPath))) {
        try { fs.writeFileSync(adminPath, buffer) } catch {}
      }

      const relativeSrc = `/gallery/${cleanName}`
      let maxNum = 0
      current.forEach((i) => {
        const match = i.code.match(/SSAW-(\d+)/)
        if (match) {
          const num = parseInt(match[1], 10)
          if (num > maxNum) maxNum = num
        }
      })
      maxNum++
      const code = `SSAW-${String(maxNum).padStart(3, '0')}`

      const newItem: GalleryItem = {
        id: `gal-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        code,
        title: title || cleanName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        category: category || 'Bridal Blouses',
        src: relativeSrc,
        images: [relativeSrc],
        showPrice: false,
        priceEstimate: priceEstimate || '₹3,500 – ₹6,500',
        tags: ['New Arrival', 'Custom'],
        description: 'Custom handcrafted Aari embroidery blouse design.',
      }

      current.unshift(newItem)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
    }

    if (action === 'delete' && id) {
      const targetItem = current.find((i) => i.id === id)
      if (targetItem) {
        const srcsToDelete = targetItem.images || [targetItem.src]
        srcsToDelete.forEach((src) => {
          if (src.startsWith('/gallery/')) {
            const filename = src.replace('/gallery/', '')
            const clientPath = path.join(CLIENT_GALLERY_DIR, filename)
            const adminPath = path.join(ADMIN_GALLERY_DIR, filename)
            if (fs.existsSync(clientPath)) {
              try { fs.unlinkSync(clientPath) } catch {}
            }
            if (fs.existsSync(adminPath)) {
              try { fs.unlinkSync(adminPath) } catch {}
            }
          }
        })
      }
      current = current.filter((i) => i.id !== id)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
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
      return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
    }

    if (action === 'update_item' && item && item.id) {
      current = current.map((i) => (i.id === item.id ? { ...i, ...item } : i))
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
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
      const itemImages = Array.isArray(item.images) && item.images.length > 0 ? item.images.filter((i: string) => !i.includes('blob:')) : [item.src || '/gallery/0021292954d624910413c938e24cf6eb.jpg']
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        code: `SSAW-${String(maxNum).padStart(3, '0')}`,
        title: item.title || `Aari Blouse Design SSAW-${String(maxNum).padStart(3, '0')}`,
        category: item.category || 'Bridal Blouses',
        src: itemImages[0],
        images: itemImages,
        showPrice: item.showPrice || false,
        priceEstimate: item.priceEstimate || '₹3,500 – ₹6,000',
        tags: item.tags || ['Handcrafted'],
        description: item.description || 'Custom Aari work design.',
      }
      current.unshift(newItem)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
    }

    current = syncDirectoriesAndStorage(current)
    return NextResponse.json({ success: true, designs: current }, { headers: corsHeaders })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500, headers: corsHeaders })
  }
}
