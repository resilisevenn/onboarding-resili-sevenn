import { useState, type FormEvent } from 'react'
import { useAuth } from '../../context/AuthContext'

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'E-mail ou senha incorretos.',
  PAUSED: 'Sua conta está pausada. Fale com o administrador.',
  INACTIVE: 'Sua conta está inativa. Fale com o administrador.',
  FORBIDDEN_ROLE: 'Sua conta não tem acesso a este painel.',
}

export function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await signIn(email, password)
    setSubmitting(false)
    if (result !== 'OK') {
      setError(ERROR_MESSAGES[result] ?? 'Não foi possível entrar.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <img src="/logo-resili-sevenn.png" alt="Resili Sevenn" className="h-10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-white/10 bg-obsidian-alt p-6">
          <h1 className="font-display text-xl text-bone">Onboarding — Acesso</h1>

          <div>
            <label className="mb-1 block text-sm text-bone/70">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-bone/70">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-brand py-2 font-medium text-brand-dark transition hover:bg-brand-hover disabled:opacity-50"
          >
            {submitting ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
