import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todos os inscritos
    const subscribers = await prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: subscribers
    });

  } catch (error) {
    console.error('Erro ao buscar inscritos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar inscritos' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      );
    }

    // Excluir inscrito
    await prisma.newsletter.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Inscrito removido com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir inscrito:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir inscrito' },
      { status: 500 }
    );
  }
} 