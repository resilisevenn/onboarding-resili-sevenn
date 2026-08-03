import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { Bloco5OndeVamosAnunciar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableListWrapper, EditableStringList, EditableText } from '../EditableField'

export function Block05OndeVamosAnunciar({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco5OndeVamosAnunciar
  editable?: boolean
  onChange?: (data: Bloco5OndeVamosAnunciar) => void
}) {
  // Regiões cujo campo de motivo foi aberto pelo botão, mesmo ainda vazio.
  // Motivo já preenchido aparece sempre, sem depender deste estado.
  const [motivosAbertos, setMotivosAbertos] = useState<number[]>([])

  return (
    <div>
      <BlockHeading number={5} title="Onde vamos e onde não vamos anunciar" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Regiões incluídas</h3>
          {editable && onChange ? (
            <EditableStringList
              values={data.regioesIncluidas}
              onChange={(v) => onChange({ ...data, regioesIncluidas: v })}
            />
          ) : (
            <ul className="list-inside list-disc space-y-1">
              {data.regioesIncluidas.filter(Boolean).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Regiões excluídas</h3>
          {editable && onChange ? (
            <EditableListWrapper
              addLabel="Adicionar região"
              onAdd={() => onChange({ ...data, regioesExcluidas: [...data.regioesExcluidas, { regiao: '', motivo: '' }] })}
              onRemove={(i) => {
                // Índices guardados em motivosAbertos deslizam quando um item some da lista.
                setMotivosAbertos((abertos) =>
                  abertos.filter((idx) => idx !== i).map((idx) => (idx > i ? idx - 1 : idx)),
                )
                onChange({ ...data, regioesExcluidas: data.regioesExcluidas.filter((_, idx) => idx !== i) })
              }}
            >
              {(removeButton) => (
                <>
                  {data.regioesExcluidas.map((r, i) => {
                    const mostrarMotivo = Boolean(r.motivo) || motivosAbertos.includes(i)
                    return (
                      <div key={i} className="space-y-1.5 rounded border border-obsidian/10 p-2">
                        <div className="flex items-center gap-2">
                          <EditableText
                            value={r.regiao}
                            placeholder="Região"
                            onChange={(v) => {
                              const next = [...data.regioesExcluidas]
                              next[i] = { ...next[i], regiao: v }
                              onChange({ ...data, regioesExcluidas: next })
                            }}
                          />
                          {removeButton(i)}
                          {!mostrarMotivo && (
                            <button
                              type="button"
                              onClick={() => setMotivosAbertos((abertos) => [...abertos, i])}
                              className="flex shrink-0 items-center gap-1 text-sm text-brand hover:text-brand-hover"
                            >
                              <Plus className="h-3.5 w-3.5" /> Motivo
                            </button>
                          )}
                        </div>
                        {mostrarMotivo && (
                          <EditableText
                            value={r.motivo}
                            placeholder="Motivo"
                            onChange={(v) => {
                              const next = [...data.regioesExcluidas]
                              next[i] = { ...next[i], motivo: v }
                              onChange({ ...data, regioesExcluidas: next })
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </>
              )}
            </EditableListWrapper>
          ) : (
            <ul className="list-inside list-disc space-y-1">
              {data.regioesExcluidas.map((r, i) => (
                <li key={i}>
                  <span className="font-bold">{r.motivo ? `${r.regiao}:` : r.regiao}</span>
                  {r.motivo && <span className="text-obsidian/60"> {r.motivo}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
