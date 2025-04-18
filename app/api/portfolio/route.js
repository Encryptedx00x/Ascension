import { prisma } from '../../utils/mockClient';

export async function GET() {
  try {
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