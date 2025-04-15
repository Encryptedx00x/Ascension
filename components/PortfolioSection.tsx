'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { routes } from '@/app/routes';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
}

export default function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para validar URLs de imagem
  const validateImageUrl = useCallback((url: string | undefined) => {
    if (!url) return false;
    // Verifica se é uma URL completa
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    // Verifica se é um caminho relativo começando com /
    if (url.startsWith('/')) return true;
    return false;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Erro ao buscar itens do portfólio');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          if (!data || data.length === 0) {
            // Se não houver itens, mostrar mensagem de erro
            setError('Nenhum item disponível no portfólio');
            setPortfolioItems([]);
          } else {
            // Usar apenas os 4 itens mais recentes ou destacados
            const sortedItems = Array.isArray(data) ? data.slice(0, 4) : [];
            setPortfolioItems(sortedItems);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar portfólio:', err);
        if (isMounted) {
          setError('Não foi possível carregar os itens do portfólio');
          setPortfolioItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchPortfolioItems();

    return () => {
      isMounted = false;
    };
  }, []);

  // Se estiver carregando, mostrar um esqueleto de carregamento
  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nosso Portfólio
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos recentemente
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nosso Portfólio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos recentemente
          </p>
        </motion.div>

        {error && (
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg mb-8 text-center max-w-2xl mx-auto border border-gray-200">
            <p className="text-lg font-medium">{error}</p>
            <p className="mt-2">Estamos em processo de atualização do nosso portfólio. Volte em breve!</p>
          </div>
        )}
        
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={validateImageUrl(item.image) ? item.image : '/images/placeholder-project.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full mb-4 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <Link href={`${routes.portfolio}?projeto=${item.id}`} className="inline-flex items-center text-primary font-medium">
                    Ver Detalhes <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : !error ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum projeto disponível no momento.</p>
          </div>
        ) : null}
        
        {portfolioItems.length > 0 && (
          <div className="text-center mt-12">
            <Link href={routes.portfolio}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                Ver Todos os Projetos
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 