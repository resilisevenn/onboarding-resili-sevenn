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
      <BlockHeading
        title="O que precisa de você"
        subtitle="O acesso ao Meta Ads é configurado ao vivo na call — isto só prepara para ser rápido."
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-obsidian/10 text-obsidian/50">
              <th className="py-2 pr-4 font-medium">Item</th>
              <th className="py-2 pr-4 font-medium">Prazo</th>
              <th className="py-2 font-medium">Responsável</th>
              {editable && <th className="py-2" />}
            </tr>
          </thead>
          <tbody>
            {data.itens.map((item, i) => (
              <tr key={i} className="border-b border-obsidian/5">
                {editable && onChange ? (
                  <>
                    <td className="py-2 pr-4">
                      <EditableText
                        value={item.item}
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], item: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="py-2 pr-4">
                      <EditableText
                        value={item.prazo}
                        className="font-mono"
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], prazo: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="py-2">
                      <EditableText
                        value={item.responsavel}
                        onChange={(v) => {
                          const next = [...data.itens]
                          next[i] = { ...next[i], responsavel: v }
                          onChange({ ...data, itens: next })
                        }}
                      />
                    </td>
                    <td className="py-2 pl-2">
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
                    <td className="py-2 pr-4">{item.item}</td>
                    <td className="py-2 pr-4 font-mono">{item.prazo}</td>
                    <td className="py-2">{item.responsavel}</td>
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
