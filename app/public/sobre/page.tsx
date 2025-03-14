import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function SobrePage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Ascension Tecnologias</h1>
              <p className="text-xl mb-8">
                Transformando negócios através de soluções tecnológicas inovadoras desde 2015.
              </p>
            </div>
          </div>
        </section>
        
        {/* Nossa História */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center">Nossa História</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  A Ascension Tecnologias nasceu da paixão de seus fundadores por criar soluções tecnológicas que realmente fazem a diferença. Em 2015, três amigos com experiência em desenvolvimento, design e negócios decidiram unir forças para criar uma empresa que pudesse oferecer serviços de TI completos com um atendimento personalizado.
                </p>
                <p>
                  No início, éramos uma pequena equipe trabalhando em um escritório modesto, mas com uma visão ambiciosa: nos tornarmos referência em soluções tecnológicas para empresas de todos os portes. Ao longo dos anos, nossa dedicação à qualidade e satisfação do cliente nos permitiu crescer de forma consistente.
                </p>
                <p>
                  Hoje, contamos com uma equipe de profissionais altamente qualificados e um portfólio diversificado de projetos em diversos segmentos. Nosso compromisso continua sendo o mesmo: impulsionar o sucesso dos nossos clientes através da tecnologia.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Missão, Visão e Valores */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">Missão, Visão e Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Missão</h3>
                <p className="text-gray-600 text-center">
                  Fornecer soluções tecnológicas inovadoras que impulsionem o crescimento dos nossos clientes, superando suas expectativas através de um atendimento personalizado e resultados mensuráveis.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Visão</h3>
                <p className="text-gray-600 text-center">
                  Ser reconhecida como referência nacional em soluções tecnológicas, criando parcerias duradouras com nossos clientes e contribuindo para a transformação digital das empresas brasileiras.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Valores</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> Excelência em tudo o que fazemos
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> Compromisso com resultados
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> Ética e transparência
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> Inovação constante
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">•</span> Respeito aos clientes e colaboradores
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Nossa Equipe */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">Nossa Equipe</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Membro da Equipe 1 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/images/team/placeholder-1.svg" 
                    alt="Foto do fundador" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300?text=Fundador'}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Ricardo Almeida</h3>
                <p className="text-indigo-600 font-medium mb-2">CEO & Fundador</p>
                <p className="text-gray-600 px-6">
                  10+ anos de experiência em gestão de TI e desenvolvimento de soluções empresariais.
                </p>
              </div>
              
              {/* Membro da Equipe 2 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/images/team/placeholder-2.svg" 
                    alt="Foto da CTO" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300?text=CTO'}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Marina Costa</h3>
                <p className="text-indigo-600 font-medium mb-2">CTO</p>
                <p className="text-gray-600 px-6">
                  Especialista em arquitetura de sistemas e desenvolvimento full-stack.
                </p>
              </div>
              
              {/* Membro da Equipe 3 */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="/images/team/placeholder-3.svg" 
                    alt="Foto do Diretor de Criação" 
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/300?text=Designer'}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Felipe Santos</h3>
                <p className="text-indigo-600 font-medium mb-2">Diretor de Criação</p>
                <p className="text-gray-600 px-6">
                  Designer premiado com vasta experiência em UX/UI e identidade visual.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                Nossa equipe é composta por profissionais talentosos e apaixonados por tecnologia, 
                sempre em busca de novas formas de inovar e entregar valor aos nossos clientes.
              </p>
              <a href="/public/contato" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Fale com nossa equipe
              </a>
            </div>
          </div>
        </section>
        
        {/* Estatísticas */}
        <section className="py-16 bg-indigo-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-indigo-200">Projetos Concluídos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-indigo-200">Clientes Satisfeitos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-indigo-200">Profissionais</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">8</div>
                <div className="text-indigo-200">Anos de Experiência</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Depoimentos */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">O Que Dizem Nossos Clientes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Depoimento 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-800">Carlos Mendes</h4>
                    <p className="text-gray-600">Gerente de TI, Empresa XYZ</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  &quot;A equipe da Ascension Tecnologias superou todas as nossas expectativas. O novo sistema implementado aumentou nossa produtividade em 30% e reduziu significativamente os custos operacionais.&quot;
                </p>
              </div>
              
              {/* Depoimento 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-800">Ana Paula Silva</h4>
                    <p className="text-gray-600">Proprietária, Boutique Online</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  &quot;Nosso e-commerce desenvolvido pela Ascension Tecnologias triplicou nossas vendas no primeiro mês. A interface é intuitiva e o suporte técnico é excepcional. Recomendo sem hesitação!&quot;
                </p>
              </div>
              
              {/* Depoimento 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                  <div className="text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-800">Roberto Fernandes</h4>
                    <p className="text-gray-600">Diretor, Escritório de Advocacia</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  &quot;O sistema de gestão de processos desenvolvido pela Ascension Tecnologias revolucionou nossa forma de trabalhar. Agradeço pela dedicação e profissionalismo da equipe em todas as etapas do projeto.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">Pronto para Transformar sua Empresa?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Entre em contato conosco hoje mesmo e descubra como nossas soluções tecnológicas podem alavancar o seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/public/contato" className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                  Fale Conosco
                </a>
                <a href="/public/orcamentos" className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors">
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
} 