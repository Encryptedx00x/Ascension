import React from 'react';
import Navbar from '../../../components/Navbar';
import ServicesSection from '../../../components/ServicesSection';
import Footer from '../../../components/Footer';

export default function ServicosPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Serviços de TI</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Soluções completas em tecnologia da informação para impulsionar o seu negócio.
          </p>
        </div>
      </div>
      <ServicesSection />
      <Footer />
    </main>
  );
} 