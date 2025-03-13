'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaCode, FaDesktop, FaShieldAlt } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      icon: FaCode,
      title: 'Desenvolvimento Web',
      description: 'Criação de sites institucionais, e-commerces e sistemas web personalizados.',
      features: [
        'Sites Institucionais',
        'E-commerce',
        'Sistemas Web',
        'Landing Pages',
        'Blogs e Portais'
      ]
    },
    {
      icon: FaDesktop,
      title: 'Design UI/UX',
      description: 'Design de interfaces modernas e intuitivas, focadas na experiência do usuário.',
      features: [
        'Design Responsivo',
        'Prototipagem',
        'Identidade Visual',
        'Otimização de Conversão',
        'Testes de Usabilidade'
      ]
    },
    {
      icon: FaShieldAlt,
      title: 'Consultoria em TI',
      description: 'Consultoria especializada em tecnologia para otimizar seus processos.',
      features: [
        'Análise de Sistemas',
        'Segurança da Informação',
        'Otimização de Performance',
        'Arquitetura de Software',
        'Suporte Técnico'
      ]
    }
  ];

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
              Nossos Serviços
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferecemos soluções completas em desenvolvimento web e consultoria
              para impulsionar o crescimento do seu negócio.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {Array.isArray(service.features) && service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-gray-600 mb-8">
              Entre em contato conosco para discutir seu projeto e receber uma proposta personalizada.
            </p>
            <a
              href="/orcamento"
              className="inline-block px-8 py-4 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Solicitar Orçamento
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;