import type { ItemChecklist } from '../types/onboarding'

export interface ChecklistTemplate {
  id: 'so_trafego' | 'trafego_comercial' | 'trafego_posicionamento_comercial' | 'completo_crc'
  nome: string
  frentesContratadas: string
  itens: ItemChecklist[]
}

const ITENS_SO_TRAFEGO: ItemChecklist[] = [
  { item: 'Acesso de administrador ao Business Manager (Meta)', prazo: 'Imediato, máximo 2 dias', responsavel: 'Cliente' },
  { item: 'Acesso à página do Instagram/Facebook (ou convite como parceiro)', prazo: 'Imediato, junto do acesso ao BM', responsavel: 'Cliente' },
  { item: 'Forma de pagamento ativa na conta de anúncios', prazo: 'Semana 1', responsavel: 'Cliente' },
  { item: 'Definir quem responde os leads no WhatsApp', prazo: 'Antes de começar', responsavel: 'Cliente' },
  { item: 'Enviar materiais/fotos/vídeos para os criativos iniciais', prazo: 'Até 3 dias', responsavel: 'Cliente' },
  { item: 'Configurar Business Manager, pixel e públicos', prazo: 'Semana 1', responsavel: 'Agência' },
  { item: 'Criar e subir os primeiros criativos', prazo: 'Semana 1, até o 7º dia', responsavel: 'Agência' },
]

const ITENS_TRAFEGO_COMERCIAL: ItemChecklist[] = [
  ...ITENS_SO_TRAFEGO,
  { item: 'Definir responsável único por lead, configurado no CRM', prazo: 'Imediato', responsavel: 'Cliente' },
  {
    item: 'Definir e comunicar o tempo máximo de resposta ao lead (ideal: minutos) para a equipe de recepção',
    prazo: 'Antes de começar',
    responsavel: 'Cliente',
  },
  { item: 'Acesso ao WhatsApp Business (número principal)', prazo: 'Semana 1', responsavel: 'Cliente' },
  {
    item: 'Implementar CRM com processo de atendimento/objeções (inclui roteiro de objeções de preço e automação de confirmação de agendamento)',
    prazo: '10 a 15 dias',
    responsavel: 'Agência',
  },
]

const ITENS_TRAFEGO_POSICIONAMENTO_COMERCIAL: ItemChecklist[] = [
  ...ITENS_TRAFEGO_COMERCIAL,
  {
    item: 'Conceder acesso de administrador ao perfil do Instagram (para postar/gerenciar o posicionamento)',
    prazo: 'Semana 1',
    responsavel: 'Cliente',
  },
  {
    item: 'Definir quem na clínica grava vídeos/bastidores no dia a dia para alimentar o posicionamento',
    prazo: 'Antes de começar',
    responsavel: 'Cliente',
  },
  { item: 'Aprovar linha editorial de posicionamento do perfil', prazo: 'Semana 1', responsavel: 'Cliente' },
  { item: 'Enviar banco de fotos institucionais / da equipe / da clínica', prazo: 'Até 3 dias', responsavel: 'Cliente' },
  { item: 'Planejar calendário de conteúdo do perfil (posicionamento)', prazo: 'Semana 1', responsavel: 'Agência' },
]

const ITENS_COMPLETO_CRC: ItemChecklist[] = [
  ...ITENS_TRAFEGO_POSICIONAMENTO_COMERCIAL,
  { item: 'Acesso à base de contatos/pacientes para reativação', prazo: 'Semana 1', responsavel: 'Cliente' },
  { item: 'Acesso ao sistema de agendamento/CRM utilizado', prazo: 'Semana 1', responsavel: 'Cliente' },
  {
    item: 'Compartilhar contatos da recepção/atendimento para alinhamento CRC',
    prazo: 'Antes de começar',
    responsavel: 'Cliente',
  },
  { item: 'Estruturar processo de Reativação de Base', prazo: 'Até 30 dias', responsavel: 'Agência' },
]

export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: 'so_trafego',
    nome: 'Só Tráfego Pago',
    frentesContratadas: 'Sem Posicionamento, sem Estruturação Comercial, sem Atendimento Ouro (CRC).',
    itens: ITENS_SO_TRAFEGO,
  },
  {
    id: 'trafego_comercial',
    nome: 'Tráfego + Estruturação Comercial',
    frentesContratadas: 'Tem CRM/processo comercial, mas sem Posicionamento e sem Atendimento Ouro (CRC).',
    itens: ITENS_TRAFEGO_COMERCIAL,
  },
  {
    id: 'trafego_posicionamento_comercial',
    nome: 'Tráfego + Posicionamento + Comercial',
    frentesContratadas: 'Tem Posicionamento e Comercial, mas ainda sem Atendimento Ouro (CRC).',
    itens: ITENS_TRAFEGO_POSICIONAMENTO_COMERCIAL,
  },
  {
    id: 'completo_crc',
    nome: 'Completo — com Atendimento Ouro (CRC)',
    frentesContratadas: 'Tem Posicionamento, Comercial e Atendimento Ouro (CRC) cuidando dos leads.',
    itens: ITENS_COMPLETO_CRC,
  },
]
