import { readCollection, writeCollection } from "@/server/db/json-db";

interface DigestEntry {
  studentId: string;
  date: string;
  changes: Array<{ classId: string; goal: string; concept: string }>;
}

export class EmailDigestService {
  async queue(studentId: string, change: DigestEntry["changes"][number]): Promise<void> {
    const today = new Date().toISOString().slice(0, 10);
    const all = await readCollection<DigestEntry>("email-digest");

    const index = all.findIndex((d) => d.studentId === studentId && d.date === today);
    if (index >= 0) {
      all[index].changes.push(change);
    } else {
      all.push({ studentId, date: today, changes: [change] });
    }

    await writeCollection("email-digest", all);
  }

  async getPendingForToday(): Promise<DigestEntry[]> {
    const today = new Date().toISOString().slice(0, 10);
    const all = await readCollection<DigestEntry>("email-digest");
    return all.filter((d) => d.date === today);
  }
}
