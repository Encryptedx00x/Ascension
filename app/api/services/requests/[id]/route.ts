import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkApiAuth } from '@/app/api/auth/utils';

const validStatuses = ['pendente', 'contacted', 'completed', 'rejected'] as const;

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validar status
    if (!data.status || !validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Verificar se solicitação existe
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id }
    });

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Solicitação não encontrada' },
        { status: 404 }
      );
    }

    // Atualizar solicitação
    const updatedRequest = await prisma.serviceRequest.update({
      where: { id: params.id },
      data: {
        status: data.status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedRequest
    });
  } catch (error) {
    console.error('Erro ao atualizar solicitação:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar solicitação' },
      { status: 500 }
    );
  }
} 