// Função para processar o formulário de orçamento
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
    const { 
      name, email, phone, company, projectType, 
      projectDescription, deadline, budget, features,
      designPreferences, references, howFound, additionalInfo 
    } = data;

    // Log dos dados recebidos (apenas para fins de debug)
    console.log("Dados do formulário de orçamento:", data);

    // Formatando a mensagem para exibição no painel do Netlify
    const formattedMessage = `
      NOVO PEDIDO DE ORÇAMENTO
      =======================
      
      Informações do Cliente:
      Nome: ${name}
      Email: ${email}
      Telefone: ${phone || 'Não informado'}
      Empresa: ${company || 'Não informado'}
      
      Detalhes do Projeto:
      Tipo: ${projectType}
      Descrição: ${projectDescription}
      Prazo: ${deadline}
      Orçamento: ${budget}
      
      Funcionalidades Desejadas:
      ${JSON.stringify(features, null, 2)}
      
      Preferências de Design:
      ${designPreferences}
      
      Referências:
      ${references}
      
      Como nos encontrou:
      ${howFound}
      
      Informações Adicionais:
      ${additionalInfo || 'Nenhuma'}
      
      Data: ${new Date().toLocaleString()}
    `;

    console.log("Mensagem formatada:", formattedMessage);
    console.log("E-mail seria enviado para: ascensionpremium@gmail.com");

    // Retornar resposta de sucesso
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Seu pedido de orçamento foi recebido com sucesso! Entraremos em contato em breve.",
        success: true,
      }),
    };
  } catch (error) {
    console.error("Erro ao processar o formulário de orçamento:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao processar seu pedido de orçamento. Por favor, tente novamente mais tarde.",
        error: error.message,
      }),
    };
  }
}; 