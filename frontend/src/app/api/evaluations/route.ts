import { NextRequest, NextResponse } from "next/server";
import { EvaluationService } from "@/server/services/evaluation-service";
import { upsertEvaluationSchema } from "@/lib/validations/evaluation";

const service = new EvaluationService();

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const classId = searchParams.get("classId");

  const evaluations = classId
    ? await service.listByClass(classId)
    : await service.listAll();

  return NextResponse.json(evaluations);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = upsertEvaluationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const evaluation = await service.upsert(parsed.data);
  return NextResponse.json(evaluation, { status: 201 });
}
