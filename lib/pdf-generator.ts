import jsPDF from 'jspdf'

export function generateReportPDF(
  reportMarkdown: string,
  userName: string,
  businessName: string
): Buffer {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  // Configurações
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 60
  const maxWidth = pageWidth - 2 * margin
  let yPosition = margin
  let pageNumber = 1

  // Cores da Connect Academy
  const colorPrimary: [number, number, number] = [225, 181, 71] // Dourado #E1B547
  const colorSecondary: [number, number, number] = [26, 26, 26] // Preto #1A1A1A
  const colorText: [number, number, number] = [40, 40, 40]
  const colorTextLight: [number, number, number] = [100, 100, 100]

  console.log('📄 Gerando PDF com correção de tipo para deploy...')

  const addFooter = () => {
    doc.setDrawColor(...colorPrimary)
    doc.setLineWidth(0.5)
    doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colorPrimary)
    doc.text('CONNECT ACADEMY', margin, pageHeight - 30)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...colorTextLight)
    doc.text(
      'Gestão 360° - Menos teoria, mais resultado',
      margin,
      pageHeight - 20
    )
    doc.text(`Página ${pageNumber}`, pageWidth - margin, pageHeight - 30, {
      align: 'right'
    })
  }

  const checkPageBreak = (neededSpace: number = 20) => {
    if (yPosition + neededSpace > pageHeight - 50) {
      addFooter()
      doc.addPage()
      pageNumber++
      yPosition = margin
      return true
    }
    return false
  }

  const cleanText = (text: string): string => {
    const emojiAndSpecialCharRegex =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F004}-\u{1F0CF}\u{1F200}-\u{1F251}%]/gu
    return text.replace(emojiAndSpecialCharRegex, '').trim()
  }

  const renderLine = (
    text: string,
    x: number,
    options: { maxWidth: number }
  ) => {
    const lines = doc.splitTextToSize(text, options.maxWidth)
    for (const line of lines) {
      checkPageBreak(12)
      let currentX = x
      // CORREÇÃO AQUI: (p: string) => p
      const parts = line.split(/(\*\*.*?\*\*)/g).filter((p: string) => p)

      parts.forEach(part => {
        const isBold = part.startsWith('**') && part.endsWith('**')
        const textPart = isBold ? part.slice(2, -2) : part
        doc.setFont('helvetica', isBold ? 'bold' : 'normal')
        doc.text(textPart, currentX, yPosition)
        currentX += doc.getTextWidth(textPart)
      })
      yPosition += 12
    }
  }

  // ============ CABEÇALHO E TÍTULO ============
  doc.setFillColor(...colorSecondary)
  doc.rect(0, 0, pageWidth, 60, 'F')
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...colorPrimary)
  doc.text('CONNECT ACADEMY', pageWidth / 2, 35, { align: 'center' })
  yPosition = 90

  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...colorSecondary)
  doc.text('Diagnóstico Empresarial', pageWidth / 2, yPosition, {
    align: 'center'
  })
  yPosition += 30

  doc.setFontSize(18)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colorPrimary)
  doc.text(businessName.toUpperCase(), pageWidth / 2, yPosition, {
    align: 'center'
  })
  yPosition += 20

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colorTextLight)
  const dataRelatorio = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  doc.text(`Gerado em ${dataRelatorio}`, pageWidth / 2, yPosition, {
    align: 'center'
  })
  yPosition += 25

  doc.setDrawColor(...colorPrimary)
  doc.setLineWidth(2)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 30

  // ============ PROCESSAR CONTEÚDO ============
  const lines = reportMarkdown.replace(/\r\n/g, '\n').split('\n')

  for (let i = 0; i < lines.length; i++) {
    let line = cleanText(lines[i])
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine === '#') {
      continue
    }

    checkPageBreak(40)

    if (trimmedLine.startsWith('# ')) {
      yPosition += 15
      doc.setFillColor(...colorPrimary)
      doc.rect(margin, yPosition - 14, maxWidth, 24, 'F')
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text(trimmedLine.substring(2), margin + 10, yPosition)
      yPosition += 30
    } else if (trimmedLine.startsWith('## ')) {
      yPosition += 15
      doc.setFillColor(colorSecondary[0], colorSecondary[1], colorSecondary[2])
      doc.rect(margin - 10, yPosition - 11, 3, 14, 'F')
      doc.setFontSize(15)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...colorSecondary)
      renderLine(trimmedLine.substring(3), margin, { maxWidth })
      yPosition += 8
    } else if (trimmedLine.startsWith('### ')) {
      yPosition += 12
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...colorPrimary)
      renderLine(trimmedLine.substring(4), margin, { maxWidth })
      yPosition += 6
    } else if (trimmedLine.startsWith('#### ')) {
      yPosition += 8
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...colorText)
      renderLine(trimmedLine.substring(5), margin, { maxWidth })
      yPosition += 2
    } else if (trimmedLine.match(/^[-*]\s/)) {
      const listText = trimmedLine.substring(2)
      doc.setFillColor(...colorPrimary)
      doc.circle(margin + 3, yPosition - 2, 2, 'F')
      doc.setFontSize(10)
      doc.setTextColor(...colorText)
      renderLine(listText, margin + 12, { maxWidth: maxWidth - 12 })
    } else if (trimmedLine.match(/^[-]{3,}$/)) {
      yPosition += 8
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 15
    } else {
      doc.setFontSize(10)
      doc.setTextColor(...colorText)
      renderLine(line, margin, { maxWidth })
      yPosition += 8
    }
  }

  addFooter()
  console.log('✅ PDF final gerado com sucesso!')
  return Buffer.from(doc.output('arraybuffer'))
}
