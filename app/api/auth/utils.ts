import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Usar uma chave segura para desenvolvimento ou produção
const JWT_SECRET = process.env.JWT_SECRET || 'ascension-website-jwt-secret-2024';

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
  
  try {
    const token = jwt.sign(
      { 
        ...payload,
        exp: expiresIn 
      }, 
      JWT_SECRET
    );
    console.log('Token gerado com sucesso');
    return token;
  } catch (error) {
    console.error('Erro ao gerar token JWT:', error);
    throw new Error('Falha ao gerar token de autenticação');
  }
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
    // Verificar tanto o novo token 'token' quanto o antigo 'adminToken'
    const token = request.cookies.get('token')?.value || request.cookies.get('adminToken')?.value;
    
    console.log('Token recebido:', token ? 'Presente' : 'Ausente');
    
    if (!token) {
      console.log('Token não encontrado nos cookies');
      return false;
    }
    
    const payload = verifyTokenWithoutCrypto(token);
    console.log('Payload do token:', payload);
    
    if (!payload || payload.role !== 'admin') {
      console.log('Token inválido ou usuário não é admin');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return false;
  }
} 