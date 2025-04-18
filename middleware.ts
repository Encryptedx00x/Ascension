import { NextRequest, NextResponse } from 'next/server';

// Arrays de rotas protegidas e públicas
const PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/equipe',
  '/admin/portfolio',
  '/admin/orcamentos',
  '/admin/contatos',
  '/admin/newsletter',
  '/admin/solicitacoes',
];

const PUBLIC_ROUTES = [
  '/',
  '/contato',
  '/portfolio',
  '/servicos',
  '/sobre',
  '/orcamento',
  '/admin/login'
];

// Obtém o token JWT dos cookies
function getJwtFromCookies(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;
  return token;
}

// Mock de verificação de autenticação
async function verifyAuth(token: string | undefined) {
  if (!token) {
    return false;
  }
  
  // Em produção, isso verificaria o token com um serviço
  // Aqui, apenas verificamos se existe um token (demonstração)
  return true;
}

// Middleware principal
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Verificar se é uma rota de API ou recursos estáticos
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Verificar se a rota requer autenticação
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Verificar autenticação para rotas protegidas
  const token = getJwtFromCookies(req);
  const isAuthenticated = await verifyAuth(token);

  if (!isAuthenticated && isProtectedRoute) {
    // Redirecionar para login se não estiver autenticado
    const url = new URL('/admin/login', req.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurar o matcher para o middleware
export const config = {
  matcher: [
    /*
     * Corresponde a todas as rotas, exceto:
     * 1. Rotas de API (_next, /static, etc.)
     */
    '/((?!_next|static|images|favicon.ico|api).*)',
  ],
}; 