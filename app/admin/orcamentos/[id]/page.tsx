'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTimes, FaSpinner, FaEnvelope, FaPhone, FaCalendarAlt, FaTimesCircle, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { routes } from '@/app/routes';
import { plansWithHosting, plansWithoutHosting, Plan } from '@/components/PricingSection';
import { BudgetStatus } from '@prisma/client';

interface CustomFeature {
  name: string;
  description?: string;
}

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
    customFeatures: Array<string | CustomFeature>;
    modelInfo: {
      selectedModel: string | null;
      modelPrice: string | null;
      includeHosting: boolean;
    } | null;
  };
  designPreferences: string;
  references: string;
  howFound: string;
  additionalInfo: string;
  status: BudgetStatus;
  createdAt: string;
  updatedAt: string;
}

export default function BudgetPage() {
  const params = useParams();
  const router = useRouter();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch(`/api/admin/budgets/${params.id}`, {
          credentials: 'include'
        });
        const data = await response.json();

        if (data.success) {
          setBudget(data.data);
        } else {
          throw new Error(data.error || 'Erro ao buscar dados do orçamento');
        }
      } catch (error) {
        console.error('Erro:', error);
        setError('Erro ao carregar dados do orçamento. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, [params.id]);

  const handleStatusChange = async (newStatus: Budget['status']) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/budgets/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setBudget(prev => prev ? { ...prev, status: newStatus } : null);
        setSuccess('Status atualizado com sucesso!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw new Error(data.error || 'Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao atualizar status. Por favor, tente novamente.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmText !== budget?.name) {
      setError('Por favor, digite o nome do cliente corretamente para confirmar.');
      return;
    }

    try {
      const response = await fetch(`/api/admin/budgets/${params.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Orçamento excluído com sucesso!');
        setTimeout(() => {
          router.push('/admin/orcamentos');
        }, 1500);
      } else {
        throw new Error(data.error || 'Erro ao excluir orçamento');
      }
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao excluir orçamento. Por favor, tente novamente.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getStatusLabel = (status: Budget['status']) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'reviewing': return 'Em Análise';
      case 'approved': return 'Aprovado';
      case 'rejected': return 'Recusado';
      default: return 'Pendente';
    }
  };

  const getStatusColor = (status: Budget['status']) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'reviewing': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getProjectTypeName = (budget: Budget | null) => {
    if (!budget) return 'Tipo de projeto não definido';

    const plans = budget.features.modelInfo?.includeHosting ? plansWithHosting : plansWithoutHosting;
    const currentPlan = plans?.find((p: Plan) => p.serviceType === budget.features.modelInfo?.selectedModel);
    
    if (currentPlan?.name) {
      return currentPlan.name;
    }

    // Fallback para tipos de projeto mais descritivos
    const projectType = budget.projectType || 'não definido';
    switch (projectType) {
      case 'website':
        return 'Site Institucional';
      case 'portfolio':
        return 'Portfólio';
      case 'ecommerce':
        return 'Loja Virtual';
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !budget) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FaTimesCircle className="text-red-500 text-2xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
            <p className="text-gray-600 mb-6">{error || 'Orçamento não encontrado'}</p>
            <Link
              href="/admin/orcamentos"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Voltar para a lista de orçamentos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/admin/orcamentos"
          className="inline-flex items-center text-primary hover:text-primary/80"
        >
          <FaArrowLeft className="mr-2" />
          Voltar para a lista de orçamentos
        </Link>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <FaTrash className="mr-2" />
          Excluir Orçamento
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-4">
              Esta ação não pode ser desfeita. Digite o nome do cliente <strong>{budget?.name}</strong> para confirmar.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Digite o nome do cliente"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteConfirmText('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={deleteConfirmText !== budget?.name}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Orçamento #{budget?.id}
              </h1>
              <div className="flex items-center text-gray-600 gap-4">
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(budget?.createdAt || '').toLocaleDateString('pt-BR')}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(budget?.status || 'pendente')}`}>
                  {getStatusLabel(budget?.status || 'pendente')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informações do Cliente
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Nome:</span>
                  <span className="text-gray-600">{budget?.name}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <span className="text-gray-600">{budget?.email}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-2" />
                  <span className="text-gray-600">{budget?.phone}</span>
                </div>
                {budget?.company && (
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Empresa:</span>
                    <span className="text-gray-600">{budget.company}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Status do Orçamento
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange('pendente')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    budget?.status === 'pendente'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                  Pendente
                </button>
                <button
                  onClick={() => handleStatusChange('reviewing')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    budget?.status === 'reviewing'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                  Em Análise
                </button>
                <button
                  onClick={() => handleStatusChange('approved')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    budget?.status === 'approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                  Aprovado
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    budget?.status === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? <FaSpinner className="animate-spin mr-2" /> : null}
                  Recusado
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Detalhes do Projeto
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <div>
                  <span className="font-medium">Tipo de Projeto:</span>
                  <div className="bg-gray-50 mt-1 rounded-lg">
                    <p className="text-gray-600">
                      {getProjectTypeName(budget)}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Descrição:</span>
                  <p className="text-gray-600 mt-1">{budget?.projectDescription}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Prazo:</span>
                    <p className="text-gray-600 mt-1">{budget?.deadline}</p>
                  </div>
                  <div>
                    <span className="font-medium">Orçamento:</span>
                    <p className="text-gray-600 mt-1">
                      {(() => {
                        switch (budget?.budget) {
                          case 'ate5k': return 'Até R$ 5.000,00';
                          case '5ka10k': return 'R$ 5.000,00 a R$ 10.000,00';
                          case '10ka20k': return 'R$ 10.000,00 a R$ 20.000,00';
                          case '20ka50k': return 'R$ 20.000,00 a R$ 50.000,00';
                          case 'mais50k': return 'Acima de R$ 50.000,00';
                          default: return budget?.budget;
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Funcionalidades Desejadas
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Recursos Padrão</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    {(() => {
                      // Encontrar o plano correspondente baseado na opção de hospedagem
                      const plans = budget.features.modelInfo?.includeHosting ? plansWithHosting : plansWithoutHosting;
                      const currentPlan = plans?.find((p: Plan) => p.serviceType === budget.features.modelInfo?.selectedModel);
                      
                      if (!currentPlan) return null;
                      
                      // Retornar todos os recursos inclusos no plano
                      return currentPlan.features
                        .filter(feature => {
                          // Não mostrar hospedagem se não estiver incluída
                          if (!budget.features.modelInfo?.includeHosting && 
                              (feature === 'Hospedagem por 1 ano' || feature === 'Domínio por 1 ano' || feature === 'Hospedagem e Domínio')) {
                            return false;
                          }
                          return true;
                        })
                        .map((feature, index) => {
                          // Encontrar a descrição do recurso nas features selecionadas
                          const selectedFeature = budget?.features?.selected?.find(f => f.name === feature);
                          
                          return (
                            <li key={index} className="text-gray-600">
                              {feature}
                              {selectedFeature?.description && (
                                <span className="text-gray-400 text-sm ml-2">
                                  ({selectedFeature.description})
                                </span>
                              )}
                            </li>
                          );
                        });
                    })()}
                  </ul>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-4">Recursos Opcionais Selecionados</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    {(() => {
                      // Encontrar o plano correspondente baseado na opção de hospedagem
                      const plans = budget.features.modelInfo?.includeHosting ? plansWithHosting : plansWithoutHosting;
                      const currentPlan = plans?.find((p: Plan) => p.serviceType === budget.features.modelInfo?.selectedModel);
                      
                      if (!currentPlan) return null;
                      
                      // Retornar apenas os recursos selecionados que não estão no plano
                      return budget?.features?.selected
                        ?.filter(feature => {
                          // Não mostrar recursos que estão no plano atual
                          if (currentPlan.features.includes(feature.name)) {
                            return false;
                          }
                          // Não mostrar hospedagem
                          if (feature.name === 'Hospedagem e Domínio') {
                            return false;
                          }
                          return true;
                        })
                        .map((feature, index) => (
                          <li key={index} className="text-gray-600">
                            {feature.name}
                            {feature.description && (
                              <span className="text-gray-400 text-sm ml-2">
                                ({feature.description})
                              </span>
                            )}
                          </li>
                        ));
                    })()}
                  </ul>
                </div>

                {budget?.features?.customFeatures && budget.features.customFeatures.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-4">Recursos Personalizados</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc list-inside space-y-2">
                        {budget.features.customFeatures.map((feature, index) => (
                          <li key={index} className="text-gray-600">
                            {typeof feature === 'string' ? feature : feature.name}
                            {typeof feature !== 'string' && feature.description && (
                              <span className="text-gray-400 text-sm ml-2">
                                ({feature.description})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}

                {budget?.features?.modelInfo && (
                  <>
                    <h3 className="text-lg font-semibold mt-6 mb-4">Informações do Modelo</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <span className="font-medium">Modelo Selecionado:</span>{' '}
                        {(() => {
                          if (!budget.features.modelInfo) return null;
                          const plans = budget.features.modelInfo.includeHosting ? plansWithHosting : plansWithoutHosting;
                          const currentPlan = plans?.find((p: Plan) => p.serviceType === budget.features.modelInfo?.selectedModel);
                          return currentPlan?.name || budget.features.modelInfo.selectedModel;
                        })()}
                        {budget.features.modelInfo?.includeHosting !== undefined && (
                          <span className="text-gray-500">
                            {budget.features.modelInfo.includeHosting ? ' (com hospedagem e domínio)' : ' (sem hospedagem e domínio)'}
                          </span>
                        )}
                      </p>
                      {budget.features.modelInfo.modelPrice && (
                        <p className="text-gray-700 mt-2">
                          <span className="font-medium">Preço do Modelo:</span> A partir de {budget.features.modelInfo.modelPrice}
                        </p>
                      )}
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Hospedagem e Domínio:</span>{' '}
                        {budget.features.modelInfo.includeHosting ? (
                          <span className="text-green-600">Incluídos por 1 ano</span>
                        ) : (
                          <span className="text-gray-500">Não incluídos</span>
                        )}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Preferências e Referências
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <div>
                  <span className="font-medium">Preferências de Design:</span>
                  <p className="text-gray-600 mt-1">{budget?.designPreferences}</p>
                </div>
                <div>
                  <span className="font-medium">Referências:</span>
                  <p className="text-gray-600 mt-1">{budget?.references}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informações Adicionais
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div>
                  <span className="font-medium">Como nos encontrou:</span>
                  <p className="text-gray-600 mt-1">
                    {(() => {
                      switch (budget?.howFound) {
                        case 'google': return 'Google';
                        case 'social': return 'Redes Sociais';
                        case 'indication': return 'Indicação';
                        case 'other': return 'Outro';
                        default: return budget?.howFound;
                      }
                    })()}
                  </p>
                </div>
                {budget?.additionalInfo && (
                  <div className="mt-4">
                    <span className="font-medium">Observações:</span>
                    <p className="text-gray-600 mt-1">{budget.additionalInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}