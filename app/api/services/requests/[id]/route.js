import { prisma } from '../../../../utils/mockClient';
import { checkApiAuth } from '../../../../api/auth/utils';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Dados estáticos simulados
    const serviceRequest = {
      id,
      name: 'Cliente Exemplo',
      email: 'cliente@exemplo.com',
      phone: '(11) 99999-9999',
      service: 'Desenvolvimento Web',
      message: 'Preciso de um site para minha empresa com sistema de login e área administrativa.',
      status: 'pendente',
      createdAt: new Date().toISOString()
    };
    
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
    // Simulação de atualização bem-sucedida
    return new Response(JSON.stringify({
      success: true,
      message: 'Solicitação atualizada com sucesso',
      id: params.id
    }), {
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