import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export function ExpandableSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/10 py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left font-display text-lg text-bone"
      >
        {title}
        <ChevronDown className={cn('h-5 w-5 text-brand transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  )
}
