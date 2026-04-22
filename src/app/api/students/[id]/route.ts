import { NextRequest, NextResponse } from "next/server";
import { StudentService } from "@/server/services/student-service";
import { updateStudentSchema } from "@/lib/validations/student";

const service = new StudentService();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const student = await service.findById(params.id);
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(student);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const parsed = updateStudentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const student = await service.update(params.id, parsed.data);
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(student);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await service.remove(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
