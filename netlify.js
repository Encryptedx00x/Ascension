// Script para executar no Netlify build
const { exec } = require('child_process');

console.log('Inicializando setup para o Netlify...');

// Garantir que o Prisma está gerando corretamente
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao gerar Prisma Client: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Prisma Client gerado com sucesso: ${stdout}`);
}); 