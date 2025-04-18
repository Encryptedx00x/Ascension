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