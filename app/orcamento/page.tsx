'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaCheckCircle, FaInfoCircle, FaTrash } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { serviceFeaturesMap } from '@/config/serviceFeatures';
import { getModelById, getDefaultFeatures, getOptionalFeatures } from '@/config/models';
import { plansWithHosting, plansWithoutHosting, Plan } from '@/components/PricingSection';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BudgetPage = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Informações Pessoais
    name: '',
    email: '',
    phone: '',
    countryCode: '55', // Código do Brasil por padrão
    company: '',
    
    // Detalhes do Projeto
    projectType: '',
    budget: '',
    deadline: '',
    description: '',
    
    // Requisitos Específicos
    features: [] as string[],
    designPreferences: '',
    references: '',
    
    // Informações Adicionais
    howFound: '',
    additionalInfo: '',

    // Opção de hospedagem
    includeHosting: true
  });

  const [customFeatures, setCustomFeatures] = useState<Array<{ name: string; description: string }>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Usado para evitar o problema de renderização múltipla
  const initialServiceType = searchParams.get('service') || '';
  const initialNoHosting = searchParams.get('noHosting') === 'true';

  // Inicializar o modelo selecionado apenas uma vez no carregamento inicial
  const selectedModel = getModelById(formData.projectType);

  // Efeito para carregar o formulário apenas uma vez durante a inicialização
  useEffect(() => {
    setIsLoading(true);

    // Inicializar o formulário com os parâmetros de URL
    const initializeForm = () => {
      if (initialServiceType) {
        const model = getModelById(initialServiceType);
        if (model) {
          const defaultFeatures = model.features
            .filter(f => f.isDefault)
            .map(f => f.name);
          
          // Se noHosting=true, remover a feature de hospedagem
          const finalFeatures = initialNoHosting
            ? defaultFeatures.filter(f => f !== 'Hospedagem e Domínio')
            : defaultFeatures;

          setFormData({
            ...formData,
            projectType: initialServiceType,
            features: finalFeatures,
            includeHosting: !initialNoHosting
          });
        }
      }
      
      setIsLoading(false);
    };

    initializeForm();
    // Este efeito deve executar apenas uma vez na montagem do componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efeito separado para atualizar features quando o tipo de projeto muda
  useEffect(() => {
    if (!isLoading && formData.projectType) {
      const model = getModelById(formData.projectType);
      if (model) {
        const defaultFeatures = model.features
          .filter(f => f.isDefault)
          .map(f => f.name);
        
        // Se includeHosting é false, remover a feature de hospedagem
        const finalFeatures = !formData.includeHosting
          ? defaultFeatures.filter(f => f !== 'Hospedagem e Domínio')
          : defaultFeatures;

        setFormData(prevState => ({
          ...prevState,
          features: finalFeatures
        }));
      }
    }
  }, [formData.projectType, formData.includeHosting, isLoading]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Aceita apenas números
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const handlePhoneChange = (value: string, country: CountryData) => {
    // Remove o + e pega o código do país correto
    const countryCode = country.dialCode;
    
    setFormData(prev => ({
      ...prev,
      phone: '', // Limpa o número quando muda o país
      countryCode: countryCode // Usa o código do país completo
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove não-dígitos
    const maxLength = 4; // Máximo de 4 dígitos para todos os países
    
    if (value.length <= maxLength) {
      setFormData(prev => ({
        ...prev,
        countryCode: value
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Formata o número
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return numbers;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um e-mail válido';
    }

    // Validar telefone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Por favor, insira um telefone válido (ex: (11) 99999-9999)';
    }

    // Validar data de prazo
    if (formData.deadline) {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deadline = 'A data de prazo não pode ser anterior à data atual';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, value]
        : prev.features.filter(feature => feature !== value)
    }));
  };

  const handleHostingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const includeHosting = e.target.checked;
    setFormData(prev => {
      const model = getModelById(prev.projectType);
      if (!model) return prev;

      const defaultFeatures = model.features
        .filter(f => f.isDefault)
        .map(f => f.name);
      
      // Se includeHosting é false, remover a feature de hospedagem
      const finalFeatures = !includeHosting
        ? defaultFeatures.filter(f => f !== 'Hospedagem e Domínio')
        : [...defaultFeatures, 'Hospedagem e Domínio'];

      return {
        ...prev,
        includeHosting,
        features: finalFeatures
      };
    });
  };

  const getAvailableFeatures = () => {
    const serviceType = formData.projectType;
    if (!serviceType) return [];

    const serviceFeatures = serviceFeaturesMap[serviceType];
    if (!serviceFeatures) return [];

    return [...serviceFeatures.defaultFeatures, ...serviceFeatures.optionalFeatures];
  };

  const isFeatureDefault = (feature: string) => {
    const serviceType = formData.projectType;
    if (!serviceType) return false;
    return serviceFeaturesMap[serviceType]?.defaultFeatures.includes(feature) || false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      if (step === 1 && !validateForm()) {
        return;
      }
      setStep(step + 1);
    } else {
      try {
        if (!validateForm()) {
          return;
        }

        // Encontrar o plano atual baseado na opção de hospedagem
        const plans = formData.includeHosting ? plansWithHosting : plansWithoutHosting;
        const currentPlan = plans.find((p: Plan) => p.serviceType === formData.projectType);

        // Filtrar funcionalidades personalizadas válidas
        const validCustomFeatures = customFeatures.filter(f => f.name.trim() !== '');

        const response = await fetch('/api/admin/budgets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            countryCode: formData.countryCode,
            company: formData.company,
            projectType: formData.projectType,
            projectDescription: formData.description,
            deadline: formData.deadline,
            budget: formData.budget,
            features: formData.features,
            customFeatures: validCustomFeatures,
            designPreferences: formData.designPreferences,
            references: formData.references,
            howFound: formData.howFound,
            additionalInfo: formData.additionalInfo,
            selectedModel: selectedModel?.id || null,
            modelPrice: currentPlan?.price || null,
            includeHosting: formData.includeHosting
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error('Erro ao enviar orçamento: ' + (errorData.error || 'Falha na validação'));
        }
        
        const data = await response.json();
        console.log('Orçamento enviado com sucesso!', data);
        
        setShowSuccess(true);
        // Limpar formulário após envio
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '55',
          company: '',
          projectType: '',
          budget: '',
          deadline: '',
          description: '',
          features: [],
          designPreferences: '',
          references: '',
          howFound: '',
          additionalInfo: '',
          includeHosting: true
        });
        setCustomFeatures([]);
        setStep(1);
      } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar seu orçamento. Por favor, tente novamente.');
      }
    }
  };

  const renderSelectedModelInfo = () => {
    if (!selectedModel) return null;

    // Encontrar o plano correspondente baseado na opção de hospedagem
    const plans = formData.includeHosting ? plansWithHosting : plansWithoutHosting;
    const currentPlan = plans.find((p: Plan) => p.serviceType === formData.projectType);

    if (!currentPlan) return null;

    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              {selectedModel.name}
              <span className="text-gray-500 text-lg ml-2">
                {formData.includeHosting ? '(com hospedagem e domínio)' : '(sem hospedagem e domínio)'}
              </span>
            </h3>
            <p className="text-gray-600 mb-4">{selectedModel.description}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <FaInfoCircle className="text-primary" />
              <span>Modelo selecionado com {selectedModel.features.filter(f => f.isDefault).length} funcionalidades padrão</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {currentPlan.price === 'Sob Consulta' ? currentPlan.price : `A partir de ${currentPlan.price}`}
            </p>
            {currentPlan.price !== 'Sob Consulta' && (
              <p className="text-sm text-gray-500">Parcelamento em até 12x sem juros</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {renderSelectedModelInfo()}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informações Pessoais
            </h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <div className="flex gap-2">
                <div className="w-[100px]">
                  <PhoneInput
                    country={'br'}
                    value={`${formData.countryCode}`}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'countryCode',
                      required: true,
                      value: `+${formData.countryCode}`,
                      onChange: handleCountryCodeChange,
                      className: `w-full px-2 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-primary focus:border-transparent`
                    }}
                    containerClass="phone-input-container !w-full"
                    buttonClass="phone-input-button"
                    dropdownClass="phone-input-dropdown"
                    searchClass="phone-input-search"
                    searchPlaceholder="Buscar país..."
                    enableSearch={true}
                    disableSearchIcon={false}
                    searchNotFound="Nenhum país encontrado"
                    preferredCountries={['br', 'us', 'pt', 'es', 'fr', 'de', 'it', 'uk']}
                    enableAreaCodes={false}
                    buttonStyle={{
                      border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '0.5rem 0 0 0.5rem',
                      backgroundColor: 'white'
                    }}
                    inputStyle={{
                      border: errors.phone ? '1px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      width: '100%',
                      height: '48px',
                      fontSize: '0.875rem',
                      backgroundColor: 'transparent',
                      fontFamily: 'inherit'
                    }}
                    dropdownStyle={{
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      width: '300px',
                      maxHeight: '300px'
                    }}
                    searchStyle={{
                      borderRadius: '0.5rem 0.5rem 0 0',
                      border: '1px solid #d1d5db',
                      margin: '0',
                      width: '100%',
                      fontFamily: 'inherit'
                    }}
                    disableCountryCode={false}
                    disableDropdown={false}
                    countryCodeEditable={false}
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Remove todos os caracteres não numéricos
                      const numbers = value.replace(/\D/g, '');
                      
                      // Formata o número baseado no país
                      let formattedValue = '';
                      const isUSA = formData.countryCode === '1';
                      
                      if (isUSA) {
                        // Formato EUA: (XXX) XXX-XXXX
                        if (numbers.length <= 3) {
                          formattedValue = `(${numbers}`;
                        } else if (numbers.length <= 6) {
                          formattedValue = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
                        } else if (numbers.length <= 10) {
                          formattedValue = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
                        }
                        // Limita a 10 dígitos para EUA
                        if (numbers.length <= 10) {
                          setFormData(prev => ({
                            ...prev,
                            phone: formattedValue
                          }));
                        }
                      } else {
                        // Formato Brasil e outros: (XX) XXXXX-XXXX
                        if (numbers.length <= 2) {
                          formattedValue = `(${numbers}`;
                        } else if (numbers.length <= 7) {
                          formattedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
                        } else if (numbers.length <= 11) {
                          formattedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
                        }
                        // Limita a 11 dígitos para Brasil
                        if (numbers.length <= 11) {
                          setFormData(prev => ({
                            ...prev,
                            phone: formattedValue
                          }));
                        }
                      }
                    }}
                    placeholder={formData.countryCode === '1' ? "(XXX) XXX-XXXX" : "(XX) XXXXX-XXXX"}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-primary focus:border-transparent font-medium`}
                  />
                </div>
              </div>
              <style jsx global>{`
                .phone-input-container {
                  height: 48px !important;
                  font-family: inherit !important;
                }
                .phone-input-container .flag-dropdown {
                  border: none !important;
                  background: transparent !important;
                }
                .phone-input-container .selected-flag {
                  display: flex !important;
                  align-items: center !important;
                  padding: 0 8px !important;
                  background-color: white !important;
                  z-index: 1 !important;
                  border-right: 1px solid #d1d5db !important;
                  border-left: 1px solid #d1d5db !important;
                  border-top: 1px solid #d1d5db !important;
                  border-bottom: 1px solid #d1d5db !important;
                  border-radius: 0.5rem 0 0 0.5rem !important;
                }
                .phone-input-container input {
                  padding-left: 48px !important;
                  font-size: 0.875rem !important;
                  font-family: inherit !important;
                  font-weight: 500 !important;
                  background-color: transparent !important;
                }
                .phone-input-container .country-list {
                  width: 300px !important;
                  max-height: 300px !important;
                  overflow-y: auto !important;
                  font-family: inherit !important;
                  scrollbar-width: thin !important;
                  scrollbar-color: #d1d5db transparent !important;
                }
                .phone-input-container .country-list::-webkit-scrollbar {
                  width: 6px !important;
                }
                .phone-input-container .country-list::-webkit-scrollbar-track {
                  background: transparent !important;
                }
                .phone-input-container .country-list::-webkit-scrollbar-thumb {
                  background-color: #d1d5db !important;
                  border-radius: 3px !important;
                }
                .phone-input-container .country-list .country {
                  display: flex !important;
                  align-items: center !important;
                  padding: 8px 10px !important;
                }
                .phone-input-container .country-list .country:hover {
                  background-color: #f3f4f6 !important;
                }
                .phone-input-container .country-list .country .dial-code {
                  color: #6B7280 !important;
                  font-weight: 500 !important;
                }
                .phone-input-container .country-list .country .country-name {
                  color: #374151 !important;
                  font-weight: 500 !important;
                }
                .phone-input-container .country-list .search {
                  padding: 10px !important;
                  font-family: inherit !important;
                }
                .phone-input-container .country-list .search-box {
                  font-family: inherit !important;
                  font-size: 0.875rem !important;
                  padding: 8px 12px !important;
                }
              `}</style>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Empresa (opcional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {renderSelectedModelInfo()}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Detalhes do Projeto
            </h2>
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Projeto
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione uma opção</option>
                <option value="portfolio">Portfólio</option>
                <option value="website">Site Institucional</option>
                <option value="ecommerce">E-commerce</option>
                <option value="agendamento">Sistema de Agendamento</option>
                <option value="sistema-web">Sistema Web</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="includeHosting"
                  checked={formData.includeHosting}
                  onChange={handleHostingChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="includeHosting" className="ml-2 block text-sm text-gray-900">
                  Incluir hospedagem e domínio por 1 ano
                </label>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {formData.includeHosting
                  ? 'Inclui hospedagem e domínio por 1 ano, com suporte técnico.'
                  : 'Você será responsável pela contratação de hospedagem e domínio.'}
              </p>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento Previsto
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione uma opção</option>
                <option value="ate5k">Até R$ 5.000</option>
                <option value="5ka10k">R$ 5.000 a R$ 10.000</option>
                <option value="10ka20k">R$ 10.000 a R$ 20.000</option>
                <option value="20ka50k">R$ 20.000 a R$ 50.000</option>
                <option value="mais50k">Acima de R$ 50.000</option>
              </select>
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                Prazo Desejado
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.deadline ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Projeto
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Descreva seu projeto em detalhes..."
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {renderSelectedModelInfo()}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Requisitos Específicos
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Funcionalidades Desejadas
              </label>
              <div className="space-y-4">
                {selectedModel?.features.map((feature) => {
                  // Não mostrar a feature de hospedagem se includeHosting for false
                  if (!formData.includeHosting && feature.name === 'Hospedagem e Domínio') {
                    return null;
                  }

                  return (
                    <div key={feature.name} className="flex items-start">
                      <input
                        type="checkbox"
                        id={feature.name}
                        name="features"
                        value={feature.name}
                        checked={feature.isDefault || formData.features.includes(feature.name)}
                        onChange={handleCheckboxChange}
                        disabled={feature.isDefault || (!formData.includeHosting && feature.name === 'Hospedagem e Domínio')}
                        className={`mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                          feature.isDefault ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                      <div className="ml-3">
                        <label 
                          htmlFor={feature.name} 
                          className={`text-gray-700 ${
                            feature.isDefault ? 'text-gray-500' : ''
                          }`}
                        >
                          {feature.name}
                          {feature.isDefault && (
                            <span className="ml-2 text-sm text-gray-400">(Incluso no pacote)</span>
                          )}
                        </label>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Funcionalidades Personalizadas */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Funcionalidades Personalizadas
                </label>
                <button
                  type="button"
                  onClick={() => setCustomFeatures([...customFeatures, { name: '', description: '' }])}
                  className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Adicionar Funcionalidade
                </button>
              </div>
              <div className="space-y-4">
                {customFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Nome da funcionalidade"
                        value={feature.name}
                        onChange={(e) => {
                          const newFeatures = [...customFeatures];
                          newFeatures[index].name = e.target.value;
                          setCustomFeatures(newFeatures);
                        }}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <textarea
                        placeholder="Descrição da funcionalidade"
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...customFeatures];
                          newFeatures[index].description = e.target.value;
                          setCustomFeatures(newFeatures);
                        }}
                        className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={2}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = customFeatures.filter((_, i) => i !== index);
                        setCustomFeatures(newFeatures);
                      }}
                      className="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="designPreferences" className="block text-sm font-medium text-gray-700 mb-2">
                Preferências de Design
              </label>
              <textarea
                id="designPreferences"
                name="designPreferences"
                value={formData.designPreferences}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Cores, estilos, referências visuais..."
              />
            </div>
            <div>
              <label htmlFor="references" className="block text-sm font-medium text-gray-700 mb-2">
                Sites de Referência
              </label>
              <textarea
                id="references"
                name="references"
                value={formData.references}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Links de sites que você gosta..."
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            {renderSelectedModelInfo()}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Informações Adicionais
            </h2>
            <div>
              <label htmlFor="howFound" className="block text-sm font-medium text-gray-700 mb-2">
                Como nos encontrou?
              </label>
              <select
                id="howFound"
                name="howFound"
                value={formData.howFound}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecione uma opção</option>
                <option value="google">Google</option>
                <option value="social">Redes Sociais</option>
                <option value="indication">Indicação</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                Informações Adicionais
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Algo mais que gostaria de nos contar?"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-[8rem] pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                <FaCheckCircle className="text-green-500 text-6xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Orçamento Enviado com Sucesso!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Agradecemos pelo seu interesse em nossos serviços. Nossa equipe analisará sua solicitação e entrará em contato em até 48 horas úteis.
              </p>
              <p className="text-md text-gray-500 mb-8">
                Você receberá um e-mail de confirmação com os detalhes da sua solicitação. Se não receber em alguns minutos, verifique sua pasta de spam.
              </p>
              <div className="flex flex-col space-y-4 items-center">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      countryCode: '55',
                      company: '',
                      projectType: '',
                      budget: '',
                      deadline: '',
                      description: '',
                      features: [],
                      designPreferences: '',
                      references: '',
                      howFound: '',
                      additionalInfo: '',
                      includeHosting: true
                    });
                    setCustomFeatures([]);
                    setStep(1);
                  }}
                  className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                >
                  Solicitar Novo Orçamento
                </button>
                <div>
                  <a
                    href="/"
                    className="text-primary hover:text-primary-dark transition-colors duration-200"
                  >
                    Voltar para a Página Inicial
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-[8rem] pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Solicite um Orçamento
            </h1>
            <p className="text-xl text-gray-600">
              Preencha o formulário abaixo para receber uma proposta personalizada
              para o seu projeto.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-center items-center" style={{ minHeight: "400px" }}>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex justify-between items-center mb-8">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`flex items-center ${
                      stepNumber === 4 ? '' : 'flex-1'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= stepNumber
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 4 && (
                      <div
                        className={`h-1 flex-1 mx-2 ${
                          step > stepNumber ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {renderStep()}
                
                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300"
                    >
                      Voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    className={`px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                      step === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    {step === 4 ? 'Enviar Orçamento' : 'Próximo'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetPage;