import type { VercelRequest } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

/** Valida o JWT do header Authorization e confirma que é admin/gestor_trafego ativo. Retorna null se não autorizado. */
export async function requireEditorUser(req: VercelRequest): Promise<{ id: string } | null> {
  if (!supabaseUrl || !supabaseAnonKey) return null

  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null
  if (!token) return null

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData.user) return null

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, status')
    .eq('id', userData.user.id)
    .maybeSingle()

  if (profileError || !profile) return null
  if (profile.status !== 'active') return null
  if (profile.role !== 'admin' && profile.role !== 'gestor_trafego') return null

  return { id: userData.user.id }
}
