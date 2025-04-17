import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('Tentativa de login:', { username });

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Configuração de admin padrão se não existir
    if (username === 'admin' && password === 'admin123') {
      // Verificar se o admin já existe
      const adminExists = await prisma.admin.findFirst();
      
      if (!adminExists) {
        console.log('Criando admin padrão');
        // Criar admin padrão
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.admin.create({
          data: {
            username: 'admin',
            password: hashedPassword,
          },
        });
      }
    }

    // Buscar admin pelo username
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      console.log('Login falhou: Admin não encontrado');
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar senha
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      console.log('Login falhou: Senha incorreta');
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('Login bem-sucedido para:', admin.username);

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        role: 'admin'
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Configurar cookie
    cookies().set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    // Responder com o token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username,
        role: 'admin'
      },
    });
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro no servidor' },
      { status: 500 }
    );
  }
} 