'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaUniversity, FaShieldAlt, FaCode } from 'react-icons/fa';

const TimelineItem = ({ 
  icon: Icon, 
  title, 
  year, 
  description, 
  index 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  year: string; 
  description: string; 
  index: number 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-primary p-3 text-white">
          <Icon className="text-xl" />
        </div>
        {index < 4 && (
          <div className="w-0.5 grow bg-gradient-to-b from-primary to-transparent mt-2"></div>
        )}
      </div>
      <div className="pb-10">
        <span className="text-sm text-primary font-semibold">{year}</span>
        <h3 className="text-xl font-bold mt-1 mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  const timeline = [
    {
      icon: FaLaptopCode,
      title: 'Primeiros Passos na Informática',
      year: 'Aos 10 anos',
      description: 'Dyogo Henrique de Oliveira Ortega começou sua jornada na informática com seu pai, descobrindo a paixão pela tecnologia desde cedo.'
    },
    {
      icon: FaCode,
      title: 'Início na Programação',
      year: 'Aos 15 anos',
      description: 'Começou a aprender programação por conta própria, desenvolvendo pequenos projetos e explorando diversas linguagens de programação.'
    },
    {
      icon: FaShieldAlt,
      title: 'Experiências Profissionais',
      year: 'Carreira Profissional',
      description: 'Atuou como Pentester, Desenvolvedor Web, Técnico e Consultor de TI, adquirindo uma ampla experiência em segurança, desenvolvimento e consultoria tecnológica.'
    },
    {
      icon: FaUniversity,
      title: 'Engenharia de Software',
      year: 'Atual',
      description: 'Cursa Engenharia de Software com bolsa integral no Centro Universitário Leonardo da Vinci, aprimorando constantemente seus conhecimentos teóricos e práticos.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Nossa História</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              A Ascension Tecnologias nasceu da paixão pela tecnologia e do desejo de transformar ideias em soluções digitais inovadoras.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Fundada por Dyogo Henrique de Oliveira Ortega, nossa empresa tem como missão oferecer serviços de desenvolvimento web e TI com excelência, combinando criatividade, inovação e qualidade técnica.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Acreditamos que cada projeto é único e merece uma abordagem personalizada. Por isso, trabalhamos em estreita colaboração com nossos clientes para entregar soluções que não apenas atendam, mas superem suas expectativas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-3xl"></div>
            
            <div className="relative bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">A Trajetória do Fundador</h3>
              
              <div className="space-y-2">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    year={item.year}
                    description={item.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;