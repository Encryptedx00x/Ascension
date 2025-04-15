import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verificar se está sendo chamado do cliente correto
    const origin = request.headers.get('origin') || '';
    const allowedOrigins = [
      'http://localhost:3000',
      process.env.NEXT_PUBLIC_APP_URL || '',
      process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : ''
    ].filter(Boolean);
    
    // Verificar origem
    if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin) && origin !== '') {
      console.warn(`Tentativa de logout de origem não autorizada: ${origin}`);
    }
    
    // Criar resposta com cookie limpo
    const response = NextResponse.json({ success: true, message: 'Logout realizado com sucesso' });
    
    // Remover o cookie de autenticação
    response.cookies.set('adminToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
      expires: new Date(0)
    });

    return response;
  } catch (error) {
    console.error('Erro ao processar logout:', error);
    return NextResponse.json({ success: false, error: 'Erro ao processar logout' }, { status: 500 });
  }
} 