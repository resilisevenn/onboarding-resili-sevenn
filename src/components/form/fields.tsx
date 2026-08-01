import type { ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const inputClass =
  'w-full rounded border border-white/10 bg-obsidian px-3 py-2 text-bone outline-none focus:border-brand'

export function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-bone/70">{label}</span>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </label>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-bone/70">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={inputClass} />
    </label>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  step,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-bone/70">{label}</span>
      <input
        type="number"
        step={step ?? 'any'}
        value={Number.isNaN(value) ? '' : value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className={inputClass}
      />
    </label>
  )
}

/** Lista dinâmica de strings (ex: serviços, dores, desejos). */
export function StringListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <div>
      <span className="mb-1 block text-sm text-bone/70">{label}</span>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={v}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...values]
                next[i] = e.target.value
                onChange(next)
              }}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded border border-white/10 px-2 text-bone/60 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ''])}
          className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
        >
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  )
}

/** Lista dinâmica de objetos estruturados (ex: riscos, checklist, fases). */
export function ObjectListField<T>({
  label,
  values,
  onChange,
  newItem,
  renderItem,
}: {
  label: string
  values: T[]
  onChange: (v: T[]) => void
  newItem: () => T
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode
}) {
  return (
    <div>
      <span className="mb-2 block text-sm text-bone/70">{label}</span>
      <div className="space-y-3">
        {values.map((item, i) => (
          <div key={i} className="rounded border border-white/10 p-3">
            <div className="mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}
                className="text-bone/60 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {renderItem(item, (patch) => {
              const next = [...values]
              next[i] = { ...next[i], ...patch }
              onChange(next)
            })}
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, newItem()])}
          className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
        >
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </div>
  )
}
