import Link from "next/link";
import { listProjects } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const projects = listProjects();
  return (
    <main className="page">
      <div className="container grid" style={{ gap: 24 }}>
        <div className="card">
          <div className="row" style={{ alignItems: "center" }}>
            <div>
              <div className="eyebrow">Dashboard</div>
              <h2>Recent projects</h2>
              <p>This starter uses local JSON storage so everything works immediately on Replit.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link className="button button-primary" href="/app/create">New generation</Link>
            </div>
          </div>
        </div>
        <div className="grid grid-3">
          <div className="card"><div className="metric">{projects.length}</div><div className="small">Projects created</div></div>
          <div className="card"><div className="metric">{projects.filter((p) => p.status === "ready").length}</div><div className="small">Completed outputs</div></div>
          <div className="card"><div className="metric">{projects.filter((p) => p.status !== "ready").length}</div><div className="small">Active or draft</div></div>
        </div>
        <div className="card">
          <h3>Project library</h3>
          {projects.length === 0 ? (
            <div className="empty">No projects yet. Start with a text prompt or upload an image.</div>
          ) : (
            <div className="list">
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <div>
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>{project.name}</div>
                    <div className="project-meta">
                      <span>{project.sourceType}</span>
                      <span>{project.qualityPreset}</span>
                      <span>{project.status}</span>
                      <span>{formatDate(project.createdAt)}</span>
                    </div>
                  </div>
                  <Link className="button button-secondary" href={`/app/projects/${project.id}`}>Open</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
