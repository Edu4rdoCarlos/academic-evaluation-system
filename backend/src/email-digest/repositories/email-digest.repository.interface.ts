import { DailyEmailDigest, DailyEmailDigestItem } from '../models/email-digest.model';

export interface IEmailDigestRepository {
  findOrCreateForToday(studentId: string): Promise<DailyEmailDigest>;
  addItem(digestId: string, changeLogId: string): Promise<DailyEmailDigestItem>;
  findPending(): Promise<DailyEmailDigest[]>;
  markSent(digestId: string): Promise<DailyEmailDigest>;
}

export const EMAIL_DIGEST_REPOSITORY = Symbol('EMAIL_DIGEST_REPOSITORY');
