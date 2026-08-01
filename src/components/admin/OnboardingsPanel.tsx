import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Eye } from 'lucide-react'
import { listOnboardings, setOnboardingStatus, type OnboardingRow } from '../../lib/onboardings'
import { cn } from '../../lib/utils'

const PUBLIC_BASE_URL = window.location.origin

export function OnboardingsPanel() {
  const [rows, setRows] = useState<OnboardingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    try {
      setRows(await listOnboardings())
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-bone">Onboardings</h1>
        <Link to="/novo" className="rounded bg-brand px-4 py-2 text-sm font-medium text-brand-dark hover:bg-brand-hover">
          Gerar novo
        </Link>
      </div>

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
  )
}
