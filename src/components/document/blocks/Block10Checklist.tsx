import type { Bloco10Checklist } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableText } from '../EditableField'
import { Plus, Trash2 } from 'lucide-react'

export function Block10Checklist({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco10Checklist
  editable?: boolean
  onChange?: (data: Bloco10Checklist) => void
}) {
  return (
    <div>
      <BlockHeading number={10} title="O que precisa de você" />
      <div className="overflow-x-auto rounded-xl border border-obsidian/10 shadow-[0_1px_2px_rgba(11,19,16,0.04),0_4px_12px_rgba(11,19,16,0.05)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[var(--color-doc-dark)] text-bone">
              <th className="px-3.5 py-3.5 text-[12.5px] font-medium uppercase tracking-wide">Item</th>
              <th className="px-3.5 py-3.5 text-[12.5px] font-medium uppercase tracking-wide">Prazo</th>
              <th className="px-3.5 py-3.5 text-[12.5px] font-medium uppercase tracking-wide">Responsável</th>
              {editable && <th className="px-3.5 py-3.5" />}
            </tr>
          </thead>
          <tbody>
            {data.itens.map((item, i) => (
              <tr key={i} className="border-b border-obsidian/5 last:border-b-0 even:bg-obsidian/[0.025] hover:bg-brand/[0.16]">
                {editable && onChange ? (
                  <>
                    <td className="px-3.5 py-3.5">
                      <EditableText
                        value={item.item}
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], item: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="px-3.5 py-3.5">
                      <EditableText
                        value={item.prazo}
                        className="font-mono text-brand-hover"
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], prazo: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="px-3.5 py-3.5">
                      <EditableText
                        value={item.responsavel}
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], responsavel: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="px-3.5 py-3.5">
                      <button
                        type="button"
                        onClick={() => onChange({ ...data, itens: data.itens.filter((_, idx) => idx !== i) })}
                        className="text-obsidian/40 hover:text-red-600"
                        aria-label="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-3.5 py-3.5">{item.item}</td>
                    <td className="px-3.5 py-3.5 font-mono text-brand-hover">{item.prazo}</td>
                    <td className="px-3.5 py-3.5">{item.responsavel}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {editable && onChange && (
          <button
            type="button"
            onClick={() => onChange({ ...data, itens: [...data.itens, { item: '', prazo: '', responsavel: '' }] })}
            className="mt-3 flex items-center gap-1 text-sm text-brand hover:text-brand-hover"
          >
            <Plus className="h-3.5 w-3.5" /> Adicionar item
          </button>
        )}
      </div>
    </div>
  )
}
