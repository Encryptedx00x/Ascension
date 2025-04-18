// Dados simulados para substituir o banco de dados
export const mockData = {
  budgets: [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '11987654321',
      company: 'Empresa Exemplo',
      projectType: 'Site Institucional',
      projectDescription: 'Precisamos de um site moderno para nossa empresa.',
      deadline: '2 meses',
      budget: 'R$ 5.000 - R$ 10.000',
      features: { landing: true, blog: true, contact: true },
      designPreferences: 'Estilo minimalista e moderno',
      references: 'www.exemplo.com.br',
      howFound: 'Google',
      additionalInfo: 'Precisamos que o site seja responsivo',
      status: 'pendente',
      createdAt: new Date('2023-01-15').toISOString(),
      updatedAt: new Date('2023-01-15').toISOString()
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      email: 'maria@example.com',
      phone: '11976543210',
      company: 'Startup XYZ',
      projectType: 'E-commerce',
      projectDescription: 'Loja virtual para venda de produtos artesanais',
      deadline: '3 meses',
      budget: 'R$ 15.000 - R$ 20.000',
      features: { products: true, cart: true, checkout: true, admin: true },
      designPreferences: 'Colorido e atrativo',
      references: 'www.outraref.com',
      howFound: 'Indicação',
      additionalInfo: 'Integração com PagSeguro e Correios',
      status: 'reviewing',
      createdAt: new Date('2023-02-10').toISOString(),
      updatedAt: new Date('2023-02-12').toISOString()
    }
  ],
  
  contacts: [
    {
      id: 1,
      name: 'Ana Carolina',
      email: 'ana@example.com',
      phone: '11912345678',
      subject: 'Dúvida sobre serviços',
      message: 'Gostaria de saber mais sobre os serviços de design oferecidos.',
      status: 'pendente',
      createdAt: new Date('2023-01-20').toISOString(),
      updatedAt: new Date('2023-01-20').toISOString()
    },
    {
      id: 2,
      name: 'Carlos Eduardo',
      email: 'carlos@example.com',
      phone: '11987651234',
      subject: 'Orçamento para app',
      message: 'Preciso de um orçamento para desenvolvimento de aplicativo.',
      status: 'respondido',
      createdAt: new Date('2023-02-05').toISOString(),
      updatedAt: new Date('2023-02-06').toISOString()
    }
  ],
  
  portfolio: [
    {
      id: '1',
      title: 'Site Institucional - XYZ Corp',
      description: 'Site institucional moderno desenvolvido para a XYZ Corp.',
      imageUrl: '/images/placeholder-project.jpg',
      category: 'website',
      link: 'https://example.com',
      client: 'XYZ Corporation',
      technologies: 'Next.js, Tailwind CSS',
      features: 'Design responsivo, Blog, Formulário de contato',
      featured: true,
      createdAt: new Date('2022-10-15').toISOString(),
      updatedAt: new Date('2022-10-15').toISOString()
    },
    {
      id: '2',
      title: 'E-commerce - Boutique Online',
      description: 'Loja virtual completa para venda de produtos de moda.',
      imageUrl: '/images/placeholder-project.jpg',
      category: 'ecommerce',
      link: 'https://example2.com',
      client: 'Boutique Fashion',
      technologies: 'React, Node.js, MongoDB',
      features: 'Catálogo de produtos, Carrinho, Checkout, Painel admin',
      featured: true,
      createdAt: new Date('2022-11-20').toISOString(),
      updatedAt: new Date('2022-11-20').toISOString()
    }
  ],
  
  team: [
    {
      id: 1,
      name: 'Rodrigo Almeida',
      email: 'rodrigo@ascension.com',
      phone: '11998765432',
      role: 'CEO',
      position: 'Fundador e CEO',
      bio: 'Mais de 10 anos de experiência em desenvolvimento web e gestão de projetos.',
      imageUrl: '/images/team/rodrigo.jpg',
      socialLinks: JSON.stringify({
        linkedin: 'https://linkedin.com/in/rodrigo',
        github: 'https://github.com/rodrigo'
      }),
      createdAt: new Date('2021-05-10').toISOString(),
      updatedAt: new Date('2021-05-10').toISOString()
    },
    {
      id: 2,
      name: 'Fernanda Costa',
      email: 'fernanda@ascension.com',
      phone: '11987654321',
      role: 'Designer',
      position: 'Designer UX/UI Senior',
      bio: 'Especialista em design de interfaces e experiência do usuário.',
      imageUrl: '/images/team/fernanda.jpg',
      socialLinks: JSON.stringify({
        linkedin: 'https://linkedin.com/in/fernanda',
        behance: 'https://behance.net/fernanda'
      }),
      createdAt: new Date('2021-06-15').toISOString(),
      updatedAt: new Date('2021-06-15').toISOString()
    }
  ],
  
  newsletter: [
    {
      id: 1,
      email: 'assinante1@example.com',
      createdAt: new Date('2023-01-05').toISOString(),
      updatedAt: new Date('2023-01-05').toISOString()
    },
    {
      id: 2,
      email: 'assinante2@example.com',
      createdAt: new Date('2023-01-10').toISOString(),
      updatedAt: new Date('2023-01-10').toISOString()
    }
  ],
  
  serviceRequests: [
    {
      id: '1',
      name: 'Paulo Roberto',
      email: 'paulo@example.com',
      phone: '11987456321',
      service: 'Desenvolvimento Web',
      message: 'Preciso de um site para minha empresa de consultoria.',
      status: 'pendente',
      createdAt: new Date('2023-01-25').toISOString(),
      updatedAt: new Date('2023-01-25').toISOString()
    },
    {
      id: '2',
      name: 'Sandra Mendes',
      email: 'sandra@example.com',
      phone: '11976543219',
      service: 'Design Gráfico',
      message: 'Gostaria de um orçamento para redesign da identidade visual.',
      status: 'contacted',
      createdAt: new Date('2023-02-03').toISOString(),
      updatedAt: new Date('2023-02-04').toISOString()
    }
  ],
  
  dashboard: {
    stats: {
      budgets: 24,
      contacts: 36,
      projects: 18,
      newsletter: 150
    },
    recentBudgets: [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@example.com',
        projectType: 'Site Institucional',
        createdAt: new Date('2023-01-15').toISOString()
      },
      {
        id: '2',
        name: 'Maria Oliveira',
        email: 'maria@example.com',
        projectType: 'E-commerce',
        createdAt: new Date('2023-02-10').toISOString()
      }
    ],
    recentContacts: [
      {
        id: 1,
        name: 'Ana Carolina',
        email: 'ana@example.com',
        subject: 'Dúvida sobre serviços',
        createdAt: new Date('2023-01-20').toISOString()
      },
      {
        id: 2,
        name: 'Carlos Eduardo',
        email: 'carlos@example.com',
        subject: 'Orçamento para app',
        createdAt: new Date('2023-02-05').toISOString()
      }
    ]
  }
}; 