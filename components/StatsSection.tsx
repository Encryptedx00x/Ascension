'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaCode, FaTrophy, FaStar, FaHandshake } from 'react-icons/fa';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    icon: <FaUsers className="w-8 h-8" />,
    value: 150,
    label: 'Clientes Satisfeitos',
    suffix: '+'
  },
  {
    icon: <FaProjectDiagram className="w-8 h-8" />,
    value: 300,
    label: 'Serviços Prestados Presencialmente e On-line',
    suffix: '+'
  },
  {
    icon: <FaCode className="w-8 h-8" />,
    value: 50000,
    label: 'Linhas de Código',
    suffix: '+'
  },
  {
    icon: <FaTrophy className="w-8 h-8" />,
    value: 2,
    label: 'Anos de Existência',
    suffix: '+'
  },
  {
    icon: <FaStar className="w-8 h-8" />,
    value: 100,
    label: 'Satisfação dos Clientes',
    suffix: '%'
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    value: 5,
    label: 'Anos de Experiência dos Programadores',
    suffix: '+'
  }
];

const StatCard: React.FC<{ stat: Stat; controls: any }> = ({ stat, controls }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = stat.value / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
    >
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
        {stat.icon}
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
      >
        {count}{stat.suffix}
      </motion.div>
      <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
    </motion.div>
  );
};

export default function StatsSection() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: 1, opacity: 1 });
  }, [controls]);

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Números que Inspiram
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-primary-light max-w-2xl mx-auto"
          >
            Nossa trajetória de sucesso é marcada por conquistas e resultados que nos orgulham.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} controls={controls} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-primary-light text-lg">
            Junte-se a nós e faça parte dessa história de sucesso
          </p>
        </motion.div>
      </div>
    </section>
  );
}