import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { IEmailDigestRepository, DigestWithDetails } from './email-digest.repository.interface';
import { DailyEmailDigest, DailyEmailDigestItem } from '../models/email-digest.model';

@Injectable()
export class EmailDigestRepository implements IEmailDigestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateForToday(studentId: string): Promise<DailyEmailDigest> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    return this.prisma.dailyEmailDigest.upsert({
      where: { studentId_digestDate: { studentId, digestDate: today } },
      create: { studentId, digestDate: today },
      update: {},
    });
  }

  addItem(digestId: string, changeLogId: string): Promise<DailyEmailDigestItem> {
    return this.prisma.dailyEmailDigestItem.create({ data: { digestId, changeLogId } });
  }

  findPending(): Promise<DailyEmailDigest[]> {
    return this.prisma.dailyEmailDigest.findMany({
      where: { status: 'pending' },
      include: { items: { include: { changeLog: true } } },
    });
  }

  async findByIdWithDetails(digestId: string): Promise<DigestWithDetails> {
    return this.prisma.dailyEmailDigest.findUniqueOrThrow({
      where: { id: digestId },
      select: {
        id: true,
        student: { select: { name: true, email: true } },
        items: {
          select: {
            changeLog: {
              select: {
                oldConcept: true,
                newConcept: true,
                goal: { select: { name: true } },
                class: { select: { topic: true } },
              },
            },
          },
        },
      },
    });
  }

  markSent(digestId: string): Promise<DailyEmailDigest> {
    return this.prisma.dailyEmailDigest.update({
      where: { id: digestId },
      data: { status: 'sent', sentAt: new Date() },
    });
  }
}
