import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  IClassRepository,
  CreateClassData,
  UpdateClassData,
} from './class.repository.interface';
import { Class, ClassEnrollment } from '../models/class.model';

@Injectable()
export class ClassRepository implements IClassRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findPaginated(page: number, perPage: number): Promise<{ items: Class[]; totalItems: number }> {
    const [items, totalItems] = await this.prisma.$transaction([
      this.prisma.class.findMany({
        orderBy: [{ year: 'desc' }, { semester: 'desc' }],
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.class.count(),
    ]);
    return { items, totalItems };
  }

  async findById(id: string): Promise<Class | null> {
    return this.prisma.class.findUnique({ where: { id } });
  }

  async findWithStudents(id: string) {
    return this.prisma.class.findUnique({
      where: { id },
      include: { enrollments: true },
    });
  }

  async create(data: CreateClassData): Promise<Class> {
    return this.prisma.class.create({ data });
  }

  async update(id: string, data: UpdateClassData): Promise<Class> {
    return this.prisma.class.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.class.delete({ where: { id } });
  }

  async enroll(classId: string, studentId: string): Promise<ClassEnrollment> {
    return this.prisma.classEnrollment.create({ data: { classId, studentId } });
  }

  async unenroll(classId: string, studentId: string): Promise<void> {
    await this.prisma.classEnrollment.delete({
      where: { classId_studentId: { classId, studentId } },
    });
  }

  async findEnrollments(classId: string): Promise<ClassEnrollment[]> {
    return this.prisma.classEnrollment.findMany({ where: { classId } });
  }
}
