import { useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { CAMINHOS_PACIENTE_TEMPLATES } from '../../lib/caminhoPacienteTemplates'
import type { Bloco6CaminhoPaciente } from '../../types/onboarding'
import { TextAreaField, TextField } from './fields'

export function CaminhoPacienteField({
  value,
  onChange,
}: {
  value: Bloco6CaminhoPaciente
  onChange: (v: Bloco6CaminhoPaciente) => void
}) {
  const [openId, setOpenId] = useState<number | null>(null)
  const [draftEtapas, setDraftEtapas] = useState<{ titulo: string; descricao: string }[]>([])

  const openTemplate = CAMINHOS_PACIENTE_TEMPLATES.find((t) => t.id === openId) ?? null

  function openModal(id: number) {
    const template = CAMINHOS_PACIENTE_TEMPLATES.find((t) => t.id === id)
    if (!template) return
    const isSelected = value.caminhoSelecionado === id
    setDraftEtapas(isSelected && value.etapas.length > 0 ? value.etapas : template.etapas)
    setOpenId(id)
  }

  function confirmSelection() {
    if (openId == null) return
    onChange({ caminhoSelecionado: openId, etapas: draftEtapas })
    setOpenId(null)
  }

  return (
    <div>
      <span className="mb-2 block text-sm text-bone/70">Caminho do paciente</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CAMINHOS_PACIENTE_TEMPLATES.map((template) => {
          const selected = value.caminhoSelecionado === template.id
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => openModal(template.id)}
              className={cn(
                'flex flex-col gap-1 rounded border p-3 text-left transition-colors',
                selected ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/30',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={cn('text-sm font-medium', selected ? 'text-bone' : 'text-bone/80')}>{template.nome}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
              </div>
              <span className="text-xs text-bone/50">
                {template.etapas.map((etapa) => etapa.titulo).join(' → ')}
              </span>
            </button>
          )
        })}
      </div>

      {openTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-deep/80 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-xl border border-brand/20 bg-obsidian-alt p-6 shadow-2xl shadow-black/50">
            <div className="mb-4 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <h3 className="font-display text-lg text-bone">{openTemplate.nome}</h3>
              <button type="button" onClick={() => setOpenId(null)} className="shrink-0 text-bone/60 hover:text-bone">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {draftEtapas.map((etapa, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-obsidian/40 p-3 shadow-inner">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-brand-light">
                      Etapa {i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDraftEtapas(draftEtapas.filter((_, idx) => idx !== i))}
                      className="text-bone/60 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <TextField
                      label="Título"
                      value={etapa.titulo}
                      onChange={(v) => {
                        const next = [...draftEtapas]
                        next[i] = { ...next[i], titulo: v }
                        setDraftEtapas(next)
                      }}
                    />
                    <TextAreaField
                      label="Descrição"
                      value={etapa.descricao}
                      className="!h-[59px] resize-none"
                      onChange={(v) => {
                        const next = [...draftEtapas]
                        next[i] = { ...next[i], descricao: v }
                        setDraftEtapas(next)
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraftEtapas([...draftEtapas, { titulo: '', descricao: '' }])}
                className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
              >
                <Plus className="h-4 w-4" /> Adicionar etapa
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="rounded border border-white/10 px-4 py-2 text-sm text-bone/70 hover:text-bone"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmSelection}
                className="rounded bg-brand px-4 py-2 text-sm font-medium text-brand-dark shadow-md shadow-brand/20 transition hover:bg-brand-hover"
              >
                Usar este caminho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
