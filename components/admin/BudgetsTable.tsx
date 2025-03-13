import React, { useState } from 'react';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { getModelById } from '@/config/models';

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
  features: string;
  designPreferences: string;
  references: string;
  howFound: string;
  additionalInfo: string;
  status: string;
  createdAt: string;
}

interface BudgetsTableProps {
  budgets: Budget[];
  onView: (budget: Budget) => void;
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

const BudgetsTable: React.FC<BudgetsTableProps> = ({
  budgets,
  onView,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState('all');

  const filteredBudgets = budgets.filter((budget) => {
    if (filter === 'all') return true;
    return budget.status === filter;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'aprovado':
        return 'bg-green-100 text-green-800';
      case 'rejeitado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pendente':
        return 'Pendente';
      case 'aprovado':
        return 'Aprovado';
      case 'rejeitado':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const renderFeatures = (budget: Budget) => {
    try {
      const featuresData = JSON.parse(budget.features);
      const selectedFeatures = featuresData.selected || [];
      const customFeatures = featuresData.customFeatures || [];
      const modelInfo = featuresData.modelInfo || {};

      return (
        <div>
          {modelInfo.selectedModel && (
            <div className="mb-2">
              <span className="font-medium">Modelo: </span>
              <span className="text-primary">{getModelById(modelInfo.selectedModel)?.name}</span>
              {modelInfo.modelPrice && (
                <span className="ml-2 text-gray-500">({modelInfo.modelPrice})</span>
              )}
            </div>
          )}
          <div className="space-y-1">
            {selectedFeatures.length > 0 && (
              <div>
                <span className="font-medium">Funcionalidades Selecionadas:</span>
                <ul className="list-disc list-inside ml-2">
                  {selectedFeatures.map((feature: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {customFeatures.length > 0 && (
              <div className="mt-2">
                <span className="font-medium">Funcionalidades Personalizadas:</span>
                <ul className="list-disc list-inside ml-2">
                  {customFeatures.map((feature: { name: string; description: string }, index: number) => (
                    <li key={index} className="text-sm">
                      <span className="text-gray-600">{feature.name}</span>
                      {feature.description && (
                        <p className="ml-4 text-xs text-gray-500">{feature.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    } catch (e) {
      console.error('Erro ao processar features:', e);
      return <span className="text-red-500">Erro ao carregar funcionalidades</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Orçamentos</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovado">Aprovados</option>
            <option value="rejeitado">Rejeitados</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Funcionalidades
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orçamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prazo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBudgets.map((budget) => (
              <tr key={budget.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{budget.name}</div>
                  <div className="text-sm text-gray-500">{budget.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{budget.projectType}</div>
                </td>
                <td className="px-6 py-4">
                  {renderFeatures(budget)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{budget.budget}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{budget.deadline}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      budget.status
                    )}`}
                  >
                    {getStatusLabel(budget.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(budget.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onView(budget)}
                      className="text-primary hover:text-primary-dark"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onEdit(budget)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(budget)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetsTable; 