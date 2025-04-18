import { sendContactNotification } from "../../lib/mailer";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validar campos obrigatórios
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({
        error: 'Nome, email e mensagem são campos obrigatórios'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    // Enviar notificação por email ao invés de salvar no banco de dados
    const result = await sendContactNotification(data);
    
    if (!result.success) {
      throw new Error('Falha ao enviar a notificação de contato');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Mensagem recebida com sucesso! Entraremos em contato em breve.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao processar formulário de contato:', error);
    return new Response(JSON.stringify({ 
      error: 'Erro ao processar sua mensagem. Por favor, tente novamente mais tarde.' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 