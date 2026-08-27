import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const JSON_PATH = path.join(process.cwd(), 'src/data/quotations-storage.json')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export interface QuotationRecord {
  id: string
  quotationNumber: string
  customerName: string
  customerPhone: string
  occasion: string
  blouseType: string
  budget: string
  deadline: string
  notes: string
  status: string
  date: string
}

function readQuotationsFile(): QuotationRecord[] {
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

function writeQuotationsFile(items: QuotationRecord[]) {
  try {
    const dir = path.dirname(JSON_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(JSON_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error writing quotations storage JSON:', err)
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  const records = readQuotationsFile()
  return NextResponse.json({ success: true, quotations: records }, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { quotation } = body
    let records = readQuotationsFile()

    if (quotation) {
      records.unshift(quotation)
      writeQuotationsFile(records)
    }

    return NextResponse.json({ success: true, quotations: records }, { headers: corsHeaders })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500, headers: corsHeaders })
  }
}
