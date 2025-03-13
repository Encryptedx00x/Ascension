import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/jwt';

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

// GET /api/admin/portfolio
export async function GET(request: NextRequest) {
  try {
    // Buscar todos os itens do portfólio
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Formatar dados para o frontend
    const formattedItems = portfolioItems.map((item: PortfolioItem) => ({
      ...item,
      technologies: item.technologies ? JSON.parse(item.technologies) : [],
      features: item.features ? JSON.parse(item.features) : []
    }));
    
    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Erro ao buscar portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do portfólio' },
      { status: 500 }
    );
  }
}

// POST /api/admin/portfolio
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
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
    
    // Obter dados do corpo da requisição
    const data = await request.json();
    
    // Validar dados obrigatórios
    if (!data.title || !data.description || !data.category || !data.image) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    // Converter arrays para JSON strings para armazenamento
    const technologiesJson = data.technologies && data.technologies.length 
      ? JSON.stringify(data.technologies) 
      : null;
      
    const featuresJson = data.features && data.features.length 
      ? JSON.stringify(data.features) 
      : null;
    
    // Criar novo item no portfólio
    const newItem = await prisma.portfolio.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.image,
        category: data.category,
        link: data.link || null,
        client: data.client || null,
        technologies: technologiesJson,
        features: featuresJson,
        featured: data.featured || false
      }
    });
    
    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Erro ao criar item no portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao criar item no portfólio' },
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