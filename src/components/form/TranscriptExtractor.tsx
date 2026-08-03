import { useRef, useState } from 'react'
import { Paperclip, Sparkles } from 'lucide-react'
import { extractOnboardingFromTranscript, type ExtractedFields } from '../../lib/extractOnboarding'
import { extractTextFromFile } from '../../lib/extractTextFromFile'
import { cn } from '../../lib/utils'

type Tab = 'paste' | 'file'

const MAX_CHARS = 80000

export function TranscriptExtractor({ onExtracted }: { onExtracted: (fields: ExtractedFields) => void }) {
  const [tab, setTab] = useState<Tab>('paste')
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [readingFile, setReadingFile] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileSelected(file: File) {
    setError(null)
    setApplied(false)
    setFileName(file.name)
    setReadingFile(true)
    try {
      const text = await extractTextFromFile(file)
      if (text.trim().length < 20) {
        setError('Não conseguimos extrair texto suficiente desse arquivo. Confira se ele não é uma imagem escaneada.')
        return
      }
      setTranscript(text)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao ler o arquivo.')
    } finally {
      setReadingFile(false)
    }
  }

  const overLimit = transcript.length > MAX_CHARS

  async function handleExtract() {
    if (transcript.trim().length < 20) {
      setError('Cole a transcrição/resumo da call, ou anexe um arquivo, primeiro.')
      return
    }
    if (overLimit) {
      setError(`Texto muito longo (${transcript.length.toLocaleString('pt-BR')} caracteres). Reduza para até ${MAX_CHARS.toLocaleString('pt-BR')} antes de extrair.`)
      return
    }
    setError(null)
    setApplied(false)
    setLoading(true)
    try {
      const fields = await extractOnboardingFromTranscript(transcript)
      onExtracted(fields)
      setApplied(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao extrair dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-brand/30 bg-gradient-to-br from-brand/10 to-brand/5 p-6 shadow-lg shadow-brand/5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-brand" />
        <h2 className="font-medium text-bone">Preencher a partir da call</h2>
      </div>
      <p className="mb-3 text-sm text-bone/60">
        Cole ou anexe a transcrição/resumo da call. Preenche automaticamente os blocos 1 (negócio), 6 (caminho do
        paciente), 10 (checklist), 11 (comunicação) e 12 (primeiros 30 dias) — revise e ajuste antes de gerar. Dados
        financeiros e ICP/território continuam manuais.
      </p>

      <div className="mb-3 flex gap-1 rounded-lg border border-white/10 bg-obsidian-field p-1 text-sm">
        <button
          type="button"
          onClick={() => setTab('paste')}
          className={cn('flex-1 rounded px-3 py-1.5 transition-colors', tab === 'paste' ? 'bg-brand text-brand-dark font-medium' : 'text-bone/60 hover:text-bone')}
        >
          Colar texto
        </button>
        <button
          type="button"
          onClick={() => setTab('file')}
          className={cn('flex-1 rounded px-3 py-1.5 transition-colors', tab === 'file' ? 'bg-brand text-brand-dark font-medium' : 'text-bone/60 hover:text-bone')}
        >
          Anexar arquivo
        </button>
      </div>

      {tab === 'file' && (
        <div className="mb-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileSelected(file)
              e.target.value = ''
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={readingFile}
            className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-white/20 px-3 py-4 text-sm text-bone/70 transition-colors hover:border-brand/50 hover:text-bone disabled:opacity-50"
          >
            <Paperclip className="h-4 w-4" />
            {readingFile ? 'Lendo arquivo…' : fileName ? `Trocar arquivo (atual: ${fileName})` : 'Selecionar .pdf, .docx ou .txt'}
          </button>
          {fileName && !readingFile && !error && (
            <p className="mt-1.5 text-xs text-brand">Texto extraído de "{fileName}" — revise abaixo antes de extrair.</p>
          )}
        </div>
      )}

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={6}
        placeholder={tab === 'paste' ? 'Cole aqui a transcrição ou resumo da call...' : 'O texto extraído do arquivo aparece aqui — edite se precisar.'}
        className={cn(
          'w-full rounded border bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand',
          overLimit ? 'border-red-500/50' : 'border-white/10',
        )}
      />
      <p className={cn('mt-1 text-right text-xs', overLimit ? 'font-medium text-red-400' : 'text-bone/40')}>
        {transcript.length.toLocaleString('pt-BR')} / {MAX_CHARS.toLocaleString('pt-BR')} caracteres
        {overLimit && ' — reduza o texto antes de extrair'}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={handleExtract}
          disabled={loading || readingFile || overLimit}
          className="rounded bg-brand px-4 py-2 text-sm font-medium text-brand-dark transition hover:bg-brand-hover disabled:opacity-50"
        >
          {loading ? 'Extraindo…' : 'Extrair e preencher'}
        </button>
        {applied && <span className="text-sm text-brand">Campos preenchidos — revise abaixo.</span>}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  )
}
