'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaEdit, FaTrash, FaEye, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { routes } from '@/app/routes';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  imageUrl?: string;
  createdAt: string;
}

export default function TeamMembersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch('/api/admin/members');
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          setMembers(data.data);
        } else {
          console.error('Formato de dados inválido:', data);
          setError('Erro ao carregar membros. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao carregar membros:', error);
        setError('Erro ao carregar membros. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleDeleteClick = (id: number) => {
    setMemberToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;
    
    try {
      const response = await fetch(`/api/admin/members/${memberToDelete}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir membro');
      }
      
      // Atualizar a lista após exclusão
      setMembers(members.filter(member => member.id !== memberToDelete));
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao excluir membro. Por favor, tente novamente.');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setMemberToDelete(null);
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

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Gerenciar Equipe</h1>
            <Link
              href="/admin/equipe/adicionar"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center"
            >
              <FaUserPlus className="mr-2" />
              Adicionar Membro
            </Link>
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
          ) : members.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500 mb-4">Nenhum membro da equipe encontrado.</p>
              <Link
                href="/admin/equipe/adicionar"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <FaUserPlus className="mr-2" />
                Adicionar o primeiro membro
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data de Criação
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                              <Image
                                src={member.imageUrl || '/images/default-avatar.png'}
                                alt={member.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.role || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{member.phone || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/admin/equipe/${member.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Visualizar"
                            >
                              <FaEye />
                            </Link>
                            <Link
                              href={`/admin/equipe/editar/${member.id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Editar"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(member.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Excluir"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">
              Tem certeza que deseja excluir este membro da equipe? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 