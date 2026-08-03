import { supabase, supabasePublic } from './supabase'
import type { OnboardingPayload } from '../types/onboarding'

export type OnboardingStatus = 'active' | 'paused'

/** Log temporário de diagnóstico do travamento em "Gerando.../Salvando...". Remover depois de identificar a causa. */
function logTiming(label: string, inicio: number) {
  console.log(`[timing] ${label}: ${(performance.now() - inicio).toFixed(0)}ms`)
}

/**
 * Falha a promise se ela não assentar no prazo. Sem isso, uma request pendurada
 * (refresh de token travado, rede caída) deixa a UI presa em estado de carregando
 * para sempre, porque o finally que reabilita o botão nunca roda.
 */
async function withTimeout<T>(promise: PromiseLike<T>, ms: number, mensagemErro: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(mensagemErro)), ms)
      }),
    ])
  } finally {
    if (timer) clearTimeout(timer)
  }
}

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

/**
 * Confirma que ainda existe sessão válida antes de gravar. A sessão no contexto do React
 * pode estar em memória com o token já expirado, e nesse caso o insert espera um refresh
 * que nem sempre completa.
 *
 * Importante: só retorna false quando o Supabase respondeu e confirmou que não há sessão.
 * Se getSession() der timeout ou erro de rede, isso NÃO significa sessão expirada — trata
 * como "não deu para confirmar" e deixa a chamada seguinte (o insert/update real) decidir,
 * em vez de bloquear o usuário com uma mensagem errada.
 */
export async function garantirSessaoValida(): Promise<boolean> {
  const inicio = performance.now()
  console.log('[timing] garantirSessaoValida: chamando getSession()...')
  try {
    const { data, error } = await withTimeout(
      supabase.auth.getSession(),
      10000,
      'timeout ao confirmar sessão',
    )
    logTiming('garantirSessaoValida: getSession respondeu', inicio)
    if (error) {
      console.warn('garantirSessaoValida: erro ao consultar sessão, seguindo mesmo assim', error)
      return true
    }
    return !!data.session
  } catch (e) {
    logTiming('garantirSessaoValida: getSession NÃO respondeu (timeout/erro)', inicio)
    console.warn('garantirSessaoValida: getSession não respondeu a tempo, seguindo mesmo assim', e)
    return true
  }
}

export async function createOnboarding(params: {
  clientName: string
  whatsapp: string
  payload: OnboardingPayload
  createdBy: string
}): Promise<OnboardingRow> {
  const inicioTotal = performance.now()
  console.log('[timing] createOnboarding: iniciado')

  const slug = generateSlug(params.clientName)
  const accessCode = extractAccessCode(params.whatsapp)

  const payloadJson = JSON.stringify(params.payload)
  console.log(`[createOnboarding] payload total: ${(payloadJson.length / 1024).toFixed(1)} KB, ${payloadJson.length} caracteres`)
  for (const [bloco, valor] of Object.entries(params.payload)) {
    const tamanho = JSON.stringify(valor).length
    console.log(`[createOnboarding]   - ${bloco}: ${(tamanho / 1024).toFixed(1)} KB`)
  }

  console.log('[timing] createOnboarding: chamando insert()...')
  const inicioInsert = performance.now()
  const { data, error } = await withTimeout(
    supabase
      .from('onboardings')
      .insert({
        slug,
        access_code: accessCode,
        client_name: params.clientName,
        payload: params.payload,
        created_by: params.createdBy,
      })
      .select()
      .single(),
    20000,
    'A criação demorou demais e foi cancelada. Verifique sua conexão e tente novamente.',
  ).catch((e) => {
    logTiming('createOnboarding: insert() FALHOU/timeout', inicioInsert)
    logTiming('createOnboarding: total até falhar', inicioTotal)
    throw e
  })
  logTiming('createOnboarding: insert() respondeu', inicioInsert)
  logTiming('createOnboarding: total', inicioTotal)

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
  const { error } = await withTimeout(
    supabase
      .from('onboardings')
      .update({ payload, last_edited_at: new Date().toISOString(), last_edited_by: editedBy })
      .eq('id', id),
    20000,
    'O salvamento demorou demais e foi cancelado. Verifique sua conexão e tente novamente.',
  )
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
