import { prisma } from '../../../../utils/mockClient';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const numericId = parseInt(id, 10);
    
    const contact = await prisma.contact.findUnique({
      where: { id: numericId }
    });
    
    if (!contact) {
      return new Response(JSON.stringify({ error: 'Contato não encontrado' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify(contact), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar contato:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar contato' }), {
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
    
    const updatedContact = await prisma.contact.update({
      where: { id: numericId },
      data
    });
    
    return new Response(JSON.stringify(updatedContact), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    return new Response(JSON.stringify({ error: 'Erro ao atualizar contato' }), {
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
    
    await prisma.contact.delete({
      where: { id: numericId }
    });
    
    return new Response(JSON.stringify({ message: 'Contato excluído com sucesso' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    return new Response(JSON.stringify({ error: 'Erro ao excluir contato' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 