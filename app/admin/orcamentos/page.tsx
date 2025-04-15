'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaEye, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { routes } from '@/app/routes';

interface Budget {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectDescription: string;
  deadline: string;
  budget: string;
  features: {
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
  };
  designPreferences: string;
  references: string;
  howFound: string;
  additionalInfo: string;
  status: 'pendente' | 'reviewing' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function BudgetsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const statusParam = searchParams.get('status');
  
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [filteredBudgets, setFilteredBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(statusParam || 'all');
  const [showIds, setShowIds] = useState(false);

  const filterBudgets = useCallback(() => {
    if (!budgets) return [];
    
    return budgets.filter(budget => {
      // Normalizar status para lidar com inconsistências
      const normalizedStatus = statusParam === 'pending' ? 'pendente' : statusParam;
      
      if (normalizedStatus && budget.status !== normalizedStatus) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          budget.name.toLowerCase().includes(searchLower) ||
          budget.email.toLowerCase().includes(searchLower) ||
          budget.projectType.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [budgets, statusParam, searchTerm]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  useEffect(() => {
    if (statusParam) {
      // Normalizar status para o filtro ativo
      const normalizedStatus = statusParam === 'pending' ? 'pendente' : statusParam;
      setActiveFilter(normalizedStatus);
    }
  }, [statusParam]);

  // Aplicar filtros quando o termo de busca ou o status muda
  useEffect(() => {
    if (!isLoading && budgets.length > 0) {
      const filtered = budgets.filter((budget: Budget) => {
        // Normalizar status para lidar com inconsistências
        const normalizedStatus = statusParam === 'pending' ? 'pendente' : statusParam;
        
        if (normalizedStatus && budget.status !== normalizedStatus) return false;
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            budget.name.toLowerCase().includes(searchLower) ||
            budget.email.toLowerCase().includes(searchLower) ||
            budget.projectType.toLowerCase().includes(searchLower)
          );
        }
        return true;
      });
      
      setFilteredBudgets(filtered);
    }
  }, [searchTerm, statusParam, budgets, isLoading]);

  const fetchBudgets = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/budgets', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar orçamentos');
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Erro ao buscar orçamentos');
      }
      
      // Garantir que result.data seja um array
      const budgetsData = Array.isArray(result.data) ? result.data : [];
      setBudgets(budgetsData);
      
      // Os filtros serão aplicados pelo useEffect separado
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar orçamentos. Por favor, tente novamente.');
      setBudgets([]);
      setFilteredBudgets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    router.push(`/admin/orcamentos${filter !== 'all' ? `?status=${filter}` : ''}`);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'reviewing':
        return 'Em Análise';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Recusado';
      default:
        return 'Pendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getProjectTypeName = (projectType: string) => {
    switch (projectType) {
      case 'website':
        return 'Site Institucional';
      case 'portfolio':
        return 'Portfólio';
      case 'ecommerce':
        return 'E-commerce';
      case 'agendamento':
        return 'Sistema de Agendamento';
      case 'sistema-web':
        return 'Sistema Web';
      case 'personalizado':
        return 'Projeto Personalizado';
      default:
        return projectType;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={routes.admin.dashboard}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para o Dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-8">Gerenciar Orçamentos</h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nome, email, empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-gray-600 flex items-center">
                  <FaFilter className="mr-1" /> Filtrar:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => handleFilterChange('pendente')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === 'pendente'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    }`}
                  >
                    Pendentes
                  </button>
                  <button
                    onClick={() => handleFilterChange('reviewing')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === 'reviewing'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    Em Análise
                  </button>
                  <button
                    onClick={() => handleFilterChange('approved')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === 'approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    Aprovados
                  </button>
                  <button
                    onClick={() => handleFilterChange('rejected')}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activeFilter === 'rejected'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    Recusados
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredBudgets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum orçamento encontrado.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {showIds && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo de Projeto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBudgets.map((budget) => (
                      <tr key={budget.id}>
                        {showIds && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {budget.id}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{budget.name}</div>
                          <div className="text-sm text-gray-500">{budget.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getProjectTypeName(budget.projectType)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(budget.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(budget.status)}`}
                          >
                            {getStatusLabel(budget.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={routes.admin.budgetsView(budget.id)}
                            className="text-blue-600 hover:text-blue-900 ml-4"
                          >
                            <FaEye className="inline-block mr-1" /> Visualizar
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 