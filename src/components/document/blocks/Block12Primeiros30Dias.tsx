import type { Bloco12Primeiros30Dias } from '../../../types/onboarding'
import { formatDate } from '../../../lib/format'
import { BlockHeading } from '../BlockHeading'

export function Block12Primeiros30Dias({ data }: { data: Bloco12Primeiros30Dias }) {
  return (
    <div>
      <BlockHeading title="Os primeiros 30 dias" />

      <ol className="mb-8 space-y-4 border-l border-obsidian/10 pl-6">
        {data.cronograma.map((evento, i) => {
          const primeiraData = data.cronograma[0]?.data
          const diaRelativo =
            evento.data && primeiraData
              ? Math.round(
                  (new Date(evento.data + 'T00:00:00').getTime() - new Date(primeiraData + 'T00:00:00').getTime()) /
                    (1000 * 60 * 60 * 24),
                )
              : null
          return (
            <li key={i} className="relative">
              <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-brand" />
              <p className="font-mono text-sm text-obsidian/50">
                {formatDate(evento.data)}
                {diaRelativo != null && ` — Dia ${diaRelativo}`}
              </p>
              <p>{evento.descricao}</p>
            </li>
          )
        })}
      </ol>

      <div className="rounded border border-obsidian/10 bg-obsidian/5 p-4">
        <h3 className="mb-2 text-sm font-medium text-obsidian/50">O que não vai acontecer</h3>
        <ul className="list-inside list-disc space-y-1 text-obsidian/70">
          {data.oQueNaoVaiAcontecer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
