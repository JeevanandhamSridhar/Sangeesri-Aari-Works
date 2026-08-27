import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), '../client/src/data/gallery-storage.json')
const ADMIN_GALLERY_DIR = path.join(process.cwd(), 'public/gallery')
const CLIENT_GALLERY_DIR = path.join(process.cwd(), '../client/public/gallery')

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
  hidden?: boolean
}

function readStorageFile(): GalleryItem[] {
  try {
    if (!fs.existsSync(JSON_PATH)) {
      return []
    }
    const raw = fs.readFileSync(JSON_PATH, 'utf-8')
    const parsed: GalleryItem[] = JSON.parse(raw)
    const cleaned = parsed.filter((item) => !item.src.includes('blob:'))
    cleaned.sort((a, b) => {
      const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
      const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
      return numA - numB
    })
    return cleaned
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
    const cleanItems = items.filter((item) => !item.src.includes('blob:'))
    cleanItems.sort((a, b) => {
      const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
      const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
      return numA - numB
    })
    fs.writeFileSync(JSON_PATH, JSON.stringify(cleanItems, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing gallery storage JSON:', err)
  }
}

function syncDirectoriesAndStorage(existingItems: GalleryItem[]): GalleryItem[] {
  let cleaned = existingItems.filter((item) => !item.src.includes('blob:'))

  if (!fs.existsSync(ADMIN_GALLERY_DIR)) {
    fs.mkdirSync(ADMIN_GALLERY_DIR, { recursive: true })
  }
  if (!fs.existsSync(CLIENT_GALLERY_DIR)) {
    try {
      fs.mkdirSync(CLIENT_GALLERY_DIR, { recursive: true })
    } catch {}
  }

  const adminFiles = fs.readdirSync(ADMIN_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  let clientFiles: string[] = []
  if (fs.existsSync(CLIENT_GALLERY_DIR)) {
    clientFiles = fs.readdirSync(CLIENT_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  }

  if (fs.existsSync(CLIENT_GALLERY_DIR)) {
    adminFiles.forEach((file) => {
      const dest = path.join(CLIENT_GALLERY_DIR, file)
      if (!fs.existsSync(dest)) {
        try {
          fs.copyFileSync(path.join(ADMIN_GALLERY_DIR, file), dest)
        } catch {}
      }
    })
  }

  clientFiles.forEach((file) => {
    const dest = path.join(ADMIN_GALLERY_DIR, file)
    if (!fs.existsSync(dest)) {
      try {
        fs.copyFileSync(path.join(CLIENT_GALLERY_DIR, file), dest)
      } catch {}
    }
  })

  const allFiles = fs.readdirSync(ADMIN_GALLERY_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  const registeredSrcs = new Set()
  cleaned.forEach((item) => {
    registeredSrcs.add(item.src)
    if (Array.isArray(item.images)) {
      item.images.forEach((imgSrc) => registeredSrcs.add(imgSrc))
    }
  })

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

  const unassignedFiles = allFiles.filter((f) => !registeredSrcs.has(`/gallery/${f}`))

  unassignedFiles.forEach((file) => {
    const relativeSrc = `/gallery/${file}`
    maxNum++
    const code = `SSAW-${String(maxNum).padStart(3, '0')}`
    const formattedTitle = file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    const title = formattedTitle.length > 5 ? formattedTitle : `Aari Blouse Design ${code}`

    updated.push({
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
      hidden: false,
    })
    added = true
  })

  updated = updated.map((item) => ({
    ...item,
    images: Array.isArray(item.images) && item.images.length > 0
      ? item.images.filter((i) => !i.includes('blob:'))
      : [item.src],
  }))

  updated.sort((a, b) => {
    const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
    const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
    return numA - numB
  })

  if (added) {
    writeStorageFile(updated)
  }

  return updated
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('admin') === 'true'

  const existing = readStorageFile()
  const synced = syncDirectoriesAndStorage(existing)
  
  const filtered = isAdmin ? synced : synced.filter((item) => !item.hidden)

  return NextResponse.json({ success: true, designs: filtered })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, id, showPrice, hidden, item, fileData, fileName, title, category, priceEstimate, images } = body
    let current = readStorageFile()

    if (action === 'upload_file' && fileData && fileName) {
      const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      const adminPath = path.join(ADMIN_GALLERY_DIR, cleanName)
      const clientPath = path.join(CLIENT_GALLERY_DIR, cleanName)

      fs.writeFileSync(adminPath, buffer)
      if (fs.existsSync(path.dirname(clientPath))) {
        try { fs.writeFileSync(clientPath, buffer) } catch {}
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
        images: Array.isArray(images) && images.length > 0 ? images : [relativeSrc],
        showPrice: false,
        priceEstimate: priceEstimate || '₹3,500 – ₹6,500',
        tags: ['New Arrival', 'Custom'],
        description: 'Custom handcrafted Aari embroidery blouse design.',
        hidden: false,
      }

      current.push(newItem)
      current.sort((a, b) => {
        const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
        const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
        return numA - numB
      })
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'delete' && id) {
      const targetItem = current.find((i) => i.id === id)
      if (targetItem) {
        const srcsToDelete = targetItem.images || [targetItem.src]
        srcsToDelete.forEach((src) => {
          if (src.startsWith('/gallery/')) {
            const filename = src.replace('/gallery/', '')
            const adminPath = path.join(ADMIN_GALLERY_DIR, filename)
            const clientPath = path.join(CLIENT_GALLERY_DIR, filename)
            if (fs.existsSync(adminPath)) {
              try { fs.unlinkSync(adminPath) } catch {}
            }
            if (fs.existsSync(clientPath)) {
              try { fs.unlinkSync(clientPath) } catch {}
            }
          }
        })
      }
      current = current.filter((i) => i.id !== id)
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    if (action === 'toggle_hidden' && id) {
      current = current.map((i) =>
        i.id === id ? { ...i, hidden: typeof hidden === 'boolean' ? hidden : !i.hidden } : i
      )
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
      current.sort((a, b) => {
        const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
        const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
        return numA - numB
      })
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
      const itemImages = Array.isArray(item.images) && item.images.length > 0 ? item.images.filter((i: string) => !i.includes('blob:')) : [item.src || '/gallery/0021292954d624910413c938e24cf6eb.jpg']
      const newItem: GalleryItem = {
        id: `gal-${Date.now()}`,
        code: item.code || `SSAW-${String(maxNum).padStart(3, '0')}`,
        title: item.title || `Aari Blouse Design ${item.code || `SSAW-${String(maxNum).padStart(3, '0')}`}`,
        category: item.category || 'Bridal Blouses',
        src: itemImages[0],
        images: itemImages,
        showPrice: item.showPrice || false,
        priceEstimate: item.priceEstimate || '₹3,500 – ₹6,000',
        tags: item.tags || ['Handcrafted'],
        description: item.description || 'Custom Aari work design.',
        hidden: false,
      }
      current.push(newItem)
      current.sort((a, b) => {
        const numA = parseInt(a.code.replace(/\D/g, ''), 10) || 0
        const numB = parseInt(b.code.replace(/\D/g, ''), 10) || 0
        return numA - numB
      })
      writeStorageFile(current)
      return NextResponse.json({ success: true, designs: current })
    }

    current = syncDirectoriesAndStorage(current)
    return NextResponse.json({ success: true, designs: current })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
