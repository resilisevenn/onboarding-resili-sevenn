import { useEffect, useState, type ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import { formatPtBrNumber, parsePtBrNumber } from '../../lib/format'

const inputClass =
  'w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand'

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
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  className?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-bone/70">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className={cn(inputClass, className)} />
    </label>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  step,
  labelExtra,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  labelExtra?: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1.5 text-sm text-bone/70">
        {label}
        {labelExtra}
      </span>
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

/** Edita uma taxa 0-1 exibindo/aceitando o valor em porcentagem (ex: 30 -> 0.3). */
export function PercentField({
  label,
  value,
  onChange,
  labelExtra,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  labelExtra?: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1.5 text-sm text-bone/70">
        {label}
        {labelExtra}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          step={0.1}
          value={Number.isNaN(value) ? '' : Math.round((value || 0) * 1000) / 10}
          onChange={(e) => onChange((e.target.valueAsNumber || 0) / 100)}
          className={inputClass}
        />
        <span className="shrink-0 text-bone/60">%</span>
      </div>
    </label>
  )
}

/** Campo monetário: exibe/aceita formato pt-BR (ex: 20.000,50), armazena número puro (20000.5). */
export function CurrencyField({
  label,
  value,
  onChange,
  labelExtra,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  labelExtra?: ReactNode
}) {
  const [text, setText] = useState(() => formatPtBrNumber(value))
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!focused) setText(formatPtBrNumber(value))
  }, [value, focused])

  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-1.5 text-sm text-bone/70">
        {label}
        {labelExtra}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-bone/60">R$</span>
        <input
          type="text"
          inputMode="decimal"
          value={text}
          onFocus={() => setFocused(true)}
          onChange={(e) => {
            setText(e.target.value)
            const parsed = parsePtBrNumber(e.target.value)
            if (!Number.isNaN(parsed)) onChange(parsed)
          }}
          onBlur={() => {
            setFocused(false)
            setText(formatPtBrNumber(value))
          }}
          className={inputClass}
        />
      </div>
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
          <div key={i} className="rounded-lg border border-white/10 bg-obsidian/40 p-3 shadow-inner">
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
