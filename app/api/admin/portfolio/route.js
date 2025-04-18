import { prisma } from '../../../utils/mockClient';
import { checkApiAuth } from '../../auth/utils';

export async function GET(request) {
  try {
    // Verificar autenticação
    const authResult = await checkApiAuth(request);
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const portfolioItems = await prisma.portfolio.findMany();
    
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

export async function POST(request) {
  try {
    // Verificar autenticação
    const authResult = await checkApiAuth(request);
    if (!authResult.authenticated) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const data = await request.json();
    const newItem = await prisma.portfolio.create({ data });
    
    return new Response(JSON.stringify(newItem), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar item do portfólio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar item do portfólio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 