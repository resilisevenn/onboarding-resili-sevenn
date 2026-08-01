import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function PremiumCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-lg border border-white/10 bg-obsidian-alt p-6', className)}>
      {children}
    </div>
  )
}
