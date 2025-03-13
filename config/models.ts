export interface ModelFeature {
  name: string;
  description: string;
  isDefault: boolean;
}

export interface Model {
  id: string;
  name: string;
  price: string;
  description: string;
  features: ModelFeature[];
  color: string;
}

export const models: Model[] = [
  {
    id: 'portfolio',
    name: 'Portfólio',
    price: 'R$ 1.997',
    description: 'Perfeito para profissionais que querem mostrar seus trabalhos',
    color: 'blue',
    features: [
      {
        name: 'Design Responsivo',
        description: 'Site adaptável para todos os dispositivos',
        isDefault: true
      },
      {
        name: 'Galeria de Imagens',
        description: 'Exibição profissional dos seus trabalhos',
        isDefault: true
      },
      {
        name: 'SEO Básico',
        description: 'Otimização para mecanismos de busca',
        isDefault: true
      },
      {
        name: 'Integração com Redes Sociais',
        description: 'Conecte seu portfólio com suas redes sociais',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gerencie seu conteúdo facilmente',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Blog',
        description: 'Compartilhe suas experiências e conhecimentos',
        isDefault: false
      },
      {
        name: 'Newsletter',
        description: 'Capture leads e mantenha contato com seus seguidores',
        isDefault: false
      }
    ]
  },
  {
    id: 'website',
    name: 'Site Institucional',
    price: 'R$ 2.997',
    description: 'Ideal para empresas que querem uma presença online profissional',
    color: 'purple',
    features: [
      {
        name: 'Design Responsivo',
        description: 'Site adaptável para todos os dispositivos',
        isDefault: true
      },
      {
        name: 'Formulário de Contato',
        description: 'Facilite o contato com seus clientes',
        isDefault: true
      },
      {
        name: 'SEO Básico',
        description: 'Otimização para mecanismos de busca',
        isDefault: true
      },
      {
        name: 'Integração com Redes Sociais',
        description: 'Conecte seu site com suas redes sociais',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gerencie seu conteúdo facilmente',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Blog',
        description: 'Compartilhe novidades e conteúdo relevante',
        isDefault: false
      },
      {
        name: 'Newsletter',
        description: 'Capture leads e mantenha contato com seus clientes',
        isDefault: false
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    price: 'R$ 4.997',
    description: 'Solução completa para venda online',
    color: 'green',
    features: [
      {
        name: 'Design Responsivo',
        description: 'Loja adaptável para todos os dispositivos',
        isDefault: true
      },
      {
        name: 'Sistema de E-commerce',
        description: 'Gestão completa de produtos e vendas',
        isDefault: true
      },
      {
        name: 'Gestão de Produtos',
        description: 'Controle total do seu catálogo',
        isDefault: true
      },
      {
        name: 'Carrinho de Compras',
        description: 'Processo de compra intuitivo',
        isDefault: true
      },
      {
        name: 'Gateway de Pagamento',
        description: 'Múltiplas formas de pagamento',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gerencie sua loja facilmente',
        isDefault: true
      },
      {
        name: 'SEO Avançado',
        description: 'Otimização completa para mecanismos de busca',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Integração com Marketplaces',
        description: 'Venda em múltiplos canais',
        isDefault: true
      }
    ]
  },
  {
    id: 'agendamento',
    name: 'Sistema de Agendamento',
    price: 'R$ 3.997',
    description: 'Sistema completo para agendamento de serviços',
    color: 'orange',
    features: [
      {
        name: 'Design Responsivo',
        description: 'Sistema adaptável para todos os dispositivos',
        isDefault: true
      },
      {
        name: 'Calendário Interativo',
        description: 'Visualização clara dos horários disponíveis',
        isDefault: true
      },
      {
        name: 'Gestão de Horários',
        description: 'Controle total da agenda',
        isDefault: true
      },
      {
        name: 'Notificações Automáticas',
        description: 'Lembretes para clientes e profissionais',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gerencie agendamentos facilmente',
        isDefault: true
      },
      {
        name: 'Integração com WhatsApp',
        description: 'Comunicação direta com clientes',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Chat Online',
        description: 'Atendimento em tempo real',
        isDefault: false
      }
    ]
  },
  {
    id: 'sistema-web',
    name: 'Sistema Web',
    price: 'R$ 3.497',
    description: 'Solução especializada para sistemas web',
    color: 'teal',
    features: [
      {
        name: 'Design Responsivo',
        description: 'Sistema adaptável para todos os dispositivos',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gestão completa do sistema',
        isDefault: true
      },
      {
        name: 'Gestão de Usuários',
        description: 'Controle de acesso e permissões',
        isDefault: true
      },
      {
        name: 'Relatórios e Análises',
        description: 'Insights sobre o uso do sistema',
        isDefault: true
      },
      {
        name: 'Integração com APIs',
        description: 'Conecte com outros sistemas',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Chat Online',
        description: 'Suporte em tempo real',
        isDefault: false
      }
    ]
  },
  {
    id: 'personalizado',
    name: 'Personalizado',
    price: 'Sob Consulta',
    description: 'Solução sob medida para suas necessidades específicas',
    color: 'indigo',
    features: [
      {
        name: 'Design Personalizado',
        description: 'Interface única para seu negócio',
        isDefault: true
      },
      {
        name: 'Funcionalidades Específicas',
        description: 'Recursos desenvolvidos sob medida',
        isDefault: true
      },
      {
        name: 'Integrações Customizadas',
        description: 'Conexões com seus sistemas existentes',
        isDefault: true
      },
      {
        name: 'Painel Administrativo',
        description: 'Gestão personalizada do sistema',
        isDefault: true
      },
      {
        name: 'Hospedagem e Domínio',
        description: 'Inclui hospedagem e domínio por 1 ano',
        isDefault: true
      },
      {
        name: 'Chat Online',
        description: 'Suporte dedicado',
        isDefault: false
      }
    ]
  }
];

export const getModelById = (id: string): Model | undefined => {
  return models.find(model => model.id === id);
};

export const getDefaultFeatures = (modelId: string): ModelFeature[] => {
  const model = getModelById(modelId);
  return model ? model.features.filter(feature => feature.isDefault) : [];
};

export const getOptionalFeatures = (modelId: string): ModelFeature[] => {
  const model = getModelById(modelId);
  return model ? model.features.filter(feature => !feature.isDefault) : [];
}; 