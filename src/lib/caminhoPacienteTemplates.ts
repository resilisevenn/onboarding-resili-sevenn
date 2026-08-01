export interface CaminhoPacienteTemplate {
  id: number
  nome: string
  etapas: { titulo: string; descricao: string }[]
}

export const CAMINHOS_PACIENTE_TEMPLATES: CaminhoPacienteTemplate[] = [
  {
    id: 1,
    nome: 'Caminho 01 — WhatsApp direto',
    etapas: [
      { titulo: 'Anúncio Instagram', descricao: '' },
      { titulo: 'Clique no botão "WhatsApp"', descricao: '' },
      { titulo: 'Conversa com atendente/recepção', descricao: '' },
      { titulo: 'Qualificação', descricao: 'Dúvidas, convênio, disponibilidade.' },
      { titulo: 'Agendamento confirmado', descricao: '' },
    ],
  },
  {
    id: 2,
    nome: 'Caminho 02 — Instagram + WhatsApp',
    etapas: [
      { titulo: 'Anúncio (perfil Instagram + WhatsApp)', descricao: '' },
      { titulo: 'Lead se torna seguidor ou consome os conteúdos', descricao: '' },
      { titulo: 'Recebe anúncio com o botão de enviar mensagem WhatsApp', descricao: '' },
      { titulo: 'Conversa com atendente/recepção', descricao: '' },
      { titulo: 'Qualificação', descricao: 'Dúvidas, convênio, disponibilidade.' },
      { titulo: 'Agendamento confirmado', descricao: '' },
    ],
  },
  {
    id: 3,
    nome: 'Caminho 03 — Formulário/Landing Page',
    etapas: [
      { titulo: 'Anúncio no Instagram', descricao: '' },
      { titulo: 'Clica no botão e cai no formulário', descricao: '' },
      { titulo: 'Preenche nome e telefone', descricao: '' },
      { titulo: 'É redirecionado para WhatsApp', descricao: '' },
      { titulo: 'Qualificação', descricao: '' },
      { titulo: 'Agendamento confirmado', descricao: '' },
    ],
  },
  {
    id: 4,
    nome: 'Caminho 04 — Site no Google',
    etapas: [
      { titulo: 'Pesquisa no Google', descricao: 'Encontra o site ou a ficha do Google Meu Negócio.' },
      { titulo: 'Acessa o site e clica no botão', descricao: '' },
      { titulo: 'É direcionado para WhatsApp', descricao: '' },
      { titulo: 'Atendimento', descricao: '' },
      { titulo: 'Agendamento', descricao: '' },
    ],
  },
  {
    id: 5,
    nome: 'Caminho 05 — Instagram + WhatsApp + Google (todos os 3)',
    etapas: [
      { titulo: 'Lead chega por Instagram, WhatsApp ou Google', descricao: 'Origem pode ser anúncio, perfil, pesquisa ou ficha do Google Meu Negócio.' },
      { titulo: 'Contato via WhatsApp', descricao: 'Todas as origens convergem para conversa no WhatsApp.' },
      { titulo: 'Qualificação', descricao: 'Dúvidas, convênio, disponibilidade.' },
      { titulo: 'Agendamento confirmado', descricao: '' },
    ],
  },
]
