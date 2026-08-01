import { supabase, supabasePublic } from './supabase'
import type { OnboardingPayload } from '../types/onboarding'

export type OnboardingStatus = 'active' | 'paused'

export interface OnboardingRow {
  id: string
  slug: string
  access_code: string
  client_name: string
  payload: OnboardingPayload
  status: OnboardingStatus
  created_by: string | null
  created_at: string
  last_viewed_at: string | null
  last_edited_at: string | null
  last_edited_by: string | null
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function randomSuffix(length = 8): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, length)
}

export function generateSlug(clientName: string): string {
  return `${slugify(clientName)}-${randomSuffix()}`
}

/** Últimos 4 dígitos do WhatsApp informado no formulário de briefing. */
export function extractAccessCode(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, '')
  return digits.slice(-4)
}

export async function createOnboarding(params: {
  clientName: string
  whatsapp: string
  payload: OnboardingPayload
  createdBy: string
}): Promise<OnboardingRow> {
  const slug = generateSlug(params.clientName)
  const accessCode = extractAccessCode(params.whatsapp)

  const { data, error } = await supabase
    .from('onboardings')
    .insert({
      slug,
      access_code: accessCode,
      client_name: params.clientName,
      payload: params.payload,
      created_by: params.createdBy,
    })
    .select()
    .single()

  if (error) throw error
  return data as OnboardingRow
}

export async function listOnboardings(): Promise<OnboardingRow[]> {
  const { data, error } = await supabase
    .from('onboardings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as OnboardingRow[]
}

export async function setOnboardingStatus(id: string, status: OnboardingStatus): Promise<void> {
  const { error } = await supabase.from('onboardings').update({ status }).eq('id', id)
  if (error) throw error
}

/** Leitura autenticada por slug — usada pelo modo editor (admin/gestor_trafego), sem gate de código. */
export async function getOnboardingBySlug(slug: string): Promise<OnboardingRow | null> {
  const { data, error } = await supabase.from('onboardings').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data as OnboardingRow | null
}

export async function updateOnboardingPayload(id: string, payload: OnboardingPayload, editedBy: string): Promise<void> {
  const { error } = await supabase
    .from('onboardings')
    .update({ payload, last_edited_at: new Date().toISOString(), last_edited_by: editedBy })
    .eq('id', id)
  if (error) throw error
}

export interface PublicOnboarding {
  id: string
  client_name: string
  payload: OnboardingPayload
  created_at: string
}

/** Leitura pública via RPC — única forma de acesso anônimo, valida slug + código de 4 dígitos. */
export async function getOnboardingPublic(slug: string, code: string): Promise<PublicOnboarding | null> {
  const { data, error } = await supabasePublic.rpc('get_onboarding', { p_slug: slug, p_code: code })
  if (error) throw error
  const row = Array.isArray(data) ? data[0] : null
  return (row as PublicOnboarding | undefined) ?? null
}
