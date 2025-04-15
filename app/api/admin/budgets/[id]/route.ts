import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';

const prisma = new PrismaClient();

interface BudgetFeatures {
  selected: Array<{
    name: string;
    description: string;
    isDefault: boolean;
  }>;
  customFeatures: string[];
  modelInfo: {
    selectedModel: string | null;
    modelPrice: string | null;
  } | null;
}

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

// GET /api/admin/budgets/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const budget = await prisma.budget.findUnique({
      where: { id: params.id }
    });

    if (!budget) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    // Processar features para garantir que seja um objeto válido
    let processedFeatures: BudgetFeatures;
    try {
      if (budget.features && typeof budget.features === 'string') {
        processedFeatures = JSON.parse(budget.features);
      } else {
        processedFeatures = budget.features as unknown as BudgetFeatures;
      }
    } catch (e) {
      console.error('Erro ao processar features:', e);
      processedFeatures = {
        selected: [],
        customFeatures: [],
        modelInfo: null
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        ...budget,
        features: processedFeatures
      }
    });
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamento' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/budgets/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    // Validar status
    if (data.status && !['pendente', 'reviewing', 'approved', 'rejected'].includes(data.status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Verificar se orçamento existe
    const budget = await prisma.budget.findUnique({
      where: { id: params.id }
    });

    if (!budget) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar orçamento
    const updatedBudget = await prisma.budget.update({
      where: { id: params.id },
      data: {
        status: data.status || budget.status,
        updatedAt: new Date()
      }
    });

    // Processar features para garantir que seja um objeto válido
    let processedFeatures: BudgetFeatures;
    try {
      if (updatedBudget.features && typeof updatedBudget.features === 'string') {
        processedFeatures = JSON.parse(updatedBudget.features);
      } else {
        processedFeatures = updatedBudget.features as unknown as BudgetFeatures;
      }
    } catch (e) {
      console.error('Erro ao processar features:', e);
      processedFeatures = {
        selected: [],
        customFeatures: [],
        modelInfo: null
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        ...updatedBudget,
        features: processedFeatures
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar orçamento' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/budgets/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const isAuthenticated = await checkApiAuth(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const budget = await prisma.budget.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({
      success: true,
      data: budget
    });

  } catch (error) {
    console.error('Erro ao excluir orçamento:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao excluir orçamento' },
      { status: 500 }
    );
  }
} 