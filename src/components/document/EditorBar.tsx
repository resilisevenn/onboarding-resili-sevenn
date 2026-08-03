import { Pencil } from 'lucide-react'
import { cn } from '../../lib/utils'

export function EditorBar({
  dirty,
  saving,
  savedAt,
  error,
  onSave,
}: {
  dirty: boolean
  saving: boolean
  savedAt: Date | null
  error: string | null
  onSave: () => void
}) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-brand/30 bg-obsidian px-6 py-2.5 text-sm text-bone md:px-12">
      <div className="flex items-center gap-2">
        <Pencil className="h-4 w-4 text-brand" />
        <span>Modo edição — visível apenas para você</span>
        {error && <span className="text-red-400">· {error}</span>}
        {!error && !dirty && savedAt && (
          <span className="text-bone/50">· Salvo às {savedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        )}
        {!error && dirty && <span className="text-bone/50">· Alterações não salvas</span>}
      </div>
      <button
        type="button"
        onClick={onSave}
        disabled={!dirty || saving}
        className={cn(
          'rounded px-4 py-1.5 font-medium transition',
          dirty && !saving ? 'bg-brand text-brand-dark hover:bg-brand-hover' : 'bg-white/10 text-bone/40',
        )}
      >
        {saving ? 'Salvando…' : 'Salvar alterações'}
      </button>
    </div>
  )
}
