import { prisma } from '../../../utils/mockClient';

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany();
    
    return new Response(JSON.stringify(budgets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar orçamentos' }), {
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
    const newBudget = await prisma.budget.create({ data });
    
    return new Response(JSON.stringify(newBudget), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar orçamento' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 