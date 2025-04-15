'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { FaCode, FaLightbulb, FaUsers, FaRocket } from 'react-icons/fa';

const AboutPage = () => {
  const values = [
    {
      icon: FaCode,
      title: 'Excelência Técnica',
      description: 'Comprometimento com as melhores práticas de desenvolvimento e tecnologias mais recentes.'
    },
    {
      icon: FaLightbulb,
      title: 'Inovação',
      description: 'Busca constante por soluções criativas e inovadoras para os desafios dos nossos clientes.'
    },
    {
      icon: FaUsers,
      title: 'Foco no Cliente',
      description: 'Dedicação em entender e atender as necessidades específicas de cada cliente.'
    },
    {
      icon: FaRocket,
      title: 'Resultados',
      description: 'Compromisso com a entrega de resultados mensuráveis e impactantes.'
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
              Sobre a Ascension Tecnologias
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos uma empresa de tecnologia focada em criar soluções digitais inovadoras
              que impulsionam o sucesso dos nossos clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Nossa História
              </h2>
              <p className="text-gray-600">
                A Ascension Tecnologias nasceu da paixão por tecnologia e da visão de que
                cada negócio merece uma presença digital excepcional. Desde nossa fundação,
                temos nos dedicado a criar soluções web inovadoras que não apenas atendem,
                mas superam as expectativas dos nossos clientes.
              </p>
              <p className="text-gray-600">
                Nossa jornada começou com o desenvolvimento de sites institucionais e,
                ao longo do tempo, expandimos nossos serviços para incluir soluções
                completas de presença digital, sempre mantendo nosso compromisso com
                a qualidade e inovação.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/about/team.jpg"
                alt="Equipe Ascension Tecnologias"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os princípios que guiam nossa atuação e nos ajudam a entregar
              o melhor para nossos clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Missão
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformar ideias em soluções digitais inovadoras que impulsionem
              o crescimento e o sucesso dos nossos clientes, através da excelência
              técnica e compromisso com resultados.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;