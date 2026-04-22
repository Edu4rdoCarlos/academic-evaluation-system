import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.goal.createMany({
    data: [
      { name: "Requisitos" },
      { name: "Projeto" },
      { name: "Implementação" },
      { name: "Testes" },
      { name: "Implantação" },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
