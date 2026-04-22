import { DailyEmailDigest, DailyEmailDigestItem } from '../models/email-digest.model';

export interface DigestChangeItem {
  oldConcept: string | null;
  newConcept: string;
  goal: { name: string };
  class: { topic: string };
}

export interface DigestWithDetails {
  id: string;
  student: { name: string; email: string };
  items: Array<{ changeLog: DigestChangeItem }>;
}

export interface IEmailDigestRepository {
  findOrCreateForToday(studentId: string): Promise<DailyEmailDigest>;
  addItem(digestId: string, changeLogId: string): Promise<DailyEmailDigestItem>;
  findPending(): Promise<DailyEmailDigest[]>;
  findByIdWithDetails(digestId: string): Promise<DigestWithDetails>;
  markSent(digestId: string): Promise<DailyEmailDigest>;
}

export const EMAIL_DIGEST_REPOSITORY = Symbol('EMAIL_DIGEST_REPOSITORY');
