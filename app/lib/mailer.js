// Configuração do nodemailer para envio de emails
import nodemailer from 'nodemailer';

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ascensionpremium@gmail.com', // Substituir pelo email que enviará as mensagens
    pass: 'Alterar pela senha real no ambiente de produção' // Você deve usar uma senha de app do Google
  }
});

// Função para enviar email
export async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: 'Ascension Premium <ascensionpremium@gmail.com>',
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: error.message };
  }
}

// Funções específicas para cada tipo de notificação
export async function sendContactNotification(contactData) {
  const { name, email, phone, subject, message } = contactData;
  
  const htmlContent = `
    <h2>Novo Contato do Site</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
    <p><strong>Assunto:</strong> ${subject || 'Não informado'}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${message}</p>
    <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
  `;

  const textContent = `
    Novo Contato do Site
    ====================
    
    Nome: ${name}
    Email: ${email}
    Telefone: ${phone || 'Não informado'}
    Assunto: ${subject || 'Não informado'}
    
    Mensagem:
    ${message}
    
    Enviado em: ${new Date().toLocaleString('pt-BR')}
  `;

  return sendEmail({
    to: 'dyogoho@gmail.com',
    subject: `Novo contato de ${name}`,
    html: htmlContent,
    text: textContent
  });
}

export async function sendNewsletterSubscriptionNotification(email) {
  const htmlContent = `
    <h2>Nova Inscrição na Newsletter</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><em>Inscrito em: ${new Date().toLocaleString('pt-BR')}</em></p>
  `;

  const textContent = `
    Nova Inscrição na Newsletter
    ===========================
    
    Email: ${email}
    Inscrito em: ${new Date().toLocaleString('pt-BR')}
  `;

  return sendEmail({
    to: 'dyogoho@gmail.com',
    subject: 'Nova inscrição na newsletter',
    html: htmlContent,
    text: textContent
  });
}

export async function sendServiceRequestNotification(requestData) {
  const { name, email, phone, service, message } = requestData;
  
  const htmlContent = `
    <h2>Nova Solicitação de Serviço</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
    <p><strong>Serviço Solicitado:</strong> ${service}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${message}</p>
    <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
  `;

  const textContent = `
    Nova Solicitação de Serviço
    ==========================
    
    Nome: ${name}
    Email: ${email}
    Telefone: ${phone || 'Não informado'}
    Serviço Solicitado: ${service}
    
    Mensagem:
    ${message}
    
    Enviado em: ${new Date().toLocaleString('pt-BR')}
  `;

  return sendEmail({
    to: 'dyogoho@gmail.com',
    subject: `Nova solicitação de serviço de ${name}`,
    html: htmlContent,
    text: textContent
  });
}

export async function sendBudgetRequestNotification(budgetData) {
  const { 
    name, 
    email, 
    phone, 
    company, 
    projectType, 
    projectDescription, 
    deadline, 
    budget, 
    features, 
    designPreferences, 
    references, 
    howFound, 
    additionalInfo 
  } = budgetData;
  
  const htmlContent = `
    <h2>Nova Solicitação de Orçamento</h2>
    <h3>Informações do Cliente</h3>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
    <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
    
    <h3>Informações do Projeto</h3>
    <p><strong>Tipo de Projeto:</strong> ${projectType}</p>
    <p><strong>Descrição:</strong> ${projectDescription}</p>
    <p><strong>Prazo:</strong> ${deadline || 'Não informado'}</p>
    <p><strong>Orçamento:</strong> ${budget || 'Não informado'}</p>
    
    <h3>Detalhes do Projeto</h3>
    <p><strong>Funcionalidades:</strong> ${features || 'Não informado'}</p>
    <p><strong>Preferências de Design:</strong> ${designPreferences || 'Não informado'}</p>
    <p><strong>Referências:</strong> ${references || 'Não informado'}</p>
    <p><strong>Como nos encontrou:</strong> ${howFound || 'Não informado'}</p>
    <p><strong>Informações Adicionais:</strong> ${additionalInfo || 'Não informado'}</p>
    
    <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
  `;

  const textContent = `
    Nova Solicitação de Orçamento
    ============================
    
    Informações do Cliente:
    Nome: ${name}
    Email: ${email}
    Telefone: ${phone || 'Não informado'}
    Empresa: ${company || 'Não informado'}
    
    Informações do Projeto:
    Tipo de Projeto: ${projectType}
    Descrição: ${projectDescription}
    Prazo: ${deadline || 'Não informado'}
    Orçamento: ${budget || 'Não informado'}
    
    Detalhes do Projeto:
    Funcionalidades: ${features || 'Não informado'}
    Preferências de Design: ${designPreferences || 'Não informado'}
    Referências: ${references || 'Não informado'}
    Como nos encontrou: ${howFound || 'Não informado'}
    Informações Adicionais: ${additionalInfo || 'Não informado'}
    
    Enviado em: ${new Date().toLocaleString('pt-BR')}
  `;

  return sendEmail({
    to: 'dyogoho@gmail.com',
    subject: `Nova solicitação de orçamento de ${name}`,
    html: htmlContent,
    text: textContent
  });
} 