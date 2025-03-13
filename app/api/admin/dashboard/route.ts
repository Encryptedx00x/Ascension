import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { checkApiAuth } from '@/app/api/auth/utils';

const prisma = new PrismaClient();

// GET /api/admin/dashboard
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

    // Buscar estatísticas
    const [
      totalBudgets,
      totalMembers,
      totalContacts,
      totalNewsletter,
      pendingBudgets,
      reviewingBudgets,
      approvedBudgets,
      rejectedBudgets
    ] = await Promise.all([
      prisma.budget.count(),
      prisma.teamMember.count(),
      prisma.contact.count(),
      prisma.newsletter.count(),
      prisma.budget.count({ where: { status: 'pendente' } }),
      prisma.budget.count({ where: { status: 'reviewing' } }),
      prisma.budget.count({ where: { status: 'approved' } }),
      prisma.budget.count({ where: { status: 'rejected' } })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalBudgets,
        totalMembers,
        totalContacts,
        totalNewsletter,
        pendingBudgets,
        reviewingBudgets,
        approvedBudgets,
        rejectedBudgets
      }
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
} 