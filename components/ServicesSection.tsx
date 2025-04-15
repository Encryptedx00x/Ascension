'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDesktop, FaShieldAlt } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, features, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="card-hover bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="w-14 h-14 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-5 hover-fast">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const services = [
    {
      icon: FaCode,
      title: 'Desenvolvimento Web',
      description: 'Criação de sites institucionais, e-commerces e sistemas web personalizados com as tecnologias mais modernas do mercado.',
      features: [
        'Sites Institucionais',
        'E-commerces',
        'Sistemas Web',
        'Landing Pages',
        'Blogs e Portais'
      ]
    },
    {
      icon: FaDesktop,
      title: 'Design UI/UX',
      description: 'Design de interfaces modernas e intuitivas, focadas na experiência do usuário e na conversão.',
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
      description: 'Consultoria especializada em tecnologia para otimizar seus processos e garantir a segurança dos seus dados.',
      features: [
        'Análise de Sistemas',
        'Segurança da Informação',
        'Otimização de Performance',
        'Arquitetura de Software',
        'Suporte Técnico'
      ]
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/services/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar solicitação');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erro:', error);
      setIsSubmitting(false);
      alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Serviços */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Nossos Serviços
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                Fornecemos soluções completas em desenvolvimento web e consultoria para impulsionar o crescimento do seu negócio.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* Formulário de Solicitação */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">Dúvidas sobre serviços</h3>
              <p className="text-primary-light/90 text-lg">
                Preencha o formulário abaixo para solicitar um de nossos serviços ou tirar dúvidas com nossa equipe.
              </p>
            </div>
            
            {submitSuccess ? (
              <div className="bg-green-600 p-6 rounded-lg text-center">
                <svg className="w-12 h-12 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
                <h4 className="text-xl font-bold mb-2">Solicitação Enviada!</h4>
                <p className="mb-4">Agradecemos pelo seu interesse. Nossa equipe entrará em contato em breve.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="px-5 py-2 bg-white text-primary rounded-lg hover:bg-primary-light/10 transition-colors duration-200"
                >
                  Enviar Nova Solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-primary-light mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-primary-light mb-1">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-primary-light mb-1">Telefone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium text-primary-light mb-1">Tipo de Serviço</label>
                    <select 
                      id="service" 
                      name="service" 
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white appearance-none"
                    >
                      <option value="" className="bg-primary text-white">Selecione um serviço</option>
                      {services.map((service, index) => (
                        <option key={index} value={service.title} className="bg-primary text-white">{service.title}</option>
                      ))}
                      <option value="Outro" className="bg-primary text-white">Outro</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-primary-light mb-1">Mensagem</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4} 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                    placeholder="Descreva sua necessidade ou dúvida"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-white text-primary font-bold hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}