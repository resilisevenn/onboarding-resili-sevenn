import { useEffect, useRef, useState } from 'react'
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
import { EditorBar } from './EditorBar'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { id: 'cover', num: '0.', label: 'Capa' },
  { id: 'bloco-1', num: '1.', label: 'O retrato da sua operação' },
  { id: 'bloco-2', num: '2.', label: 'Onde você está hoje' },
  { id: 'bloco-3', num: '3.', label: 'Onde você quer chegar' },
  { id: 'bloco-4', num: '4.', label: 'Para quem vamos anunciar' },
  { id: 'bloco-5', num: '5.', label: 'Onde vamos anunciar' },
  { id: 'bloco-6', num: '6.', label: 'O caminho do paciente' },
  { id: 'bloco-7', num: '7.', label: 'As fases dos anúncios' },
  { id: 'bloco-8', num: '8.', label: 'O que os anúncios vão dizer' },
  { id: 'bloco-9', num: '9.', label: 'Riscos que assumimos juntos' },
  { id: 'bloco-10', num: '10.', label: 'O que precisa de você' },
  { id: 'bloco-11', num: '11.', label: 'Como vamos trabalhar' },
  { id: 'bloco-12', num: '12.', label: 'Os primeiros 30 dias' },
  { id: 'closing', num: '↓', label: 'Obrigado' },
]

export function OnboardingDocument({
  clientName,
  payload,
  generatedAt,
  editable = false,
  onSave,
}: {
  clientName: string
  payload: OnboardingPayload
  generatedAt: string
  editable?: boolean
  onSave?: (payload: OnboardingPayload) => Promise<void>
}) {
  const [active, setActive] = useState('bloco-1')
  const [draft, setDraft] = useState(payload)
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [showSavedBadge, setShowSavedBadge] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    function onChange() {
      setFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch {
      /* navegador pode bloquear, mantém o estado atual */
    }
  }

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setProgress(Number.isFinite(scrolled) ? scrolled : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const sections = Object.values(sectionRefs.current).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio >= 0.5)
        if (!visible.length) return
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        setActive(visible[0].target.id)
      },
      { threshold: 0.5 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    setActive(id)
    setMobileNavOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return

      const currentIndex = NAV_ITEMS.findIndex((item) => item.id === active)
      if (currentIndex === -1) return
      const nextIndex = e.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1
      const next = NAV_ITEMS[nextIndex]
      if (!next) return

      e.preventDefault()
      scrollTo(next.id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  function patch<K extends keyof OnboardingPayload>(key: K, value: OnboardingPayload[K]) {
    setDraft((d) => ({ ...d, [key]: value }))
    setDirty(true)
  }

  async function handleSave() {
    if (!onSave) return
    setSaving(true)
    setSaveError(null)
    try {
      await onSave(draft)
      setDirty(false)
      setSavedAt(new Date())
      setShowSavedBadge(true)
      setTimeout(() => setShowSavedBadge(false), 4000)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  const showEditorBar = editable && (dirty || saving || !!saveError || showSavedBadge)

  const data = editable ? draft : payload

  return (
    <div className="min-h-screen bg-bone text-obsidian">
      {showEditorBar && <EditorBar dirty={dirty} saving={saving} savedAt={savedAt} error={saveError} onSave={handleSave} />}

      <div className="fixed left-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-brand to-brand-light transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />

      <button
        type="button"
        onClick={toggleFullscreen}
        title={fullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
        aria-label={fullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
        className="fixed right-4 top-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 bg-obsidian/35 text-bone/80 backdrop-blur-md transition-colors hover:border-bone/50 hover:bg-obsidian/55 hover:text-bone"
      >
        {fullscreen ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" />
          </svg>
        )}
      </button>

      {/* ===================== NAVEGAÇÃO MOBILE ===================== */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          title="Navegar entre os blocos"
          aria-label="Navegar entre os blocos"
          aria-expanded={mobileNavOpen}
          className="fixed right-4 top-16 z-[110] flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 bg-obsidian/35 text-bone/80 backdrop-blur-md transition-colors hover:border-bone/50 hover:bg-obsidian/55 hover:text-bone"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        {mobileNavOpen && (
          <>
            <div className="fixed inset-0 z-[105] bg-obsidian/40" onClick={() => setMobileNavOpen(false)} />
            <nav className="fixed right-4 top-28 z-[110] max-h-[70vh] w-[min(280px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-obsidian/10 bg-bone p-2 shadow-[0_8px_30px_rgba(11,19,16,0.25)]">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(item.id)
                  }}
                  className={cn(
                    'mb-0.5 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg px-3 py-2.5 text-[14px] no-underline transition-colors last:mb-0',
                    active === item.id
                      ? 'bg-gradient-to-br from-[var(--color-doc-dark)] to-obsidian-alt text-bone shadow-[0_2px_8px_rgba(11,19,16,0.25)]'
                      : 'text-obsidian/70 hover:bg-obsidian/5 hover:text-obsidian',
                  )}
                >
                  <span className="shrink-0 font-mono">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </>
        )}
      </div>

      {/* ===================== CAPA ===================== */}
      <div
        id="cover"
        ref={(el) => {
          sectionRefs.current.cover = el
        }}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center text-bone"
        style={{
          background:
            'linear-gradient(180deg, var(--color-brand-dark), var(--color-brand-dark) 60%, var(--color-obsidian-alt))',
        }}
      >
        <div className="mb-7 font-mono text-lg uppercase tracking-wider text-brand-light">Onboarding Resili Sevenn</div>
        <h1 className="mb-6 font-display text-[clamp(38px,6vw,84px)] leading-[0.98] tracking-tight">
          Bem-vindo ao
          <br />
          nosso Ecossistema
        </h1>
        <p className="mx-auto mb-14 max-w-[640px] text-[clamp(16px,2vw,22px)] leading-relaxed text-bone/65">
          O plano completo de como vamos levar sua clínica de onde está hoje até a meta que você definiu, passo a passo.
        </p>
        <div className="mb-16 flex flex-wrap justify-center gap-12">
          <div className="text-center">
            <div className="font-display text-[clamp(28px,4vw,44px)] leading-none text-brand-light">{clientName}</div>
          </div>
        </div>
        <a
          href="#bloco-1"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('bloco-1')
          }}
          className="flex animate-scroll-bob cursor-pointer flex-col items-center gap-2 text-[12.5px] uppercase tracking-wider text-bone/40 no-underline transition-colors hover:text-brand-light"
        >
          <span>Role para ver o plano</span>
          <span>↓</span>
        </a>
      </div>

      <div className="pl-0 md:pl-[68px]">
        {/* ===================== SIDEBAR ===================== */}
        <nav className="group fixed left-0 top-1/2 z-40 hidden max-h-[80vh] w-11 -translate-y-1/2 flex-col gap-0.5 overflow-hidden rounded-r-2xl border border-l-0 border-obsidian/10 bg-bone/85 py-2.5 shadow-[0_4px_20px_rgba(11,19,16,0.08)] backdrop-blur-md transition-all duration-200 hover:w-[270px] hover:shadow-[0_8px_30px_rgba(11,19,16,0.16)] md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(item.id)
              }}
              className={cn(
                'mx-1.5 flex items-center gap-1 overflow-hidden whitespace-nowrap rounded-lg px-2.5 py-2 text-[13.5px] no-underline transition-colors',
                active === item.id
                  ? 'bg-gradient-to-br from-[var(--color-doc-dark)] to-obsidian-alt text-bone shadow-[0_2px_8px_rgba(11,19,16,0.25)]'
                  : 'text-obsidian/60 hover:bg-obsidian/5 hover:text-obsidian',
              )}
            >
              <span className="shrink-0 font-mono">{item.num}</span>
              <span className="max-w-0 shrink-0 opacity-0 transition-[max-width,opacity] duration-200 group-hover:max-w-[220px] group-hover:opacity-100">
                &nbsp;{item.label}
              </span>
            </a>
          ))}
        </nav>

        <main className="mx-auto max-w-[980px] px-6">
          {[
            { id: 'bloco-1', node: <Block01Negocio data={data.bloco1_negocio} /> },
            {
              id: 'bloco-2',
              node: (
                <Block02OndeVoceEsta
                  data={data.bloco2_ondeVoceEsta}
                  editable={editable}
                  onChange={(v) => patch('bloco2_ondeVoceEsta', v)}
                />
              ),
            },
            {
              id: 'bloco-3',
              node: (
                <Block03OndeQuerChegar
                  data={data.bloco3_ondeQuerChegar}
                  ticketMedio={data.bloco2_ondeVoceEsta.ticketMedio}
                  bloco2={data.bloco2_ondeVoceEsta}
                  editable={editable}
                  onChange={(v) => patch('bloco3_ondeQuerChegar', v)}
                />
              ),
            },
            { id: 'bloco-4', node: <Block04ParaQuemAnunciar data={data.bloco4_paraQuemAnunciar} /> },
            {
              id: 'bloco-5',
              node: (
                <Block05OndeVamosAnunciar
                  data={data.bloco5_ondeVamosAnunciar}
                  editable={editable}
                  onChange={(v) => patch('bloco5_ondeVamosAnunciar', v)}
                />
              ),
            },
            { id: 'bloco-6', node: <Block06CaminhoPaciente data={data.bloco6_caminhoPaciente} /> },
            { id: 'bloco-7', node: <Block07Fases data={data.bloco7_fases} /> },
            {
              id: 'bloco-8',
              node: (
                <Block08Criativos
                  data={data.bloco8_criativos}
                  editable={editable}
                  onChange={(v) => patch('bloco8_criativos', v)}
                />
              ),
            },
            {
              id: 'bloco-9',
              node: <Block09Riscos data={data.bloco9_riscos} editable={editable} onChange={(v) => patch('bloco9_riscos', v)} />,
            },
            {
              id: 'bloco-10',
              node: (
                <Block10Checklist
                  data={data.bloco10_checklist}
                  editable={editable}
                  onChange={(v) => patch('bloco10_checklist', v)}
                />
              ),
            },
            {
              id: 'bloco-11',
              node: (
                <Block11ComoTrabalhar
                  data={data.bloco11_comoTrabalhar}
                  editable={editable}
                  onChange={(v) => patch('bloco11_comoTrabalhar', v)}
                />
              ),
            },
            { id: 'bloco-12', node: <Block12Primeiros30Dias data={data.bloco12_primeiros30Dias} /> },
          ].map(({ id, node }, i) => (
            <section
              key={id}
              id={id}
              ref={(el) => {
                sectionRefs.current[id] = el
              }}
              className={cn('relative flex min-h-[92vh] flex-col justify-center py-24', i > 0 && 'block-divider')}
            >
              {node}
            </section>
          ))}
        </main>
      </div>

      {/* ===================== ENCERRAMENTO ===================== */}
      <div
        id="closing"
        ref={(el) => {
          sectionRefs.current.closing = el
        }}
        className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center text-bone"
        style={{
          background:
            'linear-gradient(180deg, var(--color-brand-dark), var(--color-brand-dark) 60%, var(--color-obsidian-alt))',
        }}
      >
        <div className="mb-7 font-mono text-lg uppercase tracking-wider text-brand-light">Resili Sevenn</div>
        <h1 className="mb-6 font-display text-[clamp(38px,6vw,84px)] leading-[0.98] tracking-tight">Obrigado</h1>
        <p className="mx-auto mb-8 max-w-[640px] text-[clamp(16px,2vw,22px)] leading-relaxed text-bone/65">
          Qualquer dúvida, fale com a gente no grupo dedicado no WhatsApp, vamos construir isso juntos.
        </p>
        <p className="font-mono text-xs text-bone/35">
          Onboarding gerado em {new Date(generatedAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
