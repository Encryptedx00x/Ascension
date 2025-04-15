'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import { routes } from '@/app/routes';
import { useRouter } from 'next/navigation';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link?: string;
  client?: string;
  technologies: string[];
  features: string[];
  featured: boolean;
}

export default function EditPortfolioItemPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<PortfolioItem>({
    id: params.id,
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    link: '',
    client: '',
    technologies: [''],
    features: [''],
    featured: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fetchItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/portfolio/${params.id}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar item');
      }
      
      const data = await response.json();
      console.log('Dados recebidos da API:', data);
      
      // Acessando os dados corretamente da resposta da API
      const apiData = data.data || data;
      
      // Garante que technologies e features sejam arrays
      const safeData = {
        ...apiData,
        technologies: Array.isArray(apiData.technologies) ? apiData.technologies : [''],
        features: Array.isArray(apiData.features) ? apiData.features : ['']
      };
      
      console.log('Dados formatados para o formulário:', safeData);
      setFormData(safeData);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar item. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

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
    setIsSaving(true);
    setError('');
    setSuccess(false);

    if (!formData.title || !formData.category || !formData.description || !formData.imageUrl) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setIsSaving(false);
      return;
    }
    
    if (!validateImageUrl(formData.imageUrl)) {
      setError('A URL da imagem deve começar com http://, https:// ou /');
      setIsSaving(false);
      return;
    }

    try {
      // Filtrar tecnologias e funcionalidades vazias
      const technologies = formData.technologies.filter(tech => tech.trim() !== '');
      const features = formData.features.filter(feature => feature.trim() !== '');
      
      const response = await fetch(`/api/admin/portfolio/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          technologies,
          features
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar item');
      }

      setSuccess(true);
      
      // Redirecionar após 1 segundo
      setTimeout(() => {
        router.push(routes.admin.portfolio.list);
      }, 1500);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao atualizar item. Por favor, tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addTechnology = () => {
    setFormData({
      ...formData,
      technologies: [...formData.technologies, '']
    });
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData({
      ...formData,
      technologies: newTechnologies
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href={routes.admin.portfolio.list}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para o Portfólio
          </a>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8">Editar Item do Portfólio</h1>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-500 p-4 rounded-lg mb-6 flex items-center">
                <FaSave className="mr-2" />
                Item atualizado com sucesso!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Título*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Website">Website</option>
                    <option value="Aplicativo">Aplicativo</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Branding">Branding</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem*
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://exemplo.com/imagem.jpg ou /images/projeto.jpg"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                    Link do Projeto
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={formData.link || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://exemplo.com"
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
                    value={formData.client || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tecnologias Utilizadas
                </label>
                <div className="space-y-2">
                  {Array.isArray(formData.technologies) && formData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleTechnologyChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Ex: React, Node.js, etc."
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <FaPlus className="mr-1" />
                    Adicionar Tecnologia
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funcionalidades
                </label>
                <div className="space-y-2">
                  {Array.isArray(formData.features) && formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Ex: Responsivo, Login Social, etc."
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    <FaPlus className="mr-1" />
                    Adicionar Funcionalidade
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Destacar este projeto
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className={`px-6 py-3 bg-primary text-white rounded-lg flex items-center ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 