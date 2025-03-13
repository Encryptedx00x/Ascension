// Dados simulados para APIs
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Budget {
  id: number;
  client: string;
  email: string;
  phone: string;
  type: string;
  description: string;
  deadline: string;
  budget_range: string;
  status: 'Pendente' | 'Em análise' | 'Aprovado' | 'Recusado';
  createdAt: string;
  statusUpdatedAt?: string;
  project?: string;
  company?: string;
  features?: string[];
  designPreferences?: string;
  references?: string;
  howFound?: string;
  message?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
}

// Membros simulados
export const members: Member[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 98765-4321',
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    phone: '(11) 91234-5678',
    createdAt: '2023-02-20',
  },
  {
    id: 3,
    name: 'Carlos Santos',
    email: 'carlos@example.com',
    phone: '(11) 99876-5432',
    createdAt: '2023-03-10',
  },
];

// Orçamentos simulados
export const budgets: Budget[] = [
  {
    id: 1,
    client: 'Empresa ABC',
    email: 'contato@abc.com',
    phone: '(11) 3333-4444',
    type: 'Site Institucional',
    description: 'Precisamos de um site institucional moderno e responsivo para nossa empresa.',
    deadline: 'normal',
    budget_range: '2000-5000',
    status: 'Pendente',
    createdAt: '2023-03-10',
  },
  {
    id: 2,
    client: 'Loja XYZ',
    email: 'contato@xyz.com',
    phone: '(11) 5555-6666',
    type: 'E-commerce',
    description: 'E-commerce completo com pagamento online e gestão de estoque.',
    deadline: 'flexivel',
    budget_range: '5000-10000',
    status: 'Aprovado',
    createdAt: '2023-03-05',
  },
  {
    id: 3,
    client: 'Fotógrafo José',
    email: 'jose@fotografo.com',
    phone: '(11) 7777-8888',
    type: 'Portfólio',
    description: 'Portfólio para exibir meus trabalhos de fotografia.',
    deadline: 'urgente',
    budget_range: 'ate-2000',
    status: 'Em análise',
    createdAt: '2023-03-01',
  },
];

// Itens de portfólio simulados
export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'E-commerce TechStore',
    category: 'loja',
    description: 'Desenvolvimento de uma loja online completa para produtos de tecnologia, com sistema de pagamento integrado e painel administrativo.',
    image: '/images/portfolio-placeholder.svg',
    link: '#',
    createdAt: '2023-01-20',
  },
  {
    id: 2,
    title: 'Site Institucional JurisTech',
    category: 'institucional',
    description: 'Criação de site institucional moderno para escritório de advocacia, com design exclusivo e otimização para SEO.',
    image: '/images/portfolio-placeholder.svg',
    link: '#',
    createdAt: '2023-02-15',
  },
  {
    id: 3,
    title: 'Portfólio Fotógrafo Carlos Silva',
    category: 'portfolio',
    description: 'Desenvolvimento de portfólio online com galeria interativa para fotógrafo profissional.',
    image: '/images/portfolio-placeholder.svg',
    link: '#',
    createdAt: '2023-03-05',
  },
  {
    id: 4,
    title: 'Sistema de Agendamento ClínicaMed',
    category: 'agendamento',
    description: 'Criação de sistema de agendamento online para clínica médica, com notificações automáticas e painel para gerenciamento.',
    image: '/images/portfolio-placeholder.svg',
    createdAt: '2023-02-28',
  },
  {
    id: 5,
    title: 'Portal de Turismo ViajeBem',
    category: 'turismo',
    description: 'Desenvolvimento de portal de turismo com sistema de reservas e gerenciamento de pacotes de viagem.',
    image: '/images/portfolio-placeholder.svg',
    link: '#',
    createdAt: '2023-01-10',
  },
  {
    id: 6,
    title: 'E-commerce Moda Atual',
    category: 'loja',
    description: 'Loja virtual para marca de roupas com catálogo interativo e sistema de vendas completo.',
    image: '/images/portfolio-placeholder.svg',
    createdAt: '2023-03-15',
  }
]; 