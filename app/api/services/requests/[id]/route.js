import { prisma } from '../../../../utils/mockClient';
import { checkApiAuth } from '../../../../api/auth/utils';

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
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id }
    });
    
    if (!serviceRequest) {
      return new Response(JSON.stringify({ error: 'Solicitação de serviço não encontrada' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(serviceRequest), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar solicitação de serviço:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar solicitação de serviço' }), {
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
    
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data
    });
    
    return new Response(JSON.stringify(updatedRequest), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar solicitação de serviço:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar solicitação de serviço' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 