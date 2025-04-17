import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar dados obrigatórios
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Dados incompletos. Nome, email e mensagem são obrigatórios.' 
        },
        { status: 400 }
      );
    }

    // Criar novo contato
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message,
        status: 'pending'
      }
    });

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Erro ao criar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao criar contato' },
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

    // Obter todos os contatos
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: contacts
    });

  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar contatos' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verificar autenticação de admin aqui
    const adminToken = request.cookies.get('adminToken')?.value;
    
    if (!adminToken) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID e status são obrigatórios' },
        { status: 400 }
      );
    }

    // Atualizar status do contato
    const updatedContact = await prisma.contact.update({
      where: { id: Number(id) },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      message: 'Status atualizado com sucesso',
      data: updatedContact
    });

  } catch (error) {
    console.error('Erro ao atualizar status do contato:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar status do contato' },
      { status: 500 }
    );
  }
} 