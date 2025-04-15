'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaClipboardList, FaFolderOpen, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members');

  // Dados simulados
  const members = [
    { id: 1, name: 'João Silva', email: 'joao@example.com', phone: '(11) 98765-4321' },
    { id: 2, name: 'Maria Oliveira', email: 'maria@example.com', phone: '(11) 91234-5678' },
    { id: 3, name: 'Carlos Santos', email: 'carlos@example.com', phone: '(11) 99876-5432' },
  ];

  const budgets = [
    { id: 1, client: 'Empresa ABC', type: 'Site Institucional', status: 'Pendente', date: '10/03/2023' },
    { id: 2, client: 'Loja XYZ', type: 'E-commerce', status: 'Aprovado', date: '05/03/2023' },
    { id: 3, client: 'Fotógrafo José', type: 'Portfólio', status: 'Em análise', date: '01/03/2023' },
  ];

  const portfolioItems = [
    { id: 1, title: 'E-commerce TechStore', category: 'loja' },
    { id: 2, title: 'Site Institucional JurisTech', category: 'institucional' },
    { id: 3, title: 'Portfólio Fotógrafo Carlos Silva', category: 'portfolio' },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Painel Administrativo</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Gerencie membros, orçamentos e itens do portfólio.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-900 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('members')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'members'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaUsers />
                  <span>Membros</span>
                </button>
                <button
                  onClick={() => setActiveTab('budgets')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'budgets'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaClipboardList />
                  <span>Orçamentos</span>
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'portfolio'
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaFolderOpen />
                  <span>Portfólio</span>
                </button>
                <button
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 mt-8"
                >
                  <FaSignOutAlt />
                  <span>Sair</span>
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'members' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Membros Cadastrados</h3>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <FaPlus size={14} />
                      <span>Adicionar Membro</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Nome
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Telefone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {members.map((member) => (
                          <tr key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{member.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                                Editar
                              </button>
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                Excluir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'budgets' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Orçamentos Solicitados</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {budgets.map((budget) => (
                          <tr key={budget.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{budget.client}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{budget.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  budget.status === 'Aprovado'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : budget.status === 'Pendente'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                }`}
                              >
                                {budget.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{budget.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                                Ver Detalhes
                              </button>
                              <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                                Responder
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'portfolio' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Itens do Portfólio</h3>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <FaPlus size={14} />
                      <span>Adicionar Projeto</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Título
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Categoria
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                        {portfolioItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap capitalize">{item.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">
                                Editar
                              </button>
                              <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                                Excluir
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard; 