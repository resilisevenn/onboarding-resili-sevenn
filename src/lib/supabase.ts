import { createClient, type LockFunc } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Lock no-op: desliga a Web Locks API do gotrue, que trava getSession()/signOut()
 * com double-mount do React Strict Mode (dev) e lock roubado entre abas (prod).
 * Uso interno, sessão única por usuário — sem risco prático de corrida.
 */
const noopLock: LockFunc = async (_name, _acquireTimeout, fn) => fn()

export const supabase = createClient(url, anonKey, {
  auth: { lock: noopLock },
})

// Exposto temporariamente para diagnosticar o travamento de getSession()/insert() pelo console.
// Remover quando a causa estiver identificada.
;(window as unknown as { supabase: typeof supabase }).supabase = supabase

/**
 * Cliente para a rota pública /o/:slug. Não persiste/renova sessão e usa storageKey
 * própria para não colidir com uma sessão de gestor logada no mesmo navegador.
 */
export const supabasePublic = createClient(url, anonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'sb-resili-onboarding-public',
    lock: noopLock,
  },
})
