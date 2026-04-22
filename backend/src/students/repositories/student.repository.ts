import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  IStudentRepository,
  CreateStudentData,
  UpdateStudentData,
} from './student.repository.interface';
import { Student } from '../models/student.model';

@Injectable()
export class StudentRepository implements IStudentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPaginated(page: number, perPage: number): Promise<{ items: Student[]; totalItems: number }> {
    const [items, totalItems] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        orderBy: { name: 'asc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.student.count(),
    ]);
    return { items, totalItems };
  }

  async findById(id: string): Promise<Student | null> {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async findByCpf(cpf: string): Promise<Student | null> {
    return this.prisma.student.findUnique({ where: { cpf } });
  }

  async create(data: CreateStudentData): Promise<Student> {
    return this.prisma.student.create({ data });
  }

  async update(id: string, data: UpdateStudentData): Promise<Student> {
    return this.prisma.student.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.student.delete({ where: { id } });
  }
}
