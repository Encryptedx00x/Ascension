'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUpload, FaCheck, FaPlus, FaTimes } from 'react-icons/fa';
import { routes } from '@/app/routes';
import { useRouter } from 'next/navigation';

export default function AddPortfolioItemPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Website',
    description: '',
    image: '',
    link: '',
    client: '',
    technologies: [''],
    features: [''],
    featured: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateImageUrl = (url: string) => {
    if (!url) return false;
    // Verifica se é uma URL completa
    if (url.startsWith('http://') || url.startsWith('https://')) return true;
    // Verifica se é um caminho relativo começando com /
    if (url.startsWith('/')) return true;
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    if (!formData.title || !formData.category || !formData.description || !formData.image) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }
    
    if (!validateImageUrl(formData.image)) {
      setError('A URL da imagem deve começar com http://, https:// ou /');
      setIsLoading(false);
      return;
    }

    try {
      // Filtrar tecnologias e funcionalidades vazias
      const technologies = formData.technologies.filter(tech => tech.trim() !== '');
      const features = formData.features.filter(feature => feature.trim() !== '');
      
      const response = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          technologies,
          features,
          imageUrl: formData.image
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API:', errorData);
        throw new Error(errorData.error || 'Erro ao adicionar item');
      }
      
      const data = await response.json();
      console.log('Item adicionado com sucesso:', data);
      
      // Mostrar mensagem de sucesso em vez de redirecionar imediatamente
      setSuccess(true);
      
      // Limpar o formulário
      setFormData({
        title: '',
        category: 'Website',
        description: '',
        image: '',
        link: '',
        client: '',
        technologies: [''],
        features: [''],
        featured: false
      });
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push(routes.admin.dashboard);
      }, 2000);
      
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao adicionar item. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, '']
    }));
  };
  
  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };
  
  const handleTechnologyChange = (index: number, value: string) => {
    setFormData(prev => {
      const newTechnologies = [...prev.technologies];
      newTechnologies[index] = value;
      return { ...prev, technologies: newTechnologies };
    });
  };
  
  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };
  
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

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

          <h1 className="text-3xl font-bold mb-8">Adicionar Item ao Portfólio</h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 flex items-center">
              <FaCheck className="mr-2" />
              Item adicionado com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Website">Site Institucional</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Sistema">Sistema Web</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                  Cliente
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL da imagem do projeto. Deve começar com http://, https:// ou ser um caminho relativo como /images/nome.jpg
                </p>
                {formData.image && !validateImageUrl(formData.image) && (
                  <p className="text-sm text-red-500 mt-1">
                    URL inválida! A URL deve começar com http://, https:// ou /
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                  Link do Projeto (opcional)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Tecnologias Utilizadas
                </label>
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, e.target.value)}
                      className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: React.js"
                    />
                    {formData.technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="ml-2 p-3 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechnology}
                  className="mt-2 inline-flex items-center text-primary hover:text-primary/80"
                >
                  <FaPlus className="mr-2" />
                  Adicionar Tecnologia
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Funcionalidades Principais
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: Design Responsivo"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="ml-2 p-3 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="mt-2 inline-flex items-center text-primary hover:text-primary/80"
                >
                  <FaPlus className="mr-2" />
                  Adicionar Funcionalidade
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Adicionando...
                    </>
                  ) : success ? (
                    <>
                      <FaCheck className="mr-2" />
                      Adicionado!
                    </>
                  ) : (
                    <>
                      <FaUpload className="mr-2" />
                      Adicionar Item
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
} 