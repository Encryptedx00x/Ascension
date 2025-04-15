'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEnvelope, FaPhone, FaBuilding, FaClipboardList, FaCalendarAlt, FaShoppingCart, FaGlobe, FaMobileAlt, FaCog } from 'react-icons/fa';

const BudgetSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    deadline: '',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de registro bem-sucedido
    setIsLoggedIn(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleForms = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(!showRegisterForm);
  };

  const services = [
    { value: 'site-institucional', label: 'Site Institucional', icon: FaGlobe },
    { value: 'ecommerce', label: 'E-commerce', icon: FaShoppingCart },
    { value: 'sistema-web', label: 'Sistema Web', icon: FaCog },
    { value: 'app-mobile', label: 'Aplicativo Mobile', icon: FaMobileAlt },
    { value: 'agendamento', label: 'Sistema de Agendamento', icon: FaCalendarAlt },
    { value: 'marketing', label: 'Marketing Digital', icon: FaBuilding }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solicite um Orçamento</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Preencha o formulário abaixo para solicitar um orçamento personalizado para o seu projeto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Por que solicitar um orçamento?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <FaClipboardList className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Projeto Personalizado</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Cada orçamento é elaborado considerando as necessidades específicas do seu projeto.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <FaBuilding className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Soluções para Empresas</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Oferecemos soluções adaptadas ao tamanho e setor da sua empresa.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <FaPhone className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Atendimento Personalizado</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nossa equipe entrará em contato para entender melhor suas necessidades.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          >
            {!isLoggedIn ? (
              <>
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                    <FaLock className="text-blue-600 dark:text-blue-400 text-2xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  {showLoginForm ? 'Faça login para continuar' : 'Crie sua conta'}
                </h3>

                {showLoginForm ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="login-email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="login-password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                      Entrar
                    </button>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Não tem uma conta?{' '}
                      <button
                        type="button"
                        onClick={toggleForms}
                        className="text-primary hover:underline"
                      >
                        Cadastre-se
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="register-name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="register-email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Senha
                      </label>
                      <input
                        type="password"
                        id="register-password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200"
                    >
                      Cadastrar
                    </button>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                      Já tem uma conta?{' '}
                      <button
                        type="button"
                        onClick={toggleForms}
                        className="text-primary hover:underline"
                      >
                        Faça login
                      </button>
                    </p>
                  </form>
                )}
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Serviço Desejado
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Selecione um serviço</option>
                    {services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Orçamento Estimado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Selecione uma faixa</option>
                    <option value="1-3k">R$ 1.000 - R$ 3.000</option>
                    <option value="3-5k">R$ 3.000 - R$ 5.000</option>
                    <option value="5-10k">R$ 5.000 - R$ 10.000</option>
                    <option value="10k+">Acima de R$ 10.000</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prazo Desejado
                  </label>
                  <select
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Selecione um prazo</option>
                    <option value="1-2m">1-2 meses</option>
                    <option value="2-3m">2-3 meses</option>
                    <option value="3-6m">3-6 meses</option>
                    <option value="6m+">Acima de 6 meses</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição do Projeto
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Enviar Solicitação
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BudgetSection;