import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'O email é obrigatório' },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Este email já está inscrito na newsletter' },
        { status: 409 }
      );
    }

    // Criar nova inscrição
    const newSubscription = await prisma.newsletter.create({
      data: { email }
    });

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso',
      data: newSubscription
    });

  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua inscrição' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação de admin aqui
    const adminToken = request.cookies.get('adminToken')?.value;
    
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Obter todos os emails da newsletter
    const subscriptions = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: subscriptions
    });

  } catch (error) {
    console.error('Erro ao buscar inscrições da newsletter:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar inscrições da newsletter' },
      { status: 500 }
    );
  }
} 