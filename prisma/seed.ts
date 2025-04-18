import { PrismaClient, BudgetStatus, ServiceRequestStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding...`);

  // Criar administrador padrão
  const adminExists = await prisma.admin.findFirst({
    where: { username: 'admin' },
  });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    });
    console.log('Admin padrão criado: admin / admin123');
  } else {
    console.log('Admin padrão já existe');
  }

  // Adicione aqui outros dados de seed, se necessário
  
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 