import { useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { CHECKLIST_TEMPLATES } from '../../lib/checklistTemplates'
import type { Bloco10Checklist, ItemChecklist } from '../../types/onboarding'
import { TextField } from './fields'

export function ChecklistField({
  value,
  onChange,
}: {
  value: Bloco10Checklist
  onChange: (v: Bloco10Checklist) => void
}) {
  const [openId, setOpenId] = useState<(typeof CHECKLIST_TEMPLATES)[number]['id'] | null>(null)
  const [draftItens, setDraftItens] = useState<ItemChecklist[]>([])

  const openTemplate = CHECKLIST_TEMPLATES.find((t) => t.id === openId) ?? null

  function openModal(id: (typeof CHECKLIST_TEMPLATES)[number]['id']) {
    const template = CHECKLIST_TEMPLATES.find((t) => t.id === id)
    if (!template) return
    const isSelected = value.templateSelecionado === id
    setDraftItens(isSelected && value.itens.length > 0 ? value.itens : template.itens)
    setOpenId(id)
  }

  function confirmSelection() {
    if (openId == null) return
    onChange({ templateSelecionado: openId, itens: draftItens })
    setOpenId(null)
  }

  return (
    <div>
      <span className="mb-1 block text-sm text-bone/70">O que precisa de você</span>
      <p className="mb-3 text-sm text-bone/50">
        Selecione abaixo quais serviços o cliente contratou. Cada combinação já vem com o checklist de acessos e tarefas que
        fazem sentido pra aquele pacote — você pode ajustar antes de confirmar.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CHECKLIST_TEMPLATES.map((template) => {
          const selected = value.templateSelecionado === template.id
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
              <span className="text-xs text-bone/50">{template.frentesContratadas}</span>
              <span className="text-xs text-brand/80">{template.itens.length} itens</span>
            </button>
          )
        })}
      </div>

      {openTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-obsidian-alt p-6">
            <div className="mb-1 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-bone">{openTemplate.nome}</h3>
              <button type="button" onClick={() => setOpenId(null)} className="shrink-0 text-bone/60 hover:text-bone">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-4 text-sm text-bone/50">{openTemplate.frentesContratadas}</p>

            <div className="space-y-3">
              {draftItens.map((item, i) => (
                <div key={i} className="rounded border border-white/10 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand">Item {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDraftItens(draftItens.filter((_, idx) => idx !== i))}
                      className="text-bone/60 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <TextField
                      label="Item"
                      value={item.item}
                      onChange={(v) => {
                        const next = [...draftItens]
                        next[i] = { ...next[i], item: v }
                        setDraftItens(next)
                      }}
                    />
                    <TextField
                      label="Prazo"
                      value={item.prazo}
                      onChange={(v) => {
                        const next = [...draftItens]
                        next[i] = { ...next[i], prazo: v }
                        setDraftItens(next)
                      }}
                    />
                    <TextField
                      label="Responsável"
                      value={item.responsavel}
                      onChange={(v) => {
                        const next = [...draftItens]
                        next[i] = { ...next[i], responsavel: v }
                        setDraftItens(next)
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraftItens([...draftItens, { item: '', prazo: '', responsavel: '' }])}
                className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
              >
                <Plus className="h-4 w-4" /> Adicionar item
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
