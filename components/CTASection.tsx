'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Transformar sua Ideia em Realidade?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Vamos criar algo incrível juntos. Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/orcamento"
              className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              <FaRocket className="text-xl" />
              Solicitar Orçamento
            </Link>

            <a
              href="tel:+5511999999999"
              className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
            >
              <FaPhone className="text-xl" />
              Ligar Agora
            </a>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80">
            <a
              href="mailto:contato@ascn.dev.br"
              className="flex items-center gap-2 hover:text-white transition-colors duration-300"
            >
              <FaEnvelope className="text-xl" />
              contato@ascn.dev.br
            </a>
            <span className="hidden sm:block">|</span>
            <p>Segunda a Sexta, 9h às 18h</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;