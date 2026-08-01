import { Sparkles } from 'lucide-react'
import { buildCronogramaPadrao, O_QUE_NAO_VAI_ACONTECER_PADRAO } from '../../lib/primeiros30DiasTemplate'
import type { Bloco12Primeiros30Dias } from '../../types/onboarding'
import { ObjectListField, StringListField, TextAreaField } from './fields'

export function Primeiros30DiasField({
  value,
  onChange,
}: {
  value: Bloco12Primeiros30Dias
  onChange: (v: Bloco12Primeiros30Dias) => void
}) {
  function preencherPadrao() {
    onChange({
      cronograma: buildCronogramaPadrao(),
      oQueNaoVaiAcontecer: O_QUE_NAO_VAI_ACONTECER_PADRAO,
    })
  }

  return (
    <div className="space-y-4">
      <div className="rounded border border-brand/30 bg-brand/5 p-3">
        <p className="mb-2 text-sm text-bone/70">
          Preenche o cronograma padrão dos primeiros 30 dias (datas calculadas a partir de hoje) e a lista do que não vai
          acontecer. Você pode ajustar tudo depois.
        </p>
        <button
          type="button"
          onClick={preencherPadrao}
          className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-light"
        >
          <Sparkles className="h-4 w-4" /> Preencher com cronograma padrão
        </button>
      </div>

      <ObjectListField
        label="Cronograma"
        values={value.cronograma}
        newItem={() => ({ data: '', descricao: '' })}
        onChange={(v) => onChange({ ...value, cronograma: v })}
        renderItem={(item, update) => {
          const primeiraData = value.cronograma[0]?.data
          const diaRelativo =
            item.data && primeiraData
              ? Math.round(
                  (new Date(item.data + 'T00:00:00').getTime() - new Date(primeiraData + 'T00:00:00').getTime()) /
                    (1000 * 60 * 60 * 24),
                )
              : null

          return (
            <div className="space-y-2">
              <label className="block">
                <span className="mb-1 block text-sm text-bone/70">
                  Data {diaRelativo != null && <span className="text-brand">— Dia {diaRelativo}</span>}
                </span>
                <input
                  type="date"
                  value={item.data}
                  onChange={(e) => update({ data: e.target.value })}
                  className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
                />
              </label>
              <TextAreaField label="Descrição" value={item.descricao} onChange={(v) => update({ descricao: v })} />
            </div>
          )
        }}
      />

      <StringListField
        label="O que não vai acontecer"
        values={value.oQueNaoVaiAcontecer}
        onChange={(v) => onChange({ ...value, oQueNaoVaiAcontecer: v })}
      />
    </div>
  )
}
