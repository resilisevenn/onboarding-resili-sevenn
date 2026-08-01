import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export function ExpandableSection({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string
  description?: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const match = /^(\d+\.)(\s*)(.*)$/s.exec(title)

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between text-left font-display transition-colors',
          open
            ? 'rounded-lg bg-gradient-to-r from-brand to-brand-hover -mx-6 w-[calc(100%+3rem)] px-6 py-3 text-bone text-xl shadow-md shadow-brand/20'
            : 'px-0 py-4 text-bone text-lg hover:text-brand-light',
        )}
      >
        {match ? (
          <span>
            <span className={cn(!open && 'text-brand')}>{match[1]}</span>
            {match[2]}
            {match[3]}
          </span>
        ) : (
          title
        )}
        <ChevronDown className={cn('h-5 w-5 transition-transform', open ? 'rotate-180 text-bone' : 'text-brand')} />
      </button>
      {description && <p className={cn('mt-1 text-sm', open ? '-mx-6 px-6 text-bone/50' : 'text-bone/50')}>{description}</p>}
      {open && <div className="mt-4 space-y-4 pb-4">{children}</div>}
    </div>
  )
}
