export class DailyEmailDigest {
  readonly id: string;
  readonly studentId: string;
  readonly digestDate: Date;
  readonly sentAt: Date | null;
  readonly status: string;
}

export class DailyEmailDigestItem {
  readonly id: string;
  readonly digestId: string;
  readonly changeLogId: string;
}
