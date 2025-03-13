import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Verificar se já existe um admin
  const adminExists = await prisma.teamMember.findFirst({
    where: {
      email: 'admin@ascension.com',
      role: 'admin'
    }
  });

  if (!adminExists) {
    // Criar admin padrão
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await prisma.teamMember.create({
      data: {
        name: 'Administrador',
        email: 'admin@ascension.com',
        password: hashedPassword,
        role: 'admin',
        position: 'Administrador do Sistema',
        bio: 'Administrador principal do sistema Ascension.',
        phone: '',
        socialLinks: JSON.stringify({
          linkedin: '',
          github: '',
          instagram: ''
        })
      }
    });
    
    console.log('Administrador padrão criado com sucesso!');
  } else {
    console.log('Administrador já existe, pulando criação.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 