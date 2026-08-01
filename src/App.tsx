import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { LoginPage } from './components/auth/LoginPage'
import { AccountBlocked } from './components/auth/AccountBlocked'
import { OnboardingFormPage } from './components/form/OnboardingFormPage'
import { OnboardingsPanel } from './components/admin/OnboardingsPanel'
import { OnboardingView } from './components/public/OnboardingView'

export default function App() {
  const { session, profile, loading } = useAuth()
  const location = useLocation()

  // Rota pública do onboarding — acessível sem login, antes de qualquer gate de auth.
  if (location.pathname.startsWith('/o/')) {
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
