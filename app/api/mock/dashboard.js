import { mockData } from './data';

// Função para obter dados do dashboard
export function getDashboardData() {
  return mockData.dashboard;
}

// Handler da rota
export async function GET() {
  try {
    const data = getDashboardData();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    return new Response(JSON.stringify({ error: 'Erro ao buscar dados do dashboard' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 