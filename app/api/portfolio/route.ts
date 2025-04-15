import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// GET /api/portfolio - Obtém todos os itens do portfólio (público)
export async function GET() {
  try {
    console.log("API pública de portfólio: carregando itens...");
    
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
    
    console.log(`API pública de portfólio: ${portfolioItems.length} itens encontrados`);
    
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
    
    // Logging detalhado para depuração
    if (error instanceof Error) {
      console.error(`Detalhes do erro: ${error.name}: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    }
    
    return NextResponse.json(
      { error: 'Erro ao buscar itens do portfólio', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 