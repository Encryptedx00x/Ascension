import { prisma } from '../../../utils/mockClient';

export async function GET() {
  try {
    const serviceRequests = await prisma.serviceRequest.findMany();
    
    return new Response(JSON.stringify(serviceRequests), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar solicitações de serviço:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar solicitações de serviço' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newRequest = await prisma.serviceRequest.create({ 
      data: {
        ...data,
        status: 'pendente'
      } 
    });
    
    return new Response(JSON.stringify(newRequest), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar solicitação de serviço:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar solicitação de serviço' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 