'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaFileAlt, FaUsers, FaSignOutAlt, FaBars, FaTimes, FaEnvelope, FaPhone, FaQuestionCircle, FaSpinner } from 'react-icons/fa';
import { routes } from '../routes';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Verificar autenticação no carregamento da página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Limpar variáveis de autenticação antigas para evitar persistência indesejada
        if (pathname === routes.admin.login) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        // Primeiro tenta verificar via API
        const res = await fetch('/api/auth/check', {
          credentials: 'include',
          // Adicionar cache: 'no-store' para evitar cache
          cache: 'no-store'
        });
        
        const data = await res.json();
        
        if (res.ok && data.authenticated) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
        
        // Se a API falhar, tenta verificar via sessionStorage
        const adminUser = sessionStorage.getItem('adminUser');
        if (adminUser) {
          try {
            const user = JSON.parse(adminUser);
            if (user && user.role === 'admin') {
              // Verificar novamente com o servidor para garantir
              const verifyRes = await fetch('/api/auth/check', {
                credentials: 'include',
                cache: 'no-store'
              });
              
              if (verifyRes.ok && (await verifyRes.json()).authenticated) {
                setIsAuthenticated(true);
                setIsLoading(false);
                return;
              } else {
                // Limpar dados inválidos
                sessionStorage.removeItem('adminUser');
              }
            }
          } catch (e) {
            console.error('Erro ao analisar dados de sessão:', e);
            sessionStorage.removeItem('adminUser');
          }
        }
        
        // Se não estiver autenticado e não estiver na página de login, redireciona
        if (pathname !== routes.admin.login) {
          router.push(routes.admin.login);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        
        // Se não estiver autenticado e não estiver na página de login, redireciona
        if (pathname !== routes.admin.login) {
          router.push(routes.admin.login);
        } else {
          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Verificar autenticação periodicamente (a cada 1 minuto)
    const intervalId = setInterval(() => {
      if (pathname !== routes.admin.login) {
        checkAuth();
      }
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [pathname, router]);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: FaHome,
      href: routes.admin.dashboard
    },
    {
      label: 'Portfólio',
      icon: FaBriefcase,
      href: routes.admin.portfolio.add
    },
    {
      label: 'Orçamentos',
      icon: FaFileAlt,
      href: routes.admin.budgets
    },
    {
      label: 'Dúvidas sobre Serviços',
      icon: FaQuestionCircle,
      href: routes.admin.serviceRequests
    },
    {
      label: 'Equipe',
      icon: FaUsers,
      href: routes.admin.members.list
    },
    {
      label: 'Newsletter',
      icon: FaEnvelope,
      href: routes.admin.newsletter
    },
    {
      label: 'Contatos',
      icon: FaPhone,
      href: routes.admin.contacts
    }
  ];

  const handleLogout = async () => {
    // Limpar o cookie de autenticação
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Limpar sessionStorage
    sessionStorage.removeItem('adminUser');
    
    // Atualizar o estado de autenticação
    setIsAuthenticated(false);
    
    // Fazer uma chamada para o endpoint de logout no servidor
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    
    // Redirecionar para a página de login (usar router para garantir que a autenticação seja verificada novamente)
    router.push(routes.admin.login);
  };

  // Exibir tela de carregamento enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
        <p className="text-gray-600">Verificando autenticação...</p>
      </div>
    );
  }

  // Se não estiver autenticado e não estiver na página de login, não renderiza nada
  // O redirecionamento já foi tratado no useEffect
  if (!isAuthenticated && pathname !== routes.admin.login) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Ascension Admin</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <button
                className="flex items-center w-full px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-5 h-5 mr-3" />
                Sair
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-lg z-50 lg:hidden"
        >
          {isSidebarOpen ? (
            <FaTimes className="w-5 h-5 text-gray-500" />
          ) : (
            <FaBars className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}