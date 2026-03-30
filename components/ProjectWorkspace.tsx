"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PrimitiveViewer } from "@/components/PrimitiveViewer";
import { primitiveLabel } from "@/lib/shape";
import { formatDate } from "@/lib/format";
import { Job, Project } from "@/lib/types";

type Props = { initialProject: Project; initialJob: Job | null };

export function ProjectWorkspace({ initialProject, initialJob }: Props) {
  const [project, setProject] = useState<Project>(initialProject);
  const [job, setJob] = useState<Job | null>(initialJob);
  const isComplete = project.status === "ready" || job?.status === "succeeded";

  useEffect(() => {
    if (!job || isComplete) return;
    let active = true;
    const interval = window.setInterval(async () => {
      const response = await fetch(`/api/jobs/${job.id}`, { cache: "no-store" });
      if (!response.ok || !active) return;
      const payload = await response.json();
      setJob(payload.job);
      setProject(payload.project);
      if (payload.job?.status === "succeeded") window.clearInterval(interval);
    }, 1800);
    return () => { active = false; window.clearInterval(interval); };
  }, [job, isComplete]);

  const primitiveName = useMemo(() => primitiveLabel(project.primitiveType), [project.primitiveType]);

  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="badge">Preview panel</div>
        <h2 style={{ marginTop: 14 }}>{project.name}</h2>
        <p>This panel renders the starter's generated primitive preview. Replace it later with a real GLB or mesh viewer when your provider returns actual model files.</p>
        <PrimitiveViewer kind={project.primitiveType} />
      </div>

      <div className="grid" style={{ gap: 18 }}>
        <div className="card">
          <h3>Project status</h3>
          <div className="small" style={{ marginBottom: 12 }}>Created {formatDate(project.createdAt)}</div>
          <div className="progress"><span style={{ width: `${job?.progress ?? project.progress}%` }} /></div>
          <div className="project-meta" style={{ marginTop: 12 }}>
            <span>{job?.status ?? project.status}</span>
            <span>{job?.progress ?? project.progress}%</span>
            <span>{project.qualityPreset}</span>
            <span>{project.outputTarget}</span>
          </div>
        </div>

        <div className="card">
          <h3>Model summary</h3>
          <div className="kv">
            <div className="kv-row"><span>Source</span><strong>{project.sourceType}</strong></div>
            <div className="kv-row"><span>Prompt</span><strong>{project.prompt ?? "Image upload"}</strong></div>
            <div className="kv-row"><span>Generated primitive</span><strong>{primitiveName}</strong></div>
            <div className="kv-row"><span>Export</span><strong>{project.exportUrl ? "STL ready" : "Waiting"}</strong></div>
          </div>
        </div>

        {project.imageUrl ? (
          <div className="card">
            <h3>Input image</h3>
            <img src={project.imageUrl} alt="Project input" style={{ width: "100%", borderRadius: 18, display: "block" }} />
          </div>
        ) : null}

        <div className="card">
          <h3>Actions</h3>
          <div className="cta-row">
            {project.exportUrl ? <a className="button button-primary" href={project.exportUrl} download>Download STL</a> : <button className="button button-secondary" disabled>Waiting for STL</button>}
            <Link className="button button-secondary" href="/app/create">Create another</Link>
            <Link className="button button-secondary" href="/app">Back to dashboard</Link>
          </div>
          <p className="small" style={{ marginTop: 12 }}>The STL file in this starter is a placeholder cube mesh so the export workflow works end to end.</p>
        </div>
      </div>
    </div>
  );
}
