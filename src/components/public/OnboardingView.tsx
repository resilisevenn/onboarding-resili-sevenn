import { useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { getOnboardingPublic, type PublicOnboarding } from '../../lib/onboardings'
import { OnboardingDocument } from '../document/OnboardingDocument'

type State =
  | { status: 'gate' }
  | { status: 'checking' }
  | { status: 'found'; row: PublicOnboarding }
  | { status: 'unavailable' }

export function OnboardingView() {
  const { slug } = useParams<{ slug: string }>()
  const [code, setCode] = useState('')
  const [state, setState] = useState<State>({ status: 'gate' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!slug || code.length !== 4) return

    setState({ status: 'checking' })
    try {
      const row = await getOnboardingPublic(slug, code)
      if (!row) {
        setState({ status: 'unavailable' })
        return
      }
      setState({ status: 'found', row })
    } catch {
      setState({ status: 'unavailable' })
    }
  }

  if (state.status === 'found') {
    return <OnboardingDocument clientName={state.row.client_name} payload={state.row.payload} generatedAt={state.row.created_at} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4">
      <div className="w-full max-w-sm text-center">
        <img src="/logo-resili-sevenn.png" alt="Resili Sevenn" className="mx-auto mb-6 h-8" />

        {state.status === 'unavailable' ? (
          <p className="text-bone/70">
            Não encontramos esse onboarding — confira o link ou o código informado.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-bone/70">Digite os 4 últimos dígitos do WhatsApp cadastrado para acessar.</p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded border border-white/10 bg-obsidian-alt px-3 py-3 text-center font-mono text-2xl tracking-[0.5em] text-bone outline-none focus:border-brand"
              autoFocus
            />
            <button
              type="submit"
              disabled={code.length !== 4 || state.status === 'checking'}
              className="w-full rounded bg-brand py-2 font-medium text-brand-dark transition hover:bg-brand-hover disabled:opacity-50"
            >
              {state.status === 'checking' ? 'Verificando…' : 'Acessar'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
