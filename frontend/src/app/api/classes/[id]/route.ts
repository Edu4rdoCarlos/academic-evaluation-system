import { NextRequest, NextResponse } from "next/server";
import { ClassService } from "@/server/services/class-service";
import { updateClassSchema } from "@/lib/validations/class";

const service = new ClassService();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const found = await service.findById(params.id);
  if (!found) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(found);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const parsed = updateClassSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const updated = await service.update(params.id, parsed.data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await service.remove(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}
