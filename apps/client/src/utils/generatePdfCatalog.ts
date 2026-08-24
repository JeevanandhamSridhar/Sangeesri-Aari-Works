import { jsPDF } from 'jspdf'
import { GalleryDesign } from '@/data/galleryData'

export function generatePdfCatalog(designs: GalleryDesign[], isBulkPriceVisible: boolean = false) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  // Helper colors
  const goldRgb = [212, 175, 55] // #D4AF37
  const darkRgb = [15, 12, 9]    // #0F0C09
  const textRgb = [40, 40, 40]

  // Header & Footer helper for subsequent pages
  const addHeaderFooter = (pageNo: number, totalPages: number) => {
    if (pageNo === 1) return // Skip cover page

    // Header
    doc.setFillColor(15, 12, 9)
    doc.rect(0, 0, pageWidth, 18, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(212, 175, 55)
    doc.text('SANGEE SRI AARI WORKS', 14, 11)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(200, 200, 200)
    doc.text('Instagram: @sangeesri_aari_works', pageWidth - 14, 11, { align: 'right' })

    doc.setDrawColor(212, 175, 55)
    doc.setLineWidth(0.4)
    doc.line(14, 18, pageWidth - 14, 18)

    // Footer
    doc.setFillColor(15, 12, 9)
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('Kaveripakkam, Ranipet Dist. | Phone: +91 76048 87356', 14, pageHeight - 5)
    doc.text(`Page ${pageNo} of ${totalPages}`, pageWidth - 14, pageHeight - 5, { align: 'right' })
  }

  // ── PAGE 1: LUXURY COVER PAGE ───────────────────────────────────
  // Dark Background with Gold Border
  doc.setFillColor(15, 12, 9)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Gold Inner Frame Lines
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(1)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
  doc.setLineWidth(0.3)
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24)

  // Top Logo Crown / Ornament Symbol
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(212, 175, 55)
  doc.text('👑', pageWidth / 2, 60, { align: 'center' })

  // Main Brand Title
  doc.setFontSize(24)
  doc.text('SANGEE SRI AARI WORKS', pageWidth / 2, 78, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(220, 200, 150)
  doc.text('HIGH-END BRIDAL BLOUSE & AARI EMBROIDERY STUDIO', pageWidth / 2, 88, { align: 'center' })

  // Divider Line
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(0.5)
  doc.line(pageWidth / 2 - 40, 96, pageWidth / 2 + 40, 96)

  // Catalog Subtitle
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('OFFICIAL DESIGN CATALOGUE', pageWidth / 2, 120, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(180, 180, 180)
  doc.text(`Featuring ${designs.length} Exclusive Handcrafted Blouse Designs`, pageWidth / 2, 128, { align: 'center' })

  // Details Card Box
  doc.setFillColor(30, 25, 20)
  doc.roundedRect(30, 150, pageWidth - 60, 75, 4, 4, 'F')
  doc.setDrawColor(212, 175, 55)
  doc.setLineWidth(0.4)
  doc.roundedRect(30, 150, pageWidth - 60, 75, 4, 4, 'D')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(212, 175, 55)
  doc.text('STUDIO & CONTACT INFORMATION', pageWidth / 2, 163, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(230, 230, 230)
  doc.text('Lead Designer: Kaviya S (Joint Secretary, Indian Aari Work Federation)', pageWidth / 2, 173, { align: 'center' })
  doc.text('Location: Kaveripakkam, Ranipet District, Tamil Nadu', pageWidth / 2, 181, { align: 'center' })
  doc.text('Direct Orders & WhatsApp Inquiry: +91 76048 87356', pageWidth / 2, 189, { align: 'center' })
  doc.text('Instagram Portfolio: @sangeesri_aari_works', pageWidth / 2, 197, { align: 'center' })
  doc.text('Website: https://sangeesriaariworks.com', pageWidth / 2, 205, { align: 'center' })

  doc.setFontSize(8)
  doc.setTextColor(140, 140, 140)
  doc.text(`Catalogue Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, 260, { align: 'center' })

  // ── PAGE 2: INDEX / TABLE OF CONTENTS ──────────────────────────
  doc.addPage()
  doc.setFillColor(252, 250, 245)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(15, 12, 9)
  doc.text('DESIGN CATALOGUE INDEX', 14, 28)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100, 100, 100)
  doc.text('Quick Reference list of all designs and unique SSAW Codes:', 14, 34)

  // Table Headers
  let yPos = 42
  doc.setFillColor(15, 12, 9)
  doc.rect(14, yPos, pageWidth - 28, 8, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(212, 175, 55)
  doc.text('CODE', 18, yPos + 5.5)
  doc.text('DESIGN TITLE', 45, yPos + 5.5)
  doc.text('CATEGORY', 125, yPos + 5.5)
  doc.text('PRICE STATUS', pageWidth - 18, yPos + 5.5, { align: 'right' })

  yPos += 8

  designs.slice(0, 22).forEach((item, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(245, 240, 230)
      doc.rect(14, yPos, pageWidth - 28, 7, 'F')
    }
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(15, 12, 9)
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

  // ── SUBSEQUENT PAGES: DESIGN CARDS GRID ─────────────────────────
  let currentPage = 3
  const itemsPerPage = 3
  const totalDesignPages = Math.ceil(designs.length / itemsPerPage)

  for (let i = 0; i < designs.length; i += itemsPerPage) {
    doc.addPage()
    doc.setFillColor(252, 250, 245)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    const pageItems = designs.slice(i, i + itemsPerPage)
    let cardY = 24

    pageItems.forEach((item) => {
      // Card Frame Box
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(14, cardY, pageWidth - 28, 78, 3, 3, 'F')
      doc.setDrawColor(220, 210, 190)
      doc.setLineWidth(0.3)
      doc.roundedRect(14, cardY, pageWidth - 28, 78, 3, 3, 'D')

      // Left Image Placeholder Badge Box
      doc.setFillColor(245, 240, 230)
      doc.roundedRect(18, cardY + 4, 65, 70, 2, 2, 'F')
      doc.setDrawColor(212, 175, 55)
      doc.setLineWidth(0.4)
      doc.roundedRect(18, cardY + 4, 65, 70, 2, 2, 'D')

      // Badge Code in Box
      doc.setFillColor(15, 12, 9)
      doc.roundedRect(22, cardY + 8, 35, 7, 2, 2, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(212, 175, 55)
      doc.text(item.code, 39.5, cardY + 12.8, { align: 'center' })

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(15, 12, 9)
      doc.text('HIGH-RES PHOTO', 50.5, cardY + 36, { align: 'center' })
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(120, 120, 120)
      doc.text('View on Web / Instagram', 50.5, cardY + 42, { align: 'center' })
      doc.text(`@sangeesri_aari_works`, 50.5, cardY + 47, { align: 'center' })

      // Right Content Info
      const contentX = 90

      // Category Pill
      doc.setFillColor(240, 230, 205)
      doc.roundedRect(contentX, cardY + 6, 45, 5, 1.5, 1.5, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(7)
      doc.setTextColor(140, 100, 10)
      doc.text(item.category.toUpperCase(), contentX + 3, cardY + 9.5)

      // Title
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(15, 12, 9)
      doc.text(item.title, contentX, cardY + 18)

      // Description
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(80, 80, 80)
      const descText = item.description || 'Custom handcrafted Aari embroidery blouse design tailored to your measurements.'
      const descLines = doc.splitTextToSize(descText, pageWidth - contentX - 20)
      doc.text(descLines, contentX, cardY + 24)

      // Tags
      if (item.tags && item.tags.length > 0) {
        doc.setFontSize(7.5)
        doc.setTextColor(120, 100, 40)
        doc.text(`Tags: ${item.tags.join(' • ')}`, contentX, cardY + 42)
      }

      // Price Box Divider & Info
      doc.setDrawColor(230, 220, 200)
      doc.setLineWidth(0.3)
      doc.line(contentX, cardY + 46, pageWidth - 20, cardY + 46)

      const canShowPrice = isBulkPriceVisible || item.showPrice

      if (canShowPrice) {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8)
        doc.setTextColor(140, 100, 10)
        doc.text('ESTIMATED PRICE RANGE:', contentX, cardY + 53)

        doc.setFontSize(11)
        doc.setTextColor(15, 12, 9)
        doc.text(item.priceEstimate || '₹3,500 – ₹6,500', contentX, cardY + 60)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(120, 120, 120)
        doc.text('* Final cost depends on work density, fabric material, and size.', contentX, cardY + 66)
      } else {
        doc.setFillColor(245, 245, 245)
        doc.roundedRect(contentX, cardY + 50, pageWidth - contentX - 22, 18, 2, 2, 'F')

        doc.setFont('helvetica', 'bold')
        doc.setFontSize(8.5)
        doc.setTextColor(15, 12, 9)
        doc.text('PRICE ON REQUEST', contentX + 4, cardY + 56)

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7.5)
        doc.setTextColor(100, 100, 100)
        doc.text(`WhatsApp Code "${item.code}" to +91 76048 87356 for custom quote`, contentX + 4, cardY + 62)
      }

      cardY += 84
    })

    currentPage++
  }

  // Add headers & footers across all pages
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    addHeaderFooter(p, totalPages)
  }

  // Trigger browser download
  doc.save(`Sangee-Sri-Aari-Works-Catalog-${new Date().toISOString().slice(0, 10)}.pdf`)
}
