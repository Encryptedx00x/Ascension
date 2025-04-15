'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pendente' | 'contacted' | 'completed' | 'rejected';
  createdAt: string;
}

const mockRequests: ServiceRequest[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(47) 99999-9999',
    service: 'site-institucional',
    message: 'Preciso de um site institucional para minha empresa de consultoria.',
    status: 'pendente',
    createdAt: '2023-10-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    phone: '(47) 98888-8888',
    service: 'ecommerce',
    message: 'Quero criar uma loja virtual para vender meus produtos artesanais.',
    status: 'contacted',
    createdAt: '2023-10-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos@example.com',
    phone: '(47) 97777-7777',
    service: 'sistema-web',
    message: 'Precisamos de um sistema de agendamento para nossa clínica médica.',
    status: 'completed',
    createdAt: '2023-09-28T16:45:00Z'
  }
];

const ServiceRequestsTable = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/services/requests');
        if (!response.ok) {
          throw new Error('Failed to fetch service requests');
        }
        const data = await response.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error('Error fetching service requests:', error);
        setError('Failed to load service requests');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(req => req.status === filter);

  const handleStatusChange = async (id: string, newStatus: ServiceRequest['status']) => {
    try {
      const response = await fetch(`/api/services/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar status');
      }

      setRequests(prev => 
        prev.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
      
      if (selectedRequest?.id === id) {
        setSelectedRequest({ ...selectedRequest, status: newStatus });
      }

      // Mostrar mensagem de sucesso
      setSuccess('Status atualizado com sucesso!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      setError(error instanceof Error ? error.message : 'Erro ao atualizar status. Por favor, tente novamente.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
      setRequests(prev => prev.filter(req => req.id !== id));
      if (selectedRequest?.id === id) {
        setIsModalOpen(false);
      }
    }
  };

  const viewRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const getServiceLabel = (serviceValue: string) => {
    const serviceMap: Record<string, string> = {
      'site-institucional': 'Site Institucional',
      'ecommerce': 'E-commerce',
      'sistema-web': 'Sistema Web',
      'app-mobile': 'Aplicativo Mobile',
      'agendamento': 'Sistema de Agendamento',
      'marketing': 'Marketing Digital'
    };
    return serviceMap[serviceValue] || serviceValue;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      'pendente': 'Pendente',
      'contacted': 'Contatado',
      'completed': 'Concluído',
      'rejected': 'Rejeitado'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dúvidas sobre serviços</h2>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendentes</option>
            <option value="contacted">Contatados</option>
            <option value="completed">Concluídos</option>
            <option value="rejected">Rejeitados</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serviço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(request.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getServiceLabel(request.service)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => viewRequest(request)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Ver detalhes"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhuma solicitação encontrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalhes */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Detalhes da Solicitação</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="text-base font-semibold">{selectedRequest.name}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base font-semibold">{selectedRequest.email}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Telefone</p>
                  <p className="text-base font-semibold">{selectedRequest.phone}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Serviço</p>
                  <p className="text-base font-semibold">{getServiceLabel(selectedRequest.service)}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-2">Mensagem</p>
                <p className="text-base bg-gray-50 p-4 rounded-lg whitespace-pre-line">{selectedRequest.message}</p>
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'pendente')}
                    className={`px-3 py-1 rounded-full text-xs ${selectedRequest.status === 'pendente' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    Pendente
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'contacted')}
                    className={`px-3 py-1 rounded-full text-xs ${selectedRequest.status === 'contacted' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'}`}
                  >
                    Contatado
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'completed')}
                    className={`px-3 py-1 rounded-full text-xs ${selectedRequest.status === 'completed' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'}`}
                  >
                    Concluído
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                    className={`px-3 py-1 rounded-full text-xs ${selectedRequest.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800'}`}
                  >
                    Rejeitado
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(selectedRequest.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequestsTable;