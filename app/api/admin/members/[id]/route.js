import { prisma } from '../../../../utils/mockClient';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const numericId = parseInt(id, 10);
    
    const member = await prisma.teamMember.findUnique({
      where: { id: numericId }
    });
    
    if (!member) {
      return new Response(JSON.stringify({ error: 'Membro da equipe não encontrado' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(member), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar membro da equipe:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar membro da equipe' }), {
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
    const numericId = parseInt(id, 10);
    const data = await request.json();
    
    const updatedMember = await prisma.teamMember.update({
      where: { id: numericId },
      data
    });
    
    return new Response(JSON.stringify(updatedMember), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar membro da equipe:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar membro da equipe' }), {
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
    const numericId = parseInt(id, 10);
    
    await prisma.teamMember.delete({
      where: { id: numericId }
    });
    
    return new Response(JSON.stringify({ message: 'Membro da equipe excluído com sucesso' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao excluir membro da equipe:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir membro da equipe' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 