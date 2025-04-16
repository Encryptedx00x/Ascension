import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('Recebendo solicitação de login');
    
    const body = await request.json();
    const { email, password } = body;
    
    console.log(`Tentativa de login para: ${email}`);

    // Validação básica
    if (!email || !password) {
      console.log('Campos obrigatórios ausentes');
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar membro pelo email
    console.log('Buscando usuário no banco de dados');
    const member = await prisma.teamMember.findUnique({
      where: { email }
    });

    // Se não encontrar o membro ou a senha estiver incorreta
    if (!member) {
      console.log('Usuário não encontrado');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    console.log('Verificando senha');
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      console.log('Senha inválida');
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar se o usuário é um admin
    if (member.role !== 'admin') {
      console.log('Usuário não é admin');
      return NextResponse.json(
        { error: 'Acesso não autorizado. Apenas administradores podem acessar o painel.' },
        { status: 403 }
      );
    }

    console.log('Gerando token JWT');
    // Gerar token JWT
    const token = generateJwtToken({
      userId: String(member.id),
      email: member.email,
      role: member.role
    });

    console.log('Configurando cookies');
    // Configurar cookie
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    // Também definir como adminToken para compatibilidade
    cookies().set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    console.log('Login bem-sucedido');
    return NextResponse.json({ 
      success: true,
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role
      }
    });
  } catch (error) {
    console.error('Erro completo no login:', error);
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.name, error.message, error.stack);
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 