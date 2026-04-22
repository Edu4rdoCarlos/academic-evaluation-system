import { NextRequest, NextResponse } from "next/server";
import { ClassService } from "@/server/services/class-service";
import { createClassSchema } from "@/lib/validations/class";

const service = new ClassService();

export async function GET() {
  const classes = await service.listAll();
  return NextResponse.json(classes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createClassSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const created = await service.create(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
