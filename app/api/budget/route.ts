import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '../auth/utils';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar os campos obrigatórios
    if (!data.name || !data.email || !data.phone || !data.projectType || !data.projectDescription) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Todos os campos obrigatórios devem ser preenchidos.' 
        },
        { status: 400 }
      );
    }

    // Criar novo orçamento
    const budget = await prisma.budget.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        projectType: data.projectType,
        projectDescription: data.projectDescription,
        deadline: data.deadline || '',
        budget: data.budget || '',
        features: data.features || {},
        designPreferences: data.designPreferences || '',
        references: data.references || '',
        howFound: data.howFound || '',
        additionalInfo: data.additionalInfo || '',
        status: 'pendente'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Seu pedido de orçamento foi enviado com sucesso! Entraremos em contato em breve.',
      data: budget
    });

  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao processar seu pedido de orçamento. Por favor, tente novamente mais tarde.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Buscar todos os orçamentos
    const budgets = await prisma.budget.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: budgets
    });

  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar orçamentos' },
      { status: 500 }
    );
  }
} 