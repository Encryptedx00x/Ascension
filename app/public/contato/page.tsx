import React from 'react';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Fale Conosco</h1>
              <p className="text-xl mb-8">
                Estamos à disposição para responder a todas as suas dúvidas e ajudar a encontrar a solução ideal para o seu negócio.
              </p>
            </div>
          </div>
        </section>
        
        <ContactSection />
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-indigo-900 mb-12 text-center">Perguntas Frequentes</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Qual o prazo médio para desenvolvimento de um site?</h3>
                  <p className="text-gray-600">
                    O prazo varia de acordo com a complexidade do projeto. Sites institucionais simples podem levar de 2 a 4 semanas, enquanto e-commerces e plataformas mais complexas podem levar de 6 a 12 semanas ou mais, dependendo dos requisitos específicos.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">A Ascension oferece serviços de manutenção após a entrega do projeto?</h3>
                  <p className="text-gray-600">
                    Sim, oferecemos pacotes de manutenção e suporte técnico para todos os nossos projetos. Estes podem incluir atualizações de segurança, backup, monitoramento de desempenho e suporte ao conteúdo, entre outros serviços.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">É possível solicitar ajustes no projeto após a sua conclusão?</h3>
                  <p className="text-gray-600">
                    Sim, oferecemos um período de ajustes após a entrega do projeto, conforme especificado no contrato. Ajustes adicionais podem ser solicitados a qualquer momento e serão orçados conforme a complexidade das alterações.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">A Ascension trabalha com projetos de pequeno porte?</h3>
                  <p className="text-gray-600">
                    Sim, atendemos clientes de todos os portes, desde empreendedores individuais até grandes empresas. Temos soluções adaptadas para cada tipo de negócio e orçamento.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Qual a forma de pagamento para os projetos?</h3>
                  <p className="text-gray-600">
                    Trabalhamos com diversas formas de pagamento, incluindo parcelamento em cartão de crédito, transferência bancária e boleto. O valor e as condições de pagamento são definidos no contrato, de acordo com o escopo do projeto.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-10">
                <p className="text-lg text-gray-700 mb-4">
                  Não encontrou a resposta que procurava?
                </p>
                <a href="#contato" className="inline-block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                  Entre em contato
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