'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Ascension</span>
              <span className="text-2xl font-light">Tecnologias</span>
            </div>
            <p className="text-gray-300 max-w-xs">
              Transformando ideias em soluções digitais inovadoras para impulsionar o seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/Holvvx"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com/Ascension.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>

          {/* Links Rápidos */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Serviços */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicos#desenvolvimento-web" className="text-gray-300 hover:text-white transition-colors">
                  Desenvolvimento Web
                </Link>
              </li>
              <li>
                <Link href="/servicos#ecommerce" className="text-gray-300 hover:text-white transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/servicos#sistemas" className="text-gray-300 hover:text-white transition-colors">
                  Sistemas Web
                </Link>
              </li>
              <li>
                <Link href="/servicos#marketing" className="text-gray-300 hover:text-white transition-colors">
                  Marketing Digital
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeIn}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="mt-1" />
                <span className="text-gray-300">
                  Balneário Camboriú<br />
                  Brasil - Santa Catarina
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone />
                <span className="text-gray-300">(47) 99772-0817</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope />
                <span className="text-gray-300">contato@ascn.dev.br</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="mt-12 pt-8 border-t border-white/10 text-center text-gray-300"
        >
          <p>&copy; {currentYear} Ascension Tecnologias. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ 50.807.804/0001-75</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;