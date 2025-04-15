'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { routes } from '@/app/routes';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  imageUrl: string;
  bio: string;
  linkedin: string;
  github: string;
}

export default function TeamMemberPage() {
  const params = useParams();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/admin/members/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setMember(data.data);
        } else {
          throw new Error(data.error || 'Erro ao buscar dados do membro');
        }
      } catch (error) {
        console.error('Erro:', error);
        setError('Erro ao carregar dados do membro. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro</h1>
          <p className="text-gray-600 mb-4">{error || 'Membro não encontrado'}</p>
          <Link
            href="/admin/equipe"
            className="text-primary hover:underline inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Voltar para a lista de membros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/admin/equipe"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Voltar para a lista de membros
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
              <Image
                src={member.imageUrl || '/images/default-avatar.png'}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{member.name}</h1>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Cargo</h2>
                <p className="text-gray-600">{member.role}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Email</h2>
                <p className="text-gray-600">{member.email}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Telefone</h2>
                <p className="text-gray-600">{member.phone}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Biografia</h2>
                <p className="text-gray-600">{member.bio}</p>
              </div>
              
              <div className="flex gap-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    LinkedIn
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 