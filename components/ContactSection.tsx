'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar sua mensagem');
      }
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Limpar formulário após envio
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      
      // Resetar estado de sucesso após 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.';
      setSubmitError(errorMessage);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="contato">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Entre em Contato</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Estamos prontos para atender às suas necessidades. Preencha o formulário abaixo ou utilize um de nossos canais de atendimento.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary text-white rounded-xl p-8 lg:p-12"
            >
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="w-6 h-6 text-primary-light" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-primary-light">Endereço</h4>
                    <p className="mt-1">Av. Paulista, 1000, Sala 301<br />Bela Vista, São Paulo - SP, 01310-100</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="w-6 h-6 text-primary-light" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-primary-light">Telefone</h4>
                    <p className="mt-1">(11) 4321-1234</p>
                    <p>Horário: Seg-Sex, 9h às 18h</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="w-6 h-6 text-primary-light" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-primary-light">E-mail</h4>
                    <p className="mt-1">contato@ascension.tech</p>
                    <p>suporte@ascension.tech</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaWhatsapp className="w-6 h-6 text-primary-light" aria-hidden="true" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-primary-light">WhatsApp</h4>
                    <p className="mt-1">(11) 98765-4321</p>
                    <p>Atendimento em horário comercial</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-medium text-primary-light mb-4">Redes Sociais</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://linkedin.com/company/ascension-tech" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-primary-light transition-colors"
                    aria-label="LinkedIn da Ascension Tecnologias"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://instagram.com/ascension.tech" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-primary-light transition-colors"
                    aria-label="Instagram da Ascension Tecnologias"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://facebook.com/ascension.tech" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-primary-light transition-colors"
                    aria-label="Facebook da Ascension Tecnologias"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://youtube.com/ascension.tech" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-primary-light transition-colors"
                    aria-label="YouTube da Ascension Tecnologias"
                  >
                    <FaYoutube className="w-6 h-6" />
                  </a>
                </div>
              </div>
              
              <div className="mt-12">
                <div className="h-72 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976956269197!2d-46.65739548502235!3d-23.563244484682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde4df54830!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1647369636850!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Mapa da localização da Ascension Tecnologias"
                  ></iframe>
                </div>
              </div>
            </motion.div>
            
            {/* Formulário de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Mensagem Enviada!</h3>
                  <p className="text-green-700 dark:text-green-300 mb-4">
                    Agradecemos o seu contato. Nossa equipe responderá em breve.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)} 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    aria-label="Enviar nova mensagem"
                  >
                    Enviar nova mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome Completo *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        placeholder="Seu nome completo"
                        aria-required="true"
                        aria-invalid={formData.name === ''}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        E-mail *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        placeholder="seu@email.com"
                        aria-required="true"
                        aria-invalid={formData.email === ''}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        placeholder="(11) 98765-4321"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Assunto *
                      </label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                        aria-required="true"
                        aria-invalid={formData.subject === ''}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Orçamento">Solicitar Orçamento</option>
                        <option value="Suporte">Suporte Técnico</option>
                        <option value="Parceria">Proposta de Parceria</option>
                        <option value="Informações">Informações Gerais</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mensagem *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                      placeholder="Digite sua mensagem aqui..."
                      aria-required="true"
                      aria-invalid={formData.message === ''}
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 