'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { portfolioItems } from '@/app/api/mock-data';
import Image from 'next/image';

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <section className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-900">
              Nosso Portfólio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça alguns dos nossos projetos mais recentes e descubra como podemos transformar suas ideias em realidade.
            </p>
          </div>
          
          {/* Filtros de Categoria */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Todos
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors">
              Sites Institucionais
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors">
              E-commerce
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors">
              Portfólios
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors">
              Sistemas
            </button>
          </div>
          
          {/* Grid de projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Projeto
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="mt-16 text-center bg-indigo-900 text-white p-10 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua ideia em realidade?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo para discutir seu projeto e receber um orçamento personalizado.
            </p>
            <a href="/public/orcamentos" className="inline-block px-6 py-3 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Solicitar Orçamento
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
} 