import { NextRequest, NextResponse } from 'next/server';
import { verifyTokenWithoutCrypto } from '../utils';

export const runtime = 'nodejs';

/**
 * Endpoint para verificar se o token de autenticação é válido
 */
export async function GET(request: NextRequest) {
  try {
    console.log('Verificando autenticação...');
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      console.log('Token não encontrado');
      return NextResponse.json(
        { 
          authenticated: false, 
          message: 'Não autenticado',
          token: false
        },
        { status: 401 }
      );
    }
    
    console.log('Token encontrado, verificando...');
    
    // Validar token
    const payload = verifyTokenWithoutCrypto(token);
    
    if (!payload) {
      console.log('Token inválido ou expirado');
      return NextResponse.json(
        { 
          authenticated: false, 
          message: 'Token inválido ou expirado',
          token: true,
          valid: false
        },
        { status: 401 }
      );
    }
    
    // Verificar se o papel é admin
    if (payload.role !== 'admin') {
      console.log('Usuário não é admin');
      return NextResponse.json(
        { 
          authenticated: false, 
          message: 'Acesso não autorizado',
          token: true,
          valid: true,
          role: payload.role
        },
        { status: 403 }
      );
    }
    
    // Se chegou aqui, o token é válido e o usuário é admin
    console.log('Autenticação bem-sucedida:', payload);
    return NextResponse.json({
      authenticated: true,
      message: 'Autenticado com sucesso',
      user: {
        id: payload.userId,
        email: payload.email,
        role: payload.role
      }
    });
    
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return NextResponse.json(
      { 
        authenticated: false, 
        message: 'Erro ao verificar autenticação',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 