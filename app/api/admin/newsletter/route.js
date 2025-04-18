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
    
    const newsletterSubscriptions = await prisma.newsletter.findMany();
    
    return new Response(JSON.stringify(newsletterSubscriptions), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar assinaturas da newsletter:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar assinaturas da newsletter' }), {
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
    const newSubscription = await prisma.newsletter.create({ data });
    
    return new Response(JSON.stringify(newSubscription), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar assinatura da newsletter:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar assinatura da newsletter' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 