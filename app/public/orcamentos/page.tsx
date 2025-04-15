import React from 'react';
import Navbar from '../../../components/Navbar';
import BudgetSection from '../../../components/BudgetSection';
import Footer from '../../../components/Footer';

export default function OrcamentosPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-10 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Orçamentos</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Solicite um orçamento personalizado para o seu projeto e transforme suas ideias em realidade.
          </p>
        </div>
      </div>
      <BudgetSection />
      <Footer />
    </main>
  );
} 