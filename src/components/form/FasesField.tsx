import { useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { FASES_TEMPLATES } from '../../lib/fasesTemplates'
import type { Bloco7Fases, Fase } from '../../types/onboarding'
import { TextAreaField, TextField } from './fields'

export function FasesField({
  value,
  onChange,
}: {
  value: Bloco7Fases
  onChange: (v: Bloco7Fases) => void
}) {
  const [openId, setOpenId] = useState<(typeof FASES_TEMPLATES)[number]['id'] | null>(null)
  const [draftFases, setDraftFases] = useState<Fase[]>([])

  const openTemplate = FASES_TEMPLATES.find((t) => t.id === openId) ?? null

  function openModal(id: (typeof FASES_TEMPLATES)[number]['id']) {
    const template = FASES_TEMPLATES.find((t) => t.id === id)
    if (!template) return
    const isSelected = value.templateSelecionado === id
    setDraftFases(isSelected && value.fases.length > 0 ? value.fases : template.fases)
    setOpenId(id)
  }

  function confirmSelection() {
    if (openId == null) return
    onChange({ templateSelecionado: openId, fases: draftFases })
    setOpenId(null)
  }

  return (
    <div>
      <span className="mb-2 block text-sm text-bone/70">As fases</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FASES_TEMPLATES.map((template) => {
          const selected = value.templateSelecionado === template.id
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => openModal(template.id)}
              className={cn(
                'flex items-center justify-between rounded border p-3 text-left transition-colors',
                selected ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/30',
              )}
            >
              <span className={cn('text-sm', selected ? 'text-bone' : 'text-bone/80')}>{template.nome}</span>
              {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
            </button>
          )
        })}
      </div>

      {openTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-obsidian-alt p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-bone">{openTemplate.nome}</h3>
              <button type="button" onClick={() => setOpenId(null)} className="shrink-0 text-bone/60 hover:text-bone">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {draftFases.map((fase, i) => (
                <div key={i} className="rounded border border-white/10 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand">Fase {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDraftFases(draftFases.filter((_, idx) => idx !== i))}
                      className="text-bone/60 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <TextField
                      label="Nome"
                      value={fase.nome}
                      onChange={(v) => {
                        const next = [...draftFases]
                        next[i] = { ...next[i], nome: v }
                        setDraftFases(next)
                      }}
                    />
                    <TextField
                      label="Período"
                      value={fase.periodo}
                      onChange={(v) => {
                        const next = [...draftFases]
                        next[i] = { ...next[i], periodo: v }
                        setDraftFases(next)
                      }}
                    />
                    <TextAreaField
                      label="Objetivo"
                      value={fase.objetivo}
                      className="!h-[62px] resize-none"
                      onChange={(v) => {
                        const next = [...draftFases]
                        next[i] = { ...next[i], objetivo: v }
                        setDraftFases(next)
                      }}
                    />
                    <TextAreaField
                      label="Gatilho de mudança de fase"
                      value={fase.gatilhoMudancaFase}
                      className="!h-[62px] resize-none"
                      onChange={(v) => {
                        const next = [...draftFases]
                        next[i] = { ...next[i], gatilhoMudancaFase: v }
                        setDraftFases(next)
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraftFases([...draftFases, { nome: '', periodo: '', objetivo: '', gatilhoMudancaFase: '' }])}
                className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
              >
                <Plus className="h-4 w-4" /> Adicionar fase
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3">
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
                className="rounded bg-brand px-4 py-2 text-sm font-medium text-bone hover:bg-brand-light"
              >
                Usar este template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
