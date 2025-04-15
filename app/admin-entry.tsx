'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { routes } from './routes';

export default function AdminEntry() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para o dashboard administrativo
    router.push(routes.admin.dashboard);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
        <p className="mb-4">Redirecionando para o dashboard...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <div className="mt-4">
          <button 
            onClick={() => router.push(routes.admin.dashboard)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Acessar Dashboard
          </button>
        </div>
      </div>
    </div>
  );
} 