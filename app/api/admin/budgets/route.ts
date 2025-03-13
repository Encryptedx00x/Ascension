import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';
import { prisma } from '@/lib/prisma';

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
    includeHosting: boolean;
  } | null;
}

// GET /api/admin/budgets
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

    // Buscar todos os orçamentos
    const budgets = await prisma.budget.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Processar features para garantir que seja um objeto válido
    const processedBudgets = budgets.map(budget => {
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

      return {
        ...budget,
        features: processedFeatures
      };
    });

    return NextResponse.json({
      success: true,
      data: processedBudgets
    });
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar orçamentos' },
      { status: 500 }
    );
  }
}

// POST /api/admin/budgets
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Dados recebidos:', data);
    
    // Validação dos campos obrigatórios
    const requiredFields = [
      'name',
      'email',
      'phone',
      'projectType',
      'projectDescription',
      'deadline',
      'budget',
      'features',
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Campos obrigatórios não preenchidos',
          missingFields,
        },
        { status: 400 }
      );
    }
    
    // Processar features antes de salvar
    const featuresData: Prisma.JsonObject = {
      selected: Array.isArray(data.features) ? data.features.map((feature: string | { name: string; description: string; isDefault: boolean }) => {
        if (typeof feature === 'string') {
          return {
            name: feature,
            description: '',
            isDefault: false
          };
        }
        return feature;
      }) : [],
      customFeatures: Array.isArray(data.customFeatures) ? data.customFeatures : [],
      modelInfo: {
        selectedModel: data.selectedModel || null,
        modelPrice: data.modelPrice || null,
        includeHosting: data.includeHosting || false
      }
    };
    
    // Criar o orçamento
    const newBudget = await prisma.budget.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        projectType: data.projectType,
        projectDescription: data.projectDescription,
        deadline: data.deadline,
        budget: data.budget,
        features: featuresData,
        designPreferences: data.designPreferences || '',
        references: data.references || '',
        howFound: data.howFound || '',
        additionalInfo: data.additionalInfo || '',
        status: 'pendente'
      },
    });

    return NextResponse.json({
      success: true,
      data: newBudget
    });

  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar orçamento' },
      { status: 500 }
    );
  }
} 