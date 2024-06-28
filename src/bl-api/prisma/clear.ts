const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Adicione aqui todas as tabelas do seu banco de dados
  await prisma.teacher.deleteMany({});
  await prisma.users.deleteMany({});
  // Continue para cada tabela no seu banco de dados...
}

main()
  .then(() => {
    console.log('Database cleaned completed successfully.');
  })
  .catch((e) => {
    console.error('Error during seeding:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
