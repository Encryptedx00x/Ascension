import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/portfolio - Obtém todos os itens do portfólio (público)
export async function GET() {
  try {
    // Buscar todos os itens do portfólio, priorizando os destacados
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: [
        {
          featured: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ]
    });
    
    // Mapear os itens para o formato esperado pelo frontend
    const formattedItems = portfolioItems.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      image: item.imageUrl,
      category: item.category,
      link: item.link || null,
      createdAt: item.createdAt.toISOString(),
      client: item.client || null,
      technologies: item.technologies ? JSON.parse(item.technologies) : [],
      features: item.features ? JSON.parse(item.features) : []
    }));
    
    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar itens do portfólio' },
      { status: 500 }
    );
  }
} 