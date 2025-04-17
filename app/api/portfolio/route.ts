import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const runtime = 'nodejs';

// GET /api/portfolio - Obtém todos os itens do portfólio (público)
export async function GET() {
  try {
    console.log("API pública de portfólio: carregando itens...");
    
    // Buscar todos os itens de portfólio
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        category: true,
        link: true,
        client: true,
        technologies: true,
        features: true,
        featured: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log(`API pública de portfólio: ${portfolioItems.length} itens encontrados`);
    
    return NextResponse.json({
      success: true,
      data: portfolioItems
    });
  } catch (error) {
    console.error('Erro ao buscar itens de portfólio:', error);
    
    // Logging detalhado para depuração
    if (error instanceof Error) {
      console.error(`Detalhes do erro: ${error.name}: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    }
    
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar itens de portfólio' },
      { status: 500 }
    );
  }
} 