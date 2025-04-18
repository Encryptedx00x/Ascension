import { prisma } from '../../../utils/mockClient';

export async function GET() {
  try {
    const members = await prisma.teamMember.findMany();
    
    return new Response(JSON.stringify(members), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar membros da equipe:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar membros da equipe' }), {
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
    const newMember = await prisma.teamMember.create({ data });
    
    return new Response(JSON.stringify(newMember), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao criar membro da equipe:', error);
    return new Response(JSON.stringify({ error: 'Erro ao criar membro da equipe' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 