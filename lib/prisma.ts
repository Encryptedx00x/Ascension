import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// If we're not in production, attach prisma to the global object
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Handle potential initialization errors
process.on('beforeExit', () => {
  // Close the Prisma Client connection when the Node.js process exits
  void prisma.$disconnect();
});