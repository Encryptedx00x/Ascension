'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaFileAlt, FaUsers, FaSignOutAlt, FaBars, FaTimes, FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa';
import { routes } from '../routes';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                onClick={() => window.location.href = routes.admin.login}
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