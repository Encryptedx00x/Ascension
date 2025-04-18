// Função para processar o formulário de contato
exports.handler = async (event, context) => {
  // Apenas permitir método POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método não permitido" }),
    };
  }

  try {
    // Parsear o corpo da requisição
    const data = JSON.parse(event.body);
    const { name, email, phone, subject, message } = data;

    // Log dos dados recebidos (apenas para fins de debug)
    console.log("Dados do formulário de contato:", data);

    // Em uma implementação real, enviaríamos um e-mail aqui
    // Como estamos no ambiente Netlify, apenas simulamos o envio

    // Formatando a mensagem para exibição no painel do Netlify
    const formattedMessage = `
      Nome: ${name}
      Email: ${email}
      Telefone: ${phone || 'Não informado'}
      Assunto: ${subject || 'Sem assunto'}
      Mensagem: ${message}
      Data: ${new Date().toLocaleString()}
    `;

    console.log("Mensagem formatada:", formattedMessage);
    console.log("E-mail seria enviado para: ascensionpremium@gmail.com");

    // Retornar resposta de sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Mensagem recebida com sucesso! Entraremos em contato em breve.",
        success: true,
      }),
    };
  } catch (error) {
    console.error("Erro ao processar o formulário:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
        error: error.message,
      }),
    };
  }
}; 