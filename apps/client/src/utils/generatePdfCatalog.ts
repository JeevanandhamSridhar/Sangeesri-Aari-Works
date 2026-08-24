import { jsPDF } from 'jspdf'
import { GalleryDesign } from '@/data/galleryData'

/**
 * Converts an image URL into a base64 Data URL for embedding into jsPDF
 */
async function urlToBase64(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null)
      return
    }
    const img = new window.Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || img.width || 400
        canvas.height = img.naturalHeight || img.height || 500
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const dataURL = canvas.toDataURL('image/jpeg', 0.85)
          resolve(dataURL)
          return
        }
      } catch (e) {
        console.warn('Canvas conversion failed for PDF image:', e)
      }
      resolve(null)
    }
    img.onerror = () => {
      resolve(null)
    }
    img.src = url
  })
}

export async function generatePdfCatalog(designs: GalleryDesign[], isBulkPriceVisible: boolean = false) {
  // Pre-convert all design images to Base64 in parallel for embedded PDF rendering
  const imageMap = new Map<string, string | null>()
  await Promise.all(
    designs.map(async (d) => {
      if (d.src) {
        const b64 = await urlToBase64(d.src)
        imageMap.set(d.id, b64)
      }
    })
  )

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Helper colors
  const goldRgb = [212, 175, 55] // #D4AF37
  const darkRgb = [12, 9, 6]     // #0C0906

  // Draw Luxury Gold Crown / Mandala Emblem
  const drawLuxuryEmblem = (cx: number, cy: number, r: number) => {
    doc.setDrawColor(212, 175, 55)
    doc.setLineWidth(0.6)
    doc.circle(cx, cy, r, 'D')
    doc.setLineWidth(0.2)
    doc.circle(cx, cy, r - 1.5, 'D')

    // Inner Star / Diamond Symbol
    doc.setFillColor(212, 175, 55)
    doc.triangle(cx, cy - r + 3, cx + 2.5, cy, cx - 2.5, cy, 'F')
    doc.triangle(cx, cy + r - 3, cx + 2.5, cy, cx - 2.5, cy, 'F')
  }

  // Header & Footer helper for subsequent pages
  const addHeaderFooter = (pageNo: number, totalPages: number) => {
    if (pageNo === 1) return // Skip cover page

    // Top Header Bar
    doc.setFillColor(12, 9, 6)
    doc.rect(0, 0, pageWidth, 18, 'F')

    // Mini Emblem
    drawLuxuryEmblem(18, 9, 5)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(212, 175, 55)
    doc.text('SANGEE SRI AARI WORKS', 27, 11)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(200, 200, 200)
    doc.text('Instagram: @sangeesri_aari_works', pageWidth - 14, 11, { align: 'right' })

    doc.setDrawColor(212, 175, 55)
    doc.setLineWidth(0.4)
    doc.line(14, 18, pageWidth - 14, 18)

    // Bottom Footer Bar
    doc.setFillColor(12, 9, 6)
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('Kaveripakkam, Ranipet District — 632 508 | WhatsApp & Phone: +91 76048 87356', 14, pageHeight - 5)
    doc.text(`Page ${pageNo} of ${totalPages}`, pageWidth - 14, pageHeight - 5, { align: 'right' })
  }

  // ── PAGE 1: LUXURY COVER PAGE ───────────────────────────────────
  doc.setFillColor(12, 9, 6)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Double Gold Border Frame
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(1)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
  doc.setLineWidth(0.3)
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24)

  // Top Luxury Emblem
  drawLuxuryEmblem(pageWidth / 2, 55, 14)

  // Brand Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(212, 175, 55)
  doc.text('SANGEE SRI AARI WORKS', pageWidth / 2, 82, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(220, 200, 150)
  doc.text('HIGH-END BRIDAL BLOUSE & HANDCRAFTED EMBROIDERY STUDIO', pageWidth / 2, 91, { align: 'center' })

  // Decorative Line
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(0.5)
  doc.line(pageWidth / 2 - 45, 98, pageWidth / 2 + 45, 98)

  // Brochure Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('OFFICIAL DESIGN CATALOGUE', pageWidth / 2, 118, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(180, 180, 180)
  doc.text(`Featuring ${designs.length} Handcrafted Blouse Designs with Design Verification Codes`, pageWidth / 2, 126, { align: 'center' })

  // Studio & Contact Card Box
  doc.setFillColor(25, 20, 15)
  doc.roundedRect(25, 145, pageWidth - 50, 88, 4, 4, 'F')
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(0.5)
  doc.roundedRect(25, 145, pageWidth - 50, 88, 4, 4, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(212, 175, 55)
  doc.text('STUDIO INFORMATION & BOOKINGS', pageWidth / 2, 158, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(240, 240, 240)
  doc.text('Founder & Lead Designer: Kaviya S', pageWidth / 2, 168, { align: 'center' })
  doc.setFontSize(8)
  doc.setTextColor(200, 180, 130)
  doc.text('(Joint Secretary of Ranipet District, Indian Aari Work Federation)', pageWidth / 2, 174, { align: 'center' })

  doc.setFontSize(9)
  doc.setTextColor(230, 230, 230)
  doc.text('Address: No. 6, Bazaar Street, Kaveripakkam, Ranipet District — 632 508, Tamil Nadu', pageWidth / 2, 184, { align: 'center' })
  doc.text('WhatsApp & Phone Direct: +91 76048 87356', pageWidth / 2, 192, { align: 'center' })
  doc.text('Instagram Portfolio: @sangeesri_aari_works', pageWidth / 2, 200, { align: 'center' })
  doc.text('Official Website: https://sangeesriaariworks.com', pageWidth / 2, 208, { align: 'center' })
  doc.text('Specialization: Bridal Blouses, Zardosi, Kundan, Maggam & Cutwork', pageWidth / 2, 216, { align: 'center' })

  doc.setFontSize(8)
  doc.setTextColor(140, 140, 140)
  doc.text(`Catalogue Issue Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, 262, { align: 'center' })

  // ── PAGE 2: INDEX / TABLE OF CONTENTS ──────────────────────────
  doc.addPage()
  doc.setFillColor(252, 250, 245)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(12, 9, 6)
  doc.text('DESIGN CATALOGUE INDEX', 14, 28)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(100, 100, 100)
  doc.text('Quick reference index of all designs with unique design codes for WhatsApp quotes:', 14, 34)

  // Table Header
  let yPos = 42
  doc.setFillColor(12, 9, 6)
  doc.rect(14, yPos, pageWidth - 28, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(212, 175, 55)
  doc.text('CODE', 18, yPos + 5.5)
  doc.text('DESIGN TITLE', 45, yPos + 5.5)
  doc.text('CATEGORY', 125, yPos + 5.5)
  doc.text('PRICE STATUS', pageWidth - 18, yPos + 5.5, { align: 'right' })

  yPos += 8

  designs.slice(0, 24).forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(245, 240, 230)
      doc.rect(14, yPos, pageWidth - 28, 7, 'F')
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(12, 9, 6)
    doc.text(item.code, 18, yPos + 4.8)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    const titleTrunc = item.title.length > 38 ? item.title.substring(0, 36) + '...' : item.title
    doc.text(titleTrunc, 45, yPos + 4.8)

    doc.text(item.category, 125, yPos + 4.8)

    const canShowPrice = isBulkPriceVisible || item.showPrice
    const priceText = canShowPrice ? (item.priceEstimate || 'Available') : 'Price on Request'
    doc.setFont('helvetica', canShowPrice ? 'bold' : 'italic')
    doc.setTextColor(canShowPrice ? 30 : 120, canShowPrice ? 120 : 120, canShowPrice ? 30 : 120)
    doc.text(priceText, pageWidth - 18, yPos + 4.8, { align: 'right' })

    yPos += 7
  })

  // ── SUBSEQUENT PAGES: DESIGN CARDS WITH EMBEDDED HIGH-RES PHOTOS ─────
  const itemsPerPage = 3

  for (let i = 0; i < designs.length; i += itemsPerPage) {
    doc.addPage()
    doc.setFillColor(252, 250, 245)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    const pageItems = designs.slice(i, i + itemsPerPage)
    let cardY = 24

    pageItems.forEach((item) => {
      // Main Card Frame
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(14, cardY, pageWidth - 28, 78, 3, 3, 'F')
      doc.setDrawColor(220, 210, 190)
      doc.setLineWidth(0.3)
      doc.roundedRect(14, cardY, pageWidth - 28, 78, 3, 3, 'D')

      // Left Image Box (Width: 62mm, Height: 70mm)
      const imgX = 18
      const imgY = cardY + 4
      const imgW = 58
      const imgH = 70

      doc.setFillColor(245, 240, 230)
      doc.roundedRect(imgX, imgY, imgW, imgH, 2, 2, 'F')
      doc.setDrawColor(212, 175, 55)
      doc.setLineWidth(0.3)
      doc.roundedRect(imgX, imgY, imgW, imgH, 2, 2, 'D')

      // Check if image Base64 exists and embed image
      const b64Data = imageMap.get(item.id)
      if (b64Data) {
        try {
          doc.addImage(b64Data, 'JPEG', imgX + 1, imgY + 1, imgW - 2, imgH - 2)
        } catch (e) {
          console.warn('Failed to embed image in PDF:', e)
        }
      } else {
        // Fallback info if base64 conversion failed
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(150, 130, 90)
        doc.text('SSAW DESIGN', imgX + imgW / 2, imgY + 30, { align: 'center' })
        doc.text(item.code, imgX + imgW / 2, imgY + 36, { align: 'center' })
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(140, 140, 140)
        doc.text('View Photo Online', imgX + imgW / 2, imgY + 44, { align: 'center' })
      }

      // Code Badge Banner on Image
      doc.setFillColor(12, 9, 6)
      doc.roundedRect(imgX + 2, imgY + 2, 26, 6, 1.5, 1.5, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7.5)
      doc.setTextColor(212, 175, 55)
      doc.text(item.code, imgX + 15, imgY + 6.2, { align: 'center' })

      // Right Content Info
      const contentX = 82

      // Category Pill
      doc.setFillColor(240, 230, 205)
      doc.roundedRect(contentX, cardY + 6, 42, 5, 1.5, 1.5, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(140, 100, 10)
      doc.text(item.category.toUpperCase(), contentX + 3, cardY + 9.5)

      // Design Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(12, 9, 6)
      doc.text(item.title, contentX, cardY + 18)

      // Description
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(70, 70, 70)
      const descText = item.description || 'Custom handcrafted Aari embroidery blouse design tailored to your measurements.'
      const descLines = doc.splitTextToSize(descText, pageWidth - contentX - 18)
      doc.text(descLines, contentX, cardY + 24)

      // Tags
      if (item.tags && item.tags.length > 0) {
        doc.setFontSize(7.5)
        doc.setTextColor(130, 105, 35)
        doc.text(`Tags: ${item.tags.join(' • ')}`, contentX, cardY + 42)
      }

      // Divider Line
      doc.setDrawColor(230, 220, 200)
      doc.setLineWidth(0.3)
      doc.line(contentX, cardY + 46, pageWidth - 18, cardY + 46)

      // Price / Quote Box
      const canShowPrice = isBulkPriceVisible || item.showPrice

      if (canShowPrice) {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(7.5)
        doc.setTextColor(140, 100, 10)
        doc.text('ESTIMATED PRICE RANGE:', contentX, cardY + 53)

        doc.setFontSize(11)
        doc.setTextColor(12, 9, 6)
        doc.text(item.priceEstimate || '₹3,500 – ₹6,500', contentX, cardY + 60)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(120, 120, 120)
        doc.text('* Final cost depends on work density, fabric material, and size.', contentX, cardY + 66)
      } else {
        doc.setFillColor(245, 245, 245)
        doc.roundedRect(contentX, cardY + 50, pageWidth - contentX - 20, 18, 2, 2, 'F')

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8.5)
        doc.setTextColor(12, 9, 6)
        doc.text('PRICE ON REQUEST', contentX + 4, cardY + 56)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(90, 90, 90)
        doc.text(`Quote Design Code "${item.code}" on WhatsApp: +91 76048 87356`, contentX + 4, cardY + 62)
      }

      cardY += 84
    })
  }

  // Add headers & footers across all pages
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    addHeaderFooter(p, totalPages)
  }

  // Trigger browser download
  doc.save(`Sangee-Sri-Aari-Works-Official-Brochure-${new Date().toISOString().slice(0, 10)}.pdf`)
}
