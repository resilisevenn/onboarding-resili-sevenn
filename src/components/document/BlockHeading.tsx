export function BlockHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl text-obsidian md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-obsidian/60">{subtitle}</p>}
    </div>
  )
}
