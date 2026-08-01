import type { Bloco1Negocio } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block01Negocio({ data }: { data: Bloco1Negocio }) {
  return (
    <div>
      <BlockHeading
        title="O seu negócio, como eu entendi"
        subtitle="Confira se está tudo certo — se algo estiver errado, é só nos avisar."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Serviços</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.servicos.filter(Boolean).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Diferencial</h3>
          <p>{data.diferencial}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Público descrito</h3>
          <p>{data.publicoDescrito}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Regiões atendidas</h3>
          <p>{data.regioesAtendidas}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Horários de funcionamento</h3>
          <p>{data.horariosFuncionamento}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Sazonalidade</h3>
          <p>{data.sazonalidade}</p>
        </div>
      </div>
    </div>
  )
}
