import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Verifica autenticação do admin
async function checkAdminAuth(request: Request) {
  try {
    const token = await verifyJwtAuth(request);
    if (!token) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return false;
  }
}

// GET /api/admin/members
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

    // Buscar todos os membros
    const members = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: members
    });

  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar membros' },
      { status: 500 }
    );
  }
}

// POST /api/admin/members
export async function POST(request: NextRequest) {
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
    
    // Validação básica
    if (!data.name || !data.email || !data.password) {
      return NextResponse.json(
        { error: 'Dados incompletos. Nome, email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const existingMember = await prisma.teamMember.findUnique({
      where: { email: data.email }
    });

    if (existingMember) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 }
      );
    }

    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Criar novo membro
    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        role: data.role || '',
        bio: data.bio || '',
        imageUrl: data.imageUrl || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        bio: true,
        imageUrl: true,
        linkedin: true,
        github: true,
        createdAt: true,
        // Não retornamos a senha
      }
    });

    return NextResponse.json({
      success: true,
      data: newMember
    });
  } catch (error) {
    console.error('Erro ao criar membro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar membro' },
      { status: 500 }
    );
  }
} 