import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '../auth/utils';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se o email já está cadastrado
    const existing = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Este email já está inscrito em nossa newsletter.' },
        { status: 409 }
      );
    }

    // Criar nova inscrição
    const newsletter = await prisma.newsletter.create({
      data: { email }
    });

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      data: newsletter
    });
  } catch (error) {
    console.error('Erro ao inscrever na newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar inscrição. Por favor, tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação de admin
    const isAuthenticated = await checkApiAuth(request);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todas as inscrições
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: newsletters
    });
  } catch (error) {
    console.error('Erro ao buscar inscrições:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar inscrições.' },
      { status: 500 }
    );
  }
} 