import { NextResponse } from "next/server";
import { advanceJobIfNeeded, getProject } from "@/lib/db";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const job = advanceJobIfNeeded(params.id);
  if (!job) return NextResponse.json({ error: "Job not found." }, { status: 404 });
  const project = getProject(job.projectId);
  return NextResponse.json({ job, project });
}
