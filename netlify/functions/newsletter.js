// Função para processar inscrições na newsletter
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
    const { email } = data;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "E-mail é obrigatório" }),
      };
    }

    // Log dos dados recebidos
    console.log("Nova inscrição na newsletter:", email);

    // Formatando a mensagem
    const formattedMessage = `
      NOVA INSCRIÇÃO NA NEWSLETTER
      ===========================
      
      Email: ${email}
      Data: ${new Date().toLocaleString()}
    `;

    console.log("Mensagem formatada:", formattedMessage);
    console.log("E-mail seria enviado para: ascensionpremium@gmail.com");

    // Retornar resposta de sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Inscrição realizada com sucesso! Obrigado por se inscrever em nossa newsletter.",
        success: true,
      }),
    };
  } catch (error) {
    console.error("Erro ao processar inscrição na newsletter:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao processar sua inscrição. Por favor, tente novamente mais tarde.",
        error: error.message,
      }),
    };
  }
}; 