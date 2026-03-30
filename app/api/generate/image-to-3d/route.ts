import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { createJob, createProject } from "@/lib/db";
import { MockProvider } from "@/lib/providers/mock-provider";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".png";
  const savedName = `${uuidv4()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const uploadPath = path.join(uploadDir, savedName);
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(uploadPath, bytes);
  const imageUrl = `/uploads/${savedName}`;

  const qualityPreset = (formData.get("qualityPreset")?.toString() ?? "standard") as "draft" | "standard" | "high";
  const outputTarget = (formData.get("outputTarget")?.toString() ?? "printable") as "preview" | "printable";
  const projectName = formData.get("projectName")?.toString().trim() || file.name.replace(/\.[^.]+$/, "");

  const provider = new MockProvider();
  const submission = await provider.submit({ type: "image_to_3d", imageUrl, qualityPreset, outputTarget });

  const project = createProject({
    name: projectName || "Untitled image model",
    sourceType: "image",
    prompt: null,
    imageUrl,
    qualityPreset,
    outputTarget,
    status: "processing",
    primitiveType: submission.primitiveType,
    progress: 10,
    exportUrl: null
  });

  const job = createJob({
    projectId: project.id,
    sourceType: "image",
    prompt: null,
    imageUrl,
    status: "submitted",
    progress: 10,
    qualityPreset,
    outputTarget,
    primitiveType: submission.primitiveType,
    errorMessage: null
  });

  return NextResponse.json({ ok: true, projectId: project.id, jobId: job.id });
}
