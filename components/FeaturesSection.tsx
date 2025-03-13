'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaMobileAlt, FaChartLine, FaShieldAlt, FaUsers } from 'react-icons/fa';

const features = [
  {
    icon: FaRocket,
    title: 'Soluções Inovadoras',
    description: 'Desenvolvimento de projetos com as tecnologias mais recentes do mercado, garantindo inovação e modernidade para seu negócio.'
  },
  {
    icon: FaCode,
    title: 'Código Limpo',
    description: 'Desenvolvimento seguindo as melhores práticas de programação, garantindo manutenibilidade e escalabilidade.'
  },
  {
    icon: FaMobileAlt,
    title: 'Design Responsivo',
    description: 'Sites e aplicativos perfeitamente adaptados para todos os dispositivos, proporcionando a melhor experiência em qualquer tela.'
  },
  {
    icon: FaChartLine,
    title: 'Alta Performance',
    description: 'Otimização completa para garantir velocidade e eficiência, melhorando a experiência do usuário e o SEO.'
  },
  {
    icon: FaShieldAlt,
    title: 'Segurança Avançada',
    description: 'Proteção robusta e privacidade dos dados, seguindo as melhores práticas de segurança e conformidade.'
  },
  {
    icon: FaUsers,
    title: 'Suporte Dedicado',
    description: 'Equipe especializada sempre pronta para ajudar, oferecendo suporte técnico e atendimento personalizado.'
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <feature.icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que escolher a Ascension?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Combinamos tecnologia de ponta, expertise técnica e atendimento personalizado para 
            entregar soluções que impulsionam o sucesso do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <FaRocket className="text-xl" />
            Iniciar Projeto
          </a>
        </motion.div>
      </div>
    </section>
  );
} 