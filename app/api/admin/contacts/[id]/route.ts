import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';

const prisma = new PrismaClient();

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
    if (data.status && !['pending', 'reviewing', 'completed', 'rejected'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Verificar se contato existe
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contato não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar contato
    const updatedContact = await prisma.contact.update({
      where: { id: parseInt(params.id) },
      data: {
        status: data.status || contact.status,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedContact
    });
  } catch (error) {
    console.error('Erro ao atualizar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar contato' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const contact = await prisma.contact.delete({
      where: {
        id: parseInt(params.id)
      }
    });

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir contato' },
      { status: 500 }
    );
  }
} 