import { mockData } from '../../../api/mock/data';

export async function GET() {
  try {
    const dashboardData = mockData.dashboard;
    
    return new Response(JSON.stringify(dashboardData), {
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