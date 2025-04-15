'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { routes } from '@/app/routes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  image?: string;
  link?: string;
  client?: string;
  technologies?: string[];
  features?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PortfolioListPage() {
  const router = useRouter();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Função para validar URLs de imagem
  const validateImageUrl = (url: string | undefined) => {
    if (!url) return false;
    // Verifica se é uma URL completa
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    // Verifica se é um caminho relativo começando com /
    if (url.startsWith('/')) return true;
    return false;
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/portfolio', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar itens do portfólio');
      }
      
      const data = await response.json();
      
      // Garantir que data.data seja um array ou usar um array vazio
      const items = data.data && Array.isArray(data.data) ? data.data : [];
      setPortfolioItems(items);
      console.log('Itens carregados:', items);
    } catch (err) {
      console.error('Erro ao carregar portfólio:', err);
      setError('Erro ao carregar itens do portfólio. Por favor, tente novamente.');
      setPortfolioItems([]); // Garantir que sempre seja um array mesmo em caso de erro
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/admin/portfolio', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir item');
      }

      // Atualizar a lista após exclusão
      setPortfolioItems(portfolioItems.filter(item => item.id !== id));
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao excluir item. Por favor, tente novamente.');
    }
  };

  const openDeleteModal = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <a
            href={routes.admin.dashboard}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para o Dashboard
          </a>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Gerenciar Portfólio</h1>
            <Link
              href={routes.admin.portfolio.add}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center"
            >
              <FaPlus className="mr-2" />
              Adicionar Item
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {portfolioItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Nenhum item no portfólio. Adicione seu primeiro projeto!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={validateImageUrl(item.imageUrl || item.image || '') && (item.imageUrl || item.image || '') !== '' 
                        ? (item.imageUrl || item.image || '/images/placeholder-project.jpg') 
                        : '/images/placeholder-project.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 truncate">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/portfolio?projeto=${item.id}`}
                          target="_blank"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          title="Visualizar"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={routes.admin.portfolio.edit(String(item.id))}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                          title="Editar"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Excluir"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal de confirmação de exclusão */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir este item do portfólio? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => itemToDelete !== null && handleDelete(itemToDelete)}
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