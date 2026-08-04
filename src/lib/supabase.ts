import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Sem `auth.lock` customizado de propósito.
 *
 * Passar qualquer lock (inclusive um no-op) força o auth-js a rodar TODA operação de
 * auth pelo caminho legado `_acquireLock`, que encadeia as chamadas numa fila
 * (`pendingInLock`) assumindo exclusão mútua real. Um lock no-op não oferece essa
 * exclusão, então a fila corrompe e getSession()/insert() ficam pendurados para sempre,
 * sem nunca chegar a fazer request — o travamento aparecia depois de ~15 min com a
 * página aberta, conforme o auto-refresh (que roda a cada 30s) ia empilhando ticks.
 *
 * A partir do auth-js 2.x a opção `lock` está deprecada: sem ela, o cliente usa a
 * coordenação lockless própria (refresh single-flight + commit guard), que é o caminho
 * suportado e não trava.
 */
export const supabase = createClient(url, anonKey)

// Exposto temporariamente para diagnosticar o travamento de getSession()/insert() pelo console.
// Remover quando a correção estiver confirmada em uso real.
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
  },
})
