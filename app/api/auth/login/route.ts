import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar membro pelo email
    const member = await prisma.teamMember.findUnique({
      where: { email }
    });

    // Se não encontrar o membro ou a senha estiver incorreta
    if (!member) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar se o usuário é um admin
    if (member.role !== 'admin') {
      return NextResponse.json(
        { error: 'Acesso não autorizado. Apenas administradores podem acessar o painel.' },
        { status: 403 }
      );
    }

    // Gerar token JWT
    const token = generateJwtToken({
      userId: String(member.id),
      email: member.email,
      role: member.role
    });

    // Configurar cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 horas
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 