import { PrismaClient, EvaluationConcept } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function findOrCreateClass(topic: string, year: number, semester: number) {
  const existing = await prisma.class.findFirst({ where: { topic, year, semester } });
  if (existing) return existing;
  return prisma.class.create({ data: { topic, year, semester } });
}

async function main() {
  // Admin user
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

  // Goals
  const goalNames = ["Requisitos", "Projeto", "Implementação", "Testes", "Implantação"];
  const goals = await Promise.all(
    goalNames.map((name) =>
      prisma.goal.upsert({ where: { name }, update: {}, create: { name } })
    )
  );

  // Students
  const studentsData = [
    { name: "Ana Lima",       cpf: "111.111.111-11", email: "ana.lima@aluno.edu" },
    { name: "Bruno Souza",    cpf: "222.222.222-22", email: "bruno.souza@aluno.edu" },
    { name: "Carla Mendes",   cpf: "333.333.333-33", email: "carla.mendes@aluno.edu" },
    { name: "Diego Ferreira", cpf: "444.444.444-44", email: "diego.ferreira@aluno.edu" },
    { name: "Elena Costa",    cpf: "555.555.555-55", email: "elena.costa@aluno.edu" },
    { name: "Felipe Ramos",   cpf: "666.666.666-66", email: "felipe.ramos@aluno.edu" },
  ];

  const students = await Promise.all(
    studentsData.map((s) =>
      prisma.student.upsert({ where: { cpf: s.cpf }, update: {}, create: s })
    )
  );

  // Classes
  const turmaLP1    = await findOrCreateClass("Tópicos Avançados de LP1", 2026, 1);
  const turmaES     = await findOrCreateClass("Engenharia de Software",   2026, 1);
  const turmaED     = await findOrCreateClass("Estrutura de Dados",       2025, 2);

  // Enroll students: todos na LP1 e ES, apenas os 3 primeiros em ED
  const enrollments: Array<{ classId: string; studentId: string }> = [
    ...students.map((s) => ({ classId: turmaLP1.id, studentId: s.id })),
    ...students.map((s) => ({ classId: turmaES.id,  studentId: s.id })),
    ...students.slice(0, 3).map((s) => ({ classId: turmaED.id, studentId: s.id })),
  ];

  for (const e of enrollments) {
    await prisma.classEnrollment.upsert({
      where: { classId_studentId: e },
      update: {},
      create: e,
    });
  }

  // Evaluations for LP1 — variação realista de conceitos
  const matrix: EvaluationConcept[][] = [
    ["MA",   "MA",   "MPA",  "MA",   "MA"  ],
    ["MPA",  "MA",   "MA",   "MPA",  "MANA"],
    ["MA",   "MPA",  "MA",   "MA",   "MPA" ],
    ["MANA", "MPA",  "MPA",  "MA",   "MA"  ],
    ["MA",   "MA",   "MA",   "MPA",  "MA"  ],
    ["MPA",  "MANA", "MA",   "MPA",  "MA"  ],
  ];

  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < goals.length; j++) {
      await prisma.evaluation.upsert({
        where: {
          classId_studentId_goalId: {
            classId:   turmaLP1.id,
            studentId: students[i].id,
            goalId:    goals[j].id,
          },
        },
        update: {},
        create: {
          classId:   turmaLP1.id,
          studentId: students[i].id,
          goalId:    goals[j].id,
          concept:   matrix[i][j],
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
