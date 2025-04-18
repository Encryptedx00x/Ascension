import { sendServiceRequestNotification } from "../../../lib/mailer";

export async function GET() {
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar campos obrigatórios
    if (!data.name || !data.email || !data.service || !data.message) {
      return new Response(JSON.stringify({
        error: 'Nome, email, serviço e mensagem são campos obrigatórios'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Enviar notificação por email ao invés de salvar no banco de dados
    const result = await sendServiceRequestNotification(data);
    
    if (!result.success) {
      throw new Error('Falha ao enviar a notificação de solicitação de serviço');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Solicitação recebida com sucesso! Entraremos em contato em breve.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao processar solicitação de serviço:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro ao processar sua solicitação. Por favor, tente novamente mais tarde.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 