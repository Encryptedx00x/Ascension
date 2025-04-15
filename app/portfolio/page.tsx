'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaTags } from 'react-icons/fa';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  createdAt: string;
  client?: string;
  technologies?: string[];
  features?: string[];
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);

  const categories = ['Todos', 'Website', 'E-commerce', 'Sistema', 'Landing Page'];

  // Dados de exemplo para preencher propriedades que podem não estar na API
  const defaultTechnologies = useMemo(() => ['Tecnologia 1', 'Tecnologia 2', 'Tecnologia 3'], []);
  const defaultFeatures = useMemo(() => ['Funcionalidade 1', 'Funcionalidade 2', 'Funcionalidade 3'], []);

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
    // Inicializar arrays de funcionalidades e tecnologias
    setFeatures(defaultFeatures);
    setTechnologies(defaultTechnologies);
  }, [defaultFeatures, defaultTechnologies]);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Erro ao buscar itens do portfólio');
        }
        
        const data = await response.json();
        console.log('Itens do portfólio carregados:', data);
        
        if (!data || data.length === 0) {
          setError('Nenhum projeto disponível no momento.');
          setPortfolioItems([]);
          return;
        }
        
        // Enriquecer os dados com informações adicionais se necessário
        const enrichedItems = data.map((item: PortfolioItem) => ({
          ...item,
          client: item.client || 'Cliente Ascension',
          technologies: item.technologies || defaultTechnologies,
          features: item.features || defaultFeatures,
        }));
        
        setPortfolioItems(enrichedItems);
      } catch (err) {
        console.error('Erro ao carregar portfólio:', err);
        setError('Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.');
        setPortfolioItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolioItems();
  }, [defaultFeatures, defaultTechnologies]);

  const filteredItems = portfolioItems.filter(item => {
    if (!item) return false;
    
    const matchesCategory = 
      selectedCategory === 'Todos' || 
      !selectedCategory || 
      item.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch = !searchTerm || 
      (item.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.client?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-[8rem] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nosso Portfólio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos projetos que desenvolvemos, demonstrando nossa expertise
              em criar soluções digitais de alta qualidade que geram resultados reais.
            </p>
          </motion.div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto">
                <FaTags className="text-gray-400" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-200`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="relative h-64">
                    <Image
                      src={validateImageUrl(item.image) ? item.image : '/images/placeholder-project.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <span className="text-sm text-gray-500">{item.client}</span>
                    </div>
                    <p className="text-gray-600 mb-6">
                      {item.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Tecnologias Utilizadas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies && Array.isArray(item.technologies) && item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Funcionalidades
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {item.features && Array.isArray(item.features) && item.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-600">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4">
                      {item.link ? (
                        <Link
                          href={item.link}
                          className="text-primary font-medium hover:text-primary-dark transition-colors duration-300"
                        >
                          Ver Projeto →
                        </Link>
                      ) : (
                        <div></div>
                      )}
                      <Link
                        href="/orcamento"
                        className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors duration-300"
                      >
                        Projeto Similar
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200"
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {portfolioItems.length === 0 
                    ? "Nenhum projeto disponível no momento" 
                    : "Nenhum projeto encontrado para os filtros selecionados"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {portfolioItems.length === 0 
                    ? "Estamos trabalhando para adicionar novos projetos ao nosso portfólio. Volte em breve!" 
                    : "Tente modificar os filtros ou use termos de busca diferentes."}
                </p>
                {selectedCategory !== "Todos" && (
                  <button
                    onClick={() => setSelectedCategory("Todos")}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Ver todos os projetos
                  </button>
                )}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Começar Seu Projeto?
            </h2>
            <p className="text-gray-600 mb-8">
              Entre em contato conosco para discutir suas necessidades e criar uma solução personalizada para seu negócio.
            </p>
            <Link href="/orcamento" className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-block">
              Solicitar Orçamento
            </Link>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioPage;