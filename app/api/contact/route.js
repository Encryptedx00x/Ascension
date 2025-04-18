import { prisma } from '../../utils/mockClient';

export async function POST(request) {
  try {
    const data = await request.json();
    const newContact = await prisma.contact.create({ 
      data: {
        ...data,
        status: 'pendente'
      } 
    });
    
    // Em um cenário real, enviaríamos um e-mail aqui
    console.log('Novo contato recebido:', newContact);
    console.log('E-mail seria enviado para: ascensionpremium@gmail.com');
    
    return new Response(JSON.stringify({
      message: 'Mensagem recebida com sucesso!',
      contact: newContact
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar sua mensagem' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 