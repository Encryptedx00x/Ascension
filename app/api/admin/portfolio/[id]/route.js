import { prisma } from '../../../../utils/mockClient';
import { checkApiAuth } from '../../../auth/utils';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const portfolioId = parseInt(id);
    
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
    
    const portfolioItem = portfolioItems.find(item => item.id === portfolioId);
    
    if (!portfolioItem) {
      return new Response(JSON.stringify({ error: 'Item do portfólio não encontrado' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(portfolioItem), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar item do portfólio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar item do portfólio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function PUT(request, { params }) {
  // Simulação de atualização bem-sucedida
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Item atualizado com sucesso',
    id: params.id
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function DELETE(request, { params }) {
  // Simulação de exclusão bem-sucedida
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Item excluído com sucesso'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 