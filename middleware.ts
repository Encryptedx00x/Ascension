import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenWithoutCrypto } from './app/api/auth/utils';

export async function middleware(request: NextRequest) {
  // Ignorar rotas da API e página de login
  if (request.nextUrl.pathname.startsWith('/api/auth') ||
      request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Verificar se é uma rota administrativa
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      // Obter o token do cookie
      const token = request.cookies.get('adminToken')?.value;
      
      if (!token) {
        console.log('Token não encontrado, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Verificar o payload do token
      const payload = verifyTokenWithoutCrypto(token);
      
      if (!payload) {
        console.log('Token inválido ou expirado, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Verificar se o usuário é um admin
      if (payload.role !== 'admin') {
        console.log('Usuário não é admin, redirecionando para login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Se chegou aqui, o token é válido e o usuário é admin
      const response = NextResponse.next();
      
      // Manter o cookie na resposta
      response.cookies.set({
        name: 'adminToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/'
      });

      return response;
    } catch (error) {
      console.error('Erro no middleware:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}; 