import { NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/server/services/student-service";
import { createStudentSchema } from "@/lib/validations/student";

const service = new StudentService();

export async function GET() {
  const students = await service.listAll();
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createStudentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const student = await service.create(parsed.data);
  return NextResponse.json(student, { status: 201 });
}
