import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils';

export const runtime = 'nodejs';

const prisma = new PrismaClient();

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
      role: member.role || 'member'
    });

    // Criar resposta
    const response = NextResponse.json({
      success: true,
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
        role: member.role
      }
    });

    // Definir cookie com o token
    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 horas
      sameSite: 'lax',
      domain: '' // Certificar que o cookie será enviado para o mesmo domínio
    });

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro no login. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
} 