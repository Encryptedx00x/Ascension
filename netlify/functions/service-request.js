// Função para processar solicitações de serviços
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
    const { name, email, phone, service, message } = data;

    // Log dos dados recebidos
    console.log("Nova solicitação de serviço:", data);

    // Formatando a mensagem
    const formattedMessage = `
      NOVA SOLICITAÇÃO DE SERVIÇO
      ==========================
      
      Informações do Cliente:
      Nome: ${name}
      Email: ${email}
      Telefone: ${phone || 'Não informado'}
      
      Serviço Solicitado: ${service}
      
      Mensagem:
      ${message}
      
      Data: ${new Date().toLocaleString()}
    `;

    console.log("Mensagem formatada:", formattedMessage);
    console.log("E-mail seria enviado para: ascensionpremium@gmail.com");

    // Retornar resposta de sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sua solicitação foi recebida com sucesso! Entraremos em contato em breve.",
        success: true,
      }),
    };
  } catch (error) {
    console.error("Erro ao processar solicitação de serviço:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
        error: error.message,
      }),
    };
  }
}; 