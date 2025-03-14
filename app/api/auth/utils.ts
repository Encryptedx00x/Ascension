import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const runtime = 'nodejs';

/**
 * Verifica se um token JWT é válido sem usar o módulo crypto
 * @param token Token JWT
 * @returns Payload do token se válido, null caso contrário
 */
export function verifyTokenWithoutCrypto(token: string): JwtPayload | null {
  try {
    // Decodificar o token sem verificar a assinatura
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    
    const payload = JSON.parse(jsonPayload) as JwtPayload;
    
    // Verificar se o token expirou
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
}

/**
 * Gera um token JWT para o usuário
 * @param payload Dados do usuário
 * @returns Token JWT
 */
export function generateJwtToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '24h'
  });
}

/**
 * Verifica se a requisição está autenticada e se o usuário é admin
 * @param request Requisição do Next.js
 * @returns true se autenticado e admin, false caso contrário
 */
export async function checkApiAuth(request: NextRequest): Promise<boolean> {
  try {
    // Obter o token do cookie
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return false;
    }

    // Verificar o payload do token
    const payload = verifyTokenWithoutCrypto(token);
    
    if (!payload || payload.role !== 'admin') {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return false;
  }
} 