import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { extractOnboardingFromTranscript, type ExtractedFields } from '../../lib/extractOnboarding'

export function TranscriptExtractor({ onExtracted }: { onExtracted: (fields: ExtractedFields) => void }) {
  const [transcript, setTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)

  async function handleExtract() {
    if (transcript.trim().length < 20) {
      setError('Cole a transcrição ou resumo da call primeiro.')
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
        Cole a transcrição ou resumo da call. Preenche automaticamente os blocos 1 (negócio), 6 (caminho do
        paciente), 10 (checklist), 11 (comunicação) e 12 (primeiros 30 dias) — revise e ajuste antes de gerar. Dados
        financeiros e ICP/território continuam manuais.
      </p>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={6}
        placeholder="Cole aqui a transcrição ou resumo da call..."
        className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleExtract}
          disabled={loading}
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
