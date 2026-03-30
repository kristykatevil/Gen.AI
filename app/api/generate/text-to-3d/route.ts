import { NextResponse } from "next/server";
import { createJob, createProject } from "@/lib/db";
import { MockProvider } from "@/lib/providers/mock-provider";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.prompt || typeof body.prompt !== "string") {
    return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
  }

  const provider = new MockProvider();
  const submission = await provider.submit({
    type: "text_to_3d",
    prompt: body.prompt,
    qualityPreset: body.qualityPreset ?? "standard",
    outputTarget: body.outputTarget ?? "printable"
  });

  const project = createProject({
    name: body.projectName?.trim() || "Untitled text model",
    sourceType: "text",
    prompt: body.prompt,
    imageUrl: null,
    qualityPreset: body.qualityPreset ?? "standard",
    outputTarget: body.outputTarget ?? "printable",
    status: "processing",
    primitiveType: submission.primitiveType,
    progress: 10,
    exportUrl: null
  });

  const job = createJob({
    projectId: project.id,
    sourceType: "text",
    prompt: body.prompt,
    imageUrl: null,
    status: "submitted",
    progress: 10,
    qualityPreset: body.qualityPreset ?? "standard",
    outputTarget: body.outputTarget ?? "printable",
    primitiveType: submission.primitiveType,
    errorMessage: null
  });

  return NextResponse.json({ ok: true, projectId: project.id, jobId: job.id });
}
