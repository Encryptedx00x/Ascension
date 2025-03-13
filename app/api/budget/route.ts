import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validar dados obrigatórios
    if (!data.name || !data.email || !data.phone || !data.projectType || !data.projectDescription) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Dados incompletos. Nome, email, telefone, tipo de projeto e descrição são obrigatórios.' 
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
        company: data.company || '',
        projectType: data.projectType,
        projectDescription: data.projectDescription,
        deadline: data.deadline || '',
        budget: data.budget || '',
        features: data.features || [],
        designPreferences: data.designPreferences || '',
        references: data.references || '',
        howFound: data.howFound || '',
        additionalInfo: data.additionalInfo || '',
        status: 'pendente'
      }
    });

    return NextResponse.json({
      success: true,
      data: budget
    });

  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    return NextResponse.json(
      { error: 'Erro ao criar orçamento' },
      { status: 500 }
    );
  }
} 