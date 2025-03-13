'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaStar } from 'react-icons/fa';
import Link from 'next/link';

type PlanColor = 'blue' | 'purple' | 'green' | 'orange' | 'teal' | 'indigo';

export interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  color: PlanColor;
  serviceType: string;
}

export const plansWithHosting: Plan[] = [
  {
    name: 'Portfólio',
    price: 'R$ 1.997',
    description: 'Perfeito para profissionais que querem mostrar seus trabalhos',
    features: [
      'Design Responsivo',
      'Até 10 Projetos',
      'Galeria de Imagens',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte por 30 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Sistema de Agendamento',
      'Área do Cliente',
      'Integração com APIs',
      'Personalização Avançada'
    ],
    popular: false,
    color: 'blue',
    serviceType: 'portfolio'
  },
  {
    name: 'Institucional',
    price: 'R$ 2.997',
    description: 'Ideal para empresas que querem uma presença online profissional',
    features: [
      'Design Responsivo',
      'Até 5 Páginas',
      'Formulário de Contato',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte por 30 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Sistema de Agendamento',
      'Área do Cliente',
      'Integração com APIs',
      'Personalização Avançada'
    ],
    popular: false,
    color: 'purple',
    serviceType: 'website'
  },
  {
    name: 'Loja',
    price: 'R$ 4.997',
    description: 'Solução completa para e-commerce',
    features: [
      'Design Responsivo',
      'Sistema de E-commerce',
      'Gestão de Produtos',
      'Carrinho de Compras',
      'Gateway de Pagamento',
      'Painel Administrativo',
      'SEO Avançado',
      'Integração com Marketplaces',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte por 90 dias'
    ],
    notIncluded: [
      'Sistema de Agendamento',
      'Personalização Avançada'
    ],
    popular: true,
    color: 'green',
    serviceType: 'ecommerce'
  },
  {
    name: 'Agendamento',
    price: 'R$ 3.997',
    description: 'Sistema completo para agendamento de serviços',
    features: [
      'Design Responsivo',
      'Calendário Interativo',
      'Gestão de Horários',
      'Notificações Automáticas',
      'Painel Administrativo',
      'SEO Básico',
      'Integração com WhatsApp',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte por 60 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Personalização Avançada'
    ],
    popular: false,
    color: 'orange',
    serviceType: 'agendamento'
  },
  {
    name: 'Turismo',
    price: 'R$ 3.497',
    description: 'Solução especializada para agências de turismo',
    features: [
      'Design Responsivo',
      'Catálogo de Destinos',
      'Sistema de Reservas',
      'Gestão de Pacotes',
      'Painel Administrativo',
      'SEO Avançado',
      'Integração com Sistemas de Turismo',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte por 60 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Personalização Avançada'
    ],
    popular: false,
    color: 'teal',
    serviceType: 'sistema-web'
  },
  {
    name: 'Personalizado',
    price: 'Sob Consulta',
    description: 'Solução sob medida para suas necessidades específicas',
    features: [
      'Design Personalizado',
      'Funcionalidades Específicas',
      'Integrações Customizadas',
      'SEO Avançado',
      'Painel Administrativo',
      'Hospedagem por 1 ano',
      'Domínio por 1 ano',
      'Suporte Dedicado',
      'Treinamento da Equipe'
    ],
    notIncluded: [],
    popular: false,
    color: 'indigo',
    serviceType: 'personalizado'
  }
];

export const plansWithoutHosting: Plan[] = [
  {
    name: 'Portfólio',
    price: 'R$ 1.497',
    description: 'Perfeito para profissionais que querem mostrar seus trabalhos',
    features: [
      'Design Responsivo',
      'Até 10 Projetos',
      'Galeria de Imagens',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Suporte por 30 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Sistema de Agendamento',
      'Área do Cliente',
      'Integração com APIs',
      'Personalização Avançada',
      'Hospedagem',
      'Domínio'
    ],
    popular: false,
    color: 'blue',
    serviceType: 'portfolio'
  },
  {
    name: 'Institucional',
    price: 'R$ 2.497',
    description: 'Ideal para empresas que querem uma presença online profissional',
    features: [
      'Design Responsivo',
      'Até 5 Páginas',
      'Formulário de Contato',
      'SEO Básico',
      'Integração com Redes Sociais',
      'Painel Administrativo',
      'Suporte por 30 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Sistema de Agendamento',
      'Área do Cliente',
      'Integração com APIs',
      'Personalização Avançada',
      'Hospedagem',
      'Domínio'
    ],
    popular: false,
    color: 'purple',
    serviceType: 'website'
  },
  {
    name: 'Loja',
    price: 'R$ 4.497',
    description: 'Solução completa para e-commerce',
    features: [
      'Design Responsivo',
      'Sistema de E-commerce',
      'Gestão de Produtos',
      'Carrinho de Compras',
      'Gateway de Pagamento',
      'Painel Administrativo',
      'SEO Avançado',
      'Integração com Marketplaces',
      'Suporte por 90 dias'
    ],
    notIncluded: [
      'Sistema de Agendamento',
      'Personalização Avançada',
      'Hospedagem',
      'Domínio'
    ],
    popular: true,
    color: 'green',
    serviceType: 'ecommerce'
  },
  {
    name: 'Agendamento',
    price: 'R$ 3.497',
    description: 'Sistema completo para agendamento de serviços',
    features: [
      'Design Responsivo',
      'Calendário Interativo',
      'Gestão de Horários',
      'Notificações Automáticas',
      'Painel Administrativo',
      'SEO Básico',
      'Integração com WhatsApp',
      'Suporte por 60 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Personalização Avançada',
      'Hospedagem',
      'Domínio'
    ],
    popular: false,
    color: 'orange',
    serviceType: 'agendamento'
  },
  {
    name: 'Turismo',
    price: 'R$ 2.997',
    description: 'Solução especializada para agências de turismo',
    features: [
      'Design Responsivo',
      'Catálogo de Destinos',
      'Sistema de Reservas',
      'Gestão de Pacotes',
      'Painel Administrativo',
      'SEO Avançado',
      'Integração com Sistemas de Turismo',
      'Suporte por 60 dias'
    ],
    notIncluded: [
      'E-commerce',
      'Personalização Avançada',
      'Hospedagem',
      'Domínio'
    ],
    popular: false,
    color: 'teal',
    serviceType: 'sistema-web'
  },
  {
    name: 'Personalizado',
    price: 'Sob Consulta',
    description: 'Solução sob medida para suas necessidades específicas',
    features: [
      'Design Personalizado',
      'Funcionalidades Específicas',
      'Integrações Customizadas',
      'SEO Avançado',
      'Painel Administrativo',
      'Suporte Dedicado',
      'Treinamento da Equipe'
    ],
    notIncluded: [
      'Hospedagem',
      'Domínio'
    ],
    popular: false,
    color: 'indigo',
    serviceType: 'personalizado'
  }
];

const PlanCard = ({ plan, index, includeHosting }: { plan: Plan, index: number, includeHosting: boolean }) => {
  const colorVariants: Record<PlanColor, string> = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
        plan.popular ? 'ring-2 ring-primary' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-300" />
            <span className="text-sm font-medium">Mais Popular</span>
          </div>
        </div>
      )}

      <div className={`p-6 bg-gradient-to-r ${colorVariants[plan.color]} text-white`}>
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">
            {plan.name !== 'Personalizado' ? 'A partir de ' : ''}{plan.price}
          </span>
          {plan.name !== 'Personalizado' && (
            <p className="text-sm opacity-90 mt-1">
              Parcelamento em até 12x sem juros
            </p>
          )}
        </div>
        <p className="text-sm opacity-90">{plan.description}</p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Recursos Inclusos</h4>
          <ul className="space-y-3">
            {Array.isArray(plan.features) && plan.features.map((feature) => (
              <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
                <FaCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {Array.isArray(plan.notIncluded) && plan.notIncluded.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Não Incluso</h4>
            <ul className="space-y-3">
              {plan.notIncluded.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
                  <FaTimes className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={`/orcamento?service=${plan.serviceType}${!includeHosting ? '&noHosting=true' : ''}`}
          className={`block w-full py-3 px-6 text-center rounded-lg bg-gradient-to-r ${
            colorVariants[plan.color]
          } text-white font-medium hover:opacity-90 transition-opacity`}
        >
          Solicitar Orçamento
        </Link>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  const [includeHosting, setIncludeHosting] = useState(true);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Nossos Modelos</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Escolha o modelo ideal para o seu negócio.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-md inline-flex">
              <button
                onClick={() => setIncludeHosting(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${includeHosting ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300'}`}
              >
                Com hospedagem e domínio
              </button>
              <button
                onClick={() => setIncludeHosting(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!includeHosting ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300'}`}
              >
                Sem hospedagem e domínio
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {includeHosting ? 'Todos os modelos incluem hospedagem e domínio por 1 ano.' : 'Você será responsável pela contratação de hospedagem e domínio.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(includeHosting ? plansWithHosting : plansWithoutHosting).map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} includeHosting={includeHosting} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Não encontrou o plano ideal?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Entre em contato conosco para desenvolvermos uma solução personalizada que atenda 
            perfeitamente às necessidades do seu negócio.
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Falar com um Especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}