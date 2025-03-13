'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
}

const team: TeamMember[] = [
  {
    id: 1,
    name: 'João Silva',
    role: 'CEO & Fundador',
    image: '/images/team/joao.jpg',
    bio: 'Especialista em desenvolvimento web com mais de 10 anos de experiência. Apaixonado por tecnologia e inovação.',
    social: {
      linkedin: 'https://linkedin.com/in/joao-silva',
      github: 'https://github.com/joao-silva',
      twitter: 'https://twitter.com/joao-silva',
      email: 'joao@ascension.tech'
    }
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'Diretora de Tecnologia',
    image: '/images/team/maria.jpg',
    bio: 'Especialista em arquitetura de software e desenvolvimento de sistemas complexos. Mestre em Ciência da Computação.',
    social: {
      linkedin: 'https://linkedin.com/in/maria-santos',
      github: 'https://github.com/maria-santos',
      email: 'maria@ascension.tech'
    }
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    role: 'Desenvolvedor Full Stack',
    image: '/images/team/pedro.jpg',
    bio: 'Desenvolvedor full stack com foco em aplicações web modernas. Especialista em React, Node.js e cloud computing.',
    social: {
      linkedin: 'https://linkedin.com/in/pedro-oliveira',
      github: 'https://github.com/pedro-oliveira',
      email: 'pedro@ascension.tech'
    }
  },
  {
    id: 4,
    name: 'Ana Costa',
    role: 'UI/UX Designer',
    image: '/images/team/ana.jpg',
    bio: 'Designer especializada em interfaces digitais e experiência do usuário. Criativa e apaixonada por design.',
    social: {
      linkedin: 'https://linkedin.com/in/ana-costa',
      twitter: 'https://twitter.com/ana-costa',
      email: 'ana@ascension.tech'
    }
  },
  {
    id: 5,
    name: 'Carlos Lima',
    role: 'Desenvolvedor Mobile',
    image: '/images/team/carlos.jpg',
    bio: 'Especialista em desenvolvimento de aplicativos móveis nativos e híbridos. Experiência com iOS e Android.',
    social: {
      linkedin: 'https://linkedin.com/in/carlos-lima',
      github: 'https://github.com/carlos-lima',
      email: 'carlos@ascension.tech'
    }
  },
  {
    id: 6,
    name: 'Laura Mendes',
    role: 'Gerente de Projetos',
    image: '/images/team/laura.jpg',
    bio: 'Gerente de projetos com certificação PMP. Experiência em gestão de equipes e metodologias ágeis.',
    social: {
      linkedin: 'https://linkedin.com/in/laura-mendes',
      email: 'laura@ascension.tech'
    }
  }
];

const TeamCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="relative h-64">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {member.name}
        </h3>
        <p className="text-primary mb-4">{member.role}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {member.bio}
        </p>
        
        <div className="flex space-x-4">
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label={`LinkedIn de ${member.name}`}
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          )}
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label={`GitHub de ${member.name}`}
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label={`Twitter de ${member.name}`}
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          )}
          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label={`Email de ${member.name}`}
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Nossa Equipe
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Conheça os profissionais talentosos que fazem parte da nossa equipe e trabalham para entregar as melhores soluções para nossos clientes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Quer fazer parte da nossa equipe?{' '}
            <a href="/carreiras" className="text-primary hover:underline">
              Veja nossas vagas
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 