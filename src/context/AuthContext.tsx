import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { fetchProfile, touchLastSeen, type Profile } from '../lib/profiles'

type SignInResult = 'OK' | 'INVALID_CREDENTIALS' | 'PAUSED' | 'INACTIVE' | 'FORBIDDEN_ROLE'

interface AuthContextValue {
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<SignInResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Apenas admin e gestor_trafego têm acesso a este app.
const ALLOWED_ROLES: Profile['role'][] = ['admin', 'gestor_trafego']

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      if (data.session) {
        const p = await fetchProfile(data.session.user.id)
        if (active) setProfile(p)
      }
      if (active) setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      if (newSession) {
        const p = await fetchProfile(newSession.user.id)
        setProfile(p)
      } else {
        setProfile(null)
      }
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string): Promise<SignInResult> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.session) return 'INVALID_CREDENTIALS'

    const p = await fetchProfile(data.session.user.id)

    if (!p || p.status !== 'active') {
      await supabase.auth.signOut()
      return p?.status === 'paused' ? 'PAUSED' : 'INACTIVE'
    }

    if (!ALLOWED_ROLES.includes(p.role)) {
      await supabase.auth.signOut()
      return 'FORBIDDEN_ROLE'
    }

    setProfile(p)
    touchLastSeen(p.id)
    return 'OK'
  }

  async function signOut() {
    await supabase.auth.signOut()
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
