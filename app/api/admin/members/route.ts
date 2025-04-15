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

    // Obter dados da requisição
    const data = await request.json();
    
    // Criptografar senha
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Extrair propriedades sociais para JSON
    const socialLinks = JSON.stringify({
      linkedin: data.linkedin || '',
      github: data.github || '',
      instagram: data.instagram || ''
    });
    
    // Criar membro
    const newMember = await prisma.teamMember.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        position: data.position || '',
        bio: data.bio || '',
        phone: data.phone || '',
        imageUrl: data.imageUrl || '',
        socialLinks
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        id: newMember.id,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        position: newMember.position,
        bio: newMember.bio,
        phone: newMember.phone,
        imageUrl: newMember.imageUrl,
        socialLinks: newMember.socialLinks
      }
    });
    
  } catch (error) {
    console.error('Erro ao criar membro:', error);
    return NextResponse.json(
      { error: 'Erro ao criar membro' },
      { status: 500 }
    );
  }
} 