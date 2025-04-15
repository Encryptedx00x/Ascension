'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaDownload, FaSearch, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface NewsletterSubscription {
  id: number;
  email: string;
  createdAt: string;
}

export default function NewsletterAdminPage() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/newsletter', {
        credentials: 'include' // Incluir cookies para autenticação
      });
      
      if (!response.ok) {
        throw new Error('Falha ao carregar inscrições');
      }
      
      const data = await response.json();
      setSubscriptions(data.data);
    } catch (error) {
      setError('Erro ao carregar inscrições da newsletter');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    // Criar cabeçalho CSV
    const headers = ['ID', 'Email', 'Data de Inscrição'];
    
    // Mapear dados para formato CSV
    const csvData = subscriptions.map(sub => {
      const date = new Date(sub.createdAt);
      return [
        sub.id,
        sub.email,
        format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR })
      ].join(',');
    });
    
    // Juntar cabeçalho e dados
    const csvContent = [headers.join(','), ...csvData].join('\n');
    
    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este inscrito?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: 'DELETE',
        credentials: 'include' // Incluir cookies para autenticação
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir inscrito');
      }

      // Atualizar a lista após excluir
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao excluir inscrito. Por favor, tente novamente.');
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Inscrições na Newsletter</h1>
            <p className="text-gray-600">Gerencie as inscrições da newsletter</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FaDownload className="mr-2" />
            Exportar CSV
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por email..."
            className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <FaSpinner className="text-primary text-2xl animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        ) : filteredSubscriptions.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhuma inscrição na newsletter'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Inscrição
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-medium">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{subscription.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(subscription.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(subscription.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
} 