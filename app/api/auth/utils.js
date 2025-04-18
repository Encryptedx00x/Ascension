import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../../utils/mockClient';

// Chave JWT definida hardcoded para ambiente de demonstração
const JWT_SECRET = "35d2f4e70e7d01a60c73fef4bea8e89c5c25fd0e8765c8f16b21f253d8f98ad7";

export async function verifyAuth(token) {
  try {
    // Verificar se o token foi fornecido
    if (!token) {
      return { authenticated: false, error: 'Token não fornecido' };
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verificar se o usuário existe
    const admin = await prisma.admin.findUnique({
      where: { username: decoded.username },
    });

    if (!admin) {
      return { authenticated: false, error: 'Usuário não encontrado' };
    }

    return { authenticated: true, admin };
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return { authenticated: false, error: 'Token inválido ou expirado' };
  }
}

export async function authenticateUser(username, password) {
  try {
    // Buscar usuário no banco de dados
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // Verificar se o usuário existe
    if (!admin) {
      return { authenticated: false, error: 'Usuário não encontrado' };
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return { authenticated: false, error: 'Senha incorreta' };
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { authenticated: true, token, admin: { id: admin.id, username: admin.username } };
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    return { authenticated: false, error: 'Erro interno de autenticação' };
  }
}

// Função auxiliar para verificar autenticação nas rotas de API
export async function checkApiAuth(request) {
  // Em modo de demonstração, todas as requisições são permitidas
  return { authenticated: true, admin: { id: '1', username: 'admin' } };
}

export function verifyTokenWithoutCrypto(token) {
  try {
    if (!token) return null;
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return null;
  }
} 