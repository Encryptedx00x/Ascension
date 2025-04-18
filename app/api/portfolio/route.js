export async function GET() {
  try {
    // Dados estáticos de portfólio
    const portfolioItems = [
      {
        id: 1,
        title: 'Site Institucional - Empresa XYZ',
        category: 'Web Design',
        description: 'Desenvolvimento de site institucional responsivo utilizando Next.js e Tailwind CSS.',
        image: '/images/portfolio/portfolio1.jpg',
        link: 'https://exemplo.com/xyz'
      },
      {
        id: 2,
        title: 'E-commerce - Loja Virtual',
        category: 'E-commerce',
        description: 'Criação de loja virtual completa com gestão de produtos, carrinho e pagamentos.',
        image: '/images/portfolio/portfolio2.jpg',
        link: 'https://exemplo.com/loja'
      },
      {
        id: 3,
        title: 'Aplicativo Mobile - Delivery',
        category: 'Mobile',
        description: 'Desenvolvimento de aplicativo mobile para sistema de delivery usando React Native.',
        image: '/images/portfolio/portfolio3.jpg',
        link: 'https://exemplo.com/app'
      },
      {
        id: 4,
        title: 'Dashboard Administrativo',
        category: 'Web App',
        description: 'Criação de painel administrativo completo com gráficos e relatórios personalizados.',
        image: '/images/portfolio/portfolio4.jpg',
        link: 'https://exemplo.com/dashboard'
      },
      {
        id: 5,
        title: 'Landing Page - Produto Digital',
        category: 'Web Design',
        description: 'Desenvolvimento de landing page otimizada para conversão de produto digital.',
        image: '/images/portfolio/portfolio5.jpg',
        link: 'https://exemplo.com/landingpage'
      },
      {
        id: 6,
        title: 'Sistema de Gestão Empresarial',
        category: 'Sistema Web',
        description: 'Criação de sistema completo para gestão empresarial com múltiplos módulos.',
        image: '/images/portfolio/portfolio6.jpg',
        link: 'https://exemplo.com/sistema'
      }
    ];
    
    return new Response(JSON.stringify(portfolioItems), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar itens do portfólio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 