import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'

const editableClass =
  'w-full rounded border border-brand/30 bg-brand/5 px-2 py-1 outline-none focus:border-brand focus:bg-brand/10'

export function EditableText({
  value,
  onChange,
  className,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  className?: string
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(editableClass, className)}
    />
  )
}

export function EditableTextArea({
  value,
  onChange,
  className,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  className?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className={cn(editableClass, 'resize-y', className)}
    />
  )
}

export function EditableNumber({
  value,
  onChange,
  className,
  step = 1,
  prefix,
}: {
  value: number
  onChange: (v: number) => void
  className?: string
  step?: number
  prefix?: string
}) {
  const [text, setText] = useState(String(value))

  useEffect(() => {
    setText(String(value))
  }, [value])

  return (
    <span className="inline-flex items-center gap-1">
      {prefix && <span className="text-obsidian/50">{prefix}</span>}
      <input
        type="text"
        inputMode="decimal"
        value={text}
        step={step}
        onChange={(e) => {
          const next = e.target.value
          if (!/^-?\d*\.?\d*$/.test(next)) return
          setText(next)
          const parsed = Number.parseFloat(next)
          if (Number.isFinite(parsed)) onChange(parsed)
        }}
        onBlur={() => setText(String(value))}
        className={cn(editableClass, 'font-mono', className)}
      />
    </span>
  )
}

/** Edita uma taxa 0-1 exibindo/aceitando o valor em porcentagem (ex: 32 -> 0.32). */
export function EditablePercent({
  value,
  onChange,
  className,
}: {
  value: number
  onChange: (v: number) => void
  className?: string
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number"
        value={Math.round((value || 0) * 1000) / 10}
        step={0.1}
        onChange={(e) => onChange((e.target.valueAsNumber || 0) / 100)}
        className={cn(editableClass, 'w-20 font-mono', className)}
      />
      <span className="text-obsidian/50">%</span>
    </span>
  )
}

export function EditableStringList({
  values,
  onChange,
  placeholder,
}: {
  values: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <EditableText
            value={v}
            placeholder={placeholder}
            onChange={(next) => {
              const copy = [...values]
              copy[i] = next
              onChange(copy)
            }}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="shrink-0 text-obsidian/40 hover:text-red-600"
            aria-label="Remover"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ''])}
        className="flex items-center gap-1 text-sm text-brand hover:text-brand-hover"
      >
        <Plus className="h-3.5 w-3.5" /> Adicionar
      </button>
    </div>
  )
}

export function EditableListWrapper({
  onAdd,
  onRemove,
  children,
  addLabel = 'Adicionar',
}: {
  onAdd: () => void
  onRemove: (index: number) => void
  children: (removeButton: (index: number) => React.ReactNode) => React.ReactNode
  addLabel?: string
}) {
  const removeButton = (index: number) => (
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="shrink-0 text-obsidian/40 hover:text-red-600"
      aria-label="Remover"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
  return (
    <div className="space-y-3">
      {children(removeButton)}
      <button type="button" onClick={onAdd} className="flex items-center gap-1 text-sm text-brand hover:text-brand-hover">
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  )
}
