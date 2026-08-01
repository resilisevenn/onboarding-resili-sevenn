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
        <BlockHeading
          title="Riscos que assumimos juntos"
          subtitle="Escrito desde o dia 1 — se acontecer, já temos um plano combinado."
        />
        <EditableListWrapper
          addLabel="Adicionar risco"
          onAdd={() => onChange({ ...data, riscos: [...data.riscos, { descricao: '', origem: 'clinica', planoDeAcao: '' }] })}
          onRemove={(i) => onChange({ ...data, riscos: data.riscos.filter((_, idx) => idx !== i) })}
        >
          {(removeButton) => (
            <>
              {data.riscos.map((risco, i) => (
                <div key={i} className="space-y-2 rounded border border-obsidian/10 p-4">
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
      <BlockHeading
        title="Riscos que assumimos juntos"
        subtitle="Escrito desde o dia 1 — se acontecer, já temos um plano combinado."
      />
      <div className="space-y-4">
        {data.riscos.map((risco, i) => (
          <div key={i} className="rounded border border-obsidian/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{risco.descricao}</p>
              <span className="shrink-0 rounded-full bg-obsidian/5 px-2 py-0.5 text-xs text-obsidian/60">
                {ORIGEM_LABEL[risco.origem] ?? risco.origem}
              </span>
            </div>
            <p className="text-sm text-obsidian/60">
              <span className="font-medium">Plano de ação:</span> {risco.planoDeAcao}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
