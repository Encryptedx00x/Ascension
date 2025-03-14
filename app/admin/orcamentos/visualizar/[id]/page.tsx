'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTimes, FaSpinner, FaEnvelope, FaPhone, FaBuilding, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { routes } from '@/app/routes';

interface Budget {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  projectDescription: string;
  deadline?: string;
  budget?: string;
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
  designPreferences?: string;
  references?: string;
  howFound?: string;
  additionalInfo?: string;
  status: 'Pendente' | 'Em análise' | 'Aprovado' | 'Recusado';
  createdAt: string;
  updatedAt: string;
}

export default function BudgetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBudgetDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/budgets/${params.id}`, {
        credentials: 'include'
      });

      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Orçamento não encontrado');
          router.push(routes.admin.budgets);
          return;
        }
        throw new Error('Erro ao carregar dados do orçamento');
      }

      const data = await res.json();
      
      // Converter features de JSON string para array se necessário
      if (data.features && typeof data.features === 'string') {
        try {
          data.features = JSON.parse(data.features);
        } catch (e) {
          console.error('Erro ao converter features:', e);
          data.features = [];
        }
      } else {
        data.features = data.features || [];
      }
      
      setBudget(data);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Não foi possível carregar os detalhes do orçamento');
    } finally {
      setIsLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    fetchBudgetDetails();
  }, [fetchBudgetDetails]);

  const updateStatus = async (newStatus: Budget['status']) => {
    try {
      setIsUpdating(true);
      const res = await fetch(`/api/admin/budgets/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar status');
      }

      const updatedBudget = await res.json();
      setBudget(updatedBudget);
      toast.success(`Status atualizado para ${newStatus}`);
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Não foi possível atualizar o status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em análise':
        return 'bg-blue-100 text-blue-800';
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Recusado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-primary text-4xl" />
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Orçamento não encontrado</h2>
          <p className="text-gray-500 mb-4">O orçamento solicitado não existe ou foi removido.</p>
          <button
            onClick={() => router.push(routes.admin.budgets)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Voltar para a lista
          </button>
        </div>
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
          <button
            onClick={() => router.push(routes.admin.budgets)}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para a lista
          </button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 pb-6 border-b border-gray-200">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Detalhes do Orçamento #{budget.id.substring(0, 8)}</h1>
                  <p className="text-gray-500">Solicitado em {formatDate(budget.createdAt)}</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(budget.status)}`}>
                    {budget.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Informações do Cliente</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 mb-1">Nome</p>
                      <p className="font-medium">{budget.name}</p>
                    </div>
                    <div className="flex items-start">
                      <FaEnvelope className="text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-gray-500 mb-1">Email</p>
                        <p className="font-medium">{budget.email}</p>
                      </div>
                    </div>
                    {budget.phone && (
                      <div className="flex items-start">
                        <FaPhone className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-gray-500 mb-1">Telefone</p>
                          <p className="font-medium">{budget.phone}</p>
                        </div>
                      </div>
                    )}
                    {budget.company && (
                      <div className="flex items-start">
                        <FaBuilding className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-gray-500 mb-1">Empresa</p>
                          <p className="font-medium">{budget.company}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Detalhes do Projeto</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 mb-1">Tipo de Projeto</p>
                      <p className="font-medium">{budget.projectType}</p>
                    </div>
                    {budget.deadline && (
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-gray-500 mb-1">Prazo Desejado</p>
                          <p className="font-medium">{budget.deadline}</p>
                        </div>
                      </div>
                    )}
                    {budget.budget && (
                      <div className="flex items-start">
                        <FaMoneyBillWave className="text-gray-400 mt-1 mr-2" />
                        <div>
                          <p className="text-gray-500 mb-1">Orçamento Estimado</p>
                          <p className="font-medium">{budget.budget}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Descrição do Projeto</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{budget.projectDescription}</p>
                </div>
              </div>

              {budget.features && budget.features.selected.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Funcionalidades Desejadas</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      {budget.features.selected.map((feature, index) => (
                        <li key={index} className="text-gray-700">
                          {feature.name}
                          <span className="text-gray-400 text-sm ml-2">
                            {feature.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {budget.features?.customFeatures && budget.features.customFeatures.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Funcionalidades Personalizadas</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      {budget.features.customFeatures.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {budget.features?.modelInfo && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Informações do Modelo</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-medium">Modelo Selecionado:</span> {budget.features.modelInfo.selectedModel}
                    </p>
                    {budget.features.modelInfo.modelPrice && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Preço do Modelo:</span> {budget.features.modelInfo.modelPrice}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {budget.designPreferences && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Preferências de Design</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{budget.designPreferences}</p>
                  </div>
                </div>
              )}

              {budget.references && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Referências</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{budget.references}</p>
                  </div>
                </div>
              )}

              {budget.howFound && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Como nos Encontrou</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{budget.howFound}</p>
                  </div>
                </div>
              )}

              {budget.additionalInfo && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Informações Adicionais</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap">{budget.additionalInfo}</p>
                  </div>
                </div>
              )}

              {budget.status === 'Pendente' && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Ações</h2>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => updateStatus('Em análise')}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
                    >
                      {isUpdating && <FaSpinner className="animate-spin mr-2" />}
                      Marcar Em Análise
                    </button>
                    <button
                      onClick={() => updateStatus('Aprovado')}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center"
                    >
                      {isUpdating && <FaSpinner className="animate-spin mr-2" />}
                      <FaCheck className="mr-2" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => updateStatus('Recusado')}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center"
                    >
                      {isUpdating && <FaSpinner className="animate-spin mr-2" />}
                      <FaTimes className="mr-2" />
                      Recusar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 