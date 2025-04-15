import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
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
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return false;
    }
    
    const payload = verifyTokenWithoutCrypto(token);
    if (!payload || payload.role !== 'admin') {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return false;
  }
} 