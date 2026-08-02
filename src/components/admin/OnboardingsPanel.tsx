import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Eye, LogOut } from 'lucide-react'
import { listOnboardings, setOnboardingStatus, type OnboardingRow } from '../../lib/onboardings'
import { fetchProfilesByIds, type Profile } from '../../lib/profiles'
import { cn } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'

const PUBLIC_BASE_URL = window.location.origin

export function OnboardingsPanel() {
  const { signOut } = useAuth()
  const [rows, setRows] = useState<OnboardingRow[]>([])
  const [editors, setEditors] = useState<Record<string, Profile>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editorsError, setEditorsError] = useState(false)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await listOnboardings()
      setRows(data)

      setEditorsError(false)
      const editorIds = [...new Set(data.map((r) => r.last_edited_by).filter((id): id is string => !!id))]
      if (editorIds.length > 0) {
        try {
          setEditors(await fetchProfilesByIds(editorIds))
        } catch {
          setEditorsError(true)
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar onboardings.')
    } finally {
      setLoading(false)
    }
  }

  async function toggleStatus(row: OnboardingRow) {
    const next = row.status === 'active' ? 'paused' : 'active'
    await setOnboardingStatus(row.id, next)
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)))
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/o/${slug}`)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 2000)
  }

  return (
    <div className="min-h-screen bg-brand-dark">
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bone">Onboardings</h1>
        <div className="flex items-center gap-3">
          <Link to="/novo" className="rounded bg-brand px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-hover">
            Gerar novo
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-1.5 rounded border border-white/10 px-4 py-2 text-sm text-bone/70 hover:border-white/30 hover:text-bone"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
      {editorsError && (
        <p className="mb-4 text-sm text-amber-400">
          Não foi possível carregar quem editou cada onboarding — a coluna "Última edição" pode aparecer incompleta.
        </p>
      )}

      {loading ? (
        <p className="text-bone/60">Carregando…</p>
      ) : rows.length === 0 ? (
        <p className="text-bone/60">Nenhum onboarding gerado ainda.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-bone/50">
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Link</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Criado em</th>
                <th className="px-4 py-3 font-medium">Última visualização</th>
                <th className="px-4 py-3 font-medium">Última edição</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 text-bone">
                  <td className="px-4 py-3">{row.client_name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-bone/60">{row.slug}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(row)}
                      className={cn(
                        'rounded-full px-2 py-0.5 text-xs',
                        row.status === 'active' ? 'bg-brand/20 text-brand' : 'bg-white/10 text-bone/60',
                      )}
                    >
                      {row.status === 'active' ? 'Ativo' : 'Pausado'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-bone/60">{new Date(row.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-3 text-bone/60">
                    {row.last_viewed_at ? new Date(row.last_viewed_at).toLocaleDateString('pt-BR') : 'Nunca visualizado'}
                  </td>
                  <td className="px-4 py-3 text-bone/60">
                    {row.last_edited_at ? (
                      <>
                        {new Date(row.last_edited_at).toLocaleDateString('pt-BR')}
                        {row.last_edited_by && editors[row.last_edited_by] && (
                          <span className="block text-xs text-bone/40">
                            por {editors[row.last_edited_by].full_name ?? editors[row.last_edited_by].email}
                          </span>
                        )}
                      </>
                    ) : (
                      'Nunca editado'
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => copyLink(row.slug)} title="Copiar link" className="text-bone/60 hover:text-brand">
                        {copiedSlug === row.slug ? <span className="text-xs text-brand">Copiado!</span> : <Copy className="h-4 w-4" />}
                      </button>
                      <a href={`/o/${row.slug}`} target="_blank" rel="noreferrer" title="Ver documento" className="text-bone/60 hover:text-brand">
                        <Eye className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  )
}
