import { useState } from 'react'
import { Check, Plus, Trash2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { COMBOS_PROCEDIMENTO_CATALOGO, FORMATOS_CRIATIVO_CATALOGO, PROCEDIMENTOS_CATALOGO } from '../../lib/criativosTemplates'
import type { Bloco8Criativos, LinhaCriativo } from '../../types/onboarding'
import { StringListField, TextAreaField, TextField } from './fields'

export function CriativosField({
  value,
  onChange,
}: {
  value: Bloco8Criativos
  onChange: (v: Bloco8Criativos) => void
}) {
  const [draftLinha, setDraftLinha] = useState<LinhaCriativo | null>(null)
  const [editingManualIndex, setEditingManualIndex] = useState<number | null>(null)

  function toggleFormato(formato: string, checked: boolean) {
    onChange({
      ...value,
      formatos: checked ? [...value.formatos, formato] : value.formatos.filter((f) => f !== formato),
    })
  }

  function openModalProcedimento(procedimentoId: string) {
    const existente = value.linhas.find((l) => l.procedimentoId === procedimentoId)
    if (existente) {
      setDraftLinha(existente)
    } else {
      const template = PROCEDIMENTOS_CATALOGO.find((p) => p.id === procedimentoId)
      if (!template) return
      setDraftLinha({
        procedimentoId: template.id,
        nomeProcedimento: template.nome,
        angulosDeMensagem: template.angulosDeMensagem,
        exemploNarrativa: template.exemploNarrativa,
      })
    }
    setEditingManualIndex(null)
  }

  function aplicarCombo(comboId: string) {
    const combo = COMBOS_PROCEDIMENTO_CATALOGO.find((c) => c.id === comboId)
    if (!combo) return
    const linhasCatalogo = value.linhas.filter((l) => !l.procedimentoId || !combo.procedimentoIds.includes(l.procedimentoId))
    const linhasDoCombo: LinhaCriativo[] = combo.procedimentoIds.map((procId) => {
      const existente = value.linhas.find((l) => l.procedimentoId === procId)
      if (existente) return existente
      const template = PROCEDIMENTOS_CATALOGO.find((p) => p.id === procId)!
      return {
        procedimentoId: template.id,
        nomeProcedimento: template.nome,
        angulosDeMensagem: template.angulosDeMensagem,
        exemploNarrativa: template.exemploNarrativa,
      }
    })
    onChange({ ...value, linhas: [...linhasCatalogo, ...linhasDoCombo] })
  }

  function comboSelecionado(combo: (typeof COMBOS_PROCEDIMENTO_CATALOGO)[number]): boolean {
    return combo.procedimentoIds.every((id) => value.linhas.some((l) => l.procedimentoId === id))
  }

  function abrirLinhaManual(index: number | null) {
    const linhasManuais = value.linhas.filter((l) => l.procedimentoId === null)
    setDraftLinha(
      index != null ? linhasManuais[index] : { procedimentoId: null, nomeProcedimento: '', angulosDeMensagem: [''], exemploNarrativa: '' },
    )
    setEditingManualIndex(index)
  }

  function confirmarLinha() {
    if (!draftLinha) return
    if (draftLinha.procedimentoId) {
      const semEssaLinha = value.linhas.filter((l) => l.procedimentoId !== draftLinha.procedimentoId)
      onChange({ ...value, linhas: [...semEssaLinha, draftLinha] })
    } else {
      const linhasCatalogo = value.linhas.filter((l) => l.procedimentoId !== null)
      const linhasManuais = value.linhas.filter((l) => l.procedimentoId === null)
      const proximasManuais =
        editingManualIndex != null
          ? linhasManuais.map((l, i) => (i === editingManualIndex ? draftLinha : l))
          : [...linhasManuais, draftLinha]
      onChange({ ...value, linhas: [...linhasCatalogo, ...proximasManuais] })
    }
    fecharModal()
  }

  function fecharModal() {
    setDraftLinha(null)
    setEditingManualIndex(null)
  }

  function removerLinha(procedimentoId: string | null, index: number) {
    if (procedimentoId) {
      onChange({ ...value, linhas: value.linhas.filter((l) => l.procedimentoId !== procedimentoId) })
      return
    }
    const linhasCatalogo = value.linhas.filter((l) => l.procedimentoId !== null)
    const linhasManuais = value.linhas.filter((l) => l.procedimentoId === null).filter((_, i) => i !== index)
    onChange({ ...value, linhas: [...linhasCatalogo, ...linhasManuais] })
  }

  return (
    <div className="space-y-6">
      <div className="rounded border border-brand/30 bg-brand/5 p-3">
        <label className="mb-3 flex items-start gap-2 text-sm text-bone/80">
          <input
            type="checkbox"
            checked={value.temPosicionamento}
            onChange={(e) => onChange({ ...value, temPosicionamento: e.target.checked })}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span>
            Cliente já tem conteúdo/presença digital aquecendo o público (Posicionamento com a gente ou com outra equipe)
          </span>
        </label>
        <div className="text-sm text-bone/70">
          {value.temPosicionamento ? (
            <>
              <p className="mb-1 font-medium text-bone">Com Posicionamento — estrutura em 3 camadas</p>
              <p>
                <span className="font-medium text-bone">Atração:</span> conteúdo educacional/lifestyle, sem oferta direta. {' '}
                <span className="font-medium text-bone">Confiança:</span> autoridade, bastidores, prova social. {' '}
                <span className="font-medium text-bone">Conversão:</span> quebra de objeção e urgência, levando para o
                WhatsApp.
              </p>
            </>
          ) : (
            <>
              <p className="mb-1 font-medium text-bone">Sem Posicionamento — conversão direta</p>
              <p>
                Não existe conteúdo orgânico aquecendo o público antes. O anúncio precisa fazer esse trabalho sozinho: o
                formato principal tende a ser Resultado final, Antes ou depois, ou CTA Direta, indo direto ao ponto com o lead frio.
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm text-bone/70">Formatos de criativo</span>
        <div className="space-y-2">
          {FORMATOS_CRIATIVO_CATALOGO.map((formato) => (
            <label key={formato} className="flex items-start gap-2 rounded border border-white/10 p-3 text-sm text-bone/80">
              <input
                type="checkbox"
                checked={value.formatos.includes(formato)}
                onChange={(e) => toggleFormato(formato, e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              />
              <span>{formato}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <StringListField
            label="Formatos customizados (fora do catálogo)"
            values={value.formatosCustomizados}
            onChange={(v) => onChange({ ...value, formatosCustomizados: v })}
          />
        </div>
      </div>

      <div>
        <span className="mb-1 block text-sm text-bone/70">Procedimentos e ângulos de mensagem</span>
        <p className="mb-3 text-sm text-bone/50">
          Selecione o procedimento (ou combo de 2 procedimentos) que a clínica oferece. Cada procedimento vira uma linha
          separada, com seu próprio ângulo e exemplo de narrativa — nunca misturados no mesmo anúncio.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROCEDIMENTOS_CATALOGO.map((proc) => {
            const linha = value.linhas.find((l) => l.procedimentoId === proc.id)
            const selected = !!linha
            return (
              <button
                key={proc.id}
                type="button"
                onClick={() => openModalProcedimento(proc.id)}
                className={cn(
                  'flex flex-col gap-1 rounded border p-3 text-left transition-colors',
                  selected ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/30',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn('text-sm font-medium', selected ? 'text-bone' : 'text-bone/80')}>{proc.nome}</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
                </div>
                <span className="text-xs text-bone/50">{proc.dorCentral}</span>
              </button>
            )
          })}
          {COMBOS_PROCEDIMENTO_CATALOGO.map((combo) => {
            const selected = comboSelecionado(combo)
            return (
              <button
                key={combo.id}
                type="button"
                onClick={() => aplicarCombo(combo.id)}
                className={cn(
                  'flex flex-col gap-1 rounded border p-3 text-left transition-colors',
                  selected ? 'border-brand bg-brand/10' : 'border-white/10 hover:border-white/30',
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn('text-sm font-medium', selected ? 'text-bone' : 'text-bone/80')}>{combo.nome}</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
                </div>
                <span className="text-xs text-bone/50">Cria Linha 1 e Linha 2 automaticamente, com o ângulo de cada procedimento.</span>
              </button>
            )
          })}
        </div>

        {value.linhas
          .filter((l) => l.procedimentoId === null)
          .map((linha, i) => (
            <div key={i} className="mt-3 flex items-center justify-between rounded border border-brand/30 bg-brand/10 p-3">
              <span className="text-sm text-bone">{linha.nomeProcedimento || 'Linha manual sem nome'}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => abrirLinhaManual(i)}
                  className="text-xs text-brand hover:text-brand-light"
                >
                  Editar
                </button>
                <button type="button" onClick={() => removerLinha(null, i)} className="text-bone/60 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

        <button
          type="button"
          onClick={() => abrirLinhaManual(null)}
          className="mt-3 flex items-center gap-1 text-sm text-brand hover:text-brand-light"
        >
          <Plus className="h-4 w-4" /> Adicionar linha manual (procedimento fora do catálogo)
        </button>
      </div>

      <TextAreaField
        label="Copy de partida"
        value={value.copyDePartida}
        onChange={(v) => onChange({ ...value, copyDePartida: v })}
      />
      <TextField
        label="Link de referências (pasta de criativos)"
        value={value.linkReferencias}
        onChange={(v) => onChange({ ...value, linkReferencias: v })}
      />

      {draftLinha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border border-white/10 bg-obsidian-alt p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-bone">
                {draftLinha.procedimentoId ? draftLinha.nomeProcedimento : 'Linha manual'}
              </h3>
              <button type="button" onClick={fecharModal} className="shrink-0 text-bone/60 hover:text-bone">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {!draftLinha.procedimentoId && (
                <TextField
                  label="Nome do procedimento"
                  value={draftLinha.nomeProcedimento}
                  onChange={(v) => setDraftLinha({ ...draftLinha, nomeProcedimento: v })}
                />
              )}
              <StringListField
                label="Ângulos de mensagem"
                values={draftLinha.angulosDeMensagem}
                onChange={(v) => setDraftLinha({ ...draftLinha, angulosDeMensagem: v })}
              />
              <TextAreaField
                label="Exemplo de narrativa (referência de tom — não é copy pronta para publicar)"
                value={draftLinha.exemploNarrativa}
                rows={4}
                onChange={(v) => setDraftLinha({ ...draftLinha, exemploNarrativa: v })}
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModal}
                className="rounded border border-white/10 px-4 py-2 text-sm text-bone/70 hover:text-bone"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarLinha}
                className="rounded bg-brand px-4 py-2 text-sm font-medium text-bone hover:bg-brand-light"
              >
                Usar esta linha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
