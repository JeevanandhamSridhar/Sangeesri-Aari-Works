import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), 'src/data/about-storage.json')
const CLIENT_ABOUT_DIR = path.join(process.cwd(), 'public/about')
const ADMIN_ABOUT_DIR = path.join(process.cwd(), '../admin/public/about')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function readAboutFile() {
  try {
    if (!fs.existsSync(JSON_PATH)) return null
    const raw = fs.readFileSync(JSON_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeAboutFile(data: any) {
  try {
    const dir = path.dirname(JSON_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing about storage JSON:', err)
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  const data = readAboutFile()
  return NextResponse.json({ success: true, data }, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data, fileData, fileName } = body

    if (action === 'upload_file' && fileData && fileName) {
      if (!fs.existsSync(CLIENT_ABOUT_DIR)) fs.mkdirSync(CLIENT_ABOUT_DIR, { recursive: true })
      if (!fs.existsSync(ADMIN_ABOUT_DIR)) {
        try { fs.mkdirSync(ADMIN_ABOUT_DIR, { recursive: true }) } catch {}
      }

      const cleanName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '')
      const buffer = Buffer.from(base64Data, 'base64')

      fs.writeFileSync(path.join(CLIENT_ABOUT_DIR, cleanName), buffer)
      if (fs.existsSync(ADMIN_ABOUT_DIR)) {
        try { fs.writeFileSync(path.join(ADMIN_ABOUT_DIR, cleanName), buffer) } catch {}
      }

      const relativeSrc = `/about/${cleanName}`
      return NextResponse.json({ success: true, uploadedSrc: relativeSrc }, { headers: corsHeaders })
    }

    if (action === 'update_about' && data) {
      writeAboutFile(data)
      return NextResponse.json({ success: true, data }, { headers: corsHeaders })
    }

    return NextResponse.json({ success: true, data: readAboutFile() }, { headers: corsHeaders })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500, headers: corsHeaders })
  }
}
