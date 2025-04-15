'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Diretor de TI',
    company: 'Tech Solutions',
    image: '/images/testimonials/joao.jpg',
    content: 'A Ascension Tecnologias transformou completamente nossa infraestrutura de TI. O suporte é excepcional e a qualidade dos serviços é impecável.'
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'CEO',
    company: 'E-commerce Plus',
    image: '/images/testimonials/maria.jpg',
    content: 'Contratamos a Ascension para desenvolver nosso e-commerce e ficamos impressionados com o resultado. O site é rápido, seguro e fácil de usar.'
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    role: 'Gerente de Projetos',
    company: 'Startup X',
    image: '/images/testimonials/pedro.jpg',
    content: 'A equipe da Ascension é muito profissional e competente. Eles entenderam perfeitamente nossas necessidades e entregaram além das expectativas.'
  },
  {
    id: 4,
    name: 'Ana Costa',
    role: 'Diretora de Marketing',
    company: 'Digital Marketing',
    image: '/images/testimonials/ana.jpg',
    content: 'O suporte técnico da Ascension é incrível. Sempre respondem rapidamente e resolvem qualquer problema com eficiência.'
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
    >
      <div className="flex items-center mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
          <p className="text-sm text-primary">{testimonial.company}</p>
        </div>
      </div>
      
      <div className="relative">
        <FaQuoteLeft className="text-primary text-2xl mb-4" />
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {testimonial.content}
        </p>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            O que nossos clientes dizem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Conheça as experiências de alguns de nossos clientes que confiam em nossos serviços.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <TestimonialCard key={currentIndex} testimonial={testimonials[currentIndex]} />
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
                aria-label="Depoimento anterior"
              >
                <FaChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200"
                aria-label="Próximo depoimento"
              >
                <FaChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary w-4'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 