'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: 'admin@ascension.com',
    password: 'admin123'
  });
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebugInfo('Iniciando login...');
    setIsLoading(true);

    try {
      setDebugInfo(prev => prev + '\nEnviando requisição para /api/auth/login...');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      setDebugInfo(prev => prev + `\nResposta recebida: status ${response.status}`);
      
      const data = await response.json();
      setDebugInfo(prev => prev + `\nDados: ${JSON.stringify(data)}`);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      setDebugInfo(prev => prev + '\nLogin bem-sucedido, redirecionando...');
      
      // Armazenar os dados do usuário no localStorage para persistência
      if (data.user) {
        localStorage.setItem('adminUser', JSON.stringify(data.user));
      } else {
        localStorage.setItem('adminUser', JSON.stringify({
          email: formData.email,
          role: 'admin'
        }));
      }

      // Redirecionar para o dashboard usando o router
      router.push('/admin/dashboard');
    } catch (err: any) {
      const errorMessage = err.message || 'E-mail ou senha incorretos';
      setError(errorMessage);
      setDebugInfo(prev => prev + `\nErro: ${errorMessage}`);
      console.error('Erro de login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para login alternativo
  const handleDevelopmentLogin = () => {
    localStorage.setItem('adminUser', JSON.stringify({
      email: 'admin@ascension.com',
      role: 'admin'
    }));
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="h-[40px] flex items-center justify-center mb-6">
              <h2 className="text-xl font-bold">Ascension Tecnologias</h2>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Painel Administrativo
            </h1>
            <p className="text-gray-600 mt-2">
              Faça login para acessar o painel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="seu@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-500 text-sm p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
            
            <button
              type="button"
              onClick={handleDevelopmentLogin}
              className="w-full py-3 px-6 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-all duration-300 mt-2"
            >
              Modo Desenvolvimento
            </button>
          </form>

          {debugInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-xs font-mono whitespace-pre-wrap">{debugInfo}</p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          © {new Date().getFullYear()} Ascension Tecnologias. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 