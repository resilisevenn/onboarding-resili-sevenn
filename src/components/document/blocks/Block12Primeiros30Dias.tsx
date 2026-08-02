import type { Bloco12Primeiros30Dias } from '../../../types/onboarding'
import { formatDate } from '../../../lib/format'
import { BlockHeading } from '../BlockHeading'

export function Block12Primeiros30Dias({ data }: { data: Bloco12Primeiros30Dias }) {
  return (
    <div>
      <BlockHeading number={12} title="Os primeiros 30 dias" />

      <ol className="relative ml-14 mb-8 flex flex-col gap-6 border-l-2 border-obsidian/[0.12] pl-5 md:ml-[104px] md:pl-7">
        {data.cronograma.map((evento, i) => {
          const primeiraData = data.cronograma[0]?.data
          const diaRelativo =
            evento.data && primeiraData
              ? Math.round(
                  (new Date(evento.data + 'T00:00:00').getTime() - new Date(primeiraData + 'T00:00:00').getTime()) /
                    (1000 * 60 * 60 * 24),
                )
              : null
          const dataCurta = evento.data
            ? new Date(evento.data + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            : ''
          return (
            <li key={i} className="relative">
              <span className="absolute -left-[25px] top-1 h-3 w-3 rounded-full bg-brand shadow-[0_0_0_5px_rgba(89,165,44,0.15)] md:-left-[33px]" />
              <span className="absolute -left-14 top-px w-12 text-right font-mono text-[13px] font-bold text-obsidian md:-left-[104px] md:w-[60px] md:text-base">
                {dataCurta}
              </span>
              <p className="mb-1.5 font-mono text-[13px] font-bold text-obsidian/55">
                {formatDate(evento.data)}
                {diaRelativo != null && `, Dia ${diaRelativo}`}
              </p>
              <p className="text-[15px]">{evento.descricao}</p>
            </li>
          )
        })}
      </ol>

      <details className="group mt-6 rounded-2xl border border-obsidian/10 bg-gradient-to-b from-obsidian/[0.045] to-obsidian/[0.025] px-6 shadow-[inset_0_1px_2px_rgba(11,19,16,0.03)]">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[16px] font-bold text-obsidian marker:content-none [&::-webkit-details-marker]:hidden">
          O que NÃO vai acontecer
          <span className="rotate-90 text-xl text-obsidian/40 transition-transform duration-200 group-open:-rotate-90">›</span>
        </summary>
        <ul className="list-inside list-disc space-y-2 pb-4 pl-[18px] text-[14.5px] leading-relaxed text-obsidian/70">
          {data.oQueNaoVaiAcontecer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </details>
    </div>
  )
}
