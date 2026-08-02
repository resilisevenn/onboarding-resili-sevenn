import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { LoginPage } from './components/auth/LoginPage'
import { AccountBlocked } from './components/auth/AccountBlocked'
import { OnboardingFormPage } from './components/form/OnboardingFormPage'
import { OnboardingsPanel } from './components/admin/OnboardingsPanel'
import { OnboardingView } from './components/public/OnboardingView'
import { DevPreviewPage } from './dev/DevPreviewPage'

export default function App() {
  const { session, profile, loading } = useAuth()
  const location = useLocation()

  // Rota temporária de desenvolvimento — sem gate/Supabase, usada para visualizar a
  // migração de design dos 12 blocos com dados fictícios. Remover ao final da migração.
  if (location.pathname === '/dev-preview') {
    return <DevPreviewPage />
  }

  // Rota pública do onboarding — acessível sem login. Se o visitante estiver logado
  // como admin/gestor_trafego, OnboardingView abre direto em modo edição.
  if (location.pathname.startsWith('/o/')) {
    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-brand-dark">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      )
    }
    return (
      <Routes>
        <Route path="/o/:slug" element={<OnboardingView />} />
      </Routes>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return <LoginPage />
  }

  if (profile && profile.status !== 'active') {
    return <AccountBlocked status={profile.status} />
  }

  return (
    <Routes>
      <Route path="/" element={<OnboardingsPanel />} />
      <Route path="/novo" element={<OnboardingFormPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
