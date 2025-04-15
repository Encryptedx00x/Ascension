import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Verifica autenticação do admin
async function checkAdminAuth(request: Request) {
  try {
    const isAuthenticated = await checkApiAuth(request as NextRequest);
    if (!isAuthenticated) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return false;
  }
}

// GET /api/admin/members/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Buscar membro pelo ID
    const member = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: member
    });

  } catch (error) {
    console.error('Erro ao buscar membro:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar membro' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/members/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Obter dados da requisição
    const data = await request.json();

    // Atualizar membro
    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        imageUrl: data.imageUrl
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedMember
    });

  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar membro' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/members/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verifica autenticação
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Verificar se membro existe
    const member = await prisma.teamMember.findUnique({
      where: { id }
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Membro não encontrado' },
        { status: 404 }
      );
    }

    // Deletar membro
    await prisma.teamMember.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir membro:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir membro' },
      { status: 500 }
    );
  }
} 