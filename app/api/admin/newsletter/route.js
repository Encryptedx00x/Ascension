import { prisma } from '../../../utils/mockClient';
import { checkApiAuth } from '../../auth/utils';

export async function GET() {
  try {
    // Dados estáticos de assinantes da newsletter
    const subscribers = [
      {
        id: 1,
        email: 'exemplo1@email.com',
        createdAt: new Date('2023-01-15').toISOString()
      },
      {
        id: 2,
        email: 'exemplo2@email.com',
        createdAt: new Date('2023-02-20').toISOString()
      },
      {
        id: 3,
        email: 'exemplo3@email.com',
        createdAt: new Date('2023-03-10').toISOString()
      },
      {
        id: 4,
        email: 'exemplo4@email.com',
        createdAt: new Date('2023-04-05').toISOString()
      },
      {
        id: 5,
        email: 'exemplo5@email.com',
        createdAt: new Date('2023-05-22').toISOString()
      }
    ];
    
    return new Response(JSON.stringify(subscribers), {
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

export async function POST() {
  // Simulação de criação bem-sucedida
  return new Response(JSON.stringify({ 
    success: true, 
    message: 'Assinatura adicionada com sucesso' 
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 