import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

interface JwtPayload {
  id: string;
  username: string;
  role?: string;
  iat?: number;
  exp?: number;
}

/**
 * Gera um token JWT
 */
export function generateJwtToken(payload: Partial<JwtPayload>) {
  // Adicionar timestamp de expiração para 24 horas
  const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 24 horas
  
  return jwt.sign(
    { 
      ...payload,
      exp: expiresIn 
    }, 
    JWT_SECRET
  );
}

/**
 * Verifica um token JWT sem lançar exceções
 */
export function verifyTokenWithoutCrypto(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
}

/**
 * Verifica a autenticação para as APIs
 */
export async function checkApiAuth(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get('adminToken')?.value || 
                  request.cookies.get('token')?.value;
    
    if (!token) {
      console.log('Autenticação falhou: Token não encontrado');
      return false;
    }
    
    const payload = verifyTokenWithoutCrypto(token);
    
    if (!payload) {
      console.log('Autenticação falhou: Token inválido');
      return false;
    }
    
    // Verificar se é um token de administrador
    const isAdmin = payload.role === 'admin' || payload.username === 'admin';
    
    return isAdmin;
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return false;
  }
} 