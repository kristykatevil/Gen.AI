import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { DbShape, Job, Project } from "@/lib/types";
import { createAsciiCubeStl } from "@/lib/shape";

const dbPath = path.join(process.cwd(), "data", "db.json");
const generatedDir = path.join(process.cwd(), "public", "generated");

function ensureDb() {
  if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir, { recursive: true });
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({ projects: [], jobs: [] }, null, 2));
}

export function loadDb(): DbShape {
  ensureDb();
  return JSON.parse(fs.readFileSync(dbPath, "utf-8")) as DbShape;
}

export function saveDb(data: DbShape) {
  ensureDb();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function listProjects(): Project[] {
  const db = loadDb();
  return [...db.projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getProject(projectId: string): Project | undefined {
  return loadDb().projects.find((project) => project.id === projectId);
}

export function createProject(input: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
  const db = loadDb();
  const now = new Date().toISOString();
  const project: Project = { id: uuidv4(), createdAt: now, updatedAt: now, ...input };
  db.projects.push(project);
  saveDb(db);
  return project;
}

export function createJob(input: Omit<Job, "id" | "createdAt" | "updatedAt" | "completedAt">): Job {
  const db = loadDb();
  const now = new Date().toISOString();
  const job: Job = { id: uuidv4(), createdAt: now, updatedAt: now, completedAt: null, ...input };
  db.jobs.push(job);
  saveDb(db);
  return job;
}

export function advanceJobIfNeeded(jobId: string): Job | undefined {
  const db = loadDb();
  const jobIndex = db.jobs.findIndex((job) => job.id === jobId);
  if (jobIndex === -1) return undefined;
  const job = db.jobs[jobIndex];
  if (job.status === "succeeded" || job.status === "failed") return job;

  const ageMs = Date.now() - new Date(job.createdAt).getTime();

  if (ageMs < 2000) {
    job.status = "submitted";
    job.progress = 15;
  } else if (ageMs < 5000) {
    job.status = "processing";
    job.progress = 55;
  } else {
    job.status = "succeeded";
    job.progress = 100;
    job.completedAt = new Date().toISOString();
    const projectIndex = db.projects.findIndex((project) => project.id === job.projectId);
    if (projectIndex !== -1) {
      const project = db.projects[projectIndex];
      const safeName = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "model";
      const stlFileName = `${project.id}-${safeName}.stl`;
      const stlPath = path.join(generatedDir, stlFileName);
      if (!fs.existsSync(stlPath)) fs.writeFileSync(stlPath, createAsciiCubeStl(safeName));
      db.projects[projectIndex] = {
        ...project,
        status: "ready",
        progress: 100,
        exportUrl: `/generated/${stlFileName}`,
        primitiveType: job.primitiveType,
        updatedAt: new Date().toISOString()
      };
    }
  }

  db.jobs[jobIndex] = job;
  saveDb(db);
  return job;
}
