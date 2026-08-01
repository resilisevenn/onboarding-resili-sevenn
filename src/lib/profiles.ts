import { supabase } from './supabase'

export type ProfileRole = 'admin' | 'comercial' | 'gestor_trafego'
export type ProfileStatus = 'active' | 'paused' | 'inactive'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: ProfileRole
  status: ProfileStatus
  last_seen_at: string | null
  created_at: string
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data as Profile | null
}

export async function touchLastSeen(userId: string): Promise<void> {
  await supabase.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', userId)
}
