'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sobre a Ascension
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos uma empresa de tecnologia especializada em desenvolvimento de software e soluções digitais inovadoras.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-gray-600 mb-4">
                Fundada em 2020, a Ascension nasceu da paixão por transformar ideias em soluções digitais que impactam positivamente empresas e pessoas. Começamos como uma pequena equipe de desenvolvedores e designers, e hoje nos tornamos uma empresa referência em tecnologia.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa jornada é marcada por desafios superados e conquistas significativas, sempre mantendo nosso compromisso com a excelência e a inovação em cada projeto que realizamos.
              </p>
              <p className="text-gray-600">
                Com uma abordagem centrada no cliente e uma equipe altamente qualificada, estamos constantemente evoluindo para entregar as melhores soluções tecnológicas do mercado.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-80 w-full">
                <Image
                  src="/images/about-company.jpg"
                  alt="Equipe Ascension"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nossa Missão e Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Inovação
                </h3>
                <p className="text-gray-600">
                  &quot;Transformando ideias em realidade digital&quot;
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Compromisso
                </h3>
                <p className="text-gray-600">
                  &quot;Soluções que fazem a diferença&quot;
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Qualidade
                </h3>
                <p className="text-gray-600">
                  &quot;Inovação e qualidade em cada projeto&quot;
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Nossos Fundadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/placeholder-1.svg"
                    alt="Foto do fundador"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Carlos Oliveira
                </h3>
                <p className="text-gray-600 mb-4">
                  CEO & Fundador
                </p>
                <p className="text-gray-600 text-sm">
                  Com mais de 15 anos de experiência em tecnologia, Carlos lidera nossa visão estratégica e desenvolvimento de negócios.
                </p>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/placeholder-2.svg"
                    alt="Foto da CTO"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Marina Silva
                </h3>
                <p className="text-gray-600 mb-4">
                  CTO
                </p>
                <p className="text-gray-600 text-sm">
                  Especialista em arquitetura de software e novas tecnologias, Marina garante a excelência técnica em todos os nossos projetos.
                </p>
              </div>
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/images/team/placeholder-3.svg"
                    alt="Foto do Diretor de Criação"
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Rafael Mendes
                </h3>
                <p className="text-gray-600 mb-4">
                  Diretor de Criação
                </p>
                <p className="text-gray-600 text-sm">
                  Com um olhar único para design e experiência do usuário, Rafael transforma conceitos em interfaces intuitivas e atraentes.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-24"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              O Que Nossos Clientes Dizem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl relative">
                <div className="text-primary absolute -top-5 left-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">
                    &quot;A equipe da Ascension Tecnologias superou todas as nossas expectativas. O novo sistema implementado aumentou nossa produtividade em 30% e reduziu significativamente os custos operacionais.&quot;
                  </p>
                </div>
                <div className="flex items-center mt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    AM
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">André Marques</h4>
                    <p className="text-sm text-gray-600">Diretor de TI, Empresa ABC</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl relative">
                <div className="text-primary absolute -top-5 left-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">
                    &quot;Nosso e-commerce desenvolvido pela Ascension Tecnologias triplicou nossas vendas no primeiro mês. A interface é intuitiva e o suporte técnico é excepcional. Recomendo sem hesitação!&quot;
                  </p>
                </div>
                <div className="flex items-center mt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    LP
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Lúcia Pereira</h4>
                    <p className="text-sm text-gray-600">CEO, Loja XYZ</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl relative">
                <div className="text-primary absolute -top-5 left-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">
                    &quot;O sistema de gestão de processos desenvolvido pela Ascension Tecnologias revolucionou nossa forma de trabalhar. Agradeço pela dedicação e profissionalismo da equipe em todas as etapas do projeto.&quot;
                  </p>
                </div>
                <div className="flex items-center mt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                    FS
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Fernando Santos</h4>
                    <p className="text-sm text-gray-600">COO, Empresa QWE</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 