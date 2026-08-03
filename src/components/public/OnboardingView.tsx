import { useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  garantirSessaoValida,
  getOnboardingBySlug,
  getOnboardingPublic,
  updateOnboardingPayload,
  type OnboardingRow,
  type PublicOnboarding,
} from '../../lib/onboardings'
import type { OnboardingPayload } from '../../types/onboarding'
import { OnboardingDocument } from '../document/OnboardingDocument'

type State =
  | { status: 'gate' }
  | { status: 'checking' }
  | { status: 'found'; row: PublicOnboarding }
  | { status: 'unavailable' }

const EDITOR_ROLES = ['admin', 'gestor_trafego']

export function OnboardingView() {
  const { slug } = useParams<{ slug: string }>()
  const { session, profile } = useAuth()
  const [code, setCode] = useState('')
  const [state, setState] = useState<State>({ status: 'gate' })

  const canEdit = !!session && profile?.status === 'active' && EDITOR_ROLES.includes(profile.role)

  const [editorRow, setEditorRow] = useState<OnboardingRow | null>(null)
  const [editorLoading, setEditorLoading] = useState(canEdit)
  const [editorError, setEditorError] = useState<string | null>(null)

  useEffect(() => {
    if (!canEdit || !slug) return
    let active = true
    setEditorLoading(true)
    getOnboardingBySlug(slug)
      .then((row) => {
        if (active) setEditorRow(row)
      })
      .catch((e) => {
        if (active) setEditorError(e instanceof Error ? e.message : 'Erro ao carregar onboarding.')
      })
      .finally(() => {
        if (active) setEditorLoading(false)
      })
    return () => {
      active = false
    }
  }, [canEdit, slug])

  async function handleSave(payload: OnboardingPayload) {
    if (!editorRow || !session) throw new Error('Sua sessão expirou. Faça login novamente para salvar.')
    if (!(await garantirSessaoValida())) {
      throw new Error('Sua sessão expirou. Faça login novamente para salvar.')
    }
    await updateOnboardingPayload(editorRow.id, payload, session.user.id)
    setEditorRow({ ...editorRow, payload, last_edited_at: new Date().toISOString(), last_edited_by: session.user.id })
  }

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

  if (canEdit) {
    if (editorLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-bone">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      )
    }
    if (editorError || !editorRow) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-bone px-4 text-center text-obsidian/70">
          {editorError ?? 'Onboarding não encontrado.'}
        </div>
      )
    }
    return (
      <OnboardingDocument
        clientName={editorRow.client_name}
        payload={editorRow.payload}
        generatedAt={editorRow.created_at}
        editable
        onSave={handleSave}
      />
    )
  }

  if (state.status === 'found') {
    return <OnboardingDocument clientName={state.row.client_name} payload={state.row.payload} generatedAt={state.row.created_at} />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
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
              className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-3 text-center font-mono text-2xl tracking-[0.5em] text-bone outline-none focus:border-brand"
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
