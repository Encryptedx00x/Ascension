import { prisma } from '../../../../utils/mockClient';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const budget = await prisma.budget.findUnique({
      where: { id }
    });
    
    if (!budget) {
      return new Response(JSON.stringify({ error: 'Orçamento não encontrado' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(budget), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar orçamento' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    const updatedBudget = await prisma.budget.update({
      where: { id },
      data
    });
    
    return new Response(JSON.stringify(updatedBudget), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar orçamento' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await prisma.budget.delete({
      where: { id }
    });
    
    return new Response(JSON.stringify({ message: 'Orçamento excluído com sucesso' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao excluir orçamento:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir orçamento' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 