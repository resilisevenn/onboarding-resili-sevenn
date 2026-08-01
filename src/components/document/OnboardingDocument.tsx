import { useState } from 'react'
import type { OnboardingPayload } from '../../types/onboarding'
import { Block01Negocio } from './blocks/Block01Negocio'
import { Block02OndeVoceEsta } from './blocks/Block02OndeVoceEsta'
import { Block03OndeQuerChegar } from './blocks/Block03OndeQuerChegar'
import { Block04ParaQuemAnunciar } from './blocks/Block04ParaQuemAnunciar'
import { Block05OndeVamosAnunciar } from './blocks/Block05OndeVamosAnunciar'
import { Block06CaminhoPaciente } from './blocks/Block06CaminhoPaciente'
import { Block07Fases } from './blocks/Block07Fases'
import { Block08Criativos } from './blocks/Block08Criativos'
import { Block09Riscos } from './blocks/Block09Riscos'
import { Block10Checklist } from './blocks/Block10Checklist'
import { Block11ComoTrabalhar } from './blocks/Block11ComoTrabalhar'
import { Block12Primeiros30Dias } from './blocks/Block12Primeiros30Dias'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { id: 'bloco-1', label: '1. O seu negócio' },
  { id: 'bloco-2', label: '2. Onde você está hoje' },
  { id: 'bloco-3', label: '3. Onde você quer chegar' },
  { id: 'bloco-4', label: '4. Para quem vamos anunciar' },
  { id: 'bloco-5', label: '5. Onde vamos anunciar' },
  { id: 'bloco-6', label: '6. O caminho do paciente' },
  { id: 'bloco-7', label: '7. As fases' },
  { id: 'bloco-8', label: '8. O que os anúncios vão dizer' },
  { id: 'bloco-9', label: '9. Riscos que assumimos juntos' },
  { id: 'bloco-10', label: '10. O que precisa de você' },
  { id: 'bloco-11', label: '11. Como vamos trabalhar' },
  { id: 'bloco-12', label: '12. Os primeiros 30 dias' },
]

export function OnboardingDocument({
  clientName,
  payload,
  generatedAt,
}: {
  clientName: string
  payload: OnboardingPayload
  generatedAt: string
}) {
  const [active, setActive] = useState('bloco-1')

  function scrollTo(id: string) {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-bone text-obsidian">
      <header className="border-b border-obsidian/10 px-6 py-8 md:px-12">
        <img src="/logo-resili-sevenn.png" alt="Resili Sevenn" className="mb-4 h-8" />
        <h1 className="font-display text-3xl text-obsidian md:text-4xl">{clientName}</h1>
        <p className="mt-1 text-sm text-obsidian/60">
          Onboarding gerado em {new Date(generatedAt).toLocaleDateString('pt-BR')}
        </p>
      </header>

      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10 md:px-12">
        <nav className="sticky top-10 hidden h-fit w-56 shrink-0 space-y-1 md:block">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                'block w-full rounded px-3 py-2 text-left text-sm transition',
                active === item.id ? 'bg-obsidian text-bone' : 'text-obsidian/60 hover:bg-obsidian/5',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1 space-y-16">
          <section id="bloco-1">
            <Block01Negocio data={payload.bloco1_negocio} />
          </section>
          <section id="bloco-2">
            <Block02OndeVoceEsta data={payload.bloco2_ondeVoceEsta} />
          </section>
          <section id="bloco-3">
            <Block03OndeQuerChegar data={payload.bloco3_ondeQuerChegar} ticketMedio={payload.bloco2_ondeVoceEsta.ticketMedio} />
          </section>
          <section id="bloco-4">
            <Block04ParaQuemAnunciar data={payload.bloco4_paraQuemAnunciar} />
          </section>
          <section id="bloco-5">
            <Block05OndeVamosAnunciar data={payload.bloco5_ondeVamosAnunciar} />
          </section>
          <section id="bloco-6">
            <Block06CaminhoPaciente data={payload.bloco6_caminhoPaciente} />
          </section>
          <section id="bloco-7">
            <Block07Fases data={payload.bloco7_fases} />
          </section>
          <section id="bloco-8">
            <Block08Criativos data={payload.bloco8_criativos} />
          </section>
          <section id="bloco-9">
            <Block09Riscos data={payload.bloco9_riscos} />
          </section>
          <section id="bloco-10">
            <Block10Checklist data={payload.bloco10_checklist} />
          </section>
          <section id="bloco-11">
            <Block11ComoTrabalhar data={payload.bloco11_comoTrabalhar} />
          </section>
          <section id="bloco-12">
            <Block12Primeiros30Dias data={payload.bloco12_primeiros30Dias} />
          </section>
        </main>
      </div>
    </div>
  )
}
