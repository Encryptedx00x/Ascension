import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Função para decodificar um token JWT sem usar crypto
function decodeJwtToken(token: string) {
  try {
    // Decodificar apenas a parte do payload sem verificar a assinatura
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
    const payload = JSON.parse(jsonPayload);
    
    // Verificar expiração
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      console.log('Token expirado:', payload.exp, '<', Math.floor(Date.now() / 1000));
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
}

// FORÇAR AUTENTICAÇÃO EM TODAS AS ROTAS ADMINISTRATIVAS
// Definindo como true para desativar a proteção durante o desenvolvimento
const DEV_MODE = process.env.NODE_ENV !== 'production';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  // Lista de rotas públicas que não requerem autenticação
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/check',
    '/api/portfolio',
    '/api/contact',
    '/api/newsletter',
    '/api/budget',
    '/api/services/requests',
    '/admin/login',
    '/admin/diagnose',
    '/admin/check-login'
  ];
  
  // Verificar se a rota atual está na lista de rotas públicas
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith('/api/public/') || 
    !request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/api/admin')
  );
  
  // Se for uma rota pública, permitir o acesso sem verificação
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Em modo de desenvolvimento, permitir todas as rotas sem verificação
  if (DEV_MODE) {
    return NextResponse.next();
  }

  // Verificar se é uma rota administrativa
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    try {
      // Obter o token do cookie (verificar ambos os nomes possíveis)
      const token = request.cookies.get('token')?.value || request.cookies.get('adminToken')?.value;
      
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Decodificar o payload do token sem verificar a assinatura
      const payload = decodeJwtToken(token);
      
      if (!payload) {
        console.log('Token inválido ou expirado, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Verificar se o usuário é um admin
      if (payload.role !== 'admin') {
        console.log('Usuário não é admin, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Se chegou aqui, o token parece válido e o usuário é admin
      console.log('Token válido, permitindo acesso');
      return NextResponse.next();
    } catch (error) {
      console.error('Erro no middleware:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Página de login e APIs de autenticação
    '/admin/login',
    '/api/auth/:path*',
    
    // Todas as rotas administrativas
    '/admin/:path*',
    '/api/admin/:path*',
  ]
}; 