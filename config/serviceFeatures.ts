export interface ServiceFeatures {
  defaultFeatures: string[];
  optionalFeatures: string[];
}

export const serviceFeaturesMap: Record<string, ServiceFeatures> = {
  'portfolio': {
    defaultFeatures: [
      'Design Responsivo',
      'Galeria de Imagens',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Hospedagem e Domínio'
    ],
    optionalFeatures: [
      'Blog',
      'Newsletter',
      'Chat Online',
      'SEO Avançado',
      'Personalização Avançada'
    ]
  },
  'website': {
    defaultFeatures: [
      'Design Responsivo',
      'Formulário de Contato',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Hospedagem e Domínio'
    ],
    optionalFeatures: [
      'Blog',
      'Newsletter',
      'Chat Online',
      'SEO Avançado',
      'Personalização Avançada'
    ]
  },
  'ecommerce': {
    defaultFeatures: [
      'Design Responsivo',
      'Sistema de E-commerce',
      'Gestão de Produtos',
      'Carrinho de Compras',
      'Gateway de Pagamento',
      'Painel Administrativo',
      'SEO Avançado',
      'Hospedagem e Domínio',
      'Integração com Marketplaces'
    ],
    optionalFeatures: [
      'Sistema de Fidelidade',
      'Chat Online',
      'Personalização Avançada'
    ]
  },
  'agendamento': {
    defaultFeatures: [
      'Design Responsivo',
      'Calendário Interativo',
      'Gestão de Horários',
      'Notificações Automáticas',
      'Painel Administrativo',
      'Integração com WhatsApp',
      'Hospedagem e Domínio'
    ],
    optionalFeatures: [
      'Chat Online',
      'SEO Avançado',
      'Personalização Avançada'
    ]
  },
  'sistema-web': {
    defaultFeatures: [
      'Design Responsivo',
      'Painel Administrativo',
      'Gestão de Usuários',
      'Relatórios e Análises',
      'Integração com APIs',
      'Hospedagem e Domínio'
    ],
    optionalFeatures: [
      'Chat Online',
      'SEO Avançado',
      'Personalização Avançada'
    ]
  },
  'personalizado': {
    defaultFeatures: [
      'Design Personalizado',
      'Funcionalidades Específicas',
      'Integrações Customizadas',
      'Painel Administrativo',
      'Hospedagem e Domínio'
    ],
    optionalFeatures: [
      'Chat Online',
      'SEO Avançado',
      'Personalização Avançada'
    ]
  }
}; 