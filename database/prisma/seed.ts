import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@sistema-provas.edu" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@sistema-provas.edu",
      passwordHash: hashSync("admin123", 10),
      role: "ADMIN",
    },
  });

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
