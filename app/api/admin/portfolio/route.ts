import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '@/lib/jwt';
import { checkApiAuth } from '@/app/api/auth/utils';

const prisma = new PrismaClient();

// Interface para o modelo Portfolio do Prisma
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link?: string | null;
  client?: string | null;
  technologies?: string | null;
  features?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Verifica autenticação do admin
async function checkAdminAuth(request: NextRequest) {
  try {
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return false;
  }
}

// GET /api/admin/portfolio
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Buscar todos os itens do portfólio
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json({
      success: true,
      data: portfolioItems
    });
  } catch (error) {
    console.error('Erro ao buscar portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar portfólio' },
      { status: 500 }
    );
  }
}

// POST /api/admin/portfolio
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    // Obter dados da requisição
    const data = await request.json();
    
    // Validar campos obrigatórios
    if (!data.title || !data.description || !data.category || !data.imageUrl) {
      return NextResponse.json(
        { error: 'Campos obrigatórios não preenchidos: título, descrição, categoria e URL da imagem' },
        { status: 400 }
      );
    }
    
    // Verificar se a URL da imagem é válida
    const isValidUrl = (url: string) => {
      try {
        // Verificar se começa com http:// ou https:// ou /
        return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
      } catch (error) {
        return false;
      }
    };
    
    if (!isValidUrl(data.imageUrl)) {
      return NextResponse.json(
        { error: 'URL da imagem inválida. Deve começar com http://, https:// ou /' },
        { status: 400 }
      );
    }
    
    // Verificar se os arrays são válidos
    const technologies = Array.isArray(data.technologies) ? data.technologies : [];
    const features = Array.isArray(data.features) ? data.features : [];
    
    // Criar novo item
    const newItem = await prisma.portfolio.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.imageUrl,
        client: data.client || '',
        link: data.link || '',
        technologies: JSON.stringify(technologies),
        features: JSON.stringify(features),
        featured: Boolean(data.featured) || false
      }
    });
    
    return NextResponse.json({
      success: true,
      data: newItem
    });
    
  } catch (error) {
    console.error('Erro ao criar item:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: `Erro ao criar item: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/portfolio
export async function DELETE(request: NextRequest) {
  try {
    // Verificar autenticação do administrador
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }
    
    try {
      await verifyJWT(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    // Obter o ID do item a ser excluído
    const data = await request.json();
    const { id } = data;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      );
    }
    
    // Verificar se o item existe
    const existing = await prisma.portfolio.findUnique({
      where: { id }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluir o item
    await prisma.portfolio.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 