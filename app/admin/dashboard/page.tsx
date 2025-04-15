'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaFileAlt, FaCheckCircle, FaTimesCircle, FaSpinner, FaImages, FaSignOutAlt, FaArrowRight, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { routes } from '@/app/routes';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalBudgets: number;
  totalMembers: number;
  totalContacts: number;
  totalNewsletter: number;
  pendingBudgets: number;
  reviewingBudgets: number;
  approvedBudgets: number;
  rejectedBudgets: number;
  teamMembers: number;
  portfolioItems: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBudgets: 0,
    totalMembers: 0,
    totalContacts: 0,
    totalNewsletter: 0,
    pendingBudgets: 0,
    reviewingBudgets: 0,
    approvedBudgets: 0,
    rejectedBudgets: 0,
    teamMembers: 0,
    portfolioItems: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = async () => {
      try {
        // Primeiro tenta verificar via API
        const res = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        
        const data = await res.json();
        console.log('Resposta da verificação de autenticação:', data);
        
        if (res.ok && data.authenticated) {
          // Se estiver autenticado via API, continue carregando a página
          setIsLoading(false);
          return;
        }
        
        // Se a API falhar, tenta verificar via sessionStorage
        const adminUser = sessionStorage.getItem('adminUser');
        if (adminUser) {
          try {
            const user = JSON.parse(adminUser);
            if (user && user.role === 'admin') {
              console.log('Autenticado via sessionStorage:', user);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error('Erro ao analisar dados de sessão:', e);
          }
        }
        
        // Se nenhuma das opções funcionar, redirecione para login
        console.log('Não autenticado, redirecionando para login');
        router.push(routes.admin.login);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        
        // Verificar o fallback em sessionStorage
        const adminUser = sessionStorage.getItem('adminUser');
        if (adminUser) {
          try {
            const user = JSON.parse(adminUser);
            if (user && user.role === 'admin') {
              console.log('Autenticado via sessionStorage após erro de API:', user);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error('Erro ao analisar dados de sessão:', e);
          }
        }
        
        router.push(routes.admin.login);
      }
    };
    
    checkAuth();
  }, [router]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/dashboard', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar estatísticas');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Erro ao carregar estatísticas');
      }
      
      setStats(data.data);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar estatísticas. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    // Limpar o cookie de autenticação
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Limpar sessionStorage
    sessionStorage.removeItem('adminUser');
    
    // Fazer uma chamada para o endpoint de logout no servidor
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    
    // Redirecionar para a página de login
    router.push(routes.admin.login);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Sair
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Orçamentos Pendentes</h3>
                    <div className="bg-yellow-100 p-2 rounded-lg">
                      <FaFileAlt className="text-yellow-600 text-xl" />
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-yellow-600">{stats.pendingBudgets}</span>
                    <span className="ml-2 text-sm text-gray-500">orçamentos</span>
                  </div>
                  <Link
                    href="/admin/orcamentos?status=pendente"
                    className="mt-4 text-sm text-yellow-600 hover:text-yellow-700 flex items-center"
                  >
                    Ver todos <FaArrowRight className="ml-1" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Em Análise</h3>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <FaSearch className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-blue-600">{stats.reviewingBudgets}</span>
                    <span className="ml-2 text-sm text-gray-500">orçamentos</span>
                  </div>
                  <Link
                    href="/admin/orcamentos?status=reviewing"
                    className="mt-4 text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Ver todos <FaArrowRight className="ml-1" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Orçamentos Aprovados</h3>
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-green-600">{stats.approvedBudgets}</span>
                    <span className="ml-2 text-sm text-gray-500">orçamentos</span>
                  </div>
                  <Link
                    href="/admin/orcamentos?status=approved"
                    className="mt-4 text-sm text-green-600 hover:text-green-700 flex items-center"
                  >
                    Ver todos <FaArrowRight className="ml-1" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Orçamentos Recusados</h3>
                    <div className="bg-red-100 p-2 rounded-lg">
                      <FaTimesCircle className="text-red-600 text-xl" />
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-red-600">{stats.rejectedBudgets}</span>
                    <span className="ml-2 text-sm text-gray-500">orçamentos</span>
                  </div>
                  <Link
                    href="/admin/orcamentos?status=rejected"
                    className="mt-4 text-sm text-red-600 hover:text-red-700 flex items-center"
                  >
                    Ver todos <FaArrowRight className="ml-1" />
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FaUsers className="text-purple-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-500">Membros da Equipe</h2>
                      <p className="text-2xl font-bold">{stats.teamMembers}</p>
                    </div>
                  </div>
                  <Link
                    href="/admin/equipe"
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    Gerenciar Equipe
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <FaImages className="text-indigo-500 text-xl" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-500">Itens no Portfólio</h2>
                      <p className="text-2xl font-bold">{stats.portfolioItems}</p>
                    </div>
                  </div>
                  <Link
                    href="/admin/portfolio"
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    Gerenciar Portfólio
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link
                      href="/admin/orcamentos"
                      className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FaFileAlt className="text-primary mr-3" />
                      <span>Ver Todos os Orçamentos</span>
                    </Link>
                    <Link
                      href="/admin/solicitacoes"
                      className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FaFileAlt className="text-primary mr-3" />
                      <span>Dúvidas sobre serviços</span>
                    </Link>
                    <Link
                      href="/admin/equipe/adicionar"
                      className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FaUsers className="text-primary mr-3" />
                      <span>Adicionar Membro à Equipe</span>
                    </Link>
                    <Link
                      href="/admin/portfolio/adicionar"
                      className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FaImages className="text-primary mr-3" />
                      <span>Adicionar Item ao Portfólio</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}