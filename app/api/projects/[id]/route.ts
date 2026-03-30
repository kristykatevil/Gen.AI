import { NextResponse } from "next/server";
import { getProject } from "@/lib/db";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const project = getProject(params.id);
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ project });
}
