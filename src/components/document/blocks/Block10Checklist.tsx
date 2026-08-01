import type { Bloco10Checklist } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block10Checklist({ data }: { data: Bloco10Checklist }) {
  return (
    <div>
      <BlockHeading
        title="O que precisa de você"
        subtitle="O acesso ao Meta Ads é configurado ao vivo na call — isto só prepara para ser rápido."
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-obsidian/10 text-obsidian/50">
              <th className="py-2 pr-4 font-medium">Item</th>
              <th className="py-2 pr-4 font-medium">Prazo</th>
              <th className="py-2 font-medium">Responsável</th>
            </tr>
          </thead>
          <tbody>
            {data.itens.map((item, i) => (
              <tr key={i} className="border-b border-obsidian/5">
                <td className="py-2 pr-4">{item.item}</td>
                <td className="py-2 pr-4 font-mono">{item.prazo}</td>
                <td className="py-2">{item.responsavel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
