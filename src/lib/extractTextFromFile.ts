async function extractFromPdf(file: File): Promise<string> {
  const [pdfjsLib, { default: pdfWorkerUrl }] = await Promise.all([
    import('pdfjs-dist'),
    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
  ])
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ')
    pages.push(text)
  }
  return pages.join('\n\n')
}

async function extractFromDocx(file: File): Promise<string> {
  const mammoth = await import('mammoth')
  const buffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer: buffer })
  return result.value
}

async function extractFromTxt(file: File): Promise<string> {
  return file.text()
}

/** Extrai texto de .pdf, .docx ou .txt para reaproveitar no fluxo de extração por IA já existente.
 *  As libs de parsing são carregadas sob demanda (import dinâmico) para não engordar o bundle inicial. */
export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase()

  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    return extractFromPdf(file)
  }
  if (name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractFromDocx(file)
  }
  if (name.endsWith('.txt') || file.type === 'text/plain') {
    return extractFromTxt(file)
  }
  throw new Error('Formato não suportado. Envie um arquivo .pdf, .docx ou .txt.')
}
