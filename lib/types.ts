export type ProjectStatus = "draft" | "processing" | "ready" | "failed";
export type JobStatus = "queued" | "submitted" | "processing" | "succeeded" | "failed";
export type PrimitiveType = "box" | "sphere" | "cylinder" | "torus" | "cone";

export type Project = {
  id: string;
  name: string;
  sourceType: "text" | "image";
  prompt: string | null;
  imageUrl: string | null;
  qualityPreset: "draft" | "standard" | "high";
  outputTarget: "preview" | "printable";
  status: ProjectStatus;
  primitiveType: PrimitiveType;
  progress: number;
  createdAt: string;
  updatedAt: string;
  exportUrl: string | null;
};

export type Job = {
  id: string;
  projectId: string;
  sourceType: "text" | "image";
  prompt: string | null;
  imageUrl: string | null;
  status: JobStatus;
  progress: number;
  qualityPreset: "draft" | "standard" | "high";
  outputTarget: "preview" | "printable";
  primitiveType: PrimitiveType;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  errorMessage: string | null;
};

export type DbShape = {
  projects: Project[];
  jobs: Job[];
};
