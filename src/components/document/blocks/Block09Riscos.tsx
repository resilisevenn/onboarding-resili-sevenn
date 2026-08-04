import type { Bloco9Riscos } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableListWrapper, EditableTextArea } from '../EditableField'

const ORIGEM_LABEL: Record<string, string> = {
  clinica: 'Identificado pela clínica',
  gestor: 'Identificado pelo gestor',
}

export function Block09Riscos({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco9Riscos
  editable?: boolean
  onChange?: (data: Bloco9Riscos) => void
}) {
  if (editable && onChange) {
    return (
      <div>
        <BlockHeading number={9} title="Riscos que assumimos juntos" />
        <EditableListWrapper
          addLabel="Adicionar risco"
          onAdd={() => onChange({ ...data, riscos: [...data.riscos, { descricao: '', origem: 'clinica', planoDeAcao: '' }] })}
          onRemove={(i) => onChange({ ...data, riscos: data.riscos.filter((_, idx) => idx !== i) })}
        >
          {(removeButton) => (
            <>
              {data.riscos.map((risco, i) => (
                <div key={i} className="space-y-2 rounded-2xl border border-obsidian/10 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <EditableTextArea
                      value={risco.descricao}
                      rows={2}
                      onChange={(v) => {
                        const next = [...data.riscos]
                        next[i] = { ...next[i], descricao: v }
                        onChange({ ...data, riscos: next })
                      }}
                    />
                    {removeButton(i)}
                  </div>
                  <select
                    value={risco.origem}
                    onChange={(e) => {
                      const next = [...data.riscos]
                      next[i] = { ...next[i], origem: e.target.value as 'clinica' | 'gestor' }
                      onChange({ ...data, riscos: next })
                    }}
                    className="rounded border border-brand/30 bg-brand/5 px-2 py-1 text-sm outline-none focus:border-brand"
                  >
                    <option value="clinica">Identificado pela clínica</option>
                    <option value="gestor">Identificado pelo gestor</option>
                  </select>
                  <div>
                    <span className="mb-1 block text-xs font-medium text-obsidian/50">Plano de ação</span>
                    <EditableTextArea
                      value={risco.planoDeAcao}
                      rows={2}
                      onChange={(v) => {
                        const next = [...data.riscos]
                        next[i] = { ...next[i], planoDeAcao: v }
                        onChange({ ...data, riscos: next })
                      }}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </EditableListWrapper>
      </div>
    )
  }

  return (
    <div>
      <BlockHeading number={9} title="Riscos que assumimos juntos" />
      <div>
        {data.riscos.map((risco, i) => (
          <div
            key={i}
            className="mb-3.5 rounded-2xl border border-obsidian/10 bg-gradient-to-b from-obsidian/[0.015] to-transparent px-6 py-5 shadow-[0_1px_2px_rgba(11,19,16,0.04),0_4px_12px_rgba(11,19,16,0.05)] transition-[box-shadow,transform,background,border-color] duration-150 last:mb-0 hover:-translate-y-px hover:border-brand/60 hover:bg-gradient-to-b hover:from-brand/[0.28] hover:to-brand/10 hover:shadow-[0_2px_4px_rgba(11,19,16,0.06),0_10px_24px_rgba(89,165,44,0.22)]"
          >
            <div className="mb-2.5 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
              <p className="text-[16px] font-bold">{risco.descricao}</p>
              <span
                className={
                  risco.origem === 'clinica'
                    ? 'shrink-0 whitespace-nowrap rounded-full bg-brand/15 px-2.5 py-1 text-[11.5px] font-bold text-brand-hover'
                    : 'shrink-0 whitespace-nowrap rounded-full bg-obsidian/[0.08] px-2.5 py-1 text-[11.5px] font-bold text-obsidian/70'
                }
              >
                {ORIGEM_LABEL[risco.origem] ?? risco.origem}
              </span>
            </div>
            <p className="text-sm text-obsidian/70">
              <span className="font-bold text-obsidian">Plano de ação:</span> {risco.planoDeAcao}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
