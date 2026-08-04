export function BlockHeading({ number, title, subtitle }: { number: number; title: string; subtitle?: string }) {
  return (
    <div className="relative">
      <img
        src="/logo-simbolo águia-resili-fundo-transparente.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-0 h-[clamp(80px,14vw,220px)] w-[clamp(80px,14vw,220px)] select-none object-contain opacity-10"
      />
      <span className="relative z-10 mb-4 inline-block self-start rounded-full bg-[var(--color-doc-dark)] px-3 py-1 font-mono text-[13px] uppercase leading-none tracking-wider text-bone">
        Bloco {String(number).padStart(2, '0')}
      </span>
      <h2
        className={`relative z-10 max-w-[16ch] font-display text-[clamp(32px,5vw,56px)] leading-[1.05] text-brand-hover ${subtitle ? 'mb-4' : 'mb-12'}`}
      >
        {title}
      </h2>
      {subtitle && <p className="relative z-10 mb-12 max-w-[60ch] text-[15px] leading-snug text-obsidian/60 sm:text-[17px]">{subtitle}</p>}
    </div>
  )
}
