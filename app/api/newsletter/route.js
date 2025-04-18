import { sendNewsletterSubscriptionNotification } from "../../lib/mailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email é obrigatório' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Enviar email em vez de salvar no banco de dados
    const result = await sendNewsletterSubscriptionNotification(email);

    if (!result.success) {
      throw new Error('Falha ao enviar a notificação de inscrição');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Inscrição realizada com sucesso!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error);
    return new Response(JSON.stringify({ error: 'Erro ao processar sua inscrição' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 