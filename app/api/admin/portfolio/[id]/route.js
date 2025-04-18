import { prisma } from '../../../../utils/mockClient';
import { checkApiAuth } from '../../../auth/utils';

export async function GET(request, { params }) {
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
    
    const { id } = params;
    const portfolioItem = await prisma.portfolio.findUnique({
      where: { id }
    });
    
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
    
    const { id } = params;
    const data = await request.json();
    
    const updatedItem = await prisma.portfolio.update({
      where: { id },
      data
    });
    
    return new Response(JSON.stringify(updatedItem), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar item do portfólio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar item do portfólio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function DELETE(request, { params }) {
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
    
    const { id } = params;
    
    await prisma.portfolio.delete({
      where: { id }
    });
    
    return new Response(JSON.stringify({ message: 'Item do portfólio excluído com sucesso' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao excluir item do portfólio:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir item do portfólio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 