'use client';

import React, { useEffect, useState } from 'react';
import { motion, LazyMotion, domAnimation, m } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaRocket } from 'react-icons/fa';

interface Particle {
  top: number;
  left: number;
  size: string;
  duration: number;
  delay: number;
  xOffset: number;
}

const HeroSection = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array(20).fill(0).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() > 0.5 ? 'h-16 w-16' : 'h-24 w-24',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25
    }));
    setParticles(newParticles);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center overflow-hidden">
        {/* Partículas animadas de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, i) => (
            <m.div
              key={i}
              className={`absolute rounded-full bg-white/10 ${particle.size}`}
              style={{
                top: `${particle.top}%`,
                left: `${particle.left}%`,
              }}
              animate={{
                y: [0, -100],
                x: [0, particle.xOffset],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <m.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <m.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-2xl">Transforme sua presença digital com a</span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-[3.8rem]">
                  Ascension Tecnologias
                </span>
              </m.h1>
              
              <m.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-xl md:text-2xl text-blue-100"
              >
                Somos especialistas em desenvolvimento web e serviços de TI, 
                criando soluções digitais inovadoras que impulsionam o sucesso do seu negócio.
              </m.p>
              
              <m.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/servicos">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Conhecer Serviços
                  </m.button>
                </Link>
                <Link href="/orcamentos">
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    Solicitar Orçamento
                  </m.button>
                </Link>
              </m.div>
            </m.div>
            
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full h-[500px] rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 shadow-2xl overflow-hidden">
                  <Image
                    src="/images/imageshero-illustration.png"
                    alt="Ilustração representando desenvolvimento web"
                    width={600}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Elementos decorativos */}
                <m.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 10, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  className="absolute -top-8 -left-8 w-32 h-32 rounded-2xl bg-blue-500/30 backdrop-blur-lg z-[-1]"
                />
                <m.div
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    y: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 1
                  }}
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-purple-500/30 backdrop-blur-lg z-[-1]"
                />
              </div>
            </m.div>
          </div>
        </div>

        {/* Onda decorativa na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,218.7C672,245,768,267,864,256C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HeroSection;