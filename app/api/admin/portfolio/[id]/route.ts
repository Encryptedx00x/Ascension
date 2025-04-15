import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyJWT } from '@/lib/jwt';

// GET /api/admin/portfolio/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Buscar item do portfólio pelo ID
    const portfolioItem = await prisma.portfolio.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    // Converter campos JSON para arrays
    const formattedItem = {
      ...portfolioItem,
      technologies: portfolioItem.technologies ? JSON.parse(portfolioItem.technologies) : [],
      features: portfolioItem.features ? JSON.parse(portfolioItem.features) : []
    };
    
    return NextResponse.json({
      success: true,
      data: formattedItem
    });
  } catch (error) {
    console.error('Erro ao buscar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar item. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/portfolio/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Obter dados do body
    const data = await request.json();
    
    // Validar dados
    if (!data.title || !data.category || !data.description || !data.imageUrl) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }
    
    // Verificar se o item existe
    const existing = await prisma.portfolio.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    // Converter arrays para JSON string
    const technologies = Array.isArray(data.technologies) 
      ? JSON.stringify(data.technologies.filter((t: string) => t.trim() !== ''))
      : existing.technologies;
      
    const features = Array.isArray(data.features)
      ? JSON.stringify(data.features.filter((f: string) => f.trim() !== ''))
      : existing.features;
    
    // Atualizar item
    const updatedItem = await prisma.portfolio.update({
      where: {
        id: params.id
      },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        link: data.link || null,
        client: data.client || null,
        technologies,
        features,
        featured: Boolean(data.featured)
      }
    });
    
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Erro ao atualizar item do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/portfolio/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Verificar se o item existe
    const existing = await prisma.portfolio.findUnique({
      where: {
        id: params.id
      }
    });
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 }
      );
    }
    
    // Excluir item
    await prisma.portfolio.delete({
      where: {
        id: params.id
      }
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
 