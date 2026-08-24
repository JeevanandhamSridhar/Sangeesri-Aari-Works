import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SOURCE_FOLDER = 'C:\\Users\\jeeva\\Pictures\\Aari Blouse Designs'
const TARGET_FOLDER = path.join(process.cwd(), 'public', 'gallery')

export async function GET() {
  try {
    if (!fs.existsSync(TARGET_FOLDER)) {
      fs.mkdirSync(TARGET_FOLDER, { recursive: true })
    }

    let syncedCount = 0
    let totalSourceCount = 0

    if (fs.existsSync(SOURCE_FOLDER)) {
      const sourceFiles = fs.readdirSync(SOURCE_FOLDER).filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
      })

      totalSourceCount = sourceFiles.length

      for (const file of sourceFiles) {
        const srcPath = path.join(SOURCE_FOLDER, file)
        const destPath = path.join(TARGET_FOLDER, file)

        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath)
          syncedCount++
        }
      }
    }

    // List all images in target public/gallery
    const targetFiles = fs.readdirSync(TARGET_FOLDER).filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
    })

    return NextResponse.json({
      success: true,
      syncedCount,
      totalSourceCount,
      totalGalleryCount: targetFiles.length,
      files: targetFiles,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to sync gallery folder' },
      { status: 500 }
    )
  }
}

export async function POST() {
  return GET()
}
