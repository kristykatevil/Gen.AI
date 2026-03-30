import { notFound } from "next/navigation";
import { getProject, loadDb } from "@/lib/db";
import { ProjectWorkspace } from "@/components/ProjectWorkspace";

export const dynamic = "force-dynamic";

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = getProject(params.projectId);
  if (!project) notFound();
  const db = loadDb();
  const job = db.jobs.filter((item) => item.projectId === project.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null;
  return <main className="page"><div className="container"><ProjectWorkspace initialProject={project} initialJob={job} /></div></main>;
}
