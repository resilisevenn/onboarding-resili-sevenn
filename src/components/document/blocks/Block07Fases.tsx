import type { Bloco7Fases } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block07Fases({ data }: { data: Bloco7Fases }) {
  return (
    <div>
      <BlockHeading number={7} title="As fases dos anúncios" />
      <div>
        {data.fases.map((fase, i) => (
          <div
            key={i}
            className="mb-4 rounded-2xl border border-obsidian/10 bg-gradient-to-b from-obsidian/[0.015] to-transparent px-7 py-6 shadow-[0_1px_2px_rgba(11,19,16,0.04),0_4px_12px_rgba(11,19,16,0.05)] transition-[box-shadow,transform,background,border-color] duration-150 last:mb-0 hover:-translate-y-px hover:border-brand/60 hover:bg-gradient-to-b hover:from-brand/[0.28] hover:to-brand/10 hover:shadow-[0_2px_4px_rgba(11,19,16,0.06),0_10px_24px_rgba(89,165,44,0.22)]"
          >
            <div className="mb-2.5 flex items-baseline justify-between">
              <p className="text-[19px] font-bold">{fase.nome}</p>
              <span className="font-mono font-bold text-brand-hover">{fase.periodo}</span>
            </div>
            <p className="mb-3 text-[15.5px]">{fase.objetivo}</p>
            <p className="text-[13px] text-obsidian/60">
              <span className="font-bold text-obsidian">Gatilho de mudança de fase:</span> {fase.gatilhoMudancaFase}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
