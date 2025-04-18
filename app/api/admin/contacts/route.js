import { prisma } from '../../../utils/mockClient';

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    
    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar contatos' }), {
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
    const newContact = await prisma.contact.create({ data });
    
    return new Response(JSON.stringify(newContact), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar contato' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 