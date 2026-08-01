import { useAuth } from '../../context/AuthContext'
import type { ProfileStatus } from '../../lib/profiles'

const MESSAGES: Record<ProfileStatus, string> = {
  paused: 'Sua conta está pausada. Fale com o administrador para reativação.',
  inactive: 'Sua conta está inativa.',
  active: '',
}

export function AccountBlocked({ status }: { status: ProfileStatus }) {
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-obsidian px-4 text-center">
      <img src="/logo-resili-sevenn.png" alt="Resili Sevenn" className="h-10" />
      <p className="max-w-sm text-bone/80">{MESSAGES[status]}</p>
      <button onClick={signOut} className="text-sm text-brand underline">
        Sair
      </button>
    </div>
  )
}
