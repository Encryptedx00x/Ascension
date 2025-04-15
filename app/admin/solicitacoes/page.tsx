'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ServiceRequestsTable from '@/components/admin/ServiceRequestsTable';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/app/routes';

export default function ServiceRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={routes.admin.dashboard}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para o Dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-8">Gerenciar Dúvidas sobre serviços</h1>

          <ServiceRequestsTable />
        </motion.div>
      </div>
    </div>
  );
}