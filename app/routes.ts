export const routes = {
  home: '/',
  about: '/sobre',
  services: '/servicos',
  portfolio: '/portfolio',
  contact: '/contato',
  budget: '/orcamento',
  admin: {
    login: '/admin/login',
    dashboard: '/admin/dashboard',
    portfolio: {
      list: '/admin/portfolio',
      add: '/admin/portfolio/adicionar',
      edit: (id: string) => `/admin/portfolio/editar/${id}`,
      delete: (id: string) => `/admin/portfolio/excluir/${id}`
    },
    budgets: '/admin/orcamentos',
    budgetsView: (id: string) => `/admin/orcamentos/visualizar/${id}`,
    members: {
      list: '/admin/equipe',
      add: '/admin/equipe/adicionar',
      edit: (id: string) => `/admin/equipe/editar/${id}`,
      view: (id: string) => `/admin/equipe/${id}`,
      delete: (id: string) => `/admin/equipe/excluir/${id}`
    },
    newsletter: '/admin/newsletter',
    contacts: '/admin/contatos',
    serviceRequests: '/admin/solicitacoes'
  }
};

export const isPublicRoute = (path: string) => {
  const publicRoutes = [
    routes.home,
    routes.about,
    routes.services,
    routes.portfolio,
    routes.contact,
    routes.budget,
    routes.admin.login
  ];
  return publicRoutes.includes(path);
};

export const isAdminRoute = (path: string) => {
  return path.startsWith('/admin');
};