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
              onRemove={(i) => onChange({ ...data, regioesExcluidas: data.regioesExcluidas.filter((_, idx) => idx !== i) })}
            >
              {(removeButton) => (
                <>
                  {data.regioesExcluidas.map((r, i) => (
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
                      </div>
                      <EditableText
                        value={r.motivo}
                        placeholder="Motivo"
                        onChange={(v) => {
                          const next = [...data.regioesExcluidas]
                          next[i] = { ...next[i], motivo: v }
                          onChange({ ...data, regioesExcluidas: next })
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </EditableListWrapper>
          ) : (
            <ul className="list-inside list-disc space-y-1">
              {data.regioesExcluidas.map((r, i) => (
                <li key={i}>
                  <span className="font-bold">{r.regiao}:</span> <span className="text-obsidian/60">{r.motivo}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
