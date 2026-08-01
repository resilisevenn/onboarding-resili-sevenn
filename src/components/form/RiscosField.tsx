import { useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { RISCOS_TEMPLATES, RISCO_REATIVACAO_BASE } from '../../lib/riscosTemplates'
import type { Bloco9Riscos, Risco } from '../../types/onboarding'
import { TextAreaField } from './fields'

function buildRiscos(templateId: (typeof RISCOS_TEMPLATES)[number]['id'], temReativacaoBase: boolean): Risco[] {
  const template = RISCOS_TEMPLATES.find((t) => t.id === templateId)
  if (!template) return []
  return temReativacaoBase ? [...template.riscos, RISCO_REATIVACAO_BASE] : template.riscos
}

export function RiscosField({
  value,
  onChange,
}: {
  value: Bloco9Riscos
  onChange: (v: Bloco9Riscos) => void
}) {
  const [openId, setOpenId] = useState<(typeof RISCOS_TEMPLATES)[number]['id'] | null>(null)
  const [draftRiscos, setDraftRiscos] = useState<Risco[]>([])
  const [draftReativacao, setDraftReativacao] = useState(false)

  const openTemplate = RISCOS_TEMPLATES.find((t) => t.id === openId) ?? null

  function openModal(id: (typeof RISCOS_TEMPLATES)[number]['id']) {
    const isSelected = value.templateSelecionado === id
    if (isSelected && value.riscos.length > 0) {
      setDraftRiscos(value.riscos)
      setDraftReativacao(value.temReativacaoBase)
    } else {
      setDraftRiscos(buildRiscos(id, value.temReativacaoBase))
      setDraftReativacao(value.temReativacaoBase)
    }
    setOpenId(id)
  }

  function toggleReativacao(checked: boolean) {
    setDraftReativacao(checked)
    const semReativacao = draftRiscos.filter((r) => r.descricao !== RISCO_REATIVACAO_BASE.descricao)
    setDraftRiscos(checked ? [...semReativacao, RISCO_REATIVACAO_BASE] : semReativacao)
  }

  function confirmSelection() {
    if (openId == null) return
    onChange({ templateSelecionado: openId, temReativacaoBase: draftReativacao, riscos: draftRiscos })
    setOpenId(null)
  }

  return (
    <div>
      <span className="mb-1 block text-sm text-bone/70">Riscos que assumimos juntos</span>
      <p className="mb-3 text-sm text-bone/50">
        Selecione abaixo quais serviços o cliente contratou. Cada combinação já vem com os riscos que fazem sentido pra aquele
        pacote — você pode ajustar antes de confirmar.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RISCOS_TEMPLATES.map((template) => {
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
              <span className="text-xs text-brand/80">{template.riscos.length} riscos identificados</span>
            </button>
          )
        })}
      </div>

      {value.templateSelecionado && (
        <p className="mt-2 text-xs text-bone/50">
          Reativação de Base: {value.temReativacaoBase ? 'incluída' : 'não incluída'} — ajuste dentro do modal do template.
        </p>
      )}

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

            <label className="mb-4 flex items-start gap-2 rounded border border-white/10 p-3 text-sm text-bone/80">
              <input
                type="checkbox"
                checked={draftReativacao}
                onChange={(e) => toggleReativacao(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              />
              <span>
                Cliente também contratou Reativação de Base
                <span className="block text-xs text-bone/50">Adiciona o risco de contatos antigos não reaproveitados.</span>
              </span>
            </label>

            <div className="space-y-3">
              {draftRiscos.map((risco, i) => (
                <div key={i} className="rounded border border-white/10 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-brand">Risco {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => setDraftRiscos(draftRiscos.filter((_, idx) => idx !== i))}
                      className="text-bone/60 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <TextAreaField
                      label="Descrição"
                      value={risco.descricao}
                      className="!h-[62px] resize-none"
                      onChange={(v) => {
                        const next = [...draftRiscos]
                        next[i] = { ...next[i], descricao: v }
                        setDraftRiscos(next)
                      }}
                    />
                    <label className="block">
                      <span className="mb-1 block text-sm text-bone/70">Origem</span>
                      <select
                        value={risco.origem}
                        onChange={(e) => {
                          const next = [...draftRiscos]
                          next[i] = { ...next[i], origem: e.target.value as 'clinica' | 'gestor' }
                          setDraftRiscos(next)
                        }}
                        className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
                      >
                        <option value="clinica">Clínica</option>
                        <option value="gestor">Gestor</option>
                      </select>
                    </label>
                    <TextAreaField
                      label="Plano de ação"
                      value={risco.planoDeAcao}
                      className="!h-[62px] resize-none"
                      onChange={(v) => {
                        const next = [...draftRiscos]
                        next[i] = { ...next[i], planoDeAcao: v }
                        setDraftRiscos(next)
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraftRiscos([...draftRiscos, { descricao: '', origem: 'clinica', planoDeAcao: '' }])}
                className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
              >
                <Plus className="h-4 w-4" /> Adicionar risco
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
