// Função auxiliar para verificar autenticação nas rotas de API
export async function checkApiAuth(request) {
  // Em modo de demonstração, todas as requisições são permitidas
  return { authenticated: true, admin: { id: '1', username: 'admin' } };
} 